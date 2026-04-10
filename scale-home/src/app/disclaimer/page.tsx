import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer | Scale Enterprises",
};

export default function Disclaimer() {
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
          Disclaimer
        </h1>
        <p className="text-sm text-white/40 mb-10">Last updated: February 27, 2026</p>

        <div className="space-y-6 font-body text-[15px] leading-[1.7]">
          <h2 className="text-white font-bold text-lg pt-4">General Disclaimer</h2>
          <p>
            The information provided by Scale Enterprises on our website and through our services is
            for general informational and educational purposes only. All information is provided in
            good faith. However, we make no representation or warranty of any kind, express or
            implied, regarding the accuracy, adequacy, validity, reliability, or completeness of any
            information.
          </p>

          <h2 className="text-white font-bold text-lg pt-4">Earnings Disclaimer</h2>
          <p>
            Any earnings or income statements, or examples of earnings or income, are only estimates
            of what we think you could potentially earn. There is no assurance you will do as well.
            If you rely upon our figures, you must accept the risk of not doing as well.
          </p>
          <p>
            Where specific income figures are used, they represent individual results and are not
            typical. Your results will vary and depend on many factors, including but not limited to
            your background, experience, work ethic, market conditions, and business model.
          </p>
          <p>
            There is no guarantee that you will achieve any particular results using the techniques,
            ideas, or strategies presented. We do not guarantee that you will earn any money using
            our methods.
          </p>

          <h2 className="text-white font-bold text-lg pt-4">Professional Advice Disclaimer</h2>
          <p>
            The content on this website is not intended to be a substitute for professional legal,
            financial, or business advice. Always seek the advice of qualified professionals with any
            questions you may have regarding your business decisions.
          </p>

          <h2 className="text-white font-bold text-lg pt-4">Testimonials Disclaimer</h2>
          <p>
            Testimonials on this website are from real clients but reflect their individual
            experiences and opinions. Results are not typical, and your experience may differ.
            Testimonials are not intended to represent or guarantee that anyone will achieve the same
            or similar results.
          </p>

          <h2 className="text-white font-bold text-lg pt-4">External Links Disclaimer</h2>
          <p>
            Our website may contain links to external websites that are not provided or maintained by
            us. We do not guarantee the accuracy, relevance, or completeness of any information on
            these external sites.
          </p>

          <h2 className="text-white font-bold text-lg pt-4">Contact Us</h2>
          <p>
            If you have questions about this Disclaimer, please contact us at{" "}
            <a href="mailto:support@scaleenterprises.com" className="text-accent-gold hover:underline">
              support@scaleenterprises.com
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
