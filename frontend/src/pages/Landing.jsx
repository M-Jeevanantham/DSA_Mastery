import React, { useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ProgressContext } from '../context/ProgressContext';

export const Landing = () => {
  const { isAuthenticated } = useContext(ProgressContext);
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', textAlign: 'center' }}>
      <div className="hero" style={{ marginBottom: '4rem' }}>
        <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', marginBottom: '1.5rem', background: 'linear-gradient(to right, #A855F7, #2DD4BF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Master DSA in 12 Weeks.
        </h1>
        <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto 3rem auto', color: 'var(--text-muted)' }}>
          Stop jumping randomly between LeetCode problems. Follow a structured, day-by-day roadmap, track your progress, build your streak, and save your personal code notes.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button 
            className="btn primary" 
            style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}
            onClick={() => navigate('/auth')}
          >
            Start Your Journey
          </button>
        </div>
      </div>

      <div className="grid" style={{ textAlign: 'left', marginTop: '6rem' }}>
        <div className="card">
          <h3 style={{ marginBottom: '1rem', color: 'var(--p)' }}>📅 12-Week Roadmap</h3>
          <p style={{ color: 'var(--text-muted)' }}>A day-by-day guide starting from Big O Notation and ending in Advanced Graphs and DP.</p>
        </div>
        <div className="card">
          <h3 style={{ marginBottom: '1rem', color: 'var(--teal)' }}>🔥 Streaks & Heatmap</h3>
          <p style={{ color: 'var(--text-muted)' }}>Keep yourself accountable. Track your daily activity on a GitHub-style heatmap.</p>
        </div>
        <div className="card">
          <h3 style={{ marginBottom: '1rem', color: '#F43F5E' }}>📓 Personal Code Wiki</h3>
          <p style={{ color: 'var(--text-muted)' }}>Save your own solutions and markdown notes directly to each practice problem.</p>
        </div>
      </div>
    </div>
  );
};
