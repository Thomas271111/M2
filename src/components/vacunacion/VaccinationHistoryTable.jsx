import { VaccinationHistoryRow } from "./VaccinationHistoryRow.jsx";

export function VaccinationHistoryTable({ historial, animalesById }) {
  return (
    <section aria-labelledby="historial-heading" className="mt-6 rounded-card bg-surface border border-border shadow-soft">
      <div className="px-5 py-4 border-b border-border">
        <h2 id="historial-heading" className="font-display font-semibold text-text">
          Historial de aplicaciones
        </h2>
      </div>
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="border-b border-border text-left text-xs font-medium text-text-muted">
              <th className="px-5 py-3">Animal</th>
              <th className="px-5 py-3">Vacuna</th>
              <th className="px-5 py-3">Fecha</th>
              <th className="px-5 py-3">Próxima dosis</th>
              <th className="px-5 py-3">Veterinario(a)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {historial.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-sm text-text-muted">
                  Aún no se han registrado vacunas.
                </td>
              </tr>
            ) : (
              historial.map((v) => <VaccinationHistoryRow key={v.id} vacuna={v} animal={animalesById.get(v.animalId)} />)
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
