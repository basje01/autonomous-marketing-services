---
id: youtube-algorithm-check
title: YouTube Algorithm Check
category: social
goal: Audit existing YouTube content and optimize new videos against the three discovery systems (Browse, Suggested, Search) using the CTR-retention satisfaction model to maximize algorithmic promotion and audience growth.
best_for: Channels diagnosing why views have declined, optimizing thumbnail-title CTR without triggering clickbait suppression, or preparing videos for maximum Browse and Suggested distribution.
inputs:
  - YouTube channel URL or handle
  - 30-90 day analytics (impressions, CTR, avg retention %, views by traffic source)
  - Target content format (long-form, Shorts, or both)
  - Channel objective (awareness, subscribers, watch time, leads, sales)
constraints:
  - CTR and retention must always be evaluated as a pair - neither metric is meaningful alone
  - YouTube's satisfaction model must be referenced, not pure engagement optimization
  - Upload frequency must not be recommended as a ranking signal (Todd Beaupre confirmed it is not)
  - Shorts and long-form must be treated as separate recommendation systems
  - Thumbnail recommendations must be specific and testable, not generic
outputs:
  - CTR-retention matrix plot for recent videos with quadrant classification
  - Per-traffic-source performance breakdown (Browse, Suggested, Search)
  - Retention curve shape analysis with drop-off diagnosis
  - Optimized thumbnail-title combinations with before/after CTR projection
  - Shorts vs long-form strategy assessment
  - Content and posting recommendations
quality_checks:
  - CTR-retention evaluated as a pair with quadrant classification for each video
  - Retention curve shape identified and diagnosed (not just average retention reported)
  - Traffic source breakdown analyzed with per-source CTR benchmarks
  - Thumbnail-title recommendations are specific and testable
  - Shorts strategy evaluated separately from long-form
tags:
  - social
  - growth
  - analytics
version: 1.0.0
impact: 4
geo_layer_required: false
---

## Context

Use this when YouTube views or impressions are declining, when CTR or retention metrics are underperforming, or before publishing videos that need maximum algorithmic distribution. This skill audits existing content against YouTube's three discovery systems and optimizes new videos for the CTR-retention pair that drives the satisfaction model.

**YouTube's algorithm finds viewers for videos, not videos for viewers.** This inversion is the foundation of all YouTube strategy. The recommendation system, built on a two-stage deep learning architecture (Covington et al., arXiv:1609.06907), uses candidate generation to filter from billions to hundreds, then a ranking model to score each user-video pair for predicted satisfaction - not just predicted clicks.

**YouTube has moved from watch-time optimization to a satisfaction model.** Todd Beaupre, YouTube's head of discovery, confirmed that the system now uses viewer surveys, likes-to-dislikes ratios, and post-watch behavior (did the viewer continue watching similar content?) to evaluate whether a video truly satisfied the viewer. High CTR with high retention signals genuine satisfaction. High CTR with low retention signals clickbait - and gets suppressed.

**Three discovery systems, not one.** Browse (homepage) shows predicted-interest content weighted by CTR, predicted watch time, and channel relationship. Suggested (sidebar/watch next) recommends based on topical relevance, co-watch patterns, and session continuation probability. Search ranks by keyword relevance, search-originated watch time, and channel authority. Each requires different optimization.

**Upload frequency is NOT a ranking signal.** Todd Beaupre stated this explicitly in 2023. A mediocre video on schedule hurts more than a great video a day late. Quality drives algorithmic performance, not cadence.

**Shorts and long-form use separate recommendation systems.** Shorts subscribers often do not watch long-form content. A channel gaining 100K subscribers from Shorts may see zero impact on long-form views. Shorts optimize for completion rate and swipe-away rate; long-form optimizes for CTR-retention pair.

## Procedure

1. **Collect per-traffic-source analytics.** Pull YouTube Studio data for the last 20-30 videos. For each video, record: impressions, CTR (by traffic source if possible), average view duration, average percentage viewed (retention), views by traffic source (Browse, Suggested, Search, External, Shorts feed), likes, comments, and subscriber conversion. Sort by impressions first, then by CTR and retention.

