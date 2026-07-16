import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Briefcase, Zap, PenLine, Code, BookOpen, ChevronRight } from "lucide-react";
import { Link } from "wouter";

const categories = [
  {
    icon: Briefcase,
    title: "Business & Marketing Prompts",
    prompts: [
      `"Write a product launch announcement for [product] targeting [audience], highlighting [3 key benefits]"`,
      `"Create 10 social media captions for [platform] promoting [product/service] in a [tone] voice"`,
      `"Draft a cold outreach email to potential clients in the [industry] sector"`,
      `"Write a compelling elevator pitch for [business idea] in under 60 words"`,
      `"Generate 5 headline variations for a landing page about [product]"`,
      `"Create a content calendar for [platform] for the next 30 days focused on [topic]"`,
      `"Write a customer testimonial request email that feels personal, not automated"`,
      `"Draft a press release for [company milestone or launch]"`,
      `"Write ad copy for a Google Ads campaign targeting [audience] for [product]"`,
      `"Create a follow-up email sequence for leads who didn't convert after a free trial"`,
    ],
  },
  {
    icon: Zap,
    title: "Productivity & Work Prompts",
    prompts: [
      `"Summarize this document into 5 key bullet points: [paste text]"`,
      `"Turn these meeting notes into an action-item list with owners and deadlines"`,
      `"Write a professional out-of-office email for a 2-week vacation"`,
      `"Draft a polite follow-up email for an unanswered client request"`,
      `"Create a weekly planning template for a [job role] balancing deep work and meetings"`,
      `"Rewrite this email to sound more concise and professional: [paste email]"`,
      `"Generate a checklist for onboarding a new employee in [department]"`,
      `"Write a performance review summary for an employee who exceeded expectations"`,
      `"Draft an agenda for a 30-minute team stand-up meeting"`,
      `"Create a project status update email for stakeholders"`,
    ],
  },
  {
    icon: PenLine,
    title: "Content Creation Prompts",
    prompts: [
      `"Write a 1,000-word blog post about [topic] targeting [audience], with an SEO-friendly structure"`,
      `"Generate 20 blog post title ideas about [topic]"`,
      `"Write a YouTube video script outline for a video about [topic], 8 minutes long"`,
      `"Create a podcast episode outline discussing [topic] with 3 discussion points"`,
      `"Write a compelling book/product description for [item] in under 150 words"`,
      `"Draft a newsletter intro paragraph about [topic] in a conversational tone"`,
      `"Generate 10 Instagram caption ideas for a [niche] brand"`,
      `"Write an FAQ section for a website about [product/service]"`,
      `"Create a script for a 30-second explainer video about [product]"`,
      `"Rewrite this paragraph to be more engaging and remove jargon: [paste text]"`,
    ],
  },
  {
    icon: Code,
    title: "Coding & Technical Prompts",
    prompts: [
      `"Write a Python function that [specific task], with comments explaining each step"`,
      `"Debug this code and explain what's wrong: [paste code]"`,
      `"Convert this code from [language A] to [language B]: [paste code]"`,
      `"Write unit tests for this function: [paste function]"`,
      `"Explain this error message in simple terms and suggest a fix: [paste error]"`,
      `"Generate SQL queries to [specific data task] for a table with columns [list columns]"`,
      `"Write a regex pattern that matches [specific format]"`,
      `"Suggest a better architecture for this feature: [describe feature]"`,
      `"Write API documentation for this endpoint: [paste endpoint details]"`,
      `"Optimize this code for performance: [paste code]"`,
    ],
  },
  {
    icon: BookOpen,
    title: "Learning & Research Prompts",
    prompts: [
      `"Explain [complex topic] as if I'm a complete beginner, using analogies"`,
      `"Compare and contrast [concept A] and [concept B] in a table format"`,
      `"Create a study guide for [subject] covering the main concepts"`,
      `"Summarize the key arguments for and against [topic]"`,
      `"Generate 10 practice questions about [topic] with answers"`,
      `"Explain the pros and cons of [decision/approach] for my specific situation: [context]"`,
      `"Create a step-by-step guide for [process] for someone with no prior experience"`,
      `"Break down [complex process] into a simple flowchart description"`,
      `"Suggest 5 books or resources to learn more about [topic]"`,
      `"Write a research summary comparing [option A] vs [option B] for [specific use case]"`,
    ],
  },
];

