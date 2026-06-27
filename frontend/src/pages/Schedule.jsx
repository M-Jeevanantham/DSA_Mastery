import React, { useContext } from 'react';
import { ProgressContext } from '../context/ProgressContext';
import { WEEKS } from '../data';

export const Schedule = () => {
  const { completedWeeks, toggleWeek } = useContext(ProgressContext);

  // Group weeks by month (4 weeks per month)
  const getMonthGroup = (weekNum) => {
    if (weekNum <= 4) return "Month 1: Laying the Foundation";
    if (weekNum <= 8) return "Month 2: Core Data Structures & Algorithms";
    return "Month 3: Advanced Topics & Mastery";
  };

  const groupedWeeks = WEEKS.reduce((acc, week) => {
    const month = getMonthGroup(week.w);
    if (!acc[month]) acc[month] = [];
    acc[month].push(week);
    return acc;
  }, {});

  return (
    <div className="page on">
      <div className="hero">
        <h1>12-Week Schedule</h1>
        <p>A day-by-day progression from arrays to dynamic programming.</p>
      </div>

      <div className="schedule-wrap">
        {Object.keys(groupedWeeks).map((monthName) => (
          <div key={monthName} style={{ marginBottom: '2rem' }}>
            <h2 className="month-hdr">{monthName}</h2>
            <div className="grid">
              {groupedWeeks[monthName].map((week) => {
                const isDone = completedWeeks.includes(week.w);
                return (
                  <div key={week.w} className={`card w-card ${isDone ? 'done' : ''}`} style={{ opacity: isDone ? 0.6 : 1 }}>
                    <div className="w-head">
                      <span className="w-title">Week {week.w}: {week.title}</span>
                      <span className="phase-chip">Phase {week.ph}</span>
                    </div>
                    <div className="w-body">
                      <p className="w-topics" style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}><strong>Topics:</strong> {week.topics}</p>
                      <p className="w-goal" style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>🎯 Goal: {week.daily}</p>
                      <p className="w-prac" style={{ fontSize: '0.9rem', color: 'var(--sub)' }}>
                        <strong>Practice:</strong> {week.probs}
                      </p>
                      <button 
                        className={`btn ${isDone ? '' : 'primary'}`} 
                        style={{ marginTop: '1rem', width: '100%' }}
                        onClick={() => toggleWeek(week.w)}
                      >
                        {isDone ? 'Mark Incomplete' : 'Mark Done'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
