import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Terms of Service | Scale Enterprises",
};

export default function TermsOfService() {
  return (
    <>
      <header className="w-full py-8 flex justify-center">
        <a href="https://scaleenterprises.com">
          <Image src="/logo.png" alt="Scale Enterprises" width={48} height={48} className="object-contain" />
        </a>
      </header>
      <main className="min-h-screen bg-white pb-24">
        <div className="max-w-[780px] mx-auto px-6">
          <h1 className="font-display text-navy font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.1] tracking-[-0.02em] mb-2">
            Terms of Service
          </h1>
          <p className="text-text-muted text-[13px] font-medium mb-12">Last updated: August 5, 2026</p>
          <div className="w-12 h-[3px] bg-accent-gold rounded-sm mb-12" />

          <div className="space-y-6 font-body text-[15px] leading-[1.8] text-text-secondary">
            <p>
              Please read these Terms of Service (&ldquo;Terms&rdquo;) carefully before using any website,
              platform, or service operated by Scale Enterprises, LLC (&ldquo;Company,&rdquo; &ldquo;we,&rdquo;
              &ldquo;us,&rdquo; or &ldquo;our&rdquo;), including scaleenterprises.com and all related subdomains
              (collectively, the &ldquo;Services&rdquo;). By accessing or using our Services, you agree to be
              bound by these Terms. If you do not agree, please do not use our Services.
            </p>

            {/* ── 1. SERVICES ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">1. Services</h2>
            <p>
              Scale Enterprises provides business consulting, enterprise transformation services, and related
              programs for service-based business owners. Our offerings include strategic planning, system
              implementation, done-for-you business development, coaching, and ongoing management support as
              described on our website. Specific program terms (including the Enterprise 360 program) are
              governed by their own separate agreements.
            </p>

            {/* ── 2. ELIGIBILITY ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">2. Eligibility</h2>
            <p>
              By using our Services, you represent that you are at least 18 years of age and have the legal
              authority to enter into these Terms on behalf of yourself and/or your business. Our Services
              are designed for business owners and are not intended for consumers or individuals under 18.
            </p>

            {/* ── 3. APPLICATION AND ENROLLMENT ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">3. Application and Enrollment</h2>
            <p>
              Submitting an application or inquiry does not guarantee acceptance into any program. We reserve
              the right to approve or decline any application at our sole discretion. Upon acceptance, you
              will be provided with a separate program agreement outlining specific terms, fees, deliverables,
              and conditions.
            </p>

            {/* ── 4. PAYMENT ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">4. Payment and Fees</h2>
            <p>
              Payment terms for specific programs are outlined in their respective program agreements (e.g.,
              the Enterprise 360 Terms of Service). General terms that apply to all payments:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>All fees are quoted in U.S. Dollars (USD) unless otherwise stated</li>
              <li>You are responsible for ensuring your payment method on file is current and valid</li>
              <li>Refund policies are specific to each program and outlined in the applicable program agreement</li>
              <li>Failure to pay may result in suspension or termination of access to Services</li>
            </ul>

            {/* ── 5. INTELLECTUAL PROPERTY ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">5. Intellectual Property</h2>
            <p>
              All content on our websites and platforms, including but not limited to text, graphics, logos,
              images, videos, frameworks, playbooks, templates, methodologies, software, and course materials,
              is the exclusive property of Scale Enterprises, LLC and is protected by applicable intellectual
              property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works from, publicly display,
              or otherwise exploit any of our content without our prior written permission. Unauthorized use
              may result in termination of your access and legal action.
            </p>

            {/* ── 6. USER CONDUCT ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">6. User Conduct</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Use our Services for any unlawful purpose or in violation of any applicable laws</li>
              <li>Attempt to gain unauthorized access to any part of our Services, systems, or networks</li>
              <li>Interfere with or disrupt the operation of our Services</li>
              <li>Share, redistribute, or resell access to any of our programs, platforms, or materials</li>
              <li>Misrepresent your identity or affiliation with any person or entity</li>
              <li>Use our Services to compete with Scale Enterprises or to develop competing products or services</li>
            </ul>

            {/* ── 7. SMS TERMS ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">7. SMS Terms</h2>
            <p>
              Scale Enterprises, LLC uses SMS to send appointment reminders, business consulting updates,
              onboarding notifications, and promotional messages to opted-in users.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-navy font-bold">Opt-Out:</strong> Reply STOP to any message to
                unsubscribe. You will receive one confirmation message and no further SMS messages will be sent.
              </li>
              <li>
                <strong className="text-navy font-bold">Help:</strong> Reply HELP to any message for assistance
                or contact us at{" "}
                <a href="mailto:support@scaleenterprises.com" className="text-accent-gold font-semibold underline underline-offset-[3px] hover:text-navy transition-colors duration-200">
                  support@scaleenterprises.com
                </a>.
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
              <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-accent-gold font-semibold underline underline-offset-[3px] hover:text-navy transition-colors duration-200">
                Privacy Policy
              </a>.
            </p>

            {/* ── 8. EARNINGS DISCLAIMER ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">8. Earnings Disclaimer</h2>
            <p>
              Results vary and depend on many factors. Any financial figures, revenue examples, or income
              references on our website or in our marketing materials are not guarantees of results. They
              represent individual outcomes and should not be interpreted as typical, expected, or guaranteed.
            </p>
            <p>
              Your results will depend on your effort, business model, industry, market conditions, execution,
              and many other factors beyond our control. You accept full responsibility for your own business
              decisions and results.
            </p>

            {/* ── 9. THIRD-PARTY SERVICES ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">9. Third-Party Services and Links</h2>
            <p>
              Our Services may integrate with or contain links to third-party websites, platforms, or services
              (e.g., payment processors, scheduling tools, CRM platforms). We are not responsible for the
              content, privacy practices, or terms of any third-party services. Your use of third-party
              services is governed by their respective terms and policies.
            </p>

            {/* ── 10. DISCLAIMER OF WARRANTIES ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">10. Disclaimer of Warranties</h2>
            <p>
              Our Services are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties
              of any kind, either express or implied, including but not limited to implied warranties of
              merchantability, fitness for a particular purpose, and non-infringement. We do not warrant
              that our Services will be uninterrupted, error-free, or secure.
            </p>

            {/* ── 11. LIMITATION OF LIABILITY ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">11. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Scale Enterprises, LLC, its owners, officers, directors,
              employees, agents, and affiliates shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, including but not limited to loss of profits, revenue, data,
              or business opportunities, arising out of or related to your use of our Services, regardless of
              the theory of liability.
            </p>
            <p>
              In no event shall the total aggregate liability of Scale Enterprises exceed the total fees
              actually paid by you to Scale Enterprises in the twelve (12) months preceding the event giving
              rise to the claim.
            </p>

            {/* ── 12. INDEMNIFICATION ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">12. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Scale Enterprises, LLC, its owners, officers,
              directors, employees, agents, and affiliates from and against any and all claims, damages, losses,
              liabilities, costs, and expenses (including reasonable attorney&apos;s fees) arising out of or
              related to: (a) your use of our Services; (b) your violation of these Terms; (c) your violation
              of any applicable law; or (d) any third-party claims related to your business operations.
            </p>

            {/* ── 13. GOVERNING LAW ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">13. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of
              Delaware, without regard to conflict of law principles.
            </p>

            {/* ── 14. DISPUTE RESOLUTION ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">14. Dispute Resolution</h2>
            <p>
              Any dispute arising out of or relating to these Terms shall first be addressed through good-faith
              negotiation between the parties. If the dispute cannot be resolved within 30 days, either party
              may pursue binding arbitration administered in accordance with the rules of the American
              Arbitration Association. Arbitration shall take place in the state in which Scale Enterprises, LLC
              is registered. Each party shall bear its own costs and attorney&apos;s fees unless the arbitrator
              determines otherwise.
            </p>
            <p>
              Both parties waive the right to participate in any class action lawsuit or class-wide arbitration
              related to these Terms.
            </p>

            {/* ── 15. TERMINATION ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">15. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to our Services at any time, with or
              without cause, and with or without notice. Upon termination, your right to use our Services
              ceases immediately. Provisions that by their nature should survive termination (including
              intellectual property, limitation of liability, indemnification, and dispute resolution) shall
              survive.
            </p>

            {/* ── 16. SEVERABILITY ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">16. Severability</h2>
            <p>
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions
              shall remain in full force and effect. The invalid provision shall be modified to the minimum
              extent necessary to make it valid and enforceable.
            </p>

            {/* ── 17. ENTIRE AGREEMENT ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">17. Entire Agreement</h2>
            <p>
              These Terms, together with our{" "}
              <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-accent-gold font-semibold underline underline-offset-[3px] hover:text-navy transition-colors duration-200">
                Privacy Policy
              </a>{" "}
              and any applicable program agreements, constitute the entire agreement between you and Scale
              Enterprises, LLC with respect to your use of our Services. No modification of these Terms shall
              be effective unless made in writing by Scale Enterprises.
            </p>

            {/* ── 18. CHANGES ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">18. Changes to These Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective immediately
              upon posting to this page and updating the &ldquo;Last updated&rdquo; date. Your continued use
              of our Services after any changes constitutes acceptance of the updated Terms.
            </p>

            {/* ── 19. CONTACT ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">19. Contact Us</h2>
            <p>
              If you have questions about these Terms, please contact:
            </p>
            <p className="pl-5">
              <strong className="text-navy font-bold">Scale Enterprises, LLC</strong><br />
              Email:{" "}
              <a href="mailto:support@scaleenterprises.com" className="text-accent-gold font-semibold underline underline-offset-[3px] hover:text-navy transition-colors duration-200">
                support@scaleenterprises.com
              </a><br />
              Website:{" "}
              <a href="https://scaleenterprises.com" className="text-accent-gold font-semibold underline underline-offset-[3px] hover:text-navy transition-colors duration-200">
                scaleenterprises.com
              </a>
            </p>
          </div>
        </div>
      </main>
      <footer className="py-8 text-center text-[12px] text-text-muted">
        &copy; 2026 Scale Enterprises, LLC &middot;{" "}
        <a href="https://scaleenterprises.com" className="text-text-muted hover:text-navy transition-colors duration-200">
          scaleenterprises.com
        </a>
      </footer>
    </>
  );
}
