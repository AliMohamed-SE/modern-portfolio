// pages/api/chat.ts (Next.js / app router server function)
// or app/api/chat/route.ts depending on your setup
import { NextResponse } from "next/server";
import pc from "@/db/db.config";

const OPENAI_CHAT_MODEL = "gpt-4o-mini";
const PINECONE_INDEX = "integrated-dense-js";
const PINECONE_NAMESPACE = "portfolio-assistant";

const SYSTEM_PROMPT = `You are "Ali's Personal Assistant", a witty, humorous, and helpful AI that represents Ali and only discusses topics directly related to Ali's services, portfolio projects, processes, tools, experience, proposals, and collaboration details.

Hard rules:
- If a user asks anything unrelated to Ali, Ali's services, portfolio, tech stack, process, or collaboration logistics, politely decline with a short playful line and redirect them back to Ali's professional work.
- Never participate in general discussions (e.g., news, hobbies, personal life, medical, legal, financial, or political topics).
- If someone asks about pricing, **never provide exact numbers**. Instead, explain that pricing depends on project scope and advise them to **contact Ali directly for an estimation**.
- Always keep responses concise, friendly, and on-brand. Use light humor, not sarcasm.

Style & formatting:
- Be clear, human-sounding, and structured.
- Organize information with **sections, bullet points, or short paragraphs** (avoid big clumps of text).
- Highlight key offerings, tools, or processes with bullet points or numbered steps.
- When declining, be polite, playful, and nudge the conversation back toward Ali’s services, projects, or tech stack.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const question = body?.question;
    const history = Array.isArray(body?.history) ? body.history : [];

    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "Missing question" }, { status: 400 });
    }

    // 2) Query Pinecone with the vector
    const index = pc.index(PINECONE_INDEX).namespace(PINECONE_NAMESPACE);
    const response = await index.searchRecords({
      query: { topK: 4, inputs: { text: question } },
      rerank: {
        model: "bge-reranker-v2-m3",
        topN: 2,
        rankFields: ["chunk_text"],
      },
      fields: ["category", "chunk_text"],
    });

    // 2) Extract the chunk_text values
    const contexts = response.result.hits.map((hit) => {
      const fields = hit.fields as { chunk_text: string };
      return fields.chunk_text.trim();
    });

    const context = contexts.join("\n\n---\n\n");

    // 4) Build the chat messages (system + context + history + user)
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      context
        ? {
            role: "system",
            content: `Relevant portfolio context:\n\n${context}`,
          }
        : null,
      // include sanitized history if you want
      ...history.filter((h: any) => h && typeof h.content === "string"),
      { role: "user", content: question },
    ].filter(Boolean);

    // 5) Call OpenAI chat completions
    const chatResp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_CHAT_MODEL,
        messages,
        max_tokens: 500,
        temperature: 0.2,
      }),
    });

    if (!chatResp.ok) {
      const txt = await chatResp.text().catch(() => "");
      return NextResponse.json(
        { error: "OpenAI chat error", details: txt },
        { status: 502 }
      );
    }

    const chatJson = await chatResp.json();
    const reply = chatJson?.choices?.[0]?.message?.content;
    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
