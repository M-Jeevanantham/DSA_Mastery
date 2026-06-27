
export const WEEKS=[
  {w:1,ph:1,pc:'p',title:'Big O, recursion & foundations',topics:'Big O notation, time/space complexity, recursion, bit manipulation, number systems, modular arithmetic',daily:'1h theory + 1h easy recursion problems. Draw call stacks on paper.',probs:'Fibonacci, factorial, power of 2 check, sum of digits'},
  {w:2,ph:2,pc:'t',title:'Arrays — core patterns',topics:'Two pointers, sliding window (fixed & variable), prefix sum, Kadane\'s algorithm',daily:'30min concept + 5 LeetCode easy/med. Focus on pattern recognition.',probs:'Two Sum II, Maximum subarray, Best time to buy stock'},
  {w:3,ph:2,pc:'t',title:'Arrays advanced + strings',topics:'Binary search variants, Dutch national flag, string hashing, KMP, Z-algorithm, Manacher\'s',daily:'30min + 2h problems. Stuck 10min → hint, not solution.',probs:'Search in rotated array, Longest no-repeat substr, Minimum window substring'},
  {w:4,ph:2,pc:'t',title:'Linked lists + stacks + queues',topics:'Slow-fast pointers, reverse LL, merge lists, LRU cache, monotonic stack, deque, circular queue',daily:'Build each structure from scratch first, then 5 problems/day.',probs:'LRU cache, Trapping rain water, Sliding window maximum'},
  {w:5,ph:3,pc:'a',title:'Binary trees & BST',topics:'Tree traversals, height, diameter, LCA, BST operations, Tree DP, Morris traversal',daily:'Draw every tree on paper before coding. 4 problems/day minimum.',probs:'Level order traversal, Validate BST, Maximum path sum, LCA'},
  {w:6,ph:3,pc:'a',title:'Heaps + tries + segment trees',topics:'Min/max heap, K-th problems, trie insert/search, XOR max pair, range sum query, lazy propagation',daily:'Implement heap from scratch. 3-4 problems/day (these are harder).',probs:'K-th largest, Top K frequent, Implement trie, Range sum query'},
  {w:7,ph:3,pc:'a',title:'Graphs',topics:'BFS, DFS, cycle detection, bipartite check, topological sort (Kahn + DFS), SCC Kosaraju, bridges',daily:'3 deep graph problems/day. Quality over quantity here.',probs:'Clone graph, Course schedule, Number of islands, Word ladder'},
  {w:8,ph:4,pc:'c',title:'Sorting + greedy + backtracking',topics:'All sorting algorithms, greedy patterns, activity selection, Huffman, divide & conquer, backtracking',daily:'Code every sorting algorithm from scratch. 4 backtracking problems.',probs:'Sort colors, Jump game, N-Queens, Combination sum, Palindrome partition'},
  {w:9,ph:5,pc:'b',title:'DP — fundamentals & 1D/2D',topics:'Memoization vs tabulation, coin change, LCS, edit distance, LPS, knapsack 0/1, unbounded knapsack',daily:'Derive the recurrence yourself before checking. No shortcuts.',probs:'Climbing stairs, Coin change, Longest common subsequence, 0/1 Knapsack'},
  {w:10,ph:5,pc:'b',title:'DP — advanced patterns',topics:'LIS O(n log n), matrix chain multiplication, interval DP, tree DP, digit DP, bitmask DP',daily:'2 hard DP problems/day + review 3 from last week.',probs:'Burst balloons, Russian doll envelopes, Word break II, Edit distance'},
  {w:11,ph:6,pc:'g',title:'Shortest path + MST + DSU',topics:'Dijkstra, Bellman-Ford, Floyd-Warshall, 0-1 BFS, Kruskal, Prim, Union-Find with rank/path compression',daily:'Implement each algorithm from scratch. Know when to use which.',probs:'Network delay time, Cheapest flights, Min cost to connect all points'},
  {w:12,ph:6,pc:'g',title:'Number theory + advanced + mocks',topics:'Sieve, GCD/LCM, modular exponentiation, CRT, Miller-Rabin, Mo\'s algorithm, sqrt decomposition',daily:'1h new topics + 1h full mock (2 easy + 1 med + 1 hard timed).',probs:'Count primes, Super pow, Minimum query range, Full mock interviews'},
];
export const phCols={p:['#26215C','#534AB7','#CECBF6'],t:['#04342C','#0F6E56','#9FE1CB'],a:['#412402','#854F0B','#FAC775'],c:['#4A1B0C','#993C1D','#F5C4B3'],b:['#042C53','#185FA5','#B5D4F4'],g:['#173404','#3B6D11','#C0DD97']};
export const PHASES=[
  {num:1,c:'p',title:'Foundations',sub:'Big O · Recursion · Math',weeks:'Week 1',secs:[
    {t:'Complexity',items:['Big O notation','Big Theta & Omega','Best/avg/worst case','Amortized analysis','Master theorem','Recurrence relations']},
    {t:'Recursion',items:['Base & recursive case','Call stack depth','Memoization','Tail recursion','Recursion to iteration','Tree recursion']},
    {t:'Math',items:['Number systems','Bit manipulation','Modular arithmetic','GCD/LCM Euclidean','Modular exponentiation','Overflow & limits']},
  ]},
  {num:2,c:'t',title:'Linear DS',sub:'Arrays · Strings · LL · Stacks · Queues',weeks:'Weeks 2-4',secs:[
    {t:'Arrays',items:['Prefix sum','Sliding window fixed','Sliding window variable','Two pointers','Kadane\'s algorithm','Dutch national flag','Merge intervals']},
    {t:'Strings',items:['String hashing','KMP algorithm','Z-algorithm','Rabin-Karp','Manacher\'s','Aho-Corasick','Suffix array']},
    {t:'Linked lists',items:['Singly & doubly LL','Slow-fast pointers','Floyd\'s cycle detection','Reverse linked list','Merge sorted lists','LRU cache','Clone with random ptr']},
    {t:'Stacks',items:['Monotonic stack','Next greater element','Valid parentheses','Min stack','Largest rect histogram','Basic calculator']},
    {t:'Queues',items:['Circular queue','Deque sliding window max','BFS queue','Priority queue','Stack using queues']},
  ]},
  {num:3,c:'a',title:'Non-linear DS',sub:'Trees · Heaps · Tries · Graphs · Segment trees',weeks:'Weeks 5-7',secs:[
    {t:'Binary trees',items:['Inorder/pre/postorder','Level-order BFS','Height & diameter','LCA','Morris traversal','Serialize/deserialize','Vertical order']},
    {t:'BST',items:['BST insert/delete/search','Validate BST','Kth smallest in BST','AVL rotations','Red-Black concept','B-tree concept']},
    {t:'Heaps',items:['Min/max heap','Heapify & heap sort','K-th largest/smallest','Merge K sorted lists','Median of stream','Top K frequent']},
    {t:'Tries',items:['Trie insert & search','Prefix matching','XOR max pair','Compressed trie','Aho-Corasick']},
    {t:'Segment trees',items:['Range sum query','Lazy propagation','Persistent segment tree','Fenwick tree BIT','Sparse table RMQ']},
    {t:'Graphs',items:['BFS & DFS','Cycle detection directed','Cycle detection undirected','Bipartite check','Topological sort Kahn','Topological sort DFS','SCC Kosaraju','SCC Tarjan','Bridges','Articulation points','Euler path']},
  ]},
  {num:4,c:'c',title:'Core Algorithms',sub:'Sorting · Greedy · D&C · Backtracking',weeks:'Week 8',secs:[
    {t:'Sorting',items:['Bubble/selection/insertion','Merge sort','Quick sort','Heap sort','Counting sort','Radix sort','Bucket sort','Tim sort concept']},
    {t:'Greedy',items:['Activity selection','Fractional knapsack','Huffman encoding','Job scheduling','Interval scheduling','Jump game','Gas station','Meeting rooms']},
    {t:'Divide & conquer',items:['Merge sort D&C','Quick select','Closest pair of points','Karatsuba multiplication','FFT concept']},
    {t:'Backtracking',items:['Backtracking template','N-Queens','Sudoku solver','Permutations','Subsets/power set','Combination sum','Palindrome partition','Word search','Hamiltonian path']},
  ]},
  {num:5,c:'b',title:'Dynamic Programming',sub:'All DP patterns from 1D to bitmask',weeks:'Weeks 9-10',secs:[
    {t:'Fundamentals',items:['Memoization vs tabulation','State definition','Recurrence relation','Space optimisation','Printing DP path','Top-down vs bottom-up']},
    {t:'Classic DP',items:['Coin change','Unique paths','Min path sum','Wildcard matching','Regex match','LCS','Edit distance','LPS','House robber']},
    {t:'Knapsack family',items:['0/1 knapsack','Unbounded knapsack','Subset sum','Partition equal subset','Target sum','Rod cutting','Count subsets sum K']},
    {t:'Sequences',items:['LIS O(n^2)','LIS O(n log n)','Matrix chain multiplication','Burst balloons','Russian doll envelopes']},
    {t:'Advanced DP',items:['Interval DP','Tree DP','Digit DP','Bitmask DP','DP on graphs','Convex hull trick','D&C DP optimisation']},
  ]},
  {num:6,c:'g',title:'Advanced Topics',sub:'Graph algs · Number theory · Advanced structures',weeks:'Weeks 11-12',secs:[
    {t:'Shortest path',items:['Dijkstra\'s algorithm','Bellman-Ford','SPFA','Floyd-Warshall','0-1 BFS','A* algorithm','Johnson\'s']},
    {t:'MST & flow',items:['Kruskal\'s','Prim\'s','Dinic\'s max flow','Edmonds-Karp','Bipartite matching','Hungarian algorithm']},
    {t:'Number theory',items:['Sieve of Eratosthenes','Linear sieve','Euler\'s totient','Extended Euclidean','Modular inverse','CRT','Fermat\'s theorem','Miller-Rabin']},
    {t:'Advanced structures',items:['Union-Find DSU','DSU with rollback','Sqrt decomposition','Mo\'s algorithm','Heavy-light decomposition','Centroid decomposition','Bloom filter','Skip list']},
  ]},
];
