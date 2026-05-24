"use client";
import { useState } from "react";
import Link from "next/link";

export default function Chat() {
  const [messages, setMessages] = useState<{role: string, text: string}[]>([]);
  const [input, setInput] = useState("");
  const [balance, setBalance] = useState(0.050);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "ai", text: data.reply }]);
      setBalance(prev => Math.max(0, prev - 0.001));
    } catch {
      setMessages(prev => [...prev, { role: "ai", text: "Error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-800">
        <Link href="/" className="text-xl font-bold text-purple-400">μ MicroAI</Link>
        <div className="flex items-center gap-4">
          <span className="bg-gray-900 border border-gray-700 px-4 py-2 rounded-lg text-sm">
            Balance: <span className="text-purple-400 font-bold">{balance.toFixed(3)} USDC</span>
          </span>
          <button className="bg-purple-600 px-4 py-2 rounded-lg text-sm">
            Connected ✓
          </button>
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4 max-w-3xl mx-auto w-full">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            <div className="text-5xl mb-4">μ</div>
            <p>Ask anything. Each response costs $0.001 USDC.</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xl px-4 py-3 rounded-xl text-sm ${
              msg.role === "user"
                ? "bg-purple-600 text-white"
                : "bg-gray-900 border border-gray-700 text-gray-200"
            }`}>
              {msg.role === "ai" && (
                <div className="text-xs text-gray-500 mb-1">$0.001 USDC deducted</div>
              )}
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-900 border border-gray-700 px-4 py-3 rounded-xl text-sm text-gray-400">
              Thinking... ⏳
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-800 px-8 py-4 max-w-3xl mx-auto w-full">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Ask anything..."
            className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-sm outline-none focus:border-purple-500"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 px-6 py-3 rounded-lg text-sm font-medium"
          >
            {loading ? "..." : "Send →"}
          </button>
        </div>
        <p className="text-xs text-gray-600 mt-2 text-center">$0.001 USDC per response • Powered by Arc Chain</p>
      </div>
    </main>
  );
}