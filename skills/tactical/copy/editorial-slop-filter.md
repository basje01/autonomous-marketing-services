---
id: editorial-slop-filter
title: Editorial Slop Filter
category: copy
goal: Audit and rewrite user-facing web copy to eliminate AI-generated cliche language ("slop") and AI-typical formatting that erodes credibility and signals to readers that content was machine-generated without human editing. Covers vocabulary, phrasing patterns, and typographic fingerprints.
best_for: Any content destined for a live website - blog posts, landing pages, product copy, meta descriptions, social cards, llms.txt, JSON-LD - before publish or after detecting AI-generated text in production. Also used as a pre-commit quality gate for content PRs.
inputs:
  - Draft copy or URL of published page to audit
  - Brand voice guidelines (if available)
  - Target audience description
  - Previous slop audit results (if re-running after fixes)
constraints:
  - Never replace a slop word with another slop word
  - Preserve the original meaning - only change phrasing, not facts
  - Do not over-correct - common words used literally are fine (e.g., "landscape" for actual geography, "robust" in technical specs describing fault tolerance)
  - Every replacement must sound like something a human expert would say out loud
  - Do not add words - replacements should be equal length or shorter
  - Em dashes (U+2014) are always slop - no exceptions, no "literal use" defense
  - Never introduce em dashes in replacements
outputs:
  - Annotated diff showing every slop instance found with its replacement
  - Clean copy with all replacements applied
  - Slop density score (slop instances per 1000 words)
  - Formatting violations count (em dashes, smart quotes)
quality_checks:
  - Zero slop words remain in output copy
  - Zero em dashes remain in output copy
  - Replacements preserve original meaning exactly
  - Reading the output aloud sounds natural, not robotic
  - Slop density score is below 1.0 per 1000 words
tags:
  - copywriting
  - content
version: 2.0.0
impact: 5
---

## Context

AI-generated content has a fingerprint. Readers, editors, and increasingly search engines can detect it. The telltale signs are not grammar errors - they're word choices and formatting habits that no human expert would produce. Words like "delve," "holistic," "leverage," and "comprehensive" appear at 10-50x their natural frequency in AI output compared to human writing. The em dash character (U+2014) appears in virtually every AI-generated paragraph but almost never in human-typed text (humans type `-` or `--`).

When these patterns appear on a company's website, they signal "nobody reviewed this" - destroying the trust the content was supposed to build. The problem compounds: AI crawlers (ChatGPT, Perplexity, Gemini) index this copy and regurgitate it, spreading the slop into AI-generated descriptions of the brand.

This skill exists because AI is the default writing tool now. The content itself is fine. The word choices and formatting are the problem. This filter catches them across five tiers: vocabulary (T1-T3), phrasing (T4), and formatting (T5).

### Why This Matters for LemuriaOS

LemuriaOS positions itself as an AI-native company with a verified execution standard. If the company's own website contains detectable AI slop, the positioning is undermined. Every blog post, landing page, and llms.txt entry is a credibility surface. The editorial slop filter is part of the content governance chain alongside `brand-truth-keeper` (metric accuracy) and `conversion-copywriter` (voice consistency).

### Integration Points

- **brand-truth-keeper**: Routes content through slop filter before publishing. Any content governance audit should include a slop check.
- **conversion-copywriter**: Applies slop filter after writing, before handoff. The copywriter writes; the filter cleans.
- **content-strategist**: Includes slop density as a quality metric in content briefs.
- **technical-seo-specialist**: Runs slop filter on llms.txt and meta descriptions - AI-facing content must be especially clean.
- **Pattern #10** in `~/.claude/references/pattern-recognition.md`: The S-Tier audit loop checks for slop automatically on every code change.

## Procedure

1. **Collect the copy.** Gather all user-facing text from the target page or document. Include headings, body copy, meta descriptions, alt text, button labels, JSON-LD text fields, and llms.txt content. Skip code blocks, technical configuration, and internal comments.

