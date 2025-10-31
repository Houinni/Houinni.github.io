import React from "react";

export const Slot = React.forwardRef(function Slot({ children, ...props }, forwardedRef) {
  if (!React.isValidElement(children)) {
    return null;
  }

  return React.cloneElement(children, {
    ...props,
    ref: forwardedRef,
    className: [children.props.className, props.className].filter(Boolean).join(" ").trim() || undefined,
    onClick: composeEventHandlers(children.props.onClick, props.onClick),
    onKeyDown: composeEventHandlers(children.props.onKeyDown, props.onKeyDown),
  });
});

function composeEventHandlers(original, override) {
  return (event) => {
    if (typeof original === "function") {
      original(event);
    }
    if (!event.defaultPrevented && typeof override === "function") {
      override(event);
    }
  };
}
