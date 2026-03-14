import { Layout } from "@/components/layout";

export default function TermsOfService() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16" data-testid="terms-page">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2" data-testid="text-terms-title">
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground" data-testid="text-terms-effective-date">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>

        <div className="prose prose-sm max-w-none space-y-8" data-testid="text-terms-subtitle">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. Acceptance of Terms</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              By accessing or using PromptFix ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service. We reserve the right to update these terms at any time, and your continued use of the Service constitutes acceptance of any changes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. Use of Service</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              PromptFix provides an AI-powered prompt optimization tool. You may use the Service for lawful purposes only. You agree not to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground">
              <li>Use the Service to generate harmful, abusive, or illegal content</li>
              <li>Attempt to reverse-engineer, decompile, or disassemble the Service</li>
              <li>Overload or disrupt the Service infrastructure through excessive automated requests</li>
              <li>Use the Service in any way that violates applicable local, state, national, or international law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. Intellectual Property</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All content, features, and functionality of the Service, including but not limited to text, graphics, logos, and software, are the property of PromptFix and are protected by copyright, trademark, and other intellectual property laws. You retain ownership of the prompts you submit and the optimized results generated for you.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. Data & Privacy</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your prompts are processed securely and are not stored permanently or shared with third parties. We maintain a temporary session history for your convenience. Your data is never used to train AI models. For full details, see our{" "}
              <a href="/privacy" className="text-primary underline underline-offset-4 hover:opacity-80" data-testid="link-privacy-from-terms">
                Privacy Policy
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. Limitations of Liability</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The Service is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. PromptFix does not guarantee the accuracy, completeness, or usefulness of any optimized prompts. In no event shall PromptFix be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. Termination</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We reserve the right to suspend or terminate your access to the Service at any time, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">7. Changes to Terms</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We may revise these Terms of Service from time to time. The most current version will always be posted on this page. By continuing to access or use the Service after revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">8. Contact Information</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If you have any questions about these Terms of Service, please contact us through our{" "}
              <a href="/contact" className="text-primary underline underline-offset-4 hover:opacity-80" data-testid="link-contact-from-terms">
                Contact Page
              </a>.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
