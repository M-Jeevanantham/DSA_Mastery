import React from 'react';

const PLATFORMS = [
  { name: 'LeetCode', icon: '🟠', desc: 'The #1 platform for DSA practice. Best for interview prep.', url: 'https://leetcode.com', tag: 'Problems' },
  { name: 'GeeksForGeeks', icon: '🟢', desc: 'Best for theory + explanations. Use alongside LeetCode.', url: 'https://geeksforgeeks.org', tag: 'Theory' },
  { name: 'Codeforces', icon: '🔵', desc: 'Competitive programming contests. Good for Phase 3-6.', url: 'https://codeforces.com', tag: 'Contest' },
  { name: 'NeetCode', icon: '🟣', desc: '150 curated problems with video explanations. Highly recommended.', url: 'https://neetcode.io', tag: 'Curated' },
];

const BOOKS = [
  { name: 'CLRS (Introduction to Algorithms)', icon: '📕', desc: 'The bible of algorithms. Dense, but thorough. Reference for theory.', tag: 'Book' },
  { name: 'Cracking the Coding Interview', icon: '📗', desc: 'Best-selling interview prep book. 189 problems with solutions.', tag: 'Book' },
  { name: 'Grokking Algorithms', icon: '📘', desc: 'Visual, beginner-friendly intro to algorithms. Perfect for Phase 1-2.', tag: 'Book' },
  { name: 'Algorithm Design Manual (Skiena)', icon: '📙', desc: 'Great for understanding algorithm design from a practitioner\'s view.', tag: 'Book' },
];

const YOUTUBE = [
  { name: 'Abdul Bari', icon: '▶️', desc: 'Best YouTube channel for algorithms. Crystal clear explanations.', url: 'https://youtube.com/@abdulbari', tag: 'YouTube' },
  { name: 'NeetCode', icon: '▶️', desc: 'LeetCode solutions explained with visual diagrams. Essential.', url: 'https://youtube.com/@NeetCode', tag: 'YouTube' },
  { name: 'Back To Back SWE', icon: '▶️', desc: 'Deep-dives on interview problems with whiteboard walkthroughs.', url: 'https://youtube.com/@BackToBackSWE', tag: 'YouTube' },
];

const PLACEMENT = [
  { company: 'TCS', type: 'Mass Recruiter', tip: 'Focus on arrays, strings, and basic DP. Aptitude is heavily tested. CodeVita is their flagship coding contest.' },
  { company: 'Zoho', type: 'Product Company', tip: 'Very strong focus on DSA and CS fundamentals. Multiple rounds of coding. Practice Zoho-tagged problems on GFG.' },
  { company: 'Amazon', type: 'FAANG', tip: '14 Leadership Principles + 2-3 rounds of DSA. Focus on trees, graphs, and DP. Arrays/strings are most common.' },
  { company: 'Google', type: 'FAANG', tip: 'Hardest bar. Systems design (for L4+) + hardcore DSA. Graphs, segment trees, bit manipulation. Study all 6 phases.' },
];

export const Resources = () => {
  return (
    <div className="page on">
      <div className="hero">
        <h1>Curated Resources</h1>
        <p>Platforms, books, videos, and an Indian placement guide. One page, zero tab-switching.</p>
      </div>

      {/* Platforms */}
      <div className="sec" style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Platforms</h2>
        <div className="grid">
          {PLATFORMS.map((p, i) => (
            <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <div className="card" style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h3 style={{ margin: 0 }}>{p.icon} {p.name}</h3>
                  <span className="chip" style={{ fontSize: '0.75rem' }}>{p.tag}</span>
                </div>
                <p style={{ color: 'var(--sub)', fontSize: '0.9rem' }}>{p.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Books */}
      <div className="sec" style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Books</h2>
        <div className="grid">
          {BOOKS.map((b, i) => (
            <div key={i} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ margin: 0 }}>{b.icon} {b.name}</h3>
                <span className="chip" style={{ fontSize: '0.75rem' }}>{b.tag}</span>
              </div>
              <p style={{ color: 'var(--sub)', fontSize: '0.9rem' }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* YouTube */}
      <div className="sec" style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>YouTube Channels</h2>
        <div className="grid">
          {YOUTUBE.map((y, i) => (
            <a key={i} href={y.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <div className="card" style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h3 style={{ margin: 0 }}>{y.name}</h3>
                  <span className="chip" style={{ fontSize: '0.75rem' }}>{y.tag}</span>
                </div>
                <p style={{ color: 'var(--sub)', fontSize: '0.9rem' }}>{y.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Indian Placement Guide */}
      <div className="sec">
        <h2 style={{ marginBottom: '0.5rem' }}>🇮🇳 Indian Placement Guide</h2>
        <p style={{ color: 'var(--sub)', marginBottom: '1.5rem' }}>Company-specific strategy for Indian campus/off-campus placements.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {PLACEMENT.map((p, i) => (
            <div key={i} className="card" style={{ borderLeft: '4px solid var(--teal)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ margin: 0 }}>{p.company}</h3>
                <span className="chip" style={{ fontSize: '0.75rem' }}>{p.type}</span>
              </div>
              <p style={{ color: 'var(--sub)', fontSize: '0.9rem', lineHeight: '1.5' }}>{p.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
