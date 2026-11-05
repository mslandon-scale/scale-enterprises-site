"use client";

import Script from "next/script";

/** Embeds a GoHighLevel form by id. Renders a clearly marked placeholder while the id is unset. */
export default function GhlFormEmbed({
  formId,
  title,
  placeholderLabel,
  minHeight = 520,
}: {
  formId: string;
  title: string;
  placeholderLabel?: string;
  minHeight?: number;
}) {
  if (formId.startsWith("REPLACE_")) {
    return (
      <div
        data-placeholder="ghl-form"
        className="rounded-2xl border-2 border-dashed border-[#C9A227] bg-[#C9A227]/5 p-8 text-center"
      >
        <p className="font-display text-sm font-bold uppercase tracking-widest text-[#C9A227]">
          Placeholder: GoHighLevel form
        </p>
        <p className="mt-2 font-body text-[15px] text-[#555]">
          {placeholderLabel ?? title} will appear here once its GHL form ID is set.
        </p>
      </div>
    );
  }
  return (
    <>
      <iframe
        id={`inline-${formId}`}
        data-form-id={formId}
        src={`https://api.leadconnectorhq.com/widget/form/${formId}`}
        title={title}
        style={{ width: "100%", border: "none", minHeight }}
      />
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </>
  );
}