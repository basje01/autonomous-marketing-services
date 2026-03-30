import { config } from "./config.js";
import { createCompanyResponseSchema, createAgentResponseSchema, createIssueResponseSchema } from "./schemas.js";
import { ExternalServiceError } from "./errors.js";

const API = config.paperclipApiUrl;

/**
 * Create a new Paperclip company for a marketing campaign.
 */
export async function createCompany(projectName: string, mission: string) {
  const res = await fetch(`${API}/api/companies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: AbortSignal.timeout(30_000),
    body: JSON.stringify({ name: `${projectName} Marketing`, mission }),
  });
  if (!res.ok) throw new ExternalServiceError("paperclip", `Failed to create company: ${res.statusText}`);
  return createCompanyResponseSchema.parse(await res.json());
}

/**
 * Agent role definitions — the 7 Olympians.
 * CEO uses Opus (Boris: "frontier is cheaper in the end").
 * ICs use Sonnet for cost efficiency.
 */
export const AGENT_ROLES = [
  {
    name: "Minerva",
    title: "Chief Marketing Strategist",
    role: "CEO",
    monthlyBudget: 50,
    model: "claude-opus-4-6",
    maxTurns: 25,
    timeoutSec: 900,
    instructionsFile: "marketing-strategist",
  },
  {
    name: "Argus",
    title: "Chief of Staff",
    role: "IC",
    monthlyBudget: 20,
    model: "claude-sonnet-4-6",
    maxTurns: 20,
    timeoutSec: 600,
    instructionsFile: "chief-of-staff",
  },
  {
    name: "Hermes",
    title: "SEO Specialist",
    role: "IC",
    monthlyBudget: 30,
    model: "claude-sonnet-4-6",
    maxTurns: 25,
    timeoutSec: 900,
    instructionsFile: "seo-agent",
  },
  {
    name: "Calliope",
    title: "Content Creator",
    role: "IC",
    monthlyBudget: 30,
    model: "claude-sonnet-4-6",
    maxTurns: 25,
    timeoutSec: 900,
    instructionsFile: "content-agent",
  },
  {
    name: "Mercury",
    title: "Social Campaign Manager",
    role: "IC",
    monthlyBudget: 30,
    model: "claude-sonnet-4-6",
    maxTurns: 20,
    timeoutSec: 600,
    instructionsFile: "social-agent",
  },
  {
    name: "Vesta",
    title: "Community Manager",
    role: "IC",
    monthlyBudget: 20,
    model: "claude-sonnet-4-6",
    maxTurns: 20,
    timeoutSec: 600,
    instructionsFile: "community-agent",
  },
  {
    name: "Themis",
    title: "Evals Engineer",
    role: "IC",
    monthlyBudget: 15,
    model: "claude-sonnet-4-6",
    maxTurns: 15,
    timeoutSec: 600,
    instructionsFile: "evals-engineer",
  },
] as const;

const agentsDir = new URL("../../agents", import.meta.url).pathname;
const skillsDir = new URL("../../skills", import.meta.url).pathname;

/**
 * Hire all 7 marketing agents into a Paperclip company.
 * Throws if Minerva (CEO) fails to hire.
 */
export async function hireAgents(companyId: string) {
  const agents: Array<{ id: string; name: string }> = [];

  for (const role of AGENT_ROLES) {
    const res = await fetch(`${API}/api/companies/${companyId}/agents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(30_000),
      body: JSON.stringify({
        name: role.name,
        title: role.title,
        monthlyBudget: role.monthlyBudget,
        adapterType: "claude_local",
        adapterConfig: {
          command: "claude",
          cwd: agentsDir,
          instructionsFilePath: `${agentsDir}/${role.instructionsFile}/AGENTS.md`,
          model: role.model,
          maxTurnsPerRun: role.maxTurns,
          timeoutSec: role.timeoutSec,
          args: ["--add-dir", skillsDir, "--permission-mode", "acceptEdits"],
        },
      }),
    });

    if (!res.ok) {
      const msg = `Failed to hire ${role.name}: ${res.statusText}`;
      if (role.role === "CEO") {
        throw new ExternalServiceError("paperclip", msg);
      }
      console.error(`[paperclip] ${msg} — continuing with remaining agents`);
      continue;
    }

    const agent = createAgentResponseSchema.parse(await res.json());
    agents.push(agent);
    console.log(`[paperclip] Hired ${role.name} (${agent.id})`);
  }

  return agents;
}

/**
 * Create the initial marketing brief task and assign to Minerva.
 */
export async function createInitialTask(
  companyId: string,
  strategistAgentId: string,
  projectBrief: { name: string; description: string; targetAudience: string; website?: string },
) {
  const description = `
## Marketing Campaign Brief

**Project**: ${projectBrief.name}
**Description**: ${projectBrief.description}
**Target Audience**: ${projectBrief.targetAudience}
${projectBrief.website ? `**Website**: ${projectBrief.website}` : ""}

## Your Mission

Follow your BRAID GRD (GRD 1: Marketing Strategist). Plan first, then execute.

1. Research this project's competitive landscape using the Colosseum Copilot skill
2. Develop a comprehensive marketing strategy including:
   - Ideal Customer Profile (ICP) and Jobs-to-be-Done (JTBD)
   - Messaging hierarchy
   - Channel plan (SEO, content, social, community)
3. Create subtasks for each downstream agent:
   - Hermes (SEO): Technical SEO audit + keyword research
   - Calliope (Content): Homepage copy + Twitter/X threads
   - Mercury (Social): 4-week content calendar
   - Vesta (Community): FAQ + onboarding playbook
4. Assign Argus (Chief of Staff) to monitor campaign health
5. Assign Themis (Evals Engineer) to review campaign quality post-completion

Include Copilot research citations (project slugs, archive references) in your strategy.
  `.trim();

  const res = await fetch(`${API}/api/companies/${companyId}/issues`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: AbortSignal.timeout(30_000),
    body: JSON.stringify({
      title: `Marketing Strategy for ${projectBrief.name}`,
      description,
      assigneeAgentId: strategistAgentId,
      priority: "high",
    }),
  });

  if (!res.ok) throw new ExternalServiceError("paperclip", `Failed to create task: ${res.statusText}`);
  return createIssueResponseSchema.parse(await res.json());
}
