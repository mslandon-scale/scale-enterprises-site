import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Free Course Waitlist: Design, Engineer, Lead",
  description:
    "Join the waitlist for the free Scale Enterprises course on how to design, engineer and lead a service business that runs without you.",
  alternates: { canonical: "/waitlist" },
  openGraph: {
    title: "Free Course Waitlist: Design, Engineer, Lead",
    description:
      "Join the waitlist for the free Scale Enterprises course on how to design, engineer and lead a service business that runs without you.",
    url: "/waitlist",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Course Waitlist: Design, Engineer, Lead",
    description:
      "Join the waitlist for the free Scale Enterprises course on how to design, engineer and lead a service business that runs without you.",
    images: ["/og.png"],
  },
};

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.scaleenterprises.com/" },
            { "@type": "ListItem", position: 2, name: "Free Course Waitlist", item: "https://www.scaleenterprises.com/waitlist" },
          ],
        }}
      />
      {children}
    </>
  );
}
