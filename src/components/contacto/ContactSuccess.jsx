import { Link } from "react-router-dom";
import { Icon } from "../ui/Icon.jsx";

export function ContactSuccess({ name }) {
  return (
    <div className="text-center py-6" tabIndex={-1}>
      <span className="inline-grid place-items-center size-14 rounded-full bg-success-soft text-success">
        <Icon name="checkCircle" className="size-6" />
      </span>
      <h2 className="font-display text-xl font-semibold text-text mt-4">¡Gracias{name ? `, ${name}` : ""}!</h2>
      <p className="mt-2 text-sm text-text-muted leading-relaxed">
        Recibimos tus datos. En una versión real, nuestro equipo se pondría en contacto contigo pronto.
      </p>
      <Link
        to="/dashboard"
        className="focus-ring mt-6 inline-flex items-center gap-2 rounded-control bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
      >
        Mientras tanto, prueba la plataforma
        <Icon name="arrowRight" className="size-4" />
      </Link>
    </div>
  );
}
