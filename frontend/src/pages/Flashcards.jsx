import React, { useState, useContext, useEffect, useMemo } from 'react';
import { DECK } from '../data/flashcards';
import { ProgressContext } from '../context/ProgressContext';

export const Flashcards = () => {
  const { user, updateUserField } = useContext(ProgressContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionDone, setSessionDone] = useState(false);

  // Filter cards due for today
  const dueCards = useMemo(() => {
    const userFC = user?.flashcards || [];
    const today = new Date();
    
    return DECK.filter(card => {
      const fc = userFC.find(f => f.cardId === card.id);
      if (!fc) return true; // never studied
      return new Date(fc.nextReviewDate) <= today;
    });
  }, [user?.flashcards]);

  useEffect(() => {
    if (dueCards.length === 0) setSessionDone(true);
  }, [dueCards]);

  const handleRate = async (rating) => {
    const cardId = dueCards[currentIndex].id;
    const userFC = user?.flashcards || [];
    const existing = userFC.find(f => f.cardId === cardId);
    
    // Simple SM-2 Algorithm
    let ef = existing ? existing.easinessFactor : 2.5;
    let interval = existing ? existing.interval : 0;
    
    if (rating === 'again') {
      interval = 1;
      ef = Math.max(1.3, ef - 0.2);
    } else if (rating === 'hard') {
      interval = Math.max(1, interval * 1.2);
      ef = Math.max(1.3, ef - 0.15);
    } else if (rating === 'good') {
      interval = Math.max(1, (interval === 0 ? 1 : interval * 2.5));
    } else if (rating === 'easy') {
      interval = Math.max(1, (interval === 0 ? 4 : interval * ef * 1.3));
      ef += 0.15;
    }

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + Math.round(interval));

    const newFcData = {
      cardId,
      easinessFactor: ef,
      interval,
      nextReviewDate: nextDate.toISOString()
    };

    const newFlashcards = existing 
      ? userFC.map(f => f.cardId === cardId ? newFcData : f)
      : [...userFC, newFcData];

    await updateUserField({ flashcards: newFlashcards });
    
    setShowAnswer(false);
    if (currentIndex + 1 < dueCards.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setSessionDone(true);
    }
  };

  if (sessionDone) {
    return (
      <div className="page on" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉 All caught up!</h1>
        <p style={{ color: 'var(--sub)', fontSize: '1.2rem' }}>You have reviewed all due flashcards for today.</p>
        <button className="btn primary" style={{ marginTop: '2rem' }} onClick={() => window.location.href='/dashboard'}>Back to Dashboard</button>
      </div>
    );
  }

  if (dueCards.length === 0) return null;

  const card = dueCards[currentIndex];

  return (
    <div className="page on">
      <div className="hero" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>Spaced Repetition</h1>
        <p>Reviewing {currentIndex + 1} of {dueCards.length} due cards</p>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', perspective: '1000px' }}>
        <div 
          className="card p-card" 
          style={{ 
            minHeight: '300px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            textAlign: 'center',
            cursor: showAnswer ? 'default' : 'pointer'
          }}
          onClick={() => !showAnswer && setShowAnswer(true)}
        >
          <h2 style={{ fontSize: '1.5rem', margin: '0 0 2rem 0', lineHeight: '1.5' }}>{card.front}</h2>
          
          {showAnswer ? (
            <div style={{ width: '100%', borderTop: '1px solid var(--border)', paddingTop: '2rem', animation: 'fadeIn 0.3s ease' }}>
              <p style={{ fontSize: '1.2rem', color: 'var(--teal)', marginBottom: '2rem', lineHeight: '1.5' }}>{card.back}</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                <button className="btn" style={{ background: 'rgba(244, 63, 94, 0.1)', color: '#F43F5E', borderColor: '#F43F5E' }} onClick={() => handleRate('again')}>
                  Again (1d)
                </button>
                <button className="btn" style={{ background: 'rgba(250, 204, 21, 0.1)', color: '#FACC15', borderColor: '#FACC15' }} onClick={() => handleRate('hard')}>
                  Hard
                </button>
                <button className="btn" style={{ background: 'rgba(74, 222, 128, 0.1)', color: '#4ADE80', borderColor: '#4ADE80' }} onClick={() => handleRate('good')}>
                  Good
                </button>
                <button className="btn" style={{ background: 'rgba(45, 212, 191, 0.1)', color: '#2DD4BF', borderColor: '#2DD4BF' }} onClick={() => handleRate('easy')}>
                  Easy
                </button>
              </div>
            </div>
          ) : (
            <p style={{ color: 'var(--sub)', fontSize: '0.9rem' }}>(Click card to flip)</p>
          )}
        </div>
      </div>
    </div>
  );
};
