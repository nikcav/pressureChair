var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var five = require("johnny-five");
var raspi = require("raspi-io")
var board = new five.Board({
            io: new raspi()
          });
new five.Expander({
  controller: "PCF8591"
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});


// pressure sensor
board.on("ready", function() {

  var sensor = new five.Sensor("P1-11");  //define sensor
  var fsrReading ;


  var t;
  var isNewTimer = true;

  // Sensor on. When the sensor value changes, log the value
  sensor.on("change", function(fsrReading) {
    console.log(fsrReading);

  // time conversion



  var myTimer, myTimer2; //define timer reference

  // timer function
  function timer() {

    io.emit('timer-start', {value:true});

    myTimer = setTimeout(function(){
      console.log("Alert");
      io.emit('timer-done', {value:true}); // send to client
    }, 10000); // 10 sec
  }


  // if pressure is applied, start timer
  if (fsrReading > 10) {
    //console.log("Pressure Applied");
    //start timer
    if (isNewTimer){
      timer();
      isNewTimer = false;
    }
  }
  else {
    //clear timer
    clearTimeout(myTimer);
    io.emit('timer-start', {value:false});
    isNewTimer = true;
    console.log("Timer Clear");
  }

  });
});

// socket.io
io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
