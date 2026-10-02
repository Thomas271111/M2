import { Icon } from "../ui/Icon.jsx";

export function SolutionCard({ icon, title, description, delayMs = 0 }) {
  return (
    <div className="reveal rounded-card bg-bg border border-border p-6" style={{ transitionDelay: `${delayMs}ms` }}>
      <span className="inline-grid place-items-center size-11 rounded-full bg-primary-soft text-primary">
        <Icon name={icon} className="size-5" />
      </span>
      <h3 className="font-display text-lg font-semibold text-text mt-4">{title}</h3>
      <p className="mt-2 text-sm text-text-muted leading-relaxed">{description}</p>
    </div>
  );
}
