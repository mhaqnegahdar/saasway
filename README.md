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

```
saaswayz
├─ PRD.md
├─ README.md
├─ Technical-Proposal.md
├─ bun.lock
├─ components.json
├─ drizzle
│  ├─ 0000_burly_groot.sql
│  └─ meta
│     ├─ 0000_snapshot.json
│     └─ _journal.json
├─ drizzle.config.ts
├─ eslint.config.mjs
├─ next.config.ts
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ hero-illustration.jpg
│  └─ logo.svg
├─ src
│  ├─ app
│  │  ├─ (auth)
│  │  │  ├─ login
│  │  │  │  └─ page.tsx
│  │  │  └─ signup
│  │  │     └─ page.tsx
│  │  ├─ (dashboard)
│  │  │  ├─ call
│  │  │  │  └─ [id]
│  │  │  │     ├─ live
│  │  │  │     │  └─ page.tsx
│  │  │  │     └─ page.tsx
│  │  │  ├─ dashboard
│  │  │  │  └─ page.tsx
│  │  │  ├─ layout.tsx
│  │  │  └─ project
│  │  │     └─ [id]
│  │  │        └─ page.tsx
│  │  ├─ api
│  │  │  └─ auth
│  │  │     └─ [...all]
│  │  │        └─ route.ts
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ components
│  │  ├─ app-sidebar.tsx
│  │  ├─ form
│  │  │  ├─ lib
│  │  │  │  └─ types.ts
│  │  │  └─ ui
│  │  │     └─ components
│  │  │        ├─ inputs
│  │  │        │  ├─ combobox-input.tsx
│  │  │        │  ├─ date-input.tsx
│  │  │        │  └─ multiselect-input.tsx
│  │  │        ├─ rhf-form-container.tsx
│  │  │        └─ rhf-input.tsx
│  │  ├─ layout
│  │  │  └─ logo
│  │  │     └─ index.tsx
│  │  ├─ nav-main.tsx
│  │  ├─ nav-projects.tsx
│  │  ├─ nav-secondary.tsx
│  │  ├─ nav-user.tsx
│  │  ├─ providers
│  │  │  ├─ inner-providers.tsx
│  │  │  ├─ outer-provider.tsx
│  │  │  └─ theme-provider.tsx
│  │  └─ ui
│  │     ├─ accordion.tsx
│  │     ├─ alert-dialog.tsx
│  │     ├─ alert.tsx
│  │     ├─ aspect-ratio.tsx
│  │     ├─ avatar.tsx
│  │     ├─ badge.tsx
│  │     ├─ breadcrumb.tsx
│  │     ├─ button-group.tsx
│  │     ├─ button.tsx
│  │     ├─ calendar.tsx
│  │     ├─ card.tsx
│  │     ├─ carousel.tsx
│  │     ├─ chart.tsx
│  │     ├─ checkbox.tsx
│  │     ├─ collapsible.tsx
│  │     ├─ command.tsx
│  │     ├─ context-menu.tsx
│  │     ├─ dialog.tsx
│  │     ├─ drawer.tsx
│  │     ├─ dropdown-menu.tsx
│  │     ├─ empty.tsx
│  │     ├─ field.tsx
│  │     ├─ form.tsx
│  │     ├─ hover-card.tsx
│  │     ├─ input-group.tsx
│  │     ├─ input-otp.tsx
│  │     ├─ input.tsx
│  │     ├─ item.tsx
│  │     ├─ kbd.tsx
│  │     ├─ label.tsx
│  │     ├─ menubar.tsx
│  │     ├─ navigation-menu.tsx
│  │     ├─ pagination.tsx
│  │     ├─ popover.tsx
│  │     ├─ progress.tsx
│  │     ├─ radio-group.tsx
│  │     ├─ resizable.tsx
│  │     ├─ scroll-area.tsx
│  │     ├─ select.tsx
│  │     ├─ separator.tsx
│  │     ├─ sheet.tsx
│  │     ├─ sidebar.tsx
│  │     ├─ skeleton.tsx
│  │     ├─ slider.tsx
│  │     ├─ sonner.tsx
│  │     ├─ spinner.tsx
│  │     ├─ switch.tsx
│  │     ├─ table.tsx
│  │     ├─ tabs.tsx
│  │     ├─ textarea.tsx
│  │     ├─ toggle-group.tsx
│  │     ├─ toggle.tsx
│  │     └─ tooltip.tsx
│  ├─ db
│  │  ├─ index.ts
│  │  ├─ migrate.ts
│  │  └─ schema
│  │     ├─ account.ts
│  │     ├─ enums.ts
│  │     ├─ index.ts
│  │     ├─ session.ts
│  │     ├─ user.ts
│  │     └─ verification.ts
│  ├─ hooks
│  │  └─ use-mobile.ts
│  ├─ lib
│  │  ├─ auth
│  │  │  ├─ auth-client.ts
│  │  │  └─ auth.ts
│  │  └─ utils.ts
│  └─ modules
│     ├─ auth
│     │  ├─ schema.ts
│     │  ├─ types.ts
│     │  └─ ui
│     │     ├─ components
│     │     │  ├─ signin-form.tsx
│     │     │  ├─ signup-form.tsx
│     │     │  └─ social-login.tsx
│     │     └─ views
│     │        ├─ signin-view.tsx
│     │        └─ signup-view.tsx
│     ├─ dashboard
│     ├─ landing
│     │  └─ ui
│     │     ├─ components
│     │     │  ├─ cta-section
│     │     │  │  └─ index.tsx
│     │     │  ├─ features-section
│     │     │  │  └─ index.tsx
│     │     │  ├─ hero-section
│     │     │  │  └─ index.tsx
│     │     │  ├─ how-it-works-section
│     │     │  │  └─ index.tsx
│     │     │  └─ layout
│     │     │     ├─ footer
│     │     │     │  └─ index.tsx
│     │     │     ├─ header
│     │     │     └─ index.tsx
│     │     └─ views
│     │        └─ landing-view.tsx
│     └─ project
├─ tsconfig.json
└─ vercel.json

```