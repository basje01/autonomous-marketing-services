# Data Pipeline BRAID Templates

ETL, validation, anomaly detection, and data processing scaffolds.

## ETL Pipeline

```mermaid
flowchart TD
    A[Trigger: Schedule/Event] --> B[Load Config]
    B --> C[Initialize Connections]
    C --> D{All Sources Available?}
    D -->|No| E[Log Warning, Use Cache]
    D -->|Yes| F[Extract Raw Data]
    E --> F
    F --> G[Validate Source Schema]
    G --> H{Schema Match?}
    H -->|No| I[Apply Schema Migration]
    H -->|Yes| J[Transform Data]
    I --> J
    J --> K[Apply Business Rules]
    K --> L[Calculate Derived Fields]
    L --> M[Validate Output Schema]
    M --> N{Output Valid?}
    N -->|No| O[Log Error, Skip Record]
    N -->|Yes| P[Load to Destination]
    O --> P
    P --> Q[Update Watermarks]
    Q --> R[Invalidate Caches]
    R --> S[Send Notifications]
    S --> T[Output: Pipeline Complete]
```

## Data Validation

```mermaid
flowchart TD
    A[Load Data Batch] --> B[Check Row Count]
    B --> C{Count > 0?}
    C -->|No| D[Flag: Empty Batch]
    C -->|Yes| E[Check Schema]
    D --> E
    E --> F{Required Fields Present?}
    F -->|No| G[Flag: Missing Fields]
    F -->|Yes| H[Check Data Types]
    G --> H
    H --> I{Types Correct?}
    I -->|No| J[Flag: Type Mismatch]
    I -->|Yes| K[Check Value Ranges]
    J --> K
    K --> L{Values in Range?}
    L -->|No| M[Flag: Out of Range]
    L -->|Yes| N[Check Uniqueness]
    M --> N
    N --> O{Duplicates?}
    O -->|Yes| P[Flag: Duplicates]
    O -->|No| Q[Check Referential Integrity]
    P --> Q
    Q --> R{FK Valid?}
    R -->|No| S[Flag: Orphan Records]
    R -->|Yes| T[Compile Validation Report]
    S --> T
    T --> U{Critical Flags?}
    U -->|Yes| V[Reject Batch]
    U -->|No| W[Accept with Warnings]
    V --> X[Output: Validation Result]
    W --> X
```

## Anomaly Detection

```mermaid
flowchart TD
    A[Load New Data] --> B[Calculate Statistics]
    B --> C[Load Historical Baseline]
    C --> D[Compare to Baseline]
    D --> E{Value > 3σ?}
    E -->|Yes| F[Flag: Statistical Outlier]
    E -->|No| G[Check Rate of Change]
    F --> G
    G --> H{Change > 50%?}
    H -->|Yes| I[Flag: Sudden Change]
    H -->|No| J[Check Pattern Match]
    I --> J
    J --> K{Matches Known Pattern?}
    K -->|No| L[Flag: Unknown Pattern]
    K -->|Yes| M[Check Seasonality]
    L --> M
    M --> N{Expected Seasonal?}
    N -->|No| O[Flag: Seasonal Anomaly]
    N -->|Yes| P[Aggregate Anomalies]
    O --> P
    P --> Q{Any Critical?}
    Q -->|Yes| R[Send Alert]
    Q -->|No| S[Log for Review]
    R --> T[Output: Anomaly Report]
    S --> T
```

## Data Quality Scoring

```mermaid
flowchart TD
    A[Load Dataset] --> B[Measure Completeness]
    B --> C[Calculate: Non-null / Total]
    C --> D[Measure Accuracy]
    D --> E[Sample Check vs Source]
    E --> F[Measure Consistency]
    F --> G[Cross-field Validation]
    G --> H[Measure Timeliness]
    H --> I[Check Data Age]
    I --> J[Measure Uniqueness]
    J --> K[Check Duplicate Rate]
    K --> L[Measure Validity]
    L --> M[Check Format Compliance]
    M --> N[Weight Dimensions]
    N --> O[Calculate Overall Score]
    O --> P{Score > 80%?}
    P -->|Yes| Q[Quality: Good]
    P -->|No| R{Score > 60%?}
    Q --> S[Output: Quality Report]
    R -->|Yes| T[Quality: Acceptable]
    R -->|No| U[Quality: Poor]
    T --> S
    U --> S
```

## Incremental Load

