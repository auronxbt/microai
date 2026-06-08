import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// ৪টি এপিআই কি-এর অ্যারে
const apiKeys = [
  process.env.GEMINI_KEY_1 || "",
  process.env.GEMINI_KEY_2 || "",
  process.env.GEMINI_KEY_3 || "",
  process.env.GEMINI_KEY_4 || "",
].filter(key => key.trim() !== ""); // খালি বা স্পেস থাকা কি-গুলো ফিল্টার করবে

// কঠোর ও প্রফেশনাল সিস্টেম প্রম্পট (উন্নত ফরম্যাটিং সহ)
const SYSTEM_INSTRUCTION = `
You are MicroAI, a highly professional, enterprise-grade AI assistant integrated into a Web3 dApp.
Your core directive is to provide direct, precise, and objective responses.

STRICT BEHAVIORAL RULES:
1. NO INTRODUCTIONS OR GREETINGS: Do not start with "Hello", "Hi", "I'm Aria", or welcome messages.
2. NO MARKETING/PRICING TALK: Never mention transaction fees or "$0.001 USDC".
3. TO-THE-POINT ANSWERS: Answer only what is asked without fluff or extra filler.
4. TONAL STYLE: Maintain an analytical, concise, confident, and professional tone.
5. STRICT FORMATTING FOR LISTS: When explaining multiple points, you MUST use clean markdown bullet points (using a hyphen '-' or an asterisk '*'). Ensure there is a proper line break after each point so they do not clump together into a single dense block of text.
`;

export async function POST(req: Request) {
  try {
    const { message, fileData, fileType } = await req.json();

    if (!message && !fileData) {
      return NextResponse.json({ error: "Message or File is required" }, { status: 400 });
    }

    if (apiKeys.length === 0) {
      return NextResponse.json({ reply: "Configuration error: No valid Gemini API Keys found." }, { status: 500 });
    }

    // contents অ্যারে তৈরি করা হচ্ছে
    const contents: any[] = [];

    if (fileData && fileType) {
      contents.push({
        inlineData: {
          data: fileData,
          mimeType: fileType
        }
      });
    }

    if (message) {
      contents.push(message);
    }

    let lastError: any = null;
    
    // 🔄 Failover Loop: প্রতিটি API Key একে একে ট্রাই করবে যদি কোনো একটি ফেল করে
    for (let i = 0; i < apiKeys.length; i++) {
      const currentKey = apiKeys[i];
      
      try {
        const ai = new GoogleGenAI({ apiKey: currentKey });
        
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.15,
            maxOutputTokens: 1000,
          }
        });

        // যদি রেসপন্স সফলভাবে চলে আসে, তবে লুপ এখানেই শেষ করে ডাটা রিটার্ন করবে
        const reply = response.text || "I'm sorry, I couldn't process that response.";
        return NextResponse.json({ reply });

      } catch (err) {
        console.warn(`Gemini Key ${i + 1} failed, trying next key...`);
        lastError = err; // এররটি সেভ করে রাখছি পরে দেখার জন্য
        continue; // লুপটি থামবে না, পরের কি (Key) দিয়ে ট্রাই করবে
      }
    }

    // যদি ৪টি কি-এর একটিও কাজ না করে, তখনই কেবল শেষ এররটি শো করবে
    console.error("All Gemini API Keys failed. Last Error Details:", lastError);
    return NextResponse.json({ reply: "An error occurred while generating the response via Gemini." }, { status: 500 });
    
  } catch (error) {
    console.error("Server Route Error:", error);
    return NextResponse.json({ reply: "An error occurred while processing your request." }, { status: 500 });
  }
}