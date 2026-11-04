"use client";

import Link from "next/link";
import Script from "next/script";

const GHL_WAITLIST_FORM_ID = "JGHguJrA4RHgACyhoR56";

const GOLD = "#C9A227";

type OfferItem = {
  name: string;
  value: number;
  section: "keep" | "trial";
  note?: string;
};

const OFFER_ITEMS: OfferItem[] = [
  { name: "The Enterprise Scaling Course", value: 997, section: "keep" },
  { name: "One-on-one Enterprise Scaling Session", value: 500, section: "keep" },
  { name: "The Enterprise AI Playbook", value: 497, section: "keep" },
  { name: "Private Community Access", value: 197, section: "keep" },
  {
    name: "The Enterprise 360 App",
    value: 894,
    section: "trial",
    note: "Free for 30 days, then $25/month. Includes RevFlow revenue management and a financial dashboard connected to QuickBooks and other major accounting apps.",
  },
];

const TOTAL_VALUE = OFFER_ITEMS.reduce((sum, item) => sum + item.value, 0);

const keepItems = OFFER_ITEMS.filter((i) => i.section === "keep");
const trialItems = OFFER_ITEMS.filter((i) => i.section === "trial");

function OfferStack() {
  return (
    <div className="flex flex-col gap-5">
      {/* Section: Yours to keep forever */}
      <div>
        <h2
          className="mb-3 font-display text-[15px] font-bold uppercase tracking-[0.15em] lg:text-[16px]"
          style={{ color: GOLD }}
        >
          Yours to keep forever
        </h2>
        <ul className="space-y-2">
          {keepItems.map((item) => (
            <li key={item.name} className="flex items-start gap-2.5">
              <span
                className="mt-[5px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full border"
                style={{ borderColor: `${GOLD}70` }}
              >
                <span
                  className="block h-2 w-2 rounded-full"
                  style={{ backgroundColor: GOLD }}
                />
              </span>
              <span className="font-body text-[14px] leading-snug text-white/90 lg:text-[15px]">
                {item.name}{" "}
                <span style={{ color: GOLD }} className="font-semibold">
                  (${item.value.toLocaleString()} value)
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Section: Free trial */}
      <div>
        <h2
          className="mb-3 font-display text-[15px] font-bold uppercase tracking-[0.15em] lg:text-[16px]"
          style={{ color: GOLD }}
        >
          Free trial
        </h2>
        <ul className="space-y-2">
          {trialItems.map((item) => (
            <li key={item.name} className="flex items-start gap-2.5">
              <span
                className="mt-[5px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full border"
                style={{ borderColor: `${GOLD}70` }}
              >
                <span
                  className="block h-2 w-2 rounded-full"
                  style={{ backgroundColor: GOLD }}
                />
              </span>
              <div className="font-body text-[14px] leading-snug text-white/90 lg:text-[15px]">
                <span>
                  {item.name}{" "}
                  <span style={{ color: GOLD }} className="font-semibold">
                    (${item.value.toLocaleString()} value)
                  </span>
                </span>
                {item.note && (
                  <p className="mt-0.5 text-[12px] leading-snug text-white/55 lg:text-[13px]">
                    {item.note}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Total */}
      <div
        className="rounded-xl border px-4 py-3"
        style={{ borderColor: `${GOLD}40`, background: `${GOLD}0A` }}
      >
        <p className="font-display text-[18px] font-bold text-white lg:text-[20px]">
          Total value ${TOTAL_VALUE.toLocaleString()}.{" "}
          <span style={{ color: GOLD }}>Your price: free.</span>
        </p>
      </div>
    </div>
  );
}

export default function WaitlistPage() {
  return (
    <div className="relative flex min-h-[100dvh] flex-col bg-gradient-to-b from-[#070F24] to-[#0B1F4B]">
      {/* Header */}
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
          <span
            className="mb-4 inline-block rounded-full px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[0.2em] text-white"
            style={{ backgroundColor: GOLD }}
          >
            Limited Offer
          </span>
          <h1 className="mb-5 font-display text-[30px] font-bold leading-[1.08] tracking-tight text-white lg:text-[44px]">
            Get Your Scaling System
            <br />
            Built in 30 Days,{" "}
            <span style={{ color: GOLD }}>Free</span>
          </h1>

          {/* Offer stack: desktop shows here, mobile shows below the form */}
          <div className="hidden lg:block">
            <OfferStack />
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
              title="Waitlist Form"
            />
            <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
          </div>
        </div>

        {/* Mobile offer stack */}
        <div className="w-full lg:hidden">
          <OfferStack />
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
