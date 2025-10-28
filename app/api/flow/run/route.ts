import { NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";
import { renderTemplate } from "../../../../lib/template";
import { env } from "../../../../lib/env";
import type { FlowRunResponse, FlowRunStepResult, FlowStep } from "../../../../types/flow";

const StepSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  systemPrompt: z.string().default(""),
  userPrompt: z.string().min(1),
  model: z.string().default("gpt-4o-mini"),
  temperature: z.number().min(0).max(2).default(0.3),
  outputKey: z.string().min(1)
});

const RequestSchema = z.object({
  steps: z.array(StepSchema).min(1),
  inputVariables: z.record(z.string()).default({}),
  mock: z.boolean().optional(),
  apiKey: z.string().trim().min(1).optional(),
  baseUrl: z.string().trim().min(1).optional()
});

const buildMockOutput = (step: FlowStep, context: Record<string, string>): string => {
  const preview = Object.entries(context)
    .slice(0, 3)
    .map(([key, value]) => `${key}: ${value}`)
    .join(" | ");
  return `🔧 Mocked response for "${step.title}"\nContext → ${preview || "(empty)"}`;
};

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = RequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid request",
          issues: parsed.error.flatten()
        },
        { status: 400 }
      );
    }

    const { steps, inputVariables, mock: mockFlag, apiKey, baseUrl } = parsed.data;
    const context: Record<string, string> = { ...inputVariables };

    const effectiveApiKey = apiKey ?? (env.defaultOpenaiApiKey || undefined);
    const effectiveBaseUrl = baseUrl ?? (env.openaiBaseUrl || undefined);

    const openaiClient = effectiveApiKey
      ? new OpenAI({
          apiKey: effectiveApiKey,
          baseURL: effectiveBaseUrl
        })
      : null;

    const useMock = Boolean((mockFlag ?? env.mockEnabled) || !openaiClient);

    const results: FlowRunStepResult[] = [];

    for (const step of steps) {
      const renderedSystem = renderTemplate(step.systemPrompt ?? "", context, {
        onMissingVariable: () => ""
      }).trim();
      const renderedUser = renderTemplate(step.userPrompt, context, {
        onMissingVariable: () => ""
      });

      if (!renderedUser) {
        throw new Error(`Step "${step.title}" resolved to an empty user prompt.`);
      }

      if (useMock || !openaiClient) {
        const mockOutput = buildMockOutput(step, context);
        context[step.outputKey] = mockOutput;
        results.push({
          id: step.id,
          title: step.title,
          outputKey: step.outputKey,
          output: mockOutput,
          model: step.model,
          temperature: step.temperature
        });
        continue;
      }

      const completion = await openaiClient.chat.completions.create({
        model: step.model,
        temperature: step.temperature,
        messages: [
          ...(renderedSystem ? [{ role: "system" as const, content: renderedSystem }] : []),
          { role: "user" as const, content: renderedUser }
        ]
      });

      const message = completion.choices[0]?.message?.content ?? "";
      context[step.outputKey] = message;

      results.push({
        id: step.id,
        title: step.title,
        outputKey: step.outputKey,
        output: message,
        model: step.model,
        temperature: step.temperature,
        tokens: completion.usage
          ? {
              input: completion.usage.prompt_tokens ?? 0,
              output: completion.usage.completion_tokens ?? 0,
              total: completion.usage.total_tokens ?? 0
            }
          : undefined
      });
    }

    const responsePayload: FlowRunResponse = {
      steps: results,
      context,
      mock: useMock
    };

    return NextResponse.json(responsePayload);
  } catch (error) {
    console.error("Flow execution error", error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Unexpected server error"
      },
      { status: 500 }
    );
  }
}
