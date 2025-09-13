import { z } from "zod"

export const AnalysisSchema = z.object({
  overview: z.string(),
  problem: z.string(),
  solution: z.string(),
  targetAudience: z.string(),
  market: z.object({
    tam: z.string(),
    sam: z.string(),
    som: z.string(),
  }),
  usp: z.string(),
  businessModel: z.array(z.string()),
  unitEconomics: z.string(),
  cacLtv: z.string(),
  tractionIdeas: z.array(z.string()),
  financials: z.object({
    assumptions: z.array(z.string()),
    projections: z.string(),
    breakEven: z.string(),
  }),
  team: z.array(z.string()),
  productReadiness: z.string(),
  marketingSales: z.array(z.string()),
  competition: z.array(z.string()),
  differentiation: z.array(z.string()),
  legalCompliance: z.array(z.string()),
  equityValuation: z.string(),
  scalability: z.string(),
  exitStrategy: z.array(z.string()),
  pitch: z.string(),
  readinessScores: z
    .array(
      z.object({
        category: z.string(),
        score: z.number().min(0).max(100),
      }),
    )
    .min(5)
    .max(12),
  risks: z.array(z.string()),
  nextSteps: z.array(z.string()),
})

export type AnalysisShape = z.infer<typeof AnalysisSchema>
