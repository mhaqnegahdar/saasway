# SaaSWayz Technical Proposal

## Executive Summary

This document outlines the technical architecture and implementation strategy for SaaSWayz, an AI-powered platform that conducts real-time voice calls with SaaS founders to provide clarity and strategy guidance. The system leverages modern web technologies and AI APIs to deliver an automated, scalable consulting experience.

---

## Architecture Overview

### System Components

**Frontend Layer (Next.js 15 + React 19)**
- Server-rendered pages for SEO and initial load performance
- Client-side interactivity for real-time call experience
- tRPC for type-safe API calls between frontend and backend
- TanStack Query for data fetching, caching, and optimistic updates
- Shadcn + TailwindCSS for UI components and styling

**Backend Layer (Next.js API Routes + tRPC)**
- tRPC routers for type-safe API endpoints
- Business logic for project management, call orchestration, and document generation
- Integration with OpenAI Realtime API for voice conversations
- Stream SDK for real-time data synchronization during calls
- Ingest Agent Kit for processing and structuring call transcripts

**Data Layer (NeonDB + Drizzle ORM)**
- PostgreSQL database hosted on Neon (serverless, auto-scaling)
- Drizzle ORM for type-safe database queries and migrations
- pgvector extension for storing and querying embeddings
- Schema design supports projects, calls, transcripts, documents, and versions

**Authentication & Payments**
- BetterAuth for authentication (email/password, OAuth providers)
- Polar for subscription management and payment processing

**AI & ML Layer**
- OpenAI Realtime API for voice interaction during calls
- OpenAI embeddings (text-embedding-3-small) for vector search
- GPT-4 for document generation (PRD, Technical Proposal)
- GPT-4 for chat-based document iteration

---

## Data Model

### Core Entities

**Users**
```
- id: string (primary key)
- email: string (unique)
- name: string
- created_at: timestamp
- updated_at: timestamp
```

**Projects**
```
- id: string (primary key)
- user_id: string (foreign key → users.id)
- name: string
- description: text (nullable)
- created_at: timestamp
- updated_at: timestamp
```

**Calls**
```
- id: string (primary key)
- project_id: string (foreign key → projects.id)
- type: enum ('clarity', 'strategy')
- status: enum ('upcoming', 'in_progress', 'processing', 'completed', 'canceled')
- scheduled_at: timestamp
- started_at: timestamp (nullable)
- completed_at: timestamp (nullable)
- recording_url: string (nullable)
- transcript: text (nullable)
- summary: text (nullable)
- recommendation: enum ('build', 'adjust', 'validate_more') (nullable, clarity calls only)
- created_at: timestamp
- updated_at: timestamp
```

**Documents**
```
- id: string (primary key)
- project_id: string (foreign key → projects.id)
- type: enum ('prd', 'technical_proposal')
- version: integer (default 1)
- content: text
- created_from_call_id: string (foreign key → calls.id, nullable)
- created_at: timestamp
- updated_at: timestamp
```

**Embeddings**
```
- id: string (primary key)
- project_id: string (foreign key → projects.id)
- source_type: enum ('transcript', 'document', 'chat_message')
- source_id: string (references calls.id, documents.id, or chat_messages.id)
- content: text
- embedding: vector(1536) (pgvector type)
- created_at: timestamp
```

**ChatMessages**
```
- id: string (primary key)
- project_id: string (foreign key → projects.id)
- role: enum ('user', 'assistant')
- content: text
- created_at: timestamp
```

### Relationships
- One user has many projects
- One project has many calls (max 1 clarity, max 1 strategy)
- One project has many documents (multiple versions per type)
- One project has many embeddings
- One project has many chat messages

---

## Tech Stack Rationale

**Next.js 15 + React 19**
- Server-side rendering for fast initial page loads
- React Server Components reduce client-side JavaScript
- App Router provides clean file-based routing
- Built-in API routes eliminate need for separate backend server

**tRPC**
- End-to-end type safety between frontend and backend
- No code generation required
- Excellent DX with autocomplete and compile-time errors
- Seamlessly integrates with TanStack Query

**TanStack Query**
- Handles data fetching, caching, and synchronization
- Optimistic updates for better UX during document changes
- Built-in retry logic and error handling
- Works perfectly with tRPC for type-safe queries

**Shadcn + TailwindCSS**
- Shadcn provides accessible, customizable components
- Copy-paste approach keeps bundle size small
- TailwindCSS enables rapid UI development
- No runtime CSS-in-JS overhead

