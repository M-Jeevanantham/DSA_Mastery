const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   GET /api/progress
// @desc    Get user's progress
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/progress
// @desc    Update user progress (toggle week or add/remove topic)
// @access  Private
router.put('/', auth, async (req, res) => {
  try {
    const { completedWeeks, completedTopics, leetcodeUsername, activityLog, notes, flashcards } = req.body;
    
    // We only update the fields that are provided
    const updateFields = {};
    if (completedWeeks !== undefined) updateFields['progress.completedWeeks'] = completedWeeks;
    if (completedTopics !== undefined) updateFields['progress.completedTopics'] = completedTopics;
    if (leetcodeUsername !== undefined) updateFields.leetcodeUsername = leetcodeUsername;
    if (activityLog !== undefined) updateFields.activityLog = activityLog;
    if (notes !== undefined) updateFields.notes = notes;
    if (flashcards !== undefined) updateFields.flashcards = flashcards;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields },
      { returnDocument: 'after' }
    ).select('-password');

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
