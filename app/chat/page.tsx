"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ARC_CHAIN_ID = "0x4cef52";
const USDC_CONTRACT = "0x3600000000000000000000000000000000000000";
const RECEIVER = "0x9a318CD2BC533B5B2e96F7f5b499738732492b15";
const EXPLORER = "https://testnet.arcscan.app/tx/";

interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}
declare global {
  interface Window { ethereum?: EthereumProvider; }
}
interface Message {
  role: "user" | "assistant";
  text: string;
  txHash?: string;
}

const SUGGESTIONS = [
  { title: "What is Arc Blockchain?", desc: "Layer 1 stablecoin commerce chain" },
  { title: "How does Circle USDC work?", desc: "Cross-chain transfers & APIs" },
  { title: "Deploy on Arc Testnet", desc: "Step-by-step contract deployment" },
  { title: "ERC-8004 AI Agents", desc: "Register your AI agent on Arc" },
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState<string | null>(null);
  const [txStep, setTxStep] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2, size: Math.random() * 1.5 + 0.5, opacity: Math.random() * 0.2 + 0.05 });
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
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  const getBalance = async (address: string) => {
    try {
      const data = "0x70a08231" + address.slice(2).padStart(64, "0");
      const result = await window.ethereum!.request({ method: "eth_call", params: [{ to: USDC_CONTRACT, data }, "latest"] }) as string;
      setBalance((parseInt(result, 16) / 1e6).toFixed(3));
    } catch { /* silent */ }
  };

  const connectWallet = async () => {
    if (!window.ethereum) { alert("Please install MetaMask!"); return; }
    try {
      try {
        await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: ARC_CHAIN_ID }] });
      } catch (switchErr: unknown) {
        if ((switchErr as { code?: number }).code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{ chainId: ARC_CHAIN_ID, chainName: "Arc Testnet", nativeCurrency: { name: "USDC", symbol: "USDC", decimals: 6 }, rpcUrls: ["https://rpc.testnet.arc.network"], blockExplorerUrls: ["https://testnet.arcscan.app"] }],
          });
        }
      }
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" }) as string[];
      setWallet(accounts[0]);
      await getBalance(accounts[0]);
    } catch (err) { console.error(err); }
  };

  const disconnect = () => { setWallet(null); setBalance(null); setMessages([]); setTxStep(""); };

  const sendMessage = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || loading || !wallet) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: msg }]);
    setLoading(true);
    setTxStep("Awaiting wallet approval...");
    let txHash = "";
    try {
      const chainId = await window.ethereum!.request({ method: "eth_chainId" }) as string;
      if (chainId !== ARC_CHAIN_ID) await window.ethereum!.request({ method: "wallet_switchEthereumChain", params: [{ chainId: ARC_CHAIN_ID }] });
      const amount = (1000).toString(16).padStart(64, "0");
      const txData = "0xa9059cbb" + RECEIVER.slice(2).padStart(64, "0") + amount;
      txHash = await window.ethereum!.request({ method: "eth_sendTransaction", params: [{ from: wallet, to: USDC_CONTRACT, data: txData, gas: "0x186A0" }] }) as string;
      setTxStep("Transaction confirmed. Generating response...");
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({message: msg,history: messages.map(m => ({ role: m.role, content: m.text })) }) });
      const aiData = await res.json();
      setMessages(prev => [...prev, { role: "assistant", text: aiData.reply || "Could not generate a response.", txHash }]);
      await getBalance(wallet);
    } catch (err: unknown) {
      const error = err as { code?: number };
      if (error?.code === 4001) {
        setMessages(prev => [...prev, { role: "assistant", text: "Transaction cancelled." }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", text: "Transaction failed. Make sure you have USDC on Arc Testnet." }]);
      }
    } finally {
      setLoading(false);
      setTxStep("");
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex flex-col bg-[#010503] text-[#e2e8f0] overflow-hidden" style={{ height: '100dvh', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Background */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-40" />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[40%] rounded-full bg-emerald-500/[0.04] blur-[140px]" />
        <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none transition-all duration-300"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.06), transparent 70%)', left: mousePos.x - 250, top: mousePos.y - 250 }} />
        <div className="absolute inset-0 opacity-[0.012]" style={{ backgroundImage: "linear-gradient(rgba(16,185,129,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.2) 1px, transparent 1px)", backgroundSize: "55px 55px" }} />
      </div>

      {/* Navbar */}
      <nav className="relative z-20 flex-shrink-0 flex items-center justify-between px-3 py-2.5 bg-[#020d06]/90 backdrop-blur-xl border-b border-emerald-500/10">
  <Link href="/" className="flex items-center gap-2 flex-shrink-0 min-w-0">
    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center font-black text-xs text-black flex-shrink-0">M</div>
    <div className="min-w-0">
      <div className="text-xs font-bold tracking-wider text-white leading-none">MICRO<span className="text-emerald-400">AI</span></div>
      <div style={{ fontSize: 6, color: 'rgba(52,211,153,0.4)', letterSpacing: '0.12em', fontFamily: 'monospace' }}>KNOWLEDGE HUB</div>
    </div>
  </Link>

  <div className="flex items-center gap-2 flex-shrink-0">
    {/* Testnet badge only */}
    <select
  onChange={e => { if (e.target.value === 'mainnet') { alert('Mainnet coming soon!'); e.target.value = 'testnet'; } }}
  style={{ padding: '4px 8px', borderRadius: 8, border: '1px solid rgba(52,211,153,0.2)', background: '#010805', color: '#34d399', fontSize: 9, fontWeight: 700, fontFamily: 'monospace', outline: 'none', cursor: 'pointer' }}>
  <option value="testnet" style={{ background: '#010805' }}>TESTNET</option>
  <option value="mainnet" style={{ background: '#010805' }}>MAINNET</option>
</select>

    {/* Balance - sm+ only */}
    {wallet && balance !== null && (
      <div className="hidden sm:block text-[9px] font-mono text-emerald-400 font-bold">
        {balance} USDC
      </div>
    )}

    {/* Wallet / Connect */}
    {wallet ? (
      <div className="flex items-center gap-1 px-2 py-1 rounded-lg border border-emerald-500/15 bg-[#020d06]/60">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
        <span className="text-[9px] font-mono text-emerald-300">{wallet.slice(0, 5)}...{wallet.slice(-3)}</span>
        <button onClick={disconnect} className="text-slate-600 hover:text-red-400 text-xs font-bold ml-1">×</button>
      </div>
    ) : (
      <button onClick={connectWallet} className="px-3 py-1.5 text-[10px] font-black rounded-lg bg-emerald-500 text-black hover:bg-emerald-400 transition-all whitespace-nowrap">
        CONNECT
      </button>
    )}
  </div>
</nav>

      {/* Messages */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto py-8 space-y-1">

          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              {/* Logo mark */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center font-black text-xl text-black shadow-[0_0_30px_rgba(16,185,129,0.3)] mb-6">M</div>

              <h2 className="text-xl md:text-2xl font-black text-white tracking-wide mb-2">The ultimate hub for Arc and Circle</h2>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-1">Ask Arc & Circle. 0.001 USDC per query</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                {SUGGESTIONS.map((s, i) => (
                  <button key={i} onClick={() => wallet && sendMessage(s.title)} disabled={!wallet}
                    className="p-4 rounded-xl border border-emerald-500/10 bg-[#03110a]/20 hover:border-emerald-500/25 hover:bg-[#03110a]/40 transition-all text-left group disabled:opacity-40 disabled:cursor-not-allowed">
                    <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors mb-1">{s.title}</div>
                    <div className="text-[10px] text-slate-500 font-medium">{s.desc}</div>
                  </button>
                ))}
              </div>

              {!wallet && (
                <button onClick={connectWallet} className="mt-6 px-6 py-2 rounded-xl border border-emerald-400/20 bg-emerald-500/5 text-emerald-400 font-bold text-xs tracking-widest hover:bg-emerald-500/10 transition-all">
                  CONNECT WALLET TO START
                </button>
              )}
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 items-start py-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center font-black text-xs text-black flex-shrink-0 mt-0.5 shadow-[0_0_10px_rgba(16,185,129,0.3)]">M</div>
              )}
              <div className={`max-w-[85%] md:max-w-2xl ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                {msg.role === "assistant" && (
                  <div className="flex items-center gap-2 px-1">
                    <span className="text-[9px] font-mono font-bold text-emerald-500/80 tracking-widest">MICRO_AI</span>
                    {msg.txHash && (
                      <a href={EXPLORER + msg.txHash} target="_blank" rel="noopener noreferrer"
                        className="text-[9px] font-mono text-slate-600 hover:text-emerald-400 transition-colors tracking-wider">
                        · TX PROOF ↗
                      </a>
                    )}
                  </div>
                )}
                {msg.role === "user" ? (
                  <div className="px-4 py-2.5 rounded-xl rounded-tr-sm bg-emerald-500/10 border border-emerald-400/20 text-emerald-200 text-sm leading-relaxed">
                    {msg.text}
                  </div>
                ) : (
                  <div className="text-sm leading-relaxed text-slate-300
                    [&_strong]:text-emerald-400 [&_strong]:font-bold
                    [&_p]:my-1.5 [&_p]:leading-relaxed
                    [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_ul]:space-y-1
                    [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2 [&_ol]:space-y-1
                    [&_li]:text-slate-400
                    [&_h1]:text-white [&_h1]:font-bold [&_h1]:text-base [&_h1]:mt-3 [&_h1]:mb-1 [&_h1]:tracking-wide
                    [&_h2]:text-white [&_h2]:font-bold [&_h2]:text-sm [&_h2]:mt-3 [&_h2]:mb-1
                    [&_h3]:text-emerald-300 [&_h3]:font-bold [&_h3]:text-sm [&_h3]:mt-2
                    [&_code]:bg-[#03110a] [&_code]:border [&_code]:border-emerald-900/50 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:text-emerald-300 [&_code]:font-mono
                    [&_pre]:bg-[#020a05] [&_pre]:border [&_pre]:border-emerald-900/40 [&_pre]:rounded-xl [&_pre]:p-4 [&_pre]:my-3 [&_pre]:overflow-x-auto
                    [&_blockquote]:border-l-2 [&_blockquote]:border-emerald-500/40 [&_blockquote]:pl-3 [&_blockquote]:text-slate-400 [&_blockquote]:italic [&_blockquote]:my-2
                    [&_a]:text-emerald-400 [&_a]:underline">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 items-start py-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center font-black text-xs text-black flex-shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.3)]">M</div>
              <div className="pt-1.5">
                <div className="flex gap-1 mb-1.5">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
                {txStep && <div className="text-[10px] font-mono text-amber-400/80 tracking-wider">{txStep}</div>}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="relative z-20 flex-shrink-0 px-4 md:px-6 pb-4 pt-3 bg-[#010503]/95 border-t border-emerald-500/10 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-2 bg-[#03130b]/60 border border-emerald-500/15 rounded-2xl px-4 py-3 focus-within:border-emerald-400/30 transition-all shadow-[0_0_20px_rgba(0,0,0,0.3)]">
            <textarea ref={inputRef} value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder={wallet ? "Type your ecosystem query here..." : "Please connect your wallet above..."}
              disabled={!wallet || loading} rows={1}
              className="flex-1 bg-transparent border-none outline-none resize-none text-sm text-white placeholder-slate-600 font-medium leading-relaxed"
              style={{ maxHeight: 120, fontFamily: 'inherit' }}
              onInput={e => { const t = e.target as HTMLTextAreaElement; t.style.height = 'auto'; t.style.height = Math.min(t.scrollHeight, 120) + 'px'; }}
            />
            <button onClick={() => sendMessage()} disabled={!wallet || loading || !input.trim()}
              className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all disabled:opacity-30"
              style={{ background: (!wallet || loading || !input.trim()) ? 'rgba(16,185,129,0.1)' : 'linear-gradient(135deg, #10b981, #059669)', boxShadow: (!wallet || loading || !input.trim()) ? 'none' : '0 0 12px rgba(16,185,129,0.3)' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          <div className="text-center text-[9px] font-mono text-slate-600 mt-2 tracking-widest">
            {txStep ? <span className="text-amber-400/80 animate-pulse">{txStep}</span> : "REAL BLOCKCHAIN LAYER · 0.001 USDC PER QUERY · ENTER TO SEND"}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
      `}</style>
    </div>
  );
}