import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Scale Enterprises",
};

export default function PrivacyPolicy() {
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
          Privacy Policy
        </h1>
        <p className="text-sm text-white/40 mb-10">Last updated: March 2, 2026</p>

        <div className="space-y-6 font-body text-[15px] leading-[1.7]">
          <p>
            Scale Enterprises (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates scaleenterprises.com. This page
            informs you of our policies regarding the collection, use, and disclosure of personal
            information.
          </p>

          <h2 className="text-white font-bold text-lg pt-4">Information We Collect</h2>
          <p>We collect information you provide directly to us, including:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Name, email address, and phone number submitted through our application form</li>
            <li>Business information such as annual revenue and business type</li>
            <li>Any other information you choose to provide</li>
          </ul>

          <h2 className="text-white font-bold text-lg pt-4">How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Process and respond to your application</li>
            <li>Send you SMS and email communications (with your consent)</li>
            <li>Schedule and conduct consultation calls</li>
            <li>Improve our services and website experience</li>
          </ul>

          <h2 className="text-white font-bold text-lg pt-4">SMS and Email Communications</h2>
          <p>
            By providing your phone number and email and checking the consent box on our application
            form, you agree to receive SMS messages and emails from Scale Enterprises related to your
            application and our services. Message and data rates may apply. You may opt out at any
            time by replying STOP to any SMS or clicking unsubscribe in any email.
          </p>

          <h2 className="text-white font-bold text-lg pt-4">Mobile Information Sharing</h2>
          <p>
            We do not share, sell, rent, or trade your mobile phone number or SMS opt-in data with
            third parties for their marketing purposes. Your mobile information will not be shared
            with third parties or affiliates for marketing or promotional purposes. Information
            sharing with subcontractors or service providers for operational purposes (such as SMS
            delivery providers) is permitted.
          </p>

          <h2 className="text-white font-bold text-lg pt-4">Information Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share
            information with trusted service providers who assist us in operating our website and
            conducting our business, so long as those parties agree to keep this information
            confidential.
          </p>

          <h2 className="text-white font-bold text-lg pt-4">Data Security</h2>
          <p>
            We implement reasonable security measures to protect your personal information. However,
            no method of transmission over the Internet or electronic storage is 100% secure.
          </p>

          <h2 className="text-white font-bold text-lg pt-4">Cookies</h2>
          <p>
            Our website may use cookies to enhance your experience. You can set your browser to
            refuse cookies, though some features of the site may not function properly.
          </p>

          <h2 className="text-white font-bold text-lg pt-4">Third-Party Links</h2>
          <p>
            Our website may contain links to third-party sites. We are not responsible for the
            privacy practices of those sites.
          </p>

          <h2 className="text-white font-bold text-lg pt-4">Children&apos;s Privacy</h2>
          <p>
            Our services are not directed to individuals under 18. We do not knowingly collect
            personal information from children.
          </p>

          <h2 className="text-white font-bold text-lg pt-4">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes
            by posting the new policy on this page and updating the &ldquo;Last updated&rdquo; date.
          </p>

          <h2 className="text-white font-bold text-lg pt-4">Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at{" "}
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
