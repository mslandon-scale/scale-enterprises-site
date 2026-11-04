"use client";

import Link from "next/link";
import Script from "next/script";

const GHL_WAITLIST_FORM_ID = "JGHguJrA4RHgACyhoR56";

function BackCard({
  title,
  subtitle,
  style,
}: {
  title: string;
  subtitle: string;
  style: React.CSSProperties;
}) {
  return (
    <div
      className="absolute rounded-2xl border border-white/15 bg-gradient-to-br from-[#16306E] to-[#0B1F4B] text-white shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
      style={style}
    >
      <div className="px-3.5 pt-3.5">
        <div className="mb-2 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#C9A24B]/70">
          <div className="h-1.5 w-1.5 rounded-full bg-[#C9A24B]" />
        </div>
        <p className="font-display text-[15px] font-bold leading-tight">{title}</p>
        <p className="mt-1 font-body text-[11px] leading-snug text-white/65">{subtitle}</p>
      </div>
    </div>
  );
}

function CardStack() {
  return (
    <div className="relative mx-auto h-[316px] w-[480px] shrink-0">
      {/* Gold glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[220px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A24B]/[0.10] blur-[80px]" />

      {/* Engineer: behind, peeking above the front card */}
      <BackCard
        title="Engineer"
        subtitle="Control and numbers that work"
        style={{ width: 170, height: 190, left: "50%", top: 0, transform: "translateX(-50%) rotate(1.5deg)" }}
      />
      {/* Design: behind, left */}
      <BackCard
        title="Design"
        subtitle="Absolute clarity"
        style={{ width: 150, height: 180, left: 0, top: 70, transform: "rotate(-8deg)" }}
      />
      {/* Lead: behind, right */}
      <BackCard
        title="Lead"
        subtitle="Run your business in under 90 minutes a week"
        style={{ width: 150, height: 180, right: 0, top: 70, transform: "rotate(8deg)" }}
      />

      {/* Enterprise Roadmap: front */}
      <div
        className="absolute z-10 rounded-2xl border border-[#C9A24B]/50 bg-gradient-to-br from-[#1B3A82] to-[#0B1F4B] text-white shadow-[0_18px_50px_rgba(0,0,0,0.6)]"
        style={{ width: 200, height: 220, left: "50%", top: 96, transform: "translateX(-50%)" }}
      >
        <div className="px-5 pt-5">
          <div className="mb-3 flex items-center gap-1.5">
            <div className="flex h-4 w-4 items-center justify-center rounded-full border border-[#C9A24B]/70">
              <div className="h-2 w-2 rounded-full bg-[#C9A24B]" />
            </div>
            <span className="font-body text-[9px] uppercase tracking-[0.15em] text-white/60">
              Scale Enterprises
            </span>
          </div>
          <p className="font-display text-[22px] font-bold leading-[1.1]">
            Enterprise
            <br />
            Roadmap
          </p>
          <p className="mt-2 font-body text-[11px] tracking-wide text-[#C9A24B]">
            Design &middot; Engineer &middot; Lead
          </p>
        </div>
        <div className="absolute bottom-5 left-5 right-5 space-y-1.5">
          <div className="h-[3px] w-full rounded-full bg-white/15" />
          <div className="h-[3px] w-3/4 rounded-full bg-white/10" />
          <div className="h-[3px] w-1/2 rounded-full bg-[#C9A24B]/50" />
        </div>
      </div>
    </div>
  );
}

export default function WaitlistPage() {
  return (
    <div className="relative flex min-h-[100dvh] flex-col bg-gradient-to-b from-[#070F24] to-[#0B1F4B]">
      {/* Header: white logo only */}
      <header className="relative z-10 flex h-14 shrink-0 items-center justify-center px-5 lg:px-8">
        <a href="/" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Scale Enterprises"
            width={32}
            height={32}
            className="brightness-0 invert"
            style={{ width: 32, height: 32 }}
          />
          <span className="font-display text-[14px] font-bold uppercase tracking-[0.1em] text-white lg:text-[16px]">
            Scale Enterprises
          </span>
        </a>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-6 px-5 pb-4 lg:flex-row lg:gap-14 lg:px-8">
        {/* Left column */}
        <div className="flex flex-col items-center text-center lg:flex-1 lg:items-start lg:text-left">
          <span className="mb-4 inline-block rounded-full bg-[#C9A24B] px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[0.2em] text-white">
            Free Course
          </span>
          <h1 className="mb-3 font-display text-[34px] font-bold leading-[1.08] tracking-tight text-white lg:text-[48px]">
            Join the Free
            <br />
            Course <span className="text-[#C9A24B]">Waitlist</span>
          </h1>
          <p className="mb-0 max-w-sm lg:mb-8 font-body text-[15px] leading-relaxed text-white/70 lg:text-[17px]">
            Be first to know when the free course opens. Add your details and we will email you.
          </p>

          {/* Card stack: desktop shows here, mobile shows below the form */}
          <div className="hidden lg:block">
            <CardStack />
          </div>
        </div>

        {/* Right column: form on white card */}
        <div className="w-full max-w-[420px] shrink-0">
          <div className="rounded-2xl bg-white p-3 shadow-[0_8px_60px_rgba(0,0,0,0.45)]">
            <iframe
              id={`inline-${GHL_WAITLIST_FORM_ID}`}
              data-form-id={GHL_WAITLIST_FORM_ID}
              src={`https://api.leadconnectorhq.com/widget/form/${GHL_WAITLIST_FORM_ID}`}
              style={{ width: "100%", border: "none", minHeight: 560 }}
              title="Free Course Waitlist Form"
            />
            <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
          </div>
        </div>

        {/* Mobile card stack */}
        <div className="h-[230px] w-full overflow-x-clip sm:h-[290px] lg:hidden">
          <div className="flex origin-top scale-[0.72] justify-center sm:scale-90">
            <CardStack />
          </div>
        </div>
      </main>

      <footer className="relative z-10 flex shrink-0 items-center justify-center gap-3 px-5 py-3">
        <Link href="/privacy-policy" className="font-body text-[11px] text-white/45 transition-colors hover:text-white/80">
          Privacy Policy
        </Link>
        <span className="text-[11px] text-white/25">&middot;</span>
        <Link href="/terms-of-service" className="font-body text-[11px] text-white/45 transition-colors hover:text-white/80">
          Terms of Service
        </Link>
      </footer>
    </div>
  );
}
