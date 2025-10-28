const VARIABLE_REGEX = /{{\s*([a-zA-Z0-9_\-]+)\s*}}/g;

type TemplateContext = Record<string, string>;

type TemplateOptions = {
  onMissingVariable?: (variable: string) => string;
};

export const renderTemplate = (
  template: string,
  context: TemplateContext,
  options: TemplateOptions = {}
): string => {
  const { onMissingVariable } = options;

  return template.replace(VARIABLE_REGEX, (_, variable) => {
    if (variable in context) {
      return context[variable] ?? "";
    }

    if (onMissingVariable) {
      return onMissingVariable(variable);
    }

    return `{{${variable}}}`;
  });
};
