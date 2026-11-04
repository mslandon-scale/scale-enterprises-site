const platformLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Enterprise Coaching", href: "#platform" },
  { label: "Managed Services", href: "#platform" },
  { label: "Enterprise HQ", href: "https://app.scaleenterprises.com" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Enterprise Playbook", href: "https://go.scaleenterprises.com/ent-playbook-lp" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-white border-t border-gray-200 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <span className="font-display text-[14px] tracking-[0.1em] text-navy font-bold uppercase">
              SCALE ENTERPRISES
            </span>
            <p className="font-body text-[13px] text-gray-500 max-w-xs mt-3 leading-[1.7]">
              We help service businesses become enterprises — with the systems, team,
              and growth engine to run without you.
            </p>

            <h4 className="font-body text-[11px] uppercase tracking-widest text-gray-500 mt-6 mb-2">
              Disclaimer
            </h4>
            <p className="font-body text-[13px] text-gray-500 max-w-xs leading-[1.7]">
              Income and results disclaimer: Results mentioned on this page are not typical.
              Individual results will vary based on effort, experience, business model, and
              market conditions. Scale Enterprises makes no guarantees of specific outcomes.
            </p>
          </div>

          <div>
            <h4 className="font-body text-[11px] uppercase tracking-widest text-gray-500 mb-4">
              Platform
            </h4>
            <ul className="space-y-2">
              {platformLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="font-body text-[14px] text-gray-600 hover:text-navy transition-colors duration-200"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body text-[11px] uppercase tracking-widest text-gray-500 mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="font-body text-[14px] text-gray-600 hover:text-navy transition-colors duration-200"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body text-[11px] uppercase tracking-widest text-gray-500 mb-4">
              Contact
            </h4>
            <a
              href="tel:+13854028330"
              className="font-body text-[14px] text-gray-600 hover:text-navy transition-colors duration-200"
            >
              +1 385-402-8330
            </a>
            <a
              href="mailto:support@scaleenterprises.com"
              className="font-body text-[14px] text-gray-600 hover:text-navy transition-colors duration-200 block mt-2"
            >
              support@scaleenterprises.com
            </a>

            <h4 className="font-body text-[11px] uppercase tracking-widest text-gray-500 mt-8 mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/privacy-policy" className="font-body text-[14px] text-gray-600 hover:text-navy transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="font-body text-[14px] text-gray-600 hover:text-navy transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/disclaimer" className="font-body text-[14px] text-gray-600 hover:text-navy transition-colors duration-200">
                  Disclaimer
                </a>
              </li>
            </ul>

            <p className="font-body text-[12px] text-gray-500 mt-8">
              © 2026 Scale Enterprises. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
