import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Free Course Waitlist: Design, Engineer, Lead",
  description:
    "Join the waitlist for the free Scale Enterprises course on how to design, engineer and lead a service business that runs without you.",
  alternates: { canonical: "/waitlist" },
};

export default function Waitlist() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.scaleenterprises.com/" },
            { "@type": "ListItem", position: 2, name: "Free Course Waitlist", item: "https://www.scaleenterprises.com/waitlist" },
          ],
        }}
      />
      <Navbar />
      <main className="min-h-screen bg-white pt-[128px] pb-24">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <p className="font-body text-[11px] uppercase tracking-[0.2em] text-accent-gold font-bold mb-4">
            Free Course
          </p>
          <h1 className="font-display text-navy font-extrabold text-3xl lg:text-4xl tracking-tight mb-4">
            Design, Engineer, Lead
          </h1>
          <p className="font-body text-text-secondary text-[16px] leading-[1.7] mb-8">
            Join the waitlist for the free Scale Enterprises course on how to
            design, engineer and lead a service business that runs without you.
            We will notify you as soon as it launches.
          </p>
          <div className="bg-bg-card border border-black/[0.08] rounded-2xl p-8">
            <p className="font-body text-text-muted text-[14px] mb-4">
              Enter your email to join the waitlist.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 px-4 py-3 border border-black/10 rounded-lg font-body text-[15px] text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-gold/40"
              />
              <button
                type="submit"
                className="bg-accent-gold text-black font-bold text-[13px] uppercase tracking-widest px-8 py-3 rounded-full hover:brightness-110 transition-all duration-200"
              >
                Join Waitlist
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
