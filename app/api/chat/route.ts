import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message, systemPrompt } = await req.json();

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: systemPrompt || "You are Aria, a helpful AI assistant."
        },
        { role: "user", content: message }
      ],
      max_tokens: 1024,
    }),
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;
  return NextResponse.json({ reply });
}
