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

  // Cryptix Animated Dynamic Grid Mesh
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 65; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.25 + 0.1,
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
        ctx.fillStyle = `rgba(16, 185, 129, ${p.opacity})`;
        ctx.fill();
      });
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.05 * (1 - dist / 140)})`;
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
      
      {/* Background Interactive Mesh */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-40" />

      {/* Ambient Lighting & Cyber Overlay Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-[60%] rounded-full bg-emerald-500/[0.06] blur-[140px]" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-emerald-600/[0.02] blur-[120px]" />
        
        {/* Mouse Light Aura */}
        <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none transition-all duration-300 mix-blend-screen opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08), transparent 70%)',
            left: mousePos.x - 300,
            top: mousePos.y - 300,
          }} />

        {/* FIXED: Tailwind string background pattern template literal wrapper */}
        <div className="absolute inset-0 opacity-[0.012]" style={{
          backgroundImage: "linear-gradient(rgba(16,185,129,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.2) 1px, transparent 1px)",
          backgroundSize: "55px 55px",
        }} />
      </div>

      {/* NAVIGATION BAR */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-7xl px-6 py-3 bg-[#03120a]/50 backdrop-blur-xl border border-emerald-500/10 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.5)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center font-black text-xs text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            M
          </div>
          <div>
            <div className="text-sm font-bold tracking-wider text-white">
              MICRO<span className="text-emerald-400 font-extrabold">AI</span>
            </div>
            <div className="text-[7px] text-emerald-500/60 tracking-[0.25em] font-mono -mt-0.5">THE KNOWLEDGE HUB</div>
          </div>
        </div>

        <div className="hidden md:flex items-center bg-[#010805]/90 border border-emerald-950/80 rounded-full px-6 py-1.5 gap-8 text-[10px] font-bold tracking-widest text-gray-400">
          <a href="#hub-sectors" className="hover:text-emerald-400 transition-colors">ECOSYSTEM HUB</a>
          <a href="#features" className="hover:text-emerald-400 transition-colors">AI CAPABILITIES</a>
          <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">HOW IT WORKS</a>
          <a href="#pricing" className="hover:text-emerald-400 transition-colors">MICRO-PAYMENTS</a>
        </div>

        <Link href="/chat" className="px-5 py-1.5 text-[11px] font-bold tracking-wider rounded-xl bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 hover:bg-gradient-to-r hover:from-emerald-400 hover:to-emerald-500 hover:text-black transition-all duration-300">
          LAUNCH ENGINE →
        </Link>
      </nav>

      {/* HERO SECTION */}
      <header className="relative z-10 pt-36 pb-16 px-6 max-w-7xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/15 bg-[#03110a]/60 text-[9px] font-bold text-emerald-400 tracking-widest mb-6 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
          UNIVERSAL KNOWLEDGE LAYER FOR ARC & CIRCLE WEBSITES LIVE
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[1.05] max-w-5xl mx-auto text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-400/40">
          The Crypto Hub for All Arc & Circle Intel
        </h1>
        
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mt-6 font-medium leading-relaxed">
          One unified AI engine built to ingest, organize, and solve every single inquiry across Arc Chain mechanics and Circle infrastructure instantly.
        </p>
      </header>

      {/* CORE HUB INTERACTION (CENTRAL HERO WIDGET) */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 mb-24">
        <div className="bg-[#03130b]/20 backdrop-blur-2xl border border-emerald-500/15 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Simulation Interface Information */}
            <div className="md:col-span-5 space-y-4">
              <div className="text-[10px] font-mono font-bold text-emerald-400 tracking-widest uppercase">🧠 AI Training Preset Matrix</div>
              <h3 className="text-xl font-bold text-white tracking-wide">Test the Hub In Realtime</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Our Knowledge Hub is completely optimized for all user brackets. Click on any stakeholder category below to see how the engine handles real ecosystem issues:
              </p>

              {/* Selector Tabs */}
              <div className="space-y-2 pt-2">
                <button 
                  onClick={() => handlePresetQuery("How do I implement ERC-8004 AI Agent specifications on Arc Chain?", "To deploy ERC-8004 on Arc, initialize your contract with the Arc Agent Core SDK, specify your runtime constraints, and ensure gas calculations utilize the native USDC gas settlement architecture.")}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${chatInput.includes("ERC-8004") ? 'bg-emerald-500/10 border-emerald-400/40 text-emerald-400 font-bold' : 'bg-black/20 border-emerald-500/5 text-slate-400 hover:border-emerald-500/20'}`}
                >
                  <span>💻 For Developers & Deployers</span>
                  <span className="text-[9px] font-mono opacity-60">Try Intel</span>
                </button>
                <button 
                  onClick={() => handlePresetQuery("How can we leverage Circle CCTP for cross-chain liquidity marketing?", "Circle CCTP allows your marketing campaigns to target multi-chain native onboarding. Users burn USDC on source chains and mint natively on Arc without third-party wrap risk.")}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${chatInput.includes("CCTP") ? 'bg-emerald-500/10 border-emerald-400/40 text-emerald-400 font-bold' : 'bg-black/20 border-emerald-500/5 text-slate-400 hover:border-emerald-500/20'}`}
                >
                  <span>📈 For Marketers & Teams</span>
                  <span className="text-[9px] font-mono opacity-60">Try Intel</span>
                </button>
                <button 
                  onClick={() => handlePresetQuery("What is the easiest protocol to settle secure USDC trades on Arc?", "Traders use the Native Arc Liquidity Hub. Transactions take advantage of sub-second settlement directly using Circle's native APIs, ensuring 100% security with near-zero slippage.")}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${chatInput.includes("trades") ? 'bg-emerald-500/10 border-emerald-400/40 text-emerald-400 font-bold' : 'bg-black/20 border-emerald-500/5 text-slate-400 hover:border-emerald-500/20'}`}
                >
                  <span>💱 For Buyers, Sellers & Traders</span>
                  <span className="text-[9px] font-mono opacity-60">Try Intel</span>
                </button>
              </div>
            </div>

            {/* Dynamic Simulated Terminal Screen */}
            <div className="md:col-span-7 bg-black/40 border border-emerald-500/10 rounded-2xl overflow-hidden flex flex-col h-72 shadow-inner">
              <div className="bg-[#03100a]/80 px-4 py-2.5 border-b border-emerald-950/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] font-mono text-emerald-500 font-bold tracking-wider">MICRO_HUB_CORE_V1.9</span>
                </div>
                <span className="text-[8px] font-mono text-slate-500">SECURE SHELL</span>
              </div>
              
              <div className="p-4 flex-1 flex flex-col justify-between overflow-y-auto space-y-4 font-mono">
                <div className="space-y-1">
                  <div className="text-[10px] text-slate-500">&gt; USER_QUERY_INPUT:</div>
                  <div className="text-xs text-white font-medium bg-emerald-950/20 p-2 rounded border border-emerald-900/30">
                    {chatInput || "Select a training preset from the left panel or type custom query..."}
                  </div>
                </div>

                <div className="space-y-1 flex-1 pt-2">
                  <div className="text-[10px] text-emerald-500/60">&gt; CORE_MICROAI_RESPONSE:</div>
                  <div className="text-[11px] text-emerald-300 leading-relaxed italic">
                    {chatResponse}
                  </div>
                </div>
              </div>

              <div className="p-2 bg-[#020a05] border-t border-emerald-950/60 flex gap-2">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask MicroAI Hub something..." 
                  className="bg-black/40 border border-emerald-900/50 rounded-lg px-3 py-1.5 text-xs text-white flex-1 focus:outline-none focus:border-emerald-400 font-mono"
                />
                <Link href="/chat" className="px-4 py-1.5 bg-emerald-500 text-black text-xs font-black rounded-lg hover:opacity-90 transition font-mono">
                  EXECUTE
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HUB SECTORS */}
      <section id="hub-sectors" className="relative z-10 py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-[9px] font-mono font-bold tracking-[0.3em] text-emerald-400 mb-2 uppercase">Ecosystem Map</div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">One Hub. Every Stakeholder Role.</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-3">Whether you write smart contracts or bootstrap communities, MicroAI has ingested the exact documentation you need.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Developers & Architects", points: ["ERC-8004 & ERC-8183 templates", "Circle Programmable Wallets APIs", "Arc App Kit integration steps", "Sub-second gas optimization"] },
            { title: "Marketers & Project Teams", points: ["Circle CCTP launch frameworks", "Cross-chain onboarding tactics", "Arc Testnet deployment narrative", "Native USDC distribution flows"] },
            { title: "Buyers, Sellers & Traders", points: ["USDC atomic swap structures", "Arc Liquidity Pool mechanics", "Secure payment tracking steps", "Zero-slippage path routing"] },
            { title: "New Users & Community", points: ["Arc Chain basic setup guides", "Frictionless faucet instructions", "Ecosystem project directory", "Troubleshooting basic wallet errors"] }
          ].map((sector, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#03110a]/20 backdrop-blur-md border border-emerald-500/10 hover:border-emerald-500/20 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/5 border border-emerald-500/15 flex items-center justify-center text-emerald-400 font-bold font-mono text-xs mb-4">
                  0{idx + 1}
                </div>
                <h4 className="font-bold text-sm text-white tracking-wide mb-4 group-hover:text-emerald-400 transition-colors">{sector.title}</h4>
                <ul className="space-y-2.5">
                  {sector.points.map((p, pIdx) => (
                    <li key={pIdx} className="text-xs text-slate-400 flex items-start gap-2 font-medium">
                      <span className="text-emerald-500 mt-0.5">▪</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/chat" className="mt-6 text-[10px] font-mono font-black text-emerald-500 tracking-wider hover:text-emerald-400 flex items-center gap-1">
                ACCESS SUB-DATA MODULE →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* AI TRAINING & CAPABILITIES */}
      <section id="features" className="relative z-10 py-16 bg-[#020b06]/40 border-y border-emerald-500/5 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[9px] font-mono font-bold tracking-[0.3em] text-emerald-400 mb-2 uppercase">Deep Training Layer</div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Engine Capabilities & Solutions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🛡️", title: "Complete Protocol Ingestion", desc: "Every single page of official Arc Chain code bases, Circle developer documentation, and ecosystem manuals are compiled natively into our memory vector map." },
              { icon: "⚡", title: "Instantaneous Error Resolution", desc: "Stuck on a failed transaction hash or code compilation issue? Input the trace logs into MicroAI for custom, context-aware debugging feedback instantly." },
              { icon: "🔮", title: "Cross-Chain Architecture Advice", desc: "Master how Circle's native minting mechanics cooperate perfectly with Arc's rapid network infrastructure to build frictionless web3 payment dApps." }
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#010604] border border-emerald-500/5 hover:border-emerald-500/15 transition-all">
                <div className="text-xl mb-4 p-2.5 w-fit rounded-xl bg-emerald-500/5 border border-emerald-500/10">{f.icon}</div>
                <h3 className="font-bold text-xs text-white tracking-wider mb-2">{f.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-[9px] font-mono font-bold tracking-[0.3em] text-emerald-400 mb-2 uppercase">Frictionless Workflow</div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">Four Steps to Supreme Clarity</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto relative">
          {[
            { step: "01", name: "Connect EVM Wallet", desc: "Link your favorite non-custodial wallet instantly on the safe Arc Testnet channel." },
            { step: "02", name: "State Your Ecosystem Issue", desc: "Ask queries regarding Arc SDK parameters, Circle smart assets, or contract verification." },
            { step: "03", name: "Approve Micro-Settle", desc: "Authorize a fraction of a cent ($0.001) in native testnet USDC directly on-chain." },
            { step: "04", name: "Deploy Prescriptive Solutions", desc: "Receive highly trained responses alongside immutably compiled network transaction hashes." }
          ].map((s, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-[#03110a]/10 border border-emerald-500/5 relative">
              <div className="text-xs font-mono font-black text-emerald-400 mb-3 bg-emerald-500/5 w-8 h-8 rounded-lg flex items-center justify-center border border-emerald-500/10">{s.step}</div>
              <div className="font-bold text-xs text-white tracking-wide mb-1.5">{s.name}</div>
              <p className="text-slate-400 text-[11px] leading-relaxed font-medium">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MICRO-PAYMENTS PRICING MATRIX */}
      <section id="pricing" className="relative z-10 py-16 px-6 text-center max-w-7xl mx-auto">
        <div className="max-w-sm mx-auto">
          <div className="text-[9px] font-mono font-bold tracking-[0.3em] text-emerald-400 mb-2 uppercase">Frictionless Costs</div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-8">Zero Subscriptions. Per-Query Only.</h2>
          
          <div className="bg-gradient-to-b from-[#03130c] to-[#010604]/95 backdrop-blur-2xl border-2 border-emerald-500/15 p-8 rounded-[28px] shadow-2xl relative">
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
            
            <div className="text-5xl font-black text-white font-mono tracking-tighter shadow-sm">$0.001</div>
            <div className="text-[8px] text-emerald-400 font-bold tracking-[0.2em] font-mono mt-2.5 uppercase">USDC per AI Engine call</div>
            
            <div className="h-px bg-emerald-500/10 my-6" />
            
            <ul className="text-left space-y-3.5 text-xs text-slate-300 font-medium">
              <li className="flex items-center gap-2.5"><span className="text-emerald-400 font-bold">✓</span> No monthly platform locking</li>
              <li className="flex items-center gap-2.5"><span className="text-emerald-400 font-bold">✓</span> Direct wallet-to-contract gas speed</li>
              <li className="flex items-center gap-2.5"><span className="text-emerald-400 font-bold">✓</span> Full access to all 4 stakeholder data pipelines</li>
              <li className="flex items-center gap-2.5"><span className="text-emerald-400 font-bold">✓</span> 100% on-chain audit log</li>
            </ul>
            
            <Link href="/chat" className="block w-full text-center bg-gradient-to-r from-emerald-400 to-emerald-500 text-black font-black py-3 rounded-xl shadow-md hover:opacity-95 transition mt-8 text-xs tracking-widest">
              LAUNCH CHAT TERMINAL →
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-emerald-500/10 bg-[#010402] px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 font-medium">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-center font-bold text-xs text-emerald-400">M</div>
            <div>MICROAI NETWORK · CENTRAL INTEL HUB FOR ARC CHAIN & CIRCLE SOLUTIONS</div>
          </div>
          <div className="flex gap-6 font-bold tracking-wider font-mono">
            <a href="https://arc.io" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">ARC.NET</a>
            <a href="https://circle.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">CIRCLE.COM</a>
            <a href="https://testnet.arcscan.app" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">ARCSCAN</a>
          </div>
        </div>
      </footer>

      {/* FIXED GLOBAL FONTS/BACKGROUND */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        html {
          scroll-behavior: smooth;
        }
        body {
          background-color: #010503;
        }
      `}</style>
    </div>
  );
}