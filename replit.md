# PromptFix - AI Prompt Engineering Platform

## Overview

PromptFix (getpromptfix.com) is a modern SaaS-style AI prompt engineering platform that helps users optimize prompts for ChatGPT, Claude, Midjourney, and other AI tools. Users enter a prompt, select tone/purpose/depth settings, and the system sends it to OpenAI's GPT-4o model for optimization. Returns an improved prompt with a quality score (0-100). Maintains optimization history.

## User Preferences

Preferred communication style: Simple, everyday language.

## SEO & Domain

- **Primary Domain**: https://www.getpromptfix.com/ (www with trailing slash)
- **Canonical**: Dual approach — dynamic client-side hook + server-side Link header
- **Target Keywords**: "AI Prompt Fixer", "Prompt Engineering Tool", "Get Prompt Fix"
- **Static SEO Content**: index.html contains full static content visible to crawlers without JS

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for smooth transitions
- **Dark Mode**: next-themes with class strategy
- **Build Tool**: Vite with hot module replacement

**Design philosophy**: Clean, minimal UI inspired by ChatGPT/Notion AI quality — tool-first, whitespace-driven, no gradient backgrounds or flashy animations. Sections separated by subtle top borders.

The homepage features:
- Minimal hero with headline "Write better prompts. Get better results." and single CTA
- Prompt optimizer (tool-first design): settings bar → input textarea → output panel with empty/loading/result states
- Sidebar history panel (desktop only) with clickable past optimizations
- Prompt Quality Score (0-100) with animated progress bar
- Before/After examples section (3 prompt transformations)
- Features section "Why use PromptFix?" (3 text-centered items with small icons)
- How It Works (3 numbered steps, compact)
- Pricing section (Free + Pro coming soon)
- FAQ with accordion (5 questions)
- SEO text section with 3 stats
- Articles & Guides section (text-only cards)
- Word counter and 1000 character limit on input
- Copy button for optimized prompts
- Clean loading spinner during optimization

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Pattern**: RESTful endpoints defined in `shared/routes.ts` with Zod validation
- **Database ORM**: Drizzle ORM with PostgreSQL
- **AI Integration**: OpenAI API (via Replit AI Integrations)

Key endpoints:
- `POST /api/optimize` - Accepts `{prompt, tone, purpose, depth}`, returns `{optimizedPrompt, promptScore}`
- `GET /api/history` - Retrieves all past optimizations

The optimize endpoint makes two OpenAI calls:
1. Optimize the prompt with tone/purpose/depth context
2. Score the optimized prompt on clarity, structure, specificity (0-100)

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts`
- **Main Table**: `optimizations` storing original prompts, optimized versions, and timestamps
- **Additional Tables**: `conversations` and `messages` for chat functionality (in `shared/models/chat.ts`)

### Code Organization
```
client/           # React frontend
  src/
    components/   # UI components (shadcn/ui + custom)
    hooks/        # React Query hooks for API calls
    pages/        # Page components (Home, Privacy, Contact, Terms, Articles)
    lib/          # Utilities and query client
  index.html      # SEO static content + meta tags + JSON-LD schemas
  public/         # Static assets (sitemap.xml, robots.txt, images)
server/           # Express backend
  index.ts        # Server setup with canonical headers, compression & IP redirect (excludes private/loopback IPs)
  routes.ts       # API endpoint definitions
  storage.ts      # Database access layer
  db.ts           # Database connection
  replit_integrations/  # Pre-built AI integration utilities
shared/           # Shared types and schemas
  schema.ts       # Drizzle database schema
  routes.ts       # API route definitions with Zod schemas
```

### Build System
- Development: `npm run dev` runs TypeScript server with tsx
- Production: `npm run build` uses esbuild for server, Vite for client (with CSS minification, code splitting for vendor-ui and vendor-motion chunks)
- Database: `npm run db:push` syncs schema with Drizzle Kit

### SEO & Performance
- **Font loading**: Google Fonts loaded via preload + media="print" onload pattern (non-render-blocking); `@import` removed from CSS
- **Critical CSS**: Inlined in `<style>` tag in index.html head (replaces external critical.css)
- **Canonical URL**: `<link rel="canonical">` tag + server-side `Link` header + 301 redirect (non-www → www)
- **Security headers**: X-Content-Type-Options, X-Frame-Options, Referrer-Policy, HSTS
- **Caching**: Immutable cache (1yr) for hashed assets (JS/CSS/images/fonts); 1hr must-revalidate for HTML; 24hr for XML/JSON/TXT
- **Compression**: gzip via express compression middleware
- **Code splitting**: Vite manualChunks separates framer-motion and Radix UI into separate cached bundles
- **Static SEO content**: index.html contains full static fallback content for crawlers (replaced by React on hydration)

## External Dependencies

### AI Services
- **OpenAI API**: Used for prompt optimization and scoring via GPT-4o model
- Environment variables: `AI_INTEGRATIONS_OPENAI_API_KEY`, `AI_INTEGRATIONS_OPENAI_BASE_URL`

### Database
- **PostgreSQL**: Primary data store
- Environment variable: `DATABASE_URL`
- Connection pooling via `pg` package

### Key NPM Packages
- `drizzle-orm` + `drizzle-zod`: Type-safe database queries with validation
- `@tanstack/react-query`: Server state management
- `framer-motion`: Animation library
- `date-fns`: Date formatting for history display
- `next-themes`: Dark mode support
- Radix UI primitives: Accessible component foundations (Select, Accordion, etc.)
