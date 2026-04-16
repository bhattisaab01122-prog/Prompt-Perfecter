import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <CardTitle>Our Commitment to Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              At PromptFix, we take your privacy seriously. This policy describes how we collect, use, and protect your information when you use our AI Prompt Optimizer.
            </p>
            <h3 className="text-lg font-semibold text-foreground">1. Information We Collect</h3>
            <p>
              We collect the prompts you enter for optimization to improve our service and maintain your history. We do not sell your personal data to third parties.
            </p>
            <h3 className="text-lg font-semibold text-foreground">2. How We Use Information</h3>
            <p>
              Your prompts are processed by Google Gemini APIs to generate optimized versions. We store this data in your local session history for your convenience.
            </p>
            <h3 className="text-lg font-semibold text-foreground">3. Data Security</h3>
            <p>
              We use industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
