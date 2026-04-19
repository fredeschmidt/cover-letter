import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-muted-foreground)]",
        violet:
          "border border-[color-mix(in_oklab,var(--color-violet)_25%,transparent)] bg-[var(--color-violet-soft)] text-[var(--color-violet)]",
        lime: "border border-[color-mix(in_oklab,var(--color-lime)_25%,transparent)] bg-[var(--color-lime-soft)] text-[var(--color-lime)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
