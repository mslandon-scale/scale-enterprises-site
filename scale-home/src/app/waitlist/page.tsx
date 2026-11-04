"use client";

import Link from "next/link";
import Script from "next/script";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

// GHL "Free Course Waitlist" form (name, email, annual revenue; no phone).
const GHL_WAITLIST_FORM_ID = "JGHguJrA4RHgACyhoR56";

export default function WaitlistPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Spacer for fixed navbar */}
      <div className="h-[80px]" />

      {/* Hero section */}
      <section className="bg-white py-10 md:py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
            {/* Left column */}
            <div className="flex flex-col">
              {/* Pill */}
              <span className="inline-block self-start bg-[#C9A24B] text-white font-body font-bold text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-5">
                Free Course
              </span>

              {/* Headline */}
              <h1 className="font-display font-bold text-[clamp(36px,6vw,56px)] leading-[1.08] tracking-tight text-[#0B1F4B] mb-6">
                Join the Free
                <br />
                Course{" "}
                <span className="text-[#C9A24B]">Waitlist</span>
              </h1>

              {/* Subhead */}
              <p className="font-body text-[#555] text-lg md:text-xl leading-relaxed max-w-lg mb-8">
                Be first to know when the free course opens. Add your details
                and we will email you.
              </p>

              {/* Course mockup — CSS cards */}
              <div className="hidden lg:block relative mt-4">
                <div className="relative h-[220px] w-full max-w-[460px]">
                  {/* Back row: Design, Engineer, Lead */}
                  {[
                    { title: "Design", subtitle: "Absolute clarity" , rotation: -6, left: 0 },
                    { title: "Engineer", subtitle: "Control and numbers that work", rotation: 0, left: 140 },
                    { title: "Lead", subtitle: "Run your business in under 90 minutes a week", rotation: 6, left: 280 },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="absolute top-0 rounded-xl border border-[#0B1F4B]/10 bg-gradient-to-br from-[#0B1F4B] to-[#122B5E] text-white shadow-md"
                      style={{
                        width: 120,
                        height: 155,
                        left: card.left,
                        transform: `rotate(${card.rotation}deg)`,
                      }}
                    >
                      <div className="absolute top-4 left-4 right-4">
                        <div className="flex items-center gap-1.5 mb-2">
                          <div className="w-3.5 h-3.5 rounded-full border border-[#C9A24B]/60 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#C9A24B]" />
                          </div>
                          <span className="font-body text-[7px] uppercase tracking-wider text-white/40">
                            Scale
                          </span>
                        </div>
                        <p className="font-display font-bold text-xs leading-tight">{card.title}</p>
                        <p className="font-body text-[9px] text-white/50 leading-snug mt-1">{card.subtitle}</p>
                      </div>
                      <div className="absolute bottom-3 left-4 right-4 space-y-1">
                        <div className="h-[2px] rounded-full bg-white/10 w-full" />
                        <div className="h-[2px] rounded-full bg-white/10 w-3/4" />
                      </div>
                    </div>
                  ))}
                  {/* Front card: Enterprise Roadmap */}
                  <div
                    className="absolute rounded-xl border border-[#C9A24B]/30 bg-gradient-to-br from-[#0B1F4B] to-[#122B5E] text-white shadow-xl z-10"
                    style={{
                      width: 170,
                      height: 210,
                      left: 120,
                      top: 10,
                    }}
                  >
                    <div className="absolute top-5 left-5 right-5">
                      <div className="flex items-center gap-1.5 mb-3">
                        <div className="w-4 h-4 rounded-full border border-[#C9A24B]/60 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A24B]" />
                        </div>
                        <span className="font-body text-[8px] uppercase tracking-wider text-white/50">
                          Scale Enterprises
                        </span>
                      </div>
                      <p className="font-display font-bold text-base leading-tight">Enterprise<br />Roadmap</p>
                      <p className="font-body text-[10px] text-[#C9A24B]/70 leading-snug mt-2">Design · Engineer · Lead</p>
                    </div>
                    <div className="absolute bottom-4 left-5 right-5 space-y-1.5">
                      <div className="h-[3px] rounded-full bg-white/10 w-full" />
                      <div className="h-[3px] rounded-full bg-white/10 w-3/4" />
                      <div className="h-[3px] rounded-full bg-white/10 w-1/2" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Fine text at bottom left */}
              <p className="hidden lg:block font-body text-[13px] text-[#888] mt-10 max-w-md leading-relaxed">
                Built by Scale Enterprises to help service business owners
                install the systems that let their business run without them.
              </p>
            </div>

            {/* Right column — Form card */}
            <div className="w-full max-w-md mx-auto lg:mx-0 lg:max-w-none">
              <div className="bg-white rounded-2xl shadow-[0_4px_40px_rgba(0,0,0,0.08)] border border-[#0B1F4B]/8 p-8 md:p-10">
                <h2 className="font-display font-bold text-xl md:text-2xl text-[#0B1F4B] mb-6">
                  Reserve your spot
                </h2>

                {/* GHL Form placeholder */}
                {GHL_WAITLIST_FORM_ID ? (
                  <>
                  <iframe
                    id={`inline-${GHL_WAITLIST_FORM_ID}`}
                    data-form-id={GHL_WAITLIST_FORM_ID}
                    src={`https://api.leadconnectorhq.com/widget/form/${GHL_WAITLIST_FORM_ID}`}
                    style={{
                      width: "100%",
                      border: "none",
                      minHeight: 400,
                    }}
                    title="Free Course Waitlist Form"
                  />
                  <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
                  </>
                ) : (
                  <div className="border-2 border-dashed border-[#0B1F4B]/15 rounded-xl p-8 flex flex-col items-center justify-center min-h-[320px] bg-[#F8F8F8]/50">
                    <div className="w-12 h-12 rounded-full bg-[#0B1F4B]/5 flex items-center justify-center mb-4">
                      <svg
                        className="w-6 h-6 text-[#0B1F4B]/30"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <p className="font-body text-sm text-[#0B1F4B]/40 text-center leading-relaxed">
                      Form goes here
                      <br />
                      <span className="text-xs">(GoHighLevel: Free Course Waitlist)</span>
                    </p>
                  </div>
                )}

                {/* Button (styled, non-functional until form is live) */}
                {!GHL_WAITLIST_FORM_ID && (
                <button
                  type="button"
                  disabled
                  className="w-full mt-6 bg-[#C9A24B] text-white font-body font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:bg-[#D4AF37] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  Join the Waitlist &rarr;
                </button>
                )}

                {/* Fine print */}
                <p className="font-body text-[11px] text-[#888] mt-5 leading-relaxed text-center">
                  By submitting, you agree to be contacted by Scale Enterprises
                  by email. We do not sell your information.{" "}
                  <Link
                    href="/privacy-policy"
                    className="underline underline-offset-2 hover:text-[#0B1F4B] transition-colors"
                  >
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/terms-of-service"
                    className="underline underline-offset-2 hover:text-[#0B1F4B] transition-colors"
                  >
                    Terms of Service
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Mobile mockup — below form on small screens */}
          <div className="lg:hidden mt-8">
            <div className="relative h-[160px] w-full max-w-[320px] mx-auto">
              {/* Back row: Design, Engineer, Lead */}
              {[
                { title: "Design", subtitle: "Absolute clarity", rotation: -5, left: 0 },
                { title: "Engineer", subtitle: "Control and numbers that work", rotation: 0, left: 100 },
                { title: "Lead", subtitle: "Run your business in under 90 minutes a week", rotation: 5, left: 200 },
              ].map((card) => (
                <div
                  key={card.title}
                  className="absolute top-0 rounded-lg border border-[#0B1F4B]/10 bg-gradient-to-br from-[#0B1F4B] to-[#122B5E] text-white shadow-sm"
                  style={{
                    width: 80,
                    height: 105,
                    left: card.left,
                    transform: `rotate(${card.rotation}deg)`,
                  }}
                >
                  <div className="absolute top-2.5 left-2.5 right-2.5">
                    <div className="flex items-center gap-1 mb-1.5">
                      <div className="w-2.5 h-2.5 rounded-full border border-[#C9A24B]/60 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-[#C9A24B]" />
                      </div>
                      <span className="font-body text-[5px] uppercase tracking-wider text-white/40">Scale</span>
                    </div>
                    <p className="font-display font-bold text-[9px] leading-tight">{card.title}</p>
                    <p className="font-body text-[6px] text-white/40 leading-snug mt-0.5">{card.subtitle}</p>
                  </div>
                  <div className="absolute bottom-2 left-2.5 right-2.5 space-y-0.5">
                    <div className="h-[1.5px] rounded-full bg-white/10 w-full" />
                    <div className="h-[1.5px] rounded-full bg-white/10 w-3/4" />
                  </div>
                </div>
              ))}
              {/* Front card: Enterprise Roadmap */}
              <div
                className="absolute rounded-lg border border-[#C9A24B]/30 bg-gradient-to-br from-[#0B1F4B] to-[#122B5E] text-white shadow-lg z-10"
                style={{
                  width: 115,
                  height: 145,
                  left: 85,
                  top: 8,
                }}
              >
                <div className="absolute top-3 left-3 right-3">
                  <div className="flex items-center gap-1 mb-2">
                    <div className="w-3 h-3 rounded-full border border-[#C9A24B]/60 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-[#C9A24B]" />
                    </div>
                    <span className="font-body text-[6px] uppercase tracking-wider text-white/50">Scale Enterprises</span>
                  </div>
                  <p className="font-display font-bold text-[11px] leading-tight">Enterprise<br />Roadmap</p>
                  <p className="font-body text-[7px] text-[#C9A24B]/70 leading-snug mt-1">Design · Engineer · Lead</p>
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 space-y-1">
                  <div className="h-[2px] rounded-full bg-white/10 w-full" />
                  <div className="h-[2px] rounded-full bg-white/10 w-3/4" />
                </div>
              </div>
            </div>
            <p className="font-body text-[12px] text-[#888] mt-6 text-center max-w-sm mx-auto leading-relaxed">
              Built by Scale Enterprises to help service business owners
              install the systems that let their business run without them.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
