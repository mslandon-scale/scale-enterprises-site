"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    number: "01",
    pillar: "Pillar 1",
    title: "The Enterprise Entrepreneur",
    subtitle: "Absolute Clarity",
    description:
      "Transform who you are as a business owner so your business works for you — not the other way around. This is the identity shift that unlocks everything else.",
    benefits: [
      "Absolute clarity on where you're going — your targets, your timeline, your finish line",
      "Know exactly who you serve and the story that makes them choose you",
      "A business built around your life — not a life built around your business",
    ],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <circle cx="32" cy="20" r="10" />
        <path d="M16 54v-4a16 16 0 0 1 32 0v4" />
      </svg>
    ),
    bgGradient: "from-accent-gold/30 via-accent-gold/10 to-bg-navy",
  },
  {
    number: "02",
    pillar: "Pillar 2",
    title: "The Engine",
    subtitle: "The Business Model",
    description:
      "Get absolute clarity on how to reach your enterprise goals. No more guessing. You'll know exactly how to get customers, fulfill them, and do it profitably — with numbers that work at scale.",
    benefits: [
      "A clear, proven path to your revenue targets — no more guessing what works",
      "Customers coming in, getting results, and the math working every single time",
      "Implement this one pillar and your business can grow exponentially",
    ],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <rect x="8" y="26" width="16" height="12" rx="3" />
        <rect x="40" y="26" width="16" height="12" rx="3" />
        <rect x="24" y="8" width="16" height="12" rx="3" />
        <rect x="24" y="44" width="16" height="12" rx="3" />
        <path d="M32 20v6M32 38v6M24 32h-8M48 32h-8" />
        <circle cx="32" cy="32" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
    bgGradient: "from-accent-gold/25 via-accent-gold/[0.08] to-bg-navy",
  },
  {
    number: "03",
    pillar: "Pillar 3",
    title: "The Leadership Flow",
    subtitle: "90 Minutes a Week",
    description:
      "Lead your business — don't manage it, don't operate it — in less than 90 minutes a week. And watch it still grow, still scale, and still maintain quality without you in the weeds.",
    benefits: [
      "Lead less than 90 minutes a week and your business still grows",
      "Scale without sacrificing quality — even when you step back",
      "Freedom to live your life while your enterprise runs itself",
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
    bgGradient: "from-accent-gold/[0.28] via-accent-gold/[0.09] to-bg-navy",
  },
];

const included = [
  { label: "12 Weekly 1:1 Coaching Sessions", desc: "Direct coaching across all three pillars with a framework owner" },
  { label: "Your Custom 3-Year Strategy", desc: "Identity, story, market, and the time horizon that defines absolute clarity" },
  { label: "Your Full Business Engine Plan", desc: "Marketing, sales, and fulfillment built into one profitable, scalable, duplicatable model" },
  { label: "The 90-Min Leadership System", desc: "The visibility layer and decision rhythm that lets you run the enterprise from above" },
  { label: "The Playbook Vault", desc: "12 function playbooks across marketing, sales, recruiting, training, ops, finance, leadership and more" },
  { label: "HQ Platform — 12 Months Access", desc: "Deliverables, scorecards, dashboards, and the 56-element Enterprise Checklist" },
];

