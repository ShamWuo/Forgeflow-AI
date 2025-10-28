"use client";

import { useId } from "react";
import type { ChangeEvent } from "react";
import type { FlowStep } from "../types/flow";
import Input from "./ui/input";
import Textarea from "./ui/textarea";
import { Button } from "./ui/button";

const MODEL_OPTIONS = [
  { value: "gpt-4o-mini", label: "OpenAI GPT-4o Mini" },
  { value: "gpt-4o", label: "OpenAI GPT-4o" },
  { value: "gpt-4.1-mini", label: "OpenAI GPT-4.1 Mini" },
  { value: "gpt-3.5-turbo", label: "OpenAI GPT-3.5 Turbo" },
  { value: "claude-3-sonnet", label: "Claude 3 Sonnet (via proxy)" }
];

type StepEditorProps = {
  step: FlowStep;
  index: number;
  totalSteps: number;
  onChange: (step: FlowStep) => void;
  onRemove: (id: string) => void;
  onMove: (id: string, direction: "up" | "down") => void;
};

const StepEditor = ({ step, index, totalSteps, onChange, onRemove, onMove }: StepEditorProps) => {
  const id = useId();

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    onChange({ ...step, [name]: name === "temperature" ? Number(value) : value });
  };

  return (
    <section className="rounded-lg border border-white/10 bg-white/5 p-4 shadow-sm shadow-black/20">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>Flow Step</span>
          </div>
          <Input
            name="title"
            aria-label="Step title"
            value={step.title}
            onChange={handleInputChange}
            className="mt-2 text-base font-semibold tracking-tight text-white"
          />
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onMove(step.id, "up")}
            disabled={index === 0}
          >
            ↑
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => onMove(step.id, "down")}
            disabled={index === totalSteps - 1}
          >
            ↓
          </Button>
          <Button type="button" variant="ghost" onClick={() => onRemove(step.id)}>
            Delete
          </Button>
        </div>
      </header>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-slate-300" htmlFor={`${id}-system`}>
          System prompt
          <Textarea
            id={`${id}-system`}
            name="systemPrompt"
            value={step.systemPrompt}
            onChange={handleInputChange}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-300" htmlFor={`${id}-user`}>
          User prompt
          <Textarea
            id={`${id}-user`}
            name="userPrompt"
            value={step.userPrompt}
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <label className="flex flex-col gap-2 text-sm text-slate-300">
          Model
          <select
            name="model"
            value={step.model}
            onChange={handleInputChange}
            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-brand-400 focus:outline-none"
          >
            {MODEL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} className="bg-slate-900 text-white">
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-300">
          Temperature
          <Input
            type="number"
            step="0.1"
            min="0"
            max="1.5"
            name="temperature"
            value={step.temperature}
            onChange={handleInputChange}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-300">
          Output key
          <Input name="outputKey" value={step.outputKey} onChange={handleInputChange} />
          <p className="text-xs text-slate-500">
            Reference with {" "}
            <code className="rounded bg-slate-900 px-1 py-0.5 font-mono text-xs text-slate-200">
              {`{{${step.outputKey}}}`}
            </code>
          </p>
        </label>
      </div>
    </section>
  );
};

export { StepEditor };
