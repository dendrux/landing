import { CopyButton } from "./copy-button";
import { TerminalIcon } from "./icons";

export function InstallBlock({ command = 'pip install "dendrux[all]"' }: { command?: string }) {
  return (
    <div
      id="install"
      className="group inline-flex items-center gap-3 rounded-full border border-line bg-bg-card/80 px-4 py-2 font-mono text-[13px] text-ink shadow-card backdrop-blur-sm transition-colors hover:border-white/20"
    >
      <TerminalIcon className="h-4 w-4 text-accent" />
      <span className="select-all whitespace-nowrap">
        <span className="text-ink-dim">$</span> {command}
      </span>
      <CopyButton text={command} label="Copy install command" />
    </div>
  );
}
