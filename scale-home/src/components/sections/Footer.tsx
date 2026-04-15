const platformLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Enterprise Coaching", href: "#platform" },
  { label: "Managed Services", href: "#platform" },
  { label: "Command Center", href: "#how-it-works" },
];

const companyLinks = [
  { label: "About", href: "#about" },
  { label: "Free Masterclass", href: "https://course.scaleenterprises.com/register" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-bg-navy pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <span className="font-display text-[14px] tracking-[0.1em] text-white font-bold uppercase">
              SCALE ENTERPRISES
            </span>
            <p className="font-body text-[13px] text-white/40 max-w-xs mt-3 leading-[1.7]">
              We help service businesses become enterprises. 30 days to transformation,
              90 minutes a week to operate.
            </p>

            <h4 className="font-body text-[11px] uppercase tracking-widest text-white/40 mt-6 mb-2">
              Disclaimer
            </h4>
            <p className="font-body text-[13px] text-white/40 max-w-xs leading-[1.7]">
              Income and results disclaimer: Results mentioned on this page are not typical.
              Individual results will vary based on effort, experience, business model, and
              market conditions. Scale Enterprises makes no guarantees of specific outcomes.
            </p>
          </div>

          <div>
            <h4 className="font-body text-[11px] uppercase tracking-widest text-white/40 mb-4">
              Platform
            </h4>
            <ul className="space-y-2">
              {platformLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="font-body text-[14px] text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body text-[11px] uppercase tracking-widest text-white/40 mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="font-body text-[14px] text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="h-px bg-white/[0.08]" />

        <div className="flex flex-col md:flex-row items-center justify-between pt-6 gap-4">
          <p className="font-body text-[12px] text-white/30">
            © 2026 Scale Enterprises. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="/privacy-policy" className="font-body text-[12px] text-white/30 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="font-body text-[12px] text-white/30 hover:text-white transition-colors">
              Terms
            </a>
            <a href="/disclaimer" className="font-body text-[12px] text-white/30 hover:text-white transition-colors">
              Disclaimer
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
