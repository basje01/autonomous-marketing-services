# Developer BRAID Templates

Code review, security audit, API design, and debugging scaffolds.

## Code Review

```mermaid
flowchart TD
    A[Load Code Diff/File] --> B[Parse AST/Structure]
    B --> C[Identify Changed Functions]
    C --> D[Check Type Safety]
    D --> E{Type Errors?}
    E -->|Yes| F[Log Type Issue: Critical]
    E -->|No| G[Check Error Handling]
    F --> G
    G --> H{Unhandled Exceptions?}
    H -->|Yes| I[Log Error Risk: High]
    H -->|No| J[Check Input Validation]
    I --> J
    J --> K{SQL/XSS/Injection Risk?}
    K -->|Yes| L[Log Security: Critical]
    K -->|No| M[Check Performance]
    L --> M
    M --> N{O(n²) or Worse?}
    N -->|Yes| O[Log Performance: Medium]
    N -->|No| P[Check Edge Cases]
    O --> P
    P --> Q{Null/Empty Handling?}
    Q -->|No| R[Log Edge Case: Low]
    Q -->|Yes| S[Check Test Coverage]
    R --> S
    S --> T[Aggregate Findings]
    T --> U[Sort by Severity]
    U --> V[Format Review Output]
```

## Security Audit

```mermaid
flowchart TD
    A[Load Codebase] --> B[Identify Entry Points]
    B --> C[Map Data Flow]
    C --> D[Check Authentication]
    D --> E{Auth Bypass Possible?}
    E -->|Yes| F[Critical: Auth Vulnerability]
    E -->|No| G[Check Authorization]
    F --> G
    G --> H{IDOR/Privilege Escalation?}
    H -->|Yes| I[Critical: Authz Vulnerability]
    H -->|No| J[Check Input Handling]
    I --> J
    J --> K{Injection Vectors?}
    K -->|Yes| L[Critical: Injection Risk]
    K -->|No| M[Check Secrets Management]
    L --> M
    M --> N{Hardcoded Secrets?}
    N -->|Yes| O[High: Secret Exposure]
    N -->|No| P[Check Dependencies]
    O --> P
    P --> Q{Known CVEs?}
    Q -->|Yes| R[Medium: Vulnerable Deps]
    Q -->|No| S[Check Error Handling]
    R --> S
    S --> T{Info Leakage in Errors?}
    T -->|Yes| U[Low: Info Disclosure]
    T -->|No| V[Compile Security Report]
    U --> V
    V --> W[Prioritize by CVSS]
    W --> X[Output: Security Audit]
```

## API Design

```mermaid
flowchart TD
    A[Define Domain/Resource] --> B[Identify Core Entities]
    B --> C[Map Entity Relationships]
    C --> D[Define URL Structure]
    D --> E[Map HTTP Methods to Actions]
    E --> F[Define Request Schemas]
    F --> G[Define Response Schemas]
    G --> H[Define Error Responses]
    H --> I[Add Pagination Strategy]
    I --> J{Auth Required?}
    J -->|Yes| K[Define Auth Method]
    J -->|No| L[Mark Public Endpoint]
    K --> M[Set Rate Limits]
    L --> M
    M --> N[Define Versioning Strategy]
    N --> O[Write OpenAPI Spec]
    O --> P[Generate Example Requests]
    P --> Q[Output: API Design Doc]
```

## Debugging Workflow

```mermaid
flowchart TD
    A[Observe Bug/Error] --> B[Reproduce Reliably]
    B --> C{Reproducible?}
    C -->|No| D[Gather More Context]
    D --> E[Check Logs]
    E --> B
    C -->|Yes| F[Identify Error Location]
    F --> G[Form Hypothesis]
    G --> H[Design Minimal Test]
    H --> I[Run Test]
    I --> J{Hypothesis Confirmed?}
    J -->|No| K[Eliminate Hypothesis]
    K --> L{More Hypotheses?}
    L -->|Yes| G
    L -->|No| M[Expand Search Scope]
    M --> F
    J -->|Yes| N[Implement Fix]
    N --> O[Test Fix]
    O --> P{Bug Resolved?}
    P -->|No| Q[Check Side Effects]
    Q --> G
    P -->|Yes| R[Verify No Regression]
    R --> S[Document Root Cause]
    S --> T[Output: Fix + Documentation]
```

