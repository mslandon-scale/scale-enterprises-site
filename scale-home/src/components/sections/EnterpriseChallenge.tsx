"use client";

import { motion } from "framer-motion";

const bullets = [
  "Audit every core function in your business and identify what's holding you back",
  "Evaluate your team structure and build a plan to hire, develop, and lead at scale",
  "Break down your marketing and sales engine — what's working, what's broken, and what to build next",
  "Analyze your finances and build the financial architecture of an enterprise",
  "Walk away with at least 3 specific, actionable strategies you can implement immediately",
];

export default function EnterpriseChallenge() {
  return (
    <section className="relative bg-white py-24 lg:py-36 overflow-hidden">
      {/* ═══ ANIMATED BACKGROUND ═══ */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large navy circle rings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" as const }}
          className="absolute -top-[200px] -left-[200px] w-[700px] h-[700px]"
        >
          <div className="w-full h-full rounded-full border-2 border-navy/[0.06]" />
          <div className="absolute inset-[60px] rounded-full border border-accent-gold/[0.08]" />
          <div className="absolute inset-[120px] rounded-full border border-navy/[0.04]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" as const, delay: 0.2 }}
          className="absolute -bottom-[150px] -right-[150px] w-[500px] h-[500px]"
        >
          <div className="w-full h-full rounded-full border-2 border-accent-gold/[0.08]" />
          <div className="absolute inset-[50px] rounded-full border border-navy/[0.05]" />
        </motion.div>

        {/* Gradient washes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-accent-gold/[0.06] to-transparent" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-navy/[0.04] to-transparent" />

        {/* Floating animated shapes */}
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] right-[8%] w-10 h-10 border-2 border-accent-gold/15 rotate-45 rounded-sm"
        />
        <motion.div
          animate={{ y: [0, 24, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[25%] left-[5%] w-8 h-8 rounded-full bg-navy/[0.06]"
        />
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[20%] left-[12%] w-12 h-12 border-2 border-navy/[0.06] rotate-12 rounded-sm"
        />
        <motion.div
          animate={{ y: [0, 18, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-[30%] right-[6%] w-6 h-6 rounded-full bg-accent-gold/10"
        />
        <motion.div
          animate={{ y: [0, -16, 0], rotate: [45, 135, 45] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-[50%] right-[15%] w-5 h-5 border border-accent-gold/15 rotate-45"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] left-[8%] w-3 h-3 rounded-full bg-accent-gold"
        />

        {/* Diagonal accent lines */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute top-[10%] right-[20%] w-[2px] h-[140px] bg-gradient-to-b from-transparent via-accent-gold/15 to-transparent rotate-[25deg]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute bottom-[15%] left-[18%] w-[2px] h-[120px] bg-gradient-to-b from-transparent via-navy/10 to-transparent -rotate-[20deg]"
        />

        {/* Dot grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="absolute top-[8%] left-[30%] grid grid-cols-5 gap-4"
        >
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-navy/[0.07]" />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="absolute bottom-[10%] right-[25%] grid grid-cols-4 gap-3"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-accent-gold/10" />
          ))}
        </motion.div>

        {/* Horizontal trim lines */}
        <div className="absolute top-[6%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-navy/[0.06] to-transparent" />
        <div className="absolute bottom-[6%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ═══ HEADLINE — BIG AND BOLD ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" as const }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
            className="font-display text-[32px] sm:text-[40px] lg:text-[52px] leading-[1.0] text-navy font-extrabold uppercase mb-3"
          >
            The Enterprise Challenge
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
            className="font-display text-[24px] sm:text-[30px] lg:text-[40px] leading-[1.1] text-text-secondary/70 font-bold uppercase"
          >
            A Deep Dive to{" "}
            <span className="text-accent-gold">Transform</span> Your Business
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" as const, delay: 0.2 }}
            className="font-body text-[17px] lg:text-[19px] text-text-secondary leading-[1.7] mt-6 max-w-2xl mx-auto"
          >
            Walk away with at least three specific, actionable strategies that will revolutionize
            your business and help it become an enterprise that works for you — not the other way
            around. We go deep into every core function so nothing gets missed.
          </motion.p>
        </motion.div>

        {/* ═══ TWO COLUMN — BULLETS + VISUAL ═══ */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Checklist */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
          >
            <ul className="space-y-5">
              {bullets.map((bullet, i) => (
                <motion.li
                  key={bullet}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" as const }}
                  className="flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-body text-[16px] lg:text-[17px] text-text-secondary leading-[1.6]">
                    {bullet}
                  </span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" as const }}
              className="mt-10"
            >
              <a
                href="#apply"
                className="inline-block bg-navy text-white font-bold text-[15px] uppercase tracking-widest px-12 py-5 text-center rounded-full hover:bg-navy-light hover:-translate-y-px transition-all duration-200 shadow-[0_8px_24px_rgba(15,29,50,0.2)]"
              >
                Join the Challenge
              </a>
            </motion.div>
          </motion.div>

          {/* Right — Visual: Deep dive steps */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.15 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-navy to-bg-navy rounded-2xl p-6 lg:p-10 overflow-hidden">
              {/* Decorative corners */}
              <div className="absolute top-5 right-5 w-14 h-14 border-t-2 border-r-2 border-accent-gold/25 rounded-tr-sm" />
              <div className="absolute bottom-5 left-5 w-14 h-14 border-b-2 border-l-2 border-accent-gold/25 rounded-bl-sm" />

              {/* Steps */}
              <div className="relative z-10 space-y-3">
                {[
                  { day: "Deep Dive 1", title: "Business Diagnostic", desc: "Audit every system in your business" },
                  { day: "Deep Dive 2", title: "Systems Architecture", desc: "Blueprint your operating system" },
                  { day: "Deep Dive 3", title: "Leadership & Structure", desc: "Design your org chart for scale" },
                  { day: "Deep Dive 4", title: "Growth Engine", desc: "Build your acquisition machine" },
                  { day: "Deep Dive 5", title: "Execution Roadmap", desc: "Your 90-day action plan" },
                ].map((step, i) => (
                  <motion.div
                    key={step.day}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.12, ease: "easeOut" as const }}
                    className="group bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4 flex items-center gap-4 hover:border-accent-gold/25 transition-colors duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent-gold/15 flex items-center justify-center flex-shrink-0">
                      <span className="font-display text-[14px] font-bold text-accent-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-display text-[14px] font-bold text-white leading-tight">
                        {step.title}
                      </p>
                      <p className="font-body text-[12px] text-white/40 mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent-gold/[0.06] rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
