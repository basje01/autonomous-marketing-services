#!/usr/bin/env python3
"""
braid_generator.py - Generate and execute BRAID reasoning scaffolds

BRAID (Bounded Reasoning for Autonomous Inference and Decisions) replaces
free-form Chain-of-Thought with structured Mermaid diagrams.

Based on arXiv:2512.15959 by OpenServ Labs.

Usage:
    python braid_generator.py generate "Your problem description"
    python braid_generator.py solve diagram.md "Your problem"
    python braid_generator.py full "Your problem description"
    python braid_generator.py template <name> "Your problem"
    python braid_generator.py templates

Requirements:
    pip install anthropic
    
Set ANTHROPIC_API_KEY environment variable.
"""

import sys
import os
import argparse
from typing import Optional, Tuple

try:
    from anthropic import Anthropic
except ImportError:
    print("Install anthropic: pip install anthropic")
    sys.exit(1)


# ============================================================================
# BRAID SYSTEM PROMPTS (Based on paper's findings)
# ============================================================================

ARCHITECT_SYSTEM = """You are a BRAID Architect - an expert at converting problems into Guided Reasoning Diagrams (GRDs) using Mermaid flowchart syntax.

## BRAID Design Principles (from arXiv:2512.15959)

1. ATOMIC DECOMPOSITION: Each node performs exactly ONE operation. No compound nodes.
   BAD: [Fetch data and validate and transform]
   GOOD: [Fetch Data] --> [Validate] --> [Transform]

2. TOKEN BREVITY: Keep nodes under 15 tokens. Verbose nodes reintroduce reasoning drift.
   BAD: [Calculate the protocol's annualized revenue by multiplying monthly by twelve]
   GOOD: [Annualize: Rev x 12]

3. EXPLICIT CONDITIONALS: All conditionals must be diamond decision nodes with labeled edges.
   Include feedback edges for revision paths.

4. TERMINAL CLARITY: Every path must end at an explicit terminal node.

## Diagram Types

- For CONSTRAINT tasks: Create "procedural scaffolds" with checkpoint nodes
- For MATH tasks: Create "computational templates" with variable placeholders

## Output Format

Output ONLY a valid Mermaid flowchart code block. No explanations.

```mermaid
flowchart TD
    A[First Step] --> B{Decision?}
    B -->|Yes| C[Action]
    B -->|No| D[Alternative]
    C --> E([Terminal: Success])
    D --> E
```"""

SOLVER_SYSTEM = """You are a BRAID Solver executing a Guided Reasoning Diagram.

## The Diagram
{diagram}

## Execution Protocol (STRICT)

1. STATE LOCATION: Begin each step with "Node [ID]: [Label]"
2. SINGLE ACTION: Perform ONLY that node's action
3. EXPLICIT DECISIONS: At diamonds, evaluate condition, state outcome, declare path
4. NO INVENTION: Do NOT create nodes not in diagram
5. NO SKIPPING: Do NOT skip nodes
6. LOOP LIMITS: Max 3 iterations per cycle
7. TERMINAL REQUIRED: Must reach terminal node

## Format

Node A: [Parse Input]
> [Your action]
Result: [Outcome]

Node B: {Decision?}
> Evaluating: [condition]
> [evaluation]
Decision: [Yes/No] -> Node [X]

...continue to terminal..."""


# ============================================================================
# TEMPLATES
# ============================================================================

