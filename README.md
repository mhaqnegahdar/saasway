# SaaSWayz

> AI-powered clarity and strategy calls for SaaS founders — from idea validation to execution roadmap.

---

## What is SaaSWayz?

SaaSWayz replaces expensive ($500-$2,500) and time-consuming (1-2 weeks) strategy consulting with real-time AI voice calls that deliver structured guidance in hours, not weeks.

**Two call types:**

- **Clarity Call** – Validates your idea and recommends: Build / Adjust / Validate More
- **Strategy Call** – Translates your validated idea into a PRD + Technical Proposal

**Key Features:**

- Real-time voice interaction with expert AI
- Automated PRD and Technical Proposal generation
- Chat with AI across all project data (vector search)
- Document iteration via conversational updates
- Version history for all documents

---

## Tech Stack

- **Frontend:** Next.js 15, React 19, Shadcn, TailwindCSS
- **Backend:** tRPC, NeonDB + pgvector, Drizzle ORM
- **AI:** OpenAI Realtime API, GPT-4, text-embedding-3-small
- **Auth:** BetterAuth
- **Payments:** Polar
- **Real-time:** Stream SDK, Ingest Agent Kit

---

## Documentation

📄 **[Product Requirements Document (PRD)](./PRD.md)**  
Complete product strategy, problem definition, success metrics, and user flows.

🛠️ **[Technical Proposal](./Technical-Proposal.md)**  
Architecture, data model, implementation phases, and technical risk analysis.

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/mhaqnegahdar/saasway.git
cd saaswayz

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Add your API keys: OPENAI_API_KEY, DATABASE_URL, etc.

# Run database migrations
bun run db:migrate

# Start development server
bun run dev
```

Visit `http://localhost:3000`

---

## Project Structure

```
/src
  /app                 # Next.js app router
  /components          # React components (UI + features)
  /server              # tRPC routers, services, DB schema
  /lib                 # Shared utilities
  /types               # TypeScript types
  /modules
```

---

## Environment Variables

Required variables (see `.env.example`):

```bash
DATABASE_URL=          # NeonDB connection string
OPENAI_API_KEY=        # OpenAI API key
BETTERAUTH_SECRET=     # Random secret for auth
POLAR_API_KEY=         # Polar payment key
NEXT_PUBLIC_APP_URL=   # Production URL
```

---

## Development Timeline

- **Week 1:** Auth, database, voice integration
- **Week 2:** AI prompts, document generation
- **Week 3:** Chat + vector search, document iteration
- **Week 4+:** Polish, testing, beta launch

Target: Working MVP in 3-4 weeks.

---

## Roadmap

- [x] Core architecture design
- [x] PRD and Technical Proposal documentation
- [ ] Voice call integration (OpenAI Realtime API)
- [ ] Document generation pipeline
- [ ] Vector search + chat interface
- [ ] Document iteration feature
- [ ] Alpha launch (5-10 users)

---

## Contributing

This is an early-stage project. Contributions welcome once MVP is stable.

---

## License

MIT

---

## Contact

Questions or feedback? Open an issue or reach out directly.

---

**Built for founders who want clarity, not confusion.**
