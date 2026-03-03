import { useState } from "react";
import { Layout } from "@/components/layout";
import { useOptimizePrompt } from "@/hooks/use-optimizations";
import { HistoryList } from "@/components/history-list";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { Wand2, Copy, Check, RefreshCw, Zap, Lightbulb, CheckCircle2, ThumbsUp, ThumbsDown, Sparkles, Target, ArrowRight, Settings2, FileText } from "lucide-react";
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const charCount = originalPrompt.length;
  const wordCount = originalPrompt.trim() ? originalPrompt.trim().split(/\s+/).length : 0;

  return (
    <Layout>
      <HeroSection />

      <section id="optimizer" className="max-w-[1100px] mx-auto px-4 py-12" aria-label="AI Prompt Optimizer Tool">
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
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Casual">Casual</SelectItem>
                    <SelectItem value="Creative">Creative</SelectItem>
                    <SelectItem value="Technical">Technical</SelectItem>
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
                    <SelectItem value="Blog Post">Blog Post</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="Social Media">Social Media</SelectItem>
                    <SelectItem value="Coding">Coding</SelectItem>
                    <SelectItem value="AI Art">AI Art</SelectItem>
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
                    <SelectItem value="Short">Short</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Detailed">Detailed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border border-border/60 shadow-md rounded-xl relative overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    Your Prompt
                  </CardTitle>
                  <CardDescription>Paste your rough draft or basic idea.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder={`e.g. Write a professional email to my boss about a leave request...\n\nCreate a Midjourney prompt for a futuristic city...\n\nExplain quantum computing simply...`}
                    className="min-h-[260px] resize-none text-base p-4 bg-muted/20 border border-border focus:border-primary/50 transition-colors rounded-lg"
                    value={originalPrompt}
                    onChange={(e) => handlePromptChange(e.target.value)}
                    maxLength={CHAR_LIMIT}
                    data-testid="input-prompt"
                  />
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span data-testid="text-word-count">{wordCount} words</span>
                    <span data-testid="text-char-count" className={cn(charCount > CHAR_LIMIT * 0.9 && "text-destructive font-medium")}>
                      {charCount}/{CHAR_LIMIT}
                    </span>
                  </div>
                  <Button
                    onClick={handleOptimize}
                    disabled={optimizeMutation.isPending || !originalPrompt.trim()}
                    className="w-full mt-4 font-semibold text-base h-12 rounded-lg shadow-md hover:shadow-lg transition-all"
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
                "border shadow-md rounded-xl relative overflow-hidden transition-all duration-500",
                optimizedPrompt ? "border-primary/40 bg-gradient-to-br from-background to-primary/5" : "border-border/60"
              )}>
                {optimizedPrompt && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-400 to-primary" />
                )}
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-base text-primary">
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
                      className="h-8 w-8 transition-all hover:bg-primary hover:text-primary-foreground rounded-lg"
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
                          className="h-[200px] resize-none border-none bg-transparent p-3 font-mono text-sm leading-relaxed focus-visible:ring-0"
                          data-testid="output-prompt"
                        />

                        {promptScore !== null && (
                          <PromptScoreDisplay score={promptScore} />
                        )}

                        <div className="flex items-center justify-center gap-4 pt-3 border-t border-border/50 mt-2">
                          <span className="text-xs text-muted-foreground">Helpful?</span>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className={cn("h-7 w-7", feedback === "up" && "bg-green-500/20 text-green-500")}
                              onClick={() => { setFeedback("up"); toast({ description: "Thanks for your feedback!" }); }}
                              data-testid="button-thumbs-up"
                            >
                              <ThumbsUp className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={cn("h-7 w-7", feedback === "down" && "bg-red-500/20 text-red-500")}
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
                        className="h-[260px] flex flex-col items-center justify-center text-muted-foreground/50 border-2 border-dashed border-muted-foreground/10 rounded-lg"
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

      <FeaturesSection />
      <HowItWorksSection />
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
      className="mt-3 p-3 bg-muted/30 rounded-lg border border-border/50"
      data-testid="prompt-score"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-muted-foreground">Prompt Quality Score</span>
        <div className="flex items-center gap-1.5">
          <span className={cn("text-lg font-bold", getScoreColor(score))} data-testid="text-score-value">{score}</span>
          <span className="text-xs text-muted-foreground">/100</span>
        </div>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
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
      <div className="relative max-w-[1100px] mx-auto px-4 py-20 sm:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Free AI-Powered Prompt Engineering
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance">
            Optimize Any AI Prompt{" "}
            <span className="text-primary">Instantly</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Transform vague ideas into powerful, structured prompts that deliver precise results from ChatGPT, Claude, Midjourney, and any AI tool. Choose your tone, purpose, and depth for tailored optimization.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="text-base font-semibold px-8 h-12 rounded-lg shadow-lg hover:shadow-xl transition-all"
              onClick={() => document.getElementById("optimizer")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="button-cta-hero"
            >
              <Wand2 className="mr-2 h-5 w-5" />
              Try It Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base font-medium px-8 h-12 rounded-lg"
              onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="button-learn-more"
            >
              Learn How It Works
            </Button>
          </div>
          <div className="flex items-center justify-center gap-8 mt-10 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>No Signup</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Powered by GPT-4o</span>
            </div>
          </div>
        </motion.div>
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
      title: "Instant Structured Output",
      description: "Get production-ready prompts in seconds with a quality score so you know exactly how effective your prompt will be.",
    },
  ];

  return (
    <section className="max-w-[1100px] mx-auto px-4 py-16" aria-label="Features">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold tracking-tight mb-3">Why Choose PromptFix?</h2>
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
            <Card className="h-full border border-border/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-xl" data-testid={`card-feature-${idx}`}>
              <CardContent className="pt-8 pb-6 px-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-5">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
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
      title: "Choose Settings",
      description: "Select your preferred tone, purpose, and output depth to tailor the optimization to your exact needs.",
    },
    {
      icon: CheckCircle2,
      step: "3",
      title: "Get Optimized Prompt",
      description: "Receive a production-ready prompt with a quality score. Copy it directly to any AI tool for better results.",
    },
  ];

  return (
    <section id="how-it-works" className="bg-muted/30 dark:bg-muted/10" aria-label="How It Works">
      <div className="max-w-[1100px] mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-3">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Three simple steps to better AI prompts.</p>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-5">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shadow-md">
                  {step.step}
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px]">{step.description}</p>
            </motion.div>
          ))}
        </div>
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
  ];

  return (
    <section className="max-w-[1100px] mx-auto px-4 py-16" aria-label="FAQ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-bold tracking-tight mb-3">Frequently Asked Questions</h2>
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
    </section>
  );
}

