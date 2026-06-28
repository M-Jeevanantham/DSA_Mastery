import React, { useContext } from 'react';
import { ProgressContext } from '../context/ProgressContext';
import { WEEKS } from '../data';

export const Schedule = () => {
  const { completedWeeks, toggleWeek } = useContext(ProgressContext);

  // All weeks belong to a single 1-month intensive plan
  const getMonthGroup = (weekNum) => {
    return "Month 1: Intensive Mastery";
  };

  const groupedWeeks = WEEKS.reduce((acc, week) => {
    const month = getMonthGroup(week.w);
    if (!acc[month]) acc[month] = [];
    acc[month].push(week);
    return acc;
  }, {});

  return (
    <div className="page on" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      
      <div style={{ 
        padding: '0 0 1.5rem 0',
        marginBottom: '1rem',
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
            1-Month Intensive Roadmap
          </h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            A day-by-day 4-week sprint from arrays to dynamic programming.
          </p>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '1rem', paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {Object.keys(groupedWeeks).map((monthName, mIndex) => {
            const monthTitle = monthName.split(':')[1]?.trim() || monthName;
            
            return (
              <div key={monthName} style={{ marginBottom: '5rem' }}>
                
                {/* Month Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                  <div style={{ 
                    width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.1)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem',
                    border: '1px solid rgba(168, 85, 247, 0.4)', color: 'var(--p)'
                  }}>
                    M{mIndex + 1}
                  </div>
                  <h2 style={{ margin: 0, fontSize: '1.8rem', color: '#fff', letterSpacing: '-0.5px' }}>{monthTitle}</h2>
                  <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.3), transparent)' }}></div>
                </div>

                {/* Timeline for the Month */}
                <div style={{ position: 'relative', paddingLeft: '64px' }}>
                  
                  {groupedWeeks[monthName].map((week, idx) => {
                    const isDone = completedWeeks.includes(week.w);
                    const isLast = idx === groupedWeeks[monthName].length - 1;
                    
                    return (
                      <div key={week.w} style={{ position: 'relative', marginBottom: isLast ? 0 : '3rem' }}>
                        
                        {/* Timeline Segment (connects this node to the next) */}
                        {!isLast && (
                          <div style={{ 
                            position: 'absolute', left: '-45px', top: '40px', bottom: '-3rem', width: '2px',
                            background: isDone ? 'linear-gradient(to bottom, var(--teal), var(--teal))' : 'var(--border)',
                            opacity: isDone ? 1 : 0.5
                          }}></div>
                        )}
                        
                        {/* Timeline Node */}
                        <div style={{
                          position: 'absolute', left: '-64px', top: '0', 
                          width: '40px', height: '40px', borderRadius: '50%',
                          background: isDone ? 'var(--teal)' : '#1a1a24',
                          border: isDone ? 'none' : '2px solid var(--border)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          zIndex: 2, boxShadow: isDone ? '0 0 15px rgba(45, 212, 191, 0.4)' : 'none',
                          color: isDone ? '#000' : 'var(--text-muted)'
                        }}>
                          {isDone ? (
                            <span className="material-symbols-outlined" style={{ fontSize: '20px', fontWeight: 'bold' }}>check</span>
                          ) : (
                            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{week.w}</span>
                          )}
                        </div>

                        {/* Week Card */}
                        <div className="card" style={{ 
                          border: isDone ? '1px solid rgba(45, 212, 191, 0.4)' : '1px solid var(--border)',
                          background: isDone ? 'rgba(45, 212, 191, 0.03)' : 'rgba(255,255,255,0.02)',
                          padding: '1.5rem',
                          transition: 'all 0.3s ease',
                          opacity: isDone ? 0.8 : 1
                        }}>
                          
                          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                <h3 style={{ margin: 0, color: isDone ? '#fff' : 'var(--text)', fontSize: '1.25rem', fontWeight: 600 }}>
                                  Week {week.w}: {week.title}
                                </h3>
                                <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '99px', background: 'rgba(168, 85, 247, 0.1)', color: 'var(--p)', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
                                  Phase {week.ph}
                                </span>
                              </div>
                            </div>
                            
                            <button 
                              onClick={() => toggleWeek(week.w)}
                              style={{
                                padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem',
                                background: isDone ? 'transparent' : 'linear-gradient(135deg, var(--teal), #3b82f6)',
                                color: isDone ? 'var(--text-muted)' : '#fff',
                                border: isDone ? '1px solid var(--border)' : 'none',
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                boxShadow: isDone ? 'none' : '0 4px 15px rgba(45, 212, 191, 0.3)'
                              }}
                            >
                              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                                {isDone ? 'check_circle' : 'circle'}
                              </span>
                              {isDone ? 'Completed' : 'Mark as Done'}
                            </button>
                          </div>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text)', marginBottom: '0.5rem' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--teal)' }}>menu_book</span>
                                <strong style={{ fontSize: '0.95rem' }}>Topics</strong>
                              </div>
                              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{week.topics}</p>
                            </div>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text)', marginBottom: '0.5rem' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#facc15' }}>track_changes</span>
                                <strong style={{ fontSize: '0.95rem' }}>Goal</strong>
                              </div>
                              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{week.daily}</p>
                            </div>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text)', marginBottom: '0.5rem' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#f87171' }}>code</span>
                                <strong style={{ fontSize: '0.95rem' }}>Practice</strong>
                              </div>
                              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{week.probs}</p>
                            </div>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
