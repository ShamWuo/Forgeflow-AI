import { FlowStep } from "../types/flow";

export const defaultInputVariables: Record<string, string> = {
  product: "FlowForge AI",
  audience: "senior product managers",
  tone: "confident"
};

export const defaultSteps: FlowStep[] = [
  {
    id: "research",
    title: "Research Summary",
    systemPrompt:
      "You are a research assistant generating fast, factual summaries for product teams.",
    userPrompt:
      "Summarize the latest release notes for {{product}}. Highlight what matters to {{audience}}.",
    model: "gpt-4o-mini",
    temperature: 0.2,
    outputKey: "research_summary"
  },
  {
    id: "positioning",
    title: "Positioning Draft",
    systemPrompt:
      "You are a marketing strategist crafting crisp positioning statements.",
    userPrompt:
      "Using this research: {{research_summary}}\n\nDraft a high-level positioning statement for {{product}} aimed at {{audience}}. Tone: {{tone}}.",
    model: "gpt-4o-mini",
    temperature: 0.5,
    outputKey: "positioning"
  },
  {
    id: "call_to_action",
    title: "Call to Action",
    systemPrompt:
      "You are a conversion copywriter who writes persuasive but authentic CTAs.",
    userPrompt:
      "Using the positioning: {{positioning}}\n\nWrite two compelling call-to-action options.",
    model: "gpt-4o-mini",
    temperature: 0.7,
    outputKey: "cta"
  }
];
