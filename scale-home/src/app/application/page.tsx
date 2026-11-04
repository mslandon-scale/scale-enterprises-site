import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Apply for Enterprise 360",
  description:
    "Apply for Enterprise 360, the Scale Enterprises program to design, engineer and lead an enterprise-level business that runs without you.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/application" },
};

export default function Application() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-[128px] pb-24">
        <div className="max-w-[720px] mx-auto px-6 text-center">
          <p className="font-body text-[11px] uppercase tracking-[0.2em] text-accent-gold font-bold mb-4">
            Enterprise 360
          </p>
          <h1 className="font-display text-navy font-extrabold text-3xl lg:text-4xl tracking-tight mb-4">
            Apply for Enterprise 360
          </h1>
          <p className="font-body text-text-secondary text-[16px] leading-[1.7] mb-8">
            Enterprise 360 is the Scale Enterprises program to design, engineer
            and lead an enterprise-level business that runs without you.
            Complete the application below to get started.
          </p>
          <div className="bg-bg-card border border-black/[0.08] rounded-2xl p-8">
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/uJ6DlE4M006lIFLyvx8w"
              style={{ width: "100%", height: 500, border: "none" }}
              title="Enterprise 360 Application"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
