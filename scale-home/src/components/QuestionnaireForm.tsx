"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const API_BASE = "https://scale-enterprises-site.vercel.app";

declare global {
  interface Window { fbq?: (...args: unknown[]) => void; }
}

function fireFbEvent(event: string, data?: Record<string, string>) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", event, data);
  }
}

type StepType = "contact" | "business" | "question" | "choice";
type GateScreen = null | "revenue_dq" | "timeline_recovery" | "timeline_dq" | "investment_recovery" | "investment_dq";

interface Step {
  type: StepType;
  name: string;
  label: string;
  helper: string;
  placeholder?: string;
  options?: string[];
}

interface FieldDef {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
}

const contactFields: FieldDef[] = [
  { name: "first_name", label: "First Name", placeholder: "e.g. John" },
  { name: "last_name", label: "Last Name", placeholder: "e.g. Smith" },
  { name: "contact_email_input", label: "Email", placeholder: "you@example.com", type: "email" },
  { name: "phone", label: "Phone Number", placeholder: "e.g. (555) 123-4567", type: "tel" },
  { name: "business_name", label: "Company Name", placeholder: "e.g. Acme Consulting" },
];

const businessFields: FieldDef[] = [
  { name: "industry", label: "What does your business do?", placeholder: "e.g. HVAC, accounting services, digital marketing" },
  { name: "website", label: "Website", placeholder: "e.g. www.yourbusiness.com", type: "url" },
  { name: "num_employees", label: "Number of Employees", placeholder: "e.g. 12", type: "number" },
];

const steps: Step[] = [
  {
    type: "contact",
    name: "contact_info",
    label: "Let's get your info.",
    helper: "So we can match your answers to your application and have everything ready.",
  },
  {
    type: "business",
    name: "business_info",
    label: "Tell us about your business.",
    helper: "This helps us come prepared and tailor the conversation to your specific situation.",
  },
  {
    type: "choice",
    name: "annual_revenue",
    label: "What's your current annual revenue?",
    helper: "Be honest — this helps us determine if the Enterprise Challenge is the right fit for where you are right now.",
    options: ["Below $500K", "$500K – $1M", "$1M+", "$10M+"],
  },
  {
    type: "choice",
    name: "start_timeline",
    label: "When do you want to start the challenge?",
    helper: "We only work with people who are ready to take action.",
    options: ["ASAP", "Not Sure"],
  },
  {
    type: "choice",
    name: "willing_to_invest",
    label: "Are you willing to invest in your business?",
    helper: "Scaling requires real commitment — time, energy, and capital. Be honest with yourself.",
    options: ["Yes", "No"],
  },
  {
    type: "question",
    name: "dream_outcome",
    label: "What does your business look like when it's working without you?",
    helper: "Paint the picture. Revenue, lifestyle, team, freedom. What does the end state actually look like for you? Be specific.",
    placeholder: "Describe your vision...",
  },
  {
    type: "question",
    name: "bottleneck",
    label: "What's the single biggest bottleneck in your business right now?",
    helper: "The thing that, if it disappeared tomorrow, would change everything. Be honest.",
    placeholder: "What's holding you back...",
  },
  {
    type: "question",
    name: "why_now",
    label: "Why now? What made this the moment you decided to do something about it?",
    helper: "Something triggered you to apply instead of kicking the can down the road again. What was it?",
    placeholder: "What changed...",
  },
  {
    type: "question",
    name: "cost_of_inaction",
    label: "What happens to your business in 12 months if nothing changes?",
    helper: "Same revenue, same hours, same stress. Where does that road end. Don't sugarcoat it.",
    placeholder: "Be honest with yourself...",
  },
  {
    type: "question",
    name: "why_you",
    label: "Why should we work with you over the dozens of other applicants?",
    helper: "We only take a handful of clients at a time. What makes you different? What makes you coachable and ready to execute?",
    placeholder: "Make your case...",
  },
  {
    type: "question",
    name: "past_attempts",
    label: "What have you already tried to scale your business, and why didn't it work?",
    helper: "Courses, coaches, consultants, hiring, partnerships. Whatever it was. What happened and what did you learn?",
    placeholder: "What you've tried before...",
  },
  {
    type: "question",
    name: "objections",
    label: "If we showed you the exact system to build your dream business, what would stop you from going all in?",
    helper: "Time, money, mindset, team, spouse. Whatever it is, put it on the table now. We'd rather know before the call than during it.",
    placeholder: "No wrong answers...",
  },
];

