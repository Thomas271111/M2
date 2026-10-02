# Guía de Sustentación — Milestone 2 (React Frontend)

Este documento es para ustedes, el equipo: una guía para prepararse a defender oralmente el frontend de React de MiHato. No es documentación para un usuario final — es para que cualquiera del equipo pueda abrir este archivo la noche antes, repasar, y sentirse seguro respondiendo "¿por qué hicieron esto así?" o trazando un bug en vivo frente al profesor.

Está organizado de lo general a lo específico. Si solo van a leer una sección antes de la sustentación, que sea **"Los hooks personalizados"** y **"Cómo trazar algo en vivo"** — son los dos puntos donde más preguntan.

---

## 1. Qué es MiHato, en una frase

Una plataforma para que ganaderos colombianos (50-300 cabezas) controlen su hato digitalmente: animales, vacunación y trazabilidad, en vez de cuaderno o Excel. El detalle completo del problema y el alcance está en [`PROBLEM_STATEMENT.md`](PROBLEM_STATEMENT.md) — vale la pena tenerlo fresco porque la defensa de M2 también puede incluir preguntas de producto, no solo de código.

## 2. Qué cambió en el Milestone 2

El M1 era un sitio multi-página en HTML + JavaScript vanilla (un archivo `.html` por pantalla, cero frameworks). Para el M2, todo el frontend se reescribió como una **SPA (Single Page Application) de React** con **React Router**, manteniendo el mismo diseño visual y contenido, pero cambiando por completo cómo se construye la interfaz y cómo se navega entre pantallas.

Por qué importa decir esto en la sustentación: si les preguntan "¿por qué se ve igual pero el código es tan distinto?", la respuesta es que el rediseño visual ya estaba resuelto en M1; M2 fue una migración de arquitectura, no de diseño.

## 3. Stack técnico

- **Vite** como bundler (`npm run dev` para desarrollo, `npm run build` genera la carpeta `docs/` lista para GitHub Pages).
- **React 18** con JSX.
- **React Router v7** (`react-router-dom`), usando **`HashRouter`** — más abajo se explica por qué.
- **Tailwind CSS v4** para estilos (vía `@tailwindcss/vite`, configurado en `src/css/main.css`).
- **Context API de React** para estado global (no usamos Redux ni Zustand — ver sección 6).
- **`localStorage`** como "base de datos" del prototipo (no hay backend hasta el Milestone 3).
- **ESLint** (flat config) con `eslint-plugin-react` y `eslint-plugin-react-hooks`.

## 4. Mapa del código (dónde está cada cosa)

```
src/
  main.jsx              → punto de entrada: monta <App /> envuelto en todos los Providers
  App.jsx                → define TODAS las rutas de la aplicación
  domain.js              → lógica de negocio pura (cálculo de vacunación, catálogos)
  seedData.js            → datos de ejemplo (la finca y los animales ficticios)
  context/                → los 5 "Providers" de estado global (ver sección 6)
  hooks/                  → los hooks personalizados (ver sección 7)
  components/
    ui/                   → piezas genéricas: Button, Modal, Badge, Icon, FormField…
    layout/               → Sidebar, Topbar, BottomNav, AppShell, MarketingHeader…
    animales/, vacunacion/, dashboard/, trazabilidad/, configuracion/, landing/, contacto/
                          → componentes específicos de cada sección, agrupados por dominio
    ProtectedRoute.jsx    → el "guardián" de las rutas privadas
  pages/                  → una página = lo que una ruta renderiza (orquesta los componentes de arriba)
```

**Regla que seguimos en todo el proyecto:** ningún componente pasa de 80 líneas. Cuando una pantalla se ponía larga, la partimos en componentes más chicos con un solo trabajo (ej. `AnimalesPage.jsx` no dibuja la tabla ni el formulario directamente — delega en `AnimalTable`, `AnimalFilters`, `AnimalModal`).

## 5. Las rutas

