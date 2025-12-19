'use client';
import { useState, useEffect } from 'react';
import { Save, RefreshCw, Trash2, Clock, Calendar } from 'lucide-react';
import { UsageLog, getStateFromMinutes } from '@/lib/markov';

export default function Track() {
  const [logs, setLogs] = useState<UsageLog[]>([]);
  const [minutes, setMinutes] = useState<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem('usage_logs');
    if (saved) setLogs(JSON.parse(saved));
  }, []);

  const saveLogs = (newLogs: UsageLog[]) => {
    setLogs(newLogs);
    localStorage.setItem('usage_logs', JSON.stringify(newLogs));
  };

  const addLog = () => {
    if (minutes <= 0) return;
    const newLog = {
      day: logs.length + 1,
      minutes: Number(minutes)
    };
    const updated = [...logs, newLog];
    saveLogs(updated);
    setMinutes(0);
  };

  const generateMockData = () => {
    const mock: UsageLog[] = Array.from({ length: 14 }, (_, i) => ({
      day: i + 1,
      minutes: Math.floor(Math.random() * 400) + 30
    }));
    saveLogs(mock);
  };

  const clearLogs = () => {
    if (confirm("Clear all behavioral history?")) {
      saveLogs([]);
    }
  };

  return (
    <div className="container animate-slide-up">
      <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h2 className="gradient-text" style={{ fontSize: '3rem' }}>Usage Logger</h2>
        <p style={{ color: 'var(--secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Record your daily digital consumption to refine your personal Markov transition matrix.
        </p>
      </header>
      
      <div className="grid" style={{ gridTemplateColumns: '1fr 1.5fr' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
              <div style={{ background: 'var(--primary-muted)', padding: '10px', borderRadius: '12px' }}>
                <Clock color="var(--primary)" size={24} />
              </div>
              <h3 style={{ margin: 0 }}>Input Today</h3>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--secondary)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Minutes Spent
              </label>
              <input 
                type="number" 
                placeholder="e.g. 120" 
                value={minutes || ''} 
                onChange={(e) => setMinutes(Number(e.target.value))}
                style={{ fontSize: '1.25rem', fontWeight: 600 }}
              />
            </div>

            <button onClick={addLog} style={{ width: '100%', marginBottom: '1.5rem' }}>
              <Save size={18} style={{ marginRight: '10px', verticalAlign: 'middle' }} />
              Log Behavioral Data
            </button>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={generateMockData} className="secondary" style={{ flex: 1 }}>
                <RefreshCw size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Mock 14d
              </button>
              <button onClick={clearLogs} className="secondary" style={{ color: 'var(--danger)', flex: 1 }}>
                <Trash2 size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Clear
              </button>
            </div>
          </div>

          <div className="glass card" style={{ background: 'linear-gradient(135deg, hsla(180, 100%, 45%, 0.05), transparent)' }}>
            <h4 style={{ color: 'var(--primary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Data Quality</h4>
            <p style={{ fontSize: '0.85rem' }}>
              The model reaches statistical significance after 7 days of consecutive logging. Currently at **{logs.length}** days.
            </p>
          </div>
        </div>

        <div className="glass card" style={{ minHeight: '500px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: 'hsla(210, 20%, 100%, 0.05)', padding: '10px', borderRadius: '12px' }}>
                <Calendar color="var(--secondary)" size={24} />
              </div>
              <h3 style={{ margin: 0 }}>Behavioral Log History</h3>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--secondary)', background: 'var(--card-border)', padding: '4px 12px', borderRadius: '20px' }}>
              {logs.length} entries
            </span>
          </div>

          <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '1rem' }}>
            {logs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <p style={{ color: 'var(--secondary)' }}>No logs yet. Use mock data or start logging today.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {logs.slice().reverse().map((log) => (
                  <div key={log.day} className="glass" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'hsla(210, 20%, 100%, 0.02)' }}>
                    <div>
                      <span style={{ color: 'var(--secondary)', fontSize: '0.8rem', fontWeight: 600 }}>DAY {log.day}</span>
                      <p style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>{log.minutes}m</p>
                    </div>
                    <span style={{ 
                      padding: '4px 12px', 
                      borderRadius: '8px', 
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      background: 
                        getStateFromMinutes(log.minutes) === 'Addiction' ? 'hsla(0, 85%, 60%, 0.15)' :
                        getStateFromMinutes(log.minutes) === 'High' ? 'hsla(40, 95%, 60%, 0.15)' :
                        'hsla(180, 100%, 45%, 0.15)',
                      color: 
                        getStateFromMinutes(log.minutes) === 'Addiction' ? 'var(--danger)' :
                        getStateFromMinutes(log.minutes) === 'High' ? 'var(--warning)' :
                        'var(--primary)',
                      border: '1px solid currentColor'
                    }}>
                      {getStateFromMinutes(log.minutes)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
