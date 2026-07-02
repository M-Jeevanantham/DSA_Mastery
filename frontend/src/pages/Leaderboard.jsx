import React, { useState, useEffect, useContext } from 'react';
import { ProgressContext } from '../context/ProgressContext';
import { motion } from 'framer-motion';

export const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(ProgressContext);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_URL}/api/progress/leaderboard`, {
          headers: { 'x-auth-token': token }
        });
        const data = await res.json();
        setLeaders(data);
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="page on" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
            Global Leaderboard
          </h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Compete with others and track your progress in the community.
          </p>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-faded)' }}>
          <span className="material-symbols-outlined" style={{ animation: 'spin 2s linear infinite', fontSize: '3rem' }}>sync</span>
          <p>Loading ranking...</p>
        </div>
      ) : (
        <div style={{ maxWidth: '900px', width: '100%', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '50px 2fr 1fr 1fr', padding: '1rem', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <div>Rank</div>
            <div>Hacker</div>
            <div style={{ textAlign: 'center' }}>Completed Topics</div>
            <div style={{ textAlign: 'center' }}>Activity Score</div>
          </div>
          
          {leaders.map((leader, idx) => {
            const isMe = user?.username === leader.username || user?.email === leader.email;
            let rankColor = 'var(--text)';
            let rankIcon = null;
            if (idx === 0) { rankColor = '#fbbf24'; rankIcon = 'emoji_events'; }
            else if (idx === 1) { rankColor = '#94a3b8'; rankIcon = 'military_tech'; }
            else if (idx === 2) { rankColor = '#b45309'; rankIcon = 'workspace_premium'; }

            return (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={leader._id}
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '50px 2fr 1fr 1fr', 
                  alignItems: 'center',
                  padding: '1rem', 
                  margin: '0.5rem 0',
                  background: isMe ? 'rgba(168, 85, 247, 0.1)' : 'rgba(255,255,255,0.02)', 
                  border: isMe ? '1px solid rgba(168, 85, 247, 0.3)' : '1px solid var(--border)',
                  borderRadius: '12px',
                  boxShadow: isMe ? '0 0 15px rgba(168, 85, 247, 0.2)' : 'none',
                  cursor: 'default'
                }}
                whileHover={{ scale: 1.01, background: isMe ? 'rgba(168, 85, 247, 0.15)' : 'rgba(255,255,255,0.05)' }}
              >
                <div style={{ color: rankColor, fontWeight: 700, fontSize: '1.2rem', display: 'flex', alignItems: 'center' }}>
                  {rankIcon ? <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>{rankIcon}</span> : `#${idx + 1}`}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ fontWeight: 600, color: '#fff' }}>{leader.fullName || leader.username || leader.email.split('@')[0]}</div>
                    {isMe && <span style={{ padding: '0.1rem 0.5rem', background: 'var(--p)', color: '#fff', fontSize: '0.7rem', borderRadius: '4px', textTransform: 'uppercase' }}>You</span>}
                  </div>
                  {leader.leetcodeUsername && (
                    <div style={{ fontSize: '0.8rem', color: 'var(--teal)', display: 'flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.2rem' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>code</span>
                      {leader.leetcodeUsername}
                    </div>
                  )}
                </div>
                <div style={{ textAlign: 'center', color: '#4ade80', fontWeight: 600, fontSize: '1.2rem' }}>
                  {leader.completedTopicsCount}
                </div>
                <div style={{ textAlign: 'center', color: 'var(--text-faded)', fontWeight: 500 }}>
                  {leader.activityCount}
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  );
};
