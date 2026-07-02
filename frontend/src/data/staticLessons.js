import generatedData from './generatedLessons.json';

export const STATIC_LESSONS = {
  // ------------------------- PHASE 1 -------------------------
  'Big O notation': { text: 'Big O notation is used in Computer Science to describe the performance or complexity of an algorithm. It specifically describes the worst-case scenario, and can be used to describe the execution time required or the space used (e.g. in memory or on disk) by an algorithm.', complexity: 'N/A' },
  'Big Theta & Omega': { text: 'Big Omega describes the best-case scenario (lower bound) of an algorithm, while Big Theta describes the exact bound (when best and worst case are the same).', complexity: 'N/A' },
  'Best/avg/worst case': { text: 'Algorithms perform differently depending on the input. Worst case (Big O) is the maximum time taken. Average case is expected time. Best case is minimum time taken.', complexity: 'N/A' },
  'Amortized analysis': { text: 'Amortized analysis considers both the costly and less costly operations together over a whole sequence of operations. It is often used for dynamic arrays where resizing is expensive but rare.', complexity: 'N/A' },
  'Master theorem': { text: 'The Master Theorem provides a cookbook solution for solving recurrence relations of the form T(n) = aT(n/b) + f(n), common in divide and conquer algorithms.', complexity: 'N/A' },
  'Recurrence relations': { text: 'An equation that recursively defines a sequence or multidimensional array of values, once one or more initial terms are given. Used heavily in DP and recursion analysis.', complexity: 'N/A' },
  'Base & recursive case': { text: 'The base case is the condition that stops the recursion. The recursive case is the part of the function that calls itself with a modified parameter.', complexity: 'N/A' },
  'Call stack depth': { text: 'Every time a function calls itself, a new frame is added to the call stack in memory. The maximum depth it can go before overflowing is the stack depth limit.', complexity: 'Space: O(N)' },
  'Memoization': { text: 'An optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.', complexity: 'N/A' },
  'Tail recursion': { text: 'A recursive function where the recursive call is the absolute last operation in the function. Some compilers optimize this to avoid adding a new stack frame.', complexity: 'N/A' },
  'Recursion to iteration': { text: 'Any recursive algorithm can be rewritten iteratively using a loop and a manual Stack data structure. This saves memory by avoiding the call stack.', complexity: 'N/A' },
  'Tree recursion': { text: 'When a recursive function calls itself multiple times within the same function execution, creating a branching tree of calls (like calculating Fibonacci).', complexity: 'Time: O(2^N)' },
  'Number systems': { text: 'Computers use Binary (base-2). Humans use Decimal (base-10). Memory addresses often use Hexadecimal (base-16). Understanding conversions is critical for systems programming.', complexity: 'N/A' },
  'Bit manipulation': { text: 'Performing logical operations directly on the individual bits of a number using operators like AND (&), OR (|), XOR (^), and shifts (<<, >>). Extremely fast.', complexity: 'Time: O(1)' },
  'Modular arithmetic': { text: 'Arithmetic that wraps around upon reaching a certain value (the modulus). Essential in cryptography and preventing integer overflow in large calculations.', complexity: 'N/A' },
  'GCD/LCM Euclidean': { text: 'The Euclidean algorithm is an efficient method for computing the greatest common divisor (GCD) of two integers. LCM can be derived using (A * B) / GCD.', complexity: 'Time: O(log(min(a,b)))' },
  'Modular exponentiation': { text: 'Calculating (base^exponent) % modulus efficiently without calculating the massive base^exponent number first, preventing overflow.', complexity: 'Time: O(log(exponent))' },
  'Overflow & limits': { text: 'Standard 32-bit integers overflow at 2,147,483,647. When dealing with larger numbers, use 64-bit integers (long) or BigInt to avoid silent rollover bugs.', complexity: 'N/A' },

  // ------------------------- PHASE 2 -------------------------
  'Prefix sum': { text: 'A technique where you precompute the cumulative sum of elements in an array. This allows you to find the sum of any subarray in O(1) time instead of O(N).', complexity: 'Time: O(N) prep, O(1) query' },
  'Sliding window fixed': { text: 'A subset of the two-pointer technique where the distance between the two pointers remains constant. Useful for finding max sum subarrays of size K.', complexity: 'Time: O(N)' },
  'Sliding window variable': { text: 'The window size dynamically grows and shrinks based on a specific condition. Useful for problems like finding the longest substring without repeating characters.', complexity: 'Time: O(N)' },
  'Two pointers': { text: 'Iterating through a data structure with two pointers simultaneously (usually from opposite ends or moving at different speeds) to save time/space.', complexity: 'Time: O(N)' },
  'Kadane\'s algorithm': { text: 'An elegant dynamic programming algorithm used to find the maximum sum of a contiguous subarray in an array of numbers.', complexity: 'Time: O(N)' },
  'Dutch national flag': { text: 'An algorithm by Edsger Dijkstra to sort an array containing 3 distinct values (like 0, 1, 2) in a single pass using three pointers.', complexity: 'Time: O(N)' },
  'Merge intervals': { text: 'Sorting a list of intervals by start time, then iterating through to merge any intervals that overlap. A classic scheduling pattern.', complexity: 'Time: O(N log N)' },
  'String hashing': { text: 'Converting a string into an integer hash value to compare strings in O(1) time instead of O(L) time. Common in pattern matching algorithms.', complexity: 'Time: O(N) prep, O(1) match' },
  'KMP algorithm': { text: 'Knuth-Morris-Pratt is a string matching algorithm that precomputes an LPS (Longest Prefix Suffix) array to avoid re-evaluating matched characters.', complexity: 'Time: O(N + M)' },
  'Z-algorithm': { text: 'Computes an array where Z[i] is the length of the longest substring starting from S[i] which is also a prefix of S. Great for pattern matching.', complexity: 'Time: O(N + M)' },
  'Rabin-Karp': { text: 'A string searching algorithm that uses hashing (usually rolling hash) to find any one of a set of pattern strings in a text.', complexity: 'Time: O(N + M) avg' },
  'Manacher\'s': { text: 'A clever algorithm to find the longest palindromic substring in linear time by mirroring previously computed palindrome lengths.', complexity: 'Time: O(N)' },
  'Aho-Corasick': { text: 'A string searching algorithm that uses a Trie with failure links to search for multiple patterns simultaneously in a text.', complexity: 'Time: O(N + M + Z)' },
  'Suffix array': { text: 'A sorted array of all suffixes of a string. Often used alongside an LCP (Longest Common Prefix) array to solve complex string problems.', complexity: 'Time: O(N log N)' },
  
  'Singly & doubly LL': { text: 'A Singly Linked List points only to the next node. A Doubly Linked List points to both the next and previous nodes, allowing bidirectional traversal.', complexity: 'Search: O(N)' },
  'Slow-fast pointers': { text: 'A cycle detection technique where one pointer moves 1 step and the other moves 2 steps. If they meet, there is a cycle in the Linked List.', complexity: 'Time: O(N)' },
  'Floyd\'s cycle detection': { text: 'Also known as the Tortoise and Hare algorithm. Uses slow and fast pointers to detect cycles and find the exact node where the cycle begins.', complexity: 'Time: O(N)' },
  'Reverse linked list': { text: 'Changing the next pointers of a linked list to point backwards. This requires maintaining previous, current, and next node references.', complexity: 'Time: O(N)' },
  'Merge sorted lists': { text: 'Iterating through two already sorted linked lists and weaving them together into a single sorted list using dummy nodes.', complexity: 'Time: O(N + M)' },
  'LRU cache': { text: 'Least Recently Used cache discards the least recently used items first. Efficiently implemented using a Hash Map paired with a Doubly Linked List.', complexity: 'Time: O(1) ops' },
  'Clone with random ptr': { text: 'Cloning a linked list where nodes have an extra random pointer. Usually solved using a Hash Map or by weaving cloned nodes next to originals.', complexity: 'Time: O(N)' },

  'Monotonic stack': { text: 'A stack whose elements are always strictly increasing or decreasing. Essential for "Next Greater Element" type problems.', complexity: 'Time: O(N)' },
  'Next greater element': { text: 'Finding the next element in an array that is larger than the current element. Effectively solved in linear time using a Monotonic Stack.', complexity: 'Time: O(N)' },
  'Valid parentheses': { text: 'A classic problem solved by pushing opening brackets onto a stack, and popping them off when a matching closing bracket is encountered.', complexity: 'Time: O(N)' },
  'Min stack': { text: 'A stack that supports push, pop, top, and retrieving the minimum element in constant time. Usually implemented by keeping a parallel stack of minimums.', complexity: 'Time: O(1)' },
  'Largest rect histogram': { text: 'Finding the largest rectangular area in a histogram. Solved efficiently by using a Monotonic Stack to find the left and right smaller elements.', complexity: 'Time: O(N)' },
  'Basic calculator': { text: 'Evaluating a mathematical string expression with brackets, plus, and minus. Solved by pushing numbers and signs to a stack.', complexity: 'Time: O(N)' },
  'Circular queue': { text: 'A queue implementation using an array where the last position connects back to the first, reusing empty spaces efficiently.', complexity: 'Time: O(1)' },
  'Deque sliding window max': { text: 'Using a Double-Ended Queue (Deque) to store indices in a way that the front of the queue always contains the maximum element for the current window.', complexity: 'Time: O(N)' },
  'BFS queue': { text: 'Breadth-First Search relies heavily on a standard Queue data structure to process nodes layer by layer (FIFO order).', complexity: 'Time: O(V + E)' },
  'Priority queue': { text: 'An abstract data type where each element has a priority. Elements with high priority are served before those with low priority. Usually implemented via Heaps.', complexity: 'Time: O(log N) insert/extract' },
  'Stack using queues': { text: 'Implementing LIFO stack behavior using two FIFO queues by pushing to an empty queue, transferring elements, and swapping references.', complexity: 'Time: O(N) push, O(1) pop' },

  // ------------------------- PHASE 3 -------------------------
  'Inorder/pre/postorder': { text: 'Three classic depth-first traversals for binary trees. Inorder (Left, Root, Right), Preorder (Root, Left, Right), and Postorder (Left, Right, Root).', complexity: 'Time: O(N)' },
  'Level-order BFS': { text: 'Traversing a tree layer by layer, from top to bottom, left to right. This is implemented using a Queue data structure.', complexity: 'Time: O(N)' },
  'Height & diameter': { text: 'Height is the longest path from root to leaf. Diameter is the longest path between ANY two nodes in the tree (which may not pass through the root).', complexity: 'Time: O(N)' },
  'LCA': { text: 'Lowest Common Ancestor is the lowest node in a tree that has both node P and node Q as descendants. Can be found using recursion.', complexity: 'Time: O(N)' },
  'Morris traversal': { text: 'A tree traversal algorithm that achieves O(1) space complexity (no recursion or stack) by temporarily modifying the tree to create threaded links.', complexity: 'Time: O(N), Space: O(1)' },
  'Serialize/deserialize': { text: 'Converting a complex tree data structure into a flat string representation (serialization), and converting it back into a tree (deserialization).', complexity: 'Time: O(N)' },
  'Vertical order': { text: 'Traversing a tree vertically from left to right. Solved by assigning horizontal distances (HD) to each node and grouping them in a Hash Map.', complexity: 'Time: O(N log N)' },

  'BST insert/delete/search': { text: 'Binary Search Trees maintain a property where the left child is smaller than the parent, and right is larger. This enables fast lookups.', complexity: 'Time: O(log N) avg' },
  'Validate BST': { text: 'Checking if a tree is a valid BST by recursively ensuring every node falls within a strictly updated min/max boundary.', complexity: 'Time: O(N)' },
  'Kth smallest in BST': { text: 'Since an Inorder traversal of a BST yields a sorted array, finding the Kth smallest element simply means returning the Kth node visited during Inorder traversal.', complexity: 'Time: O(H + K)' },
  'AVL rotations': { text: 'Left and Right tree rotations used in self-balancing AVL trees to ensure the height difference between left and right subtrees is never more than 1.', complexity: 'Time: O(1)' },
  'Red-Black concept': { text: 'A self-balancing BST where nodes are colored red or black, following strict rules to ensure the path from root to leaf is bounded, keeping operations O(log N).', complexity: 'Time: O(log N)' },
  'B-tree concept': { text: 'A generalized self-balancing search tree where nodes can have multiple children. Heavily used in database indexing and file systems.', complexity: 'Time: O(log N)' },

  'Min/max heap': { text: 'A complete binary tree where every parent is smaller (min-heap) or larger (max-heap) than its children. The root is always the extreme element.', complexity: 'Insert: O(log N)' },
  'Heapify & heap sort': { text: 'Heapify is the process of building a heap from an array in O(N) time. Heap sort repeatedly extracts the root to sort the array in O(N log N).', complexity: 'Time: O(N log N)' },
  'K-th largest/smallest': { text: 'Finding the K-th extreme element in an unsorted array. Best solved using a Min-Heap of size K, or QuickSelect.', complexity: 'Time: O(N log K)' },
  'Merge K sorted lists': { text: 'Combining K sorted linked lists into one. Solved optimally by putting the heads of all K lists into a Min-Heap.', complexity: 'Time: O(N log K)' },
  'Median of stream': { text: 'Finding the running median of a stream of numbers. Solved elegantly using two heaps: a Max-Heap for the smaller half, and a Min-Heap for the larger half.', complexity: 'Time: O(log N) per insert' },
  'Top K frequent': { text: 'A pattern that involves counting frequencies using a Hash Map, then pushing those frequencies into a Min-Heap of size K.', complexity: 'Time: O(N log K)' },

  'Trie insert & search': { text: 'A Trie (Prefix Tree) is a tree used for efficient string retrieval. Each node represents a single character. Excellent for autocomplete features.', complexity: 'Time: O(L) where L is length' },
  'Prefix matching': { text: 'Finding if any word in a dictionary starts with a specific prefix. Tries do this in O(PrefixLength) time, much faster than checking every word.', complexity: 'Time: O(L)' },
  'XOR max pair': { text: 'Finding the maximum XOR value of two numbers in an array. Solved by storing binary representations in a Trie and greedily picking opposite bits.', complexity: 'Time: O(N)' },
  'Compressed trie': { text: 'Also known as a Radix Tree. It optimizes space by merging chains of nodes that only have a single child into one node containing a string.', complexity: 'Search: O(L)' },
  
  'Range sum query': { text: 'Finding the sum of elements between two indices in an array, allowing for rapid updates. Best solved using a Segment Tree or Fenwick Tree.', complexity: 'Time: O(log N)' },
  'Lazy propagation': { text: 'An optimization for Segment Trees used when updating a range of values. Instead of updating all children immediately, updates are deferred (lazy) until accessed.', complexity: 'Time: O(log N)' },
  'Persistent segment tree': { text: 'A data structure that preserves previous versions of itself when it is modified. Allows querying the state of the tree at any point in history.', complexity: 'Time: O(log N)' },
  'Fenwick tree BIT': { text: 'Binary Indexed Tree. A space-efficient and simpler alternative to Segment Trees for range sum queries and point updates.', complexity: 'Time: O(log N)' },
  'Sparse table RMQ': { text: 'Used for Range Minimum/Maximum Queries. Precomputes answers for intervals of length 2^k, allowing O(1) queries on static immutable arrays.', complexity: 'Time: O(N log N) prep, O(1) query' },

  'BFS & DFS': { text: 'Breadth-First Search uses a Queue to explore neighbors first. Depth-First Search uses a Stack (or recursion) to explore as deep as possible first.', complexity: 'Time: O(V + E)' },
  'Cycle detection directed': { text: 'Detecting if a cycle exists in a directed graph. Best solved using DFS and keeping a "recursion stack" array to spot back-edges.', complexity: 'Time: O(V + E)' },
  'Cycle detection undirected': { text: 'Detecting cycles in an undirected graph. If DFS/BFS visits a node that is already visited AND is not the parent node, a cycle exists.', complexity: 'Time: O(V + E)' },
  'Bipartite check': { text: 'Checking if graph nodes can be colored using only 2 colors such that no adjacent nodes share a color. Solved via BFS/DFS coloring.', complexity: 'Time: O(V + E)' },
  'Topological sort Kahn': { text: 'An algorithm to sort a directed acyclic graph (DAG) by continually removing nodes with 0 incoming edges (in-degree).', complexity: 'Time: O(V + E)' },
  'Topological sort DFS': { text: 'Sorting a DAG by running DFS and pushing a node to a stack only AFTER all its children are fully explored. Reversing the stack gives the order.', complexity: 'Time: O(V + E)' },
  'SCC Kosaraju': { text: 'Finds Strongly Connected Components in a directed graph. Involves running DFS, reversing the graph edges, and running DFS again based on finish times.', complexity: 'Time: O(V + E)' },
  'SCC Tarjan': { text: 'A single-pass DFS algorithm to find Strongly Connected Components by maintaining discovery times and lowest reachable node values.', complexity: 'Time: O(V + E)' },
  'Bridges': { text: 'Finding critical edges in a graph whose removal increases the number of disconnected components. Found using Tarjan\'s low-link value concept.', complexity: 'Time: O(V + E)' },
  'Articulation points': { text: 'Critical vertices in a graph whose removal disconnects the graph. Found using DFS discovery and low values.', complexity: 'Time: O(V + E)' },
  'Euler path': { text: 'A path that visits every edge in a graph exactly once. Exists if all vertices have even degrees (or exactly two have odd degrees).', complexity: 'Time: O(V + E)' },

  // ------------------------- PHASE 4 -------------------------
  'Bubble/selection/insertion': { text: 'The O(N^2) sorting trio. Bubble floats largest to top. Selection picks smallest and swaps. Insertion shifts elements to insert into sorted portion.', complexity: 'Time: O(N^2)' },
  'Merge sort': { text: 'A divide and conquer algorithm that recursively splits an array in half until sizes are 1, then merges the sorted halves back together.', complexity: 'Time: O(N log N)' },
  'Quick sort': { text: 'A divide and conquer algorithm that picks a pivot, places all smaller elements to the left and larger to the right, and recursively sorts the sub-arrays.', complexity: 'Time: O(N log N) avg' },
  'Heap sort': { text: 'Turns an array into a Max-Heap, then repeatedly swaps the root (max element) with the last element and reduces the heap size.', complexity: 'Time: O(N log N)' },
  'Counting sort': { text: 'A non-comparison sort that counts occurrences of each element and calculates prefix sums to determine positions. Very fast for small integer ranges.', complexity: 'Time: O(N + K)' },
  'Radix sort': { text: 'Sorts numbers digit by digit, from least significant to most significant, using a stable sorting algorithm like Counting Sort as a subroutine.', complexity: 'Time: O(N * D)' },
  'Bucket sort': { text: 'Scatters elements into buckets, sorts each bucket individually, and concatenates them. Efficient when inputs are uniformly distributed over a range.', complexity: 'Time: O(N + K)' },
  'Tim sort concept': { text: 'The default sorting algorithm in Python and Java. It is a hybrid of Merge Sort and Insertion Sort, designed to perform optimally on real-world data.', complexity: 'Time: O(N log N)' },

  'Activity selection': { text: 'A greedy algorithm pattern. Given intervals, sort them by END time, and always pick the next interval that starts after the previous one ends.', complexity: 'Time: O(N log N)' },
  'Fractional knapsack': { text: 'Unlike 0/1 knapsack, you can take fractions of items. Solved greedily by sorting items by their Value/Weight ratio and taking as much as possible.', complexity: 'Time: O(N log N)' },
  'Huffman encoding': { text: 'A lossless data compression algorithm that uses a greedy approach and a Min-Heap to assign shorter binary codes to more frequent characters.', complexity: 'Time: O(N log N)' },
  'Job scheduling': { text: 'A greedy algorithm to maximize profit by executing tasks before their deadlines. Sort by profit descending, and place in latest available deadline slot.', complexity: 'Time: O(N^2) or O(N log N)' },
  'Interval scheduling': { text: 'Finding the maximum number of non-overlapping intervals. Solved exactly like Activity Selection by sorting by end times.', complexity: 'Time: O(N log N)' },
  'Jump game': { text: 'A greedy problem where you iterate through an array tracking the "maximum reachable index". If max reachable >= final index, you can win.', complexity: 'Time: O(N)' },
  'Gas station': { text: 'A greedy circular array problem. If total gas >= total cost, a solution exists. Start from index 0, if tank goes negative, reset start to next index.', complexity: 'Time: O(N)' },
  'Meeting rooms': { text: 'Given meeting intervals, find the minimum number of conference rooms required. Solved by separating start and end times, or using a Min-Heap.', complexity: 'Time: O(N log N)' },

  'Merge sort D&C': { text: 'The classic Divide and Conquer strategy: divide the array in two, conquer each half recursively, and combine the sorted halves in linear time.', complexity: 'Time: O(N log N)' },
  'Quick select': { text: 'A D&C algorithm to find the Kth smallest element without fully sorting the array. Uses the partition logic from Quick Sort. Average time is O(N).', complexity: 'Time: O(N) avg' },
  'Closest pair of points': { text: 'Given N points on a 2D plane, find the closest pair. Solved via D&C by dividing the plane, finding closest in halves, and checking the strip boundary.', complexity: 'Time: O(N log N)' },
  'Karatsuba multiplication': { text: 'A fast multiplication algorithm that reduces the multiplication of two N-digit numbers to at most N^1.58 single-digit multiplications.', complexity: 'Time: O(N^1.58)' },
  'FFT concept': { text: 'Fast Fourier Transform computes the Discrete Fourier Transform in O(N log N). Used to rapidly multiply large polynomials and big integers.', complexity: 'Time: O(N log N)' },

  'Backtracking template': { text: 'An algorithmic technique for recursively exploring all possible solutions. If a path fails a condition, it "backtracks" by undoing the last choice.', complexity: 'Time: O(2^N) or O(N!)' },
  'N-Queens': { text: 'Placing N chess queens on an N×N chessboard so that no two queens threaten each other. Solved using backtracking.', complexity: 'Time: O(N!)' },
  'Sudoku solver': { text: 'Classic backtracking problem. Try placing digits 1-9 in empty cells; if valid, recurse. If it leads to a dead end, backtrack and try next digit.', complexity: 'Time: O(9^(EmptyCells))' },
  'Permutations': { text: 'Generating all possible arrangements of a set of items. Uses backtracking by swapping elements or keeping track of visited elements.', complexity: 'Time: O(N!)' },
  'Subsets/power set': { text: 'Generating all possible subsets of an array. At each element, make a choice: either include it in the subset, or exclude it.', complexity: 'Time: O(2^N)' },
  'Combination sum': { text: 'Finding all unique combinations that sum to a target. Backtrack by exploring paths taking the current element again (if allowed) or moving to the next.', complexity: 'Time: O(2^Target)' },
  'Palindrome partition': { text: 'Partitioning a string such that every substring is a palindrome. Iterate to find a valid prefix palindrome, then recurse on the suffix.', complexity: 'Time: O(N * 2^N)' },
  'Word search': { text: 'Given a 2D grid of letters, find if a word exists. Run a backtracking DFS from every cell, keeping track of visited cells to avoid loops.', complexity: 'Time: O(N * 3^L)' },
  'Hamiltonian path': { text: 'Finding a path in a graph that visits every vertex exactly once. It is an NP-complete problem, solved using backtracking or bitmask DP.', complexity: 'Time: O(N!) or O(N^2 * 2^N)' },

  // ------------------------- PHASE 5 -------------------------
  'Memoization vs tabulation': { text: 'Memoization is Top-Down DP (recursion + cache). Tabulation is Bottom-Up DP (iterative loops filling an array/table). Both achieve the same time complexity.', complexity: 'N/A' },
  'State definition': { text: 'The core of DP. Identifying exactly what variables define a subproblem. For example, dp[i][j] might mean the answer using items 0 to i with capacity j.', complexity: 'N/A' },
  'Recurrence relation': { text: 'The mathematical equation that links a complex problem to its simpler subproblems. E.g., fib(n) = fib(n-1) + fib(n-2).', complexity: 'N/A' },
  'Space optimisation': { text: 'If dp[i] only depends on dp[i-1] and dp[i-2], you don\'t need a full array of size N. You can just keep two variables, changing space from O(N) to O(1).', complexity: 'N/A' },
  'Printing DP path': { text: 'Instead of just finding the max value, finding the actual items chosen. Solved by tracing back through the filled DP table from the end to the start.', complexity: 'N/A' },
  'Top-down vs bottom-up': { text: 'Top-down starts at the final goal and breaks it down recursively. Bottom-up starts at the simplest base case and iteratively builds up to the goal.', complexity: 'N/A' },

  'Coin change': { text: 'Given a set of coin denominations, find the minimum number of coins to make a specific amount. Classic unbounded knapsack DP problem.', complexity: 'Time: O(Amount * Coins)' },
  'Unique paths': { text: 'Finding how many ways to reach the bottom right of a grid from top left. dp[i][j] = dp[i-1][j] + dp[i][j-1].', complexity: 'Time: O(M * N)' },
  'Min path sum': { text: 'Finding the path from top-left to bottom-right of a grid that minimizes the sum. dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]).', complexity: 'Time: O(M * N)' },
  'Wildcard matching': { text: 'String matching with ? (any single char) and * (any sequence). Uses 2D DP where dp[i][j] represents if string prefix i matches pattern prefix j.', complexity: 'Time: O(M * N)' },
  'Regex match': { text: 'String matching with . and *. Similar to wildcard, but * applies to the preceding character. Heavily tested at top tech companies.', complexity: 'Time: O(M * N)' },
  'LCS': { text: 'Longest Common Subsequence. Finding the longest subsequence common to two sequences (elements do not need to be contiguous). Solved via 2D DP.', complexity: 'Time: O(M * N)' },
  'Edit distance': { text: 'The minimum number of operations (insert, delete, replace) to convert string A into string B. dp[i][j] builds upon removing, inserting, or replacing.', complexity: 'Time: O(M * N)' },
  'LPS': { text: 'Longest Palindromic Subsequence. Solved by finding the LCS between the string and its reversed self, or using standard interval DP.', complexity: 'Time: O(N^2)' },
  'House robber': { text: 'Maximize stolen money given you cannot rob adjacent houses. Recurrence: dp[i] = max(dp[i-1], dp[i-2] + money[i]).', complexity: 'Time: O(N)' },

  '0/1 knapsack': { text: 'Given weights and values of items, put these items in a knapsack of capacity W to get max value. Each item can only be used once (0 or 1).', complexity: 'Time: O(N * W)' },
  'Unbounded knapsack': { text: 'Like 0/1 Knapsack, but you have infinite quantities of each item. Instead of looking at the previous row (i-1), you look at the current row (i).', complexity: 'Time: O(N * W)' },
  'Subset sum': { text: 'Determine if there is a subset of the given array with sum equal to given sum. 2D DP array boolean evaluation.', complexity: 'Time: O(N * Sum)' },
  'Partition equal subset': { text: 'Determine if an array can be partitioned into two subsets such that their sums are equal. Simply check if a subset sums to TotalSum / 2.', complexity: 'Time: O(N * Sum/2)' },
  'Target sum': { text: 'Assign + or - to elements in an array to hit a target. Mathematically reduces to finding a subset with a specific sum: (Total + Target) / 2.', complexity: 'Time: O(N * Sum)' },
  'Rod cutting': { text: 'Given a rod of length N and a list of prices for different lengths, maximize profit. A classic Unbounded Knapsack problem.', complexity: 'Time: O(N^2)' },
  'Count subsets sum K': { text: 'Instead of finding IF a subset exists, count HOW MANY subsets exist. Change the DP transition from boolean OR to arithmetic addition.', complexity: 'Time: O(N * K)' },

  'LIS O(n^2)': { text: 'Longest Increasing Subsequence. Standard DP approach: for every element, check all previous smaller elements and add 1 to their max LIS.', complexity: 'Time: O(N^2)' },
  'LIS O(n log n)': { text: 'Longest Increasing Subsequence. Optimized approach using a "tails" array and Binary Search to find the insertion point of each number.', complexity: 'Time: O(N log N)' },
  'Matrix chain multiplication': { text: 'Finding the most efficient way to multiply a given sequence of matrices. The problem is not performing the multiplications, but deciding the order (parenthesization).', complexity: 'Time: O(N^3)' },
  'Burst balloons': { text: 'A hard interval DP problem. The trick is to think about the LAST balloon to burst, rather than the first, to make subproblems independent.', complexity: 'Time: O(N^3)' },
  'Russian doll envelopes': { text: 'A 2D version of LIS. Sort envelopes by width ascending, and height descending, then find the LIS on the heights.', complexity: 'Time: O(N log N)' },

  'Interval DP': { text: 'DP where subproblems are segments (intervals) of an array (from index i to j). Often requires O(N^3) time as you iterate lengths and split points.', complexity: 'N/A' },
  'Tree DP': { text: 'DP applied on tree structures. Usually involves a post-order traversal where a node returns multiple states (e.g., max with node included, max without) to its parent.', complexity: 'Time: O(N)' },
  'Digit DP': { text: 'Counting the number of integers in a range [L, R] that satisfy a specific property. DP state includes index, tight bound flag, and property trackers.', complexity: 'Time: O(Digits * States)' },
  'Bitmask DP': { text: 'Using an integer (bitmask) to represent a subset of items or visited nodes in state. E.g., Travelling Salesperson uses state (currentNode, bitmaskOfVisited).', complexity: 'Time: O(2^N * N)' },
  'DP on graphs': { text: 'Applying DP on DAGs (Directed Acyclic Graphs), commonly for finding longest paths or shortest paths with specific constraints.', complexity: 'Time: O(V + E)' },
  'Convex hull trick': { text: 'An advanced DP optimization technique used to reduce O(N^2) complexity to O(N log N) or O(N) when the recurrence involves minimizing linear functions (y = mx + c).', complexity: 'Time: O(N log N)' },
  'D&C DP optimisation': { text: 'Divide and Conquer optimization for DP. Used when the optimal split point array `opt[i][j]` is monotonic with respect to j.', complexity: 'Time: O(N log N)' },

  // ------------------------- PHASE 6 -------------------------
  'Dijkstra\'s algorithm': { text: 'Finds the shortest path from a source node to all other nodes in a graph with non-negative edge weights. Uses a Min-Heap (Priority Queue).', complexity: 'Time: O((V+E) log V)' },
  'Bellman-Ford': { text: 'Finds the shortest path in a graph. Slower than Dijkstra, but works with negative edge weights and can detect negative weight cycles.', complexity: 'Time: O(V * E)' },
  'SPFA': { text: 'Shortest Path Faster Algorithm. An optimization of Bellman-Ford using a queue to only relax edges from nodes that recently changed distances.', complexity: 'Time: O(V * E) worst case' },
  'Floyd-Warshall': { text: 'An All-Pairs Shortest Path algorithm. Elegant 3-nested loop structure checking if going through an intermediate node K is shorter than going directly.', complexity: 'Time: O(V^3)' },
  '0-1 BFS': { text: 'Finding shortest paths in a graph where edge weights are only 0 or 1. Solved in linear time using a Deque instead of a Priority Queue.', complexity: 'Time: O(V + E)' },
  'A* algorithm': { text: 'An informed search algorithm widely used in pathfinding and graph traversal. Uses a heuristic function to estimate cost to goal, guiding the search efficiently.', complexity: 'Time: varies heavily' },
  'Johnson\'s': { text: 'All-Pairs Shortest Path that is faster than Floyd-Warshall for sparse graphs. It uses Bellman-Ford to reweight edges to be non-negative, then runs Dijkstra\'s from all nodes.', complexity: 'Time: O(V^2 log V + V E)' },

  'Kruskal\'s': { text: 'A Greedy algorithm to find the Minimum Spanning Tree of a graph. Sorts all edges by weight and adds them using Union-Find to avoid cycles.', complexity: 'Time: O(E log E)' },
  'Prim\'s': { text: 'A Greedy MST algorithm. Starts with a single node and repeatedly adds the cheapest edge connecting the growing tree to a new node, using a Priority Queue.', complexity: 'Time: O(E log V)' },
  'Dinic\'s max flow': { text: 'An efficient algorithm to compute maximum flow in a flow network. Uses BFS to build a level graph and DFS to send blocking flows.', complexity: 'Time: O(V^2 E)' },
  'Edmonds-Karp': { text: 'An implementation of the Ford-Fulkerson max flow method that uses BFS to find augmenting paths, guaranteeing termination and a specific time complexity.', complexity: 'Time: O(V E^2)' },
  'Bipartite matching': { text: 'Finding the maximum matching in a bipartite graph. Can be solved by adding a Super Source and Super Sink and running a Max Flow algorithm.', complexity: 'Time: O(V E)' },
  'Hungarian algorithm': { text: 'A combinatorial optimization algorithm that solves the assignment problem (maximum weight matching in bipartite graphs) in polynomial time.', complexity: 'Time: O(V^3)' },

  'Sieve of Eratosthenes': { text: 'An incredibly efficient algorithm to find all prime numbers up to a given limit by iteratively marking the multiples of each prime as composite.', complexity: 'Time: O(N log log N)' },
  'Linear sieve': { text: 'An optimization over Eratosthenes that guarantees every composite number is marked exactly once by its smallest prime factor.', complexity: 'Time: O(N)' },
  'Euler\'s totient': { text: 'A function that counts the positive integers up to a given integer n that are relatively prime to n. Used in RSA cryptography.', complexity: 'Time: O(sqrt(N))' },
  'Extended Euclidean': { text: 'Finds the GCD of integers a and b, and also finds the coefficients of Bézout\'s identity (ax + by = gcd). Used to find modular multiplicative inverses.', complexity: 'Time: O(log(min(a,b)))' },
  'Modular inverse': { text: 'Finding the inverse of A under modulo M such that (A * inverse) % M = 1. Requires A and M to be coprime. Often solved via Fermat\'s Little Theorem.', complexity: 'Time: O(log M)' },
  'CRT': { text: 'Chinese Remainder Theorem. A theorem stating that if one knows the remainders of the Euclidean division of an integer n by several integers, one can uniquely determine the remainder of the division of n by the product of these integers.', complexity: 'Time: O(K log(Product))' },
  'Fermat\'s theorem': { text: 'Fermat\'s Little Theorem states that if p is prime, then for any integer a, the number a^p - a is an integer multiple of p. Used for primality testing.', complexity: 'N/A' },
  'Miller-Rabin': { text: 'A probabilistic primality test used to determine if a given large number is prime with high confidence. Crucial in cryptography.', complexity: 'Time: O(K log^3 N)' },

  'Union-Find DSU': { text: 'Disjoint Set Union. A data structure that tracks a set of elements partitioned into disjoint subsets. Supports near O(1) Find and Union operations.', complexity: 'Time: O(α(N)) ≈ O(1)' },
  'DSU with rollback': { text: 'A variant of Union-Find that supports undoing the last union operation. Path compression cannot be used here, only union by rank.', complexity: 'Time: O(log N)' },
  'Sqrt decomposition': { text: 'Dividing an array into blocks of size sqrt(N) to process range queries and updates efficiently. A highly versatile alternative to Segment Trees.', complexity: 'Time: O(sqrt N)' },
  'Mo\'s algorithm': { text: 'An offline algorithm to answer range queries. It sorts the queries using Sqrt Decomposition techniques to minimize the movement of left and right pointers.', complexity: 'Time: O((N+Q) sqrt N)' },
  'Heavy-light decomposition': { text: 'A technique for decomposing a tree into disjoint paths (heavy paths and light edges). Allows for range queries on paths between any two nodes in O(log^2 N).', complexity: 'Time: O(log^2 N) query' },
  'Centroid decomposition': { text: 'A divide and conquer technique on trees. Recursively finds the centroid (a node that splits the tree evenly) and builds a new tree structure of depth O(log N).', complexity: 'Time: O(N log N)' },
  'Bloom filter': { text: 'A space-efficient probabilistic data structure used to test whether an element is a member of a set. False positives are possible, but false negatives are not.', complexity: 'Time: O(K) hashes' },
  'Skip list': { text: 'A probabilistic data structure that allows O(log N) search within an ordered sequence of elements using a hierarchy of linked lists. An alternative to balanced trees.', complexity: 'Time: O(log N)' }
};

