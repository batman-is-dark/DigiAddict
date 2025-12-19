import Link from 'next/link';
import { Activity, Shield, Brain, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="container animate-slide-up">
      {/* Dynamic Background Glows */}
      <div style={{
        position: 'fixed',
        top: '10%',
        left: '5%',
        width: '40%',
        height: '40%',
        background: 'radial-gradient(circle, hsla(199, 89%, 48%, 0.15) 0%, transparent 70%)',
        zIndex: -1,
        filter: 'blur(100px)',
        pointerEvents: 'none'
      }}></div>
      
      <div style={{
        position: 'fixed',
        bottom: '10%',
        right: '5%',
        width: '40%',
        height: '40%',
        background: 'radial-gradient(circle, hsla(280, 60%, 65%, 0.1) 0%, transparent 70%)',
        zIndex: -1,
        filter: 'blur(100px)',
        pointerEvents: 'none'
      }}></div>

      <section style={{ textAlign: 'center', padding: '10rem 0' }}>
        <div style={{ 
          display: 'inline-block', 
          padding: '10px 28px', 
          borderRadius: '100px', 
          background: 'hsla(210, 40%, 98%, 0.05)', 
          border: '1px solid var(--card-border)',
          color: 'var(--primary)',
          fontSize: '0.9rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          marginBottom: '3rem',
          backdropFilter: 'blur(10px)'
        }}>
          Stochastic Behavioral Forecasting
        </div>
        <h1 className="gradient-text">
          Master Your <br />
          Digital Gravity.
        </h1>
        <p style={{ maxWidth: '850px', margin: '0 auto 4rem auto', fontSize: '1.4rem', color: 'var(--secondary)', fontWeight: 500, lineHeight: '1.6' }}>
          Quantify your digital addiction risk with Markov Chain modeling. Reclaim your focus through high-fidelity behavioral hygiene plans designed for the modern digital era.
        </p>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
          <Link href="/track">
            <button style={{ padding: '20px 48px', fontSize: '1.15rem' }}>
              Initialize Telemetry
            </button>
          </Link>
          <Link href="/predict">
            <button className="secondary" style={{ padding: '20px 48px', fontSize: '1.15rem' }}>
              View Simulation
            </button>
          </Link>
        </div>
      </section>

      <div className="grid" style={{ marginTop: '8rem' }}>
        <div className="glass card">
          <div style={{ background: 'var(--primary-muted)', padding: '16px', borderRadius: '24px', width: 'max-content', marginBottom: '2rem', border: '1px solid hsla(199, 89%, 48%, 0.2)' }}>
            <Activity size={36} color="var(--primary)" />
          </div>
          <h3>Markov Modeling</h3>
          <p>
            Stochastic analysis of state transitions between Low, Medium, and High engagement states based on raw usage telemetry.
          </p>
        </div>
        <div className="glass card">
          <div style={{ background: 'hsla(150, 70%, 50%, 0.1)', padding: '16px', borderRadius: '24px', width: 'max-content', marginBottom: '2rem', border: '1px solid hsla(150, 70%, 50%, 0.2)' }}>
            <Shield size={36} color="var(--success)" />
          </div>
          <h3>Risk Quantification</h3>
          <p>
            Mathematically derived risk vectors predicting addiction probability through 10,000-step Monte Carlo simulations.
          </p>
        </div>
        <div className="glass card">
          <div style={{ background: 'hsla(280, 60%, 65%, 0.1)', padding: '16px', borderRadius: '24px', width: 'max-content', marginBottom: '2rem', border: '1px solid hsla(280, 60%, 65%, 0.2)' }}>
            <Brain size={36} color="var(--accent)" />
          </div>
          <h3>Machine Insights</h3>
          <p>
            Dynamically synthesized behavioral reporting that identifies "Attraction Loops" before they stabilize into habits.
          </p>
        </div>
      </div>

      <footer style={{ marginTop: '15rem', textAlign: 'center', borderTop: '1px solid var(--card-border)', padding: '10rem 0' }}>
        <h2 style={{ fontSize: '3.5rem', marginBottom: '2rem', color: 'white' }}>Ready to disrupt the loop?</h2>
        <p style={{ marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem auto' }}>Start your 3-day telemetry baseline today and experience the power of stochastic forecasting.</p>
        <Link href="/track">
          <button style={{ background: 'white', color: 'black', padding: '20px 56px' }}>
            Get Started Now <ArrowRight size={22} style={{ marginLeft: '12px', verticalAlign: 'middle' }} />
          </button>
        </Link>
      </footer>
    </div>
  );
}
