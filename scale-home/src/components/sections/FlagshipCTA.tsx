"use client";

import { motion } from "framer-motion";

export default function FlagshipCTA() {
  return (
    <section className="relative bg-navy py-20 lg:py-32 overflow-hidden" id="apply">
      {/* Background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/[0.03]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-accent-gold/[0.06]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/[0.04]"
        />

        {/* Floating shapes */}
        <motion.div
          animate={{ y: [0, -22, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[18%] left-[8%] w-6 h-6 bg-accent-gold/10 rotate-45 rounded-sm"
        />
        <motion.div
          animate={{ y: [0, 18, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-[22%] right-[6%] w-7 h-7 rounded-full border-2 border-white/[0.06]"
        />
        <motion.div
          animate={{ y: [0, -14, 0], rotate: [0, 45, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-[25%] right-[12%] w-8 h-8 border border-accent-gold/10"
        />
        <motion.div
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[30%] left-[15%] w-4 h-4 rounded-full bg-white/[0.04]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="text-center"
        >
          <p className="font-body text-[12px] uppercase tracking-eyebrow text-accent-gold font-bold mb-4">
            Ready to Transform?
          </p>
          <h2 className="font-display text-[36px] lg:text-[56px] leading-[1.05] tracking-[-0.02em] text-white font-extrabold uppercase">
            Build Your Enterprise<span className="text-accent-gold">.</span>
          </h2>
          <p className="font-body text-[19px] text-white/60 leading-[1.7] max-w-lg mx-auto mt-6">
            Take control of your business and reach your full potential.
          </p>
          <div className="mt-10">
            <a
              href="#footer"
              className="inline-block bg-accent-gold text-white font-bold text-[15px] uppercase tracking-widest px-10 py-5 min-w-[300px] lg:min-w-[400px] text-center rounded-full hover:brightness-110 hover:-translate-y-px transition-all duration-200"
              style={{ boxShadow: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 24px rgba(240,192,48,0.3)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              Transform Your Business
            </a>
          </div>
          <p className="font-body text-[13px] text-white/40 font-semibold mt-4">
            Applications reviewed within 24 hours. No commitment required.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