const questionSteps = steps.filter((s) => s.type === "question");

function BookingScreen() {
  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (
        typeof e.data === "string" &&
        (e.data.includes("booking-confirmed") || e.data.includes("appointmentBooked"))
      ) {
        fireFbEvent("Schedule", { content_name: "Enterprise Challenge Booking" });
      }
      if (typeof e.data === "object" && e.data?.type === "booking-confirmed") {
        fireFbEvent("Schedule", { content_name: "Enterprise Challenge Booking" });
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="flex flex-col items-center text-center px-6">
      <div className="w-20 h-20 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center mx-auto mb-8">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h2 className="font-display text-navy font-extrabold text-[clamp(1.6rem,3.5vw,2.2rem)] mb-3">
        You Qualify.
      </h2>
      <h3 className="font-display text-navy font-bold text-[clamp(1.1rem,2.5vw,1.5rem)] mb-5">
        Book Your Challenge Now.
      </h3>
      <p className="font-body text-text-secondary text-[16px] leading-[1.7] max-w-[520px] mx-auto mb-8">
        Pick a time you&apos;ll be available for <strong className="text-navy">five days in a row</strong>. The Enterprise Challenge runs daily once you start.
      </p>
      <iframe
        src="https://api.leadconnectorhq.com/widget/booking/2YVaFgC8TdFJo5NEvI1m"
        className="w-full border-none"
        style={{ height: "1200px" }}
        scrolling="no"
        title="Book Enterprise Challenge"
      />
    </div>
  );
}

