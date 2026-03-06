import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid messages format" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Filter out the initial greeting
    let validMessages = messages;
    if (validMessages.length > 0 && validMessages[0].sender === "bot") {
      validMessages = validMessages.slice(1);
    }

    // Normalize messages to ensure alternating user/model turns
    const normalizedMessages = [];
    let currentRole = null;
    let currentText = "";

    for (const m of validMessages) {
      const role = m.sender === "bot" ? "model" : "user";
      if (currentRole === role) {
        currentText += "\n\n" + m.content;
      } else {
        if (currentRole !== null) {
          normalizedMessages.push({
            role: currentRole,
            parts: [{ text: currentText }],
          });
        }
        currentRole = role;
        currentText = m.content;
      }
    }

    if (currentRole !== null) {
      normalizedMessages.push({
        role: currentRole,
        parts: [{ text: currentText }],
      });
    }

    // Gemini API requires the conversation to start with a user message
    if (
      normalizedMessages.length > 0 &&
      normalizedMessages[0].role === "model"
    ) {
      normalizedMessages.shift();
    }

    if (normalizedMessages.length === 0) {
      return new Response(JSON.stringify({ error: "No user messages found" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const responseStream = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: normalizedMessages,
      config: {
        systemInstruction:
          "You are Randy, a Senior Full Stack & CMS Developer with 10+ years of experience. You build scalable web applications and help businesses fix and improve their web apps. Respond in a friendly, professional tone. Keep your responses concise and helpful.",
      },
    });

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of responseStream) {
            const text = chunk.text;
            if (text) {
              // Convert text to JSON string carefully to avoid breaking the JSON
              const textContent = JSON.stringify({ content: text });
              controller.enqueue(encoder.encode(`data: ${textContent}\n\n`));
            }
          }
          controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
          controller.close();
        } catch (error) {
          console.error("Stream error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error in chat API:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate content" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