Definidas en [`src/App.jsx`](src/App.jsx):

| Ruta | Pública/Protegida | Página | Nota |
|---|---|---|---|
| `/` | Pública | `LandingPage` | Marketing, FAQ, etc. |
| `/contacto` | Pública | `ContactoPage` | Formulario de contacto |
| `/login` | Pública | `LoginPage` | Login simulado |
| `/dashboard` | **Protegida** | `DashboardPage` | |
| `/animales` | **Protegida** | `AnimalesPage` | Listado |
| `/animales/:id` | **Protegida**, **dinámica** | `AnimalDetailPage` | `:id` leído con `useParams()` |
| `/vacunacion` | **Protegida** | `VacunacionPage` | |
| `/trazabilidad` | **Protegida** | `TrazabilidadPage` | |
| `/configuracion` | **Protegida** | `ConfiguracionPage` | |
| `*` (cualquier otra) | Pública | `NotFoundPage` | 404 |

### 5.1 La ruta dinámica: `/animales/:id`

En `AnimalDetailPage.jsx`:
```jsx
const { id } = useParams();
const animal = animales.find((a) => a.id === id);
```
`useParams()` lee el segmento `:id` de la URL actual y lo devuelve como string. Si alguien visita `/#/animales/abc123`, `id` vale `"abc123"`. Si ese id no existe en el arreglo de animales, `animal` es `undefined` y la página muestra el componente `AnimalNotFound` en vez de reventar — pruébenlo en vivo poniendo un id inventado en la URL, es un buen truco para la demo.

### 5.2 La ruta protegida: cómo funciona exactamente

`src/components/ProtectedRoute.jsx`:
```jsx
export function ProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
}
```

Y en `App.jsx` se usa como una ruta "de layout" que envuelve a todas las rutas de la app:
```jsx
<Route element={<ProtectedRoute />}>
  <Route element={<AppShell />}>
    <Route path="/dashboard" element={<DashboardPage />} />
    {/* ...el resto de rutas protegidas */}
  </Route>
</Route>
```

**Cómo explicarlo paso a paso si preguntan:**
1. `ProtectedRoute` no es una página, es un componente que decide *qué* renderizar.
2. Si `user` es `null` (nadie ha iniciado sesión), en vez de mostrar la ruta hija, redirige a `/login` con `<Navigate>`. Además guarda en `state.from` la ruta que la persona quería visitar.
3. Si `user` existe, renderiza `<Outlet />`, que es literalmente "lo que sea que React Router iba a poner aquí" — en este caso, `AppShell` (que pone el sidebar/topbar) y dentro de ese, la página pedida.
4. En `LoginPage.jsx`, al iniciar sesión exitosamente, se lee `location.state?.from?.pathname` y se navega ahí (o a `/dashboard` si no había una ruta guardada) — por eso si alguien intenta entrar directo a `/vacunacion` sin sesión, después de loguearse cae en `/vacunacion`, no siempre en el dashboard.

**Demo en vivo recomendada:** abran `/#/vacunacion` en una pestaña nueva (o después de cerrar sesión desde el botón "Cerrar sesión" del sidebar) y muestren que los manda a `/login`; inicien sesión con cualquier correo/contraseña y muestren que los regresa exactamente a `/vacunacion`.

### 5.3 ¿Por qué `HashRouter` y no `BrowserRouter`?

GitHub Pages es hosting **estático puro**: no hay servidor que reescriba rutas. Con `BrowserRouter`, si alguien recarga la página en `/animales/abc123`, GitHub Pages buscaría un archivo físico en esa ruta, no lo encuentra, y da 404. `HashRouter` pone todo después de un `#` (`sitio.com/#/animales/abc123`): el navegador nunca manda esa parte al servidor, así que siempre carga `index.html` y React Router decide la pantalla del lado del cliente. Es la solución más simple y robusta para este caso, al costo de URLs con `#/` en vez de limpias.

