"use client";
import { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

const ARC_CHAIN_ID = "0x4cef52";
const USDC_CONTRACT = "0x3600000000000000000000000000000000000000";
const RECEIVER = "0x9a318CD2BC533B5B2e96F7f5b499738732492b15";
const EXPLORER = "https://testnet.arcscan.app/tx/";
const ERC20_ABI_BALANCE = "0x70a08231";

const MicroAILogo = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lg1" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#a855f7"/>
        <stop offset="100%" stopColor="#3b82f6"/>
      </linearGradient>
    </defs>
    <rect width="36" height="36" rx="10" fill="url(#lg1)"/>
    <text x="18" y="24" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white" fontFamily="serif">μ</text>
  </svg>
);

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState(null);

  const getBalance = async (address) => {
    try {
      const data = ERC20_ABI_BALANCE + address.slice(2).padStart(64, "0");
      const result = await window.ethereum.request({
        method: "eth_call",
        params: [{ to: USDC_CONTRACT, data }, "latest"],
      });
      setBalance((parseInt(result, 16) / 1e6).toFixed(3));
    } catch (err) { console.error(err); }
  };

  const connectWallet = async () => {
    if (!window.ethereum) { alert("Please install a Web3 wallet!"); return; }
    try {
      await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: ARC_CHAIN_ID }] });
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWallet(accounts[0]);
      await getBalance(accounts[0]);
    } catch (err) { console.error(err); }
  };

  const disconnectWallet = () => { setWallet(null); setBalance(null); setMessages([]); };

  const sendMessage = async () => {
    if (!input.trim() || loading || !wallet) return;
    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);
    try {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      if (chainId !== ARC_CHAIN_ID) {
        await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: ARC_CHAIN_ID }] });
      }
      const amount = (1000).toString(16).padStart(64, "0");
      const data = "0xa9059cbb" + RECEIVER.slice(2).padStart(64, "0") + amount;
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [{ from: wallet, to: USDC_CONTRACT, data, gas: "0x186A0" }],
      });
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const aiData = await res.json();
      setMessages(prev => [...prev, { role: "ai", text: aiData.reply, txHash }]);
      await getBalance(wallet);
    } catch {
      setMessages(prev => [...prev, { role: "ai", text: "Transaction cancelled." }]);
    } finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen flex flex-col" style={{background: "linear-gradient(135deg, #0a0a0f 0%, #0f0a1a 50%, #0a0a0f 100%)"}}>
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 border-b border-purple-900/30 backdrop-blur-sm sticky top-0 z-10" style={{background: "rgba(10,10,15,0.8)"}}>
        <Link href="/" className="flex items-center gap-3">
          <MicroAILogo />
          <div>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">MicroAI</span>
            <span className="ml-2 text-xs bg-purple-900/40 text-purple-300 px-2 py-0.5 rounded-full border border-purple-700/30">Arc Testnet</span>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          {wallet && balance !== null && (
            <div className="flex items-center gap-2 bg-gray-900/60 border border-purple-800/30 px-4 py-2 rounded-xl">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">Balance:</span>
              <span className="text-sm font-bold text-purple-300">{balance} USDC</span>
            </div>
          )}
          {wallet ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-green-900/20 border border-green-700/30 px-4 py-2 rounded-xl">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-green-300">{wallet.slice(0,6)}...{wallet.slice(-4)}</span>
              </div>
              <button onClick={disconnectWallet} className="border border-red-800/30 hover:border-red-500/50 px-3 py-2 rounded-xl text-xs text-red-400/60 hover:text-red-400 transition-all">
                ✕
              </button>
            </div>
          ) : (
            <button onClick={connectWallet} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 px-5 py-2 rounded-xl text-sm font-medium transition-all shadow-lg shadow-purple-900/30">
              Connect Wallet
            </button>
          )}
        </div>
      </nav>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-3xl mx-auto w-full space-y-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-96 text-center">
            <div className="mb-6">
              <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="lg2" x1="0" y1="0" x2="72" y2="72" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#a855f7"/>
                    <stop offset="100%" stopColor="#3b82f6"/>
                  </linearGradient>
                </defs>
                <rect width="72" height="72" rx="20" fill="url(#lg2)"/>
                <text x="36" y="50" textAnchor="middle" fontSize="36" fontWeight="bold" fill="white" fontFamily="serif">μ</text>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Ask me anything</h2>
            <p className="text-gray-400 mb-1">Each response costs <span className="text-purple-300 font-semibold">$0.001 USDC</span> on Arc Testnet</p>
            <p className="text-gray-600 text-sm">No subscription. No commitment. Pay as you go.</p>
            {!wallet && (
              <button onClick={connectWallet} className="mt-8 flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 px-8 py-3 rounded-xl text-white font-medium transition-all shadow-lg shadow-purple-900/30">
                Connect Wallet to Start
              </button>
            )}
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={"flex gap-3 " + (msg.role === "user" ? "justify-end" : "justify-start")}>
            {msg.role === "ai" && (
              <div className="flex-shrink-0 mt-1">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="lg3" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#a855f7"/>
                      <stop offset="100%" stopColor="#3b82f6"/>
                    </linearGradient>
                  </defs>
                  <rect width="32" height="32" rx="9" fill="url(#lg3)"/>
                  <text x="16" y="22" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white" fontFamily="serif">μ</text>
                </svg>
              </div>
            )}
            <div className="max-w-2xl">
              {msg.role === "ai" && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-purple-900/40 text-purple-300 px-2 py-0.5 rounded-full border border-purple-700/30">$0.001 USDC deducted</span>
                  {msg.txHash && (
                    <a href={EXPLORER + msg.txHash} target="_blank" className="text-xs text-blue-400 hover:text-blue-300 underline transition-colors">
                      View TX on Arc ↗
                    </a>
                  )}
                </div>
              )}
              <div className={
                msg.role === "user"
                  ? "bg-gradient-to-br from-purple-600 to-purple-700 text-white px-5 py-3 rounded-2xl rounded-tr-sm text-sm shadow-lg"
                  : "bg-gray-900/80 border border-gray-700/50 text-gray-100 px-5 py-4 rounded-2xl rounded-tl-sm text-sm shadow-lg"
              }>
                {msg.role === "ai" ? (
                  <div className="prose prose-invert prose-sm max-w-none
                    prose-headings:text-purple-300 prose-headings:font-semibold prose-headings:mb-2 prose-headings:mt-3
                    prose-p:text-gray-200 prose-p:leading-relaxed prose-p:my-1
                    prose-strong:text-white prose-strong:font-semibold
                    prose-li:text-gray-200 prose-li:my-0.5
                    prose-ul:my-2 prose-ol:my-2
                    prose-code:text-purple-300 prose-code:bg-purple-900/30 prose-code:px-1 prose-code:rounded">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="leading-relaxed">{msg.text}</p>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 justify-start">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="lg4" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#a855f7"/>
                  <stop offset="100%" stopColor="#3b82f6"/>
                </linearGradient>
              </defs>
              <rect width="32" height="32" rx="9" fill="url(#lg4)"/>
              <text x="16" y="22" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white" fontFamily="serif">μ</text>
            </svg>
            <div className="bg-gray-900/80 border border-gray-700/50 px-5 py-4 rounded-2xl rounded-tl-sm">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay:"0ms"}}></span>
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay:"150ms"}}></span>
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay:"300ms"}}></span>
                </div>
                <span>Processing payment on Arc Testnet...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-purple-900/20 px-4 py-4 backdrop-blur-sm" style={{background: "rgba(10,10,15,0.9)"}}>
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-3 bg-gray-900/60 border border-gray-700/50 rounded-2xl p-2 focus-within:border-purple-500/50 transition-all">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder={wallet ? "Ask anything... (Enter to send)" : "Connect wallet first..."}
              className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-gray-500 outline-none"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !wallet}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed px-5 py-2 rounded-xl text-sm font-medium text-white transition-all shadow-lg"
            >
              {loading ? "..." : "Send →"}
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-2 text-center">$0.001 USDC per response • Powered by Arc Testnet • <a href="https://testnet.arcscan.app" target="_blank" className="text-purple-600 hover:text-purple-400">arcscan.app ↗</a></p>
        </div>
      </div>
    </main>
  );
}