TEMPLATES = {
    "protocol-analysis": """```mermaid
flowchart TD
    A[Input: Protocol] --> B[Fetch Metadata]
    B --> C[Query: TVL]
    C --> D[Query: Price]
    D --> E[Get Supply]
    E --> F[Calc: FDV]
    F --> G[Calc: Mcap]
    G --> H{Revenue Available?}
    H -->|No| I[Mark: Pre-Revenue]
    H -->|Yes| J[Fetch 30d Rev]
    I --> K[Analyze Utility]
    J --> L[Calc: Annual Rev]
    L --> M[Calc: P/E]
    M --> K
    K --> N{Buyback?}
    N -->|Yes| O[Analyze Buyback]
    N -->|No| P[Note: No Buyback]
    O --> Q[Compare Sector]
    P --> Q
    Q --> R{P/E < Avg?}
    R -->|Yes| S[Undervalued]
    R -->|No| T[Fair/Premium]
    S --> U[Score]
    T --> U
    U --> V([Terminal: Report])
```""",

    "token-buyback": """```mermaid
flowchart TD
    A[Input: Protocol] --> B[Fetch Revenue]
    B --> C[Fetch Buybacks]
    C --> D[Calc: Monthly Amount]
    D --> E[Fetch Price History]
    E --> F[Calc: Avg Buy Price]
    F --> G[Get Current Price]
    G --> H{Buying Below Current?}
    H -->|Yes| I[Accumulating Value]
    H -->|No| J[Buying Premium]
    I --> K[Calc: Yield]
    J --> K
    K --> L{Yield > 5%?}
    L -->|Yes| M[Strong Program]
    L -->|No| N[Weak Impact]
    M --> O[Factor Valuation]
    N --> O
    O --> P([Terminal: Analysis])
```""",

    "code-review": """```mermaid
flowchart TD
    A[Load Code] --> B[Parse Structure]
    B --> C[ID Changes]
    C --> D[Check Types]
    D --> E{Type Errors?}
    E -->|Yes| F[Log: Critical]
    E -->|No| G[Check Errors]
    F --> G
    G --> H{Unhandled?}
    H -->|Yes| I[Log: High]
    H -->|No| J[Check Security]
    I --> J
    J --> K{Injection?}
    K -->|Yes| L[Log: Critical]
    K -->|No| M[Check Perf]
    L --> M
    M --> N{O(n2)?}
    N -->|Yes| O[Log: Medium]
    N -->|No| P[Check Edges]
    O --> P
    P --> Q[Aggregate]
    Q --> R[Sort Severity]
    R --> S([Terminal: Report])
```""",

    "security-audit": """```mermaid
flowchart TD
    A[Load Code] --> B[Map Entries]
    B --> C[Trace Data]
    C --> D[Check Auth]
    D --> E{Bypass?}
    E -->|Yes| F[Crit: Auth]
    E -->|No| G[Check Authz]
    F --> G
    G --> H{Escalation?}
    H -->|Yes| I[Crit: Authz]
    H -->|No| J[Check Input]
    I --> J
    J --> K{Injection?}
    K -->|Yes| L[Crit: Inject]
    K -->|No| M[Check Secrets]
    L --> M
    M --> N{Hardcoded?}
    N -->|Yes| O[High: Secrets]
    N -->|No| P[Check Deps]
    O --> P
    P --> Q{CVEs?}
    Q -->|Yes| R[Med: Deps]
    Q -->|No| S[Compile]
    R --> S
    S --> T([Terminal: Audit])
```""",

    "debugging": """```mermaid
flowchart TD
    A[Observe Bug] --> B[Reproduce]
    B --> C{Reproducible?}
    C -->|No| D[More Context]
    D --> B
    C -->|Yes| E[Locate]
    E --> F[Hypothesis]
    F --> G[Test Design]
    G --> H[Execute]
    H --> I{Confirmed?}
    I -->|No| J[New Hypothesis]
    J --> F
    I -->|Yes| K[Fix]
    K --> L[Verify]
    L --> M{Resolved?}
    M -->|No| N[Side Effects?]
    N --> F
    M -->|Yes| O[Document]
    O --> P([Terminal: Fixed])
```""",

    "etl-pipeline": """```mermaid
flowchart TD
    A[Trigger] --> B[Load Config]
    B --> C[Init Conn]
    C --> D{Sources OK?}
    D -->|No| E[Use Cache]
    D -->|Yes| F[Extract]
    E --> F
    F --> G[Validate Schema]
    G --> H{Valid?}
    H -->|No| I[Transform]
    H -->|Yes| J[Clean]
    I --> J
    J --> K[Business Rules]
    K --> L[Derived Fields]
    L --> M[Validate Out]
    M --> N{Out Valid?}
    N -->|No| O[Log Error]
    N -->|Yes| P[Load]
    O --> P
    P --> Q[Watermarks]
    Q --> R([Terminal: Complete])
```""",

    "investment-thesis": """```mermaid
flowchart TD
    A[Input: Token] --> B[Fundamentals]
    B --> C[Calc P/E]
    C --> D{P/E < Sector?}
    D -->|Yes| E[Undervalued]
    D -->|No| F{Rev Growth > 20%?}
    E --> G[Utility Check]
    F -->|Yes| G
    F -->|No| H[Neutral]
    H --> G
    G --> I{Strong Utility?}
    I -->|Yes| J[High]
    I -->|No| K[Low]
    J --> L[Team]
    K --> L
    L --> M{Credible?}
    M -->|Yes| N[Team: High]
    M -->|No| O[Team: Low]
    N --> P[Scores]
    O --> P
    P --> Q[Thesis]
    Q --> R[Conviction]
    R --> S([Terminal: Thesis])
```""",

    "math-problem": """```mermaid
flowchart TD
    A[Parse Problem] --> B[Extract Vars]
    B --> C[ID Target]
    C --> D[Select Formula]
    D --> E[Substitute]
    E --> F[Compute 1]
    F --> G[Compute 2]
    G --> H[Verify Units]
    H --> I{Reasonable?}
    I -->|No| J[Recheck]
    J --> D
    I -->|Yes| K[Format]
    K --> L([Terminal: Answer])
```""",

    "anomaly-detection": """```mermaid
flowchart TD
    A[Load Data] --> B[Calc Stats]
    B --> C[Load Baseline]
    C --> D[Compare]
    D --> E{> 3 sigma?}
    E -->|Yes| F[Flag: Statistical]
    E -->|No| G[Check Rate]
    F --> G
    G --> H{Change > 50%?}
    H -->|Yes| I[Flag: Sudden]
    H -->|No| J[Check Pattern]
    I --> J
    J --> K{Known?}
    K -->|No| L[Flag: Unknown]
    K -->|Yes| M[Seasonal?]
    L --> M
    M --> N{Expected?}
    N -->|No| O[Flag: Seasonal]
    N -->|Yes| P[Aggregate]
    O --> P
    P --> Q{Critical?}
    Q -->|Yes| R[Alert]
    Q -->|No| S[Log]
    R --> T([Terminal: Report])
    S --> T
```"""
}


