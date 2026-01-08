import { useState } from "react";
import { Layout } from "@/components/layout";
import { useOptimizePrompt } from "@/hooks/use-optimizations";
import { HistoryList } from "@/components/history-list";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Wand2, Copy, Check, RefreshCw, Zap, Lightbulb, Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [originalPrompt, setOriginalPrompt] = useState("");
  const [optimizedPrompt, setOptimizedPrompt] = useState("");
  const [copied, setCopied] = useState(false);
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
      { prompt: originalPrompt },
      {
        onSuccess: (data) => {
          setOptimizedPrompt(data.optimizedPrompt);
          toast({
            title: "Success!",
            description: "Your prompt has been optimized.",
          });
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.message,
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
    toast({
      description: "Copied to clipboard",
    });
  };

  const loadFromHistory = (original: string, optimized: string) => {
    setOriginalPrompt(original);
    setOptimizedPrompt(optimized);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-8">
          <div className="text-center lg:text-left space-y-2 mb-8">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              Refine your prompts with <span className="text-primary bg-primary/10 px-2 py-1 rounded-lg">AI</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              PromptFix is the ultimate AI Prompt Optimizer designed to help you get the best results from ChatGPT, Claude, and Midjourney. Our free tool ensures your AI interactions are smarter and faster.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2" id="input-section">
            {/* Input Section */}
            <Card className="border-2 border-border/60 shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-muted-foreground" />
                  Input
                </CardTitle>
                <CardDescription>
                  Paste your rough draft or basic idea here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="e.g. Write a blog post about coffee..."
                  className="min-h-[300px] resize-none text-base p-4 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 transition-colors"
                  value={originalPrompt}
                  onChange={(e) => setOriginalPrompt(e.target.value)}
                />
                <div className="mt-4 flex justify-end">
                  <Button 
                    onClick={handleOptimize}
                    disabled={optimizeMutation.isPending || !originalPrompt.trim()}
                    className="w-full md:w-auto font-semibold shadow-xl shadow-primary/20"
                    size="lg"
                    variant={optimizeMutation.isPending ? "secondary" : "default"}
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
                </div>
              </CardContent>
            </Card>

            {/* Output Section */}
            <Card className={cn(
              "border-2 shadow-lg relative overflow-hidden transition-all duration-500",
              optimizedPrompt ? "border-primary/50 bg-gradient-to-br from-background to-primary/5" : "border-border/60 bg-muted/10"
            )}>
              {optimizedPrompt && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-400 to-primary animate-pulse" />
              )}
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Zap className="w-5 h-5" />
                    Result
                  </CardTitle>
                  <CardDescription>
                    Your optimized, production-ready prompt.
                  </CardDescription>
                </div>
                {optimizedPrompt && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopy}
                    className="h-8 w-8 transition-all hover:bg-primary hover:text-primary-foreground"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                )}
              </CardHeader>
              <CardContent className="pt-6">
                <AnimatePresence mode="wait">
                  {optimizeMutation.isPending ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-[300px] flex flex-col items-center justify-center text-muted-foreground space-y-6"
                    >
                      <div className="relative flex items-center justify-center">
                        <motion.div 
                          className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"
                          animate={{ 
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0.6, 0.3]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <div className="relative flex items-center justify-center h-20 w-20">
                          <motion.div
                            className="absolute inset-0 border-4 border-primary/30 border-t-primary rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <Wand2 className="h-8 w-8 text-primary animate-pulse" />
                        </div>
                      </div>
                      <div className="text-center space-y-2">
                        <p className="text-base font-semibold text-foreground animate-pulse">AI is Thinking...</p>
                        <p className="text-xs text-muted-foreground max-w-[200px]">Crafting your perfect prompt with advanced logic.</p>
                      </div>
                    </motion.div>
                  ) : optimizedPrompt ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative h-[300px]"
                    >
                      <Textarea
                        readOnly
                        value={optimizedPrompt}
                        className="h-full resize-none border-none bg-transparent p-4 font-mono text-sm leading-relaxed focus-visible:ring-0"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="h-[300px] flex flex-col items-center justify-center text-muted-foreground/50 border-2 border-dashed border-muted-foreground/10 rounded-lg m-1"
                    >
                      <Wand2 className="h-12 w-12 mb-4 opacity-20" />
                      <p className="text-sm">Optimized result will appear here</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <HistoryList onSelect={loadFromHistory} />
          </div>
        </div>
      </div>
      <HowItWorks />
      <BlogSection />
    </Layout>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: Lightbulb,
      title: "1. Enter Prompt",
      description: "Paste your basic idea or rough draft into the input box."
    },
    {
      icon: Wand2,
      title: "2. Optimize",
      description: "Our AI restructures your prompt for clarity and context."
    },
    {
      icon: CheckCircle2,
      title: "3. Perfect Result",
      description: "Get a production-ready prompt that delivers precise results."
    }
  ];

  return (
    <section className="mt-16 border-t pt-16">
      <h3 className="text-2xl font-bold tracking-tight mb-8 text-center">How It Works</h3>
      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <step.icon className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-lg">{step.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function BlogSection() {
  return (
    <section className="mt-16 border-t pt-16">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold tracking-tight">Latest Guides</h3>
        <Button variant="ghost" className="text-primary hover:text-primary/80" asChild>
          <a href="#input-section">Back to Optimizer</a>
        </Button>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-2 border-border/40 hover:border-primary/20 transition-all hover:shadow-xl group">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <CardTitle className="text-xl">How to Write 10x Better AI Prompts: A Beginner’s Guide</CardTitle>
            <CardDescription>Master the art of prompt engineering with these simple tips.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm leading-relaxed">
              Writing effective prompts is the secret to unlocking the full potential of AI. Whether you're using ChatGPT, Claude, or Midjourney, the quality of your output depends entirely on your input.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Using <strong className="text-foreground">PromptFix</strong> helps in getting precise AI results by automatically restructuring your rough ideas into clear, context-rich instructions that AI models love.
            </p>
            <Button variant="link" className="p-0 h-auto text-primary" asChild>
              <a href="#input-section">Try the Optimizer now &rarr;</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
