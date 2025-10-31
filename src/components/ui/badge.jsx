import React from "react";
import { cn } from "@/lib/utils";

const variants = {
  default: "inline-flex items-center rounded-md border border-transparent bg-foreground px-2.5 py-0.5 text-xs font-semibold text-background",
  secondary: "inline-flex items-center rounded-md border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground",
  outline: "inline-flex items-center rounded-md border border-foreground px-2.5 py-0.5 text-xs font-semibold",
};

const Badge = React.forwardRef(function Badge({ className, variant = "default", ...props }, ref) {
  return (
    <span ref={ref} className={cn(variants[variant] ?? variants.default, className)} {...props} />
  );
});

export { Badge };
