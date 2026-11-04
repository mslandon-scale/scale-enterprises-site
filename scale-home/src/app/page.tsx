import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: {
    absolute:
      "Scale Enterprises | Build a Business That Runs Without You",
  },
  description:
    "Enterprise scaling and development firm for service businesses. Design, Engineer, Lead: strategy, systems and accountability that let your business scale and run without you.",
  alternates: { canonical: "/" },
};

const homeFaq = [
  {
    "@type": "Question" as const,
    name: "What does Scale Enterprises do?",
    acceptedAnswer: {
      "@type": "Answer" as const,
      text: "Scale Enterprises is an enterprise scaling and development firm. We help service-business owners build an enterprise-level business that scales and runs without them, by helping design, engineer and lead the business with enterprise-level strategy, private equity-caliber engineering, and strong leadership and accountability systems, all enabled with AI.",
    },
  },
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
    name: "What results have clients seen?",
    acceptedAnswer: {
      "@type": "Answer" as const,
      text: "Examples include 3X leads in 7 days for a 50-person sales team, 2x profit in 3 months for a trades business, and 500% growth in 6 months for a professional services firm. Results are not typical and vary by business.",
    },
  },
  {
    "@type": "Question" as const,
    name: "Do you take equity in my business?",
    acceptedAnswer: {
      "@type": "Answer" as const,
      text: "No. You keep 100% ownership of your company.",
    },
  },
  {
    "@type": "Question" as const,
    name: "I'm too busy right now. Is this a good time?",
    acceptedAnswer: {
      "@type": "Answer" as const,
      text: "Being too busy to step back is the problem we solve. The goal is a business that runs without you, so you get your time back.",
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

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: homeFaq,
        }}
      />
      <HomeContent />
    </>
  );
}
