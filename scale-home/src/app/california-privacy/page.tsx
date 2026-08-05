import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "California Privacy Notice | Scale Enterprises",
};

export default function CaliforniaPrivacy() {
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
            California Privacy Notice
          </h1>
          <p className="text-text-muted text-[13px] font-medium mb-12">Last updated: August 5, 2026</p>
          <div className="w-12 h-[3px] bg-accent-gold rounded-sm mb-12" />

          <div className="space-y-6 font-body text-[15px] leading-[1.8] text-text-secondary">
            <p>
              This California Privacy Notice (&ldquo;Notice&rdquo;) supplements the{" "}
              <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-accent-gold font-semibold underline underline-offset-[3px] hover:text-navy transition-colors duration-200">
                Scale Enterprises Privacy Policy
              </a>{" "}
              and applies solely to residents of the State of California. It is provided pursuant to the
              California Consumer Privacy Act of 2018, as amended by the California Privacy Rights Act of
              2020 (collectively, &ldquo;CCPA&rdquo;).
            </p>

            {/* ── 1. CATEGORIES OF PERSONAL INFORMATION ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">1. Categories of Personal Information We Collect</h2>
            <p>
              In the preceding 12 months, we have collected the following categories of personal information
              from California consumers:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-navy font-bold">Identifiers:</strong> Name, email address, phone number,
                IP address, and account credentials.
              </li>
              <li>
                <strong className="text-navy font-bold">Commercial Information:</strong> Business name, annual
                revenue, industry, business type, number of employees, and records of services purchased or
                considered.
              </li>
              <li>
                <strong className="text-navy font-bold">Internet or Electronic Network Activity:</strong> Browsing
                history on our website, search history, pages visited, clickstream data, and interactions with our
                emails and advertisements.
              </li>
              <li>
                <strong className="text-navy font-bold">Professional or Employment-Related Information:</strong>{" "}
                Job title, role, and business responsibilities as provided through our application process.
              </li>
              <li>
                <strong className="text-navy font-bold">Inferences:</strong> Business stage, readiness for
                transformation services, and other profiles drawn from the information above to better serve you.
              </li>
            </ul>

            {/* ── 2. SOURCES ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">2. Sources of Personal Information</h2>
            <p>We collect personal information from the following sources:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Directly from you when you submit forms, applications, or communicate with us</li>
              <li>Automatically through cookies, pixels, and similar technologies when you visit our website</li>
              <li>From third-party analytics and advertising platforms (e.g., Google Analytics, Meta, Microsoft Clarity)</li>
              <li>From CRM and marketing automation platforms we use to manage our business</li>
            </ul>

            {/* ── 3. PURPOSES ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">3. Business and Commercial Purposes for Collection</h2>
            <p>We collect and use personal information for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Processing applications and enrolling clients in our programs</li>
              <li>Providing and delivering our Services</li>
              <li>Communicating with you about your account, applications, and our Services</li>
              <li>Processing payments and managing billing</li>
              <li>Marketing and advertising, including sending promotional communications (with your consent)</li>
              <li>Analyzing website usage and improving our Services</li>
              <li>Detecting and preventing fraud and security incidents</li>
              <li>Complying with legal obligations</li>
            </ul>

            {/* ── 4. SALE AND SHARING ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">4. Sale and Sharing of Personal Information</h2>
            <p>
              <strong className="text-navy font-bold">We do not sell your personal information</strong> for
              monetary consideration.
            </p>
            <p>
              Under the CCPA, &ldquo;sharing&rdquo; includes making personal information available to third
              parties for cross-context behavioral advertising. We may share certain identifiers and internet
              activity data with advertising partners (such as Meta and Google) for the purpose of delivering
              targeted advertisements. You have the right to opt out of this sharing.
            </p>

            {/* ── 5. DISCLOSURE TO THIRD PARTIES ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">5. Disclosure of Personal Information to Third Parties</h2>
            <p>
              In the preceding 12 months, we have disclosed the following categories of personal information
              to service providers for business purposes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Identifiers — to payment processors, email service providers, CRM platforms, and SMS delivery providers</li>
              <li>Commercial information — to CRM platforms and business analytics tools</li>
              <li>Internet or electronic network activity — to analytics providers and advertising platforms</li>
            </ul>
            <p>
              These service providers are contractually prohibited from using your information for any purpose
              other than performing services on our behalf.
            </p>

            {/* ── 6. YOUR CALIFORNIA RIGHTS ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">6. Your California Privacy Rights</h2>
            <p>As a California resident, you have the following rights under the CCPA:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-navy font-bold">Right to Know:</strong> You have the right to request
                that we disclose the categories and specific pieces of personal information we have collected
                about you, the sources of that information, the purposes for collection, and the categories
                of third parties with whom we have shared it.
              </li>
              <li>
                <strong className="text-navy font-bold">Right to Delete:</strong> You have the right to request
                that we delete your personal information, subject to certain exceptions (e.g., legal obligations,
                completing a transaction, fraud detection).
              </li>
              <li>
                <strong className="text-navy font-bold">Right to Correct:</strong> You have the right to request
                that we correct inaccurate personal information we maintain about you.
              </li>
              <li>
                <strong className="text-navy font-bold">Right to Opt Out of Sale/Sharing:</strong> You have the
                right to opt out of the sale or sharing of your personal information for cross-context behavioral
                advertising.
              </li>
              <li>
                <strong className="text-navy font-bold">Right to Limit Use of Sensitive Personal Information:</strong>{" "}
                We do not collect or process sensitive personal information beyond what is necessary to provide
                our Services.
              </li>
              <li>
                <strong className="text-navy font-bold">Right to Non-Discrimination:</strong> We will not
                discriminate against you for exercising any of your CCPA rights. We will not deny you services,
                charge different prices, or provide a different level of quality because you exercised your rights.
              </li>
            </ul>

            {/* ── 7. HOW TO EXERCISE YOUR RIGHTS ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">7. How to Exercise Your Rights</h2>
            <p>
              To submit a request to know, delete, correct, or opt out, please contact us at:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Email:{" "}
                <a href="mailto:support@scaleenterprises.com" className="text-accent-gold font-semibold underline underline-offset-[3px] hover:text-navy transition-colors duration-200">
                  support@scaleenterprises.com
                </a>
              </li>
            </ul>
            <p>
              We will verify your identity before processing your request by matching the information you
              provide with the information we have on file. We will respond to verifiable requests within
              45 days. If we need additional time, we will notify you of the reason and the extension period
              (up to an additional 45 days).
            </p>
            <p>
              You may designate an authorized agent to submit a request on your behalf. We may require the
              agent to provide proof of written authorization and may verify your identity directly.
            </p>

            {/* ── 8. RETENTION ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">8. Retention of Personal Information</h2>
            <p>
              We retain each category of personal information for as long as reasonably necessary to fulfill
              the purposes for which it was collected, comply with legal obligations, resolve disputes, and
              enforce our agreements. When personal information is no longer needed, we securely delete or
              anonymize it.
            </p>

            {/* ── 9. DO NOT TRACK ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">9. Do Not Track Signals</h2>
            <p>
              Our website does not currently respond to &ldquo;Do Not Track&rdquo; browser signals. However,
              you may opt out of the sharing of your personal information for targeted advertising by
              contacting us as described in Section 7.
            </p>

            {/* ── 10. FINANCIAL INCENTIVES ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">10. Financial Incentives</h2>
            <p>
              We do not offer financial incentives or price or service differences in exchange for the
              retention or sale of your personal information.
            </p>

            {/* ── 11. CHANGES ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">11. Changes to This Notice</h2>
            <p>
              We may update this California Privacy Notice from time to time. We will notify you of material
              changes by posting the updated notice on this page and updating the &ldquo;Last updated&rdquo;
              date. We recommend reviewing this notice periodically.
            </p>

            {/* ── 12. CONTACT ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">12. Contact Us</h2>
            <p>
              If you have questions or concerns about this California Privacy Notice or wish to exercise your
              rights, please contact:
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