**Cuidado con esto si preguntan:** los enlaces de anclas de la landing (`#problema`, `#solucion`) chocan con que `HashRouter` también usa el `#` para rutas. Lo resolvimos en `src/scrollToSection.js`: en vez de dejar que el navegador navegue al cambiar el hash, interceptamos el clic (`preventDefault`) y hacemos `scrollIntoView` manualmente.

## 6. Estado global: los 5 Context

No usamos una librería de manejo de estado (Redux, Zustand) porque el tamaño del proyecto no lo justifica — Context API de React alcanza. Cada uno vive en `src/context/` y expone un hook para consumirlo:

| Context | Hook para usarlo | Qué guarda |
|---|---|---|
| `AuthContext` | `useAuth()` | el usuario logueado (`{ email }` o `null`), funciones `login`/`logout` |
| `DataContext` | `useAppData()` | animales, vacunas, datos de la finca — y las funciones para crear/editar/borrar |
| `ThemeContext` | `useTheme()` | modo claro/oscuro |
| `ToastContext` | `useToast()` | las notificaciones flotantes (toasts) |
| `ConfirmContext` | `useConfirm()` | el diálogo de confirmación ("¿Eliminar este animal?") |

Todos se anidan en `main.jsx`, envolviendo `<App />`. El patrón es siempre el mismo: `createContext` + un componente `XProvider` que guarda el estado con `useState`/`useLocalStorage` + un hook `useX()` que hace `useContext` y lanza un error claro si alguien lo usa fuera del Provider (para detectar errores de uso rápido, no en silencio).

**Por qué `DataContext` y no pedirle los datos a cada página por su cuenta:** si `AnimalesPage` y `DashboardPage` leyeran `localStorage` cada una por su lado, al agregar un animal en una pantalla la otra no se enteraría hasta recargar. Con Context, todas las pantallas leen del mismo estado en memoria — al cambiarlo con `upsertAnimal`, React re-renderiza automáticamente todo lo que depende de ese dato.

## 7. Los hooks personalizados (la parte que más preguntan)

El rubro pide explicar **el array de dependencias** y **cuándo corre la limpieza**. Aquí están los dos hooks "bandera" del proyecto, pensados específicamente para poder explicarse bien.

### 7.1 `useKeyboardShortcut` — el atajo Ctrl/Cmd+K del buscador de FAQ

Archivo: [`src/hooks/useKeyboardShortcut.js`](src/hooks/useKeyboardShortcut.js)

```jsx
export function useKeyboardShortcut(key, handler) {
  useEffect(() => {
    function onKeyDown(event) {
      const isCtrlOrCmd = event.ctrlKey || event.metaKey;
      if (isCtrlOrCmd && event.key.toLowerCase() === key.toLowerCase()) {
        event.preventDefault();
        handler(event);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [key, handler]);
}
```

**El array de dependencias es `[key, handler]`.** Esto significa: "vuelve a ejecutar este efecto cada vez que `key` o `handler` cambien entre un render y el siguiente". En la práctica, en `FaqCommandPalette.jsx` se llama como `useKeyboardShortcut("k", openPalette)` — `key` ("k") nunca cambia, así que el efecto prácticamente solo corre una vez al montar el componente.

**La función que se devuelve (`return () => document.removeEventListener(...)`) es la limpieza ("cleanup").** React la ejecuta en dos momentos:
1. **Antes de volver a ejecutar el efecto**, si alguna dependencia cambió (acá no pasa casi nunca porque `key` es fijo, pero sí podría pasar si `handler` cambiara de identidad en cada render — por eso hay que tener cuidado).
2. **Al desmontar el componente** (por ejemplo, si cerraran el command palette de una forma que lo desmontara del DOM, aunque en nuestro caso el componente sigue montado y solo se esconde con `if (!open) return null`).

