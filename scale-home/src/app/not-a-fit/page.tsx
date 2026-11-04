import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Not Yet",
  description:
    "You're not quite there yet, but we want to help you get started. A resource is on its way.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/not-a-fit" },
  openGraph: {
    title: "Not Yet | Scale Enterprises",
    description:
      "You're not quite there yet, but we want to help you get started. A resource is on its way.",
    url: "https://www.scaleenterprises.com/not-a-fit",
    siteName: "Scale Enterprises",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Not Yet | Scale Enterprises",
    description:
      "You're not quite there yet, but we want to help you get started. A resource is on its way.",
    images: ["/og.png"],
  },
};

export default function NotAFitPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Spacer for fixed navbar */}
      <div className="h-[80px]" />

      <section className="bg-white py-16 md:py-24">
        <div className="max-w-xl mx-auto px-5 lg:px-8 text-center">
          {/* Gold circle icon */}
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full mb-8"
            style={{ backgroundColor: "rgba(201,162,39,0.10)" }}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C9A227"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v10M12 18h.01" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>

          <h1
            className="font-display font-bold text-3xl sm:text-4xl leading-tight tracking-tight mb-6"
            style={{ color: "#0B1F4B" }}
          >
            Not Yet &mdash; But You&rsquo;re on the Right Track
          </h1>

          <p
            className="text-base sm:text-lg leading-relaxed max-w-md mx-auto mb-4"
            style={{ color: "#555555" }}
          >
            Based on what you shared, our Enterprise Scaling program isn&rsquo;t
            the right fit <em>right now</em>. That doesn&rsquo;t mean it
            won&rsquo;t be.
          </p>

          <p
            className="text-base sm:text-lg leading-relaxed max-w-md mx-auto mb-8"
            style={{ color: "#555555" }}
          >
            We&rsquo;re going to send you a link to a resource so you can
            start on your own. Keep building &mdash; when
            you&rsquo;re ready for enterprise-level systems, we&rsquo;ll
            be here.
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div
              className="h-px w-12"
              style={{ background: "linear-gradient(to right, transparent, #C9A227)" }}
            />
            <div
              className="w-2 h-2 rotate-45 border"
              style={{ borderColor: "#C9A227" }}
            />
            <div
              className="h-px w-12"
              style={{ background: "linear-gradient(to left, transparent, #C9A227)" }}
            />
          </div>

          <p
            className="text-sm leading-relaxed max-w-sm mx-auto mb-10"
            style={{ color: "#888888" }}
          >
            Check your inbox soon. In the meantime, keep moving forward
            &mdash; the fact that you applied already puts you ahead of
            most business owners.
          </p>

          <Link
            href="/"
            className="inline-block rounded-full px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all hover:opacity-90 hover:-translate-y-0.5 duration-300"
            style={{
              backgroundColor: "#C9A227",
              color: "#FFFFFF",
              boxShadow: "0 4px 24px rgba(201,162,39,0.25)",
            }}
          >
            Return to Homepage
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
