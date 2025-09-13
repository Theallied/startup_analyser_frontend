import { NextResponse } from "next/server"
import { google } from "@ai-sdk/google"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
    if (!apiKey) {
      return new NextResponse(
        "Missing GOOGLE_GENERATIVE_AI_API_KEY environment variable. Add your Gemini key in Project Settings.",
        { status: 500 },
      )
    }

    const body = await req.json().catch(() => ({}))
    const { messages = [], context = {} } = body as {
      messages: { role: "user" | "assistant"; content: string }[]
      context: { companyName?: string; idea?: string; platform?: string }
    }

    const system =
      "You help startup founders by proposing: (1) 5–10 brandable startup name ideas with short rationales," +
      " (2) 3–6 strong taglines, and (3) useful pitch-deck graph ideas (e.g., TAM/SAM/SOM bar chart, funnel, cohort retention, LTV vs. CAC, radar of readiness)." +
      " Keep answers concise and skimmable using bullets. Be specific to the user's idea and platform."

    const lastUser =
      messages
        .slice()
        .reverse()
        .find((m) => m.role === "user")?.content ?? "Suggest startup names and graphs."
    const contextNote = `Context — company: ${context.companyName || "N/A"}, platform: ${context.platform || "N/A"}, idea: ${context.idea || "N/A"}.`

    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      system,
      prompt: `${contextNote}\n\nUser: ${lastUser}`,
    })

    return NextResponse.json({ reply: text })
  } catch (err) {
    console.error("[v0] chat error:", err)
    return new NextResponse("Failed to generate chat reply", { status: 500 })
  }
}
