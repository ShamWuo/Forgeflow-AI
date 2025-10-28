"use client";

import { clsx } from "clsx";
import { useCallback } from "react";

type SwitchProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
};

const Switch = ({ checked, onCheckedChange, label }: SwitchProps) => {
  const handleToggle = useCallback(() => {
    onCheckedChange(!checked);
  }, [checked, onCheckedChange]);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={handleToggle}
      className={clsx(
        "relative inline-flex h-6 w-11 items-center rounded-full border border-white/10 transition",
        checked ? "bg-brand-500" : "bg-white/10"
      )}
    >
      <span className="sr-only">{label ?? "Toggle"}</span>
      <span
        className={clsx(
          "inline-block h-4 w-4 transform rounded-full bg-white transition",
          checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  );
};

export { Switch };
