import React from "react";
import { cn } from "@/lib/utils";

const TabsContext = React.createContext(null);

const Tabs = ({ value, onValueChange, className, children, defaultValue }) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const currentValue = isControlled ? value : internalValue;

  const setValue = React.useCallback(
    (next) => {
      if (!isControlled) {
        setInternalValue(next);
      }
      if (typeof onValueChange === "function") {
        onValueChange(next);
      }
    },
    [isControlled, onValueChange]
  );

  const contextValue = React.useMemo(
    () => ({ value: currentValue, setValue }),
    [currentValue, setValue]
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
};

const TabsList = React.forwardRef(function TabsList({ className, ...props }, ref) {
  return <div ref={ref} className={cn("inline-flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground", className)} {...props} />;
});

const TabsTrigger = React.forwardRef(function TabsTrigger({ className, value, disabled, ...props }, ref) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within Tabs");
  const isActive = context.value === value;

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        isActive ? "bg-background text-foreground shadow" : "hover:text-foreground",
        className
      )}
      onClick={() => context.setValue(value)}
      disabled={disabled}
      {...props}
    />
  );
});

const TabsContent = React.forwardRef(function TabsContent({ className, value, ...props }, ref) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be used within Tabs");
  const hidden = context.value !== value;

  return (
    <div
      ref={ref}
      className={cn("mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)}
      hidden={hidden}
      role="tabpanel"
      {...props}
    />
  );
});

export { Tabs, TabsList, TabsTrigger, TabsContent };
