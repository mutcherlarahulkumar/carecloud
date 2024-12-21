const express = require('express');
const { createFamilySpace, joinFamilySpace, manageFamilySpace } = require('./index'); // Corrected path
const { FamilySpace } = require('../../models/User'); // Import FamilySpace model
const router = express.Router();
const auth = require('../auth/middleware');

router.get('/details', async (req, res) => {
  try {
    const familySpaceId = req.query.id; // Assume family space ID is passed as a query parameter
    const familySpace = await FamilySpace.findById(familySpaceId).populate('admin members').exec();
    if (!familySpace) {
      return res.status(404).json({ message: 'Family space not found' });
    }
    res.json(familySpace);
  } catch (error) {
    console.error('Error fetching family space details:', error); // Log the error details
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/create', auth, createFamilySpace);
router.post('/join', auth, joinFamilySpace);
router.post('/manage', auth, manageFamilySpace);

module.exports = router;