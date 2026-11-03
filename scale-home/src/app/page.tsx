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
    <div className="min-h-screen bg-[#05070D]">
      <QualifyingModal isOpen={modalOpen} onClose={closeModal} />

      {/* ================================================================ */}
      {/*  NAV                                                             */}
      {/* ================================================================ */}
      <nav className="sticky top-0 z-50 bg-[#05070D]/90 backdrop-blur-md border-b border-[#C9A24B]/10">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Scale Enterprises"
              width={36}
              height={36}
              className="w-9 h-9"
            />
            <span className="font-display font-bold text-[#F0F0F0] text-lg tracking-[0.12em] uppercase hidden sm:inline">
              Scale Enterprises
            </span>
          </a>
          <button
            onClick={openModal}
            className="bg-gradient-to-r from-[#C9A24B] to-[#D4AF37] text-[#05070D] font-body font-bold text-sm uppercase tracking-widest px-6 py-3 rounded-full hover:shadow-[0_0_20px_rgba(201,162,75,0.3)] hover:-translate-y-0.5 transition-all duration-300"
          >
            Book a Call
          </button>
        </div>
      </nav>

      {/* ================================================================ */}
      {/*  HERO                                                            */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1F4B] via-[#0A1A3A] to-[#05070D] text-white">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(201,162,75,0.06),transparent_70%)] pointer-events-none" />
        {/* Gold hairline at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A24B]/30 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-5 py-28 md:py-40 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {/* Eyebrow */}
            <motion.p
              variants={fadeUp}
              className="font-body text-xs font-bold uppercase tracking-[0.25em] text-[#C9A24B] mb-6"
            >
              The 30-Day Enterprise Transformation
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="font-display font-bold text-[clamp(36px,7vw,64px)] leading-[1.05] tracking-tight mb-6"
            >
              We Build Enterprise-Level Businesses{" "}
              <span className="block mt-1">
                <span className="bg-gradient-to-r from-[#C9A24B] via-[#D4AF37] to-[#C9A24B] bg-clip-text text-transparent">
                  That Run Without You.
                </span>
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeUp}
              className="font-body text-[#B8C4D8] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
            >
              Scale Enterprises helps entrepreneurs take control of their business
              and reach their full potential, with the systems, team, and growth
              engine of an enterprise.
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeUp}>
              <button
                onClick={openModal}
                className="inline-block bg-gradient-to-r from-[#C9A24B] to-[#D4AF37] text-[#05070D] font-body font-bold text-sm uppercase tracking-widest px-12 py-5 rounded-full shadow-[0_0_40px_rgba(201,162,75,0.2),0_8px_32px_rgba(201,162,75,0.15)] hover:shadow-[0_0_50px_rgba(201,162,75,0.35)] hover:-translate-y-0.5 transition-all duration-300"
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
      <section className="bg-[#0A1A3A] py-20 md:py-24 relative">
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
                className="text-center p-8 rounded-2xl bg-[#0F2449] border border-[#C9A24B]/12 hover:border-[#C9A24B]/25 transition-colors duration-300"
              >
                <p className="font-display font-bold text-4xl md:text-5xl text-[#C9A24B] tracking-tight mb-3">
                  {r.stat}
                </p>
                <p className="font-body text-[#F0F0F0] font-semibold text-base mb-1">
                  {r.label}
                </p>
                <p className="font-body text-[#7A8BA8] text-sm">{r.context}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A24B]/20 to-transparent" />
      </section>

      {/* ================================================================ */}
      {/*  HOW IT WORKS                                                    */}
      {/* ================================================================ */}
      <section className="bg-[#05070D] py-24 md:py-32 relative">
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
            <h2 className="font-display font-bold text-[clamp(28px,5vw,48px)] text-center text-[#F0F0F0] leading-tight mb-20">
              Three Steps to{" "}
              <span className="bg-gradient-to-r from-[#C9A24B] to-[#D4AF37] bg-clip-text text-transparent">
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
                <h3 className="font-display font-bold text-2xl text-[#F0F0F0] mb-3">
                  {s.title}
                </h3>
                <p className="font-body text-[#B8C4D8] text-base leading-relaxed">
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
      <section className="bg-[#0A1A3A] py-24 md:py-32 relative">
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
              <div className="w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden border border-[#C9A24B]/25 shadow-[0_0_40px_rgba(201,162,75,0.08)]">
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
              <h2 className="font-display font-bold text-[clamp(26px,4vw,44px)] text-[#F0F0F0] leading-tight mb-4">
                Matthew Landon
              </h2>
              <p className="font-body text-[#C9A24B] text-lg leading-relaxed mb-2 font-semibold">
                Founder, Scale Enterprises
              </p>
              <p className="font-body text-[#B8C4D8] text-base leading-relaxed">
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
      <section className="relative overflow-hidden bg-gradient-to-b from-[#05070D] via-[#0B1F4B] to-[#05070D] text-white py-28 md:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(201,162,75,0.06),transparent_70%)] pointer-events-none" />
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

            <h2 className="font-display font-bold text-[clamp(28px,5vw,52px)] leading-tight mb-6">
              Ready to Build a Business{" "}
              <span className="bg-gradient-to-r from-[#C9A24B] via-[#D4AF37] to-[#C9A24B] bg-clip-text text-transparent">
                That Runs Without You?
              </span>
            </h2>
            <p className="font-body text-[#B8C4D8] text-lg leading-relaxed max-w-xl mx-auto mb-10">
              Apply for a free Enterprise Scaling Strategy Call and discover the
              exact system to transform your business in 30 days.
            </p>
            <button
              onClick={openModal}
              className="inline-block bg-gradient-to-r from-[#C9A24B] to-[#D4AF37] text-[#05070D] font-body font-bold text-sm uppercase tracking-widest px-12 py-5 rounded-full shadow-[0_0_40px_rgba(201,162,75,0.2),0_8px_32px_rgba(201,162,75,0.15)] hover:shadow-[0_0_50px_rgba(201,162,75,0.35)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Book a Strategy Call &rarr;
            </button>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  FOOTER                                                          */}
      {/* ================================================================ */}
      <footer className="bg-[#05070D] border-t border-[#C9A24B]/10 text-[#7A8BA8] text-center py-10 px-5 text-sm font-body">
        <p className="text-[#F0F0F0]/30">
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
        <p className="mt-6 text-xs text-[#7A8BA8]/50 max-w-lg mx-auto leading-relaxed">
          Income and results disclaimer: Results mentioned on this page are not typical.
          Individual results will vary based on effort, experience, business model, and
          market conditions. Scale Enterprises makes no guarantees of specific outcomes.
        </p>
      </footer>
    </div>
  );
}
