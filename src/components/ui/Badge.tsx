// src/components/ui/Badge.tsx
import React from "react";
import clsx from "clsx";

type BadgeVariant = "success" | "destructive" | "default";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  onClick?: () => void;
}

export function Badge({
  children,
  variant = "default",
  className,
  onClick,
}: BadgeProps) {
  return (
    <span
      onClick={onClick}
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium select-none",
        "cursor-pointer transition-colors",
        {
          "bg-green-100 text-green-700 hover:bg-green-200":
            variant === "success",

          "bg-red-100 text-red-700 hover:bg-red-200":
            variant === "destructive",

          "bg-slate-100 text-slate-700 hover:bg-slate-200":
            variant === "default",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
