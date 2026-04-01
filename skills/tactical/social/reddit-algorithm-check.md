---
id: reddit-algorithm-check
title: Reddit Algorithm Check
category: social
goal: Audit existing Reddit presence and optimize content strategy against the Hot ranking formula, Best algorithm, and karma mechanics while respecting Reddit's community-first culture and anti-marketing norms.
best_for: Brands diagnosing why Reddit posts get removed or downvoted, optimizing posting strategy for Hot ranking, building karma for subreddit access, or leveraging Reddit for GEO/AI citation visibility.
inputs:
  - Reddit account profile with karma breakdown
  - Target subreddit(s) with subscriber counts and rules
  - 30-day posting and engagement history
  - Content objective (visibility, community-growth, karma-building, geo-visibility)
constraints:
  - Reddit's community-first culture must be respected - overt marketing is community-enforced suicide
  - The 9:1 contribution ratio (9 value posts per 1 self-promotional) must be maintained
  - Hot ranking formula mechanics (logarithmic votes + time decay) must be referenced in timing strategy
  - Subreddit-specific rules must be checked before any posting recommendation
  - Downvotes must be treated as actively harmful to ranking, not neutral engagement
outputs:
  - Hot ranking readiness assessment with timing optimization
  - Karma health check with subreddit access analysis
  - Contribution ratio audit (9:1 compliance)
  - Subreddit fit analysis with rule compliance check
  - Optimized posting strategy with upvote velocity targets
  - Community engagement protocol
quality_checks:
  - Hot ranking formula mechanics referenced in timing and velocity recommendations
  - Contribution ratio calculated from actual post history
  - Subreddit rules checked for each target subreddit
  - Karma thresholds verified for target subreddit access
  - Downvote risk assessed for each content recommendation
tags:
  - social
  - growth
  - analytics
version: 1.0.0
impact: 4
geo_layer_required: false
---

## Context

Use this when Reddit posts are being removed or downvoted, when an account lacks karma for target subreddits, or before launching a Reddit presence for a brand. This skill audits existing Reddit activity against the platform's ranking algorithms and community norms, then optimizes strategy for both algorithmic visibility and community acceptance.

**Reddit is the only major platform where overt marketing is community-enforced suicide.** Unlike X/Twitter, LinkedIn, or Instagram where brands can post openly, Reddit's community culture actively identifies and punishes promotional content. Subreddit moderators remove marketing content on sight. Users downvote perceived self-promotion, which triggers algorithmic suppression through the Hot ranking formula. The path to visibility runs through genuine community value, not marketing.

**The Hot ranking formula applies logarithmic vote weighting and aggressive time decay.** The formula: `Hot Score = log10(max(|ups - downs|, 1)) + (sign(ups - downs) * epoch_seconds / 45000)`. Key implications: (1) Time is the dominant factor - a new post with 1 upvote scores higher than a 24-hour-old post with 100 upvotes. (2) Early upvotes are logarithmically more valuable - the first 10 upvotes contribute as much as the next 90. (3) Downvotes actively hurt - they reduce the Hot score, unlike platforms where negative engagement is still engagement. (4) The ~12.5-hour half-life means content must gain traction in the first 2-4 hours.

**The Best algorithm uses Bayesian inference (Wilson score interval).** Best considers both the proportion of upvotes AND sample size. A comment with 5 upvotes/0 downvotes ranks lower than one with 100 upvotes/10 downvotes. This powers default comment sorting and subreddit Best feeds. For comments, volume of engagement matters.

**Karma is a trust gating system, not a vanity metric.** Many subreddits require minimum karma (100-500+) and account age via AutoModerator. Post karma and comment karma are tracked separately. Build comment karma first in welcoming subreddits before targeting restricted communities.

**Reddit content is disproportionately cited by LLMs.** Reddit threads are detailed, opinionated, and structured as Q&A - the format LLMs prefer. For GEO visibility, Reddit organic strategy directly feeds AI citation. This makes Reddit uniquely valuable for brands despite the anti-marketing culture.

**The 9:1 rule:** For every 1 self-promotional post, you need 9 genuine value contributions. Moderators check post history. Violating this ratio triggers removal and bans.

## Procedure

1. **Audit account health.** Check the Reddit account's current state:
   - **Account age:** How old is the account? New accounts (<30 days) face AutoModerator restrictions in most subreddits.
   - **Karma breakdown:** Post karma vs comment karma. Some subreddits require comment karma specifically.
   - **Karma adequacy:** Does the account meet minimum thresholds for target subreddits? Most require 100-500+ karma.
   - **Post history:** Last 50 posts/comments. Are they concentrated in one subreddit or spread across many?
   - **Contribution ratio:** Count self-promotional content vs genuine value contributions. Calculate ratio. Must be at least 9:1.

