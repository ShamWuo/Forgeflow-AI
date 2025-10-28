"use client";

import { clsx } from "clsx";
import { forwardRef } from "react";
import type { ForwardedRef, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = (
  { className, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) => (
  <input
    ref={ref}
    className={clsx(
      "w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none",
      className
    )}
    {...props}
  />
);

export default forwardRef<HTMLInputElement, InputProps>(Input);
