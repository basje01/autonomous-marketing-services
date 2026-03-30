import { config } from "./config.js";

const API = config.paperclipApiUrl;

interface CreateCompanyResponse {
  id: string;
  name: string;
}

interface CreateAgentResponse {
  id: string;
  name: string;
}

interface CreateIssueResponse {
  id: string;
  identifier: string;
}

/**
 * Create a new Paperclip company for a marketing campaign.
 */
export async function createCompany(
  projectName: string,
  mission: string
): Promise<CreateCompanyResponse> {
  const res = await fetch(`${API}/api/companies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: AbortSignal.timeout(30_000),
    body: JSON.stringify({
      name: `${projectName} Marketing`,
      mission,
    }),
  });
  if (!res.ok) throw new Error(`Failed to create company: ${res.statusText}`);
  return res.json() as Promise<CreateCompanyResponse>;
}

/**
 * Agent role definitions mapping to LemuriaOS SKILL.md specialists.
 * 6 roles: CEO + Chief of Staff + 4 specialist ICs.
 * CEO uses frontier model (Opus) — cheaper in the end due to fewer tokens (Boris tip).
 * ICs use Sonnet for cost efficiency.
 */
export const AGENT_ROLES = [
  {
    name: "Marketing Strategist",
    title: "Chief Marketing Strategist",
    role: "CEO",
    monthlyBudget: 50,
    model: "claude-opus-4-6",
    maxTurns: 25,
    timeoutSec: 900,
    instructionsFile: "marketing-strategist",
  },
  {
    name: "Chief of Staff",
    title: "Chief of Staff",
    role: "IC",
    monthlyBudget: 20,
    model: "claude-sonnet-4-6",
    maxTurns: 20,
    timeoutSec: 600,
    instructionsFile: "chief-of-staff",
  },
  {
    name: "SEO Agent",
    title: "SEO Specialist",
    role: "IC",
    monthlyBudget: 30,
    model: "claude-sonnet-4-6",
    maxTurns: 25,
    timeoutSec: 900,
    instructionsFile: "seo-agent",
  },
  {
    name: "Content Agent",
    title: "Content Creator",
    role: "IC",
    monthlyBudget: 30,
    model: "claude-sonnet-4-6",
    maxTurns: 25,
    timeoutSec: 900,
    instructionsFile: "content-agent",
  },
  {
    name: "Social Agent",
    title: "Social Campaign Manager",
    role: "IC",
    monthlyBudget: 30,
    model: "claude-sonnet-4-6",
    maxTurns: 20,
    timeoutSec: 600,
    instructionsFile: "social-agent",
  },
  {
    name: "Community Agent",
    title: "Community Manager",
    role: "IC",
    monthlyBudget: 20,
    model: "claude-sonnet-4-6",
    maxTurns: 20,
    timeoutSec: 600,
    instructionsFile: "community-agent",
  },
] as const;

const agentsDir = new URL("../../agents", import.meta.url).pathname;
const skillsDir = new URL("../../skills", import.meta.url).pathname;

/**
 * Hire all 6 marketing agents into a Paperclip company.
 * Throws if the Strategist fails to hire (critical agent).
 */
export async function hireAgents(
  companyId: string
): Promise<CreateAgentResponse[]> {
  const agents: CreateAgentResponse[] = [];

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
          args: ["--add-dir", skillsDir, "--dangerously-skip-permissions"],
        },
      }),
    });

    if (!res.ok) {
      const msg = `Failed to hire ${role.name}: ${res.statusText}`;
      if (role.role === "CEO") {
        throw new Error(msg);
      }
      console.error(`[paperclip] ${msg} — continuing with remaining agents`);
      continue;
    }

    const agent = (await res.json()) as CreateAgentResponse;
    agents.push(agent);
    console.log(`[paperclip] Hired ${role.name} (${agent.id})`);
  }

  return agents;
}

/**
 * Create the initial marketing brief task and assign to the Strategist.
 */
export async function createInitialTask(
  companyId: string,
  strategistAgentId: string,
  projectBrief: {
    name: string;
    description: string;
    targetAudience: string;
    website?: string;
  }
): Promise<CreateIssueResponse> {
  const description = `
## Marketing Campaign Brief

**Project**: ${projectBrief.name}
**Description**: ${projectBrief.description}
**Target Audience**: ${projectBrief.targetAudience}
${projectBrief.website ? `**Website**: ${projectBrief.website}` : ""}

## Your Mission

1. Research this project's competitive landscape using the Colosseum Copilot skill
2. Develop a comprehensive marketing strategy including:
   - Ideal Customer Profile (ICP) and Jobs-to-be-Done (JTBD)
   - Messaging hierarchy
   - Channel plan (SEO, content, social, community)
3. Create subtasks for each downstream agent:
   - SEO Agent: Technical SEO audit + keyword research
   - Content Agent: Homepage copy + Twitter/X threads
   - Social Agent: 4-week content calendar
   - Community Agent: FAQ + onboarding playbook

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

  if (!res.ok) throw new Error(`Failed to create task: ${res.statusText}`);
  return res.json() as Promise<CreateIssueResponse>;
}
