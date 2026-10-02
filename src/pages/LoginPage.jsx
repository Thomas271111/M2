import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Icon } from "../components/ui/Icon.jsx";
import { LOGIN_VALIDATORS } from "../authValidators.js";
import { LoginFormFields } from "../components/auth/LoginFormFields.jsx";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  function handleChange(field, value) {
    if (field === "email") setEmail(value);
    else setPassword(value);
    if (errors[field]) setErrors((e) => ({ ...e, [field]: LOGIN_VALIDATORS[field](value) }));
  }

  function handleBlur(field, value) {
    setErrors((e) => ({ ...e, [field]: LOGIN_VALIDATORS[field](value) }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = { email: LOGIN_VALIDATORS.email(email), password: LOGIN_VALIDATORS.password(password) };
    setErrors(newErrors);
    if (newErrors.email || newErrors.password) return;

    login(email);
    navigate(location.state?.from?.pathname || "/dashboard", { replace: true });
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-bg px-4 py-10">
      <div className="w-full max-w-sm">
        <Link to="/" className="flex items-center justify-center gap-2.5 focus-ring rounded-control mb-8">
          <span className="grid place-items-center size-9 rounded-full bg-primary-soft text-primary">
            <Icon name="logo" className="size-5" />
          </span>
          <span className="font-display font-semibold text-lg text-text">MiHato</span>
        </Link>

        <div className="rounded-card border border-border bg-surface shadow-lifted p-6 sm:p-8">
          <h1 className="font-display text-xl font-semibold text-text text-center">Inicia sesión</h1>
          <p className="text-sm text-text-muted text-center mt-1.5">
            Prototipo académico: valida el formato de tus datos, pero no verifica contra una cuenta real.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
            <LoginFormFields email={email} password={password} errors={errors} onChange={handleChange} onBlur={handleBlur} />
            <button type="submit" className="focus-ring w-full rounded-control bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-hover">
              Entrar
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-text-muted mt-6">
          <Link to="/" className="text-primary hover:underline focus-ring rounded">
            Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
}
