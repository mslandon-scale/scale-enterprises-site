"use client";

import { motion } from "framer-motion";

/* ═══ Exact module data from the real Scale Course dashboard ═══ */
const modules = [
  {
    num: "01",
    slug: "vision",
    title: "Foundation & Vision",
    desc: "Define your enterprise identity, vision, and the operating model that makes it real.",
    color: "#818cf8",
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
    num: "02",
    slug: "enterprise-code",
    title: "The Enterprise Code",
    desc: "Build the operating system, SOPs, and frameworks that let your business run without you.",
    color: "#f59e0b",
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
    num: "03",
    slug: "marketing",
    title: "Marketing & Acquisition",
    desc: "Build your client acquisition engine with inbound and outbound systems that scale.",
    color: "#ec4899",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M26 5v22L14 20H8a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3h6L26 5z" />
        <path d="M8 20v5a2 2 0 0 0 2 2h2" />
      </svg>
    ),
    status: "start",
  },
  {
    num: "04",
    slug: "team-people",
    title: "Team & People",
    desc: "Recruit, hire, and develop the team that runs your enterprise day to day.",
    color: "#22d3ee",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="11" cy="8" r="4" />
        <path d="M3 27v-3a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v3" />
        <circle cx="22" cy="10" r="3.5" />
        <path d="M24 18a5 5 0 0 1 5 5v4" />
      </svg>
    ),
    status: "start",
  },
  {
    num: "05",
    slug: "leadership-system",
    title: "Leadership System",
    desc: "Install the leadership cadence, meeting rhythm, and KPI system that drives accountability.",
    color: "#22c55e",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="16" cy="16" r="12" />
        <polygon points="22 10 14 14 10 22 18 18" fill="currentColor" stroke="none" />
      </svg>
    ),
    status: "start",
  },
  {
    num: "06",
    slug: "finance",
    title: "Financial Architecture",
    desc: "Build the financial models, forecasting tools, and P&L frameworks for enterprise scale.",
    color: "#a78bfa",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <line x1="16" y1="4" x2="16" y2="28" />
        <path d="M22 10H13a4 4 0 0 0 0 8h6a4 4 0 0 1 0 8H10" />
      </svg>
    ),
    status: "start",
  },
  {
    num: "07",
    slug: "ai-enterprises",
    title: "AI for Enterprises",
    desc: "Leverage AI to automate operations, improve decision-making, and accelerate growth.",
    color: "#F6D43F",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="5" y="6" width="22" height="16" rx="3" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <circle cx="16" cy="1.5" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="12" cy="14" r="2.5" />
        <circle cx="20" cy="14" r="2.5" />
        <rect x="2" y="10" width="3" height="6" rx="1.5" />
        <rect x="27" y="10" width="3" height="6" rx="1.5" />
        <line x1="11" y1="22" x2="11" y2="27" />
        <line x1="21" y1="22" x2="21" y2="27" />
      </svg>
    ),
    status: "coming-soon",
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
            Free Masterclass
          </h2>
          <p className="font-display text-[24px] lg:text-[36px] leading-[1.1] text-white/60 font-bold uppercase mt-3">
            7 Topics. Zero Cost.<br className="hidden lg:block" /> Complete Enterprise Education.
          </p>
          <p className="font-body text-[17px] text-white/50 leading-[1.7] mt-6 max-w-2xl mx-auto">
            The Enterprise Masterclass is a free, self-paced video training library that teaches you
            how service businesses scale to 8 figures with systems that run in 90 minutes a day.
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
          <div className="inline-flex items-center gap-3 bg-accent-gold px-8 py-4 rounded-full shadow-[0_8px_32px_rgba(184,134,11,0.3)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg>
            <span className="font-body text-[15px] lg:text-[17px] font-bold text-white uppercase tracking-widest">
              Audio Version Available
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
                  <div className="w-8 h-8 rounded-full bg-[#F6D43F]/20 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-[#F6D43F]/60" />
                  </div>
                  <span className="hidden sm:block text-[11px] font-bold tracking-[0.15em] uppercase text-white">
                    Scale Enterprises
                  </span>
                </div>

                {/* Nav links */}
                <div className="flex items-center gap-0.5">
                  <span className="px-3 py-1.5 rounded-md text-[12px] font-semibold text-[#F6D43F] bg-[#F6D43F]/[0.08]">
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
                        ? "bg-[#F6D43F] text-black border-[#F6D43F]"
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
                Continue your Enterprise Masterclass
              </p>

              {/* Progress bar — replica of .progress-wrap */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-[13px] text-white/40">Course Progress</span>
                  <span className="text-[13px] font-bold text-[#F6D43F]" style={{ fontFamily: "'Sora', sans-serif" }}>
                    0 of 7 complete
                  </span>
                </div>
                <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                  <div className="h-full w-0 bg-[#F6D43F] rounded-full" />
                </div>
              </div>

              {/* Audiobook banner — replica of .audiobook-banner */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-[#F6D43F]/20 bg-gradient-to-r from-[#F6D43F]/[0.08] to-[#F6D43F]/[0.02] mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#F6D43F]/15 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#F6D43F" strokeWidth="1.5" className="w-5 h-5">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[14px] font-bold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
                    Audio Version Available
                  </p>
                  <p className="text-[12px] text-white/40">Listen to the Enterprise Masterclass on the go</p>
                </div>
                <span className="ml-auto hidden sm:block bg-[#F6D43F] text-black text-[12px] font-bold px-4 py-2 rounded whitespace-nowrap">
                  Listen Now
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
                    <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl bg-gradient-to-r from-transparent via-[#F6D43F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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
                      style={{ color: "#F6D43F", fontFamily: "'Sora', sans-serif" }}
                    >
                      Masterclass {mod.num}
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
                      <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-full bg-[#F6D43F]/15 text-[#F6D43F]">
                        Start Masterclass →
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
            href="https://course.scaleenterprises.com/register"
            className="inline-block bg-accent-gold text-white font-bold text-[14px] uppercase tracking-widest px-12 py-5 rounded-full hover:brightness-110 hover:-translate-y-px transition-all duration-200 shadow-[0_8px_32px_rgba(184,134,11,0.25)]"
          >
            Start the Free Masterclass
          </a>
          <p className="font-body text-[14px] text-white/30 mt-4">
            No credit card required. Instant access.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