```mermaid
flowchart TD
    A[Get Last Watermark] --> B[Query Source: WHERE updated > watermark]
    B --> C{New Records?}
    C -->|No| D[Log: No Changes]
    C -->|Yes| E[Extract Changed Records]
    D --> F[Output: Complete]
    E --> G[Identify Record Type]
    G --> H{Insert or Update?}
    H -->|Insert| I[Insert New Records]
    H -->|Update| J[Update Existing]
    I --> K[Update Watermark]
    J --> K
    K --> L{More Batches?}
    L -->|Yes| B
    L -->|No| M[Reconcile Counts]
    M --> N{Counts Match?}
    N -->|No| O[Log Discrepancy]
    N -->|Yes| F
    O --> F
```

## Data Reconciliation

```mermaid
flowchart TD
    A[Define Source A and B] --> B[Load Record Counts]
    B --> C{Counts Match?}
    C -->|No| D[Flag: Count Mismatch]
    C -->|Yes| E[Sample Records]
    D --> E
    E --> F[Compare Field Values]
    F --> G{Values Match?}
    G -->|No| H[Identify Discrepancies]
    G -->|Yes| I[Check Aggregates]
    H --> I
    I --> J[Sum Key Metrics]
    J --> K{Sums Match?}
    K -->|No| L[Flag: Aggregate Mismatch]
    K -->|Yes| M[Check Timestamps]
    L --> M
    M --> N{Sync Within SLA?}
    N -->|No| O[Flag: Stale Data]
    N -->|Yes| P[Compile Reconciliation Report]
    O --> P
    P --> Q{Critical Issues?}
    Q -->|Yes| R[Escalate]
    Q -->|No| S[Output: Reconciliation Complete]
    R --> S
```

## Schema Evolution

```mermaid
flowchart TD
    A[Detect Schema Change] --> B[Compare Old vs New]
    B --> C{Breaking Change?}
    C -->|Yes| D[Plan Migration]
    C -->|No| E{Additive Change?}
    D --> F[Create Migration Script]
    E -->|Yes| G[Add New Columns]
    E -->|No| H[Rename/Type Change]
    G --> I[Set Defaults for Existing]
    H --> J[Create Compat Layer]
    F --> K[Test Migration]
    I --> K
    J --> K
    K --> L{Test Pass?}
    L -->|No| M[Revise Migration]
    M --> K
    L -->|Yes| N[Schedule Downtime]
    N --> O[Execute Migration]
    O --> P[Verify Data Integrity]
    P --> Q{Integrity OK?}
    Q -->|No| R[Rollback]
    Q -->|Yes| S[Update Documentation]
    R --> M
    S --> T[Output: Schema Evolved]
```

## Real-time Stream Processing

```mermaid
flowchart TD
    A[Receive Event] --> B[Parse Payload]
    B --> C{Valid Format?}
    C -->|No| D[Send to Dead Letter]
    C -->|Yes| E[Enrich with Context]
    D --> F[Continue Processing]
    E --> G[Apply Transformations]
    G --> H[Window Aggregation]
    H --> I{Window Complete?}
    I -->|No| J[Update Window State]
    I -->|Yes| K[Emit Aggregated Result]
    J --> F
    K --> L[Write to Sink]
    L --> M[Update Checkpoints]
    M --> N{Backpressure?}
    N -->|Yes| O[Slow Down Ingestion]
    N -->|No| F
    O --> F
```

## Tweet Archive Gap Detection

Detects temporal gaps in tweet archives where data may be missing.
Maps to: `gap_detector.py::detect_gaps_for_account()` lines 41-152.

```mermaid
flowchart TD
    A[Load Archive JSON] --> B{Archive Exists?}
    B -->|No| C[Terminal: No Archive]
    B -->|Yes| D[Extract All Tweet Dates]
    D --> E{>= 2 Dated Tweets?}
    E -->|No| F[Terminal: Insufficient Data]
    E -->|Yes| G[Sort Tweets by CreatedAt]
    G --> H[Calculate Archive Span Days]
    H --> I{Span >= 1 Day?}
    I -->|No| J[Set avg_per_day = 0]
    I -->|Yes| K[Calculate avg_per_day]
    J --> L[Walk Consecutive Pairs]
    K --> L
    L --> M{Delta > Threshold?}
    M -->|No| N[Next Pair]
    M -->|Yes| O{avg_per_day > 0?}
    O -->|Yes| P[Estimate Missing Tweets]
    O -->|No| Q[Set estimated_missing = 0]
    P --> R[Record Gap Details]
    Q --> R
    R --> N
    N --> S{More Pairs?}
    S -->|Yes| L
    S -->|No| T[Aggregate Gap Report]
    T --> U[Terminal: Gap Report]
```

