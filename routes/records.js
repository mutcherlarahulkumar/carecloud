const express = require('express');
const mongoose = require('mongoose');
const Record = require('../models/Records');
const router = express.Router();
const auth = require('./auth/middleware');

// Create a new record
router.post('/', auth, async (req, res) => {
  try {
    const { recordType, recordFileUploadLink } = req.body;
    const newRecord = new Record({
      recordType,
      recordFileUploadLink,
      createdBy: req.user.id,
    });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all records
router.get('/', async (req, res) => {
  try {
    const records = await Record.find().populate('createdBy', 'username email');
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific record by ID
router.get('/:id', async (req, res) => {
  try {
    const record = await Record.findById(req.params.id).populate('createdBy', 'username email');
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a record by ID
router.put('/:id', async (req, res) => {
  try {
    const { recordType, recordFileUploadLink } = req.body;
    const updatedRecord = await Record.findByIdAndUpdate(
      req.params.id,
      { recordType, recordFileUploadLink },
      { new: true }
    );
    if (!updatedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedRecord = await Record.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json({ message: 'Record deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search records by type
router.get('/search/:type', async (req, res) => {
  try {
    const records = await Record.find({ recordType: req.params.type }).populate('createdBy', 'username email');
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;