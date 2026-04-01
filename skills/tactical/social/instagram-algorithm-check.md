---
id: instagram-algorithm-check
title: Instagram Algorithm Check
category: social
goal: Audit existing Instagram content and optimize new content against Instagram's four ranking systems (Feed, Stories, Explore, Reels) using verified signal weights to maximize saves, completion rates, and cross-surface distribution.
best_for: Brands and creators diagnosing why Instagram reach has plateaued, optimizing content format mix, or preparing posts for maximum algorithmic distribution across all four surfaces.
inputs:
  - Instagram profile URL or account handle
  - 30-90 day content performance data (reach, engagement, saves by format)
  - Target surface priority (Feed, Stories, Explore, Reels, or all)
  - Content objective (awareness, engagement, followers, traffic, sales)
constraints:
  - Every recommendation must reference a specific algorithm signal and its weight per surface
  - Instagram's four ranking systems (Feed, Stories, Explore, Reels) must be treated as separate algorithms with distinct signal hierarchies
  - Save rate must be the primary Feed/Explore metric, completion rate the primary Reels metric
  - Hashtag recommendations must reflect post-2024 reality (minor categorization signal, not a ranking lever)
  - Format-performance mismatches must be identified with specific data points
outputs:
  - Per-surface algorithm health score with signal breakdown
  - Content format analysis with mismatch identification
  - Optimized content versions with signal targeting rationale
  - Negative signal audit (hashtag overuse, watermarks, engagement pods)
  - Posting and engagement protocol per surface
quality_checks:
  - Every recommendation traces to a verified signal weight per surface
  - Save rate benchmarked against account size tier
  - Carousel swipe-through and Reels completion rate analyzed separately
  - Negative signal risks assessed and mitigated
  - Format-performance mismatch quantified with specific numbers
tags:
  - social
  - growth
  - analytics
version: 1.0.0
impact: 4
geo_layer_required: false
---

## Context

Use this when Instagram reach has stalled, engagement rates are declining, or before publishing important content that needs maximum algorithmic distribution. This skill audits existing content performance against Instagram's four ranking systems and optimizes new content for the signals that actually drive distribution on each surface.

**Instagram runs four separate ranking systems, not one.** Feed ranking is dominated by relationship signals (interaction history, saves, meaningful comments). Stories ranking prioritizes closeness (DM history, viewing consistency). Explore uses content-similarity embeddings to surface content from accounts the user does not follow. Reels operates most like TikTok - entertainment value and completion rate drive distribution to non-followers. A strategy optimized for Feed will not work for Reels.

**Signal weights are not equal across surfaces.** For Feed and Explore, saves are the highest-weight engagement signal - a save indicates bookmark-worthy content the user wants to return to. For Reels, completion rate is dominant - did the viewer watch to the end? Shares via DM are the strongest active engagement signal for Reels. For Stories, viewing consistency and interactive sticker engagement (polls, questions) matter most. Likes are the lowest-weight positive signal across all surfaces.

**Post-2024, hashtags are a minor categorization signal.** Instagram's content distribution now relies on visual understanding, text analysis, and engagement patterns for content classification. Mosseri confirmed hashtags play a minor role in ranking. Using 30 hashtags signals spam. The optimal range is 3-5 highly relevant hashtags for content category confirmation.

**Carousels are the highest-engagement Feed format.** Carousels outperform single images by 1.4x on engagement rate (Later, 2024). The algorithm tracks carousel-specific signals: swipe-through rate (how many slides viewed), time on post (dwell time), save rate (2x higher than single images), and slide exit point (where users stop swiping).

**Common anti-patterns that suppress distribution:** Posting Reels with TikTok watermarks (Instagram explicitly demotes these). Using 30 hashtags (spam detection). Follow/unfollow growth tactics (penalized with reduced distribution). Engagement pods (coordinated engagement detected by ML). Optimizing for likes instead of saves and completion rate (wrong signal hierarchy). Stories without interactive elements (low engagement signals).

