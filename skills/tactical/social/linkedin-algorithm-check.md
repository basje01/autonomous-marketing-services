---
id: linkedin-algorithm-check
title: LinkedIn Algorithm Check
category: social
goal: Audit existing LinkedIn content and optimize new posts against the two-pass ranking system (relevance filtering + quality scoring) using verified signal weights to maximize dwell time, meaningful engagement, and professional visibility.
best_for: B2B brands and thought leaders diagnosing why LinkedIn reach has declined, optimizing content format mix for the algorithm, or preparing posts for maximum feed distribution and SSI improvement.
inputs:
  - LinkedIn profile or company page URL
  - 30-90 day content performance data (impressions, engagement rate, post formats)
  - SSI score (linkedin.com/sales/ssi) with four pillar breakdown
  - Profile type (personal, company page, creator mode)
  - Objective (reach, engagement, lead-gen, thought-leadership, newsletter-growth)
constraints:
  - External links in post body must be flagged as algorithm-suppressing (0.3-0.6x reach)
  - Company page content must be differentiated from personal profile strategy (5-10x reach gap)
  - Dwell time must be treated as the highest-weight quality signal, above likes
  - More than 5 hashtags must be flagged as algorithm-suppressing
  - SSI score pillars must be analyzed individually, not as a single number
outputs:
  - Two-pass ranking diagnosis (relevance filter + quality score assessment)
  - Content format performance analysis with reach multiplier benchmarks
  - SSI score breakdown with per-pillar improvement plan
  - Optimized content versions with signal targeting rationale
  - External link audit with suppression impact quantification
  - First-hour engagement protocol
quality_checks:
  - Two-pass ranking mechanics referenced in diagnosis
  - Content format benchmarked against empirical reach multipliers
  - SSI score analyzed per pillar with specific improvement actions
  - External link usage quantified with reach impact
  - Dwell time treated as primary quality signal
tags:
  - social
  - growth
  - analytics
version: 1.0.0
impact: 4
geo_layer_required: false
---

## Context

Use this when LinkedIn reach or engagement has plateaued, when SSI score is below 70, or before publishing important content that needs maximum feed distribution. This skill audits existing content against LinkedIn's two-pass ranking system and optimizes new posts for the signals that drive professional visibility.

**LinkedIn's algorithm is not a social media algorithm - it is a professional relevance engine.** It rewards expertise depth over engagement breadth. Users are not scrolling for entertainment; they are scanning for professional insight, industry intelligence, and network signals. The algorithm reflects this: dwell time (deep reading) outweighs likes, comment thread depth outweighs comment count, and connection-degree proximity determines initial distribution radius.

**The two-pass ranking system is the foundational concept.** Pass 1 filters content by relevance to the viewer (industry clustering, role, interaction history, connection degree). Pass 2 scores surviving content by quality signals (dwell time, meaningful comments, saves, shares). A post can have high engagement but low distribution if it fails the relevance filter - entertainment content on LinkedIn gets likes but not reach beyond 1st-degree connections.

**Dwell time is the single most important quality signal.** LinkedIn measures time spent reading a post. Long-form text posts and document carousels earn high dwell time. Short posts with no substance get deprioritized even with high like counts. This is why document/PDF carousels (2.2-2.5x reach multiplier) and text-only posts of 1,200-1,500 characters (1.8-2.0x) dramatically outperform external link posts (0.3-0.6x).

**External links in post body are actively suppressed.** LinkedIn wants users to stay on-platform. Posts with outbound links receive 0.3-0.6x the reach of native content. Place links in the first comment instead. This is the single most common algorithm violation on LinkedIn.

**Content format hierarchy (empirically tested, Richard van der Blom, Algorithm Report 2024):** Document/PDF carousel (2.2-2.5x) > Text-only 1,200-1,500 chars (1.8-2.0x) > Poll (1.5-2.0x) > Image + Text (1.0-1.3x) > Native Video (0.8-1.2x) > Article (0.5-0.8x) > External Link (0.3-0.6x).

**SSI score correlates with feed visibility.** The Social Selling Index has four pillars (Professional Brand, Finding People, Engaging with Insights, Building Relationships) each scored 0-25. Scores above 70 correlate with 2-3x the profile views and content impressions of scores below 50.

**Connection degree determines distribution radius.** 1st-degree connections see content first. 2nd-degree requires at least one mutual connection to have engaged. 3rd-degree requires viral threshold. This makes engagement allies - a small network of consistent engagers - strategically important.

## Procedure

1. **Collect LinkedIn performance data.** Pull 30-90 day analytics from LinkedIn. For each post, record: impressions, engagement rate, engagement by type (likes, comments, shares, saves), post format, character count, whether external link was in body or comment, posting time, and hashtag count. Record SSI score with per-pillar breakdown.

