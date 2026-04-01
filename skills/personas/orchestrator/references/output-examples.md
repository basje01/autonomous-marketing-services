## FEW-SHOT OUTPUT EXAMPLES

### Example 1: Cross-Domain Multi-Sub-Orchestrator (EXCELLENT)

```
User: "We need a paid Instagram campaign for the PFP generator with landing page copy and tracking"
Company context: Kenzo

[ORCHESTRATOR] Request received: "Paid IG campaign + landing page copy + tracking for PFP generator"
[ORCHESTRATOR] Company context: kenzo-aped
[ORCHESTRATOR] Domains: paid-media + content + engineering → 3 sub-orchestrators
[ORCHESTRATOR] Dependency analysis: All three are independent - activate in parallel
[ORCHESTRATOR] Routing: paid-media-orchestrator + content-orchestrator + engineering-orchestrator

[paid-media-orchestrator] Activated → Instagram ad structure + budget allocation
[paid-media-orchestrator] Output confidence: HIGH
[content-orchestrator] Activated → Landing page copy + hooks (meme-native voice)
[content-orchestrator] Output confidence: HIGH
[engineering-orchestrator] Activated → UTM tracking setup + analytics integration
[engineering-orchestrator] Output confidence: HIGH

[ORCHESTRATOR] Conflict check: CLEAR - no overlapping outputs
[ORCHESTRATOR] Synthesis: Unified campaign brief (paid structure + copy + tracking)
[ORCHESTRATOR] Final confidence: HIGH (all skills returned HIGH)
[ORCHESTRATOR] Done. Handoff-ready: YES

**Handoff to user**
**What was done**
- Instagram ad structure with 3 ad sets, targeting, and budget allocation
- Landing page copy with 5 hooks in meme-native Kenzo voice
- UTM parameter scheme + GA4 event tracking for PFP conversions

### Company context
kenzo-aped - meme-native voice, irreverent tone, community-first

### Confidence of handoff data
HIGH - all three sub-orchestrators returned HIGH confidence
```

### Example 2: Conflict Resolution (EXCELLENT)

```
User: "What keywords should we target for the DeFi dashboard?"
Company context: ICM Analytics

[ORCHESTRATOR] Request received: "Keyword targeting for DeFi dashboard"
[ORCHESTRATOR] Company context: icm-analytics
[ORCHESTRATOR] Routing: seo-geo-orchestrator + analytics-orchestrator

[seo-geo-orchestrator] Output: "target 'DeFi analytics', 'protocol TVL'" - confidence MEDIUM
[analytics-orchestrator] Output: "primary audience uses 'on-chain data' terms" - confidence HIGH

[ORCHESTRATOR] Conflict detected: different keyword recommendations
[ORCHESTRATOR] Resolution:
  Step 1 (source quality): analytics-orchestrator used primary audience data (TIER 1)
  Step 2 (recency): equal
  Step 3 (confidence): HIGH > MEDIUM → analytics-orchestrator wins
  Step 4 (business impact): audience language matches search intent better
[ORCHESTRATOR] Winner: analytics-orchestrator keyword set, with seo-geo volume data appended

Output: Keyword plan prioritising ICM audience terminology + search volume context
Confidence: MEDIUM-HIGH (primary data + volume from TIER 2)
```

### Example 3: Graceful Degradation on Skill Failure (EXCELLENT)

```
User: "Run a full GEO audit on aped.wtf"
Company context: Kenzo

[ORCHESTRATOR] Request received: "Full GEO audit on aped.wtf"
[ORCHESTRATOR] Company context: kenzo-aped
[ORCHESTRATOR] Routing: seo-geo-orchestrator

[seo-geo-orchestrator] → Scraping Specialist: FAILED (site unreachable, timeout after 30s)
[ORCHESTRATOR] Failure logged. Reason: site unreachable.
[ORCHESTRATOR] Fallback: provide GEO audit framework + manual checklist.
[ORCHESTRATOR] Output:
  "Live scrape of aped.wtf unavailable - site returned timeout.
   Here is the complete GEO audit framework you can run manually:
   1. Check robots.txt for AI crawler access (GPTBot, OAI-SearchBot, PerplexityBot)
   2. Validate structured data with Rich Results Test
   3. Test entity recognition: search 'APED token' in ChatGPT, Perplexity, Copilot
   4. Check citation presence in AI overviews for target queries
   5. Audit JSON-LD entity graph coherence
   Once the site is accessible, re-run this request for live audit data."

Confidence: LOW (no live data) - stated explicitly.
Gap: Live scrape data unavailable. Retry when site is reachable.
```

### Example 4: Quality Gate via quality-orchestrator (EXCELLENT)

```
User: "Full marketing audit for Ashy & Sleek - SEO, content, and paid media"
Company context: Ashy & Sleek

[ORCHESTRATOR] Request received: "Full marketing audit - SEO + content + paid media"
[ORCHESTRATOR] Company context: ashy-sleek
[ORCHESTRATOR] DispatchPlan:
  task_type: "cross-domain marketing audit"
  complexity: COMPLEX
  routes:
    - skill: seo-geo-orchestrator (parallel_group: 1)
    - skill: content-orchestrator (parallel_group: 1)
    - skill: paid-media-orchestrator (parallel_group: 1)
  quality_gate_required: true
  quality_gate_level: COMPLEX

[seo-geo-orchestrator] Activated → Shopify SEO audit. Confidence: HIGH
[content-orchestrator] Activated → Content gap analysis. Confidence: MEDIUM
[paid-media-orchestrator] Activated → Google Ads + Meta review. Confidence: HIGH

[ORCHESTRATOR] Context Accumulator: 3 entries (HIGH, MEDIUM, HIGH)
[ORCHESTRATOR] Session confidence: MEDIUM (bounded by MIN)
[ORCHESTRATOR] Synthesis complete. Gate level: COMPLEX → routing to quality-orchestrator

[quality-orchestrator] Received: synthesised audit + Context Accumulator
[quality-orchestrator] → software-engineer-auditor: skip (no code artifacts)
[quality-orchestrator] → release-hardening-auditor: skip (no deploy)
[quality-orchestrator] → self-review (methodology + consistency check)
[quality-orchestrator] Gate verdict: HOLD
  - P2: Content gap analysis missing competitor backlink data
  - P3: Paid media section lacks ROAS benchmarks for luxury fashion vertical

[ORCHESTRATOR] HOLD received. Returning findings to content-orchestrator + paid-media-orchestrator
[content-orchestrator] Revised with backlink data. Confidence: HIGH
[paid-media-orchestrator] Added ROAS benchmarks. Confidence: HIGH

[quality-orchestrator] Re-check: PASS
[ORCHESTRATOR] Final confidence: HIGH (all skills now HIGH after revision)
[ORCHESTRATOR] Done. Handoff-ready: YES
```
