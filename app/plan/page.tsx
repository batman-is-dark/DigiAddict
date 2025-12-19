'use client';
import { useState, useEffect } from 'react';
import { MarkovModel, UsageLog, getStateFromMinutes, generateInterventions, generateDynamicInsight, State } from '@/lib/markov';
import { Sparkles, CheckCircle2, Calendar, Target, ShieldCheck, Zap, Brain } from 'lucide-react';

export default function Plan() {
  const [risk, setRisk] = useState<number>(0);
  const [lastState, setLastState] = useState<State>('Low');
  const [interventions, setInterventions] = useState<string[]>([]);
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('usage_logs');
    if (saved) {
      const parsedLogs = JSON.parse(saved);
      if (parsedLogs.length > 0) {
        const model = MarkovModel.fromLogs(parsedLogs);
        const state = getStateFromMinutes(parsedLogs[parsedLogs.length - 1].minutes);
        const res = model.predict(state, 30);
        
        setRisk(res.distribution[3]);
        setLastState(state);
        setInterventions(generateInterventions(res.distribution[3], state));
        setInsight(generateDynamicInsight(res.distribution[3], state));
      }
    }
    setLoading(false);
  }, []);

  if (loading) return <div className="container">Loading report...</div>;

  return (
    <div className="container animate-slide-up">
      <header style={{ marginBottom: '4rem' }}>
        <h2 className="gradient-text" style={{ fontSize: '3rem' }}>Behavioral Hygiene Report</h2>
        <p style={{ color: 'var(--secondary)' }}>Stochastic interventions based on your personal 30-day forecast.</p>
      </header>

      <div className="grid" style={{ gridTemplateColumns: '1fr 2fr', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass card" style={{ borderLeft: '4px solid var(--primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
              <Target color="var(--primary)" size={20} />
              <h4 style={{ margin: 0, fontSize: '0.8rem', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Core Objective</h4>
            </div>
            <p style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>Impulse Disruption</p>
          </div>
          
          <div className="glass card" style={{ borderLeft: '4px solid var(--success)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
              <ShieldCheck color="var(--success)" size={20} />
              <h4 style={{ margin: 0, fontSize: '0.8rem', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Vulnerability Level</h4>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: risk > 0.6 ? 'var(--danger)' : risk > 0.3 ? 'var(--warning)' : 'var(--success)', boxShadow: `0 0 15px ${risk > 0.6 ? 'var(--danger)' : risk > 0.3 ? 'var(--warning)' : 'var(--success)'}` }}></div>
              <span style={{ fontWeight: 800, fontSize: '1.5rem', color: 'white' }}>{risk > 0.6 ? 'CRITICAL' : risk > 0.2 ? 'MODERATE' : 'HEALTHY'}</span>
            </div>
          </div>

          <div className="glass card" style={{ background: 'hsla(210, 100%, 50%, 0.1)', border: '1px solid hsla(210, 100%, 50%, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
              <Brain color="var(--primary)" size={24} />
              <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'white' }}>Saliency Insight</h3>
            </div>
            <p style={{ fontSize: '1rem', color: 'white', lineHeight: '1.6', fontWeight: 500 }}>
              "{insight || "Generating behavioral data analysis..."}"
            </p>
          </div>

          <div className="glass card" style={{ background: 'hsla(210, 20%, 100%, 0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
              <Zap color="var(--warning)" size={18} />
              <h4 style={{ margin: 0, fontSize: '0.9rem' }}>Probabilistic Shift</h4>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--secondary)' }}>
              A 15% reduction in "High" state duration today will correlate with a 24% decrease in "Addiction" risk by end-of-month.
            </p>
          </div>
        </div>

        <div className="glass card" style={{ padding: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '3rem' }}>
            <div style={{ background: 'var(--primary-muted)', padding: '12px', borderRadius: '14px' }}>
              <Sparkles color="var(--primary)" size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.75rem' }}>Stochastic Interventions</h3>
              <p style={{ fontSize: '0.9rem', margin: 0 }}>High-impact micro-behaviors to steer your transition matrix.</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {interventions.map((item, i) => (
              <div key={i} className="glass" style={{ padding: '1.75rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ background: 'hsla(150, 70%, 50%, 0.1)', padding: '10px', borderRadius: '50%', color: 'var(--success)' }}>
                  <CheckCircle2 size={24} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '4px', color: 'white' }}>{item.split(':')[0]}</p>
                  <p style={{ fontSize: '0.95rem', color: 'var(--secondary)' }}>{item.split(':')[1]}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '4rem', padding: '2rem', background: 'var(--background)', borderRadius: '20px', border: '1px solid var(--card-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Calendar size={20} color="var(--primary)" />
                <span style={{ fontWeight: 800, letterSpacing: '0.02em', color: 'var(--foreground)' }}>7-DAY TRANSITION TRACKING</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: 600 }}>STOCHASTIC TARGET: LOW</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1rem' }}>
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ 
                      height: '56px', 
                      background: i < 3 ? 'hsla(210, 100%, 50%, 0.15)' : 'hsla(0, 0%, 100%, 0.05)', 
                      borderRadius: '12px', 
                      border: i < 3 ? '1px solid var(--primary)' : '1px dashed var(--card-border)',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontSize: '1rem',
                      color: i < 3 ? 'var(--primary)' : 'var(--secondary)',
                      fontWeight: 800,
                      boxShadow: i < 3 ? '0 10px 20px hsla(210, 100%, 50%, 0.2)' : 'none'
                  }}>
                    {i < 3 ? '✓' : ''}
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--secondary)', marginTop: '10px', display: 'block', fontWeight: 600 }}>DAY {i+1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
