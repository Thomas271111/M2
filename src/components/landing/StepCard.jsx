export function StepCard({ number, title, description, delayMs = 0 }) {
  return (
    <div className="reveal relative" style={{ transitionDelay: `${delayMs}ms` }}>
      <span className="relative z-10 grid place-items-center size-12 rounded-full bg-primary text-white font-display text-lg font-semibold shadow-soft">
        {number}
      </span>
      <h3 className="font-display text-lg font-semibold text-text mt-4">{title}</h3>
      <p className="mt-2 text-sm text-text-muted leading-relaxed">{description}</p>
    </div>
  );
}
