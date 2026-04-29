import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Contact | Scale Enterprises",
};

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-[128px] pb-24">
        <div className="max-w-[780px] mx-auto px-6">
          <h1 className="font-display text-navy font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.1] tracking-[-0.02em] mb-2">
            Contact Us
          </h1>
          <p className="text-text-muted text-[13px] font-medium mb-12">Have a question? We&apos;re here to help.</p>
          <div className="w-12 h-[3px] bg-accent-gold rounded-sm mb-12" />

          <div className="space-y-4 mb-8">
            <div className="bg-bg-card border border-black/[0.08] rounded-2xl p-7">
              <h3 className="font-display text-navy font-bold text-base mb-2">Email</h3>
              <p className="font-body text-[15px] text-text-secondary">
                <a href="mailto:support@scaleenterprises.com" className="text-accent-gold font-semibold underline underline-offset-[3px] hover:text-navy transition-colors duration-200">
                  support@scaleenterprises.com
                </a>
              </p>
            </div>

            <div className="bg-bg-card border border-black/[0.08] rounded-2xl p-7">
              <h3 className="font-display text-navy font-bold text-base mb-2">Apply for the Program</h3>
              <p className="font-body text-[15px] text-text-secondary">
                Ready to transform your business?{" "}
                <a href="/#footer" className="text-accent-gold font-semibold underline underline-offset-[3px] hover:text-navy transition-colors duration-200">
                  Submit an application
                </a>{" "}
                on our main page.
              </p>
            </div>

            <div className="bg-bg-card border border-black/[0.08] rounded-2xl p-7">
              <h3 className="font-display text-navy font-bold text-base mb-2">Business Hours</h3>
              <p className="font-body text-[15px] text-text-secondary">Monday through Friday, 9:00 AM to 5:00 PM EST</p>
            </div>
          </div>

          <p className="text-[13px] text-text-muted">
            Scale Enterprises typically responds within 1 business day.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
