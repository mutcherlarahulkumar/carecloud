const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  recordType: {
    type: String,
    required: true,
  },
  recordCreatedAt: {
    type: Date,
    default: Date.now,
  },
  recordFileUploadLink: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;