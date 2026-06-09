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
  const [network, setNetwork] = useState("Testnet");
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
      const txData = "0xa9059cbb" + RECEIVER.slice(2).padStart(64, "0") + amount;
      const txHash = await window.ethereum!.request({ method: "eth_sendTransaction", params: [{ from: wallet, to: USDC_CONTRACT, data: txData, gas: "0x186A0" }] }) as string;
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: msg }) });
      const aiData = await res.json();
      setMessages(prev => [...prev, { role: "assistant", text: aiData.reply, txHash }]);
      await getBalance(wallet);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Transaction cancelled or failed. Please try again." }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', background: '#0f0f10', color: '#ececec', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', overflow: 'hidden' }}>

      {/* Navbar */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 56, borderBottom: '1px solid #1e1e22', background: '#0f0f10' }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #6d28d9, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 14, color: '#fff', flexShrink: 0 }}>M</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>MicroAI</div>
            <div style={{ fontSize: 9, color: '#6d6d7a', letterSpacing: '0.08em', lineHeight: 1 }}>Arc · Circle Hub</div>
          </div>
        </Link>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>

          {/* Network toggle */}
          <div style={{ display: 'flex', borderRadius: 20, border: '1px solid #2a2a30', overflow: 'hidden', background: '#1a1a1f' }}>
            {['Testnet', 'Mainnet'].map(n => (
              <button key={n} onClick={() => { if (n === 'Mainnet') { alert('Mainnet coming soon!'); return; } setNetwork(n); }}
                style={{ padding: '5px 14px', fontSize: 11, fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.15s', background: network === n ? '#6d28d9' : 'transparent', color: network === n ? '#fff' : '#6d6d7a' }}>
                {n}
              </button>
            ))}
          </div>

          {/* Balance */}
          {wallet && balance !== null && (
            <div style={{ padding: '5px 12px', borderRadius: 20, border: '1px solid #2a2a30', background: '#1a1a1f', fontSize: 11, color: '#a78bfa', fontWeight: 600 }}>
              {balance} USDC
            </div>
          )}

          {/* Wallet button */}
          {wallet ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 20, border: '1px solid #2a2a30', background: '#1a1a1f' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#d1d1d6', fontFamily: 'monospace' }}>{wallet.slice(0, 6)}...{wallet.slice(-4)}</span>
              <button onClick={disconnect} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4a4a55', fontSize: 12, marginLeft: 2, padding: 0 }}>x</button>
            </div>
          ) : (
            <button onClick={connectWallet} style={{ padding: '6px 16px', borderRadius: 20, border: 'none', background: 'linear-gradient(135deg, #6d28d9, #2563eb)', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
              Connect Wallet
            </button>
          )}
        </div>
      </div>

      {/* Messages area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', paddingTop: 32, paddingBottom: 24 }}>

          {messages.length === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 40, paddingBottom: 40 }}>
              {/* Logo mark */}
              <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #6d28d9, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 900, color: '#fff', marginBottom: 20, boxShadow: '0 0 30px rgba(109,40,217,0.3)' }}>M</div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 8px', textAlign: 'center' }}>How can I help you today?</h2>
              <p style={{ fontSize: 13, color: '#6d6d7a', margin: '0 0 6px', textAlign: 'center' }}>Your Arc & Circle AI knowledge hub.</p>
              <p style={{ fontSize: 11, color: '#4a4a55', margin: '0 0 36px', textAlign: 'center' }}>$0.001 USDC per answer · Powered by Arc Network</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, width: '100%', maxWidth: 560 }}>
                {SUGGESTIONS.map((s, i) => (
                  <button key={i} onClick={() => wallet && sendMessage(s.title)} disabled={!wallet}
                    style={{ padding: '14px 16px', borderRadius: 12, border: '1px solid #1e1e22', background: '#161618', cursor: wallet ? 'pointer' : 'not-allowed', textAlign: 'left', transition: 'all 0.15s', opacity: wallet ? 1 : 0.4 }}
                    onMouseEnter={e => { if (wallet) { (e.currentTarget as HTMLElement).style.borderColor = '#6d28d9'; (e.currentTarget as HTMLElement).style.background = '#1a1525'; } }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#1e1e22'; (e.currentTarget as HTMLElement).style.background = '#161618'; }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#d1d1d6', marginBottom: 4 }}>{s.title}</div>
                    <div style={{ fontSize: 11, color: '#4a4a55' }}>{s.desc}</div>
                  </button>
                ))}
              </div>

              {!wallet && (
                <div style={{ marginTop: 24, padding: '10px 20px', borderRadius: 10, border: '1px solid #2a2218', background: '#1a1510', fontSize: 12, color: '#ca8a04' }}>
                  Connect your wallet to start asking
                </div>
              )}
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} style={{ marginBottom: 28, display: 'flex', gap: 14, justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>

              {msg.role === 'assistant' && (
                <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, #6d28d9, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, color: '#fff', flexShrink: 0, marginTop: 2 }}>M</div>
              )}

              <div style={{ maxWidth: '80%' }}>
                {msg.role === 'assistant' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#6d6d7a' }}>MicroAI</span>
                    {msg.txHash && (
                      <a href={EXPLORER + msg.txHash} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: 10, color: '#4a4a55', textDecoration: 'none' }}
                        onMouseEnter={e => (e.target as HTMLElement).style.color = '#a78bfa'}
                        onMouseLeave={e => (e.target as HTMLElement).style.color = '#4a4a55'}>
                        View proof
                      </a>
                    )}
                  </div>
                )}

                {msg.role === 'user' ? (
                  <div style={{ padding: '10px 16px', borderRadius: 16, borderBottomRightRadius: 4, background: '#1e1e28', border: '1px solid #2a2a38', fontSize: 14, lineHeight: 1.6, color: '#e2e2e8' }}>
                    {msg.text}
                  </div>
                ) : (
                  <div style={{ fontSize: 14, lineHeight: 1.7, color: '#d1d1d6' }}
                    className="prose-content">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ children }) => <p style={{ margin: '0 0 12px', lineHeight: 1.7 }}>{children}</p>,
                        strong: ({ children }) => <strong style={{ color: '#a78bfa', fontWeight: 600 }}>{children}</strong>,
                        code: ({ children, className }) => {
                          const isBlock = className?.includes('language-');
                          return isBlock
                            ? <code style={{ display: 'block', background: '#161618', border: '1px solid #2a2a30', borderRadius: 8, padding: '12px 16px', fontSize: 12, fontFamily: 'monospace', color: '#a78bfa', overflowX: 'auto', margin: '8px 0' }}>{children}</code>
                            : <code style={{ background: '#1e1e28', border: '1px solid #2a2a38', borderRadius: 4, padding: '2px 6px', fontSize: 12, fontFamily: 'monospace', color: '#a78bfa' }}>{children}</code>;
                        },
                        pre: ({ children }) => <pre style={{ margin: '8px 0', borderRadius: 8, overflow: 'hidden' }}>{children}</pre>,
                        ul: ({ children }) => <ul style={{ margin: '8px 0', paddingLeft: 20, lineHeight: 1.7 }}>{children}</ul>,
                        ol: ({ children }) => <ol style={{ margin: '8px 0', paddingLeft: 20, lineHeight: 1.7 }}>{children}</ol>,
                        li: ({ children }) => <li style={{ marginBottom: 4, color: '#c4c4cc' }}>{children}</li>,
                        h1: ({ children }) => <h1 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: '16px 0 8px' }}>{children}</h1>,
                        h2: ({ children }) => <h2 style={{ fontSize: 14, fontWeight: 700, color: '#e2e2e8', margin: '14px 0 6px' }}>{children}</h2>,
                        h3: ({ children }) => <h3 style={{ fontSize: 13, fontWeight: 600, color: '#c4c4cc', margin: '12px 0 4px' }}>{children}</h3>,
                        blockquote: ({ children }) => <blockquote style={{ borderLeft: '3px solid #6d28d9', paddingLeft: 12, margin: '8px 0', color: '#6d6d7a', fontStyle: 'italic' }}>{children}</blockquote>,
                        a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#818cf8', textDecoration: 'underline' }}>{children}</a>,
                      }}>
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 28 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, #6d28d9, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, color: '#fff', flexShrink: 0 }}>M</div>
              <div style={{ paddingTop: 8, display: 'flex', gap: 4 }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#6d28d9', animation: 'bounce 1.2s ease-in-out infinite', animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input area */}
      <div style={{ flexShrink: 0, padding: '16px 20px 20px', borderTop: '1px solid #1e1e22', background: '#0f0f10' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, background: '#161618', border: '1px solid #2a2a30', borderRadius: 14, padding: '10px 14px', transition: 'border-color 0.2s' }}
            onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = '#6d28d9'}
            onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = '#2a2a30'}>
            <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
              placeholder={wallet ? "Ask anything about Arc & Circle..." : "Connect your wallet to start..."}
              disabled={!wallet || loading} rows={1}
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', resize: 'none', fontSize: 14, color: '#e2e2e8', lineHeight: 1.6, fontFamily: 'inherit', maxHeight: 140, minHeight: 24 }}
              onInput={e => { const t = e.target as HTMLTextAreaElement; t.style.height = 'auto'; t.style.height = Math.min(t.scrollHeight, 140) + 'px'; }}
            />
            <button onClick={() => sendMessage()} disabled={!wallet || loading || !input.trim()}
              style={{ width: 34, height: 34, borderRadius: 8, border: 'none', cursor: (!wallet || loading || !input.trim()) ? 'not-allowed' : 'pointer', background: (!wallet || loading || !input.trim()) ? '#2a2a30' : 'linear-gradient(135deg, #6d28d9, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          <p style={{ textAlign: 'center', fontSize: 10, color: '#3a3a42', marginTop: 8 }}>
            $0.001 USDC per question · Arc Network · Enter to send
          </p>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}