# ============================================================================
# CORE FUNCTIONS
# ============================================================================

def get_client() -> Anthropic:
    """Initialize Anthropic client."""
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        print("Error: Set ANTHROPIC_API_KEY environment variable")
        sys.exit(1)
    return Anthropic(api_key=api_key)


def generate_braid(problem: str, model: str = "claude-sonnet-4-20250514") -> str:
    """Generate a BRAID diagram from a problem description."""
    client = get_client()
    
    response = client.messages.create(
        model=model,
        max_tokens=2000,
        system=ARCHITECT_SYSTEM,
        messages=[
            {"role": "user", "content": f"Create a BRAID diagram for:\n\n{problem}"}
        ]
    )
    
    return response.content[0].text


def solve_with_braid(diagram: str, problem: str, model: str = "claude-sonnet-4-20250514") -> str:
    """Solve a problem using a BRAID diagram as reasoning scaffold."""
    client = get_client()
    
    system = SOLVER_SYSTEM.format(diagram=diagram)
    
    response = client.messages.create(
        model=model,
        max_tokens=4000,
        system=system,
        messages=[
            {"role": "user", "content": f"Execute the BRAID diagram to solve:\n\n{problem}"}
        ]
    )
    
    return response.content[0].text


def full_pipeline(
    problem: str,
    architect_model: str = "claude-sonnet-4-20250514",
    solver_model: str = "claude-sonnet-4-20250514"
) -> Tuple[str, str]:
    """Run full BRAID pipeline: generate diagram then solve."""
    
    print("ARCHITECT PHASE: Generating BRAID diagram...")
    diagram = generate_braid(problem, architect_model)
    
    print("SOLVER PHASE: Executing bounded reasoning...")
    solution = solve_with_braid(diagram, problem, solver_model)
    
    return diagram, solution


