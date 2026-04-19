/* Dynamic Open Graph image — served at /opengraph-image.png (Next builds it).
 * Rendered via the edge runtime's ImageResponse; pure inline CSS since Tailwind
 * and our global sheet aren't available here.                                */
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const alt = "Dendrux — the async Python runtime for agents that survive failure";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px 100px",
          background:
            "radial-gradient(ellipse 60% 40% at 22% 18%, rgba(62,224,143,0.35), transparent 70%)," +
            "radial-gradient(ellipse 50% 35% at 78% 82%, rgba(34,211,238,0.22), transparent 70%)," +
            "#05070d",
          color: "#f4f6fb",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 28,
            letterSpacing: "-0.01em",
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 999,
              background:
                "radial-gradient(circle at 30% 30%, #5cffb1 0%, #15a564 100%)",
              boxShadow: "0 0 24px rgba(62,224,143,0.6)",
            }}
          />
          dendrux
        </div>

        {/* Mono eyebrow */}
        <div
          style={{
            marginTop: 56,
            fontFamily: "monospace",
            fontSize: 20,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#5cffb1",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 40,
              height: 2,
              background: "#5cffb1",
              opacity: 0.6,
            }}
          />
          The async Python runtime
        </div>

        {/* Display h1 */}
        <div
          style={{
            marginTop: 28,
            fontSize: 112,
            lineHeight: 1.0,
            letterSpacing: "-0.035em",
            fontWeight: 500,
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <span>Agents that</span>
          <span
            style={{
              fontStyle: "italic",
              fontFamily: "serif",
              background: "linear-gradient(135deg, #5cffb1 0%, #3ee08f 40%, #22d3ee 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            survive
          </span>
        </div>
        <div
          style={{
            fontSize: 112,
            lineHeight: 1.0,
            letterSpacing: "-0.035em",
            fontWeight: 500,
          }}
        >
          failure.
        </div>

        {/* Sub */}
        <div
          style={{
            marginTop: 48,
            fontSize: 26,
            color: "#a4adc2",
            lineHeight: 1.4,
            maxWidth: 880,
          }}
        >
          Durable runs · pause/resume · four-layer governance · any provider.
        </div>

        {/* Footer row */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            gap: 28,
            fontFamily: "monospace",
            fontSize: 18,
            color: "#6b7390",
            letterSpacing: "0.04em",
          }}
        >
          <span>dendrux.dev</span>
          <span>·</span>
          <span>v0.1.0a5 · alpha</span>
          <span>·</span>
          <span>Apache 2.0</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
