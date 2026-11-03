import Script from "next/script";

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Script id="hide-chat-widget" strategy="lazyOnload">
        {`
          (function hideChat() {
            var el = document.querySelector('[data-widget-id="69f904c5bde5e8ac0773cc9a"]');
            if (el) { el.remove(); return; }
            var iframes = document.querySelectorAll('iframe[src*="leadconnector"], iframe[src*="msgsndr"]');
            iframes.forEach(function(f) {
              if (f.closest('[data-widget-id]')) f.closest('[data-widget-id]').remove();
            });
            var style = document.createElement('style');
            style.textContent = '[data-widget-id="69f904c5bde5e8ac0773cc9a"], .lc_text_widget_container { display: none !important; }';
            document.head.appendChild(style);
            setTimeout(hideChat, 1000);
          })();
        `}
      </Script>
    </>
  );
}
