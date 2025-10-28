import { FlowBuilder } from "../components/flow-builder";
import { defaultInputVariables, defaultSteps } from "../lib/default-flow";
import { env } from "../lib/env";

const HomePage = () => {
  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-white/10 bg-white/5 p-6 shadow-sm shadow-black/20">
        <h2 className="text-2xl font-semibold text-white">Workflow Studio</h2>
        <p className="mt-2 text-sm text-slate-300">
          Assemble reusable AI flows with sequential prompts, shared variables, and step-by-step execution.
        </p>
      </section>

      <FlowBuilder
        initialSteps={defaultSteps}
        initialVariables={defaultInputVariables}
        defaultMockEnabled={env.mockEnabled}
        defaultBaseUrl={env.openaiBaseUrl}
        hasDefaultApiKey={Boolean(env.defaultOpenaiApiKey)}
      />
    </div>
  );
};

export default HomePage;
