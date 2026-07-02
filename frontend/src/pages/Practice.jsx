import React, { useState, useContext } from 'react';
import Editor from '@monaco-editor/react';
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
    <div className="page on" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      
      <div style={{ 
        padding: '0 0 1.5rem 0',
        marginBottom: '2rem',
        borderBottom: '1px solid var(--border)',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ 
            fontSize: '2.5rem', 
            margin: '0 0 0.5rem 0',
            background: 'linear-gradient(to right, #fff, #a1a1aa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-1px'
          }}>
            Practice Arena
          </h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Curated, high-yield problems. Write notes and track your progress.
          </p>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '1rem', paddingTop: '1.5rem' }}>
        
        {/* Category Tabs (Segmented Look) */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '1.5rem', marginBottom: '1rem' }}>
          {Object.keys(PROBS).map(tab => {
            const isActive = activeTab === tab;
            return (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '0.6rem 1.25rem',
                  background: isActive ? 'linear-gradient(135deg, var(--p), #7C3AED)' : 'rgba(255,255,255,0.03)',
                  color: isActive ? '#fff' : 'var(--text-muted)',
                  border: '1px solid',
                  borderColor: isActive ? 'transparent' : 'var(--border)',
                  borderRadius: '99px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  textTransform: 'capitalize',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 15px rgba(168, 85, 247, 0.3)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }
                }}
              >
                {tab.replace('-', ' ')}
              </button>
            )
          })}
        </div>

        {/* Problems List */}
        <div style={{ maxWidth: '1000px' }}>
          {PROBS[activeTab]?.map((prob) => {
            const getDiffColor = (d) => {
              if (d === 'Easy') return { color: '#4ade80', bg: 'rgba(74, 222, 128, 0.1)', border: 'rgba(74, 222, 128, 0.2)' };
              if (d === 'Medium') return { color: '#facc15', bg: 'rgba(250, 204, 21, 0.1)', border: 'rgba(250, 204, 21, 0.2)' };
              if (d === 'Hard') return { color: '#f87171', bg: 'rgba(248, 113, 113, 0.1)', border: 'rgba(248, 113, 113, 0.2)' };
              return { color: 'var(--text)', bg: 'rgba(255,255,255,0.05)', border: 'var(--border)' };
            };
            const diffStyle = getDiffColor(prob.diff);

            return (
              <div key={prob.id} className="card" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className="material-symbols-outlined" style={{ color: diffStyle.color }}>task_alt</span>
                    {prob.name}
                  </h3>
                  <span style={{ 
                    fontSize: '0.8rem', 
                    padding: '0.3rem 0.8rem', 
                    borderRadius: '99px', 
                    background: diffStyle.bg, 
                    color: diffStyle.color,
                    border: `1px solid ${diffStyle.border}`,
                    fontWeight: '600',
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                  }}>
                    {prob.diff}
                  </span>
                </div>
                
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.6', fontSize: '1rem' }}>{prob.desc}</p>
                
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button onClick={() => toggleHint(prob.id)} style={{
                    padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem',
                    background: expandedHints[prob.id] ? 'rgba(255, 204, 0, 0.15)' : 'rgba(255,255,255,0.03)',
                    color: expandedHints[prob.id] ? '#facc15' : 'var(--text-muted)',
                    border: `1px solid ${expandedHints[prob.id] ? 'rgba(250, 204, 21, 0.3)' : 'var(--border)'}`,
                    transition: 'all 0.2s'
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>lightbulb</span>
                    {expandedHints[prob.id] ? 'Hide Hint' : 'View Hint'}
                  </button>
                  
                  <button onClick={() => toggleExplain(prob.id)} style={{
                    padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem',
                    background: expandedExplains[prob.id] ? 'rgba(45, 212, 191, 0.15)' : 'rgba(255,255,255,0.03)',
                    color: expandedExplains[prob.id] ? 'var(--teal)' : 'var(--text-muted)',
                    border: `1px solid ${expandedExplains[prob.id] ? 'rgba(45, 212, 191, 0.3)' : 'var(--border)'}`,
                    transition: 'all 0.2s'
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>menu_book</span>
                    {expandedExplains[prob.id] ? 'Hide Explanation' : 'Explanation'}
                  </button>

                  <button onClick={() => toggleNotes(prob.id)} style={{
                    padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem',
                    background: expandedNotes[prob.id] ? 'rgba(168, 85, 247, 0.15)' : 'rgba(255,255,255,0.03)',
                    color: expandedNotes[prob.id] ? 'var(--p)' : 'var(--text-muted)',
                    border: `1px solid ${expandedNotes[prob.id] ? 'rgba(168, 85, 247, 0.3)' : 'var(--border)'}`,
                    transition: 'all 0.2s'
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>edit_note</span>
                    {expandedNotes[prob.id] ? 'Hide Notes' : 'My Notes / Code'}
                  </button>
                </div>

                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {expandedHints[prob.id] && (
                    <div style={{ background: 'rgba(250, 204, 21, 0.05)', padding: '1.25rem', borderRadius: '8px', borderLeft: '4px solid #facc15', color: '#fef08a', animation: 'fadeIn 0.3s ease' }}>
                      <strong style={{ display: 'block', marginBottom: '0.25rem', color: '#facc15' }}>Quick Hint:</strong> 
                      {prob.hint}
                    </div>
                  )}

                  {expandedExplains[prob.id] && (
                    <div style={{ background: 'rgba(45, 212, 191, 0.05)', padding: '1.25rem', borderRadius: '8px', borderLeft: '4px solid var(--teal)', color: '#ccfbf1', animation: 'fadeIn 0.3s ease' }}>
                      <strong style={{ display: 'block', marginBottom: '0.25rem', color: 'var(--teal)' }}>Approach & Explanation:</strong> 
                      {prob.explain}
                    </div>
                  )}

                  {expandedNotes[prob.id] && (
                    <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)', animation: 'fadeIn 0.3s ease' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>Personal Notes & Solution Code:</p>
                        <button className="btn primary" onClick={() => saveNote(prob.id)} style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>Save to DB</button>
                      </div>
                      <div style={{ height: '300px', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden', background: '#09090E' }}>
                        <Editor
                          height="100%"
                          defaultLanguage="python"
                          theme="vs-dark"
                          value={localNotes[prob.id] !== undefined ? localNotes[prob.id] : (user?.notes?.[prob.id] || '')}
                          onChange={(value) => handleNoteChange(prob.id, value)}
                          options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            fontFamily: 'JetBrains Mono, monospace',
                            scrollBeyondLastLine: false,
                            padding: { top: 16 }
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {(!PROBS[activeTab] || PROBS[activeTab].length === 0) && (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-faded)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}>pending</span>
              <h2>More Problems Coming Soon</h2>
              <p>We are actively adding high-quality problems to this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
