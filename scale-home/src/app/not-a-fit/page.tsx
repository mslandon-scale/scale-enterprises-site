import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Thank You | Scale Enterprises",
  description:
    "Thank you for your interest in Scale Enterprises. Our Enterprise Scaling Strategy program may not be the right fit at this time.",
};

export default function NotAFitPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Spacer for fixed navbar */}
      <div className="h-[80px]" />

      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="max-w-xl mx-auto px-5 lg:px-8 text-center">
          {/* Gold circle icon with info svg */}
          <div
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full mb-6"
            style={{ backgroundColor: "rgba(201,162,75,0.12)" }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C9A24B"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
          </div>

          <h1
            className="font-display font-bold text-2xl sm:text-3xl leading-tight tracking-tight mb-6"
            style={{ color: "#0B1F4B" }}
          >
            Thank You for Your Interest
          </h1>

          <p
            className="text-sm sm:text-base leading-relaxed max-w-md mx-auto"
            style={{ color: "#555555" }}
          >
            Thank you for your interest. Based on your responses, our Enterprise
            Scaling Strategy program may not be the right fit at this time. We
            work best with businesses that have crossed the $500K revenue mark
            and are fully committed to building enterprise-level systems. When
            you&apos;re ready, we&apos;d love to hear from you again.
          </p>

          <Link
            href="/"
            className="mt-8 inline-block rounded-lg px-8 py-3 text-sm font-semibold transition-all hover:opacity-90"
            style={{
              backgroundColor: "#C9A24B",
              color: "#FFFFFF",
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
