"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface QualifyingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  annualRevenue: string;
  industry: string;
  hoursPerWeek: string;
  desiredOutcome: string;
  previousAttempts: string;
  commitment: "Yes" | "No" | "";
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const REVENUE_OPTIONS = [
  { value: "", label: "Select your annual revenue" },
  { value: "Less than $500K", label: "Less than $500K" },
  { value: "$500K-$1M", label: "$500K-$1M" },
  { value: "$1M-$5M", label: "$1M-$5M" },
  { value: "$5M-$10M", label: "$5M-$10M" },
  { value: "$10M+", label: "$10M+" },
];

const INDUSTRY_OPTIONS = [
  { value: "", label: "Select your industry" },
  { value: "Home services", label: "Home services" },
  { value: "Facility services", label: "Facility services" },
  { value: "Real estate & Property management", label: "Real estate & Property management" },
  { value: "Medical & Healthcare", label: "Medical & Healthcare" },
  { value: "Insurance & Financial services", label: "Insurance & Financial services" },
  { value: "Auto & Trades", label: "Auto & Trades" },
  { value: "B2B Services", label: "B2B Services" },
  { value: "Other", label: "Other" },
];

const INITIAL_FORM: FormData = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  annualRevenue: "",
  industry: "",
  hoursPerWeek: "",
  desiredOutcome: "",
  previousAttempts: "",
  commitment: "",
};

const BOOKING_IFRAME_URL =
  "https://api.leadconnectorhq.com/widget/booking/K2w9Ze70TSE53DiOEa0V";

/* ------------------------------------------------------------------ */
/*  Palette (white/clean with navy + gold accents)                     */
/* ------------------------------------------------------------------ */