## Data Pipeline Audit

Systematic audit of any data pipeline module for safety issues.
Encodes 14-fix audit lessons as bounded constraints.

```mermaid
flowchart TD
    A[Load Pipeline Module] --> B[Trace Data Flow End-to-End]
    B --> C[Identify: Source → Transform → Sink]
    C --> D{Shared Mutable State?}
    D -->|Yes| E[Flag: Thread Safety Risk]
    D -->|No| F[Check API Response Handling]
    E --> F
    F --> G{Response Type Validated?}
    G -->|No| H[Flag: Type Assumption]
    G -->|Yes| I{Falsy Value Traps?}
    H --> I
    I -->|if value: on numerics| J[Flag: Falsy Trap]
    I -->|is not None checks| K[Check Save Failure Path]
    J --> K
    K --> L{Save Failure Halts Pipeline?}
    L -->|No: Silent Continue| M[Flag: Non-Fatal Save CRITICAL]
    L -->|Yes| N[Check Downstream Triggers]
    M --> N
    N --> O{Post-Save Conditional?}
    O -->|No: Always Run| P[Flag: Wasted Processing]
    O -->|Yes: Only on New Data| Q[Check Config Mutation]
    P --> Q
    Q --> R{Pipeline Writes to Config?}
    R -->|Yes| S[Flag: Config Auto-Mutation CRITICAL]
    R -->|No: Read-Only| T[Prioritize by Severity]
    S --> T
    T --> U[Terminal: Pipeline Audit Report]
```