2. **Analyze target subreddits.** For each target subreddit:
   - **Size and activity:** Subscriber count, posts per day, comments per post. A 500K-subscriber subreddit with 10 posts/day is very different from one with 500 posts/day.
   - **Rules:** Read sidebar, wiki, and pinned posts. Check flair requirements, title format rules, content type restrictions, and self-promotion policies.
   - **AutoModerator thresholds:** Check if the subreddit enforces minimum karma or account age (often visible in rules or wiki).
   - **Hot benchmark:** What does a typical Hot front-page post look like? Average upvotes, content type, title format, posting time.
   - **Community culture:** Is the tone casual, technical, meme-heavy, or discussion-oriented? Brand content must match.

3. **Assess Hot ranking readiness.** For each target subreddit, evaluate:
   - **Upvote velocity needed:** Based on subreddit size, estimate how many upvotes are needed in the first 2-4 hours to reach Hot top 25. For a 50K-subscriber subreddit, typically 20-50 upvotes. For a 1M+ subreddit, 100-500+.
   - **Optimal posting time:** Reddit's Hot formula means posting during peak hours (9-11 AM EST for US-majority subreddits) maximizes initial upvote pool. Off-peak posting reduces initial velocity.
   - **Content-community fit:** Does the planned content match what historically reaches Hot in this subreddit? Analyze top 20 Hot posts from the past week.
   - **Downvote risk:** Is the content potentially controversial, perceived as promotional, or off-topic? Downvotes actively reduce Hot score - a post with more downvotes than upvotes decays faster than zero.

4. **Score contribution ratio.** Review the last 50 posts and comments:
   - **Genuine value:** Helpful comments, answering questions, sharing expertise, discussion participation, linking to others' resources.
   - **Self-promotional:** Links to own content, product mentions, brand references, anything that benefits the poster commercially.
   - **Ratio:** Must be at least 9:1. If below 5:1, the account is at high risk of moderator action and community backlash.
   - If ratio is below 9:1: prescribe a karma-building plan before any promotional posting.

5. **Check for negative patterns.** Audit for Reddit-specific anti-patterns:
   - **Cross-posting spam:** Same content posted to more than 3 subreddits simultaneously.
   - **Vote manipulation signals:** Coordinated voting from the same IP range or time pattern.
   - **New account in restricted subreddits:** Posting where karma thresholds are not met.
   - **Off-topic posting:** Content that doesn't match the subreddit's focus.
   - **Link-heavy posting:** Reddit communities expect self-contained value, not traffic generation.
   - **Generic comments:** "Great post!" or single-word comments don't build karma or community trust.

6. **Optimize content for Hot ranking.** For each planned post:
   - **Title format:** Match the subreddit's winning title patterns (question format, statement format, data-led). Check character limits.
   - **Content type:** Text posts deliver self-contained value (preferred by communities). Link posts only when the link genuinely serves the discussion.
   - **Timing:** Post during peak hours for the subreddit's primary audience timezone. The first 2 hours determine Hot trajectory.
   - **Flair and formatting:** Apply required flair. Use Reddit markdown formatting for readability.
   - **Downvote mitigation:** Remove any perceived promotional angle. Frame content as community contribution, not brand message.

7. **Design comment engagement strategy.** Comment engagement directly impacts ranking:
   - **Author participation:** Reply to every comment for 60-90 minutes after posting. Author engagement compounds the post's Best ranking.
   - **Comment quality:** Substantive replies (>20 words) that add value, not defensive or promotional responses.
   - **Thread depth:** Encourage multi-level reply threads by asking follow-up questions in comments.
   - **Cross-subreddit engagement:** Build karma and reputation by commenting helpfully in related subreddits (not just the target).

8. **Define GEO visibility strategy (optional).** If AI citation is an objective:
   - Reddit content that ranks well and contains detailed, structured information is frequently cited by LLMs.
   - Write comprehensive, well-sourced answers and posts that serve as reference material.
   - Use specific data points, frameworks, and structured formatting that LLMs can easily extract.
   - Target "how to" and "best X for Y" style discussions that match common LLM query patterns.

## Output Format

