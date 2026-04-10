"use client";

import { motion } from "framer-motion";

const tier1Bullets = [
  "30-Day Transformation Sprint",
  "Weekly Group Coaching Calls",
  "Enterprise Playbook Access",
  "GoHighLevel Funnel Build",
  "12-Month Accountability Track",
];

const tier2Bullets = [
  "Everything in Tier 1",
  "Dedicated Implementation Team",
  "Equity-Aligned Growth Partnership",
  "Full Funnel + Operations Build-Out",
  "Priority Access & Direct Line",
];

export default function ProgramTiers() {
  return (
    <section className="relative bg-bg-alt py-20 lg:py-32 overflow-hidden" id="platform">
      {/* Background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[5%] w-8 h-8 border-2 border-navy/[0.06] rotate-45 rounded-sm"
        />
        <motion.div
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[15%] left-[6%] w-6 h-6 rounded-full bg-accent-gold/10"
        />
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 60, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[40%] left-[3%] w-7 h-7 border border-navy/[0.05]"
        />
        <div className="absolute top-[20%] left-[10%] grid grid-cols-4 gap-3 opacity-50">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-navy/[0.06]" />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="text-center mb-16"
        >
          <p className="font-body text-[12px] uppercase tracking-eyebrow text-accent-gold font-bold mb-4">
            The Platform
          </p>
          <h2 className="font-display text-[28px] lg:text-[44px] leading-[1.1] text-navy font-extrabold uppercase">
            Choose Your Path to Enterprise.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Tier 1 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            whileHover={{ scale: 1.02 }}
            className="bg-white border border-black/10 p-10 card-shadow rounded-2xl"
          >
            <p className="font-body text-[11px] uppercase tracking-eyebrow text-text-muted font-bold">
              Tier 1
            </p>
            <h3 className="font-display text-[26px] text-navy mt-2 font-extrabold uppercase">
              Enterprise Coaching
            </h3>
            <p className="font-body text-[15px] text-text-muted font-semibold mt-1">
              30 Days + 12 Months
            </p>
            <div className="w-full h-px bg-black/[0.08] my-6" />
            <ul className="space-y-3">
              {tier1Bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="text-accent-gold font-body text-[16px] leading-[1.7] font-bold">−</span>
                  <span className="font-body text-[16px] text-text-secondary leading-[1.7]">{b}</span>
                </li>
              ))}
            </ul>
            <a
              href="#how-it-works"
              className="block w-full mt-8 border-2 border-navy/20 text-navy font-bold text-[15px] uppercase tracking-widest px-8 py-4 text-center rounded-full hover:border-accent-gold hover:text-accent-gold transition-all duration-200"
            >
              Learn More
            </a>
          </motion.div>

          {/* Tier 2 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="relative bg-white border-2 border-accent-gold/50 p-10 card-shadow-gold rounded-2xl"
          >
            <span className="absolute top-4 right-4 bg-accent-gold text-white font-body text-[11px] uppercase tracking-eyebrow font-bold px-4 py-1.5 rounded-full">
              Most Popular
            </span>
            <p className="font-body text-[11px] uppercase tracking-eyebrow text-text-muted font-bold">
              Tier 2
            </p>
            <h3 className="font-display text-[26px] text-accent-gold mt-2 font-extrabold uppercase">
              Done-For-You Enterprise
            </h3>
            <p className="font-body text-[15px] text-text-muted font-semibold mt-1">
              Full Implementation + Growth Partnership
            </p>
            <div className="w-full h-px bg-black/[0.08] my-6" />
            <ul className="space-y-3">
              {tier2Bullets.map((b, i) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="text-accent-gold font-body text-[16px] leading-[1.7] font-bold">−</span>
                  <span className={`font-body text-[16px] text-text-secondary leading-[1.7] ${i === 0 ? "italic" : ""}`}>
                    {b}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href="#apply"
              className="block w-full mt-8 bg-navy text-white font-bold text-[15px] uppercase tracking-widest px-8 py-4 text-center rounded-full hover:bg-navy-light hover:-translate-y-px transition-all duration-200"
            >
              Apply Now
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
