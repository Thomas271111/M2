export function KpiCard({ label, value, valueClassName = "text-text" }) {
  return (
    <div className="rounded-card bg-surface border border-border shadow-soft p-4 sm:p-5">
      <p className="text-xs font-medium text-text-muted">{label}</p>
      <p className={`mt-1.5 font-display text-2xl sm:text-3xl font-semibold tabular ${valueClassName}`}>{value}</p>
    </div>
  );
}
