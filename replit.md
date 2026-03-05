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

The homepage features:
- Gradient hero section with "Try Prompt Fix Now" CTA and trust badges
- Prompt optimizer with Tone/Purpose/Depth dropdowns and sidebar history
- Prompt Quality Score (0-100) with progress bar
- Before/After examples section (3 prompt transformation examples)
- Features section "Why Use PromptFix?" (3 cards with icons)
- How It Works (3 steps with visual flow)
- Pricing section (Free plan + Pro plan coming soon)
- FAQ with collapsible accordion (5 questions)
- SEO rich text section with stats
- Articles & Guides section
- Word counter and 1000 character limit on input
- Copy button for optimized prompts
- Loading animation during AI optimization

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
- Production: `npm run build` uses esbuild for server, Vite for client
- Database: `npm run db:push` syncs schema with Drizzle Kit

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
