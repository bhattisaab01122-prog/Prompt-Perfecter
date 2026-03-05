import { useState } from "react";
import { Layout } from "@/components/layout";
import { useOptimizePrompt } from "@/hooks/use-optimizations";
import { HistoryList } from "@/components/history-list";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { Wand2, Copy, Check, ArrowRight, Sparkles, Zap, Target, ChevronRight, Crown, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

const CHAR_LIMIT = 1000;

export default function Home() {
  const [originalPrompt, setOriginalPrompt] = useState("");
  const [optimizedPrompt, setOptimizedPrompt] = useState("");
  const [promptScore, setPromptScore] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [tone, setTone] = useState("Professional");
  const [purpose, setPurpose] = useState("Blog Post");
  const [depth, setDepth] = useState("Medium");
  const { toast } = useToast();

  const optimizeMutation = useOptimizePrompt();

  const handleOptimize = () => {
    if (!originalPrompt.trim()) {
      toast({
        title: "Input required",
        description: "Please enter a prompt to optimize.",
        variant: "destructive",
      });
      return;
    }

    optimizeMutation.mutate(
      { prompt: originalPrompt, tone, purpose, depth },
      {
        onSuccess: (data) => {
          setOptimizedPrompt(data.optimizedPrompt);
          setPromptScore(data.promptScore);
          toast({ description: "Prompt optimized successfully." });
        },
        onError: (error) => {
          toast({
            title: "Optimization failed",
            description: error.message || "Something went wrong. Please try again.",
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleCopy = () => {
    if (!optimizedPrompt) return;
    navigator.clipboard.writeText(optimizedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ description: "Copied to clipboard" });
  };

  const handlePromptChange = (value: string) => {
    if (value.length <= CHAR_LIMIT) {
      setOriginalPrompt(value);
    }
  };

  const loadFromHistory = (original: string, optimized: string) => {
    setOriginalPrompt(original);
    setOptimizedPrompt(optimized);
    setPromptScore(null);
    document.getElementById("optimizer")?.scrollIntoView({ behavior: "smooth" });
  };

  const charCount = originalPrompt.length;
  const wordCount = originalPrompt.trim() ? originalPrompt.trim().split(/\s+/).length : 0;

  return (
    <Layout>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-8 md:pt-24 md:pb-12" aria-label="Hero">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance leading-[1.15]"
            data-testid="text-hero-heading"
          >
            Write better prompts.
            <br />
            <span className="text-primary">Get better results.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed"
            data-testid="text-hero-description"
          >
            Paste any rough prompt and get an optimized, production-ready version in seconds. Free, no signup required.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-6"
          >
            <Button
              size="lg"
              className="text-sm font-medium h-10 px-6"
              onClick={() => document.getElementById("optimizer")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="button-cta-hero"
            >
              Try it now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      <section id="optimizer" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16" aria-label="AI Prompt Optimizer Tool">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          <div className="lg:col-span-8 space-y-5">
            <div className="flex flex-wrap items-end gap-3" data-testid="settings-panel">
              <div className="flex-1 min-w-[120px]">
                <label htmlFor="tone-select" className="text-xs font-medium text-muted-foreground mb-1.5 block">Tone</label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger id="tone-select" data-testid="select-tone" className="h-9 text-sm" aria-label="Select tone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Professional" data-testid="select-item-tone-professional">Professional</SelectItem>
                    <SelectItem value="Casual" data-testid="select-item-tone-casual">Casual</SelectItem>
                    <SelectItem value="Creative" data-testid="select-item-tone-creative">Creative</SelectItem>
                    <SelectItem value="Technical" data-testid="select-item-tone-technical">Technical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 min-w-[120px]">
                <label htmlFor="purpose-select" className="text-xs font-medium text-muted-foreground mb-1.5 block">Purpose</label>
                <Select value={purpose} onValueChange={setPurpose}>
                  <SelectTrigger id="purpose-select" data-testid="select-purpose" className="h-9 text-sm" aria-label="Select purpose">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Blog Post" data-testid="select-item-purpose-blog">Blog Post</SelectItem>
                    <SelectItem value="Email" data-testid="select-item-purpose-email">Email</SelectItem>
                    <SelectItem value="Social Media" data-testid="select-item-purpose-social">Social Media</SelectItem>
                    <SelectItem value="Coding" data-testid="select-item-purpose-coding">Coding</SelectItem>
                    <SelectItem value="AI Art" data-testid="select-item-purpose-art">AI Art</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 min-w-[120px]">
                <label htmlFor="depth-select" className="text-xs font-medium text-muted-foreground mb-1.5 block">Depth</label>
                <Select value={depth} onValueChange={setDepth}>
                  <SelectTrigger id="depth-select" data-testid="select-depth" className="h-9 text-sm" aria-label="Select output depth">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Short" data-testid="select-item-depth-short">Short</SelectItem>
                    <SelectItem value="Medium" data-testid="select-item-depth-medium">Medium</SelectItem>
                    <SelectItem value="Detailed" data-testid="select-item-depth-detailed">Detailed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card overflow-hidden" data-testid="card-input-prompt">
              <Textarea
                placeholder="Describe what you want the AI to do..."
                className="min-h-[160px] resize-none text-sm border-0 rounded-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-4 py-3"
                value={originalPrompt}
                onChange={(e) => handlePromptChange(e.target.value)}
                maxLength={CHAR_LIMIT}
                data-testid="input-prompt"
              />
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-border/50 bg-muted/20">
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground/60">
                  <span data-testid="text-word-count">{wordCount} words</span>
                  <span data-testid="text-char-count" className={cn(charCount > CHAR_LIMIT * 0.9 && "text-destructive font-medium")}>
                    {charCount}/{CHAR_LIMIT}
                  </span>
                </div>
                <Button
                  onClick={handleOptimize}
                  disabled={optimizeMutation.isPending || !originalPrompt.trim()}
                  size="sm"
                  className="h-8 text-xs font-medium px-4"
                  data-testid="button-optimize"
                >
                  {optimizeMutation.isPending ? (
                    <span className="flex items-center gap-1.5">
                      <span className="h-3 w-3 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Optimizing
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <Wand2 className="h-3.5 w-3.5" />
                      Optimize
                    </span>
                  )}
                </Button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {optimizeMutation.isPending ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="rounded-xl border border-border bg-card p-8"
                  data-testid="optimizer-loading"
                >
                  <div className="flex flex-col items-center justify-center text-center space-y-3">
                    <div className="h-8 w-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                    <div>
                      <p className="text-sm font-medium text-foreground" data-testid="text-loading-title">Optimizing your prompt</p>
                      <p className="text-xs text-muted-foreground mt-0.5" data-testid="text-loading-subtitle">This usually takes a few seconds</p>
                    </div>
                  </div>
                </motion.div>
              ) : optimizedPrompt ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-primary/20 bg-card overflow-hidden"
                  data-testid="card-output-prompt"
                >
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/50 bg-primary/[0.03]">
                    <span className="text-xs font-medium text-primary">Optimized Result</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
                      onClick={handleCopy}
                      data-testid="button-copy"
                    >
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      {copied ? "Copied" : "Copy"}
                    </Button>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground" data-testid="output-prompt">
                      {optimizedPrompt}
                    </p>
                  </div>
                  {promptScore !== null && (
                    <div className="px-4 py-3 border-t border-border/50 bg-muted/20">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-muted-foreground">Quality Score</span>
                        <span className={cn(
                          "text-sm font-semibold",
                          promptScore >= 80 ? "text-green-600 dark:text-green-400" :
                          promptScore >= 60 ? "text-amber-600 dark:text-amber-400" :
                          "text-red-600 dark:text-red-400"
                        )} data-testid="text-score-value">
                          {promptScore}/100
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden" data-testid="prompt-score">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${promptScore}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className={cn(
                            "h-full rounded-full",
                            promptScore >= 80 ? "bg-green-500" :
                            promptScore >= 60 ? "bg-amber-500" :
                            "bg-red-500"
                          )}
                        />
                      </div>
                      <p className={cn(
                        "text-[11px] mt-1",
                        promptScore >= 80 ? "text-green-600 dark:text-green-400" :
                        promptScore >= 60 ? "text-amber-600 dark:text-amber-400" :
                        "text-red-600 dark:text-red-400"
                      )} data-testid="text-score-label">
                        {promptScore >= 90 ? "Excellent" : promptScore >= 80 ? "Great" : promptScore >= 60 ? "Good" : promptScore >= 40 ? "Fair" : "Needs Work"}
                      </p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border border-dashed border-border bg-card/50 p-8"
                  data-testid="card-output-empty"
                >
                  <div className="flex flex-col items-center justify-center text-center space-y-2">
                    <Wand2 className="h-6 w-6 text-muted-foreground/30" />
                    <p className="text-xs text-muted-foreground" data-testid="text-output-empty">Your optimized prompt will appear here</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-20">
              <HistoryList onSelect={loadFromHistory} />
            </div>
          </aside>
        </motion.div>
      </section>

      <ExamplesSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <FAQSection />
      <SEOSection />
      <ArticlesSection />
    </Layout>
  );
}

function ExamplesSection() {
  const examples = [
    {
      before: "Write me a blog post about AI",
      after: "Write a 1,500-word blog post about the impact of artificial intelligence on small business operations in 2024. Include 3 real-world use cases, actionable tips for implementation, and a compelling introduction that hooks the reader. Use a professional yet approachable tone.",
      label: "Blog Writing",
    },
    {
      before: "Make a picture of a city at night",
      after: "A breathtaking aerial photograph of a futuristic cyberpunk cityscape at night, neon-lit skyscrapers reflecting off rain-soaked streets, volumetric fog, cinematic lighting, ultra-detailed, 8K resolution, shot on Hasselblad --ar 16:9 --v 6",
      label: "AI Art",
    },
    {
      before: "Help me write an email to my team",
      after: "Draft a concise, motivational email to a software engineering team of 12 announcing the successful completion of Q3 goals. Highlight 3 specific achievements, acknowledge individual contributors, outline Q4 priorities, and close with an encouraging call-to-action. Keep the tone warm but professional, under 300 words.",
      label: "Email",
    },
  ];

  return (
    <section className="border-t border-border/50" aria-label="Before and After Examples">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground" data-testid="text-examples-heading">See the difference</h2>
          <p className="text-muted-foreground mt-2 text-sm">Real prompt transformations that deliver better AI results.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {examples.map((example, idx) => (
            <div key={idx} className="rounded-xl border border-border bg-card overflow-hidden" data-testid={`card-example-${idx}`}>
              <div className="px-4 py-2.5 border-b border-border/50 bg-muted/30">
                <span className="text-xs font-medium text-muted-foreground" data-testid={`badge-example-label-${idx}`}>{example.label}</span>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wider mb-1.5">Before</p>
                  <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-example-before-${idx}`}>
                    {example.before}
                  </p>
                </div>
                <div className="border-t border-dashed border-border/50" />
                <div>
                  <p className="text-[11px] font-medium text-primary/70 uppercase tracking-wider mb-1.5">After</p>
                  <p className="text-xs text-foreground font-mono leading-relaxed" data-testid={`text-example-after-${idx}`}>
                    {example.after}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: Sparkles,
      title: "Smart AI Optimization",
      description: "GPT-4o analyzes your prompt for clarity, structure, and specificity, then rewrites it for maximum performance.",
    },
    {
      icon: Target,
      title: "Multi-Purpose Support",
      description: "Optimize for blog posts, emails, social media, coding, AI art, and more with purpose-specific tuning.",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get production-ready prompts in seconds with a quality score so you know exactly how effective your prompt will be.",
    },
  ];

  return (
    <section id="features" className="border-t border-border/50 bg-muted/20 dark:bg-muted/5" aria-label="Features">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground" data-testid="text-features-heading">Why use PromptFix?</h2>
          <p className="text-muted-foreground mt-2 text-sm">Everything you need to craft better AI prompts.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, idx) => (
            <div key={idx} className="text-center" data-testid={`card-feature-${idx}`}>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1.5" data-testid={`text-feature-title-${idx}`}>{feature.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-[260px] mx-auto">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { num: "1", title: "Paste your prompt", description: "Enter your rough idea or draft into the input." },
    { num: "2", title: "AI optimizes it", description: "Select tone, purpose, and depth. Our AI rewrites it." },
    { num: "3", title: "Copy and use", description: "Get a scored, production-ready prompt for any AI tool." },
  ];

  return (
    <section id="how-it-works" className="border-t border-border/50" aria-label="How It Works">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground" data-testid="text-how-it-works-heading">How it works</h2>
          <p className="text-muted-foreground mt-2 text-sm">Three steps to a better prompt.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3 max-w-3xl mx-auto">
          {steps.map((step, idx) => (
            <div key={idx} className="text-center" data-testid={`step-${idx}`}>
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold mx-auto mb-3">
                {step.num}
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1" data-testid={`text-step-title-${idx}`}>{step.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const freeFeatures = [
    "Unlimited prompt optimizations",
    "Tone, purpose & depth settings",
    "Prompt quality scoring",
    "Optimization history",
    "Works with all AI platforms",
  ];

  const proFeatures = [
    "Everything in Free",
    "Bulk prompt optimization",
    "Custom prompt templates",
    "Advanced analytics",
    "API access",
    "Team collaboration",
  ];

  return (
    <section id="pricing" className="border-t border-border/50 bg-muted/20 dark:bg-muted/5" aria-label="Pricing">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground" data-testid="text-pricing-heading">Simple pricing</h2>
          <p className="text-muted-foreground mt-2 text-sm">Start free. Upgrade when you need more.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 max-w-2xl mx-auto">
          <div className="rounded-xl border border-border bg-card p-6" data-testid="card-pricing-free">
            <div className="mb-5">
              <h3 className="text-base font-semibold text-foreground">Free</h3>
              <div className="mt-2">
                <span className="text-3xl font-bold text-foreground">$0</span>
                <span className="text-sm text-muted-foreground ml-1">/month</span>
              </div>
            </div>
            <ul className="space-y-2.5 mb-6">
              {freeFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                  <span data-testid={`text-free-feature-${idx}`}>{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              className="w-full h-9 text-xs"
              onClick={() => document.getElementById("optimizer")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="button-pricing-free"
            >
              Get Started
            </Button>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 relative" data-testid="card-pricing-pro">
            <div className="absolute top-4 right-4">
              <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full" data-testid="badge-coming-soon">
                Coming Soon
              </span>
            </div>
            <div className="mb-5">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-1.5">
                Pro
                <Crown className="w-3.5 h-3.5 text-amber-500" />
              </h3>
              <div className="mt-2">
                <span className="text-3xl font-bold text-foreground">$9</span>
                <span className="text-sm text-muted-foreground ml-1">/month</span>
              </div>
            </div>
            <ul className="space-y-2.5 mb-6">
              {proFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                  <span data-testid={`text-pro-feature-${idx}`}>{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              className="w-full h-9 text-xs"
              variant="secondary"
              disabled
              data-testid="button-pricing-pro"
            >
              Coming Soon
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: "Is PromptFix really free to use?",
      answer: "Yes, completely free. No signup, no credit card, no hidden costs. We believe everyone should have access to better AI interactions through optimized prompts.",
    },
    {
      question: "Which AI platforms does it work with?",
      answer: "PromptFix optimizes prompts for all major AI platforms including ChatGPT, Claude, Midjourney, DALL-E, Stable Diffusion, Gemini, and more. The optimized prompts work universally with any AI tool.",
    },
    {
      question: "How does the quality score work?",
      answer: "After optimization, our AI evaluates the prompt on clarity, structure, and specificity on a scale of 0-100. A higher score means the prompt is more likely to produce accurate, detailed, and useful AI responses.",
    },
    {
      question: "Is my data private?",
      answer: "Your prompts are processed securely and are not stored permanently or shared with third parties. We only keep a temporary session history so you can revisit recent optimizations. Your data is never used to train AI models.",
    },
    {
      question: "What will the Pro plan include?",
      answer: "The Pro plan will include bulk prompt optimization, custom templates, advanced analytics, priority processing, API access, and team collaboration features.",
    },
  ];

  return (
    <section id="faq" className="border-t border-border/50" aria-label="FAQ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground" data-testid="text-faq-heading">Frequently asked questions</h2>
        </div>
        <div className="max-w-xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`} className="border-border/50" data-testid={`faq-item-${idx}`}>
                <AccordionTrigger className="text-left text-sm font-medium hover:no-underline py-3" data-testid={`button-faq-${idx}`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

function SEOSection() {
  return (
    <section className="border-t border-border/50 bg-muted/20 dark:bg-muted/5" aria-label="About Prompt Engineering">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-6" data-testid="text-seo-heading">
            Why prompt engineering matters
          </h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              The difference between a mediocre AI response and an exceptional one comes down to how you phrase your request. <strong className="text-foreground font-medium">Prompt engineering</strong> is the art of crafting inputs that guide AI models to produce exactly what you need.
            </p>
            <p>
              PromptFix is your <strong className="text-foreground font-medium">AI prompt optimizer</strong>. Whether you're writing emails, generating content, coding, or creating AI art, our tool transforms rough ideas into structured prompts optimized for clarity, context, and precision.
            </p>
            <p>
              Powered by OpenAI's GPT-4o model with customizable tone, purpose, and depth settings, every prompt is tailored to your specific use case.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-10 text-center">
            <div data-testid="text-stat-responses">
              <p className="text-2xl font-bold text-foreground">10x</p>
              <p className="text-xs text-muted-foreground mt-0.5">Better responses</p>
            </div>
            <div data-testid="text-stat-cost">
              <p className="text-2xl font-bold text-foreground">Free</p>
              <p className="text-xs text-muted-foreground mt-0.5">No signup</p>
            </div>
            <div data-testid="text-stat-speed">
              <p className="text-2xl font-bold text-foreground">Instant</p>
              <p className="text-xs text-muted-foreground mt-0.5">Results in seconds</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArticlesSection() {
  const articles = [
    {
      title: "Top 5 ChatGPT Prompts for Business Growth",
      summary: "Learn how to create professional business strategies and scale your operations with optimized prompts.",
      url: "#optimizer",
    },
    {
      title: "How to Avoid Hallucinations in AI Results",
      summary: "Discover how optimized prompts lead to more accurate AI answers and reliable outputs.",
      url: "/articles/hallucinations",
    },
    {
      title: "The Secret to High-Quality Midjourney Images",
      summary: "Refine your image generation descriptions for stunning, photorealistic results.",
      url: "/articles/midjourney",
    },
  ];

  return (
    <section className="border-t border-border/50" aria-label="Articles">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8" data-testid="text-blog-heading">Articles & Guides</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {articles.map((article, idx) => (
            <div key={idx} className="group" data-testid={`card-article-${idx}`}>
              <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-1.5">{article.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-2">{article.summary}</p>
              <Link
                href={article.url}
                className="text-xs font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                data-testid={`link-article-${idx}`}
              >
                Read more
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
