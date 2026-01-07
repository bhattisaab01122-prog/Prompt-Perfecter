# PromptFix - AI Prompt Optimizer

## Overview

PromptFix is an AI-powered prompt optimization tool that helps users improve their prompts for Large Language Models like ChatGPT, Claude, and Midjourney. Users enter a prompt, the system sends it to OpenAI's GPT-4o model for optimization, and returns an improved version. The app maintains a history of all optimizations for reference.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for smooth transitions
- **Build Tool**: Vite with hot module replacement

The frontend follows a simple page-based structure with reusable components. The main page (`Home.tsx`) handles prompt input, optimization requests, and displays results. A separate `HistoryList` component shows past optimizations.

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Pattern**: RESTful endpoints defined in `shared/routes.ts` with Zod validation
- **Database ORM**: Drizzle ORM with PostgreSQL
- **AI Integration**: OpenAI API (via Replit AI Integrations)

Key endpoints:
- `POST /api/optimize` - Sends prompt to GPT-4o for optimization
- `GET /api/history` - Retrieves all past optimizations

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
    pages/        # Page components
    lib/          # Utilities and query client
server/           # Express backend
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
- **OpenAI API**: Used for prompt optimization via GPT-4o model
- Environment variables: `AI_INTEGRATIONS_OPENAI_API_KEY`, `AI_INTEGRATIONS_OPENAI_BASE_URL`

### Database
- **PostgreSQL**: Primary data store
- Environment variable: `DATABASE_URL`
- Connection pooling via `pg` package

### Pre-built Integrations (in `server/replit_integrations/`)
- **Batch Processing**: Utilities for rate-limited batch API calls
- **Chat**: Ready-to-use chat conversation endpoints
- **Image Generation**: OpenAI image generation endpoints

### Key NPM Packages
- `drizzle-orm` + `drizzle-zod`: Type-safe database queries with validation
- `@tanstack/react-query`: Server state management
- `framer-motion`: Animation library
- `date-fns`: Date formatting for history display
- Radix UI primitives: Accessible component foundations