## Procedure

1. **Collect per-surface performance data.** Pull 30-90 day analytics from Instagram Insights across all four surfaces. For each surface, collect: reach/impressions, engagement rate, top-performing content (by engagement type, not just likes), and format distribution. For Feed: save rate, comment depth. For Reels: completion rate, shares. For Stories: reply rate, interactive sticker engagement, viewing consistency. For Explore: impressions from non-followers.

2. **Score each surface against its primary signals.** Rate each surface 0-100 based on how well the content targets the surface's highest-weight signals:
   - **Feed Score:** Save rate vs account-size benchmark (see benchmarks below), meaningful comment ratio, carousel swipe-through rate, content type affinity alignment.
   - **Reels Score:** Average completion rate (target: >50%), share rate, entertainment value assessment, trending audio usage.
   - **Stories Score:** Interactive element usage rate, viewing consistency (% of followers who watch regularly), reply rate, poll/question participation.
   - **Explore Score:** Non-follower impression percentage, content-similarity alignment to discoverable topics, post popularity velocity.

3. **Identify format-performance mismatches.** Group all posts by format (carousel, Reel, static image, Story). For each: calculate average engagement rate, average reach, and percentage of total posts. Flag mismatches: "Carousels get 2.8x average engagement but represent only 12% of posts" or "Static images are 60% of posts but perform 40% below average."

4. **Audit for negative signals.** Check the content history for algorithm-suppressing patterns:
   - TikTok watermarks on Reels (Instagram demotes these)
   - More than 5 hashtags per post (spam detection risk)
   - Banned or spam-associated hashtags
   - Signs of engagement pod activity (same accounts commenting within minutes)
   - Follow/unfollow pattern in follower growth (rapid gains followed by losses)
   - Stories without interactive elements (low engagement signal generation)

5. **Optimize content for target surface.** For each piece of content being optimized:
   - **Feed posts:** Design for saves - educational content, reference guides, cheat sheets, step-by-step frameworks. Structure carousels: hook slide → context → 5-7 value slides → save-worthy summary → CTA. Ensure last slide is bookmark-worthy.
   - **Reels:** Optimize for completion - hook in first 1-2 seconds, keep duration 15-30 seconds for non-tutorial content, use trending audio in its rising phase (check via Instagram), create loop-worthy endings.
   - **Stories:** Include at least one interactive sticker per sequence (poll, question, slider). Design for DM replies. Use countdown stickers for announcements.
   - **Explore-targeted content:** Align with discoverable topic clusters. Optimize for initial engagement velocity. Use content-similarity patterns from successful Explore content in the niche.

6. **Validate format constraints.** Hard rules per surface:
   - Feed carousels: 7-10 slides optimal. One idea per slide. Mobile-readable text.
   - Reels: 15-90 seconds. No TikTok watermark. Trending audio preferred for reach plays.
   - Stories: Interactive stickers required. 24-hour urgency framing. Sequence of 3-7 frames.
   - Hashtags: 3-5 maximum across all post types. Place in caption or first comment (no algorithmic difference).

7. **Re-score optimized content.** Compare before/after surface scores. Each optimized piece should show improvement on the target surface's primary signals. Feed posts should target save rate improvement. Reels should target completion rate improvement. The weakest surface should improve by at least 15 points.

8. **Define posting and first-hour engagement protocol.** Per surface:
   - **Feed:** Post during audience peak hours (check Instagram Insights). Respond to every comment within 30 minutes. Encourage saves with explicit CTAs ("Save this for later").
   - **Reels:** Post when target audience is actively scrolling. Engage with comments immediately to boost engagement velocity. Share to Stories for cross-surface amplification.
   - **Stories:** Post during active hours. Respond to every DM reply. Use poll results as conversation starters.
   - **Measurement:** After 48 hours, check per-surface metrics. Map results back to signal targets.

## Output Format