**Constraints:**
- **DOUBLE-PROCESSING (Fix #2):** Trace data from API through every transform - check if strips break downstream
- **FALSY TRAPS (Meta-Principle #3):** `if value:` on 0, 0.0, "", [] is always wrong for pipeline data
- **NON-FATAL SAVE (Fix #15):** save_tweet_archive() returning False must halt, not continue
- **CONFIG MUTATION (Meta-Principle #4):** Pipelines NEVER write to config/entities.json
- **ALERT CONTEXT (Fix #8):** Every alert needs project_name + entity_id

## API Integration Safety

Validates API integration patterns for data pipeline safety.

```mermaid
flowchart TD
    A[Define API Contract] --> B[Check Response Status]
    B --> C{Status == success?}
    C -->|No| D[Terminal: API Error]
    C -->|Yes| E[Extract Data Field]
    E --> F{Expected Type Check?}
    F -->|Not a List| G[Terminal: Type Mismatch]
    F -->|Correct Type| H{Handle Identity Check?}
    H -->|returned != configured| I[Terminal: Recycled Handle]
    H -->|Match| J[Check Pagination Logic]
    J --> K{Age Boundary Both Directions?}
    K -->|Only Too-Old| L[Flag: Missing Too-New Check]
    K -->|Both Checked| M[Check Rate Limiter]
    L --> M
    M --> N{Circuit Breaker Integrated?}
    N -->|No| O[Flag: Missing Circuit Breaker]
    N -->|Yes| P[Terminal: API Integration Safe]
    O --> P
```

**Constraints:**
- **WINDOW BOUNDARY (Fix #1):** Must handle BOTH too-new AND too-old tweets on mixed pages
- **TYPE CHECK (Fix #5):** isinstance(tweets, list) before iteration
- **RECYCLED HANDLE (Fix #3):** Compare returned vs configured handle
- **RETRY:** Use time-budget retry, not fixed-count retry

## Database Schema Review

```mermaid
flowchart TD
    A[Load Schema] --> B[Identify Tables]
    B --> C[Map Relationships]
    C --> D[Check Primary Keys]
    D --> E{All Tables Have PK?}
    E -->|No| F[Flag: Missing PK]
    E -->|Yes| G[Check Foreign Keys]
    F --> G
    G --> H{Referential Integrity?}
    H -->|No| I[Flag: Orphan Risk]
    H -->|Yes| J[Check Indexes]
    I --> J
    J --> K{Query Patterns Indexed?}
    K -->|No| L[Suggest Indexes]
    K -->|Yes| M[Check Data Types]
    L --> M
    M --> N{Appropriate Types?}
    N -->|No| O[Flag: Type Issues]
    N -->|Yes| P[Check Normalization]
    O --> P
    P --> Q{3NF Violations?}
    Q -->|Yes| R[Flag: Denormalization]
    Q -->|No| S[Compile Schema Report]
    R --> S
    S --> T[Output: Schema Review]
```

## Refactoring Plan

```mermaid
flowchart TD
    A[Identify Code Smell] --> B[Classify Smell Type]
    B --> C{Which Type?}
    C -->|Duplication| D[Extract Common Code]
    C -->|Long Method| E[Break Into Functions]
    C -->|God Class| F[Split Responsibilities]
    C -->|Feature Envy| G[Move to Owning Class]
    D --> H[Plan Extraction]
    E --> H
    F --> H
    G --> H
    H --> I[Identify Dependencies]
    I --> J[Write Tests First]
    J --> K[Apply Refactoring]
    K --> L[Run Tests]
    L --> M{Tests Pass?}
    M -->|No| N[Revert and Retry]
    N --> K
    M -->|Yes| O[Check Performance]
    O --> P{Regression?}
    P -->|Yes| Q[Optimize]
    Q --> L
    P -->|No| R[Document Changes]
    R --> S[Output: Refactored Code]
```

## Test Coverage Analysis

```mermaid
flowchart TD
    A[Run Coverage Tool] --> B[Parse Coverage Report]
    B --> C[Identify Uncovered Lines]
    C --> D[Classify by Risk]
    D --> E{Critical Path?}
    E -->|Yes| F[Priority: High]
    E -->|No| G{Error Handler?}
    F --> H[Group by Module]
    G -->|Yes| I[Priority: Medium]
    G -->|No| J[Priority: Low]
    I --> H
    J --> H
    H --> K[Generate Test Stubs]
    K --> L[Identify Edge Cases]
    L --> M[Write Test Plan]
    M --> N[Output: Coverage Improvement Plan]
```

## CI/CD Pipeline Design

```mermaid
flowchart TD
    A[Define Trigger Events] --> B[Lint Stage]
    B --> C{Lint Pass?}
    C -->|No| D[Fail Fast]
    C -->|Yes| E[Type Check Stage]
    E --> F{Types Pass?}
    F -->|No| D
    F -->|Yes| G[Unit Test Stage]
    G --> H{Tests Pass?}
    H -->|No| D
    H -->|Yes| I[Build Stage]
    I --> J{Build Success?}
    J -->|No| D
    J -->|Yes| K[Integration Test]
    K --> L{Integration Pass?}
    L -->|No| D
    L -->|Yes| M{Main Branch?}
    M -->|Yes| N[Deploy to Staging]
    M -->|No| O[Skip Deploy]
    N --> P[Smoke Test]
    P --> Q{Smoke Pass?}
    Q -->|No| R[Rollback]
    Q -->|Yes| S[Output: Pipeline Complete]
    O --> S
    D --> T[Notify Failure]
```

## Usage Notes

1. **Start with failing tests** - Ensure bug exists before fixing
2. **One refactoring at a time** - Don't mix changes
3. **Security first** - Always check auth/authz before other issues
4. **Document assumptions** - Note what you're taking for granted
5. **Automate checks** - Convert findings into CI rules
