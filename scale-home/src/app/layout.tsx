import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.scaleenterprises.com"),
  title: {
    default: "Scale Enterprises | Enterprise Scaling and Development Firm",
    template: "%s | Scale Enterprises",
  },
  description:
    "Scale Enterprises helps service-business owners design, engineer and lead an enterprise-level business that scales and runs without them, enabled with AI.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Scale Enterprises",
    url: "https://www.scaleenterprises.com/",
    title:
      "Scale Enterprises | Enterprise-Level Businesses That Run Without You",
    description:
      "Design. Engineer. Lead. Enterprise-level strategy, private equity-caliber engineering, and leadership and accountability systems, all enabled with AI.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Scale Enterprises | Enterprise-Level Businesses That Run Without You",
    description:
      "Design. Engineer. Lead. Build a business that scales and runs without you.",
    images: ["/og.png"],
  },
  other: {
    "application-name": "Scale Enterprises",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Scale Enterprises",
              alternateName: "Scale Enterprises LLC",
              url: "https://www.scaleenterprises.com",
            }),
          }}
        />
      </head>
      <body className="font-body antialiased bg-white text-text-primary overflow-x-hidden">
        {children}
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="69f904c5bde5e8ac0773cc9a"
          data-source="WEB_USER"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
