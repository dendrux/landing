import { BridgeAnimation } from "./bridge-animation";
import { NodeGlobe } from "./particles";

export function PauseExplainer() {
  return (
    <section
      className="proto-section pause-globe-wrap"
      style={{ paddingTop: 60, position: "relative" }}
    >
      <NodeGlobe count={52} radius={180} linkDist={140} speed={0.0016} style={{ zIndex: 0 }} />
      <div className="proto-wrap" style={{ position: "relative", zIndex: 2 }}>
        <div className="pause-explainer">
          <div>
            <div className="eyebrow">The pause moment</div>
            <h2 style={{ marginTop: 16 }}>
              Agents cross the <em>server/client</em> boundary.
            </h2>
            <p>
              When an agent calls a client-side tool, the run enters{" "}
              <code className="mono" style={{ color: "var(--tok-pause)" }}>
                WAITING_CLIENT_TOOL
              </code>
              . State is persisted. The client SDK executes on the user&apos;s device.
              When results return, the run resumes from exactly where it left off — same
              context, same reasoning.
            </p>
            <p
              style={{
                marginTop: 18,
                fontSize: 13,
                color: "var(--tok-text-muted)",
                fontFamily: "var(--font-mono)",
              }}
            >
              PENDING → RUNNING → WAITING_CLIENT_TOOL → RUNNING → SUCCESS
            </p>
          </div>
          <BridgeAnimation />
        </div>
      </div>
    </section>
  );
}
