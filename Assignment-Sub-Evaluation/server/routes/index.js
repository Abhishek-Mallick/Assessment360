// import express
const express = require('express');

// import express router
const router = express.Router();

console.log('router is loaded yehhh');

// adding api route
router.use('/api', require('./api'));

// export the router
module.exports = router;
