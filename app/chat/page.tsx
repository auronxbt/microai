"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const ARC_CHAIN_ID = "0x4cef52";
const USDC_CONTRACT = "0x3600000000000000000000000000000000000000";
const RECEIVER = "0x9a318CD2BC533B5B2e96F7f5b499738732492b15";
const EXPLORER = "https://testnet.arcscan.app/tx/";
const ERC20_ABI_BALANCE = "0x70a08231";

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
      const raw = parseInt(result, 16);
      setBalance((raw / 1e6).toFixed(3));
    } catch (err) {
      console.error(err);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) { alert("MetaMask install করো!"); return; }
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ARC_CHAIN_ID }],
      });
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWallet(accounts[0]);
      await getBalance(accounts[0]);
    } catch (err) { console.error(err); }
  };

  const disconnectWallet = () => {
    setWallet(null);
    setBalance(null);
    setMessages([]);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading || !wallet) return;
    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);
    try {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      if (chainId !== ARC_CHAIN_ID) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: ARC_CHAIN_ID }],
        });
      }
      const amount = (1000).toString(16).padStart(64, "0");
      const receiverPadded = RECEIVER.slice(2).padStart(64, "0");
      const data = "0xa9059cbb" + receiverPadded + amount;
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [{ from: wallet, to: USDC_CONTRACT, data: data, gas: "0x186A0" }],
      });
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const aiData = await res.json();
      setMessages(prev => [...prev, { role: "ai", text: aiData.reply, txHash: txHash }]);
      await getBalance(wallet);
    } catch (err) {
      setMessages(prev => [...prev, { role: "ai", text: "Transaction cancel হয়েছে।" }]);
    } finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-800">
        <Link href="/" className="text-xl font-bold text-purple-400">μ MicroAI</Link>
        <div className="flex items-center gap-4">
          {wallet && balance !== null && (
            <span className="bg-gray-900 border border-gray-700 px-4 py-2 rounded-lg text-sm">
              Balance: <span className="text-purple-400 font-bold">{balance} USDC</span>
            </span>
          )}
          {wallet ? (
            <div className="flex items-center gap-2">
              <span className="bg-gray-900 border border-gray-700 px-4 py-2 rounded-lg text-sm text-green-400">
                {wallet.slice(0,6) + "..." + wallet.slice(-4)} ✓
              </span>
              <button onClick={disconnectWallet} className="border border-gray-700 hover:border-red-500 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-red-400">
                Disconnect
              </button>
            </div>
          ) : (
            <button onClick={connectWallet} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm">
              Connect Wallet
            </button>
          )}
        </div>
      </nav>
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4 max-w-3xl mx-auto w-full">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            <div className="text-5xl mb-4">μ</div>
            <p>Ask anything. Each response costs $0.001 USDC on Arc Testnet.</p>
            {!wallet && (
              <button onClick={connectWallet} className="mt-4 bg-purple-600 px-6 py-3 rounded-lg text-white text-sm">
                Connect Wallet to Start
              </button>
            )}
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={"flex " + (msg.role === "user" ? "justify-end" : "justify-start")}>
            <div className={"max-w-xl px-4 py-3 rounded-xl text-sm " + (msg.role === "user" ? "bg-purple-600 text-white" : "bg-gray-900 border border-gray-700 text-gray-200")}>
              {msg.role === "ai" && (
                <div className="text-xs text-gray-500 mb-2">
                  {"$0.001 USDC deducted • "}
                  {msg.txHash && <a href={EXPLORER + msg.txHash} target="_blank" className="text-purple-400 underline">View TX on Arc</a>}
                </div>
              )}
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-900 border border-gray-700 px-4 py-3 rounded-xl text-sm text-gray-400">Processing payment + AI... ⏳</div>
          </div>
        )}
      </div>
      <div className="border-t border-gray-800 px-8 py-4 max-w-3xl mx-auto w-full">
        <div className="flex gap-3">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder={wallet ? "Ask anything..." : "Connect wallet first..."}
            className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-sm outline-none focus:border-purple-500" />
          <button onClick={sendMessage} disabled={loading || !wallet}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 px-6 py-3 rounded-lg text-sm font-medium">
            {loading ? "..." : "Send"}
          </button>
        </div>
        <p className="text-xs text-gray-600 mt-2 text-center">$0.001 USDC per response • Powered by Arc Testnet</p>
      </div>
    </main>
  );
}
