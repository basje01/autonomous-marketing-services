---
id: automation
title: SEO Automation Workflow Design
category: seo
goal: Design SEO automation workflows for repeatable tasks like rank tracking, content scoring, redirect management, and reporting, with human review gates for quality control.
best_for: SEO teams managing large sites where manual execution of routine tasks does not scale.
inputs:
  - Current manual SEO workflows to automate
  - Tool stack (CMS, analytics, rank tracker, crawler)
  - Team capacity and review bandwidth
  - Risk tolerance for automated actions
constraints:
  - Automated actions that modify live content must pass through a human review gate
  - Monitoring automations (tracking, alerting) can run fully autonomously
  - Every automation must have a kill-switch and rollback procedure
outputs:
  - Automation workflow specifications with trigger, action, and gate definitions
  - Tool integration requirements
  - Human review gate placement for each workflow
  - Kill-switch and rollback procedures
quality_checks:
  - Every content-modifying automation has a human gate before execution
  - Monitoring automations have alert thresholds defined
  - Kill-switch procedures are specific and tested
tags:
  - seo
  - analytics
  - growth
version: 1.0.0
impact: 4
---

## Context

Use this when an SEO operation has grown beyond what manual processes can sustain. Common automation targets: rank tracking alerts, content freshness scoring, redirect chain detection, broken link monitoring, and automated reporting. The key design principle: automate monitoring and alerting freely, but gate any content-modifying actions behind human review.

## Procedure

1. Inventory current manual SEO workflows: list every recurring task, its frequency, and time cost.
2. Classify each workflow: monitoring (read-only), alerting (notification), or action (modifies content/config).
3. Design automation spec for each workflow: trigger condition, automated steps, output, and gate placement.
4. For action workflows: define the human review gate (who reviews, approval criteria, SLA).
5. For monitoring workflows: define alert thresholds and notification channels.
6. Specify tool integrations required for each workflow.
7. Design kill-switch and rollback procedure for each automation.

## Output Format

```md
# SEO Automation Design: [Site/Team]

## Workflow Inventory
| # | Workflow | Type | Current Frequency | Time Cost | Automate? |
|---|---------|------|-------------------|-----------|-----------|
| 1 | | Monitor/Alert/Action | Weekly | Xh | Yes/No |

## Automation Specs

### Workflow: [Name]
- Type: [Monitor/Alert/Action]
- Trigger: [condition or schedule]
- Steps:
  1. [Automated step]
  2. [Automated step]
  3. [Human gate: reviewer approves/rejects]
  4. [Execution if approved]
- Output: [report/alert/content change]
- Tools: [integrations needed]
- Kill-switch: [how to stop immediately]
- Rollback: [how to undo if something goes wrong]

## Human Review Gates
| Workflow | Gate Placement | Reviewer | Approval Criteria | SLA |
|---------|---------------|----------|-------------------|-----|
| | Before [action] | [Role] | [Criteria] | [Time] |

## Alert Thresholds
| Monitor | Metric | Warning | Critical | Channel |
|---------|--------|---------|----------|---------|
| Rank tracker | Position drop | > 5 positions | > 10 positions | Slack/Email |

## Kill-Switch Registry
| Automation | Kill-Switch Method | Rollback Procedure |
|-----------|-------------------|-------------------|
| | [Disable in tool/remove cron/toggle flag] | [Revert via X] |
```

## QA Rubric (scored)

- Gate placement (0-5): every content-modifying automation has a human review gate.
- Threshold definition (0-5): alert thresholds are specific and calibrated to actual risk.
- Kill-switch coverage (0-5): every automation has a documented stop and rollback procedure.
- Tool feasibility (0-5): required integrations are realistic with the current tool stack.

## Examples (good/bad)

- Good: "Workflow: Automated redirect chain detection. Trigger: weekly crawl. Steps: 1) Crawl all URLs, 2) Flag redirect chains > 2 hops, 3) Generate fix list, 4) Human review, 5) Implement approved fixes. Kill-switch: disable weekly cron job."
- Bad: "Automate everything." (no specific workflows, no gates, no risk assessment)

## Variants

- Monitoring-first variant: automate tracking and alerting only (zero risk, immediate value).
- Full automation variant: monitoring + alerting + gated content actions with human review at every modification point.
