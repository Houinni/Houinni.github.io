import React from "react";
import { cn } from "@/lib/utils";

const Separator = React.forwardRef(function Separator({ className, orientation = "horizontal", decorative = true, ...props }, ref) {
  return (
    <div
      ref={ref}
      role={decorative ? "none" : "separator"}
      className={cn(
        "bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      {...props}
    />
  );
});

export { Separator };
