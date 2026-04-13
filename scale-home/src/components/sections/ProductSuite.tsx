"use client";

import { motion } from "framer-motion";

const products = [
  {
    label: "Free",
    title: "Enterprise Masterclass",
    description: "A free, 7 Masterclass video training that teaches you how to build enterprise systems. Audio version included.",
    cta: "Start Free Masterclass",
    href: "https://course.scaleenterprises.com/register",
    primary: false,
  },
  {
    label: "Deep Dive",
    title: "Enterprise Challenge",
    description: "An intensive deep dive to diagnose, architect, and blueprint your enterprise transformation.",
    cta: "Join the Challenge",
    href: "#apply",
    primary: false,
  },
  {
    label: "Flagship",
    title: "Enterprise 360",
    description: "Full enterprise buildout, mastermind access, and every tool and resource — done for you.",
    cta: "Apply Now",
    href: "#apply",
    primary: true,
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

export default function ProductSuite() {
  return (
    <section className="relative bg-bg-alt py-20 lg:py-32 overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[5%] w-6 h-6 border border-navy/[0.06] rotate-45"
        />
        <motion.div
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[15%] right-[7%] w-5 h-5 rounded-full bg-accent-gold/10"
        />
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
            The Scale Enterprises Platform
          </p>
          <h2 className="font-display text-[26px] lg:text-[36px] leading-[1.1] text-navy font-extrabold uppercase">
            Three Ways to Build Your Enterprise.
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {products.map((p) => (
            <motion.div
              key={p.title}
              variants={item}
              className="bg-white border border-black/10 p-8 card-shadow flex flex-col rounded-2xl"
            >
              <p className="font-body text-[11px] uppercase tracking-widest text-text-muted font-bold">
                {p.label}
              </p>
              <h3 className="font-body text-[22px] font-bold text-navy mt-2">
                {p.title}
              </h3>
              <p className="font-body text-[15px] text-text-muted mt-2 flex-1">
                {p.description}
              </p>
              <div className="w-full h-px bg-black/[0.08] my-6" />
              <a
                href={p.href}
                className={`block w-full font-bold text-[15px] uppercase tracking-widest px-8 py-4 text-center transition-all duration-200 rounded-full ${
                  p.primary
                    ? "bg-navy text-white hover:bg-navy-light hover:-translate-y-px"
                    : "border-2 border-navy/20 text-navy hover:border-accent-gold hover:text-accent-gold"
                }`}
              >
                {p.cta}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
