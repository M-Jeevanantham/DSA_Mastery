import React, { useState, useEffect, useContext, useMemo } from 'react';
import { createPortal } from 'react-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PHASES } from '../data/index';
import { getStaticContent } from '../data/staticLessons';
import { ProgressContext } from '../context/ProgressContext';
import { API_URL } from '../config';

// ════════════════════════════════════════════════════════════
// UTILITY: Parse markdown into an array of {number, title, content}
// ════════════════════════════════════════════════════════════
const parseSections = (markdownText) => {
  if (!markdownText) return [];
  const lines = markdownText.split('\n');
  const sections = [];
  let current = null;

  for (const line of lines) {
    const match = line.match(/^#{1,3}\s+(\d+)\.\s+(.+)/);
    if (match) {
      if (current) sections.push(current);
      current = { number: parseInt(match[1], 10), title: match[2].trim(), content: line + '\n' };
    } else if (current) {
      current.content += line + '\n';
    }
  }
  if (current) sections.push(current);

  // Fallback: if no numbered ## sections found
  if (sections.length === 0 && markdownText.trim()) {
    return [{ number: 1, title: 'Content', content: markdownText, isFallback: true }];
  }

  return sections;
};

// ════════════════════════════════════════════════════════════
// UTILITY: Parse quiz section into structured question objects
// ════════════════════════════════════════════════════════════
const parseQuizQuestions = (quizContent) => {
  const lines = quizContent.split('\n');
  const questions = [];
  let currentQuestion = null;

  for (const line of lines) {
    const tline = line.trim();
    if (!tline) continue;
    
    // Check for Question start (e.g. "**Q1:** What is..." or "1. What is...")
    const qMatch = tline.match(/^(?:\*\*)?(?:Q\d+[:.]|\d+\.)(?:\*\*)?\s+(.*?)(?:\*\*)?$/);
    if (qMatch) {
      if (currentQuestion && currentQuestion.questionText) {
        questions.push(currentQuestion);
      }
      currentQuestion = {
        questionText: qMatch[1],
        options: [],
        correctAnswer: null,
        type: 'mcq'
      };
      continue;
    }

    if (!currentQuestion) continue;

    // Check for Options (e.g. "- **A:** text", "* A) text", or just "A) text")
    const optMatch = tline.match(/^(?:[-*]\s*)?(?:\*\*)?([A-D])(?:[:.)])?(?:\*\*)?\s+(.*)/i);
    if (optMatch) {
      currentQuestion.options.push({ key: optMatch[1].toUpperCase(), text: optMatch[2] });
      continue;
    }

    // Check for Correct Answer (e.g. "**Correct:** A" or "**Correct:** 1")
    const correctMatch = tline.match(/^(?:\*\*)?Correct:?(?:\*\*)?\s*(.+)/i);
    if (correctMatch) {
      currentQuestion.correctAnswer = correctMatch[1].trim();
      continue;
    }
  }
  
  if (currentQuestion && currentQuestion.questionText) {
    questions.push(currentQuestion);
  }
  
  return questions;
};

