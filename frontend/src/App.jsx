import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProgressProvider } from './context/ProgressContext';
import './index.css';
import Navbar from './components/Navbar';
// Pages
import {
  Landing, Home, Schedule, Phases, Learn, CheatSheet, Practice, Quiz, Tips, Resources, Auth, Flashcards
} from './pages';
import ProtectedRoute from './components/ProtectedRoute';
import { ProgressContext } from './context/ProgressContext';

const AppContent = () => {
  const { isAuthenticated } = React.useContext(ProgressContext);

  return (
    <div className={isAuthenticated ? "app-container" : ""}>
      {isAuthenticated && <Navbar />}
      <main className={isAuthenticated ? "main-content" : ""}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Home /></ProtectedRoute>} />
          <Route path="/schedule" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Schedule /></ProtectedRoute>} />
          <Route path="/phases" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Phases /></ProtectedRoute>} />
          <Route path="/learn" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Learn /></ProtectedRoute>} />
          <Route path="/cheat" element={<ProtectedRoute isAuthenticated={isAuthenticated}><CheatSheet /></ProtectedRoute>} />
          <Route path="/flashcards" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Flashcards /></ProtectedRoute>} />
          <Route path="/practice" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Practice /></ProtectedRoute>} />
          <Route path="/quiz" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Quiz /></ProtectedRoute>} />
          <Route path="/tips" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Tips /></ProtectedRoute>} />
          <Route path="/resources" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Resources /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <ProgressProvider>
      <Router>
        <AppContent />
      </Router>
    </ProgressProvider>
  );
}

export default App;
