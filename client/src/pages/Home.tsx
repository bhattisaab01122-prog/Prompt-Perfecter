import { useState } from "react";
import { Layout } from "@/components/layout";
import { useOptimizePrompt } from "@/hooks/use-optimizations";
import { HistoryList } from "@/components/history-list";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Wand2, Copy, Check, RefreshCw, Zap, Lightbulb, CheckCircle2, ThumbsUp, ThumbsDown, Sparkles, Target, ArrowRight, Settings2, FileText, ChevronRight, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

const CHAR_LIMIT = 1000;

export default function Home() {
  const [originalPrompt, setOriginalPrompt] = useState("");
  const [optimizedPrompt, setOptimizedPrompt] = useState("");
  const [promptScore, setPromptScore] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
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
          setFeedback(null);
          toast({
            title: "Prompt optimized!",
            description: "Your prompt has been enhanced and scored.",
          });
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
      <HeroSection />

      <section id="optimizer" className="max-w-7xl mx-auto px-4 py-16 md:py-24" aria-label="AI Prompt Optimizer Tool">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3" data-testid="text-optimizer-heading">Optimize Your Prompt</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Paste your prompt, choose your settings, and let AI do the rest.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" data-testid="settings-panel">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Tone</label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger data-testid="select-tone" className="w-full">
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
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Purpose</label>
                <Select value={purpose} onValueChange={setPurpose}>
                  <SelectTrigger data-testid="select-purpose" className="w-full">
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
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Output Depth</label>
                <Select value={depth} onValueChange={setDepth}>
                  <SelectTrigger data-testid="select-depth" className="w-full">
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

            <div className="grid gap-6 md:grid-cols-2">
              <Card data-testid="card-input-prompt">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base flex-wrap">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    Your Prompt
                  </CardTitle>
                  <CardDescription>Paste your rough draft or basic idea.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder={`e.g. Write a professional email to my boss about a leave request...\n\nCreate a Midjourney prompt for a futuristic city...\n\nExplain quantum computing simply...`}
                    className="min-h-[260px] resize-none text-base bg-muted/20 border border-border focus:border-primary/50 transition-colors rounded-md"
                    value={originalPrompt}
                    onChange={(e) => handlePromptChange(e.target.value)}
                    maxLength={CHAR_LIMIT}
                    data-testid="input-prompt"
                  />
                  <div className="mt-2 flex items-center justify-between gap-2 text-xs text-muted-foreground flex-wrap">
                    <span data-testid="text-word-count">{wordCount} words</span>
                    <span data-testid="text-char-count" className={cn(charCount > CHAR_LIMIT * 0.9 && "text-destructive font-medium")}>
                      {charCount}/{CHAR_LIMIT}
                    </span>
                  </div>
                  <Button
                    onClick={handleOptimize}
                    disabled={optimizeMutation.isPending || !originalPrompt.trim()}
                    className="w-full mt-4 font-semibold text-base"
                    size="lg"
                    variant={optimizeMutation.isPending ? "secondary" : "default"}
                    data-testid="button-optimize"
                  >
                    {optimizeMutation.isPending ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Optimizing...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Optimize Prompt
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card className={cn(
                "transition-all duration-500",
                optimizedPrompt && "border-primary/40"
              )} data-testid="card-output-prompt">
                {optimizedPrompt && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-400 to-primary rounded-t-xl" />
                )}
                <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-3">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-base text-primary flex-wrap">
                      <Zap className="w-4 h-4" />
                      Optimized Result
                    </CardTitle>
                    <CardDescription>Your enhanced, production-ready prompt.</CardDescription>
                  </div>
                  {optimizedPrompt && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleCopy}
                      data-testid="button-copy"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  <AnimatePresence mode="wait">
                    {optimizeMutation.isPending ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-[260px] flex flex-col items-center justify-center text-muted-foreground space-y-6"
                      >
                        <div className="relative flex items-center justify-center">
                          <motion.div
                            className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          />
                          <div className="relative flex items-center justify-center h-16 w-16">
                            <motion.div
                              className="absolute inset-0 border-4 border-primary/30 border-t-primary rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            <Wand2 className="h-6 w-6 text-primary animate-pulse" />
                          </div>
                        </div>
                        <div className="text-center space-y-1">
                          <p className="text-sm font-semibold text-foreground animate-pulse">AI is optimizing...</p>
                          <p className="text-xs text-muted-foreground">Crafting your perfect prompt</p>
                        </div>
                      </motion.div>
                    ) : optimizedPrompt ? (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col"
                      >
                        <Textarea
                          readOnly
                          value={optimizedPrompt}
                          className="h-[200px] resize-none border-none bg-transparent font-mono text-sm leading-relaxed focus-visible:ring-0"
                          data-testid="output-prompt"
                        />

                        {promptScore !== null && (
                          <PromptScoreDisplay score={promptScore} />
                        )}

                        <div className="flex items-center justify-center gap-4 pt-3 border-t border-border/50 mt-2 flex-wrap">
                          <span className="text-xs text-muted-foreground">Helpful?</span>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className={cn(feedback === "up" && "bg-green-500/20 text-green-500")}
                              onClick={() => { setFeedback("up"); toast({ description: "Thanks for your feedback!" }); }}
                              data-testid="button-thumbs-up"
                            >
                              <ThumbsUp className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={cn(feedback === "down" && "bg-red-500/20 text-red-500")}
                              onClick={() => { setFeedback("down"); toast({ description: "Thanks! We'll improve." }); }}
                              data-testid="button-thumbs-down"
                            >
                              <ThumbsDown className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-[260px] flex flex-col items-center justify-center text-muted-foreground/50 border-2 border-dashed border-muted-foreground/10 rounded-md"
                      >
                        <Wand2 className="h-10 w-10 mb-3 opacity-20" />
                        <p className="text-sm">Result will appear here</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-20">
              <HistoryList onSelect={loadFromHistory} />
            </div>
          </aside>
        </motion.div>
      </section>

      <BeforeAfterSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <FAQSection />
      <SEORichTextSection />
      <BlogSection />
    </Layout>
  );
}

