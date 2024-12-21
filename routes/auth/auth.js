const express = require('express');
const signinrouter = require('./signin.js');
const signuprouter = require('./signup.js');
const router = express.Router();

router.use('/signup',signuprouter);
router.use('/signin',signinrouter);

module.exports = router;