"use client";
import React, { useState } from "react";
import Link from "next/link";

const grants = [
  {
    id: 1,
    type: "GRANT",
    status: "OPEN",
    org: "Circle",
    title: "Circle Developer Grant Program",
    desc: "Milestone-based funding for teams building production-grade apps on Arc & Circle platform. Focus areas: payments, treasury, FX, agentic economy.",
    reward: "$5K – $100K USDC",
    deadline: "Rolling",
    tags: ["USDC", "Arc", "Payments", "AI Agents"],
    url: "https://www.circle.com/grant",
    logo: "C",
    logoColor: "#2563eb",
  },
  {
    id: 2,
    type: "BOUNTY",
    status: "OPEN",
    org: "Arc",
    title: "Arc Bug Bounty Program",
    desc: "HackerOne-hosted security bounty for Arc testnet. Submit reproducible findings on network safety, liveness, or correctness. Test locally only.",
    reward: "Varies",
    deadline: "Ongoing",
    tags: ["Security", "HackerOne", "Testnet"],
    url: "https://www.arc.io/blog/open-sourcing-arc-run-your-own-arc-node-and-bug-bounty-program",
    logo: "A",
    logoColor: "#10b981",
  },
  {
    id: 3,
    type: "HACKATHON",
    status: "LIVE NOW",
    org: "ETHGlobal x Arc x Circle",
    title: "ETHGlobal New York 2026",
    desc: "In-person ETHGlobal hackathon. Circle sponsoring Arc-track bounties for stablecoin payments, wallets, and onchain financial apps. Build chain-abstracted USDC apps using Arc as liquidity hub.",
    reward: "Arc Track Bounties",
    deadline: "Jun 12–14, 2026",
    tags: ["ETHGlobal", "Arc", "USDC", "In-Person", "New York"],
    url: "https://community.arc.io/public/events/ethglobal-new-york-2026-2wbc20jux8",
    logo: "E",
    logoColor: "#8b5cf6",
  },
  {
    id: 4,
    type: "HACKATHON",
    status: "UPCOMING",
    org: "ETHGlobal x Circle",
    title: "ETHGlobal Lisbon 2026",
    desc: "Next major ETHGlobal in-person hackathon. Circle & Arc expected to sponsor bounty tracks based on 2026 pattern. Build on Arc testnet for prizes.",
    reward: "TBA",
    deadline: "Jul 24–26, 2026",
    tags: ["ETHGlobal", "Lisbon", "Arc", "USDC"],
    url: "https://ethglobal.com/events",
    logo: "E",
    logoColor: "#8b5cf6",
  },
  {
    id: 5,
    type: "HACKATHON",
    status: "ENDED",
    org: "Arc x Circle x lablab.ai",
    title: "Agentic Economy on Arc Hackathon",
    desc: "Hybrid hackathon using Circle Nanopayments + Arc for sub-cent agentic transactions. $10,000 prize pool. Online + SF on-site finale.",
    reward: "$10,000 USDC",
    deadline: "Apr 20–26, 2026",
    tags: ["Nanopayments", "AI Agents", "USDC", "lablab.ai"],
    url: "https://lablab.ai/ai-hackathons/nano-payments-arc",
    logo: "L",
    logoColor: "#f59e0b",
  },
  {
    id: 6,
    type: "HACKATHON",
    status: "ENDED",
    org: "ETHGlobal x Arc x Circle",
    title: "HackMoney 2026 — Arc Track",
    desc: "155 teams built on Arc Testnet. $10,000 USDC awarded across 3 tracks: chain-abstracted USDC apps, global treasury systems, agentic commerce.",
    reward: "$10,000 USDC",
    deadline: "Mar 2026",
    tags: ["ETHGlobal", "CCTP", "AI Agents", "Treasury"],
    url: "https://www.arc.network/blog/meet-the-arc-track-winners-from-the-hackmoney-2026-hackathon-and-what-we-learned",
    logo: "E",
    logoColor: "#8b5cf6",
  },
];