**NeonDB + Drizzle ORM**
- Neon: Serverless PostgreSQL with auto-scaling and branching
- Drizzle: Lightweight, type-safe ORM with excellent DX
- pgvector extension enables vector similarity search for AI features
- Cost-effective for early-stage usage patterns

**OpenAI Realtime API**
- Native support for voice input/output
- Low-latency streaming audio
- Handles conversation context automatically
- Function calling enables structured data extraction

**BetterAuth**
- Modern, flexible authentication library
- Supports multiple providers (email, Google, GitHub)
- Type-safe API
- Easy to extend with custom logic

**Polar**
- Developer-friendly subscription billing
- Built for SaaS products
- Simple pricing model for early-stage startups

---

## Key Technical Flows

### 1. Voice Call Flow

**Initialization:**
1. User clicks "Join Call" button
2. Frontend requests WebRTC session from tRPC endpoint
3. Backend creates OpenAI Realtime API session
4. Backend updates call status to "in_progress"
5. Frontend establishes audio stream connection

**During Call:**
1. User speaks; audio captured via browser MediaRecorder API
2. Audio chunks streamed to OpenAI Realtime API via WebSocket
3. AI processes audio, generates response using GPT-4o-realtime
4. AI response streamed back as audio chunks
5. Frontend plays audio response in real-time
6. Full transcript accumulated in backend

**AI Prompt Structure (Clarity Call):**
```
System: You are an expert product advisor conducting a clarity call with a SaaS founder. Your goal is to determine whether they should Build, Adjust their idea, or Validate More before proceeding.

Follow this structured interview:
1. Idea Overview: What are you building? For whom?
2. Problem Validation: How do you know this problem exists? Who have you talked to?
3. Competitive Landscape: What alternatives exist? Why will users switch?
4. Resource Assessment: What's your timeline, budget, and technical capability?
5. Risk Analysis: What are the biggest unknowns?

After gathering information, provide a clear recommendation with reasoning.
```

**AI Prompt Structure (Strategy Call):**
```
System: You are a technical architect helping a founder create a detailed implementation plan. You have context from their previous Clarity Call. Your goal is to produce a PRD and Technical Proposal.

Guide the conversation through:
1. Feature Prioritization: What's the MVP? What's nice-to-have?
2. Technical Architecture: What's the appropriate tech stack given constraints?
3. Data Model: What entities and relationships are needed?
4. Implementation Phases: What's the build sequence?
5. Risk Mitigation: What technical challenges should they anticipate?

Use the founder's responses to populate a structured PRD template.
```

**Completion:**
1. User ends call (or timeout after inactivity)
2. Backend updates call status to "processing"
3. Full transcript saved to database
4. Recording uploaded to storage (S3 or similar)
5. Backend triggers document generation pipeline

### 2. Document Generation Flow

**Input:** Call transcript (text)

**Processing Steps:**
1. Parse transcript into structured sections using GPT-4
2. Extract key decisions, constraints, and requirements
3. Populate PRD template with extracted information
4. Generate Technical Proposal with architecture details
5. Create embeddings for transcript and documents
6. Store embeddings in database with pgvector

**Embedding Strategy:**
- Chunk transcript into semantic segments (500-1000 tokens)
- Generate embeddings using text-embedding-3-small
- Store embeddings with metadata (source_type, source_id, project_id)
- Index enables fast similarity search for chat feature

**Document Templates:**
- PRD follows Lenny Rachitsky format (as defined in system prompt)
- Technical Proposal follows structured sections: Architecture, Data Model, Tech Stack, Implementation Phases
- Both templates populated via GPT-4 with explicit instructions

**Version Management:**
- Each document update creates new row in documents table
- Version increments automatically
- UI dropdown shows all versions with timestamps
- Users can toggle between versions

### 3. Chat with AI Flow

**Query Processing:**
1. User submits question in chat interface
2. Frontend sends question to tRPC endpoint
3. Backend generates embedding for user question
4. Backend performs vector similarity search in embeddings table
5. Retrieve top 5-10 most relevant chunks (transcripts, documents)
6. Construct GPT-4 prompt with retrieved context + user question
7. Stream GPT-4 response back to frontend
8. Save user message and assistant response to chat_messages table

**Prompt Structure:**
```
System: You are an AI assistant helping a founder understand their project. You have access to their call transcripts and project documents.

Context:
{retrieved_chunks}

User Question: {user_question}

Provide a clear, specific answer based on the context. If the context doesn't contain relevant information, say so. Include references to which call or document your answer comes from.
```

### 4. Document Iteration Flow

**User Action:**
1. User clicks "Make Changes" on document
2. Chat interface opens with document context loaded

