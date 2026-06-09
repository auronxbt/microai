"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Stats from "./components/Stats";

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tick, setTick] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 50);
    return () => clearInterval(id);
  }, []);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p.opacity})`;
        ctx.fill();
      });
      // draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  const orbAngle = (tick * 0.02) % (Math.PI * 2);

  return (
    <div className="min-h-screen bg-[#03000f] text-white overflow-x-hidden" style={{ fontFamily: "'Rajdhani', 'Orbitron', monospace" }}>

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-60" />

      {/* Background glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -10%, #1a0050 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-1/2" style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 100%, #000830 0%, transparent 70%)' }} />
        {/* Mouse glow */}
        <div className="absolute w-96 h-96 rounded-full pointer-events-none transition-all duration-500"
          style={{
            background: 'radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%)',
            left: mousePos.x - 192,
            top: mousePos.y - 192,
          }} />
        {/* Grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
        {/* Scanlines */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 4px)',
        }} />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4" style={{ background: 'linear-gradient(180deg, rgba(3,0,15,0.95) 0%, transparent 100%)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 rounded-xl" style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', boxShadow: '0 0 20px rgba(124,58,237,0.6)' }} />
              <span className="relative font-black text-base">M</span>
            </div>
            <div>
              <div className="text-lg font-black tracking-widest" style={{ letterSpacing: '0.15em' }}>
                MICRO<span style={{ color: '#818cf8' }}>AI</span>
              </div>
              <div className="text-[8px] text-purple-400 tracking-[0.3em] -mt-1">ARC · CIRCLE HUB</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs tracking-widest text-gray-400" style={{ letterSpacing: '0.15em' }}>
            {['FEATURES', 'HOW IT WORKS', 'PRICING'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                className="hover:text-purple-300 transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-purple-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <Link href="/chat" className="relative px-6 py-2.5 text-xs font-black tracking-widest overflow-hidden group"
            style={{ letterSpacing: '0.15em', border: '1px solid rgba(139,92,246,0.5)', background: 'rgba(139,92,246,0.1)' }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.4), rgba(59,130,246,0.4))' }} />
            <span className="relative" style={{ color: '#c4b5fd' }}>LAUNCH APP →</span>
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-7xl mx-auto w-full">

          {/* Top badge */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2 px-4 py-2 text-xs tracking-widest" style={{ border: '1px solid rgba(34,197,94,0.4)', background: 'rgba(34,197,94,0.05)', color: '#86efac', letterSpacing: '0.2em' }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              LIVE ON ARC TESTNET · USDC PAYMENTS ACTIVE
            </div>
          </div>

          {/* Main title */}
          <div className="text-center mb-4">
            <h1 className="font-black leading-none" style={{ fontSize: 'clamp(3rem, 10vw, 9rem)', letterSpacing: '-0.02em' }}>
              <span style={{
                background: 'linear-gradient(135deg, #fff 0%, #c4b5fd 40%, #818cf8 70%, #60a5fa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 40px rgba(139,92,246,0.4))',
              }}>ARC HUB</span>
            </h1>
            <div className="text-xs tracking-[0.5em] text-purple-400 mt-2" style={{ letterSpacing: '0.5em' }}>CONNECT · LEARN · INNOVATE</div>
          </div>

          {/* 3-column hub layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12 items-start">

            {/* LEFT — Arc Community */}
            <div className="space-y-4">
              <div className="relative p-6 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(139,92,246,0.3)', background: 'rgba(139,92,246,0.05)', backdropFilter: 'blur(20px)' }}>
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #7c3aed, transparent)' }} />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.4)' }}>⬡</div>
                  <div>
                    <div className="font-black text-sm tracking-widest text-purple-300" style={{ letterSpacing: '0.15em' }}>ARC COMMUNITY</div>
                    <div className="text-[10px] text-gray-500 tracking-widest">arc.io</div>
                  </div>
                </div>
                <ul className="space-y-2">
                  {['ERC-8004 AI Agents', 'ERC-8183 Job Settlement', 'Arc App Kit', 'USDC Native Gas', 'Testnet Explorer', 'Arc House'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="text-purple-500 text-xs">◆</span> {item}
                    </li>
                  ))}
                </ul>
                <Link href="/chat" className="mt-4 block text-center py-2 text-xs font-black tracking-widest transition-all" style={{ border: '1px solid rgba(139,92,246,0.4)', color: '#c4b5fd', letterSpacing: '0.15em' }}>
                  LEARN ON ARC →
                </Link>
              </div>

              {/* Mini cards */}
              {[
                { icon: '⚙️', title: 'DEVELOPER TOOLS', desc: 'SDKs · APIs · CLIs' },
                { icon: '📜', title: 'SMART CONTRACTS', desc: 'Deploy & verify' },
              ].map(card => (
                <Link href="/chat" key={card.title} className="flex items-center gap-3 p-4 rounded-xl transition-all hover:border-purple-500/40 group"
                  style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                  <span className="text-2xl">{card.icon}</span>
                  <div>
                    <div className="text-xs font-black tracking-widest text-gray-300 group-hover:text-purple-300 transition-colors" style={{ letterSpacing: '0.1em' }}>{card.title}</div>
                    <div className="text-[10px] text-gray-600 mt-0.5">{card.desc}</div>
                  </div>
                </Link>
              ))}
            </div>

            {/* CENTER — Robot/AI Hub */}
            <div className="flex flex-col items-center gap-6">

              {/* Robot avatar */}
              <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Orbital rings */}
                <div className="absolute inset-0 rounded-full" style={{
                  border: '1px solid rgba(139,92,246,0.2)',
                  boxShadow: '0 0 40px rgba(139,92,246,0.1)',
                  animation: 'spin 20s linear infinite',
                }} />
                <div className="absolute inset-4 rounded-full" style={{
                  border: '1px solid rgba(59,130,246,0.2)',
                  animation: 'spin 15s linear infinite reverse',
                }} />
                <div className="absolute inset-8 rounded-full" style={{
                  border: '1px solid rgba(139,92,246,0.3)',
                  animation: 'spin 10s linear infinite',
                }} />

                {/* Orbiting dot */}
                <div className="absolute w-3 h-3 rounded-full" style={{
                  background: '#7c3aed',
                  boxShadow: '0 0 10px #7c3aed',
                  top: '50%',
                  left: '50%',
                  transform: `translate(calc(-50% + ${Math.cos(orbAngle) * 110}px), calc(-50% + ${Math.sin(orbAngle) * 110}px))`,
                }} />
                <div className="absolute w-2 h-2 rounded-full" style={{
                  background: '#3b82f6',
                  boxShadow: '0 0 8px #3b82f6',
                  top: '50%',
                  left: '50%',
                  transform: `translate(calc(-50% + ${Math.cos(orbAngle + 2) * 80}px), calc(-50% + ${Math.sin(orbAngle + 2) * 80}px))`,
                }} />

                {/* Center robot face */}
                <div className="relative z-10 w-40 h-40 rounded-3xl flex flex-col items-center justify-center" style={{
                  background: 'linear-gradient(135deg, #0a0020, #120030)',
                  border: '2px solid rgba(139,92,246,0.6)',
                  boxShadow: '0 0 60px rgba(139,92,246,0.3), inset 0 0 30px rgba(139,92,246,0.1)',
                }}>
                  {/* Eyes */}
                  <div className="flex gap-4 mb-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.6)' }}>
                      <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: '#818cf8', boxShadow: '0 0 8px #7c3aed' }} />
                    </div>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.6)' }}>
                      <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: '#818cf8', boxShadow: '0 0 8px #7c3aed', animationDelay: '0.3s' }} />
                    </div>
                  </div>
                  {/* Mouth */}
                  <div className="w-12 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #7c3aed, #3b82f6, transparent)' }} />
                  <div className="mt-3 text-xs font-black tracking-widest text-purple-400" style={{ letterSpacing: '0.2em' }}>MicroAI</div>
                </div>
              </div>

              {/* Center title */}
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-black tracking-widest" style={{ letterSpacing: '0.2em', color: '#e2e8f0' }}>MicroAI</h2>
                <p className="text-xs text-gray-400 tracking-wider">Your AI Assistant for the Arc & Circle Community</p>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {['AI & TECH', 'GUIDES', 'INSIGHTS', 'TRENDS', 'TUTORIALS', 'BEST PRACTICES'].map(tag => (
                    <span key={tag} className="px-3 py-1 text-[10px] font-bold tracking-widest" style={{
                      border: '1px solid rgba(139,92,246,0.3)',
                      background: 'rgba(139,92,246,0.08)',
                      color: '#a78bfa',
                      letterSpacing: '0.15em',
                    }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <Link href="/chat" className="relative px-10 py-4 font-black text-sm tracking-widest overflow-hidden group w-full text-center"
                style={{ letterSpacing: '0.2em', border: '2px solid rgba(139,92,246,0.8)', background: 'rgba(139,92,246,0.1)', boxShadow: '0 0 30px rgba(139,92,246,0.2)' }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.5), rgba(59,130,246,0.5))' }} />
                <span className="relative" style={{ color: '#e2e8f0' }}>INSTANT ANSWERS →</span>
              </Link>

              {/* Chat preview mini */}
              <div className="w-full rounded-xl overflow-hidden" style={{ border: '1px solid rgba(139,92,246,0.2)', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)' }}>
                <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ borderColor: 'rgba(139,92,246,0.15)' }}>
                  <div className="w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-black" style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}>M</div>
                  <span className="text-xs text-gray-400 tracking-widest" style={{ letterSpacing: '0.1em' }}>MICROAI ASSISTANT</span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="text-xs text-gray-400 italic">"Hello! How can I assist you with Arc & Circle today?"</div>
                  <div className="flex gap-2">
                    <div className="flex-1 px-3 py-2 text-[10px] text-gray-600 rounded-lg" style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                      Ask anything...
                    </div>
                    <div className="px-3 py-2 text-[10px] rounded-lg" style={{ background: 'rgba(139,92,246,0.3)', color: '#c4b5fd' }}>→</div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — Circle Community */}
            <div className="space-y-4">
              <div className="relative p-6 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(59,130,246,0.3)', background: 'rgba(59,130,246,0.05)', backdropFilter: 'blur(20px)' }}>
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)' }} />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.4)' }}>◎</div>
                  <div>
                    <div className="font-black text-sm tracking-widest text-blue-300" style={{ letterSpacing: '0.15em' }}>CIRCLE COMMUNITY</div>
                    <div className="text-[10px] text-gray-500 tracking-widest">circle.com</div>
                  </div>
                </div>
                <ul className="space-y-2">
                  {['USDC Stablecoin', 'CCTP Cross-Chain', 'Circle Wallets API', 'Developer Console', 'Circle Contracts', 'Payments & Payouts'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="text-blue-500 text-xs">◆</span> {item}
                    </li>
                  ))}
                </ul>
                <Link href="/chat" className="mt-4 block text-center py-2 text-xs font-black tracking-widest transition-all" style={{ border: '1px solid rgba(59,130,246,0.4)', color: '#93c5fd', letterSpacing: '0.15em' }}>
                  LEARN ON CIRCLE →
                </Link>
              </div>

              {/* Mini cards */}
              {[
                { icon: '🤖', title: 'AI AGENTS', desc: 'ERC-8004 standard' },
                { icon: '💱', title: 'DEFI & PAYMENTS', desc: 'Swap · Bridge · Pay' },
              ].map(card => (
                <Link href="/chat" key={card.title} className="flex items-center gap-3 p-4 rounded-xl transition-all hover:border-blue-500/40 group"
                  style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                  <span className="text-2xl">{card.icon}</span>
                  <div>
                    <div className="text-xs font-black tracking-widest text-gray-300 group-hover:text-blue-300 transition-colors" style={{ letterSpacing: '0.1em' }}>{card.title}</div>
                    <div className="text-[10px] text-gray-600 mt-0.5">{card.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom nav bar like image */}
      <div className="relative z-10 border-t py-4 px-6" style={{ borderColor: 'rgba(139,92,246,0.2)', background: 'rgba(3,0,15,0.9)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-7xl mx-auto flex justify-center gap-12">
          {[
            { icon: '👥', label: 'Community' },
            { icon: '📚', label: 'Knowledge' },
            { icon: '🛠️', label: 'Support' },
            { icon: '💡', label: 'Innovation' },
            { icon: '📈', label: 'Progress' },
          ].map(item => (
            <Link href="/chat" key={item.label} className="flex flex-col items-center gap-1 group">
              <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
              <span className="text-[10px] text-gray-500 group-hover:text-purple-400 transition-colors tracking-widest" style={{ letterSpacing: '0.15em' }}>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats */}
      <section id="stats" className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs tracking-widest text-purple-400 mb-2" style={{ letterSpacing: '0.3em' }}>LIVE METRICS</div>
          <h2 className="text-3xl font-black tracking-widest" style={{ letterSpacing: '0.1em' }}>REAL-TIME Q&A STATS</h2>
        </div>
        <Stats />
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs tracking-widest text-purple-400 mb-2" style={{ letterSpacing: '0.3em' }}>CAPABILITIES</div>
          <h2 className="text-3xl font-black tracking-widest" style={{ letterSpacing: '0.1em' }}>WHY MICROAI HUB</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: '🧠', title: 'ARC & CIRCLE EXPERT', desc: 'Deep knowledge of Arc docs, Circle APIs, USDC mechanics, ERC-8004, ERC-8183 and the full ecosystem.', color: 'rgba(139,92,246,0.3)' },
            { icon: '⚡', title: 'INSTANT SETTLEMENT', desc: 'Every $0.001 USDC payment settles on Arc in seconds. No intermediaries, fully on-chain.', color: 'rgba(59,130,246,0.3)' },
            { icon: '🔍', title: 'SMART ANSWERS', desc: 'Code examples, deployment guides, API references and troubleshooting for Arc & Circle.', color: 'rgba(6,182,212,0.3)' },
            { icon: '🌐', title: 'ANY WEB3 WALLET', desc: 'Connect MetaMask or any EVM wallet on Arc Testnet. No account or sign-up required.', color: 'rgba(34,197,94,0.3)' },
            { icon: '📊', title: 'ON-CHAIN PROOF', desc: 'Every transaction is fully verifiable on testnet.arcscan.app. 100% transparent.', color: 'rgba(236,72,153,0.3)' },
            { icon: '🏗️', title: 'BUILDER FIRST', desc: 'From deploying your first contract to launching a full dApp — MicroAI guides you.', color: 'rgba(245,158,11,0.3)' },
          ].map(f => (
            <div key={f.title} className="p-6 rounded-2xl space-y-3 hover:scale-[1.02] transition-transform group"
              style={{ border: `1px solid ${f.color}`, background: `${f.color.replace('0.3', '0.05')}` }}>
              <div className="text-3xl">{f.icon}</div>
              <div className="font-black text-sm tracking-widest" style={{ letterSpacing: '0.1em' }}>{f.title}</div>
              <p className="text-gray-400 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs tracking-widest text-purple-400 mb-2" style={{ letterSpacing: '0.3em' }}>WORKFLOW</div>
          <h2 className="text-3xl font-black tracking-widest" style={{ letterSpacing: '0.1em' }}>FOUR STEPS. INSTANT ANSWERS.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { n: '01', title: 'CONNECT WALLET', desc: 'Connect any EVM wallet on Arc Testnet.' },
            { n: '02', title: 'ASK ANYTHING', desc: 'Ask about Arc, Circle, USDC, contracts, APIs.' },
            { n: '03', title: 'PAY $0.001 USDC', desc: 'Approve a tiny USDC payment. Instant, secure.' },
            { n: '04', title: 'GET ANSWER', desc: 'AI responds. TX proof saved on Arc blockchain.' },
          ].map(step => (
            <div key={step.n} className="space-y-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm" style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(59,130,246,0.3))',
                border: '1px solid rgba(139,92,246,0.4)',
                letterSpacing: '0.1em',
              }}>{step.n}</div>
              <div className="font-black text-xs tracking-widest" style={{ letterSpacing: '0.15em' }}>{step.title}</div>
              <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/chat" className="inline-flex items-center gap-3 px-10 py-4 font-black text-sm tracking-widest"
            style={{ letterSpacing: '0.2em', border: '2px solid rgba(139,92,246,0.6)', background: 'rgba(139,92,246,0.1)', boxShadow: '0 0 30px rgba(139,92,246,0.2)', color: '#e2e8f0' }}>
            TRY MICROAI NOW →
          </Link>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 py-20 px-6 text-center">
        <div className="max-w-sm mx-auto space-y-8">
          <div>
            <div className="text-xs tracking-widest text-purple-400 mb-2" style={{ letterSpacing: '0.3em' }}>PRICING</div>
            <h2 className="text-3xl font-black tracking-widest" style={{ letterSpacing: '0.1em' }}>SIMPLE. FAIR. ON-CHAIN.</h2>
          </div>
          <div className="relative rounded-2xl overflow-hidden p-8 space-y-6" style={{
            border: '1px solid rgba(139,92,246,0.4)',
            background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(59,130,246,0.05))',
            boxShadow: '0 0 60px rgba(139,92,246,0.1)',
          }}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #7c3aed, #3b82f6, transparent)' }} />
            <div>
              <div className="text-6xl font-black" style={{
                background: 'linear-gradient(135deg, #c4b5fd, #93c5fd)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>$0.001</div>
              <div className="text-xs text-gray-400 mt-2 tracking-widest" style={{ letterSpacing: '0.2em' }}>USDC PER AI RESPONSE</div>
            </div>
            <hr style={{ borderColor: 'rgba(255,255,255,0.05)' }} />
            <ul className="text-left space-y-3">
              {['No monthly fees', 'No account required', 'Instant settlement on Arc', 'On-chain TX proof', 'Any ERC-20 wallet', 'Arc & Circle expert AI'].map(item => (
                <li key={item} className="flex items-center gap-3 text-xs text-gray-300">
                  <span className="text-emerald-400">✓</span> {item}
                </li>
              ))}
            </ul>
            <Link href="/chat" className="block w-full py-4 font-black text-xs tracking-widest text-center"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', letterSpacing: '0.2em', boxShadow: '0 0 20px rgba(139,92,246,0.4)' }}>
              START FOR FREE →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t px-6 py-10" style={{ borderColor: 'rgba(139,92,246,0.15)', background: 'rgba(3,0,15,0.95)' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs" style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}>M</div>
            <div>
              <div className="text-sm font-black tracking-widest" style={{ letterSpacing: '0.15em' }}>MICROAI</div>
              <div className="text-[9px] text-purple-400 tracking-widest" style={{ letterSpacing: '0.3em' }}>BUILT ON ARC · POWERED BY USDC</div>
            </div>
          </div>
          <div className="flex gap-6 text-xs text-gray-500 tracking-widest" style={{ letterSpacing: '0.1em' }}>
            {[
              { label: 'ARC', href: 'https://arc.io' },
              { label: 'CIRCLE', href: 'https://circle.com' },
              { label: 'GITHUB', href: 'https://github.com/sahmedonchain/microai' },
              { label: 'EXPLORER', href: 'https://testnet.arcscan.app' },
            ].map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">{link.label}</a>
            ))}
            <Link href="/chat" className="hover:text-white transition-colors">LAUNCH APP</Link>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;700;900&display=swap');
      `}</style>
    </div>
  );
}