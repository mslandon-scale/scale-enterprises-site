"use client";

import { motion } from "framer-motion";

const modules = [
  {
    num: "01",
    slug: "my-story",
    title: "My Story",
    desc: "Scraped knees, scar tissue, and the notes Matthew wishes he'd had — the real story behind the framework.",
    color: "#818cf8",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M6 4h14l6 6v18H6z" />
        <path d="M20 4v6h6" />
        <line x1="10" y1="16" x2="22" y2="16" />
        <line x1="10" y1="20" x2="18" y2="20" />
      </svg>
    ),
    status: "start",
  },
  {
    num: "02",
    slug: "enterprise-framework",
    title: "The Enterprise Framework",
    desc: "The 5 stages every enterprise moves through — from Value Creation to Private Equity.",
    color: "#f59e0b",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M3 16s5-9 13-9 13 9 13 9-5 9-13 9S3 16 3 16z" />
        <circle cx="16" cy="16" r="4.5" />
        <circle cx="16" cy="16" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
    status: "start",
  },
  {
    num: "03",
    slug: "enterprise-checklist",
    title: "The Enterprise Checklist",
    desc: "56 elements across 7 categories that get installed into every enterprise — the full toolkit.",
    color: "#ec4899",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="3" y="3" width="26" height="26" rx="3" />
        <polyline points="9 16 13 20 23 10" />
      </svg>
    ),
    status: "start",
  },
  {
    num: "04",
    slug: "implementation",
    title: "When to Implement Each Element",
    desc: "The 56 checklist elements mapped across the 5 stages — what to install, when, and why.",
    color: "#22d3ee",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="3" y="3" width="11" height="11" rx="2.5" />
        <rect x="18" y="3" width="11" height="11" rx="2.5" />
        <rect x="3" y="18" width="11" height="11" rx="2.5" />
        <rect x="18" y="18" width="11" height="11" rx="2.5" />
      </svg>
    ),
    status: "start",
  },
  {
    num: "05",
    slug: "proof",
    title: "Proof It Works",
    desc: "Real results from real businesses — 3x lead flow in 7 days, zero to seven figures in 6 months, and more.",
    color: "#22c55e",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <polyline points="4 24 12 14 18 20 28 8" />
        <polyline points="22 8 28 8 28 14" />
      </svg>
    ),
    status: "start",
  },
  {
    num: "06",
    slug: "enterprise-360",
    title: "Enterprise 360",
    desc: "The 90-day program that compresses the entire framework install into your business.",
    color: "#F0C030",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="16" cy="16" r="12" />
        <circle cx="16" cy="16" r="6" />
        <circle cx="16" cy="16" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
    status: "start",
  },
];