2. **Diagnose Pass 1 (relevance filtering).** Evaluate whether content passes the relevance filter:
   - **Connection degree reach:** What percentage of engagement comes from 1st vs 2nd vs 3rd degree connections? If >90% is 1st-degree, content is not breaking through to broader distribution.
   - **Industry clustering:** Is the content aligned with the profile's industry cluster? Posts that straddle clusters or target a different industry than the profile's get filtered.
   - **Interaction history:** Is there a core group of consistent engagers? Regular engagement from specific connections increases future visibility to them and their networks.
   - **Content type affinity:** Does the audience engage more with documents, text, or video? The algorithm serves more of what the audience has historically engaged with.

3. **Diagnose Pass 2 (quality scoring).** Evaluate quality signals:
   - **Dwell time proxy:** Long-form posts (>1,200 characters) vs short posts. Document carousels vs single images. Content that rewards deep reading vs content that can be scanned in 2 seconds.
   - **Comment quality:** Average comment length. Percentage of comments >5 words ("meaningful comments" weight higher). Comment thread depth (replies to comments weight highest).
   - **Save rate:** Indication of professional utility. Documents and frameworks earn highest saves.
   - **Reaction type:** "Insightful" reactions weight slightly higher than "Like" in professional contexts.

4. **Audit content format distribution.** Map all posts by format. Apply empirical reach multipliers:

   | Format | Your Posts | % of Total | Avg Reach | Multiplier Benchmark |
   |--------|-----------|-----------|-----------|---------------------|
   | Document/PDF | [N] | [X]% | [N] | 2.2-2.5x |
   | Text-only (1,200-1,500 chars) | [N] | [X]% | [N] | 1.8-2.0x |
   | Poll | [N] | [X]% | [N] | 1.5-2.0x |
   | Image + Text | [N] | [X]% | [N] | 1.0-1.3x |
   | Native Video | [N] | [X]% | [N] | 0.8-1.2x |
   | External Link | [N] | [X]% | [N] | 0.3-0.6x |

   Flag format-performance mismatches. If external link posts are >20% of content, this is a major distribution bottleneck.

5. **Audit external links.** Count posts with external links in body vs in comments. Calculate reach impact:
   - Posts with body links: average reach [X]
   - Posts without body links: average reach [Y]
   - Reach suppression ratio: [X/Y]
   - If the ratio is below 0.5x, external links are actively suppressing distribution.

