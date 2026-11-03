import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Apply for Enterprise 360 | Scale Enterprises",
  description:
    "Apply for the Enterprise 360 program — Scale Enterprises' flagship enterprise transformation membership.",
};

const includedItems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
    frequency: "WEEKLY · FIRST 90 DAYS",
    title: "90-Day Integration Sprint",
    description:
      "The 90-Day Integration Sprint is where the Enterprise system gets installed directly into your business. For 12 weeks, you meet one-on-one every single week to build out your enterprise engine — your strategy, your operations, your leadership rhythm — so the framework isn't theory, it's running. By the end of the sprint, the system is live inside your business and you're operating from it every week.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
    frequency: "MONTHLY",
    title: "Monthly One-on-One Coaching",
    description:
      "Direct, one-on-one coaching sessions with a dedicated Enterprise Strategist. Each session is built around your highest-leverage challenge or decision. You arrive with your biggest obstacle, and your Strategist helps clarify the path forward, identify the next move, and set specific commitments. This is not a casual check-in. It is the engine of the program.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    frequency: "MONTHLY",
    title: "Monthly Group Coaching",
    description:
      "Monthly Group Coaching sessions create a live environment where members learn directly from Matthew Landon, engage with other serious founders, and sharpen how they apply the framework in real time. These are not passive calls. They are high-leverage sessions built to deepen conviction, compound learning, and move you closer to your goals.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    frequency: "FULL ACCESS",
    title: "The Enterprise Library",
    description:
      "Your complete collection of core resources, playbooks, and operational guides. Hand these directly to your team to help them execute in the areas that matter most — marketing, sales, fulfillment, cash management, hiring, and leadership. Every playbook is built to be used, not just read. This is the reference layer that keeps your team aligned and moving without you having to repeat yourself.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
    ),
    frequency: "BONUS",
    title: "Enterprise HQ — Free Access",
    description:
      "Every member gets free access to Enterprise HQ — the management software built to help you and your team run the system day-to-day. Dashboards, scorecards, commitments, priorities — everything you need to operate the enterprise system from one place. Enterprise HQ keeps your team aligned, your progress visible, and your momentum compounding week after week.",
  },
];

