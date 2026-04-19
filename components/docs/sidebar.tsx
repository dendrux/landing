"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOCS_NAV } from "@/lib/docs-nav";
import { cn } from "@/lib/cn";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:block">
      <div className="pr-4">
        {DOCS_NAV.map((section) => (
          <div key={section.title} className="mb-8">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-dim">
              {section.title}
            </div>
            <ul className="space-y-1">
              {section.links.map((link) => {
                const isActive = pathname === link.slug;
                return (
                  <li key={link.slug}>
                    <Link
                      href={link.slug}
                      className={cn(
                        "block rounded-md border-l-2 px-3 py-1.5 text-[13px] leading-snug transition-colors",
                        isActive
                          ? "border-accent bg-white/[0.04] text-ink"
                          : "border-transparent text-ink-muted hover:border-line hover:text-ink",
                      )}
                    >
                      {link.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
