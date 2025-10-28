# SaaSWayz Product Requirements Document

---

# 1. Description: What is it?

SaaSWayz is an AI-powered platform that replaces traditional strategy and clarity calls for SaaS founders. Through real-time voice interaction, it guides founders from initial idea validation through to execution clarity, delivering structured feedback and actionable documentation in a fraction of the time and cost of traditional consulting.

The platform offers two core meeting types: Clarity Calls (which determine whether to build, adjust, or validate further) and Strategy Calls (which translate validated ideas into detailed technical roadmaps). Each interaction produces structured outputs including recordings, transcripts, PRDs, and technical proposals that founders can iterate on through an AI chat interface.

---

# 2. Problem: What problem is this solving?

**2a. What is the problem this project addresses? (Ideally in 1 sentence)**

SaaS founders are struggling to move from idea validation to execution clarity because traditional strategy calls are expensive ($500-$2,500), time-consuming (1-2 weeks to get clarity), and lack the iterative, on-demand support needed to make confident build decisions.

**2b. What is your hypothesis for why this problem is happening?**

Traditional consulting is built on synchronous human time, which creates artificial scarcity and high costs. Founders need multiple touchpoints to refine their thinking, but scheduling follow-ups is slow and expensive. Additionally, consultants often deliver advice verbally or in unstructured formats, making it hard for founders to reference and iterate on guidance later. The gap between "I have an idea" and "I know exactly what to build" requires ongoing dialogue, not a single conversation.

**2c. What problems are you NOT solving?**

- Connecting founders with developers or development agencies
- Project management or task tracking for implementation
- Funding advice, pitch deck creation, or investor introductions
- Market research or competitive analysis beyond validation guidance
- Ongoing product management or feature prioritization post-launch
- Technical implementation or code generation

---

# 3. Why: How do we know this is a real problem and worth solving?

**Business Impact:**

- Traditional strategy calls cost founders $500-$2,500 per session, creating a significant barrier for early-stage founders with limited budgets
- Founders typically spend 1-2 weeks getting clarity on next steps through traditional consulting, delaying time-to-market and increasing opportunity cost
- The consulting market for early-stage SaaS founders is fragmented and lacks scalable, on-demand solutions

**Customer Impact:**

- Founders report needing multiple iterations to refine their product vision, but scheduling follow-up calls is expensive and slow
- Written deliverables from consultants are often generic or require significant back-and-forth to customize, leaving founders without immediately actionable guidance
- Early-stage founders lack a structured framework to determine whether they should build, pivot, or gather more validation before investing resources

**Note:** Current evidence is based on founder assumptions and anecdotal understanding of the pain. Formal customer research and hard data on conversion/drop-off rates have not yet been collected.

---

# 4. Success: How do we know if we've solved this problem?

**Primary Success Metrics:**

- 70% of users report having clarity on next steps after completing their calls (measured via post-session survey)
- 70% reduction in time to plan compared to traditional consulting (target: clarity achieved within 1-2 hours vs. 1-2 weeks)
- Zero critical bugs that prevent call completion or document generation
- 100% of completed calls produce usable, practical documents (PRD and Technical Proposal) that founders can reference and iterate on

**Product Quality Indicators:**

- System successfully handles the full call flow from scheduling through document generation without manual intervention
- AI delivers relevant, specific feedback rather than generic advice
- Documents generated are actionable and require minimal founder editing to be useful
- "Make Changes" feature successfully updates documents based on founder input

---

# 5. Audience: Who are we building for?

Early-stage SaaS founders who are in the idea validation or pre-build phase. These founders have identified a potential product opportunity but lack clarity on whether to proceed, what exactly to build, or how to translate their vision into a technical roadmap. They value speed, affordability, and structured guidance but may not have the budget for traditional consulting or the network to access experienced advisors.

---

# 6. What: Roughly, what does this look like in the product?

**Core Experience:**

Users create a project and schedule one of two meeting types through a dashboard interface. During the meeting, they engage in real-time voice conversation with an AI that asks clarifying questions, challenges assumptions, and guides them through a structured framework.

**Clarity Call:** The AI explores the founder's idea, target market, problem validation, competitive landscape, and resource readiness. The call concludes with a clear recommendation: Build (proceed to execution), Adjust (refine the idea first), or Validate More (gather additional evidence). The output includes a recording, transcript, and summary document.

