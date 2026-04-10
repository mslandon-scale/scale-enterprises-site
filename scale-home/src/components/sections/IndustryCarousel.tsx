"use client";

const industries = [
  { label: "Agencies", icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-accent-gold"><path d="M17 3L3 9l5 2 2 5 7-13z" /></svg> },
  { label: "Coaches & Consultants", icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-accent-gold"><circle cx="10" cy="10" r="7" /><circle cx="10" cy="10" r="3" /><line x1="10" y1="3" x2="10" y2="1" /><line x1="10" y1="19" x2="10" y2="17" /></svg> },
  { label: "Construction & Trades", icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-accent-gold"><path d="M14 2l4 4-9 9-4 1 1-4 9-9z" /><path d="M2 18h16" /></svg> },
  { label: "Finance & Accounting", icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-accent-gold"><line x1="10" y1="2" x2="10" y2="18" /><path d="M14 6H8.5a2.5 2.5 0 000 5H12a2.5 2.5 0 010 5H6" /></svg> },
  { label: "Health & Wellness", icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-accent-gold"><path d="M3.5 8.5a4 4 0 017-2.5 4 4 0 017 2.5c0 4-7 8-7 8s-7-4-7-8z" /></svg> },
  { label: "IT & Software", icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-accent-gold"><rect x="2" y="3" width="16" height="11" rx="2" /><line x1="6" y1="17" x2="14" y2="17" /><line x1="10" y1="14" x2="10" y2="17" /></svg> },
  { label: "Legal", icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-accent-gold"><line x1="10" y1="2" x2="10" y2="18" /><path d="M4 6l6-3 6 3" /><path d="M4 6v2a6 6 0 006 6" /><path d="M16 6v2a6 6 0 01-6 6" /><line x1="6" y1="18" x2="14" y2="18" /></svg> },
  { label: "Manufacturing", icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-accent-gold"><path d="M2 17V9l5-3v5l5-3v5l5-3v7H2z" /><line x1="2" y1="17" x2="18" y2="17" /></svg> },
  { label: "Real Estate", icon: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-accent-gold"><path d="M3 18V8l7-5 7 5v10H3z" /><rect x="8" y="12" width="4" height="6" /></svg> },
];

// Triple for seamless loop
const tripled = [...industries, ...industries, ...industries];

export default function IndustryCarousel() {
  return (
    <div className="w-full overflow-hidden pt-16 pb-4">
      <p className="font-body text-[11px] uppercase tracking-eyebrow text-text-muted font-semibold text-center mb-6">
        We Work With Service Businesses Across Every Industry
      </p>

      <div className="relative">
        {/* Edge fades matching hero white bg */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="flex animate-scroll w-fit">
          {tripled.map((industry, i) => (
            <div
              key={`${industry.label}-${i}`}
              className="flex-shrink-0 mx-2.5"
            >
              <div className="flex items-center gap-2.5 bg-bg-alt border border-black/[0.08] rounded-full px-5 py-2.5 whitespace-nowrap">
                {industry.icon}
                <span className="font-body text-[13px] font-semibold text-navy">
                  {industry.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
