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
      { title: "Is dendrux for you?", slug: "/docs/is-dendrux-for-you" },
      { title: "Quickstart", slug: "/docs/quickstart" },
      { title: "Upgrading to 0.5.0", slug: "/docs/upgrading-to-0.5.0" },
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
      { title: "Inbox and notes", slug: "/docs/architecture/inbox" },
      { title: "Loops", slug: "/docs/architecture/loops" },
      { title: "Notifier", slug: "/docs/architecture/notifier" },
      { title: "Recorder", slug: "/docs/architecture/recorder" },
      { title: "MCP", slug: "/docs/architecture/mcp" },
      { title: "Skills", slug: "/docs/architecture/skills" },
      { title: "Models and providers", slug: "/docs/architecture/models" },
      { title: "Reasoning and thinking", slug: "/docs/architecture/reasoning" },
      { title: "Prompt cache", slug: "/docs/architecture/prompt-cache" },
    ],
  },
  {
    title: "Governance",
    links: [
      { title: "Overview", slug: "/docs/architecture/governance" },
      { title: "Access control", slug: "/docs/architecture/access-control" },
      { title: "Multi-tenancy", slug: "/docs/architecture/multi-tenancy" },
      { title: "Approval", slug: "/docs/architecture/approval" },
      { title: "Budget", slug: "/docs/architecture/budget" },
      { title: "Cost and pricing", slug: "/docs/architecture/pricing" },
      { title: "Guardrails", slug: "/docs/architecture/guardrails" },
      { title: "PII redaction", slug: "/docs/architecture/pii-redaction" },
      { title: "PII restore", slug: "/docs/architecture/pii-restore" },
      { title: "Tool policy", slug: "/docs/architecture/tool-policy" },
      { title: "Prompt injection patterns", slug: "/docs/recipes/prompt-injection-patterns" },
      { title: "Human-in-the-loop approval", slug: "/docs/recipes/hitl-approval" },
    ],
  },
  {
    title: "Guides",
    links: [{ title: "Scaling workers", slug: "/docs/guides/scaling" }],
  },
  {
    title: "Recipes",
    links: [
      { title: "Your app DB vs the Dendrux DB", slug: "/docs/recipes/app-database-boundary" },
      { title: "dendrux in a web or chat endpoint", slug: "/docs/recipes/web-endpoint" },
      { title: "Client-side tools", slug: "/docs/recipes/client-tools" },
      { title: "Images", slug: "/docs/recipes/images" },
      { title: "Resizing images (ingest hook)", slug: "/docs/recipes/images-resize" },
      { title: "Storing images in S3", slug: "/docs/recipes/images-s3" },
      { title: "Chatbot threads", slug: "/docs/recipes/chatbot-threads" },
      { title: "Memory across runs", slug: "/docs/recipes/run-replay" },
      { title: "MCP OAuth in a web app", slug: "/docs/recipes/mcp-oauth-web" },
      { title: "Per-run context", slug: "/docs/recipes/context-blocks" },
      { title: "Cancelling a run", slug: "/docs/recipes/cancel-run" },
      { title: "Build your own read routes", slug: "/docs/recipes/build-your-own-read-routes" },
      { title: "Handling provider errors", slug: "/docs/recipes/handling-provider-errors" },
      { title: "Erasing a tenant's data", slug: "/docs/recipes/erasing-tenant-data" },
      { title: "Observability stack", slug: "/docs/recipes/observability" },
      { title: "OpenTelemetry", slug: "/docs/recipes/opentelemetry" },
      { title: "OpenRouter models", slug: "/docs/recipes/openrouter" },
    ],
  },
  {
    title: "Reference",
    links: [
      { title: "API glossary", slug: "/docs/reference/api-glossary" },
      { title: "Agent", slug: "/docs/reference/agent" },
      { title: "Tools", slug: "/docs/reference/tools" },
      { title: "RunStore", slug: "/docs/reference/run-store" },
      { title: "Errors", slug: "/docs/reference/errors" },
      { title: "HTTP integration", slug: "/docs/reference/http-api" },
    ],
  },
];
