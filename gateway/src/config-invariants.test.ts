import { describe, it, expect } from "vitest";
import { AGENT_ROLES } from "./paperclip-client.js";

/**
 * Config invariant tests — validate cross-file configuration relationships.
 * Catches "impossible configuration" bugs before they reach production.
 */

describe("Config Invariants", () => {
  describe("Agent configuration", () => {
    it("all agents have valid timeout (300-1800s)", () => {
      for (const role of AGENT_ROLES) {
        expect(role.timeoutSec).toBeGreaterThanOrEqual(300);
        expect(role.timeoutSec).toBeLessThanOrEqual(1800);
      }
    });

    it("all agents have valid maxTurns (5-50)", () => {
      for (const role of AGENT_ROLES) {
        expect(role.maxTurns).toBeGreaterThanOrEqual(5);
        expect(role.maxTurns).toBeLessThanOrEqual(50);
      }
    });

    it("CEO exists and uses frontier model", () => {
      const ceo = AGENT_ROLES.find((r) => r.role === "CEO");
      expect(ceo).toBeDefined();
      if (!ceo) return;
      expect(ceo.model).toContain("opus");
    });

    it("exactly one CEO role", () => {
      const ceos = AGENT_ROLES.filter((r) => r.role === "CEO");
      expect(ceos).toHaveLength(1);
    });

    it("deliverables expected <= number of IC agents", () => {
      const ics = AGENT_ROLES.filter((r) => r.role === "IC");
      // 6 deliverables expected (env default), 6 ICs
      expect(ics.length).toBeGreaterThanOrEqual(6);
    });

    it("CEO timeout >= IC timeout (CEO orchestrates, needs more time)", () => {
      const ceo = AGENT_ROLES.find((r) => r.role === "CEO");
      expect(ceo).toBeDefined();
      if (!ceo) return;
      const ics = AGENT_ROLES.filter((r) => r.role === "IC");
      for (const ic of ics) {
        expect(ceo.timeoutSec).toBeGreaterThanOrEqual(ic.timeoutSec);
      }
    });

    it("CEO maxTurns >= IC maxTurns", () => {
      const ceo = AGENT_ROLES.find((r) => r.role === "CEO");
      expect(ceo).toBeDefined();
      if (!ceo) return;
      const ics = AGENT_ROLES.filter((r) => r.role === "IC");
      for (const ic of ics) {
        expect(ceo.maxTurns).toBeGreaterThanOrEqual(ic.maxTurns);
      }
    });

    it("all instructionsFile values are unique", () => {
      const files = AGENT_ROLES.map((r) => r.instructionsFile);
      expect(new Set(files).size).toBe(files.length);
    });

    it("all agent names are unique", () => {
      const names = AGENT_ROLES.map((r) => r.name);
      expect(new Set(names).size).toBe(names.length);
    });
  });

  describe("Economic alignment", () => {
    it("total monthly budget is documented and reasonable", () => {
      const total = AGENT_ROLES.reduce((sum, r) => sum + r.monthlyBudget, 0);
      // $175/month for 7 agents — document this as known hackathon pricing
      expect(total).toBeLessThanOrEqual(300); // alert if someone inflates budgets
      expect(total).toBeGreaterThan(0);
    });
  });
});
