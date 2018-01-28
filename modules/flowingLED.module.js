/*jshint esversion: 6 */

//include onoff to interact with the GPIO
const Gpio = require('onoff').Gpio;

//use declare variables for all the GPIO output pins
const LED04 = new Gpio(4, 'out'),
    LED17 = new Gpio(17, 'out'),
    LED27 = new Gpio(27, 'out'),
    LED22 = new Gpio(22, 'out'),
    LED18 = new Gpio(18, 'out'),
    LED23 = new Gpio(23, 'out'),
    LED24 = new Gpio(24, 'out'),
    LED25 = new Gpio(25, 'out');

//Put all the LED variables in an array
const leds = [LED04, LED17, LED27, LED22, LED18, LED23, LED24, LED25];

//a counter
let indexCount = 0;

//variable for flowing direction
let dir = "up";

//run the flowingLeds function every 100ms
var flowInterval = setInterval(flowingLeds, 100);

//function for flowing Leds
function flowingLeds() {
    //for each item in array
    leds.forEach(function (currentValue) {
        currentValue.writeSync(0); //turn off LED
    }); // end forEach

    //set flow direction to "up" if the count reaches zero
    if (indexCount == 0) dir = "up";

    //set flow direction to "down" if the count reaches 7
    if (indexCount >= leds.length) dir = "down"; 

    //count downwards if direction is down
    if (dir == "down") indexCount--;

    //turn on LED that where array index matches count
    leds[indexCount].writeSync(1);

    //count upwards if direction is up
    if (dir == "up") indexCount++;
}; // end flowingLEDs

//function to run when exiting program
function unexportOnClose() {
    //stop flow interval
    clearInterval(flowInterval);

    //for each LED
    leds.forEach(function (currentValue) {
        currentValue.writeSync(0); //turn off LED
        currentValue.unexport(); //unexport GPIO
    }); // end forEach
}; // end unexportOnClose


//function to run when user closes using ctrl+cc
process.on('SIGINT', unexportOnClose); 