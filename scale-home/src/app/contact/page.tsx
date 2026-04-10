import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | Scale Enterprises",
};

export default function Contact() {
  return (
    <main className="min-h-screen bg-bg-navy text-white/70">
      <div className="max-w-[720px] mx-auto px-6 py-16">
        <Link
          href="/"
          className="inline-block mb-8 text-sm text-accent-gold hover:underline"
        >
          &larr; Back to Home
        </Link>

        <h1 className="font-display text-4xl tracking-wide text-white mb-2">
          Contact Us
        </h1>
        <p className="text-sm text-white/40 mb-10">Have a question? We are here to help.</p>

        <div className="space-y-4 mb-8">
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-6">
            <h3 className="text-white font-bold text-base mb-2">Email</h3>
            <p className="font-body text-[15px]">
              <a href="mailto:support@scaleenterprises.com" className="text-accent-gold hover:underline">
                support@scaleenterprises.com
              </a>
            </p>
          </div>

          <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-6">
            <h3 className="text-white font-bold text-base mb-2">Apply for the Program</h3>
            <p className="font-body text-[15px]">
              Ready to transform your business?{" "}
              <Link href="/#apply" className="text-accent-gold hover:underline">
                Submit an application
              </Link>{" "}
              on our main page.
            </p>
          </div>

          <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-6">
            <h3 className="text-white font-bold text-base mb-2">Business Hours</h3>
            <p className="font-body text-[15px]">Monday through Friday, 9:00 AM to 5:00 PM EST</p>
          </div>
        </div>

        <p className="text-sm text-white/30">
          Scale Enterprises typically responds within 1 business day.
        </p>
      </div>
    </main>
  );
}
