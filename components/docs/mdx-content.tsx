import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import type { ComponentProps } from "react";
import { SchemaDiagram, SchemaItem } from "./schema-diagram";
import { SequenceFlow, SequenceEvent } from "./sequence-flow";

const components = {
  SchemaDiagram,
  SchemaItem,
  SequenceFlow,
  SequenceEvent,
  h1: (props: ComponentProps<"h1">) => (
    <h1
      {...props}
      className="font-display mb-4 mt-2 text-[2.25rem] font-semibold leading-[1.1] tracking-tight text-ink"
    />
  ),
  h2: (props: ComponentProps<"h2">) => (
    <h2
      {...props}
      className="font-display mb-3 mt-12 text-[1.5rem] font-semibold tracking-tight text-ink"
    />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3
      {...props}
      className="font-display mb-2 mt-8 text-[1.125rem] font-semibold tracking-tight text-ink"
    />
  ),
  p: (props: ComponentProps<"p">) => (
    <p {...props} className="mb-5 text-[15px] leading-[1.75] text-ink-muted" />
  ),
  a: ({ href, ...rest }: ComponentProps<"a">) => {
    const isInternal = href?.startsWith("/") ?? false;
    if (isInternal) {
      return (
        <Link
          href={href!}
          {...rest}
          className="text-accent underline decoration-accent/30 underline-offset-4 transition hover:decoration-accent"
        />
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        {...rest}
        className="text-accent underline decoration-accent/30 underline-offset-4 transition hover:decoration-accent"
      />
    );
  },
  ul: (props: ComponentProps<"ul">) => (
    <ul {...props} className="mb-5 space-y-2 pl-5 [list-style:disc] marker:text-ink-dim" />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol {...props} className="mb-5 space-y-2 pl-5 [list-style:decimal] marker:text-ink-dim" />
  ),
  li: (props: ComponentProps<"li">) => (
    <li {...props} className="text-[15px] leading-[1.7] text-ink-muted [&>p]:mb-2" />
  ),
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote
      {...props}
      className="my-6 border-l-2 border-accent/40 bg-white/[0.02] px-5 py-3 text-ink"
    />
  ),
  table: (props: ComponentProps<"table">) => (
    <div className="my-6 overflow-x-auto scrollbar-thin">
      <table {...props} className="w-full border-collapse text-[14px]" />
    </div>
  ),
  thead: (props: ComponentProps<"thead">) => (
    <thead {...props} className="border-b border-line text-left text-ink" />
  ),
  th: (props: ComponentProps<"th">) => (
    <th {...props} className="px-3 py-2 text-[13px] font-semibold" />
  ),
  td: (props: ComponentProps<"td">) => (
    <td {...props} className="border-b border-line/50 px-3 py-2 align-top text-ink-muted" />
  ),
  code: (props: ComponentProps<"code">) => {
    // Inline code only — fenced blocks are wrapped by `pre` from rehype-pretty-code.
    if ((props as { "data-language"?: string })["data-language"]) {
      return <code {...props} />;
    }
    return (
      <code
        {...props}
        className="rounded-md border border-line bg-white/[0.04] px-1.5 py-0.5 font-mono text-[0.9em] text-ink"
      />
    );
  },
  pre: (props: ComponentProps<"pre">) => (
    <pre
      {...props}
      className="my-6 overflow-x-auto rounded-xl border border-line bg-[#0a0d16] p-5 text-[13px] leading-[1.65] font-mono scrollbar-thin"
    />
  ),
  hr: (props: ComponentProps<"hr">) => (
    <hr {...props} className="my-10 border-line" />
  ),
};

const prettyCodeOptions = {
  theme: "github-dark-default",
  keepBackground: false,
  defaultLang: "plaintext",
};

export function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
        },
      }}
    />
  );
}
