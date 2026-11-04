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
          ],
        }}
      />
      <Navbar />
      <main className="min-h-screen bg-white pt-[128px] pb-24">
        <div className="max-w-[720px] mx-auto px-6">
          <h1 className="font-display text-navy font-extrabold text-3xl lg:text-4xl tracking-tight mb-4">
            Book Your Enterprise Scaling Strategy Call
          </h1>
          <p className="font-body text-text-secondary text-[16px] leading-[1.7] mb-8">
            For owners of service businesses with $500K or more in annual
            revenue who are ready to stop being the bottleneck. On this call we
            will review where your business is today, identify where it depends
            on you, and map the exact system to scale it into a self-running
            enterprise.
          </p>

          <div className="bg-bg-card border border-black/[0.08] rounded-2xl p-8 mb-12">
            <iframe
              src="https://api.leadconnectorhq.com/widget/booking/sca-strategy-call"
              style={{ width: "100%", height: 600, border: "none" }}
              title="Book a Strategy Call"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
