import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ProgressContext } from '../context/ProgressContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(ProgressContext);
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
      navigate('/');
    } else {
      navigate('/auth');
    }
  };

  return (
    <aside className="sidebar">
      <div className="logo" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>DSA<span>Mastery</span></div>
      
      <NavLink to="/dashboard" className={({ isActive }) => `nb ${isActive ? 'on' : ''}`} end>
        🏠 Dashboard
      </NavLink>
      <NavLink to="/schedule" className={({ isActive }) => `nb ${isActive ? 'on' : ''}`}>
        📅 Schedule
      </NavLink>
      <NavLink to="/phases" className={({ isActive }) => `nb ${isActive ? 'on' : ''}`}>
        🧭 Phases
      </NavLink>
      <NavLink to="/learn" className={({ isActive }) => `nb ${isActive ? 'on' : ''}`}>
        🧠 Learn
      </NavLink>
      <NavLink to="/cheat" className={({ isActive }) => `nb ${isActive ? 'on' : ''}`}>
        📝 Cheat Sheet
      </NavLink>
      <NavLink to="/flashcards" className={({ isActive }) => `nb ${isActive ? 'on' : ''}`}>
        🧠 Flashcards
      </NavLink>
      <NavLink to="/practice" className={({ isActive }) => `nb ${isActive ? 'on' : ''}`}>
        💻 Practice
      </NavLink>
      <NavLink to="/quiz" className={({ isActive }) => `nb ${isActive ? 'on' : ''}`}>
        ✅ Quiz
      </NavLink>
      <NavLink to="/tips" className={({ isActive }) => `nb ${isActive ? 'on' : ''}`}>
        💡 Tips
      </NavLink>
      <NavLink to="/resources" className={({ isActive }) => `nb ${isActive ? 'on' : ''}`}>
        📚 Resources
      </NavLink>

      <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
        <button 
          className="btn" 
          onClick={handleAuthClick} 
          style={{ 
            width: '100%',
            borderColor: isAuthenticated ? 'var(--border)' : 'var(--p)', 
            color: isAuthenticated ? 'var(--text-muted)' : 'var(--text)' 
          }}
        >
          {isAuthenticated ? 'Log Out' : 'Sign In'}
        </button>
      </div>
    </aside>
  );
};

export default Navbar;
