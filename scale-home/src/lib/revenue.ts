/**
 * Revenue parsing + GHL form-submit payload helpers for the strategy-call
 * qualifying redirect ($500K+ -> /book, under $500K -> /not-a-fit).
 * Pure functions, no imports, so they can be unit-tested with plain node.
 */

export const GHL_REVENUE_FIELD_ID = "GWR40KA9Eh6A0LnJN2g9";

/**
 * true  = $500K or more
 * false = under $500K
 * null  = could not be determined
 *
 * Handles dropdown values such as "Less than $500k", "$500k-$1M", "$1M-$5M",
 * "$5M-$10M", "$10M+", "Under $250K", "$250K - $500K", "500k-1m", "$2,000,000".
 */
export function revenueQualifies(raw: unknown): boolean | null {
  if (typeof raw !== "string") return null;
  const v = raw.trim().toLowerCase();
  if (!v) return null;

  // Explicit "under" wording or a leading "<" means below the threshold.
  if (/\b(?:under|less\s*than|below)\b/.test(v) || /^</.test(v)) return false;

  // Use the lower bound of the range ("$500k-$1M" -> 500k, "$10M+" -> 10M).
  const compact = v.replace(/[$,\s]/g, "");
  const m = compact.match(/^(\d+(?:\.\d+)?)(k|m|b)?/);
  if (m) {
    let amount = parseFloat(m[1]);
    const suffix = m[2] || "";
    if (suffix === "k") amount *= 1_000;
    else if (suffix === "m") amount *= 1_000_000;
    else if (suffix === "b") amount *= 1_000_000_000;
    if (amount >= 500_000) return true;
    if (amount >= 0) return false;
  }
  return null;
}

function asText(value: unknown): string | null {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) {
    for (const item of value) {
      const t = asText(item);
      if (t) return t;
    }
    return null;
  }
  if (value && typeof value === "object") {
    const o = value as Record<string, unknown>;
    return asText(o.value ?? o.label ?? o.text ?? null);
  }
  return null;
}

function findByKey(node: unknown, test: (k: string) => boolean, depth = 0): string | null {
  if (!node || typeof node !== "object" || depth > 5) return null;
  if (Array.isArray(node)) {
    for (const item of node) {
      const r = findByKey(item, test, depth + 1);
      if (r) return r;
    }
    return null;
  }
  const obj = node as Record<string, unknown>;
  for (const [k, v] of Object.entries(obj)) {
    if (test(k)) {
      const t = asText(v);
      if (t) return t;
    }
  }
  for (const v of Object.values(obj)) {
    const r = findByKey(v, test, depth + 1);
    if (r) return r;
  }
  return null;
}

function findRevenueLikeValue(node: unknown, depth = 0): string | null {
  if (depth > 5 || node == null) return null;
  if (typeof node === "string") {
    return /\$\s?\d|less\s*than|under\s|below\s/i.test(node) && revenueQualifies(node) !== null
      ? node
      : null;
  }
  if (typeof node !== "object") return null;
  for (const v of Object.values(node as object)) {
    const r = findRevenueLikeValue(v, depth + 1);
    if (r) return r;
  }
  return null;
}

/** Normalise a postMessage payload: JSON strings are parsed. */
function normalise(msg: unknown): unknown {
  if (typeof msg === "string") {
    try {
      return JSON.parse(msg);
    } catch {
      return msg;
    }
  }
  return msg;
}

/** True when the message looks like a GHL form-submit event. */
export function isFormSubmitMessage(raw: unknown): boolean {
  const msg = normalise(raw);
  const isSubmit = (s: unknown) =>
    typeof s === "string" && /^form[:_\-.]?submit(?:ted)?$/i.test(s);
  if (Array.isArray(msg)) return msg.some(isSubmit);
  if (msg && typeof msg === "object") {
    const o = msg as Record<string, unknown>;
    return isSubmit(o.type) || isSubmit(o.event) || isSubmit(o.action) || isSubmit(o.name);
  }
  return isSubmit(msg);
}

/**
 * Pull the revenue answer out of a form-submit payload. Looks for the field id
 * first (anywhere in the payload), then keys that mention "revenue", then any
 * value that looks like a revenue range.
 */
export function extractRevenue(raw: unknown): string | null {
  const msg = normalise(raw);
  return (
    findByKey(msg, (k) => k === GHL_REVENUE_FIELD_ID) ??
    findByKey(msg, (k) => /revenue/i.test(k)) ??
    findRevenueLikeValue(msg)
  );
}

/** Destination after a strategy-form submit. Unknown answers go to /book. */
export function redirectFor(raw: unknown): "/book" | "/not-a-fit" {
  return revenueQualifies(extractRevenue(raw)) === false ? "/not-a-fit" : "/book";
}