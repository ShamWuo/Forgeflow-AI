import { describe, expect, it } from "vitest";
import { renderTemplate } from "../lib/template";

describe("renderTemplate", () => {
  it("replaces variables with context values", () => {
    const template = "Hello {{name}}";
    const context = { name: "FlowForge" };
    expect(renderTemplate(template, context)).toBe("Hello FlowForge");
  });

  it("leaves unknown variables untouched by default", () => {
    const template = "Hello {{unknown}}";
    const context = {};
    expect(renderTemplate(template, context)).toBe("Hello {{unknown}}");
  });

  it("supports custom missing variable handler", () => {
    const template = "{{missing}}";
    const context = {};
    const result = renderTemplate(template, context, {
      onMissingVariable: (variable) => `<${variable}>`
    });
    expect(result).toBe("<missing>");
  });
});
