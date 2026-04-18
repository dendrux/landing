"use client";

import { useState } from "react";

export function ProtoInstallBar({
  command = '"dendrux[all]"',
}: {
  command?: string;
}) {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    navigator.clipboard?.writeText(`pip install ${command}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  return (
    <div className="proto-install" id="install">
      <span className="prompt">$</span>
      <span className="cmd">pip install</span>
      <span className="pkg">{command}</span>
      <button className="copy" onClick={onCopy} type="button">
        {copied ? "copied" : "copy"}
      </button>
    </div>
  );
}
