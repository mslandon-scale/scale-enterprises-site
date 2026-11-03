"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import QualifyingModal from "@/components/QualifyingModal";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const results = [
  { stat: "500%", label: "Growth in 6 months", context: "Professional services firm" },
  { stat: "2x", label: "Profit in 3 months", context: "Trades business" },
  { stat: "3x", label: "Lead gen in 7 days", context: "50-person sales team" },
];

const steps = [
  {
    num: "01",
    title: "Audit",
    desc: "Find where the business depends on you and map the gaps holding you back from scale.",
  },
  {
    num: "02",
    title: "Build",
    desc: "Install the systems, marketing engine, and team structure of a true enterprise.",
  },
  {
    num: "03",
    title: "Scale",
    desc: "Grow revenue while the business runs without you in under 90 minutes a week.",
  },
];

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="min-h-screen bg-white">
      <QualifyingModal isOpen={modalOpen} onClose={closeModal} />

      {/* ================================================================ */}
      {/*  NAV                                                             */}
      {/* ================================================================ */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#0B1F4B]/10">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Scale Enterprises"
              width={36}
              height={36}
              className="w-9 h-9"
            />
            <span className="font-display font-bold text-[#0B1F4B] text-lg tracking-[0.12em] uppercase hidden sm:inline">
              Scale Enterprises
            </span>
          </a>
          <button
            onClick={openModal}
            className="bg-[#C9A24B] text-white font-body font-bold text-sm uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#D4AF37] hover:-translate-y-0.5 transition-all duration-300"
          >
            Book a Call
          </button>
        </div>
      </nav>

      {/* ================================================================ */}
      {/*  HERO                                                            */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-white text-[#0B1F4B]">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A24B]/20 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-5 py-28 md:py-40 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="font-display font-bold text-[clamp(36px,7vw,64px)] leading-[1.05] tracking-tight text-[#0B1F4B] mb-6"
            >
              We Build Enterprise-Level Businesses{" "}
              <span className="block mt-1">
                <span className="text-[#C9A24B]">
                  That Run Without You.
                </span>
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeUp}
              className="font-body text-[#555] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
            >
              Scale Enterprises helps entrepreneurs take control of their business
              and reach their full potential, with the systems, team, and growth
              engine of an enterprise.
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeUp}>
              <button
                onClick={openModal}
                className="inline-block bg-[#C9A24B] text-white font-body font-bold text-sm uppercase tracking-widest px-12 py-5 rounded-full shadow-[0_4px_24px_rgba(201,162,75,0.25)] hover:bg-[#D4AF37] hover:shadow-[0_6px_32px_rgba(201,162,75,0.35)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Book a Strategy Call &rarr;
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  STATS / TRUST BAR                                               */}
      {/* ================================================================ */}
      <section className="bg-[#F8F8F8] py-20 md:py-24 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A24B]/20 to-transparent" />
        <div className="max-w-5xl mx-auto px-5">
          <p className="font-body text-xs font-bold uppercase tracking-[0.25em] text-[#C9A24B] text-center mb-14">
            Proven Results
          </p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {results.map((r) => (
              <motion.div
                key={r.stat}
                variants={fadeUp}
                className="text-center p-8 rounded-2xl bg-white border border-[#0B1F4B]/8 hover:border-[#C9A24B]/30 transition-colors duration-300 shadow-sm"
              >
                <p className="font-display font-bold text-4xl md:text-5xl text-[#C9A24B] tracking-tight mb-3">
                  {r.stat}
                </p>
                <p className="font-body text-[#0B1F4B] font-semibold text-base mb-1">
                  {r.label}
                </p>
                <p className="font-body text-[#888] text-sm">{r.context}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A24B]/20 to-transparent" />
      </section>

      {/* ================================================================ */}
      {/*  HOW IT WORKS                                                    */}
      {/* ================================================================ */}
      <section className="bg-white py-24 md:py-32 relative">
        <div className="max-w-5xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-xs font-bold uppercase tracking-[0.25em] text-[#C9A24B] text-center mb-4">
              How It Works
            </p>
            <h2 className="font-display font-bold text-[clamp(28px,5vw,48px)] text-center text-[#0B1F4B] leading-tight mb-20">
              Three Steps to{" "}
              <span className="text-[#C9A24B]">
                Scale
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {steps.map((s) => (
              <motion.div key={s.num} variants={fadeUp} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-[#C9A24B]/40 text-[#C9A24B] font-display font-bold text-lg mb-6 bg-[#C9A24B]/5">
                  {s.num}
                </div>
                <h3 className="font-display font-bold text-2xl text-[#0B1F4B] mb-3">
                  {s.title}
                </h3>
                <p className="font-body text-[#555] text-base leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A24B]/15 to-transparent" />
      </section>

      {/* ================================================================ */}
      {/*  ABOUT                                                           */}
      {/* ================================================================ */}
      <section className="bg-[#F8F8F8] py-24 md:py-32 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A24B]/20 to-transparent" />
        <div className="max-w-5xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 items-center"
          >
            <div className="flex justify-center">
              <div className="w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden border border-[#C9A24B]/25 shadow-md">
                <Image
                  src="/matthew-landon.jpeg"
                  alt="Matthew Landon"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <p className="font-body text-xs font-bold uppercase tracking-[0.25em] text-[#C9A24B] mb-4">
                About
              </p>
              <h2 className="font-display font-bold text-[clamp(26px,4vw,44px)] text-[#0B1F4B] leading-tight mb-4">
                Matthew Landon
              </h2>
              <p className="font-body text-[#C9A24B] text-lg leading-relaxed mb-2 font-semibold">
                Founder, Scale Enterprises
              </p>
              <p className="font-body text-[#555] text-base leading-relaxed">
                Direct response marketer and operator who builds growth systems
                for owner-led businesses. Helping service businesses cross the
                bridge from overwhelmed operator to enterprise leader.
              </p>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A24B]/15 to-transparent" />
      </section>

      {/* ================================================================ */}
      {/*  FINAL CTA                                                       */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-white text-[#0B1F4B] py-28 md:py-40">
        <div className="relative max-w-3xl mx-auto px-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            {/* Decorative rule */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9A24B]/40" />
              <div className="w-2 h-2 rotate-45 border border-[#C9A24B]/50" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9A24B]/40" />
            </div>

            <h2 className="font-display font-bold text-[clamp(28px,5vw,52px)] leading-tight mb-6 text-[#0B1F4B]">
              Ready to Build a Business{" "}
              <span className="text-[#C9A24B]">
                That Runs Without You?
              </span>
            </h2>
            <p className="font-body text-[#555] text-lg leading-relaxed max-w-xl mx-auto mb-10">
              Apply for a free Enterprise Scaling Strategy Call and discover the
              exact system to scale your business into a self-running enterprise.
            </p>
            <button
              onClick={openModal}
              className="inline-block bg-[#C9A24B] text-white font-body font-bold text-sm uppercase tracking-widest px-12 py-5 rounded-full shadow-[0_4px_24px_rgba(201,162,75,0.25)] hover:bg-[#D4AF37] hover:shadow-[0_6px_32px_rgba(201,162,75,0.35)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Book a Strategy Call &rarr;
            </button>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  FOOTER                                                          */}
      {/* ================================================================ */}
      <footer className="bg-[#0B1F4B] border-t border-[#C9A24B]/10 text-[#B8C4D8] text-center py-10 px-5 text-sm font-body">
        <p className="text-white/30">
          &copy; {new Date().getFullYear()} Scale Enterprises LLC. All rights
          reserved.
        </p>
        <p className="mt-3 space-x-3">
          <Link href="/privacy-policy" className="hover:text-[#C9A24B] transition-colors underline underline-offset-2">
            Privacy
          </Link>
          <span className="text-[#C9A24B]/30">&middot;</span>
          <Link href="/terms-of-service" className="hover:text-[#C9A24B] transition-colors underline underline-offset-2">
            Terms
          </Link>
          <span className="text-[#C9A24B]/30">&middot;</span>
          <Link href="/california-privacy" className="hover:text-[#C9A24B] transition-colors underline underline-offset-2">
            California Notice
          </Link>
        </p>
        <p className="mt-6 text-xs text-white/40 max-w-lg mx-auto leading-relaxed">
          Income and results disclaimer: Results mentioned on this page are not typical.
          Individual results will vary based on effort, experience, business model, and
          market conditions. Scale Enterprises makes no guarantees of specific outcomes.
        </p>
      </footer>
    </div>
  );
}
