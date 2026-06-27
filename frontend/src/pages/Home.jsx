import React, { useContext, useState, useEffect } from 'react';
import { ProgressContext } from '../context/ProgressContext';
import { WEEKS } from '../data';

export const Home = () => {
  const { user, completedWeeks, updateUserField, token } = useContext(ProgressContext);
  const [lcUsername, setLcUsername] = useState('');
  const [lcStats, setLcStats] = useState(null);
  const [loadingLc, setLoadingLc] = useState(false);

  const totalWeeks = WEEKS.length;
  const completedCount = completedWeeks.length;
  const progressPercent = Math.round((completedCount / totalWeeks) * 100) || 0;

  let currentWeek = WEEKS.find(w => !completedWeeks.includes(w.w));
  if (!currentWeek) currentWeek = WEEKS[WEEKS.length - 1];

  useEffect(() => {
    if (user?.leetcodeUsername) {
      fetchLeetcodeStats(user.leetcodeUsername);
    }
  }, [user?.leetcodeUsername]);

  const fetchLeetcodeStats = async (username) => {
    setLoadingLc(true);
    try {
      const res = await fetch(`http://localhost:5000/api/leetcode/${username}`, {
        headers: { 'x-auth-token': token }
      });
      const data = await res.json();
      if (res.ok) setLcStats(data);
    } catch (err) {
      console.error(err);
    }
    setLoadingLc(false);
  };

  const handleSaveLc = async () => {
    if (lcUsername.trim()) {
      await updateUserField({ leetcodeUsername: lcUsername.trim() });
    }
  };

  // Generate last 30 days for heatmap
  const getLast30Days = () => {
    const days = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().split('T')[0]);
    }
    return days;
  };

  const heatmapDays = getLast30Days();
  const activityLog = user?.activityLog || [];
  
  // Calculate Streak
  let streak = 0;
  let today = new Date().toISOString().split('T')[0];
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  let yesterdayStr = yesterday.toISOString().split('T')[0];

  if (activityLog.includes(today)) streak++;
  let checkDate = activityLog.includes(today) ? yesterday : new Date();
  if (!activityLog.includes(today) && activityLog.includes(yesterdayStr)) {
    streak++;
    checkDate.setDate(checkDate.getDate() - 1);
  }

  while(true) {
    let dStr = checkDate.toISOString().split('T')[0];
    if (activityLog.includes(dStr) && dStr !== today && dStr !== yesterdayStr) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else if (dStr !== today && dStr !== yesterdayStr) {
      break;
    } else {
      checkDate.setDate(checkDate.getDate() - 1);
    }
  }

  return (
    <div className="page on">
      <div className="hero">
        <h1>Dashboard</h1>
        <p>Welcome back, {user?.fullName || user?.username || user?.email?.split('@')[0] || 'User'}. Keep the momentum going.</p>
      </div>

      <div className="grid" style={{ marginBottom: '3rem' }}>
        {/* Streak & Heatmap */}
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ margin: '0 0 0.25rem 0' }}>Activity Heatmap</h3>
              <p style={{ color: 'var(--sub)', margin: 0, fontSize: '0.9rem' }}>Last 30 days of study</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h2 style={{ margin: 0, color: 'var(--p)', fontSize: '2rem' }}>{streak} <span style={{ fontSize: '1rem', color: 'var(--sub)' }}>Day Streak</span></h2>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {heatmapDays.map(day => {
              const isActive = activityLog.includes(day);
              return (
                <div 
                  key={day} 
                  title={day}
                  style={{
                    width: '18px', height: '18px', borderRadius: '4px',
                    background: isActive ? 'var(--p)' : 'rgba(255,255,255,0.05)',
                    boxShadow: isActive ? '0 0 8px var(--p-glow)' : 'none'
                  }}
                ></div>
              );
            })}
          </div>
        </div>

        {/* LeetCode Integration */}
        <div className="card">
          <h3 style={{ margin: '0 0 1rem 0' }}>LeetCode Stats</h3>
          {!user?.leetcodeUsername ? (
            <div>
              <p style={{ color: 'var(--sub)', fontSize: '0.9rem', marginBottom: '1rem' }}>Link your LeetCode account to automatically track your solved problems.</p>
              <input 
                type="text" 
                placeholder="LeetCode Username" 
                value={lcUsername} 
                onChange={e => setLcUsername(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem' }}
              />
              <button className="btn primary" style={{ width: '100%' }} onClick={handleSaveLc}>Connect Account</button>
            </div>
          ) : loadingLc ? (
            <p style={{ color: 'var(--sub)' }}>Fetching stats...</p>
          ) : lcStats && lcStats.solvedProblem ? (
            <div>
              <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}><strong>{user.leetcodeUsername}</strong></p>
              <h2 style={{ fontSize: '2.5rem', margin: '0 0 1rem 0', color: 'var(--teal)' }}>{lcStats.solvedProblem} <span style={{ fontSize: '1rem', color: 'var(--sub)' }}>Solved</span></h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--sub)', fontSize: '0.9rem' }}>
                <span style={{ color: '#4ade80' }}>Easy: {lcStats.easySolved}</span>
                <span style={{ color: '#facc15' }}>Med: {lcStats.mediumSolved}</span>
                <span style={{ color: '#f87171' }}>Hard: {lcStats.hardSolved}</span>
              </div>
            </div>
          ) : (
             <p style={{ color: '#f87171' }}>Could not load stats. Check username.</p>
          )}
        </div>
      </div>

      <div className="sec">
        <h2>Overall Progress</h2>
        <div className="pg-bar"><div className="pg-fill" style={{ width: `${progressPercent}%` }}></div></div>
        <p style={{ marginTop: '0.5rem', color: 'var(--sub)' }}>{progressPercent}% Complete ({completedCount}/{totalWeeks} weeks)</p>
      </div>

      <div className="sec">
        <h2>Current Focus</h2>
        <div className="w-card">
          <div className="w-head">
            <span className="w-title">Week {currentWeek.w}: {currentWeek.title}</span>
            <span className="phase-chip">Phase {currentWeek.ph}</span>
          </div>
          <div className="w-body">
            <p className="w-topics"><strong>Topics:</strong> {currentWeek.topics}</p>
            <p className="w-goal">🎯 Goal: {currentWeek.daily}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
