import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Book Your Enterprise Scaling Strategy Call",
  description:
    "For service businesses with $500K+ in revenue. Book a free Enterprise Scaling Strategy Call and map how to design, engineer and lead a business that runs without you.",
  alternates: { canonical: "/book" },
};

const bookFaq = [
  {
    "@type": "Question" as const,
    name: "Who is the strategy call for?",
    acceptedAnswer: {
      "@type": "Answer" as const,
      text: "The Enterprise Scaling Strategy Call is for owners of service businesses with $500K or more in annual revenue who are stuck as the operator and are committed to building enterprise-level systems.",
    },
  },
  {
    "@type": "Question" as const,
    name: "What do Design, Engineer and Lead mean?",
    acceptedAnswer: {
      "@type": "Answer" as const,
      text: "Design gives you absolute clarity on where the business is going. Engineer gives you control and makes the numbers work. Lead installs leadership and accountability systems so you can run your business in less than 90 minutes a week.",
    },
  },
  {
    "@type": "Question" as const,
    name: "What happens on the strategy call?",
    acceptedAnswer: {
      "@type": "Answer" as const,
      text: "We review where you are, where the business depends on you, and the exact system to scale it into a self-running enterprise, then decide together whether working with us is a fit.",
    },
  },
];

export default function Book() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              name: "Enterprise Scaling Strategy Call",
              serviceType: "Business scaling and development",
              provider: { "@id": "https://www.scaleenterprises.com/#org" },
              audience: {
                "@type": "BusinessAudience",
                name: "Service businesses with $500K+ in annual revenue",
              },
              url: "https://www.scaleenterprises.com/book",
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.scaleenterprises.com/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Book a Strategy Call",
                  item: "https://www.scaleenterprises.com/book",
                },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: bookFaq,
            },
          ],
        }}
      />
      <Navbar />
      <main className="min-h-screen bg-white pt-[128px] pb-24">
        <div className="max-w-[720px] mx-auto px-6">
          <h1 className="font-display text-navy font-extrabold text-3xl lg:text-4xl tracking-tight mb-4">
            Book Your Enterprise Scaling Strategy Call
          </h1>
          <p className="font-body text-text-secondary text-[16px] leading-[1.7] mb-6">
            For owners of service businesses with $500K or more in annual
            revenue who are ready to stop being the bottleneck and start leading
            an enterprise that runs without them.
          </p>

          <div className="mb-8">
            <h2 className="font-display text-navy font-bold text-lg mb-3">
              What the call covers
            </h2>
            <ul className="space-y-2 font-body text-text-secondary text-[15px] leading-[1.7]">
              <li className="flex gap-2">
                <span className="text-accent-gold font-bold">→</span>
                Where your business is today and where it depends on you
              </li>
              <li className="flex gap-2">
                <span className="text-accent-gold font-bold">→</span>
                The exact system to scale it into a self-running enterprise
              </li>
              <li className="flex gap-2">
                <span className="text-accent-gold font-bold">→</span>
                Whether working together is the right fit
              </li>
            </ul>
          </div>

          <div className="bg-bg-card border border-black/[0.08] rounded-2xl p-8 mb-16">
            <iframe
              src="https://api.leadconnectorhq.com/widget/booking/sca-strategy-call"
              style={{ width: "100%", height: 600, border: "none" }}
              title="Book a Strategy Call"
            />
          </div>

          {/* FAQ */}
          <div className="border-t border-black/[0.06] pt-12">
            <h2 className="font-display text-navy font-extrabold text-2xl mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-0">
              {bookFaq.map((q) => (
                <details
                  key={q.name}
                  className="border-b border-black/[0.06] group"
                >
                  <summary className="flex justify-between items-center py-5 cursor-pointer font-display text-[16px] font-bold text-text-primary hover:text-[#C9A227] transition-colors">
                    {q.name}
                    <span className="text-[#C9A227] text-xl ml-4 group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="pb-5 font-body text-[15px] text-text-secondary leading-[1.7]">
                    {q.acceptedAnswer.text}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