**Change Request Processing:**
1. User describes desired changes ("Make the timeline more aggressive")
2. Frontend sends message to tRPC endpoint with document_id and change request
3. Backend retrieves current document version
4. Backend sends to GPT-4: current document + change request
5. GPT-4 generates updated document
6. Backend creates new document version in database
7. Frontend displays new version, updates dropdown
8. User can compare versions side-by-side

---

## Implementation Phases

### Phase 1: Foundation (Week 1)
**Focus:** Authentication, database, basic UI

**Tasks:**
- Set up Next.js 15 project with TypeScript
- Configure Drizzle ORM + NeonDB connection
- Implement BetterAuth (email/password only)
- Create database schema and run migrations
- Build dashboard UI with Shadcn components
- Implement tRPC routers for projects and calls
- Create project creation and listing pages

**Deliverables:**
- Users can sign up, log in, create projects
- Projects and calls are stored in database
- Basic dashboard shows project list

### Phase 2: Voice Integration (Week 1-2)
**Focus:** OpenAI Realtime API, call recording

**Tasks:**
- Integrate OpenAI Realtime API
- Build WebSocket connection for audio streaming
- Implement browser audio capture (MediaRecorder)
- Create call UI with microphone controls
- Handle call state transitions (upcoming → in_progress → processing)
- Store recordings and transcripts
- Build call detail page

**Deliverables:**
- Users can join scheduled calls
- Voice conversation works end-to-end
- Transcripts are saved and viewable

### Phase 3: AI Logic (Week 2)
**Focus:** Prompt engineering, decision logic

**Tasks:**
- Write Clarity Call prompt with structured interview flow
- Write Strategy Call prompt with technical focus
- Implement conversation memory and context handling
- Build recommendation logic (Build/Adjust/Validate More)
- Test prompts with mock scenarios
- Refine follow-up question logic

**Deliverables:**
- Clarity Calls produce clear recommendations
- Strategy Calls gather sufficient technical detail
- AI asks relevant, specific follow-up questions

### Phase 4: Document Generation (Week 2)
**Focus:** PRD and Technical Proposal creation

**Tasks:**
- Build document generation pipeline
- Write GPT-4 prompts for PRD and Technical Proposal
- Implement template population from transcript
- Create document viewing UI
- Add download functionality (PDF export)
- Implement version management

**Deliverables:**
- Completed Strategy Calls produce PRD + Technical Proposal
- Documents are viewable, downloadable
- Version dropdown shows all document versions

### Phase 5: Vector Search & Chat (Week 3)
**Focus:** Embeddings, chat interface

**Tasks:**
- Set up pgvector extension in NeonDB
- Implement embedding generation (OpenAI text-embedding-3-small)
- Build vector similarity search queries
- Create chat UI
- Implement streaming chat responses
- Store chat history in database

**Deliverables:**
- Users can ask questions about their project
- AI provides context-aware answers with references
- Chat history persists

### Phase 6: Document Iteration (Week 3)
**Focus:** "Make Changes" feature

**Tasks:**
- Build document update workflow
- Integrate chat interface with document context
- Implement version comparison UI
- Add visual diff between versions (optional)
- Test change request understanding

**Deliverables:**
- Users can request document changes via chat
- New versions are created and saved
- Version dropdown shows all iterations

### Phase 7: Polish & Testing (Week 3-4)
**Focus:** Bug fixes, UX improvements

**Tasks:**
- Error handling for call drops and failures
- Loading states and optimistic updates
- Mobile responsiveness
- Email notifications for call completion
- Analytics tracking (Posthog or similar)
- Performance optimization (lazy loading, code splitting)

**Deliverables:**
- Stable, bug-free experience
- Fast page loads
- Clear error messages and recovery flows

---

## Technical Risks & Mitigations

### Risk 1: OpenAI Realtime API Latency
**Impact:** Audio lag makes conversation feel unnatural
**Mitigation:** 
- Test under various network conditions
- Implement buffering strategy
- Provide visual indicator when AI is processing
- Use WebRTC for peer-to-peer audio if latency is unacceptable

### Risk 2: Vector Search Quality
**Impact:** Chat responses lack relevant context
**Mitigation:**
- Experiment with chunking strategies (size, overlap)
- Tune similarity threshold for retrieval
- Combine vector search with keyword filtering
- A/B test different embedding models

### Risk 3: Document Quality
**Impact:** Generated PRDs are generic or miss key details
**Mitigation:**
- Use highly structured prompts with examples
- Implement post-processing validation checks
- Allow manual editing in UI
- Iterate on prompts based on real usage