**¿Qué pasa si quitamos el `return`?** Cada vez que el efecto se re-ejecutara, se añadiría un *nuevo* listener sin quitar el anterior. Resultado: al cabo de varias re-renderizaciones, un solo Ctrl+K dispararía `openPalette()` dos, tres, cuatro veces (uno por cada listener acumulado) — un bug clásico de "handler duplicado" por falta de cleanup. Es una buena pregunta para que les hagan y un buen experimento para mostrar en vivo (comenten el `return` y abran la consola).

**Dato para lucirse:** en desarrollo, `<StrictMode>` (usado en `main.jsx`) monta, desmonta y vuelve a montar cada componente una vez a propósito, *solo en dev*, para obligarte a notar si falta una limpieza. Si ven el listener "dispararse dos veces" en desarrollo pero no en producción, es ese mecanismo, no un bug.

### 7.2 `useScrollReveal` — las animaciones al hacer scroll en la landing

Archivo: [`src/hooks/useScrollReveal.js`](src/hooks/useScrollReveal.js)

```jsx
export function useScrollReveal(containerRef) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const targets = container.querySelectorAll(".reveal");
    // ...(reduced-motion / fallback sin IntersectionObserver aquí)...

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    targets.forEach((el) => observer.observe(el));
    const fallback = setTimeout(() => targets.forEach((el) => el.classList.add("is-visible")), 1500);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [containerRef]);
}
```

**Dependencia: `[containerRef]`.** Un `ref` creado con `useRef` mantiene la misma identidad en todos los renders de un componente, así que en la práctica este efecto corre **una sola vez**, cuando `LandingPage` se monta.

**La limpieza hace dos cosas:** `observer.disconnect()` (deja de observar todos los elementos, para no seguir intentando animar nodos que ya no existen en el DOM) y `clearTimeout(fallback)` (cancela el temporizador de respaldo si el componente se desmonta antes de que se cumplan los 1.5 segundos). Sin esto, si alguien navega fuera de la landing rápido, el `setTimeout` igual intentaría ejecutarse más tarde sobre elementos que ya no están — no rompe nada visualmente, pero es trabajo desperdiciado y, en un componente más complejo, podría causar un `setState` sobre un componente desmontado.

### 7.3 Los hooks "de apoyo" (más simples, pero vale la pena conocerlos)

- **`useLocalStorage(key, initialValue)`** — un hook genérico que se comporta como `useState`, pero además sincroniza el valor con `localStorage` cada vez que cambia (vía un `useEffect` con dependencia `[key, value]`). Es la base de `AuthContext` y `DataContext`.
- **`useAlertCount()`**, **`useFilteredAnimales()`**, **`useVaccinationCounts()`** — hooks que no usan `useEffect`, solo encapsulan lógica derivada (filtrar, contar) reutilizando otros hooks (`useAppData`). Útiles para mostrar que "hook personalizado" no siempre significa `useEffect` — a veces es solo una forma de compartir lógica entre componentes.
- **`useAnimalDetailActions(animal)`** — agrupa las acciones de eliminar animal/eliminar vacuna (con su diálogo de confirmación) para que `AnimalDetailPage` no cargue con esa lógica directamente.

## 8. Autenticación simulada (y por qué es honesto decir que es simulada)

`AuthContext.jsx` acepta **cualquier correo y contraseña no vacíos**:
```jsx
function login(email, password) {
  if (!email.trim() || !password.trim()) {
    return { ok: false, error: "Ingresa correo y contraseña." };
  }
  setUser({ email: email.trim() });
  return { ok: true };
}
```
No hay backend ni validación real hasta el Milestone 3 (ahí entra JWT + Express + MongoDB). Si preguntan "¿esto es seguro?", la respuesta correcta es **no, y no pretende serlo todavía** — es un placeholder que ya deja la arquitectura de rutas protegidas lista para cuando exista un login real. Decir esto con confianza es mejor que intentar justificar que es "seguro".

## 9. Cómo trazar un bug o una transición de estado en vivo

Esto es literalmente uno de los criterios de calificación, así que practiquen al menos uno de estos flujos hasta poder narrarlo sin mirar el documento:

