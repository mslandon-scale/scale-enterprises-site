"use client";

import { motion } from "framer-motion";

export default function EnterpriseChallenge() {
  return (
    <section className="relative bg-white py-24 lg:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" as const }}
          className="absolute -top-[200px] -left-[200px] w-[700px] h-[700px]"
        >
          <div className="w-full h-full rounded-full border-2 border-navy/[0.06]" />
          <div className="absolute inset-[60px] rounded-full border border-accent-gold/[0.08]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" as const, delay: 0.2 }}
          className="absolute -bottom-[150px] -right-[150px] w-[500px] h-[500px]"
        >
          <div className="w-full h-full rounded-full border-2 border-accent-gold/[0.08]" />
        </motion.div>

        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-accent-gold/[0.06] to-transparent" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-navy/[0.04] to-transparent" />

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

        <div className="absolute top-[6%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-navy/[0.06] to-transparent" />
        <div className="absolute bottom-[6%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" as const }}
        >
          <p className="font-display text-[20px] sm:text-[26px] lg:text-[32px] leading-[1.1] text-accent-gold font-extrabold uppercase tracking-widest mb-4">
            Coming Soon
          </p>

          <h2 className="font-display text-[32px] sm:text-[40px] lg:text-[52px] leading-[1.0] text-navy font-extrabold uppercase mb-4">
            The Enterprise Challenge
          </h2>

          <p className="font-body text-[20px] lg:text-[24px] text-text-secondary leading-[1.6] max-w-xl mx-auto">
            A business transformation event unlike anything you&apos;ve seen before.
          </p>

          <div className="flex items-center justify-center gap-4 mt-8 mb-10">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent-gold/30" />
            <div className="w-2 h-2 rotate-45 border border-accent-gold/40" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent-gold/30" />
          </div>

          <a
            href="#footer"
            className="inline-block bg-navy text-white font-bold text-[15px] uppercase tracking-widest px-12 py-5 rounded-full hover:bg-navy-light hover:-translate-y-px transition-all duration-200 shadow-[0_8px_24px_rgba(15,29,50,0.2)]"
          >
            Join the Waitlist
          </a>
        </motion.div>
      </div>
    </section>
  );
}
