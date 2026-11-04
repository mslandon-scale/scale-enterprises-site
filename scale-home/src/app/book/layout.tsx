import type { Metadata } from "next";

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
  return <>{children}</>;
}
