import { RunTimeline } from "./run-timeline";
import { DriftDots } from "./particles";

export function LiveRun() {
  return (
    <section
      className="proto-section"
      id="timeline"
      style={{ paddingTop: 80, position: "relative" }}
    >
      <DriftDots count={48} style={{ opacity: 0.85, zIndex: 0 }} />
      <div className="proto-wrap" style={{ position: "relative", zIndex: 2 }}>
        <div className="eyebrow">A live run</div>
        <h2 className="section-h2" style={{ marginTop: 16, maxWidth: 720 }}>
          Every call, every pause, every resume — <em>recorded</em>.
        </h2>
        <p
          style={{
            marginTop: 16,
            color: "var(--tok-text-sec)",
            fontSize: 16,
            maxWidth: 560,
            lineHeight: 1.55,
          }}
        >
          Click a node to inspect. The timeline is the dashboard — no JSON walls, no
          decoration.
        </p>
        <div style={{ marginTop: 48 }}>
          <RunTimeline />
        </div>
      </div>
    </section>
  );
}