2. **Run the blocklist scan.** Flag every occurrence of the following words, phrases, and formatting. Context matters for Tiers 2-3 - only flag metaphorical/filler usage, not literal technical usage. Tiers 1, 4, and 5 are always flagged.

   **Tier 1 - Almost always slop (flag on sight):**
   delve, delving, tapestry, holistic, synergy, synergize, paradigm, multifaceted, ever-evolving, endeavor, spearhead, cornerstone, underscores, realm, crucible, nuanced

   **Tier 2 - Usually slop (flag unless used literally):**
   comprehensive, innovative, cutting-edge, transformative, revolutionary, game-changer, pivotal, crucial, robust, seamless, seamlessly

   **Tier 3 - Slop when used as empty verbs (flag metaphorical use only):**
   leverage, harness, elevate, streamline, empower, unlock, navigate, utilize, optimize (when not about actual optimization)

   **Tier 4 - Slop openers and phrases (flag entire phrase):**
   "In today's," "It's worth noting," "It's important to note," "dive into," "dive deep," "deep dive," "let's explore," "in the world of," "Whether you're," "take it to the next level," "at the forefront," "the landscape of," "in the ever-evolving landscape"

   **Tier 5 - Slop formatting (flag on sight, no exceptions):**
   - Em dash (U+2014) - the typographic long dash. Humans type `-` (hyphen) or `--` (double hyphen). The em dash is the single most reliable AI fingerprint in generated text. Replace every instance with a hyphen `-`.
   - Excessive smart quotes in markdown files (U+201C, U+201D) when straight quotes are the codebase standard.

3. **Score the draft.** Calculate slop density: `(total slop instances / total word count) x 1000`. Include formatting violations (each em dash counts as one instance). Anything above 2.0 needs a full rewrite pass. Between 1.0-2.0 needs targeted fixes. Below 1.0 is acceptable.

