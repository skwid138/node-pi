/*jshint esversion: 6 */


//include onoff to interact with the GPIO
const Gpio = require('onoff').Gpio; 

//use GPIO pin 4, and specify that it is output
const LED = new Gpio(4, 'out'); 

//run the blinkLED function every 250ms
const blinkInterval = setInterval(blinkLED, 250); 

blinkLED = () => { //function to start blinking
    if (LED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
        LED.writeSync(1); //set pin state to 1 (turn LED on)
    } else {
        LED.writeSync(0); //set pin state to 0 (turn LED off)
    } // end else
}; // end blinkLED

endBlink = () => { //function to stop blinking
    clearInterval(blinkInterval); // Stop blink intervals
    LED.writeSync(0); // Turn LED off
    LED.unexport(); // Unexport GPIO to free resources
}; // end endBlink

setTimeout(endBlink, 5000); //stop blinking after 5 seconds