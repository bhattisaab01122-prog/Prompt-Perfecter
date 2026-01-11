# PromptFix Design Guidelines

## Design Approach
**Reference-Based**: Drawing from Linear's precision, ChatGPT's clarity, and Notion's clean interface aesthetic. Focus on professional polish with subtle sophistication—minimal distractions, maximum utility.

## Typography System
- **Primary Font**: Inter (Google Fonts) for all UI text
- **Display Font**: Space Grotesk (Google Fonts) for headlines and hero
- **Hierarchy**:
  - Hero headline: text-6xl md:text-7xl, font-bold, tracking-tight
  - Section headers: text-4xl md:text-5xl, font-bold
  - Card titles: text-xl, font-semibold
  - Body: text-base, font-normal
  - Small labels: text-sm, font-medium

## Layout System
**Spacing Primitives**: Use Tailwind units of 3, 4, 6, 8, 12, 16, 20, 24
- Section padding: py-20 md:py-32
- Card padding: p-6 md:p-8
- Element spacing: gap-6, space-y-8
- Container: max-w-7xl mx-auto px-4

## Core Components

**Hero Section** (90vh):
- Full-width gradient background with abstract AI-themed visual
- Centered content with headline, subtitle, dual-CTA layout
- Large hero image/illustration positioned right (60% width on desktop)
- Input demo field showing before/after prompt transformation
- Floating blur-backdrop buttons (primary + secondary)

**Features Grid** (3-column desktop, 1-column mobile):
- Icon-title-description cards with subtle border and hover lift
- Icons from Heroicons (outline style)
- Each card: rounded-2xl, border, p-8, hover:shadow-lg transition

**How It Works** (4-step timeline):
- Vertical timeline connector on mobile, horizontal on desktop
- Step cards with numbers, icons, and descriptions
- Alternating layout pattern for visual interest

**Comparison Section**:
- Side-by-side "Before/After" split-screen layout
- Prompt examples in code-style boxes with syntax highlighting effect
- Improvement metrics badges (clarity, specificity, results)

**Pricing Table** (3-tier):
- Highlighted "Popular" tier with distinct treatment
- Feature checkmarks, clear CTAs
- Bento-style cards with rounded-3xl borders

**Testimonials**:
- 3-column grid of testimonial cards
- User avatars (placeholder circles), names, roles
- Quote text with rating stars

**CTA Section**:
- Full-width with gradient background treatment
- Centered headline + description + primary CTA
- Newsletter input field integrated

**Footer**:
- 4-column layout: Product, Company, Resources, Contact
- Social icons, copyright, quick links
- Subtle top border separator

## Animation Guidelines
Use sparingly and purposefully:
- **Fade-in on scroll**: Sections appear with opacity 0→1 + translateY(20px)→0 (duration: 600ms)
- **Hover states**: Cards lift with shadow increase (duration: 200ms, ease-out)
- **Button interactions**: Subtle scale (0.98→1) on click
- **Input focus**: Border glow effect (duration: 150ms)
- **Hero elements**: Stagger entrance animations (100ms delay between elements)
- **No parallax, no continuous motion, no distracting effects**

## Images Section

**Hero Image**: 
Abstract illustration of AI transformation—geometric shapes, neural network patterns, or stylized prompt flow visualization. Should feel modern, technical but approachable. Positioned on right side of hero, with gradient overlay blending into background. Dimensions: 1200x800px, high-quality.

**Feature Icons**: 
Use Heroicons for consistency—sparkles (AI magic), lightning-bolt (speed), chart-bar (analytics), shield-check (reliability).

**Before/After Section**:
Text-based comparison boxes—no images needed. Style as code blocks with syntax-like formatting.

**No photography needed**—this is a tech tool; illustrations and abstract visuals maintain professional, modern aesthetic without stock photo clichés.