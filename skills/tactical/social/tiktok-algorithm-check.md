---
id: tiktok-algorithm-check
title: TikTok Algorithm Check
category: social
goal: Audit existing TikTok content and optimize new content against the FYP recommendation engine using verified signal weights to maximize completion rate, shares, and distribution pool progression.
best_for: Brands and creators diagnosing why TikTok views have dropped, optimizing hook structures and sound strategy, or preparing content for maximum FYP distribution.
inputs:
  - TikTok profile URL or account handle
  - 30-day content performance data (views, completion rate, shares, comments)
  - Content category or niche vertical
  - Content objective (awareness, engagement, followers, traffic, sales)
constraints:
  - Completion rate must be treated as the primary optimization signal above all others
  - FYP hashtags (#fyp, #foryoupage) must never be recommended as ranking levers
  - Sound trend freshness must be verified (3-7 day peak window)
  - Distribution pool progression thresholds must be referenced for performance diagnosis
  - Follower count must never be presented as a ranking signal (interest graph, not social graph)
outputs:
  - FYP signal health assessment with completion rate analysis
  - Hook effectiveness audit with drop-off point identification
  - Sound strategy evaluation (trending vs original vs stale)
  - Optimized content versions with signal targeting rationale
  - Distribution pool progression forecast
  - Posting time and first-hour engagement protocol
quality_checks:
  - Completion rate analyzed as primary signal with specific percentages
  - Hook structure evaluated with drop-off timing identified
  - Sound freshness verified against trend lifecycle
  - Distribution pool thresholds referenced in diagnosis
  - Negative patterns identified (engagement bait, watermarks, stale sounds)
tags:
  - social
  - growth
  - analytics
version: 1.0.0
impact: 4
geo_layer_required: false
---

## Context

Use this when TikTok views have declined, completion rates are below 50%, or before publishing content that needs maximum FYP distribution. This skill audits existing content against the FYP recommendation engine's signal hierarchy and optimizes new content for the signals that drive distribution pool progression.

**TikTok is an interest graph, not a social graph.** The algorithm does not care who you are or how many followers you have - it cares what you made and whether people watched it to the end. Content from zero-follower accounts regularly reaches millions. This architectural decision, identified by Eugene Wei in "TikTok and the Sorting Hat" (2020), means content quality and relevance determine distribution, not audience size.

**Completion rate is the dominant ranking signal.** The FYP recommendation engine weights watch-through more heavily than any other signal. A video watched to 100% signals strong interest. Loop completions (rewatches) amplify this further. Research on deep learning recommendation systems (Covington et al., arXiv:1609.06907) confirms that watch-time signals carry the highest weight in content-based recommendation engines.

**The signal hierarchy is strict:** Completion rate (highest) → Rewatch rate (very high) → Shares (high) → Comments (high) → Likes (medium) → Profile visits (medium) → Sound usage (contextual) → Hashtag relevance (low, discovery only). Optimizing for likes while ignoring completion rate is the most common mistake - likes are the lowest-friction signal and contribute relatively little to FYP promotion.

**Distribution pool progression determines reach.** Each video enters a test pool of 300-500 viewers. If completion rate exceeds ~60% with engagement signals, it advances to 1K-5K views (interest cluster), then 10K-50K (broader interest), then 100K+ (viral). Each pool has its own completion rate benchmark - content that works in Pool 1 (niche) may underperform in Pool 3 (broader) if too niche.

**Sound trends have a 3-7 day peak window.** Using a trending sound during its rising phase (days 1-3) provides a distribution boost. Using it past peak provides no boost and signals the creator is not current. Original audio builds brand identity but offers no algorithmic shortcut.

**Common anti-patterns that suppress distribution:** Using #fyp/#foryoupage hashtags (confirmed by TikTok as not influencing FYP). Posting 5+ times daily (dilutes average completion rate). Cross-posting Instagram Reels with watermark (TikTok demotes). Engagement bait ("Like if you agree" - TikTok's classifier detects and demotes). Long intros before the hook (1-2 seconds to capture attention before swipe). Stale trending sounds past peak window.

## Procedure

1. **Collect FYP performance data.** Pull analytics for the last 30 videos (or all available). For each video, record: views, completion rate (average % watched), rewatch rate (if available), shares, comments, likes, posting time, sound used (trending/original), duration, and hook structure. Sort by completion rate, not by views - completion rate is the algorithmic input, views are the algorithmic output.

2. **Score FYP signal health.** Rate the account's FYP performance 0-100 across four signal dimensions:
   - **Completion Score (40% weight):** Average completion rate across last 30 videos. Below 40% = critical. 40-50% = needs improvement. 50-65% = moderate. Above 65% = strong.
   - **Engagement Depth Score (25% weight):** Share-to-view ratio (target: >1%), comment-to-view ratio (target: >0.5%), comment quality (meaningful vs single-word).
   - **Hook Effectiveness Score (20% weight):** Percentage of videos that retain >80% of viewers past the 3-second mark. Below 60% = hooks are failing.
   - **Sound Strategy Score (15% weight):** Percentage of videos using sounds in their rising/peak phase. Use of stale sounds. Balance of trending vs original audio.

3. **Identify hook failures.** For each video with completion rate below 50%, analyze the retention curve:
   - Where is the primary drop-off? First 1-2 seconds (hook failure), mid-video (pacing issue), or end (content too long)?
   - What hook structure was used? Text overlay, verbal hook, visual hook, pattern interrupt?
   - Compare hook structures of top 5 vs bottom 5 videos by completion rate. Identify which hook types work for this account's audience.

4. **Audit sound strategy.** For each video, classify the sound:
   - **Rising trend** (days 1-3, <50K uses): Good - algorithmic boost active.
   - **Peak trend** (high competition): Acceptable only with differentiated creative.
   - **Declining/stale trend**: Bad - no boost, signals creator is not current.
   - **Original audio**: Neutral - no boost but builds brand identity.
   - Calculate percentage of videos in each category. If >30% use stale sounds, sound strategy is a distribution bottleneck.

5. **Diagnose distribution pool progression.** For each video, estimate which pool it reached based on view count:
   - Pool 1: 300-500 views (test audience - most content stays here if completion rate <60%)
   - Pool 2: 1K-5K views (interest cluster)
   - Pool 3: 10K-50K views (broader interest)
   - Pool 4: 100K+ views (viral distribution)
   - What percentage of content advances past Pool 1? If less than 30%, there is a systematic completion rate or hook problem.

6. **Optimize content for FYP signals.** For each piece of content being optimized:
   - **Hook (first 1-2 seconds):** Must be visually interesting or verbally hooking immediately. "This marble tray took 3 days to make" beats 5 seconds of logo animation. Use pattern interrupts, bold claims, or visual contrast.
   - **Duration:** 15-30 seconds for new/growing accounts. Only extend if content justifies it AND completion rate remains above 50%.
   - **Sound:** Check TikTok Creative Center for trending sounds in rising phase. Match sound to content category. Never force a sound fit - skip if no natural match.
   - **Loop structure:** Design endings that loop seamlessly into the beginning for rewatch signals.
   - **Engagement triggers:** Genuine questions, relatable scenarios, or hidden details that prompt comments - not engagement bait.

7. **Check for negative patterns.** Audit content for:
   - Engagement bait ("Comment X for Y", "Like if you agree") - TikTok's classifier demotes these.
   - Instagram Reels watermark - TikTok demotes cross-posted watermarked content.
   - More than 5 hashtags - spam detection risk. Optimal: 3-5 relevant hashtags.
   - #fyp/#foryoupage usage - confirmed to not influence ranking. Remove.
   - Same format every post - algorithm fatigue reduces distribution. Rotate 3-4 formats.

8. **Define posting time and first-hour protocol.**
   - **Timing:** Post when target audience is actively scrolling (see audience-specific windows below). The first 60 minutes determine Pool 1 → Pool 2 progression.
   - **First-hour protocol:** Respond to every comment immediately. Comment replies boost thread depth signal. Do not post and disappear.
   - **Posting frequency:** 1-2 high-quality videos per day maximum. Completion rate over volume.
   - **Measurement:** After 48 hours, check completion rate, share rate, and estimated pool reached. Compare against FYP signal scores.

## Output Format

```markdown
## TikTok Algorithm Check - [Account/Campaign]

### FYP Signal Health

| Signal Dimension | Score (0-100) | Weight | Status | Key Finding |
|-----------------|---------------|--------|--------|-------------|
| Completion Rate | [score] | 40% | [critical/needs work/moderate/strong] | Avg: [X]%, [N] of [total] videos above 50% |
| Engagement Depth | [score] | 25% | [status] | Share rate: [X]%, Comment rate: [X]% |
| Hook Effectiveness | [score] | 20% | [status] | [X]% of videos retain >80% past 3 seconds |
| Sound Strategy | [score] | 15% | [status] | [X]% trending (rising), [X]% stale, [X]% original |
| **Composite** | **[weighted score]** | **100%** | **[overall status]** | |

### Completion Rate Analysis

| Completion Range | Videos | % of Total | Avg Views | Pool Reached |
|-----------------|--------|-----------|-----------|--------------|
| >65% (strong) | [N] | [X]% | [avg] | Pool 2-3 |
| 50-65% (moderate) | [N] | [X]% | [avg] | Pool 1-2 |
| 40-50% (weak) | [N] | [X]% | [avg] | Pool 1 |
| <40% (critical) | [N] | [X]% | [avg] | Stuck in Pool 1 |

### Hook Audit

| Hook Type | Videos | Avg Completion Rate | 3-Second Retention | Verdict |
|-----------|--------|--------------------|--------------------|---------|
| Visual hook (first frame) | [N] | [X]% | [X]% | [keep/improve/drop] |
| Verbal hook (spoken) | [N] | [X]% | [X]% | [keep/improve/drop] |
| Text overlay hook | [N] | [X]% | [X]% | [keep/improve/drop] |
| Pattern interrupt | [N] | [X]% | [X]% | [keep/improve/drop] |

**Best-performing hook type:** [type] - [why it works for this audience]
**Worst-performing hook type:** [type] - [what to change]

### Sound Strategy

| Sound Category | Videos | % of Total | Avg Views | Recommendation |
|---------------|--------|-----------|-----------|----------------|
| Rising trend (days 1-3) | [N] | [X]% | [avg] | Increase - algorithmic boost active |
| Peak trend | [N] | [X]% | [avg] | Use selectively with differentiated creative |
| Stale trend (past peak) | [N] | [X]% | [avg] | Eliminate - no boost, signals not current |
| Original audio | [N] | [X]% | [avg] | Maintain for brand identity content |

### Optimized Content

#### [Content piece]

**Original:** [description]
**Optimization applied:**

| Signal | Before | After | Tactic |
|--------|--------|-------|--------|
| Hook | [weak - 3s drop-off at X%] | [strong - pattern interrupt + verbal hook] | [specific change] |
| Duration | [X seconds] | [Y seconds] | [trimmed/extended - why] |
| Sound | [stale trend / no sound] | [rising trend: "[sound name]"] | [matched to content category] |
| Loop | [no loop structure] | [seamless loop ending] | [ending redesigned to connect to opening] |
| Engagement trigger | [none] | [genuine question at [timestamp]] | [specific question added] |

**Projected completion rate improvement:** [X]% → [Y]%

### Negative Pattern Audit

| Pattern | Status | Finding | Action |
|---------|--------|---------|--------|
| Engagement bait | [none/detected] | [detail] | [remove/rephrase] |
| Instagram watermark | [none/detected] | [detail] | [re-export natively] |
| Hashtag overuse (>5) | [none/detected] | [X hashtags used] | [reduce to 3-5] |
| #fyp/#foryoupage usage | [none/detected] | [detail] | [remove - no ranking impact] |
| Format repetition | [none/detected] | [X% same format] | [rotate 3-4 formats] |
| Stale sound usage | [none/detected] | [X% of videos] | [switch to rising trends or original] |

### Distribution Pool Progression

| Pool | View Range | Videos Reaching | % of Total | Barrier |
|------|-----------|----------------|-----------|---------|
| Pool 1 (test) | 300-500 | [N] | [X]% | - |
| Pool 2 (interest cluster) | 1K-5K | [N] | [X]% | [completion rate / engagement] |
| Pool 3 (broader) | 10K-50K | [N] | [X]% | [what's blocking progression] |
| Pool 4 (viral) | 100K+ | [N] | [X]% | [cross-interest appeal needed] |

### Posting Strategy

- **Post at:** [time + timezone] based on audience type
- **Frequency:** [1-2/day] - completion rate over volume
- **First-hour protocol:**
  1. Reply to every comment within 15 minutes
  2. Pin a question-comment to encourage thread depth
  3. Do not post another video for at least 4 hours (avoid self-competition)
- **Measure after 48h:** completion rate, share rate, pool progression, hook retention
```

## QA Rubric (scored)

Score each dimension 0-5. Minimum passing score: 16/20.

### 1. Completion Rate Analysis (0-5)

| Score | Criteria |
|-------|----------|
| 0-1 | Completion rate not measured or not treated as primary signal; views used as primary metric |
| 2-3 | Completion rate mentioned but not broken down by range; no pool progression diagnosis |
| 4-5 | Completion rate analyzed per-video with range distribution; pool progression mapped; hook drop-off points identified with specific timestamps; benchmarks applied (>50% target) |

### 2. Hook and Content Structure (0-5)

| Score | Criteria |
|-------|----------|
| 0-1 | No hook analysis; generic "make better hooks" advice without data |
| 2-3 | Hook types identified but not correlated with completion rate; 3-second retention not measured |
| 4-5 | Hook types categorized and compared by completion rate and 3-second retention; best/worst performers identified; specific structural recommendations with before/after |

### 3. Sound Strategy (0-5)

| Score | Criteria |
|-------|----------|
| 0-1 | Sound not analyzed; generic "use trending sounds" advice |
| 2-3 | Trending vs original categorized but freshness not verified; stale sounds not flagged |
| 4-5 | Sounds classified by lifecycle phase (rising/peak/stale/original); stale sounds quantified and flagged; sound-to-content category match evaluated; specific recommendations |

### 4. Actionability (0-5)

| Score | Criteria |
|-------|----------|
| 0-1 | No posting time; no engagement protocol; optimization theoretical only |
| 2-3 | Posting time suggested but generic; first-hour protocol missing or vague |
| 4-5 | Posting time based on audience type; first-hour protocol with specific steps; frequency recommendation tied to completion rate; measurement plan with specific metrics and timeline |

**Pass threshold: 16/20.** Any dimension scoring 1 or below is an automatic fail regardless of total.

## Examples (good/bad)

### Good Example: Kenzo/APED TikTok Audit

**FYP signal health:** Composite 58/100. Completion Rate 45 (avg 43% - below 50% target, only 8 of 30 videos above 50%). Engagement Depth 72 (share rate 1.8% - above 1% target, strong community sharing). Hook Effectiveness 40 (only 50% of videos retain >80% past 3 seconds - hooks are failing). Sound Strategy 65 (40% rising trends, 25% stale, 35% original).

**Hook audit finding:** Verbal hooks ("Listen up APED fam...") average 51% completion. Visual hooks (showing the APED character immediately in first frame) average 62% completion. Text overlay hooks average 44% completion. Recommendation: shift to visual-first hooks - show the punchline/visual payoff in frame 1, context after.

**Sound finding:** 25% of videos use sounds past their peak (>7 days old). These average 380 views (stuck in Pool 1). Videos with rising-phase sounds average 2,800 views (reaching Pool 2). Eliminate stale sound usage entirely.

**Optimization:** Restructured meme video - moved visual punchline to first frame (was at second 4), trimmed from 38s to 22s, swapped stale sound for rising trending sound in crypto/meme category. Projected completion rate: 43% → 58%.

### Bad Example: Generic TikTok Advice

"Post more often and use trending hashtags like #fyp and #viral. Try to get more likes and followers. Post at 7 PM." - Uses #fyp (confirmed not to influence ranking), optimizes for likes (medium-weight signal), recommends posting more (volume over quality), no completion rate analysis, no hook audit, no sound lifecycle assessment, generic posting time.

## Variants

### Quick Check (Single Video)

Optimize one video before posting:
1. Score hook structure (will it retain past 3 seconds?).
2. Check duration (15-30s for growing accounts).
3. Verify sound freshness (rising trend, not stale).
4. Check for negative patterns (engagement bait, watermark, excessive hashtags).
5. Design loop structure for rewatch signal.
6. Define posting time for target audience.

### Full Audit (30-Day)

Comprehensive account performance diagnosis:
1. Pull 30-day data for all videos.
2. Full FYP signal health scoring across all four dimensions.
3. Hook audit with per-type completion rate comparison.
4. Sound strategy breakdown by lifecycle phase.
5. Distribution pool progression analysis.
6. Negative pattern audit.
7. Produce 2-week content plan with format rotation, sound targets, and hook templates.

### Completion Rate Sprint (7-Day)

Targeted intervention for accounts with <50% average completion:
1. Identify the 3 best-performing hook structures from historical data.
2. Create 7 videos (1/day) using only proven hook types.
3. All videos 15-25 seconds (minimize duration-related drop-off).
4. Use rising-phase sounds only.
5. Measure completion rate daily. Target: every video >50%.
6. After 7 days: compare completion rate trend. If improved, build template. If not, diagnose deeper content-audience mismatch.
