import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Strategy Call | Scale Enterprises",
  description:
    "Schedule your Enterprise Scaling Strategy session with our team at Scale Enterprises.",
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
