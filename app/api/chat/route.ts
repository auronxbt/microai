import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { searchKnowledge } from "@/lib/search";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// -------------------------------
// SYSTEM PROMPT (FINAL CLEAN)
// -------------------------------
const SYSTEM_PROMPT = `
You are MicroAI — the official Arc & Circle Knowledge Hub AI assistant.

CRITICAL RULES:
1. ALWAYS use the provided knowledge base context FIRST
2. If knowledge base has the answer → use it EXACTLY, do not add external info
3. If no knowledge base match → say "This isn't in my knowledge base yet. For accurate info, check docs.arc.io or developers.circle.com"
4. NEVER make up blockchain addresses, contract addresses, or technical specs
5. Remember conversation history — if user says "explain more" or "details", expand on previous answer
6. Keep responses structured:

FORMAT FOR EVERY ANSWER:
**Short Answer:** (2-3 lines max — the essential answer)

**Details:** (only if user asks for more, or question is complex)

**Key Points:** (bullet list of important facts)

TONE: Professional, direct, developer-friendly. No fluff.
`;

type KnowledgeItem = {
  id: string;
  title: string;
  content: string;
};

// -------------------------------
// SIMPLE FALLBACK SEARCH (SAFE)
// -------------------------------
function safeSearch(query: string, data: KnowledgeItem[]) {
  const q = query.toLowerCase();

  return data.filter((item) => {
    const t = item.title.toLowerCase();
    const c = item.content.toLowerCase();

    return t.includes(q) || c.includes(q);
  });
}

export async function POST(req: Request) {
  try {
    const { message, history = [] } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // -------------------------------
    // STEP 1: SEARCH KNOWLEDGE
    // -------------------------------
    const matched = searchKnowledge(message);

    const fallbackMatched = safeSearch(message, matched);

    const relevantKnowledge = fallbackMatched
      .map(
        (item) => `### ${item.title}\n${item.content}`
      )
      .join("\n\n");

    // -------------------------------
    // STEP 2: BUILD CONTEXT
    // -------------------------------
    const context =
      relevantKnowledge.length > 0
        ? relevantKnowledge
        : "NO MATCH FOUND IN KNOWLEDGE BASE";

    // -------------------------------
    // STEP 3: CALL AI
    // -------------------------------
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
  {
    role: "system",
    content: SYSTEM_PROMPT,
  },
  {
    role: "system",
    content: `[ARC & CIRCLE KNOWLEDGE BASE]\n\n${context}\n\nIMPORTANT: Use ONLY this knowledge base. If no match, say you don't have it yet.`,
  },
  ...history.slice(-6).map((h: { role: string; content: string }) => ({
    role: h.role as "user" | "assistant",
    content: h.content,
  })),
  {
    role: "user",
    content: message,
  },
],
      temperature: 0,
      max_tokens: 1024,
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "Could not generate response.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { reply: "Server error occurred." },
      { status: 500 }
    );
  }
}