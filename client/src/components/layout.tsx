import { ReactNode } from "react";
import { Sparkles, Twitter, Facebook, Linkedin, Moon, Sun } from "lucide-react";
import { SiX } from "react-icons/si";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="h-9 w-9"
      data-testid="button-theme-toggle"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const shareUrl = "https://getpromptfix.com/";
  const shareText = "Check out PromptFix - The ultimate AI Prompt Optimizer!";

  const shareLinks = [
    {
      name: "X (Twitter)",
      icon: SiX,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
  ];
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <img src="/images/logo.webp" alt="PromptFix - AI Prompt Fixer and Prompt Engineering Tool Logo" className="h-12 w-auto object-contain dark:invert dark:brightness-[2]" loading="eager" />
              <span className="text-xl font-bold tracking-tight">
                <span className="text-foreground">Prompt</span>
                <span className="text-primary">Fix</span>
              </span>
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
          </div>
          <nav className="flex items-center gap-4">
            <ThemeToggle />
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
              <img src="/images/logo.webp" alt="Get Prompt Fix - AI Prompt Fixer Tool" className="h-6 w-auto grayscale opacity-50 dark:invert dark:brightness-[2]" loading="lazy" />
              <span className="text-sm font-semibold text-muted-foreground">PromptFix</span>
            </div>
            
            <div className="flex flex-col items-center md:items-start gap-4">
              <nav className="flex items-center gap-8">
                <a href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
                <a href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</a>
              </nav>
              
              <div className="flex items-center gap-4 mt-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Share:</span>
                {shareLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-all hover:scale-110"
                    title={`Share on ${social.name}`}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} PromptFix. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
