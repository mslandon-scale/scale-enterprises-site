"use client";

import { motion } from "framer-motion";

const features = [
  "In-Person Intensives",
  "Live Hot Seats",
  "Deal Flow Access",
  "Private Community",
];

export default function InnerCircle() {
  return (
    <section className="relative bg-white py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 radial-glow-gold pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="relative w-full h-[320px] lg:h-[480px] bg-bg-alt border border-black/10 mb-0 overflow-hidden rounded-lg"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent-gold/10 to-transparent" />
          </div>
          <span className="absolute inset-0 flex items-center justify-center font-body text-[12px] text-text-muted font-medium">
            [Mastermind Event / Room Photo]
          </span>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="text-center -mt-20 relative z-10"
        >
          <p className="font-body text-[11px] uppercase tracking-eyebrow text-accent-gold font-semibold mb-4">
            The Enterprise Inner Circle
          </p>
          <h2 className="font-display text-[30px] lg:text-[44px] leading-[1.1] text-text-primary font-extrabold uppercase">
            Where Operators Become Owners.
          </h2>
          <p className="font-body text-[17px] text-text-secondary leading-[1.7] max-w-2xl mx-auto mt-6">
            Quarterly intensives, peer accountability, and direct access to Matthew Landon
            and the Scale Enterprises faculty. Built for operators who move fast.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-10">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent-gold" />
                <span className="font-body text-[15px] text-text-secondary font-medium">{f}</span>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a
              href="#apply"
              className="inline-block bg-accent-gold text-white font-bold text-sm uppercase tracking-widest px-8 py-4 hover:brightness-110 hover:-translate-y-px transition-all duration-200"
            >
              See If You Qualify
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
