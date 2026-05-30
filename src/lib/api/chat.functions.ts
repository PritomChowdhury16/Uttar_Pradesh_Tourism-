import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string().min(1).max(4000),
});

export const chatWithGuide = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      messages: z.array(MessageSchema).min(1).max(40),
      context: z.string().min(1).max(2000),
    }),
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");

    const systemPrompt = `You are a knowledgeable, warm guide for Uttar Pradesh's sacred destinations. Currently the user is exploring: ${data.context}. Answer questions about temples, history, rituals, timings, travel tips, nearby food and stays. Keep answers concise (2-4 sentences), friendly, and culturally respectful. Use markdown sparingly.`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: systemPrompt }, ...data.messages],
      }),
    });

    if (!res.ok) {
      if (res.status === 429) throw new Error("Rate limit exceeded. Please try again shortly.");
      if (res.status === 402) throw new Error("AI credits depleted. Please add credits to continue.");
      throw new Error(`AI gateway error: ${res.status}`);
    }

    const json = await res.json();
    const reply = json.choices?.[0]?.message?.content ?? "";
    return { reply };
  });