6. **Analyze SSI score.** Break down each pillar:
   - **Professional Brand (0-25):** Profile completeness, content publishing frequency, engagement on posts.
   - **Finding People (0-25):** Search usage, profile viewing, connection request acceptance.
   - **Engaging with Insights (0-25):** Content engagement (likes, comments, shares on others' content), content creation frequency.
   - **Building Relationships (0-25):** Connection acceptance rate, message response rate, network growth.
   - Identify the weakest pillar. A pillar below 15 is a drag on overall visibility.

7. **Optimize content for two-pass ranking.** For each piece of content being optimized:
   - **Format selection:** Default to document/PDF carousel or text-only (1,200-1,500 chars). Never use external link format unless SEO is the explicit goal (Articles only).
   - **Dwell time design:** Write for deep reading. Use whitespace, formatting, and progressive disclosure. Make content substantive enough that readers spend 30+ seconds.
   - **Comment triggers:** End posts with genuine questions that invite expertise-sharing. Avoid generic "What do you think?" - ask specific, opinionated questions.
   - **Hashtags:** 3-5 industry-specific hashtags with 10K-500K followers each. Never more than 5.
   - **No external links in body.** If a link is needed, place it in the first comment with "Link in comments."
   - **Tag strategy:** Only tag people genuinely mentioned or who will engage. Maximum 3-5. Gratuitous tagging is penalized.

8. **Define first-hour engagement protocol.**
   - **Post timing:** Use LinkedIn Analytics to identify when your audience is online. Typically 8-10 AM local time on Tuesday-Thursday for B2B.
   - **First 45 minutes:** Reply to every comment with a substantive response (>20 words). Comment replies create thread depth - the highest-weight engagement signal.
   - **Engagement allies:** Notify 3-5 consistent engagers that you've posted (not spam - genuine reciprocal relationship).
   - **Cross-surface:** Share to LinkedIn Stories (if available) for additional visibility signal.
   - **Measurement:** After 48 hours, check impressions, engagement by type, connection degree distribution, and SSI score change.

## Output Format

```markdown
## LinkedIn Algorithm Check - [Profile/Company]

### Two-Pass Ranking Diagnosis

#### Pass 1: Relevance Filtering
| Signal | Status | Finding |
|--------|--------|---------|
| Connection degree reach | [1st-only/breaking to 2nd/viral to 3rd] | [X]% 1st, [X]% 2nd, [X]% 3rd |
| Industry cluster alignment | [aligned/misaligned] | [analysis] |
| Interaction history depth | [shallow/moderate/deep] | [N] consistent engagers identified |
| Content type affinity | [matched/mismatched] | Audience prefers [format] but you post [format] |

#### Pass 2: Quality Scoring
| Signal | Value | Benchmark | Status |
|--------|-------|-----------|--------|
| Avg post length | [N] chars | 1,200-1,500 optimal | [short/optimal/long] |
| Meaningful comment ratio | [X]% (>5 words) | >50% | [below/above] |
| Comment thread depth | [avg replies per comment] | >1.5 | [shallow/deep] |
| Save rate | [X]% | Varies by format | [low/moderate/high] |
| "Insightful" reaction ratio | [X]% of reactions | >20% | [below/above] |

### Content Format Analysis

| Format | Posts | % of Total | Avg Impressions | Reach Multiplier | vs Benchmark |
|--------|-------|-----------|----------------|-----------------|-------------|
| Document/PDF | [N] | [X]% | [N] | [X]x | [below/at/above] 2.2-2.5x |
| Text-only | [N] | [X]% | [N] | [X]x | [below/at/above] 1.8-2.0x |
| Image + Text | [N] | [X]% | [N] | [X]x | [below/at/above] 1.0-1.3x |
| External Link | [N] | [X]% | [N] | [X]x | [below/at/above] 0.3-0.6x |

**Format mismatch:** [e.g., "External link posts are 35% of content but average 0.4x reach - switch to text-only with link in comments"]
**Recommended format mix:** [target percentages]

### External Link Audit

| Metric | Value |
|--------|-------|
| Posts with link in body | [N] ([X]% of total) |
| Posts with link in comments | [N] |
| Posts with no link | [N] |
| Avg reach (link in body) | [N] |
| Avg reach (no link) | [N] |
| **Reach suppression ratio** | **[X]x** |

**Impact:** External links are costing approximately [N] impressions per post. Moving links to comments would recover an estimated [X]% reach.

### SSI Score Breakdown

| Pillar | Score (/25) | Status | Improvement Action |
|--------|------------|--------|-------------------|
| Professional Brand | [N] | [weak/moderate/strong] | [specific action] |
| Finding People | [N] | [weak/moderate/strong] | [specific action] |
| Engaging with Insights | [N] | [weak/moderate/strong] | [specific action] |
| Building Relationships | [N] | [weak/moderate/strong] | [specific action] |
| **Total SSI** | **[N]/100** | **[below 50/50-70/above 70]** | |

**Weakest pillar:** [pillar] - [priority improvement plan]

### Optimized Content

#### [Post topic]

**Format:** [Document carousel / Text-only / etc.]
**Optimization applied:**

| Signal | Before | After | Tactic |
|--------|--------|-------|--------|
| Format | [external link post] | [text-only, link in comments] | Removes 0.3-0.6x suppression |
| Length | [200 chars] | [1,350 chars] | Increases dwell time signal |
| Comment trigger | [none / "thoughts?"] | [specific expert question] | Drives meaningful comment depth |
| Hashtags | [8 hashtags] | [4 industry-specific] | Below 5 threshold |
| Tags | [12 people tagged] | [3 genuinely relevant] | Removes tag penalty |

### Posting Strategy

- **Post at:** [time based on LinkedIn Analytics] ([day] optimal)
- **Profile type note:** [personal profile / company page - reach implication]
- **First-hour protocol:**
  1. Reply to every comment within 45 minutes (substantive, >20 words)
  2. Notify 3-5 engagement allies
  3. Do not edit the post within the first hour (can reset distribution)
- **Frequency:** [2-4 posts/week] - vary format to avoid algorithm fatigue
- **Measure after 48h:** impressions, engagement by type, connection degree reach, SSI change
```

## QA Rubric (scored)

Score each dimension 0-5. Minimum passing score: 16/20.

### 1. Two-Pass Ranking Analysis (0-5)

| Score | Criteria |
|-------|----------|
| 0-1 | No reference to two-pass system; generic "engagement is low" diagnosis |
| 2-3 | Relevance or quality pass mentioned but not both; connection degree not analyzed |
| 4-5 | Both passes diagnosed with specific signals; connection degree distribution quantified; industry cluster alignment assessed; dwell time evaluated as primary quality signal |

### 2. Content Format Rigor (0-5)

| Score | Criteria |
|-------|----------|
| 0-1 | No format breakdown; recommendations not tied to empirical reach multipliers |
| 2-3 | Formats listed but reach multipliers not benchmarked; external link impact not quantified |
| 4-5 | All formats benchmarked against empirical multipliers; external link suppression quantified with reach data; format-performance mismatch identified with specific numbers; recommended format mix provided |

### 3. SSI and Profile Analysis (0-5)

| Score | Criteria |
|-------|----------|
| 0-1 | SSI not mentioned or reported as single number without pillar breakdown |
| 2-3 | SSI reported with pillars but improvement actions are generic |
| 4-5 | All four SSI pillars scored with specific improvement actions; weakest pillar identified as priority; personal vs company page reach gap addressed; Creator Mode implications covered |

### 4. Actionability (0-5)

| Score | Criteria |
|-------|----------|
| 0-1 | No posting strategy; no first-hour protocol; "post more" as recommendation |
| 2-3 | Posting time suggested but not data-driven; engagement protocol exists but vague |
| 4-5 | Posting time based on LinkedIn Analytics data; first-hour engagement protocol with specific steps and timing; format mix with target percentages; external link migration plan; measurement framework |

**Pass threshold: 16/20.** Any dimension scoring 1 or below is an automatic fail regardless of total.

## Examples (good/bad)

### Good Example: LemuriaOS LinkedIn Audit

**Two-pass diagnosis:** Pass 1 - 78% of engagement from 1st-degree connections. Content is industry-aligned (AI/engineering cluster) but not breaking to 2nd-degree. Interaction history deep with 12 consistent engagers. Pass 2 - Dwell time strong on document posts (avg 45 seconds) but weak on text posts (avg 8 seconds - too short). Meaningful comment ratio 62% (above 50% benchmark). Save rate 3.2% on documents (strong).

**Format mismatch:** External link posts are 40% of content but average 890 impressions (0.4x reach). Document carousels are only 15% but average 4,200 impressions (2.3x reach). Text-only posts (25%) average 3,100 impressions (1.7x reach). Recommendation: shift to 40% documents, 35% text-only (1,200+ chars), 15% image+text, 10% polls. Eliminate external link posts - move all links to first comment.

**SSI breakdown:** Total 64/100. Professional Brand 21/25 (strong). Finding People 12/25 (weak - not using search or viewing profiles). Engaging with Insights 18/25 (moderate - commenting on others' content 3x/week, should be daily). Building Relationships 13/25 (weak - low connection acceptance rate). Priority: increase Finding People by viewing 10 profiles/day in target industry cluster.

**External link impact:** 12 posts with body links averaged 890 impressions. 8 posts without links averaged 3,400 impressions. Suppression ratio: 0.26x. Moving links to comments would recover an estimated 2,500 impressions per post.

### Bad Example: Generic LinkedIn Advice

"Post more often and use more hashtags to reach people. Share articles and blog posts to drive traffic. Add everyone you can as a connection to grow your network." - Recommends external link sharing (suppressed format). More hashtags (>5 triggers suppression). No two-pass analysis. No SSI breakdown. No format benchmarking. No dwell time consideration. Mass connection adds damage engagement rate.

## Variants

### Quick Check (Single Post)

Pre-publish optimization for one post:
1. Verify no external link in post body (move to comment if needed).
2. Check format selection against reach multipliers (document or text-only preferred).
3. Ensure post length >1,200 characters for dwell time signal.
4. Verify 3-5 industry-specific hashtags (not more).
5. End with a specific, expertise-inviting question (not "thoughts?").
6. Plan first-hour engagement response.

### Full Audit (90-Day)

Comprehensive LinkedIn health assessment:
1. Pull 90-day analytics for all posts.
2. Full two-pass ranking diagnosis.
3. Content format analysis with reach multiplier benchmarking.
4. External link audit with suppression quantification.
5. SSI score breakdown with per-pillar improvement plan.
6. Competitive benchmarking (3-5 peers in same industry cluster).
7. Produce 30-day content calendar with format targets and engagement protocol.

### SSI Sprint (30-Day)

Targeted SSI score improvement for profiles below 70:
1. Identify weakest SSI pillar.
2. Apply daily protocol for weakest pillar:
   - Professional Brand: publish 3x/week (documents or text-only)
   - Finding People: view 10 target profiles/day, use search
   - Engaging with Insights: comment meaningfully on 5 posts/day
   - Building Relationships: accept pending connections, respond to messages
3. Track SSI weekly. Target: +10 points in 30 days.
4. After 30 days: measure impact on content impressions (expect 1.5-2x improvement if SSI moved from <50 to >70).