function PromptScoreDisplay({ score }: { score: number }) {
  const getScoreColor = (s: number) => {
    if (s >= 80) return "text-green-500";
    if (s >= 60) return "text-yellow-500";
    return "text-red-500";
  };
  const getProgressColor = (s: number) => {
    if (s >= 80) return "bg-green-500";
    if (s >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };
  const getLabel = (s: number) => {
    if (s >= 90) return "Excellent";
    if (s >= 80) return "Great";
    if (s >= 60) return "Good";
    if (s >= 40) return "Fair";
    return "Needs Work";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mt-3 p-3 bg-muted/30 rounded-md border border-border/50"
      data-testid="prompt-score"
    >
      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
        <span className="text-xs font-medium text-muted-foreground">Prompt Quality Score</span>
        <div className="flex items-center gap-1.5">
          <span className={cn("text-lg font-bold", getScoreColor(score))} data-testid="text-score-value">{score}</span>
          <span className="text-xs text-muted-foreground">/100</span>
        </div>
      </div>
      <div className="relative h-2 w-full rounded-full bg-secondary">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn("h-full rounded-full", getProgressColor(score))}
        />
      </div>
      <p className={cn("text-xs mt-1.5 font-medium", getScoreColor(score))} data-testid="text-score-label">{getLabel(score)}</p>
    </motion.div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden" aria-label="Hero">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-blue-500/5 dark:from-primary/10 dark:to-blue-500/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Badge variant="secondary" className="text-sm px-4 py-1.5" data-testid="badge-hero-tag">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Free AI-Powered Prompt Engineering
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-balance"
            data-testid="text-hero-heading"
          >
            Transform Your AI Prompts{" "}
            <span className="text-primary">Into Powerful Results</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            data-testid="text-hero-description"
          >
            Turn vague ideas into powerful, structured prompts that deliver precise results from ChatGPT, Claude, Midjourney, and any AI tool. Choose your tone, purpose, and depth for tailored optimization.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="text-base font-semibold"
              onClick={() => document.getElementById("optimizer")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="button-cta-hero"
            >
              <Wand2 className="mr-2 h-5 w-5" />
              Try Prompt Fix Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base font-medium"
              onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="button-learn-more"
            >
              Learn How It Works
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-6 sm:gap-8 pt-4 text-sm text-muted-foreground flex-wrap"
          >
            <div className="flex items-center gap-1.5" data-testid="text-hero-feature-free">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-1.5" data-testid="text-hero-feature-nosignup">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>No Signup</span>
            </div>
            <div className="flex items-center gap-1.5" data-testid="text-hero-feature-gpt">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Powered by GPT-4o</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function BeforeAfterSection() {
  const examples = [
    {
      before: "Write me a blog post about AI",
      after: "Write a 1,500-word blog post about the impact of artificial intelligence on small business operations in 2024. Include 3 real-world use cases, actionable tips for implementation, and a compelling introduction that hooks the reader. Use a professional yet approachable tone.",
      label: "Blog Writing",
    },
    {
      before: "Make a picture of a city at night",
      after: "A breathtaking aerial photograph of a futuristic cyberpunk cityscape at night, neon-lit skyscrapers reflecting off rain-soaked streets, volumetric fog, cinematic lighting, ultra-detailed, 8K resolution, shot on Hasselblad --ar 16:9 --v 6",
      label: "AI Art / Midjourney",
    },
    {
      before: "Help me write an email to my team",
      after: "Draft a concise, motivational email to a software engineering team of 12 announcing the successful completion of Q3 goals. Highlight 3 specific achievements, acknowledge individual contributors, outline Q4 priorities, and close with an encouraging call-to-action. Keep the tone warm but professional, under 300 words.",
      label: "Email Writing",
    },
  ];

  return (
    <section className="bg-muted/30 dark:bg-muted/10" aria-label="Before and After Examples">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3" data-testid="text-examples-heading">See the Difference</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Real prompt transformations that deliver better AI results.</p>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-3">
          {examples.map((example, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full" data-testid={`card-example-${idx}`}>
                <CardHeader className="pb-3">
                  <Badge variant="secondary" className="w-fit" data-testid={`badge-example-label-${idx}`}>
                    {example.label}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Before</p>
                    <div className="bg-muted/50 dark:bg-muted/30 rounded-md p-3 text-sm text-muted-foreground font-mono leading-relaxed" data-testid={`text-example-before-${idx}`}>
                      {example.before}
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="w-4 h-4 text-primary rotate-90" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">After</p>
                    <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-md p-3 text-sm font-mono leading-relaxed" data-testid={`text-example-after-${idx}`}>
                      {example.after}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
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
      description: "Our GPT-4o engine analyzes your prompt for clarity, structure, and specificity, then rewrites it for maximum AI performance.",
    },
    {
      icon: Target,
      title: "Multi-Purpose Support",
      description: "Optimize prompts for blog posts, emails, social media, coding, AI art, and more with purpose-specific tuning.",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get production-ready prompts in seconds with a quality score so you know exactly how effective your prompt will be.",
    },
  ];

  return (
    <section id="features" className="max-w-7xl mx-auto px-4 py-16 md:py-24" aria-label="Features">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3" data-testid="text-features-heading">Why Use PromptFix?</h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Everything you need to craft perfect AI prompts, all in one free tool.
        </p>
      </motion.div>
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="h-full hover-elevate" data-testid={`card-feature-${idx}`}>
              <CardContent className="pt-8 pb-6 px-6 text-center">
                <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center text-primary mx-auto mb-5">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold mb-2" data-testid={`text-feature-title-${idx}`}>{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      icon: Lightbulb,
      step: "1",
      title: "Paste Your Prompt",
      description: "Enter your rough idea or basic draft into the input box. It can be as simple or complex as you like.",
    },
    {
      icon: Settings2,
      step: "2",
      title: "AI Improves It",
      description: "Select your preferred tone, purpose, and output depth. Our AI analyzes and rewrites your prompt for maximum effectiveness.",
    },
    {
      icon: CheckCircle2,
      step: "3",
      title: "Copy & Use",
      description: "Receive a production-ready prompt with a quality score. Copy it directly to any AI tool for better results.",
    },
  ];

  return (
    <section id="how-it-works" className="bg-muted/30 dark:bg-muted/10" aria-label="How It Works">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3" data-testid="text-how-it-works-heading">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Three simple steps to better AI prompts.</p>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-3 relative">
          <div className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="flex flex-col items-center text-center relative"
              data-testid={`step-${idx}`}
            >
              <div className="relative mb-5">
                <div className="w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  {step.step}
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2" data-testid={`text-step-title-${idx}`}>{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px]">{step.description}</p>
            </motion.div>
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
    "Copy to clipboard",
    "Works with all AI platforms",
  ];

  const proFeatures = [
    "Everything in Free",
    "Bulk prompt optimization",
    "Custom prompt templates",
    "Advanced analytics & insights",
    "Priority AI processing",
    "API access",
    "Team collaboration",
  ];

  return (
    <section id="pricing" className="max-w-7xl mx-auto px-4 py-16 md:py-24" aria-label="Pricing">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3" data-testid="text-pricing-heading">Simple, Transparent Pricing</h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">Start optimizing for free. Upgrade when you need more power.</p>
      </motion.div>
      <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="h-full" data-testid="card-pricing-free">
            <CardHeader>
              <CardTitle className="text-xl flex-wrap flex gap-2">Free Plan</CardTitle>
              <CardDescription>Perfect for individuals and casual users.</CardDescription>
              <div className="pt-2">
                <span className="text-4xl font-bold text-foreground">$0</span>
                <span className="text-muted-foreground ml-1">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {freeFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span data-testid={`text-free-feature-${idx}`}>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => document.getElementById("optimizer")?.scrollIntoView({ behavior: "smooth" })}
                data-testid="button-pricing-free"
              >
                Get Started Free
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Card className="h-full relative border-primary/30" data-testid="card-pricing-pro">
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" data-testid="badge-coming-soon">
                <Crown className="w-3 h-3 mr-1" />
                Coming Soon
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-xl flex-wrap flex gap-2">Pro Plan</CardTitle>
              <CardDescription>For power users and teams who need more.</CardDescription>
              <div className="pt-2">
                <span className="text-4xl font-bold text-foreground">$9</span>
                <span className="text-muted-foreground ml-1">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {proFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span data-testid={`text-pro-feature-${idx}`}>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant="secondary"
                disabled
                data-testid="button-pricing-pro"
              >
                Coming Soon
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: "Is PromptFix really free to use?",
      answer: "Yes, PromptFix is completely free. No signup, no credit card, no hidden costs. We believe everyone should have access to better AI interactions through optimized prompts.",
    },
    {
      question: "Which AI platforms does PromptFix support?",
      answer: "PromptFix optimizes prompts for all major AI platforms including ChatGPT, Claude, Midjourney, DALL-E, Stable Diffusion, Gemini, and more. Our optimized prompts are designed to work universally with any AI tool.",
    },
    {
      question: "How does the Prompt Quality Score work?",
      answer: "After optimization, our AI evaluates the prompt on clarity, structure, and specificity on a scale of 0-100. A higher score means the prompt is more likely to produce accurate, detailed, and useful AI responses.",
    },
    {
      question: "Is my data private and secure?",
      answer: "Your prompts are processed securely and are not stored permanently or shared with third parties. We only keep a temporary session history so you can revisit recent optimizations. Your data is never used to train AI models.",
    },
    {
      question: "What will the Pro plan include?",
      answer: "The Pro plan (coming soon) will include bulk prompt optimization, custom templates, advanced analytics, priority processing, API access, and team collaboration features. Join the waitlist to be notified when it launches.",
    },
  ];

  return (
    <section id="faq" className="bg-muted/30 dark:bg-muted/10" aria-label="FAQ">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3" data-testid="text-faq-heading">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg">Quick answers to common questions.</p>
        </motion.div>
        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`} data-testid={`faq-item-${idx}`}>
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline" data-testid={`button-faq-${idx}`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
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

function SEORichTextSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 md:py-24" aria-label="About Prompt Engineering">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-6" data-testid="text-seo-heading">
          Why Prompt Engineering Matters
        </h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            The difference between a mediocre AI response and an exceptional one comes down to how you phrase your request. <strong className="text-foreground">Prompt engineering</strong> is the art and science of crafting inputs that guide AI models to produce exactly what you need.
          </p>
          <p>
            PromptFix is your go-to <strong className="text-foreground">AI Prompt Fixer</strong> and <strong className="text-foreground">Prompt Engineering Tool</strong>. Whether you're crafting emails, generating creative content, writing code, or building AI art with Midjourney, our tool transforms rough ideas into perfectly structured prompts optimized for clarity, context, and precision.
          </p>
          <p>
            Designed for creators, marketers, developers, and anyone who uses AI, PromptFix uses OpenAI's GPT-4o model to analyze and optimize your prompts. With customizable tone, purpose, and depth settings, every prompt is tailored to your specific use case.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-10 text-center">
          <div data-testid="text-stat-responses">
            <p className="text-3xl font-bold text-primary mb-1">10x</p>
            <p className="text-sm text-muted-foreground">Better AI responses</p>
          </div>
          <div data-testid="text-stat-cost">
            <p className="text-3xl font-bold text-primary mb-1">Free</p>
            <p className="text-sm text-muted-foreground">No cost or signup</p>
          </div>
          <div data-testid="text-stat-speed">
            <p className="text-3xl font-bold text-primary mb-1">Instant</p>
            <p className="text-sm text-muted-foreground">Results in seconds</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function BlogSection() {
  const articles = [
    {
      title: "Top 5 ChatGPT Prompts for Business Growth",
      summary: "Learn how to use PromptFix to create professional business strategies and scale your operations.",
      icon: Zap,
      url: "#optimizer",
    },
    {
      title: "How to Avoid Hallucinations in AI Results",
      summary: "Discover how optimized prompts lead to more accurate AI answers and reliable outputs.",
      icon: Lightbulb,
      url: "/articles/hallucinations",
    },
    {
      title: "The Secret to High-Quality Midjourney Images",
      summary: "Refine your image generation descriptions for stunning, photorealistic results.",
      icon: Wand2,
      url: "/articles/midjourney",
    },
  ];

  return (
    <section className="bg-muted/30 dark:bg-muted/10" aria-label="Articles">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight" data-testid="text-blog-heading">Articles & Guides</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((article, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full hover-elevate" data-testid={`card-article-${idx}`}>
                <CardHeader>
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary mb-3">
                    <article.icon className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{article.summary}</p>
                  <Button variant="link" className="p-0 h-auto text-primary text-sm" asChild>
                    <Link href={article.url} data-testid={`link-article-${idx}`}>
                      Read more <ArrowRight className="ml-1 w-3 h-3 inline" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
