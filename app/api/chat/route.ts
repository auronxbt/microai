import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// ৪টি এপিআই কি-এর অ্যারে
const apiKeys = [
  process.env.GEMINI_KEY_1 || "",
  process.env.GEMINI_KEY_2 || "",
  process.env.GEMINI_KEY_3 || "",
  process.env.GEMINI_KEY_4 || "",
].filter(key => key !== "");

// লোড ব্যালেন্সিং বা কি пулিং মেকানিজম
const getRandomAIInstance = () => {
  if (apiKeys.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * apiKeys.length);
  const selectedKey = apiKeys[randomIndex];
  return new GoogleGenAI({ apiKey: selectedKey });
};

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
    // ফ্রন্টএন্ড থেকে পাঠানো message, fileData এবং fileType রিসিভ করা হচ্ছে
    const { message, fileData, fileType } = await req.json();

    if (!message && !fileData) {
      return NextResponse.json({ error: "Message or File is required" }, { status: 400 });
    }

    const ai = getRandomAIInstance();
    if (!ai) {
      return NextResponse.json({ reply: "Configuration error: No valid Gemini API Keys found." }, { status: 500 });
    }

    // নতুন @google/genai SDK-র জন্য contents অ্যারে তৈরি করা হচ্ছে
    const contents: any[] = [];

    // ১. যদি ফ্রন্টএন্ড থেকে ইমেজ ফাইলের Base64 ডাটা ও টাইপ আসে, তবে তা ইনলাইন পার্ট হিসেবে যুক্ত হবে
    if (fileData && fileType) {
      contents.push({
        inlineData: {
          data: fileData,
          mimeType: fileType
        }
      });
    }

    // ২. ইউজারের টেক্সট মেসেজটি অ্যারেতে যোগ করা হচ্ছে (ফাইল থাকুক বা না থাকুক)
    if (message) {
      contents.push(message);
    }

    // Gemini 2.5 Flash মডেল কল করা হচ্ছে মাল্টিমোডাল সাপোর্ট সহ
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents, // এখানে আমাদের প্রসেস করা contents অ্যারে পাস করা হলো
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.15, // ক্রিয়েটিভিটি কমিয়ে ১০০% অবজেক্টিভ রেসপন্স নিশ্চিত করতে
        maxOutputTokens: 1000,
      }
    });

    const reply = response.text || "I'm sorry, I couldn't process that response.";
    return NextResponse.json({ reply });
    
  } catch (error) {
    console.error("Gemini Pool Error Details:", error);
    return NextResponse.json({ reply: "An error occurred while generating the response via Gemini." }, { status: 500 });
  }
}