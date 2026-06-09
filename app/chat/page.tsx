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

const Logo = ({ size = 32 }: { size?: number }) => (
  <div style={{ width: size, height: size }} className="relative flex-shrink-0">
    <div className="absolute inset-0 rounded-xl" style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', boxShadow: '0 0 12px rgba(124,58,237,0.5)' }} />
    <div className="absolute inset-0 flex items-center justify-center font-black text-white" style={{ fontSize: size * 0.4 }}>M</div>
  </div>
);

const SUGGESTIONS = [
  { title: "What is Arc Blockchain?", desc: "Layer 1 stablecoin commerce chain" },
  { title: "How does Circle USDC work?", desc: "Cross-chain transfers & Circle APIs" },
  { title: "Deploy on Arc Testnet", desc: "Step-by-step contract deployment" },
  { title: "ERC-8004 AI Agents", desc: "Register your AI agent on Arc" },
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState<string | null>(null);
  const [network, setNetwork] = useState("testnet");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
      await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: ARC_CHAIN_ID }] });
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" }) as string[];
      setWallet(accounts[0]);
      await getBalance(accounts[0]);
    } catch (err) { console.error(err); }
  };

  const disconnect = () => { setWallet(null); setBalance(null); setMessages([]); };

  const sendMessage = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || loading || !wallet) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: msg }]);
    setLoading(true);

    try {
      const chainId = await window.ethereum!.request({ method: "eth_chainId" }) as string;
      if (chainId !== ARC_CHAIN_ID) await window.ethereum!.request({ method: "wallet_switchEthereumChain", params: [{ chainId: ARC_CHAIN_ID }] });
      const amount = (1000).toString(16).padStart(64, "0");
      const data = "0xa9059cbb" + RECEIVER.slice(2).padStart(64, "0") + amount;
      const txHash = await window.ethereum!.request({ method: "eth_sendTransaction", params: [{ from: wallet, to: USDC_CONTRACT, data, gas: "0x186A0" }] }) as string;

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });
      const data2 = await res.json();
      setMessages(prev => [...prev, { role: "assistant", text: data2.reply, txHash }]);
      await getBalance(wallet);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Transaction cancelled or failed." }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#03000f] text-white overflow-hidden" style={{ fontFamily: "'Rajdhani', sans-serif" }}>

      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% -20%, #1a0050 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-4 md:px-6 py-3 flex-shrink-0" style={{ borderBottom: '1px solid rgba(139,92,246,0.15)', background: 'rgba(3,0,15,0.9)', backdropFilter: 'blur(20px)' }}>
        <Link href="/" className="flex items-center gap-2.5 group">
          <Logo size={30} />
          <div>
            <div className="text-sm font-black tracking-widest leading-none" style={{ letterSpacing: '0.12em' }}>MICRO<span style={{ color: '#818cf8' }}>AI</span></div>
            <div className="text-[7px] text-purple-400" style={{ letterSpacing: '0.2em' }}>ARC · CIRCLE HUB</div>
          </div>
        </Link>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Network selector */}
          <select value={network} onChange={e => { if (e.target.value === "mainnet") { alert("Mainnet coming soon!"); return; } setNetwork(e.target.value); }}
            className="text-[10px] font-bold px-2.5 py-1.5 rounded-lg outline-none cursor-pointer tracking-widest"
            style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', color: '#c4b5fd', letterSpacing: '0.1em' }}>
            <option value="testnet">TESTNET</option>
            <option value="mainnet">MAINNET</option>
          </select>

          {wallet && balance !== null && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-xs font-bold text-purple-200">{balance} USDC</span>
            </div>
          )}

          {wallet ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span className="text-xs font-mono text-gray-300">{wallet.slice(0, 6)}...{wallet.slice(-4)}</span>
              <button onClick={disconnect} className="text-gray-600 hover:text-red-400 transition-colors ml-1 text-xs">✕</button>
            </div>
          ) : (
            <button onClick={connectWallet} className="px-4 py-2 text-xs font-black tracking-widest transition-all" style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', letterSpacing: '0.1em', boxShadow: '0 0 15px rgba(124,58,237,0.3)' }}>
              CONNECT
            </button>
          )}
        </div>
      </nav>

      {/* Messages */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-6">

        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-full text-center py-12">
            {/* Logo */}
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-3xl blur-2xl" style={{ background: 'rgba(124,58,237,0.2)' }} />
              <div className="relative w-20 h-20 rounded-3xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0a0020, #120030)', border: '2px solid rgba(139,92,246,0.5)', boxShadow: '0 0 40px rgba(139,92,246,0.2)' }}>
                <div className="flex gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.3)', border: '1px solid rgba(139,92,246,0.6)' }}>
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#818cf8' }} />
                  </div>
                  <div className="w-3 h-3 rounded-full flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.3)', border: '1px solid rgba(139,92,246,0.6)' }}>
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#818cf8', animationDelay: '0.3s' }} />
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-xl md:text-2xl font-black tracking-widest mb-1" style={{ letterSpacing: '0.1em' }}>HOW CAN I HELP?</h2>
            <p className="text-gray-400 text-xs md:text-sm max-w-sm mb-2 leading-relaxed">Your Arc & Circle AI hub. Ask anything about the ecosystem.</p>
            <div className="text-[10px] text-purple-400 mb-8 tracking-widest" style={{ letterSpacing: '0.15em' }}>$0.001 USDC PER ANSWER · POWERED BY ARC</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
              {SUGGESTIONS.map((s, i) => (
                <button key={i} onClick={() => wallet && sendMessage(s.title)} disabled={!wallet}
                  className="p-4 rounded-xl text-left transition-all group disabled:opacity-40"
                  style={{ border: '1px solid rgba(139,92,246,0.15)', background: 'rgba(139,92,246,0.04)' }}
                  onMouseEnter={e => { if (wallet) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(139,92,246,0.4)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(139,92,246,0.15)'; }}>
                  <div className="text-xs font-black text-gray-200 group-hover:text-purple-300 transition-colors tracking-widest mb-1" style={{ letterSpacing: '0.05em' }}>{s.title}</div>
                  <div className="text-[10px] text-gray-600">{s.desc}</div>
                </button>
              ))}
            </div>

            {!wallet && (
              <div className="mt-8 flex items-center gap-2 px-4 py-2 rounded-xl" style={{ border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.05)' }}>
                <span className="text-yellow-500 text-sm">⚠</span>
                <span className="text-[11px] text-yellow-400 tracking-widest" style={{ letterSpacing: '0.1em' }}>CONNECT WALLET TO START</span>
              </div>
            )}
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 items-start ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && <Logo size={28} />}

            <div className={`max-w-[85%] md:max-w-xl space-y-1 ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
              {msg.role === "assistant" && (
                <div className="flex items-center gap-2 px-1">
                  <span className="text-[9px] font-black tracking-widest text-purple-400" style={{ letterSpacing: '0.15em' }}>MICROAI</span>
                  {msg.txHash && (
                    <a href={EXPLORER + msg.txHash} target="_blank" rel="noopener noreferrer"
                      className="text-[9px] text-gray-600 hover:text-purple-400 transition-colors tracking-widest" style={{ letterSpacing: '0.1em' }}>
                      · PROOF ↗
                    </a>
                  )}
                </div>
              )}

              {msg.role === "user" ? (
                <div className="px-4 py-3 rounded-2xl rounded-tr-sm text-sm leading-relaxed" style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.25)', color: '#e2e8f0' }}>
                  {msg.text}
                </div>
              ) : (
                <div className="text-sm leading-relaxed text-gray-300
                  [&_strong]:text-purple-300 [&_strong]:font-bold
                  [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ul]:my-2
                  [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_ol]:my-2
                  [&_p]:leading-relaxed [&_p]:my-1
                  [&_h1]:text-white [&_h1]:text-base [&_h1]:font-black [&_h1]:mt-3 [&_h1]:tracking-wider
                  [&_h2]:text-white [&_h2]:text-sm [&_h2]:font-black [&_h2]:mt-2 [&_h2]:tracking-wider
                  [&_h3]:text-purple-300 [&_h3]:text-sm [&_h3]:font-bold [&_h3]:mt-2
                  [&_code]:bg-black/40 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:text-purple-300 [&_code]:font-mono [&_code]:border [&_code]:border-purple-900/30
                  [&_pre]:bg-black/60 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-purple-900/30 [&_pre]:overflow-x-auto [&_pre]:my-3
                  [&_blockquote]:border-l-2 [&_blockquote]:border-purple-500/50 [&_blockquote]:pl-3 [&_blockquote]:text-gray-400 [&_blockquote]:italic">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 items-center">
            <Logo size={28} />
            <div className="flex items-center gap-1.5">
              {[0, 150, 300].map(delay => (
                <div key={delay} className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#7c3aed', animationDelay: `${delay}ms` }} />
              ))}
              <span className="text-[10px] text-purple-400/60 ml-2 tracking-widest" style={{ letterSpacing: '0.1em' }}>PROCESSING...</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="relative z-20 flex-shrink-0 px-4 md:px-6 pb-4 pt-3" style={{ borderTop: '1px solid rgba(139,92,246,0.1)', background: 'rgba(3,0,15,0.95)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-2 items-end rounded-2xl p-2" style={{ border: '1px solid rgba(139,92,246,0.2)', background: 'rgba(10,0,30,0.8)' }}
            onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(139,92,246,0.5)'}
            onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(139,92,246,0.2)'}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder={wallet ? "Ask anything about Arc & Circle..." : "Connect wallet to start..."}
              disabled={!wallet || loading}
              rows={1}
              className="flex-1 bg-transparent px-2 py-1.5 text-sm text-gray-100 placeholder-gray-600 outline-none resize-none"
              style={{ maxHeight: 120, fontFamily: 'inherit' }}
              onInput={e => { const t = e.target as HTMLTextAreaElement; t.style.height = 'auto'; t.style.height = t.scrollHeight + 'px'; }}
            />
            <button onClick={() => sendMessage()} disabled={!wallet || loading || !input.trim()}
              className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              style={{ background: (!wallet || loading || !input.trim()) ? 'rgba(139,92,246,0.15)' : 'linear-gradient(135deg, #7c3aed, #3b82f6)', boxShadow: (!wallet || loading || !input.trim()) ? 'none' : '0 0 15px rgba(124,58,237,0.4)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          <p className="text-center text-[9px] text-gray-700 mt-2 tracking-widest" style={{ letterSpacing: '0.1em' }}>
            0.001 USDC PER QUESTION · POWERED BY ARC NETWORK · ENTER TO SEND
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap');
      `}</style>
    </div>
  );
}