const C = {
  white: "#FFFFFF",
  bg: "#F9FAFB",
  navy: "#0B1F4B",
  gold: "#C9A24B",
  goldHover: "#D4AF37",
  textPrimary: "#1A1A2E",
  textSecondary: "#555555",
  textMuted: "#888888",
  inputBg: "#F5F5F5",
  inputBorder: "#E0E0E0",
} as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function QualifyingModal({ isOpen, onClose }: QualifyingModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [isQualified, setIsQualified] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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

  /* ---- Reset on close ---- */
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setForm(INITIAL_FORM);
      setIsQualified(false);
      setSubmitting(false);
    }
  }, [isOpen]);

  /* ---- Click outside panel ---- */
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose],
  );

  /* ---- Field helpers ---- */
  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const setCommitment = (value: "Yes" | "No") =>
    setForm((prev) => ({ ...prev, commitment: value }));

  /* ---- Qualification check ---- */
  const checkQualification = (): boolean => {
    const revenueOk = form.annualRevenue !== "" && form.annualRevenue !== "Less than $500K";
    const commitmentOk = form.commitment === "Yes";
    return revenueOk && commitmentOk;
  };

  /* ---- Submit ---- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      console.log("[DEV] Questionnaire submission (not sent to server):", {
        contact_email: form.email,
        answers: { ...form },
      });
    } catch (err) {
      console.error("[DEV] Questionnaire mock error:", err);
    }

    /* Meta Pixel: CompleteRegistration */
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "CompleteRegistration");
    }

    const qualified = checkQualification();
    setIsQualified(qualified);
    setStep(2);
    setSubmitting(false);
  };

  /* ---- Validation: all required fields filled ---- */
  const formValid =
    form.firstName.trim() !== "" &&
    form.lastName.trim() !== "" &&
    form.phone.trim() !== "" &&
    form.email.trim() !== "" &&
    form.annualRevenue !== "" &&
    form.industry !== "" &&
    form.hoursPerWeek.trim() !== "" &&
    form.desiredOutcome.trim() !== "" &&
    form.previousAttempts.trim() !== "" &&
    form.commitment !== "";

  /* ---------------------------------------------------------------- */
  /*  Shared styles                                                    */
  /* ---------------------------------------------------------------- */

  const inputClass = [
    "w-full rounded-lg px-4 py-3 text-sm outline-none transition-all",
    "placeholder:text-[#999]",
  ].join(" ");

  const inputStyle: React.CSSProperties = {
    backgroundColor: C.inputBg,
    border: `1px solid ${C.inputBorder}`,
    color: C.textPrimary,
  };

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
              {/* Progress indicator */}
              <p className="mb-2 text-xs font-medium tracking-widest uppercase" style={{ color: C.gold }}>
                Step {step} of 2
              </p>
              <div className="mb-5 h-1 w-full overflow-hidden rounded-full" style={{ backgroundColor: "#EEEEEE" }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: step === 1 ? "50%" : "100%",
                    backgroundColor: C.gold,
                  }}
                />
              </div>
              {/* Gold rule */}
              <div className="mb-4 h-px w-16" style={{ backgroundColor: C.gold }} />

              {step === 1 && (
                <>
                  <h2
                    className="font-display text-2xl font-bold leading-tight sm:text-3xl"
                    style={{ color: C.navy }}
                  >
                    Start Your Enterprise Journey
                  </h2>
                  <p className="mt-2 text-sm" style={{ color: C.textSecondary }}>
                    Fill out the form below and continue to Step 2
                  </p>
                </>
              )}

              {step === 2 && (
                <h2
                  className="font-display text-2xl font-bold leading-tight sm:text-3xl"
                  style={{ color: C.navy }}
                >
                  {isQualified ? "Book Your Strategy Call" : "Thank You for Your Interest"}
                </h2>
              )}
            </div>

            {/* ---- Body ---- */}
            <div className="px-8 pb-8 pt-6">
              {/* ============ STEP 1 ============ */}
              {step === 1 && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* First / Last name row */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium" style={{ color: C.textSecondary }}>
                        First Name <span style={{ color: C.gold }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.firstName}
                        onChange={set("firstName")}
                        placeholder="First name"
                        className={`${inputClass} focus:ring-2 focus:ring-[#C9A24B] focus:border-[#C9A24B]`}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium" style={{ color: C.textSecondary }}>
                        Last Name <span style={{ color: C.gold }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.lastName}
                        onChange={set("lastName")}
                        placeholder="Last name"
                        className={`${inputClass} focus:ring-2 focus:ring-[#C9A24B] focus:border-[#C9A24B]`}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  {/* Phone / Email row */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium" style={{ color: C.textSecondary }}>
                        Phone <span style={{ color: C.gold }}>*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={set("phone")}
                        placeholder="(555) 000-0000"
                        className={`${inputClass} focus:ring-2 focus:ring-[#C9A24B] focus:border-[#C9A24B]`}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium" style={{ color: C.textSecondary }}>
                        Email <span style={{ color: C.gold }}>*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={set("email")}
                        placeholder="you@company.com"
                        className={`${inputClass} focus:ring-2 focus:ring-[#C9A24B] focus:border-[#C9A24B]`}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  {/* Annual Revenue */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium" style={{ color: C.textSecondary }}>
                      What is your current Annual Revenue? (USD$) <span style={{ color: C.gold }}>*</span>
                    </label>
                    <select
                      required
                      value={form.annualRevenue}
                      onChange={set("annualRevenue")}
                      className={`${inputClass} focus:ring-2 focus:ring-[#C9A24B] focus:border-[#C9A24B] cursor-pointer appearance-none`}
                      style={{
                        ...inputStyle,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23999' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 14px center",
                      }}
                    >
                      {REVENUE_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Industry */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium" style={{ color: C.textSecondary }}>
                      Industry <span style={{ color: C.gold }}>*</span>
                    </label>
                    <select
                      required
                      value={form.industry}
                      onChange={set("industry")}
                      className={`${inputClass} focus:ring-2 focus:ring-[#C9A24B] focus:border-[#C9A24B] cursor-pointer appearance-none`}
                      style={{
                        ...inputStyle,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23999' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 14px center",
                      }}
                    >
                      {INDUSTRY_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Hours per week */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium" style={{ color: C.textSecondary }}>
                      How many hours a week are you currently working in your business? <span style={{ color: C.gold }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.hoursPerWeek}
                      onChange={set("hoursPerWeek")}
                      placeholder="e.g. 50"
                      className={`${inputClass} focus:ring-2 focus:ring-[#C9A24B] focus:border-[#C9A24B]`}
                      style={inputStyle}
                    />
                  </div>

                  {/* Desired outcome */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium" style={{ color: C.textSecondary }}>
                      What would you like to be doing with your time and how much $ do you want to be making once we get you out of the day to day? <span style={{ color: C.gold }}>*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={form.desiredOutcome}
                      onChange={set("desiredOutcome")}
                      placeholder="Describe your ideal outcome..."
                      className={`${inputClass} focus:ring-2 focus:ring-[#C9A24B] focus:border-[#C9A24B] resize-none`}
                      style={inputStyle}
                    />
                  </div>

                  {/* Previous attempts */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium" style={{ color: C.textSecondary }}>
                      What have you already tried to get yourself out of the day to day? <span style={{ color: C.gold }}>*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={form.previousAttempts}
                      onChange={set("previousAttempts")}
                      placeholder="Share what you've tried so far..."
                      className={`${inputClass} focus:ring-2 focus:ring-[#C9A24B] focus:border-[#C9A24B] resize-none`}
                      style={inputStyle}
                    />
                  </div>

                  {/* Commitment question */}
                  <div>
                    <label className="mb-3 block text-xs font-medium leading-relaxed" style={{ color: C.textSecondary }}>
                      Building an enterprise requires real commitment. Are you willing to invest the time, money, and effort to implement the systems we build together, even when it means making hard changes to how you operate? <span style={{ color: C.gold }}>*</span>
                    </label>
                    <div className="flex gap-3">
                      {(["Yes", "No"] as const).map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setCommitment(val)}
                          className="rounded-lg px-6 py-2.5 text-sm font-semibold transition-all"
                          style={{
                            backgroundColor:
                              form.commitment === val
                                ? val === "Yes"
                                  ? C.gold
                                  : "#E5E5E5"
                                : C.inputBg,
                            color:
                              form.commitment === val && val === "Yes"
                                ? "#FFFFFF"
                                : C.textPrimary,
                            border: `1px solid ${
                              form.commitment === val ? C.gold : C.inputBorder
                            }`,
                          }}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SMS consent */}
                  <p className="text-[11px] leading-relaxed" style={{ color: C.textMuted }}>
                    By providing a telephone number and submitting this form you are consenting to be
                    contacted by SMS text message. Message &amp; data rates may apply. You can reply
                    STOP to opt-out of further messaging.{" "}
                    <a href="/privacy-policy" className="underline hover:no-underline" style={{ color: C.textSecondary }}>
                      Privacy Policy
                    </a>{" "}
                    &amp;{" "}
                    <a href="/terms-of-service" className="underline hover:no-underline" style={{ color: C.textSecondary }}>
                      Terms of Service
                    </a>
                    .
                  </p>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={!formValid || submitting}
                    className="mt-2 w-full rounded-lg py-3.5 text-sm font-bold uppercase tracking-wider transition-all disabled:cursor-not-allowed disabled:opacity-40"
                    style={{
                      backgroundColor: C.gold,
                      color: "#FFFFFF",
                    }}
                    onMouseEnter={(e) => {
                      if (!submitting && formValid) (e.currentTarget.style.backgroundColor = C.goldHover);
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget.style.backgroundColor = C.gold);
                    }}
                  >
                    {submitting ? "Submitting..." : "Continue to Step 2"}
                  </button>
                </form>
              )}

              {/* ============ STEP 2 - QUALIFIED ============ */}
              {step === 2 && isQualified && (
                <div className="mt-2">
                  <iframe
                    src={BOOKING_IFRAME_URL}
                    title="Book your strategy call"
                    className="w-full rounded-lg border-0"
                    style={{ height: 700 }}
                    allow="camera; microphone"
                  />
                </div>
              )}

              {/* ============ STEP 2 - DISQUALIFIED ============ */}
              {step === 2 && !isQualified && (
                <div className="mt-2 space-y-4 text-center">
                  <div
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
                    style={{ backgroundColor: "rgba(201,162,75,0.12)" }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v4M12 16h.01" />
                    </svg>
                  </div>
                  <p className="mx-auto max-w-md text-sm leading-relaxed" style={{ color: C.textSecondary }}>
                    Thank you for your interest. Based on your responses, our Enterprise Scaling
                    Strategy program may not be the right fit at this time. We work best with
                    businesses that have crossed the $500K revenue mark and are fully committed to
                    building enterprise-level systems. When you&apos;re ready, we&apos;d love to hear from you again.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-4 rounded-lg px-8 py-3 text-sm font-semibold transition-all"
                    style={{
                      backgroundColor: C.gold,
                      color: "#FFFFFF",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.goldHover)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.gold)}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
