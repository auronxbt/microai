export const knowledgeBase = [

  // ============================================================
  // ARC BLOCKCHAIN — CORE
  // ============================================================
  {
    id: "arc-1",
    keywords: ["arc", "arc blockchain", "what is arc", "arc l1", "layer 1", "arc chain"],
    title: "What is Arc, and what makes it different from other L1 blockchains?",
    content: `
Short Answer:
Arc is a Layer-1 blockchain designed specifically for fast, low-cost stablecoin payments using USDC as the native gas token. It is purpose-built for real-world financial transactions, not general-purpose dApps.

Explanation:
Arc is a next-generation Layer-1 blockchain focused on stablecoin settlement. Unlike Ethereum or Solana which support all kinds of apps, Arc is optimized purely for payments and financial infrastructure.

Key Points:
- Payments-first architecture — designed for money movement, not gaming or NFTs
- USDC is the native gas token — all fees paid in USDC, no ETH or native coin needed
- High-performance settlement — fast finality, low latency
- Compliance-aware — built for banks, fintechs, and enterprise payment systems
- Chain ID: 0x4cef52 (5042002) | RPC: rpc.testnet.arc.network | Explorer: testnet.arcscan.app
- Supports ERC-8004 (AI Agent Registration) and ERC-8183 (Agentic Commerce)
`
  },

  {
    id: "arc-2",
    keywords: ["arc testnet", "testnet setup", "arc rpc", "add arc", "metamask arc", "connect arc"],
    title: "How do I set up and connect to Arc Testnet?",
    content: `
Short Answer:
Add Arc Testnet to MetaMask using the RPC details below. Get free testnet USDC from the faucet and start building.

Setup Guide:
1. Open MetaMask → Networks → Add Network manually
2. Network Name: Arc Testnet
3. RPC URL: https://rpc.testnet.arc.network
4. Chain ID: 5042002 (hex: 0x4cef52)
5. Currency Symbol: USDC
6. Block Explorer: https://testnet.arcscan.app

Get Testnet USDC:
- Visit faucet.circle.com
- Select Arc Testnet
- Enter your wallet address
- Receive free testnet USDC

Key Points:
- All gas fees are paid in USDC — no ETH needed
- Use testnet.arcscan.app to verify transactions
- Arc Testnet is fully EVM-compatible
`
  },

  {
    id: "arc-3",
    keywords: ["arc usdc gas", "gas fee usdc", "pay gas usdc", "native usdc", "arc fee"],
    title: "How does USDC work as gas on Arc?",
    content: `
Short Answer:
On Arc, all transaction fees (gas) are paid in USDC — not in a native coin like ETH. This makes payments predictable and eliminates the need to hold a separate gas token.

Explanation:
Traditional blockchains require you to hold ETH, BNB, or SOL to pay gas fees. Arc eliminates this friction by using USDC directly as the gas currency.

Key Points:
- 1 USDC = $1 always — gas costs are stable and predictable
- No need to buy a separate native token
- Great for businesses and institutions that already hold USDC
- Gas fees are typically very low (fractions of a cent on testnet)
- USDC contract on Arc Testnet: 0x3600000000000000000000000000000000000000
`
  },

  {
    id: "arc-4",
    keywords: ["arc explorer", "arcscan", "view transaction", "tx hash arc", "check transaction"],
    title: "How do I check transactions on Arc blockchain?",
    content: `
Short Answer:
Use Arc's block explorer at testnet.arcscan.app to view all transactions, wallet balances, and smart contract activity.

Guide:
1. Go to https://testnet.arcscan.app
2. Paste your wallet address or transaction hash in the search bar
3. View transaction status, amount, gas used, and block confirmation

Key Points:
- Every transaction on Arc is publicly verifiable
- You can view: TX hash, sender, receiver, amount, gas fee, block number
- Smart contract interactions are also visible
- Testnet explorer URL: https://testnet.arcscan.app
`
  },

  // ============================================================
  // ERC-8004 — AI AGENT REGISTRATION
  // ============================================================
  {
    id: "erc8004-1",
    keywords: ["erc-8004", "erc 8004", "ai agent registration", "register agent", "agent identity", "agent id"],
    title: "What is ERC-8004 and how do I register an AI Agent on Arc?",
    content: `
Short Answer:
ERC-8004 is Arc's standard for registering AI agents on-chain. It gives each AI agent a unique on-chain identity (NFT-based) with metadata stored on IPFS.

What is ERC-8004:
ERC-8004 is the AI Agent Identity Registry standard on Arc blockchain. When you register an agent, you receive a unique Agent ID (NFT tokenId) that represents your AI agent on-chain.

Registration Steps:
1. Deploy or use the existing IdentityRegistry contract: 0x8004A818BFB912233c491871b3d84c89A494BD9e
2. Prepare your agent metadata JSON (name, description, capabilities, version, URL)
3. Upload metadata to IPFS (use Pinata or similar)
4. Call register(string metadataURI) function with your IPFS URI
5. Receive your Agent ID (NFT tokenId)

Key Points:
- IdentityRegistry Contract: 0x8004A818BFB912233c491871b3d84c89A494BD9e
- Each agent gets a unique NFT-based ID
- Metadata should include: name, description, capabilities, version, URL
- Compatible with Circle's developer-controlled wallets for programmatic registration
- Used by MicroAI Agent ID: 69168
`
  },

  {
    id: "erc8004-2",
    keywords: ["erc-8004 metadata", "agent metadata", "ipfs agent", "agent json", "agent capabilities"],
    title: "What should the ERC-8004 agent metadata JSON look like?",
    content: `
Short Answer:
Your agent metadata is a JSON file uploaded to IPFS. It describes your AI agent's identity, capabilities, and endpoint.

Example Metadata JSON:
{
  "name": "MicroAI Agent",
  "description": "Pay-per-use AI assistant on Arc Testnet. $0.001 USDC per question.",
  "agent_type": "ai_assistant",
  "capabilities": ["natural_language_qa", "web3_analysis", "code_generation"],
  "version": "1.0.0",
  "url": "https://your-dapp.vercel.app",
  "payment": {
    "cost_per_query": "0.001",
    "token": "USDC",
    "network": "ARC-TESTNET"
  }
}

Steps to Upload:
1. Create the JSON file
2. Go to pinata.cloud and sign up (free)
3. Upload the JSON file
4. Copy the CID (e.g., bafkrei...)
5. Use ipfs://YOUR_CID as the metadataURI when registering

Key Points:
- Always use ipfs:// prefix for the URI
- Include all capabilities your agent supports
- Keep the JSON valid and well-structured
`
  },

  // ============================================================
  // ERC-8183 — AGENTIC COMMERCE / JOB SETTLEMENT
  // ============================================================
  {
    id: "erc8183-1",
    keywords: ["erc-8183", "erc 8183", "job settlement", "agentic commerce", "job contract", "escrow arc"],
    title: "What is ERC-8183 and how does Job Settlement work on Arc?",
    content: `
Short Answer:
ERC-8183 is Arc's Agentic Commerce standard. It allows AI agents and humans to create on-chain jobs with escrow payment — the client pays, the provider delivers, and USDC settles automatically.

How It Works:
1. Client creates a job with: provider address, evaluator, deadline, description
2. Provider sets the budget (how much USDC they expect)
3. Client approves and funds the escrow with USDC
4. Provider submits the deliverable (as a bytes32 hash)
5. Evaluator/client marks job complete → USDC released to provider

Contract: 0x0747EEf0706327138c69792bF28Cd525089e4583

Job Status Flow:
Open → Funded → Submitted → Completed (or Rejected/Expired)

Key Points:
- AgenticCommerce Contract: 0x0747EEf0706327138c69792bF28Cd525089e4583
- Funds held in escrow until job completion
- Supports dispute resolution via evaluator role
- MicroAI Job ID example: 110278, Budget: 1 USDC
- Perfect for: AI query settlement, freelance work, automated payments
`
  },

  // ============================================================
  // ARC APP KIT
  // ============================================================
  {
    id: "arc-appkit-1",
    keywords: ["arc app kit", "app kit", "unified balance", "bridge arc", "swap arc", "cross chain arc"],
    title: "What is Arc App Kit and how do I use Unified Balance?",
    content: `
Short Answer:
Arc App Kit is a developer SDK that lets users bring USDC from any chain (Ethereum, Base, Solana) into Arc with a single click — no complex bridging needed.

What is App Kit:
Arc App Kit provides:
- Unified Balance: Aggregate USDC from multiple chains into one Arc balance
- Bridge: Move USDC from Ethereum/Base/Solana to Arc
- Swap: Exchange tokens within the Arc ecosystem
- Wallet Connect: Easy wallet integration for dApps

Installation:
npm install @circle-fin/app-kit

Key Use Cases:
- Allow users to pay in your dApp with USDC from any chain
- No need for users to manually bridge before using your app
- Supports: Ethereum, Base, Arbitrum, Solana → Arc

Key Points:
- Package: @circle-fin/app-kit
- Powered by Circle's CCTP (Cross-Chain Transfer Protocol)
- Works with MetaMask, Coinbase Wallet, and other EVM wallets
- Simplifies onboarding for users who have USDC on other chains
`
  },

  // ============================================================
  // ARC HOUSE & COMMUNITY
  // ============================================================
  {
    id: "arc-house-1",
    keywords: ["arc house", "arc community", "arc points", "arc builder", "arc grants", "arc office hours"],
    title: "What is Arc House and how can builders get recognized?",
    content: `
Short Answer:
Arc House is Arc's official community platform for builders. You earn points, get recognized, and can receive grants by building on Arc and engaging with the community.

How to Get Started:
1. Sign up at arc.house with your email
2. Complete your builder profile (GitHub, Twitter, LinkedIn)
3. Submit your project for ecosystem listing
4. Participate in Discord Office Hours
5. Earn points through: building, posting, engaging, sharing demos

Office Hours:
- Builders can present their projects live on Arc Discord
- Submit your project via the Office Hours Google Form
- Get direct feedback from Arc team and community

Key Points:
- Arc House URL: arc.house
- Discord: discord.gg/arc
- Office hours are held regularly for builders to demo projects
- Projects can get officially listed and recognized
- Arc team actively supports builders with feedback and resources
`
  },

  // ============================================================
  // CIRCLE — CORE
  // ============================================================
  {
    id: "circle-1",
    keywords: ["circle", "what is circle", "circle usdc", "circle company", "circle payments"],
    title: "What is Circle and what does it do?",
    content: `
Short Answer:
Circle is the company that issues USDC — the world's leading regulated digital dollar. Circle provides APIs, wallets, and infrastructure for businesses to use USDC in payments.

What Circle Does:
1. Issues USDC — a fully regulated, USD-backed stablecoin
2. Provides developer APIs for payments, wallets, and transfers
3. Operates CCTP — Cross-Chain Transfer Protocol for moving USDC across blockchains
4. Offers Circle Wallets — for both users and developers to hold/send USDC
5. Powers Arc's native USDC infrastructure

Circle Products:
- USDC: The stablecoin
- Circle Developer Console: console.circle.com
- Circle Wallets API: Create and manage wallets programmatically
- CCTP: Bridge USDC across chains natively
- Circle Payments API: Accept/send payments globally
- Circle Accounts API: Business accounts for USDC management

Key Points:
- Circle is a regulated US financial company
- USDC is fully backed 1:1 by US dollars
- Circle's infrastructure powers Arc's payment layer
- Developer access: console.circle.com
`
  },

  {
    id: "circle-2",
    keywords: ["usdc", "what is usdc", "usdc stablecoin", "dollar coin", "usdc backed"],
    title: "What is USDC and how is it different from other stablecoins?",
    content: `
Short Answer:
USDC (USD Coin) is a regulated digital dollar issued by Circle, fully backed 1:1 by US dollar reserves. It is the most trusted stablecoin for institutional and developer use.

Key Differences from Other Stablecoins:
1. Regulated: USDC is issued by Circle, a regulated US financial institution
2. Fully Backed: Every USDC is backed by $1 in cash or short-term US treasuries
3. Transparent: Monthly attestation reports by independent auditors
4. Multi-chain: Available on 15+ blockchains including Arc, Ethereum, Base, Solana
5. No algorithmic risk: Unlike UST/LUNA, USDC is fully collateralized

USDC on Arc:
- Contract: 0x3600000000000000000000000000000000000000
- Used as gas fee currency on Arc
- Native settlement token for all Arc transactions

Key Points:
- 1 USDC = exactly $1 USD always
- Supported by major exchanges: Coinbase, Binance, Kraken
- Best stablecoin for developer/business use due to regulation
- Circle publishes monthly reserve reports for full transparency
`
  },

  // ============================================================
  // CIRCLE WALLETS
  // ============================================================
  {
    id: "circle-wallets-1",
    keywords: ["circle wallets", "developer controlled wallet", "user controlled wallet", "circle wallet api", "programmatic wallet"],
    title: "What are Circle Developer-Controlled Wallets and how do I use them?",
    content: `
Short Answer:
Circle Developer-Controlled Wallets let you create and manage wallets programmatically on behalf of your users. You control the wallet using an Entity Secret — no MetaMask needed.

When to Use:
- When you want to manage wallets for users without requiring MetaMask
- For automated payment systems and AI agents
- For enterprise applications needing programmatic USDC transfers

Setup Steps:
1. Install SDK: npm install @circle-fin/developer-controlled-wallets
2. Create account at console.circle.com
3. Generate API Key
4. Create Entity Secret (32-byte hex)
5. Register Entity Secret in Circle Console
6. Create wallet sets and wallets via API

Code Example:
import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";

const client = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.CIRCLE_API_KEY,
  entitySecret: process.env.CIRCLE_ENTITY_SECRET,
});

const walletSet = await client.createWalletSet({ name: "My App" });
const wallets = await client.createWallets({
  blockchains: ["ARC-TESTNET"],
  count: 1,
  walletSetId: walletSet.data.walletSet.id,
  accountType: "SCA",
});

Key Points:
- Entity Secret must be kept secure — never share it
- SCA (Smart Contract Account) wallets are recommended for Arc
- Supports: create wallets, send transactions, check balances
- Recovery file (.dat) should be saved when creating Entity Secret
`
  },

  {
    id: "circle-wallets-2",
    keywords: ["entity secret", "circle entity secret", "circle api key", "circle credentials", "circle setup"],
    title: "What is a Circle Entity Secret and how do I set it up?",
    content: `
Short Answer:
The Entity Secret is a 32-byte security key required to make critical API calls with Circle Developer-Controlled Wallets. You generate it once and register it in Circle Console.

Setup Steps:
1. Install SDK: npm install @circle-fin/developer-controlled-wallets
2. Generate Entity Secret:
   import { generateEntitySecret } from "@circle-fin/developer-controlled-wallets";
   const secret = generateEntitySecret();
3. Register in Circle Console:
   - Go to console.circle.com → DEV CONTROLLED → Configurator → Entity Secret
   - Use registerEntitySecretCiphertext() function
   - Save the recovery_file.dat
4. Add to your .env file:
   CIRCLE_API_KEY=your_api_key
   CIRCLE_ENTITY_SECRET=your_32_byte_secret

Key Points:
- Never share your Entity Secret — treat it like a private key
- Save the recovery_file.dat securely — needed if you lose the secret
- Entity Secret is encrypted before sending to Circle's servers
- One Entity Secret per Circle account (can be rotated)
`
  },

  // ============================================================
  // CCTP — CROSS-CHAIN TRANSFER PROTOCOL
  // ============================================================
  {
    id: "cctp-1",
    keywords: ["cctp", "cross chain transfer", "bridge usdc", "usdc bridge", "circle bridge", "multi chain usdc"],
    title: "What is Circle CCTP and how does cross-chain USDC transfer work?",
    content: `
Short Answer:
CCTP (Cross-Chain Transfer Protocol) is Circle's native protocol for moving USDC between blockchains without wrapping. It burns USDC on the source chain and mints native USDC on the destination chain.

How CCTP Works:
1. User burns USDC on source chain (e.g., Ethereum)
2. Circle's attestation service verifies the burn
3. Native USDC is minted on the destination chain (e.g., Arc)
4. No wrapped tokens — always real, native USDC

Supported Chains (CCTP):
- Ethereum ↔ Arc
- Base ↔ Arc
- Arbitrum ↔ Arc
- Solana ↔ Arc
- Polygon ↔ Arc
- And more

Benefits over Traditional Bridges:
- No wrapped tokens (no bridging risk)
- Native USDC on every chain
- Faster and cheaper than wrapped bridges
- Backed by Circle's security

Key Points:
- CCTP is the safest way to move USDC across chains
- Used by Arc App Kit under the hood
- No intermediary tokens — always 1:1 USDC
- Developer docs: developers.circle.com/stablecoins/cctp
`
  },

  // ============================================================
  // DEVELOPERS — DEPLOYING ON ARC
  // ============================================================
  {
    id: "dev-1",
    keywords: ["deploy contract arc", "hardhat arc", "smart contract arc", "deploy on arc", "arc deployment"],
    title: "How do I deploy a smart contract on Arc Testnet using Hardhat?",
    content: `
Short Answer:
Arc is EVM-compatible, so you can deploy Solidity contracts using Hardhat or Foundry with Arc's testnet RPC.

Hardhat Setup:
1. Install Hardhat: npm install --save-dev hardhat
2. Create hardhat.config.ts:

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    arcTestnet: {
      url: "https://rpc.testnet.arc.network",
      chainId: 5042002,
      accounts: [process.env.PRIVATE_KEY!],
    }
  }
};
export default config;

3. Write your contract in contracts/
4. Deploy:
   npx hardhat run scripts/deploy.ts --network arcTestnet

5. Verify on Explorer:
   https://testnet.arcscan.app

Key Points:
- Arc is fully EVM-compatible — standard Solidity works
- Chain ID: 5042002 | RPC: https://rpc.testnet.arc.network
- Gas is paid in USDC — make sure your deployer wallet has testnet USDC
- Get testnet USDC at faucet.circle.com
- Use Circle Contracts SDK for USDC-native contract patterns
`
  },

  {
    id: "dev-2",
    keywords: ["circle contracts sdk", "deploy usdc contract", "circle sdk contract", "programmable wallet contract"],
    title: "How do I deploy contracts using Circle Contracts SDK?",
    content: `
Short Answer:
Circle Contracts SDK lets you deploy and interact with smart contracts on Arc using your Circle Developer-Controlled Wallets — no private key management needed.

Steps:
1. Set up Circle Developer-Controlled Wallets (see Entity Secret guide)
2. Use createContractExecutionTransaction to call contract functions:

const tx = await client.createContractExecutionTransaction({
  walletAddress: yourWalletAddress,
  blockchain: "ARC-TESTNET",
  contractAddress: "0xYourContractAddress",
  abiFunctionSignature: "transfer(address,uint256)",
  abiParameters: [receiverAddress, "1000000"],
  fee: { type: "level", config: { feeLevel: "MEDIUM" } },
});

Key Points:
- No private keys needed — Circle manages signing
- Supports any EVM smart contract
- Transaction status can be polled via getTransaction()
- Combine with ERC-8004 and ERC-8183 for full agentic apps
`
  },

  {
    id: "dev-3",
    keywords: ["wagmi arc", "viem arc", "frontend arc", "web3 frontend", "arc dapp", "nextjs arc", "react arc"],
    title: "How do I build a frontend dApp that connects to Arc Testnet?",
    content: `
Short Answer:
Use wagmi + viem with Arc Testnet configuration to build a React/Next.js frontend that connects to Arc.

Stack:
- Next.js or Vite + React
- wagmi for wallet connection
- viem for blockchain interaction
- Tailwind CSS for styling

Arc Testnet Config (viem):
import { defineChain } from "viem";

export const arcTestnet = defineChain({
  id: 5042002,
  name: "Arc Testnet",
  network: "arc-testnet",
  nativeCurrency: { name: "USDC", symbol: "USDC", decimals: 6 },
  rpcUrls: {
    default: { http: ["https://rpc.testnet.arc.network"] }
  },
  blockExplorers: {
    default: { name: "ArcScan", url: "https://testnet.arcscan.app" }
  },
});

Send USDC Payment (ethers/viem):
// USDC transfer function selector: 0xa9059cbb
const amount = (1000).toString(16).padStart(64, "0"); // 0.001 USDC
const data = "0xa9059cbb" + receiverAddress.slice(2).padStart(64, "0") + amount;

Key Points:
- Arc is EVM-compatible — all standard web3 libraries work
- USDC Contract: 0x3600000000000000000000000000000000000000
- Always switch user to Arc Testnet chain before transactions
- Use wallet_addEthereumChain if chain not found in MetaMask
`
  },

  // ============================================================
  // MARKETERS & PROJECT TEAMS
  // ============================================================
  {
    id: "marketing-1",
    keywords: ["arc marketing", "promote arc project", "arc community growth", "arc twitter", "arc social media"],
    title: "How can I market my project built on Arc?",
    content: `
Short Answer:
Build in public, engage with Arc's community channels, and leverage Arc House for official recognition. The Arc ecosystem actively promotes builders who share their work.

Key Channels:
1. Arc Discord — #user-made-things channel for project demos
2. Arc House — Official community platform, earn points for activity
3. Twitter/X — Tag @arc_xbt and use #ArcBlockchain hashtag
4. YouTube — Demo videos showing your dApp in action
5. LinkedIn — Professional posts about your build

Strategies That Work:
- Submit to Arc Office Hours (Discord presentation)
- Post demo videos showing real transactions on Arc
- Write technical blogs about building on Arc
- Engage with Arc team members on Twitter
- Submit PR to awesome-arc GitHub repository for ecosystem listing

Content Ideas:
- "How I built [your dApp] on Arc in X days"
- "Why I chose Arc for stablecoin payments"
- Demo videos of your app making real USDC transactions
- Tutorials helping other developers build on Arc

Key Points:
- Arc team actively features builders on social media
- Office Hours give direct access to Arc team for feedback
- Ecosystem listing increases credibility and visibility
- Arc House points can lead to grant opportunities
`
  },

  {
    id: "marketing-2",
    keywords: ["arc hackathon", "arc grants", "circle grants", "arc funding", "web3 funding", "stablecoin hackathon"],
    title: "Are there grants or hackathons for building on Arc and Circle?",
    content: `
Short Answer:
Yes! Arc and Circle run hackathons and grant programs for builders. The Stablecoin Commerce Stack Challenge is a key example.

Known Programs:
1. Stablecoin Commerce Stack Challenge (Circle + Arc)
   - Multiple tracks including Agentic Economy
   - Cash prizes for best dApps
   - Submit via Circle's developer platform

2. Arc Builder Grants
   - Apply through Arc House
   - For projects with real traction and ecosystem value

3. Circle Developer Grants
   - Apply at developers.circle.com
   - For startups building with USDC and Circle APIs

How to Maximize Chances:
- Build a working dApp (not just a concept)
- Make real transactions on testnet
- Document your build publicly (YouTube, Twitter)
- Engage with Arc and Circle communities before applying
- Use ERC-8004, ERC-8183, and Circle SDK for extra points

Key Points:
- Real working demos > concepts in hackathon judging
- Community engagement increases visibility to judges
- Arc Office Hours is a great way to get noticed
- Circle tracks: Payments, Identity, Agentic Economy, Infrastructure
`
  },

  // ============================================================
  // BUYERS, SELLERS & TRADERS
  // ============================================================
  {
    id: "trading-1",
    keywords: ["arc trading", "usdc trading", "arc swap", "arc liquidity", "arc dex", "swap usdc"],
    title: "How do I swap or trade USDC on Arc?",
    content: `
Short Answer:
Arc supports USDC swaps and liquidity operations through Arc App Kit and integrated DEX protocols. You can also move USDC from other chains using CCTP.

Options for Trading/Swapping:
1. Arc App Kit — Unified Balance lets you aggregate and use USDC across chains
2. CCTP Bridge — Move USDC from Ethereum/Base/Solana to Arc for use
3. Arc-native DEX protocols — DEX projects building on Arc testnet

How to Move USDC to Arc:
1. Get testnet USDC at faucet.circle.com
2. Or bridge from another testnet using CCTP
3. Connect wallet to Arc Testnet (Chain ID: 5042002)
4. USDC appears in your wallet automatically

Key Points:
- USDC is the only currency on Arc — no native coin needed
- Arc's architecture is optimized for stablecoin liquidity
- Arc App Kit simplifies cross-chain USDC aggregation
- Testnet USDC has no real value — use it freely for testing
`
  },

  {
    id: "trading-2",
    keywords: ["usdc payment", "send usdc", "receive usdc", "usdc transaction", "pay usdc arc"],
    title: "How do I send and receive USDC payments on Arc?",
    content: `
Short Answer:
Sending USDC on Arc is simple — use MetaMask or any EVM wallet. The USDC contract address on Arc Testnet is 0x3600000000000000000000000000000000000000.

How to Send USDC on Arc:
1. Add Arc Testnet to MetaMask (Chain ID: 5042002)
2. Add USDC token: 0x3600000000000000000000000000000000000000
3. Click Send, enter receiver address and amount
4. Confirm transaction — gas is deducted in USDC

Programmatic USDC Transfer (for developers):
const amount = "1000"; // 0.001 USDC (6 decimals)
const data = "0xa9059cbb" +
  receiverAddress.slice(2).padStart(64, "0") +
  parseInt(amount).toString(16).padStart(64, "0");

await ethereum.request({
  method: "eth_sendTransaction",
  params: [{ from: senderAddress, to: USDC_CONTRACT, data }]
});

Key Points:
- USDC has 6 decimal places (1 USDC = 1,000,000 units)
- Gas fees are also paid in USDC
- Transactions confirm in seconds on Arc
- All transactions visible on testnet.arcscan.app
`
  },

  // ============================================================
  // NEW USERS & COMMUNITY
  // ============================================================
  {
    id: "newuser-1",
    keywords: ["getting started arc", "beginner arc", "new to arc", "start arc", "first steps arc", "how to start"],
    title: "I'm new to Arc and Circle — where do I start?",
    content: `
Short Answer:
Start by setting up MetaMask with Arc Testnet, getting free testnet USDC from the faucet, and exploring the ecosystem. Everything on testnet is free!

Step-by-Step for Beginners:
1. Install MetaMask browser extension (metamask.io)
2. Add Arc Testnet:
   - RPC: https://rpc.testnet.arc.network
   - Chain ID: 5042002
   - Symbol: USDC
   - Explorer: https://testnet.arcscan.app
3. Get free testnet USDC at faucet.circle.com
4. Try sending USDC to another address
5. View your transaction on testnet.arcscan.app
6. Join Arc Discord: discord.gg/arc
7. Sign up on Arc House: arc.house

Resources:
- Arc Docs: docs.arc.io
- Circle Docs: developers.circle.com
- Arc Discord: discord.gg/arc
- Faucet: faucet.circle.com
- Explorer: testnet.arcscan.app

Key Points:
- Testnet is completely free — no real money involved
- Arc is EVM-compatible — if you know Ethereum, you know Arc
- The community is very welcoming to newcomers
- Circle has extensive tutorials and documentation
`
  },

  {
    id: "newuser-2",
    keywords: ["metamask setup", "wallet setup", "crypto wallet beginner", "install metamask", "web3 wallet"],
    title: "How do I set up a Web3 wallet for Arc?",
    content: `
Short Answer:
Install MetaMask and add Arc Testnet network. MetaMask is the most compatible wallet for Arc and all EVM chains.

Setup Guide:
1. Install MetaMask:
   - Go to metamask.io
   - Install the browser extension (Chrome, Firefox, Brave)
   - Create a new wallet and SAVE your seed phrase safely

2. Add Arc Testnet to MetaMask:
   - Click the network selector (top center)
   - Click "Add Network" → "Add Network Manually"
   - Fill in:
     Network Name: Arc Testnet
     RPC URL: https://rpc.testnet.arc.network
     Chain ID: 5042002
     Symbol: USDC
     Block Explorer: https://testnet.arcscan.app
   - Click Save

3. Add USDC token:
   - Click "Import Tokens"
   - Token Address: 0x3600000000000000000000000000000000000000
   - Symbol: USDC, Decimals: 6

4. Get testnet USDC:
   - Visit faucet.circle.com
   - Select Arc Testnet and enter your address

Key Points:
- NEVER share your seed phrase with anyone
- Testnet wallets can be the same as mainnet wallets
- MetaMask works on mobile and desktop
- Multiple wallets can be added to MetaMask
`
  },

  {
    id: "newuser-3",
    keywords: ["arc faucet", "free usdc", "testnet usdc", "get usdc testnet", "faucet circle"],
    title: "How do I get free testnet USDC on Arc?",
    content: `
Short Answer:
Get free testnet USDC from Circle's faucet at faucet.circle.com. Select Arc Testnet and enter your wallet address — USDC arrives in seconds.

Step-by-Step:
1. Go to faucet.circle.com
2. Select Network: ARC Testnet
3. Enter your wallet address (from MetaMask)
4. Click "Send" or "Request"
5. Wait 10-30 seconds for USDC to arrive
6. Check your balance on testnet.arcscan.app

Key Points:
- Testnet USDC has no real value — it's for testing only
- You can request multiple times if needed
- Faucet gives you enough to test transactions and dApps
- No account or signup required for the faucet
- USDC Contract: 0x3600000000000000000000000000000000000000
`
  },

  // ============================================================
  // TROUBLESHOOTING
  // ============================================================
  {
    id: "troubleshoot-1",
    keywords: ["transaction failed", "transaction error", "metamask error", "arc transaction failed", "usdc failed"],
    title: "Why is my transaction failing on Arc Testnet?",
    content: `
Short Answer:
Most transaction failures on Arc are due to insufficient USDC balance (for gas), wrong network, or incorrect contract address.

Common Issues and Fixes:

1. Insufficient USDC for gas:
   Fix: Get more testnet USDC from faucet.circle.com

2. Wrong network selected:
   Fix: Switch MetaMask to Arc Testnet (Chain ID: 5042002)

3. Wrong USDC contract address:
   Fix: Use 0x3600000000000000000000000000000000000000

4. Transaction rejected (user cancelled):
   Fix: Click Confirm in MetaMask when the popup appears

5. RPC error / connection issue:
   Fix: Check RPC URL is https://rpc.testnet.arc.network

6. Gas limit too low:
   Fix: Set gas limit to at least 0x186A0 (100,000) for USDC transfers

Debugging Steps:
1. Check balance on testnet.arcscan.app
2. Verify you're on Arc Testnet (Chain ID: 5042002)
3. Check the USDC contract address
4. Try increasing gas limit
5. Check Arc Discord for any network issues

Key Points:
- All gas on Arc is paid in USDC — you need USDC to send USDC
- Arc Testnet is occasionally updated — check Discord for status
- MetaMask sometimes needs network reset: Settings → Advanced → Reset Account
`
  },

  {
    id: "troubleshoot-2",
    keywords: ["groq api", "api error", "ai error", "chat error", "microai error", "response error"],
    title: "Why is MicroAI not responding or showing an error?",
    content: `
Short Answer:
MicroAI errors are usually caused by the GROQ API key being invalid, rate limited, or not set in Vercel environment variables.

Common Fixes:

1. GROQ API key not set:
   Fix: Add GROQ_API_KEY to Vercel → Settings → Environment Variables

2. Rate limit exceeded:
   Fix: Wait a moment and try again, or use multiple API keys

3. Transaction failed before response:
   Fix: Make sure you have USDC and confirmed the MetaMask transaction

4. Network error:
   Fix: Check internet connection and Arc RPC status

For Developers:
- Get free Groq API key at console.groq.com
- Recommended model: llama-3.1-8b-instant (fast and free)
- Set environment variable: GROQ_API_KEY=your_key
- Redeploy after adding environment variables

Key Points:
- Groq is free with generous rate limits
- Always add API keys to Vercel env vars, not just .env.local
- Redeploy after changing environment variables on Vercel
`
  },

  // ============================================================
  // MICROAI SPECIFIC
  // ============================================================
  {
    id: "microai-1",
    keywords: ["microai", "what is microai", "microai dapp", "arc ai chatbot", "pay per question"],
    title: "What is MicroAI and how does it work?",
    content: `
Short Answer:
MicroAI is a pay-per-use AI knowledge hub built on Arc Testnet. Users pay $0.001 USDC per question and get instant answers about Arc Blockchain and Circle ecosystem.

How MicroAI Works:
1. User connects their MetaMask wallet to Arc Testnet
2. User types a question about Arc or Circle
3. MetaMask popup appears asking to approve 0.001 USDC payment
4. User confirms → USDC sent instantly on Arc blockchain
5. AI generates expert answer using Arc & Circle knowledge base
6. Transaction hash (TX proof) is shown with every answer

Technical Stack:
- Frontend: Next.js 15 + Tailwind CSS
- AI: Groq API with Llama 3.1 8B
- Blockchain: Arc Testnet (Chain ID: 5042002)
- Payment: USDC (0x3600000000000000000000000000000000000000)
- Receiver: 0x9a318CD2BC533B5B2e96F7f5b499738732492b15
- Deployed: microai-tan.vercel.app
- GitHub: github.com/sahmedonchain/microai

Arc Integration:
- ERC-8004 Agent ID: 69168
- ERC-8183 Job ID: 110278
- BuildOrbit YouTube: youtube.com/@buildorbitofficial

Key Points:
- No subscription — pay only for what you ask
- Every answer has an on-chain transaction proof
- Built by BuildOrbit (Sahmed Zayan) for Arc ecosystem
- Open source on GitHub
`
  },

];