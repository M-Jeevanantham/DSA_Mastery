import React, { useState, useContext } from 'react';
import { PROBS } from '../data/practice';
import { ProgressContext } from '../context/ProgressContext';

export const Practice = () => {
  const { user, updateUserField } = useContext(ProgressContext);
  const [activeTab, setActiveTab] = useState('arrays');
  const [expandedHints, setExpandedHints] = useState({});
  const [expandedExplains, setExpandedExplains] = useState({});
  const [expandedNotes, setExpandedNotes] = useState({});
  
  // Local state for the text areas so it doesn't wait for server response to type
  const [localNotes, setLocalNotes] = useState({});

  const toggleHint = (id) => setExpandedHints(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleExplain = (id) => setExpandedExplains(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleNotes = (id) => {
    setExpandedNotes(prev => ({ ...prev, [id]: !prev[id] }));
    if (!expandedNotes[id]) {
      // populate local note from context when expanding
      setLocalNotes(prev => ({ ...prev, [id]: user?.notes?.[id] || '' }));
    }
  };

  const handleNoteChange = (id, text) => {
    setLocalNotes(prev => ({ ...prev, [id]: text }));
  };

  const saveNote = async (id) => {
    const newNotes = { ...(user?.notes || {}), [id]: localNotes[id] };
    await updateUserField({ notes: newNotes });
  };

  return (
    <div className="page on">
      <div className="hero">
        <h1>Practice Problems</h1>
        <p>Curated list of high-yield problems. Write and save your personal code solutions directly to your database.</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2rem' }}>
        {Object.keys(PROBS).map(tab => (
          <button 
            key={tab} 
            className={`btn ${activeTab === tab ? 'primary' : ''}`}
            style={{ textTransform: 'capitalize' }}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="prob-wrap">
        {PROBS[activeTab]?.map((prob) => (
          <div key={prob.id} className="card p-card" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>{prob.name}</h3>
              <span className={`diff-badge ${prob.diff.toLowerCase()}`} style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', borderRadius: '4px', background: 'var(--sub)', color: 'var(--bg)' }}>
                {prob.diff}
              </span>
            </div>
            
            <p style={{ color: 'var(--sub)', marginBottom: '1rem', lineHeight: '1.5' }}>{prob.desc}</p>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <button className="btn" onClick={() => toggleHint(prob.id)}>
                {expandedHints[prob.id] ? 'Hide Hint' : '💡 Hint'}
              </button>
              <button className="btn primary" onClick={() => toggleExplain(prob.id)}>
                {expandedExplains[prob.id] ? 'Hide Explanation' : '📚 Explain'}
              </button>
              <button className="btn" onClick={() => toggleNotes(prob.id)} style={{ borderColor: 'var(--p)', color: 'var(--p)' }}>
                {expandedNotes[prob.id] ? 'Hide Notes' : '📓 My Notes'}
              </button>
            </div>

            {expandedHints[prob.id] && (
              <div style={{ background: 'rgba(255, 204, 0, 0.1)', padding: '1rem', borderRadius: '4px', borderLeft: '3px solid #ffcc00', marginBottom: '1rem' }}>
                <strong>Hint:</strong> {prob.hint}
              </div>
            )}

            {expandedExplains[prob.id] && (
              <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '1rem', borderRadius: '4px', borderLeft: '3px solid var(--p)', marginBottom: '1rem' }}>
                <strong>Explanation:</strong> {prob.explain}
              </div>
            )}

            {expandedNotes[prob.id] && (
              <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--border)' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--sub)', marginBottom: '0.5rem' }}>Personal Markdown Notes & Code Solutions:</p>
                <textarea
                  style={{ 
                    width: '100%', 
                    height: '150px', 
                    background: 'var(--bg)', 
                    color: 'var(--text)', 
                    border: '1px solid var(--border)', 
                    borderRadius: '4px', 
                    padding: '0.75rem',
                    fontFamily: 'monospace',
                    marginBottom: '1rem',
                    resize: 'vertical'
                  }}
                  value={localNotes[prob.id] !== undefined ? localNotes[prob.id] : (user?.notes?.[prob.id] || '')}
                  onChange={(e) => handleNoteChange(prob.id, e.target.value)}
                  placeholder="```python\ndef solution():\n  pass\n```\nI struggled with the edge case here..."
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="btn primary" onClick={() => saveNote(prob.id)}>Save to Database</button>
                </div>
              </div>
            )}
          </div>
        ))}

        {(!PROBS[activeTab] || PROBS[activeTab].length === 0) && (
          <p style={{ color: 'var(--sub)' }}>Problems coming soon.</p>
        )}
      </div>
    </div>
  );
};
