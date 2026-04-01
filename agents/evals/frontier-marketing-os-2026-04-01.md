# Campaign Evaluation: Frontier Marketing OS
**Date:** 2026-04-01
**Evaluator:** Themis (Evals Engineer)
**Campaign:** Frontier Marketing OS — Initial Marketing Strategy (FROA-1)
**Evaluation issue:** FROA-7

---

## Agent Scores

| Agent | Role | Task | Status | Accuracy (1-5) | Consistency (1-5) | Completeness (1-5) | Quality (1-5) | Differentiation (1-5) | Avg | Blockers |
|-------|------|------|--------|----------------|-------------------|--------------------|---------------|-----------------------|-----|----------|
| Minerva | Marketing Strategist | FROA-1 (Strategy) | done | 4 | 5 | 5 | 5 | 4 | **4.6** | None |
| Hermes | SEO | FROA-2 (SEO/AEO) | done | 3 | 5 | 5 | 4 | 4 | **4.2** | None |
| Calliope | Content | FROA-3 (Content) | in_progress | N/A | N/A | N/A | N/A | N/A | **N/A** | No deliverable submitted (P0 priority) |
| Mercury | Social | FROA-4 (Social Calendar) | done | 4 | 5 | 5 | 5 | 4 | **4.6** | None |
| Vesta | Community | FROA-5 (Community Plan) | done | 4 | 5 | 5 | 5 | 3 | **4.4** | None |
| Argus | QA | FROA-6 (QA Review) | in_progress | N/A | N/A | N/A | N/A | N/A | **N/A** | No review conducted yet |

**Overall Strategy Coherence Score: 4/5**
The 4 completed deliverables (Minerva, Hermes, Mercury, Vesta) are tightly aligned. Messaging hierarchy is visible and consistent across SEO, social, and community. Score capped at 4 due to 2 missing deliverables breaking the complete-campaign picture.

---

## Dimension-by-Dimension Notes

### Minerva (FROA-1)
- **Accuracy (4):** Citations strong — Paperclip 40K stars, $650B Solana volume, Colosseum 3K+ participants. Minor gap: "Francisco (oral surgeon)" and "Dotta" claims lack verifiable URLs. "Cathryn Lavery $55M" is plausible but unlinked.
- **Consistency (5):** Strategy is internally coherent. Messaging hierarchy propagated correctly to all sub-tasks.
- **Completeness (5):** ICP, JTBD, messaging hierarchy, distribution strategy, channel plan, delegation summary — all present.
- **Quality (5):** Highly specific. Proof points per message, KPIs per channel, named owners. Not generic.
- **Differentiation (4):** On-chain verification angle is genuinely differentiated. x402 + Anchor escrow is unique in the market. Could have named 1-2 direct competitors (e.g., Cookie3, Kols.fun) for sharper contrast.

### Hermes (FROA-2)
- **Accuracy (3):** Volume estimates not attributed to any keyword tool (Ahrefs, SEMrush, manual). Labeled "estimates" — acceptable caveat, but reviewers cannot verify. FAQ JSON-LD answer for "Best AI marketing agents for web3" states Frontier Marketing OS is "the leading" tool — promotional claim, not fact. FAQ answer for "How to market a crypto project in 2026" claims agents "sync with token activity" — feature claim needs product verification.
- **Consistency (5):** Meta tags, JSON-LD schemas, and MCP listings all use the approved messaging hierarchy from FROA-1. Voice is consistent across all 5 deliverables.
- **Completeness (5):** All 5 deliverables present — 25 keywords, 5-page meta tags, 3 JSON-LD types, 3 MCP registry listings, 7-tool AEO monitoring stack.
- **Quality (4):** Priority rationale is clear and actionable. MCP listings are platform-specific. AEO monitoring plan with query tracking and feedback loop is strong. Keyword list skews toward transactional which is correct for conversion path.
- **Differentiation (4):** FAQ answers explicitly name HubSpot and Buffer as inferior alternatives. MCP listings emphasize Solana-native identity. /vs-agency meta tag is well-positioned.

### Mercury (FROA-4)
- **Accuracy (4):** Proof points from messaging hierarchy used correctly throughout. "From 6 months of testing" in Week 3 EDU tweet is an internal attribution that cannot be verified — minor issue. Content mix percentage verification is present and correct (39%/29%/21%/11%).
- **Consistency (5):** All 28 posts maintain crypto-native voice. Technical-credible without corporate speak. "Ship," "degen," "alpha," "WAGMI" used appropriately and not excessively. PROMO posts use the approved "$180/month" and "7 AI agents" messaging exactly.
- **Completeness (5):** 28 posts with no placeholders, first-hour playbook, daily engagement routine, reply templates, hashtag strategy, QT strategy, Twitter Spaces plan, metrics framework.
- **Quality (5):** Best-in-campaign. Every single day has a specific hook, format, CTA, and target metric. Reply templates handle 4 distinct scenarios. First-hour playbook is minute-by-minute. Immediately executable.
- **Differentiation (4):** PROMO posts hit "no agency black box" and "on-chain verified" angles well. BTS posts focus on building-in-public transparency. Could push x402/escrow differentiation more in BTS posts — it's the biggest technical moat.

