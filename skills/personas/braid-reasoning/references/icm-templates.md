# ICM Analytics BRAID Templates

Protocol analysis templates tailored for Internet Capital Markets fundamental analysis.

## Protocol Fundamental Analysis

```mermaid
flowchart TD
    A[Input: Protocol Name/Address] --> B[Fetch Protocol Metadata]
    B --> C[Query DeFiLlama for TVL]
    C --> D[Query DexScreener for Token Price]
    D --> E[Get Token Supply Data]
    E --> F[Calculate FDV and Circulating Mcap]
    F --> G{Revenue Data Available?}
    G -->|No| H[Mark Pre-Revenue]
    G -->|Yes| I[Fetch 30d Revenue]
    H --> J[Analyze Token Utility]
    I --> K[Annualize Revenue]
    K --> L[Calculate P/E Ratio]
    L --> J
    J --> M{Buyback Mechanism?}
    M -->|Yes| N[Analyze Buyback Rate]
    M -->|No| O[Note No Buyback]
    N --> P[Compare to Sector Peers]
    O --> P
    P --> Q{P/E Below Sector Avg?}
    Q -->|Yes| R[Signal: Potentially Undervalued]
    Q -->|No| S[Signal: Fair/Overvalued]
    R --> T[Generate Investment Score]
    S --> T
    T --> U[Compile Analysis Report]
```

**Data Sources:**
- TVL: DeFiLlama API
- Price: DexScreener API
- Revenue: Protocol-specific (check docs)
- Supply: Token contract or CoinGecko

## Token Buyback Evaluation

```mermaid
flowchart TD
    A[Input: Protocol with Buyback] --> B[Fetch Revenue Data]
    B --> C[Fetch Buyback Transactions]
    C --> D[Calculate Buyback Rate]
    D --> E[Get Token Price History]
    E --> F[Calculate Avg Buyback Price]
    F --> G[Compare to Current Price]
    G --> H{Buying Below Current?}
    H -->|Yes| I[Treasury Accumulating Value]
    H -->|No| J[Buying at Premium]
    I --> K[Calculate Annualized Yield]
    J --> K
    K --> L{Yield > 5%?}
    L -->|Yes| M[Strong Buyback Program]
    L -->|No| N[Weak Buyback Impact]
    M --> O[Factor into Valuation]
    N --> O
    O --> P[Output: Buyback Analysis]
```

## P/E Ratio Deep Dive

```mermaid
flowchart TD
    A[Input: Protocol] --> B[Get Market Cap]
    B --> C[Get 30d Revenue]
    C --> D[Annualize: Revenue × 12]
    D --> E[Calculate P/E: Mcap / Annual Rev]
    E --> F{P/E < 10?}
    F -->|Yes| G[Deep Value Territory]
    F -->|No| H{P/E < 30?}
    G --> I[Check Revenue Trend]
    H -->|Yes| J[Reasonable Valuation]
    H -->|No| K[Growth Premium Priced In]
    J --> I
    K --> I
    I --> L{Revenue Growing?}
    L -->|Yes| M[Justify Current P/E]
    L -->|No| N[Red Flag: Expensive + Flat]
    M --> O[Compare to Sector]
    N --> O
    O --> P[Output: P/E Assessment]
```

## Launchpad Analysis (Pump.Fun, Believe, etc.)

```mermaid
flowchart TD
    A[Input: Launchpad Protocol] --> B[Fetch Total Launches]
    B --> C[Fetch Graduate Rate]
    C --> D[Calculate Graduation %]
    D --> E[Get Fee Revenue]
    E --> F[Get Trading Volume]
    F --> G[Calculate Take Rate]
    G --> H[Fetch Token Performance]
    H --> I{Token Has Utility?}
    I -->|Yes| J[Map Revenue to Token]
    I -->|No| K[Mark Speculative]
    J --> L[Calculate Rev per Token]
    K --> L
    L --> M[Compare to Competitors]
    M --> N{Market Leader?}
    N -->|Yes| O[Premium Justified]
    N -->|No| P[Discount Expected]
    O --> Q[Generate Launchpad Score]
    P --> Q
    Q --> R[Output: Launchpad Analysis]
```

