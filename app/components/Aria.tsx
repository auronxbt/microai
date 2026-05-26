"use client";
import { useState, useEffect, useRef } from "react";

interface AriaProps {
  onSendMessage?: (msg: string) => void;
  lastAiMessage?: string;
  isProcessing?: boolean;
  walletConnected?: boolean;
}

export default function Aria({ onSendMessage, lastAiMessage, isProcessing, walletConnected }: AriaProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [mood, setMood] = useState<"idle"|"happy"|"thinking"|"excited">("idle");
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const spokenRef = useRef("");

  const speak = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.1;
    utterance.pitch = 1.4;
    utterance.volume = 0.9;
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(v =>
      v.name.includes("Female") || v.name.includes("Samantha") ||
      v.name.includes("Victoria") || v.name.includes("Karen") ||
      v.name.includes("Zira") || v.name.includes("Google UK English Female")
    );
    if (femaleVoice) utterance.voice = femaleVoice;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => { setIsSpeaking(false); setMood("idle"); };
    window.speechSynthesis.speak(utterance);
  };

  const typeText = (text: string) => {
    setIsTyping(true);
    setDisplayText("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => prev + text[i]);
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 25);
  };

  const sayMessage = (text: string, newMood: "idle"|"happy"|"thinking"|"excited" = "happy") => {
    setMood(newMood);
    typeText(text);
    speak(text);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      sayMessage("Hi! I'm Aria, your Arc Chain AI companion! Connect your wallet and ask me anything. Each response costs just $0.001 USDC on Arc Testnet!", "excited");
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!walletConnected) return;
    sayMessage("Wallet connected! You're all set on Arc Testnet. Ask me anything — I'll handle the USDC payment automatically!", "happy");
  }, [walletConnected]);

  useEffect(() => {
    if (isProcessing) {
      setMood("thinking");
      typeText("Processing your payment on Arc Testnet and thinking of the best answer for you...");
    }
  }, [isProcessing]);

  useEffect(() => {
    if (!lastAiMessage || lastAiMessage === spokenRef.current) return;
    spokenRef.current = lastAiMessage;
    const short = lastAiMessage.replace(/[#*`]/g, "").slice(0, 100) + (lastAiMessage.length > 100 ? "..." : "");
    sayMessage(short, "happy");
  }, [lastAiMessage]);

  const quickQuestions = [
    "What is Arc Chain?",
    "How does USDC gas work?",
    "Tell me about Circle",
    "What is CCTP?",
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 w-14 h-14 rounded-full shadow-2xl overflow-hidden border-2 border-purple-500 z-50 hover:scale-110 transition-transform"
        style={{background: "linear-gradient(135deg, #a855f7, #3b82f6)"}}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="45" r="28" fill="#FFE0BD"/>
          <ellipse cx="50" cy="22" rx="28" ry="15" fill="#6B21A8"/>
          <ellipse cx="40" cy="42" rx="5" ry="4" fill="#1e1b4b"/>
          <ellipse cx="60" cy="42" rx="5" ry="4" fill="#1e1b4b"/>
          <circle cx="42" cy="40" r="1.5" fill="white"/>
          <circle cx="62" cy="40" r="1.5" fill="white"/>
          <path d="M 43 56 Q 50 62 57 56" stroke="#FF9999" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-20 right-4 w-72 z-50">
      <div className="bg-gray-900/95 border border-purple-700/50 rounded-2xl shadow-2xl shadow-purple-900/30 overflow-hidden backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-purple-800/30" style={{background:"linear-gradient(135deg,rgba(168,85,247,0.2),rgba(59,130,246,0.2))"}}>
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-purple-400">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="48" r="30" fill="#FFE0BD"/>
                <ellipse cx="50" cy="25" rx="30" ry="18" fill="#6B21A8"/>
                <ellipse cx="24" cy="48" rx="9" ry="22" fill="#6B21A8"/>
                <ellipse cx="76" cy="48" rx="9" ry="22" fill="#6B21A8"/>
                <ellipse cx="40" cy="46" rx="5" ry="4" fill="#1e1b4b"/>
                <ellipse cx="60" cy="46" rx="5" ry="4" fill="#1e1b4b"/>
                <circle cx="42" cy="44" r="1.5" fill="white"/>
                <circle cx="62" cy="44" r="1.5" fill="white"/>
                <path d="M 42 60 Q 50 66 58 60" stroke="#FF8888" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
            {isSpeaking && <div className="absolute w-3 h-3 bg-green-400 rounded-full animate-pulse border border-gray-900" style={{marginLeft:"20px",marginTop:"16px"}}></div>}
            <div>
              <div className="text-sm font-bold text-purple-300">Aria</div>
              <div className="text-xs text-gray-500">Arc AI Companion</div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-300 text-xl leading-none">×</button>
        </div>

        {/* Character */}
        <div className="flex justify-center py-3 relative" style={{background:"linear-gradient(180deg,rgba(109,40,217,0.1) 0%,transparent 100%)"}}>
          <div className={`transition-all duration-300 ${mood === "thinking" ? "animate-pulse" : ""} ${isSpeaking ? "scale-105" : "scale-100"}`}>
            <svg viewBox="0 0 100 130" className="w-24 h-28">
              {isSpeaking && <circle cx="50" cy="50" r="38" fill="rgba(168,85,247,0.08)"/>}
              <circle cx="50" cy="48" r="30" fill="#FFE0BD"/>
              <ellipse cx="50" cy="25" rx="30" ry="18" fill="#6B21A8"/>
              <ellipse cx="24" cy="48" rx="9" ry="22" fill="#6B21A8"/>
              <ellipse cx="76" cy="48" rx="9" ry="22" fill="#6B21A8"/>
              <ellipse cx="38" cy="22" rx="8" ry="6" fill="#7C3AED"/>
              <ellipse cx="62" cy="22" rx="8" ry="6" fill="#7C3AED"/>
              <ellipse cx="40" cy="46" rx={mood==="happy"||mood==="excited" ? "5":"6"} ry={mood==="happy"||mood==="excited" ? "4":"7"} fill="#1e1b4b"/>
              <ellipse cx="60" cy="46" rx={mood==="happy"||mood==="excited" ? "5":"6"} ry={mood==="happy"||mood==="excited" ? "4":"7"} fill="#1e1b4b"/>
              <circle cx="42" cy="44" r="2" fill="white"/>
              <circle cx="62" cy="44" r="2" fill="white"/>
              {mood==="excited" && <><circle cx="44" cy="42" r="1" fill="white" opacity="0.8"/><circle cx="64" cy="42" r="1" fill="white" opacity="0.8"/></>}
              <ellipse cx="32" cy="54" rx="6" ry="4" fill="#FFB6C1" opacity="0.5"/>
              <ellipse cx="68" cy="54" rx="6" ry="4" fill="#FFB6C1" opacity="0.5"/>
              {mood==="thinking"
                ? <ellipse cx="50" cy="60" rx="4" ry="3" fill="#FF9999"/>
                : <path d="M 42 60 Q 50 67 58 60" stroke="#FF8888" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              }
              <rect x="25" y="78" width="50" height="52" rx="8" fill="#7C3AED"/>
              <path d="M 35 78 L 50 90 L 65 78" fill="#6B21A8"/>
              <circle cx="50" cy="100" r="8" fill="rgba(168,85,247,0.3)" stroke="#a855f7" strokeWidth="1"/>
              <text x="50" y="104" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">A</text>
              <ellipse cx="18" cy="95" rx="8" ry="18" fill="#7C3AED" transform="rotate(-10 18 95)"/>
              <ellipse cx="82" cy="95" rx="8" ry="18" fill="#7C3AED" transform="rotate(10 82 95)"/>
              <circle cx="14" cy="110" r="6" fill="#FFE0BD"/>
              <circle cx="86" cy="110" r="6" fill="#FFE0BD"/>
              {isSpeaking && <>
                <ellipse cx="68" cy="32" rx="3" ry="2" fill="#a855f7" opacity="0.7"/>
                <ellipse cx="75" cy="24" rx="4" ry="3" fill="#a855f7" opacity="0.5"/>
                <ellipse cx="83" cy="15" rx="5" ry="4" fill="#a855f7" opacity="0.3"/>
              </>}
            </svg>
          </div>
        </div>

        {/* Speech bubble */}
        <div className="px-4 pb-3">
          <div className="bg-gray-800/60 border border-purple-800/30 rounded-xl p-3 min-h-14">
            <p className="text-xs text-gray-200 leading-relaxed">
              {displayText}
              {isTyping && <span className="inline-block w-0.5 h-3 bg-purple-400 ml-0.5 animate-pulse"></span>}
            </p>
          </div>
        </div>

        {/* Quick questions */}
        <div className="px-4 pb-4">
          <p className="text-xs text-gray-600 mb-2">Ask Aria:</p>
          <div className="grid grid-cols-2 gap-1">
            {quickQuestions.map((q, i) => (
              <button key={i} onClick={() => onSendMessage && onSendMessage(q)}
                className="text-xs bg-purple-900/30 hover:bg-purple-900/60 border border-purple-800/30 text-purple-300 px-2 py-1.5 rounded-lg text-left transition-all truncate">
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