const faqs = [
  {
    q: "Do these prompts work with Claude and Gemini too?",
    a: "Yes. While written with ChatGPT in mind, these prompts work across all major AI models including Claude, Gemini, and others — the structure and clarity principles are universal.",
  },
  {
    q: "How do I make a prompt more specific?",
    a: "Add context about your audience, desired tone, length, and format. Instead of \"write an email,\" specify who it's for, what tone you want, and roughly how long it should be.",
  },
  {
    q: "Can I combine multiple prompts?",
    a: "Yes — many of these work well as a sequence. For example, use prompt #21 to draft a blog post, then prompt #22 style thinking to generate title options for it.",
  },
];

export default function ChatGPTProductivityArticle() {
  return (
    <Layout
      title="50 Best ChatGPT Prompts for Productivity & Business Growth | PromptFix"
      description="50 ready-to-use ChatGPT prompts for business, marketing, productivity, content creation, coding, and learning — organized by category with tips to get even better results."
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <div className="space-y-4 border-b border-border/50 pb-10">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            50 Best ChatGPT Prompts for Productivity & Business Growth
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Getting great results from ChatGPT isn't about luck — it's about how you ask. A vague prompt gets a vague answer. A clear, well-structured prompt gets something you can actually use.
          </p>
        </div>

        {/* Why prompt quality matters */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Why Prompt Quality Matters</h2>
          <p className="text-muted-foreground leading-relaxed">
            The same question phrased two different ways can produce wildly different results. Compare:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border/50 bg-muted/30 p-5 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Weak prompt</p>
              <p className="text-sm text-foreground font-medium">"Write a marketing email"</p>
            </div>
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-5 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Strong prompt</p>
              <p className="text-sm text-foreground font-medium">"Write a 150-word marketing email announcing a 20% discount on our summer collection, targeting returning customers, with a friendly but urgent tone and a clear call-to-action button text"</p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed text-sm">
            The second version gives ChatGPT the context, format, tone, and goal it needs to produce something genuinely useful — not just words.
          </p>
        </div>

        {/* Prompt categories */}
        {categories.map((category, catIdx) => {
          const Icon = category.icon;
          const startNum = catIdx * 10 + 1;
          return (
            <div key={catIdx} className="space-y-5">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <Icon className="w-6 h-6 text-primary shrink-0" />
                {category.title}
              </h2>
              <ol className="space-y-3" start={startNum}>
                {category.prompts.map((prompt, pIdx) => (
                  <li key={pIdx} className="flex gap-3 text-sm">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground mt-0.5">
                      {startNum + pIdx}
                    </span>
                    <span className="text-muted-foreground leading-relaxed">{prompt}</span>
                  </li>
                ))}
              </ol>
            </div>
          );
        })}

        {/* CTA */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-8 space-y-4">
          <h2 className="text-2xl font-bold text-foreground">How to Get Even Better Results</h2>
          <p className="text-muted-foreground leading-relaxed">
            These prompts work well as starting points, but the real upgrade comes from adding specifics: your tone, your audience, your format needs, and your desired length. That's exactly what{" "}
            <Link href="/" className="text-primary font-medium hover:underline">PromptFix</Link>{" "}
            does — paste any rough idea from this list, choose your tone, purpose, and depth, and get a fully optimized, production-ready prompt in seconds, along with a quality score so you know it's ready to use.
          </p>
          <Link href="/">
            <Button className="gap-2 mt-2">
              Try PromptFix free
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* FAQ */}
        <div className="space-y-6 border-t border-border/50 pt-10">
          <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="font-semibold text-foreground">{faq.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
