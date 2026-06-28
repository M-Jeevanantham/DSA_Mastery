import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import { ProgressContext } from '../context/ProgressContext';

const InputField = ({ label, name, type = 'text', required = false, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const currentType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div>
      <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--sub)' }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <input 
          type={currentType} 
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          style={{ 
            width: '100%', 
            padding: '0.75rem', 
            paddingRight: isPassword ? '2.5rem' : '0.75rem',
            borderRadius: '6px', 
            border: '1px solid var(--border)', 
            background: 'var(--bg)', 
            color: 'var(--text)' 
          }} 
        />
        {isPassword && (
          <span 
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              userSelect: 'none',
              filter: 'grayscale(100%) opacity(0.6)'
            }}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        )}
      </div>
    </div>
  );
};

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '',
    fullName: '',
    username: '',
    currentRole: '',
    targetCompany: '',
    college: '',
    yearsOfExperience: ''
  });
  const [error, setError] = useState('');
  const { login } = useContext(ProgressContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.msg || 'Authentication failed');
        return;
      }

      // Success!
      login(data.token, data.user);
      navigate('/dashboard'); // redirect to dashboard
    } catch (err) {
      setError('Server connection error. Is backend running?');
    }
  };

  return (
    <div className="page on">
      <div className="hero" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
        <p>{isLogin ? 'Log in to sync your progress.' : 'Tell us a bit about yourself to track your DSA mastery.'}</p>
      </div>

      <div className="card" style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem' }}>
        {error && (
          <div style={{ background: 'rgba(255, 68, 68, 0.1)', color: '#ff4444', padding: '0.75rem', borderRadius: '6px', marginBottom: '1.5rem', textAlign: 'center', border: '1px solid #ff4444' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: isLogin ? '1fr' : '1fr 1fr', gap: '1rem' }}>
            <InputField label="Email Address" name="email" type="email" required={true} value={formData.email} onChange={handleChange} />
            <InputField label="Password" name="password" type="password" required={true} value={formData.password} onChange={handleChange} />
          </div>

          {!isLogin && (
            <>
              <div style={{ borderTop: '1px solid var(--border)', margin: '0.5rem 0' }}></div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
                <InputField label="Display Username" name="username" value={formData.username} onChange={handleChange} />
              </div>

              <InputField label="Current Role / Student Status" name="currentRole" value={formData.currentRole} onChange={handleChange} />
              <InputField label="Target Company (e.g., FAANG, TCS)" name="targetCompany" value={formData.targetCompany} onChange={handleChange} />

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                <InputField label="College / University" name="college" value={formData.college} onChange={handleChange} />
                <InputField label="Years of Exp." name="yearsOfExperience" type="number" value={formData.yearsOfExperience} onChange={handleChange} />
              </div>
            </>
          )}

          <button type="submit" className="btn primary" style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', marginTop: '0.5rem' }}>
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--sub)' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ color: 'var(--p)', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </span>
        </div>
      </div>
    </div>
  );
};
