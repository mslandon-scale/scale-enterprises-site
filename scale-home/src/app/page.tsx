import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  title: {
    absolute:
      "Scale Enterprises | Build a Business That Runs Without You",
  },
  description:
    "Enterprise scaling and development firm for service businesses. Design, Engineer, Lead: strategy, systems and accountability that let your business scale and run without you.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomeContent />;
}
