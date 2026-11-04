import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Book Your Enterprise Scaling Strategy Call",
  description:
    "For service businesses with $500K+ in revenue. Book a free Enterprise Scaling Strategy Call and map how to design, engineer and lead a business that runs without you.",
  alternates: { canonical: "/book" },
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Enterprise Scaling Strategy Call",
          serviceType: "Business scaling and development",
          provider: { "@id": "https://www.scaleenterprises.com/#org" },
          audience: {
            "@type": "BusinessAudience",
            name: "Service businesses with $500K+ in annual revenue",
          },
          url: "https://www.scaleenterprises.com/book",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.scaleenterprises.com/" },
            { "@type": "ListItem", position: 2, name: "Book a Strategy Call", item: "https://www.scaleenterprises.com/book" },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Who is the strategy call for?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The Enterprise Scaling Strategy Call is for owners of service businesses with $500K or more in annual revenue who are stuck as the operator and are committed to building enterprise-level systems.",
              },
            },
            {
              "@type": "Question",
              name: "What do Design, Engineer and Lead mean?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Design gives you absolute clarity on where the business is going. Engineer gives you control and makes the numbers work. Lead installs leadership and accountability systems so you can run your business in less than 90 minutes a week.",
              },
            },
            {
              "@type": "Question",
              name: "What happens on the strategy call?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "We review where you are, where the business depends on you, and the exact system to scale it into a self-running enterprise, then decide together whether working with us is a fit.",
              },
            },
          ],
        }}
      />
      {children}
    </>
  );
}
