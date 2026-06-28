
export const WEEKS=[
  {w:1,ph:2,pc:'t',title:'Foundations & Linear DS',topics:'Big O, recursion, arrays, two pointers, sliding window, linked lists, stacks, queues',daily:'2h theory + 3h problems. Master the patterns.',probs:'Two Sum, LRU cache, Trapping rain water'},
  {w:2,ph:3,pc:'a',title:'Trees & Graphs',topics:'Binary trees, BST, min/max heap, tries, graph traversals (BFS/DFS), topological sort',daily:'Draw structures on paper. 3h problems/day minimum.',probs:'Level order traversal, Validate BST, Number of islands'},
  {w:3,ph:5,pc:'b',title:'Core Algorithms & DP',topics:'Sorting algorithms, greedy, backtracking, 1D/2D DP, knapsack, LCS, LIS',daily:'Write recurrences first. No jumping straight to code.',probs:'N-Queens, Coin change, Longest common subsequence'},
  {w:4,ph:6,pc:'g',title:'Advanced Graph & Number Theory',topics:'Dijkstra, Bellman-Ford, MST, Union-Find, Sieve, advanced topics',daily:'1h theory + 1h full mock interviews every day.',probs:'Network delay time, Min cost to connect all points, Mock interviews'},
];
export const phCols={p:['#26215C','#534AB7','#CECBF6'],t:['#04342C','#0F6E56','#9FE1CB'],a:['#412402','#854F0B','#FAC775'],c:['#4A1B0C','#993C1D','#F5C4B3'],b:['#042C53','#185FA5','#B5D4F4'],g:['#173404','#3B6D11','#C0DD97']};
export const PHASES=[
  {num:1,c:'p',title:'Foundations',sub:'Big O · Recursion · Math',weeks:'Week 1',secs:[
    {t:'Complexity',items:['Big O notation','Big Theta & Omega','Best/avg/worst case','Amortized analysis','Master theorem','Recurrence relations']},
    {t:'Recursion',items:['Base & recursive case','Call stack depth','Memoization','Tail recursion','Recursion to iteration','Tree recursion']},
    {t:'Math',items:['Number systems','Bit manipulation','Modular arithmetic','GCD/LCM Euclidean','Modular exponentiation','Overflow & limits']},
  ]},
  {num:2,c:'t',title:'Linear DS',sub:'Arrays · Strings · LL · Stacks · Queues',weeks:'Week 1',secs:[
    {t:'Arrays',items:['Prefix sum','Sliding window fixed','Sliding window variable','Two pointers','Kadane\'s algorithm','Dutch national flag','Merge intervals']},
    {t:'Strings',items:['String hashing','KMP algorithm','Z-algorithm','Rabin-Karp','Manacher\'s','Aho-Corasick','Suffix array']},
    {t:'Linked lists',items:['Singly & doubly LL','Slow-fast pointers','Floyd\'s cycle detection','Reverse linked list','Merge sorted lists','LRU cache','Clone with random ptr']},
    {t:'Stacks',items:['Monotonic stack','Next greater element','Valid parentheses','Min stack','Largest rect histogram','Basic calculator']},
    {t:'Queues',items:['Circular queue','Deque sliding window max','BFS queue','Priority queue','Stack using queues']},
  ]},
  {num:3,c:'a',title:'Non-linear DS',sub:'Trees · Heaps · Tries · Graphs · Segment trees',weeks:'Week 2',secs:[
    {t:'Binary trees',items:['Inorder/pre/postorder','Level-order BFS','Height & diameter','LCA','Morris traversal','Serialize/deserialize','Vertical order']},
    {t:'BST',items:['BST insert/delete/search','Validate BST','Kth smallest in BST','AVL rotations','Red-Black concept','B-tree concept']},
    {t:'Heaps',items:['Min/max heap','Heapify & heap sort','K-th largest/smallest','Merge K sorted lists','Median of stream','Top K frequent']},
    {t:'Tries',items:['Trie insert & search','Prefix matching','XOR max pair','Compressed trie','Aho-Corasick']},
    {t:'Segment trees',items:['Range sum query','Lazy propagation','Persistent segment tree','Fenwick tree BIT','Sparse table RMQ']},
    {t:'Graphs',items:['BFS & DFS','Cycle detection directed','Cycle detection undirected','Bipartite check','Topological sort Kahn','Topological sort DFS','SCC Kosaraju','SCC Tarjan','Bridges','Articulation points','Euler path']},
  ]},
  {num:4,c:'c',title:'Core Algorithms',sub:'Sorting · Greedy · D&C · Backtracking',weeks:'Week 3',secs:[
    {t:'Sorting',items:['Bubble/selection/insertion','Merge sort','Quick sort','Heap sort','Counting sort','Radix sort','Bucket sort','Tim sort concept']},
    {t:'Greedy',items:['Activity selection','Fractional knapsack','Huffman encoding','Job scheduling','Interval scheduling','Jump game','Gas station','Meeting rooms']},
    {t:'Divide & conquer',items:['Merge sort D&C','Quick select','Closest pair of points','Karatsuba multiplication','FFT concept']},
    {t:'Backtracking',items:['Backtracking template','N-Queens','Sudoku solver','Permutations','Subsets/power set','Combination sum','Palindrome partition','Word search','Hamiltonian path']},
  ]},
  {num:5,c:'b',title:'Dynamic Programming',sub:'All DP patterns from 1D to bitmask',weeks:'Week 3',secs:[
    {t:'Fundamentals',items:['Memoization vs tabulation','State definition','Recurrence relation','Space optimisation','Printing DP path','Top-down vs bottom-up']},
    {t:'Classic DP',items:['Coin change','Unique paths','Min path sum','Wildcard matching','Regex match','LCS','Edit distance','LPS','House robber']},
    {t:'Knapsack family',items:['0/1 knapsack','Unbounded knapsack','Subset sum','Partition equal subset','Target sum','Rod cutting','Count subsets sum K']},
    {t:'Sequences',items:['LIS O(n^2)','LIS O(n log n)','Matrix chain multiplication','Burst balloons','Russian doll envelopes']},
    {t:'Advanced DP',items:['Interval DP','Tree DP','Digit DP','Bitmask DP','DP on graphs','Convex hull trick','D&C DP optimisation']},
  ]},
  {num:6,c:'g',title:'Advanced Topics',sub:'Graph algs · Number theory · Advanced structures',weeks:'Week 4',secs:[
    {t:'Shortest path',items:['Dijkstra\'s algorithm','Bellman-Ford','SPFA','Floyd-Warshall','0-1 BFS','A* algorithm','Johnson\'s']},
    {t:'MST & flow',items:['Kruskal\'s','Prim\'s','Dinic\'s max flow','Edmonds-Karp','Bipartite matching','Hungarian algorithm']},
    {t:'Number theory',items:['Sieve of Eratosthenes','Linear sieve','Euler\'s totient','Extended Euclidean','Modular inverse','CRT','Fermat\'s theorem','Miller-Rabin']},
    {t:'Advanced structures',items:['Union-Find DSU','DSU with rollback','Sqrt decomposition','Mo\'s algorithm','Heavy-light decomposition','Centroid decomposition','Bloom filter','Skip list']},
  ]},
];
