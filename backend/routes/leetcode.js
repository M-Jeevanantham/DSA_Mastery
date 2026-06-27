const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// @route   GET /api/leetcode/:username
// @desc    Fetch LeetCode stats via ALFA API proxy
// @access  Private
router.get('/:username', auth, async (req, res) => {
  try {
    const { username } = req.params;
    
    // We use a dynamic import for 'node-fetch' since the user might not have it installed.
    // Actually, in Node 18+, fetch is available globally. Assuming Node 18+ for this environment.
    const response = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`);
    
    if (!response.ok) {
      return res.status(404).json({ msg: 'LeetCode user not found or API error' });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error fetching LeetCode stats');
  }
});

module.exports = router;
