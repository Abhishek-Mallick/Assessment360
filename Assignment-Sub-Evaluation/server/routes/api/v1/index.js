// import express
const express = require('express');

// import express router
const router = express.Router();

// import routes
const user = require('./user');
const assignment = require('./assignment');

// including routes
router.use('/user', user);
router.use('/assignment', assignment);

// export the router
module.exports = router;
