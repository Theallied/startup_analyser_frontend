import { NextResponse } from "next/server"
import { google } from "@ai-sdk/google"
import { generateObject } from "ai"
import { AnalysisSchema } from "@/lib/schema"
import { buildAnalysisPrompt } from "@/lib/prompt"

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
    if (!apiKey) {
      return new NextResponse(
        "Missing GOOGLE_GENERATIVE_AI_API_KEY environment variable. Add your Gemini key in Project Settings.",
        { status: 500 },
      )
    }

    const { companyName, idea, platform } = await req.json()

    if (!companyName || !idea || !platform) {
      return new NextResponse("companyName, idea, and platform are required", { status: 400 })
    }

    const prompt = buildAnalysisPrompt({ companyName, idea, platform })

    const { object } = await generateObject({
      // You can pass the API key implicitly via env var; we've already validated it's present.
      model: google("gemini-1.5-flash"),
      schema: AnalysisSchema,
      prompt,
    })

    return NextResponse.json(object)
  } catch (err: any) {
    console.error("[v0] analyze error:", err)
    return new NextResponse("Failed to generate analysis", { status: 500 })
  }
}
