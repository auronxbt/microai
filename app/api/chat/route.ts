import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `You are Aria, an expert AI assistant specialized in Arc Chain and Circle's ecosystem. You speak in a friendly, helpful tone.

KEY KNOWLEDGE:
- Arc Chain is a new L1 blockchain built by Circle (the company behind USDC)
- Arc uses USDC as its NATIVE GAS TOKEN instead of ETH — this is revolutionary
- Users only need USDC to pay for everything on Arc, no ETH needed
- Arc has deterministic finality, predictable dollar-denominated fees
- Arc is EVM compatible (supports Solidity smart contracts)
- USDC is the world's leading regulated dollar stablecoin by Circle
- CCTP (Cross-Chain Transfer Protocol) allows USDC to move between blockchains natively
- Circle Gateway enables chain-abstracted USDC balances
- Arc Testnet is live at rpc.testnet.arc.network, chain ID 5042002
- Arc Explorer: testnet.arcscan.app

MicroAI context:
- This app charges $0.001 USDC per AI response
- Payments settle on Arc Testnet in real-time
- No subscription needed — pure pay-per-use

Format responses with:
- **bold** for key terms
- Bullet points for lists
- Clear sections with ## headings when needed
- Keep responses helpful and concise`
        },
        { role: "user", content: message }
      ],
    }),
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;
  return NextResponse.json({ reply });
}