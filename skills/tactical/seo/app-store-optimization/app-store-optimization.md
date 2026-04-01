---
id: app-store-optimization
title: App Store Optimization
category: seo
goal: Optimize an iOS or Android app listing for maximum visibility and conversion with keyword-optimized metadata, compelling screenshots, and a review generation strategy.
best_for: iOS and Android apps launching or relaunching that need to improve organic discovery and listing conversion rate.
inputs:
  - App Store Connect or Google Play Console access
  - Current app listing (title, subtitle, keywords, description, screenshots)
  - Competitor app listings (top 5 in category)
  - App analytics (impressions, page views, downloads, conversion rate)
constraints:
  - iOS title max 30 characters, subtitle max 30 characters, keyword field max 100 characters
  - Android title max 30 characters, short description max 80 characters
  - Screenshots must show the actual app experience, not just marketing graphics
  - Review solicitation must comply with Apple and Google guidelines - no incentivized reviews
  - Changes should be A/B tested where possible (Google Play Experiments, Apple Product Page Optimization)
outputs:
  - Optimized app metadata (title, subtitle, keywords, description)
  - Screenshot strategy with captions and ordering
  - Review generation strategy
  - Keyword tracking plan
quality_checks:
  - Primary keyword appears in app title
  - Keyword field uses all 100 characters (iOS) with no spaces after commas and no duplicates
  - Screenshots show value proposition in first 2 frames (before fold on App Store)
  - Review request timing is tied to a positive user moment, not random
  - Competitor keyword gap analysis is documented
tags:
  - seo
  - growth
  - conversion
version: 1.1.0
impact: 4
geo_layer_required: true
---

## Context

Use this when an app is live but organic discovery is low (impressions below category average), listing conversion rate is below 30% (industry average for most categories), or the app has never had its metadata optimized.

**GEO/AI discoverability layer:** App Store and Google Play listings are high-authority sources for LLMs answering "what is the best app for [use case]?" queries - both platforms are well-represented in LLM training data and real-time retrieval. The app's short description (first sentence, 80 characters) functions as the entity seed for LLM extraction: it must contain app name + category + primary use case in a self-contained claim that passes the out-of-context test. Identical phrasing between the App Store subtitle and the brand website's hero subheadline creates entity consistency across two independent high-authority sources, accelerating LLM entity recognition. Run an LLM entity viability check on the app name before launch: search it in ChatGPT, Perplexity, and Gemini - if an existing product with strong LLM presence shares the name, that is a citation suppression risk independent of any trademark conflict.

**ASO is SEO for app stores - the same principles apply but the mechanics differ.** Like web SEO, ASO is about matching what users search for with what your listing contains. Unlike web SEO, the ranking factors are different: keyword relevance in metadata (title, subtitle, keyword field), download velocity, ratings/reviews, and in-app engagement metrics.

**The first 2 screenshots determine conversion.** App Store and Google Play show 2-3 screenshots before the fold. 70% of users never scroll past these. If your first 2 screenshots don't communicate the core value proposition, most visitors leave without downloading. Treat the first screenshot as a hero - it should answer "What does this app do and why should I care?" in 2 seconds.

**Review velocity matters more than review volume.** 100 reviews from last year are less valuable for ranking than 20 reviews from this month. Apple and Google weight recency heavily. A review generation strategy must produce a steady stream of recent reviews, not a one-time burst.

**SKStoreReviewController timing is the highest-leverage ASO decision for iOS.** Apple allows the review prompt 3 times per year per user. Triggering it at the wrong moment (first app open, during frustration) wastes one of those 3 chances. The optimal moment is immediately after a positive user event - a successful transaction, a completed workflow, or an achievement unlocked.

## Procedure