4. **Rewrite each flagged instance.** For every hit, apply the replacement principle: use the simplest word that preserves meaning. Common swaps:

   | Slop | Replacement |
   |------|-------------|
   | comprehensive | full, complete, thorough |
   | innovative | (delete, or be specific about what's new) |
   | crucial | matters, important, key |
   | holistic | full, complete, overall |
   | leverage / utilize / harness | use |
   | landscape | (rewrite the sentence) |
   | seamless / seamlessly | smooth, without friction, (often just delete) |
   | robust | reliable, strong, solid |
   | cutting-edge | (delete, or name the specific advantage) |
   | streamline | simplify, speed up |
   | empower | let, enable, give |
   | unlock | open, enable, get |
   | elevate | improve, raise |
   | navigate | work through, handle, deal with |
   | "In today's..." | (delete the opener, start with the point) |
   | "It's worth noting" | (delete, just state the thing) |
   | em dash (U+2014) | hyphen `-` |

5. **Read the result aloud.** Every rewritten sentence must pass the "would I say this to a colleague?" test. If it sounds like a press release or LinkedIn post, rewrite again. Check specifically:
   - Does the sentence still sound AI-generated after the swap?
   - Did the replacement introduce a new slop word?
   - Is the sentence shorter or the same length? (If longer, try again.)

6. **Verify zero em dashes remain.** Run a separate formatting pass. Search for U+2014 across all output. This is a hard gate - a single em dash in the output is a failure. The codebase has a zero-tolerance policy enforced by Pattern #10 in the S-Tier audit loop.

7. **Produce the deliverable.** Output the annotated diff, clean copy, slop density score, and formatting violations count.

## Output Format

```md
# Editorial Slop Filter - [Page/Document Name]

## Slop Density
- **Before:** [N] slop instances in [M] total words = [X.X] per 1000
- **After:** 0 slop instances = 0.0 per 1000
- **Formatting violations:** [N] em dashes replaced
- **Verdict:** [CLEAN | NEEDS WORK | FULL REWRITE]

## Flagged Instances

| # | Location | Original | Replacement | Tier |
|---|----------|----------|-------------|------|
| 1 | Hero heading | "innovative protocol" | "protocol" | T2 |
| 2 | Body paragraph 3 | "comprehensive analysis" | "full analysis" | T2 |
| 3 | Meta description | em dash between clauses | hyphen | T5 |
| ... | ... | ... | ... | ... |

## Clean Copy

[Full rewritten copy with all replacements applied]

## Notes
- [Any edge cases or judgment calls explained]
- [Literal uses preserved with reasoning]
```

## QA Rubric (scored)

- Zero slop remaining (0-5): output contains exactly zero words from the blocklist in metaphorical/filler usage AND zero em dashes. Score 5 = zero across all tiers. Score 4 = one borderline case with documented reasoning. Score 0 = 3+ remaining.
- Meaning preservation (0-5): every replacement preserves the original sentence's factual content. Score 5 = no meaning drift. Score 3 = minor nuance change that doesn't affect accuracy. Score 0 = facts changed.
- Natural voice (0-5): reading the output aloud sounds like a knowledgeable human wrote it. Score 5 = conversational expert. Score 3 = professional but slightly stiff. Score 0 = still sounds like a press release.
- Brevity gain (0-5): replacements are equal length or shorter. Score 5 = net word count decreased by 5%+. Score 3 = net even. Score 0 = replacements are wordier than originals.
- Formatting consistency (0-5): all punctuation follows codebase conventions (hyphens not em dashes, straight quotes in markdown, consistent dash style). Score 5 = zero formatting deviations. Score 0 = mixed punctuation styles.

## Examples (good/bad)

- Good: Original - "IndexNow is an innovative protocol that allows websites to instantly notify search engines." Fixed - "IndexNow is a protocol that lets websites instantly notify search engines." The word "innovative" added nothing. "Allows" became "lets" (shorter, more natural). Meaning identical.

- Good: Original - "For a comprehensive check of your site's indexation across various search engines, utilize LemuriaOS." Fixed - "For a full check of your site's indexation across search engines, use LemuriaOS." Two slop words removed, sentence tightened by 2 words, meaning unchanged.

- Good (T5): Original - "LemuriaOS builds software autonomously - from design to deployment." (contains U+2014 em dash). Fixed - "LemuriaOS builds software autonomously - from design to deployment." (hyphen). Same meaning, human-typed formatting.

- Bad: Original - "This is crucial for your SEO strategy." Fixed - "This is of paramount importance for your SEO strategy." Replaced one slop word with an even worse phrase. The correct fix: "This matters for your SEO" or "This affects your SEO directly."

- Bad: Original - "Our robust infrastructure handles millions of requests." Fixed - "Our infrastructure handles millions of requests." Deleting "robust" lost real information here - if the system genuinely is fault-tolerant, say that: "Our fault-tolerant infrastructure handles millions of requests." Don't delete meaning, only delete filler.

- Bad (T5): Original contains em dash. Fixed version reintroduces an em dash in a different sentence. This is a failure - the filter must catch ALL em dashes, not just the ones it flagged initially.

## Variants

- **Pre-publish gate:** Run on draft content before it goes live. Focus on the full blocklist scan and rewrite. Include the annotated diff for the editor. This is the default mode.
- **Production audit:** Run on already-published pages. Crawl all blog posts and landing pages, produce a prioritized list sorted by slop density (worst pages first), and generate replacement diffs for each. Use `grep` across `src/content/blog/`, `src/pages/`, and `src/lib/` for systematic scanning.
- **Headline-only mode:** Quick pass on just headings, meta titles, and meta descriptions - the highest-visibility text. Skip body copy. Useful for fast checks before a deploy.
- **CI/codebase mode:** Run across all `.md`, `.ts`, `.tsx`, `.astro` files looking exclusively for Tier 5 formatting violations (em dashes). Output a file list with line numbers. This is the mode used by Pattern #10 in the S-Tier audit loop.
- **llms.txt mode:** Audit `llms.txt` and `llms-full.txt` specifically. These files are consumed by AI systems and must be maximally clean - AI slop in AI-facing content is especially damaging because it propagates into how AI describes the brand.
