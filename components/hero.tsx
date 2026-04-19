import { CodeBlock } from "./code-block";
import { ProtoInstallBar } from "./proto-install-bar";
import { Constellation } from "./particles";
import { RunTimeline } from "./run-timeline";
import { GitHubIcon } from "./icons";

const HERO_CODE = `import asyncio
from dendrux import Agent, tool
from dendrux.llm.anthropic import AnthropicProvider

@tool()
async def search(query: str) -> str:
    """Search the web."""
    return await web.query(query)

async def main():
    async with Agent(
        provider=AnthropicProvider(model="claude-sonnet-4-6"),
        prompt="You are a research assistant.",
        tools=[search],
    ) as agent:
        result = await agent.run("What is dendrux?")
        print(result.answer)

asyncio.run(main())`;

export function Hero() {
  return (
    <section className="proto-hero">
      <div className="hero-bg-glow" />
      <div className="hero-bg-field">
        <Constellation
          density={0.00018}
          maxParticles={180}
          linkDist={120}
          speed={0.22}
          parallax={28}
          interactive
        />
      </div>

      <div className="hero-inner">
        <div className="eyebrow">The async Python runtime for production agents</div>

        <h1 className="h1" style={{ marginTop: 24 }}>
          <span className="line">
            <span>
              Agents that <em>survive</em>
            </span>
          </span>
          <span className="line">
            <span>failure, persist</span>
          </span>
          <span className="line">
            <span>everything.</span>
          </span>
        </h1>

        <p className="hero-sub">
          Dendrux is the runtime that crashes, recovers, pauses for humans, and resumes
          inside real-world clients — Excel, browsers, desktops. Every LLM call, tool
          execution, and wait state is persisted as evidence.
        </p>

        <div className="hero-ctas">
          <a className="proto-btn proto-btn-primary" href="/docs/quickstart">
            Install dendrux <span className="arrow">→</span>
          </a>
          <a
            className="proto-btn proto-btn-ghost"
            href="https://github.com/dendrux/dendrux"
            target="_blank"
            rel="noreferrer noopener"
          >
            <GitHubIcon className="h-4 w-4" />
            Star on GitHub
          </a>
          <a className="proto-btn proto-btn-ghost" href="#timeline">
            See a live run
          </a>
        </div>

        <ProtoInstallBar />

        <div className="hero-grid-v1">
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              Ten lines
            </div>
            <CodeBlock
              code={HERO_CODE}
              filename="hello_agent.py"
              lang="python"
              className="codeblock"
            />
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              Live run
            </div>
            <RunTimeline compact />
          </div>
        </div>
      </div>
    </section>
  );
}
