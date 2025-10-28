"use client";

import { useCallback, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { StepEditor } from "./step-editor";
import { Button } from "./ui/button";
import Input from "./ui/input";
import Textarea from "./ui/textarea";
import { Switch } from "./ui/switch";
import type { FlowExecutionRequest, FlowRunResponse, FlowStep } from "../types/flow";
import { generateId } from "../lib/id";

const createEmptyStep = (index: number): FlowStep => ({
  id: `step-${generateId()}`,
  title: `Untitled Step ${index + 1}`,
  systemPrompt: "You are an AI assistant.",
  userPrompt: "Respond to the input.",
  model: "gpt-4o-mini",
  temperature: 0.3,
  outputKey: `step_${index + 1}`
});

type VariableRow = {
  id: string;
  key: string;
  value: string;
};

type FlowBuilderProps = {
  initialSteps: FlowStep[];
  initialVariables: Record<string, string>;
  defaultMockEnabled?: boolean;
  defaultBaseUrl?: string;
  hasDefaultApiKey?: boolean;
};

const FlowBuilder = ({
  initialSteps,
  initialVariables,
  defaultMockEnabled = false,
  defaultBaseUrl = "",
  hasDefaultApiKey = false
}: FlowBuilderProps) => {
  const [steps, setSteps] = useState<FlowStep[]>(() => initialSteps.map((step) => ({ ...step })));
  const [variables, setVariables] = useState<VariableRow[]>(() =>
    Object.entries(initialVariables).map(([key, value]) => ({
      id: generateId(),
      key,
      value
    }))
  );
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FlowRunResponse | null>(null);
  const [mockEnabled, setMockEnabled] = useState(defaultMockEnabled);
  const [apiKey, setApiKey] = useState("");
  const [baseUrl, setBaseUrl] = useState(defaultBaseUrl);

  const handleVariableChange = useCallback(
    (id: string, field: "key" | "value", value: string) => {
      setVariables((prev: VariableRow[]) =>
        prev.map((row: VariableRow) => (row.id === id ? { ...row, [field]: value } : row))
      );
    },
    []
  );

  const addVariable = useCallback(() => {
    setVariables((prev: VariableRow[]) => [
      ...prev,
      {
        id: generateId(),
        key: "",
        value: ""
      }
    ]);
  }, []);

  const deleteVariable = useCallback((id: string) => {
    setVariables((prev: VariableRow[]) => prev.filter((row) => row.id !== id));
  }, []);

  const updateStep = useCallback((updated: FlowStep) => {
    setSteps((prev: FlowStep[]) => prev.map((step: FlowStep) => (step.id === updated.id ? updated : step)));
  }, []);

  const removeStep = useCallback((id: string) => {
    setSteps((prev: FlowStep[]) => prev.filter((step: FlowStep) => step.id !== id));
  }, []);

  const moveStep = useCallback((id: string, direction: "up" | "down") => {
    setSteps((prev: FlowStep[]) => {
      const index = prev.findIndex((step: FlowStep) => step.id === id);
      if (index === -1) {
        return prev;
      }
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) {
        return prev;
      }

      const next: FlowStep[] = [...prev];
      const [removed] = next.splice(index, 1);
      next.splice(newIndex, 0, removed);
      return next;
    });
  }, []);

  const addStep = useCallback(() => {
    setSteps((prev: FlowStep[]) => [...prev, createEmptyStep(prev.length)]);
  }, []);

  const variableObject = useMemo(() => {
    const entries = variables
      .filter((row: VariableRow) => row.key.trim().length > 0)
      .map((row: VariableRow) => [row.key.trim(), row.value] as const);
    return Object.fromEntries(entries);
  }, [variables]);

  const runFlow = useCallback(async () => {
    setIsRunning(true);
    setError(null);

    const payload: FlowExecutionRequest = {
      steps,
      inputVariables: variableObject,
      mock: mockEnabled
    };

    const trimmedKey = apiKey.trim();
    if (trimmedKey.length > 0) {
      payload.apiKey = trimmedKey;
    }

    const trimmedBaseUrl = baseUrl.trim();
    if (trimmedBaseUrl.length > 0) {
      payload.baseUrl = trimmedBaseUrl;
    }

    try {
      const response = await fetch("/api/flow/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.message ?? "Flow execution failed");
      }

      const data = (await response.json()) as FlowRunResponse;
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsRunning(false);
    }
  }, [apiKey, baseUrl, mockEnabled, steps, variableObject]);

  const importFlow = useCallback(
    (event: FormEvent<HTMLTextAreaElement>) => {
      try {
        const value = (event.target as HTMLTextAreaElement).value;
        const parsed = JSON.parse(value) as FlowExecutionRequest;
        if (!Array.isArray(parsed.steps)) {
          throw new Error("Invalid flow export");
        }
        setSteps(parsed.steps);
        setVariables(
          Object.entries(parsed.inputVariables ?? {}).map(([key, val]) => ({
            id: generateId(),
            key,
            value: val
          }))
        );
        setMockEnabled(Boolean(parsed.mock));
        if (typeof parsed.baseUrl === "string") {
          setBaseUrl(parsed.baseUrl);
        }
        if (typeof parsed.apiKey === "string") {
          setApiKey(parsed.apiKey);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to import flow");
      }
    },
    []
  );

  const exportPayload = useMemo<FlowExecutionRequest>(() => {
    const payload: FlowExecutionRequest = {
      steps,
      inputVariables: variableObject,
      mock: mockEnabled
    };

    const trimmedBaseUrl = baseUrl.trim();
    if (trimmedBaseUrl.length > 0) {
      payload.baseUrl = trimmedBaseUrl;
    }

    return payload;
  }, [baseUrl, mockEnabled, steps, variableObject]);

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-6">
        <section className="rounded-lg border border-white/10 bg-white/5 p-6 shadow-sm shadow-black/20">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">Provider settings</h2>
              <p className="text-sm text-slate-400">
                Bring your own API key to run flows against OpenAI-compatible endpoints.
              </p>
            </div>
          </header>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-slate-300">
              API key
              <Input
                type="password"
                value={apiKey}
                onChange={(event) => setApiKey(event.target.value)}
                placeholder="sk-..."
                autoComplete="off"
              />
              <span className="text-xs text-slate-500">
                Stored only in memory and sent with your request. {hasDefaultApiKey ? "Leave blank to use the server default." : "Required to call remote providers."}
              </span>
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-300">
              Base URL (optional)
              <Input
                value={baseUrl}
                onChange={(event) => setBaseUrl(event.target.value)}
                placeholder="https://api.openai.com/v1"
              />
              <span className="text-xs text-slate-500">
                Point at Azure, proxy, or local providers supporting the OpenAI API spec.
              </span>
            </label>
          </div>
        </section>

        <section className="rounded-lg border border-white/10 bg-white/5 p-6 shadow-sm shadow-black/20">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">Input variables</h2>
              <p className="text-sm text-slate-400">
                Variables are shared across steps and injected with <code>{"{{variable}}"}</code> syntax.
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <span>Mock mode</span>
              <Switch checked={mockEnabled} onCheckedChange={setMockEnabled} label="Toggle mock mode" />
            </div>
          </header>

          <div className="mt-6 space-y-4">
            {variables.map((row: VariableRow) => (
              <div key={row.id} className="grid gap-3 md:grid-cols-[1fr_2fr_auto]">
                <Input
                  placeholder="Key"
                  value={row.key}
                  onChange={(event) => handleVariableChange(row.id, "key", event.target.value)}
                />
                <Input
                  placeholder="Value"
                  value={row.value}
                  onChange={(event) => handleVariableChange(row.id, "value", event.target.value)}
                />
                <Button variant="ghost" type="button" onClick={() => deleteVariable(row.id)}>
                  Remove
                </Button>
              </div>
            ))}

            <Button type="button" variant="secondary" onClick={addVariable}>
              Add variable
            </Button>
          </div>
        </section>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <StepEditor
              key={step.id}
              step={step}
              index={index}
              totalSteps={steps.length}
              onChange={updateStep}
              onRemove={removeStep}
              onMove={moveStep}
            />
          ))}

          <Button type="button" variant="secondary" onClick={addStep}>
            Add step
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Button type="button" onClick={runFlow} loading={isRunning}>
            Run flow
          </Button>
          <Textarea
            className="h-32 w-full max-w-xl font-mono text-xs text-slate-200"
            placeholder="Paste flow JSON here to import"
            onBlur={importFlow}
          />
          <Textarea
            className="h-32 w-full max-w-xl font-mono text-xs text-slate-200"
            value={JSON.stringify(exportPayload, null, 2)}
            readOnly
          />
        </div>

        {error && (
          <div className="rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}
      </div>

      <aside className="space-y-4">
        <section className="rounded-lg border border-white/10 bg-white/5 p-6 shadow-sm shadow-black/20">
          <h2 className="text-lg font-semibold text-white">Run output</h2>
          <p className="text-sm text-slate-400">Inspect every step response and intermediate variable.</p>

          {result ? (
            <div className="mt-4 space-y-6">
              {result.steps.map((step) => (
                <article key={step.id} className="rounded-md border border-white/10 bg-slate-900/60 p-4">
                  <header className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-white">{step.title}</h3>
                      <p className="text-xs text-slate-400">
                        {step.model} · temp {step.temperature.toFixed(2)} · context key `{step.outputKey}`
                      </p>
                    </div>
                    {step.tokens && (
                      <span className="rounded bg-white/10 px-2 py-1 text-xs text-slate-200">
                        {step.tokens.total} tokens
                      </span>
                    )}
                  </header>
                  <pre className="mt-3 whitespace-pre-wrap break-words rounded bg-slate-950/80 p-3 text-sm text-slate-200">
                    {step.output}
                  </pre>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-md border border-dashed border-white/10 bg-slate-900/40 p-6 text-sm text-slate-400">
              Run the flow to see step-by-step outputs.
            </div>
          )}
        </section>

        {result && (
          <section className="rounded-lg border border-white/10 bg-white/5 p-6 shadow-sm shadow-black/20">
            <h2 className="text-lg font-semibold text-white">Context snapshot</h2>
            <pre className="mt-4 max-h-60 overflow-y-auto whitespace-pre-wrap break-words rounded bg-slate-950/80 p-3 text-xs text-slate-200">
              {JSON.stringify(result.context, null, 2)}
            </pre>
          </section>
        )}
      </aside>
    </div>
  );
};

export { FlowBuilder };
