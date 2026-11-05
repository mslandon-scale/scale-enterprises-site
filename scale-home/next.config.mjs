/** @type {import('next').NextConfig} */

// Permanent (308) redirects for removed legacy pages so old links and ad traffic never 404.
const toHome = [
  "/schedule-call", "/schedule-call.html",
  "/questionnaire", "/questionnaire.html",
  "/deep-dive", "/deep-dive.html",
  "/booking-confirmed", "/booking-confirmed.html",
  "/call-confirmed", "/call-confirmed.html",
  "/order-confirmed", "/order-confirmed.html",
  "/funnel-analytics", "/funnel-analytics.html",
  "/agreement-form", "/agreement-form.html",
  "/procurement-form", "/procurement-form.html",
  "/index.html",
];

const nextConfig = {
  async redirects() {
    return [
      // About now lives on the homepage.
      { source: "/about", destination: "/#about", permanent: true },
      // Legacy static copies of live app routes.
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/disclaimer.html", destination: "/disclaimer", permanent: true },
      { source: "/privacy-policy.html", destination: "/privacy-policy", permanent: true },
      { source: "/terms-of-service.html", destination: "/terms-of-service", permanent: true },
      { source: "/not-a-fit.html", destination: "/not-a-fit", permanent: true },
      // Old site pages that no longer exist.
      ...toHome.map((source) => ({ source, destination: "/", permanent: true })),
    ];
  },
};

export default nextConfig;
