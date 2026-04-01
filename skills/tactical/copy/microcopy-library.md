---
id: microcopy-library
title: Microcopy Library
category: copy
goal: Define the complete set of interface microcopy - button labels, form helpers, error messages, empty states, tooltips, and confirmation dialogs - that maintains brand voice at every interaction point.
best_for: Web applications and marketing sites where inconsistent microcopy creates a fragmented user experience.
inputs:
  - Brand voice descriptors from discovery brief
  - UI component inventory (forms, modals, toasts, empty states)
  - Common user error scenarios
constraints:
  - Button labels must use action verbs (never "Submit" or "Click here")
  - Error messages must explain what went wrong AND how to fix it
  - All microcopy must be under 15 words per instance
  - Tone must match brand voice even in error states
outputs:
  - Categorized microcopy library document
  - Pattern rules for generating new microcopy
  - Tone guidelines for different states (success, error, neutral)
quality_checks:
  - No generic "Submit" or "Click here" labels
  - Error messages include recovery instructions
  - Empty states include a next-action prompt
  - Microcopy is consistent across similar interactions
tags:
  - copywriting
  - conversion
version: 1.0.0
impact: 3
---

## Context

Microcopy is the 1% of words that handles 90% of user interactions. A "Submit" button, an unhelpful error message, or a blank empty state all erode trust and increase drop-off. This skill creates a reusable library that keeps every interaction point on-brand and on-task.

## Procedure

1. Audit the UI for every text touchpoint: buttons, links, form labels, placeholders, helper text, validation messages, toast notifications, empty states, loading states, confirmation dialogs, tooltips.
2. Define tone rules per interaction state: success (celebratory but brief), error (calm, specific, actionable), neutral (clear and direct), destructive (explicit about consequences).
3. Write button labels using the pattern: [Action verb] + [Object]. "Create account" not "Submit." "Save changes" not "OK." "Delete project" not "Remove."
4. Write form microcopy: label (what it is), placeholder (example format), helper text (why it matters or format requirements), error (what's wrong + how to fix).
5. Write empty states: each needs an illustration suggestion, a headline explaining the state, a description with context, and a CTA to resolve it.
6. Write confirmation dialogs for destructive actions: state the consequence, offer an undo path, use explicit button labels ("Delete 3 files" not "OK").

## Output Format

```md
# Microcopy Library

## Tone Rules
| State | Tone | Example |
|-------|------|---------|
| Success | Brief, positive | "Changes saved" |
| Error | Calm, specific | "Email format invalid - use name@example.com" |
| Neutral | Clear, direct | "Enter your work email" |
| Destructive | Explicit | "This will permanently delete 3 files" |

## Buttons
| Context | Label | Anti-pattern |
|---------|-------|-------------|
| Sign up | Create account | Submit |
| Log in | Sign in | Login / Go |
| Save | Save changes | OK |
| Delete | Delete [object] | Remove |
| Cancel | Cancel | Back / Never mind |
| Primary CTA | [Verb] + [outcome] | Learn more / Click here |

## Forms
### [Form Name]
| Field | Label | Placeholder | Helper | Error |
|-------|-------|-------------|--------|-------|
| Email | Work email | jane@company.com | We'll send your report here | Enter a valid email address |
| URL | Website URL | https://example.com | Include https:// | Enter a valid URL starting with https:// |
| Password | Password | - | Min 8 characters, one number | Password must be at least 8 characters |

## Empty States
### [Feature] - No Data
- **Headline**: "No [items] yet"
- **Description**: "[Explain what will appear here and why]"
- **CTA**: "[Create first item]"

### [Feature] - No Results
- **Headline**: "No results for '[query]'"
- **Description**: "Try a different search term or remove filters"
- **CTA**: "Clear filters"

## Toast Notifications
| Type | Template | Duration |
|------|----------|----------|
| Success | "[Object] [past-tense verb]" | 3s auto-dismiss |
| Error | "Couldn't [action]. [Reason]. [Fix]." | Manual dismiss |
| Info | "[Neutral update]" | 5s auto-dismiss |

## Confirmation Dialogs
### Delete [Object]
- **Title**: "Delete [object name]?"
- **Body**: "This will permanently remove [object] and all associated [related items]. This action cannot be undone."
- **Primary**: "Delete [object]" (destructive style)
- **Secondary**: "Keep [object]"

## Loading States
| Context | Text | Duration |
|---------|------|----------|
| Page load | - (skeleton only) | < 1s |
| Form submit | "Saving..." | < 3s |
| Long process | "Analyzing your site..." | > 3s, show progress |
```

## QA Rubric (scored)

- Action clarity (0-5): every button label tells the user exactly what will happen.
- Error helpfulness (0-5): error messages explain the problem AND the fix.
- Voice consistency (0-5): tone matches brand personality across all states.
- Coverage (0-5): no UI interaction point left without defined microcopy.

## Examples (good/bad)

- Good: Error: "This email is already registered. Sign in instead?" - identifies the problem, offers the solution, maintains friendly tone.
- Bad: Error: "Error 422: Validation failed." - technical, unhelpful, no recovery path.

## Variants

- Personality-heavy mode: microcopy uses humor and character (suits consumer apps with playful brands).
- Enterprise mode: formal, precise, zero personality - suits regulated industries and B2B tools where clarity beats charm.
