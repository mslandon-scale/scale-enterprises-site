import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: { absolute: "Scale Enterprises | Build a Business That Runs Without You" },
  description:
    "Enterprise scaling and development firm for service businesses. Design, Engineer, Lead: strategy, systems and accountability that let your business scale and run without you.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Scale Enterprises | Build a Business That Runs Without You",
    description:
      "Enterprise scaling and development firm for service businesses. Design, Engineer, Lead: strategy, systems and accountability that let your business scale and run without you.",
    url: "/",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scale Enterprises | Build a Business That Runs Without You",
    description:
      "Enterprise scaling and development firm for service businesses. Design, Engineer, Lead: strategy, systems and accountability that let your business scale and run without you.",
    images: ["/og.png"],
  },
};

export default function HomePage() {
  return <HomeClient />;
}