1. Conduct keyword research. Identify 30-50 relevant keywords using: App Store search suggestions (type partial queries and note autocomplete), competitor metadata analysis (what keywords appear in top competitors' titles/subtitles), keyword research tools (App Annie, Sensor Tower, AppTweak), and user language (how users describe the app's value in reviews). Classify keywords by: search volume, competition difficulty, and relevance to your app.
2. Optimize the title (30 chars max for both iOS and Android). Include the primary keyword. Format: "[Brand Name] - [Primary Keyword]" or "[Primary Keyword] [Brand Name]" depending on brand recognition. If the brand is unknown, lead with the keyword. If the brand is established, lead with the brand.
3. Optimize the subtitle (iOS, 30 chars max) or short description (Android, 80 chars max). Include the secondary keyword and a benefit statement. This is the first text users see under the title - it must communicate value immediately.
4. Optimize the iOS keyword field (100 chars max). Rules: no spaces after commas, no duplicates of words already in the title or subtitle (Apple already indexes them), no plurals if the singular is included (Apple matches both), no category name (Apple indexes it automatically). Use all 100 characters. Example: `travel,deals,flights,hotels,cheap,compare,prices,booking,vacation,save,money,trip,fare,alert,budget`
5. Write the full description. iOS: the description is NOT indexed for search (only title, subtitle, and keyword field matter for ranking). Use it for conversion - explain the value, list key features, include social proof. Android: the description IS indexed - include keywords naturally in the first 1-2 paragraphs.
6. Design the screenshot strategy. First 2 screenshots must communicate the core value proposition. Order: (1) Hero - "What this app does" with the primary use case, (2) Key feature - the #1 differentiating feature, (3-5) Additional features, social proof, or use cases. Each screenshot should have a caption (headline on the screenshot image) and show the actual app UI.
7. Build the review generation strategy. Determine the optimal review prompt moment: immediately after a positive user event (successful transaction, achievement, or milestone). Implement SKStoreReviewController (iOS) or Google In-App Review API (Android) at that specific trigger. Do NOT prompt on first open, during error states, or during complex flows. Track: prompt impressions, review submissions, and average rating per trigger point.
8. Set up keyword tracking. Monitor weekly: keyword rankings for top 10-15 target keywords, impressions, page views, download conversion rate, and review velocity. Track competitor rankings for the same keywords.

## Output Format

```md
# App Store Optimization

## Current State
- App: [name]
- Platform: [iOS / Android / both]
- Category: [primary category]
- Current ratings: [X] stars ([N] reviews)
- Current conversion rate: [X]% (impressions → downloads)
- Current keyword rankings: [list top 5 keywords and current rank]

## Keyword Research

### Target Keywords
| Keyword | Search Volume | Competition | Current Rank | Target Rank | Priority |
|---------|--------------|-------------|-------------|-------------|----------|
| [keyword] | [high/medium/low] | [high/medium/low] | [rank or unranked] | [target] | [P0/P1/P2] |

### Competitor Keyword Gap
| Keyword | Your App | Competitor 1 | Competitor 2 | Competitor 3 |
|---------|----------|-------------|-------------|-------------|
| [keyword] | [rank] | [rank] | [rank] | [rank] |

## Optimized Metadata

### iOS
- **Title (30 chars):** `[optimized title]`
- **Subtitle (30 chars):** `[optimized subtitle]`
- **Keyword field (100 chars):** `[comma-separated keywords, no spaces after commas]`

### Android (if applicable)
- **Title (30 chars):** `[optimized title]`
- **Short description (80 chars):** `[optimized short description]`

### Full Description
```
[Full description text - for iOS: conversion-focused; for Android: keyword-integrated + conversion-focused]
```

## Screenshot Strategy

| Position | Caption | Screen Shown | Purpose |
|----------|---------|-------------|---------|
| 1 (Hero) | [headline - core value proposition] | [primary use case screen] | Answer "What does this app do?" |
| 2 | [headline - key differentiator] | [#1 differentiating feature] | Show the unique value |
| 3 | [headline - feature] | [feature screen] | Demonstrate depth |
| 4 | [headline - social proof or result] | [reviews, metrics, or outcome] | Build trust |
| 5 | [headline - secondary feature] | [additional feature] | Address secondary use case |

**Design specs:**
- iPhone: 1290 × 2796px (6.7" display) or 1242 × 2688px (6.5")
- iPad: 2048 × 2732px
- Format: actual app UI with caption overlay (not marketing mockups without real screens)

## Review Generation Strategy

### Prompt Timing
- Trigger event: [specific positive user moment - e.g., "after first successful deal save"]
- Conditions: [user has completed X sessions, no prompt in last 120 days, app not crashed in current session]
- Implementation: [SKStoreReviewController / Google In-App Review API]
- Frequency cap: [3x per year per user (iOS limit) / reasonable cadence for Android]

### Review Monitoring
- Review response cadence: [daily / weekly]
- Negative review protocol: [respond within 24h, escalate feature requests, track common complaints]
- Review velocity target: [N] new reviews per month

## Keyword Tracking Plan

| Metric | Frequency | Tool | Owner |
|--------|-----------|------|-------|
| Keyword rankings (top 15) | Weekly | [AppTweak / Sensor Tower / App Annie] | [name] |
| Impressions | Weekly | App Store Connect / Google Play Console | [name] |
| Page views | Weekly | App Store Connect / Google Play Console | [name] |
| Download conversion rate | Weekly | App Store Connect / Google Play Console | [name] |
| Review velocity | Monthly | App Store Connect / Google Play Console | [name] |
```

## QA Rubric (scored)

Each dimension scored 0-5. A passing file scores 16/20 minimum.

