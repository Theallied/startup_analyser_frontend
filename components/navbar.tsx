"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

type Props = {
  className?: string
  onAskAI?: () => void
}

export function Navbar({ className, onAskAI }: Props) {
  const [open, setOpen] = React.useState(false)

  return (
    <header className={cn("sticky top-0 z-30 w-full border-b bg-background/70 backdrop-blur", className)}>
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:py-4">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded bg-primary" aria-hidden="true" />
          <span className="font-semibold tracking-tight">Startup Analyzer</span>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Features
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
            How it works
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
            FAQ
          </a>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={onAskAI}>
            Ask AI
          </Button>
        </div>

        <button
          className="inline-flex items-center gap-2 rounded-md border px-3 py-2 md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="text-sm">Menu</span>
        </button>
      </nav>

      {open && (
        <div className="border-t md:hidden">
          <div className="mx-auto max-w-5xl px-4 py-3">
            <div className="flex flex-col gap-3">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Features
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                How it works
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                FAQ
              </a>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={onAskAI}>
                Ask AI
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