// ════════════════════════════════════════════════════════════
// COMPONENT: Interactive Quiz
// ════════════════════════════════════════════════════════════
const InteractiveQuiz = ({ quizContent, topicName, onComplete, alreadyCompleted }) => {
  const questions = useMemo(() => parseQuizQuestions(quizContent), [quizContent]);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(alreadyCompleted);

  if (!questions || questions.length === 0) {
    return (
      <div>
        <h2>Quiz</h2>
        <div className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{quizContent}</ReactMarkdown>
        </div>
      </div>
    );
  }

  const handleAnswer = (index, answerKey) => {
    setAnswers(prev => ({ ...prev, [index]: answerKey }));
  };

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;
  let correctCount = 0;
  
  questions.forEach((q, i) => {
    if (answers[i] === q.correctAnswer) correctCount++;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: '0 0 0.25rem', color: '#fff', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--p)' }}>quiz</span>
            Knowledge Check — {topicName}
          </h2>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {questions.length} question{questions.length !== 1 ? 's' : ''} • Answer all to unlock completion
          </p>
        </div>
        <div style={{ padding: '0.4rem 1.1rem', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '99px', color: 'var(--p)', fontWeight: 600, fontSize: '0.95rem' }}>
          {answeredCount} / {questions.length} answered
        </div>
      </div>

      {/* Progress mini bar */}
      <div style={{ height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '99px', overflow: 'hidden', marginBottom: '2rem' }}>
        <div style={{ height: '100%', width: `${(answeredCount / questions.length) * 100}%`, background: 'linear-gradient(90deg, var(--teal), var(--p))', transition: 'width 0.4s ease', borderRadius: '99px' }} />
      </div>

      {questions.map((q, i) => {
        const isAnswered = answers[i] !== undefined;
        const userAnswer = answers[i];
        const isCorrect = typeof userAnswer === 'string' && typeof q.correctAnswer === 'string' 
          ? userAnswer.toLowerCase() === q.correctAnswer.toLowerCase() 
          : userAnswer === q.correctAnswer;
        
        return (
          <div key={i} style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ 
                width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--p)', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0
              }}>
                {i + 1}
              </div>
              <div style={{ fontSize: '1.02rem', color: '#fff', lineHeight: '1.65', fontWeight: 500 }}>
                {q.questionText}
              </div>
            </div>
            
            <div style={{ marginLeft: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {q.options.length > 0 ? (
                q.options.map(opt => {
                  let bg = 'rgba(255,255,255,0.02)';
                  let border = '1px solid var(--border)';
                  let color = 'var(--text)';
                  if (isAnswered) {
                    if (opt.key === q.correctAnswer) {
                      bg = 'rgba(16,185,129,0.1)';
                      border = '1px solid rgba(16,185,129,0.4)';
                      color = '#10b981';
                    } else if (opt.key === userAnswer) {
                      bg = 'rgba(244,63,94,0.1)';
                      border = '1px solid rgba(244,63,94,0.4)';
                      color = '#F43F5E';
                    }
                  } else if (userAnswer === opt.key) {
                    bg = 'rgba(255,255,255,0.06)';
                  }
                  
                  return (
                    <button
                      key={opt.key}
                      disabled={isAnswered}
                      onClick={() => !isAnswered && handleAnswer(i, opt.key)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1.25rem',
                        borderRadius: '8px', background: bg, border, color, textAlign: 'left',
                        cursor: isAnswered ? 'default' : 'pointer', transition: 'all 0.2s', width: '100%'
                      }}
                    >
                      <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{opt.key}.</span>
                      <span>{opt.text}</span>
                      {isAnswered && opt.key === q.correctAnswer && <span className="material-symbols-outlined" style={{ marginLeft: 'auto' }}>task_alt</span>}
                      {isAnswered && opt.key === userAnswer && opt.key !== q.correctAnswer && <span className="material-symbols-outlined" style={{ marginLeft: 'auto' }}>cancel</span>}
                    </button>
                  );
                })
              ) : (
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <input 
                    type="text" 
                    placeholder="Type your answer here..."
                    disabled={isAnswered}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !isAnswered && e.target.value.trim()) {
                        handleAnswer(i, e.target.value.trim());
                      }
                    }}
                    onBlur={(e) => {
                      if (!isAnswered && e.target.value.trim()) {
                        handleAnswer(i, e.target.value.trim());
                      }
                    }}
                    style={{
                      flex: 1, padding: '0.85rem 1.25rem', borderRadius: '8px',
                      background: isAnswered ? (isCorrect ? 'rgba(16,185,129,0.05)' : 'rgba(244,63,94,0.05)') : 'rgba(255,255,255,0.03)',
                      border: isAnswered ? (isCorrect ? '1px solid #10b981' : '1px solid #F43F5E') : '1px solid var(--border)',
                      color: 'var(--text)', fontSize: '1rem', outline: 'none'
                    }}
                  />
                  {!isAnswered && (
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-faded)' }}>Press Enter to submit</span>
                  )}
                </div>
              )}
            </div>
            
            {isAnswered && (
              <div style={{
                marginTop: '1rem', marginLeft: '2.5rem', padding: '1rem 1.25rem', borderRadius: '10px',
                background: isCorrect ? 'rgba(16,185,129,0.08)' : 'rgba(244,63,94,0.08)',
                borderLeft: `4px solid ${isCorrect ? '#10b981' : '#F43F5E'}`,
                animation: 'fadeIn 0.35s ease'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="material-symbols-outlined" style={{ color: isCorrect ? '#10b981' : '#F43F5E', fontSize: '20px' }}>
                    {isCorrect ? 'task_alt' : 'cancel'}
                  </span>
                  <strong style={{ color: isCorrect ? '#10b981' : '#F43F5E' }}>
                    {isCorrect ? 'Correct! 🎉' : 'Not quite!'}
                  </strong>
                  {!isCorrect && q.correctAnswer && (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      — Correct Answer: <strong style={{ color: '#10b981' }}>{q.correctAnswer}</strong>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {allAnswered && !finished && (
        <div style={{
          marginTop: '2rem', padding: '2rem', textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(59,130,246,0.05))',
          border: '1px solid rgba(16,185,129,0.25)', borderRadius: '16px',
          animation: 'fadeIn 0.5s ease'
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '3.5rem', color: '#fbbf24' }}>emoji_events</span>
          <h3 style={{ color: '#fff', margin: '0.75rem 0 0.5rem', fontSize: '1.4rem' }}>Quiz Complete!</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
            Score: <strong style={{ color: '#10b981', fontSize: '1.1rem' }}>{correctCount} / {questions.length}</strong>
            {correctCount === questions.length ? ' — Perfect! 🎉' : ` — ${Math.round((correctCount/questions.length)*100)}% — Keep it up!`}
          </p>
          <button
            className="btn primary"
            onClick={() => { setFinished(true); onComplete(); }}
            style={{ padding: '0.85rem 2.5rem', fontSize: '1.05rem', borderRadius: '99px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>task_alt</span>
            Mark Lesson Complete & Continue
          </button>
        </div>
      )}

      {finished && (
        <div style={{ textAlign: 'center', padding: '1.5rem', color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <span className="material-symbols-outlined">task_alt</span> Lesson marked as complete! Use Next to continue.
        </div>
      )}
    </div>
  );
};

// ════════════════════════════════════════════════════════════
// MAIN: Learn Page (Paginated)
// ════════════════════════════════════════════════════════════
export const Learn = () => {
  const [activePhaseNum, setActivePhaseNum] = useState(1);
  const [activeTopic, setActiveTopic] = useState('Big O notation');
  const [activeTab, setActiveTab] = useState('static'); // 'static' or 'ai'
  const { completedTopics, toggleTopic } = useContext(ProgressContext);
  const [showTopics, setShowTopics] = useState(false);
  
  // Section state
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // AI state
  const [aiContent, setAiContent] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  const currentStaticLesson = getStaticContent(activeTopic);
  const isCompleted = completedTopics?.includes(activeTopic);

  // Parse into sections
  const sections = useMemo(() => {
    const text = activeTab === 'ai' ? aiContent : currentStaticLesson.text;
    return parseSections(text);
  }, [currentStaticLesson.text, aiContent, activeTab]);

  const totalSections = sections.length;
  const currentSection = sections[currentSectionIdx] || null;
  const isQuizSection = currentSection && (currentSection.title.toLowerCase().includes('quiz') || currentSection.number === 27);
  const isLastSection = currentSectionIdx === totalSections - 1;
  const progressPct = totalSections ? Math.round(((currentSectionIdx + 1) / totalSections) * 100) : 0;

  useEffect(() => {
    setCurrentSectionIdx(0);
    setQuizCompleted(false);
  }, [activeTopic, activeTab]);

  useEffect(() => {
    const el = document.getElementById('lesson-scroll-area');
    if (el) el.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSectionIdx, activeTopic]);

  const goNext = () => { if (currentSectionIdx < totalSections - 1) setCurrentSectionIdx(i => i + 1); };
  const goPrev = () => { if (currentSectionIdx > 0) setCurrentSectionIdx(i => i - 1); };

  const handleQuizComplete = () => {
    setQuizCompleted(true);
    if (!isCompleted) toggleTopic(activeTopic);
  };

  const generateAILesson = async () => {
    setIsAiLoading(true); setAiError(''); setAiContent('');
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

  const canGoNext = !isLastSection && (!isQuizSection || quizCompleted);

  const allTopics = useMemo(() => PHASES.flatMap(p => p.secs.flatMap(s => s.items)), []);
  const currentTopicGlobalIdx = allTopics.indexOf(activeTopic);
  const nextGlobalTopic = currentTopicGlobalIdx >= 0 && currentTopicGlobalIdx < allTopics.length - 1 ? allTopics[currentTopicGlobalIdx + 1] : null;

  const handleNextTopic = () => {
    if (nextGlobalTopic) {
      setActiveTopic(nextGlobalTopic);
      setAiContent('');
      setActiveTab('static');
      setShowTopics(false);
    }
  };

  return (
    <div className="page on" style={{ display: 'flex', height: 'calc(100vh - 4rem)', overflow: 'hidden', position: 'relative' }}>

      {/* Drawer Portal */}
      {createPortal(
        <>
          {/* Drawer overlay */}
          {showTopics && <div onClick={() => setShowTopics(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 999, backdropFilter: 'blur(2px)' }} />}

          {/* Topics Drawer */}
          <div style={{
            position: 'fixed', top: 0, left: showTopics ? 0 : '-400px', bottom: 0, width: '320px',
            background: 'var(--bg)', borderRight: '1px solid var(--border)',
            zIndex: 1000, padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column',
            boxShadow: showTopics ? '4px 0 30px rgba(0,0,0,0.5)' : 'none',
            transition: 'left 0.3s cubic-bezier(0.4,0,0.2,1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, color: 'var(--text)', fontSize: '1.25rem' }}>Topics</h2>
              <button onClick={() => setShowTopics(false)} className="hover-glass" style={{ background: 'transparent', border: 'none', color: 'var(--text)', cursor: 'pointer', padding: '0.25rem', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="phase-selector">
              {[1,2,3,4,5,6].map(n => (
                <button key={n} onClick={() => setActivePhaseNum(n)} className={`phase-btn ${activePhaseNum === n ? 'active' : ''}`}>Phase {n}</button>
              ))}
            </div>
            <div style={{ overflowY: 'auto', flex: 1, paddingRight: '0.5rem' }}>
              {PHASES.filter(p => p.num === activePhaseNum).map(phase => (
                <div key={phase.title} style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-faded)', marginBottom: '0.75rem', fontWeight: 600 }}>
                    {phase.title}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {phase.secs.map((sec, secIdx) => (
                      <React.Fragment key={secIdx}>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.5rem 0 0.25rem' }}>
                          {sec.sub}
                        </div>
                        {sec.items.map(topic => {
                          const isCur = activeTopic === topic;
                          const isComp = completedTopics?.includes(topic);
                          return (
                            <button
                              key={topic}
                              onClick={() => {
                                setActiveTopic(topic);
                                setAiContent('');
                                setActiveTab('static');
                                setShowTopics(false);
                              }}
                              style={{
                                textAlign: 'left', padding: '0.75rem 1rem', borderRadius: '8px',
                                background: isCur ? 'rgba(168,85,247,0.1)' : 'transparent',
                                border: `1px solid ${isCur ? 'rgba(168,85,247,0.3)' : 'transparent'}`,
                                color: isCur ? 'var(--text)' : 'var(--text-muted)',
                                cursor: 'pointer', transition: 'all 0.2s', display: 'flex',
                                justifyContent: 'space-between', alignItems: 'center'
                              }}
                              onMouseEnter={e => !isCur && (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                              onMouseLeave={e => !isCur && (e.currentTarget.style.background = 'transparent')}
                            >
                              <span style={{ fontSize: '0.95rem' }}>{topic}</span>
                              {isComp ? (
                                <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#10b981' }}>task_alt</span>
                              ) : isCur && (
                                <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--p)' }}>chevron_right</span>
                              )}
                            </button>
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>,
        document.body
      )}

      {/* Main Content Area */}
      <div id="lesson-scroll-area" style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', paddingRight: '0.5rem' }}>
        
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
            <button onClick={() => setShowTopics(true)} className="hover-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>menu_book</span> Topics
            </button>
            <h1 style={{ margin: 0, fontSize: '1.4rem' }}>{activeTopic}</h1>
            {isCompleted && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#10b981', fontSize: '0.88rem', fontWeight: 600, padding: '0.25rem 0.75rem', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '99px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>task_alt</span> Completed
              </span>
            )}
          </div>
          <div className="segmented-control" style={{ width: '270px' }}>
            <div className={`seg-bg ${activeTab === 'ai' ? 'right' : ''}`} style={{ transform: activeTab === 'ai' ? 'translateX(100%)' : 'translateX(0)', width: 'calc(50% - 0.35rem)' }} />
            <button onClick={() => setActiveTab('static')} className={`seg-btn ${activeTab === 'static' ? 'active' : ''}`}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>import_contacts</span> Standard
            </button>
            <button onClick={() => setActiveTab('ai')} className={`seg-btn ${activeTab === 'ai' ? 'active' : ''}`}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>smart_toy</span> AI Tutor
            </button>
          </div>
        </div>

        {/* AI Loading/Error */}
        {activeTab === 'ai' && isAiLoading && (
          <div style={{ textAlign: 'center', paddingTop: '6rem', flex: 1 }}>
            <div style={{ width: '50px', height: '50px', border: '3px solid var(--border)', borderTop: '3px solid #10b981', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 2rem' }}></div>
            <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>Synthesizing Knowledge...</h3>
            <p style={{ color: 'var(--text-muted)' }}>The AI is writing your personalized lesson on {activeTopic}</p>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        )}
        {activeTab === 'ai' && aiError && (
          <div style={{ background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent)', padding: '1.5rem', borderRadius: 'var(--rad-sm)', border: '1px solid rgba(244, 63, 94, 0.3)', display: 'flex', alignItems: 'flex-start', gap: '1rem', marginTop: '2rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>error</span>
            <div>
              <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Generation Failed</strong>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>{aiError}</p>
              <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', opacity: 0.8 }}>Hint: Ensure you have added GEMINI_API_KEY to your backend .env file and restarted the server.</p>
            </div>
          </div>
        )}

        {/* ── Paginated section navigation (TOP) ── */}
        {((activeTab === 'static') || (activeTab === 'ai' && aiContent)) && totalSections > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                <span style={{ color: 'var(--p)', fontWeight: 700 }}>{currentSectionIdx + 1}</span> / {totalSections}
                {currentSection ? ` — ${currentSection.title}` : ''}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--p)', fontWeight: 700 }}>{progressPct}%</span>
            </div>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '99px', overflow: 'hidden', marginBottom: '1.5rem' }}>
              <div style={{ height: '100%', width: `${progressPct}%`, background: 'linear-gradient(90deg, var(--teal), var(--p))', borderRadius: '99px', transition: 'width 0.5s ease' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <button onClick={goPrev} disabled={currentSectionIdx === 0} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: currentSectionIdx === 0 ? 0.35 : 1, cursor: currentSectionIdx === 0 ? 'not-allowed' : 'pointer', padding: '0.65rem 1.25rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_back</span> Previous
              </button>

              {/* Numbered dots */}
              <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', padding: '0.5rem', margin: '0 -0.5rem' }}>
                {sections.map((s, i) => {
                  const isCur = i === currentSectionIdx;
                  const isQ = s.title.toLowerCase().includes('quiz') || s.number === 27;
                  return (
                    <button key={i} onClick={() => { if (!isQuizSection || quizCompleted || i <= currentSectionIdx) setCurrentSectionIdx(i); }} 
                      style={{ 
                        width: isCur ? '26px' : '20px', height: isCur ? '26px' : '20px', borderRadius: '50%',
                        background: isCur ? (isQ ? 'var(--p)' : 'var(--teal)') : 'rgba(255,255,255,0.1)',
                        border: 'none', color: isCur ? '#000' : 'var(--text-faded)',
                        fontSize: '0.65rem', fontWeight: 700, cursor: (!isQuizSection || quizCompleted || i <= currentSectionIdx) ? 'pointer' : 'not-allowed',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        transition: 'all 0.2s', boxShadow: isCur ? `0 0 8px ${isQ ? 'var(--p-glow)' : 'var(--teal-glow)'}` : 'none',
                        transform: isCur ? 'scale(1.25)' : 'scale(1)'
                      }}
                    >
                      {s.number}
                    </button>
                  );
                })}
              </div>

              {/* Next / complete button */}
              {isLastSection ? (
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  {!isCompleted && (
                    <button onClick={() => toggleTopic(activeTopic)} className="btn primary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.25rem' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>task_alt</span>
                      Mark Complete
                    </button>
                  )}
                  {isCompleted && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.25rem', color: '#10b981', fontWeight: 600, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '8px' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>task_alt</span> Completed ✓
                    </div>
                  )}
                  {nextGlobalTopic && (
                    <button onClick={handleNextTopic} className={`btn ${isCompleted ? 'primary' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.25rem' }}>
                      Next Lesson <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span>
                    </button>
                  )}
                </div>
              ) : (
                <button onClick={goNext} disabled={!canGoNext} className={`btn ${canGoNext ? 'primary' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: canGoNext ? 1 : 0.35, cursor: canGoNext ? 'pointer' : 'not-allowed', padding: '0.65rem 1.25rem' }} title={isQuizSection && !quizCompleted ? 'Complete the quiz first!' : ''}>
                  Next <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── Paginated section content ── */}
        {((activeTab === 'static') || (activeTab === 'ai' && aiContent)) && currentSection && (
          <div className="card" style={{ padding: '2.5rem', flex: '1 0 auto' }}>
            {isQuizSection ? (
              <InteractiveQuiz
                quizContent={currentSection.content}
                topicName={activeTopic}
                onComplete={handleQuizComplete}
                alreadyCompleted={quizCompleted || isCompleted}
              />
            ) : (
              <div className="markdown-body">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{currentSection.content}</ReactMarkdown>
              </div>
            )}
          </div>
        )}

        {activeTab === 'ai' && !aiContent && !isAiLoading && !aiError && (
          <div className="card" style={{ padding: '4rem', textAlign: 'center', flex: '1 0 auto' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '40px', color: '#10b981' }}>smart_toy</span>
            </div>
            <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>AI Tutor Ready</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem', maxWidth: '400px', margin: '0 auto 2.5rem auto' }}>
              Generate a custom, deeply detailed explanation for <strong>{activeTopic}</strong> in seconds.
            </p>
            <button onClick={generateAILesson} className="btn primary" style={{ background: 'linear-gradient(135deg, #10b981, #3b82f6)', boxShadow: '0 4px 20px rgba(16,185,129,0.4)', padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '99px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>auto_awesome</span> Generate Lesson
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
