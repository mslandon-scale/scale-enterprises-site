"use client";

import { motion } from "framer-motion";

const sections = [
  {
    number: "01",
    label: "",
    title: "Your Engine",
    description:
      "Get a clear and actionable picture of how you market, sell, and fulfill customers — and do it in a profitable way where the numbers work and are scalable, repeatable, and duplicatable. We look at your psychology, strategy, story, foundation, and customer journey to build an engine that actually drives growth.",
    bullets: [
      "Marketing systems that generate demand predictably",
      "Sales operations that convert and scale",
      "Fulfillment processes that deliver and retain",
      "Financial architecture where the numbers work",
      "A scalable, repeatable, and duplicatable model",
    ],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <circle cx="32" cy="32" r="20" />
        <circle cx="32" cy="32" r="10" />
        <circle cx="32" cy="32" r="3" fill="currentColor" stroke="none" />
        <line x1="32" y1="12" x2="32" y2="4" />
        <line x1="32" y1="60" x2="32" y2="52" />
        <line x1="12" y1="32" x2="4" y2="32" />
        <line x1="60" y1="32" x2="52" y2="32" />
      </svg>
    ),
    color: "accent-gold",
    bgGradient: "from-accent-gold/30 via-accent-gold/10 to-bg-navy",
  },
  {
    number: "02",
    label: "",
    title: "Your Leadership System",
    description:
      "Create a system that allows you to manage your business in 90 minutes a week or less. Learn how to create accountability, pass on skills, recruit top talent that aligns with your vision, and keep your team aligned daily, weekly, monthly, quarterly, and annually.",
    bullets: [
      "Daily, weekly, monthly, quarterly, and annual team alignment",
      "Accountability systems that drive performance",
      "Skill transfer and training frameworks",
      "Recruiting and retaining top talent aligned with your vision",
      "A management cadence that runs in 90 minutes a week",
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
    title: "Enterprise HQ & The Vault",
    description:
      "Get free access to Enterprise HQ — the software platform where you and your team implement everything in a streamlined process. Plus lifetime access to the Enterprise Vault, so long after the 90 days you can always reference the core principles, frameworks, and systems.",
    bullets: [
      "Enterprise HQ — the all-in-one implementation platform for your team",
      "Start a free trial and experience the system firsthand",
      "Enterprise Vault — lifetime access to every framework and principle",
      "Free Enterprise Playbook to start applying the methodology immediately",
      "Streamlined workflows your entire team can operate on",
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

const testimonials = [
  {
    quote: "Enterprise 360 completely transformed how we operate. We went from chaos to a system that runs itself.",
    name: "Business Owner",
    role: "Service Company",
  },
  {
    quote: "I went from working 60+ hours a week to managing my entire business in under 90 minutes. It changed everything.",
    name: "Agency Founder",
    role: "Digital Agency",
  },
];

export default function GoldSyndicate() {
  return (
    <section className="relative bg-bg-navy py-16 lg:py-24 overflow-hidden">
      {/* ═══ PRESTIGE BACKGROUND ELEMENTS ═══ */}
      <div className="absolute inset-0 pointer-events-none">
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

        <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-accent-gold/[0.14] via-accent-gold/[0.06] to-transparent rounded-full blur-3xl" />

        <div className="absolute top-[12%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/20 to-transparent" />
        <div className="absolute bottom-[10%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/15 to-transparent" />

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
            Enterprise <span className="bg-accent-gold text-navy px-3 py-1 rounded-md inline-block">360</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent-gold/40" />
            <div className="w-2 h-2 rotate-45 border border-accent-gold/50" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent-gold/40" />
          </div>
          <p className="font-body text-[18px] text-white/60 leading-[1.7] max-w-2xl mx-auto">
            A 90-day program to completely transform your business. We look at your marketing,
            sales, operations, finance, team, technology, and data — everything — so you become
            an enterprise-level entrepreneur. Your business will never be the same again.
          </p>
        </motion.div>

        {/* What we cover — overview badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {["Marketing", "Sales", "Operations", "Finance", "Team", "Technology", "Data"].map((area) => (
            <span
              key={area}
              className="font-body text-[12px] font-bold uppercase tracking-widest text-accent-gold border border-accent-gold/30 px-4 py-2 rounded-full"
            >
              {area}
            </span>
          ))}
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
                  <span className="absolute top-6 left-8 font-display text-[120px] lg:text-[160px] font-extrabold text-white/[0.06] leading-none select-none">
                    {section.number}
                  </span>
                  <div className="absolute inset-4 rounded-xl border border-accent-gold/10" />
                  <div className={`relative z-10 w-28 h-28 lg:w-36 lg:h-36 text-${section.color}`}>
                    {section.icon}
                  </div>
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

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="mt-20 lg:mt-28"
        >
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white/[0.04] border border-accent-gold/15 rounded-2xl p-8">
                <svg className="w-8 h-8 text-accent-gold/40 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
                </svg>
                <p className="font-body text-[16px] text-white/60 leading-[1.7] italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent-gold/20 flex items-center justify-center">
                    <span className="font-display text-[14px] text-accent-gold font-bold">
                      {t.name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-body text-[14px] text-white/80 font-bold">{t.name}</p>
                    <p className="font-body text-[12px] text-white/40">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

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
            href="#footer"
            className="inline-block bg-accent-gold text-white font-bold text-[15px] uppercase tracking-widest px-12 py-5 rounded-full hover:brightness-110 hover:-translate-y-px transition-all duration-200 shadow-[0_8px_32px_rgba(240,192,48,0.25)]"
          >
            Apply For Enterprise 360
          </a>
          <p className="font-body text-[14px] text-white/30 mt-4">
            By application only. Limited to 10 new members per month.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
