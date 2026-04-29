"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const API_BASE = "https://scale-enterprises-site.vercel.app";

type StepType = "email" | "business" | "question";

interface Step {
  type: StepType;
  name: string;
  label: string;
  helper: string;
  placeholder?: string;
}

interface BusinessField {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
}

const businessFields: BusinessField[] = [
  { name: "business_name", label: "Business Name", placeholder: "e.g. Acme Consulting" },
  { name: "industry", label: "What does your business do?", placeholder: "e.g. HVAC, accounting services, digital marketing" },
  { name: "website", label: "Website", placeholder: "e.g. www.yourbusiness.com", type: "url" },
  { name: "num_employees", label: "Number of Employees", placeholder: "e.g. 12", type: "number" },
  { name: "annual_revenue", label: "Current Annual Revenue", placeholder: "e.g. $500K, $1.2M" },
];

const steps: Step[] = [
  {
    type: "email",
    name: "contact_email_input",
    label: "What email did you book your call with?",
    helper: "So we can match your answers to your appointment and have everything ready for your call.",
    placeholder: "you@example.com",
  },
  {
    type: "business",
    name: "business_info",
    label: "Tell us about your business.",
    helper: "This helps us come prepared and tailor the conversation to your specific situation.",
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
    helper: "Something triggered you to book this call instead of kicking the can down the road again. What was it?",
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
    label: "If we showed you the exact system to scale past $10M, what would stop you from going all in?",
    helper: "Time, money, mindset, team, spouse. Whatever it is, put it on the table now. We'd rather know before the call than during it.",
    placeholder: "No wrong answers...",
  },
];

const questionSteps = steps.filter((s) => s.type === "question");

export default function QuestionnaireForm() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [animating, setAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const step = steps[current];
  const totalSteps = steps.length;
  const progress = ((current + 1) / totalSteps) * 100;
  const isLast = current === totalSteps - 1;

  const canProceed = (() => {
    if (step.type === "business") {
      return businessFields.every((f) => (answers[f.name] || "").trim().length > 0);
    }
    return (answers[step.name] || "").trim().length > 0;
  })();

  useEffect(() => {
    if (step.type !== "business") {
      const timer = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(timer);
    }
  }, [current, step.type]);

  const goNext = useCallback(() => {
    if (!canProceed || animating) return;
    if (isLast) {
      handleSubmit();
      return;
    }
    setDirection("next");
    setAnimating(true);
    setTimeout(() => {
      setCurrent((c) => c + 1);
      setAnimating(false);
    }, 250);
  }, [canProceed, animating, isLast, current]);

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
    if (e.key === "Enter" && (step.type === "email" || step.type === "business")) {
      e.preventDefault();
      if (canProceed) goNext();
    }
    if (e.key === "Enter" && e.ctrlKey && step.type === "question") {
      e.preventDefault();
      goNext();
    }
  }

  async function handleSubmit() {
    setSubmitting(true);

    const contactEmail = (answers.contact_email_input || "").trim();
    const questionAnswers: Record<string, string> = {};
    steps.forEach((s) => {
      if (s.type === "question") {
        questionAnswers[s.name] = answers[s.name] || "";
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

    setSubmitted(true);
  }

  const questionIndex = step.type === "question" ? questionSteps.indexOf(step) + 1 : 0;

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <span className="inline-block px-5 py-2 bg-navy text-white font-body text-[11px] font-bold uppercase tracking-[0.25em] rounded-full mb-8">
          Pre-Call Questionnaire
        </span>
        <h1 className="font-display text-navy font-extrabold text-[clamp(1.6rem,3.5vw,2.2rem)] leading-[1.15] tracking-[-0.02em] mb-5">
          Let&apos;s Make Your Call<br />Count.
        </h1>
        <p className="font-body text-text-secondary text-[15px] leading-[1.7] max-w-[520px] mx-auto mb-10">
          You&apos;ve booked your Enterprise Call — that&apos;s the first step. In order for us to get the most out of it, we need you to honestly answer these few questions so we have{" "}
          <strong className="text-navy">a better understanding of where you are currently at.</strong>
        </p>
        <div className="w-14 h-[3px] bg-accent-gold rounded-sm mx-auto mb-10" />
        <button
          onClick={() => setStarted(true)}
          className="px-10 py-4 bg-navy text-white font-display text-[14px] font-bold uppercase tracking-[0.18em] rounded-lg transition-all duration-300 hover:bg-navy-light hover:shadow-lg hover:-translate-y-0.5"
        >
          Begin Questionnaire &rarr;
        </button>
        <p className="font-body text-text-muted text-[12px] italic mt-5">
          Takes about 5 minutes
        </p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="w-20 h-20 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="font-display text-navy font-extrabold text-[clamp(1.6rem,3.5vw,2.2rem)] mb-5">
          You&apos;re All Set.
        </h2>
        <p className="font-body text-text-secondary text-[16px] leading-[1.7] max-w-[480px] mx-auto mb-4">
          <strong className="text-navy">We&apos;ve got your answers.</strong> Your call is going to be significantly more productive because of this. Show up ready to go.
        </p>
        <p className="font-body text-text-muted text-[14px]">
          If you need to reschedule, check your confirmation email.
        </p>
      </div>
    );
  }

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
          {step.type === "email" && (
            <>
              <span className="font-body text-accent-gold text-[11px] font-bold uppercase tracking-[0.2em] block mb-4">
                Let&apos;s start
              </span>
              <h2 className="font-display text-navy font-extrabold text-[clamp(1.3rem,3vw,1.8rem)] leading-[1.2] mb-3">
                {step.label}
              </h2>
              <p className="font-body text-text-muted text-[14px] leading-[1.6] mb-8">
                {step.helper}
              </p>
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type="email"
                value={answers[step.name] || ""}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={step.placeholder}
                className="w-full px-4 py-3.5 bg-bg-card border border-black/[0.1] rounded-xl font-body text-[16px] text-text-primary outline-none transition-colors duration-200 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold/30 placeholder:text-text-muted/50"
              />
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
          {submitting ? "Submitting..." : isLast ? "Submit" : "Continue"}
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
