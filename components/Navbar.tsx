import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="nav">
      <Link href="/" style={{ textDecoration: 'none' }}>
        <h2 className="gradient-text" style={{ margin: 0, fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.04em' }}>
          DigiAddict<span style={{ color: 'var(--primary)' }}>.</span>
        </h2>
      </Link>
      <div className="nav-links">
        <Link href="/track">Telemetry</Link>
        <Link href="/predict">Markov Analysis</Link>
        <Link href="/plan">Hygiene Plan</Link>
      </div>
    </nav>
  );
}
