"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Script from "next/script";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface QualifyingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const GHL_STRATEGY_FORM_ID = "9Ui664NtFjDWHaMejSG0";
const GHL_REVENUE_FIELD_ID = "GWR40KA9Eh6A0LnJN2g9";
const GHL_ALLOWED_ORIGINS = [
  "leadconnectorhq.com",
  "msgsndr.com",
  "leadconnector.co",
];

/* ------------------------------------------------------------------ */
/*  Revenue parsing                                                    */
/* ------------------------------------------------------------------ */

/**
 * Returns true if the revenue string indicates $500K+, false if under,
 * or null if the value can't be determined.
 *
 * Handles GHL dropdown values like:
 *   "$500K - $1M" → true
 *   "$1M+" → true
 *   "$1M - $5M" → true
 *   "$5M+" → true
 *   "Under $250K" → false
 *   "Under $500K" → false
 *   "$250K - $500K" → false
 *   "500k-1m" → true
 *   "$2,000,000" → true
 *   "" → null
 */
export function revenueQualifies(raw: string | undefined | null): boolean | null {
  if (!raw || typeof raw !== "string") return null;
  const v = raw.trim().toLowerCase();
  if (!v) return null;

  if (/under\s/i.test(v)) return false;

  const numMatch = v.replace(/[$,\s]/g, "").match(/^(\d+(?:\.\d+)?)(k|m)?/i);
  if (numMatch) {
    let amount = parseFloat(numMatch[1]);
    const suffix = (numMatch[2] || "").toLowerCase();
    if (suffix === "m") amount *= 1_000_000;
    else if (suffix === "k") amount *= 1_000;
    if (amount >= 500_000) return true;
    if (amount > 0) return false;
  }

  if (/(?:500k|1m|5m|10m|\$[5-9]\d{2}|\$\d{1,},?\d{3})/i.test(v.replace(/\s/g, ""))) {
    if (!/under/i.test(v)) return true;
  }

  return null;
}

/* ------------------------------------------------------------------ */
/*  Palette (white/clean with navy + gold accents)                     */
/* ------------------------------------------------------------------ */

const C = {
  white: "#FFFFFF",
  navy: "#0B1F4B",
  gold: "#C9A24B",
  textSecondary: "#555555",
  textMuted: "#888888",
} as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function QualifyingModal({ isOpen, onClose }: QualifyingModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  /* ---- Lock body scroll ---- */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* ---- GHL form submit → revenue-based redirect ---- */
  useEffect(() => {
    if (!isOpen) return;

    function isAllowedOrigin(origin: string): boolean {
      try {
        const hostname = new URL(origin).hostname;
        return GHL_ALLOWED_ORIGINS.some(
          (d) => hostname === d || hostname.endsWith("." + d),
        );
      } catch {
        return false;
      }
    }

    function handler(e: MessageEvent) {
      if (!isAllowedOrigin(e.origin)) return;

      const msg = e.data;
      if (!msg || typeof msg !== "object") return;
      if (msg.type !== "form:submit") return;

      const formData = msg.data || {};
      const revenue =
        formData[GHL_REVENUE_FIELD_ID] ||
        formData.revenue ||
        formData.annual_revenue ||
        formData.Revenue ||
        formData["Annual Revenue"];

      const qualified = revenueQualifies(revenue);
      const dest = qualified === false ? "/not-a-fit" : "/book";

      setTimeout(() => {
        onClose();
        router.push(dest);
      }, 800);
    }

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [isOpen, onClose, router]);

  /* ---- Escape key ---- */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  /* ---- Click outside panel ---- */
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose],
  );

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="qualifying-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto py-8"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
        >
          <motion.div
            ref={panelRef}
            key="qualifying-modal-panel"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-2xl rounded-2xl shadow-2xl"
            style={{
              background: C.white,
              border: `1px solid #E5E5E5`,
            }}
          >
            {/* ---- Close button ---- */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-black/5"
              style={{ color: C.textMuted }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4l10 10M14 4L4 14" />
              </svg>
            </button>

            {/* ---- Header ---- */}
            <div className="px-8 pt-8 pb-0">
              {/* Gold rule */}
              <div className="mb-4 h-px w-16" style={{ backgroundColor: C.gold }} />

              <h2
                className="font-display text-2xl font-bold leading-tight sm:text-3xl"
                style={{ color: C.navy }}
              >
                Start Your Enterprise Journey
              </h2>
              <p className="mt-2 text-sm" style={{ color: C.textSecondary }}>
                Complete the form below to get started
              </p>
            </div>

            {/* ---- Body ---- */}
            <div className="px-8 pb-8 pt-6">
              <iframe
                id={`inline-${GHL_STRATEGY_FORM_ID}`}
                data-form-id={GHL_STRATEGY_FORM_ID}
                src={`https://api.leadconnectorhq.com/widget/form/${GHL_STRATEGY_FORM_ID}`}
                title="Enterprise Strategy Form"
                style={{
                  width: "100%",
                  border: "none",
                  minHeight: 500,
                }}
              />
              <Script
                src="https://link.msgsndr.com/js/form_embed.js"
                strategy="afterInteractive"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
