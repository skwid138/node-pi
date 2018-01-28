/*jshint esversion: 6 */


//include onoff to interact with the GPIO
const Gpio = require('onoff').Gpio;

//use GPIO pin 4 as output
const LED = new Gpio(4, 'out');

//use GPIO pin 17 as input, and 'both' button presses, and releases should be handled
const pushButton = new Gpio(17, 'in', 'both'); 

//Watch for hardware interrupts on pushButton GPIO, specify callback function
pushButton.watch( function (err, value) { 
    if (err) { //if an error
        console.error('There was an error', err); //output error message to console
        return;
    } // end if
    LED.writeSync(value); //turn LED on or off depending on the button state (0 or 1)
}); // end pushButton.watch

//function to run when exiting program
function unexportOnClose() { 
    LED.writeSync(0); // Turn LED off
    LED.unexport(); // Unexport LED GPIO to free resources
    pushButton.unexport(); // Unexport Button GPIO to free resources
}; // end unexportOnClose

//function to run when user closes using ctrl+c
process.on('SIGINT', unexportOnClose); 