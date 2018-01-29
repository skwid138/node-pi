/*jshint esversion: 6 */

// requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

const ip = require('ip');

// socket.io
const server = require('http').Server(app);
const io = require('socket.io')(server); //require socket.io module and pass the http object (server)

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



// WebSocket Connection
io.sockets.on('connection', function (socket) {

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
});


// server listening
app.listen(port, () => {
    console.log('Server listening on: http://' + ip.address() + ':' + port);
}); // end listen