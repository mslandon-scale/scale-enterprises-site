"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import QualifyingModal from "@/components/QualifyingModal";
import JsonLd from "@/components/JsonLd";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const results = [
  { stat: "500%", label: "Growth in 6 months", context: "Professional services firm" },
  { stat: "2x", label: "Profit in 3 months", context: "Trades business" },
  { stat: "3X", label: "Leads in 7 days", context: "50-person sales team" },
];

const steps = [
  {
    num: "01",
    title: "Design",
    desc: "So you have absolute clarity.",
  },
  {
    num: "02",
    title: "Engineer",
    desc: "So you actually have control and the numbers work.",
  },
  {
    num: "03",
    title: "Lead",
    desc: "So you can run your business in less than 90 minutes a week.",
  },
];

const faqs = [
  {
    q: "What does Scale Enterprises do?",
    a: "Scale Enterprises is an enterprise scaling and development firm. We help service-business owners build an enterprise-level business that scales and runs without them, by helping design, engineer and lead the business with enterprise-level strategy, private equity-caliber engineering, and strong leadership and accountability systems, all enabled with AI.",
  },
  {
    q: "Who is the strategy call for?",
    a: "The Enterprise Scaling Strategy Call is for owners of service businesses with $500K or more in annual revenue who are stuck as the operator and are committed to building enterprise-level systems.",
  },
  {
    q: "What do Design, Engineer and Lead mean?",
    a: "Design gives you absolute clarity on where the business is going. Engineer gives you control and makes the numbers work. Lead installs leadership and accountability systems so you can run your business in less than 90 minutes a week.",
  },
  {
    q: "What results have clients seen?",
    a: "Examples include 3X leads in 7 days for a 50-person sales team, 2x profit in 3 months for a trades business, and 500% growth in 6 months for a professional services firm. Results are not typical and vary by business.",
  },
  {
    q: "Do you take equity in my business?",
    a: "No. You keep 100% ownership of your company.",
  },
  {
    q: "I’m too busy right now. Is this a good time?",
    a: "Being too busy to step back is the problem we solve. The goal is a business that runs without you, so you get your time back.",
  },
  {
    q: "What happens on the strategy call?",
    a: "We review where you are, where the business depends on you, and the exact system to scale it into a self-running enterprise, then decide together whether working with us is a fit.",
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
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <QualifyingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

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
          <div className="flex items-center gap-5">
            <Link href="/about" className="hidden sm:inline font-body text-[13px] font-bold uppercase tracking-widest text-[#555] hover:text-[#0B1F4B] transition-colors">About</Link>
            <Link href="/waitlist" className="hidden sm:inline font-body text-[13px] font-bold uppercase tracking-widest text-[#555] hover:text-[#0B1F4B] transition-colors">Waitlist</Link>
            <Link href="/contact" className="hidden sm:inline font-body text-[13px] font-bold uppercase tracking-widest text-[#555] hover:text-[#0B1F4B] transition-colors">Contact</Link>
            <Link
              href="/book"
              className="bg-[#C9A24B] text-white font-body font-bold text-sm uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#D4AF37] hover:-translate-y-0.5 transition-all duration-300"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </nav>

      {/* ================================================================ */}
      {/*  HERO                                                            */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-white text-[#0B1F4B]">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A24B]/20 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-5 py-16 md:py-24 text-center">
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
              className="font-body text-[#555] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8"
            >
              Scale Enterprises helps entrepreneurs take control of their business
              and reach their full potential, with the systems, team, and growth
              engine of an enterprise.
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeUp}>
              <Link
                href="/book"
                className="inline-block bg-[#C9A24B] text-white font-body font-bold text-sm uppercase tracking-widest px-12 py-5 rounded-full shadow-[0_4px_24px_rgba(201,162,75,0.25)] hover:bg-[#D4AF37] hover:shadow-[0_6px_32px_rgba(201,162,75,0.35)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Book a Strategy Call &rarr;
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  STATS / TRUST BAR                                               */}
      {/* ================================================================ */}
      <section className="bg-[#F8F8F8] py-12 md:py-14 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A24B]/20 to-transparent" />
        <div className="max-w-5xl mx-auto px-5">
          <p className="font-body text-xs font-bold uppercase tracking-[0.25em] text-[#C9A24B] text-center mb-8">
            Proven Results
          </p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
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
      <section className="bg-white py-14 md:py-20 relative">
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
            <h2 className="font-display font-bold text-[clamp(28px,5vw,48px)] text-center text-[#0B1F4B] leading-tight mb-12">
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
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {steps.map((s) => (
              <motion.div key={s.num} variants={fadeUp} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-[#C9A24B]/40 text-[#C9A24B] font-display font-bold text-lg mb-4 bg-[#C9A24B]/5">
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
      <section className="bg-[#F8F8F8] py-14 md:py-20 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A24B]/20 to-transparent" />
        <div className="max-w-5xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 items-center"
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
      {/*  FAQ                                                             */}
      {/* ================================================================ */}
      <section className="bg-white py-14 md:py-20 relative">
        <div className="max-w-3xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-xs font-bold uppercase tracking-[0.25em] text-[#C9A24B] text-center mb-4">
              FAQ
            </p>
            <h2 className="font-display font-bold text-[clamp(28px,5vw,48px)] text-center text-[#0B1F4B] leading-tight mb-10">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-[#0B1F4B]/10 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-display font-bold text-[#0B1F4B] text-base pr-4">
                    {faq.q}
                  </span>
                  <svg
                    className={`w-5 h-5 text-[#C9A24B] shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${openFaq === i ? "max-h-96" : "max-h-0"}`}
                >
                  <div className="px-6 pb-5">
                    <p className="font-body text-[#555] text-base leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A24B]/15 to-transparent" />
      </section>

      {/* ================================================================ */}
      {/*  FINAL CTA                                                       */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-white text-[#0B1F4B] py-16 md:py-24">
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
            <p className="font-body text-[#555] text-lg leading-relaxed max-w-xl mx-auto mb-6">
              Apply for a free Enterprise Scaling Strategy Call and discover the
              exact system to scale your business into a self-running enterprise.
            </p>
            <Link
              href="/book"
              className="inline-block bg-[#C9A24B] text-white font-body font-bold text-sm uppercase tracking-widest px-12 py-5 rounded-full shadow-[0_4px_24px_rgba(201,162,75,0.25)] hover:bg-[#D4AF37] hover:shadow-[0_6px_32px_rgba(201,162,75,0.35)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Book a Strategy Call &rarr;
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  FOOTER                                                          */}
      {/* ================================================================ */}
      <footer className="bg-white border-t border-gray-200 text-center py-6 px-5 text-sm font-body">
        <p className="text-gray-500">
          &copy; {new Date().getFullYear()} Scale Enterprises LLC. All rights
          reserved.
        </p>
        <p className="mt-3 space-x-3">
          <Link href="/about" className="text-gray-600 hover:text-navy transition-colors underline underline-offset-2">About</Link>
          <span className="text-gray-300">&middot;</span>
          <Link href="/book" className="text-gray-600 hover:text-navy transition-colors underline underline-offset-2">Book a Call</Link>
          <span className="text-gray-300">&middot;</span>
          <Link href="/waitlist" className="text-gray-600 hover:text-navy transition-colors underline underline-offset-2">Waitlist</Link>
          <span className="text-gray-300">&middot;</span>
          <Link href="/contact" className="text-gray-600 hover:text-navy transition-colors underline underline-offset-2">Contact</Link>
        </p>
        <p className="mt-3 space-x-3">
          <Link href="/privacy-policy" className="text-gray-600 hover:text-navy transition-colors underline underline-offset-2">
            Privacy
          </Link>
          <span className="text-gray-300">&middot;</span>
          <Link href="/terms-of-service" className="text-gray-600 hover:text-navy transition-colors underline underline-offset-2">
            Terms
          </Link>
          <span className="text-gray-300">&middot;</span>
          <Link href="/california-privacy" className="text-gray-600 hover:text-navy transition-colors underline underline-offset-2">
            California Notice
          </Link>
        </p>
        <p className="mt-6 text-xs text-gray-500 max-w-lg mx-auto leading-relaxed">
          Income and results disclaimer: Results mentioned on this page are not typical.
          Individual results will vary based on effort, experience, business model, and
          market conditions. Scale Enterprises makes no guarantees of specific outcomes.
        </p>
      </footer>
    </div>
  );
}
