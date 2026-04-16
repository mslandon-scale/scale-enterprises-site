import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Scale Enterprises",
};

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-[128px] pb-24">
        <div className="max-w-[780px] mx-auto px-6">
          <h1 className="font-display text-navy font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.1] tracking-[-0.02em] mb-2">
            Terms of Service
          </h1>
          <p className="text-text-muted text-[13px] font-medium mb-12">Last updated: March 2, 2026</p>
          <div className="w-12 h-[3px] bg-accent-gold rounded-sm mb-12" />

          <div className="space-y-6 font-body text-[15px] leading-[1.8] text-text-secondary">
            <p>
              Please read these Terms of Service (&ldquo;Terms&rdquo;) carefully before using the
              Scale Enterprises website or services.
            </p>

            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">Acceptance of Terms</h2>
            <p>
              By accessing or using our website and services, you agree to be bound by these Terms. If
              you do not agree, please do not use our services.
            </p>

            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">Services</h2>
            <p>
              Scale Enterprises provides business consulting and transformation services for
              service-based businesses. Our program includes strategic planning, system implementation,
              and ongoing support as described on our website.
            </p>

            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">Eligibility</h2>
            <p>
              Our services are designed for service business owners. By applying, you represent that
              you are at least 18 years old and have the authority to enter into these Terms on behalf
              of yourself or your business.
            </p>

            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">Application Process</h2>
            <p>
              Submitting an application does not guarantee acceptance into our program. We reserve the
              right to approve or decline any application at our sole discretion.
            </p>

            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">Payment and Refunds</h2>
            <p>
              Payment terms will be outlined in a separate agreement upon acceptance into our program.
              All fees, refund policies, and payment schedules will be clearly communicated before any
              financial commitment is required.
            </p>

            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, and images, is the property
              of Scale Enterprises and is protected by applicable intellectual property laws. You may
              not reproduce, distribute, or create derivative works without our written permission.
            </p>

            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">SMS Terms</h2>
            <p>
              Scale Enterprises, LLC uses SMS to send appointment reminders, business consulting
              updates, onboarding notifications, and promotional messages to opted-in users.
            </p>
            <p>
              By opting in to receive SMS messages from Scale Enterprises, LLC, you agree to the
              following terms:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-navy font-bold">Opt-Out:</strong> Reply STOP to any message to
                unsubscribe. You will receive one confirmation message and no further SMS messages will
                be sent.
              </li>
              <li>
                <strong className="text-navy font-bold">Help:</strong> Reply HELP to any message for assistance
                or contact us at{" "}
                <a href="mailto:support@scaleenterprises.com" className="text-accent-gold font-semibold underline underline-offset-[3px] hover:text-navy transition-colors duration-200">
                  support@scaleenterprises.com
                </a>
                .
              </li>
              <li>
                <strong className="text-navy font-bold">Message &amp; Data Rates:</strong> Message and data
                rates may apply. Message frequency varies.
              </li>
              <li>
                <strong className="text-navy font-bold">Carrier Liability:</strong> Carriers are not liable for
                delayed or undelivered messages.
              </li>
            </ul>
            <p>
              For information on how we handle your mobile data, please see our{" "}
              <Link href="/privacy-policy" className="text-accent-gold font-semibold underline underline-offset-[3px] hover:text-navy transition-colors duration-200">
                Privacy Policy
              </Link>
              .
            </p>

            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">Earnings Disclaimer</h2>
            <p>
              Results vary and depend on many factors. Any financial figures referenced on this website
              are not guarantees of results. Your results will depend on your effort, business model,
              market conditions, and many other factors beyond our control.
            </p>

            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Scale Enterprises shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages arising from your use
              of our website or services.
            </p>

            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Scale Enterprises, its officers, directors,
              employees, and agents from any claims, damages, or expenses arising from your use of our
              services or violation of these Terms.
            </p>

            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the United
              States, without regard to conflict of law principles.
            </p>

            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective
              immediately upon posting to this page. Your continued use of our services constitutes
              acceptance of the updated Terms.
            </p>

            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">Contact Us</h2>
            <p>
              If you have questions about these Terms, please contact us at{" "}
              <a href="mailto:support@scaleenterprises.com" className="text-accent-gold font-semibold underline underline-offset-[3px] hover:text-navy transition-colors duration-200">
                support@scaleenterprises.com
              </a>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
