---
topic: paperclip-practices
last-verified: 2026-04-03
sources:
  - "Greg+dotta 46m podcast (2037262467684864075)"
  - "Cathryn Lavery 12m demo (2036155705355362618)"
  - "startupideaspod clips (2037576893772529693, 2037275797543936307)"
agents: all
---

# Paperclip Best Practices

## Architecture Patterns

- **Memento Pattern**: "Your AI agents are Memento. They wake up capable but don't know who they are. Write tattoos on their arm." → Use heartbeat checklists + pre-loaded context.
- **Board > CEO > ICs**: You are the board. CEO sets direction. ICs execute. Never micromanage at design-PM level.
- **Frontier model for CEO, cheaper for ICs**: "Use a frontier model for your CEO, but for other tasks you can get away with a cheaper model."
- **Less is more**: Cathryn "fired half her agents" — fewer well-structured agents > many poorly-structured ones.
- **Shareable companies**: `npx companies.sh add <repo>` imports entire agent orgs with skills.
- **Maximizer mode** (coming): "Don't care about token spend, just make sure someone is working all the time until it's done."

## Operational Patterns

- **Chief of Staff**: Morning + evening health checks. Monitors blockers. Logs to autonomy-log.md.
- **Evals Engineer**: Performance reviews on agents. Look at past issues + feedback → agents learn.
- **QA after every deliverable**: "After the engineer creates something, he asks QA to QA it."
- **Routines**: Scheduled tasks with full tracing — what happened, how many tokens, what was accomplished.
- **Skills = taste transfer**: "AI can do everything except know your values."
- **Compound engineering**: Agent does something wrong → add rule to persona → never happens again.

## Heartbeat Best Practices

- Memory maintenance (PARA system from Nat Elias / Felix bot)
- Auto-update todo list during the day
- Cron health check (retrigger failed jobs)
- Keep heartbeat instructions small — runs constantly, burns tokens if too large

## Skill Security

- "Wild West" — malicious instructions in community skills
- Always check security scan badges on skills.sh
- "Whenever you do something repeatedly, tell your agent to turn it into a skill"
