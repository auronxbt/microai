import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `You are a helpful AI assistant. Always format your responses beautifully using markdown:
- Use **bold** for important terms
- Use bullet points (- item) for lists
- Use numbered lists (1. item) for steps
- Use ## headings for sections
- Use \`code\` for technical terms
- Keep responses clear, concise and well-structured
- Never write walls of text`
        },
        { role: "user", content: message }
      ],
    }),
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;

  return NextResponse.json({ reply });
}