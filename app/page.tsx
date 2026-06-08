"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Stats from "./components/Stats";

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div className="min-h-screen bg-[#020010] text-white font-sans overflow-x-hidden">

      {/* Animated background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0d0030_0%,_#020010_60%)]" />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-10 blur-[120px] transition-transform duration-700 ease-out"
          style={{
            background: 'radial-gradient(circle, #7c3aed, #3b82f6)',
            left: mousePos.x - 300,
            top: mousePos.y - 300,
          }}
        />
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-purple-500/10 bg-[#020010]/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-blue-500 rounded-xl blur-sm opacity-70" />
              <div className="relative bg-gradient-to-tr from-violet-600 to-blue-500 rounded-xl w-9 h-9 flex items-center justify-center font-black text-sm">M</div>
            </div>
            <span className="text-lg font-bold tracking-tight">
              <span className="text-white">Micro</span>
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">AI</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#ecosystem" className="hover:text-violet-300 transition-colors">Ecosystem</a>
            <a href="#features" className="hover:text-violet-300 transition-colors">Features</a>
            <a href="#how" className="hover:text-violet-300 transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-violet-300 transition-colors">Pricing</a>
          </div>
          <Link href="/chat" className="relative group px-5 py-2.5 rounded-xl text-sm font-semibold overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 transition-opacity group-hover:opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 blur-sm opacity-50 group-hover:opacity-70 transition-opacity" />
            <span className="relative">Launch App →</span>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative z-10 pt-36 pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs text-violet-300 font-medium">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Live on Arc Testnet • Powered by USDC
            </div>

            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9]">
                <span className="text-white">The</span>{" "}
                <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">Arc & Circle</span>
              </h1>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9] text-white">
                AI Hub
              </h1>
            </div>

            <p className="text-gray-400 max-w-lg leading-relaxed text-lg">
              Ask anything about <span className="text-violet-300 font-semibold">Arc Blockchain</span> and <span className="text-blue-300 font-semibold">Circle</span>. Build, learn, solve — powered by AI. Pay <span className="text-white font-bold">$0.001 USDC</span> per question. No subscription.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/chat" className="relative group px-7 py-4 rounded-xl font-semibold text-base overflow-hidden flex items-center gap-2">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                <span className="relative">Ask MicroAI</span>
                <span className="relative">→</span>
              </Link>
              <a href="#ecosystem" className="px-7 py-4 rounded-xl font-semibold text-base border border-white/10 hover:border-violet-500/40 hover:bg-violet-500/5 transition-all text-gray-300 hover:text-white">
                Explore Hub
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5">
              {[
                { val: "$0.001", label: "Per question" },
                { val: "<3s", label: "Response time" },
                { val: "100%", label: "On-chain" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-black bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">{s.val}</div>
                  <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Preview */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/20 to-blue-600/20 rounded-3xl blur-2xl" />
            <div className="relative rounded-3xl border border-white/10 bg-[#060318]/90 backdrop-blur-xl overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-xs text-gray-500 font-mono">microai — arc+circle hub</div>
                <div className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                  LIVE
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex justify-end">
                  <div className="bg-violet-600/20 border border-violet-500/30 text-violet-200 px-4 py-3 rounded-2xl rounded-tr-sm text-sm max-w-[85%]">
                    What is Arc Blockchain and how does USDC work on it?
                  </div>
                </div>
                <div className="flex justify-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-violet-600 to-blue-500 flex items-center justify-center text-xs font-bold flex-shrink-0">M</div>
                  <div className="bg-white/5 border border-white/10 text-gray-300 px-4 py-3 rounded-2xl rounded-tl-sm text-sm max-w-[85%] space-y-2">
                    <p>Arc is a high-performance L1 blockchain optimized for stablecoin commerce. USDC is Arc's native gas token — every tx fee is paid in USDC via Circle's infrastructure.</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded">✓ Verified on-chain</span>
                      <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded">Arc Testnet</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="bg-blue-600/20 border border-blue-500/30 text-blue-200 px-4 py-3 rounded-2xl rounded-tr-sm text-sm max-w-[85%]">
                    How do I deploy a contract using Circle SDK?
                  </div>
                </div>
                <div className="flex justify-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-violet-600 to-blue-500 flex items-center justify-center text-xs font-bold flex-shrink-0">M</div>
                  <div className="bg-white/5 border border-white/10 text-gray-300 px-4 py-3 rounded-2xl rounded-tl-sm text-sm max-w-[85%]">
                    <code className="text-xs text-violet-300 block font-mono bg-black/30 p-2 rounded">npm install @circle-fin/developer-controlled-wallets</code>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5">
                <div className="flex gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <input disabled placeholder="Connect wallet to ask anything about Arc & Circle..." className="flex-1 bg-transparent text-xs text-gray-500 outline-none cursor-not-allowed" />
                  <div className="w-7 h-7 rounded-lg bg-violet-600/50 flex items-center justify-center text-xs">→</div>
                </div>
                <p className="text-center text-[10px] text-gray-600 mt-2">Cost: 0.001 USDC per question • Powered by Arc Network</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section id="ecosystem" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <div className="text-xs font-bold tracking-widest text-violet-400 uppercase">Knowledge Hub</div>
            <h2 className="text-4xl md:text-5xl font-black">Arc & Circle Ecosystem</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Everything you need to know about building on Arc and Circle — ask MicroAI anything.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Arc Card */}
            <div className="relative group rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 to-[#060318] p-8 overflow-hidden hover:border-violet-500/40 transition-all">
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl group-hover:bg-violet-600/20 transition-all" />
              <div className="relative space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-2xl">⬡</div>
                  <div>
                    <h3 className="text-xl font-black text-violet-300">Arc Blockchain</h3>
                    <p className="text-xs text-gray-500">arc.io</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">High-performance Layer 1 built for stablecoin commerce and the Agentic Economy. Native USDC gas, ERC-8004, ERC-8183 standards.</p>
                <div className="grid grid-cols-2 gap-2">
                  {["ERC-8004 AI Agents", "ERC-8183 Job Settlement", "Arc App Kit", "USDC Native Gas", "Arc House Community", "Testnet Explorer"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="text-violet-400">▸</span> {item}
                    </div>
                  ))}
                </div>
                <Link href="/chat" className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 font-medium transition-colors">
                  Ask about Arc →
                </Link>
              </div>
            </div>

            {/* Circle Card */}
            <div className="relative group rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-[#060318] p-8 overflow-hidden hover:border-blue-500/40 transition-all">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all" />
              <div className="relative space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-2xl">◎</div>
                  <div>
                    <h3 className="text-xl font-black text-blue-300">Circle</h3>
                    <p className="text-xs text-gray-500">circle.com</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">The issuer of USDC — the world's leading regulated digital dollar. APIs, wallets, CCTP cross-chain transfers, and developer tools.</p>
                <div className="grid grid-cols-2 gap-2">
                  {["USDC Stablecoin", "CCTP Cross-Chain", "Circle Wallets API", "Developer Console", "Circle Contracts", "Payments & Payouts"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="text-blue-400">▸</span> {item}
                    </div>
                  ))}
                </div>
                <Link href="/chat" className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  Ask about Circle →
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { icon: "⚙️", title: "Developer Tools", desc: "SDKs, APIs, CLIs" },
              { icon: "📜", title: "Smart Contracts", desc: "Deploy & audit" },
              { icon: "🤖", title: "AI Agents", desc: "ERC-8004 standard" },
              { icon: "💱", title: "DeFi & Payments", desc: "Swap, bridge, pay" },
            ].map((card) => (
              <Link href="/chat" key={card.title} className="rounded-2xl border border-white/5 bg-white/2 p-5 hover:border-white/10 hover:bg-white/5 transition-all">
                <div className="text-2xl mb-3">{card.icon}</div>
                <h4 className="font-bold text-sm text-white">{card.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{card.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <section id="stats" className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-2 mb-12">
          <div className="text-xs font-bold tracking-widest text-violet-400 uppercase">Live Metrics</div>
          <h2 className="text-3xl md:text-4xl font-black">Real Usage. Real Transactions.</h2>
        </div>
        <Stats />
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-16">
          <div className="text-xs font-bold tracking-widest text-violet-400 uppercase">Why MicroAI</div>
          <h2 className="text-4xl font-black">Your Arc & Circle Command Center</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: "🧠", title: "Arc & Circle Expert", desc: "Deep knowledge of Arc docs, Circle APIs, USDC mechanics, ERC standards, and the full ecosystem.", border: "border-violet-500/20", grad: "from-violet-500/10 to-violet-500/5" },
            { icon: "⚡", title: "Instant Settlement", desc: "Every $0.001 USDC payment settles on Arc Testnet in seconds. No waiting, no intermediaries.", border: "border-blue-500/20", grad: "from-blue-500/10 to-blue-500/5" },
            { icon: "🔍", title: "Smart Answers", desc: "Code examples, deployment guides, API references, and troubleshooting for Arc and Circle.", border: "border-cyan-500/20", grad: "from-cyan-500/10 to-cyan-500/5" },
            { icon: "🌐", title: "Any Web3 Wallet", desc: "Connect MetaMask or any EVM wallet on Arc Testnet. No account or sign-up required.", border: "border-emerald-500/20", grad: "from-emerald-500/10 to-emerald-500/5" },
            { icon: "📊", title: "On-Chain Proof", desc: "Every transaction is fully verifiable on testnet.arcscan.app. 100% transparent.", border: "border-pink-500/20", grad: "from-pink-500/10 to-pink-500/5" },
            { icon: "🏗️", title: "Builder First", desc: "From your first contract to a full dApp — MicroAI guides you through the Arc ecosystem.", border: "border-yellow-500/20", grad: "from-yellow-500/10 to-yellow-500/5" },
          ].map((f) => (
            <div key={f.title} className={`rounded-2xl border ${f.border} bg-gradient-to-br ${f.grad} p-6 space-y-3 hover:scale-[1.02] transition-transform`}>
              <div className="text-3xl">{f.icon}</div>
              <h3 className="font-bold text-base">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-16">
          <div className="text-xs font-bold tracking-widest text-violet-400 uppercase">Workflow</div>
          <h2 className="text-4xl font-black">Four steps. Instant answers.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { n: "01", title: "Connect Wallet", desc: "Connect any EVM wallet on Arc Testnet." },
            { n: "02", title: "Ask Anything", desc: "Ask about Arc, Circle, USDC, contracts, APIs — anything." },
            { n: "03", title: "Pay $0.001 USDC", desc: "Approve a tiny USDC payment on Arc. Instant, secure." },
            { n: "04", title: "Get Answer", desc: "AI responds instantly. TX proof saved on Arc blockchain." },
          ].map((step) => (
            <div key={step.n} className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-blue-600 flex items-center justify-center text-xs font-black">{step.n}</div>
              <h4 className="font-bold text-base">{step.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/chat" className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90 px-8 py-4 rounded-xl font-bold text-base transition-all">
            Try MicroAI Now →
          </Link>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 py-20 px-6 text-center">
        <div className="max-w-md mx-auto space-y-8">
          <div className="space-y-2">
            <div className="text-xs font-bold tracking-widest text-violet-400 uppercase">Pricing</div>
            <h2 className="text-4xl font-black">Simple. Fair. On-chain.</h2>
            <p className="text-gray-400 text-sm">No plans. No tiers. Just pay per question.</p>
          </div>
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-violet-900/30 to-blue-900/20" />
            <div className="absolute inset-0 border border-violet-500/20 rounded-3xl" />
            <div className="relative p-8 space-y-6">
              <div>
                <div className="text-6xl font-black bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">$0.001</div>
                <div className="text-xs text-gray-400 mt-1 font-medium tracking-wider">USDC per AI response</div>
              </div>
              <hr className="border-white/10" />
              <ul className="text-left space-y-3 text-sm text-gray-300">
                {["No monthly fees", "No account required", "Instant settlement on Arc", "On-chain TX proof", "Any ERC-20 wallet", "Arc & Circle expert AI"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="text-emerald-400 text-base">✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link href="/chat" className="block w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90 py-4 rounded-xl font-bold transition-all">
                Start for free →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24 px-6 text-center">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[200px] bg-violet-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl sm:text-5xl font-black">Your Arc & Circle questions.<br /><span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">Answered instantly.</span></h2>
          <p className="text-gray-400 max-w-md mx-auto">Connect your wallet and ask your first question for just $0.001 USDC</p>
          <Link href="/chat" className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90 px-10 py-5 rounded-xl font-bold text-lg transition-all">
            Launch MicroAI →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-[#020010] px-6 py-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-tr from-violet-600 to-blue-500 rounded-lg flex items-center justify-center text-xs font-black">M</div>
            <span className="text-sm text-gray-500">MicroAI — Arc & Circle Hub</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="https://arc.io" target="_blank" rel="noopener noreferrer" className="hover:text-violet-400 transition-colors">Arc</a>
            <a href="https://circle.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Circle</a>
            <a href="https://github.com/sahmedonchain/microai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://testnet.arcscan.app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Explorer</a>
            <Link href="/chat" className="hover:text-white transition-colors">Launch App</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}