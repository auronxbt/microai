export const knowledgeBase = [

  // ============================================================
  // A. ARC BASICS
  // ============================================================
  {
    id: "arc-basics-1",
    keywords: ["evm compatible", "solidity arc", "ethereum compatible", "existing code arc", "evm arc"],
    title: "Is Arc EVM-compatible? Can I use my existing Solidity code?",
    content: `
SHORT_ANSWER:
Yes. Arc is fully EVM-compatible. Your existing Solidity contracts, Hardhat/Foundry configs, and Ethereum libraries work on Arc with minimal changes. The main difference is gas is paid in USDC, not ETH.

EXPLANATION:
Arc is built as an EVM-compatible Layer-1 blockchain. This means:
- All standard Solidity versions (including 0.8.x) work
- Hardhat, Foundry, Remix, Truffle all work
- ethers.js, viem, wagmi all work
- ERC-20, ERC-721, ERC-1155 standards all work
- OpenZeppelin contracts work without modification
The key difference: USDC replaces ETH as the gas token. You must have USDC to pay transaction fees — no ETH needed.

GUIDE:
Step 1: Change your RPC to https://rpc.testnet.arc.network
Step 2: Change chain ID to 5042002
Step 3: Make sure your deployer wallet has testnet USDC (for gas)
Step 4: Deploy exactly as you would on Ethereum

KEY DIFFERENCES FROM ETHEREUM:
- Gas paid in USDC (not ETH)
- Sub-second deterministic finality (no waiting for confirmations)
- No reorg risk
- USDC has 6 decimals for ERC-20, 18 decimals for native gas

SOURCE:
docs.arc.io/arc/references/evm-compatibility.md
`
  },

  {
    id: "arc-basics-2",
    keywords: ["hardhat arc", "foundry arc", "remix arc", "tools arc", "developer tools arc"],
    title: "What developer tools work on Arc?",
    content: `
SHORT_ANSWER:
All standard Ethereum developer tools work on Arc — Hardhat, Foundry, Remix, Truffle, ethers.js, viem, wagmi, and OpenZeppelin.

FULL LIST OF SUPPORTED TOOLS:
- Hardhat (recommended for most projects)
- Foundry (fastest for testing)
- Remix IDE (browser-based, good for quick deploys)
- Truffle (legacy support)
- ethers.js v5 and v6
- viem (modern, recommended)
- wagmi (React hooks for wallet connection)
- OpenZeppelin Contracts
- Chainlink (oracle support)
- Thirdweb
- Alchemy (RPC provider)

GUIDE (Hardhat setup):
Step 1: npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
Step 2: In hardhat.config.ts, add:
networks: {
  arcTestnet: {
    url: "https://rpc.testnet.arc.network",
    chainId: 5042002,
    accounts: [process.env.PRIVATE_KEY],
  }
}
Step 3: npx hardhat run scripts/deploy.ts --network arcTestnet

SOURCE:
docs.arc.io/arc/tutorials/deploy-on-arc.md
`
  },

  {
    id: "arc-basics-3",
    keywords: ["arc vs ethereum", "arc vs l2", "arc vs base", "arc vs arbitrum", "why arc", "arc different"],
    title: "How is Arc different from Ethereum Layer-2s like Base or Arbitrum?",
    content: `
SHORT_ANSWER:
Arc is a standalone Layer-1 blockchain, not a Layer-2. It's purpose-built for stablecoin payments with USDC as native gas, sub-second finality, and direct Circle integration — unlike L2s which inherit Ethereum's security and token model.

KEY DIFFERENCES:
| Feature | Arc | Base/Arbitrum (L2) |
|---|---|---|
| Type | L1 blockchain | L2 on Ethereum |
| Gas token | USDC (stable) | ETH (volatile) |
| Finality | Sub-second, deterministic | Seconds to minutes |
| Fee stability | Stable, predictable | Volatile with ETH price |
| Purpose | Stablecoin payments | General-purpose |
| Circle integration | Native, deep | Third-party |
| Reorg risk | None (BFT consensus) | Low but possible |

WHY BUILD ON ARC INSTEAD:
- No ETH price exposure for gas costs
- Predictable fees (bounded at ~$0.01/tx)
- Faster finality for payment apps
- Native USDC integration
- Designed for financial apps, not gaming/NFTs

SOURCE:
docs.arc.io/arc/concepts/system-overview.md
`
  },

  {
    id: "arc-basics-4",
    keywords: ["malachite", "consensus arc", "arc consensus", "bft arc", "tendermint arc"],
    title: "What is Arc's consensus mechanism? What is Malachite?",
    content: `
SHORT_ANSWER:
Arc uses Malachite — a Rust implementation of Tendermint-style Byzantine Fault Tolerant (BFT) consensus. It achieves deterministic finality as soon as 2/3 of validators commit a block, typically in under 1 second.

EXPLANATION:
Malachite is Arc's high-performance consensus engine:
- Based on Tendermint BFT algorithm
- Written in Rust for performance
- Proof-of-Authority at launch (permissioned validator set)
- Finality is deterministic — no probabilistic confirmation needed
- Open source on GitHub under Circle's organization

HOW FINALITY WORKS:
1. Block is proposed by a validator
2. Validators vote in two rounds (prevote + precommit)
3. When 2/3+ validators precommit → block is FINAL
4. No rollbacks, no reorgs possible after finality

PRACTICAL IMPACT:
- Your dApp can treat a transaction as final immediately
- No need to wait for 6 confirmations like Ethereum
- Eliminates reorg risk for payment applications

SOURCE:
docs.arc.io/arc/concepts/deterministic-finality.md
`
  },

  {
    id: "arc-basics-5",
    keywords: ["arc tps", "arc speed", "block time arc", "transactions per second", "arc performance"],
    title: "What is Arc's TPS and block time?",
    content: `
SHORT_ANSWER:
Arc supports 20 million gas/second throughput with sub-second block times. Finality is deterministic and instant — no waiting for confirmations.

SPECS:
- Gas throughput: 20M gas/second
- Finality: Sub-second (deterministic)
- Block time: Sub-second
- Base fee target: ~$0.01 per transaction
- Max base fee: 1e-3 USDC (~$0.001 per gas unit)

NOTE:
Arc testnet has processed over 244M transactions as of May 2026. Mainnet specs may differ slightly. Performance is optimized for financial transactions, not gaming or high-frequency NFT minting.

SOURCE:
docs.arc.io/arc/references/gas-and-fees.md
`
  },

  {
    id: "arc-basics-6",
    keywords: ["account abstraction arc", "aa arc", "smart account arc", "paymaster arc"],
    title: "Does Arc support account abstraction?",
    content: `
SHORT_ANSWER:
Yes. Arc supports account abstraction (AA) through third-party AA providers and paymasters listed in the Arc documentation.

EXPLANATION:
Account abstraction on Arc allows:
- Smart contract wallets instead of EOAs
- Gasless transactions via paymasters
- Batch transactions
- Social recovery wallets
- Custom signing logic

Arc uses SCA (Smart Contract Account) wallets in Circle's developer-controlled wallet system. These are AA-compatible wallets.

GUIDE:
Step 1: Check AA providers at docs.arc.io/arc/tools/account-abstraction.md
Step 2: Choose an AA provider compatible with Arc
Step 3: Deploy your AA wallet contract
Step 4: Use paymaster to sponsor gas if needed

SOURCE:
docs.arc.io/arc/tools/account-abstraction.md
`
  },

  // ============================================================
  // B. SETUP & CONFIGURATION
  // ============================================================
  {
    id: "setup-1",
    keywords: ["add arc testnet metamask", "metamask arc setup", "connect arc metamask", "arc network metamask"],
    title: "How do I add Arc Testnet to MetaMask?",
    content: `
SHORT_ANSWER:
Open MetaMask → Settings → Networks → Add network manually → enter the details below → Save.

NETWORK DETAILS:
- Network name: Arc Testnet
- New RPC URL: https://rpc.testnet.arc.network
- Chain ID: 5042002
- Currency symbol: USDC
- Block Explorer URL: https://testnet.arcscan.app

STEP-BY-STEP:
Step 1: Open MetaMask browser extension
Step 2: Click the network selector at the top center
Step 3: Click "Add Network"
Step 4: Click "Add a network manually"
Step 5: Fill in the fields above
Step 6: Click "Save"
Step 7: Click "Switch to Arc Testnet"

PROGRAMMATIC (for dApps):
await window.ethereum.request({
  method: "wallet_addEthereumChain",
  params: [{
    chainId: "0x4cef52",
    chainName: "Arc Testnet",
    nativeCurrency: { name: "USDC", symbol: "USDC", decimals: 6 },
    rpcUrls: ["https://rpc.testnet.arc.network"],
    blockExplorerUrls: ["https://testnet.arcscan.app"],
  }],
});

NOTE: MetaMask may show balance as "ETH" since it doesn't support custom gas tokens fully, but the underlying token is USDC. Use the ERC-20 interface to read actual USDC balance.

SOURCE:
docs.arc.io/arc/references/connect-to-arc.md
`
  },

  {
    id: "setup-2",
    keywords: ["arc rpc url", "rpc endpoint arc", "arc rpc", "arc endpoint"],
    title: "What is Arc Testnet's RPC URL and network details?",
    content: `
SHORT_ANSWER:
RPC URL: https://rpc.testnet.arc.network | Chain ID: 5042002 (hex: 0x4cef52) | Explorer: https://testnet.arcscan.app

COMPLETE NETWORK DETAILS:
- Network name: Arc Testnet
- RPC URL: https://rpc.testnet.arc.network
- Chain ID: 5042002 (hex: 0x4cef52)
- Currency symbol: USDC
- Block Explorer: https://testnet.arcscan.app
- Faucet: https://faucet.circle.com

CONTRACT ADDRESSES (Testnet):
- USDC: 0x3600000000000000000000000000000000000000
- EURC: 0x89B50855Aa3bE2F677cD6303Cec089B5F319D72a
- CCTP TokenMessengerV2: 0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA
- CCTP MessageTransmitterV2: 0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275
- Gateway: 0x0077777d7EBA4688BDeF3E311b846F25870A19B9
- ERC-8004 IdentityRegistry: 0x8004A818BFB912233c491871b3d84c89A494BD9e
- ERC-8183 AgenticCommerce: 0x0747EEf0706327138c69792bF28Cd525089e4583

SOURCE:
docs.arc.io/arc/references/connect-to-arc.md
docs.arc.io/arc/references/contract-addresses.md
`
  },

  {
    id: "setup-3",
    keywords: ["testnet usdc faucet", "get usdc testnet", "free usdc arc", "arc faucet", "faucet circle"],
    title: "How do I get testnet USDC on Arc?",
    content: `
SHORT_ANSWER:
Go to faucet.circle.com → Select Arc Testnet → Enter your wallet address → Click Send. USDC arrives in seconds.

STEP-BY-STEP:
Step 1: Go to https://faucet.circle.com
Step 2: Select network: ARC Testnet
Step 3: Select token: USDC
Step 4: Enter your wallet address
Step 5: Click "Send"
Step 6: Wait 10-30 seconds
Step 7: Check balance at https://testnet.arcscan.app

ALSO AVAILABLE:
- EURC testnet tokens from same faucet
- USYC testnet (requires allowlisting via Circle Support)

KEY POINTS:
- Testnet USDC has no real monetary value
- You can request multiple times
- USDC required for gas fees on Arc
- USDC Contract: 0x3600000000000000000000000000000000000000

SOURCE:
faucet.circle.com
docs.arc.io/arc/references/contract-addresses.md
`
  },

  {
    id: "setup-4",
    keywords: ["hardhat config arc", "hardhat arc setup", "deploy hardhat arc", "hardhat testnet arc"],
    title: "How do I set up Hardhat for Arc?",
    content: `
SHORT_ANSWER:
Install Hardhat, add Arc Testnet network config with RPC and Chain ID, then deploy with --network arcTestnet flag.

COMPLETE SETUP:
Step 1: Install dependencies
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox dotenv

Step 2: Create .env file
PRIVATE_KEY=your_wallet_private_key

Step 3: Create hardhat.config.ts
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    arcTestnet: {
      url: "https://rpc.testnet.arc.network",
      chainId: 5042002,
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
};
export default config;

Step 4: Write your contract in contracts/MyContract.sol

Step 5: Write deploy script in scripts/deploy.ts
import { ethers } from "hardhat";
async function main() {
  const Contract = await ethers.getContractFactory("MyContract");
  const contract = await Contract.deploy();
  await contract.waitForDeployment();
  console.log("Deployed to:", await contract.getAddress());
}
main().catch(console.error);

Step 6: Deploy
npx hardhat run scripts/deploy.ts --network arcTestnet

Step 7: View on explorer
https://testnet.arcscan.app/address/YOUR_CONTRACT_ADDRESS

KEY POINTS:
- Deployer wallet must have testnet USDC for gas
- Gas is automatically paid in USDC
- No ETH needed

SOURCE:
docs.arc.io/arc/tutorials/deploy-on-arc.md
`
  },

  {
    id: "setup-5",
    keywords: ["foundry arc", "forge arc", "foundry setup arc", "cast arc"],
    title: "How do I set up Foundry for Arc?",
    content: `
SHORT_ANSWER:
Install Foundry, create foundry.toml with Arc RPC, then use forge deploy with Arc's RPC URL.

SETUP:
Step 1: Install Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup

Step 2: Create project
forge init my-arc-project
cd my-arc-project

Step 3: Create foundry.toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]

[rpc_endpoints]
arc_testnet = "https://rpc.testnet.arc.network"

Step 4: Write contract in src/MyContract.sol

Step 5: Deploy
forge create src/MyContract.sol:MyContract \
  --rpc-url https://rpc.testnet.arc.network \
  --private-key $PRIVATE_KEY \
  --chain-id 5042002

Step 6: Run tests
forge test --rpc-url https://rpc.testnet.arc.network

KEY POINTS:
- forge test works locally without RPC
- Use --rpc-url for on-chain tests
- cast send works for contract interactions

SOURCE:
docs.arc.io/arc/tutorials/deploy-on-arc.md
`
  },

  {
    id: "setup-6",
    keywords: ["verify contract arc", "arcscan verify", "contract verification arc"],
    title: "How do I verify contracts on Arc Explorer?",
    content: `
SHORT_ANSWER:
Go to testnet.arcscan.app, find your contract, click "Verify & Publish", upload your Solidity source code and compiler settings.

STEP-BY-STEP:
Step 1: Go to https://testnet.arcscan.app
Step 2: Search your contract address
Step 3: Click "Contract" tab
Step 4: Click "Verify & Publish"
Step 5: Select compiler version (must match what you used)
Step 6: Paste your Solidity source code
Step 7: Submit verification

WITH HARDHAT (automated):
npm install --save-dev @nomicfoundation/hardhat-verify

In hardhat.config.ts add:
etherscan: {
  apiKey: { arcTestnet: "placeholder" },
  customChains: [{
    network: "arcTestnet",
    chainId: 5042002,
    urls: {
      apiURL: "https://testnet.arcscan.app/api",
      browserURL: "https://testnet.arcscan.app",
    },
  }],
},

Then run:
npx hardhat verify --network arcTestnet YOUR_CONTRACT_ADDRESS

SOURCE:
https://testnet.arcscan.app
`
  },

  // ============================================================
  // C. USDC & GAS
  // ============================================================
  {
    id: "gas-1",
    keywords: ["pay gas usdc", "gas usdc arc", "how gas works arc", "usdc gas fee", "arc gas model"],
    title: "How does gas work on Arc? How do I pay gas in USDC?",
    content: `
SHORT_ANSWER:
On Arc, gas fees are paid in USDC automatically. You just need USDC in your wallet — no ETH needed. The fee model uses EIP-1559 + EWMA smoothing for stable, predictable costs.

EXPLANATION:
Arc's fee model:
- Gas unit: USDC (18 decimals for internal accounting)
- Pricing: EIP-1559 + EWMA smoothing
- Base fee target: ~$0.01 per transaction
- Minimum base fee: 20 Gwei
- Maximum base fee: 1e-3 USDC
- Fees are stable — short spikes don't cause sudden jumps

HOW TO SET GAS (ethers.js):
import { ethers } from "ethers";
const provider = new ethers.JsonRpcProvider("https://rpc.testnet.arc.network");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const tx = await wallet.sendTransaction({
  to: recipient,
  value: ethers.parseUnits("1", 6), // 1 USDC
  maxFeePerGas: ethers.parseUnits("20", "gwei"), // minimum
  maxPriorityFeePerGas: ethers.parseUnits("1", "gwei"), // tip
});

COMMON ERROR: "transaction underpriced"
Fix: Set maxFeePerGas to at least ethers.parseUnits("20", "gwei")

SOURCE:
docs.arc.io/arc/references/gas-and-fees.md
`
  },

  {
    id: "gas-2",
    keywords: ["usdc contract address arc", "usdc address testnet", "arc usdc contract", "usdc token arc"],
    title: "What is the USDC contract address on Arc Testnet?",
    content: `
SHORT_ANSWER:
USDC Contract on Arc Testnet: 0x3600000000000000000000000000000000000000 (6 decimals for ERC-20 interface)

ALL CONTRACT ADDRESSES (Arc Testnet):
- USDC: 0x3600000000000000000000000000000000000000
- EURC: 0x89B50855Aa3bE2F677cD6303Cec089B5F319D72a
- USYC: 0xe9185F0c5F296Ed1797AaE4238D26CCaBEadb86C
- CCTP TokenMessengerV2: 0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA
- CCTP MessageTransmitterV2: 0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275
- Gateway Wallet: 0x0077777d7EBA4688BDeF3E311b846F25870A19B9
- StableFX Escrow: 0x867650F5eAe8df91445971f14d89fd84F0C9a9f8
- ERC-8004 IdentityRegistry: 0x8004A818BFB912233c491871b3d84c89A494BD9e
- ERC-8183 AgenticCommerce: 0x0747EEf0706327138c69792bF28Cd525089e4583
- Multicall3: 0xcA11bde05977b3631167028862bE2a173976CA11
- Permit2: 0x000000000022D473030F116dDEE9F6B43aC78BA3
- CREATE2 Factory: 0x4e59b44847b379578588920cA78FbF26c0B4956C

IMPORTANT: USDC uses 6 decimals for ERC-20 interface, 18 decimals for native gas accounting. Use ERC-20 interface (6 decimals) for application-level transfers.

SOURCE:
docs.arc.io/arc/references/contract-addresses.md
`
  },

  {
    id: "gas-3",
    keywords: ["transfer usdc arc", "send usdc programmatic", "usdc transfer code", "erc20 transfer arc"],
    title: "How do I transfer USDC programmatically on Arc?",
    content: `
SHORT_ANSWER:
Use the ERC-20 transfer function with USDC contract 0x3600000000000000000000000000000000000000. USDC has 6 decimals — 1 USDC = 1,000,000 units.

CODE EXAMPLES:

Using ethers.js:
import { ethers } from "ethers";
const USDC = "0x3600000000000000000000000000000000000000";
const ERC20_ABI = ["function transfer(address to, uint256 amount) returns (bool)"];

const provider = new ethers.JsonRpcProvider("https://rpc.testnet.arc.network");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const usdc = new ethers.Contract(USDC, ERC20_ABI, wallet);

// Send 1 USDC
const tx = await usdc.transfer(recipientAddress, ethers.parseUnits("1", 6));
await tx.wait();

Using raw transaction (MetaMask/frontend):
const amount = (1000000).toString(16).padStart(64, "0"); // 1 USDC in hex
const data = "0xa9059cbb" + recipientAddress.slice(2).padStart(64, "0") + amount;

await window.ethereum.request({
  method: "eth_sendTransaction",
  params: [{ from: senderAddress, to: USDC_CONTRACT, data }],
});

DECIMAL GUIDE:
- 0.001 USDC = 1000 units
- 0.1 USDC = 100000 units
- 1 USDC = 1000000 units
- 10 USDC = 10000000 units

SOURCE:
docs.arc.io/arc/references/contract-addresses.md
`
  },

  // ============================================================
  // D. SMART CONTRACTS
  // ============================================================
  {
    id: "contracts-1",
    keywords: ["deploy erc20 arc", "erc20 contract arc", "create token arc", "deploy token arc"],
    title: "How do I deploy an ERC-20 contract on Arc?",
    content: `
SHORT_ANSWER:
Arc is EVM-compatible — deploy standard ERC-20 contracts using Hardhat or Foundry with Arc's RPC URL and Chain ID 5042002.

COMPLETE GUIDE:

Step 1: Write your ERC-20 contract (contracts/MyToken.sol)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }
}

Step 2: Install OpenZeppelin
npm install @openzeppelin/contracts

Step 3: Deploy script (scripts/deploy.ts)
import { ethers } from "hardhat";
async function main() {
  const MyToken = await ethers.getContractFactory("MyToken");
  const token = await MyToken.deploy(1000000); // 1M tokens
  await token.waitForDeployment();
  console.log("Token deployed to:", await token.getAddress());
}
main().catch(console.error);

Step 4: Deploy to Arc
npx hardhat run scripts/deploy.ts --network arcTestnet

Step 5: Verify on explorer
https://testnet.arcscan.app/address/YOUR_TOKEN_ADDRESS

SOURCE:
docs.arc.io/arc/tutorials/deploy-on-arc.md
`
  },

  {
    id: "contracts-2",
    keywords: ["usdc payment contract", "accept usdc", "payment contract arc", "receive usdc contract"],
    title: "How do I write a payment contract that accepts USDC on Arc?",
    content: `
SHORT_ANSWER:
Create a contract that calls transferFrom on the USDC ERC-20 interface. Users must first approve your contract to spend their USDC.

COMPLETE EXAMPLE:
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
}

contract MicroPayment {
    address public constant USDC = 0x3600000000000000000000000000000000000000;
    address public owner;
    uint256 public pricePerQuery = 1000; // 0.001 USDC (6 decimals)

    event Payment(address indexed payer, uint256 amount);

    constructor() { owner = msg.sender; }

    function pay() external {
        require(
            IERC20(USDC).transferFrom(msg.sender, owner, pricePerQuery),
            "USDC transfer failed"
        );
        emit Payment(msg.sender, pricePerQuery);
    }

    function withdraw() external {
        require(msg.sender == owner, "Not owner");
        uint256 balance = IERC20(USDC).balanceOf(address(this));
        IERC20(USDC).transfer(owner, balance);
    }
}

FRONTEND FLOW:
Step 1: User approves your contract to spend USDC
Step 2: User calls pay() on your contract
Step 3: USDC transfers from user to owner

NOTE: For simpler payment collection without a custom contract, use direct USDC transfer to your wallet address.

SOURCE:
docs.arc.io/arc/tutorials/deploy-on-arc.md
`
  },

  {
    id: "contracts-3",
    keywords: ["proxy contract arc", "upgradeable contract arc", "contract upgrade arc", "transparent proxy"],
    title: "Can I deploy proxy/upgradeable contracts on Arc?",
    content: `
SHORT_ANSWER:
Yes. Standard OpenZeppelin proxy patterns (Transparent, UUPS) work on Arc. The CREATE2 factory is also available for deterministic deployment.

UUPS PROXY EXAMPLE:
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract MyUpgradeableContract is UUPSUpgradeable, OwnableUpgradeable {
    function initialize() public initializer {
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}
}

DEPLOY WITH HARDHAT:
import { upgrades } from "hardhat";
const contract = await upgrades.deployProxy(MyContract, [], { kind: "uups" });

CREATE2 FACTORY ADDRESS:
0x4e59b44847b379578588920cA78FbF26c0B4956C

SOURCE:
docs.arc.io/arc/tutorials/deploy-on-arc.md
`
  },

  // ============================================================
  // E. CIRCLE WALLETS SDK
  // ============================================================
  {
    id: "circle-sdk-1",
    keywords: ["circle sdk setup", "developer controlled wallets setup", "circle wallet install", "circle sdk install"],
    title: "How do I set up Circle Developer-Controlled Wallets SDK?",
    content: `
SHORT_ANSWER:
Install the SDK, create API key and Entity Secret in Circle Console, then initialize the client with your credentials.

COMPLETE SETUP:
Step 1: Install SDK
npm install @circle-fin/developer-controlled-wallets

Step 2: Create Circle account
Go to https://console.circle.com and sign up

Step 3: Generate API Key
Console → API Keys → Create API Key → Standard Key
Copy the key (shown only once)

Step 4: Generate Entity Secret
import { generateEntitySecret } from "@circle-fin/developer-controlled-wallets";
const secret = generateEntitySecret();
console.log(secret); // Save this securely!

Step 5: Register Entity Secret in Console
import { registerEntitySecretCiphertext } from "@circle-fin/developer-controlled-wallets";
const response = await registerEntitySecretCiphertext({
  apiKey: process.env.CIRCLE_API_KEY,
  entitySecret: process.env.CIRCLE_ENTITY_SECRET,
});
// Save recovery_file.dat if provided

Step 6: Add to .env
CIRCLE_API_KEY=your_api_key
CIRCLE_ENTITY_SECRET=your_32_byte_secret

Step 7: Initialize client
import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";

const client = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.CIRCLE_API_KEY,
  entitySecret: process.env.CIRCLE_ENTITY_SECRET,
});

SOURCE:
developers.circle.com/wallets/developer-controlled/quickstart
`
  },

  {
    id: "circle-sdk-2",
    keywords: ["create wallet circle", "circle wallet arc", "wallet set circle", "create arc wallet"],
    title: "How do I create and manage wallets on Arc with Circle SDK?",
    content: `
SHORT_ANSWER:
Create a WalletSet first, then create wallets inside it. Each WalletSet can hold up to 10 million wallets. Use blockchain: "ARC-TESTNET" for Arc.

CODE:
// Create wallet set
const walletSet = await client.createWalletSet({
  name: "My App Wallets",
});

// Create wallets on Arc Testnet
const walletsResponse = await client.createWallets({
  blockchains: ["ARC-TESTNET"],
  count: 1, // number of wallets to create
  walletSetId: walletSet.data.walletSet.id,
  accountType: "SCA", // Smart Contract Account (recommended)
});

const wallet = walletsResponse.data.wallets[0];
console.log("Wallet Address:", wallet.address);
console.log("Wallet ID:", wallet.id);

// List existing wallets
const wallets = await client.listWallets({});
console.log(wallets.data.wallets);

// Get specific wallet
const wallet = await client.getWallet({ id: walletId });

KEY POINTS:
- SCA (Smart Contract Account) recommended for Arc
- Each wallet has a unique ID and address
- WalletSet ID needed for creating wallets
- Up to 10M wallets per WalletSet

SOURCE:
developers.circle.com/wallets/developer-controlled/quickstart
`
  },

  {
    id: "circle-sdk-3",
    keywords: ["send usdc circle sdk", "transfer circle sdk", "circle sdk transaction", "send transaction circle"],
    title: "How do I send USDC using Circle SDK on Arc?",
    content: `
SHORT_ANSWER:
Use createTransaction() method with the USDC token address and recipient. Circle handles signing automatically.

CODE:
// Send 1 USDC from a Circle-managed wallet
const tx = await client.createTransaction({
  walletAddress: "0xYourWalletAddress",
  blockchain: "ARC-TESTNET",
  tokenAddress: "0x3600000000000000000000000000000000000000", // USDC
  destinationAddress: "0xRecipientAddress",
  amount: ["1"], // 1 USDC (string array)
  fee: {
    type: "level",
    config: { feeLevel: "MEDIUM" }, // LOW, MEDIUM, HIGH
  },
});

// Get transaction ID
const txId = tx.data.id;

// Poll transaction status
const checkStatus = async () => {
  const result = await client.getTransaction({ id: txId });
  const state = result.data.transaction.state;
  console.log("Status:", state);
  // States: INITIATED, PENDING_RISK_SCREENING, SENT, CONFIRMED, COMPLETE, FAILED
  if (state !== "COMPLETE" && state !== "FAILED") {
    setTimeout(checkStatus, 2000); // poll every 2 seconds
  }
};
await checkStatus();

AMOUNT FORMAT:
- "1" = 1 USDC
- "0.001" = 0.001 USDC
- Always pass as string

SOURCE:
developers.circle.com/wallets/developer-controlled/send-tokens
`
  },

  {
    id: "circle-sdk-4",
    keywords: ["entity secret lost", "recover entity secret", "entity secret recovery", "lost circle credentials"],
    title: "How do I recover a lost Entity Secret?",
    content: `
SHORT_ANSWER:
If you saved the recovery_file.dat during setup, use it to reset via Circle Console → Reset. If lost, you must generate a new Entity Secret — existing wallets remain accessible with the new secret.

RECOVERY OPTIONS:

Option 1: You have recovery_file.dat
- Go to console.circle.com → DEV CONTROLLED → Configurator → Entity Secret
- Click "Reset"
- Upload the recovery_file.dat file
- Enter new entity secret ciphertext
- Click Reset

Option 2: No recovery_file.dat (use Rotate)
- You need the current Entity Secret to rotate
- If you have it stored somewhere, use Rotate to get a new one
- Warning: All pending transactions using old secret will fail

Option 3: Completely lost
- Contact Circle Support at support.circle.com
- Provide API key and account verification
- They may be able to help reset

PREVENTION:
Always save the recovery_file.dat when creating Entity Secret:
import fs from "fs";
const response = await registerEntitySecretCiphertext({...});
fs.writeFileSync("recovery_file.dat", response.data?.recoveryFile ?? "");

SOURCE:
console.circle.com → Configurator → Entity Secret
`
  },

  {
    id: "circle-sdk-5",
    keywords: ["sca wallet eoa wallet", "smart contract account", "wallet type circle", "account type circle"],
    title: "What is the difference between SCA and EOA wallets in Circle?",
    content: `
SHORT_ANSWER:
SCA (Smart Contract Account) is recommended for Arc — it supports account abstraction features. EOA (Externally Owned Account) is simpler but lacks advanced features like batch transactions.

COMPARISON:
| Feature | SCA | EOA |
|---|---|---|
| Account Abstraction | Yes | No |
| Batch transactions | Yes | No |
| Gas sponsorship | Yes | No |
| Recovery options | Better | Basic |
| Recommended for Arc | Yes | Basic use only |

WHEN TO USE EACH:
SCA: Production apps, AI agents, payment systems, dApps needing AA
EOA: Simple scripts, testing, basic transfers

CODE (create SCA):
const wallets = await client.createWallets({
  blockchains: ["ARC-TESTNET"],
  count: 1,
  walletSetId: walletSetId,
  accountType: "SCA", // use this for Arc
});

SOURCE:
developers.circle.com/wallets/developer-controlled/wallets
`
  },

  // ============================================================
  // F. ERC-8004
  // ============================================================
  {
    id: "erc8004-setup-1",
    keywords: ["erc-8004 setup", "register ai agent arc", "agent registration guide", "erc8004 tutorial"],
    title: "How do I register an AI Agent on Arc using ERC-8004?",
    content: `
SHORT_ANSWER:
Prepare metadata JSON → Upload to IPFS → Call register() on IdentityRegistry contract → Get your Agent ID (NFT tokenId).

COMPLETE GUIDE:

Step 1: Create metadata JSON
{
  "name": "My AI Agent",
  "description": "What your agent does",
  "agent_type": "ai_assistant",
  "capabilities": ["natural_language_qa", "code_generation"],
  "version": "1.0.0",
  "url": "https://your-dapp.com",
  "payment": {
    "cost_per_query": "0.001",
    "token": "USDC",
    "network": "ARC-TESTNET"
  }
}

Step 2: Upload to IPFS (Pinata)
- Go to pinata.cloud
- Upload the JSON file
- Copy CID (e.g., bafkrei...)
- Your URI: ipfs://YOUR_CID

Step 3: Register using Circle SDK
const tx = await client.createContractExecutionTransaction({
  walletAddress: ownerWalletAddress,
  blockchain: "ARC-TESTNET",
  contractAddress: "0x8004A818BFB912233c491871b3d84c89A494BD9e",
  abiFunctionSignature: "register(string)",
  abiParameters: ["ipfs://YOUR_CID"],
  fee: { type: "level", config: { feeLevel: "MEDIUM" } },
});

Step 4: Get your Agent ID
// Listen for Transfer event to get tokenId (your Agent ID)
// Or check your wallet on testnet.arcscan.app

CONTRACT ADDRESSES:
- IdentityRegistry: 0x8004A818BFB912233c491871b3d84c89A494BD9e
- ReputationRegistry: 0x8004B663056A597Dffe9eCcC1965A193B7388713
- ValidationRegistry: 0x8004Cb1BF31DAf7788923b405b754f57acEB4272

SOURCE:
docs.arc.io/arc/tutorials/register-your-first-ai-agent.md
`
  },

  // ============================================================
  // G. ERC-8183
  // ============================================================
  {
    id: "erc8183-setup-1",
    keywords: ["erc-8183 guide", "create job arc", "job settlement guide", "agentic commerce tutorial"],
    title: "How do I create and complete an ERC-8183 job on Arc?",
    content: `
SHORT_ANSWER:
Client creates job → Provider sets budget → Client approves + funds USDC escrow → Provider submits deliverable → Client completes → USDC released.

COMPLETE GUIDE:

CONTRACT: 0x0747EEf0706327138c69792bF28Cd525089e4583

Step 1: Create job (client wallet)
const tx = await client.createContractExecutionTransaction({
  walletAddress: clientWalletAddress,
  blockchain: "ARC-TESTNET",
  contractAddress: "0x0747EEf0706327138c69792bF28Cd525089e4583",
  abiFunctionSignature: "createJob(address,address,uint256,string,address)",
  abiParameters: [
    providerAddress,           // who does the work
    evaluatorAddress,          // who approves (can be client)
    expiryTimestamp.toString(), // unix timestamp
    "Job description here",
    "0x0000000000000000000000000000000000000000" // hook (0 = none)
  ],
  fee: { type: "level", config: { feeLevel: "MEDIUM" } },
});

Step 2: Provider sets budget
abiFunctionSignature: "setBudget(uint256,uint256,bytes)"
abiParameters: [jobId, "1000000", "0x"] // 1 USDC

Step 3: Approve USDC (client)
abiFunctionSignature: "approve(address,uint256)"
// Call on USDC contract, approve AgenticCommerce contract

Step 4: Fund escrow (client)
abiFunctionSignature: "fund(uint256,bytes)"
abiParameters: [jobId, "0x"]

Step 5: Submit deliverable (provider)
import { keccak256, toHex } from "viem";
const deliverable = keccak256(toHex("work-completed-proof"));
abiFunctionSignature: "submit(uint256,bytes32,bytes)"
abiParameters: [jobId, deliverable, "0x"]

Step 6: Complete job (client/evaluator)
import { keccak256, toHex } from "viem";
const reason = keccak256(toHex("approved"));
abiFunctionSignature: "complete(uint256,bytes32,bytes)"
abiParameters: [jobId, reason, "0x"]
// USDC automatically released to provider

JOB STATES: Open → Funded → Submitted → Completed/Rejected/Expired

SOURCE:
docs.arc.io/arc/tutorials/create-your-first-erc-8183-job.md
`
  },

  // ============================================================
  // H. ARC APP KIT
  // ============================================================
  {
    id: "appkit-1",
    keywords: ["app kit install", "arc app kit setup", "bridge kit install", "circle app kit"],
    title: "How do I install and use Arc App Kit?",
    content: `
SHORT_ANSWER:
Install @circle-fin/app-kit, choose your adapter (viem, ethers, Solana, or Circle Wallets), then use Bridge, Swap, Send, or Unified Balance features.

INSTALLATION:
npm install @circle-fin/app-kit

VIEM ADAPTER SETUP:
import { AppKit } from "@circle-fin/app-kit";
import { createViemAdapter } from "@circle-fin/app-kit/adapters/viem";
import { createWalletClient, http } from "viem";
import { arcTestnet } from "viem/chains";

const walletClient = createWalletClient({
  chain: arcTestnet,
  transport: http(),
});

const adapter = createViemAdapter({ walletClient });
const appKit = new AppKit({ adapter });

BRIDGE USDC TO ARC:
const result = await appKit.bridge({
  fromChain: "ETH", // source chain
  toChain: "ARC",   // destination
  amount: "10",     // USDC amount
  token: "USDC",
});

UNIFIED BALANCE:
const balance = await appKit.getUnifiedBalance({
  address: userAddress,
});
// Returns combined USDC balance across all chains

SUPPORTED CHAINS:
Ethereum, Base, Arbitrum, Polygon, Solana, Arc + more

SOURCE:
docs.arc.io/app-kit.md
docs.arc.io/app-kit/tutorials/installation.md
`
  },

  // ============================================================
  // I. CCTP
  // ============================================================
  {
    id: "cctp-setup-1",
    keywords: ["cctp setup", "cctp bridge", "cross chain usdc arc", "cctp tutorial", "usdc bridge arc"],
    title: "How do I use CCTP to bridge USDC to Arc?",
    content: `
SHORT_ANSWER:
CCTP burns USDC on source chain and mints native USDC on Arc. Domain ID for Arc is 26. Use Arc App Kit for easiest integration — it handles CCTP automatically.

EASIEST WAY (App Kit):
const result = await appKit.bridge({
  fromChain: "ETH",
  toChain: "ARC",
  amount: "100",
  token: "USDC",
});

MANUAL CCTP FLOW:
Step 1: Approve USDC for burning
Step 2: Call depositForBurn on TokenMessengerV2 (source chain)
Step 3: Wait for Circle attestation
Step 4: Call receiveMessage on MessageTransmitterV2 (Arc)

ARC CCTP CONTRACTS:
- Domain: 26
- TokenMessengerV2: 0x8FE6B999Dc680CcFDD5Bf7EB0974218be2542DAA
- MessageTransmitterV2: 0xE737e5cEBEEBa77EFE34D4aa090756590b1CE275
- TokenMinterV2: 0xb43db544E2c27092c107639Ad201b3dEfAbcF192

SUPPORTED CHAINS: Ethereum, Base, Arbitrum, Optimism, Polygon, Solana, Avalanche, and more

TRANSFER TIME: Usually 1-5 minutes for attestation

SOURCE:
docs.arc.io/app-kit/bridge.md
developers.circle.com/cctp
`
  },

  // ============================================================
  // J. FRONTEND DEVELOPMENT
  // ============================================================
  {
    id: "frontend-1",
    keywords: ["viem arc config", "arc testnet viem", "define arc chain viem", "viem chain arc"],
    title: "How do I define Arc Testnet in viem?",
    content: `
SHORT_ANSWER:
Use defineChain() with Arc's network details, or import arcTestnet from viem/chains if available.

CODE:
import { defineChain } from "viem";

export const arcTestnet = defineChain({
  id: 5042002,
  name: "Arc Testnet",
  network: "arc-testnet",
  nativeCurrency: {
    name: "USDC",
    symbol: "USDC",
    decimals: 6,
  },
  rpcUrls: {
    default: { http: ["https://rpc.testnet.arc.network"] },
    public: { http: ["https://rpc.testnet.arc.network"] },
  },
  blockExplorers: {
    default: {
      name: "ArcScan",
      url: "https://testnet.arcscan.app",
    },
  },
  testnet: true,
});

// Use in wagmi config
import { createConfig, http } from "wagmi";
const config = createConfig({
  chains: [arcTestnet],
  transports: { [arcTestnet.id]: http() },
});

SOURCE:
docs.arc.io/arc/references/connect-to-arc.md
`
  },

  {
    id: "frontend-2",
    keywords: ["usdc balance react", "read balance arc", "usdc balance frontend", "check balance react"],
    title: "How do I read USDC balance on Arc in a React frontend?",
    content: `
SHORT_ANSWER:
Call eth_call with the ERC-20 balanceOf function signature on the USDC contract. Divide result by 1e6 for display.

CODE (React + ethers.js):
const getBalance = async (address: string) => {
  const data = "0x70a08231" + address.slice(2).padStart(64, "0");
  const result = await window.ethereum.request({
    method: "eth_call",
    params: [{ to: "0x3600000000000000000000000000000000000000", data }, "latest"],
  });
  const balance = parseInt(result, 16) / 1e6;
  return balance.toFixed(3); // e.g., "19.850"
};

CODE (viem):
import { createPublicClient, http } from "viem";
import { arcTestnet } from "./arcChain";

const client = createPublicClient({ chain: arcTestnet, transport: http() });

const balance = await client.readContract({
  address: "0x3600000000000000000000000000000000000000",
  abi: [{ name: "balanceOf", type: "function", inputs: [{ type: "address" }], outputs: [{ type: "uint256" }] }],
  functionName: "balanceOf",
  args: [userAddress],
});
const formatted = Number(balance) / 1e6; // convert from 6 decimals

SOURCE:
docs.arc.io/arc/references/contract-addresses.md
`
  },

  {
    id: "frontend-3",
    keywords: ["switch network metamask", "switch arc chain", "wallet switch chain", "add arc dapp"],
    title: "How do I switch users to Arc Testnet in a dApp?",
    content: `
SHORT_ANSWER:
Use wallet_switchEthereumChain. If Arc isn't added yet, catch error code 4902 and call wallet_addEthereumChain to add it automatically.

COMPLETE CODE:
const switchToArc = async () => {
  const ARC_CHAIN_ID = "0x4cef52"; // 5042002 in hex

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: ARC_CHAIN_ID }],
    });
  } catch (err) {
    if (err.code === 4902) {
      // Chain not added yet — add it
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
          chainId: ARC_CHAIN_ID,
          chainName: "Arc Testnet",
          nativeCurrency: { name: "USDC", symbol: "USDC", decimals: 6 },
          rpcUrls: ["https://rpc.testnet.arc.network"],
          blockExplorerUrls: ["https://testnet.arcscan.app"],
        }],
      });
    } else if (err.code === 4001) {
      console.log("User rejected the request");
    }
  }
};

SOURCE:
docs.arc.io/arc/references/connect-to-arc.md
`
  },

  // ============================================================
  // K. BACKEND & API
  // ============================================================
  {
    id: "backend-1",
    keywords: ["arc rpc nodejs", "arc backend", "ethers arc node", "arc node js"],
    title: "How do I use Arc RPC in Node.js backend?",
    content: `
SHORT_ANSWER:
Use ethers.js JsonRpcProvider or viem createPublicClient with Arc's RPC URL.

ethers.js:
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://rpc.testnet.arc.network");

// Get block number
const blockNumber = await provider.getBlockNumber();

// Get USDC balance
const USDC = "0x3600000000000000000000000000000000000000";
const ABI = ["function balanceOf(address) view returns (uint256)"];
const usdc = new ethers.Contract(USDC, ABI, provider);
const balance = await usdc.balanceOf(address);
console.log(ethers.formatUnits(balance, 6)); // convert 6 decimals

// Send transaction
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const tx = await wallet.sendTransaction({
  to: recipient,
  data: transferData,
  maxFeePerGas: ethers.parseUnits("20", "gwei"),
});
await tx.wait();

viem:
import { createPublicClient, http } from "viem";
import { arcTestnet } from "./arcChain";

const client = createPublicClient({
  chain: arcTestnet,
  transport: http("https://rpc.testnet.arc.network"),
});

const blockNumber = await client.getBlockNumber();

SOURCE:
docs.arc.io/arc/references/connect-to-arc.md
`
  },

  {
    id: "backend-2",
    keywords: ["listen events arc", "contract events arc", "usdc transfer events", "monitor arc events"],
    title: "How do I listen for USDC transfer events on Arc?",
    content: `
SHORT_ANSWER:
Use getLogs() with the Transfer event topic. USDC Transfer topic: 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef

ethers.js:
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://rpc.testnet.arc.network");
const USDC = "0x3600000000000000000000000000000000000000";
const ABI = ["event Transfer(address indexed from, address indexed to, uint256 value)"];
const usdc = new ethers.Contract(USDC, ABI, provider);

// Listen for transfers TO your wallet
usdc.on("Transfer", (from, to, amount, event) => {
  if (to.toLowerCase() === yourAddress.toLowerCase()) {
    console.log("Received:", ethers.formatUnits(amount, 6), "USDC from", from);
    console.log("TX:", event.transactionHash);
  }
});

// Get historical transfers
const filter = usdc.filters.Transfer(null, yourAddress);
const events = await usdc.queryFilter(filter, -1000); // last 1000 blocks

viem:
const logs = await client.getLogs({
  address: USDC_CONTRACT,
  event: parseAbiItem("event Transfer(address indexed from, address indexed to, uint256 indexed value)"),
  args: { to: yourAddress },
  fromBlock: BigInt(startBlock),
  toBlock: "latest",
});

SOURCE:
docs.arc.io/arc/tutorials/monitor-contract-events.md
`
  },

  // ============================================================
  // L. TROUBLESHOOTING
  // ============================================================
  {
    id: "troubleshoot-dev-1",
    keywords: ["transaction failing arc", "transaction error arc", "arc tx error", "debug arc transaction"],
    title: "Why is my transaction failing on Arc? How do I debug it?",
    content: `
SHORT_ANSWER:
Most Arc transaction failures are caused by: insufficient USDC for gas, maxFeePerGas below 20 Gwei minimum, wrong network, or incorrect contract interaction.

COMMON ERRORS AND FIXES:

1. "transaction underpriced"
Cause: maxFeePerGas below 20 Gwei minimum
Fix: Set maxFeePerGas: ethers.parseUnits("20", "gwei")

2. "insufficient funds for gas * price + value"
Cause: Not enough USDC to cover gas + transfer amount
Fix: Get more testnet USDC at faucet.circle.com

3. "intrinsic gas too low"
Cause: Gas limit too low
Fix: Set gas limit to minimum 21000 for transfers, use eth_estimateGas for contracts

4. Transaction pending forever
Cause: maxFeePerGas too low
Fix: Increase fee or reset MetaMask nonce via Settings → Advanced → Reset Account

5. Contract call reverting
Cause: Business logic error, wrong parameters, or insufficient allowance
Fix: Check ABI parameters match contract expectations, ensure USDC allowance approved

DEBUGGING STEPS:
Step 1: Check USDC balance at testnet.arcscan.app
Step 2: Verify you're on Arc Testnet (Chain ID: 5042002)
Step 3: Check maxFeePerGas is at least 20 Gwei
Step 4: Use eth_estimateGas to check gas limit
Step 5: Check Arc Discord for network issues

ERROR CODE REFERENCE:
- 156013: Entity Secret invalid or not registered
- 155258: Insufficient USDC balance for transaction
- 4001: User rejected MetaMask request
- 4902: Chain not added to MetaMask

SOURCE:
docs.arc.io/arc/references/gas-and-fees.md
`
  },

  {
    id: "troubleshoot-dev-2",
    keywords: ["error 156013", "circle error 156013", "entity secret error", "walletset error"],
    title: "What does Circle error code 156013 mean and how do I fix it?",
    content: `
SHORT_ANSWER:
Error 156013 means "Entity Secret is invalid or does not match the registered ciphertext." Your entity secret in .env doesn't match what's registered in Circle Console.

CAUSES:
1. Wrong entity secret in .env file
2. Entity secret was rotated but .env not updated
3. Entity secret not yet registered in Circle Console
4. Copy-paste error when saving the secret

STEP-BY-STEP FIX:
Step 1: Check your .env file
cat .env | grep CIRCLE_ENTITY_SECRET

Step 2: Verify it's exactly 64 hex characters (32 bytes)

Step 3: Test if your current credentials work
const wallets = await client.listWallets({});
// If this works, entity secret is correct

Step 4: If wrong, you have two options:
Option A: Find original secret in old .env files
grep -r "ENTITY_SECRET" ~/projects/

Option B: Rotate entity secret using Circle Console
- console.circle.com → DEV CONTROLLED → Configurator → Entity Secret → Rotate
- Requires current secret's ciphertext

Step 5: Update .env with correct secret
Step 6: Restart your dev server

SOURCE:
developers.circle.com/wallets/developer-controlled/entity-secret
`
  },

  {
    id: "troubleshoot-dev-3",
    keywords: ["error 155258", "insufficient balance error", "circle insufficient funds", "155258"],
    title: "What does Circle error code 155258 mean?",
    content: `
SHORT_ANSWER:
Error 155258 means "The wallet does not have enough USDC balance for this transaction." You need to fund the Circle-managed wallet with testnet USDC.

FIX:
Step 1: Get your wallet address
const wallets = await client.listWallets({});
const address = wallets.data.wallets[0].address;
console.log("Fund this address:", address);

Step 2: Fund with testnet USDC
- Go to faucet.circle.com
- Select Arc Testnet
- Enter the wallet address
- Click Send

Step 3: Wait 10-30 seconds for USDC to arrive

Step 4: Verify balance
const balance = await client.getWalletTokenBalance({ id: walletId });

Step 5: Retry your transaction

NOTE: Make sure to fund the specific Circle wallet address, not your MetaMask address.

SOURCE:
developers.circle.com/wallets/developer-controlled/send-tokens
`
  },

  {
    id: "troubleshoot-dev-4",
    keywords: ["metamask wrong balance", "metamask usdc not showing", "usdc not visible metamask", "add usdc metamask"],
    title: "Why is MetaMask showing wrong balance or USDC not visible?",
    content: `
SHORT_ANSWER:
MetaMask doesn't natively display custom gas tokens correctly. Manually add USDC as a token using its contract address.

FIX:
Step 1: Add USDC token manually
- Open MetaMask
- Make sure you're on Arc Testnet
- Click "Import tokens"
- Enter: 0x3600000000000000000000000000000000000000
- Symbol: USDC, Decimals: 6
- Click Add

Step 2: If balance shows as ETH
MetaMask shows native gas as ETH even on Arc. The actual balance is USDC. Read the ERC-20 balanceOf instead:
const data = "0x70a08231" + address.slice(2).padStart(64, "0");
const result = await window.ethereum.request({
  method: "eth_call",
  params: [{ to: "0x3600000000000000000000000000000000000000", data }, "latest"],
});
const balance = parseInt(result, 16) / 1e6;

Step 3: Reset account if stale
MetaMask → Settings → Advanced → Reset Account (clears nonce/pending txs, not funds)

SOURCE:
docs.arc.io/arc/references/connect-to-arc.md
`
  },

];