## Sector Comparison Matrix

```mermaid
flowchart TD
    A[Input: Protocol + Sector] --> B[Identify Sector Peers]
    B --> C[Fetch All Peer Metrics]
    C --> D[Calculate Sector Avg P/E]
    D --> E[Calculate Sector Avg TVL]
    E --> F[Calculate Sector Avg Revenue]
    F --> G[Rank Protocol vs Peers]
    G --> H{Top Quartile Revenue?}
    H -->|Yes| I[Revenue Leader]
    H -->|No| J[Revenue Laggard]
    I --> K{Bottom Quartile P/E?}
    J --> K
    K -->|Yes| L[Potential Undervaluation]
    K -->|No| M[Fairly Valued]
    L --> N[Deep Dive Recommended]
    M --> N
    N --> O[Output: Sector Position]
```

## Backfill Decision Framework

Operational decision-making for gap-based backfill execution.
Maps to: `backfill.py::backfill_from_gaps()`, `gap_detector.py::detect_gaps_sector()`.

```mermaid
flowchart TD
    A[Input: Gap Report] --> B{Any Gaps Detected?}
    B -->|No| C[Terminal: No Action]
    B -->|Gaps found| D[Rank Gaps by gap_hours desc]
    D --> E{Archive span >= 1 day?}
    E -->|No: sub-day data| F[Flag: Estimates unreliable]
    E -->|Yes| G[Estimate API pages needed]
    F --> G
    G --> H{Rate limiter healthy?}
    H -->|Circuit tripped| I[Terminal: Defer - API unhealthy]
    H -->|OK| J{Pages within sector max?}
    J -->|Exceeds| K[Split into batches]
    J -->|Within| L[Execute backfill]
    K --> L
    L --> M{Handle mismatch?}
    M -->|Yes| N[Alert: Skip recycled handle]
    M -->|No| O{Save succeeded?}
    N --> O
    O -->|Failed| P[Alert: FATAL save failure]
    O -->|OK| Q{New tweets found?}
    P --> Q
    Q -->|Yes| R[Trigger NLP reanalysis]
    Q -->|No| S[Terminal: Gaps confirmed empty]
    R --> T[Terminal: Backfill complete]
```

