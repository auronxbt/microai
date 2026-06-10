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

    // Fix: use CSS sizing, not canvas width/height to avoid reflow
    const setSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };
    setSize();

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.2 + 0.05,
      });
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
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(16,185,129,${0.04 * (1 - dist / 120)})`;
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

  const handlePresetQuery = (query: string, response: string) => {
    setChatInput(query);
    setChatResponse(response);
  };

  return (
    <div className="min-h-screen bg-[#010503] text-[#e2e8f0] overflow-x-hidden relative" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Background canvas — position fixed, no layout impact */}
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.4, width: '100%', height: '100%' }} />

      {/* Ambient glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-[60%] rounded-full bg-emerald-500/[0.05] blur-[140px]" />
        <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.06), transparent 70%)', left: mousePos.x - 300, top: mousePos.y - 300, transition: 'left 0.4s ease, top 0.4s ease' }} />
        <div className="absolute inset-0 opacity-[0.012]" style={{ backgroundImage: "linear-gradient(rgba(16,185,129,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.2) 1px, transparent 1px)", backgroundSize: "55px 55px" }} />
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl px-4 md:px-6 py-3 bg-[#03120a]/60 backdrop-blur-xl border border-emerald-500/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center font-black text-xs text-black shadow-[0_0_14px_rgba(16,185,129,0.3)] flex-shrink-0">M</div>
          <div>
            <div className="text-sm font-bold tracking-wider text-white leading-none">MICRO<span className="text-emerald-400 font-extrabold">AI</span></div>
            <div className="text-[7px] text-emerald-500/60 tracking-[0.2em] font-mono">THE KNOWLEDGE HUB</div>
          </div>
        </div>

        <div className="hidden md:flex items-center bg-[#010805]/90 border border-emerald-950/80 rounded-full px-5 py-1.5 gap-6 text-[10px] font-bold tracking-widest text-gray-400">
          <a href="#hub-sectors" className="hover:text-emerald-400 transition-colors">ECOSYSTEM</a>
          <a href="#features" className="hover:text-emerald-400 transition-colors">CAPABILITIES</a>
          <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">HOW IT WORKS</a>
          <a href="#pricing" className="hover:text-emerald-400 transition-colors">PRICING</a>
        </div>

        <Link href="/chat" className="px-4 py-1.5 text-[11px] font-bold tracking-wider rounded-xl bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 hover:bg-emerald-400 hover:text-black transition-all duration-200 flex-shrink-0">
          LAUNCH ENGINE →
        </Link>
      </nav>

      {/* HERO */}
      <header className="relative z-10 pt-32 md:pt-36 pb-12 px-4 md:px-6 max-w-7xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/15 bg-[#03110a]/60 text-[9px] font-bold text-emerald-400 tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          UNIVERSAL KNOWLEDGE LAYER FOR ARC & CIRCLE · LIVE
        </div>

        {/* Fix: use explicit sizes instead of responsive text to prevent reflow */}
        <h1 className="font-black tracking-tight leading-tight max-w-4xl mx-auto text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-400/50 mb-4"
          style={{ fontSize: 'clamp(2rem, 6vw, 5.5rem)', lineHeight: 1.05 }}>
          The Arc & Circle Intelligence Hub
        </h1>

        <p className="text-slate-400 max-w-xl mx-auto mt-4 font-medium leading-relaxed" style={{ fontSize: 'clamp(13px, 2vw, 16px)' }}>
          One AI engine for every Arc and Circle question — built on-chain. Ask anything, get instant answers, pay <span className="text-emerald-400 font-bold">$0.001 USDC</span> per query.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <Link href="/chat" className="px-6 py-3 rounded-xl bg-emerald-500 text-black font-black text-sm tracking-wider hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.25)]">
            LAUNCH ENGINE →
          </Link>
          <a href="#hub-sectors" className="px-6 py-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 font-bold text-sm tracking-wider hover:border-emerald-500/40 transition-all">
            EXPLORE HUB
          </a>
        </div>
      </header>

      {/* CORE HUB WIDGET */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 mb-20">
        <div className="bg-[#03130b]/20 backdrop-blur-2xl border border-emerald-500/15 rounded-3xl p-5 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4">
              <div className="text-[10px] font-mono font-bold text-emerald-400 tracking-widest uppercase">AI Training Preset Matrix</div>
              <h3 className="text-lg md:text-xl font-bold text-white tracking-wide">Test the Hub In Realtime</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Click any stakeholder category to see how MicroAI handles real Arc & Circle ecosystem questions.
              </p>
              <div className="space-y-2 pt-1">
                {[
                  { label: "For Developers & Deployers", key: "ERC-8004", query: "How do I implement ERC-8004 AI Agent specifications on Arc Chain?", resp: "To deploy ERC-8004 on Arc, initialize your contract with the Arc Agent Core SDK, specify your runtime constraints, and ensure gas calculations utilize the native USDC gas settlement architecture." },
                  { label: "For Marketers & Teams", key: "CCTP", query: "How can we leverage Circle CCTP for cross-chain liquidity marketing?", resp: "Circle CCTP allows your marketing campaigns to target multi-chain native onboarding. Users burn USDC on source chains and mint natively on Arc without third-party wrap risk." },
                  { label: "For Buyers, Sellers & Traders", key: "trades", query: "What is the easiest protocol to settle secure USDC trades on Arc?", resp: "Traders use the Native Arc Liquidity Hub. Transactions take advantage of sub-second settlement using Circle's native APIs, ensuring 100% security with near-zero slippage." },
                ].map((item) => (
                  <button key={item.key} onClick={() => handlePresetQuery(item.query, item.resp)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${chatInput.includes(item.key) ? 'bg-emerald-500/10 border-emerald-400/40 text-emerald-400 font-bold' : 'bg-black/20 border-emerald-500/5 text-slate-400 hover:border-emerald-500/20 hover:text-slate-300'}`}>
                    <span>{item.label}</span>
                    <span className="text-[9px] font-mono opacity-60 ml-2 flex-shrink-0">Try Intel</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-7 bg-black/40 border border-emerald-500/10 rounded-2xl overflow-hidden flex flex-col shadow-inner" style={{ minHeight: 260 }}>
              <div className="bg-[#03100a]/80 px-4 py-2.5 border-b border-emerald-950/60 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] font-mono text-emerald-500 font-bold tracking-wider">MICRO_HUB_CORE_V2.0</span>
                </div>
                <span className="text-[8px] font-mono text-slate-500">SECURE SHELL</span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between font-mono overflow-hidden">
                <div className="space-y-1 mb-3">
                  <div className="text-[10px] text-slate-500">&gt; USER_QUERY_INPUT:</div>
                  <div className="text-xs text-white font-medium bg-emerald-950/20 p-2 rounded border border-emerald-900/30 line-clamp-2">
                    {chatInput || "Select a training preset or type a custom query..."}
                  </div>
                </div>
                <div className="space-y-1 flex-1">
                  <div className="text-[10px] text-emerald-500/60">&gt; CORE_MICROAI_RESPONSE:</div>
                  <div className="text-[11px] text-emerald-300 leading-relaxed italic line-clamp-4">{chatResponse}</div>
                </div>
              </div>
              <div className="p-2 bg-[#020a05] border-t border-emerald-950/60 flex gap-2 flex-shrink-0">
                <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)}
                  placeholder="Ask MicroAI something..."
                  className="bg-black/40 border border-emerald-900/50 rounded-lg px-3 py-1.5 text-xs text-white flex-1 focus:outline-none focus:border-emerald-400 font-mono min-w-0" />
                <Link href="/chat" className="px-3 py-1.5 bg-emerald-500 text-black text-xs font-black rounded-lg hover:bg-emerald-400 transition font-mono flex-shrink-0">
                  EXECUTE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HUB SECTORS */}
      <section id="hub-sectors" className="relative z-10 py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-[9px] font-mono font-bold tracking-[0.3em] text-emerald-400 mb-2 uppercase">Ecosystem Map</div>
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">One Hub. Every Stakeholder Role.</h2>
          <p className="text-xs md:text-sm text-slate-400 max-w-xl mx-auto mt-3 leading-relaxed">Whether you write smart contracts or bootstrap communities, MicroAI has the exact knowledge you need.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { n: "01", title: "Developers & Architects", points: ["ERC-8004 & ERC-8183 templates", "Circle Programmable Wallets APIs", "Arc App Kit integration steps", "Sub-second gas optimization"] },
            { n: "02", title: "Marketers & Project Teams", points: ["Circle CCTP launch frameworks", "Cross-chain onboarding tactics", "Arc Testnet deployment narrative", "Native USDC distribution flows"] },
            { n: "03", title: "Buyers, Sellers & Traders", points: ["USDC atomic swap structures", "Arc Liquidity Pool mechanics", "Secure payment tracking steps", "Zero-slippage path routing"] },
            { n: "04", title: "New Users & Community", points: ["Arc Chain basic setup guides", "Frictionless faucet instructions", "Ecosystem project directory", "Troubleshooting wallet errors"] },
          ].map((sector) => (
            <div key={sector.n} className="p-5 rounded-2xl bg-[#03110a]/20 border border-emerald-500/10 hover:border-emerald-500/25 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/5 border border-emerald-500/15 flex items-center justify-center text-emerald-400 font-bold font-mono text-xs mb-4">{sector.n}</div>
                <h4 className="font-bold text-sm text-white tracking-wide mb-3 group-hover:text-emerald-400 transition-colors">{sector.title}</h4>
                <ul className="space-y-2">
                  {sector.points.map((p, i) => (
                    <li key={i} className="text-xs text-slate-400 flex items-start gap-2 font-medium">
                      <span className="text-emerald-500 mt-0.5 flex-shrink-0">▪</span><span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/chat" className="mt-5 text-[10px] font-mono font-black text-emerald-500 tracking-wider hover:text-emerald-400 transition-colors">
                ACCESS MODULE →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative z-10 py-16 bg-[#020b06]/40 border-y border-emerald-500/5 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-[9px] font-mono font-bold tracking-[0.3em] text-emerald-400 mb-2 uppercase">Deep Training Layer</div>
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">Engine Capabilities & Solutions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: "Complete Protocol Ingestion", desc: "Every page of official Arc Chain codebases, Circle developer documentation, and ecosystem manuals compiled into our AI memory." },
              { title: "Instantaneous Error Resolution", desc: "Stuck on a failed transaction or code issue? Input trace logs for custom, context-aware Arc & Circle debugging feedback instantly." },
              { title: "Cross-Chain Architecture Advice", desc: "Master how Circle's USDC minting mechanics work with Arc's rapid network infrastructure to build frictionless payment dApps." },
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#010604] border border-emerald-500/5 hover:border-emerald-500/15 transition-all">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center font-mono font-black text-emerald-400 text-xs mb-4">0{i + 1}</div>
                <h3 className="font-bold text-sm text-white tracking-wider mb-2">{f.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="relative z-10 py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-[9px] font-mono font-bold tracking-[0.3em] text-emerald-400 mb-2 uppercase">Frictionless Workflow</div>
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">Four Steps to Instant Clarity</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {[
            { step: "01", name: "Connect EVM Wallet", desc: "Link your non-custodial wallet on the Arc Testnet channel." },
            { step: "02", name: "State Your Question", desc: "Ask anything about Arc SDK, Circle APIs, or contract verification." },
            { step: "03", name: "Approve Micro-Settle", desc: "Authorize $0.001 USDC directly on-chain. Instant, secure." },
            { step: "04", name: "Get Your Answer", desc: "Receive expert AI responses with immutable TX proof on Arc." },
          ].map((s) => (
            <div key={s.step} className="p-4 md:p-5 rounded-2xl bg-[#03110a]/10 border border-emerald-500/5">
              <div className="text-xs font-mono font-black text-emerald-400 mb-3 bg-emerald-500/5 w-8 h-8 rounded-lg flex items-center justify-center border border-emerald-500/10">{s.step}</div>
              <div className="font-bold text-xs text-white tracking-wide mb-1.5">{s.name}</div>
              <p className="text-slate-400 text-[11px] leading-relaxed font-medium">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/chat" className="inline-block px-8 py-3 rounded-xl bg-emerald-500 text-black font-black text-sm tracking-wider hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            LAUNCH CHAT TERMINAL →
          </Link>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative z-10 py-16 px-4 md:px-6 text-center">
        <div className="max-w-sm mx-auto">
          <div className="text-[9px] font-mono font-bold tracking-[0.3em] text-emerald-400 mb-2 uppercase">Frictionless Costs</div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-8">Zero Subscriptions.<br />Per-Query Only.</h2>
          <div className="bg-gradient-to-b from-[#03130c] to-[#010604]/95 border-2 border-emerald-500/15 p-7 rounded-[24px] shadow-2xl relative">
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
            <div className="text-5xl font-black text-white font-mono tracking-tighter">$0.001</div>
            <div className="text-[8px] text-emerald-400 font-bold tracking-[0.2em] font-mono mt-2 uppercase">USDC per AI Engine call</div>
            <div className="h-px bg-emerald-500/10 my-5" />
            <ul className="text-left space-y-3 text-xs text-slate-300 font-medium">
              {["No monthly platform locking", "Direct wallet-to-contract gas speed", "Full access to all ecosystem modules", "100% on-chain audit log"].map(item => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold flex-shrink-0">✓</span> {item}
                </li>
              ))}
            </ul>
            <Link href="/chat" className="block w-full text-center bg-gradient-to-r from-emerald-400 to-emerald-500 text-black font-black py-3 rounded-xl hover:opacity-90 transition mt-6 text-xs tracking-widest">
              LAUNCH CHAT TERMINAL →
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-emerald-500/10 bg-[#010402] px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 font-medium">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-center font-bold text-xs text-emerald-400 flex-shrink-0">M</div>
            <div className="text-center sm:text-left">MICROAI · THE ARC & CIRCLE INTELLIGENCE HUB</div>
          </div>
          <div className="flex gap-5 font-bold tracking-wider font-mono">
            <a href="https://arc.io" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">ARC</a>
            <a href="https://circle.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">CIRCLE</a>
            <a href="https://github.com/sahmedonchain/microai" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">GITHUB</a>
            <a href="https://testnet.arcscan.app" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">EXPLORER</a>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        html { scroll-behavior: smooth; }
        body { background-color: #010503; }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}