2. **Plot videos on the CTR-retention matrix.** Classify each video into one of four quadrants:
   - **Algorithm Favorite** (High CTR + High Retention): Content and packaging are both strong. Scale this formula.
   - **Hidden Gem** (Low CTR + High Retention): Content quality is high but thumbnail/title is not compelling. A/B test thumbnails.
   - **Clickbait** (High CTR + Low Retention): Thumbnail/title overpromises. Restructure content to deliver value faster.
   - **Dead Content** (Low CTR + Low Retention): Neither packaging nor content is working. Full redesign or topic pivot needed.
   - Use traffic-source-specific CTR benchmarks: Browse 2-10%, Suggested 1-8%, Search 3-15%.

3. **Analyze retention curve shapes.** For each video (especially bottom performers), identify the retention curve shape:
   - **Flat line (high):** Excellent content-audience fit. Scale this format.
   - **Steep initial drop, then flat:** Hook is weak but content is strong. Fix first 30 seconds.
   - **Gradual linear decline:** Normal pattern. Add pattern interrupts every 2-3 minutes to flatten.
   - **Multiple cliffs:** Specific moments cause viewers to leave. Identify and restructure those sections.
   - **Spike at end:** Viewers skip to the answer. Tease payoff earlier with partial reveals.

4. **Break down traffic source performance.** Analyze what percentage of total views come from each source:
   - **Browse-dominant:** Channel has strong subscriber base and CTR. Protect this with consistent quality.
   - **Suggested-dominant:** Topical clustering is working. Double down on content series and related topics.
   - **Search-dominant:** SEO is driving discovery. Optimize titles/descriptions for keyword targeting.
   - **No dominant source:** Channel lacks clear identity. Pick one surface to optimize for first.
   - Compare per-source CTR against benchmarks. Identify which source is underperforming.

5. **Optimize thumbnail-title combinations.** For Hidden Gem videos (high retention, low CTR):
   - **Thumbnail rules:** High contrast, faces with emotion (if applicable), large readable text (3-5 words max), 3 elements maximum, 1280x720 minimum resolution.
   - **Title rules:** Target keyword in first 40 characters, curiosity or value element, under 60 characters total. Format: "[Value/Curiosity Hook] - [Keyword]".
   - Design 2-3 thumbnail variants for A/B testing in YouTube Studio.
   - For Clickbait videos (high CTR, low retention): realign thumbnail/title with actual content. Restructure video to deliver on the promise within the first 30 seconds.

6. **Evaluate Shorts strategy.** If the channel uses Shorts:
   - Are Shorts subscribers engaging with long-form? (Expect low crossover.)
   - Completion rate and swipe-away rate for Shorts (separate from long-form metrics).
   - Is the Shorts strategy serving its stated objective (awareness, content testing, audience expansion)?
   - Recommendation: Shorts should complement long-form, not replace it. If resources are limited, prioritize long-form.

7. **Assess Search SEO.** For channels with Search traffic potential:
   - Are titles and descriptions targeting specific search queries?
   - Is there demonstrable search volume for target keywords (YouTube autocomplete, Google Trends)?
   - Does search-originated watch time exceed competitors for the same queries?
   - Are descriptions optimized with target keywords in the first 2 lines and timestamps?

8. **Define content and posting strategy.**
   - **Quality over frequency:** Never sacrifice content quality for schedule adherence.
   - **Topic selection:** Based on what the audience watches (not what you want to make). Use YouTube Studio audience data.
   - **Series strategy:** For Suggested traffic, create content series with clear topical connections.
   - **Measurement:** After 48 hours, check impressions, CTR (by source), retention curve, and traffic source distribution.

## Output Format

