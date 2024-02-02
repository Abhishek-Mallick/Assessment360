// import express
const express = require('express');

// start the express server
const app = express();

// setting port
const port = 8000;

// import mongodb  configuration
const db = require('./config/mongoose');

//serve uploaded files on server..
app.use('/public', express.static(__dirname + '/public'));

// import passport to authenticate user and requests
const passport = require('passport');

// import passport jwt strategy
const passportJWT = require('./config/passport-jwt-strategy');

const cors = require('cors');

var multer = require('multer');

app.use(express.urlencoded({ extended: true }));
// make the uploads path available to the browser

app.use(cors());
// initialize passport
app.use(passport.initialize());

// including routes
app.use('/', require('./routes'));

// listen on the port
app.listen(port, function (err) {
  if (err) {
    console.log('error:', err);
    console.log(`Error in running the server:${err}`);
  }

  console.log(`Server is running on port:${port}`);
});
