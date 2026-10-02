import { FormField, inputClass } from "../ui/FormField.jsx";

export function LoginFormFields({ email, password, errors, onChange, onBlur }) {
  return (
    <>
      <FormField label="Correo electrónico" htmlFor="email" required error={errors.email}>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => onChange("email", e.target.value)}
          onBlur={(e) => onBlur("email", e.target.value)}
          className={inputClass}
          placeholder="tucorreo@ejemplo.com"
          autoComplete="email"
        />
      </FormField>
      <FormField label="Contraseña" htmlFor="password" required error={errors.password}>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => onChange("password", e.target.value)}
          onBlur={(e) => onBlur("password", e.target.value)}
          className={inputClass}
          placeholder="Mínimo 8 caracteres, con letras y números"
          autoComplete="current-password"
        />
      </FormField>
    </>
  );
}
