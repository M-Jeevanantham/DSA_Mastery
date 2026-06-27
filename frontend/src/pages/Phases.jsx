import React, { useState } from 'react';
import { PHASES } from '../data';
import { useNavigate } from 'react-router-dom';

export const Phases = () => {
  const [expandedPhase, setExpandedPhase] = useState(null);
  const navigate = useNavigate();

  const togglePhase = (phaseId) => {
    if (expandedPhase === phaseId) {
      setExpandedPhase(null);
    } else {
      setExpandedPhase(phaseId);
    }
  };

  const handleStudyClick = () => {
    navigate('/learn');
  };

  return (
    <div className="page on">
      <div className="hero">
        <h1>Phase Explorer</h1>
        <p>120+ topics grouped into 6 logical phases. Click to expand.</p>
      </div>

      <div className="phases-wrap">
        {PHASES.map((phase) => (
          <div key={phase.num} className="card p-card" style={{ marginBottom: '1rem' }}>
            <div 
              className="p-head" 
              onClick={() => togglePhase(phase.num)} 
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
            >
              <div>
                <h2>{phase.num}. {phase.title}</h2>
                <p style={{ color: 'var(--sub)', fontSize: '0.9rem' }}>{phase.sub}</p>
              </div>
              <div style={{ fontSize: '1.5rem', color: 'var(--purp)' }}>
                {expandedPhase === phase.num ? '−' : '+'}
              </div>
            </div>

            {expandedPhase === phase.num && (
              <div className="p-body" style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                <div className="chip-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {phase.secs.map(sec => sec.items.map((chip, idx) => (
                    <span key={sec.t + idx} className="chip" style={{ background: 'var(--bg3)', border: '1px solid var(--border2)', color: 'var(--text)' }}>
                      {chip}
                    </span>
                  )))}
                </div>
                
                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                  <button className="btn primary" onClick={handleStudyClick}>Study Phase {phase.num}</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
