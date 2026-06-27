import React, { createContext, useState, useEffect } from 'react';

export const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [completedWeeks, setCompletedWeeks] = useState([]);
  const [completedTopics, setCompletedTopics] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // Load progress when token changes (user logs in)
  useEffect(() => {
    if (token) {
      fetchProgress();
    }
  }, [token]);

  const fetchProgress = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/progress', {
        headers: {
          'x-auth-token': token
        }
      });
      const data = await res.json();
      if (data && !data.msg) {
        setUser(data);
        setCompletedWeeks(data.progress?.completedWeeks || []);
        setCompletedTopics(data.progress?.completedTopics || []);
      } else if (data.msg) {
        logout(); // Invalid token
      }
    } catch (err) {
      console.error('Error fetching progress', err);
    }
  };

  const toggleWeek = async (weekNum) => {
    let newWeeks = [...completedWeeks];
    if (newWeeks.includes(weekNum)) {
      newWeeks = newWeeks.filter(w => w !== weekNum);
    } else {
      newWeeks.push(weekNum);
    }
    setCompletedWeeks(newWeeks);

    // Also update activity log when making progress
    const today = new Date().toISOString().split('T')[0];
    let newActivityLog = user?.activityLog || [];
    if (!newActivityLog.includes(today)) {
      newActivityLog.push(today);
    }

    if (token) {
      await fetch('http://localhost:5000/api/progress', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({ 
          completedWeeks: newWeeks,
          activityLog: newActivityLog
        })
      });
      setUser(prev => ({ ...prev, activityLog: newActivityLog }));
    }
  };

  const updateUserField = async (fields) => {
    if (token) {
      const res = await fetch('http://localhost:5000/api/progress', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(fields)
      });
      const data = await res.json();
      setUser(data);
      return data;
    }
  };

  const login = (newToken, userProgress) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    if (userProgress) {
      setCompletedWeeks(userProgress.completedWeeks || []);
      setCompletedTopics(userProgress.completedTopics || []);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setCompletedWeeks([]);
    setCompletedTopics([]);
  };

  return (
    <ProgressContext.Provider value={{
      user,
      token,
      completedWeeks,
      completedTopics,
      toggleWeek,
      updateUserField,
      login,
      logout,
      isAuthenticated: !!token
    }}>
      {children}
    </ProgressContext.Provider>
  );
};