```markdown
## YouTube Algorithm Check - [Channel/Campaign]

### CTR-Retention Matrix

| Video | Impressions | CTR | Avg Retention | Quadrant | Diagnosis |
|-------|-------------|-----|---------------|----------|-----------|
| [title] | [N] | [X]% | [X]% | Algorithm Favorite | Scale this format |
| [title] | [N] | [X]% | [X]% | Hidden Gem | A/B test thumbnail |
| [title] | [N] | [X]% | [X]% | Clickbait | Realign promise |
| [title] | [N] | [X]% | [X]% | Dead Content | Topic/format pivot |

**Dominant quadrant:** [quadrant] - [what this means for the channel]
**Highest priority fix:** [specific action for the most impactful quadrant shift]

### CTR Benchmarks by Traffic Source

| Traffic Source | Your CTR | Benchmark (Average) | Benchmark (Excellent) | Status |
|---------------|----------|--------------------|-----------------------|--------|
| Browse | [X]% | 2-5% | >10% | [below/average/above] |
| Suggested | [X]% | 1-4% | >8% | [below/average/above] |
| Search | [X]% | 3-8% | >15% | [below/average/above] |

### Traffic Source Distribution

| Source | % of Views | Trend (vs prior period) | Assessment |
|--------|-----------|------------------------|------------|
| Browse | [X]% | [up/down/flat] | [analysis] |
| Suggested | [X]% | [up/down/flat] | [analysis] |
| Search | [X]% | [up/down/flat] | [analysis] |
| External | [X]% | [up/down/flat] | [analysis] |
| Shorts Feed | [X]% | [up/down/flat] | [analysis] |

### Retention Curve Diagnosis

| Video | Curve Shape | Drop-Off Point | Cause | Fix |
|-------|------------|----------------|-------|-----|
| [title] | Steep initial drop | 0:15 | Slow intro, no hook | Deliver value in first 10 seconds |
| [title] | Multiple cliffs | 2:30, 5:45 | Tangent sections | Cut tangents, add pattern interrupts |
| [title] | Gradual decline | Linear | Normal for length | Add visual changes every 2-3 minutes |

### Thumbnail-Title Optimization

#### [Video - Hidden Gem]

**Current:** Thumbnail: [description]. Title: "[current title]"
**Problem:** [why CTR is low despite good retention]

**Option A:** Thumbnail: [specific design]. Title: "[new title]"
**Option B:** Thumbnail: [specific design]. Title: "[new title]"

**Test plan:** Run A/B test in YouTube Studio for 7 days. Winner = higher CTR without retention drop.

### Shorts Assessment (if applicable)

| Metric | Value | Benchmark | Status |
|--------|-------|-----------|--------|
| Shorts completion rate | [X]% | >60% | [status] |
| Shorts → long-form crossover | [X]% | Low expected | [status] |
| Shorts subscriber % of total | [X]% | - | [context] |

**Recommendation:** [complement long-form / deprioritize / scale up - with rationale]

### Content Strategy

- **Topic focus:** [based on audience data, not assumptions]
- **Series opportunity:** [topical cluster for Suggested traffic]
- **Search targets:** [keywords with verified demand]
- **Format:** [optimal duration range based on retention data]
- **Frequency:** [quality-based, not schedule-based]
- **Measure after 48h:** impressions, CTR by source, retention curve, traffic source shift
```

## QA Rubric (scored)

Score each dimension 0-5. Minimum passing score: 16/20.

### 1. CTR-Retention Pair Analysis (0-5)

| Score | Criteria |
|-------|----------|
| 0-1 | CTR or retention analyzed in isolation; no quadrant classification; views used as primary metric |
| 2-3 | Both metrics reported but not analyzed as a pair; quadrant classification generic or missing |
| 4-5 | Every video plotted on CTR-retention matrix with quadrant classification; per-traffic-source CTR benchmarked; specific fix per quadrant with testable action |

### 2. Retention Curve Diagnosis (0-5)

| Score | Criteria |
|-------|----------|
| 0-1 | Average retention reported without curve shape analysis; no drop-off identification |
| 2-3 | Curve shapes mentioned generically; drop-off points not tied to specific content sections |
| 4-5 | Curve shape identified per video (flat, steep drop, cliffs, spike); specific drop-off timestamps correlated with content sections; concrete restructuring recommendations |

### 3. Traffic Source Analysis (0-5)