**Constraints:**
- **ESTIMATE RELIABILITY (Fix #10):** span_days < 1.0 → unreliable estimates
- **RATE LIMIT:** Check get_rate_limiter_metrics() before batch backfill
- **API COST:** ~$0.02/page × ceil(estimated_missing / 20)
- **NLP TRIGGER (Fix #4):** Always schedule NLP when new_count > 0
- **SECTOR MAX_PAGES:** tokens/launchpads=3 (60 tweets), sire=5 (100), ai-feed=160 (3200)

## Pipeline Sector Health

Cross-sector health monitoring for tweet pipeline operations.
Maps to: `scheduler.py::get_sector_status()`, `run_tweet_backfill.py`.

```mermaid
flowchart TD
    A[Input: Sector List] --> B[Iterate Each Sector]
    B --> C[Load All Entity Archives]
    C --> D[Check lastUpdated per Entity]
    D --> E{Stale > Sector Threshold?}
    E -->|Yes| F[Flag: Entity Stale]
    E -->|No| G[Run Gap Detection]
    F --> G
    G --> H[Collect Gap Counts]
    H --> I[Check Rate Limiter Metrics]
    I --> J{Circuit Breaker Status?}
    J -->|Tripped| K[Flag: API Unhealthy]
    J -->|OK| L[Calculate Sector Score]
    K --> L
    L --> M{More Sectors?}
    M -->|Yes| B
    M -->|No| N[Rank Sectors by Health]
    N --> O[Generate Action Plan]
    O --> P[Terminal: Sector Health Report]
```

**Constraints:**
- **SECTOR ISOLATION:** Never mix data across sectors
- **STALENESS THRESHOLDS:** tokens/launchpads=24h, sire=12h, ai-feed=6h
- **ACTION PLAN:** "backfill with --since Xd", "investigate recycled handle", "restart cron"

## Investment Thesis Generator

```mermaid
flowchart TD
    A[Input: Protocol] --> B[Run Fundamental Analysis]
    B --> C[Run Buyback Evaluation]
    C --> D[Run Sector Comparison]
    D --> E[Aggregate Scores]
    E --> F{All Signals Bullish?}
    F -->|Yes| G[Strong Buy Thesis]
    F -->|No| H{Majority Bullish?}
    G --> I[High Conviction]
    H -->|Yes| J[Moderate Buy Thesis]
    H -->|No| K{Any Bullish?}
    J --> L[Medium Conviction]
    K -->|Yes| M[Speculative Thesis]
    K -->|No| N[Avoid/Short Thesis]
    M --> O[Low Conviction]
    N --> O
    I --> P[Generate Thesis Doc]
    L --> P
    O --> P
    P --> Q{Risks Identified?}
    Q -->|Yes| R[List Key Risks]
    Q -->|No| S[Flag: Review Risks]
    R --> T[Output: Investment Thesis]
    S --> T
```

## Quick Metrics Lookup

```mermaid
flowchart TD
    A[Input: Protocol + Metric] --> B{Which Metric?}
    B -->|TVL| C[Query DeFiLlama]
    B -->|Price| D[Query DexScreener]
    B -->|Revenue| E[Query Protocol API]
    B -->|P/E| F[Calculate from Rev + Mcap]
    C --> G[Format Response]
    D --> G
    E --> G
    F --> G
    G --> H[Output: Metric Value]
```

## Scout Extraction (Multi-Project Batch)

Production-tested GRD for extracting fundamentals across ALL projects in a scout's tweet batch.
Used by `scripts/braid_scout.py` - registered as `scout_extraction` in `shared/llm/cascade/grd.py`.

```mermaid
graph TD
    A[Parse tweet batch: text, dates, is_reply, engagement metrics] --> B{Tweet has substance? >= 50 chars}
    B -->|Low-info| B1[Skip tweet]
    B -->|Substantial| C[Extract tickers $XXX and project names]
    C --> D{Tweet contains numbers, $, %, or metric keywords?}
    D -->|No metrics| E1
    D -->|Has metrics| E[Extract metric: map to canonical type from enum]
    E --> F{Confidence check}
    F -->|Exact number + single project + direct| F1[confidence: high]
    F -->|Indirect attribution or platform-level| F2[confidence: medium]
    F -->|Inferred / estimated / conditional| F3[confidence: low]
    F1 --> E1
    F2 --> E1
    F3 --> E1
    E1{Tweet mentions listing, launch, unlock, partnership, integration?}
    E1 -->|Catalyst found| E2[Record catalyst: title, type, source_quote]
    E1 -->|No catalyst| G[Classify narrative]
    E2 --> G
    G --> I{All tweets processed?}
    B1 --> I
    I -->|More tweets| A
    I -->|Done| J[Group by project, cross-reference, rank]
    J --> N{Every metric has source_quote?}
    N -->|Missing| N1[Remove or find quote] --> J
    N -->|All quoted| O([Terminal: JSON output])
```

**Canonical Metric Types (19):**
`revenue, fees, tvl, volume, users, yield, market_cap, fdv, drawdown, growth, multiplier, unlock, funding, apy, p_e_ratio, inflows, transactions, price, other`

**Key Design Decisions:**
- Confidence calibration node prevents the "everything is high" trap
- Explicit catalyst extraction node prevents LLM from skipping non-numeric signals
- Post-processing normalization maps LLM free-text types to canonical types
- Feedback loop via `llm_feedback.py` injects corrections from previous runs

**Production Results (first run, 398 AIXBT tweets):**
- 85 projects, 156 metrics, ~$0.29 cost (Sonnet SDK), 100% source quote accuracy

---

## Usage Notes

1. **Always verify data sources** - APIs can lag or have errors
2. **Cross-reference metrics** - DeFiLlama TVL vs protocol-reported
3. **Note data freshness** - Include timestamp in analysis
4. **Flag missing data** - Don't estimate, mark as unavailable
5. **Compare apples to apples** - Same timeframes, same metrics
