/**
 * Hand-curated docs sidebar. Order matters — this is the reading order
 * we want new users to follow. Update when you add a page.
 */

export type NavLink = { title: string; slug: string };
export type NavSection = { title: string; links: NavLink[] };

export const DOCS_NAV: NavSection[] = [
  {
    title: "Get started",
    links: [
      { title: "Overview", slug: "/docs" },
      { title: "Quickstart", slug: "/docs/quickstart" },
    ],
  },
  {
    title: "Architecture",
    links: [
      { title: "Runs and the lifecycle", slug: "/docs/architecture/runs" },
      { title: "State persistence", slug: "/docs/architecture/state-persistence" },
      { title: "Event ordering", slug: "/docs/architecture/event-ordering" },
      { title: "Pause and resume", slug: "/docs/architecture/pause-resume" },
      { title: "Cancellation", slug: "/docs/architecture/cancellation" },
      { title: "Loops", slug: "/docs/architecture/loops" },
      { title: "Notifier", slug: "/docs/architecture/notifier" },
      { title: "Recorder", slug: "/docs/architecture/recorder" },
      { title: "MCP", slug: "/docs/architecture/mcp" },
      { title: "Skills", slug: "/docs/architecture/skills" },
      { title: "Prompt cache", slug: "/docs/architecture/prompt-cache" },
    ],
  },
  {
    title: "Governance",
    links: [
      { title: "Overview", slug: "/docs/architecture/governance" },
      { title: "Access control", slug: "/docs/architecture/access-control" },
      { title: "Approval", slug: "/docs/architecture/approval" },
      { title: "Budget", slug: "/docs/architecture/budget" },
      { title: "Guardrails", slug: "/docs/architecture/guardrails" },
      { title: "PII redaction", slug: "/docs/architecture/pii-redaction" },
      { title: "Prompt injection patterns", slug: "/docs/recipes/prompt-injection-patterns" },
      { title: "Human-in-the-loop approval", slug: "/docs/recipes/hitl-approval" },
    ],
  },
  {
    title: "Recipes",
    links: [
      { title: "Client-side tools", slug: "/docs/recipes/client-tools" },
      { title: "Cancelling a run", slug: "/docs/recipes/cancel-run" },
      { title: "Mounting the read router", slug: "/docs/recipes/mount-read-router" },
    ],
  },
  {
    title: "Reference",
    links: [
      { title: "HTTP API surface", slug: "/docs/reference/http-api" },
      { title: "Agent", slug: "/docs/reference/agent" },
      { title: "RunStore", slug: "/docs/reference/run-store" },
      { title: "make_read_router", slug: "/docs/reference/read-router" },
      { title: "Errors", slug: "/docs/reference/errors" },
    ],
  },
];