### Risk 4: Call Recording Storage Costs
**Impact:** Large audio files are expensive to store
**Mitigation:**
- Compress recordings before storage
- Use lifecycle policies to archive old recordings
- Consider storing transcripts only after 30 days
- Calculate cost per user and build into pricing

### Risk 5: Database Performance at Scale
**Impact:** Slow queries as projects and embeddings grow
**Mitigation:**
- Index frequently queried columns (project_id, user_id)
- Use pgvector indexes for embedding searches (HNSW or IVFFlat)
- Implement pagination for list views
- Monitor query performance with Neon's built-in tools

### Risk 6: Real-Time State Synchronization
**Impact:** Call status not updated in real-time for user
**Mitigation:**
- Use Stream SDK for WebSocket-based updates
- Implement polling fallback if WebSocket fails
- Use TanStack Query's refetch on focus
- Show optimistic updates in UI

---

## Development Best Practices

### Code Organization
```
/src
  /app                 # Next.js app router pages
    /(auth)            # Authentication pages
    /(dashboard)       # Protected dashboard pages
    /api               # API route handlers
  /components          # React components
    /ui                # Shadcn components
    /features          # Feature-specific components
  /server              # Backend logic
    /routers           # tRPC routers
    /services          # Business logic
    /db                # Database schema and migrations
  /lib                 # Shared utilities
  /types               # TypeScript types
```

### Type Safety
- Use Drizzle's inferred types for database entities
- Define tRPC input/output schemas with Zod
- Share types between frontend and backend via tRPC
- Use `satisfies` operator for complex type inference

### Error Handling
- Wrap async operations in try-catch
- Use tRPC error codes (UNAUTHORIZED, NOT_FOUND, etc.)
- Log errors to monitoring service (Sentry, LogRocket)
- Show user-friendly error messages in UI

### Testing Strategy
- Unit tests for utility functions and business logic
- Integration tests for tRPC routers
- E2E tests for critical flows (call creation, document generation)
- Manual QA for voice interactions (hard to automate)

### Monitoring & Observability
- Track API response times with tRPC middleware
- Monitor OpenAI API usage and costs
- Set up alerts for error rate spikes
- Log user actions for product analytics

---

## Deployment Strategy

### Infrastructure
- Host on Vercel (Next.js optimal platform)
- NeonDB managed PostgreSQL (no ops required)
- OpenAI API (pay-per-use)
- S3 or Cloudflare R2 for recording storage

### Environment Variables
```
DATABASE_URL=<neon connection string>
OPENAI_API_KEY=<openai api key>
BETTERAUTH_SECRET=<random secret>
POLAR_API_KEY=<polar api key>
NEXT_PUBLIC_APP_URL=<production URL>
```

### CI/CD Pipeline
- Push to main branch → automatic Vercel deployment
- Run database migrations on deploy
- Preview deployments for pull requests
- Automated type checking and linting

### Monitoring
- Vercel Analytics for web vitals
- Posthog for product analytics
- Sentry for error tracking
- Neon dashboard for database metrics

---

## Cost Estimates (Monthly)

**Assumptions:** 100 active users, 200 calls/month, 50 chat sessions/month

- Vercel Pro: $20
- NeonDB (Launch plan): $19
- OpenAI API: ~$100-200 (calls + embeddings + chat)
- Storage (S3/R2): ~$5
- BetterAuth: Free (self-hosted)
- Polar: Free (under $1K MRR) or 5% + $0.50/transaction

**Total Estimated Cost:** $150-250/month

**Notes:**
- OpenAI costs scale with usage (biggest variable)
- Optimize by caching embeddings, reducing call length
- Monitor costs closely in first month

---

## Future Enhancements (Post-MVP)

- Slack/Discord integration for notifications
- Collaborative editing for documents
- Export to Linear, Jira, or Notion
- Custom AI personalities (user-selectable)
- Multi-language support
- Integration with GitHub for technical proposal → repo setup
- Founder community features (share PRDs, get feedback)

---

## Conclusion

This technical proposal outlines a comprehensive, scalable architecture for SaaSWayz. The chosen tech stack prioritizes developer experience, type safety, and rapid iteration. The phased implementation approach ensures we can validate core assumptions early while building toward a polished, production-ready product.

Key success factors:
- Tight integration between voice AI and document generation
- High-quality, actionable documents that require minimal editing
- Fast, responsive UX with clear loading and error states
- Cost-efficient infrastructure that scales with usage

By following this technical roadmap, we can deliver a working MVP in 3-4 weeks and iterate based on real user feedback.