export const LESSONS = {
  p1: [
    {
      id: "big-o",
      title: "Big O Notation & Time Complexity",
      explanation: "Big O notation is used to classify algorithms according to how their run time or space requirements grow as the input size grows.",
      insight: "Always drop constants and non-dominant terms. O(2N + 1000) is just O(N).",
      code: `// O(1) - Constant
function getFirst(arr) {
  return arr[0];
}

// O(N) - Linear
function printAll(arr) {
  for(let i=0; i<arr.length; i++) {
    console.log(arr[i]);
  }
}`,
      complexity: "Time: Varies | Space: O(1)",
      widget: "big-o-visualizer"
    },
    {
      id: "bit-manipulation",
      title: "Bit Manipulation Basics",
      explanation: "Computers store data in binary (0s and 1s). Bit manipulation allows us to perform operations on these bits directly, which is extremely fast.",
      insight: "XORing a number with itself gives 0 (A ^ A = 0). This is useful for finding unique numbers.",
      code: `// Check if number is even or odd
function isEven(n) {
  return (n & 1) === 0;
}

// Multiply by 2 using left shift
function multiplyByTwo(n) {
  return n << 1;
}`,
      complexity: "Time: O(1) | Space: O(1)",
      widget: "bit-playground"
    },
    {
      id: "number-systems",
      title: "Number Systems & Bases",
      explanation: "Converting between base-10 (decimal), base-2 (binary), and base-16 (hexadecimal) is fundamental for low-level algorithm design.",
      insight: "To convert decimal to binary, repeatedly divide by 2 and keep the remainders.",
      code: `// Decimal to Binary string
let decimal = 42;
let binary = decimal.toString(2); // "101010"

// Binary to Decimal
let backToDec = parseInt("101010", 2); // 42`,
      complexity: "Time: O(log N) | Space: O(log N)",
      widget: "base-converter"
    }
  ],
  p2: [
    {
      id: "arrays-memory",
      title: "Arrays & Memory Allocation",
      explanation: "Arrays occupy contiguous memory. This allows for O(1) random access, but makes insertions/deletions in the middle O(N) because elements must be shifted.",
      insight: "Two-pointer techniques are the most common pattern for solving array problems without extra space.",
      code: `// Reversing an array in-place (Two Pointers)
function reverseArray(arr) {
  let left = 0, right = arr.length - 1;
  while(left < right) {
    let temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++; right--;
  }
  return arr;
}`,
      complexity: "Time: O(N) | Space: O(1)"
    },
    {
      id: "sliding-window",
      title: "Sliding Window Pattern",
      explanation: "A subset of the two-pointer technique where we maintain a 'window' that satisfies a certain condition. Great for finding subarrays or substrings.",
      insight: "If the problem asks for 'longest/shortest/maximum subarray/substring', sliding window is usually the answer.",
      code: `// Max sum subarray of size K
function maxSum(arr, k) {
  let maxSum = 0, windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += arr[i];
  maxSum = windowSum;
  
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}`,
      complexity: "Time: O(N) | Space: O(1)"
    },
    {
      id: "linked-list",
      title: "Linked Lists Basics",
      explanation: "A linear data structure where elements are not stored in contiguous memory. Each element points to the next.",
      insight: "Use the 'slow and fast pointer' (Floyd's algorithm) to find the middle or detect cycles in O(1) space.",
      code: `// Detect cycle in a linked list
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
      complexity: "Time: O(N) | Space: O(1)"
    }
  ],
  p3: [
    {
      id: "binary-trees",
      title: "Binary Trees & Traversals",
      explanation: "A tree where each node has at most two children. Traversals (Pre-order, In-order, Post-order) determine the order nodes are visited.",
      insight: "In-order traversal of a Binary Search Tree (BST) visits the nodes in perfectly sorted order.",
      code: `// In-order Traversal (Left, Root, Right)
function inorder(root, result = []) {
  if (root) {
    inorder(root.left, result);
    result.push(root.val);
    inorder(root.right, result);
  }
  return result;
}`,
      complexity: "Time: O(N) | Space: O(H) recursive stack"
    },
    {
      id: "bfs",
      title: "Breadth-First Search (BFS)",
      explanation: "Explores the tree or graph level by level. It uses a Queue to keep track of the next nodes to visit.",
      insight: "BFS is guaranteed to find the shortest path in an unweighted graph.",
      code: `// Level-order Traversal (BFS)
function bfs(root) {
  if (!root) return [];
  const queue = [root], result = [];
  
  while (queue.length) {
    const node = queue.shift(); // Dequeue
    result.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return result;
}`,
      complexity: "Time: O(N) | Space: O(W) max width"
    },
    {
      id: "heaps",
      title: "Heaps (Priority Queues)",
      explanation: "A specialized tree-based structure that satisfies the heap property. Min-Heap: parent is always smaller than children.",
      insight: "If you need to repeatedly find the 'Kth largest/smallest' or track the 'Top K', use a Heap of size K.",
      code: `// (Concept) Inserting into a Min-Heap
function insert(val) {
  heap.push(val);
  bubbleUp(heap.length - 1);
}

// Parent index calculation
const parent = (i) => Math.floor((i - 1) / 2);`,
      complexity: "Insert/Extract: O(log N) | Peek: O(1)"
    }
  ],
  p4: [
    {
      id: "sorting-merge",
      title: "Merge Sort (Divide & Conquer)",
      explanation: "A stable, comparison-based sorting algorithm. It divides the array into halves, sorts them, and then merges them back together.",
      insight: "Merge sort is heavily used for sorting Linked Lists because it doesn't require random access like QuickSort.",
      code: `// The Merge Step
function merge(left, right) {
  let res = [], i = 0, j = 0;
  while(i < left.length && j < right.length) {
    if(left[i] < right[j]) res.push(left[i++]);
    else res.push(right[j++]);
  }
  return [...res, ...left.slice(i), ...right.slice(j)];
}`,
      complexity: "Time: O(N log N) | Space: O(N)"
    },
    {
      id: "greedy",
      title: "Greedy Algorithms",
      explanation: "Makes the locally optimal choice at each step with the hope of finding a global optimum.",
      insight: "Always consider sorting the input first. Greedy algorithms usually depend on a specific sorted order.",
      code: `// Activity Selection Problem
// Sort by finish time, then pick non-overlapping
activities.sort((a, b) => a.finish - b.finish);
let count = 1, lastFinish = activities[0].finish;

for(let i = 1; i < activities.length; i++) {
  if (activities[i].start >= lastFinish) {
    count++;
    lastFinish = activities[i].finish;
  }
}`,
      complexity: "Time: O(N log N) (due to sorting) | Space: O(1)"
    }
  ],
  p5: [
    {
      id: "dp-intro",
      title: "Dynamic Programming Foundations",
      explanation: "An optimization over plain recursion. Whenever we see a recursive solution that has repeated calls for the same inputs, we can optimize it using DP.",
      insight: "Top-down DP uses memoization (a cache). Bottom-up DP builds the answer iteratively using a table.",
      code: `// Memoized Fibonacci (Top-Down DP)
const memo = {};
function fib(n) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  memo[n] = fib(n - 1) + fib(n - 2);
  return memo[n];
}`,
      complexity: "Time: O(N) | Space: O(N)"
    },
    {
      id: "dp-knapsack",
      title: "0/1 Knapsack Pattern",
      explanation: "Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total value. You can either pick an item (1) or not pick it (0).",
      insight: "The state usually requires two variables: current item index (i) and remaining capacity (w).",
      code: `// 2D Tabulation (Bottom-Up)
for (let i = 1; i <= n; i++) {
  for (let w = 1; w <= capacity; w++) {
    if (weights[i-1] <= w) {
      dp[i][w] = Math.max(
        values[i-1] + dp[i-1][w - weights[i-1]], 
        dp[i-1][w]
      );
    } else {
      dp[i][w] = dp[i-1][w];
    }
  }
}`,
      complexity: "Time: O(N * W) | Space: O(N * W)"
    }
  ],
  p6: [
    {
      id: "dijkstra",
      title: "Dijkstra's Algorithm",
      explanation: "Finds the shortest path from a starting node to all other nodes in a graph with non-negative edge weights.",
      insight: "Instead of a standard Queue, Dijkstra requires a Priority Queue (Min-Heap) to always process the closest unvisited node next.",
      code: `// Conceptual loop
while (!pq.isEmpty()) {
  const { node, dist } = pq.extractMin();
  if (visited.has(node)) continue;
  visited.add(node);
  
  for (let neighbor of graph[node]) {
    let newDist = dist + neighbor.weight;
    if (newDist < distances[neighbor.id]) {
      distances[neighbor.id] = newDist;
      pq.insert({ node: neighbor.id, dist: newDist });
    }
  }
}`,
      complexity: "Time: O((V + E) log V) | Space: O(V)"
    },
    {
      id: "union-find",
      title: "Disjoint Set (Union-Find)",
      explanation: "A data structure that keeps track of a set of elements partitioned into disjoint subsets. Excellent for finding connected components or checking if a cycle exists.",
      insight: "Always implement 'Path Compression' and 'Union by Rank' to achieve near O(1) time complexity.",
      code: `// Find with Path Compression
function find(i, parent) {
  if (parent[i] === i) return i;
  parent[i] = find(parent[i], parent); // compress
  return parent[i];
}

// Union
function union(i, j, parent) {
  let rootI = find(i, parent);
  let rootJ = find(j, parent);
  if (rootI !== rootJ) parent[rootI] = rootJ;
}`,
      complexity: "Time: O(α(N)) ≈ O(1) amortized | Space: O(N)"
    }
  ]
};