```markdown
## Reddit Algorithm Check - [Account/Subreddit Target]

### Account Health

| Metric | Value | Status |
|--------|-------|--------|
| Account age | [N days/months/years] | [too new / adequate / established] |
| Post karma | [N] | [below threshold / adequate / strong] |
| Comment karma | [N] | [below threshold / adequate / strong] |
| Total karma | [N] | [below threshold / adequate / strong] |
| Contribution ratio | [X:1] (value:promotional) | [below 9:1 / compliant / strong] |

**Account readiness:** [not ready - needs karma building / ready with caution / fully ready]

### Target Subreddit Analysis

#### r/[subreddit] ([N] subscribers)

| Factor | Finding | Implication |
|--------|---------|-------------|
| Posts/day | [N] | [competition level] |
| Hot threshold (est.) | [N upvotes in 4h] | [achievable / stretch / unlikely] |
| Karma requirement | [N minimum] | [met / not met - need X more] |
| Account age requirement | [N days] | [met / not met] |
| Self-promotion policy | [strict / moderate / relaxed] | [approach recommendation] |
| Community tone | [technical / casual / meme / discussion] | [content adaptation needed] |
| Peak posting hours | [time + timezone] | [based on subreddit audience] |

**Top 5 Hot posts this week (patterns):**
1. [title pattern] - [upvotes] - [content type] - [what worked]
2. [etc.]

### Contribution Ratio Audit

| Category | Count (last 50 items) | % of Total |
|----------|-----------------------|-----------|
| Helpful comments | [N] | [X]% |
| Discussion participation | [N] | [X]% |
| Sharing others' resources | [N] | [X]% |
| Self-promotional | [N] | [X]% |
| **Ratio** | **[X:1]** | **[compliant / non-compliant]** |

**Action needed:** [none - ratio is healthy / build [N] more value contributions before next promotional post]

### Hot Ranking Strategy

| Element | Recommendation | Rationale |
|---------|---------------|-----------|
| Title format | [specific format matching subreddit patterns] | [what works in this sub] |
| Content type | [text post / link / image] | [community preference + self-contained value] |
| Posting time | [HH:MM timezone] | [peak hours + Hot formula time decay] |
| Upvote velocity target | [N upvotes in 2 hours] | [based on subreddit Hot threshold] |
| Flair | [required flair] | [subreddit rule] |

### Negative Pattern Audit

| Pattern | Status | Finding | Action |
|---------|--------|---------|--------|
| Cross-posting spam | [none/detected] | [detail] | [limit to 1-2 related subs] |
| Karma below thresholds | [none/yes] | [detail] | [karma building plan] |
| Off-topic posting | [none/detected] | [detail] | [realign with subreddit focus] |
| Link-heavy posts | [none/detected] | [detail] | [switch to text posts] |
| Generic comments | [none/detected] | [detail] | [write substantive replies] |
| 9:1 ratio violation | [none/yes] | [detail] | [build value contributions first] |

### Comment Engagement Protocol

- **Post-submission:** Reply to every comment for 90 minutes
- **Reply quality:** Substantive (>20 words), add value, not defensive
- **Thread depth:** Ask follow-up questions to encourage multi-level threads
- **Ongoing:** 3-5 helpful comments per day in target subreddits (karma + reputation building)

### GEO Visibility Opportunity (if applicable)

| Opportunity | Subreddit | Content Angle | LLM Citation Potential |
|-------------|-----------|--------------|----------------------|
| [topic] | r/[sub] | [detailed answer / guide / framework] | [high - matches common queries] |

- **Measure after 24h:** upvote velocity at 2h and 4h marks, Hot ranking position, comment thread depth, any moderator actions
```

## QA Rubric (scored)

Score each dimension 0-5. Minimum passing score: 16/20.

### 1. Algorithm Grounding (0-5)

| Score | Criteria |
|-------|----------|
| 0-1 | No reference to Hot formula or ranking mechanics; generic "get more upvotes" advice |
| 2-3 | Hot algorithm mentioned but time decay and logarithmic weighting not applied to timing strategy |
| 4-5 | Hot formula mechanics directly inform posting time recommendation; upvote velocity targets set based on subreddit size; early upvote logarithmic value referenced; downvote risk assessed as ranking harm |

### 2. Community Compliance (0-5)

| Score | Criteria |
|-------|----------|
| 0-1 | No subreddit rules checked; no contribution ratio analysis; treats Reddit like other social platforms |
| 2-3 | Subreddit rules acknowledged but not specific; contribution ratio noted but not calculated from actual history |
| 4-5 | Target subreddit rules specifically referenced; contribution ratio calculated from last 50 posts/comments; 9:1 compliance verified or remediation plan provided; downvote risk assessed per content piece |

