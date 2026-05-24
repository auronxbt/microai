"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen text-white" style={{background: "linear-gradient(135deg, #0a0a0f 0%, #0f0a1a 50%, #0a0a0f 100%)"}}>
      <nav className="flex justify-between items-center px-8 py-4 border-b border-purple-900/30 sticky top-0 z-10 backdrop-blur-sm" style={{background: "rgba(10,10,15,0.8)"}}>
        <div className="flex items-center gap-3">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><defs><linearGradient id="lg1" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#a855f7"/><stop offset="100%" stopColor="#3b82f6"/></linearGradient></defs><rect width="36" height="36" rx="10" fill="url(#lg1)"/><text x="18" y="24" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white" fontFamily="serif">μ</text></svg>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">MicroAI</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</a>
          <a href="#how" className="text-sm text-gray-400 hover:text-white transition-colors">How it works</a>
          <Link href="/chat" className="bg-purple-600 hover:bg-purple-500 px-5 py-2 rounded-xl text-sm font-medium transition-all">
            Launch App →
          </Link>
        </div>
      </nav>

      <section className="flex flex-col items-center justify-center text-center px-4 py-32">
        <div className="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-700/30 text-purple-300 text-sm px-4 py-1.5 rounded-full mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          Live on Arc Testnet • USDC Payments
        </div>
        <h1 className="text-6xl font-bold mb-6 leading-tight">
          Pay per question.<br />
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">No subscription.</span>
        </h1>
        <p className="text-gray-400 text-xl mb-10 max-w-xl leading-relaxed">
          The first AI that charges <span className="text-white font-semibold">$0.001 USDC</span> per response — settled instantly on Arc blockchain.
        </p>
        <div className="flex gap-4">
          <Link href="/chat" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 px-8 py-4 rounded-xl font-medium text-lg transition-all shadow-2xl shadow-purple-900/40">
            Start Asking →
          </Link>
          <a href="#pricing" className="border border-gray-700 hover:border-gray-500 px-8 py-4 rounded-xl font-medium text-lg transition-all text-gray-300 hover:text-white">
            View Pricing
          </a>
        </div>
        <div className="flex gap-12 mt-16 pt-12 border-t border-gray-800/50">
          <div className="text-center"><div className="text-3xl font-bold text-white">$0.001</div><div className="text-sm text-gray-500 mt-1">Per response</div></div>
          <div className="text-center"><div className="text-3xl font-bold text-white">&lt;3s</div><div className="text-sm text-gray-500 mt-1">Response time</div></div>
          <div className="text-center"><div className="text-3xl font-bold text-white">100%</div><div className="text-sm text-gray-500 mt-1">On-chain</div></div>
        </div>
      </section>

      <section id="features" className="px-8 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Why MicroAI?</h2>
        <p className="text-gray-500 text-center mb-16">Built for people who hate subscriptions</p>
        <div className="grid grid-cols-3 gap-6">
          {[
            {icon:"⚡",title:"Instant Settlement",desc:"Every payment settles on Arc Testnet in seconds. No waiting, no delays."},
            {icon:"🔒",title:"No Hidden Fees",desc:"You see exactly what you pay. $0.001 USDC per question. Nothing more."},
            {icon:"🌐",title:"Any Web3 Wallet",desc:"Connect any ERC-20 wallet. No account creation, no email required."},
            {icon:"🤖",title:"Powered by AI",desc:"Advanced AI model answers your questions intelligently and accurately."},
            {icon:"📊",title:"On-Chain Proof",desc:"Every transaction verifiable on Arc blockchain explorer in real time."},
            {icon:"💎",title:"USDC Native",desc:"Built on Arc — the only blockchain where USDC is the native gas token."},
          ].map((f,i) => (
            <div key={i} className="bg-gray-900/50 border border-gray-800/50 hover:border-purple-700/30 p-6 rounded-2xl transition-all">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="px-8 py-20" style={{background:"rgba(139,92,246,0.03)"}}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">How it works</h2>
          <p className="text-gray-500 text-center mb-16">Simple, transparent, on-chain</p>
          <div className="space-y-6">
            {[
              {step:"01",title:"Connect your wallet",desc:"Connect any ERC-20 compatible wallet on Arc Testnet. No account needed."},
              {step:"02",title:"Ask your question",desc:"Type any question in the chat. Press Enter or click Send."},
              {step:"03",title:"Approve $0.001 USDC",desc:"Your wallet asks to approve a tiny $0.001 USDC payment on Arc Testnet."},
              {step:"04",title:"Get your answer",desc:"AI responds instantly. Transaction hash saved on Arc blockchain forever."},
            ].map((s,i) => (
              <div key={i} className="flex gap-6 items-start bg-gray-900/40 border border-gray-800/40 p-6 rounded-2xl">
                <span className="text-4xl font-bold bg-gradient-to-br from-purple-600 to-blue-600 bg-clip-text text-transparent flex-shrink-0">{s.step}</span>
                <div><h3 className="font-semibold text-white mb-1">{s.title}</h3><p className="text-gray-400 text-sm">{s.desc}</p></div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/chat" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 px-8 py-4 rounded-xl font-medium text-lg transition-all">
              Try it now →
            </Link>
          </div>
        </div>
      </section>

      <section id="pricing" className="px-8 py-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Simple Pricing</h2>
        <p className="text-gray-500 text-center mb-16">No plans. No tiers. Just pay per use.</p>
        <div className="flex justify-center">
          <div className="bg-gray-900/60 border border-purple-700/30 p-10 rounded-3xl text-center max-w-sm w-full">
            <div className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">$0.001</div>
            <div className="text-gray-400 mb-8">per AI response • paid in USDC</div>
            <div className="space-y-3 text-left mb-10">
              {["✓ No monthly fees","✓ No account required","✓ Instant settlement on Arc","✓ On-chain transaction proof","✓ Any ERC-20 wallet"].map((f,i) => (
                <div key={i} className="text-sm text-gray-300">{f}</div>
              ))}
            </div>
            <Link href="/chat" className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 py-4 rounded-xl font-medium transition-all text-center">
              Start for free →
            </Link>
          </div>
        </div>
      </section>

      <section className="px-8 py-20 text-center border-t border-gray-800/50">
        <h2 className="text-4xl font-bold mb-4">Ready to try it?</h2>
        <p className="text-gray-400 mb-10">Connect your wallet and ask your first question for just $0.001 USDC</p>
        <Link href="/chat" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 px-10 py-4 rounded-xl font-medium text-lg transition-all">
          Launch MicroAI →
        </Link>
      </section>

      <footer className="border-t border-gray-800/50 px-8 py-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="text-sm text-gray-500">MicroAI — Built on Arc Testnet</span>
          <div className="flex gap-6">
            <a href="https://github.com/sahmedonchain/microai" target="_blank" className="text-sm text-gray-500 hover:text-white transition-colors">GitHub</a>
            <a href="https://testnet.arcscan.app" target="_blank" className="text-sm text-gray-500 hover:text-white transition-colors">Arc Explorer</a>
            <Link href="/chat" className="text-sm text-gray-500 hover:text-white transition-colors">Launch App</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