const FILTER_TYPES = ["ALL", "GRANT", "HACKATHON", "BOUNTY"];
const STATUS_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  "OPEN":     { bg: "rgba(16,185,129,0.08)", text: "#34d399", dot: "#34d399" },
  "LIVE NOW": { bg: "rgba(239,68,68,0.08)",  text: "#f87171", dot: "#f87171" },
  "UPCOMING": { bg: "rgba(99,102,241,0.08)", text: "#a5b4fc", dot: "#a5b4fc" },
  "ENDED":    { bg: "rgba(71,85,105,0.15)",  text: "#64748b", dot: "#475569" },
};
const TYPE_COLORS: Record<string, string> = {
  GRANT:     "#34d399",
  BOUNTY:    "#f59e0b",
  HACKATHON: "#a78bfa",
};

export default function GrantsPage() {
  const [filter, setFilter] = useState("ALL");

  const filtered = filter === "ALL" ? grants : grants.filter((g) => g.type === filter);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#010503",
        color: "#e2e8f0",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* NAVBAR */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          background: "rgba(3,18,10,0.97)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(16,185,129,0.1)",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: "linear-gradient(135deg, #34d399, #10b981)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 13,
              color: "#000",
              flexShrink: 0,
              boxShadow: "0 0 12px rgba(16,185,129,0.3)",
            }}
          >
            M
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>
              MICRO<span style={{ color: "#34d399" }}>AI</span>
            </div>
            <div
              style={{
                fontSize: 7,
                color: "rgba(52,211,153,0.5)",
                letterSpacing: "0.2em",
                fontFamily: "monospace",
              }}
            >
              THE KNOWLEDGE HUB
            </div>
          </div>
        </Link>

        {/* Nav links */}
        <div
          className="hidden md:flex"
          style={{
            gap: 20,
            fontSize: 10,
            color: "#64748b",
            fontWeight: 700,
            letterSpacing: "0.08em",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Link href="/ecosystem" style={{ textDecoration: "none", color: "inherit" }}>ECOSYSTEM</Link>
          <Link href="/grants" style={{ textDecoration: "none", color: "#34d399" }}>GRANTS</Link>
        </div>

        <Link
          href="/chat"
          style={{
            padding: "7px 14px",
            borderRadius: 10,
            background: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(52,211,153,0.25)",
            color: "#34d399",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          LAUNCH →
        </Link>
      </nav>

      {/* HERO */}
      <section
        style={{
          position: "relative",
          padding: "48px 20px 36px",
          textAlign: "center",
          borderBottom: "1px solid rgba(16,185,129,0.06)",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "5px 12px",
            borderRadius: 20,
            border: "1px solid rgba(16,185,129,0.15)",
            background: "rgba(3,17,10,0.6)",
            marginBottom: 20,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#34d399",
              display: "inline-block",
              animation: "pulse 2s infinite",
            }}
          />
          <span
            style={{
              fontSize: 9,
              color: "#34d399",
              fontWeight: 700,
              letterSpacing: "0.15em",
              fontFamily: "monospace",
            }}
          >
            LIVE OPPORTUNITIES
          </span>
        </div>

        <h1
          style={{
            fontSize: "clamp(1.6rem, 6vw, 3.5rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            margin: "0 0 14px",
            background: "linear-gradient(180deg, #fff 0%, rgba(148,163,184,0.5) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em",
          }}
        >
          Arc & Circle<br />Grants & Hackathons
        </h1>

        <p
          style={{
            fontSize: "clamp(12px, 3vw, 14px)",
            color: "#94a3b8",
            maxWidth: 480,
            margin: "0 auto 28px",
            lineHeight: 1.7,
          }}
        >
          All active grants, bounties, and hackathons from the Arc and Circle ecosystem — updated and curated for builders.
        </p>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "OPEN NOW", value: grants.filter((g) => g.status === "OPEN" || g.status === "LIVE NOW").length.toString() },
            { label: "TOTAL LISTINGS", value: grants.length.toString() },
            { label: "MAX PRIZE", value: "$100K" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "clamp(1.4rem, 5vw, 2rem)",
                  fontWeight: 900,
                  color: "#34d399",
                  fontFamily: "monospace",
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: 9, color: "#475569", fontWeight: 700, letterSpacing: "0.15em" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FILTERS */}
      <section style={{ padding: "24px 16px 0", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {FILTER_TYPES.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "6px 16px",
                borderRadius: 8,
                border:
                  filter === f
                    ? "1px solid rgba(52,211,153,0.4)"
                    : "1px solid rgba(16,185,129,0.1)",
                background:
                  filter === f
                    ? "rgba(16,185,129,0.1)"
                    : "rgba(0,0,0,0.2)",
                color: filter === f ? "#34d399" : "#64748b",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.1em",
                fontFamily: "monospace",
                cursor: "pointer",
              }}
            >
              {f}
            </button>
          ))}
          <div style={{ marginLeft: "auto", fontSize: 10, color: "#475569", alignSelf: "center", fontFamily: "monospace" }}>
            {filtered.length} RESULT{filtered.length !== 1 ? "S" : ""}
          </div>
        </div>
      </section>

      {/* GRANT CARDS */}
      <section style={{ padding: "20px 16px 60px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {filtered.map((grant) => {
            const sc = STATUS_COLORS[grant.status] ?? STATUS_COLORS["ENDED"];
            return (
              <div
                key={grant.id}
                style={{
                  background: "rgba(3,17,10,0.2)",
                  border: "1px solid rgba(16,185,129,0.08)",
                  borderRadius: 16,
                  padding: "20px 18px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Top shimmer */}
                {(grant.status === "OPEN" || grant.status === "LIVE NOW") && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 1,
                      background:
                        "linear-gradient(90deg, transparent, rgba(52,211,153,0.25), transparent)",
                    }}
                  />
                )}

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    flexWrap: "wrap",
                  }}
                >
                  {/* Logo */}
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: `${grant.logoColor}18`,
                      border: `1px solid ${grant.logoColor}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 15,
                      fontWeight: 900,
                      color: grant.logoColor,
                      flexShrink: 0,
                      fontFamily: "monospace",
                    }}
                  >
                    {grant.logo}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        flexWrap: "wrap",
                        marginBottom: 6,
                      }}
                    >
                      {/* Type badge */}
                      <span
                        style={{
                          fontSize: 8,
                          fontWeight: 800,
                          color: TYPE_COLORS[grant.type] ?? "#94a3b8",
                          background: `${TYPE_COLORS[grant.type]}15`,
                          border: `1px solid ${TYPE_COLORS[grant.type]}25`,
                          padding: "2px 8px",
                          borderRadius: 5,
                          fontFamily: "monospace",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {grant.type}
                      </span>

                      {/* Status badge */}
                      <span
                        style={{
                          fontSize: 8,
                          fontWeight: 700,
                          color: sc.text,
                          background: sc.bg,
                          padding: "2px 8px",
                          borderRadius: 5,
                          fontFamily: "monospace",
                          letterSpacing: "0.1em",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <span
                          style={{
                            width: 4,
                            height: 4,
                            borderRadius: "50%",
                            background: sc.dot,
                            display: "inline-block",
                            animation:
                              grant.status !== "ENDED" ? "pulse 2s infinite" : undefined,
                          }}
                        />
                        {grant.status}
                      </span>

                      <span
                        style={{
                          fontSize: 9,
                          color: "#475569",
                          fontFamily: "monospace",
                        }}
                      >
                        {grant.org}
                      </span>
                    </div>

                    <div
                      style={{
                        fontSize: "clamp(13px, 3.5vw, 15px)",
                        fontWeight: 800,
                        color: "#fff",
                        marginBottom: 8,
                        lineHeight: 1.3,
                      }}
                    >
                      {grant.title}
                    </div>

                    <p
                      style={{
                        fontSize: 12,
                        color: "#64748b",
                        lineHeight: 1.65,
                        margin: "0 0 12px",
                      }}
                    >
                      {grant.desc}
                    </p>

                    {/* Tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                      {grant.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: 9,
                            color: "#475569",
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            padding: "2px 8px",
                            borderRadius: 5,
                            fontFamily: "monospace",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Bottom row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 10,
                      }}
                    >
                      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                        <div>
                          <div
                            style={{ fontSize: 8, color: "#475569", fontFamily: "monospace", marginBottom: 2 }}
                          >
                            REWARD
                          </div>
                          <div style={{ fontSize: 12, fontWeight: 700, color: "#34d399" }}>
                            {grant.reward}
                          </div>
                        </div>
                        <div>
                          <div
                            style={{ fontSize: 8, color: "#475569", fontFamily: "monospace", marginBottom: 2 }}
                          >
                            DEADLINE
                          </div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8" }}>
                            {grant.deadline}
                          </div>
                        </div>
                      </div>

                      <a
                        href={grant.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          padding: "8px 18px",
                          borderRadius: 10,
                          background:
                            grant.status === "ENDED"
                              ? "rgba(255,255,255,0.03)"
                              : "rgba(16,185,129,0.1)",
                          border:
                            grant.status === "ENDED"
                              ? "1px solid rgba(255,255,255,0.07)"
                              : "1px solid rgba(52,211,153,0.25)",
                          color: grant.status === "ENDED" ? "#475569" : "#34d399",
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          textDecoration: "none",
                          fontFamily: "monospace",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {grant.status === "ENDED" ? "VIEW RECAP →" : "APPLY NOW →"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          borderTop: "1px solid rgba(16,185,129,0.06)",
          padding: "40px 16px",
          textAlign: "center",
          background: "rgba(2,11,6,0.4)",
        }}
      >
        <div style={{ fontSize: 9, color: "#34d399", fontWeight: 700, letterSpacing: "0.25em", fontFamily: "monospace", marginBottom: 12 }}>
          NOT SURE WHERE TO START?
        </div>
        <h2
          style={{
            fontSize: "clamp(1.2rem, 4vw, 2rem)",
            fontWeight: 900,
            color: "#fff",
            margin: "0 0 12px",
          }}
        >
          Ask MicroAI
        </h2>
        <p style={{ fontSize: 13, color: "#64748b", maxWidth: 400, margin: "0 auto 24px", lineHeight: 1.65 }}>
          Get personalized guidance on which grant or hackathon fits your project — straight from the Arc & Circle Intelligence Hub.
        </p>
        <Link
          href="/chat"
          style={{
            display: "inline-block",
            padding: "12px 28px",
            borderRadius: 12,
            background: "#10b981",
            color: "#000",
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.06em",
            textDecoration: "none",
            boxShadow: "0 0 18px rgba(16,185,129,0.2)",
          }}
        >
          LAUNCH CHAT TERMINAL →
        </Link>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: "1px solid rgba(16,185,129,0.08)",
          background: "#010402",
          padding: "24px 16px",
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 7,
                background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 800,
                color: "#34d399",
              }}
            >
              M
            </div>
            <div style={{ fontSize: 10, color: "#475569" }}>MICROAI · THE ARC & CIRCLE HUB</div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {[
              { l: "ARC", h: "https://arc.io" },
              { l: "CIRCLE", h: "https://circle.com" },
              { l: "GITHUB", h: "https://github.com/sahmedonchain/microai" },
              { l: "EXPLORER", h: "https://testnet.arcscan.app" },
            ].map((link) => (
              <a
                key={link.l}
                href={link.h}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: 10,
                  color: "#475569",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  fontFamily: "monospace",
                  textDecoration: "none",
                }}
              >
                {link.l}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        html { scroll-behavior: smooth; }
        body { background: #010503; margin: 0; }
        * { box-sizing: border-box; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .hidden { display: none; }
        @media (min-width: 768px) { .hidden { display: flex !important; } }
        html, body { overflow-x: hidden; scrollbar-width: none; }
::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}