export default function ApplicationPage() {
  return (
    <div className={`${playfair.variable} relative`}>
      {/* Full-page gradient background */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: "70vh",
          background: "linear-gradient(to bottom, rgba(240,192,48,0.25) 0%, rgba(240,192,48,0.35) 15%, rgba(240,192,48,0.3) 30%, rgba(240,192,48,0.12) 50%, rgba(240,192,48,0.04) 65%, transparent 100%)",
        }}
      />

      {/* Minimal header */}
      <header className="relative py-5 text-center">
        <a href="/" className="inline-flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Scale Enterprises" width={36} height={36} style={{ width: 36, height: 36 }} />
          <span className="font-display text-[15px] lg:text-[17px] tracking-[0.14em] text-black font-bold uppercase">
            Scale Enterprises
          </span>
        </a>
      </header>

      {/* Hero headline */}
      <div className="relative text-center pt-6 pb-10 px-4">
        <p className="font-display text-[12px] lg:text-[14px] font-extrabold uppercase tracking-[0.22em] text-black">
          You&rsquo;re One Step Closer To
        </p>
        <h1 className="font-display text-[clamp(2rem,5.5vw,3.8rem)] leading-[1.1] text-accent-gold mt-1 font-bold">
          Transforming Your Business
        </h1>
      </div>

      {/* Main two-column layout — stays side by side the whole way down */}
      <main className="relative max-w-[1200px] mx-auto px-4 lg:px-8 pb-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">

          {/* ===== LEFT COLUMN: Video + Everything Included ===== */}
          <div className="w-full lg:w-[54%] flex flex-col">

            {/* Video */}
            <div className="relative w-full rounded-xl overflow-hidden bg-[#111] aspect-[16/5]">
              <div className="absolute top-0 left-0 right-0 z-10 bg-black/70 backdrop-blur-sm px-4 py-2.5 flex items-center gap-2">
                <span className="text-accent-gold text-sm">&#x1F50A;</span>
                <span className="text-white text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.14em]">
                  Before You Apply, Watch This Short Video
                </span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/25 transition-colors">
                  <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                </svg>
              </div>
              <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent px-5 pb-4 pt-12">
                <p className="text-white/90 text-[13px] leading-[1.5] font-body">
                  have those hard decisions, be<br />challenged by a strategist,
                </p>
              </div>
            </div>

            {/* Everything Included — directly below the video in the LEFT column */}
            <div className="mt-12 flex-1 flex flex-col">
              <div className="text-center mb-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="" width={44} height={44} style={{ width: 44, height: 44 }} className="mx-auto mb-2 opacity-80" />
                <p className="font-display text-[10px] lg:text-[12px] font-extrabold uppercase tracking-[0.22em] text-text-muted">
                  Everything Included In
                </p>
                <h2 className="font-display text-[clamp(1.4rem,3.5vw,2.2rem)] leading-[1.15] mt-1 font-bold text-navy uppercase tracking-wide">
                  Enterprise{" "}
                  <span className="relative inline-block mx-0.5">
                    <span className="relative z-10 text-black">360</span>
                    <span className="absolute bg-accent-gold rounded-sm" style={{ inset: "-1px -4px" }} />
                  </span>{" "}
                  Program
                </h2>
                <p className="font-display text-[11px] lg:text-[13px] font-extrabold uppercase tracking-[0.2em] text-navy mt-1">
                  The Full Enterprise Transformation&trade;
                </p>
              </div>

              <div className="flex flex-col gap-6 flex-1">
                {includedItems.map((item) => (
                  <div key={item.title} className="border-l-[3px] border-accent-gold rounded-lg bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-10 h-10 rounded-md bg-accent-gold/10 flex items-center justify-center text-accent-gold flex-shrink-0">
                        {item.icon}
                      </div>
                      <p className="font-display text-[10px] font-extrabold uppercase tracking-[0.2em] text-accent-gold">
                        {item.frequency}
                      </p>
                    </div>
                    <h3 className="font-display text-[17px] lg:text-[20px] font-bold text-navy leading-snug">
                      {item.title}
                    </h3>
                    <p className="font-body text-[14px] text-text-secondary leading-[1.75] mt-2">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===== RIGHT COLUMN: Banner + Form ===== */}
          <div className="w-full lg:w-[46%] flex flex-col">

            {/* Challenge banner */}
            <div className="border-2 border-accent-gold rounded-lg px-5 py-4 mb-4 bg-white flex items-center gap-4">
              <div className="w-14 h-14 rounded-lg bg-accent-gold/10 flex items-center justify-center text-accent-gold flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
              </div>
              <div>
                <p className="font-body text-[14px] text-text-primary leading-[1.55]">
                  If you&rsquo;re not sure how this will directly apply to your business, then join our{" "}
                  <span className="font-bold">free one-on-one three-day Enterprise Challenge</span>, where you get a taste of what it&rsquo;s like and make real breakthroughs in your business.
                </p>
                <a
                  href="https://go.scaleenterprises.com/ent-playbook-lp"
                  className="inline-block mt-3 bg-[#2a7d2a] hover:bg-[#1f6b1f] text-white text-[12px] font-bold uppercase tracking-[0.12em] px-6 py-2.5 rounded transition-colors duration-200"
                >
                  Join For Free
                </a>
              </div>
            </div>

            {/* Apply heading — centered, flush to form */}
            <div className="relative z-10 text-center px-4 mb-0">
              <div className="flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 text-navy flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                </svg>
                <h2 className="font-display text-[15px] lg:text-[17px] font-bold text-navy uppercase tracking-[0.04em]">
                  Apply for Enterprise 360
                </h2>
              </div>
              <p className="font-body text-[11px] text-text-secondary leading-[1.4] mt-0 px-2">
                Yes, I&rsquo;m ready to accelerate my growth and I&rsquo;m interested in applying for the Enterprise 360 Program.
              </p>
            </div>

            {/* GHL Form */}
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/wrCtHjESdfmF7w42aJqw"
              className="flex-1 -mt-3"
              style={{ width: "100%", height: 1600, border: "none", borderRadius: 3, overflow: "hidden" }}
              id="inline-wrCtHjESdfmF7w42aJqw"
              data-layout='{"id":"INLINE"}'
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Enterprise 360 Application"
              data-height="1374"
              data-layout-iframe-id="inline-wrCtHjESdfmF7w42aJqw"
              data-form-id="wrCtHjESdfmF7w42aJqw"
              title="Enterprise 360 Application"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] py-8">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
          <div className="flex flex-col items-center text-center gap-2.5">
            <a href="/" className="inline-flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Scale Enterprises" width={28} height={28} style={{ width: 28, height: 28 }} className="brightness-200" />
              <span className="font-display text-[13px] tracking-[0.1em] text-white font-bold uppercase">
                Scale Enterprises
              </span>
            </a>
            <p className="font-body text-[11px] text-white/50 max-w-md leading-[1.6]">
              A premium Enterprise Advisory built around one outcome: helping serious founders and entrepreneurial leaders scale bigger, faster, and with more clarity.
            </p>
            <p className="font-body text-[10px] text-white/30 mt-1">
              Scale Enterprises. &copy; 2026. All Rights Reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="/privacy-policy" className="font-body text-[10px] text-white/40 hover:text-white/70 transition-colors">Privacy</a>
              <a href="/terms-of-service" className="font-body text-[10px] text-white/40 hover:text-white/70 transition-colors">Terms</a>
              <a href="/disclaimer" className="font-body text-[10px] text-white/40 hover:text-white/70 transition-colors">California Notice</a>
            </div>
          </div>
        </div>
      </footer>

      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </div>
  );
}
