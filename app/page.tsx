"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Stats from "./components/Stats";

export default function Home() {
  const [tick, setTick] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 60);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, size: Math.random() + 0.5, alpha: Math.random() * 0.3 + 0.05 });
    }
    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(109,40,217,${p.alpha})`; ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  const angle = (tick * 0.025) % (Math.PI * 2);

  const s = {
    page: { minHeight: '100vh', background: '#0a0a0f', color: '#e2e2e8', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', overflowX: 'hidden' as const },
    nav: { position: 'fixed' as const, top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: 60, background: 'rgba(10,10,15,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #1a1a22' },
    logoMark: { width: 34, height: 34, borderRadius: 9, background: 'linear-gradient(135deg, #6d28d9, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, color: '#fff', boxShadow: '0 0 16px rgba(109,40,217,0.4)', flexShrink: 0 },
    logoText: { fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1.2 },
    logoSub: { fontSize: 9, color: '#4a4a55', letterSpacing: '0.12em', lineHeight: 1 },
    navLinks: { display: 'flex', alignItems: 'center', gap: 28, fontSize: 12, color: '#6d6d7a', letterSpacing: '0.05em' },
    launchBtn: { padding: '7px 18px', borderRadius: 20, border: 'none', background: 'linear-gradient(135deg, #6d28d9, #2563eb)', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.05em', boxShadow: '0 0 14px rgba(109,40,217,0.3)' },
    section: { maxWidth: 1100, margin: '0 auto', padding: '0 24px' },
    label: { fontSize: 10, color: '#6d28d9', letterSpacing: '0.2em', textTransform: 'uppercase' as const, fontWeight: 700, marginBottom: 10 },
    divider: { border: 'none', borderTop: '1px solid #1a1a22', margin: 0 },
  };

  return (
    <div style={s.page}>
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.6 }} />

      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 40% at 50% -5%, rgba(109,40,217,0.15) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(109,40,217,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(109,40,217,0.03) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      </div>

      {/* Navbar */}
      <nav style={s.nav}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={s.logoMark}>M</div>
          <div>
            <div style={s.logoText}>MicroAI</div>
            <div style={s.logoSub}>Arc · Circle Hub</div>
          </div>
        </div>
        <div className="hidden md:flex" style={s.navLinks}>
          {[['Ecosystem', '#ecosystem'], ['Features', '#features'], ['How It Works', '#how-it-works'], ['Pricing', '#pricing']].map(([label, href]) => (
            <a key={label} href={href} style={{ textDecoration: 'none', color: '#6d6d7a', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = '#a78bfa'}
              onMouseLeave={e => (e.target as HTMLElement).style.color = '#6d6d7a'}>{label}</a>
          ))}
        </div>
        <Link href="/chat" style={{ ...s.launchBtn, textDecoration: 'none', display: 'inline-block' }}>Launch App</Link>
      </nav>

      {/* Hero */}
      <section style={{ position: 'relative', zIndex: 10, paddingTop: 120, paddingBottom: 80 }}>
        <div style={{ ...s.section, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 20, border: '1px solid rgba(34,197,94,0.25)', background: 'rgba(34,197,94,0.05)', marginBottom: 32 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s ease-in-out infinite' }} />
            <span style={{ fontSize: 11, color: '#86efac', letterSpacing: '0.1em' }}>Live on Arc Testnet · USDC Payments Active</span>
          </div>

          {/* Robot / AI visual */}
          <div style={{ position: 'relative', width: 160, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
            {/* Outer ring */}
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(109,40,217,0.2)', animation: 'spin 20s linear infinite' }} />
            <div style={{ position: 'absolute', inset: 12, borderRadius: '50%', border: '1px solid rgba(37,99,235,0.15)', animation: 'spin 15s linear infinite reverse' }} />
            {/* Orbiting dot */}
            <div style={{ position: 'absolute', width: 8, height: 8, borderRadius: '50%', background: '#6d28d9', boxShadow: '0 0 8px #6d28d9', top: '50%', left: '50%', transform: `translate(calc(-50% + ${Math.cos(angle) * 72}px), calc(-50% + ${Math.sin(angle) * 72}px))` }} />
            <div style={{ position: 'absolute', width: 5, height: 5, borderRadius: '50%', background: '#2563eb', boxShadow: '0 0 6px #2563eb', top: '50%', left: '50%', transform: `translate(calc(-50% + ${Math.cos(angle + 2.1) * 52}px), calc(-50% + ${Math.sin(angle + 2.1) * 52}px))` }} />
            {/* Face */}
            <div style={{ position: 'relative', zIndex: 2, width: 88, height: 88, borderRadius: 20, background: 'linear-gradient(135deg, #0d0020, #14003a)', border: '2px solid rgba(109,40,217,0.5)', boxShadow: '0 0 40px rgba(109,40,217,0.25)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <div style={{ display: 'flex', gap: 10 }}>
                {[0, 300].map((delay, i) => (
                  <div key={i} style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(109,40,217,0.15)', border: '1px solid rgba(109,40,217,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#818cf8', boxShadow: '0 0 6px #6d28d9', animation: `pulse 2s ease-in-out infinite`, animationDelay: `${delay}ms` }} />
                  </div>
                ))}
              </div>
              <div style={{ width: 28, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, transparent, #6d28d9, #2563eb, transparent)' }} />
              <div style={{ fontSize: 8, color: '#6d28d9', letterSpacing: '0.15em', fontWeight: 700 }}>MICROAI</div>
            </div>
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem, 8vw, 6rem)', fontWeight: 800, lineHeight: 0.95, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            <span style={{ background: 'linear-gradient(135deg, #fff 0%, #c4b5fd 50%, #93c5fd 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Arc & Circle</span>
            <br />
            <span style={{ color: '#fff' }}>AI Hub</span>
          </h1>

          <p style={{ fontSize: 16, color: '#8d8d9a', maxWidth: 520, lineHeight: 1.65, margin: '0 0 32px' }}>
            Ask anything about <span style={{ color: '#a78bfa' }}>Arc Blockchain</span> and <span style={{ color: '#93c5fd' }}>Circle</span>. Build, learn, solve — powered by AI. Pay <span style={{ color: '#fff', fontWeight: 600 }}>$0.001 USDC</span> per question.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 48 }}>
            <Link href="/chat" style={{ padding: '12px 28px', borderRadius: 24, background: 'linear-gradient(135deg, #6d28d9, #2563eb)', color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none', boxShadow: '0 0 24px rgba(109,40,217,0.35)', letterSpacing: '0.02em' }}>
              Ask MicroAI
            </Link>
            <a href="#ecosystem" style={{ padding: '12px 28px', borderRadius: 24, border: '1px solid #2a2a35', background: 'rgba(255,255,255,0.03)', color: '#9d9da8', fontSize: 14, fontWeight: 600, textDecoration: 'none', letterSpacing: '0.02em' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#6d28d9'; (e.currentTarget as HTMLElement).style.color = '#e2e2e8'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2a2a35'; (e.currentTarget as HTMLElement).style.color = '#9d9da8'; }}>
              Explore Hub
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, paddingTop: 32, borderTop: '1px solid #1a1a22', width: '100%', maxWidth: 400 }}>
            {[['$0.001', 'Per question'], ['< 3s', 'Response time'], ['100%', 'On-chain']].map(([val, lbl]) => (
              <div key={lbl} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800, background: 'linear-gradient(135deg, #a78bfa, #93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{val}</div>
                <div style={{ fontSize: 11, color: '#4a4a55', marginTop: 4 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr style={s.divider} />

      {/* Ecosystem */}
      <section id="ecosystem" style={{ position: 'relative', zIndex: 10, padding: '80px 0' }}>
        <div style={s.section}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={s.label}>Knowledge Hub</div>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: '#fff', margin: 0 }}>Arc & Circle Ecosystem</h2>
            <p style={{ fontSize: 14, color: '#6d6d7a', marginTop: 10 }}>Everything you need to know — ask MicroAI anything.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {/* Arc card */}
            <div style={{ padding: 28, borderRadius: 16, border: '1px solid rgba(109,40,217,0.25)', background: 'rgba(109,40,217,0.04)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #6d28d9, transparent)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(109,40,217,0.15)', border: '1px solid rgba(109,40,217,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#c4b5fd' }}>Arc Blockchain</div>
                  <div style={{ fontSize: 10, color: '#4a4a55' }}>arc.io</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: '#6d6d7a', lineHeight: 1.65, marginBottom: 16 }}>High-performance Layer 1 built for stablecoin commerce and the Agentic Economy. Native USDC gas, ERC-8004, ERC-8183 standards.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
                {['ERC-8004 AI Agents', 'ERC-8183 Job Settlement', 'Arc App Kit', 'USDC Native Gas', 'Arc House Community', 'Testnet Explorer'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#8d8d9a' }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#6d28d9', flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
              <Link href="/chat" style={{ display: 'block', textAlign: 'center', padding: '9px 0', borderRadius: 10, border: '1px solid rgba(109,40,217,0.35)', color: '#a78bfa', fontSize: 12, fontWeight: 600, textDecoration: 'none', letterSpacing: '0.05em' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(109,40,217,0.1)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                Ask about Arc
              </Link>
            </div>

            {/* Circle card */}
            <div style={{ padding: 28, borderRadius: 16, border: '1px solid rgba(37,99,235,0.25)', background: 'rgba(37,99,235,0.04)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #2563eb, transparent)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#93c5fd' }}>Circle</div>
                  <div style={{ fontSize: 10, color: '#4a4a55' }}>circle.com</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: '#6d6d7a', lineHeight: 1.65, marginBottom: 16 }}>The issuer of USDC — the world's leading regulated digital dollar. APIs, wallets, CCTP cross-chain transfers, and developer tools.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
                {['USDC Stablecoin', 'CCTP Cross-Chain', 'Circle Wallets API', 'Developer Console', 'Circle Contracts', 'Payments & Payouts'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#8d8d9a' }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#2563eb', flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
              <Link href="/chat" style={{ display: 'block', textAlign: 'center', padding: '9px 0', borderRadius: 10, border: '1px solid rgba(37,99,235,0.35)', color: '#93c5fd', fontSize: 12, fontWeight: 600, textDecoration: 'none', letterSpacing: '0.05em' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(37,99,235,0.1)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                Ask about Circle
              </Link>
            </div>
          </div>

          {/* Topic cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginTop: 16 }}>
            {[
              { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, title: 'Developer Tools', desc: 'SDKs, APIs, CLIs' },
              { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>, title: 'Smart Contracts', desc: 'Deploy & audit' },
              { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#86efac" strokeWidth="2"><circle cx="12" cy="8" r="5"/><path d="M3 21v-2a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7v2"/></svg>, title: 'AI Agents', desc: 'ERC-8004 standard' },
              { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fcd34d" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, title: 'DeFi & Payments', desc: 'Swap, bridge, pay' },
            ].map(card => (
              <Link href="/chat" key={card.title} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 12, border: '1px solid #1a1a22', background: 'rgba(255,255,255,0.02)', textDecoration: 'none', transition: 'all 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2a2a38'; (e.currentTarget as HTMLElement).style.background = '#14141c'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#1a1a22'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'; }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: '#1a1a22', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{card.icon}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#d1d1d6' }}>{card.title}</div>
                  <div style={{ fontSize: 10, color: '#4a4a55', marginTop: 2 }}>{card.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr style={s.divider} />

      {/* Stats */}
      <section style={{ position: 'relative', zIndex: 10, padding: '80px 0' }}>
        <div style={s.section}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={s.label}>Live Metrics</div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: '#fff', margin: 0 }}>Real Usage. Real Transactions.</h2>
          </div>
          <Stats />
        </div>
      </section>

      <hr style={s.divider} />

      {/* Features */}
      <section id="features" style={{ position: 'relative', zIndex: 10, padding: '80px 0' }}>
        <div style={s.section}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={s.label}>Why MicroAI</div>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: '#fff', margin: 0 }}>Your Arc & Circle Command Center</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {[
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>, title: 'Arc & Circle Expert', desc: 'Deep knowledge of Arc docs, Circle APIs, USDC mechanics, ERC standards and the full developer ecosystem.', border: 'rgba(109,40,217,0.2)', bg: 'rgba(109,40,217,0.04)' },
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, title: 'Instant Settlement', desc: 'Every $0.001 USDC payment settles on Arc Testnet in seconds. No waiting, no intermediaries.', border: 'rgba(37,99,235,0.2)', bg: 'rgba(37,99,235,0.04)' },
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#86efac" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>, title: 'Smart Answers', desc: 'Code examples, deployment guides, API references and troubleshooting for Arc and Circle.', border: 'rgba(34,197,94,0.2)', bg: 'rgba(34,197,94,0.04)' },
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fcd34d" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, title: 'Any Web3 Wallet', desc: 'Connect MetaMask or any EVM wallet on Arc Testnet. No account or sign-up required.', border: 'rgba(245,158,11,0.2)', bg: 'rgba(245,158,11,0.04)' },
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f9a8d4" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>, title: 'On-Chain Proof', desc: 'Every transaction is fully verifiable on testnet.arcscan.app. 100% transparent.', border: 'rgba(236,72,153,0.2)', bg: 'rgba(236,72,153,0.04)' },
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6ee7b7" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, title: 'Builder First', desc: 'From deploying your first contract to launching a full dApp — MicroAI guides you through.', border: 'rgba(16,185,129,0.2)', bg: 'rgba(16,185,129,0.04)' },
            ].map(f => (
              <div key={f.title} style={{ padding: '22px 24px', borderRadius: 14, border: `1px solid ${f.border}`, background: f.bg }}>
                <div style={{ marginBottom: 14 }}>{f.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#e2e2e8', marginBottom: 8 }}>{f.title}</div>
                <p style={{ fontSize: 12, color: '#6d6d7a', lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr style={s.divider} />

      {/* How it works */}
      <section id="how-it-works" style={{ position: 'relative', zIndex: 10, padding: '80px 0' }}>
        <div style={s.section}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={s.label}>Workflow</div>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: '#fff', margin: 0 }}>Four steps. Instant answers.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, maxWidth: 860, margin: '0 auto 40px' }}>
            {[
              { n: '01', title: 'Connect Wallet', desc: 'Connect any EVM wallet on Arc Testnet.' },
              { n: '02', title: 'Ask Anything', desc: 'Ask about Arc, Circle, USDC, contracts, APIs.' },
              { n: '03', title: 'Pay $0.001 USDC', desc: 'Approve a tiny USDC payment. Instant, secure.' },
              { n: '04', title: 'Get Answer', desc: 'AI responds. TX proof saved on Arc blockchain.' },
            ].map(step => (
              <div key={step.n} style={{ padding: '20px 22px', borderRadius: 14, border: '1px solid #1a1a22', background: '#0d0d12' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, rgba(109,40,217,0.3), rgba(37,99,235,0.3))', border: '1px solid rgba(109,40,217,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#a78bfa', marginBottom: 14 }}>{step.n}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#e2e2e8', marginBottom: 8 }}>{step.title}</div>
                <p style={{ fontSize: 12, color: '#6d6d7a', lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link href="/chat" style={{ display: 'inline-block', padding: '12px 32px', borderRadius: 24, background: 'linear-gradient(135deg, #6d28d9, #2563eb)', color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none', boxShadow: '0 0 20px rgba(109,40,217,0.3)' }}>
              Try MicroAI Now
            </Link>
          </div>
        </div>
      </section>

      <hr style={s.divider} />

      {/* Pricing */}
      <section id="pricing" style={{ position: 'relative', zIndex: 10, padding: '80px 0' }}>
        <div style={{ ...s.section, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={s.label}>Pricing</div>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: '#fff', margin: '0 0 8px', textAlign: 'center' }}>Simple. Fair. On-chain.</h2>
          <p style={{ fontSize: 14, color: '#6d6d7a', marginBottom: 40 }}>No plans. No tiers. Just pay per question.</p>
          <div style={{ width: '100%', maxWidth: 380, padding: '36px 32px', borderRadius: 20, border: '1px solid rgba(109,40,217,0.3)', background: 'linear-gradient(135deg, rgba(109,40,217,0.08), rgba(37,99,235,0.04))', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #6d28d9, #2563eb, transparent)' }} />
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{ fontSize: 56, fontWeight: 900, background: 'linear-gradient(135deg, #c4b5fd, #93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>$0.001</div>
              <div style={{ fontSize: 11, color: '#6d6d7a', marginTop: 6, letterSpacing: '0.08em' }}>USDC per AI response</div>
            </div>
            <div style={{ borderTop: '1px solid #1a1a22', paddingTop: 24, marginBottom: 24 }}>
              {['No monthly fees', 'No account required', 'Instant settlement on Arc', 'On-chain transaction proof', 'Any ERC-20 wallet', 'Arc & Circle expert AI'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, fontSize: 13, color: '#9d9da8' }}>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  {item}
                </div>
              ))}
            </div>
            <Link href="/chat" style={{ display: 'block', textAlign: 'center', padding: '13px 0', borderRadius: 12, background: 'linear-gradient(135deg, #6d28d9, #2563eb)', color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none', boxShadow: '0 0 20px rgba(109,40,217,0.3)' }}>
              Start for free
            </Link>
          </div>
        </div>
      </section>

      <hr style={s.divider} />

      {/* Footer */}
      <footer style={{ position: 'relative', zIndex: 10, padding: '32px 24px', background: '#08080c' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg, #6d28d9, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, color: '#fff' }}>M</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#e2e2e8' }}>MicroAI</div>
              <div style={{ fontSize: 9, color: '#3a3a42', letterSpacing: '0.1em' }}>Built on Arc · Powered by USDC</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[{ label: 'Arc', href: 'https://arc.io' }, { label: 'Circle', href: 'https://circle.com' }, { label: 'GitHub', href: 'https://github.com/sahmedonchain/microai' }, { label: 'Explorer', href: 'https://testnet.arcscan.app' }].map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: '#4a4a55', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = '#a78bfa'}
                onMouseLeave={e => (e.target as HTMLElement).style.color = '#4a4a55'}>{link.label}</a>
            ))}
            <Link href="/chat" style={{ fontSize: 12, color: '#4a4a55', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#e2e2e8'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#4a4a55'}>Launch App</Link>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; } 
        ::-webkit-scrollbar-track { background: #0a0a0f; }
        ::-webkit-scrollbar-thumb { background: #2a2a35; border-radius: 3px; }
        .hidden { display: none; }
        @media (min-width: 768px) { .hidden { display: flex !important; } }
      `}</style>
    </div>
  );
}