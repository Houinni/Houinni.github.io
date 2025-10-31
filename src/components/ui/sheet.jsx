import React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "./slot.jsx";

const SheetContext = React.createContext(null);

function useSheetContext(component) {
  const context = React.useContext(SheetContext);
  if (!context) {
    throw new Error(`${component} must be used within <Sheet>`);
  }
  return context;
}

const Sheet = ({ children, open, defaultOpen = false, onOpenChange }) => {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const currentOpen = isControlled ? open : internalOpen;

  const setOpen = React.useCallback(
    (next) => {
      if (!isControlled) {
        setInternalOpen(next);
      }
      if (typeof onOpenChange === "function") {
        onOpenChange(next);
      }
    },
    [isControlled, onOpenChange]
  );

  const contextValue = React.useMemo(
    () => ({ open: currentOpen, setOpen }),
    [currentOpen, setOpen]
  );

  return <SheetContext.Provider value={contextValue}>{children}</SheetContext.Provider>;
};

const SheetTrigger = React.forwardRef(function SheetTrigger({ asChild = false, ...props }, ref) {
  const { setOpen } = useSheetContext("SheetTrigger");
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : "button"}
      onClick={(event) => {
        if (typeof props.onClick === "function") {
          props.onClick(event);
        }
        if (!event.defaultPrevented) {
          setOpen(true);
        }
      }}
      {...props}
    />
  );
});

const SheetClose = React.forwardRef(function SheetClose({ asChild = false, ...props }, ref) {
  const { setOpen } = useSheetContext("SheetClose");
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : "button"}
      onClick={(event) => {
        if (typeof props.onClick === "function") {
          props.onClick(event);
        }
        if (!event.defaultPrevented) {
          setOpen(false);
        }
      }}
      {...props}
    />
  );
});

const SheetContent = React.forwardRef(function SheetContent({ className, side = "right", children, ...props }, ref) {
  const { open, setOpen } = useSheetContext("SheetContent");
  const sideClass = side === "left" ? "left-0 border-r" : "right-0 border-l";

  React.useEffect(() => {
    if (!open) return undefined;
    const handler = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, setOpen]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} aria-hidden="true" />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative ml-auto flex h-full w-80 max-w-full flex-col bg-background p-6 shadow-lg",
          side === "left" ? "ml-0 mr-auto" : "ml-auto",
          sideClass,
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
});

const SheetHeader = React.forwardRef(function SheetHeader({ className, ...props }, ref) {
  return <div ref={ref} className={cn("mb-4 space-y-1 text-left", className)} {...props} />;
});

const SheetTitle = React.forwardRef(function SheetTitle({ className, ...props }, ref) {
  return <h2 ref={ref} className={cn("text-lg font-semibold", className)} {...props} />;
});

export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose };
