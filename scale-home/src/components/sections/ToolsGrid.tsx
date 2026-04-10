"use client";

import { motion } from "framer-motion";

const tools = [
  {
    title: "Enterprise Command Center",
    description: "Your 90-minute weekly operating system.",
  },
  {
    title: "Enterprise Playbook",
    description: "The complete methodology, fully documented.",
  },
  {
    title: "Funnel Architecture Templates",
    description: "Proven acquisition infrastructure, ready to deploy.",
  },
  {
    title: "AI Automation Library",
    description: "The systems that run the business without you.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function ToolsGrid() {
  return (
    <section className="relative bg-white py-20 lg:py-32 overflow-hidden" id="how-it-works">
      {/* Background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [0, -22, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[12%] right-[6%] w-8 h-8 border-2 border-navy/[0.05]"
        />
        <motion.div
          animate={{ y: [0, 18, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[18%] left-[4%] w-6 h-6 rounded-full bg-accent-gold/10"
        />
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          className="absolute top-[50%] left-[8%] w-7 h-7 bg-navy/[0.04] rotate-45 rounded-sm"
        />
        <div className="absolute bottom-[8%] right-[10%] grid grid-cols-5 gap-3 opacity-50">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-navy/[0.06]" />
          ))}
        </div>
        {/* Accent line */}
        <div className="absolute top-0 left-1/2 w-[2px] h-[80px] bg-gradient-to-b from-accent-gold/20 to-transparent" />
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
            The Enterprise Toolkit
          </p>
          <h2 className="font-display text-[28px] lg:text-[44px] leading-[1.1] text-navy font-extrabold uppercase">
            Everything You Need. Nothing You Don&apos;t.
          </h2>
          <p className="font-body text-[18px] text-text-secondary leading-[1.7] max-w-xl mx-auto mt-6">
            Every resource, template, and system included inside the transformation.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.title}
              variants={item}
              whileHover={{ scale: 1.02, borderColor: "rgba(184,134,11,0.4)" }}
              className="bg-bg-card border border-black/10 p-8 card-shadow transition-all duration-200 rounded-2xl"
            >
              <div className="w-12 h-12 bg-navy/[0.06] border border-navy/10 flex items-center justify-center mb-5 rounded-xl">
                <span className="font-body text-[11px] text-navy font-bold">[Icon]</span>
              </div>
              <h3 className="font-body text-[20px] font-bold text-navy">
                {tool.title}
              </h3>
              <p className="font-body text-[15px] text-text-muted leading-[1.6] mt-2">
                {tool.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
