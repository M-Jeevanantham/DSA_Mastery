export const QUIZ = [
  {
    id: 1, phase: "Phase 1 – Foundations",
    q: "What is the time complexity of accessing an element in a Hash Table?",
    opts: ["O(log N)", "O(N)", "O(1)", "O(N²)"],
    ans: 2,
    exp: "Hash Tables achieve O(1) average-case lookup by computing a hash of the key to find its bucket directly."
  },
  {
    id: 2, phase: "Phase 1 – Foundations",
    q: "Which Big O is typically best for sorting algorithms?",
    opts: ["O(N)", "O(N log N)", "O(N²)", "O(log N)"],
    ans: 1,
    exp: "O(N log N) is the theoretical lower bound for comparison-based sorting (Merge sort, Heap sort achieve this)."
  },
  {
    id: 3, phase: "Phase 1 – Foundations",
    q: "What does A XOR A equal for any integer A?",
    opts: ["A", "1", "0", "2A"],
    ans: 2,
    exp: "XORing a number with itself always results in 0, since every bit cancels out. This is used to find unique numbers."
  },
  {
    id: 4, phase: "Phase 2 – Linear DS",
    q: "What is the time complexity to insert an element at the HEAD of a Linked List?",
    opts: ["O(N)", "O(log N)", "O(N²)", "O(1)"],
    ans: 3,
    exp: "Inserting at the head only requires updating the head pointer, which is a constant-time O(1) operation."
  },
  {
    id: 5, phase: "Phase 2 – Linear DS",
    q: "Which data structure is best for implementing a BFS traversal?",
    opts: ["Stack", "Queue", "Array", "Heap"],
    ans: 1,
    exp: "BFS uses a Queue (FIFO). We enqueue neighbors and dequeue them to process them level by level."
  },
  {
    id: 6, phase: "Phase 2 – Linear DS",
    q: "What is the worst-case time complexity of accessing an element in an Array?",
    opts: ["O(1)", "O(N)", "O(log N)", "O(N²)"],
    ans: 0,
    exp: "Arrays have O(1) access because elements are stored contiguously in memory and you can compute the address directly."
  },
  {
    id: 7, phase: "Phase 3 – Non-linear DS",
    q: "In a Binary Search Tree (BST), what is the average time complexity of search?",
    opts: ["O(N)", "O(N²)", "O(log N)", "O(1)"],
    ans: 2,
    exp: "In a balanced BST, each comparison eliminates half the remaining nodes, giving O(log N) average time."
  },
  {
    id: 8, phase: "Phase 3 – Non-linear DS",
    q: "Which traversal of a BST gives nodes in sorted order?",
    opts: ["Pre-order", "Post-order", "In-order", "Level-order"],
    ans: 2,
    exp: "In-order traversal (Left → Root → Right) visits BST nodes in ascending sorted order."
  },
  {
    id: 9, phase: "Phase 3 – Non-linear DS",
    q: "What is the time complexity to find the minimum element in a Min-Heap?",
    opts: ["O(N)", "O(log N)", "O(N log N)", "O(1)"],
    ans: 3,
    exp: "The minimum element is always at the root of a Min-Heap, so it can be accessed in O(1) constant time."
  },
  {
    id: 10, phase: "Phase 4 – Core Algorithms",
    q: "What is the worst-case time complexity of QuickSort?",
    opts: ["O(N log N)", "O(N²)", "O(log N)", "O(N)"],
    ans: 1,
    exp: "QuickSort degrades to O(N²) when the pivot is always the smallest or largest element (e.g., sorted input without random pivot)."
  },
  {
    id: 11, phase: "Phase 4 – Core Algorithms",
    q: "Which paradigm does Dijkstra's algorithm primarily use?",
    opts: ["Dynamic Programming", "Backtracking", "Greedy", "Divide & Conquer"],
    ans: 2,
    exp: "Dijkstra is a greedy algorithm — at each step it picks the unvisited node with the smallest known distance."
  },
  {
    id: 12, phase: "Phase 4 – Core Algorithms",
    q: "What is the space complexity of Merge Sort?",
    opts: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
    ans: 2,
    exp: "Merge Sort requires O(N) extra space for the temporary arrays used during the merge step."
  },
  {
    id: 13, phase: "Phase 5 – Dynamic Programming",
    q: "What are the two essential properties of a problem solvable by DP?",
    opts: ["Greedy choice and optimality", "Optimal substructure and overlapping subproblems", "Recursion and memoization", "Divide and merge"],
    ans: 1,
    exp: "A problem must have Optimal Substructure (optimal solution built from sub-solutions) and Overlapping Subproblems (same sub-problems solved repeatedly)."
  },
  {
    id: 14, phase: "Phase 5 – Dynamic Programming",
    q: "In the Climbing Stairs problem (1 or 2 steps at a time), what is dp[5]?",
    opts: ["5", "8", "10", "13"],
    ans: 1,
    exp: "dp[1]=1, dp[2]=2, dp[3]=3, dp[4]=5, dp[5]=8. The pattern is Fibonacci: dp[n] = dp[n-1] + dp[n-2]."
  },
  {
    id: 15, phase: "Phase 5 – Dynamic Programming",
    q: "What is the time complexity of the standard Longest Common Subsequence (LCS) DP algorithm?",
    opts: ["O(N + M)", "O(N log N)", "O(N × M)", "O(2^N)"],
    ans: 2,
    exp: "LCS fills an N×M table, one cell per unique pair of characters. Time is O(N × M) where N and M are the string lengths."
  },
  {
    id: 16, phase: "Phase 6 – Advanced",
    q: "Which algorithm finds the Minimum Spanning Tree (MST) of a graph?",
    opts: ["Dijkstra", "Bellman-Ford", "Kruskal's", "Floyd-Warshall"],
    ans: 2,
    exp: "Kruskal's (and Prim's) algorithm finds the MST. It sorts edges by weight and adds them greedily if they don't form a cycle."
  },
  {
    id: 17, phase: "Phase 6 – Advanced",
    q: "Which graph algorithm handles negative edge weights?",
    opts: ["Dijkstra", "BFS", "Prim's", "Bellman-Ford"],
    ans: 3,
    exp: "Bellman-Ford can handle negative edge weights and also detects negative-weight cycles. Dijkstra fails with negative weights."
  },
  {
    id: 18, phase: "Phase 6 – Advanced",
    q: "What is the time complexity of Union-Find (with path compression + union by rank)?",
    opts: ["O(N)", "O(log N)", "O(α(N)) ≈ O(1)", "O(N log N)"],
    ans: 2,
    exp: "With path compression and union by rank, Union-Find runs in near-constant amortized time O(α(N)), where α is the inverse Ackermann function."
  },
  {
    id: 19, phase: "Phase 6 – Advanced",
    q: "What does a Trie (Prefix Tree) excel at?",
    opts: ["Shortest paths", "String prefix searches and autocomplete", "Graph traversal", "Sorting"],
    ans: 1,
    exp: "Tries store strings character by character, making prefix searches and autocomplete extremely efficient (O(L) where L is the word length)."
  },
  {
    id: 20, phase: "Phase 3 – Non-linear DS",
    q: "Which algorithm detects a cycle in a Linked List in O(1) space?",
    opts: ["BFS", "DFS", "Floyd's Cycle Detection (slow/fast pointers)", "Hash Set Traversal"],
    ans: 2,
    exp: "Floyd's algorithm uses two pointers — slow (1 step) and fast (2 steps). If they meet, a cycle exists. This uses O(1) space."
  }
];
