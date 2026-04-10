"use client";

import { motion } from "framer-motion";
import IndustryCarousel from "./IndustryCarousel";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const, delay } },
});

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-white flex items-center pt-[80px] overflow-hidden">
      {/* Background shapes — larger, more prevalent, navy + gold */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large navy circle rings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" as const }}
          className="absolute -top-[250px] -right-[250px] w-[800px] h-[800px] rounded-full border-2 border-navy/[0.05]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" as const, delay: 0.1 }}
          className="absolute -top-[180px] -right-[180px] w-[650px] h-[650px] rounded-full border border-accent-gold/[0.08]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" as const, delay: 0.2 }}
          className="absolute -bottom-[200px] -left-[200px] w-[600px] h-[600px] rounded-full border border-navy/[0.04]"
        />

        {/* Floating shapes — bigger */}
        <motion.div
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[18%] right-[6%] w-8 h-8 bg-accent-gold/15 rotate-45 rounded-sm"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[30%] left-[4%] w-6 h-6 rounded-full bg-navy/[0.07]"
        />
        <motion.div
          animate={{ y: [0, -16, 0], rotate: [0, 90, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[22%] left-[10%] w-10 h-10 border-2 border-accent-gold/15 rotate-12 rounded-sm"
        />
        <motion.div
          animate={{ y: [0, 22, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-[35%] right-[12%] w-5 h-5 rounded-full bg-navy/[0.06]"
        />
        <motion.div
          animate={{ y: [0, -14, 0], x: [0, 10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-[55%] right-[3%] w-8 h-8 border-2 border-navy/[0.06] rounded-full"
        />
        <motion.div
          animate={{ y: [0, 18, 0], rotate: [0, -45, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-[12%] left-[25%] w-6 h-6 border border-accent-gold/10 rotate-45"
        />

        {/* Diagonal accent lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-[8%] left-[12%] w-[2px] h-[160px] bg-gradient-to-b from-transparent via-navy/[0.07] to-transparent rotate-[30deg]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute bottom-[15%] right-[8%] w-[2px] h-[120px] bg-gradient-to-b from-transparent via-accent-gold/20 to-transparent -rotate-[20deg]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="absolute top-[50%] left-[3%] w-[2px] h-[100px] bg-gradient-to-b from-transparent via-navy/[0.05] to-transparent rotate-[15deg]"
        />

        {/* Dot grid patterns — bigger */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute top-[12%] right-[18%] grid grid-cols-6 gap-4"
        >
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-navy/[0.06]" />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="absolute bottom-[12%] left-[15%] grid grid-cols-4 gap-3"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-accent-gold/[0.12]" />
          ))}
        </motion.div>

        {/* Navy corner accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-navy/[0.03] to-transparent"
        />
        {/* Gold corner accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-accent-gold/[0.04] to-transparent"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-6 py-20 lg:py-0">
        <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-center">
          {/* Left column */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            {/* Headline */}
            <motion.h1
              variants={fadeUp(0)}
              className="font-display text-[36px] lg:text-[56px] leading-[1.05] tracking-[-0.02em] text-navy font-extrabold uppercase"
            >
              We Help Service Businesses Become{" "}
              <span className="text-accent-gold">Enterprises</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp(0.1)}
              className="font-body text-[19px] text-text-secondary leading-[1.7] max-w-[480px] mt-6"
            >
              The 30-Day Enterprise Transformation — go from $500K/yr and overwhelmed
              to 8-figure systems running in 90 minutes a day.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={fadeUp(0.2)} className="flex flex-col sm:flex-row gap-4 mt-10">
              <a
                href="#apply"
                className="bg-navy text-white font-bold text-[15px] uppercase tracking-widest px-10 py-5 text-center rounded-full hover:bg-navy-light hover:-translate-y-px transition-all duration-200"
                style={{ boxShadow: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 24px rgba(15,29,50,0.3)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                Get Started
              </a>
              <a
                href="https://course.scaleenterprises.com/register"
                className="border-2 border-navy/20 text-navy font-bold text-[15px] uppercase tracking-widest px-10 py-5 text-center rounded-full hover:border-accent-gold hover:text-accent-gold transition-all duration-200"
              >
                Free Masterclass →
              </a>
            </motion.div>

          </motion.div>

          {/* Right column — Video placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.3 }}
            className="relative bg-navy rounded-2xl h-[420px] lg:h-[520px] overflow-hidden flex items-center justify-center"
          >
            {/* Play button */}
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-accent-gold/90 flex items-center justify-center cursor-pointer hover:bg-accent-gold hover:scale-110 transition-all duration-300">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="font-body text-[13px] text-white/50 font-semibold uppercase tracking-widest">
                Watch the Overview
              </span>
            </div>

            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
              <div className="absolute inset-0" style={{
                backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "24px 24px"
              }} />
            </div>
          </motion.div>
        </div>

        <IndustryCarousel />
      </div>
    </section>
  );
}