export default function MasterclassPreview() {
  return (
    <section className="relative bg-bg-navy py-24 lg:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-radial from-accent-gold/[0.08] via-accent-gold/[0.03] to-transparent rounded-full blur-3xl" />
        <div className="absolute top-[10%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/15 to-transparent" />
        <div className="absolute bottom-[8%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/10 to-transparent" />
        <motion.div
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[5%] w-4 h-4 border-2 border-accent-gold/20 rotate-45"
        />
        <motion.div
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[25%] left-[4%] w-3 h-3 bg-accent-gold/15 rotate-45"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-[36px] lg:text-[56px] leading-[1.05] text-white font-extrabold uppercase">
            Free Enterprise Playbook
          </h2>
          <p className="font-display text-[24px] lg:text-[36px] leading-[1.1] text-white/60 font-bold uppercase mt-3">
            Enterprise HQ Trial Included
          </p>
          <p className="font-body text-[17px] text-white/50 leading-[1.7] mt-6 max-w-2xl mx-auto">
            Get the Enterprise Playbook free and start a trial of Enterprise HQ — the platform
            where you and your team put the principles into action. No credit card required.
          </p>
        </motion.div>

        {/* Audio version badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-3 bg-accent-gold px-8 py-4 rounded-full shadow-[0_8px_32px_rgba(240,192,48,0.3)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-black">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg>
            <span className="font-body text-[15px] lg:text-[17px] font-bold text-black uppercase tracking-widest">
              Audio & Video Versions Coming Soon
            </span>
          </div>
        </motion.div>

        {/* ═══ REAL DASHBOARD SCREENSHOT ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: "easeOut" as const }}
          className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/[0.1] shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
        >
          {/* Browser chrome */}
          <div className="bg-[#18181b] px-4 py-2.5 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 mx-6">
              <div className="bg-white/[0.06] rounded-md px-3 py-1 text-[10px] text-white/30 font-mono">
                course.scaleenterprises.com/dashboard
              </div>
            </div>
          </div>

          {/* 16:9 viewport that clips the dashboard */}
          <div className="relative aspect-video overflow-hidden bg-black">
            {/* Scale the dashboard content down to fit landscape */}
            <div className="absolute inset-0 origin-top-left" style={{ transform: "scale(0.55)", width: "182%", height: "182%" }}>
            {/* Top nav bar — replica of .topnav */}
            <div className="bg-[#0a0a0f]/95 border-b border-white/[0.06]">
              {/* Main nav row */}
              <div className="flex items-center gap-1 px-4 h-[44px]">
                {/* Brand */}
                <div className="flex items-center gap-2 mr-4">
                  <div className="w-8 h-8 rounded-full bg-[#F0C030]/20 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-[#F0C030]/60" />
                  </div>
                  <span className="hidden sm:block text-[11px] font-bold tracking-[0.15em] uppercase text-white">
                    Scale Enterprises
                  </span>
                </div>

                {/* Nav links */}
                <div className="flex items-center gap-0.5">
                  <span className="px-3 py-1.5 rounded-md text-[12px] font-semibold text-[#F0C030] bg-[#F0C030]/[0.08]">
                    Library
                  </span>
                  <span className="px-3 py-1.5 rounded-md text-[12px] font-semibold text-white/40">
                    Audiobook
                  </span>
                </div>

                {/* Right side */}
                <div className="ml-auto flex items-center gap-2">
                  <span className="hidden sm:block px-3 py-1.5 rounded-md text-[12px] font-semibold text-white/40">
                    Profile
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/10" />
                </div>
              </div>

              {/* Masterclass bar — replica of .masterclass-bar */}
              <div className="flex items-center gap-1.5 px-4 py-2 border-t border-white/[0.04] overflow-x-auto scrollbar-hide">
                {modules.map((mod, i) => (
                  <span
                    key={mod.slug}
                    className={`inline-flex items-center px-4 py-2 rounded-full text-[11px] font-semibold whitespace-nowrap border flex-shrink-0 ${
                      i === 0
                        ? "bg-[#F0C030] text-black border-[#F0C030]"
                        : "text-white/40 border-white/[0.12]"
                    }`}
                  >
                    {mod.title}
                  </span>
                ))}
              </div>
            </div>

            {/* Main content area — replica of dashboard */}
            <div className="bg-black px-5 lg:px-8 py-6 lg:py-8">
              {/* Welcome header */}
              <h3 className="text-[18px] lg:text-[22px] font-bold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
                Welcome back
              </h3>
              <p className="text-[13px] text-white/40 mt-1 mb-5">
                Continue your Enterprise Playbook
              </p>

              {/* Progress bar — replica of .progress-wrap */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-[13px] text-white/40">Course Progress</span>
                  <span className="text-[13px] font-bold text-[#F0C030]" style={{ fontFamily: "'Sora', sans-serif" }}>
                    0 of 6 complete
                  </span>
                </div>
                <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                  <div className="h-full w-0 bg-[#F0C030] rounded-full" />
                </div>
              </div>

              {/* Audiobook banner — replica of .audiobook-banner */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-[#F0C030]/20 bg-gradient-to-r from-[#F0C030]/[0.08] to-[#F0C030]/[0.02] mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#F0C030]/15 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#F0C030" strokeWidth="1.5" className="w-5 h-5">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[14px] font-bold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
                    Audio & Video Coming Soon
                  </p>
                  <p className="text-[12px] text-white/40">Listen to and watch the Enterprise Playbook on the go</p>
                </div>
                <span className="ml-auto hidden sm:block bg-[#F0C030] text-black text-[12px] font-bold px-4 py-2 rounded whitespace-nowrap">
                  Coming Soon
                </span>
              </div>

              {/* Module grid — replica of .module-grid */}
              <div className="grid sm:grid-cols-2 gap-3 lg:gap-4">
                {modules.map((mod, i) => (
                  <motion.div
                    key={mod.slug}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.05 + i * 0.06, ease: "easeOut" as const }}
                    className="relative bg-[#0a0a0f] border border-white/[0.08] rounded-xl p-4 lg:p-5 overflow-hidden group hover:border-white/15 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {/* Gold shimmer top bar on hover */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl bg-gradient-to-r from-transparent via-[#F0C030] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform duration-400 group-hover:scale-110 group-hover:-rotate-3"
                      style={{ background: `${mod.color}15`, color: mod.color }}
                    >
                      {mod.icon}
                    </div>

                    {/* Module number */}
                    <p
                      className="text-[11px] font-bold uppercase tracking-[0.1em] mb-1.5"
                      style={{ color: "#F0C030", fontFamily: "'Sora', sans-serif" }}
                    >
                      Chapter {mod.num}
                    </p>

                    {/* Title */}
                    <p
                      className="text-[14px] lg:text-[15px] font-bold text-white mb-1.5"
                      style={{ fontFamily: "'Sora', sans-serif" }}
                    >
                      {mod.title}
                    </p>

                    {/* Description */}
                    <p className="text-[12px] text-white/40 leading-relaxed mb-3">
                      {mod.desc}
                    </p>

                    {/* Status badge */}
                    {mod.status === "start" ? (
                      <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-full bg-[#F0C030]/15 text-[#F0C030]">
                        Start Chapter →
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-full bg-white/[0.05] text-white/40">
                        Coming Soon
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="text-center mt-14"
        >
          <a
            href="#footer"
            className="inline-block bg-accent-gold text-black font-bold text-[14px] uppercase tracking-widest px-12 py-5 rounded-full hover:brightness-110 hover:-translate-y-px transition-all duration-200 shadow-[0_8px_32px_rgba(240,192,48,0.25)]"
          >
            Start Free — Get the Playbook + HQ Trial
          </a>
          <p className="font-body text-[14px] text-white/30 mt-4">
            No credit card required.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
