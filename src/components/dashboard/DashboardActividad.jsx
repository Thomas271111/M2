import { Icon } from "../ui/Icon.jsx";
import { vaccineLabel } from "../../domain.js";
import { formatDate } from "../../utils.js";

function buildEventos(animales, vacunas) {
  const animalEventos = animales.map((a) => ({ tipo: "animal", fecha: a.fechaRegistro, animal: a }));
  const vacunaEventos = vacunas.map((v) => ({ tipo: "vacuna", fecha: v.fechaRegistro, vacuna: v, animal: animales.find((a) => a.id === v.animalId) }));
  return [...animalEventos, ...vacunaEventos]
    .filter((e) => e.animal)
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .slice(0, 8);
}

export function DashboardActividad({ animales, vacunas }) {
  const eventos = buildEventos(animales, vacunas);

  return (
    <section aria-labelledby="actividad-heading" className="lg:col-span-3 rounded-card bg-surface border border-border shadow-soft">
      <div className="px-5 py-4 border-b border-border">
        <h2 id="actividad-heading" className="font-display font-semibold text-text">
          Actividad reciente
        </h2>
      </div>
      <ul className="divide-y divide-border">
        {eventos.length === 0 ? (
          <li className="px-5 py-8 text-center text-sm text-text-muted">Aún no hay actividad registrada.</li>
        ) : (
          eventos.map((e) => (
            <li key={`${e.tipo}-${e.tipo === "animal" ? e.animal.id : e.vacuna.id}`} className="flex items-center gap-3 px-5 py-3.5">
              <span className={`shrink-0 grid place-items-center size-9 rounded-full ${e.tipo === "animal" ? "bg-info-soft text-info" : "bg-primary-soft text-primary"}`}>
                <Icon name={e.tipo === "animal" ? "tag" : "syringe"} className="size-4.5" />
              </span>
              <span className="flex-1 min-w-0 text-sm text-text">
                {e.tipo === "animal" ? (
                  <>
                    Se registró <strong className="font-medium">{e.animal.nombre || e.animal.arete}</strong> en el hato
                  </>
                ) : (
                  <>
                    Se aplicó <strong className="font-medium">{vaccineLabel(e.vacuna.tipo)}</strong> a {e.animal.nombre || e.animal.arete}
                  </>
                )}
              </span>
              <span className="shrink-0 text-xs text-text-muted">{formatDate(e.fecha)}</span>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
