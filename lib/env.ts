const mockEnabled = process.env.NEXT_PUBLIC_ENABLE_MOCKS === "true";
const defaultOpenaiApiKey = process.env.OPENAI_API_KEY ?? "";
const openaiBaseUrl = process.env.OPENAI_BASE_URL ?? "";

export const env = {
  defaultOpenaiApiKey,
  openaiBaseUrl,
  mockEnabled
};