### Vesta (FROA-5)
- **Accuracy (4):** All 18 FAQ answers are product-specific. Technical claims (x402 mechanics, Anchor escrow flow) are consistent with FROA-1 strategy. Minor flag: "First content deliverables appear within 24 hours of funding" is stated in both FAQ (Q7) and the Day 1 milestone — this needs to be an accurate product promise, not a marketing claim.
- **Consistency (5):** FAQ answers are zero-generic. Every answer names Frontier Marketing OS, Paperclip, or specific agent names. Voice is consistently direct and technical-credible. No contradictions with strategy or other deliverables.
- **Completeness (5):** 18 FAQs (15+ required), 8-channel Discord structure with purpose/audience per channel, Day 1/3/7 milestones, 5-day weekly activity plan, 3 monthly events, 3 UGC campaigns, full escalation framework with 9 scenarios.
- **Quality (5):** Welcome message is warm and immediately actionable. Escalation framework is specific — not "escalate to team" but named timelines and paths. UGC campaigns are creative and tethered to crypto-native behaviors (on-chain screenshots, config drops).
- **Differentiation (3):** FAQ differentiates well (Q5 vs. agencies, Q8 x402 explanation). Community playbook activities (Monday prompt, Tuesday showcase) could apply to any SaaS. Missing: engagement activities that leverage the on-chain verification angle — e.g., "Share your agent's on-chain delivery proof" as a weekly UGC prompt.

---

## Patterns Detected

| Pattern | Example | Tally | Agents Affected |
|---------|---------|-------|-----------------|
| Unverifiable volume/metric estimates | Hermes keyword table has no source tool cited | 1 | Hermes |
| Promotional claims in technical SEO content | "the leading AI marketing agents for web3" in FAQ JSON-LD | 1 | Hermes |
| Community playbook activities generic (not product-specific) | Weekly Discord prompts not tied to on-chain/x402 differentiation | 1 | Vesta |
| Missing deliverable on P0 task | Calliope: no output on highest-priority content task | 1 | Calliope |
| QA gate missed | Argus: no review conducted, deliverables un-gated | 1 | Argus |

*No pattern has reached tally ≥ 3 — no systemic AGENTS.md rule required yet. Track in future campaigns.*

---

## Top 3 Strengths

1. **Mercury's 28-day calendar is production-ready.** Every post has a specific hook, CTA, and metric target. No placeholders. The first-hour playbook is minute-by-minute. A founder could start executing tomorrow morning.

2. **Vesta's FAQ has zero generic answers.** All 18 questions are specific to Frontier Marketing OS with concrete product references (agent names, x402, Anchor escrow, Paperclip board). This is rare — most FAQs drift generic.

3. **Hermes' AEO targeting is sophisticated.** JSON-LD FAQPage schema maps to 5 exact low-competition queries where AI assistants currently lack a clear citation. The monitoring plan with 7 tools and a citation improvement loop creates a feedback flywheel.

---

## Top 3 Improvement Areas

1. **Calliope (FROA-3) has not delivered any P0 content.** README/landing page copy and 3 Twitter threads are missing. These are critical-path for launch — no page to send traffic to, no threads to seed awareness. Blocking issue.

2. **Hermes' keyword volume estimates lack source attribution.** The keyword table has no tool cited (Ahrefs, SEMrush, or manual estimate). Estimates cannot be verified or updated without knowing the source methodology.

3. **Vesta's community playbook differentiation is weak.** Weekly engagement activities could apply to any SaaS. The on-chain verification angle — Frontier Marketing OS's biggest differentiator — is underrepresented in community touchpoints.

---

## Recommendations for Iteration (Before Launch)

1. **[Calliope — Critical]** Unblock FROA-3 immediately. README copy and 3 Twitter threads are P0 and must land before any traffic is sent. Check for blockers; if unresponsive, escalate to Minerva.

2. **[Hermes — Medium]** Add a "Data Source" column to the keyword table or a footer note identifying the tool used (e.g., "Estimates via Ahrefs, March 2026"). Also soften the JSON-LD FAQ answer claiming "leading AI marketing agents" to cite proof (e.g., "Frontier Marketing OS is purpose-built for web3, unlike generic tools like HubSpot or Buffer...").

3. **[Vesta — Low]** Add 1 on-chain-specific UGC campaign to the community playbook — e.g., "Share your agent's verified delivery transaction" or "Post your Anchor escrow hash to #show-your-output." This makes the on-chain moat tangible in community culture.

4. **[Argus — Critical]** Begin QA review immediately. Hermes, Mercury, and Vesta deliverables have been done for hours without review. The QA gate must run before campaign goes live.

---

## Corrections Log Updates

New entries added to `/corrections-log.md`:
- Hermes: Keyword estimates without source tool (tally: 1)
- Hermes: Promotional factual claim in technical SEO JSON-LD (tally: 1)
- Vesta: Community activities generic, not product-differentiated (tally: 1)
- Calliope: P0 task incomplete at evaluation time (tally: 1)
- Argus: QA gate missed — deliverables un-reviewed (tally: 1)
