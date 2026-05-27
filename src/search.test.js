import { describe, it, expect } from "vitest";
import { searchFaqs } from "./search";

const faqs = [
    { id: 1, question: "How do I reset my password?", answer: "Click forgot password on login screen.", category: "Account" },
    { id: 2, question: "How do I update my billing information?", answer: "Go to billing settings page.", category: "Billing" },
    { id: 3, question: "Why is the app running slow?", answer: "Try clearing your browser cache.", category: "Technical" },
];

describe("searchFaqs", () => {
    it("returns at least one result for a matching query", () => {
        const results = searchFaqs("password", faqs);
        expect(results.length).toBeGreaterThan(0);
    });

    it("returns empty array for blank query", () => {
        const results = searchFaqs("   ", faqs);
        expect(results.length).toBe(0);
    });

    it("returns empty array for query with no matches", () => {
        const results = searchFaqs("xyznothing", faqs);
        expect(results.length).toBe(0);
    });

    it("returns max 3 results", () => {
        const results = searchFaqs("how", faqs);
        expect(results.length).toBeLessThanOrEqual(3);
    });
});