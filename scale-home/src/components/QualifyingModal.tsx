"use client";

import { useEffect, useRef, useCallback } from "react";
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
