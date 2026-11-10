import { describe, expect, it } from "vitest";
import { SURPRISES, pickSurprise, validateCollection } from "./surprises";

describe("surprise engine", () => {
  it("has at least 25 valid, unique entries across 5 categories", () => {
    const valid = validateCollection(SURPRISES);
    expect(valid.length).toBe(SURPRISES.length);
    expect(valid.length).toBeGreaterThanOrEqual(25);
    expect(new Set(valid.map((s) => s.category)).size).toBe(5);
  });

  it("returns null for an empty or fully invalid collection", () => {
    expect(pickSurprise([])).toBeNull();
    expect(pickSurprise([{ id: "" }, null])).toBeNull();
  });

  it("maps rng ranges evenly onto every entry", () => {
    const n = SURPRISES.length;
    const hits = new Set<string>();
    for (let i = 0; i < n; i++) hits.add(pickSurprise(SURPRISES, () => (i + 0.5) / n)!.id);
    expect(hits.size).toBe(n);
    expect(pickSurprise(SURPRISES, () => 0.9999999)!.id).toBe(SURPRISES[n - 1]!.id);
  });

  it("is roughly uniform and allows repeats", () => {
    const counts = new Map<string, number>();
    const trials = 50000;
    for (let i = 0; i < trials; i++) {
      const s = pickSurprise()!;
      counts.set(s.id, (counts.get(s.id) ?? 0) + 1);
    }
    const expected = trials / SURPRISES.length;
    expect(counts.size).toBe(SURPRISES.length);
    for (const c of counts.values()) expect(Math.abs(c - expected) / expected).toBeLessThan(0.15);
  });

  it("skips invalid entries", () => {
    const s = pickSurprise([{ bad: true }, SURPRISES[0]], () => 0.99);
    expect(s?.id).toBe(SURPRISES[0]!.id);
  });
});
