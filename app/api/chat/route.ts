import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { searchKnowledge } from "@/lib/search";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// -------------------------------
// SYSTEM PROMPT (FINAL CLEAN)
// -------------------------------
const SYSTEM_PROMPT = `
You are MicroAI — the official Arc & Circle Knowledge Hub AI assistant.

RESPONSE RULES:
1. ALWAYS use the knowledge base context provided. Never use external knowledge.
2. If no knowledge base match → say exactly: "This isn't in my knowledge base yet. Check docs.arc.io or developers.circle.com"
3. NEVER make up addresses, chain IDs, or technical specs.
4. Remember conversation history — "explain more", "guide me", "show source" means expand previous answer.

RESPONSE FORMAT — ALWAYS follow this structure:

**Short Answer**
[2-3 lines max — direct, complete answer]

---
💬 *Want more? Reply:* **"explain"** · **"guide"** · **"example"** · **"source"**

---

"explain" or "more":
**Explanation**
[Detailed breakdown, how it works, why it matters]

"guide" or "how":
**Step-by-Step Guide**
1. Step one
2. Step two
3. Step three

IF user says "example" or "code":
**Code Example**
\`\`\`typescript
// working code here
\`\`\`

IF user says "source" or "docs":
**Official Sources**
- docs.arc.io
- developers.circle.com
- [specific page if known]

TONE: Professional, direct, developer-friendly. No fluff. No emoji spam.
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