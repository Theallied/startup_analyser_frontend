export function buildAnalysisPrompt({
  companyName,
  idea,
  platform,
}: {
  companyName: string
  idea: string
  platform: string
}) {
  return `
You are an expert startup analyst preparing founders for investors and programs like Shark Tank.
Analyze the following startup and return content that STRICTLY fits the provided JSON schema fields (no extra keys).
If data is uncertain, make reasonable, clearly labeled assumptions.

INPUTS
- Company Name: ${companyName}
- Idea: ${idea}
- Platform/Domain: ${platform}

GUIDELINES
- Keep language clear, specific, and investor-ready.
- Market: include defensible TAM/SAM/SOM statements with units and sources/assumptions.
- Financials: include 3–5 key assumptions, break-even framing, and succinct projections.
- Provide 6–10 readinessScores categories with normalized 0–100 scores (higher is better).
- Pitch: a 30–60 second, memorable, founder-style elevator pitch.

Return JSON only — the calling function validates the schema.
`
}
