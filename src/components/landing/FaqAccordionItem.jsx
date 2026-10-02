import { forwardRef } from "react";
import { Icon } from "../ui/Icon.jsx";

export const FaqAccordionItem = forwardRef(function FaqAccordionItem({ item, open, onToggle }, ref) {
  return (
    <details
      ref={ref}
      open={open}
      onToggle={(e) => onToggle(e.target.open)}
      className="group rounded-card border border-border bg-surface shadow-soft open:shadow-lifted"
    >
      <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 font-display font-medium text-text focus-ring rounded-card">
        <span>{item.question}</span>
        <span className="shrink-0 text-text-muted transition-transform group-open:rotate-180">
          <Icon name="chevronDown" className="size-4.5" />
        </span>
      </summary>
      <p className="px-5 pb-4 text-sm text-text-muted leading-relaxed">{item.answer}</p>
    </details>
  );
});
