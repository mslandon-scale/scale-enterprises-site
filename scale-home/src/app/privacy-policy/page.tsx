import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Privacy Policy | Scale Enterprises",
};

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          <p className="text-text-muted text-[13px] font-medium mb-12">Last updated: August 5, 2026</p>
          <div className="w-12 h-[3px] bg-accent-gold rounded-sm mb-12" />

          <div className="space-y-6 font-body text-[15px] leading-[1.8] text-text-secondary">
            <p>
              Scale Enterprises, LLC (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
              operates the website scaleenterprises.com and all related subdomains, platforms, and services
              (collectively, the &ldquo;Services&rdquo;). This Privacy Policy explains how we collect, use,
              disclose, and protect your personal information when you visit our website, use our Services,
              or interact with us in any way.
            </p>
            <p>
              By accessing or using our Services, you agree to this Privacy Policy. If you do not agree,
              please do not use our Services.
            </p>

            {/* ── 1. INFORMATION WE COLLECT ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">1. Information We Collect</h2>

            <p className="font-semibold text-navy">Information You Provide Directly</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Name, email address, phone number, and business name submitted through application forms, contact forms, or order forms</li>
              <li>Business information such as annual revenue, industry, business type, and number of employees</li>
              <li>Payment information (processed securely through third-party payment processors; we do not store full credit card numbers)</li>
              <li>Communications you send to us via email, SMS, or other channels</li>
              <li>Any other information you voluntarily provide</li>
            </ul>

            <p className="font-semibold text-navy pt-2">Information Collected Automatically</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>IP address, browser type, operating system, and device information</li>
              <li>Pages visited, time spent on pages, referring URLs, and clickstream data</li>
              <li>Cookies, pixel tags, and similar tracking technologies (see Section 6)</li>
              <li>Location data derived from your IP address</li>
            </ul>

            <p className="font-semibold text-navy pt-2">Information from Third Parties</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Analytics providers (e.g., Google Analytics, Microsoft Clarity)</li>
              <li>Advertising platforms (e.g., Meta, Google Ads) for conversion tracking and audience optimization</li>
              <li>CRM and marketing automation platforms</li>
            </ul>

            {/* ── 2. HOW WE USE YOUR INFORMATION ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Process and respond to your application or inquiry</li>
              <li>Deliver our Services, including the Enterprise 360 program</li>
              <li>Send you SMS and email communications related to your application, account, or our Services (with your consent)</li>
              <li>Schedule and conduct consultation calls and meetings</li>
              <li>Process payments and manage billing</li>
              <li>Improve our website, Services, and user experience</li>
              <li>Send marketing communications (with your consent; you may opt out at any time)</li>
              <li>Comply with legal obligations and enforce our agreements</li>
              <li>Detect and prevent fraud or unauthorized access</li>
            </ul>

            {/* ── 3. SMS AND EMAIL COMMUNICATIONS ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">3. SMS and Email Communications</h2>
            <p>
              By providing your phone number and/or email address and opting in through our application or
              order forms, you agree to receive SMS messages and emails from Scale Enterprises related to
              your application, account, and our Services. Message and data rates may apply. Message frequency
              varies.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-navy font-bold">Opt-Out (SMS):</strong> Reply STOP to any SMS message to
                unsubscribe. You will receive one confirmation message and no further SMS messages will be sent.
              </li>
              <li>
                <strong className="text-navy font-bold">Opt-Out (Email):</strong> Click the unsubscribe link in
                any marketing email. Transactional emails related to your account or active services may still be sent.
              </li>
              <li>
                <strong className="text-navy font-bold">Help:</strong> Reply HELP to any SMS message for assistance,
                or contact us at support@scaleenterprises.com.
              </li>
            </ul>

            {/* ── 4. MOBILE INFORMATION ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">4. Mobile Information Sharing</h2>
            <p>
              We do not sell, rent, or trade your mobile phone number or SMS opt-in data with third parties
              for their marketing purposes. Your mobile information will not be shared with third parties or
              affiliates for marketing or promotional purposes. Information sharing with subcontractors or
              service providers for operational purposes (such as SMS delivery providers) is permitted.
            </p>

            {/* ── 5. INFORMATION SHARING AND DISCLOSURE ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">5. Information Sharing and Disclosure</h2>
            <p>
              We do not sell your personal information. We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-navy font-bold">Service Providers:</strong> With trusted third-party vendors
                who assist us in operating our website, processing payments, delivering communications, and
                conducting our business (e.g., payment processors, CRM platforms, email service providers, analytics
                providers). These parties are contractually obligated to keep your information confidential.
              </li>
              <li>
                <strong className="text-navy font-bold">Legal Compliance:</strong> When required by law, subpoena,
                court order, or government request, or when we believe disclosure is necessary to protect our rights,
                your safety, or the safety of others.
              </li>
              <li>
                <strong className="text-navy font-bold">Business Transfers:</strong> In connection with a merger,
                acquisition, reorganization, or sale of assets, your information may be transferred as part of that
                transaction.
              </li>
              <li>
                <strong className="text-navy font-bold">With Your Consent:</strong> When you have given us explicit
                permission to share your information.
              </li>
            </ul>

            {/* ── 6. COOKIES AND TRACKING ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">6. Cookies and Tracking Technologies</h2>
            <p>
              Our website uses cookies, pixels, and similar technologies to enhance your experience, analyze
              usage, and support our marketing efforts. These include:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-navy font-bold">Essential Cookies:</strong> Required for the website to
                function properly (e.g., session management).
              </li>
              <li>
                <strong className="text-navy font-bold">Analytics Cookies:</strong> Help us understand how visitors
                interact with our website (e.g., Google Analytics, Microsoft Clarity).
              </li>
              <li>
                <strong className="text-navy font-bold">Advertising Cookies:</strong> Used to deliver relevant
                advertisements and track conversions across platforms (e.g., Meta Pixel, Google Ads).
              </li>
            </ul>
            <p>
              You can manage your cookie preferences through your browser settings. Disabling certain cookies
              may affect the functionality of our website.
            </p>

            {/* ── 7. DATA SECURITY ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">7. Data Security</h2>
            <p>
              We implement reasonable administrative, technical, and physical security measures to protect
              your personal information from unauthorized access, alteration, disclosure, or destruction.
              However, no method of transmission over the Internet or electronic storage is 100% secure,
              and we cannot guarantee absolute security.
            </p>

            {/* ── 8. DATA RETENTION ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">8. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes described
              in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our
              agreements. When your information is no longer needed, we will securely delete or anonymize it.
            </p>

            {/* ── 9. YOUR RIGHTS ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">9. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate or incomplete information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of the sale or sharing of your personal information</li>
              <li>Opt out of targeted advertising</li>
              <li>Withdraw consent for marketing communications at any time</li>
              <li>Request portability of your data</li>
              <li>Not be discriminated against for exercising your privacy rights</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at{" "}
              <a href="mailto:support@scaleenterprises.com" className="text-accent-gold font-semibold underline underline-offset-[3px] hover:text-navy transition-colors duration-200">
                support@scaleenterprises.com
              </a>. We will respond to verifiable requests within the timeframe required by applicable law.
            </p>
            <p>
              For California-specific rights under the CCPA/CPRA, please see our{" "}
              <a href="/california-privacy" target="_blank" rel="noopener noreferrer" className="text-accent-gold font-semibold underline underline-offset-[3px] hover:text-navy transition-colors duration-200">
                California Privacy Notice
              </a>.
            </p>

            {/* ── 10. THIRD-PARTY LINKS ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">10. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites or services. We are not responsible for
              the privacy practices or content of those sites. We encourage you to review the privacy policies
              of any third-party site you visit.
            </p>

            {/* ── 11. CHILDREN'S PRIVACY ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">11. Children&apos;s Privacy</h2>
            <p>
              Our Services are not directed to individuals under the age of 18. We do not knowingly collect
              personal information from children. If we become aware that we have collected information from
              a child under 18, we will take steps to delete it promptly.
            </p>

            {/* ── 12. CHANGES ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">12. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of material changes by
              posting the updated policy on this page and updating the &ldquo;Last updated&rdquo; date. Your
              continued use of our Services after any changes constitutes acceptance of the updated policy.
            </p>

            {/* ── 13. CONTACT ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">13. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy or our data practices, please contact:
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
