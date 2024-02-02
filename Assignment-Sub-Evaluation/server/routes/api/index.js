// import express
const express = require('express');

// import express router
const router = express.Router();

// add v1 route
router.use('/v1', require('./v1'));

// export the router
module.exports = router;