def list_templates():
    """List available pre-built BRAID templates."""
    print("\nAvailable BRAID Templates:\n")
    
    categories = {
        "ICM Analytics": ["protocol-analysis", "token-buyback", "investment-thesis"],
        "Development": ["code-review", "security-audit", "debugging"],
        "Data": ["etl-pipeline", "anomaly-detection"],
        "Math": ["math-problem"]
    }
    
    for category, templates in categories.items():
        print(f"  {category}:")
        for t in templates:
            if t in TEMPLATES:
                print(f"    - {t}")
    
    print("\nUsage: python braid_generator.py template <name> 'problem'")


def use_template(template_name: str, problem: str, model: str) -> str:
    """Use a pre-built template to solve a problem."""
    if template_name not in TEMPLATES:
        print(f"Error: Unknown template '{template_name}'")
        list_templates()
        sys.exit(1)
    
    diagram = TEMPLATES[template_name]
    print(f"Using template: {template_name}")
    print(diagram)
    print("\n" + "="*60 + "\n")
    
    return solve_with_braid(diagram, problem, model)


# ============================================================================
# CLI
# ============================================================================

def main():
    parser = argparse.ArgumentParser(
        description="BRAID: Bounded Reasoning for Autonomous Inference and Decisions",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  Generate a BRAID diagram:
    python braid_generator.py generate "Analyze Pump.Fun fundamentals"
    
  Run full pipeline:
    python braid_generator.py full "Calculate P/E for Meteora protocol"
    
  Use pre-built template:
    python braid_generator.py template protocol-analysis "Analyze BONK"
    
  Golden Quadrant (cheaper solver):
    python braid_generator.py full "Analysis" -m claude-sonnet-4-20250514 -s claude-haiku-4-5-20251001
    
  List templates:
    python braid_generator.py templates

Based on arXiv:2512.15959
"""
    )
    
    parser.add_argument("command", 
                       choices=["generate", "solve", "full", "template", "templates"])
    parser.add_argument("args", nargs="*")
    parser.add_argument("--model", "-m", default="claude-sonnet-4-20250514")
    parser.add_argument("--solver-model", "-s", default=None)
    
    args = parser.parse_args()
    
    if args.command == "templates":
        list_templates()
        return
    
    if args.command == "generate":
        if not args.args:
            print("Error: Provide problem description")
            sys.exit(1)
        print(generate_braid(" ".join(args.args), args.model))
        
    elif args.command == "solve":
        if len(args.args) < 2:
            print("Error: Provide diagram file and problem")
            sys.exit(1)
        with open(args.args[0]) as f:
            diagram = f.read()
        print(solve_with_braid(diagram, " ".join(args.args[1:]), args.model))
        
    elif args.command == "full":
        if not args.args:
            print("Error: Provide problem description")
            sys.exit(1)
        solver = args.solver_model or args.model
        diagram, solution = full_pipeline(" ".join(args.args), args.model, solver)
        
        print("\n" + "="*60)
        print("BRAID DIAGRAM")
        print("="*60 + "\n")
        print(diagram)
        print("\n" + "="*60)
        print("SOLUTION")
        print("="*60 + "\n")
        print(solution)
        
    elif args.command == "template":
        if len(args.args) < 2:
            print("Error: Provide template name and problem")
            list_templates()
            sys.exit(1)
        print(use_template(args.args[0], " ".join(args.args[1:]), args.model))


if __name__ == "__main__":
    main()
