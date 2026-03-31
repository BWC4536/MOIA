# CLAUDE.md — AI Hub: System Instructions for Claude Code

> Este archivo es la fuente de verdad absoluta para Claude Code en este proyecto.
> Léelo completo antes de escribir una sola línea de código.

---

## 1. PROJECT VISION

**AI Hub** es un directorio/dashboard premium de herramientas de Inteligencia Artificial, noticias, prompts y un sistema de peticiones de la comunidad. El objetivo es ser la referencia visual y funcional más cuidada del ecosistema IA hispanohablante.

**Palabras clave que guían cada decisión:** Premium · Minimalista · Futurista · Rápido · Modular.

---

## 2. TECH STACK — OBLIGATORIO, SIN EXCEPCIONES

| Capa | Tecnología | Notas |
|---|---|---|
| Frontend | React 18 + Vite | Inicializado con `npm create vite@latest` |
| Estilos | Tailwind CSS | Config en `tailwind.config.js` |
| Iconos | Lucide React | `lucide-react` únicamente |
| Animaciones | Framer Motion | Toda animación no-trivial pasa por aquí |
| Backend / DB | Supabase | Cliente `@supabase/supabase-js` |

**Prohibido introducir dependencias fuera de esta lista sin aprobación explícita del usuario.**

---

## 3. ARQUITECTURA DE COMPONENTES

### 3.1 Estructura de directorios

```
public/
├── images/
│   ├── logo.svg
│   ├── og-image.png
│   └── placeholders/
│       └── tool-default.webp     # Fallback si imagen_url es null en Supabase
├── fonts/                        # Solo si Geist se sirve localmente
└── favicon.ico

src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   └── TopBar.jsx
│   ├── ui/
│   │   ├── ProjectCard.jsx       # Tarjeta genérica de herramienta/noticia
│   │   ├── PromptCard.jsx
│   │   ├── HorizontalScroll.jsx  # Contenedor scroll horizontal Framer Motion
│   │   └── Badge.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── FeaturedTools.jsx
│   │   ├── NewsFeed.jsx
│   │   ├── PromptsGallery.jsx
│   │   └── CommunityRequests.jsx
│   └── forms/
│       ├── RequestForm.jsx
│       └── SubscribeForm.jsx
├── lib/
│   └── supabaseClient.js         # Instancia única del cliente Supabase
├── hooks/
│   └── useSupabase.js            # Hook genérico de fetching
├── pages/
│   ├── Home.jsx
│   ├── Tools.jsx
│   ├── News.jsx
│   ├── Prompts.jsx
│   └── Requests.jsx
└── App.jsx
```

### 3.2 Regla de modularización

- **Cada componente hace UNA sola cosa.** Si un componente supera ~120 líneas, es candidato a dividirse.
- Los datos se consumen desde hooks (`useSupabase`) o props. Los componentes no hacen llamadas directas a Supabase.
- `supabaseClient.js` exporta una única instancia: `export const supabase = createClient(url, key)`.

---

## 4. BASE DE DATOS — SUPABASE

### 4.1 Esquema de tablas

```sql
-- Tabla principal de contenido
contenido_diario (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo       TEXT NOT NULL,
  tipo         TEXT CHECK (tipo IN ('app', 'noticia', 'prompt', 'skill')),
  descripcion  TEXT,
  url          TEXT,
  etiqueta_ia  TEXT,
  imagen_url   TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Suscriptores al newsletter
suscriptores (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Peticiones de la comunidad
peticiones_comunidad (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT,
  peticion   TEXT NOT NULL,
  estado     TEXT DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'completado')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4.2 Configuración de seguridad (desarrollo)

- RLS está **temporalmente desactivado** en todas las tablas durante el desarrollo local.
- Las variables de entorno van en `.env.local`:
  ```
  VITE_SUPABASE_URL=...
  VITE_SUPABASE_ANON_KEY=...
  ```
- **Nunca commitear `.env.local` al repositorio.**

---

## 5. ESTÉTICA Y UI/UX — REGLAS ESTRICTAS

> Inspiración de referencia: **Linear App 2022 Release**.
> Violación de estas reglas = rehacer sin preguntar.

### 5.1 Tema y colores

```
Fondo base:        bg-black  ó  bg-zinc-950
Superficies:       bg-white/[0.03]  ó  bg-zinc-900/50
Bordes:            border border-white/10
Texto primario:    text-white  ó  text-zinc-100
Texto secundario:  text-zinc-400
Acento principal:  text-violet-400  /  bg-violet-500
```

- **Modo oscuro estricto. Prohibido cualquier variante clara.**
- Brillos radiales permitidos: muy tenues, `opacity-20` máximo.
  ```jsx
  // Ejemplo de glow correcto
  <div className="absolute inset-0 bg-violet-500/10 blur-3xl rounded-full pointer-events-none" />
  ```

### 5.2 Glassmorphism

```jsx
// Patrón estándar para tarjetas y paneles
className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl"
```

### 5.3 Tipografía

- Fuente: **Inter** o **Geist** (importada desde Google Fonts o `@fontsource`).
- Títulos: `font-semibold tracking-tight text-white`
- Subtítulos / descripciones: `text-sm text-zinc-400 leading-relaxed`
- Labels / badges: `text-xs font-medium tracking-wide uppercase`

### 5.4 Animaciones — FRAMER MOTION OBLIGATORIO

**Scroll horizontal en listas de tarjetas:**

```jsx
// HorizontalScroll.jsx — patrón estándar
import { motion } from 'framer-motion';