// Helper function to generate the full 32-point master template
const generate32PointTemplate = (topicName, shortText, complexity) => {
  return `
# ${topicName} - Complete Master Guide

## 1. Topic Overview
${shortText}

## 2. Learning Objectives
- Understand the core principles of **${topicName}**.
- Learn how to implement this concept in real-world scenarios.
- Master the time and space complexity tradeoffs.

## 3. Prerequisites
- Basic understanding of programming fundamentals.
- Familiarity with arrays, loops, and conditional statements.

## 4. Real World Problem
Imagine you are building a large-scale system at a top tech company. Efficiently handling data is critical. Without **${topicName}**, your system might suffer from severe performance bottlenecks when scaling to millions of users.

## 5. Why Do We Need This?
We need this approach because naive or brute-force methods often lead to exponential or quadratic time complexities, making them unusable for large, real-world datasets.

## 6. Intuition
The core idea behind **${topicName}** is to optimize the way we process and store information, eliminating redundant calculations or unstructured data access.

## 7. Real-Life Analogy
Think of this concept like organizing a massive library. Instead of searching every single book one by one (which takes forever), you use a systematic index or logical method to instantly zero in on exactly what you need.

## 8. Visual Representation
\`\`\`text
[ Initial State ] ---> ( Applies ${topicName} Logic ) ---> [ Optimized State ]
\`\`\`

## 9. Formal Definition
In computer science, **${topicName}** is formally defined as a technique or structure used to solve specific algorithmic constraints efficiently. 
${shortText}

## 10. Internal Working
Under the hood, it operates by maintaining a specific state or invariant throughout its execution, ensuring that each step logically progresses towards the optimal solution without wasting cycles.

## 11. Properties
- **Efficiency:** Drastically reduces computational overhead.
- **Scalability:** Handles large inputs (N) effectively.
- **Determinism:** Produces consistent results for the same inputs.

## 12. Operations
- Initialization & Data Setup
- Core Processing & Traversal
- State Update & Rebalancing

## 13. Dry Run
Let's trace a standard input through the system:
1. Initialize necessary variables and pointers.
2. Begin iteration or recursion over the dataset.
3. Apply the specific **${topicName}** logic at each step.
4. Output the final optimized result.

## 14. Code Implementation
\`\`\`javascript
// Standard implementation template for ${topicName}
function solveAlgorithm(input) {
    // 1. Setup Phase
    let result = null;
    
    // 2. Core Logic Phase
    console.log("Applying optimal algorithm...");
    
    // 3. Return Phase
    return result;
}
\`\`\`

## 15. Complexity Analysis
- **Complexity:** ${complexity}
- **Explanation:** The complexity is derived from how many times we visit each element and how much dynamic memory we allocate during execution.

## 16. Advantages
- Highly optimal for specific problem sets.
- Frequently tested in top-tier interviews at FAANG companies.

## 17. Disadvantages
- Can be overkill for very small inputs.
- Sometimes requires an additional memory footprint.

## 18. When To Use
Use this approach when you identify the specific pattern it solves, especially when standard brute-force methods hit Time Limit Exceeded (TLE) errors on LeetCode.

## 19. When NOT To Use
Avoid using this if the dataset is tiny or if a simpler, more readable approach easily meets the application's performance requirements.

## 20. Edge Cases
- Empty or null inputs.
- Extremely large inputs approaching maximum integer limits.
- Arrays or datasets with all identical elements.

## 21. Common Mistakes
- Off-by-one errors in loop boundaries.
- Forgetting to cleanly update the state or pointers.
- Misunderstanding the base case in recursive implementations.

## 22. Comparison
| Feature | Optimal Approach | Brute Force |
|---------|---|---|
| Speed | Extremely Fast | Very Slow |
| Code Complexity | Higher | Lower |
| Scalability | High | Low |

## 23. Pattern Recognition
You know you need **${topicName}** when the problem asks for optimal constraints, shortest paths, combinations, or specific data retrieval constraints that match its exact profile.

## 24. Interview Perspective
Top companies like Google, Meta, and Amazon frequently ask interview questions where this concept is the hidden optimal solution required to pass all test cases.

## 25. Real World Applications
- Database indexing and query optimization.
- Network routing protocols.
- UI state management and diffing algorithms in frameworks like React.

## 26. Practice Problems
1. Implement a basic, foundational version from scratch.
2. Apply it to a problem with massive constraints (e.g., N = 10^5).
3. Solve a complex variation where the underlying data is dynamically updated.

## 27. Quiz
1. What is the primary performance advantage of this concept?
   - A) It guarantees O(1) time complexity universally.
   - B) It optimizes processing by eliminating redundant steps or overhead.
   - C) It bypasses CPU execution and runs directly in memory.
   - D) It prevents any possible edge cases from occurring.
**Correct:** B

2. What happens to the efficiency in the absolute worst-case scenario?
   - A) It is rigidly bounded by its Big O notation limits.
   - B) It causes the system to automatically crash.
   - C) It exponentially speeds up execution.
   - D) The worst-case is entirely identical to the best-case.
**Correct:** A

3. How does the algorithm handle edge cases like empty inputs?
   - A) It silently ignores them without consequence.
   - B) It usually requires explicit guard clauses or base cases to prevent failures.
   - C) It guarantees 100% safety automatically.
   - D) Empty inputs are mathematically impossible in this context.
**Correct:** B

## 28. Cheatsheet
- **Key Concept:** Optimize state transitions and minimize redundancy.
- **Complexity Profile:** ${complexity}.
- **Core Strategy:** Think before you loop.

## 29. Revision Notes
Review this topic whenever you face problems that seem to require nested loops but explicitly ask for O(N) or O(N log N) solutions.

## 30. Frequently Asked Questions
**Q: Is this hard to learn?**
A: The high-level intuition is usually simple, but mastering the edge cases requires consistent practice.

## 31. Summary
**${topicName}** is an essential, non-negotiable tool in any serious software engineer's toolkit, bridging the gap between naive algorithms and production-ready, scalable code.

## 32. Next Topic Recommendation
Once you master this, proceed to the next topic in the learning phase to see how these concepts build upon each other!
`;
};

// Fallback function for any topics not explicitly defined above
export const getStaticContent = (topicName) => {
  // 1. First check if the massive bulk-generator script has finished this topic via AI
  if (generatedData && generatedData[topicName] && generatedData[topicName].text && !generatedData[topicName].text.includes("generating the detailed")) {
    return generatedData[topicName];
  }

  // 2. Wrap our hardcoded fallback snippets in the 32-point Master Framework
  if (STATIC_LESSONS[topicName]) {
    const lesson = STATIC_LESSONS[topicName];
    return {
      text: generate32PointTemplate(topicName, lesson.text, lesson.complexity),
      complexity: lesson.complexity
    };
  }
  
  // 3. Otherwise show a generic 32-point template
  return {
    text: generate32PointTemplate(topicName, "Detailed explanation coming soon. Please use the AI Tutor for a custom lesson.", "N/A"),
    complexity: 'N/A'
  };
};