**Constraints:**
- **SPAN CHECK (Fix #10):** Never extrapolate avg_per_day from spans < 1 day - avoids inflated estimates
- **DATE RANGE (Fix #6):** Gap start must be before gap end
- **THRESHOLDS:** tokens/launchpads=48h, sire=24h, ai-feed=6h

## Tweet Backfill Execution

Executes backfill for a single entity account with all safety checks.
Maps to: `backfill.py::backfill_account()` lines 124-286.

```mermaid
flowchart TD
    A[Input: entity_id, handle, since, until] --> B{until > since?}
    B -->|No| C[Terminal: Invalid Date Range]
    B -->|Yes| D[Calculate max_tweets from sector]
    D --> E[Call fetch_user_tweets_until]
    E --> F{API Returned Data?}
    F -->|No| G[Terminal: No Data]
    F -->|Yes| H{Returned Handle == Configured?}
    H -->|No| I[Terminal: Recycled Handle]
    H -->|Yes| J{tweets is list?}
    J -->|No| K[Terminal: Invalid Response]
    J -->|Yes| L[Shallow Copy + Add Metrics Dict]
    L --> M[Call archive_tweets with Prepared]
    M --> N{Save Archive}
    N -->|Fail| O[Terminal: Save Failed FATAL]
    N -->|Success| P{new_count > 0?}
    P -->|Yes| Q[Trigger NLP Reanalysis]
    P -->|No| R[Terminal: No New Tweets]
    Q --> S[Terminal: Backfill Complete]
```

**Constraints:**
- **DATE VALIDATION (Fix #6):** until <= since is a terminal error
- **RECYCLED HANDLE (Fix #3):** Compare returned_handle.lower() != handle.lower() - abort if mismatch
- **NO DOUBLE-PROCESSING (Fix #2):** dict(tweet) shallow copy adds metrics without stripping entities/extendedEntities
- **TYPE CHECK (Fix #5):** isinstance(tweets, list) before iteration
- **FATAL SAVE (Fix #15):** Save failure halts processing
- **NLP TRIGGER (Fix #4):** Mandatory when new_count > 0

## Archive Health Assessment

Read-only validation of tweet archive structure and data integrity.
Maps to: `archive.py::validate_archive()` lines 693-770.

```mermaid
flowchart TD
    A[Load Archive File] --> B{Valid JSON?}
    B -->|No| C[Flag: Corrupt Archive]
    B -->|Yes| D[Check Required Keys]
    D --> E{accounts + metadata present?}
    E -->|Missing| F[Flag: Schema Violation]
    E -->|Present| G[Check Metadata Fields]
    F --> G
    G --> H{lastUpdated Present?}
    H -->|No| I[Flag: Uninitialized Metadata]
    H -->|Yes| J[Calculate Staleness]
    I --> J
    J --> K{Stale > Threshold?}
    K -->|Yes| L[Flag: Stale Data]
    K -->|No| M[Validate Tweet Structure]
    L --> M
    M --> N{tweets is dict with IDs?}
    N -->|No| O[Flag: Invalid Tweet Store]
    N -->|Yes| P[Check totalTweets Consistency]
    O --> P
    P --> Q[Compile Health Report]
    Q --> R[Terminal: Health Assessment]
    C --> R
```

**Constraints:**
- **METADATA INIT (Fix #7):** Archives need lastUpdated, totalTweets, createdAt
- **SCHEMA (Fix #13):** Validate required keys before processing
- **HANDLE CHECK (Fix #3):** Verify account handles match config

## Usage Notes

1. **Idempotency** - Ensure pipelines can be re-run safely
2. **Watermarks** - Track what's been processed
3. **Dead letters** - Don't lose failed records
4. **Monitoring** - Alert on anomalies, not just failures
5. **Backfill strategy** - Plan for historical data loads
6. **Schema versioning** - Track and document changes
7. **Backfill idempotency** - archive_tweets() uses tweet_id dict keys for natural dedup
8. **NLP trigger** - Always run NLP reanalysis after backfill when new_count > 0
9. **Archive validation** - Run validate_archive() before reading archive data