export function HorizontalScroll({ children }) {
  return (
    <div className="overflow-x-auto hide-scrollbar">
      <motion.div
        className="flex gap-4 pb-4"
        drag="x"
        dragConstraints={{ right: 0, left: -1000 }}
        whileTap={{ cursor: 'grabbing' }}
      >
        {children}
      </motion.div>
    </div>
  );
}
```

**Tarjetas grandes:**

```jsx
// Ancho mínimo obligatorio en tarjetas dentro de scroll horizontal
className="min-w-[400px] flex-shrink-0"
```

**Animaciones de entrada:**

```jsx
// Fade + slide estándar para cualquier elemento que entre al viewport
const variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
};
```

**CSS de utilidad (añadir a `index.css`):**

```css
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
```

**Prohibido:**
- `transition-all duration-300` de Tailwind como única animación en elementos interactivos complejos.
- Animaciones de `transform` manuales en CSS para scroll.

---

## 6. FLUJO DE TRABAJO MCP

Claude Code opera con dos servidores MCP activos en esta terminal:

| Servidor MCP | Rol | Cuándo usarlo |
|---|---|---|
| `Supabase MCP` | Agente de Datos | Leer esquema, ejecutar queries, validar datos |
| `Chrome DevTools MCP` | Agente Visual/DOM | Inspeccionar componentes, validar render |

**Protocolo de uso:**
1. Antes de asumir el esquema de una tabla, usar `Supabase MCP` para hacer `SELECT` y verificar.
2. Usar `Chrome DevTools MCP` para validar que los componentes renderizan correctamente antes de dar una tarea por terminada.

---

## 7. REGLAS DE COMPORTAMIENTO — INNEGOCIABLES

### 7.1 Datos reales, nunca mock

```
❌ PROHIBIDO: const tools = [{ id: 1, titulo: "ChatGPT", ... }]
✅ OBLIGATORIO: const { data } = await supabase.from('contenido_diario').select('*')
```

Si Supabase no está disponible temporalmente, indicarlo explícitamente al usuario. **Nunca silenciar el error con datos inventados.**

### 7.2 Planificación antes de código

Antes de escribir cualquier bloque de código, Claude Code **debe**:

1. Describir en 3-5 líneas qué va a hacer.
2. Listar los componentes que va a crear o modificar.
3. Indicar si necesita consultar Supabase primero.
4. Pedir confirmación si la tarea es destructiva (borrar, refactorizar masivo).

**Formato de planificación:**

```
## Plan
- Acción: [qué se va a construir]
- Componentes afectados: [lista]
- Query Supabase necesaria: [sí/no — cuál]
- Archivos nuevos: [lista]
- Riesgo: [ninguno / bajo / medio / alto]
```

### 7.3 Modularización estricta

- **No existe el componente "God".** Nada de `Dashboard.jsx` con 400 líneas.
- Cada sección de la UI es un componente en `sections/`.
- Cada elemento reutilizable es un componente en `ui/`.
- Props tipadas con PropTypes o JSDoc como mínimo.

### 7.4 Consistencia de estilos al refactorizar

Al extraer un componente de código existente:
- Copiar las clases Tailwind exactas, sin "simplificar" a clases genéricas.
- No sustituir `bg-white/[0.03]` por `bg-gray-900` — son visualmente distintos.
- No eliminar `backdrop-blur-md` por performance sin comunicarlo.

### 7.6 Gestión de imágenes

Las imágenes del proyecto tienen dos orígenes:

- **Assets estáticos del sitio** (logo, favicon, og-image, placeholders) → servidos desde `/public/images/`.
- **Imágenes de contenido** (herramientas, noticias, prompts) → URLs externas almacenadas en el campo `imagen_url` de Supabase o en Supabase Storage.

**Regla de fallback obligatoria:** si `imagen_url` viene `null` o vacío desde Supabase, usar siempre el placeholder local. Nunca renderizar un `<img>` con `src` vacío o roto.

```jsx
// Patrón estándar para imágenes de contenido
<img
  src={imagen_url || '/images/placeholders/tool-default.webp'}
  alt={titulo}
  className="w-10 h-10 rounded-lg object-cover"
  onError={(e) => { e.target.src = '/images/placeholders/tool-default.webp'; }}
