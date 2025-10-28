export type FlowStep = {
  id: string;
  title: string;
  systemPrompt: string;
  userPrompt: string;
  model: string;
  temperature: number;
  outputKey: string;
};

export type FlowRunStepResult = {
  id: string;
  title: string;
  outputKey: string;
  output: string;
  model: string;
  temperature: number;
  tokens?: {
    input: number;
    output: number;
    total: number;
  };
};

export type FlowRunResponse = {
  steps: FlowRunStepResult[];
  context: Record<string, string>;
  mock: boolean;
};

export type FlowExecutionRequest = {
  steps: FlowStep[];
  inputVariables: Record<string, string>;
  mock?: boolean;
  apiKey?: string;
  baseUrl?: string;
};
