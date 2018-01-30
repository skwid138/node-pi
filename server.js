/*jshint esversion: 6 */

// requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

const ip = require('ip');

const port = process.env.PORT || 6680;

// const blinkModule = require('./modules/blink.module.js');

// use body-parser
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

// use static directory
app.use(express.static('./public'));

// route requires

const indexRouter = require('./routes/index.router.js'); 

// use routes

app.use('/', indexRouter); // catch all


// server listening
const server = app.listen(port, () => {
    console.log('Server listening on: http://' + ip.address() + ':' + port);
}); // end listen

// socket.io
const socket = require('socket.io')
const io = socket(server); //require socket.io module and pass the http object (server)



//include onoff to interact with the GPIO
var Gpio = require('onoff').Gpio,
//use GPIO pin 4 as output
LED = new Gpio(4, 'out'),
//use GPIO pin 17 as input, and 'both' button presses, and releases should be handled
pushButton = new Gpio(17, 'in', 'both'); 


// WebSocket Connection
io.on('connection', function (socket) {
    console.log('made socket connection');

    //static variable for current status
    let lightValue = 0;

    pushButton.watch(function (err, value) { //Watch for hardware interrupts on pushButton
        if (err) { //if an error
            console.error('There was an error', err); //output error message to console
            return;
        } // end if error
        lightValue = value;
        socket.emit('light', lightValue); //send button status to client
    }); // end pushButton.watch

    //get light switch status from client
    socket.on('light', function (data) {
        console.log('socket.on', data);
        
        lightValue = data;

        //only change LED if status has changed
        if (lightValue != LED.readSync()) { 
            //turn LED on or off
            LED.writeSync(lightValue); 
        } // end if

    }); // end socket.on
    
}); // end io.sockets.on