```markdown
## Instagram Algorithm Check - [Account/Campaign]

### Surface Health Scores

| Surface | Score (0-100) | Primary Signal | Status | Key Finding |
|---------|---------------|----------------|--------|-------------|
| Feed | [score] | Save Rate: [X]% (benchmark: [Y]%) | [weak/moderate/strong] | [finding] |
| Reels | [score] | Completion Rate: [X]% | [weak/moderate/strong] | [finding] |
| Stories | [score] | Interactive Engagement: [X]% | [weak/moderate/strong] | [finding] |
| Explore | [score] | Non-Follower Reach: [X]% | [weak/moderate/strong] | [finding] |

**Weakest surface:** [surface] - [why]
**Highest opportunity:** [surface] - [what to do]

### Format-Performance Analysis

| Format | Posts | % of Total | Avg Engagement Rate | Avg Reach | vs Account Avg |
|--------|-------|-----------|---------------------|-----------|----------------|
| Carousel | [N] | [X]% | [X]% | [N] | [+/-X]% |
| Reel | [N] | [X]% | [X]% | [N] | [+/-X]% |
| Static Image | [N] | [X]% | [X]% | [N] | [+/-X]% |
| Stories | [N] | [X]% | [X]% | [N] | [+/-X]% |

**Format mismatch:** [e.g., "Carousels get 2.8x average engagement but represent only 12% of posts"]
**Recommended format mix:** [target percentages]

### Optimized Content

#### [Content piece 1]

**Original:** [description of original content]
**Target surface:** [Feed/Reels/Stories/Explore]
**Optimization applied:**

| Signal | Before | After | Tactic |
|--------|--------|-------|--------|
| Save trigger | [none/weak] | [strong] | [what was added - e.g., "Added cheat sheet summary slide"] |
| Completion hook | [N/A or weak] | [strong] | [what was changed] |
| Interactive element | [none] | [added] | [poll/question/slider added] |

### Negative Signal Audit

| Signal | Risk Level | Finding | Mitigation |
|--------|-----------|---------|------------|
| TikTok watermark on Reels | [none/detected] | [detail] | [action] |
| Hashtag overuse (>5) | [none/low/medium/high] | [detail] | [action] |
| Engagement pod patterns | [none/suspected] | [detail] | [action] |
| Follow/unfollow behavior | [none/detected] | [detail] | [action] |
| Stories without interactives | [none/low/medium/high] | [detail] | [action] |

### Save Rate Benchmarks

| Account Size | Below Average | Average | Above Average | Excellent |
|-------------|--------------|---------|---------------|-----------|
| <10K followers | <0.5% | 0.5-1.5% | 1.5-3% | >3% |
| 10K-100K | <0.3% | 0.3-1% | 1-2% | >2% |
| 100K+ | <0.2% | 0.2-0.7% | 0.7-1.5% | >1.5% |

**Your save rate:** [X]% - [assessment vs benchmark]

### Posting Strategy

| Surface | Post At | Frequency | First-Hour Protocol |
|---------|---------|-----------|-------------------|
| Feed | [time based on Insights] | [X/week] | Reply to comments within 30 min, encourage saves |
| Reels | [time] | [X/week] | Engage comments, share to Stories |
| Stories | [time] | [X/day] | Respond to DM replies, use poll results |

**Measure after 48h:** per-surface reach, save rate, completion rate, non-follower impressions
```

## QA Rubric (scored)

Score each dimension 0-5. Minimum passing score: 16/20.

### 1. Surface-Specific Analysis (0-5)

| Score | Criteria |
|-------|----------|
| 0-1 | Treats Instagram as a single algorithm; no per-surface signal analysis; generic advice |
| 2-3 | Identifies surfaces but does not score each against its primary signal; signal weights referenced generically |
| 4-5 | Each surface scored against its specific primary signal (saves for Feed, completion for Reels, interactives for Stories, non-follower reach for Explore); recommendations surface-specific |

### 2. Format-Signal Alignment (0-5)