function SEORichTextSection() {
  return (
    <section className="bg-muted/30 dark:bg-muted/10" aria-label="About Prompt Engineering">
      <div className="max-w-[1100px] mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold tracking-tight text-center mb-6">
            Why Prompt Engineering Matters
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              The difference between a mediocre AI response and an exceptional one comes down to how you phrase your request. <strong>Prompt engineering</strong> is the art and science of crafting inputs that guide AI models to produce exactly what you need.
            </p>
            <p>
              PromptFix is your go-to <strong>AI Prompt Fixer</strong> and <strong>Prompt Engineering Tool</strong>. Whether you're crafting emails, generating creative content, writing code, or building AI art with Midjourney, our tool transforms rough ideas into perfectly structured prompts optimized for clarity, context, and precision.
            </p>
            <p>
              Designed for creators, marketers, developers, and anyone who uses AI, PromptFix uses OpenAI's GPT-4o model to analyze and optimize your prompts. With customizable tone, purpose, and depth settings, every prompt is tailored to your specific use case.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-10 text-center">
            <div>
              <p className="text-3xl font-bold text-primary mb-1">10x</p>
              <p className="text-sm text-muted-foreground">Better AI responses</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary mb-1">Free</p>
              <p className="text-sm text-muted-foreground">No cost or signup</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary mb-1">Instant</p>
              <p className="text-sm text-muted-foreground">Results in seconds</p>
            </div>
          </div>
        </motion.div>
      </div>
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
    <section className="max-w-[1100px] mx-auto px-4 py-16" aria-label="Articles">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Articles & Guides</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {articles.map((article, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="h-full border border-border/60 hover:border-primary/30 transition-all hover:shadow-lg hover:-translate-y-1 rounded-xl group" data-testid={`card-article-${idx}`}>
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
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
    </section>
  );
}
