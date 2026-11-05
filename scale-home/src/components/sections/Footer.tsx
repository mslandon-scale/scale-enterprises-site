import Link from "next/link";

const linkClass =
  "font-body text-[14px] text-gray-600 hover:text-navy transition-colors duration-200";

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-gray-200 bg-white pb-6 pt-10">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <span className="font-display text-[14px] font-bold uppercase tracking-[0.1em] text-navy">
              Scale Enterprises
            </span>
            <p className="mt-3 max-w-xs font-body text-[13px] leading-[1.7] text-gray-500">
              We help service-business owners design, engineer and lead an
              enterprise-level business that scales and runs without them.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-body text-[11px] uppercase tracking-widest text-gray-500">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/#about" className={linkClass}>About</Link></li>
              <li><Link href="/book" className={linkClass}>Book a Strategy Call</Link></li>
              <li><Link href="/waitlist" className={linkClass}>Waitlist</Link></li>
              <li><Link href="/contact" className={linkClass}>Contact</Link></li>
              <li><a href="https://app.scaleenterprises.com/login" className={linkClass}>Log In</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-body text-[11px] uppercase tracking-widest text-gray-500">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className={linkClass}>Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className={linkClass}>Terms of Service</Link></li>
              <li><Link href="/disclaimer" className={linkClass}>Disclaimer</Link></li>
              <li><Link href="/california-privacy" className={linkClass}>California Notice</Link></li>
            </ul>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center font-body text-[12px] leading-relaxed text-gray-500">
          Income and results disclaimer: Results mentioned on this page are not typical.
          Individual results will vary based on effort, experience, business model, and
          market conditions. Scale Enterprises makes no guarantees of specific outcomes.
        </p>
        <p className="mt-4 text-center font-body text-[12px] text-gray-500">
          &copy; {new Date().getFullYear()} Scale Enterprises LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}