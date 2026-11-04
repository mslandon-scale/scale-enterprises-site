"use client";

import Link from "next/link";
import Script from "next/script";

const GHL_WAITLIST_FORM_ID = "JGHguJrA4RHgACyhoR56";

export default function WaitlistPage() {
  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden bg-gradient-to-b from-[#070F24] to-[#0B1F4B] relative">
      {/* Gold ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[30%] top-[60%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full bg-[#C9A24B]/[0.04] blur-[100px]" />
      </div>

      {/* Header: white logo only */}
      <header className="flex-shrink-0 flex items-center px-5 lg:px-8 h-[48px]">
        <a href="/" className="flex items-center gap-2.5 relative z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Scale Enterprises"
            width={32}
            height={32}
            className="brightness-0 invert"
            style={{ width: 32, height: 32 }}
          />
          <span className="font-display text-[14px] lg:text-[16px] tracking-[0.1em] text-white font-bold uppercase">
            Scale Enterprises
          </span>
        </a>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-10 px-5 lg:px-8 max-w-7xl mx-auto w-full min-h-0 relative z-10">
        {/* Left column */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:flex-1 min-h-0">
          <span className="inline-block bg-[#C9A24B] text-white font-body font-bold text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-3">
            Free Course
          </span>

          <h1 className="font-display font-bold text-[clamp(26px,4.5vw,44px)] leading-[1.1] tracking-tight text-white mb-2">
            Join the Free<br />
            Course <span className="text-[#C9A24B]">Waitlist</span>
          </h1>

          {/* Desktop subhead */}
          <p className="hidden lg:block font-body text-white/60 text-[clamp(14px,1.3vw,17px)] leading-relaxed max-w-sm mb-5">
            Be first to know when the free course opens. Add your details and we will email you.
          </p>
          {/* Mobile subhead (shorter) */}
          <p className="lg:hidden font-body text-white/60 text-sm leading-relaxed max-w-xs mb-3">
            Be first to know when the free course opens.
          </p>

          {/* Card stack — desktop only */}
          <div className="hidden lg:block relative w-[340px]" style={{ height: "clamp(150px, 22vh, 210px)" }}>
            {/* Design — left */}
            <div
              className="absolute rounded-xl border border-white/10 bg-gradient-to-br from-[#13295F] to-[#0B1F4B] text-white shadow-md"
              style={{
                width: "clamp(80px, 9vw, 100px)",
                height: "clamp(100px, 14vh, 130px)",
                left: "8%",
                top: "18%",
                transform: "rotate(-7deg)",
              }}
            >
              <div className="absolute top-3 left-3 right-3">
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full border border-[#C9A24B]/60 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-[#C9A24B]" />
                  </div>
                  <span className="font-body text-[5px] uppercase tracking-wider text-white/40">Scale</span>
                </div>
                <p className="font-display font-bold text-[9px] leading-tight">Design</p>
                <p className="font-body text-[6px] text-white/50 leading-snug mt-0.5">Absolute clarity</p>
              </div>
            </div>

            {/* Engineer — top center */}
            <div
              className="absolute rounded-xl border border-white/10 bg-gradient-to-br from-[#13295F] to-[#0B1F4B] text-white shadow-md"
              style={{
                width: "clamp(80px, 9vw, 100px)",
                height: "clamp(100px, 14vh, 130px)",
                left: "50%",
                top: "0%",
                transform: "translateX(-50%) rotate(2deg)",
              }}
            >
              <div className="absolute top-3 left-3 right-3">
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full border border-[#C9A24B]/60 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-[#C9A24B]" />
                  </div>
                  <span className="font-body text-[5px] uppercase tracking-wider text-white/40">Scale</span>
                </div>
                <p className="font-display font-bold text-[9px] leading-tight">Engineer</p>
                <p className="font-body text-[6px] text-white/50 leading-snug mt-0.5">Control and numbers that work</p>
              </div>
            </div>

            {/* Lead — right */}
            <div
              className="absolute rounded-xl border border-white/10 bg-gradient-to-br from-[#13295F] to-[#0B1F4B] text-white shadow-md"
              style={{
                width: "clamp(80px, 9vw, 100px)",
                height: "clamp(100px, 14vh, 130px)",
                right: "8%",
                top: "18%",
                transform: "rotate(7deg)",
              }}
            >
              <div className="absolute top-3 left-3 right-3">
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full border border-[#C9A24B]/60 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-[#C9A24B]" />
                  </div>
                  <span className="font-body text-[5px] uppercase tracking-wider text-white/40">Scale</span>
                </div>
                <p className="font-display font-bold text-[9px] leading-tight">Lead</p>
                <p className="font-body text-[6px] text-white/50 leading-snug mt-0.5">Run your business in under 90 minutes a week</p>
              </div>
            </div>

            {/* Enterprise Roadmap — front center */}
            <div
              className="absolute rounded-xl border border-[#C9A24B]/30 bg-gradient-to-br from-[#13295F] to-[#0B1F4B] text-white shadow-xl z-10"
              style={{
                width: "clamp(115px, 13vw, 150px)",
                height: "clamp(140px, 19vh, 185px)",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -42%)",
              }}
            >
              <div className="absolute top-4 left-4 right-4">
                <div className="flex items-center gap-1 mb-2">
                  <div className="w-3.5 h-3.5 rounded-full border border-[#C9A24B]/60 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9A24B]" />
                  </div>
                  <span className="font-body text-[7px] uppercase tracking-wider text-white/50">Scale Enterprises</span>
                </div>
                <p className="font-display font-bold text-[clamp(11px,1.2vw,14px)] leading-tight">
                  Enterprise<br />Roadmap
                </p>
                <p className="font-body text-[8px] text-[#C9A24B]/70 leading-snug mt-1.5">
                  Design · Engineer · Lead
                </p>
              </div>
              <div className="absolute bottom-3 left-4 right-4 space-y-1">
                <div className="h-[2px] rounded-full bg-white/10 w-full" />
                <div className="h-[2px] rounded-full bg-white/10 w-3/4" />
              </div>
            </div>
          </div>
        </div>

        {/* Right column — form on white card */}
        <div className="w-full max-w-[400px] lg:max-w-[420px] flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-[0_8px_60px_rgba(0,0,0,0.4)] p-4 md:p-5">
            <iframe
              id={`inline-${GHL_WAITLIST_FORM_ID}`}
              data-form-id={GHL_WAITLIST_FORM_ID}
              src={`https://api.leadconnectorhq.com/widget/form/${GHL_WAITLIST_FORM_ID}`}
              style={{
                width: "100%",
                border: "none",
                height: "clamp(350px, 52vh, 560px)",
              }}
              title="Free Course Waitlist Form"
            />
            <Script
              src="https://link.msgsndr.com/js/form_embed.js"
              strategy="afterInteractive"
            />
          </div>
        </div>
      </main>

      {/* Legal links row */}
      <footer className="flex-shrink-0 flex justify-center items-center gap-3 px-5 py-2 relative z-10">
        <Link
          href="/privacy-policy"
          className="font-body text-[10px] text-white/25 hover:text-white/50 transition-colors"
        >
          Privacy Policy
        </Link>
        <span className="text-white/15 text-[10px]">·</span>
        <Link
          href="/terms-of-service"
          className="font-body text-[10px] text-white/25 hover:text-white/50 transition-colors"
        >
          Terms of Service
        </Link>
      </footer>
    </div>
  );
}
