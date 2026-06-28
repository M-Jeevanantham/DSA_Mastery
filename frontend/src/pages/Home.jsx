import React, { useContext, useState, useEffect } from 'react';
import { ProgressContext } from '../context/ProgressContext';
import { WEEKS, PHASES } from '../data';

export const Home = () => {
  const { user, completedWeeks, completedTopics, updateUserField, token } = useContext(ProgressContext);
  const [lcUsername, setLcUsername] = useState('');
  const [lcStats, setLcStats] = useState(null);
  const [loadingLc, setLoadingLc] = useState(false);
  const [lcSuccessMsg, setLcSuccessMsg] = useState('');

  const totalTopics = PHASES.reduce((sum, phase) => sum + phase.secs.reduce((s, sec) => s + sec.items.length, 0), 0);
  const completedTopicsCount = completedTopics?.length || 0;
  const progressPercent = Math.round((completedTopicsCount / totalTopics) * 100) || 0;

  const getRank = (count) => {
    if (count < 26) return { name: 'Novice', icon: '🌱', color: '#10b981' };
    if (count < 61) return { name: 'Intermediate', icon: '⚔️', color: '#3b82f6' };
    if (count < 91) return { name: 'Advanced', icon: '🚀', color: '#a855f7' };
    return { name: 'DSA Master', icon: '👑', color: '#f59e0b' };
  };
  const rank = getRank(completedTopicsCount);

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
      const token = localStorage.getItem('token');
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/leetcode/${username}`, {
        headers: { 'x-auth-token': token }
      });
      const data = await res.json();
      if (data.solvedProblem !== undefined) {
        setLcStats({
          solvedProblem: data.solvedProblem,
          easySolved: data.easySolved,
          mediumSolved: data.mediumSolved,
          hardSolved: data.hardSolved
        });
      } else {
        setLcStats(null);
      }
    } catch (err) {
      console.error(err);
      setLcStats(null);
    }
    setLoadingLc(false);
  };

  const handleSaveLc = async () => {
    if (lcUsername.trim()) {
      await updateUserField({ leetcodeUsername: lcUsername.trim() });
      setLcSuccessMsg('Account Connected Successfully! 🎉');
      setTimeout(() => setLcSuccessMsg(''), 3000);
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

  while (true) {
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
    <div className="page on" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* Sticky Header */}
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
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            letterSpacing: '-1px'
          }}>
            <span style={{
              background: 'linear-gradient(to right, #fff, #a1a1aa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Dashboard</span>
            <span style={{
              padding: '0.3rem 0.8rem',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '99px',
              fontSize: '1.1rem',
              fontWeight: 500,
              color: rank.color,
              border: `1px solid ${rank.color}40`,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              letterSpacing: 'normal'
            }}>
              {rank.icon} {rank.name}
            </span>
          </h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Welcome back, <span style={{ color: '#fff', fontWeight: 500 }}>{user?.fullName || user?.username || user?.email?.split('@')[0] || 'User'}</span>. Keep building your momentum!
          </p>
        </div>
        <div style={{ padding: '0.5rem 1.5rem', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '99px', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
          <span style={{ color: 'var(--p)', fontWeight: 600 }}>{progressPercent}% Journey Complete</span>
        </div>
      </div>

      <div className="grid" style={{ marginBottom: '3rem' }}>
        {/* Streak & Heatmap */}
        <div className="card" style={{ gridColumn: 'span 2', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)', borderRadius: '50%'
          }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--p)' }}>local_fire_department</span>
                Activity Heatmap
              </h3>
              <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>Last 30 days of study consistency</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h2 style={{ margin: 0, color: 'var(--p)', fontSize: '2.5rem', lineHeight: 1, textShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}>
                {streak}
              </h2>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Day Streak</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            {heatmapDays.map(day => {
              const isActive = activityLog.includes(day);
              return (
                <div
                  key={day}
                  title={day}
                  style={{
                    width: '20px', height: '20px', borderRadius: '4px',
                    background: isActive ? 'linear-gradient(135deg, var(--p), #7C3AED)' : 'rgba(255,255,255,0.03)',
                    boxShadow: isActive ? '0 0 10px rgba(168, 85, 247, 0.5)' : 'inset 0 1px 0 rgba(255,255,255,0.05)',
                    border: '1px solid',
                    borderColor: isActive ? 'transparent' : 'rgba(255,255,255,0.05)',
                    transition: 'all 0.2s',
                    cursor: 'crosshair'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                ></div>
              );
            })}
          </div>
        </div>

        {/* LeetCode Integration */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--teal)' }}>code</span>
            LeetCode Stats
          </h3>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
            {lcSuccessMsg && (
              <div style={{ position: 'absolute', top: '-10px', left: 0, right: 0, background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.75rem', borderRadius: '8px', textAlign: 'center', border: '1px solid rgba(16, 185, 129, 0.3)', animation: 'fadeIn 0.3s ease', zIndex: 10 }}>
                {lcSuccessMsg}
              </div>
            )}

            {!user?.leetcodeUsername ? (
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                  Link your LeetCode account to automatically sync and visualize your solved problems.
                </p>
                <div style={{ position: 'relative', marginBottom: '1rem' }}>
                  <span className="material-symbols-outlined" style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-faded)', fontSize: '20px' }}>link</span>
                  <input
                    type="text"
                    placeholder="LeetCode Username"
                    value={lcUsername}
                    onChange={e => setLcUsername(e.target.value)}
                    style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.5rem', borderRadius: '8px', fontSize: '0.95rem' }}
                  />
                </div>
                <button className="btn primary" style={{ width: '100%', padding: '0.85rem', borderRadius: '8px' }} onClick={handleSaveLc}>
                  Connect Account
                </button>
              </div>
            ) : loadingLc ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: 'var(--text-muted)' }}>
                <span className="material-symbols-outlined" style={{ animation: 'spin 2s linear infinite', fontSize: '2rem' }}>sync</span>
                Fetching global stats...
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
              </div>
            ) : lcStats && lcStats.solvedProblem ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '99px', marginBottom: '1.5rem', border: '1px solid var(--border)' }}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" alt="LC" style={{ width: '16px', filter: 'invert(1)' }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text)' }}>{user.leetcodeUsername}</span>
                </div>

                <h2 style={{ fontSize: '3.5rem', margin: '0 0 0.5rem 0', color: 'var(--teal)', lineHeight: 1, textShadow: '0 0 20px rgba(45, 212, 191, 0.3)' }}>
                  {lcStats.solvedProblem}
                </h2>
                <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '2rem' }}>Total Solved</p>

                <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ color: '#4ade80', fontSize: '1.2rem', fontWeight: 600 }}>{lcStats.easySolved}</span>
                    <span style={{ color: 'var(--text-faded)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Easy</span>
                  </div>
                  <div style={{ width: '1px', background: 'var(--border)' }}></div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ color: '#facc15', fontSize: '1.2rem', fontWeight: 600 }}>{lcStats.mediumSolved}</span>
                    <span style={{ color: 'var(--text-faded)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Med</span>
                  </div>
                  <div style={{ width: '1px', background: 'var(--border)' }}></div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ color: '#f87171', fontSize: '1.2rem', fontWeight: 600 }}>{lcStats.hardSolved}</span>
                    <span style={{ color: 'var(--text-faded)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Hard</span>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: '#f87171', padding: '2rem 0' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '3rem', marginBottom: '1rem' }}>error</span>
                <p>Could not load stats. Ensure the username is correct.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>

        {/* Overall Progress */}
        <div className="card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <span className="material-symbols-outlined" style={{ color: '#fff' }}>trending_up</span>
            Overall Roadmap Progress
          </h3>
          <div className="pg-bar" style={{ height: '12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '1rem' }}>
            <div className="pg-fill" style={{ width: `${progressPercent}%`, background: 'linear-gradient(90deg, var(--teal), #3b82f6)', boxShadow: '0 0 15px rgba(45, 212, 191, 0.4)' }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
            <span style={{ fontSize: '0.9rem' }}>{progressPercent}% Complete</span>
            <span style={{ fontSize: '0.9rem' }}>{completedTopicsCount} of {totalTopics} topics</span>
          </div>
        </div>

        {/* Current Focus */}
        <div className="card" style={{ borderLeft: '4px solid var(--p)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--p)' }}>my_location</span>
            Current Focus
          </h3>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff' }}>Week {currentWeek.w}: {currentWeek.title}</span>
              <span className="phase-chip" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>Phase {currentWeek.ph}</span>
            </div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
              <strong style={{ color: 'var(--text)' }}>Topics:</strong> {currentWeek.topics}
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(45, 212, 191, 0.1)', color: 'var(--teal)', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.9rem', border: '1px solid rgba(45, 212, 191, 0.2)' }}>
              <span>🎯</span>
              <span>{currentWeek.daily}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
