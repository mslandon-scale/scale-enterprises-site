import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Enterprise 360 Terms of Service | Scale Enterprises",
  robots: { index: false, follow: false },
};

export default function Ent360Terms() {
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
            Enterprise 360 &mdash; Terms of Service
          </h1>
          <p className="text-text-muted text-[13px] font-medium mb-12">Effective Date: July 28, 2026</p>
          <div className="w-12 h-[3px] bg-accent-gold rounded-sm mb-12" />

          <div className="space-y-6 font-body text-[15px] leading-[1.8] text-text-secondary">
            <p>
              These Terms of Service (&ldquo;Agreement&rdquo;) constitute a legally binding contract between you
              (&ldquo;Client,&rdquo; &ldquo;you,&rdquo; or &ldquo;your&rdquo;) and Scale Enterprises, LLC
              (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) governing your
              participation in the Enterprise 360 twelve-month partnership program (&ldquo;Program&rdquo;). By clicking &ldquo;I Accept the
              Terms of Service&rdquo; on your order form, you acknowledge that you have read, understood, and agree
              to be bound by this Agreement in its entirety.
            </p>

            {/* ── 1. PROGRAM DESCRIPTION ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">1. Program Description</h2>
            <p>
              Enterprise 360 is a 12-month done-for-you enterprise transformation partnership for service-based
              business owners building scalable enterprises. Scale Enterprises embeds with your team to build,
              install, and manage the core systems required to scale your business. The partnership includes
              weekly leadership meetings, monthly reviews, and quarterly strategic planning sessions throughout
              the full 12-month engagement.
            </p>

            <h3 className="font-display text-navy font-bold text-[1rem] pt-2">What Is Included</h3>
            <p>The Program includes the following eight (8) core deliverables:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-navy font-bold">Full Strategy Build-Out:</strong>{" "}
                Market positioning, growth roadmap, competitive analysis, and execution plan (done for you).
              </li>
              <li>
                <strong className="text-navy font-bold">Business Model Development:</strong>{" "}
                Scalable business model designed to reach $10M ARR, built with your approval (done for you).
              </li>
              <li>
                <strong className="text-navy font-bold">Leadership System &amp; Leader Development:</strong>{" "}
                Leadership operating system installation plus ongoing coaching to develop you as an enterprise leader (built and coached).
              </li>
              <li>
                <strong className="text-navy font-bold">Customer Acquisition Funnel &amp; Revenue Management:</strong>{" "}
                Landing pages, email sequences, and ad campaigns built for you; sales process coaching provided (funnel built, sales coached).
              </li>
              <li>
                <strong className="text-navy font-bold">Financial Roadmap &amp; Cash Flow System:</strong>{" "}
                Unit economics, scaling plan, and cash flow visibility integration (done for you).
              </li>
              <li>
                <strong className="text-navy font-bold">Recruiting, Team Building &amp; Team Management:</strong>{" "}
                Job advertisements, job descriptions, and candidate vetting support; your team handles onboarding and training (recruiting support provided).
              </li>
              <li>
                <strong className="text-navy font-bold">Ongoing Management:</strong>{" "}
                Weekly leadership meetings, monthly performance reviews, and quarterly strategic planning sessions (embedded with your team).
              </li>
              <li>
                <strong className="text-navy font-bold">Tech &amp; AI Implementation:</strong>{" "}
                CRM setup, AI tools, websites, and custom systems built and integrated into your operations (built and integrated).
              </li>
            </ul>

            <h3 className="font-display text-navy font-bold text-[1rem] pt-2">What Is Not Included</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Inventory, product sourcing, or service fulfillment</li>
              <li>Hands-on employee skills training</li>
              <li>Direct management of your employees</li>
              <li>Execution of traditional or guerilla marketing campaigns</li>
              <li>HR compliance services</li>
              <li>Licensed legal, tax, or accounting services</li>
              <li>Equity or revenue share arrangements</li>
              <li>Services or deliverables beyond those explicitly listed above</li>
            </ul>

            {/* ── 2. ENROLLMENT & AVAILABILITY ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">2. Enrollment, Eligibility &amp; Availability</h2>
            <p>
              The Program is designed for service-based business owners. By enrolling, you represent that you are at
              least 18 years of age, have the legal authority to enter into this Agreement on behalf of yourself
              and/or your business, and have been approved through our application process. Acceptance into the
              Program is at the sole discretion of Scale Enterprises, LLC.
            </p>
            <p>
              Enrollment is limited. Scale Enterprises accepts a limited number of clients at any given time to
              ensure the quality and depth of the done-for-you partnership. Enrollment closes when capacity is filled
              and reopens at the Company&apos;s discretion.
            </p>

            {/* ── 3. FEES & PAYMENT ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">3. Fees &amp; Payment Terms</h2>
            <p>
              Enterprise 360 is a 12-month partnership billed on a monthly recurring basis. By accepting these
              Terms, you agree to pay all fees as outlined on your order form. All fees are quoted in U.S. Dollars (USD).
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-navy font-bold">Monthly Fee:</strong> $3,000 per month, billed monthly for
                12 consecutive months, for a total partnership investment of $36,000. The fee, payment schedule,
                and any applicable terms are set forth on your individual order form.
              </li>
              <li>
                <strong className="text-navy font-bold">Billing Cycle:</strong> Your first payment is due upon
                acceptance of these Terms. Subsequent payments are billed on the same date each month for the
                remaining 11 months.
              </li>
              <li>
                <strong className="text-navy font-bold">Late Payments:</strong> Payments more than 7 days past due
                may result in suspension of deliverables, meetings, platform access, and/or referral to collections.
                A late fee of $50 or 5% of the overdue amount (whichever is greater) may be applied to each late
                payment.
              </li>
              <li>
                <strong className="text-navy font-bold">Declined Payments:</strong> You are responsible for
                ensuring your payment method on file is current and valid.
              </li>
              <li>
                <strong className="text-navy font-bold">No Equity or Revenue Share:</strong> Scale Enterprises does
                not take equity in, or a revenue share from, your business. The monthly fee is the sole compensation
                for services rendered under this Agreement.
              </li>
            </ul>

            {/* ── 4. THE RESULTS GUARANTEE ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">4. The Results Guarantee</h2>
            <p>
              We stand behind our work. If your business does not reach $10M in annualized recurring revenue (ARR)
              by the end of the 12-month partnership, Scale Enterprises will continue working with you at no
              additional cost until you do.
            </p>
            <p>
              <strong className="text-navy font-bold">To qualify for the Results Guarantee, all of the following must be met:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Full and timely payment of all 12 monthly installments</li>
              <li>Attendance at all scheduled weekly leadership meetings (reschedules permitted with 24-hour notice)</li>
              <li>Full participation in monthly reviews and quarterly planning sessions</li>
              <li>Implementation of the strategies, systems, and deliverables developed during the Program</li>
              <li>Honest and transparent communication about business performance, challenges, and operations</li>
            </ul>
            <p>
              Scale Enterprises reserves the right to verify compliance with the above conditions. The Results
              Guarantee does not apply if the Client fails to meet any of the conditions listed above, voluntarily
              withdraws from the Program, or is removed for breach of these Terms. The Guarantee does not entitle
              the Client to a refund of fees already paid; it extends the engagement at no additional cost.
            </p>

            {/* ── 5. CANCELLATION & REFUND POLICY ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">5. Cancellation &amp; Refund Policy</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-navy font-bold">Cooling-Off Period:</strong> You may cancel this Agreement
                within 72 hours of acceptance for a full refund, provided no deliverables have been initiated or
                meetings have been held.
              </li>
              <li>
                <strong className="text-navy font-bold">After 72 Hours:</strong> All fees are non-refundable except
                as provided under the Results Guarantee (Section 4). The 12-month partnership is a committed
                engagement. If you choose to discontinue participation, all remaining monthly payments remain due
                in full.
              </li>
              <li>
                <strong className="text-navy font-bold">Renewal:</strong> At the conclusion of the 12-month
                partnership, the engagement does not automatically renew. Any continuation of services beyond
                the initial term will be agreed upon in writing by both parties at the then-current rate.
              </li>
              <li>
                <strong className="text-navy font-bold">Company-Initiated Cancellation:</strong> If Scale
                Enterprises determines, at its sole discretion, that a Client is not a good fit for the Program,
                we may terminate the engagement and issue a pro-rata refund for the unused portion of the current
                billing period.
              </li>
            </ul>

            {/* ── 6. MEETINGS & PARTICIPATION ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">6. Meetings &amp; Participation</h2>
            <p>
              Full participation is mandatory. The Program includes weekly leadership meetings, monthly performance
              reviews, and quarterly strategic planning sessions scheduled at mutually agreed-upon times throughout
              the 12-month engagement.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-navy font-bold">Rescheduling:</strong> Meetings may be rescheduled with at
                least 24 hours&apos; notice by either party.
              </li>
              <li>
                <strong className="text-navy font-bold">No-Shows:</strong> A missed meeting without 24 hours&apos;
                notice is considered a no-show. Repeated no-shows (3 or more in any quarter) may be considered
                a failure to participate and may disqualify you from the Results Guarantee.
              </li>
              <li>
                <strong className="text-navy font-bold">Implementation:</strong> You are expected to implement the
                strategies and systems developed during the partnership. Scale Enterprises builds and installs the
                systems; you are responsible for adopting and operating them within your business.
              </li>
            </ul>

            {/* ── 7. CLIENT RESPONSIBILITIES ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">7. Client Responsibilities</h2>
            <p>You acknowledge and agree that:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>You are solely responsible for the decisions you make in your business</li>
              <li>You will attend all scheduled meetings and actively participate in the partnership</li>
              <li>You will communicate honestly about your business, goals, financials, and challenges</li>
              <li>You will implement the strategies, systems, and frameworks developed during the Program</li>
              <li>You will provide timely access to systems, accounts, and information necessary for Scale Enterprises to deliver the agreed-upon services</li>
              <li>You understand that results depend on your effort, execution, market conditions, and other factors beyond our control</li>
            </ul>

            {/* ── 8. EARNINGS DISCLAIMER ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">8. Earnings Disclaimer &amp; No Guarantee of Results</h2>
            <p>
              Except as expressly stated in the Results Guarantee (Section 4), Scale Enterprises makes no guarantees
              regarding specific income, revenue, or business results. Any examples, case studies, or testimonials
              referenced in our marketing materials or during the Program represent individual results and are not
              to be interpreted as typical, expected, or guaranteed outcomes.
            </p>
            <p>
              Your results will depend on many factors including but not limited to: your industry, business model,
              effort, execution, market conditions, competition, and economic environment. You accept full
              responsibility for your results. The Results Guarantee (Section 4) is the sole performance-based
              remedy available under this Agreement.
            </p>

            {/* ── 9. CONFIDENTIALITY ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">9. Confidentiality</h2>
            <p>
              Both parties agree to maintain the confidentiality of all proprietary and sensitive information
              exchanged during the Program.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-navy font-bold">Client Obligations:</strong> You agree not to share,
                reproduce, distribute, or disclose any Scale Enterprises proprietary frameworks, playbooks,
                templates, strategies, methodologies, systems, or Program materials (&ldquo;Company IP&rdquo;) with any
                third party without prior written consent. This includes but is not limited to: all deliverables,
                custom-built systems, strategies, funnels, and operational frameworks developed during the engagement.
              </li>
              <li>
                <strong className="text-navy font-bold">Company Obligations:</strong> Scale Enterprises agrees to
                treat all Client business data, financials, strategies, and proprietary information shared during
                the Program as confidential and will not disclose such information to third parties without your
                written consent, except as required by law.
              </li>
              <li>
                <strong className="text-navy font-bold">Access to Systems:</strong> During the engagement, Scale
                Enterprises may require access to your business systems, accounts, and tools to deliver the
                agreed-upon services. All access will be used solely for the purpose of performing work under
                this Agreement.
              </li>
              <li>
                <strong className="text-navy font-bold">Survival:</strong> Confidentiality obligations survive the
                termination or expiration of this Agreement for a period of 2 years.
              </li>
            </ul>

            {/* ── 10. INTELLECTUAL PROPERTY ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">10. Intellectual Property</h2>
            <p>
              All frameworks, methodologies, playbooks, templates, and proprietary tools provided or developed
              during the Program are and remain the exclusive intellectual property of Scale Enterprises, LLC.
              Custom deliverables built specifically for your business (such as funnels, landing pages, and
              business-specific systems) are licensed to you for use in your business for as long as your
              account remains in good standing.
            </p>
            <p>
              You may not resell, sublicense, teach, publish, or create derivative works from any Company IP.
              Violation of this section may result in immediate termination of your Program access and may
              subject you to legal action.
            </p>

            {/* ── 11. NON-DISPARAGEMENT ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">11. Non-Disparagement</h2>
            <p>
              Both parties agree not to make any public statements, whether written or oral, that are disparaging,
              defamatory, or damaging to the reputation of the other party, its officers, directors, employees,
              or affiliates. This does not restrict either party from providing truthful information as required by
              law or in connection with a legal proceeding.
            </p>

            {/* ── 12. TESTIMONIALS & USE OF LIKENESS ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">12. Testimonials &amp; Use of Likeness</h2>
            <p>
              You grant Scale Enterprises permission to use your name, business name, likeness, testimonial, and
              results (including anonymized case studies) for marketing and promotional purposes unless you
              opt out in writing. You may revoke this permission at any time by providing written notice to{" "}
              <a href="mailto:support@scaleenterprises.com" className="text-accent-gold font-semibold underline underline-offset-[3px] hover:text-navy transition-colors duration-200">
                support@scaleenterprises.com
              </a>.
            </p>

            {/* ── 13. LIMITATION OF LIABILITY ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">13. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Scale Enterprises, LLC, its owners, officers, directors,
              employees, agents, and affiliates shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, including but not limited to loss of profits, revenue, data,
              or business opportunities, arising out of or related to this Agreement or your participation in the
              Program, regardless of the theory of liability.
            </p>
            <p>
              In no event shall the total aggregate liability of Scale Enterprises under this Agreement exceed the
              total fees actually paid by you for the Program.
            </p>

            {/* ── 14. INDEMNIFICATION ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">14. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Scale Enterprises, LLC, its owners, officers,
              directors, employees, agents, and affiliates from and against any and all claims, damages, losses,
              liabilities, costs, and expenses (including reasonable attorney&apos;s fees) arising out of or
              related to: (a) your breach of this Agreement; (b) your use or misuse of Program materials or
              deliverables; (c) any actions taken in your business based on strategies developed during the
              Program; or (d) any third-party claims related to your business operations.
            </p>

            {/* ── 15. INDEPENDENT CONTRACTOR ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">15. Independent Contractor Relationship</h2>
            <p>
              The relationship between you and Scale Enterprises is that of independent contractor and client.
              Nothing in this Agreement creates a partnership, joint venture, employment, franchise, or agency
              relationship. Scale Enterprises personnel embedded with your team remain employees or contractors
              of Scale Enterprises, not of your company. Scale Enterprises is not responsible for your business
              decisions, tax obligations, or compliance with applicable laws and regulations.
            </p>

            {/* ── 16. DISPUTE RESOLUTION ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">16. Dispute Resolution</h2>
            <p>
              Any dispute arising out of or relating to this Agreement shall first be addressed through good-faith
              negotiation between the parties. If the dispute cannot be resolved within 30 days, either party may
              pursue binding arbitration administered in accordance with the rules of the American Arbitration
              Association. Arbitration shall take place in the state in which Scale Enterprises, LLC is registered.
              Each party shall bear its own costs and attorney&apos;s fees unless the arbitrator determines otherwise.
            </p>
            <p>
              Both parties waive the right to participate in any class action lawsuit or class-wide arbitration
              related to this Agreement.
            </p>

            {/* ── 17. FORCE MAJEURE ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">17. Force Majeure</h2>
            <p>
              Neither party shall be liable for failure or delay in performance due to causes beyond its reasonable
              control, including but not limited to acts of God, natural disasters, pandemic, war, terrorism,
              government actions, internet or technology failures, or other events beyond reasonable control. In
              such cases, the affected party will provide prompt notice and the Program timeline will be extended
              by the duration of the delay.
            </p>

            {/* ── 18. GOVERNING LAW ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">18. Governing Law</h2>
            <p>
              This Agreement shall be governed by and construed in accordance with the laws of the State of
              Delaware, without regard to conflict of law principles.
            </p>

            {/* ── 19. SEVERABILITY ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">19. Severability</h2>
            <p>
              If any provision of this Agreement is found to be invalid or unenforceable, the remaining provisions
              shall remain in full force and effect. The invalid provision shall be modified to the minimum extent
              necessary to make it valid and enforceable.
            </p>

            {/* ── 20. ENTIRE AGREEMENT ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">20. Entire Agreement</h2>
            <p>
              This Agreement, together with your order form, constitutes the entire agreement between you and Scale
              Enterprises, LLC with respect to the Enterprise 360 Program and supersedes all prior or
              contemporaneous communications, proposals, and agreements, whether oral or written. No modification of
              this Agreement shall be effective unless made in writing and signed by both parties.
            </p>

            {/* ── 21. MODIFICATIONS ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">21. Modifications to Terms</h2>
            <p>
              Scale Enterprises reserves the right to update these Terms at any time. If material changes are made
              after you have enrolled, we will notify you in writing. Your continued participation in the Program
              after receiving notice constitutes acceptance of the updated Terms. The most current version of these
              Terms will always be available at this URL.
            </p>

            {/* ── 22. CONTACT ── */}
            <h2 className="font-display text-navy font-bold text-[1.15rem] pt-4">22. Contact Information</h2>
            <p>
              For questions regarding this Agreement or the Enterprise 360 Program, please contact:
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

            <div className="w-full h-px bg-black/[0.08] my-8" />

            <p className="text-text-muted text-[13px]">
              By clicking &ldquo;I Accept the Terms of Service&rdquo; on your order form, you confirm that you have
              read, understood, and agree to be bound by this Agreement in its entirety.
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
