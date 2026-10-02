import { Icon } from "../ui/Icon.jsx";

export function RegisterVaccineDesktopButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="hidden lg:inline-flex focus-ring items-center gap-2 rounded-control bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
    >
      <Icon name="plus" className="size-4.5" /> Registrar vacuna
    </button>
  );
}

export function RegisterVaccineFab({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="lg:hidden fixed bottom-20 right-4 z-30 grid place-items-center size-14 rounded-full bg-primary text-white shadow-lifted focus-ring no-print"
      aria-label="Registrar vacuna"
    >
      <Icon name="plus" className="size-6" />
    </button>
  );
}
