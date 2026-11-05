import Image from "next/image";
import Link from "next/link";

/**
 * The one site header. Used on every page that has navigation
 * (home, /book, /contact, /disclaimer, /not-a-fit). No dropdowns, no menus.
 * /waitlist is a focused landing page and shows only a centered logo instead.
 */
const linkClass =
  "font-body text-[12px] sm:text-[13px] font-bold uppercase tracking-widest text-[#555] hover:text-[#0B1F4B] transition-colors";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#0B1F4B]/10 bg-white/90 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-5 sm:py-4"
      >
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Scale Enterprises" width={36} height={36} className="h-9 w-9" />
          <span className="hidden font-display text-lg font-bold uppercase tracking-[0.12em] text-[#0B1F4B] sm:inline">
            Scale Enterprises
          </span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-5">
          <Link href="/#about" className={linkClass}>About</Link>
          <Link href="/waitlist" className={`hidden sm:inline ${linkClass}`}>Waitlist</Link>
          <Link href="/contact" className={linkClass}>Contact</Link>
          <Link
            href="/book"
            className="rounded-full bg-[#C9A227] px-4 py-2.5 font-body text-[12px] font-bold uppercase tracking-widest text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D4AF37] sm:px-6 sm:py-3 sm:text-sm"
          >
            Book a Call
          </Link>
        </div>
      </nav>
    </header>
  );
}