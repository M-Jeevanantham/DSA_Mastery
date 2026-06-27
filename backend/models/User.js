const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: { type: String, default: '' },
  username: { type: String, default: '' },
  currentRole: { type: String, default: '' },
  targetCompany: { type: String, default: '' },
  college: { type: String, default: '' },
  yearsOfExperience: { type: String, default: '' },
  progress: {
    // Array of completed week/topic identifiers
    completedWeeks: [Number],
    completedTopics: [String]
  },
  leetcodeUsername: {
    type: String,
    default: ''
  },
  activityLog: {
    // Array of 'YYYY-MM-DD' strings representing active days
    type: [String],
    default: []
  },
  notes: {
    // Map problem/topic ID to markdown string
    type: Map,
    of: String,
    default: {}
  },
  flashcards: [{
    cardId: String,
    nextReviewDate: Date,
    interval: Number,
    easinessFactor: Number
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('User', userSchema);
