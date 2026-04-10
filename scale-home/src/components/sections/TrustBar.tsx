"use client";

import { motion } from "framer-motion";

export default function TrustBar() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="font-body text-[11px] uppercase tracking-eyebrow text-text-muted font-semibold text-center mb-8"
        >
          Trusted by Leaders At
        </motion.p>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="grid grid-cols-3 lg:grid-cols-6 gap-4 justify-items-center"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-[120px] h-[40px] bg-bg-alt border border-black/[0.08] flex items-center justify-center rounded"
              >
                <span className="font-body text-[10px] text-text-muted font-medium">[Logo]</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
