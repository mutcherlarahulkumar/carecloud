
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  accessList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who can access the details
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  contactInfo: { type: String, required: true },
  height: { type: Number, required: true }, // in cm
  weight: { type: Number, required: true }, // in kg
  bp: { type: String }, // Blood Pressure
  cholesterol: { type: String },
  bloodSugar: { type: String },
  sleepPatterns: { type: Number }, // Hours of sleep
  substanceUse: [{ type: String }], // List of medicines or substances
  exerciseRoutine: {
    hours: { type: Number },
    difficulty: { type: String, enum: ['Low', 'Moderate', 'High'] },
  },
  dietaryHabits: { type: String },
  recordUpdates: [
    {
      date: { type: Date, default: Date.now },
      details: { type: String },
    },
  ],
  familySpace: { type: mongoose.Schema.Types.ObjectId, ref: 'FamilySpace' }, // Reference to Family Space
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Family Space Schema
const familySpaceSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Family space name
  code: { type: String, unique: true, required: true }, // Invite code
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Admin user
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Array of members
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const FamilySpace = mongoose.model('FamilySpace', familySpaceSchema);

module.exports = { User, FamilySpace };
