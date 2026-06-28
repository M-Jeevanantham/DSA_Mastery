const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// @route   GET /api/leetcode/:username
// @desc    Fetch LeetCode stats via official GraphQL
// @access  Private
router.get('/:username', auth, async (req, res) => {
  try {
    const { username } = req.params;
    
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
      }
    `;

    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { username } })
    });
    
    if (!response.ok) {
      return res.status(404).json({ msg: 'LeetCode API error' });
    }

    const data = await response.json();
    
    if (!data.data || !data.data.matchedUser) {
       return res.status(404).json({ msg: 'User not found' });
    }

    const stats = data.data.matchedUser.submitStats.acSubmissionNum;
    const all = stats.find(s => s.difficulty === "All")?.count || 0;
    const easy = stats.find(s => s.difficulty === "Easy")?.count || 0;
    const medium = stats.find(s => s.difficulty === "Medium")?.count || 0;
    const hard = stats.find(s => s.difficulty === "Hard")?.count || 0;

    res.json({
      solvedProblem: all,
      easySolved: easy,
      mediumSolved: medium,
      hardSolved: hard
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error fetching LeetCode stats');
  }
});

module.exports = router;
