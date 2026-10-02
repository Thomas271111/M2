export function InfoRow({ label, value }) {
  return (
    <div className="py-2.5 flex items-center justify-between gap-4 border-b border-border last:border-0">
      <span className="text-sm text-text-muted">{label}</span>
      <span className="text-sm font-medium text-text text-right">{value}</span>
    </div>
  );
}
