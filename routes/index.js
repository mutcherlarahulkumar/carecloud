const express = require('express');
const authrouter = require('./auth/auth.js');
const familyRoutes = require('./family/familySpace'); // Corrected path

const router = express.Router();

router.use('/auth', authrouter);

router.use('/family', familyRoutes);

router.use('/community', require('./community'));

router.use('/track', require('./symptoms'));

router.use('/ai',require('./personalAssistant/pa'));

router.use('/record',require('./records.js'));


module.exports = router;