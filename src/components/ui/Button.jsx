const VARIANTS = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  outline: "border border-border bg-surface text-text hover:bg-surface-alt",
  ghost: "text-text-muted hover:bg-surface-alt hover:text-text",
  danger: "border border-danger/40 text-danger hover:bg-danger-soft"
};

export function Button({ as: Component = "button", variant = "primary", className = "", children, ...props }) {
  return (
    <Component
      className={`focus-ring inline-flex items-center justify-center gap-2 rounded-control px-4 py-2.5 text-sm font-semibold transition-colors ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

export function IconButton({ className = "", children, ...props }) {
  return (
    <button
      type="button"
      className={`focus-ring grid place-items-center size-9 rounded-control text-text-muted hover:bg-surface-alt hover:text-text ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
