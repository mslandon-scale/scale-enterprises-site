import type { Metadata } from "next";
import Script from "next/script";
import QuestionnaireForm from "@/components/QuestionnaireForm";

export const metadata: Metadata = {
  title: "Enterprise Challenge Application | Scale Enterprises",
  robots: "noindex, nofollow",
};

export default function QuestionnaireEmbed() {
  return (
    <>
      <main className="min-h-screen bg-transparent py-8">
        <div className="max-w-[800px] mx-auto px-6">
          <QuestionnaireForm />
        </div>
      </main>
      <footer className="py-6 border-t border-black/[0.06]">
        <div className="max-w-[800px] mx-auto px-6 flex flex-col items-center gap-3">
          <div className="flex items-center gap-4 font-body text-[12px] text-text-muted">
            <a href="https://scaleenterprises.com/terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:text-navy transition-colors">Terms of Service</a>
            <span className="text-black/20">|</span>
            <a href="https://scaleenterprises.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-navy transition-colors">Privacy Policy</a>
            <span className="text-black/20">|</span>
            <a href="https://scaleenterprises.com/disclaimer" target="_blank" rel="noopener noreferrer" className="hover:text-navy transition-colors">Disclaimer</a>
          </div>
          <p className="font-body text-[11px] text-text-muted/60">
            &copy; {new Date().getFullYear()} Scale Enterprises. All rights reserved.
          </p>
        </div>
      </footer>
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
      <Script id="meta-pixel" strategy="afterInteractive">{`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '4492756547619515');
        fbq('track', 'PageView');
      `}</Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=4492756547619515&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
    </>
  );
}
