"use client";

import { useEffect } from "react";
import Script from "next/script";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function BookPage() {
  /* ---- Listen for booking-confirmed postMessage from iframe ---- */
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
            Book Your Strategy Call
          </h1>
          <p
            className="mt-4 text-base sm:text-lg leading-relaxed"
            style={{ color: "#555555" }}
          >
            Schedule your Enterprise Scaling Strategy session with our team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto px-5 lg:px-8 mt-10">
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

      <Footer />
    </div>
  );
}
