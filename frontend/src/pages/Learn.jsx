import React, { useState } from 'react';
import { LESSONS } from '../data/lessons';

// Custom Widget: Big O Visualizer
const BigOVisualizer = () => {
  const [n, setN] = useState(10);
  return (
    <div className="widget" style={{ padding: '1rem', background: 'var(--bg)', borderRadius: '8px', border: '1px solid var(--border)', marginTop: '1rem' }}>
      <h4>Big O Growth Visualizer</h4>
      <input type="range" min="1" max="100" value={n} onChange={(e) => setN(Number(e.target.value))} style={{ width: '100%', margin: '1rem 0' }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', fontSize: '0.9rem' }}>
        <div><strong>O(1):</strong> 1 op</div>
        <div><strong>O(N):</strong> {n} ops</div>
        <div><strong>O(N²):</strong> {n * n} ops</div>
      </div>
      <div style={{ height: '10px', background: 'var(--purp)', width: '100%', marginTop: '1rem', transformOrigin: 'left', transform: `scaleX(${n/100})` }}></div>
    </div>
  );
};

// Custom Widget: Bit Playground
const BitPlayground = () => {
  const [bits, setBits] = useState([0,0,0,0,0,0,0,0]);
  const toggleBit = (idx) => {
    const newBits = [...bits];
    newBits[idx] = newBits[idx] === 1 ? 0 : 1;
    setBits(newBits);
  };
  const decValue = parseInt(bits.join(''), 2);
  
  return (
    <div className="widget" style={{ padding: '1rem', background: 'var(--bg)', borderRadius: '8px', border: '1px solid var(--border)', marginTop: '1rem' }}>
      <h4>8-bit Playground</h4>
      <div style={{ display: 'flex', gap: '0.5rem', margin: '1rem 0' }}>
        {bits.map((b, i) => (
          <button key={i} onClick={() => toggleBit(i)} className={`btn ${b ? 'primary' : ''}`} style={{ padding: '0.5rem 1rem' }}>{b}</button>
        ))}
      </div>
      <p>Decimal Value: <strong>{decValue}</strong></p>
    </div>
  );
};

// Custom Widget: Base Converter
const BaseConverter = () => {
  const [val, setVal] = useState("42");
  const num = parseInt(val, 10) || 0;
  return (
    <div className="widget" style={{ padding: '1rem', background: 'var(--bg)', borderRadius: '8px', border: '1px solid var(--border)', marginTop: '1rem' }}>
      <h4>Base Converter</h4>
      <input type="number" value={val} onChange={(e) => setVal(e.target.value)} style={{ padding: '0.5rem', background: 'var(--dark)', color: 'var(--text)', border: '1px solid var(--border)', width: '100%' }} />
      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <span className="chip">BIN: {num.toString(2)}</span>
        <span className="chip">OCT: {num.toString(8)}</span>
        <span className="chip">HEX: {num.toString(16).toUpperCase()}</span>
      </div>
    </div>
  );
};

export const Learn = () => {
  const [activePhase, setActivePhase] = useState('p1');
  const [expandedLesson, setExpandedLesson] = useState(null);

  const renderWidget = (widgetType) => {
    switch (widgetType) {
      case 'big-o-visualizer': return <BigOVisualizer />;
      case 'bit-playground': return <BitPlayground />;
      case 'base-converter': return <BaseConverter />;
      default: return null;
    }
  };

  return (
    <div className="page on">
      <div className="hero">
        <h1>Interactive Lessons</h1>
        <p>Learn core concepts with interactive widgets and runnable code.</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2rem' }}>
        {['p1', 'p2', 'p3', 'p4', 'p5', 'p6'].map(p => (
          <button 
            key={p} 
            className={`btn ${activePhase === p ? 'primary' : ''}`}
            onClick={() => setActivePhase(p)}
          >
            Phase {p.replace('p', '')}
          </button>
        ))}
      </div>

      <div className="lessons-wrap">
        {LESSONS[activePhase]?.map((lesson, idx) => (
          <div key={idx} className="card l-card" style={{ marginBottom: '1.5rem' }}>
            <div 
              className="l-head" 
              onClick={() => setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id)}
              style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}
            >
              <h3>{lesson.title}</h3>
              <span style={{ color: 'var(--purp)' }}>{expandedLesson === lesson.id ? '−' : '+'}</span>
            </div>
            
            {expandedLesson === lesson.id && (
              <div className="l-body" style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                <p style={{ lineHeight: '1.6' }}>{lesson.explanation}</p>
                
                <div style={{ background: 'rgba(168, 85, 247, 0.1)', borderLeft: '4px solid var(--purp)', padding: '1rem', margin: '1.5rem 0', borderRadius: '0 8px 8px 0' }}>
                  <strong>💡 Key Insight:</strong> {lesson.insight}
                </div>

                <pre style={{ background: '#1e1e1e', padding: '1rem', borderRadius: '8px', overflowX: 'auto', color: '#d4d4d4', fontFamily: 'monospace' }}>
                  <code>{lesson.code}</code>
                </pre>
                
                <p style={{ marginTop: '1rem', color: 'var(--teal)', fontWeight: 'bold' }}>⚡ {lesson.complexity}</p>

                {lesson.widget && renderWidget(lesson.widget)}
              </div>
            )}
          </div>
        ))}
        
        {(!LESSONS[activePhase] || LESSONS[activePhase].length === 0) && (
          <p style={{ color: 'var(--sub)' }}>Lessons for this phase are coming soon.</p>
        )}
      </div>
    </div>
  );
};
