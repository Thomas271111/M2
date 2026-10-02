export function VaccinationStats({ vencidas, proximas, alDia }) {
  return (
    <section aria-label="Resumen de vacunación" className="grid grid-cols-3 gap-3 sm:gap-4">
      <div className="rounded-card bg-danger-soft p-4 sm:p-5">
        <p className="text-xs font-medium text-danger">Vencidas</p>
        <p className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-danger tabular">{vencidas}</p>
      </div>
      <div className="rounded-card bg-warning-soft p-4 sm:p-5">
        <p className="text-xs font-medium text-warning">Próximas</p>
        <p className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-warning tabular">{proximas}</p>
      </div>
      <div className="rounded-card bg-success-soft p-4 sm:p-5">
        <p className="text-xs font-medium text-success">Al día</p>
        <p className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-success tabular">{alDia}</p>
      </div>
    </section>
  );
}
