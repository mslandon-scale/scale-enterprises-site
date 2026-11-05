import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/sections/Footer";
import GhlFormEmbed from "@/components/GhlFormEmbed";

// TODO(Matthew): paste the GoHighLevel CONTACT form ID here (GHL > Sites > Forms > embed code, the id after /widget/form/).
// Until then the page shows a clearly marked placeholder. No custom form code exists on this page.
const GHL_CONTACT_FORM_ID = "REPLACE_WITH_GHL_CONTACT_FORM_ID";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Scale Enterprises. Email support@scaleenterprises.com or apply for the Enterprise 360 program.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Scale Enterprises",
    description:
      "Get in touch with Scale Enterprises. Email support@scaleenterprises.com or apply for the Enterprise 360 program.",
    url: "/contact",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Scale Enterprises",
    description:
      "Get in touch with Scale Enterprises. Email support@scaleenterprises.com or apply for the Enterprise 360 program.",
    images: ["/og.png"],
  },
};

export default function Contact() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-white pt-12 pb-24">
        <div className="max-w-[780px] mx-auto px-6">
          <h1 className="font-display text-navy font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.1] tracking-[-0.02em] mb-2">
            Contact Us
          </h1>
          <p className="text-text-muted text-[13px] font-medium mb-12">Have a question? We&apos;re here to help.</p>
          <div className="w-12 h-[3px] bg-accent-gold rounded-sm mb-12" />

          <div className="mb-8 rounded-2xl border border-black/[0.08] bg-white p-4 sm:p-6">
            <h2 className="font-display text-navy font-bold text-lg mb-4">Send us a message</h2>
            <GhlFormEmbed formId={GHL_CONTACT_FORM_ID} title="Contact Form" placeholderLabel="The contact form" />
          </div>

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
                <a href="https://go.scaleenterprises.com/ent360" className="text-accent-gold font-semibold underline underline-offset-[3px] hover:text-navy transition-colors duration-200">
                  Submit an application
                </a>.
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