/>
```



### 7.7 Gestión de errores en Supabase

```jsx
// Patrón obligatorio para todas las queries
const { data, error } = await supabase.from('contenido_diario').select('*');
if (error) {
  console.error('[Supabase]', error.message);
  // Mostrar estado de error en UI, nunca fallar silenciosamente
  return;
}
```

---

## 8. PATRONES DE COMPONENTES DE REFERENCIA

### ProjectCard (tarjeta estándar)

```jsx
// Estructura esperada — Claude Code debe seguir este patrón
<motion.div
  variants={cardVariants}
  whileHover={{ y: -4, transition: { duration: 0.2 } }}
  className="min-w-[400px] flex-shrink-0 bg-white/[0.03] backdrop-blur-md
             border border-white/10 rounded-2xl p-5 cursor-pointer group"
>
  <div className="flex items-center gap-3 mb-3">
    <img src={imagen_url} className="w-10 h-10 rounded-lg object-cover" />
    <div>
      <h3 className="text-sm font-semibold text-white tracking-tight">{titulo}</h3>
      <span className="text-xs text-zinc-500">{etiqueta_ia}</span>
    </div>
    <Badge tipo={tipo} />
  </div>
  <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">{descripcion}</p>
</motion.div>
```

### RequestForm

```jsx
// Campos obligatorios del formulario de peticiones
// email (opcional) + peticion (textarea, requerido)
// Al hacer submit: INSERT en peticiones_comunidad con estado='pendiente'
// Mostrar feedback de éxito/error con animación Framer Motion
```

---

## 9. CHECKLIST ANTES DE MARCAR UNA TAREA COMO COMPLETA

- [ ] El componente está en la carpeta correcta dentro de `src/`.
- [ ] No hay datos hardcodeados — todo viene de Supabase o props.
- [ ] Las clases Tailwind siguen la paleta "Linear" definida en §5.
- [ ] Las animaciones usan Framer Motion (no CSS puro para movimientos).
- [ ] Los errores de Supabase se manejan y se comunican en la UI.
- [ ] El componente tiene un tamaño razonable (<120 líneas).
- [ ] Se usó `HorizontalScroll` para listas de tarjetas en scroll horizontal.
- [ ] No se introdujeron dependencias nuevas sin aprobación.

---

## 10. LO QUE NUNCA DEBE OCURRIR

| ❌ Antipatrón | ✅ Corrección |
|---|---|
| Mock data en lugar de query real | `supabase.from(...).select(...)` siempre |
| Modo claro o fondo blanco | `bg-black` / `bg-zinc-950` — sin excepciones |
| `useState` con array de objetos hardcodeados | Fetch desde Supabase en `useEffect` o custom hook |
| Animaciones con `transition-all` en scroll horizontal | `motion.div` con `drag="x"` |
| Componente monolítico >150 líneas | Dividir en subcomponentes inmediatamente |
| Omitir `backdrop-blur` en tarjetas | Es parte de la identidad visual, no opcional |
| Commitear `.env.local` | Verificar `.gitignore` antes de cualquier commit |

---

*Última actualización: generado automáticamente para AI Hub v1.0*
*Si este archivo entra en conflicto con una instrucción directa del usuario en el chat, la instrucción del chat tiene prioridad para esa tarea puntual, pero este documento sigue siendo la norma base.*