export default function QuestionnaireForm() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [gateScreen, setGateScreen] = useState<GateScreen>(null);
  const [submitting, setSubmitting] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [animating, setAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const step = steps[current];
  const totalSteps = steps.length;
  const progress = ((current + 1) / totalSteps) * 100;
  const isLast = current === totalSteps - 1;

  const canProceed = (() => {
    if (step.type === "contact") {
      return contactFields.every((f) => (answers[f.name] || "").trim().length > 0);
    }
    if (step.type === "business") {
      return businessFields.every((f) => (answers[f.name] || "").trim().length > 0);
    }
    return (answers[step.name] || "").trim().length > 0;
  })();

  useEffect(() => {
    if (step.type !== "business" && step.type !== "contact" && step.type !== "choice") {
      const timer = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(timer);
    }
  }, [current, step.type]);

  async function sendToApi() {
    const contactEmail = (answers.contact_email_input || "").trim();
    const questionAnswers: Record<string, string> = {};
    steps.forEach((s) => {
      if (s.type === "question" || s.type === "choice") {
        questionAnswers[s.name] = answers[s.name] || "";
      }
    });
    contactFields.forEach((f) => {
      if (f.name !== "contact_email_input") {
        questionAnswers[f.name] = answers[f.name] || "";
      }
    });
    businessFields.forEach((f) => {
      questionAnswers[f.name] = answers[f.name] || "";
    });

    try {
      await fetch(`${API_BASE}/api/questionnaire`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact_email: contactEmail,
          answers: questionAnswers,
          attribution: {},
        }),
      });
    } catch (error) {
      console.error("Questionnaire submission error:", error);
    }
  }

  function advanceStep() {
    setDirection("next");
    setAnimating(true);
    setTimeout(() => {
      setCurrent((c) => c + 1);
      setAnimating(false);
    }, 250);
  }

  const goNext = useCallback(() => {
    if (!canProceed || animating) return;

    if (step.name === "annual_revenue" && answers.annual_revenue === "Below $500K") {
      sendToApi();
      setGateScreen("revenue_dq");
      return;
    }

    if (step.name === "start_timeline" && answers.start_timeline === "Not Sure") {
      setGateScreen("timeline_recovery");
      return;
    }

    if (step.name === "willing_to_invest" && answers.willing_to_invest === "No") {
      setGateScreen("investment_recovery");
      return;
    }

    if (isLast) {
      handleSubmit();
      return;
    }

    advanceStep();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canProceed, animating, isLast, current, answers, step.name]);

  async function handleSubmit() {
    setSubmitting(true);
    await sendToApi();
    fireFbEvent("CompleteRegistration", { content_name: "Enterprise Challenge Application" });
    setSubmitted(true);
  }

  function handleCommitTimeline() {
    setAnswers((prev) => ({ ...prev, start_timeline: "ASAP" }));
    setGateScreen(null);
    advanceStep();
  }

  function handleCommitInvestment() {
    setAnswers((prev) => ({ ...prev, willing_to_invest: "Yes" }));
    setGateScreen(null);
    advanceStep();
  }

  function handleFinalDQ(reason: string) {
    sendToApi();
    if (reason === "timeline") setGateScreen("timeline_dq");
    else if (reason === "investment") setGateScreen("investment_dq");
  }

  function goBack() {
    if (current === 0 || animating) return;
    setDirection("prev");
    setAnimating(true);
    setTimeout(() => {
      setCurrent((c) => c - 1);
      setAnimating(false);
    }, 250);
  }

  function handleChange(value: string, name?: string) {
    const key = name || step.name;
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && (step.type === "contact" || step.type === "business")) {
      e.preventDefault();
      if (canProceed) goNext();
    }
    if (e.key === "Enter" && e.ctrlKey && step.type === "question") {
      e.preventDefault();
      goNext();
    }
  }

  const questionIndex = step.type === "question" ? questionSteps.indexOf(step) + 1 : 0;

  // ── Gate screens ──

  if (gateScreen === "revenue_dq") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="w-20 h-20 bg-amber-50 border-2 border-amber-200 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h2 className="font-display text-navy font-extrabold text-[clamp(1.6rem,3.5vw,2.2rem)] mb-5">
          You Didn&apos;t Qualify.
        </h2>
        <p className="font-body text-text-secondary text-[16px] leading-[1.7] max-w-[520px] mx-auto mb-6">
          Unfortunately, you&apos;re below $500K in annual revenue. The Enterprise Challenge is designed for businesses that have already found product-market fit and built their base.
        </p>
        <div className="w-14 h-[3px] bg-accent-gold rounded-sm mx-auto mb-6" />
        <p className="font-body text-text-secondary text-[15px] leading-[1.7] max-w-[520px] mx-auto">
          Once you hit that point, come back and apply again &mdash; we&apos;ll help you get to the next level.
        </p>
      </div>
    );
  }

  if (gateScreen === "timeline_recovery") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="w-20 h-20 bg-amber-50 border-2 border-amber-200 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h2 className="font-display text-navy font-extrabold text-[clamp(1.5rem,3vw,2rem)] mb-5">
          We Only Work With People Ready to Move Now.
        </h2>
        <p className="font-body text-text-secondary text-[16px] leading-[1.7] max-w-[520px] mx-auto mb-8">
          The Enterprise Challenge is for business owners who are done waiting, done settling, and ready to build their dream business <strong className="text-navy">starting now</strong> &mdash; not someday. If you&apos;re ready to commit and book the soonest available time, we want to hear from you.
        </p>
        <button
          onClick={handleCommitTimeline}
          className="px-10 py-4 bg-navy text-white font-display text-[14px] font-bold uppercase tracking-[0.18em] rounded-lg transition-all duration-300 hover:bg-navy-light hover:shadow-lg hover:-translate-y-0.5 mb-4"
        >
          I Commit to Building My Dream Business ASAP
        </button>
        <button
          onClick={() => handleFinalDQ("timeline")}
          className="font-body text-text-muted text-[14px] hover:text-navy transition-colors duration-200"
        >
          No, I&apos;m not ready right now
        </button>
      </div>
    );
  }

  if (gateScreen === "timeline_dq") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="w-20 h-20 bg-amber-50 border-2 border-amber-200 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h2 className="font-display text-navy font-extrabold text-[clamp(1.6rem,3.5vw,2.2rem)] mb-5">
          You Didn&apos;t Qualify.
        </h2>
        <p className="font-body text-text-secondary text-[16px] leading-[1.7] max-w-[520px] mx-auto mb-6">
          Unfortunately, we&apos;re not able to accept you into the Enterprise Challenge. We work with people who are ready to move now, and since you&apos;re not sure when you want to start, we&apos;re not able to work with you at this time.
        </p>
        <div className="w-14 h-[3px] bg-accent-gold rounded-sm mx-auto mb-6" />
        <p className="font-body text-text-secondary text-[15px] leading-[1.7] max-w-[520px] mx-auto">
          When you&apos;re ready to go all in, come back and apply again.
        </p>
      </div>
    );
  }

  if (gateScreen === "investment_recovery") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="w-20 h-20 bg-amber-50 border-2 border-amber-200 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h2 className="font-display text-navy font-extrabold text-[clamp(1.5rem,3vw,2rem)] mb-5">
          Building a Business Requires Investment.
        </h2>
        <p className="font-body text-text-secondary text-[16px] leading-[1.7] max-w-[520px] mx-auto mb-8">
          We don&apos;t work with people who aren&apos;t willing to invest in their business. The most successful entrepreneurs are <strong className="text-navy">resourceful</strong> &mdash; they find a way to make it happen. If you&apos;re willing to commit to investing in your business based on a strategy that would give you the returns to justify it, we want to work with you.
        </p>
        <button
          onClick={handleCommitInvestment}
          className="px-10 py-4 bg-navy text-white font-display text-[14px] font-bold uppercase tracking-[0.18em] rounded-lg transition-all duration-300 hover:bg-navy-light hover:shadow-lg hover:-translate-y-0.5 mb-4"
        >
          I Commit to Investing in My Business
        </button>
        <button
          onClick={() => handleFinalDQ("investment")}
          className="font-body text-text-muted text-[14px] hover:text-navy transition-colors duration-200"
        >
          No, I&apos;m not willing to invest
        </button>
      </div>
    );
  }

  if (gateScreen === "investment_dq") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="w-20 h-20 bg-amber-50 border-2 border-amber-200 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h2 className="font-display text-navy font-extrabold text-[clamp(1.6rem,3.5vw,2.2rem)] mb-5">
          You Didn&apos;t Qualify.
        </h2>
        <p className="font-body text-text-secondary text-[16px] leading-[1.7] max-w-[520px] mx-auto mb-6">
          Unfortunately, we&apos;re not able to accept you because you&apos;re not willing to invest in your business. Without that commitment, we can&apos;t help you build what you&apos;re looking for.
        </p>
        <div className="w-14 h-[3px] bg-accent-gold rounded-sm mx-auto mb-6" />
        <p className="font-body text-text-secondary text-[15px] leading-[1.7] max-w-[520px] mx-auto">
          If you change your mind and are willing to find a way, come back and apply again.
        </p>
      </div>
    );
  }

  // ── Final screens ──

  if (submitted) {
    return <BookingScreen />;
  }

  // ── Step form ──

  return (
    <div className="flex flex-col min-h-[60vh]">
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-body text-text-muted text-[12px]">
            {current + 1} of {totalSteps}
          </span>
          <span className="font-body text-text-muted text-[12px]">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-bg-alt rounded-full overflow-hidden">
          <div
            className="h-full bg-accent-gold rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question slide */}
      <div className="flex-1 flex flex-col justify-center py-12">
        <div
          className={`transition-all duration-250 ${
            animating
              ? direction === "next"
                ? "opacity-0 translate-y-4"
                : "opacity-0 -translate-y-4"
              : "opacity-100 translate-y-0"
          }`}
        >
          {step.type === "contact" && (
            <>
              <span className="font-body text-accent-gold text-[11px] font-bold uppercase tracking-[0.2em] block mb-4">
                Enterprise Challenge Application
              </span>
              <h2 className="font-display text-navy font-extrabold text-[clamp(1.3rem,3vw,1.8rem)] leading-[1.2] mb-3">
                {step.label}
              </h2>
              <p className="font-body text-text-muted text-[14px] leading-[1.6] mb-8">
                {step.helper}
              </p>
              <div className="space-y-4">
                {contactFields.map((field) => (
                  <div key={field.name}>
                    <label className="font-body text-text-secondary text-[13px] font-semibold block mb-1.5">
                      {field.label}
                    </label>
                    <input
                      type={field.type || "text"}
                      value={answers[field.name] || ""}
                      onChange={(e) => handleChange(e.target.value, field.name)}
                      onKeyDown={handleKeyDown}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3.5 bg-bg-card border border-black/[0.1] rounded-xl font-body text-[16px] text-text-primary outline-none transition-colors duration-200 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold/30 placeholder:text-text-muted/50"
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {step.type === "business" && (
            <>
              <span className="font-body text-accent-gold text-[11px] font-bold uppercase tracking-[0.2em] block mb-4">
                About Your Business
              </span>
              <h2 className="font-display text-navy font-extrabold text-[clamp(1.3rem,3vw,1.8rem)] leading-[1.2] mb-3">
                {step.label}
              </h2>
              <p className="font-body text-text-muted text-[14px] leading-[1.6] mb-8">
                {step.helper}
              </p>
              <div className="space-y-4">
                {businessFields.map((field, i) => (
                  <div key={field.name}>
                    <label className="font-body text-text-secondary text-[13px] font-semibold block mb-1.5">
                      {field.label}
                    </label>
                    <input
                      ref={i === 0 ? inputRef as React.RefObject<HTMLInputElement> : undefined}
                      type={field.type === "number" ? "text" : "text"}
                      inputMode={field.type === "number" ? "numeric" : undefined}
                      value={answers[field.name] || ""}
                      onChange={(e) => handleChange(e.target.value, field.name)}
                      onKeyDown={handleKeyDown}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3.5 bg-bg-card border border-black/[0.1] rounded-xl font-body text-[16px] text-text-primary outline-none transition-colors duration-200 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold/30 placeholder:text-text-muted/50"
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {step.type === "question" && (
            <>
              <span className="font-body text-accent-gold text-[11px] font-bold uppercase tracking-[0.2em] block mb-4">
                Question {questionIndex} of {questionSteps.length}
              </span>
              <h2 className="font-display text-navy font-extrabold text-[clamp(1.3rem,3vw,1.8rem)] leading-[1.2] mb-3">
                {step.label}
              </h2>
              <p className="font-body text-text-muted text-[14px] leading-[1.6] mb-8">
                {step.helper}
              </p>
              <textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                value={answers[step.name] || ""}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={step.placeholder}
                rows={5}
                className="w-full px-4 py-3.5 bg-bg-card border border-black/[0.1] rounded-xl font-body text-[16px] text-text-primary outline-none transition-colors duration-200 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold/30 placeholder:text-text-muted/50 resize-y min-h-[140px] leading-[1.6]"
              />
              <p className="font-body text-text-muted/50 text-[11px] mt-2">
                Press Ctrl + Enter to continue
              </p>
            </>
          )}

          {step.type === "choice" && (
            <>
              <span className="font-body text-accent-gold text-[11px] font-bold uppercase tracking-[0.2em] block mb-4">
                Enterprise Challenge Application
              </span>
              <h2 className="font-display text-navy font-extrabold text-[clamp(1.3rem,3vw,1.8rem)] leading-[1.2] mb-3">
                {step.label}
              </h2>
              <p className="font-body text-text-muted text-[14px] leading-[1.6] mb-8">
                {step.helper}
              </p>
              <div className="space-y-3">
                {step.options?.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleChange(option)}
                    className={`w-full text-left px-5 py-4 rounded-xl border-2 font-body text-[15px] transition-all duration-200 ${
                      answers[step.name] === option
                        ? "border-accent-gold bg-accent-gold/10 text-navy font-semibold"
                        : "border-black/[0.1] bg-bg-card text-text-secondary hover:border-accent-gold/40"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-black/[0.06]">
        <button
          type="button"
          onClick={goBack}
          disabled={current === 0}
          className="flex items-center gap-2 font-body text-[13px] text-text-muted hover:text-navy transition-colors duration-200 disabled:opacity-0 disabled:pointer-events-none"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>

        <button
          type="button"
          onClick={goNext}
          disabled={!canProceed || submitting}
          className="flex items-center gap-2 px-8 py-3 bg-navy text-white font-display text-[13px] font-bold uppercase tracking-[0.15em] rounded-lg transition-all duration-300 hover:bg-navy-light hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-30 disabled:pointer-events-none"
        >
          {submitting ? "Submitting..." : isLast ? "Submit Application" : "Continue"}
          {!submitting && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
