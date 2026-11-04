import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false, follow: true },
  alternates: { canonical: "/not-a-fit" },
};

export default function NotAFit() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-[520px] text-center">
        <p className="font-body text-[11px] uppercase tracking-[0.2em] text-accent-gold font-bold mb-4">
          Thank You
        </p>
        <h1 className="font-display text-navy font-extrabold text-3xl lg:text-4xl tracking-tight mb-4">
          We Appreciate Your Time
        </h1>
        <p className="font-body text-text-secondary text-[16px] leading-[1.7] mb-8">
          It looks like Scale Enterprises may not be the right fit right now, and
          that is completely okay. We wish you the best on your journey.
        </p>
        <Link
          href="/"
          className="inline-block bg-accent-gold text-black font-bold text-[14px] uppercase tracking-widest px-10 py-4 rounded-full hover:brightness-110 hover:-translate-y-px transition-all duration-200"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
