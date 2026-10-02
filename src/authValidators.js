const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LOGIN_VALIDATORS = {
  email: (v) => {
    const value = v.trim();
    if (!value) return "Ingresa tu correo electrónico.";
    if (!value.includes("@")) return "El correo debe incluir una @.";
    if (!EMAIL_RE.test(value)) return "Ingresa un correo con un formato válido, ej. nombre@correo.com.";
    return "";
  },
  password: (v) => {
    if (!v) return "Ingresa tu contraseña.";
    if (v.length < 8) return "La contraseña debe tener al menos 8 caracteres.";
    if (!/[a-zA-Z]/.test(v) || !/[0-9]/.test(v)) return "Debe incluir al menos una letra y un número.";
    return "";
  }
};
