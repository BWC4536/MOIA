-- ============================================================
-- MOIA · AI Hub — Migración FASE 3
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Tablas base (idempotente: solo crea si no existen)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contenido_diario (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo       TEXT NOT NULL,
  tipo         TEXT CHECK (tipo IN ('app', 'noticia', 'prompt', 'skill', 'web', 'reto', 'herramienta', 'youtube')),
  descripcion  TEXT,
  url          TEXT,
  etiqueta_ia  TEXT,
  imagen_url   TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS suscriptores (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS peticiones_comunidad (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT,
  peticion   TEXT NOT NULL,
  estado     TEXT DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'completado')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Columna metadatos JSONB en contenido_diario
-- ─────────────────────────────────────────────────────────────
ALTER TABLE contenido_diario
  ADD COLUMN IF NOT EXISTS metadatos JSONB DEFAULT '{}';

-- 3. Tabla perfiles_usuario con insignias
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS perfiles_usuario (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID UNIQUE,               -- referencia a auth.users (opcional)
  nombre      TEXT DEFAULT 'Guest User',
  plan        TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
  avatar_url  TEXT,
  insignias   JSONB DEFAULT '[]',        -- array de IDs: ["badge-001", "badge-003"]
  puntos      INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Datos de ejemplo para desarrollo
-- ─────────────────────────────────────────────────────────────

-- Noticia con metadatos ricos
INSERT INTO contenido_diario (titulo, tipo, descripcion, url, etiqueta_ia, imagen_url, metadatos) VALUES
(
  'GPT-5 llega con capacidades de razonamiento nunca vistas',
  'noticia',
  'OpenAI lanza su modelo más avanzado con mejoras drásticas en matemáticas, código y razonamiento multimodal.',
  'https://openai.com',
  'ChatGPT',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
  '{
    "imagenes": ["https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=600"],
    "menciones": ["@sama", "@openai"],
    "articulo_completo": "El lanzamiento de GPT-5 marca un hito histórico en la IA generativa..."
  }'
),
(
  'Claude 4 supera a GPT-5 en benchmarks de código',
  'noticia',
  'Anthropic publica resultados que muestran superioridad en tareas de programación avanzada.',
  'https://anthropic.com',
  'Claude',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800',
  '{
    "imagenes": [],
    "menciones": ["@anthropic", "@darioamodei"],
    "articulo_completo": "En pruebas realizadas sobre HumanEval y SWE-bench..."
  }'
);

-- Web creada con IA
INSERT INTO contenido_diario (titulo, tipo, descripcion, url, etiqueta_ia, imagen_url, metadatos) VALUES
(
  'Dashboard SaaS construido en 4 horas con v0',
  'web',
  'De prompt a producción: cómo crear un panel de analítica completo usando solo IA.',
  'https://v0.dev',
  'v0',
  'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800',
  '{
    "fotos_sitio": ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600"],
    "funcion": "Panel de analytics con métricas en tiempo real",
    "tech_stack": ["Next.js", "Supabase", "Tailwind CSS", "Recharts"],
    "conv_ia": "Prompt inicial: Crea un dashboard SaaS con modo oscuro...",
    "repo_github": "https://github.com",
    "fotos_automatizacion": []
  }'
);

-- Reto
INSERT INTO contenido_diario (titulo, tipo, descripcion, url, etiqueta_ia, imagen_url, metadatos) VALUES
(
  'Crea tu primer agente autónomo con Claude',
  'reto',
  'Construye un agente que investigue, redacte y publique contenido de forma autónoma.',
  null,
  'Claude',
  'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800',
  '{
    "objetivo": "Implementar un agente con memoria persistente y herramientas de búsqueda web",
    "tiempo_recomendado": "3-4 horas",
    "dificultad": "intermedio",
    "id_insignia": "badge-001",
    "galeria": ["https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600"]
  }'
);

-- Herramienta
INSERT INTO contenido_diario (titulo, tipo, descripcion, url, etiqueta_ia, imagen_url, metadatos) VALUES
(
  'Cursor — El IDE potenciado por IA',
  'herramienta',
  'Editor de código con IA integrada que entiende todo tu proyecto.',
  'https://cursor.sh',
  'Claude',
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800',
  '{
    "logo": "https://cursor.sh/favicon.ico",
    "precio": "Gratis / $20 mes",
    "categoria": "Desarrollo",
    "link": "https://cursor.sh",
    "pros": ["Contexto de proyecto completo", "Edición multi-archivo", "Chat con el codebase"],
    "cons": ["Requiere suscripción para uso intensivo", "Basado en VSCode"]
  }'
);

-- Prompt
INSERT INTO contenido_diario (titulo, tipo, descripcion, url, etiqueta_ia, imagen_url, metadatos) VALUES
(
  'Prompt maestro para análisis de competencia',
  'prompt',
  'Analiza cualquier empresa competidora y obtén un informe estratégico completo.',
  null,
  'ChatGPT',
  null,
  '{
    "bloques_codigo": [
      "Actúa como estratega de negocios experto. Analiza [EMPRESA] considerando:\n1. Propuesta de valor única\n2. Segmento de clientes objetivo\n3. Canales de distribución\n4. Fuentes de ingresos\n5. Ventajas competitivas\n\nFormato: Tabla comparativa + análisis FODA.",
      "Ahora identifica las 3 oportunidades de mercado que [MI_EMPRESA] puede aprovechar basándote en las debilidades de [EMPRESA]."
    ],
    "resumen_puntos": [
      "Obtén un análisis FODA estructurado de cualquier competidor",
      "Identifica brechas de mercado explotables en minutos",
      "Genera estrategias de diferenciación accionables"
    ],
    "youtube_url": null
  }'
);

-- 5. Perfil de usuario de ejemplo con algunas insignias desbloqueadas
-- ─────────────────────────────────────────────────────────────
INSERT INTO perfiles_usuario (nombre, plan, insignias, puntos) VALUES
(
  'Guest User',
  'pro',
  '["badge-002", "badge-004"]',
  340
);
