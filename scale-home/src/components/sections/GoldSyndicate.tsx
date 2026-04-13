"use client";

import { motion } from "framer-motion";

const sections = [
  {
    number: "01",
    label: "",
    title: "Enterprise Buildout",
    description:
      "A full-scale, done-for-you implementation of every system your business needs to operate as an enterprise. We build your operating system, management structure, KPI dashboards, SOPs, hiring frameworks, and client acquisition engine — all installed in 30 days.",
    bullets: [
      "Custom operating system built around your business model",
      "Management structure & org chart designed for scale",
      "KPI dashboards and weekly reporting cadence",
      "SOPs for every core function in your business",
      "Client acquisition engine with inbound + outbound systems",
    ],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <rect x="8" y="12" width="48" height="40" rx="4" />
        <line x1="8" y1="24" x2="56" y2="24" />
        <line x1="24" y1="24" x2="24" y2="52" />
        <rect x="30" y="30" width="18" height="6" rx="1.5" opacity="0.5" />
        <rect x="30" y="40" width="12" height="6" rx="1.5" opacity="0.5" />
        <circle cx="16" cy="18" r="2" fill="currentColor" stroke="none" />
        <circle cx="22" cy="18" r="2" fill="currentColor" stroke="none" opacity="0.5" />
      </svg>
    ),
    color: "accent-gold",
    bgGradient: "from-accent-gold/30 via-accent-gold/10 to-bg-navy",
  },
  {
    number: "02",
    label: "",
    title: "Mastermind",
    description:
      "Direct access to Matthew Landon and a vetted network of 7- and 8-figure service business owners. Weekly strategy calls, hot-seat coaching, and a private community where operators help operators solve problems in real time.",
    bullets: [
      "Weekly live strategy and hot-seat calls",
      "Direct access to Matthew Landon for 1-on-1 guidance",
      "Private community of vetted 7- and 8-figure operators",
      "Quarterly in-person intensives and networking events",
      "Accountability partnerships and peer review",
    ],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <circle cx="32" cy="18" r="8" />
        <circle cx="14" cy="30" r="6" />
        <circle cx="50" cy="30" r="6" />
        <path d="M22 50v-4a8 8 0 0 1 8-8h4a8 8 0 0 1 8 8v4" />
        <path d="M8 50v-2a6 6 0 0 1 6-6h2" opacity="0.5" />
        <path d="M56 50v-2a6 6 0 0 0-6-6h-2" opacity="0.5" />
      </svg>
    ),
    color: "accent-gold",
    bgGradient: "from-accent-gold/25 via-accent-gold/[0.08] to-bg-navy",
  },
  {
    number: "03",
    label: "",
    title: "Tools & Resources",
    description:
      "Every template, framework, script, and system we've used to build 300+ enterprises — yours to keep forever. From hiring scorecards to financial models to the Enterprise Masterclass video library, this is the complete toolkit.",
    bullets: [
      "Enterprise Masterclass — 7 Masterclass video training library",
      "Plug-and-play templates for every business function",
      "Financial models, forecasting tools, and P&L frameworks",
      "Hiring scorecards, interview scripts, and onboarding checklists",
      "Sales scripts, proposal templates, and CRM workflows",
    ],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M20 8h-6a4 4 0 0 0-4 4v40a4 4 0 0 0 4 4h36a4 4 0 0 0 4-4V12a4 4 0 0 0-4-4h-6" />
        <rect x="20" y="4" width="24" height="8" rx="2" />
        <line x1="20" y1="24" x2="44" y2="24" />
        <line x1="20" y1="32" x2="38" y2="32" />
        <line x1="20" y1="40" x2="42" y2="40" />
        <line x1="20" y1="48" x2="34" y2="48" opacity="0.5" />
      </svg>
    ),
    color: "accent-gold",
    bgGradient: "from-accent-gold/[0.28] via-accent-gold/[0.09] to-bg-navy",
  },
];

