import React from 'react';

const HABITS = [
  { icon: '⏱️', title: 'Time-box your study', desc: 'Study 45 min, break 15 min. Pomodoro technique prevents burnout and keeps focus sharp.' },
  { icon: '✍️', title: 'Write code by hand first', desc: 'Solve on paper before typing. Builds true understanding without autocomplete to lean on.' },
  { icon: '🔁', title: 'Revise in 24 hours', desc: 'Review yesterday\'s topics first. Spaced repetition is the #1 proven retention technique.' },
  { icon: '🧩', title: 'Pattern-hunt, not solution-memorise', desc: 'Ask "which technique?" before "what is the answer?". Patterns transfer, solutions don\'t.' },
  { icon: '🗣️', title: 'Explain it out loud', desc: 'The Feynman technique: if you can\'t explain it simply, you don\'t understand it.' },
  { icon: '💻', title: 'Type every code example', desc: 'Reading code ≠ writing code. Muscle memory and real errors teach what reading can\'t.' },
  { icon: '📊', title: 'Track daily', desc: 'Check the schedule page every day. Mark done. It takes 10 seconds and keeps you accountable.' },
  { icon: '🚀', title: 'Build, don\'t just study', desc: 'Apply every data structure you learn in a mini project. Creates lasting, transferable memory.' },
];

const ROUTINE = [
  { time: '00:00 – 00:30', label: 'Warm up', detail: 'Revise yesterday\'s topic or review cheat sheet for 10 min, then 1 easy problem.' },
  { time: '00:30 – 01:30', label: 'Core study', detail: 'Read the lesson for today\'s topic. Write code examples from scratch. Check complexity.' },
  { time: '01:30 – 02:15', label: 'Practice', detail: 'Solve 2-3 medium problems on the current topic. Use hints only after 20 min of trying.' },
  { time: '02:15 – 02:30', label: 'Reflect', detail: 'Write down 2 things you learned and 1 thing that is still confusing. Check it tomorrow.' },
];

const FRAMEWORK = [
  { step: '01', title: 'Understand', desc: 'Re-read the problem. Clarify constraints (N size, negative numbers?). Identify the output format.' },
  { step: '02', title: 'Examples', desc: 'Trace through the provided example. Make your own edge case (empty input, single element, all duplicates).' },
  { step: '03', title: 'Brute Force', desc: 'State the obvious O(N²) or recursive solution. Think out loud — do not skip this.' },
  { step: '04', title: 'Optimise', desc: 'Ask: can we precompute? Use a map/set? Two pointers? Sliding window? DP? Think about the pattern.' },
  { step: '05', title: 'Code', desc: 'Write clean code. Use descriptive variable names. Add a comment for non-obvious logic.' },
  { step: '06', title: 'Test & Verify', desc: 'Dry-run your code on the example. Then on your edge case. State the final Time and Space complexity.' },
];

export const Tips = () => {
  return (
    <div className="page on">
      <div className="hero">
        <h1>Study Tips & Framework</h1>
        <p>8 habits to build. A daily routine to follow. A 6-step framework for every problem.</p>
      </div>

      {/* Study Habits */}
      <div className="sec" style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>8 Study Habits</h2>
        <div className="grid">
          {HABITS.map((h, i) => (
            <div key={i} className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '2rem' }}>{h.icon}</span>
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--p)' }}>{h.title}</h4>
                <p style={{ color: 'var(--sub)', fontSize: '0.9rem', lineHeight: '1.5' }}>{h.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Routine */}
      <div className="sec" style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Daily 2.5-Hour Routine</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {ROUTINE.map((r, i) => (
            <div key={i} className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ minWidth: '120px', color: 'var(--teal)', fontWeight: 'bold', fontFamily: 'monospace' }}>{r.time}</div>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0' }}>{r.label}</h4>
                <p style={{ color: 'var(--sub)', fontSize: '0.9rem' }}>{r.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6-Step Framework */}
      <div className="sec">
        <h2 style={{ marginBottom: '1.5rem' }}>6-Step Problem-Solving Framework</h2>
        <p style={{ color: 'var(--sub)', marginBottom: '1.5rem' }}>Use this on every single LeetCode problem. Non-negotiable.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {FRAMEWORK.map((f, i) => (
            <div key={i} className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', borderLeft: '4px solid var(--p)' }}>
              <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--p)', minWidth: '2rem', fontFamily: 'monospace' }}>{f.step}</span>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0' }}>{f.title}</h4>
                <p style={{ color: 'var(--sub)', fontSize: '0.9rem', lineHeight: '1.5' }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
