"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Loader2, Sparkles } from "lucide-react"

type Message = { role: "user" | "assistant"; content: string }

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  context: { companyName: string; idea: string; platform: string }
}

export function ChatbotAssistant({ open, onOpenChange, context }: Props) {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I can suggest startup names, taglines, and graph ideas (TAM/SAM/SOM, funnel, cohorts, radar). Tell me about your idea or press a quick prompt below.",
    },
  ])
  const [input, setInput] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages, open])

  async function send(prompt?: string) {
    const userText = prompt ?? input
    if (!userText.trim()) return
    const nextMessages = [...messages, { role: "user", content: userText }]
    setMessages(nextMessages)
    setInput("")
    setLoading(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, context }),
      })
      if (!res.ok) throw new Error(await res.text())
      const data = (await res.json()) as { reply: string }
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }])
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry—something went wrong generating suggestions. Please try again." },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Naming & Graph Ideas
          </DialogTitle>
        </DialogHeader>

        {/* Context preview (editable to improve suggestions) */}
        <div className="grid gap-3 md:grid-cols-3">
          <div className="space-y-1">
            <Label htmlFor="ctx-company">Company</Label>
            <Input id="ctx-company" value={context.companyName} readOnly />
          </div>
          <div className="space-y-1">
            <Label htmlFor="ctx-platform">Platform</Label>
            <Input id="ctx-platform" value={context.platform} readOnly />
          </div>
          <div className="md:col-span-3 space-y-1">
            <Label htmlFor="ctx-idea">Idea</Label>
            <Textarea id="ctx-idea" value={context.idea} readOnly className="min-h-16" />
          </div>
        </div>

        {/* Messages */}
        <div ref={containerRef} className="max-h-64 overflow-y-auto rounded border p-3">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "mb-2 text-foreground" : "mb-2 text-muted-foreground"}>
              <span className="text-xs uppercase tracking-wide">{m.role}</span>
              <div className="whitespace-pre-wrap leading-6">{m.content}</div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Thinking…
            </div>
          )}
        </div>

        {/* Quick prompts */}
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={() => send("Give me 10 startup name ideas with short reasons.")}>
            10 Name Ideas
          </Button>
          <Button size="sm" variant="outline" onClick={() => send("Suggest 5 compelling taglines for my startup.")}>
            Taglines
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => send("What graphs should I show in a pitch deck? Propose titles and what they prove.")}
          >
            Graph Ideas
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => send("Draft a short elevator pitch (<120 words) highlighting USP and market fit.")}
          >
            Elevator Pitch
          </Button>
        </div>

        {/* Input */}
        <div className="flex items-center gap-2">
          <Input
            placeholder="Ask for names, taglines, or graph ideas…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                send()
              }
            }}
          />
          <Button onClick={() => send()} disabled={loading}>
            Send
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