| Score | Criteria |
|-------|----------|
| 0-1 | No format breakdown; recommendations not tied to signal weights; optimizes for likes |
| 2-3 | Format breakdown exists but mismatches not quantified; save rate or completion rate not benchmarked |
| 4-5 | Format performance broken down with specific numbers; mismatches identified and quantified; save rate benchmarked against account size; carousel swipe-through and Reels completion analyzed |

### 3. Negative Signal Coverage (0-5)

| Score | Criteria |
|-------|----------|
| 0-1 | No negative signal audit; TikTok watermark and hashtag overuse not checked |
| 2-3 | Some negative signals assessed but not all five categories; mitigation vague |
| 4-5 | All five negative signal categories assessed (watermarks, hashtags, pods, follow/unfollow, Stories interactives); specific risk levels assigned; concrete mitigation for medium+ risks |

### 4. Actionability (0-5)

| Score | Criteria |
|-------|----------|
| 0-1 | No posting strategy; no first-hour protocol; optimization is theoretical only |
| 2-3 | Posting time suggested but not per-surface; engagement protocol generic |
| 4-5 | Per-surface posting time based on audience data; first-hour engagement protocol for each surface; measurement plan with specific metrics; format mix recommendation with target percentages |

**Pass threshold: 16/20.** Any dimension scoring 1 or below is an automatic fail regardless of total.

## Examples (good/bad)

### Good Example: Ashy & Sleek Instagram Audit

**Surface health scores:** Feed 72 (save rate 1.8% - above average for 8K followers), Reels 38 (completion rate 31% - below 50% target), Stories 55 (interactive elements in only 30% of Stories), Explore 45 (12% non-follower reach).

**Format mismatch found:** Static product images are 65% of posts but average 1.2% engagement rate. Carousels are 15% of posts but average 3.4% engagement rate (2.8x higher). Reels are 20% but completion rate is dragging Reels score.

**Optimization:** Shift format mix to 40% carousels (marble care guides, styling tips - high save potential), 35% Reels (ASMR marble textures, 15-20 second satisfying loops - completion rate focus), 15% Stories with interactive stickers (polls on color preferences, question stickers for customer Q&A), 10% static images (portfolio shots). Carousel last slide redesigned as saveable cheat sheet. Reels hook restructured to show the finished marble piece in first frame.

**Result:** Projected Feed score improvement from 72 to 85 (save rate), Reels from 38 to 60 (completion rate via shorter format + stronger hooks).

### Bad Example: Generic Instagram Advice

"Your engagement is low. Post more Reels and use trending audio. Add more hashtags to reach new people. Post consistently at 9 AM." - No per-surface analysis, no signal weights referenced, recommends more hashtags (contrary to post-2024 reality), no save rate or completion rate measurement, no format-performance mismatch identified, single posting time for all surfaces.

## Variants

### Quick Check (Single Post)

Fastest path to optimize one piece of content before posting:
1. Identify target surface (Feed, Reels, Stories).
2. Score the draft against that surface's top 3 signals.
3. Apply one optimization per signal (e.g., add save-worthy slide, restructure hook, add interactive sticker).
4. Check for negative signals (hashtag count, watermarks).
5. Define posting time and first-hour protocol.

### Full Audit (90-Day)

Comprehensive account health assessment:
1. Pull 90-day data across all four surfaces.
2. Score each surface with full signal breakdown.
3. Produce format-performance mismatch analysis.
4. Complete negative signal audit.
5. Competitive benchmarking (3-5 competitors, same follower range).
6. Produce 30-day content calendar with format mix targets and per-surface optimization.

### Campaign Batch (5-10 Posts)

Optimize a week's content before scheduling:
1. Score each draft against its target surface.
2. Ensure format variety across the week (avoid algorithm fatigue from same format).
3. Vary surfaces: 2-3 Feed posts (carousels), 2-3 Reels, daily Stories.
4. Stagger posting times based on per-surface audience peaks.
5. Define per-day engagement protocol.
6. After the week: compare predicted surface scores vs actual performance.
