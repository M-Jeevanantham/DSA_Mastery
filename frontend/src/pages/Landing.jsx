import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressContext } from '../context/ProgressContext';

export const Landing = () => {
  const { isAuthenticated } = useContext(ProgressContext);
  const navigate = useNavigate();

  return (
    <div className="page on" style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', textAlign: 'center' }}>
      
      {/* Hero Section */}
      <div className="hero" style={{ marginBottom: '6rem', position: 'relative' }}>
        <div style={{ 
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
          width: '100%', maxWidth: '600px', height: '600px', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 60%)', 
          zIndex: -1, pointerEvents: 'none' 
        }}></div>
        
        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', marginBottom: '1.5rem', background: 'linear-gradient(135deg, #fff 0%, #A855F7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.1, letterSpacing: '-2px' }}>
          Master DSA.<br/>Zero Guesswork.
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px', lineHeight: '1.6' }}>
          A premium, gamified platform designed to take you from a complete beginner to a Data Structures & Algorithms master in 4 structured weeks.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          {isAuthenticated ? (
            <button className="btn primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '99px' }} onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </button>
          ) : (
            <button className="btn primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '99px' }} onClick={() => navigate('/auth')}>
              Start Your Journey
            </button>
          )}
        </div>
      </div>

      {/* Features Grid */}
      <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', color: '#fff', letterSpacing: '-1px' }}>Platform Features</h2>
      <div className="grid" style={{ textAlign: 'left', marginBottom: '8rem' }}>
        
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.1)', color: 'var(--p)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>explore</span>
          </div>
          <h3 style={{ margin: 0, color: '#fff', fontSize: '1.5rem' }}>120-Topic Curriculum</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>Stop jumping randomly between problems. Follow our strictly structured, 6-phase roadmap that guarantees comprehensive knowledge.</p>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(45, 212, 191, 0.1)', color: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>smart_toy</span>
          </div>
          <h3 style={{ margin: 0, color: '#fff', fontSize: '1.5rem' }}>On-Demand AI Tutor</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>Stuck on a concept? Our AI Tutor dynamically generates an exhaustive 32-point master guide for any topic, complete with code and intuition.</p>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(250, 204, 21, 0.1)', color: '#facc15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>military_tech</span>
          </div>
          <h3 style={{ margin: 0, color: '#fff', fontSize: '1.5rem' }}>RPG-Style Ranking</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>Level up from a Novice to a DSA Master. Earn badges for mastering phases and track your granular progress across all 120 topics.</p>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(244, 63, 94, 0.1)', color: '#F43F5E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>sync</span>
          </div>
          <h3 style={{ margin: 0, color: '#fff', fontSize: '1.5rem' }}>LeetCode Sync</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>Link your LeetCode account to automatically import your solved problem stats directly into your personalized dashboard.</p>
        </div>
        
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>edit_note</span>
          </div>
          <h3 style={{ margin: 0, color: '#fff', fontSize: '1.5rem' }}>Personal Code Wiki</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>Save your own solutions, time/space complexity notes, and markdown explanations directly to your account for future review.</p>
        </div>
        
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>local_fire_department</span>
          </div>
          <h3 style={{ margin: 0, color: '#fff', fontSize: '1.5rem' }}>Activity Heatmap</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>Keep yourself accountable and build an unbreakable study streak with our GitHub-style daily activity heatmap tracker.</p>
        </div>

      </div>

      {/* Footer / Final CTA */}
      <div style={{ padding: '4rem 2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--p), transparent)' }}></div>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#fff', letterSpacing: '-1px' }}>Ready to crush your next technical interview?</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>Join the platform and start tracking your DSA journey today.</p>
        {isAuthenticated ? (
          <button className="btn primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '99px' }} onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </button>
        ) : (
          <button className="btn primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '99px' }} onClick={() => navigate('/auth')}>
            Create Free Account
          </button>
        )}
      </div>

    </div>
  );
};
