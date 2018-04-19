# pressureChair

This project contains the Raspberry Pi/Arduino setup for a chair that has an FSR inside it that would send a notification to your computer after 30 minutes to let you know you've been sitting too long and should take a break. It also provides a webpage that shows a timer of how long the user has been sitting.

The Pi has Node, Express, and Johnny-Five installed.

A force sensitive resistor is needed in conjunction with the Arduino.

App.js will run the program with an Arduino plugged into a Pi.

App2.js is still a work in progress for having the FSR directly attached to the Pi, without the Arduino.

Read more info at nikkicavalier.com/maker-blog/enchanted-object
