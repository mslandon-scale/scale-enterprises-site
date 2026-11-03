"use client";

import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

const GHL_WAITLIST_FORM_ID = "";

export default function WaitlistPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Spacer for fixed navbar */}
      <div className="h-[80px]" />

      {/* Hero section */}
      <section className="bg-white py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left column */}
            <div className="flex flex-col">
              {/* Pill */}
              <span className="inline-block self-start bg-[#C9A24B] text-white font-body font-bold text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-8">
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
              <p className="font-body text-[#555] text-lg md:text-xl leading-relaxed max-w-lg mb-12">
                Be first to know when the free course opens. Add your details
                and we will email you.
              </p>

              {/* Course mockup — CSS cards */}
              <div className="hidden lg:block relative mt-4">
                <div className="flex items-end gap-4 pl-4">
                  {["Systems", "Growth", "Leadership", "Operations"].map(
                    (label, i) => (
                      <div
                        key={label}
                        className="relative flex-shrink-0 rounded-xl border border-[#0B1F4B]/10 bg-gradient-to-br from-[#0B1F4B] to-[#122B5E] text-white shadow-lg"
                        style={{
                          width: 130,
                          height: 170,
                          transform: `rotate(${-6 + i * 4}deg) translateY(${i % 2 === 0 ? 0 : -8}px)`,
                        }}
                      >
                        <div className="absolute top-4 left-4 right-4">
                          <div className="flex items-center gap-1.5 mb-3">
                            <div className="w-4 h-4 rounded-full border border-[#C9A24B]/60 flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A24B]" />
                            </div>
                            <span className="font-body text-[8px] uppercase tracking-wider text-white/50">
                              Scale Enterprises
                            </span>
                          </div>
                          <p className="font-display font-bold text-sm leading-tight">
                            {label}
                          </p>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 space-y-1.5">
                          <div className="h-[3px] rounded-full bg-white/10 w-full" />
                          <div className="h-[3px] rounded-full bg-white/10 w-3/4" />
                          <div className="h-[3px] rounded-full bg-white/10 w-1/2" />
                        </div>
                      </div>
                    )
                  )}
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
                  <iframe
                    src={`https://api.leadconnectorhq.com/widget/form/${GHL_WAITLIST_FORM_ID}`}
                    style={{
                      width: "100%",
                      border: "none",
                      minHeight: 400,
                    }}
                    title="Free Course Waitlist Form"
                  />
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
                <button
                  type="button"
                  disabled
                  className="w-full mt-6 bg-[#C9A24B] text-white font-body font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:bg-[#D4AF37] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  Join the Waitlist &rarr;
                </button>

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
          <div className="lg:hidden mt-12">
            <div className="flex items-end justify-center gap-3">
              {["Systems", "Growth", "Leadership", "Operations"].map(
                (label, i) => (
                  <div
                    key={label}
                    className="relative flex-shrink-0 rounded-lg border border-[#0B1F4B]/10 bg-gradient-to-br from-[#0B1F4B] to-[#122B5E] text-white shadow-md"
                    style={{
                      width: 80,
                      height: 110,
                      transform: `rotate(${-6 + i * 4}deg) translateY(${i % 2 === 0 ? 0 : -5}px)`,
                    }}
                  >
                    <div className="absolute top-3 left-3 right-3">
                      <div className="flex items-center gap-1 mb-2">
                        <div className="w-2.5 h-2.5 rounded-full border border-[#C9A24B]/60 flex items-center justify-center">
                          <div className="w-1 h-1 rounded-full bg-[#C9A24B]" />
                        </div>
                        <span className="font-body text-[5px] uppercase tracking-wider text-white/40">
                          Scale
                        </span>
                      </div>
                      <p className="font-display font-bold text-[10px] leading-tight">
                        {label}
                      </p>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 space-y-1">
                      <div className="h-[2px] rounded-full bg-white/10 w-full" />
                      <div className="h-[2px] rounded-full bg-white/10 w-3/4" />
                    </div>
                  </div>
                )
              )}
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
