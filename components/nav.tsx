"use client";

import { useEffect, useState } from "react";
import { LogoMark, GitHubIcon } from "./icons";
import { cn } from "@/lib/cn";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={cn(
          "flex w-full max-w-5xl items-center justify-between rounded-full border border-line px-4 py-2.5 transition-all duration-300",
          scrolled
            ? "bg-bg/70 backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]"
            : "bg-bg/30 backdrop-blur-md",
        )}
      >
        <a href="#" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-ink">
          <LogoMark className="h-7 w-7" />
          <span className="font-display text-[15px]">Dendrux</span>
          <span className="pill ml-1 hidden sm:inline-flex">v0.1.0a4</span>
        </a>

        <div className="hidden items-center gap-8 text-sm text-ink-muted md:flex">
          <a href="#pillars" className="transition-colors hover:text-ink">
            Pillars
          </a>
          <a href="#examples" className="transition-colors hover:text-ink">
            Examples
          </a>
          <a href="#providers" className="transition-colors hover:text-ink">
            Providers
          </a>
          <a href="/docs" className="transition-colors hover:text-ink">
            Docs
          </a>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/dendrux/dendrux"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:border-white/25 hover:text-ink sm:inline-flex"
          >
            <GitHubIcon className="h-4 w-4" />
          </a>
          <a href="#install" className="btn-primary !px-4 !py-2 text-xs">
            Get started
          </a>
        </div>
      </nav>
    </header>
  );
}
