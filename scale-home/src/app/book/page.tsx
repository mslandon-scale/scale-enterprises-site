"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const faqs = [
  {
    q: "Who is the strategy call for?",
    a: "The Enterprise Scaling Strategy Call is for owners of service businesses with $500K or more in annual revenue who are stuck as the operator and are committed to building enterprise-level systems.",
  },
  {
    q: "What do Design, Engineer and Lead mean?",
    a: "Design gives you absolute clarity on where the business is going. Engineer gives you control and makes the numbers work. Lead installs leadership and accountability systems so you can run your business in less than 90 minutes a week.",
  },
  {
    q: "What happens on the strategy call?",
    a: "We review where you are, where the business depends on you, and the exact system to scale it into a self-running enterprise, then decide together whether working with us is a fit.",
  },
];

export default function BookPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (
        typeof e.data === "string" &&
        e.data.toLowerCase().includes("booking-confirmed")
      ) {
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("track", "Schedule");
        }
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Spacer for fixed navbar */}
      <div className="h-[80px]" />

      <section className="bg-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <h1
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight"
            style={{ color: "#0B1F4B" }}
          >
            Book Your Enterprise Scaling Strategy Call
          </h1>
          <p
            className="mt-4 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: "#555555" }}
          >
            For owners of service businesses with $500K or more in annual revenue
            who are ready to stop being the bottleneck and start building a
            self-running enterprise.
          </p>
        </div>

        <div className="max-w-3xl mx-auto px-5 lg:px-8 mt-8">
          <div className="mb-10 max-w-xl mx-auto">
            <h2
              className="font-display font-bold text-xl sm:text-2xl mb-4"
              style={{ color: "#0B1F4B" }}
            >
              What the call covers
            </h2>
            <ul className="space-y-3">
              {[
                "Where you are now and where your business depends on you",
                "The exact system to scale it into a self-running enterprise",
                "How Design, Engineer and Lead applies to your business",
                "Whether working together is a fit",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#C9A24B]/10 flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#C9A24B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="font-body text-base" style={{ color: "#555555" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <iframe
            src="https://api.leadconnectorhq.com/widget/booking/K2w9Ze70TSE53DiOEa0V"
            title="Book your strategy call"
            style={{
              width: "100%",
              border: "none",
              minHeight: 700,
            }}
          />
          <Script
            src="https://link.msgsndr.com/js/form_embed.js"
            strategy="afterInteractive"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F8F8F8] py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <h2
            className="font-display font-bold text-2xl sm:text-3xl text-center mb-8"
            style={{ color: "#0B1F4B" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-[#0B1F4B]/10 rounded-xl overflow-hidden bg-white"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-display font-bold text-[#0B1F4B] text-base pr-4">
                    {faq.q}
                  </span>
                  <svg
                    className={`w-5 h-5 text-[#C9A24B] shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${openFaq === i ? "max-h-96" : "max-h-0"}`}
                >
                  <div className="px-6 pb-5">
                    <p className="font-body text-[#555] text-base leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