**Strategy Call:** Assuming validation has been established, the AI dives into technical requirements, feature prioritization, architecture decisions, and implementation sequencing. The output includes a full PRD (following Lenny Rachitsky's format) and a Technical Proposal detailing how to build the product using the founder's chosen tech stack.

**Post-Call Interface:**

The Documents section includes three tabs:
- Chat with AI: Founders can ask questions about their project using vector search across all project data
- PRD: View, download, or request changes to the product requirements document
- Technical Proposal: View, download, or request changes to the technical implementation plan

The "Make Changes" button triggers an AI conversation where founders describe desired updates. The AI generates a new version, accessible via a version dropdown.

**Meeting States:**
- Upcoming: Scheduled but not yet started
- In Progress: Currently active
- Processing: Call completed, AI generating documents
- Completed: Documents ready
- Canceled: Meeting was canceled

---

# 6.5. User Flow

**Initial Setup:**
1. User signs up and creates an account
2. User creates a new project (enters project name and basic details)
3. User selects meeting type: Clarity Call or Strategy Call
4. User schedules the meeting (date/time selection)

**Clarity Call Flow:**
1. User joins the call at scheduled time (voice interface activates)
2. AI introduces itself and explains the call structure
3. AI asks structured questions about: idea overview, target customer, problem validation, competitive landscape, resources/constraints
4. User responds via voice; AI adapts follow-up questions based on responses
5. AI synthesizes information and provides recommendation: Build / Adjust / Validate More
6. Call ends; status changes to "Processing"
7. System generates transcript, recording, and summary document
8. Status changes to "Completed"; user receives notification
9. User can review documents and optionally schedule Strategy Call

**Strategy Call Flow:**
1. User joins the call (assumes Clarity Call completed with "Build" recommendation)
2. AI reviews prior context from Clarity Call
3. AI guides discussion through: feature prioritization, technical architecture, tech stack rationale, MVP scope, implementation phases
4. User provides input on preferences, constraints, and priorities
5. Call concludes with summary of decisions made
6. Status changes to "Processing"
7. System generates PRD and Technical Proposal using templates
8. Status changes to "Completed"; documents appear in tabs
9. User can download, review, or request changes

**Document Iteration Flow:**
1. User clicks "Make Changes" on PRD or Technical Proposal
2. Chat interface opens with document context loaded
3. User describes desired changes via text
4. AI proposes updates and confirms intent
5. AI generates new document version
6. New version appears in version dropdown
7. User can toggle between versions, download any version

**Chat with AI Flow:**
1. User navigates to "Chat with AI" tab
2. User asks questions about their project
3. AI uses vector search across transcripts, documents, and project data
4. AI provides contextualized answers with references to source material
5. Conversation history persists within project context

---

# 7. How: What is the experiment plan?

**Phase 1: Controlled Alpha (Weeks 1-2)**
- Launch with 5-10 founders from personal network
- Manual observation of each call to identify failure points
- Collect structured feedback via post-call survey (clarity achieved, document quality, time saved)
- Iterate on AI prompt engineering based on actual call transcripts

**Phase 2: Invite-Only Beta (Weeks 3-4)**
- Expand to 25-50 users via invite codes
- Implement basic analytics: call completion rate, document generation success rate, time-to-completion
- A/B test two different AI personalities (expert technical architect vs. collaborative thought partner)
- Gather qualitative feedback on document usefulness through follow-up interviews

**Phase 3: Validation Metrics (Week 5+)**
- Track primary success metrics: % reporting clarity, time savings vs. traditional consulting
- Measure document iteration patterns: how often do users request changes? What types of changes?
- Monitor technical stability: error rates, call drop rates, document generation failures
- Collect NPS and feature requests to inform roadmap

**Key Learning Questions:**
- Does the AI ask sufficiently specific questions, or does it feel generic?
- Are founders able to complete calls without getting stuck or confused?
- Do generated documents require extensive manual editing, or are they immediately useful?
- What is the drop-off rate between Clarity Call and Strategy Call?

---

# 8. When: When does it ship and what are the milestones?

**Milestone 1: Core Infrastructure & Auth**
- Date: Week 1 (Days 1-3)
- Deliverable: User authentication, project creation, basic dashboard UI
- Risks: BetterAuth integration complexity, database schema design decisions
- Mitigations: Use BetterAuth documentation examples, keep initial schema simple and extensible

**Milestone 2: Voice Call Integration**
- Date: Week 1-2 (Days 4-7)
- Deliverable: OpenAI Realtime API integration, call state management, recording/transcript storage
- Risks: Real-time API latency, audio quality issues, error handling for dropped calls
- Mitigations: Implement retry logic, test with various network conditions, build fallback UI states

**Milestone 3: AI Prompt Engineering & Call Logic**
- Date: Week 2 (Days 8-10)
- Deliverable: Structured prompts for Clarity and Strategy calls, decision tree logic, recommendation generation
- Risks: AI responses may be too generic or miss critical questions
- Mitigations: Test with real founder scenarios, iterate on prompt specificity, implement conversation memory

**Milestone 4: Document Generation**
- Date: Week 2 (Days 11-14)
- Deliverable: Automated PRD and Technical Proposal generation from call transcripts, version management
- Risks: Document quality may not meet expectations, formatting issues
- Mitigations: Use structured templates, implement post-processing validation, enable manual review in alpha

**Milestone 5: Chat & Vector Search**
- Date: Week 3 (Days 15-17)
- Deliverable: Chat interface with vector search across project data, context-aware responses
- Risks: pgvector setup complexity, search relevance quality
- Mitigations: Start with simple embedding strategy, test with real queries, iterate on retrieval logic

**Milestone 6: Document Iteration Feature**
- Date: Week 3 (Days 18-21)
- Deliverable: "Make Changes" functionality, version dropdown, AI-driven document updates
- Risks: Version conflicts, unclear change requests from users
- Mitigations: Implement clear version labeling, guide users through change requests with examples

**Milestone 7: Alpha Launch**
- Date: End of Week 3
- Deliverable: Stable product ready for 5-10 test users
- Risks: Undiscovered bugs under real usage, poor onboarding experience
- Mitigations: Provide personal onboarding for each alpha user, monitor first sessions closely

**Milestone 8: Beta & Iteration**
- Date: Week 4+
- Deliverable: Refined product based on alpha feedback, expanded user base
- Risks: Scale issues, feature requests exceeding MVP scope
- Mitigations: Stay disciplined on MVP scope, prioritize stability over new features

**Note:** Timeline assumes full-time focus. If working part-time, adjust by 2-3x. Technical complexity unknowns may extend Milestones 2-3 by several days.