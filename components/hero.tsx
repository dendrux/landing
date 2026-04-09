import dynamic from "next/dynamic";
import { CodeBlock } from "./code-block";
import { InstallBlock } from "./install-block";
import { GitHubIcon, ArrowRightIcon } from "./icons";
import { Reveal } from "./reveal";

const DendriticScene = dynamic(
  () => import("./dendritic-scene").then((m) => m.DendriticScene),
  { ssr: false },
);

const HERO_CODE = `import asyncio
from dendrux import Agent, tool
from dendrux.llm.anthropic import AnthropicProvider

@tool()
async def add(a: int, b: int) -> int:
    """Add two numbers."""
    return a + b

async def main():
    async with Agent(
        provider=AnthropicProvider(model="claude-sonnet-4-6"),
        prompt="You are a calculator.",
        tools=[add],
    ) as agent:
        result = await agent.run("What is 15 + 27?")
        print(result.answer)

asyncio.run(main())`;

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-70" />

      {/* 3D scene as ambient backdrop on the right */}
      <div className="pointer-events-none absolute right-[-10%] top-10 hidden h-[680px] w-[680px] opacity-90 md:block lg:right-[-4%]">
        <DendriticScene />
      </div>

      {/* Mobile 3D scene (smaller, centered behind) */}
      <div className="pointer-events-none absolute inset-x-0 top-20 mx-auto h-[420px] w-[420px] opacity-60 md:hidden">
        <DendriticScene />
      </div>

      <div className="container-x relative">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          {/* Left: copy + CTAs */}
          <div className="relative z-10">
            <Reveal>
              <a
                href="https://github.com/dendrux/dendrux"
                target="_blank"
                rel="noreferrer"
                className="pill mb-6 hover:border-white/25 hover:text-ink"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                v0.1.0a4 — core API stabilizing
                <ArrowRightIcon className="h-3 w-3" />
              </a>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="font-display text-[44px] font-semibold leading-[1.05] tracking-tight text-ink sm:text-[56px] md:text-[64px] lg:text-[68px]">
                Agents that
                <br />
                <span className="text-gradient-accent">survive failure.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-[17px] leading-[1.6] text-ink-muted md:text-lg">
                Dendrux is the async Python runtime for agents that{" "}
                <span className="text-ink">persist everything</span>, retry from prior
                context, and bridge to the real world. Tools as plain Python functions.
                State that doesn&apos;t lie.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <InstallBlock />
                <a
                  href="https://github.com/dendrux/dendrux"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                >
                  <GitHubIcon className="h-4 w-4" />
                  Star on GitHub
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-ink-dim">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Apache 2.0
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow" />
                  Python 3.11+
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-glow" />
                  773 tests · 80% min coverage
                </span>
              </div>
            </Reveal>
          </div>

          {/* Right: code preview */}
          <Reveal delay={0.2} y={28} className="relative z-10">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-accent/20 via-cyan-glow/10 to-violet-glow/15 opacity-60 blur-2xl" />
              <CodeBlock code={HERO_CODE} filename="my_agent.py" lang="python" />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg" />
    </section>
  );
}