export default function GoldSyndicate() {
  return (
    <section className="relative bg-bg-navy py-16 lg:py-24 overflow-hidden">
      {/* ═══ PRESTIGE BACKGROUND ELEMENTS ═══ */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large gold crest ring — top right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" as const }}
          className="absolute -top-[200px] -right-[200px] w-[700px] h-[700px]"
        >
          <div className="w-full h-full rounded-full border-2 border-accent-gold/20" />
          <div className="absolute inset-[60px] rounded-full border border-accent-gold/15" />
          <div className="absolute inset-[120px] rounded-full border border-accent-gold/10" />
        </motion.div>

        {/* Large crest ring — bottom left */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" as const, delay: 0.2 }}
          className="absolute -bottom-[250px] -left-[250px] w-[600px] h-[600px]"
        >
          <div className="w-full h-full rounded-full border-2 border-accent-gold/15" />
          <div className="absolute inset-[50px] rounded-full border border-accent-gold/10" />
        </motion.div>

        {/* Gold radial glow behind header */}
        <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-accent-gold/[0.14] via-accent-gold/[0.06] to-transparent rounded-full blur-3xl" />

        {/* Thin gold horizontal rules — like architectural trim */}
        <div className="absolute top-[12%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/20 to-transparent" />
        <div className="absolute bottom-[10%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/15 to-transparent" />

        {/* Floating diamond shapes */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [45, 45, 45] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[18%] left-[8%] w-5 h-5 border-2 border-accent-gold/30 rotate-45"
        />
        <motion.div
          animate={{ y: [0, 16, 0], rotate: [45, 45, 45] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[35%] right-[5%] w-4 h-4 bg-accent-gold/20 rotate-45"
        />
        <motion.div
          animate={{ y: [0, -14, 0], rotate: [45, 45, 45] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[30%] left-[4%] w-6 h-6 border-2 border-accent-gold/15 rotate-45"
        />
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-[45%] right-[10%] w-3 h-3 bg-accent-gold/25 rotate-45"
        />

        {/* Vertical accent lines — like column details */}
        <div className="absolute top-0 left-[15%] w-px h-full bg-gradient-to-b from-transparent via-accent-gold/[0.08] to-transparent" />
        <div className="absolute top-0 right-[15%] w-px h-full bg-gradient-to-b from-transparent via-accent-gold/[0.08] to-transparent" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="text-center mb-14"
        >
          <p className="font-body text-[12px] uppercase tracking-eyebrow text-accent-gold font-bold mb-4">
            Our Flagship Program
          </p>
          <h2 className="font-display text-[32px] lg:text-[48px] leading-[1.05] text-white font-extrabold uppercase">
            The Enterprise360
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent-gold/40" />
            <div className="w-2 h-2 rotate-45 border border-accent-gold/50" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent-gold/40" />
          </div>
          <p className="font-body text-[18px] text-white/60 leading-[1.7] max-w-2xl mx-auto">
            A complete enterprise transformation system — built, installed, and supported by the
            team that&apos;s done it 300+ times. Three components. One outcome: an enterprise that
            runs without you.
          </p>
        </motion.div>

        {/* Three sections */}
        <div className="space-y-20 lg:space-y-28">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease: "easeOut" as const }}
              className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            >
              {/* Graphic / visual side */}
              <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className={`relative aspect-[4/3] rounded-2xl bg-gradient-to-br ${section.bgGradient} border border-accent-gold/15 overflow-hidden flex items-center justify-center`}>
                  {/* Number watermark */}
                  <span className="absolute top-6 left-8 font-display text-[120px] lg:text-[160px] font-extrabold text-white/[0.06] leading-none select-none">
                    {section.number}
                  </span>

                  {/* Subtle inner border for prestige framing */}
                  <div className="absolute inset-4 rounded-xl border border-accent-gold/10" />

                  {/* Icon */}
                  <div className={`relative z-10 w-28 h-28 lg:w-36 lg:h-36 text-${section.color}`}>
                    {section.icon}
                  </div>

                  {/* Floating accent diamonds */}
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[15%] right-[12%] w-3 h-3 border-2 border-accent-gold/30 rotate-45"
                  />
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-[20%] left-[10%] w-3 h-3 bg-accent-gold/25 rotate-45"
                  />
                </div>
              </div>

              {/* Content side */}
              <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <h3 className="font-display text-[24px] lg:text-[32px] leading-[1.1] text-white font-extrabold uppercase">
                  {section.title}
                </h3>
                <p className="font-body text-[16px] text-white/60 leading-[1.7] mt-4">
                  {section.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-body text-[15px] text-white/50 leading-[1.6]">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="text-center mt-14 lg:mt-20"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-accent-gold/30" />
            <div className="w-1.5 h-1.5 rotate-45 bg-accent-gold/40" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-accent-gold/30" />
          </div>
          <a
            href="#apply"
            className="inline-block bg-accent-gold text-white font-bold text-[15px] uppercase tracking-widest px-12 py-5 rounded-full hover:brightness-110 hover:-translate-y-px transition-all duration-200 shadow-[0_8px_32px_rgba(184,134,11,0.25)]"
          >
            Apply for the Enterprise360
          </a>
          <p className="font-body text-[14px] text-white/30 mt-4">
            By application only. Limited to 10 new members per month.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
