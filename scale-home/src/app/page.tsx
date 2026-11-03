import Image from "next/image";
import Link from "next/link";

const BOOKING_URL =
  "https://api.leadconnectorhq.com/widget/booking/AQNByjjmB5jeQXf06vft";

const results = [
  { stat: "500%", label: "growth in 6 months", context: "Professional services firm" },
  { stat: "2×", label: "profit in 3 months", context: "Trades business" },
  { stat: "3×", label: "lead gen in 7 days", context: "50-person sales team" },
];

const steps = [
  {
    num: "01",
    title: "Audit",
    desc: "Find where the business depends on you.",
  },
  {
    num: "02",
    title: "Build",
    desc: "Install the systems, marketing, and team structure.",
  },
  {
    num: "03",
    title: "Scale",
    desc: "Grow while the business runs without you.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/5">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Scale Enterprises"
              width={36}
              height={36}
              className="w-9 h-9"
            />
            <span className="font-display font-800 text-navy text-lg tracking-wide uppercase hidden sm:inline">
              Scale Enterprises
            </span>
          </div>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent-gold text-black font-body font-bold text-sm uppercase tracking-widest px-6 py-3 rounded-full hover:brightness-110 hover:-translate-y-0.5 transition-all"
          >
            Book a Call
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-bg-navy via-[#0a0a0f] to-bg-navy text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(240,192,48,0.08),transparent_70%)] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-5 py-24 md:py-36 text-center">
          <h1 className="font-display font-extrabold text-[clamp(32px,6vw,56px)] uppercase leading-[1.08] tracking-tight mb-6">
            We build enterprise-level businesses{" "}
            <span className="bg-gradient-to-r from-accent-gold via-yellow-300 to-accent-gold bg-clip-text text-transparent">
              that run without you.
            </span>
          </h1>
          <p className="font-body text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Scale Enterprises helps entrepreneurs take control of their business
            and reach their full potential, with the systems, team, and growth
            engine of an enterprise.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-accent-gold via-[#E8B820] to-accent-gold text-black font-body font-bold text-sm uppercase tracking-widest px-10 py-5 rounded-full shadow-[0_0_30px_rgba(240,192,48,0.25),0_8px_32px_rgba(240,192,48,0.2)] hover:brightness-110 hover:-translate-y-0.5 transition-all"
          >
            Book a Call &rarr;
          </a>
        </div>
      </section>

      {/* ── Results ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-5">
          <p className="font-body text-sm font-bold uppercase tracking-eyebrow text-navy text-center mb-12">
            Proven Results
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {results.map((r) => (
              <div
                key={r.stat}
                className="text-center p-8 rounded-2xl bg-bg-card border border-black/5 card-shadow"
              >
                <p className="font-display font-extrabold text-4xl md:text-5xl text-accent-gold tracking-tight mb-3">
                  {r.stat}
                </p>
                <p className="font-body text-text-primary font-semibold text-base mb-1">
                  {r.label}
                </p>
                <p className="font-body text-text-muted text-sm">{r.context}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-bg-alt py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-5">
          <p className="font-body text-sm font-bold uppercase tracking-eyebrow text-navy text-center mb-4">
            How It Works
          </p>
          <h2 className="font-display font-extrabold text-[clamp(28px,4vw,44px)] uppercase text-center text-navy leading-tight mb-16">
            Three Steps to Scale
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((s) => (
              <div key={s.num} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent-gold text-black font-display font-extrabold text-lg mb-5">
                  {s.num}
                </div>
                <h3 className="font-display font-bold text-2xl text-navy mb-3">
                  {s.title}
                </h3>
                <p className="font-body text-text-secondary text-base leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 items-center">
            <div className="flex justify-center">
              <div className="w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden border-2 border-accent-gold/30 shadow-lg">
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
              <p className="font-body text-sm font-bold uppercase tracking-eyebrow text-accent-gold mb-4">
                About
              </p>
              <h2 className="font-display font-extrabold text-[clamp(26px,3.5vw,40px)] uppercase text-navy leading-tight mb-4">
                Matthew Landon
              </h2>
              <p className="font-body text-text-secondary text-lg leading-relaxed mb-2">
                Founder, Scale Enterprises
              </p>
              <p className="font-body text-text-secondary text-base leading-relaxed">
                Direct response marketer and operator who builds growth systems
                for owner-led businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0a0a0f] via-bg-navy to-[#0a0a0f] text-white py-24 md:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(240,192,48,0.08),transparent_70%)] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-5 text-center">
          <h2 className="font-display font-extrabold text-[clamp(26px,4.5vw,48px)] uppercase leading-tight mb-6">
            Ready to build a business{" "}
            <span className="bg-gradient-to-r from-accent-gold via-yellow-300 to-accent-gold bg-clip-text text-transparent">
              that runs without you?
            </span>
          </h2>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-accent-gold via-[#E8B820] to-accent-gold text-black font-body font-bold text-sm uppercase tracking-widest px-10 py-5 rounded-full shadow-[0_0_30px_rgba(240,192,48,0.25),0_8px_32px_rgba(240,192,48,0.2)] hover:brightness-110 hover:-translate-y-0.5 transition-all"
          >
            Book a Call &rarr;
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-black text-white/30 text-center py-8 px-5 text-sm font-body">
        <p>
          &copy; {new Date().getFullYear()} Scale Enterprises LLC. All rights
          reserved.
        </p>
        <p className="mt-2 space-x-2">
          <Link href="/privacy-policy" className="hover:text-white/50 underline">
            Privacy
          </Link>
          <span>&middot;</span>
          <Link href="/terms-of-service" className="hover:text-white/50 underline">
            Terms
          </Link>
          <span>&middot;</span>
          <Link href="/california-privacy" className="hover:text-white/50 underline">
            California Notice
          </Link>
        </p>
      </footer>
    </div>
  );
}
