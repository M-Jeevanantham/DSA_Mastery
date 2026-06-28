const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// We are saving directly to the frontend's generatedLessons.json so the UI sees it instantly
const OUT_FILE = path.join(__dirname, '../../frontend/src/data/generatedLessons.json');

const TOPICS = [
  // Phase 1
  'Big O notation', 'Big Theta & Omega', 'Best/avg/worst case', 'Amortized analysis', 'Master theorem', 'Recurrence relations',
  'Base & recursive case', 'Call stack depth', 'Memoization', 'Tail recursion', 'Recursion to iteration', 'Tree recursion',
  'Number systems', 'Bit manipulation', 'Modular arithmetic', 'GCD/LCM Euclidean', 'Modular exponentiation', 'Overflow & limits',
  // Phase 2
  'Prefix sum', 'Sliding window fixed', 'Sliding window variable', 'Two pointers', 'Kadane\'s algorithm', 'Dutch national flag', 'Merge intervals',
  'String hashing', 'KMP algorithm', 'Z-algorithm', 'Rabin-Karp', 'Manacher\'s', 'Aho-Corasick', 'Suffix array',
  'Singly & doubly LL', 'Slow-fast pointers', 'Floyd\'s cycle detection', 'Reverse linked list', 'Merge sorted lists', 'LRU cache', 'Clone with random ptr',
  'Monotonic stack', 'Next greater element', 'Valid parentheses', 'Min stack', 'Largest rect histogram', 'Basic calculator',
  'Circular queue', 'Deque sliding window max', 'BFS queue', 'Priority queue', 'Stack using queues',
  // Phase 3
  'Inorder/pre/postorder', 'Level-order BFS', 'Height & diameter', 'LCA', 'Morris traversal', 'Serialize/deserialize', 'Vertical order',
  'BST insert/delete/search', 'Validate BST', 'Kth smallest in BST', 'AVL rotations', 'Red-Black concept', 'B-tree concept',
  'Min/max heap', 'Heapify & heap sort', 'K-th largest/smallest', 'Merge K sorted lists', 'Median of stream', 'Top K frequent',
  'Trie insert & search', 'Prefix matching', 'XOR max pair', 'Compressed trie',
  'Range sum query', 'Lazy propagation', 'Persistent segment tree', 'Fenwick tree BIT', 'Sparse table RMQ',
  'BFS & DFS', 'Cycle detection directed', 'Cycle detection undirected', 'Bipartite check', 'Topological sort Kahn', 'Topological sort DFS', 'SCC Kosaraju', 'SCC Tarjan', 'Bridges', 'Articulation points', 'Euler path',
  // Phase 4
  'Bubble/selection/insertion', 'Merge sort', 'Quick sort', 'Heap sort', 'Counting sort', 'Radix sort', 'Bucket sort', 'Tim sort concept',
  'Activity selection', 'Fractional knapsack', 'Huffman encoding', 'Job scheduling', 'Interval scheduling', 'Jump game', 'Gas station', 'Meeting rooms',
  'Merge sort D&C', 'Quick select', 'Closest pair of points', 'Karatsuba multiplication', 'FFT concept',
  'Backtracking template', 'N-Queens', 'Sudoku solver', 'Permutations', 'Subsets/power set', 'Combination sum', 'Palindrome partition', 'Word search', 'Hamiltonian path',
  // Phase 5
  'Memoization vs tabulation', 'State definition', 'Recurrence relation', 'Space optimisation', 'Printing DP path', 'Top-down vs bottom-up',
  'Coin change', 'Unique paths', 'Min path sum', 'Wildcard matching', 'Regex match', 'LCS', 'Edit distance', 'LPS', 'House robber',
  '0/1 knapsack', 'Unbounded knapsack', 'Subset sum', 'Partition equal subset', 'Target sum', 'Rod cutting', 'Count subsets sum K',
  'LIS O(n^2)', 'LIS O(n log n)', 'Matrix chain multiplication', 'Burst balloons', 'Russian doll envelopes',
  'Interval DP', 'Tree DP', 'Digit DP', 'Bitmask DP', 'DP on graphs', 'Convex hull trick', 'D&C DP optimisation',
  // Phase 6
  'Dijkstra\'s algorithm', 'Bellman-Ford', 'SPFA', 'Floyd-Warshall', '0-1 BFS', 'A* algorithm', 'Johnson\'s',
  'Kruskal\'s', 'Prim\'s', 'Dinic\'s max flow', 'Edmonds-Karp', 'Bipartite matching', 'Hungarian algorithm',
  'Sieve of Eratosthenes', 'Linear sieve', 'Euler\'s totient', 'Extended Euclidean', 'Modular inverse', 'CRT', 'Fermat\'s theorem', 'Miller-Rabin',
  'Union-Find DSU', 'DSU with rollback', 'Sqrt decomposition', 'Mo\'s algorithm', 'Heavy-light decomposition', 'Centroid decomposition', 'Bloom filter', 'Skip list'
];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const getMasterPrompt = (topic) => `You are an expert Data Structures & Algorithms instructor, Senior Software Engineer, and Technical Interview Mentor with over 15 years of experience teaching beginners, college students, and software engineers.
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

async function run() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set in backend/.env!");
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  // Using flash model for speed
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  let existingData = {};
  if (fs.existsSync(OUT_FILE)) {
    try {
      existingData = JSON.parse(fs.readFileSync(OUT_FILE, 'utf-8'));
    } catch (e) {
      console.warn("Could not parse existing generatedLessons.json, starting fresh.");
    }
  }

  let successCount = 0;
  let skipCount = 0;

  console.log(`Starting bulk generation for ${TOPICS.length} topics...`);

  for (let i = 0; i < TOPICS.length; i++) {
    const topic = TOPICS[i];

    // Check if we already successfully generated this topic
    if (existingData[topic] && existingData[topic].text && !existingData[topic].text.includes("generating the detailed")) {
      console.log(`[${i + 1}/${TOPICS.length}] Skipped (Already exists): ${topic}`);
      skipCount++;
      continue;
    }

    console.log(`[${i + 1}/${TOPICS.length}] Generating: ${topic}...`);
    try {
      const result = await model.generateContent(getMasterPrompt(topic));
      const response = await result.response;
      const text = response.text();

      // Attempt to extract a complexity string if possible, otherwise N/A
      let complexity = 'N/A';
      
      existingData[topic] = { text, complexity };
      
      // Save incrementally so we never lose data
      fs.writeFileSync(OUT_FILE, JSON.stringify(existingData, null, 2));
      successCount++;
      
      console.log(`   -> Success! Saved ${topic}. Waiting 5 seconds before next request...`);
      await sleep(5000); // 5-second sleep to avoid hitting API rate limits aggressively

    } catch (error) {
      console.error(`   -> Failed generating ${topic}:`, error.message);
      
      if (error.status === 429 || (error.message && error.message.includes('429'))) {
        console.log("   -> Rate limit hit! Sleeping for 60 seconds...");
        await sleep(60000);
        i--; // decrement i to retry this topic on the next iteration
      } else {
        console.log("   -> Sleeping for 10 seconds before next request due to unknown error...");
        await sleep(10000);
      }
    }
  }

  console.log('====================================');
  console.log(`Bulk Generation Complete!`);
  console.log(`Successfully Generated: ${successCount}`);
  console.log(`Skipped (Already Existed): ${skipCount}`);
  console.log('====================================');
}

run();
