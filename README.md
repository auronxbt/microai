# μ MicroAI — Pay Per Question AI on Arc Testnet

> The first pay-per-use AI powered by real USDC micropayments on Arc Testnet.

## 🎯 Problem
Every AI tool today charges monthly subscriptions. Users pay even when they don't use it.

## 💡 Solution
MicroAI charges **$0.001 USDC per AI response** — nothing more, nothing less.
Every payment is a real on-chain transaction on Arc Testnet.

## ✅ Live Demo
- **App:** https://microai-tan.vercel.app
- **Real TX on Arc:** https://testnet.arcscan.app/tx/0x45edd50186498fd7b62b274bb25f4c7540fcc441ce71e92a57ebf5218dace2ce

## 🔧 Circle Tools Used
- **USDC** — native payment token on Arc Testnet
- **Arc Testnet** — all transactions settled on-chain with USDC fees

## 🏗️ Architecture
User → Connect MetaMask (Arc Testnet)
→ Type Question
→ MetaMask Popup: Approve 0.001 USDC
→ USDC Transfer on Arc (0x3600...0000)
→ AI Response via Groq/Llama
→ TX Hash shown → Verifiable on arcscan.app
## 🚀 How to Run Locally
```bash
git clone https://github.com/auronxbt/microai.git
cd microai
npm install
# Create .env.local and add:
# GROQ_API_KEY=your_key
npm run dev
```

## 💰 Payment Flow
1. User connects MetaMask on Arc Testnet
2. User asks a question
3. MetaMask popup — approve 0.001 USDC transfer
4. USDC sent on Arc Testnet
5. AI response returned
6. Real TX hash shown with Arc explorer link

## 🌍 Real World Use Case
- Users who need occasional AI without subscriptions
- AI agent-to-agent micropayments
- Pay-per-inference for the agentic economy

## Circle Product Feedback
**Why Arc + USDC:** Arc's native USDC gas model means users never need ETH. This makes onboarding dramatically simpler.

**What worked well:** Arc Testnet RPC was stable. USDC as native gas is a game-changer for UX.

**What could improve:** More MetaMask integration examples in Arc docs.

## 🏆 Track
Track 4 — Best Agentic Economy Experience on Arc
