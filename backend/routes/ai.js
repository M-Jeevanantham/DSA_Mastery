const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const fs = require('fs');
const path = require('path');

const CACHE_FILE = path.join(__dirname, '../lessonsCache.json');

// Helper to read cache
const readCache = () => {
  if (fs.existsSync(CACHE_FILE)) {
    try { return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8')); } catch (e) { return {}; }
  }
  return {};
};

// Helper to write cache
const writeCache = (data) => {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2));
};

// POST /api/ai/lesson
router.post('/lesson', async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic) {
      return res.status(400).json({ msg: 'Topic is required' });
    }

    // Check Cache First
    const cache = readCache();
    if (cache[topic]) {
      console.log(`Serving ${topic} from Cache!`);
      return res.json({ text: cache[topic].text });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ msg: 'GEMINI_API_KEY is not configured on the server.' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are an expert Data Structures & Algorithms instructor, Senior Software Engineer, and Technical Interview Mentor with over 15 years of experience teaching beginners, college students, and software engineers.
Your task is to generate a COMPLETE, HIGH-QUALITY learning module for the DSA topic provided.
The explanation should be suitable for complete beginners while also preparing learners for coding interviews at companies like Google, Microsoft, Amazon, Meta, Adobe, Atlassian, Netflix, Uber, and other top product companies.
Do NOT assume the learner has prior knowledge unless listed in the prerequisites.
The content should be interactive, engaging, visually descriptive, logically structured, and progressively build the learner's understanding from intuition to mastery.

TOPIC: ${topic}

Generate the lesson using ALL of the following 32 sections in order. Use Markdown formatting.
1. Topic Overview
2. Learning Objectives
3. Prerequisites
4. Real World Problem
5. Why Do We Need This?
6. Intuition
7. Real-Life Analogy
8. Visual Representation
9. Formal Definition
10. Internal Working
11. Properties
12. Operations
13. Dry Run
14. Code Implementation
15. Complexity Analysis
16. Advantages
17. Disadvantages
18. When To Use
19. When NOT To Use
20. Edge Cases
21. Common Mistakes
22. Comparison
23. Pattern Recognition
24. Interview Perspective
25. Real World Applications
26. Practice Problems
27. Quiz
28. Cheatsheet
29. Revision Notes
30. Frequently Asked Questions
31. Summary
32. Next Topic Recommendation
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Save to Cache before returning
    cache[topic] = { text };
    writeCache(cache);

    res.json({ text });
  } catch (err) {
    console.error('AI Error:', err.message);
    if (err.status === 429 || (err.message && err.message.includes('429'))) {
      return res.status(429).json({ msg: 'Rate limit exceeded. Please wait 1 minute.' });
    }
    res.status(500).json({ msg: 'Failed to generate AI content.' });
  }
});

module.exports = router;
