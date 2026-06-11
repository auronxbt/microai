import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { searchKnowledge } from "@/lib/search";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// -------------------------------
// SYSTEM PROMPT (FINAL CLEAN)
// -------------------------------
const SYSTEM_PROMPT = `
You are MicroAI — the official Arc & Circle Knowledge Hub.

RULES (STRICT):
1. Always answer using provided knowledge base first.
2. NEVER use external knowledge if context exists.
3. If no relevant knowledge exists, clearly say:
   "Not found in Arc/Circle knowledge base."
4. Do NOT hallucinate or guess unrelated blockchain info.
5. Stay strictly within Arc, Circle, USDC, CCTP, ERC-8004, ERC-8183.
6. If user asks follow-up like "explain more", expand previous answer.
7. Keep answers structured:

FORMAT:
- Short Answer (2–4 lines)
- Explanation (detailed if needed)
- Key Points (bullet list)
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
    const { message } = await req.json();

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
          content: `[ARC & CIRCLE KNOWLEDGE BASE]\n\n${context}`,
        },
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