export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-800">
        <span className="text-xl font-bold text-purple-400">μ MicroAI</span>
        <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-medium">
          Connect Wallet
        </button>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-24">
        <div className="bg-purple-900/30 text-purple-300 text-sm px-4 py-1 rounded-full mb-6">
          Powered by Arc Chain + USDC
        </div>
        <h1 className="text-5xl font-bold mb-4">
          Pay per question.<br />No subscription.
        </h1>
        <p className="text-gray-400 text-lg mb-8 max-w-xl">
          Get instant AI answers without monthly fees. Connect your wallet, ask anything, and pay only $0.001 per response.
        </p>
        <div className="flex gap-4">
          <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-medium">
            Start Asking
          </button>
          <button className="border border-gray-700 hover:border-gray-500 px-6 py-3 rounded-lg font-medium">
            View Pricing
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-3 gap-6 px-16 pb-24">
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <div className="text-purple-400 text-2xl mb-3">⚡</div>
          <h3 className="font-semibold mb-2">Instant Responses</h3>
          <p className="text-gray-400 text-sm">Get answers in seconds from state-of-the-art AI models.</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <div className="text-purple-400 text-2xl mb-3">💰</div>
          <h3 className="font-semibold mb-2">No Commitments</h3>
          <p className="text-gray-400 text-sm">No subscriptions, no hidden fees. Pay only when you ask.</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <div className="text-purple-400 text-2xl mb-3">🔍</div>
          <h3 className="font-semibold mb-2">Transparent Pricing</h3>
          <p className="text-gray-400 text-sm">$0.001 per response. See exactly what you spend.</p>
        </div>
      </section>
    </main>
  );
}