### 3. Karma and Access (0-5)

| Score | Criteria |
|-------|----------|
| 0-1 | Karma not analyzed; AutoModerator thresholds not checked; account age not considered |
| 2-3 | Karma reported but not broken down (post vs comment); thresholds checked for some but not all target subreddits |
| 4-5 | Post and comment karma separated; AutoModerator thresholds verified per target subreddit; karma building plan provided if below thresholds; account age adequacy confirmed |

### 4. Actionability (0-5)

| Score | Criteria |
|-------|----------|
| 0-1 | No posting time; no engagement protocol; "just post good content" as advice |
| 2-3 | Posting time suggested but not tied to Hot formula; engagement protocol exists but vague |
| 4-5 | Posting time based on Hot formula time decay + subreddit peak hours; upvote velocity target set; 90-minute comment engagement protocol defined; title format matched to subreddit patterns; measurement plan with specific checkpoints |

**Pass threshold: 16/20.** Any dimension scoring 1 or below is an automatic fail regardless of total.

## Examples (good/bad)

### Good Example: LemuriaOS Reddit Strategy for r/artificial

**Account health:** Account age 8 months (adequate). Comment karma 340 (meets r/artificial minimum of 100). Post karma 120. Contribution ratio 12:1 (compliant - 42 helpful comments, 4 discussion posts, 4 self-promotional references in 50 items).

**Subreddit analysis:** r/artificial has 1.2M subscribers, ~80 posts/day. Hot threshold estimated at 50-100 upvotes in 4 hours. Community tone: technical but accessible. Self-promotion policy: strict - must contribute regularly before sharing own work. Peak hours: 9-11 AM EST.

**Hot ranking strategy:** Title format: question-led ("After building 40+ AI products with agentic engineering, here's what most teams get wrong") - matches top-performing r/artificial title patterns. Content type: text post (self-contained value, not a link to lemuriaos.ai). Post at 9:30 AM EST Tuesday (peak intersection of US professional audience + minimal weekend decay carryover). Upvote velocity target: 30 upvotes in 2 hours.

**Downvote risk assessment:** LOW - content frames expertise sharing, not product promotion. No links to own site in body. Value is self-contained. Only risk: if community perceives the "40+ AI products" claim as unsubstantiated humble-brag - mitigate by including specific technical details.

### Bad Example: Generic Reddit Marketing

"Create a Reddit account for LemuriaOS. Post links to your website in r/artificial, r/MachineLearning, and r/SaaS. Use hashtags to increase visibility. Post 3 times a day for maximum exposure." - Posts links (traffic generation is punished). Cross-posts to 3 subreddits simultaneously (spam detection). Reddit doesn't use hashtags. 3 posts/day in the same subreddit triggers spam removal. No karma check. No contribution ratio. No Hot formula consideration. No subreddit rule review.

## Variants

### Quick Check (Single Post)

Pre-post optimization for one Reddit submission:
1. Verify target subreddit rules (flair, title format, content type).
2. Check karma meets subreddit threshold.
3. Verify contribution ratio is at least 9:1 before self-promotional content.
4. Match title format to subreddit's Hot post patterns.
5. Assess downvote risk (is it perceived as promotional?).
6. Post during subreddit peak hours.
7. Plan 90-minute comment engagement.

### Full Audit (Account + Strategy)

Comprehensive Reddit presence assessment:
1. Full account health audit (karma, age, history).
2. Contribution ratio calculation from last 50 items.
3. Target subreddit analysis (3-5 subreddits) with Hot benchmarks.
4. Negative pattern audit.
5. Community engagement plan with karma building targets.
6. GEO visibility strategy for AI citation.
7. 30-day Reddit calendar with posting cadence and engagement protocol.

### Karma Building Sprint (14-Day)

For new accounts or accounts below subreddit thresholds:
1. Identify 5-10 welcoming subreddits for karma building (r/AskReddit, hobby subs, discussion subs).
2. Post 5-10 helpful comments per day (genuinely valuable, not generic).
3. Target: 100+ comment karma in week 1.
4. Week 2: begin commenting in target subreddits (3-5 per day).
5. First text post in target subreddit at end of week 2 (non-promotional, value contribution).
6. Track karma growth daily. Adjust subreddit selection based on which communities respond well.
7. After 14 days: verify karma meets all target subreddit thresholds.
