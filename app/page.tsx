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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, size: Math.random() * 1.5 + 0.5, opacity: Math.random() * 0.4 + 0.1 });
    }
    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${p.opacity})`; ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  const orbAngle = (tick * 0.02) % (Math.PI * 2);

  return (
    <div className="min-h-screen bg-[#03000f] text-white overflow-x-hidden" style={{ fontFamily: "'Rajdhani', sans-serif" }}>

      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-50" />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -10%, #1a0050 0%, transparent 70%)' }} />
        <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
        <div className="absolute w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12), transparent 70%)', left: mousePos.x - 192, top: mousePos.y - 192, transition: 'left 0.5s, top 0.5s' }} />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-3" style={{ background: 'rgba(3,0,15,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(139,92,246,0.1)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm" style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', boxShadow: '0 0 15px rgba(124,58,237,0.5)' }}>M</div>
            <div>
              <div className="text-sm font-black tracking-widest leading-none" style={{ letterSpacing: '0.12em' }}>MICRO<span style={{ color: '#818cf8' }}>AI</span></div>
              <div className="text-[7px] text-purple-400 tracking-widest" style={{ letterSpacing: '0.2em' }}>ARC · CIRCLE HUB</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-[10px] tracking-widest text-gray-400" style={{ letterSpacing: '0.12em' }}>
            {['ECOSYSTEM', 'FEATURES', 'HOW IT WORKS', 'PRICING'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="hover:text-purple-300 transition-colors">{item}</a>
            ))}
          </div>
          <Link href="/chat" className="px-4 py-2 text-[10px] font-black tracking-widest" style={{ letterSpacing: '0.12em', border: '1px solid rgba(139,92,246,0.5)', background: 'rgba(139,92,246,0.1)', color: '#c4b5fd' }}>
            LAUNCH →
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 pt-20 pb-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">

          {/* Badge */}
          <div className="flex justify-center mt-6 mb-6">
            <div className="flex items-center gap-2 px-3 py-1.5 text-[9px] tracking-widest" style={{ border: '1px solid rgba(34,197,94,0.4)', background: 'rgba(34,197,94,0.05)', color: '#86efac', letterSpacing: '0.15em' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE ON ARC TESTNET · USDC PAYMENTS ACTIVE
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="font-black leading-none mb-2" style={{ fontSize: 'clamp(2.5rem, 12vw, 8rem)', letterSpacing: '-0.02em' }}>
              <span style={{ background: 'linear-gradient(135deg, #fff 0%, #c4b5fd 40%, #818cf8 70%, #60a5fa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 0 30px rgba(139,92,246,0.4))' }}>ARC HUB</span>
            </h1>
            <div className="text-[9px] tracking-widest text-purple-400 mb-4" style={{ letterSpacing: '0.4em' }}>CONNECT · LEARN · INNOVATE</div>
            <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed px-2">
              Ask anything about <span className="text-purple-300 font-bold">Arc Blockchain</span> and <span className="text-blue-300 font-bold">Circle</span>. Pay <span className="text-white font-bold">$0.001 USDC</span> per question.
            </p>
          </div>

          {/* Robot center */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="relative flex items-center justify-center" style={{ width: 180, height: 180 }}>
              <div className="absolute inset-0 rounded-full" style={{ border: '1px solid rgba(139,92,246,0.2)', animation: 'spin 20s linear infinite' }} />
              <div className="absolute inset-4 rounded-full" style={{ border: '1px solid rgba(59,130,246,0.2)', animation: 'spin 15s linear infinite reverse' }} />
              <div className="absolute w-2.5 h-2.5 rounded-full" style={{ background: '#7c3aed', boxShadow: '0 0 8px #7c3aed', top: '50%', left: '50%', transform: `translate(calc(-50% + ${Math.cos(orbAngle) * 80}px), calc(-50% + ${Math.sin(orbAngle) * 80}px))` }} />
              <div className="absolute w-2 h-2 rounded-full" style={{ background: '#3b82f6', boxShadow: '0 0 6px #3b82f6', top: '50%', left: '50%', transform: `translate(calc(-50% + ${Math.cos(orbAngle + 2) * 58}px), calc(-50% + ${Math.sin(orbAngle + 2) * 58}px))` }} />
              <div className="relative z-10 w-24 h-24 rounded-2xl flex flex-col items-center justify-center" style={{ background: 'linear-gradient(135deg, #0a0020, #120030)', border: '2px solid rgba(139,92,246,0.6)', boxShadow: '0 0 40px rgba(139,92,246,0.3)' }}>
                <div className="flex gap-3 mb-2">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.6)' }}>
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#818cf8', boxShadow: '0 0 6px #7c3aed' }} />
                  </div>
                  <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.6)' }}>
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#818cf8', boxShadow: '0 0 6px #7c3aed', animationDelay: '0.3s' }} />
                  </div>
                </div>
                <div className="w-8 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #7c3aed, #3b82f6, transparent)' }} />
                <div className="mt-1 text-[7px] font-black tracking-widest text-purple-400" style={{ letterSpacing: '0.15em' }}>MicroAI</div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-lg font-black tracking-widest mb-1" style={{ letterSpacing: '0.15em' }}>MicroAI</div>
              <p className="text-xs text-gray-400">Your AI Assistant for Arc & Circle</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-1.5 max-w-xs">
              {['AI & TECH', 'GUIDES', 'INSIGHTS', 'TRENDS', 'TUTORIALS', 'BEST PRACTICES'].map(tag => (
                <span key={tag} className="px-2 py-0.5 text-[8px] font-bold tracking-widest" style={{ border: '1px solid rgba(139,92,246,0.3)', background: 'rgba(139,92,246,0.08)', color: '#a78bfa', letterSpacing: '0.1em' }}>{tag}</span>
              ))}
            </div>

            <Link href="/chat" className="px-8 py-3 font-black text-xs tracking-widest text-center w-full max-w-xs" style={{ letterSpacing: '0.2em', border: '2px solid rgba(139,92,246,0.8)', background: 'rgba(139,92,246,0.15)', boxShadow: '0 0 25px rgba(139,92,246,0.2)', color: '#e2e8f0' }}>
              INSTANT ANSWERS →
            </Link>
          </div>

          {/* 2-col ecosystem on mobile, 3-col on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="ecosystem">

            {/* Arc */}
            <div className="relative p-5 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(139,92,246,0.3)', background: 'rgba(139,92,246,0.05)' }}>
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #7c3aed, transparent)' }} />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.4)' }}>⬡</div>
                <div>
                  <div className="font-black text-xs tracking-widest text-purple-300" style={{ letterSpacing: '0.1em' }}>ARC BLOCKCHAIN</div>
                  <div className="text-[9px] text-gray-500">arc.io</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1.5 mb-4">
                {['ERC-8004 AI Agents', 'ERC-8183 Jobs', 'Arc App Kit', 'USDC Gas', 'Arc House', 'Explorer'].map(item => (
                  <div key={item} className="flex items-center gap-1 text-[10px] text-gray-400">
                    <span className="text-purple-500 text-[8px]">◆</span> {item}
                  </div>
                ))}
              </div>
              <Link href="/chat" className="block text-center py-2 text-[10px] font-black tracking-widest" style={{ border: '1px solid rgba(139,92,246,0.4)', color: '#c4b5fd', letterSpacing: '0.1em' }}>ASK ABOUT ARC →</Link>
            </div>

            {/* Center mini-cards on mobile — hide on md, show on lg */}
            <div className="flex flex-col gap-3 md:hidden lg:flex">
              {[
                { icon: '⚙️', title: 'DEVELOPER TOOLS', desc: 'SDKs · APIs · CLIs' },
                { icon: '📜', title: 'SMART CONTRACTS', desc: 'Deploy & verify' },
                { icon: '🤖', title: 'AI AGENTS', desc: 'ERC-8004 standard' },
                { icon: '💱', title: 'DEFI & PAYMENTS', desc: 'Swap · Bridge · Pay' },
              ].map(card => (
                <Link href="/chat" key={card.title} className="flex items-center gap-3 p-3 rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                  <span className="text-xl flex-shrink-0">{card.icon}</span>
                  <div>
                    <div className="text-[10px] font-black tracking-widest text-gray-300" style={{ letterSpacing: '0.08em' }}>{card.title}</div>
                    <div className="text-[9px] text-gray-600">{card.desc}</div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Circle */}
            <div className="relative p-5 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(59,130,246,0.3)', background: 'rgba(59,130,246,0.05)' }}>
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)' }} />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.4)' }}>◎</div>
                <div>
                  <div className="font-black text-xs tracking-widest text-blue-300" style={{ letterSpacing: '0.1em' }}>CIRCLE</div>
                  <div className="text-[9px] text-gray-500">circle.com</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1.5 mb-4">
                {['USDC', 'CCTP', 'Wallets API', 'Dev Console', 'Contracts', 'Payments'].map(item => (
                  <div key={item} className="flex items-center gap-1 text-[10px] text-gray-400">
                    <span className="text-blue-500 text-[8px]">◆</span> {item}
                  </div>
                ))}
              </div>
              <Link href="/chat" className="block text-center py-2 text-[10px] font-black tracking-widest" style={{ border: '1px solid rgba(59,130,246,0.4)', color: '#93c5fd', letterSpacing: '0.1em' }}>ASK ABOUT CIRCLE →</Link>
            </div>

          </div>

          {/* 2-col mini cards on md, hidden on mobile (shown above) */}
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-3 mt-4">
            {[
              { icon: '⚙️', title: 'DEVELOPER TOOLS', desc: 'SDKs · APIs · CLIs' },
              { icon: '📜', title: 'SMART CONTRACTS', desc: 'Deploy & verify' },
              { icon: '🤖', title: 'AI AGENTS', desc: 'ERC-8004 standard' },
              { icon: '💱', title: 'DEFI & PAYMENTS', desc: 'Swap · Bridge · Pay' },
            ].map(card => (
              <Link href="/chat" key={card.title} className="flex items-center gap-3 p-3 rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                <span className="text-xl">{card.icon}</span>
                <div>
                  <div className="text-[10px] font-black tracking-widest text-gray-300">{card.title}</div>
                  <div className="text-[9px] text-gray-600">{card.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom nav */}
      <div className="relative z-10 py-3 px-4 border-t border-b" style={{ borderColor: 'rgba(139,92,246,0.15)', background: 'rgba(3,0,15,0.8)' }}>
        <div className="max-w-7xl mx-auto flex justify-around md:justify-center md:gap-12">
          {[{ icon: '👥', label: 'Community' }, { icon: '📚', label: 'Knowledge' }, { icon: '🛠️', label: 'Support' }, { icon: '💡', label: 'Innovation' }, { icon: '📈', label: 'Progress' }].map(item => (
            <Link href="/chat" key={item.label} className="flex flex-col items-center gap-1">
              <span className="text-lg md:text-xl">{item.icon}</span>
              <span className="text-[8px] md:text-[10px] text-gray-500 tracking-widest" style={{ letterSpacing: '0.1em' }}>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats */}
      <section className="relative z-10 py-12 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-[9px] tracking-widest text-purple-400 mb-1" style={{ letterSpacing: '0.25em' }}>LIVE METRICS</div>
          <h2 className="text-xl md:text-3xl font-black tracking-widest" style={{ letterSpacing: '0.08em' }}>REAL-TIME Q&A STATS</h2>
        </div>
        <Stats />
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 py-12 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-[9px] tracking-widest text-purple-400 mb-1" style={{ letterSpacing: '0.25em' }}>CAPABILITIES</div>
          <h2 className="text-xl md:text-3xl font-black tracking-widest" style={{ letterSpacing: '0.08em' }}>WHY MICROAI HUB</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: '🧠', title: 'ARC & CIRCLE EXPERT', desc: 'Deep knowledge of Arc docs, Circle APIs, USDC mechanics, ERC-8004, ERC-8183.', color: 'rgba(139,92,246,0.3)' },
            { icon: '⚡', title: 'INSTANT SETTLEMENT', desc: '$0.001 USDC settles on Arc in seconds. No intermediaries, fully on-chain.', color: 'rgba(59,130,246,0.3)' },
            { icon: '🔍', title: 'SMART ANSWERS', desc: 'Code examples, deployment guides, API references and troubleshooting.', color: 'rgba(6,182,212,0.3)' },
            { icon: '🌐', title: 'ANY WEB3 WALLET', desc: 'Connect MetaMask or any EVM wallet. No account required.', color: 'rgba(34,197,94,0.3)' },
            { icon: '📊', title: 'ON-CHAIN PROOF', desc: 'Every transaction verifiable on testnet.arcscan.app. 100% transparent.', color: 'rgba(236,72,153,0.3)' },
            { icon: '🏗️', title: 'BUILDER FIRST', desc: 'From first contract to full dApp — MicroAI guides you through the ecosystem.', color: 'rgba(245,158,11,0.3)' },
          ].map(f => (
            <div key={f.title} className="p-5 rounded-xl space-y-2" style={{ border: `1px solid ${f.color}`, background: `${f.color.replace('0.3', '0.05')}` }}>
              <div className="text-2xl">{f.icon}</div>
              <div className="font-black text-xs tracking-widest" style={{ letterSpacing: '0.08em' }}>{f.title}</div>
              <p className="text-gray-400 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="relative z-10 py-12 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-[9px] tracking-widest text-purple-400 mb-1" style={{ letterSpacing: '0.25em' }}>WORKFLOW</div>
          <h2 className="text-xl md:text-3xl font-black tracking-widest" style={{ letterSpacing: '0.08em' }}>4 STEPS. INSTANT ANSWERS.</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { n: '01', title: 'CONNECT WALLET', desc: 'Any EVM wallet on Arc Testnet.' },
            { n: '02', title: 'ASK ANYTHING', desc: 'Arc, Circle, USDC, contracts, APIs.' },
            { n: '03', title: 'PAY $0.001 USDC', desc: 'Approve tiny USDC payment.' },
            { n: '04', title: 'GET ANSWER', desc: 'AI responds. TX proof on Arc.' },
          ].map(step => (
            <div key={step.n} className="space-y-2 p-4 rounded-xl" style={{ border: '1px solid rgba(139,92,246,0.15)', background: 'rgba(139,92,246,0.03)' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(59,130,246,0.3))', border: '1px solid rgba(139,92,246,0.4)', letterSpacing: '0.05em' }}>{step.n}</div>
              <div className="font-black text-[10px] tracking-widest" style={{ letterSpacing: '0.08em' }}>{step.title}</div>
              <p className="text-gray-500 text-[10px] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/chat" className="inline-flex items-center gap-2 px-8 py-3 font-black text-xs tracking-widest" style={{ letterSpacing: '0.15em', border: '2px solid rgba(139,92,246,0.6)', background: 'rgba(139,92,246,0.1)', boxShadow: '0 0 25px rgba(139,92,246,0.2)', color: '#e2e8f0' }}>
            TRY MICROAI NOW →
          </Link>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 py-12 px-4 md:px-6 text-center">
        <div className="max-w-xs mx-auto space-y-6">
          <div>
            <div className="text-[9px] tracking-widest text-purple-400 mb-1" style={{ letterSpacing: '0.25em' }}>PRICING</div>
            <h2 className="text-xl md:text-2xl font-black tracking-widest" style={{ letterSpacing: '0.08em' }}>SIMPLE. FAIR. ON-CHAIN.</h2>
          </div>
          <div className="relative rounded-2xl overflow-hidden p-6 space-y-5" style={{ border: '1px solid rgba(139,92,246,0.4)', background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(59,130,246,0.05))', boxShadow: '0 0 40px rgba(139,92,246,0.1)' }}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #7c3aed, #3b82f6, transparent)' }} />
            <div>
              <div className="text-5xl font-black" style={{ background: 'linear-gradient(135deg, #c4b5fd, #93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>$0.00<span>1</span></div>
              <div className="text-[9px] text-gray-400 mt-1 tracking-widest" style={{ letterSpacing: '0.15em' }}>USDC PER AI RESPONSE</div>
            </div>
            <hr style={{ borderColor: 'rgba(255,255,255,0.05)' }} />
            <ul className="text-left space-y-2">
              {['No monthly fees', 'No account required', 'Instant settlement on Arc', 'On-chain TX proof', 'Any ERC-20 wallet', 'Arc & Circle expert AI'].map(item => (
                <li key={item} className="flex items-center gap-2 text-xs text-gray-300">
                  <span className="text-emerald-400 text-sm">✓</span> {item}
                </li>
              ))}
            </ul>
            <Link href="/chat" className="block w-full py-3 font-black text-xs tracking-widest text-center" style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', letterSpacing: '0.15em', boxShadow: '0 0 15px rgba(139,92,246,0.4)' }}>
              START FOR FREE →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t px-4 md:px-6 py-8" style={{ borderColor: 'rgba(139,92,246,0.15)', background: 'rgba(3,0,15,0.95)' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs" style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}>M</div>
            <div>
              <div className="text-xs font-black tracking-widest" style={{ letterSpacing: '0.12em' }}>MICROAI</div>
              <div className="text-[8px] text-purple-400" style={{ letterSpacing: '0.2em' }}>BUILT ON ARC · POWERED BY USDC</div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-[10px] text-gray-500 tracking-widest" style={{ letterSpacing: '0.08em' }}>
            {[{ label: 'ARC', href: 'https://arc.io' }, { label: 'CIRCLE', href: 'https://circle.com' }, { label: 'GITHUB', href: 'https://github.com/sahmedonchain/microai' }, { label: 'EXPLORER', href: 'https://testnet.arcscan.app' }].map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">{link.label}</a>
            ))}
            <Link href="/chat" className="hover:text-white transition-colors">LAUNCH APP</Link>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap');
      `}</style>
    </div>
  );
}