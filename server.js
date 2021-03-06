/*jshint esversion: 6 */

// requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

const port = process.env.PORT || 6680;

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
app.listen(port, () => {
    console.log('Server listening on port: ', port);
}); // end listen