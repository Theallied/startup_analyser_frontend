"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AnalysisResult } from "@/components/analysis-result"
import { Loader2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { ChatbotAssistant } from "@/components/chatbot-assistant"

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

export default function HomePage() {
  const [companyName, setCompanyName] = useState("")
  const [idea, setIdea] = useState("")
  const [platform, setPlatform] = useState<string>("education")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<Analysis | null>(null)
  const [chatOpen, setChatOpen] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setData(null)
    setLoading(true)
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName, idea, platform }),
      })
      if (!res.ok) {
        const msg = await res.text()
        throw new Error(msg || "Failed to analyze")
      }
      const json = (await res.json()) as Analysis
      setData(json)
    } catch (err: any) {
      setError(err?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <Navbar onAskAI={() => setChatOpen(true)} />

      <section className="border-b">
        <div className="mx-auto max-w-5xl px-4 py-10 md:py-16">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl space-y-5">
              <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary">AI-Powered</Badge>
              <h1 className="text-pretty text-4xl font-bold tracking-tight md:text-6xl text-foreground">
                Turn your idea into an investor-ready plan
              </h1>
              <p className="text-pretty text-muted-foreground md:text-lg">
                Enter Company, Idea, and Platform. Get a complete analysis across Problem/Solution, Market, USP,
                Business Model, Financials, Risks, and more — plus a readiness radar.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => {
                    const el = document.getElementById("analyze-form")
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
                  }}
                >
                  Analyze My Idea
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 bg-transparent"
                  onClick={() => setChatOpen(true)}
                >
                  Get Name & Graph Ideas
                </Button>
              </div>
              <ul className="grid grid-cols-1 gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                  Structured output mapped to pitch sections
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                  TAM/SAM/SOM guidance and traction ideas
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                  Readiness radar per category
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                  Secure server-side AI with your key
                </li>
              </ul>
            </div>

            <div className="w-full max-w-sm">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-primary">Get Started</CardTitle>
                  <CardDescription>3 fields. Full analysis.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form id="analyze-form" onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        placeholder="e.g., BrightLearn"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="idea">Idea</Label>
                      <Textarea
                        id="idea"
                        placeholder="Briefly describe your product or service and the problem it solves."
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                        required
                        className="min-h-24"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Platform / Domain</Label>
                      <Select value={platform} onValueChange={setPlatform}>
                        <SelectTrigger aria-label="Select platform">
                          <SelectValue placeholder="Select a domain" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="teaching">Teaching</SelectItem>
                          <SelectItem value="cooking">Cooking</SelectItem>
                          <SelectItem value="health">Health</SelectItem>
                          <SelectItem value="fitness">Fitness</SelectItem>
                          <SelectItem value="productivity">Productivity</SelectItem>
                          <SelectItem value="fintech">Fintech</SelectItem>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                          <SelectItem value="creator">Creator Tools</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="inline-flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          Analyzing...
                        </span>
                      ) : (
                        "Analyze with AI"
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground">Secure server-side AI. Your API key stays private.</p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Analysis</h2>
            <Separator className="hidden flex-1 md:block" />
          </div>

          {error && (
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600">Error</CardTitle>
                <CardDescription className="text-red-700">{error}</CardDescription>
              </CardHeader>
            </Card>
          )}

          {!error && !data && !loading && (
            <div className="text-slate-600">Submit the form to see your tailored, investor-ready analysis.</div>
          )}

          {data && <AnalysisResult data={data} companyName={companyName} platform={platform} />}
        </div>
      </section>

      <ChatbotAssistant open={chatOpen} onOpenChange={setChatOpen} context={{ companyName, idea, platform }} />

      <div className="fixed bottom-4 right-4 z-40">
        <Button className="shadow-md" onClick={() => setChatOpen(true)}>
          Ask AI
        </Button>
      </div>

      <footer className="border-t">
        <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-muted-foreground">
          Built with Next.js + AI SDK. Primary: cyan-600, Accent: indigo-500, Neutrals: white/gray.
        </div>
      </footer>
    </main>
  )
}
