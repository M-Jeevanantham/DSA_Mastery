require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Extract all 120 topics from the PHASES array (hardcoded for the script)
const PHASES = [
  {secs:[{items:['Big O notation','Big Theta & Omega','Best/avg/worst case','Amortized analysis','Master theorem','Recurrence relations']},{items:['Base & recursive case','Call stack depth','Memoization','Tail recursion','Recursion to iteration','Tree recursion']},{items:['Number systems','Bit manipulation','Modular arithmetic','GCD/LCM Euclidean','Modular exponentiation','Overflow & limits']}]},
  {secs:[{items:['Prefix sum','Sliding window fixed','Sliding window variable','Two pointers','Kadane\'s algorithm','Dutch national flag','Merge intervals']},{items:['String hashing','KMP algorithm','Z-algorithm','Rabin-Karp','Manacher\'s','Aho-Corasick','Suffix array']},{items:['Singly & doubly LL','Slow-fast pointers','Floyd\'s cycle detection','Reverse linked list','Merge sorted lists','LRU cache','Clone with random ptr']},{items:['Monotonic stack','Next greater element','Valid parentheses','Min stack','Largest rect histogram','Basic calculator']},{items:['Circular queue','Deque sliding window max','BFS queue','Priority queue','Stack using queues']}]},
  {secs:[{items:['Inorder/pre/postorder','Level-order BFS','Height & diameter','LCA','Morris traversal','Serialize/deserialize','Vertical order']},{items:['BST insert/delete/search','Validate BST','Kth smallest in BST','AVL rotations','Red-Black concept','B-tree concept']},{items:['Min/max heap','Heapify & heap sort','K-th largest/smallest','Merge K sorted lists','Median of stream','Top K frequent']},{items:['Trie insert & search','Prefix matching','XOR max pair','Compressed trie','Aho-Corasick']},{items:['Range sum query','Lazy propagation','Persistent segment tree','Fenwick tree BIT','Sparse table RMQ']},{items:['BFS & DFS','Cycle detection directed','Cycle detection undirected','Bipartite check','Topological sort Kahn','Topological sort DFS','SCC Kosaraju','SCC Tarjan','Bridges','Articulation points','Euler path']}]},
  {secs:[{items:['Bubble/selection/insertion','Merge sort','Quick sort','Heap sort','Counting sort','Radix sort','Bucket sort','Tim sort concept']},{items:['Activity selection','Fractional knapsack','Huffman encoding','Job scheduling','Interval scheduling','Jump game','Gas station','Meeting rooms']},{items:['Merge sort D&C','Quick select','Closest pair of points','Karatsuba multiplication','FFT concept']},{items:['Backtracking template','N-Queens','Sudoku solver','Permutations','Subsets/power set','Combination sum','Palindrome partition','Word search','Hamiltonian path']}]},
  {secs:[{items:['Memoization vs tabulation','State definition','Recurrence relation','Space optimisation','Printing DP path','Top-down vs bottom-up']},{items:['Coin change','Unique paths','Min path sum','Wildcard matching','Regex match','LCS','Edit distance','LPS','House robber']},{items:['0/1 knapsack','Unbounded knapsack','Subset sum','Partition equal subset','Target sum','Rod cutting','Count subsets sum K']},{items:['LIS O(n^2)','LIS O(n log n)','Matrix chain multiplication','Burst balloons','Russian doll envelopes']},{items:['Interval DP','Tree DP','Digit DP','Bitmask DP','DP on graphs','Convex hull trick','D&C DP optimisation']}]},
  {secs:[{items:['Dijkstra\'s algorithm','Bellman-Ford','SPFA','Floyd-Warshall','0-1 BFS','A* algorithm','Johnson\'s']},{items:['Kruskal\'s','Prim\'s','Dinic\'s max flow','Edmonds-Karp','Bipartite matching','Hungarian algorithm']},{items:['Sieve of Eratosthenes','Linear sieve','Euler\'s totient','Extended Euclidean','Modular inverse','CRT','Fermat\'s theorem','Miller-Rabin']},{items:['Union-Find DSU','DSU with rollback','Sqrt decomposition','Mo\'s algorithm','Heavy-light decomposition','Centroid decomposition','Bloom filter','Skip list']}]}
];

let topics = [];
PHASES.forEach(p => p.secs.forEach(s => s.items.forEach(i => topics.push(i))));

const OUTPUT_PATH = path.join(__dirname, '../frontend/src/data/generatedLessons.json');

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function run() {
  console.log(`Found ${topics.length} topics to generate.`);
  
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("Missing GEMINI_API_KEY");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  let cache = {};
  if (fs.existsSync(OUTPUT_PATH)) {
    try { cache = JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf-8')); } catch (e) {}
  }

  for (let i = 0; i < topics.length; i++) {
    const topic = topics[i];
    if (cache[topic] && cache[topic].text && !cache[topic].text.includes("generating the detailed")) {
      console.log(`[${i+1}/${topics.length}] Skipping ${topic} (Already exists)`);
      continue;
    }

    console.log(`[${i+1}/${topics.length}] Generating 14-step lesson for ${topic}...`);
    const prompt = `You are an expert Data Structures and Algorithms tutor. 
Please teach the concept of "${topic}" from scratch, using the following 14-step teaching framework. Format your response beautifully in Markdown.

1. Problem Statement (WHY?): Start with a real-world problem to explain WHY this concept was invented. Don't start with a definition.
2. Real Life Analogy: Give a highly relatable real-world analogy.
3. Visual Representation: Use ASCII art or markdown code blocks to visually represent the data structure or algorithm.
4. Formal Definition: Give the standard textbook definition now that the intuition is built.
5. Internal Working: Explain how it works in memory or under the hood.
6. Operations: List the main operations (e.g. Insert, Delete, Search) and what happens.
7. Dry Run (Most Important): Take one specific example and trace it step-by-step.
8. Time & Space Complexity: Don't just state the Big-O, explain WHY it is that complexity based on the operations.
9. Code Walkthrough: Provide a clean code snippet (JavaScript or Python) and explain it line-by-line.
10. Common Mistakes: List frequent errors beginners make with this concept.
11. Interview Perspective: What do interviewers actually ask about this? Name 2-3 popular LeetCode questions that use it.
12. Pattern Recognition: Explain the core pattern to recognize when to use this in an interview.
13. Comparison: Compare it with a similar concept (e.g. Array vs Linked List, BFS vs DFS) using a markdown table.
14. Practice Progression: Give a quick 3-step action plan on how to practice this topic.`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      cache[topic] = { text, complexity: 'N/A' };
      fs.writeFileSync(OUTPUT_PATH, JSON.stringify(cache, null, 2));
      console.log(` => Success! Wrote to cache.`);
    } catch (err) {
      console.error(` => ERROR for ${topic}:`, err.message);
    }

    // Wait 5 seconds to respect 15 Requests Per Minute limit (60 / 15 = 4, +1 for safety)
    await sleep(5000);
  }

  console.log('Finished generating all lessons!');
}

run();
