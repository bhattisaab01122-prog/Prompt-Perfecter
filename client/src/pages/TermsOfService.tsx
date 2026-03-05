import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfService() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8" data-testid="terms-page">
        <h1 className="text-4xl font-bold tracking-tight text-foreground" data-testid="text-terms-title">Terms of Service</h1>
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <CardTitle data-testid="text-terms-subtitle">Terms and Conditions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p data-testid="text-terms-effective-date">
              Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>

            <h3 className="text-lg font-semibold text-foreground">1. Acceptance of Terms</h3>
            <p>
              By accessing or using PromptFix ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service. We reserve the right to update these terms at any time, and your continued use of the Service constitutes acceptance of any changes.
            </p>

            <h3 className="text-lg font-semibold text-foreground">2. Use of Service</h3>
            <p>
              PromptFix provides an AI-powered prompt optimization tool. You may use the Service for lawful purposes only. You agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Use the Service to generate harmful, abusive, or illegal content</li>
              <li>Attempt to reverse-engineer, decompile, or disassemble the Service</li>
              <li>Overload or disrupt the Service infrastructure through excessive automated requests</li>
              <li>Use the Service in any way that violates applicable local, state, national, or international law</li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground">3. Intellectual Property</h3>
            <p>
              All content, features, and functionality of the Service, including but not limited to text, graphics, logos, and software, are the property of PromptFix and are protected by copyright, trademark, and other intellectual property laws. You retain ownership of the prompts you submit and the optimized results generated for you.
            </p>

            <h3 className="text-lg font-semibold text-foreground">4. Limitations of Liability</h3>
            <p>
              The Service is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. PromptFix does not guarantee the accuracy, completeness, or usefulness of any optimized prompts. In no event shall PromptFix be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service.
            </p>

            <h3 className="text-lg font-semibold text-foreground">5. Termination</h3>
            <p>
              We reserve the right to suspend or terminate your access to the Service at any time, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason at our sole discretion.
            </p>

            <h3 className="text-lg font-semibold text-foreground">6. Changes to Terms</h3>
            <p>
              We may revise these Terms of Service from time to time. The most current version will always be posted on this page. By continuing to access or use the Service after revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
            </p>

            <h3 className="text-lg font-semibold text-foreground">7. Contact Information</h3>
            <p>
              If you have any questions about these Terms of Service, please contact us through our <a href="/contact" className="text-primary underline underline-offset-4 hover:opacity-80" data-testid="link-contact-from-terms">Contact Page</a>.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
