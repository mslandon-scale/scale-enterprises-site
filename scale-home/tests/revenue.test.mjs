// Run: node --test tests/revenue.test.mjs   (Node 22.6+/24 strips TS types natively)
import test from "node:test";
import assert from "node:assert/strict";
import {
  revenueQualifies, extractRevenue, isFormSubmitMessage, redirectFor,
} from "../src/lib/revenue.ts";

const F = "GWR40KA9Eh6A0LnJN2g9";

test("revenueQualifies: live dropdown options", () => {
  assert.equal(revenueQualifies("Less than $500k"), false);
  assert.equal(revenueQualifies("$500k-$1M"), true);
  assert.equal(revenueQualifies("$1M-$5M"), true);
  assert.equal(revenueQualifies("$5M-$10M"), true);
  assert.equal(revenueQualifies("$10M+"), true);
});
test("revenueQualifies: other under-$500K phrasings", () => {
  for (const s of ["Under $250K", "Under $500K", "below $500k", "< $500k", "<$500K",
    "$250K - $500K", "$0 - $250K", "$100,000", "0", "$499,999", "Less Than $500K"]) {
    assert.equal(revenueQualifies(s), false, s);
  }
});
test("revenueQualifies: other $500K+ phrasings", () => {
  for (const s of ["$500K - $1M", "500k-1m", "$500,000", "$2,000,000", "$1M+", "$5M+", "1.5M", "$1B"]) {
    assert.equal(revenueQualifies(s), true, s);
  }
});
test("revenueQualifies: undeterminable", () => {
  for (const v of ["", "  ", "n/a", null, undefined, 5, {}]) assert.equal(revenueQualifies(v), null, String(v));
});

test("isFormSubmitMessage", () => {
  assert.ok(isFormSubmitMessage({ type: "form:submit", data: {} }));
  assert.ok(isFormSubmitMessage(JSON.stringify({ type: "form:submit" })));
  assert.ok(isFormSubmitMessage(["form:submit", {}]));
  assert.ok(isFormSubmitMessage({ event: "form_submit" }));
  assert.ok(!isFormSubmitMessage({ type: "set-sticky-contacts" }));
  assert.ok(!isFormSubmitMessage(null));
});

test("extractRevenue + redirectFor: sample payload shapes", () => {
  const cases = [
    [{ type: "form:submit", data: { [F]: "Less than $500k" } }, "/not-a-fit"],
    [{ type: "form:submit", data: { [F]: "$500k-$1M" } }, "/book"],
    [{ type: "form:submit", data: { [F]: "$10M+" } }, "/book"],
    [{ type: "form:submit", data: { [F]: ["Less than $500k"] } }, "/not-a-fit"],
    [{ type: "form:submit", data: { [F]: { value: "Less than $500k" } } }, "/not-a-fit"],
    [{ type: "form:submit", data: { fields: { [F]: "Less than $500k" } } }, "/not-a-fit"],
    [{ type: "form:submit", data: { values: [{ id: F, value: "x" }], [F]: "$1M-$5M" } }, "/book"],
    [{ type: "form:submit", data: { annual_revenue: "Less than $500k" } }, "/not-a-fit"],
    [{ type: "form:submit", data: { "Annual Revenue": "$5M-$10M" } }, "/book"],
    [{ type: "form:submit", data: { name: "A", phone: "+1 555 123 4567", answer: "Less than $500k" } }, "/not-a-fit"],
    [JSON.stringify({ type: "form:submit", data: { [F]: "Less than $500k" } }), "/not-a-fit"],
    [["form:submit", { [F]: "Less than $500k" }], "/not-a-fit"],
    // undeterminable -> fail open to /book
    [{ type: "form:submit", data: { name: "A" } }, "/book"],
    [{ type: "form:submit" }, "/book"],
  ];
  for (const [payload, dest] of cases) {
    assert.equal(redirectFor(payload), dest, JSON.stringify(payload));
  }
  assert.equal(extractRevenue({ data: { phone: "+15551234567" } }), null);
});