| Dimension | 0–1 | 2–3 | 4–5 |
|-----------|-----|-----|-----|
| Keyword optimization | No keyword research; title is just the brand name; keyword field is empty or filled with irrelevant terms | Keywords researched but title doesn't include primary keyword; keyword field has duplicates or wasted characters | Primary keyword in title; keyword field uses all 100 chars with no duplicates, no spaces after commas, no words duplicated from title/subtitle; competitor gap analysis documented |
| Screenshot quality | Screenshots are developer tool captures with no context; first screenshot shows a login screen or splash page | Screenshots show the app but captions are generic ("Feature 1") or first 2 screenshots don't communicate the core value proposition | First 2 screenshots communicate the full value proposition; each screenshot has a benefit-focused caption; actual app UI shown; order follows a conversion-optimized hierarchy |
| Review strategy | No review generation plan; SKStoreReviewController triggers on first app open or randomly | Review prompt exists but timing is not tied to a positive user moment; no frequency cap strategy | Review prompt triggers after a specific positive user event; conditions verified (session count, no recent prompt, no crash); response protocol for negative reviews documented |
| Measurement | No tracking plan; keyword rankings not monitored; conversion rate not measured | Basic tracking (downloads) but no keyword ranking monitoring or conversion rate analysis | Weekly keyword tracking for top 15 keywords; impressions, page views, conversion rate, and review velocity all monitored with targets; competitor rankings tracked |

## Anti-Patterns

| Anti-Pattern | Why It Fails | Correct Approach |
|---|---|---|
| App title is just the brand name with no keyword | Users search for "travel deals" not "FairFare." Without the keyword in the title, the app ranks for nothing except its brand name. Brand searches require brand awareness that a new app doesn't have | Include the primary keyword in the title. "FairFare - Travel Deals" captures both brand and keyword searches. Lead with the keyword if brand awareness is low |
| First screenshot is the login screen or splash page | 70% of App Store visitors never scroll past the first 2 screenshots. A login screen tells them nothing about the app's value. They leave without downloading because they can't see what the app does | First screenshot should be the hero - the primary use case with a benefit-focused caption. Show the app doing the thing users care about most. Login screens and onboarding belong inside the app, not in the listing |
| Prompting for review on first app open | User opens the app for the first time, hasn't experienced any value, and gets asked "Rate us!" They either dismiss (wasting 1 of 3 annual iOS prompts) or leave a low rating because they haven't used the app yet | Trigger the review prompt after a positive user event: completed a workflow, achieved a milestone, or received a successful result. The user is in a positive emotional state and more likely to leave a high rating |
| Keyword field with spaces, duplicates, and wasted characters | `travel, deals, cheap travel, find deals` - spaces waste 3 characters, "travel" and "deals" are duplicated (wastes 12 more), and Apple already indexes the singular/plural variants automatically. 15+ wasted characters = 2-3 missed keyword opportunities | No spaces after commas. No duplicates of words in title/subtitle. No plurals if singular is included. No category name. Use all 100 characters. Every character is a ranking opportunity |

## Examples (good/bad)

**Good:** FairFare iOS ASO. Title: "FairFare - Travel Deals" (24 chars). Subtitle: "Compare Flights & Hotels" (25 chars). Keyword field: `cheap,flights,hotels,booking,compare,prices,vacation,save,money,trip,fare,alert,budget,discount,search,last,minute,airfare,holiday,getaway` (100 chars, no duplicates of title/subtitle words). Screenshot 1: "Find the best deal in seconds" showing the deal comparison screen with real prices. Screenshot 2: "Save deals and get alerts" showing the save and notification features. Review prompt: triggers after user saves their first deal (positive event, user has experienced core value).

**Bad:** Title: "FairFare" (8 chars - wasted 22 characters of keyword space). Subtitle: "The Best App" (generic, no keywords). Keyword field: `fairfare, travel app, best travel app, FairFare app` (duplicates brand name 3x, "app" is the category name, spaces after commas). Screenshot 1: FairFare logo on blue background. Review prompt: on first app open.

## Variants

- **Android variant:** Title and short description are both indexed - keyword-optimize both. Use Google Play Experiments to A/B test listing elements (title, short description, screenshots, icon). Long description is also indexed - include target keywords naturally in the first 200 characters. Google Play has more flexibility for A/B testing than iOS.
- **Game variant:** Screenshots should show gameplay, not menu screens. Video preview (App Store) or promo video (Google Play) is critical for games - show 15-30 seconds of the best gameplay. Category and subcategory selection matters more for games (Games > Strategy vs. Games > Casual drives very different traffic).
- **Pre-launch variant:** Optimize metadata before launch to capture organic traffic from day one. Submit screenshots and descriptions with the first build. Set up keyword tracking before launch to establish a baseline. Plan a launch-day review push (but only from genuine users - no incentivized reviews).
- **48h sprint:** Optimize the title (add primary keyword) and keyword field (fill all 100 characters using the rules). These two changes have the highest impact-to-effort ratio. Track keyword rankings weekly for 4 weeks to measure the effect. Screenshot and review optimization in phase 2.
