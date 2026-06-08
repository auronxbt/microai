"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ARC_CHAIN_ID = "0x4cef52";
const USDC_CONTRACT = "0x3600000000000000000000000000000000000000";
const RECEIVER = "0x9a318CD2BC533B5B2e96F7f5b499738732492b15";
const EXPLORER = "https://testnet.arcscan.app/tx/";
const ERC20_ABI_BALANCE = "0x70a08231";

interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

interface Message {
  role: "user" | "assistant";
  text: string;
  txHash?: string;
  fileName?: string;
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = (reader.result as string).split(",")[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
};

const UniqueLogo = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
    <defs>
      <linearGradient id="logoGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#c084fc" />
        <stop offset="50%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    <path d="M8 14C8 10.6863 10.6863 8 14 8H34C37.3137 8 40 10.6863 40 14V34C40 37.3137 37.3137 40 34 40H14C10.6863 40 8 37.3137 8 34V14Z" fill="#090514" stroke="url(#logoGrad)" strokeWidth="2"/>
    <path d="M15 32V18L24 27L33 18V32" stroke="url(#logoGrad)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="24" cy="16" r="2.5" fill="#3b82f6" />
    <circle cx="15" cy="18" r="2" fill="#a855f7" />
    <circle cx="33" cy="18" r="2" fill="#a855f7" />
  </svg>
);

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [wallet, setWallet] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [network, setNetwork] = useState<string>("testnet");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getBalance = async (address: string) => {
    try {
      const data = ERC20_ABI_BALANCE + address.slice(2).padStart(64, "0");
      const result = await window.ethereum!.request({
        method: "eth_call",
        params: [{ to: USDC_CONTRACT, data }, "latest"],
      }) as string;
      setBalance((parseInt(result, 16) / 1e6).toFixed(3));
    } catch (err) { console.error(err); }
  };

  const connectWallet = async () => {
    if (!window.ethereum) { alert("Please install a Web3 wallet!"); return; }
    try {
      await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: ARC_CHAIN_ID }] });
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" }) as string[];
      setWallet(accounts[0]);
      await getBalance(accounts[0]);
    } catch (err) { console.error(err); }
  };

  const disconnectWallet = () => { setWallet(null); setBalance(null); setMessages([]); setSelectedFile(null); };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const sendMessage = async (customMessage?: string) => {
    const messageToSend = customMessage || input;
    if ((!messageToSend.trim() && !selectedFile) || loading || !wallet) return;

    const currentFileName = selectedFile ? selectedFile.name : undefined;
    const currentFileType = selectedFile ? selectedFile.type : undefined;
    let currentFileDataBase64: string | undefined = undefined;

    if (selectedFile) {
      try {
        currentFileDataBase64 = await fileToBase64(selectedFile);
      } catch (err) {
        console.error("File processing error:", err);
        return;
      }
    }

    setInput("");
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";

    const newUserMessage: Message = { role: "user", text: messageToSend, fileName: currentFileName };
    setMessages(prev => [...prev, newUserMessage]);
    setLoading(true);

    try {
      const chainId = await window.ethereum!.request({ method: "eth_chainId" }) as string;
      if (chainId !== ARC_CHAIN_ID) {
        await window.ethereum!.request({ method: "wallet_switchEthereumChain", params: [{ chainId: ARC_CHAIN_ID }] });
      }
      const amount = (1000).toString(16).padStart(64, "0");
      const data = "0xa9059cbb" + RECEIVER.slice(2).padStart(64, "0") + amount;
      const txHash = await window.ethereum!.request({
        method: "eth_sendTransaction",
        params: [{ from: wallet, to: USDC_CONTRACT, data, gas: "0x186A0" }],
      }) as string;

      const historyPayload = [
        ...messages.map(msg => ({
          role: msg.role as "user" | "assistant", 
          content: msg.text
        })),
        { role: "user" as const, content: messageToSend }
      ];

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: messageToSend, 
          messages: historyPayload,
          fileName: currentFileName,
          fileData: currentFileDataBase64,
          fileType: currentFileType
        }),
      });
      const aiData = await res.json();
      setMessages(prev => [...prev, { role: "assistant", text: aiData.reply, txHash }]);
      await getBalance(wallet);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Transaction cancelled." }]);
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#05030a]" style={{backgroundImage: "radial-gradient(circle at 50% -20%, #1a0b36 0%, #05030a 70%)"}}>
      
      <nav className="flex justify-between items-center px-4 md:px-8 py-3.5 border-b border-purple-950/40 sticky top-0 z-10 backdrop-blur-md bg-[#05030a]/75">
        <Link href="/" className="flex items-center gap-2.5 group">
          <UniqueLogo size={32} />
          <span className="text-md font-bold tracking-tight bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
            MicroAI
          </span>
        </Link>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={network}
              onChange={(e) => {
                const selectedValue = e.target.value;
                if (selectedValue === "mainnet") {
                  alert("Mainnet is coming soon! Please use Testnet for now.");
                  return;
                }
                setNetwork(selectedValue);
              }}
              className="bg-purple-500/10 hover:bg-purple-500/15 text-purple-300 text-[11px] font-medium px-2.5 py-1.5 rounded-xl border border-purple-500/20 outline-none cursor-pointer appearance-none transition-all pr-7 font-sans shadow-md"
              style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23d8b4fe' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 8px center',
              }}
            >
              <option value="testnet" className="bg-[#05030a] text-purple-300">Testnet</option>
              <option value="mainnet" className="bg-[#05030a] text-purple-300">Mainnet</option>
            </select>
          </div>

          {wallet && balance !== null && (
            <div className="flex items-center gap-2 bg-purple-950/20 border border-purple-900/30 px-3 py-1.5 rounded-xl backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></span>
              <span className="text-xs font-semibold text-purple-200">{balance} USDC</span>
            </div>
          )}

          {wallet ? (
            <div className="flex items-center gap-1.5 bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 rounded-xl shadow-inner">
              <span className="text-xs font-mono text-zinc-300">{wallet.slice(0,6)}...{wallet.slice(-4)}</span>
              <button onClick={disconnectWallet} className="text-zinc-500 hover:text-red-400 pl-1 text-xs transition-colors">✕</button>
            </div>
          ) : (
            <button onClick={connectWallet} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-4 py-2 rounded-xl text-xs font-medium text-white shadow-lg shadow-purple-900/20 transition-all transform active:scale-95">
              Connect Wallet
            </button>
          )}
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto px-4 py-8 max-w-3xl mx-auto w-full space-y-6 scrollbar-thin">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
            <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
              <UniqueLogo size={64} />
            </div>
            <h2 className="text-2xl font-semibold text-zinc-100 tracking-tight mb-2">How can I help you today?</h2>
            <p className="text-zinc-400 text-sm max-w-sm mb-8 leading-relaxed">Secure, instant AI computations running via peer-to-peer microtransactions.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl text-left">
              {[
                { title: "What is Arc Chain?", desc: "Learn about the Layer 1 performance protocol." },
                { title: "Explain microtransactions", desc: "How cost-per-response models save money." },
                { title: "Analyze Web3 Smart Contracts", desc: "Best safety practices for deployment." },
                { title: "Write a React component", desc: "Generate modular UI utilizing Tailwind CSS." }
              ].map((card, idx) => (
                <button 
                  key={idx} 
                  onClick={() => wallet && sendMessage(card.title)}
                  disabled={!wallet}
                  className="p-3.5 rounded-xl border border-zinc-800/60 bg-zinc-900/30 hover:bg-purple-950/10 hover:border-purple-900/50 text-left transition-all group disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-zinc-800/60"
                >
                  <div className="text-xs font-medium text-zinc-200 group-hover:text-purple-300 transition-colors">{card.title}</div>
                  <div className="text-[11px] text-zinc-500 mt-0.5 line-clamp-1">{card.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={"flex gap-4 items-start w-full " + (msg.role === "user" ? "justify-end" : "justify-start")}>
            {msg.role !== "user" && (
              <div className="flex-shrink-0 mt-1">
                <UniqueLogo size={28} />
              </div>
            )}
            
            <div className="max-w-[85%] sm:max-w-xl space-y-1.5">
              {msg.role !== "user" && (
                <div className="flex items-center gap-2 px-1">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-purple-400/90">MicroAI Agent</span>
                  {msg.txHash && (
                    <a href={EXPLORER + msg.txHash} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-[10px] text-zinc-500 hover:text-purple-400 transition-colors">
                      • Proof ↗
                    </a>
                  )}
                </div>
              )}

              <div className={
                msg.role === "user" 
                  ? "bg-zinc-900 border border-zinc-800 text-zinc-100 px-4 py-2.5 rounded-2xl rounded-tr-none text-[13.5px] shadow-md leading-relaxed font-normal ml-auto text-left flex flex-col items-end" 
                  : "text-zinc-200 px-1 py-1 text-[14px] leading-relaxed w-full"
              }>
                {msg.role === "user" && msg.fileName && (
                  <div className="mb-2 text-[11px] bg-purple-950/40 border border-purple-900/40 px-2 py-0.5 rounded-md inline-flex items-center gap-1 text-purple-300 font-mono self-start">
                    📎 {msg.fileName}
                  </div>
                )}

                {msg.role !== "user" ? (
                  <div className="space-y-3.5 text-zinc-300 
                    [&_strong]:text-purple-400 [&_strong]:font-semibold
                    [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ul]:my-2
                    [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_ol]:my-2
                    [&_p]:leading-relaxed [&_p]:my-1
                    [&_h1]:text-white [&_h1]:text-lg [&_h1]:font-semibold [&_h1]:mt-3
                    [&_h2]:text-white [&_h2]:text-md [&_h2]:font-semibold [&_h2]:mt-2
                    [&_code]:bg-zinc-900 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:text-purple-300 [&_code]:font-mono">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap w-full">{msg.text}</p>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-4 justify-start items-center pl-1 animate-pulse">
            <UniqueLogo size={24} />
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium font-mono">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{animationDelay:"0ms"}}></span>
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{animationDelay:"150ms"}}></span>
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{animationDelay:"300ms"}}></span>
              <span className="ml-1 text-purple-400/60">Settling gas & processing...</span>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-zinc-900/60 p-4 bg-[#05030a]/90 backdrop-blur-lg">
        <div className="max-w-2xl mx-auto relative">
          
          {selectedFile && (
            <div className="absolute -top-10 left-0 right-0 flex items-center justify-between bg-zinc-900 border border-purple-950 px-3 py-1.5 rounded-xl text-[11px] text-purple-300 shadow-xl animate-fade-in">
              <span className="flex items-center gap-1.5 truncate">
                <span>📎</span> {selectedFile.name} <span className="text-zinc-600 font-mono">({(selectedFile.size / 1024).toFixed(0)} KB)</span>
              </span>
              <button onClick={removeSelectedFile} className="text-zinc-500 hover:text-red-400 font-bold px-1 transition-colors">✕</button>
            </div>
          )}

          <div className="flex gap-2.5 bg-zinc-900/75 border border-zinc-800/80 rounded-2xl p-2 focus-within:border-purple-600/40 focus-within:ring-1 focus-within:ring-purple-600/20 transition-all items-center shadow-2xl">
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              disabled={loading || !wallet}
              className="hidden"
              id="chat-file-input"
              accept="image/*"
            />
            <label
              htmlFor="chat-file-input"
              className={`flex items-center justify-center p-2 rounded-xl text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50 transition-all cursor-pointer ${(!wallet || loading) && 'opacity-20 cursor-not-allowed'}`}
              title="Upload files"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </label>

            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder={wallet ? "Message MicroAI..." : "Please connect your wallet to prompt..."}
              className="flex-1 bg-transparent px-1 py-1.5 text-[13.5px] text-zinc-100 placeholder-zinc-500 outline-none"
              disabled={!wallet}
            />
            
            <button 
              onClick={() => sendMessage()} 
              disabled={loading || !wallet || (!input.trim() && !selectedFile)}
              className="bg-zinc-100 hover:bg-white text-zinc-950 disabled:bg-zinc-800 disabled:text-zinc-600 p-2 rounded-xl transition-all shadow-md transform active:scale-95"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
          <p className="text-[10px] text-zinc-600 mt-2 text-center tracking-wide">Cost per transaction: 0.001 USDC • Powered securely by Arc Network Architecture</p>
        </div>
      </div>
    </main>
  );
}