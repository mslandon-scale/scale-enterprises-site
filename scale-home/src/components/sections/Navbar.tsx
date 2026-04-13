"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const productItems = [
  { label: "Enterprise Challenge", desc: "A deep dive to transform your business", href: "#", badge: null },
  { label: "Enterprise 360", desc: "Full enterprise implementation", href: "#", badge: null },
  { label: "Enterprise Platform", desc: "Platform services for your business", href: "#", badge: "Coming Soon" },
  { label: "Enterprise Command Center", desc: "Your eagle view snapshot of your business", href: "#", badge: "Coming Soon" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [courseOpen, setCourseOpen] = useState(false);
  const [mobileCourseOpen, setMobileCourseOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const courseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductOpen(false);
      }
      if (courseRef.current && !courseRef.current.contains(e.target as Node)) {
        setCourseOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 h-[80px] flex items-center transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-black/10 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Scale Enterprises"
              width={44}
              height={44}
              style={{ width: 44, height: 44 }}
            />
            <span className="font-display text-[18px] lg:text-[20px] tracking-[0.1em] text-navy font-bold uppercase">
              SCALE ENTERPRISES
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Products dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setProductOpen(!productOpen)}
                className="font-body text-[14px] font-bold uppercase tracking-widest text-text-secondary hover:text-navy transition-colors duration-200 flex items-center gap-1"
              >
                Products
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${productOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {productOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: "easeOut" as const }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[340px] bg-white border border-black/10 rounded-2xl shadow-lg overflow-hidden"
                  >
                    {productItems.map((item, i) => (
                      <a
                        key={item.label}
                        href={item.badge ? undefined : item.href}
                        onClick={() => !item.badge && setProductOpen(false)}
                        className={`block px-5 py-4 transition-colors duration-150 ${
                          item.badge ? "cursor-default" : "hover:bg-bg-alt"
                        } ${i < productItems.length - 1 ? "border-b border-black/[0.06]" : ""}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="font-body text-[14px] font-bold text-navy block">
                              {item.label}
                            </span>
                            <span className="font-body text-[12px] text-text-muted mt-0.5 block">
                              {item.desc}
                            </span>
                          </div>
                          {item.badge && (
                            <span className="font-body text-[9px] font-bold uppercase tracking-wider bg-bg-alt text-text-muted px-2 py-1 rounded-full text-center leading-tight whitespace-nowrap flex-shrink-0 mt-0.5">
                              Coming<br />Soon
                            </span>
                          )}
                        </div>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Free Masterclass dropdown */}
            <div ref={courseRef} className="relative">
              <button
                onClick={() => setCourseOpen(!courseOpen)}
                className="font-body text-[14px] font-bold uppercase tracking-widest text-text-secondary hover:text-navy transition-colors duration-200 flex items-center gap-1"
              >
                Free Masterclass
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${courseOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {courseOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: "easeOut" as const }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[360px] bg-white border border-black/10 rounded-2xl shadow-lg overflow-hidden p-6"
                  >
                    <p className="font-body text-[10px] font-bold uppercase tracking-widest text-accent-gold">
                      Free Masterclass
                    </p>
                    <h3 className="font-display text-[20px] text-navy leading-[1.1] mt-2 font-bold">
                      The Enterprise Masterclass
                    </h3>
                    <p className="font-body text-[14px] text-text-secondary leading-[1.6] mt-3">
                      Learn how service businesses scale to 8 figures with systems that run in 90 minutes a day. Free access — no credit card required.
                    </p>
                    <a
                      href="https://course.scaleenterprises.com/register"
                      onClick={() => setCourseOpen(false)}
                      className="block w-full mt-5 bg-accent-gold text-white font-bold text-[13px] uppercase tracking-widest px-6 py-3.5 text-center rounded-full hover:brightness-110 hover:-translate-y-px transition-all duration-200"
                    >
                      Start the Free Masterclass →
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="#apply"
              className="bg-navy text-white font-bold text-[15px] uppercase tracking-widest px-8 py-3 rounded-full hover:bg-navy-light hover:-translate-y-px transition-all duration-200"
              style={{ boxShadow: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 24px rgba(15,29,50,0.3)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              Transform Your Business
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-[2px] bg-navy transition-all duration-200 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`w-6 h-[2px] bg-navy transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-[2px] bg-navy transition-all duration-200 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 bg-white flex flex-col items-center justify-center gap-6"
          >
            {/* Products accordion */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => setMobileProductOpen(!mobileProductOpen)}
                className="font-body text-xl font-bold uppercase tracking-widest text-text-secondary hover:text-navy transition-colors flex items-center gap-2"
              >
                Products
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${mobileProductOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {mobileProductOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden flex flex-col items-center gap-3 mt-3"
                  >
                    {productItems.map((item) => (
                      <span
                        key={item.label}
                        onClick={() => { if (!item.badge) { setMobileOpen(false); setMobileProductOpen(false); } }}
                        className={`font-body text-[15px] font-semibold transition-colors flex items-center gap-2 ${
                          item.badge ? "text-text-muted/60 cursor-default" : "text-text-muted hover:text-navy cursor-pointer"
                        }`}
                      >
                        {item.label}
                        {item.badge && (
                          <span className="text-[9px] font-bold uppercase tracking-wider bg-bg-alt text-text-muted px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Free Masterclass accordion */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => setMobileCourseOpen(!mobileCourseOpen)}
                className="font-body text-xl font-bold uppercase tracking-widest text-text-secondary hover:text-navy transition-colors flex items-center gap-2"
              >
                Free Masterclass
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${mobileCourseOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {mobileCourseOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden flex flex-col items-center text-center max-w-[300px] mt-3"
                  >
                    <p className="font-body text-[13px] text-text-muted leading-[1.5]">
                      Learn how service businesses scale to 8 figures — free, no credit card required.
                    </p>
                    <a
                      href="https://course.scaleenterprises.com/register"
                      onClick={() => { setMobileOpen(false); setMobileCourseOpen(false); }}
                      className="mt-3 bg-accent-gold text-white font-bold text-[12px] uppercase tracking-widest px-6 py-2.5 rounded-full hover:brightness-110 transition-all duration-200"
                    >
                      Start Free Masterclass →
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="#apply"
              onClick={() => setMobileOpen(false)}
              className="bg-navy text-white font-bold text-[15px] uppercase tracking-widest px-10 py-4 mt-4 rounded-full"
            >
              Transform Your Business
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
