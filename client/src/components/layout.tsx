import { ReactNode } from "react";
import { Sparkles } from "lucide-react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <img src="/images/logo.png" alt="PromptFix Logo" className="h-8 w-auto object-contain" />
              <h1 className="text-xl font-bold tracking-tight">
                <span className="text-foreground">Prompt</span>
                <span className="text-primary">Fix</span>
              </h1>
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
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

      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <img src="/images/logo.png" alt="PromptFix" className="h-6 w-auto grayscale opacity-50" />
              <span className="text-sm font-semibold text-muted-foreground">PromptFix</span>
            </div>
            
            <nav className="flex items-center gap-8">
              <a href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
              <a href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</a>
            </nav>

            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} PromptFix. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