| Score | Criteria |
|-------|----------|
| 0-1 | No traffic source breakdown; all views treated as equivalent |
| 2-3 | Traffic sources listed but not analyzed per-source; CTR not benchmarked per source |
| 4-5 | Per-source view distribution with trend analysis; per-source CTR benchmarked; dominant source identified with strategic implication; Shorts traffic separated from long-form |

### 4. Thumbnail-Title Actionability (0-5)

| Score | Criteria |
|-------|----------|
| 0-1 | "Make better thumbnails" without specific recommendations; no A/B test plan |
| 2-3 | Thumbnail advice given but not specific to individual videos; no testable variants |
| 4-5 | Per-video thumbnail-title recommendations with specific design elements; 2-3 testable variants; A/B test plan; CTR-retention guard (ensuring CTR improvement doesn't tank retention) |

**Pass threshold: 16/20.** Any dimension scoring 1 or below is an automatic fail regardless of total.

## Examples (good/bad)

### Good Example: LemuriaOS YouTube Channel Audit

**CTR-retention matrix:** 15 videos analyzed. 4 Algorithm Favorites (all "How we built X with AI" format - CTR 7.2%, retention 52%). 6 Hidden Gems (educational deep-dives - CTR 3.1%, retention 58%). 3 Clickbait pattern (announcement videos - CTR 8.5%, retention 28%). 2 Dead Content (generic AI commentary - CTR 2.1%, retention 31%).

**Key finding:** Hidden Gems represent the largest opportunity. These videos have proven content quality (58% retention) but poor packaging. Thumbnail analysis: current thumbnails use plain text on dark backgrounds with no faces. Recommendation: add founder face with expression, increase text contrast, add a visual element representing the result (e.g., screenshot of the shipped product).

**Retention diagnosis:** Announcement videos (Clickbait quadrant) have a cliff at 0:45 - the announcement is made in the first 30 seconds and viewers leave. Fix: restructure as "behind the scenes of how we built this" instead of "we built this" - turn announcements into process stories.

**Traffic source insight:** 62% Browse, 24% Suggested, 8% Search, 6% External. Browse-dominant means the subscriber base is strong. Suggested at 24% indicates topical clustering is working but could improve with a content series strategy ("AI Agent Building" playlist with consistent titling).

### Bad Example: Generic YouTube Advice

"Your views are low. Post more consistently, at least 3 times per week. Use better thumbnails and longer titles with more keywords. Make sure to ask viewers to like and subscribe at the beginning of every video." - Recommends upload frequency as a solution (not a ranking signal). No CTR-retention analysis. "Better thumbnails" without specifics. Recommends CTA in first 10 seconds (increases early exit rate). No traffic source analysis. No retention curve diagnosis.

## Variants

### Quick Check (Single Video)

Pre-publish optimization for one video:
1. Draft thumbnail-title combination. Evaluate: does it promise specific value? Is it clickbait?
2. Review first 30 seconds of the edit. Does it deliver value or intrigue immediately?
3. Check retention curve of a similar past video to predict drop-off points.
4. Verify title includes target keyword in first 40 characters.
5. Ensure description has target keyword in first 2 lines with timestamps.

### Full Audit (90-Day)

Comprehensive channel health assessment:
1. Pull 90-day analytics for all videos.
2. Full CTR-retention matrix with quadrant classification.
3. Retention curve analysis for all videos.
4. Per-traffic-source performance with trend analysis.
5. Competitive analysis: 3-5 channels in same niche, compare CTR and retention benchmarks.
6. Shorts crossover analysis (if applicable).
7. Produce 30-day content plan with topic targets, thumbnail strategy, and measurement framework.

### Thumbnail Sprint (7-Day)

Targeted intervention for Hidden Gem channels (good retention, low CTR):
1. Identify 5 highest-retention videos with below-average CTR.
2. Design 2 thumbnail variants per video.
3. Run A/B tests in YouTube Studio over 7 days.
4. Measure CTR change AND retention change (guard against clickbait shift).
5. After 7 days: adopt winning thumbnails, apply design patterns to future videos.
6. Expected impact: 15-30% CTR improvement if current thumbnails are the bottleneck.
