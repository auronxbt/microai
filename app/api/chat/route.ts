import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Array of 4 Gemini API Keys for failover
const apiKeys = [
  process.env.GEMINI_KEY_1 || "",
  process.env.GEMINI_KEY_2 || "",
  process.env.GEMINI_KEY_3 || "",
  process.env.GEMINI_KEY_4 || "",
].filter(key => key.trim() !== ""); // Filters out empty or whitespace-only keys

// Enterprise-grade system prompt with strict word count and accuracy rules
const SYSTEM_INSTRUCTION = `
You are MicroAI, a highly professional, enterprise-grade AI assistant integrated into a Web3 dApp.
Your core directive is to provide direct, precise, and objective responses.

STRICT BEHAVIORAL RULES:
1. NO INTRODUCTIONS OR GREETINGS: Do not start with "Hello", "Hi", "I'm Aria", or welcome messages.
2. NO MARKETING/PRICING TALK: Never mention transaction fees or "$0.001 USDC".
3. TO-THE-POINT ANSWERS: Answer only what is asked without fluff or extra filler.
4. TONAL STYLE: Maintain an analytical, concise, confident, and professional tone.
5. STRICT FORMATTING FOR LISTS: When explaining multiple points, you MUST use clean markdown bullet points (using a hyphen '-' or an asterisk '*'). Ensure there is a proper line break after each point so they do not clump together into a single dense block of text.
6. WORD COUNT ADHERENCE & HONESTY: If the user requests a specific word count (e.g., a 500-word article), you must strictly target that length. Do not generate overly long or brief content. Crucially, if the user asks you to verify or recount the words you wrote, DO NOT guess or hallucinate an exact number like "499 words" unless you are absolutely certain. Be honest about length constraints or provide a realistic approximation if requested.
`;

export async function POST(req: Request) {
  try {
    const { message, messages, fileData, fileType } = await req.json();

    if (!message && !messages && !fileData) {
      return NextResponse.json({ error: "Message, Messages history or File is required" }, { status: 400 });
    }

    if (apiKeys.length === 0) {
      return NextResponse.json({ reply: "Configuration error: No valid Gemini API Keys found." }, { status: 500 });
    }

    // Initialize contents array structured for Gemini SDK
    let contents: any[] = [];

    // 1. Process chat history (messages) if provided by the frontend
    if (messages && Array.isArray(messages)) {
      contents = messages.map((msg: any) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content || msg.text || "" }]
      }));
    } 
    // 2. Backward compatibility: Fallback if only a single message string is sent
    else if (message) {
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });
    }

    // 3. Inject file or image data if present
    if (fileData && fileType) {
      const filePart = {
        inlineData: {
          data: fileData,
          mimeType: fileType
        }
      };
      
      if (contents.length > 0) {
        // Prepend file to the last user message part to maintain dynamic context
        const lastMsg = contents[contents.length - 1];
        if (lastMsg.role === "user") {
          lastMsg.parts.unshift(filePart);
        } else {
          contents.push({ role: "user", parts: [filePart] });
        }
      } else {
        contents.push({ role: "user", parts: [filePart] });
      }
    }

    let lastError: any = null;
    
    // 🔄 Failover Loop: Iterates through keys sequentially if one fails
    for (let i = 0; i < apiKeys.length; i++) {
      const currentKey = apiKeys[i];
      
      try {
        const ai = new GoogleGenAI({ apiKey: currentKey });
        
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.25,
            maxOutputTokens: 2000,
          }
        });

        // Return early on successful response execution
        const reply = response.text || "I'm sorry, I couldn't process that response.";
        return NextResponse.json({ reply });

      } catch (err) {
        console.warn(`Gemini Key ${i + 1} failed, trying next key...`);
        lastError = err; // Track last error state for diagnostics
        continue; 
      }
    }

    // Triggered only if all API keys fail loop verification
    console.error("All Gemini API Keys failed. Last Error Details:", lastError);
    return NextResponse.json({ reply: "An error occurred while generating the response via Gemini." }, { status: 500 });
    
  } catch (error) {
    console.error("Server Route Error:", error);
    return NextResponse.json({ reply: "An error occurred while processing your request." }, { status: 500 });
  }
}