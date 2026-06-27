import React, { useState } from 'react';

const TABLES = {
  ds: {
    name: "Data Structures",
    headers: ["Data Structure", "Access", "Search", "Insertion", "Deletion", "Space"],
    rows: [
      ["Array", "O(1) [G]", "O(N) [R]", "O(N) [R]", "O(N) [R]", "O(N) [Y]"],
      ["Linked List", "O(N) [R]", "O(N) [R]", "O(1) [G]", "O(1) [G]", "O(N) [Y]"],
      ["Hash Table", "N/A", "O(1) [G]", "O(1) [G]", "O(1) [G]", "O(N) [Y]"],
      ["BST", "O(log N) [Y]", "O(log N) [Y]", "O(log N) [Y]", "O(log N) [Y]", "O(N) [Y]"]
    ]
  },
  sort: {
    name: "Sorting Algorithms",
    headers: ["Algorithm", "Best", "Average", "Worst", "Space"],
    rows: [
      ["Quicksort", "O(N log N) [G]", "O(N log N) [G]", "O(N²) [R]", "O(log N) [G]"],
      ["Mergesort", "O(N log N) [G]", "O(N log N) [G]", "O(N log N) [G]", "O(N) [Y]"],
      ["Bubble Sort", "O(N) [G]", "O(N²) [R]", "O(N²) [R]", "O(1) [G]"]
    ]
  },
  graph: {
    name: "Graph Algorithms",
    headers: ["Algorithm", "Time", "Space", "Use Case"],
    rows: [
      ["BFS", "O(V + E) [G]", "O(V) [Y]", "Shortest path (unweighted)"],
      ["DFS", "O(V + E) [G]", "O(V) [Y]", "Cycle detection, topological sort"],
      ["Dijkstra", "O((V+E) log V) [Y]", "O(V) [Y]", "Shortest path (positive weights)"]
    ]
  }
};

export const CheatSheet = () => {
  const [activeTab, setActiveTab] = useState('ds');

  const renderCell = (cellText, idx) => {
    if (idx === 0) return <strong>{cellText}</strong>; // Row header
    
    // Parse color codes like "[G]" for Green
    let color = '';
    let text = cellText;
    if (cellText.includes('[G]')) { color = 'var(--purp)'; text = cellText.replace('[G]', ''); }
    else if (cellText.includes('[Y]')) { color = '#ffcc00'; text = cellText.replace('[Y]', ''); }
    else if (cellText.includes('[R]')) { color = '#ff4444'; text = cellText.replace('[R]', ''); }

    return (
      <span style={{ color: color, fontWeight: color ? 'bold' : 'normal' }}>
        {text}
      </span>
    );
  };

  return (
    <div className="page on">
      <div className="hero">
        <h1>Complexity Cheat Sheet</h1>
        <p>Quick reference for Time & Space complexities.</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2rem' }}>
        {Object.keys(TABLES).map(tabKey => (
          <button 
            key={tabKey} 
            className={`btn ${activeTab === tabKey ? 'primary' : ''}`}
            onClick={() => setActiveTab(tabKey)}
          >
            {TABLES[tabKey].name}
          </button>
        ))}
      </div>

      <div className="table-wrap" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: 'var(--bg)', border: '1px solid var(--border)' }}>
          <thead style={{ background: 'var(--dark)' }}>
            <tr>
              {TABLES[activeTab].headers.map((h, i) => (
                <th key={i} style={{ padding: '1rem', borderBottom: '2px solid var(--purp)', color: 'var(--text)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLES[activeTab].rows.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: '1rem', color: 'var(--sub)' }}>
                    {renderCell(cell, j)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
