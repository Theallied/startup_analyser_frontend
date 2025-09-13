"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts"

type Analysis = {
  overview: string
  problem: string
  solution: string
  targetAudience: string
  market: { tam: string; sam: string; som: string }
  usp: string
  businessModel: string[]
  unitEconomics: string
  cacLtv: string
  tractionIdeas: string[]
  financials: { assumptions: string[]; projections: string; breakEven: string }
  team: string[]
  productReadiness: string
  marketingSales: string[]
  competition: string[]
  differentiation: string[]
  legalCompliance: string[]
  equityValuation: string
  scalability: string
  exitStrategy: string[]
  pitch: string
  readinessScores: { category: string; score: number }[]
  risks: string[]
  nextSteps: string[]
}

export function AnalysisResult({
  data,
  companyName,
  platform,
}: {
  data: Analysis
  companyName: string
  platform: string
}) {
  const chartData = (data.readinessScores || []).map((d) => ({
    category: d.category,
    score: d.score,
  }))

  return (
    <div className="space-y-8">
      <Card className="border-slate-200">
        <CardHeader className="space-y-2">
          <Badge className="bg-teal-600 hover:bg-teal-600">Results</Badge>
          <CardTitle className="text-slate-900">{companyName || "Your Company"}</CardTitle>
          <CardDescription className="text-slate-600 capitalize">{platform}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">Overview</h3>
            <p className="text-slate-700">{data.overview}</p>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div>
                <p className="font-medium text-slate-900">TAM</p>
                <p className="text-slate-700">{data.market.tam}</p>
              </div>
              <div>
                <p className="font-medium text-slate-900">SAM</p>
                <p className="text-slate-700">{data.market.sam}</p>
              </div>
              <div>
                <p className="font-medium text-slate-900">SOM</p>
                <p className="text-slate-700">{data.market.som}</p>
              </div>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" tick={{ fontSize: 12, fill: "var(--color-foreground)" }} />
                <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "var(--color-foreground)" }} />
                <Tooltip />
                <Radar
                  name="Readiness"
                  dataKey="score"
                  stroke="var(--color-chart-1)"
                  fill="var(--color-chart-1)"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Section
          title="Problem & Solution"
          items={[
            { k: "Problem", v: data.problem },
            { k: "Solution", v: data.solution },
            { k: "Target Audience", v: data.targetAudience },
          ]}
        />

        <Section
          title="Unique Value & Competition"
          items={[
            { k: "USP", v: data.usp },
            { k: "Differentiation", v: bulletify(data.differentiation) },
            { k: "Competition", v: bulletify(data.competition) },
          ]}
        />

        <Section
          title="Business Model & Economics"
          items={[
            { k: "Business Models", v: bulletify(data.businessModel) },
            { k: "Unit Economics", v: data.unitEconomics },
            { k: "CAC vs LTV", v: data.cacLtv },
          ]}
        />

        <Section
          title="Financials"
          items={[
            { k: "Assumptions", v: bulletify(data.financials.assumptions) },
            { k: "Break-even", v: data.financials.breakEven },
            { k: "Projections", v: data.financials.projections },
          ]}
        />

        <Section
          title="Go-To-Market"
          items={[
            { k: "Marketing & Sales", v: bulletify(data.marketingSales) },
            { k: "Traction Ideas", v: bulletify(data.tractionIdeas) },
            { k: "Next Steps", v: bulletify(data.nextSteps) },
          ]}
        />

        <Section
          title="Team, Legal & Exit"
          items={[
            { k: "Team", v: bulletify(data.team) },
            { k: "Legal & Compliance", v: bulletify(data.legalCompliance) },
            { k: "Exit Strategy", v: bulletify(data.exitStrategy) },
          ]}
        />

        <Section
          title="Valuation & Scalability"
          items={[
            { k: "Equity & Valuation", v: data.equityValuation },
            { k: "Scalability", v: data.scalability },
            { k: "Risks", v: bulletify(data.risks) },
          ]}
        />
      </div>

      <Card className="border-teal-200">
        <CardHeader>
          <CardTitle className="text-slate-900">Investor Pitch</CardTitle>
          <CardDescription className="text-slate-700">
            A concise 30–60s narrative tailored to your inputs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-slate-800">{data.pitch}</p>
        </CardContent>
      </Card>
    </div>
  )
}

function Section({ title, items }: { title: string; items: { k: string; v: string }[] }) {
  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((it) => (
          <div key={it.k}>
            <p className="text-sm font-medium text-slate-900">{it.k}</p>
            <p className="text-slate-700">{it.v}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function bulletify(arr?: string[]) {
  if (!arr || arr.length === 0) return "—"
  return arr.map((x) => `• ${x}`).join("\n")
}
