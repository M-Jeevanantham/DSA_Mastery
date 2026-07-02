import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ProgressContext } from '../context/ProgressContext';

const Navbar = ({ isCollapsed, toggleSidebar }) => {
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
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="logo" style={{ 
        justifyContent: isCollapsed ? 'center' : 'space-between', 
        paddingLeft: isCollapsed ? '0' : '0.5rem',
        marginBottom: isCollapsed ? '2rem' : '2.5rem'
      }}>
        {!isCollapsed && <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>DSA<span>Mastery</span></div>}
        <button onClick={toggleSidebar} style={{ 
          background: 'transparent', border: 'none', color: 'var(--text)', 
          cursor: 'pointer', display: 'flex', alignItems: 'center',
          padding: '0.25rem', borderRadius: '4px'
        }} className="hover-glass">
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>menu</span>
        </button>
      </div>
      
      <div className="nav-group">
        {!isCollapsed && <div className="nav-group-title">Menu</div>}
        <NavLink to="/dashboard" className={({ isActive }) => `nb ${isActive ? 'on' : ''}`} end title="Dashboard">
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>dashboard</span>
          {!isCollapsed && <span>Dashboard</span>}
        </NavLink>
        <NavLink to="/schedule" className={({ isActive }) => `nb ${isActive ? 'on' : ''}`} title="Schedule">
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>calendar_month</span>
          {!isCollapsed && <span>Schedule</span>}
        </NavLink>
        <NavLink to="/phases" className={({ isActive }) => `nb ${isActive ? 'on' : ''}`} title="Phases">
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>explore</span>
          {!isCollapsed && <span>Phases</span>}
        </NavLink>
      </div>

      <div className="nav-group">
        {!isCollapsed && <div className="nav-group-title">Study</div>}
        <NavLink to="/learn" className={({ isActive }) => `nb ${isActive ? 'on' : ''}`} title="Learn">
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>school</span>
          {!isCollapsed && <span>Learn</span>}
        </NavLink>
        <NavLink to="/cheat" className={({ isActive }) => `nb ${isActive ? 'on' : ''}`} title="Cheat Sheet">
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>description</span>
          {!isCollapsed && <span>Cheat Sheet</span>}
        </NavLink>
        <NavLink to="/flashcards" className={({ isActive }) => `nb ${isActive ? 'on' : ''}`} title="Flashcards">
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>style</span>
          {!isCollapsed && <span>Flashcards</span>}
        </NavLink>
      </div>

      <div className="nav-group">
        {!isCollapsed && <div className="nav-group-title">Test & Apply</div>}
        <NavLink to="/leaderboard" className={({ isActive }) => `nb ${isActive ? 'on' : ''}`} title="Leaderboard">
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>leaderboard</span>
          {!isCollapsed && <span>Leaderboard</span>}
        </NavLink>
        <NavLink to="/practice" className={({ isActive }) => `nb ${isActive ? 'on' : ''}`} title="Practice">
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>terminal</span>
          {!isCollapsed && <span>Practice</span>}
        </NavLink>
        <NavLink to="/quiz" className={({ isActive }) => `nb ${isActive ? 'on' : ''}`} title="Quiz">
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>quiz</span>
          {!isCollapsed && <span>Quiz</span>}
        </NavLink>
        <NavLink to="/tips" className={({ isActive }) => `nb ${isActive ? 'on' : ''}`} title="Tips">
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>lightbulb</span>
          {!isCollapsed && <span>Tips</span>}
        </NavLink>
        <NavLink to="/resources" className={({ isActive }) => `nb ${isActive ? 'on' : ''}`} title="Resources">
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>library_books</span>
          {!isCollapsed && <span>Resources</span>}
        </NavLink>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'center' }}>
        <button 
          className="btn" 
          onClick={handleAuthClick} 
          title={isAuthenticated ? 'Log Out' : 'Sign In'}
          style={{ 
            width: isCollapsed ? 'auto' : '100%',
            padding: isCollapsed ? '0.75rem' : '0.6rem 1.25rem',
            borderColor: isAuthenticated ? 'var(--border)' : 'var(--p)', 
            color: isAuthenticated ? 'var(--text-muted)' : 'var(--text)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
            {isAuthenticated ? 'logout' : 'login'}
          </span>
          {!isCollapsed && <span>{isAuthenticated ? 'Log Out' : 'Sign In'}</span>}
        </button>
      </div>
    </aside>
  );
};

export default Navbar;
