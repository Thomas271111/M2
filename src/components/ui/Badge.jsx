import { Icon } from "./Icon.jsx";

const VACCINATION_STYLES = {
  vencida: { cls: "bg-danger-soft text-danger", icon: "alertTriangle", label: "Vencida" },
  proxima: { cls: "bg-warning-soft text-warning", icon: "calendar", label: "Próxima" },
  "al-dia": { cls: "bg-success-soft text-success", icon: "checkCircle", label: "Al día" },
  "sin-registro": { cls: "bg-surface-alt text-text-muted", icon: "info", label: "Sin registro" }
};

const ESTADO_STYLES = {
  Activo: "bg-success-soft text-success",
  Vendido: "bg-info-soft text-info",
  Muerto: "bg-surface-alt text-text-muted"
};

export function VaccinationBadge({ status, label }) {
  const style = VACCINATION_STYLES[status] || VACCINATION_STYLES["sin-registro"];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full ${style.cls} px-2.5 py-1 text-xs font-medium`}>
      <Icon name={style.icon} className="size-3.5" />
      {label || style.label}
    </span>
  );
}

export function EstadoBadge({ estado }) {
  const cls = ESTADO_STYLES[estado] || ESTADO_STYLES.Muerto;
  return <span className={`inline-flex items-center rounded-full ${cls} px-2.5 py-1 text-xs font-medium`}>{estado}</span>;
}
