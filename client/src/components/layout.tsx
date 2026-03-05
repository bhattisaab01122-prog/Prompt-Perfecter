import { ReactNode, useState } from "react";
import { Sparkles, Moon, Sun, Menu, X } from "lucide-react";
import { SiX, SiFacebook, SiLinkedin } from "react-icons/si";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      data-testid="button-theme-toggle"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
];

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
    icon: SiFacebook,
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
  },
  {
    name: "LinkedIn",
    icon: SiLinkedin,
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  },
];

const productLinks = [
  { label: "Home", href: "/" },
  { label: "Start Optimizing", href: "/#optimizer" },
  { label: "Pricing", href: "/#pricing" },
];

const resourceLinks = [
  { label: "AI Tips", href: "/articles/hallucinations" },
  { label: "Midjourney Guide", href: "/articles/midjourney" },
];

const companyLinks = [
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export function Layout({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <header className="sticky top-0 z-[100] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2 shrink-0" data-testid="link-logo">
            <div className="dark:bg-white dark:p-1 dark:rounded-lg dark:shadow-[0_0_10px_rgba(255,255,255,0.2)]">
              <img
                src="/images/logo.webp"
                alt="PromptFix - AI Prompt Fixer and Prompt Engineering Tool Logo"
                className="h-10 w-auto object-contain"
                width="40"
                height="40"
                loading="eager"
              />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-foreground">Prompt</span>
              <span className="text-primary">Fix</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1" data-testid="nav-desktop">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md"
                data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button size="sm" asChild className="hidden md:inline-flex">
              <a href="/#optimizer" data-testid="link-get-started">
                <Sparkles className="w-4 h-4 mr-1.5" />
                Get Started
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background" data-testid="nav-mobile">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2.5 rounded-md hover-elevate"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </a>
              ))}
              <Button className="w-full mt-2" size="sm" asChild>
                <a
                  href="/#optimizer"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="link-mobile-get-started"
                >
                  <Sparkles className="w-4 h-4 mr-1.5" />
                  Get Started
                </a>
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-muted/30 border-t" data-testid="footer">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <a href="/" className="flex items-center gap-2 mb-3" data-testid="link-footer-logo">
                <div className="dark:bg-white dark:p-0.5 dark:rounded-md dark:shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                  <img
                    src="/images/logo.webp"
                    alt="Get Prompt Fix - AI Prompt Fixer Tool"
                    className="h-8 w-auto object-contain"
                    width="32"
                    height="32"
                    loading="lazy"
                  />
                </div>
                <span className="text-lg font-bold tracking-tight">
                  <span className="text-foreground">Prompt</span>
                  <span className="text-primary">Fix</span>
                </span>
              </a>
              <p className="text-sm text-muted-foreground mb-4 max-w-xs">
                Transform your AI prompts into powerful, optimized instructions that deliver better results every time.
              </p>
              <div className="flex items-center gap-3">
                {shareLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    title={`Share on ${social.name}`}
                    data-testid={`link-social-${social.name.toLowerCase().replace(/[\s()]/g, "-")}`}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3" data-testid="text-footer-product">Product</h3>
              <ul className="flex flex-col gap-2">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3" data-testid="text-footer-resources">Resources</h3>
              <ul className="flex flex-col gap-2">
                {resourceLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3" data-testid="text-footer-company">Company</h3>
              <ul className="flex flex-col gap-2">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground" data-testid="text-copyright">
              &copy; {new Date().getFullYear()} PromptFix. All rights reserved.
            </p>
            <a
              href="https://openai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-powered-by"
            >
              Powered by OpenAI
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