**Flujo A — Agregar un animal (CRUD + Context):**
1. Click en "Agregar animal" → `AnimalesPage` cambia `editingAnimal` a `null` y `modalOpen` a `true` (estado local con `useState`).
2. Se abre `<AnimalModal>` → `<AnimalForm>`, que maneja sus propios campos en estado local.
3. Al enviar, `AnimalForm` llama a `onSave(data)`, que en `AnimalesPage` es `handleSave` → llama a `upsertAnimal(data)` de `DataContext`.
4. Dentro de `DataContext`, `upsertAnimal` hace `setAnimales((list) => [...list, animal])` → esto dispara el `useEffect` de `useLocalStorage` que escribe en `localStorage` **y** provoca que React re-renderice todo lo que consume `useAppData()` — por eso `AnimalesPage` (la tabla) y `DashboardPage` (el KPI "Cabezas activas") se actualizan solos, sin recargar la página.

**Flujo B — Redirect de ruta protegida (ya descrito en 5.2):** cerrar sesión → intentar entrar a `/vacunacion` → `ProtectedRoute` ve `user === null` → `<Navigate to="/login">` → iniciar sesión → vuelve a `/vacunacion`.

**Flujo C — Un bug "a propósito" para la demo:** si quieren mostrar que *saben* dónde mirar cuando algo falla, uno clásico es: abrir las DevTools, ir a Application → Local Storage, borrar la clave `mihato:animales` a mano, y recargar. Deberían ver que `DataContext` vuelve a sembrar los datos de ejemplo: el `useEffect` de `DataProvider` (en `DataContext.jsx`) revisa la bandera `seeded` (persistida como `mihato:seeded`) y, si es `false`, llama a `seedAnimales()`/`seedVacunas()` de `seedData.js` y marca `seeded` en `true`. Explicar ese mecanismo de "auto-reparación" es una buena muestra de que entienden el flujo de datos completo.

## 10. Preguntas que probablemente les hagan (y cómo responder)

- **"¿Por qué Context y no Redux?"** → El proyecto es pequeño, el estado no tiene lógica de actualización compleja ni necesita time-travel debugging; Context + hooks es menos código y menos dependencias para el mismo resultado.
- **"¿Qué pasa si dos componentes usan `useAppData()` a la vez?"** → Ambos leen el mismo estado (un solo `DataProvider` en la raíz), así que siempre están sincronizados; no hay dos "copias" de los datos.
- **"¿Por qué `HashRouter` y no Actions de GitHub para hacer el rewrite?"** → Simplicidad: cero configuración de CI, funciona en cualquier repo sin importar el nombre, consistente con la decisión ya tomada en M1 de desplegar sin GitHub Actions.
- **"¿Cómo se probaría esto con un backend real en M3?"** → `AuthContext.login` cambiaría de aceptar cualquier credencial a hacer un `fetch` a un endpoint de Express que devuelva un JWT; `ProtectedRoute` no cambiaría casi nada, porque ya depende de `user` siendo `null` o no, no de cómo se obtuvo.
- **"¿Por qué ninguna función de componente pasa de 80 líneas?"** → Cada componente tiene una sola responsabilidad visual; cuando una pantalla crecía, se dividió en subcomponentes (ejemplo concreto a mencionar: `AnimalesPage` → `AnimalFilters` + `AnimalTable` + `AnimalModal`, cada uno en su propio archivo).

## 11. Comandos útiles para la demo

```bash
npm run dev      # servidor local de desarrollo
npm run build    # genera docs/ para GitHub Pages
npm run lint     # corre ESLint (debe salir limpio)
```

---

*Si en la sustentación alguien pide ver código fuente de algo que no está citado aquí, los archivos relevantes por pantalla están en la tabla de la sección 5 — empiecen siempre por la página (`src/pages/...Page.jsx`) y desde ahí sigan los imports hacia los componentes y hooks que usa.*
