import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Scale Enterprises",
  description: "Learn about Scale Enterprises and founder Matthew Landon — helping service businesses become enterprises.",
};

export default function About() {
  return (
    <main className="min-h-screen bg-bg-navy text-white/70">
      <div className="max-w-[720px] mx-auto px-6 py-16">
        <Link
          href="/"
          className="inline-block mb-8 text-sm text-accent-gold hover:underline"
        >
          &larr; Back to Home
        </Link>

        <p className="font-body text-[11px] uppercase tracking-[0.2em] text-accent-gold font-bold mb-4">
          About Us
        </p>
        <h1 className="font-display text-4xl lg:text-5xl tracking-wide text-white font-extrabold uppercase mb-6">
          Scale Enterprises
        </h1>
        <p className="font-body text-[18px] text-white/50 leading-[1.8] mb-12">
          We help service business owners stop running every part of their company and start operating
          as true enterprise leaders. Our mission is simple — build the systems, structure, and team
          so your business runs without you.
        </p>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent-gold/20" />
          <div className="w-2 h-2 rotate-45 border border-accent-gold/40" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent-gold/20" />
        </div>

        {/* Founder section */}
        <div className="mb-12">
          <p className="font-body text-[11px] uppercase tracking-[0.2em] text-accent-gold font-bold mb-3">
            Founder
          </p>
          <h2 className="font-display text-2xl lg:text-3xl text-white font-extrabold uppercase mb-4">
            Matthew Landon
          </h2>
          <div className="space-y-4 font-body text-[16px] text-white/50 leading-[1.8]">
            <p>
              Matthew Landon is the founder of Scale Enterprises and the architect behind the
              Enterprise Transformation system. After spending years in the trenches building,
              scaling, and systemizing service businesses, he developed a repeatable framework
              that turns owner-dependent companies into self-operating enterprises.
            </p>
            <p>
              His approach is built on a simple belief: every service business that does great
              work deserves the infrastructure, leadership structure, and operating systems of
              an enterprise — not just the revenue. Most owners hit a ceiling not because they
              lack talent, but because they lack the systems to remove themselves from daily
              operations.
            </p>
            <p>
              Through the Enterprise 360 and the Enterprise Masterclass, Matthew and his team
              have helped hundreds of service business owners install enterprise-grade systems
              in 30 days — transforming how they operate, hire, deliver, and grow.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent-gold/20" />
          <div className="w-2 h-2 rotate-45 border border-accent-gold/40" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent-gold/20" />
        </div>

        {/* What we do */}
        <div className="mb-12">
          <h2 className="font-display text-2xl lg:text-3xl text-white font-extrabold uppercase mb-6">
            What We Do
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Enterprise Buildout",
                desc: "A full-scale, done-for-you implementation of every system your business needs — operating systems, management structure, KPI dashboards, SOPs, hiring frameworks, and client acquisition engines. Installed in 30 days.",
              },
              {
                title: "Mastermind",
                desc: "Direct access to Matthew Landon and a vetted network of 7- and 8-figure service business owners. Weekly strategy calls, hot-seat coaching, and a private community of operators helping operators.",
              },
              {
                title: "Tools & Resources",
                desc: "Every template, framework, script, and system we use — from the Enterprise Masterclass video library to hiring scorecards, financial models, and sales scripts. Yours to keep forever.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-6"
              >
                <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                <p className="font-body text-[15px] text-white/50 leading-[1.7]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4 pb-8">
          <a
            href="/#apply"
            className="inline-block bg-accent-gold text-white font-bold text-[14px] uppercase tracking-widest px-10 py-4 rounded-full hover:brightness-110 hover:-translate-y-px transition-all duration-200 shadow-[0_8px_32px_rgba(240,192,48,0.25)]"
          >
            Apply For Enterprise 360
          </a>
          <p className="font-body text-[13px] text-white/30 mt-4">
            By application only. Limited to 10 new members per month.
          </p>
        </div>
      </div>
    </main>
  );
}
