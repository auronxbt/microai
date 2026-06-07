"use client";
import React from 'react';
import Link from 'next/link';
import Stats from "./components/Stats";
import { 
  Wallet, 
  MessageSquare, 
  Zap, 
  ShieldCheck, 
  Layers, 
  FileText, 
  HelpCircle, 
  ArrowRight,
  Database,
  Cpu
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030014] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-purple-900/30 bg-[#030014]/70 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-purple-600 to-blue-500 p-2 rounded-xl">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              MicroAI
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#stats" className="hover:text-white transition-colors">Stats</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how" className="hover:text-white transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <Link href="/chat" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 px-5 py-2.5 rounded-xl text-sm font-medium shadow-lg shadow-purple-500/20 transition-all transform hover:-translate-y-0.5">
            Launch App →
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs text-purple-300 font-medium">
            <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            Live on Arc Testnet • USDC Payments
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Pay per question. <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              No subscription.
            </span>
          </h1>
          <p className="text-3xl font-bold text-gray-400">
            $0.001 <span className="text-lg font-normal text-gray-500">per response.</span>
          </p>
          <p className="text-gray-400 max-w-xl leading-relaxed">
            The first AI that charges <span className="text-white font-semibold">$0.001 USDC</span> per response — settled instantly on Arc blockchain. Deterministic, tamper-proof and 100% decentralized.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/chat" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 px-6 py-3.5 rounded-xl font-medium flex items-center gap-2 transition-all shadow-2xl shadow-purple-900/40">
              Start Asking <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#pricing" className="border border-white/10 hover:bg-white/5 px-6 py-3.5 rounded-xl font-medium transition-all text-gray-300 hover:text-white text-center">
              View Pricing
            </a>
          </div>
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-6 pt-12 border-t border-white/5">
            <div>
              <div className="text-2xl font-bold text-white">$0.001</div>
              <div className="text-xs text-gray-500 mt-1">Per response</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">&lt;3s</div>
              <div className="text-xs text-gray-500 mt-1">Response time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-xs text-gray-500 mt-1">On-chain</div>
            </div>
          </div>
        </div>

        {/* Right UI Preview (Mockup Chat) */}
        <div className="relative rounded-2xl border border-white/10 bg-[#0b081f] p-6 shadow-2xl shadow-indigo-500/5">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent blur-2xl rounded-2xl" />
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full">Micro AI Assistant</div>
          </div>
          <div className="space-y-4 text-sm relative z-10">
            <div className="flex justify-end">
              <div className="bg-purple-600/20 border border-purple-500/30 text-purple-200 p-3 rounded-2xl rounded-tr-none max-w-[80%]">
                Explain the latest transaction model on Arc blockchain.
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 text-gray-300 p-3 rounded-2xl rounded-tl-none max-w-[80%] space-y-2">
                <p>Every inference query triggers a smart contract transaction, guaranteeing cryptographic proof with native USDC settlement.</p>
                <div className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded md:inline-block">
                  Proof Status: Verified ✓
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5 flex gap-2">
            <input type="text" placeholder="Connect wallet inside app to chat..." disabled className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs w-full text-gray-400 cursor-not-allowed" />
            <button disabled className="bg-purple-600/50 p-2.5 rounded-xl cursor-not-allowed"><MessageSquare className="w-4 h-4 text-gray-300" /></button>
          </div>
        </div>
      </section>

      <hr className="border-white/5 max-w-7xl mx-auto" />

      {/* Live Stats Section */}
      <section id="stats" className="py-20 px-6 max-w-7xl mx-auto text-center space-y-8 scroll-mt-24">
        <div className="space-y-2">
          <div className="text-xs font-semibold tracking-widest text-purple-400 uppercase">Live Metrics</div>
          <h2 className="text-3xl md:text-4xl font-bold">Real Usage. Real Transactions.</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">Every action is cataloged live on the block explorer for complete transparency.</p>
        </div>
        
        {/* আপনার ফোল্ডারের <Stats /> কম্পোনেন্টটি এখানে পারফেক্টলি রেন্ডার হবে */}
        <div className="max-w-5xl mx-auto">
          <Stats />
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto space-y-12 scroll-mt-24">
        <div className="text-center space-y-2">
          <div className="text-xs font-semibold tracking-widest text-purple-400 uppercase">Core Infrastructure</div>
          <h2 className="text-3xl md:text-4xl font-bold">Why MicroAI?</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">Built for people who hate subscriptions.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-[#07051a] border border-white/5 rounded-2xl p-6 space-y-4 hover:border-purple-500/20 transition-colors">
            <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20">
              <Zap className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="font-semibold text-lg">Instant Settlement</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Every payment settles on Arc Testnet in seconds.</p>
          </div>

          <div className="bg-[#07051a] border border-white/5 rounded-2xl p-6 space-y-4 hover:border-purple-500/20 transition-colors">
            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="font-semibold text-lg">No Hidden Fees</h3>
            <p className="text-gray-400 text-sm leading-relaxed">$0.001 USDC per question. Nothing more, nothing less.</p>
          </div>

          <div className="bg-[#07051a] border border-white/5 rounded-2xl p-6 space-y-4 hover:border-purple-500/20 transition-colors">
            <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20">
              <Database className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="font-semibold text-lg">Any Web3 Wallet</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Connect any ERC-20 wallet. No account or registration needed.</p>
          </div>

          <div className="bg-[#07051a] border border-white/5 rounded-2xl p-6 space-y-4 hover:border-purple-500/20 transition-colors">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
              <Layers className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="font-semibold text-lg">Powered by AI</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Advanced AI models answer your questions accurately and deterministically.</p>
          </div>

          <div className="bg-[#07051a] border border-white/5 rounded-2xl p-6 space-y-4 hover:border-purple-500/20 transition-colors">
            <div className="w-10 h-10 bg-pink-500/10 rounded-xl flex items-center justify-center border border-pink-500/20">
              <FileText className="w-5 h-5 text-pink-400" />
            </div>
            <h3 className="font-semibold text-lg">On-Chain Proof</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Every transaction is fully verifiable on the Arc block explorer.</p>
          </div>

          <div className="bg-[#07051a] border border-white/5 rounded-2xl p-6 space-y-4 hover:border-purple-500/20 transition-colors">
            <div className="w-10 h-10 bg-yellow-500/10 rounded-xl flex items-center justify-center border border-yellow-500/20">
              <HelpCircle className="w-5 h-5 text-yellow-400" />
            </div>
            <h3 className="font-semibold text-lg">USDC Native</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Arc — the only advanced blockchain with USDC as native gas infrastructure.</p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section id="how" className="py-20 px-6 max-w-7xl mx-auto space-y-16 scroll-mt-24">
        <div className="text-center space-y-2">
          <div className="text-xs font-semibold tracking-widest text-purple-400 uppercase">Workflow</div>
          <h2 className="text-3xl md:text-4xl font-bold">Four steps. One conversation.</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">Simple, transparent, on-chain</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto relative">
          <div className="space-y-3 relative">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold">01</div>
            <h4 className="font-medium text-base">Connect your wallet</h4>
            <p className="text-gray-400 text-xs leading-relaxed">Connect any ERC-20 compatible wallet on Arc Testnet.</p>
          </div>
          <div className="space-y-3">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold">02</div>
            <h4 className="font-medium text-base">Ask your question</h4>
            <p className="text-gray-400 text-xs leading-relaxed">Type any question in the chat. Press Enter or click Send.</p>
          </div>
          <div className="space-y-3">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold">03</div>
            <h4 className="font-medium text-base">Approve $0.001 USDC</h4>
            <p className="text-gray-400 text-xs leading-relaxed">Your wallet asks to approve a tiny USDC payment on Arc securely.</p>
          </div>
          <div className="space-y-3">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold">04</div>
            <h4 className="font-medium text-base">Get your answer</h4>
            <p className="text-gray-400 text-xs leading-relaxed">AI responds instantly. TX hash saved securely on Arc blockchain.</p>
          </div>
        </div>
        <div className="text-center pt-4">
          <Link href="/chat" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 px-8 py-4 rounded-xl font-medium text-lg transition-all">
            Try it now →
          </Link>
        </div>
      </section>

      {/* Pricing Tier Card */}
      <section id="pricing" className="py-20 px-6 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent text-center space-y-8 scroll-mt-24">
        <div className="space-y-2">
          <div className="text-xs font-semibold tracking-widest text-purple-400 uppercase">Pricing</div>
          <h2 className="text-3xl md:text-4xl font-bold">Simple Pricing <br />No plans. No tiers. Just pay per use.</h2>
        </div>

        <div className="max-w-sm mx-auto bg-gradient-to-b from-[#0c0926] to-[#050314] border border-purple-500/20 rounded-3xl p-8 space-y-6 shadow-xl shadow-purple-500/5">
          <div className="space-y-1">
            <div className="text-5xl font-extrabold text-white">$0.001</div>
            <div className="text-xs text-purple-400 font-medium tracking-wider">per AI response • paid in USDC</div>
          </div>
          <hr className="border-white/5" />
          <ul className="text-left space-y-3 text-sm text-gray-300">
            <li className="flex items-center gap-2.5">✓ <span className="text-gray-400">✓ No monthly fees</span></li>
            <li className="flex items-center gap-2.5">✓ <span className="text-gray-400">✓ No account required</span></li>
            <li className="flex items-center gap-2.5">✓ <span className="text-gray-400">✓ Instant settlement on Arc</span></li>
            <li className="flex items-center gap-2.5">✓ <span className="text-gray-400">✓ On-chain transaction proof</span></li>
            <li className="flex items-center gap-2.5">✓ <span className="text-gray-400">✓ Any ERC-20 wallet</span></li>
          </ul>
          <Link href="/chat" className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 py-4 rounded-xl font-medium transition-all text-center">
            Start for free →
          </Link>
        </div>
      </section>

      {/* Ready to Try Section */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Ready to try it?</h2>
        <p className="text-gray-400 text-sm max-w-md mx-auto">Connect your wallet and ask your first question for just $0.001 USDC</p>
        <Link href="/chat" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 px-8 md:px-10 py-4 rounded-xl font-medium text-lg transition-all">
          Launch MicroAI →
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#02010a] px-6 py-12 text-sm text-gray-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-sm text-gray-500">MicroAI — Built on Arc Testnet</span>
          <div className="flex gap-6">
            <a href="https://github.com/sahmedonchain/microai" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-white transition-colors">GitHub</a>
            <a href="https://testnet.arcscan.app" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-white transition-colors">Arc Explorer</a>
            <Link href="/chat" className="text-sm text-gray-500 hover:text-white transition-colors">Launch App</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}