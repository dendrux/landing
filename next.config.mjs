/** @type {import('next').NextConfig} */

// CSP: tight default with the few allowances this site actually needs.
// - 'unsafe-inline' on script-src is required for Next 14's inline bootstrap
//   and chunked hydration shim. Tighten with nonces later if we move to an
//   edge CSP middleware.
// - Google Fonts CSS comes from fonts.googleapis.com; the actual woff2 files
//   from fonts.gstatic.com.
// - img-src permits https: so MDX can reference any image; data: for inline
//   SVG backgrounds.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: https:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
