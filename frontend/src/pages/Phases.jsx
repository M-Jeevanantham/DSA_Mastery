import React, { useState, useContext } from 'react';
import { PHASES } from '../data';
import { useNavigate } from 'react-router-dom';
import { ProgressContext } from '../context/ProgressContext';

export const Phases = () => {
  const [expandedPhase, setExpandedPhase] = useState(null);
  const navigate = useNavigate();
  const { completedTopics, toggleTopic } = useContext(ProgressContext);

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
            Phase Explorer
          </h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            120+ topics grouped into 6 logical phases. Click to explore.
          </p>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '1rem', paddingTop: '2rem', paddingBottom: '3rem' }}>
        <div style={{ maxWidth: '900px' }}>
          {PHASES.map((phase) => {
            const isExpanded = expandedPhase === phase.num;
            const totalTopicsInPhase = phase.secs.reduce((sum, sec) => sum + sec.items.length, 0);
            const completedInPhase = phase.secs.reduce((sum, sec) => sum + sec.items.filter(item => completedTopics?.includes(item)).length, 0);

            return (
              <div 
                key={phase.num} 
                className="card" 
                style={{ 
                  marginBottom: '1.5rem', 
                  padding: 0,
                  border: isExpanded ? '1px solid rgba(168, 85, 247, 0.4)' : '1px solid var(--border)',
                  boxShadow: isExpanded ? '0 10px 30px rgba(168, 85, 247, 0.15)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <div 
                  onClick={() => togglePhase(phase.num)} 
                  style={{ 
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
                    padding: '1.5rem 2rem',
                    background: isExpanded ? 'rgba(168, 85, 247, 0.05)' : 'transparent',
                    borderBottom: isExpanded ? '1px solid var(--border)' : '1px solid transparent',
                    transition: 'all 0.3s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
                    <div style={{ 
                      width: '48px', height: '48px', borderRadius: '12px',
                      background: isExpanded ? 'linear-gradient(135deg, var(--p), #7C3AED)' : 'rgba(255,255,255,0.05)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.5rem', fontWeight: 'bold', color: isExpanded ? '#fff' : 'var(--text-muted)',
                      boxShadow: isExpanded ? '0 4px 15px rgba(168, 85, 247, 0.4)' : 'none',
                      transition: 'all 0.3s'
                    }}>
                      {phase.num}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h2 style={{ margin: '0 0 0.25rem 0', fontSize: '1.5rem', color: isExpanded ? '#fff' : 'var(--text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {phase.title}
                        {completedInPhase === totalTopicsInPhase && totalTopicsInPhase > 0 && (
                          <span title="Phase Mastered" style={{ fontSize: '1.2rem' }}>🏆</span>
                        )}
                      </h2>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>{phase.sub}</p>
                        
                        {/* Progress Bar */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, maxWidth: '200px' }}>
                          <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '99px', flex: 1, overflow: 'hidden' }}>
                            <div style={{ 
                              height: '100%', 
                              width: `${(completedInPhase / totalTopicsInPhase) * 100}%`,
                              background: completedInPhase === totalTopicsInPhase ? '#10b981' : 'var(--p)'
                            }}></div>
                          </div>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-faded)' }}>{completedInPhase}/{totalTopicsInPhase}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ 
                    width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}>
                    <span className="material-symbols-outlined">expand_more</span>
                  </div>
                </div>

                <div style={{ 
                  maxHeight: isExpanded ? '2000px' : '0', 
                  overflow: 'hidden', 
                  transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease',
                  opacity: isExpanded ? 1 : 0
                }}>
                  <div style={{ padding: '2rem' }}>
                    {phase.secs.map((sec, i) => (
                      <div key={i} style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ 
                          color: 'var(--teal)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', 
                          marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' 
                        }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>scatter_plot</span>
                          {sec.t}
                        </h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {sec.items.map((chip, idx) => {
                            const isCompleted = completedTopics?.includes(chip);
                            return (
                            <span 
                              key={idx} 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleTopic(chip);
                              }}
                              title={isCompleted ? "Mark as incomplete" : "Mark as complete"}
                              style={{ 
                                cursor: 'pointer',
                                background: isCompleted ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.03)', 
                                border: isCompleted ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(255,255,255,0.1)', 
                                color: isCompleted ? '#10b981' : 'var(--text)',
                                padding: '0.5rem 1rem',
                                borderRadius: '99px',
                                fontSize: '0.9rem',
                                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                transition: 'all 0.2s ease'
                              }}
                              onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(1.2)'}
                              onMouseOut={(e) => e.currentTarget.style.filter = 'none'}
                            >
                              {chip}
                              {isCompleted && <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>task_alt</span>}
                            </span>
                          )})}
                        </div>
                      </div>
                    ))}
                    
                    <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-start' }}>
                      <button 
                        className="btn primary" 
                        onClick={handleStudyClick}
                        style={{ padding: '0.8rem 2rem', fontSize: '1.05rem', borderRadius: '99px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                      >
                        Start Learning Phase {phase.num}
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
