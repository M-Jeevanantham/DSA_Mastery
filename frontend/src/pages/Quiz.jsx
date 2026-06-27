import React, { useState } from 'react';
import { QUIZ } from '../data/quiz';

const getGrade = (score, total) => {
  const pct = (score / total) * 100;
  if (pct >= 90) return { label: 'A+', color: '#00e5a0' };
  if (pct >= 75) return { label: 'A', color: '#4cff91' };
  if (pct >= 60) return { label: 'B', color: '#ffcc00' };
  if (pct >= 45) return { label: 'C', color: '#ff9500' };
  return { label: 'F – Retake!', color: '#ff4444' };
};

export const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [current, setCurrent] = useState(0);

  const handleAnswer = (qId, optIdx) => {
    if (!submitted) {
      setAnswers(prev => ({ ...prev, [qId]: optIdx }));
    }
  };

  const handleSubmit = () => setSubmitted(true);

  const handleRetake = () => {
    setAnswers({});
    setSubmitted(false);
    setCurrent(0);
  };

  const score = submitted ? QUIZ.filter(q => answers[q.id] === q.ans).length : 0;
  const grade = submitted ? getGrade(score, QUIZ.length) : null;

  const q = QUIZ[current];

  return (
    <div className="page on">
      <div className="hero">
        <h1>DSA Knowledge Quiz</h1>
        <p>20 questions across all 6 phases. No peeking!</p>
      </div>

      {!submitted ? (
        <div className="quiz-wrap">
          {/* Progress Bar */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--sub)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              <span>{q.phase}</span>
              <span>{current + 1} / {QUIZ.length}</span>
            </div>
            <div className="pg-bar">
              <div className="pg-fill" style={{ width: `${((current + 1) / QUIZ.length) * 100}%` }}></div>
            </div>
          </div>

          {/* Question */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: '1.5' }}>{q.q}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {q.opts.map((opt, idx) => {
                const isSelected = answers[q.id] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(q.id, idx)}
                    className={`btn ${isSelected ? 'primary' : ''}`}
                    style={{ textAlign: 'left', padding: '0.75rem 1rem', justifyContent: 'flex-start', width: '100%' }}
                  >
                    <span style={{ marginRight: '0.75rem', fontWeight: 'bold', color: 'var(--purp)' }}>
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button className="btn" onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}>
              ← Previous
            </button>
            
            {current < QUIZ.length - 1 ? (
              <button className="btn primary" onClick={() => setCurrent(c => c + 1)}>
                Next →
              </button>
            ) : (
              <button 
                className="btn primary" 
                onClick={handleSubmit}
                disabled={Object.keys(answers).length < QUIZ.length}
              >
                Submit Quiz ✓
              </button>
            )}
          </div>

          {Object.keys(answers).length < QUIZ.length && current === QUIZ.length - 1 && (
            <p style={{ color: '#ff9500', marginTop: '1rem', textAlign: 'center' }}>
              Answer all {QUIZ.length - Object.keys(answers).length} remaining question(s) to submit.
            </p>
          )}
        </div>
      ) : (
        <div className="results-wrap">
          {/* Score Card */}
          <div className="card" style={{ textAlign: 'center', marginBottom: '2rem', padding: '2rem' }}>
            <div style={{ fontSize: '4rem', fontWeight: 'bold', color: grade.color }}>
              {grade.label}
            </div>
            <div style={{ fontSize: '1.5rem', margin: '1rem 0', color: 'var(--text)' }}>
              {score} / {QUIZ.length} Correct
            </div>
            <div className="pg-bar" style={{ marginBottom: '1rem' }}>
              <div className="pg-fill" style={{ width: `${(score / QUIZ.length) * 100}%`, background: grade.color }}></div>
            </div>
            <button className="btn primary" style={{ marginTop: '1rem' }} onClick={handleRetake}>
              Retake Quiz
            </button>
          </div>

          {/* Review Answers */}
          <h2 style={{ marginBottom: '1.5rem' }}>Answer Review</h2>
          {QUIZ.map((question) => {
            const userAns = answers[question.id];
            const isCorrect = userAns === question.ans;
            return (
              <div 
                key={question.id} 
                className="card" 
                style={{ 
                  marginBottom: '1rem', 
                  borderLeft: `4px solid ${isCorrect ? '#00e5a0' : '#ff4444'}` 
                }}
              >
                <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {isCorrect ? '✅' : '❌'} Q{question.id}: {question.q}
                </p>
                {!isCorrect && (
                  <p style={{ color: '#ff4444', marginBottom: '0.25rem', fontSize: '0.9rem' }}>
                    Your answer: {question.opts[userAns]}
                  </p>
                )}
                <p style={{ color: '#00e5a0', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  Correct: {question.opts[question.ans]}
                </p>
                <p style={{ color: 'var(--sub)', fontSize: '0.9rem' }}>
                  💡 {question.exp}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
