const express = require('express');
const authrouter = require('./auth/auth.js');
const familyRoutes = require('./family/familySpace');
const {streamAudio} = require('./speach.js');

const router = express.Router();

router.use('/auth', authrouter);

router.use('/family', familyRoutes);

router.use('/community', require('./community'));

router.use('/track', require('./symptoms'));

router.use('/ai',require('./personalAssistant/pa'));

router.use('/record',require('./records.js'));

router.use('/story',require('./Story/index.js'));

// router.get('/speak',(req,res)=>{
//     const audio = streamAudio('Hello Hi How are you doing!');
//     res.send(audio);
// });


module.exports = router;