import { ReactNode, useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
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
      className="h-9 w-9 text-muted-foreground hover:text-foreground"
      data-testid="button-theme-toggle"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
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
  { label: "Optimizer", href: "/#optimizer" },
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
      <header className="sticky top-0 z-[100] w-full bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2 shrink-0" data-testid="link-logo">
            <div className="dark:bg-white dark:p-0.5 dark:rounded-md">
              <img
                src="/images/logo.webp"
                alt="PromptFix - AI Prompt Fixer and Prompt Engineering Tool Logo"
                className="h-8 w-auto object-contain"
                width="32"
                height="32"
                loading="eager"
              />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              <span className="text-foreground">Prompt</span>
              <span className="text-primary">Fix</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1" data-testid="nav-desktop">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md"
                data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/#optimizer"
              className="hidden md:inline-flex items-center justify-center text-[13px] font-medium h-8 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              data-testid="button-get-started"
            >
              Get Started
            </a>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl" data-testid="nav-mobile">
            <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border/50 bg-muted/30 dark:bg-muted/10" data-testid="footer">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="col-span-2 sm:col-span-1">
              <a href="/" className="flex items-center gap-2 mb-3" data-testid="link-footer-logo">
                <div className="dark:bg-white dark:p-0.5 dark:rounded-md">
                  <img
                    src="/images/logo.webp"
                    alt="Get Prompt Fix - AI Prompt Fixer Tool"
                    className="h-6 w-auto object-contain"
                    width="24"
                    height="24"
                    loading="lazy"
                  />
                </div>
                <span className="text-sm font-semibold tracking-tight">
                  <span className="text-foreground">Prompt</span>
                  <span className="text-primary">Fix</span>
                </span>
              </a>
              <p className="text-xs text-muted-foreground mb-4 max-w-[200px] leading-relaxed">
                AI-powered prompt optimization for better results from any AI tool.
              </p>
              <div className="flex items-center gap-2.5">
                {shareLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground/60 hover:text-foreground transition-colors"
                    title={`Share on ${social.name}`}
                    data-testid={`link-social-${social.name.toLowerCase().replace(/[\s()]/g, "-")}`}
                  >
                    <social.icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider" data-testid="text-footer-product">Product</h3>
              <ul className="flex flex-col gap-2">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider" data-testid="text-footer-resources">Resources</h3>
              <ul className="flex flex-col gap-2">
                {resourceLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider" data-testid="text-footer-company">Company</h3>
              <ul className="flex flex-col gap-2">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-muted-foreground/60" data-testid="text-copyright">
              &copy; {new Date().getFullYear()} PromptFix. All rights reserved.
            </p>
            <a
              href="https://openai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-muted-foreground/60 hover:text-foreground transition-colors"
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
