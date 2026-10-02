import { Link } from "react-router-dom";
import { Icon } from "../ui/Icon.jsx";

const BENEFITS = ["Sin compromisos ni tarjeta de crédito.", "Puedes explorar la plataforma mientras tanto.", "Tus datos solo se usan para responderte."];

export function ContactIntro() {
  return (
    <div>
      <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft text-primary text-xs font-semibold px-3.5 py-1.5">
        <Icon name="bolt" className="size-3.5" />
        Hablemos de tu finca
      </span>
      <h1 className="font-display text-3xl sm:text-4xl font-semibold text-text mt-5 leading-tight">Cuéntanos sobre tu hato y te contactamos</h1>
      <p className="mt-4 text-base text-text-muted leading-relaxed">
        Déjanos tus datos y los de tu finca. Ya sea que tengas dudas, quieras contar tu caso o simplemente saber más de MiHato, con gusto te
        escribimos.
      </p>
      <ul className="mt-8 space-y-4">
        {BENEFITS.map((b) => (
          <li key={b} className="flex items-start gap-3">
            <span className="shrink-0 mt-0.5 grid place-items-center size-8 rounded-full bg-primary-soft text-primary">
              <Icon name="check" className="size-4" />
            </span>
            <span className="text-sm text-text-muted leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>
      <Link
        to="/dashboard"
        className="focus-ring mt-8 inline-flex items-center gap-2 rounded-control border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-text hover:bg-surface-alt"
      >
        O prueba la plataforma directamente
        <Icon name="arrowRight" className="size-4" />
      </Link>
    </div>
  );
}
