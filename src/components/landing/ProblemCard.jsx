import { Icon } from "../ui/Icon.jsx";

const TONE_CLASSES = {
  danger: "bg-danger-soft text-danger",
  warning: "bg-warning-soft text-warning"
};

export function ProblemCard({ icon, tone, title, description, delayMs = 0 }) {
  return (
    <div className="reveal rounded-card border border-border bg-surface shadow-soft p-6" style={{ transitionDelay: `${delayMs}ms` }}>
      <span className={`inline-grid place-items-center size-11 rounded-full ${TONE_CLASSES[tone]}`}>
        <Icon name={icon} className="size-5" />
      </span>
      <h3 className="font-display text-lg font-semibold text-text mt-4">{title}</h3>
      <p className="mt-2 text-sm text-text-muted leading-relaxed">{description}</p>
    </div>
  );
}
