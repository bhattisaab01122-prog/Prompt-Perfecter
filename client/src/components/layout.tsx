import { ReactNode } from "react";
import { Sparkles } from "lucide-react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/images/logo.png" alt="PromptFix Logo" className="h-8 w-auto mr-3 object-contain" />
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              PromptFix
            </h1>
          </div>
          <nav className="flex gap-4">
            <a href="https://openai.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Powered by OpenAI
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto px-4 flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            Built with React, Tailwind & shadcn/ui.
          </p>
        </div>
      </footer>
    </div>
  );
}
