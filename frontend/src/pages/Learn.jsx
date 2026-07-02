import React, { useState, useEffect, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PHASES } from '../data/index';
import { getStaticContent } from '../data/staticLessons';
import { ProgressContext } from '../context/ProgressContext';
import { API_URL } from '../config';

export const Learn = () => {
  const [activePhaseNum, setActivePhaseNum] = useState(1);
  const [activeTopic, setActiveTopic] = useState('Big O notation');
  const [activeTab, setActiveTab] = useState('static'); // 'static' or 'ai'
  
  const { completedTopics, toggleTopic } = useContext(ProgressContext);
  
  const [showTopics, setShowTopics] = useState(false);
  
  // AI State
  const [aiContent, setAiContent] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  
  // Fetch static content via our generator instantly
  const currentStaticLesson = getStaticContent(activeTopic);

  // Scroll to top when topic changes
  useEffect(() => {
    const scrollArea = document.getElementById('lesson-scroll-area');
    if (scrollArea) scrollArea.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTopic, activeTab]);

  const generateAILesson = async () => {
    setIsAiLoading(true);
    setAiError('');
    setAiContent('');

    try {
      const res = await fetch(`${API_URL}/api/ai/lesson`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: activeTopic })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Failed to generate');
      
      setAiContent(data.text);
    } catch (err) {
      setAiError(err.message);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="page on" style={{ display: 'flex', height: 'calc(100vh - 4rem)', overflow: 'hidden', position: 'relative' }}>
      
      {/* ----------------------------- */}
      {/* Overlay Drawer - Topic Selection */}
      {/* ----------------------------- */}
      {showTopics && (
        <div 
          onClick={() => setShowTopics(false)} 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 99, backdropFilter: 'blur(2px)' }}
        ></div>
      )}
      
      <div style={{ 
        position: 'fixed', top: 0, left: showTopics ? 0 : '-400px', bottom: 0, width: '320px', 
        background: 'var(--bg)', borderRight: '1px solid var(--border)', 
        zIndex: 100, padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column',
        boxShadow: showTopics ? '4px 0 30px rgba(0,0,0,0.5)' : 'none',
        transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, color: 'var(--text)', fontSize: '1.25rem', letterSpacing: '0.05em' }}>Topics</h2>
          <button onClick={() => setShowTopics(false)} className="hover-glass" style={{ background: 'transparent', border: 'none', color: 'var(--text)', cursor: 'pointer', padding: '0.25rem', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        {/* Phase Selector */}
        <div className="phase-selector">
          {[1, 2, 3, 4, 5, 6].map(num => (
            <button 
              key={num}
              onClick={() => setActivePhaseNum(num)}
              className={`phase-btn ${activePhaseNum === num ? 'active' : ''}`}
            >
              Phase {num}
            </button>
          ))}
        </div>

        {/* Topics List for Active Phase */}
        <div style={{ overflowY: 'auto', flex: 1, paddingRight: '0.5rem' }}>
          {PHASES.filter(p => p.num === activePhaseNum).map(phase => (
            <div key={phase.num}>
              {phase.secs.map((sec, i) => (
                <div key={i} style={{ marginBottom: '1.5rem' }}>
                  <strong style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--text-faded)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{sec.t}</strong>
                  {sec.items.map(topic => {
                    const isCompleted = completedTopics?.includes(topic);
                    return (
                    <div 
                      key={topic}
                      onClick={() => { setActiveTopic(topic); setAiContent(''); setActiveTab('static'); setShowTopics(false); }}
                      className={`topic-item ${activeTopic === topic ? 'active' : ''}`}
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <span>{topic}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        {isCompleted && <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#10b981' }}>task_alt</span>}
                        {activeTopic === topic && <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>}
                      </div>
                    </div>
                  )})}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div id="lesson-scroll-area" style={{ flex: 1, overflowY: 'auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button 
              onClick={() => setShowTopics(true)}
              className="hover-glass"
              style={{ 
                display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', 
                background: 'transparent', border: '1px solid var(--border)', color: 'var(--text)', 
                borderRadius: '8px', cursor: 'pointer', fontSize: '0.95rem'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>menu_book</span>
              Topics
            </button>
            <h1 style={{ margin: 0 }}>{activeTopic}</h1>
            <button 
              onClick={() => toggleTopic(activeTopic)}
              className={`btn ${completedTopics?.includes(activeTopic) ? 'success' : ''}`}
              style={{ 
                display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', 
                fontSize: '0.9rem', borderRadius: '99px', cursor: 'pointer',
                background: completedTopics?.includes(activeTopic) ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.05)',
                color: completedTopics?.includes(activeTopic) ? '#10b981' : 'var(--text)',
                border: completedTopics?.includes(activeTopic) ? '1px solid rgba(16, 185, 129, 0.5)' : '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                {completedTopics?.includes(activeTopic) ? 'task_alt' : 'radio_button_unchecked'}
              </span>
              {completedTopics?.includes(activeTopic) ? 'Completed' : 'Mark as Done'}
            </button>
          </div>
          
          <div className="segmented-control" style={{ width: '320px' }}>
            <div className={`seg-bg ${activeTab === 'ai' ? 'right' : ''}`} style={{ transform: activeTab === 'ai' ? 'translateX(100%)' : 'translateX(0)', width: 'calc(50% - 0.35rem)' }}></div>
            <button 
              onClick={() => setActiveTab('static')}
              className={`seg-btn ${activeTab === 'static' ? 'active' : ''}`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>import_contacts</span>
              Standard
            </button>
            <button 
              onClick={() => setActiveTab('ai')}
              className={`seg-btn ${activeTab === 'ai' ? 'active' : ''}`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>smart_toy</span>
              AI Tutor
            </button>
          </div>
        </div>

        {/* STATIC CONTENT TAB */}
        {activeTab === 'static' && (
          <div className="card" style={{ padding: '3rem' }}>
            <div className="markdown-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{currentStaticLesson.text}</ReactMarkdown>
            </div>
            
            {currentStaticLesson.complexity && currentStaticLesson.complexity !== 'N/A' && (
              <div style={{ marginTop: '3rem', padding: '1.25rem 1.5rem', background: 'rgba(45, 212, 191, 0.05)', borderLeft: '4px solid var(--teal)', borderRadius: '0 var(--rad-sm) var(--rad-sm) 0' }}>
                <strong style={{ color: 'var(--teal)', fontSize: '1.1rem' }}>⚡ Complexity:</strong> 
                <span style={{ marginLeft: '0.5rem', color: '#e2e8f0', fontFamily: "'JetBrains Mono', monospace" }}>{currentStaticLesson.complexity}</span>
              </div>
            )}
            
            {!currentStaticLesson.text.includes("generating the detailed") && (
              <div style={{ marginTop: '4rem', textAlign: 'center', padding: '3rem 2rem', background: 'linear-gradient(180deg, transparent 0%, rgba(168, 85, 247, 0.05) 100%)', borderTop: '1px solid var(--border)', borderRadius: 'var(--rad)' }}>
                
                {/* AI Tutor Prompt */}

                <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--p)', opacity: 0.5, marginBottom: '1rem' }}>psychology</span>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Want a deeper dive, examples, or a simpler explanation?</p>
                <button 
                  onClick={() => setActiveTab('ai')}
                  className="btn primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 2rem', fontSize: '1.05rem', borderRadius: '99px' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>smart_toy</span>
                  Ask the AI Tutor
                </button>
              </div>
            )}
          </div>
        )}

        {/* AI TUTOR TAB */}
        {activeTab === 'ai' && (
          <div className="card" style={{ padding: '3rem', minHeight: '500px' }}>
            
            {!aiContent && !isAiLoading && !aiError && (
              <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                   <span className="material-symbols-outlined" style={{ fontSize: '40px', color: '#10b981' }}>smart_toy</span>
                </div>
                <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>AI Tutor Ready</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem', maxWidth: '400px', margin: '0 auto 2.5rem auto' }}>
                  Generate a custom, deeply detailed explanation for <strong>{activeTopic}</strong> in seconds.
                </p>
                <button onClick={generateAILesson} className="btn primary" style={{ background: 'linear-gradient(135deg, #10b981, #3b82f6)', boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)', padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '99px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>auto_awesome</span>
                  Generate Lesson
                </button>
              </div>
            )}

            {isAiLoading && (
              <div style={{ textAlign: 'center', paddingTop: '6rem' }}>
                <div style={{ width: '50px', height: '50px', border: '3px solid var(--border)', borderTop: '3px solid #10b981', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 2rem' }}></div>
                <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>Synthesizing Knowledge...</h3>
                <p style={{ color: 'var(--text-muted)' }}>The AI is writing your personalized lesson on {activeTopic}</p>
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
              </div>
            )}

            {aiError && (
              <div style={{ background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent)', padding: '1.5rem', borderRadius: 'var(--rad-sm)', border: '1px solid rgba(244, 63, 94, 0.3)', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>error</span>
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Generation Failed</strong>
                  <p style={{ margin: 0, fontSize: '0.95rem' }}>{aiError}</p>
                  <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', opacity: 0.8 }}>Hint: Ensure you have added GEMINI_API_KEY to your backend .env file and restarted the server.</p>
                </div>
              </div>
            )}

            {aiContent && !isAiLoading && (
              <div style={{ animation: 'fadeIn 0.5s ease' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                   <button onClick={generateAILesson} className="btn" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                     <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>refresh</span>
                     Regenerate Lesson
                   </button>
                </div>
                <div className="markdown-body">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{aiContent}</ReactMarkdown>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
