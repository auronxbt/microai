import { NextResponse } from "next/server";

const USDC_CONTRACT = "0x3600000000000000000000000000000000000000";
const ARC_RPC = "https://rpc.testnet.arc.network";

export async function GET() {
  try {
    // Get total transactions for USDC contract
    const txCountRes = await fetch(ARC_RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_getTransactionCount",
        params: [USDC_CONTRACT, "latest"],
        id: 1,
      }),
    });
    const txCountData = await txCountRes.json();
    const totalTx = parseInt(txCountData.result, 16);

    // Get token transfers from arcscan API
    const transfersRes = await fetch(
      `https://testnet.arcscan.app/api/v2/tokens/${USDC_CONTRACT}/transfers?limit=50`,
      { next: { revalidate: 60 } }
    );
    
    let uniqueWallets = 0;
    let totalVolume = 0;
    let totalQuestions = 0;

    if (transfersRes.ok) {
      const transfersData = await transfersRes.json();
      const transfers = transfersData.items || [];
      
      const wallets = new Set<string>();
      transfers.forEach((tx: { from: { hash: string }; total: { value: string; decimals: string } }) => {
        wallets.add(tx.from.hash);
        const value = parseFloat(tx.total.value) / Math.pow(10, parseInt(tx.total.decimals));
        totalVolume += value;
      });
      
      uniqueWallets = wallets.size;
      totalQuestions = transfers.length;
    }

    return NextResponse.json({
      totalQuestions,
      totalVolume: totalVolume.toFixed(4),
      uniqueWallets,
      totalTransactions: totalTx,
    });
  } catch {
    return NextResponse.json({
      totalQuestions: 0,
      totalVolume: "0.0000",
      uniqueWallets: 0,
      totalTransactions: 0,
    });
  }
}