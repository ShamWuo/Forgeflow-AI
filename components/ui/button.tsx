"use client";

import React, { forwardRef } from "react";
import { clsx } from "clsx";
import type { ButtonHTMLAttributes, ForwardedRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  loading?: boolean;
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-60";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-brand-500 text-white hover:bg-brand-400",
  secondary: "border border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10",
  ghost: "text-slate-300 hover:text-white"
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", loading = false, children, ...props }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const resolvedVariant: ButtonVariant = variant ?? "primary";

    return (
      <button
        ref={ref}
        className={clsx(baseStyles, variantStyles[resolvedVariant], className)}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? "Running..." : children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