export default function GoldSyndicate() {
  return (
    <section className="relative bg-bg-navy py-24 lg:py-32 overflow-hidden">
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.05]"
        style={{ backgroundImage: "url('/images/team-success.jpg')" }}
      />
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
          <p className="font-display text-[18px] lg:text-[24px] text-white/50 font-bold mt-4 italic">
            The 90-Day Enterprise Transformation
          </p>
          <div className="flex items-center justify-center gap-4 mt-6 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent-gold/40" />
            <div className="w-2 h-2 rotate-45 border border-accent-gold/50" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent-gold/40" />
          </div>
          <p className="font-body text-[18px] text-white/60 leading-[1.7] max-w-2xl mx-auto">
            In 90 days, get absolute clarity on where you&apos;re going, a business model that reaches
            your goals without guesswork, and the ability to lead it all in under 90 minutes a week.
          </p>
        </motion.div>

        {/* ═══ THE ENTERPRISE FRAMEWORK — 3 pillars bar ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          className="mb-16"
        >
          <p className="font-body text-[11px] uppercase tracking-[0.2em] text-accent-gold font-bold text-center mb-6">
            The Enterprise Framework
          </p>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {pillars.map((p) => (
              <a
                key={p.pillar}
                href={`#pillar-${p.number}`}
                className="bg-white/[0.04] border border-accent-gold/15 rounded-xl p-6 text-center cursor-pointer hover:border-accent-gold/40 hover:bg-white/[0.06] transition-all duration-200"
              >
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-accent-gold font-bold mb-2">
                  {p.pillar}
                </p>
                <p className="font-display text-[18px] text-white font-extrabold uppercase leading-tight">
                  {p.title}
                </p>
                <p className="font-body text-[14px] text-white/40 italic mt-1">
                  {p.subtitle}
                </p>
              </a>
            ))}
          </div>
        </motion.div>

        {/* ═══ THREE PILLAR SECTIONS ═══ */}
        <div className="space-y-20 lg:space-y-28">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              id={`pillar-${pillar.number}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              style={{ scrollMarginTop: "100px" }}
              transition={{ duration: 0.7, ease: "easeOut" as const }}
              className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            >
              {/* Graphic / visual side */}
              <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className={`relative aspect-[4/3] rounded-2xl bg-gradient-to-br ${pillar.bgGradient} border border-accent-gold/15 overflow-hidden flex items-center justify-center`}>
                  <span className="absolute top-6 left-8 font-display text-[120px] lg:text-[160px] font-extrabold text-white/[0.06] leading-none select-none">
                    {pillar.number}
                  </span>
                  <div className="absolute inset-4 rounded-xl border border-accent-gold/10" />
                  <div className="relative z-10 w-28 h-28 lg:w-36 lg:h-36 text-accent-gold">
                    {pillar.icon}
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
                <p className="font-body text-[11px] uppercase tracking-[0.2em] text-accent-gold font-bold mb-2">
                  {pillar.pillar} &middot; {pillar.subtitle}
                </p>
                <h3 className="font-display text-[24px] lg:text-[32px] leading-[1.1] text-white font-extrabold uppercase">
                  {pillar.title}
                </h3>
                <p className="font-body text-[16px] text-white/60 leading-[1.7] mt-4">
                  {pillar.description}
                </p>

                <div className="mt-6 space-y-3">
                  <p className="font-body text-[12px] uppercase tracking-widest text-white/30 font-bold">
                    What You Walk Away With
                  </p>
                  {pillar.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-accent-gold flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-body text-[15px] text-white/60 leading-[1.6]">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ═══ WHAT'S INCLUDED ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="mt-20 lg:mt-28"
        >
          <p className="font-body text-[11px] uppercase tracking-[0.2em] text-accent-gold font-bold text-center mb-8">
            What&apos;s Included
          </p>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {included.map((item) => (
              <div key={item.label} className="bg-white/[0.04] border border-accent-gold/10 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-body text-[15px] text-white font-bold leading-tight">
                      {item.label}
                    </p>
                    <p className="font-body text-[13px] text-white/40 leading-[1.5] mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Work Guarantee */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
            className="max-w-4xl mx-auto mt-6"
          >
            <div className="bg-accent-gold/[0.08] border border-accent-gold/25 rounded-xl p-6 flex items-start gap-4">
              <svg className="w-8 h-8 text-accent-gold flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" strokeWidth="2" />
              </svg>
              <div>
                <p className="font-body text-[15px] text-accent-gold font-bold">
                  The Results Guarantee
                </p>
                <p className="font-body text-[14px] text-white/50 leading-[1.6] mt-1">
                  Show up, play full out, and if you don&apos;t see results — you don&apos;t pay.
                </p>
              </div>
            </div>
          </motion.div>
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
            href="https://go.scaleenterprises.com/ent360"
            className="inline-block bg-accent-gold text-black font-bold text-[15px] uppercase tracking-widest px-12 py-5 rounded-full hover:brightness-110 hover:-translate-y-px transition-all duration-200 shadow-[0_8px_32px_rgba(240,192,48,0.25)]"
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
