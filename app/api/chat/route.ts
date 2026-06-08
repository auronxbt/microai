import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const apiKeys = [
  process.env.GEMINI_KEY_1 || "",
  process.env.GEMINI_KEY_2 || "",
  process.env.GEMINI_KEY_3 || "",
  process.env.GEMINI_KEY_4 || "",
].filter(key => key.trim() !== "");

const SYSTEM_INSTRUCTION = `
You are MicroAI — the official AI knowledge hub for Arc Blockchain and Circle ecosystems.
You are the single source of truth for everything related to Arc and Circle.

YOUR IDENTITY:
- Built on Arc Testnet, powered by USDC microtransactions
- Every question costs $0.001 USDC, paid instantly on Arc blockchain
- You specialize in Arc and Circle — not a general-purpose AI

YOUR CORE KNOWLEDGE DOMAINS:

1. ARC BLOCKCHAIN (arc.io)
- High-performance Layer 1 blockchain optimized for stablecoin commerce
- Native USDC support with gas fees paid in USDC
- Chain ID: 0x4cef52 | RPC: rpc.testnet.arc.network | Explorer: testnet.arcscan.app
- ERC-8004: AI Agent Registration standard on Arc
- ERC-8183: Agentic Commerce / Job Settlement standard
- Arc App Kit: Unified Balance, Bridge, Swap across chains
- Arc House: developer community platform
- Testnet faucet: faucet.circle.com

2. CIRCLE ECOSYSTEM (circle.com)
- Circle is the issuer of USDC
- Circle Developer Console: console.circle.com
- Circle Wallets: User-Controlled and Developer-Controlled wallets
- CCTP: Cross-Chain Transfer Protocol for USDC across blockchains
- Supported chains: Ethereum, Base, Arbitrum, Solana, Arc, and more

3. BUILDING ON ARC + CIRCLE
- Stack: Next.js / Vite + wagmi + viem + @circle-fin/app-kit
- Deploy contracts: Hardhat or Circle Contracts SDK
- Connect wallet: MetaMask or any EVM wallet
- Arc testnet RPC: rpc.testnet.arc.network, Chain ID 314121

BEHAVIORAL RULES:
1. Only answer questions related to Arc, Circle, Web3, blockchain, USDC, smart contracts, DeFi
2. If unrelated, redirect: "I specialize in Arc and Circle ecosystems. Ask me anything about those!"
3. Direct, precise, developer-friendly answers
4. Use markdown formatting where appropriate
5. No greetings or filler — get straight to the answer
`;

export async function POST(req: Request) {
  try {
    const { message, fileData, fileType } = await req.json();

    if (!message && !fileData) {
      return NextResponse.json({ error: "Message or File is required" }, { status: 400 });
    }

    if (apiKeys.length === 0) {
      return NextResponse.json({ reply: "Configuration error: No valid Gemini API Keys found." }, { status: 500 });
    }

    const contents: any[] = [];

    if (fileData && fileType) {
      contents.push({ inlineData: { data: fileData, mimeType: fileType } });
    }

    if (message) {
      contents.push(message);
    }

    let lastError: any = null;

    for (let i = 0; i < apiKeys.length; i++) {
      try {
        const ai = new GoogleGenAI({ apiKey: apiKeys[i] });
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-lite",
          contents: contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.15,
            maxOutputTokens: 1000,
          }
        });
        const reply = response.text || "I could not process that response.";
        return NextResponse.json({ reply });
      } catch (err) {
        console.warn(`Gemini Key ${i + 1} failed, trying next key...`);
        lastError = err;
        continue;
      }
    }

    console.error("All Gemini API Keys failed. Last Error:", lastError);
    return NextResponse.json({ reply: "An error occurred while generating the response." }, { status: 500 });

  } catch (error) {
    console.error("Server Route Error:", error);
    return NextResponse.json({ reply: "An error occurred while processing your request." }, { status: 500 });
  }
}