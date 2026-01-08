import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, AlertTriangle, ShieldCheck, Zap } from "lucide-react";
import { Link } from "wouter";

export default function HallucinationsArticle() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">How to Avoid Hallucinations in AI Results</h1>
          <p className="text-xl text-muted-foreground">Master the art of factual accuracy in AI interactions.</p>
        </div>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              The Problem: AI Hallucinations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              AI models, while incredibly powerful, are not perfect. Sometimes they confidently present information that is entirely made up—a phenomenon known as "hallucination." This can range from invented historical facts to non-existent citations or buggy code.
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              The Fix: PromptFix Optimization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Research shows that using specific constraints and structured prompt engineering can reduce hallucination errors by up to <strong>80%</strong>. By using <strong>PromptFix</strong>, your rough ideas are automatically converted into precise instructions that set strict boundaries for the AI.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-2 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Pro Tip: Step-by-Step Logic</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Always advise the AI to "think step-by-step." This encourages the model to process logic linearly before arriving at a final answer, significantly boosting factual accuracy.
              </p>
            </CardContent>
          </Card>
          <Card className="border-2 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Use Grounding Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Provide the AI with source material. PromptFix helps format your prompts to explicitly tell the AI to "only use the provided text" for its answers.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
