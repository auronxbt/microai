# μ MicroAI — Pay Per Question AI on Arc Testnet

> The first pay-per-use AI with anime voice companion, powered by real USDC micropayments on Arc Testnet.

---

## 🎯 Problem

Every AI tool today charges monthly subscriptions — ChatGPT, Claude, Gemini all $20/month. Users pay even when they use it once a week. This model doesn't work for:

- Casual users who ask 5 questions a week
- Developers who need occasional AI help
- AI agents that need to autonomously pay for compute

---

## 💡 Solution

MicroAI charges **$0.001 USDC per AI response** — nothing more, nothing less.

Ask a question → approve $0.001 USDC on Arc Testnet → get AI response instantly. Every payment is a real on-chain transaction, verifiable on arcscan.

---

## ✨ Key Features

- **Pay-per-use** — $0.001 USDC per question, zero subscription
- **Aria** — Anime-style AI voice companion with personality and mood animations
- **Real on-chain payments** — Every TX verifiable on Arc blockchain explorer
- **Arc-native** — USDC as gas token, no ETH needed
- **Any Web3 wallet** — No account creation required
- **Mobile responsive** — Works on all devices
---

## 🤖 Meet Aria

Aria is an anime-style AI voice companion built into MicroAI. She:

- Welcomes users with voice when the app opens
- Guides users through the Arc Testnet payment flow
- Speaks every AI response out loud after each transaction
- Has deep knowledge of Arc Chain, USDC, Circle, and CCTP
- Has mood animations — excited, thinking, happy states

Aria makes blockchain payments feel as natural as talking to a friend.

---

## ✅ Live Demo

- **App:** https://microai-tan.vercel.app
- **Real TX on Arc:** https://testnet.arcscan.app/tx/0x45edd50186498fd7b62b274bb25f4c7540fcc441ce71e92a57ebf5218dace2ce
- **GitHub:** https://github.com/sahmedonchain/microai

---

## 🔧 Circle Tools Used

- **USDC** — Native payment token and gas token on Arc Testnet
- **Arc Testnet** — All transactions settled on-chain with USDC fees (no ETH needed)

---

## 🏗️ Architecture

User → Connect Wallet (Arc Testnet) → Type Question → MetaMask Popup: Approve 0.001 USDC → USDC Transfer on Arc (0x3600000000000000000000000000000000000000) → Payment Confirmed → Groq AI API (Llama 3.1) → AI Response + TX Hash → Aria speaks the answer → User receives response + verifiable TX link
---

## 🌍 Real World Use Cases

- Casual users who need occasional AI without subscriptions
- Web3 developers who need quick AI answers during development
- AI agent-to-agent micropayments — one AI paying another for compute
- Pay-per-inference infrastructure for the agentic economy

---

## Circle Product Feedback

### Why I chose USDC + Arc

Arc's native USDC gas model was the core reason MicroAI's micropayment UX became possible. On Ethereum, users need ETH for gas fees — creating friction for non-crypto users. On Arc, USDC handles everything: payments AND gas. This allowed me to build a genuinely simple experience where users only need one token.

### What worked well

- Arc Testnet RPC was stable, fast, and reliable throughout development
- USDC as native gas token eliminated ETH management entirely — a genuine UX breakthrough
- Transaction finality was deterministic and predictable
- arcscan.app made it easy to verify every transaction
- Circle faucet with Arc Testnet support was straightforward to use

### What could be improved

- More MetaMask-specific documentation for Arc chain switching
- Clearer documentation on USDC contract addresses per network
- Higher faucet limits for payment-heavy application testing
- More starter templates for pay-per-use AI patterns on Arc

### Recommendations

- Add Circle Wallets embedded SDK examples for Arc
- Nanopayments documentation with real-world AI examples
- A dedicated AI + Arc starter template would lower the barrier for developers

---

## 🏆 Hackathon Submission

**Challenge:** Stablecoin Commerce Stack Challenge by Circle and Arc

**Track:** Track 4 — Best Agentic Economy Experience on Arc

**Why Track 4:** MicroAI directly implements the "Pay-per-inference AI agents that pay for each model response in real time" use case. Every AI response triggers a real USDC microtransaction on Arc Testnet — demonstrating autonomous, programmable, sub-cent payments for the agentic economy.

---

*Built with love on Arc Testnet*