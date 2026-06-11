"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState('Ask me anything about Arc Chain deployment or Circle USDC integrations...');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const setSize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    setSize();
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2, size: Math.random() * 1.5 + 0.5, opacity: Math.random() * 0.18 + 0.04 });
    }
    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16,185,129,${p.opacity})`; ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  const presets = [
    { label: 'For Developers & Builders', key: 'ERC-8004', q: 'How do I implement ERC-8004 AI Agent on Arc?', r: 'To deploy ERC-8004 on Arc, initialize with Arc Agent Core SDK, specify runtime constraints, and use native USDC gas settlement.' },
{ label: 'For Fintech & Startups', key: 'CCTP', q: 'How do I integrate Circle CCTP for cross-chain payments?', r: 'Circle CCTP burns USDC on source chain and mints native USDC on Arc — no wrapped tokens, fully native settlement.' },
{ label: 'For Crypto Native & Traders', key: 'trades', q: 'How does DeFi and liquidity work on Arc?', r: 'Arc supports DeFi protocols with sub-second finality and USDC-native gas — ideal for liquidity pools and instant settlement.' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#010503', color: '#e2e8f0', overflowX: 'hidden', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.35, width: '100%', height: '100%' }} />

      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '80%', height: '50%', borderRadius: '50%', background: 'rgba(16,185,129,0.04)', filter: 'blur(120px)' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.012, backgroundImage: 'linear-gradient(rgba(16,185,129,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.2) 1px, transparent 1px)', backgroundSize: '55px 55px' }} />
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', pointerEvents: 'none', background: 'radial-gradient(circle, rgba(16,185,129,0.05), transparent 70%)', left: mousePos.x - 200, top: mousePos.y - 200, transition: 'left 0.4s, top 0.4s' }} />
      </div>

      {/* NAVBAR */}
      <nav style={{ position: 'relative', top: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(3,18,10,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(16,185,129,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg, #34d399, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, color: '#000', flexShrink: 0, boxShadow: '0 0 12px rgba(16,185,129,0.3)' }}>M</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>MICRO<span style={{ color: '#34d399' }}>AI</span></div>
            <div style={{ fontSize: 7, color: 'rgba(52,211,153,0.5)', letterSpacing: '0.2em', fontFamily: 'monospace' }}>THE KNOWLEDGE HUB</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="hidden md:flex" style={{ gap: 20, fontSize: 10, color: '#64748b', fontWeight: 700, letterSpacing: '0.08em', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <a href="#hub-sectors" style={{ textDecoration: 'none', color: 'inherit' }}>ECOSYSTEM</a>
            <a href="#features" style={{ textDecoration: 'none', color: 'inherit' }}>CAPABILITIES</a>
            <a href="#pricing" style={{ textDecoration: 'none', color: 'inherit' }}>PRICING</a>
          </div>
          <Link href="/chat" style={{ padding: '7px 14px', borderRadius: 10, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(52,211,153,0.25)', color: '#34d399', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            LAUNCH →
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: 'relative', zIndex: 10, padding: '48px 20px 40px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 12px', borderRadius: 20, border: '1px solid rgba(16,185,129,0.15)', background: 'rgba(3,17,10,0.6)', marginBottom: 20 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: 9, color: '#34d399', fontWeight: 700, letterSpacing: '0.15em', fontFamily: 'monospace' }}>NOW LIVE ON TESTNET</span>
        </div>

        <h1 style={{ fontSize: 'clamp(1.8rem, 7vw, 4.5rem)', fontWeight: 900, lineHeight: 1.08, margin: '0 0 16px', background: 'linear-gradient(180deg, #fff 0%, rgba(148,163,184,0.5) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.02em' }}>
          The Arc & Circle<br />Intelligence Hub
        </h1>

        <p style={{ fontSize: 'clamp(13px, 3.5vw, 15px)', color: '#94a3b8', maxWidth: 480, margin: '0 auto 28px', lineHeight: 1.65 }}>
          One AI engine for all Arc and Circle queries, on-chain. Instant answers, for just <span style={{ color: '#34d399', fontWeight: 700 }}>$0.001 USDC</span> per question
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
          <Link href="/chat" style={{ padding: '11px 24px', borderRadius: 12, background: '#10b981', color: '#000', fontSize: 13, fontWeight: 800, letterSpacing: '0.06em', textDecoration: 'none', boxShadow: '0 0 18px rgba(16,185,129,0.25)' }}>
            LAUNCH ENGINE →
          </Link>
          <a href="#hub-sectors" style={{ padding: '11px 24px', borderRadius: 12, border: '1px solid rgba(16,185,129,0.2)', background: 'rgba(16,185,129,0.05)', color: '#34d399', fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textDecoration: 'none' }}>
            EXPLORE HUB
          </a>
        </div>
      </section>

      {/* CORE HUB WIDGET */}
      <section style={{ position: 'relative', zIndex: 10, padding: '0 16px 48px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ background: 'rgba(3,19,11,0.2)', backdropFilter: 'blur(20px)', border: '1px solid rgba(16,185,129,0.12)', borderRadius: 20, padding: '20px 16px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(52,211,153,0.3), transparent)' }} />
          <div style={{ fontSize: 9, color: '#34d399', fontWeight: 700, letterSpacing: '0.2em', fontFamily: 'monospace', marginBottom: 12 }}>AI TRAINING PRESET MATRIX</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {presets.map(item => (
              <button key={item.key} onClick={() => { setChatInput(item.q); setChatResponse(item.r); }}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: 10, border: chatInput.includes(item.key) ? '1px solid rgba(52,211,153,0.4)' : '1px solid rgba(16,185,129,0.07)', background: chatInput.includes(item.key) ? 'rgba(16,185,129,0.08)' : 'rgba(0,0,0,0.2)', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
                <span style={{ fontSize: 12, color: chatInput.includes(item.key) ? '#34d399' : '#94a3b8', fontWeight: 500 }}>{item.label}</span>
                <span style={{ fontSize: 9, color: '#475569', fontFamily: 'monospace', flexShrink: 0, marginLeft: 8 }}>Try Intel</span>
              </button>
            ))}
          </div>
          <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(16,185,129,0.1)', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ background: 'rgba(3,16,10,0.8)', padding: '8px 14px', borderBottom: '1px solid rgba(16,185,129,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                <span style={{ fontSize: 9, color: '#34d399', fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'monospace' }}>MICRO_HUB_CORE_V2.0</span>
              </div>
              <span style={{ fontSize: 8, color: '#475569', fontFamily: 'monospace' }}>SECURE SHELL</span>
            </div>
            <div style={{ padding: '14px', fontFamily: 'monospace' }}>
              <div style={{ fontSize: 9, color: '#475569', marginBottom: 4 }}>&gt; USER_QUERY_INPUT:</div>
              <div style={{ fontSize: 11, color: '#fff', background: 'rgba(16,185,129,0.06)', padding: '8px 10px', borderRadius: 8, border: '1px solid rgba(16,185,129,0.1)', marginBottom: 12, wordBreak: 'break-word', lineHeight: 1.5 }}>
                {chatInput || 'Select a preset or type a query...'}
              </div>
              <div style={{ fontSize: 9, color: 'rgba(52,211,153,0.5)', marginBottom: 4 }}>&gt; CORE_MICROAI_RESPONSE:</div>
              <div style={{ fontSize: 11, color: '#6ee7b7', lineHeight: 1.6, fontStyle: 'italic', wordBreak: 'break-word' }}>{chatResponse}</div>
            </div>
            <div style={{ padding: '10px', background: 'rgba(2,10,5,0.8)', borderTop: '1px solid rgba(16,185,129,0.06)', display: 'flex', gap: 8 }}>
              <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)}
                placeholder="Ask MicroAI something..."
                style={{ flex: 1, minWidth: 0, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, padding: '7px 12px', fontSize: 12, color: '#fff', outline: 'none', fontFamily: 'monospace' }} />
              <Link href="/chat" style={{ padding: '7px 14px', background: '#10b981', color: '#000', fontSize: 11, fontWeight: 800, borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', fontFamily: 'monospace', flexShrink: 0 }}>
                EXECUTE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HUB SECTORS */}
      <section id="hub-sectors" style={{ position: 'relative', zIndex: 10, padding: '40px 16px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 9, color: '#34d399', fontWeight: 700, letterSpacing: '0.25em', fontFamily: 'monospace', marginBottom: 8 }}>ECOSYSTEM MAP</div>
          <h2 style={{ fontSize: 'clamp(1.4rem, 5vw, 2.5rem)', fontWeight: 900, color: '#fff', margin: '0 0 10px' }}>One Hub. Every Stakeholder Role.</h2>
          <p style={{ fontSize: 13, color: '#64748b', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>Whether you write smart contracts or bootstrap communities, MicroAI has the knowledge you need.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
          {[
            { n: '01', title: 'Developers & Builders', points: ['Smart Contract Development', 'Frontend dApp Building', 'AI Agent Development (ERC-8004)', 'Agentic Commerce (ERC-8183)'] },
{ n: '02', title: 'Fintech & Startups', points: ['Payment App Building', 'Cross-border Remittance Apps', 'Treasury & Payroll Systems', 'FX & Stablecoin Settlement'] },
{ n: '03', title: 'Crypto Native', points: ['DeFi Protocol Building', 'Liquidity & Trading', 'Cross-chain Bridge Integration', 'Chainlink & Oracle Setup'] },
{ n: '04', title: 'Community & New Users', points: ['Arc House & Discord Help', 'Hackathon & Grant Guidance', 'Beginner Setup Guides', 'Merchants & Freelancers'] },
          ].map(sector => (
            <div key={sector.n} style={{ padding: '18px', borderRadius: 14, background: 'rgba(3,17,10,0.2)', border: '1px solid rgba(16,185,129,0.08)' }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: '#34d399', fontFamily: 'monospace', marginBottom: 10 }}>{sector.n}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 10 }}>{sector.title}</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {sector.points.map((p, i) => (
                  <li key={i} style={{ display: 'flex', gap: 8, fontSize: 11, color: '#64748b' }}>
                    <span style={{ color: '#34d399', flexShrink: 0 }}>▪</span><span>{p}</span>
                  </li>
                ))}
              </ul>
              <Link href="/chat" style={{ display: 'block', marginTop: 14, fontSize: 10, color: '#34d399', fontWeight: 700, fontFamily: 'monospace', letterSpacing: '0.1em', textDecoration: 'none' }}>
                ACCESS MODULE →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ position: 'relative', zIndex: 10, padding: '40px 16px', background: 'rgba(2,11,6,0.4)', borderTop: '1px solid rgba(16,185,129,0.05)', borderBottom: '1px solid rgba(16,185,129,0.05)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ fontSize: 9, color: '#34d399', fontWeight: 700, letterSpacing: '0.25em', fontFamily: 'monospace', marginBottom: 8 }}>DEEP TRAINING LAYER</div>
            <h2 style={{ fontSize: 'clamp(1.4rem, 5vw, 2.5rem)', fontWeight: 900, color: '#fff', margin: 0 }}>Engine Capabilities & Solutions</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
            {[
              { n: '01', title: 'Complete Protocol Ingestion', desc: 'Every page of official Arc Chain codebases and Circle developer documentation compiled into our AI memory.' },
              { n: '02', title: 'Instantaneous Error Resolution', desc: 'Input trace logs for custom, context-aware Arc & Circle debugging feedback instantly.' },
              { n: '03', title: 'Cross-Chain Architecture Advice', desc: "Master how Circle's USDC minting mechanics work with Arc's rapid network to build frictionless payment dApps." },
            ].map(f => (
              <div key={f.n} style={{ padding: '18px', borderRadius: 14, background: '#010604', border: '1px solid rgba(16,185,129,0.06)' }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: '#34d399', fontFamily: 'monospace', marginBottom: 12 }}>{f.n}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{f.title}</div>
                <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ position: 'relative', zIndex: 10, padding: '40px 16px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 9, color: '#34d399', fontWeight: 700, letterSpacing: '0.25em', fontFamily: 'monospace', marginBottom: 8 }}>FRICTIONLESS WORKFLOW</div>
          <h2 style={{ fontSize: 'clamp(1.4rem, 5vw, 2.5rem)', fontWeight: 900, color: '#fff', margin: 0 }}>Four Steps to Instant Clarity</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          {[
            { step: '01', name: 'Connect EVM Wallet', desc: 'Link your non-custodial wallet on Arc Testnet.' },
            { step: '02', name: 'State Your Question', desc: 'Ask anything about Arc SDK, Circle APIs, or contracts.' },
            { step: '03', name: 'Approve Micro-Settle', desc: 'Authorize $0.001 USDC directly on-chain.' },
            { step: '04', name: 'Get Your Answer', desc: 'Expert AI response with immutable TX proof on Arc.' },
          ].map(s => (
            <div key={s.step} style={{ padding: '16px', borderRadius: 12, background: 'rgba(3,17,10,0.1)', border: '1px solid rgba(16,185,129,0.06)' }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: '#34d399', fontFamily: 'monospace', marginBottom: 10 }}>{s.step}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{s.name}</div>
              <p style={{ fontSize: 11, color: '#64748b', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <Link href="/chat" style={{ display: 'inline-block', padding: '12px 28px', borderRadius: 12, background: '#10b981', color: '#000', fontSize: 13, fontWeight: 800, letterSpacing: '0.06em', textDecoration: 'none', boxShadow: '0 0 18px rgba(16,185,129,0.2)' }}>
            LAUNCH CHAT TERMINAL →
          </Link>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ position: 'relative', zIndex: 10, padding: '40px 16px', textAlign: 'center' }}>
        <div style={{ maxWidth: 340, margin: '0 auto' }}>
          <div style={{ fontSize: 9, color: '#34d399', fontWeight: 700, letterSpacing: '0.25em', fontFamily: 'monospace', marginBottom: 8 }}>FRICTIONLESS COSTS</div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 5vw, 2rem)', fontWeight: 900, color: '#fff', margin: '0 0 20px' }}>Zero Subscriptions.<br />Per-Query Only.</h2>
          <div style={{ background: 'linear-gradient(180deg, #03130c, rgba(1,6,4,0.95))', border: '2px solid rgba(16,185,129,0.15)', borderRadius: 22, padding: '28px 22px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(52,211,153,0.4), transparent)' }} />
            <div style={{ fontSize: 52, fontWeight: 900, color: '#fff', fontFamily: 'monospace', letterSpacing: '-0.02em' }}>$0.001</div>
            <div style={{ fontSize: 8, color: '#34d399', fontWeight: 700, letterSpacing: '0.2em', fontFamily: 'monospace', marginTop: 6 }}>USDC PER AI ENGINE CALL</div>
            <div style={{ height: 1, background: 'rgba(16,185,129,0.1)', margin: '18px 0' }} />
            <ul style={{ textAlign: 'left', margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['No monthly platform locking', 'Direct wallet-to-contract gas speed', 'Full access to all ecosystem modules', '100% on-chain audit log'].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: '#94a3b8' }}>
                  <span style={{ color: '#34d399', fontWeight: 700, flexShrink: 0 }}>✓</span> {item}
                </li>
              ))}
            </ul>
            <Link href="/chat" style={{ display: 'block', marginTop: 20, padding: '12px 0', borderRadius: 12, background: 'linear-gradient(135deg, #34d399, #10b981)', color: '#000', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textDecoration: 'none' }}>
              LAUNCH CHAT TERMINAL →
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position: 'relative', zIndex: 10, borderTop: '1px solid rgba(16,185,129,0.08)', background: '#010402', padding: '24px 16px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 24, height: 24, borderRadius: 7, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#34d399', flexShrink: 0 }}>M</div>
            <div style={{ fontSize: 10, color: '#475569' }}>MICROAI · THE ARC & CIRCLE HUB</div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {[{ l: 'ARC', h: 'https://arc.io' }, { l: 'CIRCLE', h: 'https://circle.com' }, { l: 'GITHUB', h: 'https://github.com/sahmedonchain/microai' }, { l: 'EXPLORER', h: 'https://testnet.arcscan.app' }].map(link => (
              <a key={link.l} href={link.h} target="_blank" rel="noreferrer" style={{ fontSize: 10, color: '#475569', fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'monospace', textDecoration: 'none' }}>
                {link.l}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        html { scroll-behavior: smooth; }
        body { background: #010503; margin: 0; }
        * { box-sizing: border-box; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .hidden { display: none; }
        @media (min-width: 768px) { .hidden { display: flex !important; } }
      `}</style>
    </div>
  );
}