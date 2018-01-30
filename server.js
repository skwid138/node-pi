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

// WebSocket Connection
io.on('connection', function (socket) {
    console.log('made sockect connection');
    

    //static variable for current status
    let lightvalue = 0;

    //get light switch status from client
    socket.on('light', function (data) {
        lightvalue = data;

        if (lightvalue) {
            //turn LED on or off, for now we will just show it in console.log
            console.log('lightvalue ', lightvalue);
        }
    });
}); // end io.sockets.on