import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Copy, Check, ExternalLink, Calendar, Tag } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import { Badge } from '../components/ui/Badge'

const PLACEHOLDER = '/images/placeholders/tool-default.webp'

/* ─── Utilidades ─────────────────────────────────────────────── */

/** Extrae el video ID de cualquier formato de URL de YouTube */
function extractYoutubeId(url = '') {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/\s]{11})/,
  ]
  for (const re of patterns) {
    const match = url.match(re)
    if (match) return match[1]
  }
  return null
}

/** Fecha legible en español */
function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('es-ES', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

/* ─── Loader ─────────────────────────────────────────────────── */

function Loader() {
  return (
    <main className="flex-1 flex items-center justify-center py-32">
      <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-12 flex flex-col items-center gap-5">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-2 border-violet-500/20" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-violet-400"
          />
        </div>
        <span className="text-xs text-zinc-600 tracking-widest uppercase">Cargando contenido</span>
      </div>
    </main>
  )
}

/* ─── Botón Volver ───────────────────────────────────────────── */

function BackButton({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: -3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="inline-flex items-center gap-2 text-zinc-500 hover:text-cyan-400
                 text-xs uppercase tracking-widest font-bold transition-colors mb-10 cursor-pointer"
    >
      <ArrowLeft size={13} /> Volver
    </motion.button>
  )
}

/* ─── Meta chips ─────────────────────────────────────────────── */

function MetaRow({ tipo, etiqueta_ia, created_at }) {
  return (
    <div className="flex gap-2 items-center mb-4 flex-wrap">
      <Badge tipo={tipo} />
      {etiqueta_ia && (
        <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-1 rounded
                         bg-white/5 border border-white/10 text-zinc-400 flex items-center gap-1">
          <Tag size={8} /> {etiqueta_ia}
        </span>
      )}
      {created_at && (
        <span className="flex items-center gap-1.5 text-[10px] text-zinc-600 ml-auto">
          <Calendar size={10} /> {formatDate(created_at)}
        </span>
      )}
    </div>
  )
}

/* ─── VISTA: Prompt ──────────────────────────────────────────── */

function PromptView({ item }) {
  const { titulo, descripcion, etiqueta_ia, tipo, created_at, metadatos = {} } = item

  // El contenido completo vive en metadatos.bloques_codigo (array).
  // Si hay varios bloques los unimos con separador; si el campo no existe
  // caemos a descripcion como último recurso.
  const bloques = Array.isArray(metadatos.bloques_codigo)
    ? metadatos.bloques_codigo.filter(Boolean)
    : []
  const promptText = bloques.length > 0
    ? bloques.join('\n\n――――――――――――――――――――――――――――――\n\n')
    : (metadatos.prompt_completo || metadatos.contenido || descripcion || '')

  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(promptText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <>
      <MetaRow tipo={tipo} etiqueta_ia={etiqueta_ia} created_at={created_at} />

      <h1 className="text-4xl font-black tracking-tighter text-white mb-3 leading-tight">
        {titulo}
      </h1>

      {/* Descripción corta como subtítulo */}
      {descripcion && (
        <p className="text-zinc-400 text-base leading-relaxed mb-6">{descripcion}</p>
      )}

      {/* Bloque de código con botón copiar */}
      <div className="relative group mb-8">
        {/* Barra superior estilo editor */}
        <div className="flex items-center justify-between px-4 py-2.5
                        bg-white/[0.04] border border-white/10 border-b-white/5
                        rounded-t-2xl">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
          </div>
          <span className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold">prompt</span>

          {/* Botón copiar integrado en la barra */}
          <motion.button
            onClick={handleCopy}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg
                       bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30
                       text-cyan-400 text-[10px] font-bold tracking-wide cursor-pointer
                       transition-colors duration-200"
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="check"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1.5"
                >
                  <Check size={11} /> ¡Copiado!
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1.5"
                >
                  <Copy size={11} /> Copiar Código
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Cuerpo del bloque */}
        <div className="bg-black/40 backdrop-blur-md border border-white/10 border-t-0
                        rounded-b-2xl p-6">
          <pre className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-mono
                          overflow-x-auto">
            {promptText || 'Sin contenido.'}
          </pre>
        </div>
      </div>
    </>
  )
}

/* ─── VISTA: Video ───────────────────────────────────────────── */

function VideoView({ item }) {
  const { titulo, descripcion, etiqueta_ia, tipo, url, created_at, metadatos = {} } = item
  const youtubeUrl = metadatos.youtube_url || url || ''
  const videoId = extractYoutubeId(youtubeUrl)

  return (
    <>
      <MetaRow tipo={tipo} etiqueta_ia={etiqueta_ia} created_at={created_at} />

      <h1 className="text-4xl font-black tracking-tighter text-white mb-6 leading-tight">
        {titulo}
      </h1>

      {/* Embed YouTube 16:9 */}
      {videoId ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative w-full mb-8 rounded-2xl overflow-hidden bg-zinc-900
                     border border-white/10"
          style={{ paddingTop: '56.25%' }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
            title={titulo}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </motion.div>
      ) : (
        <div className="w-full h-56 rounded-2xl bg-zinc-900 border border-white/10 mb-8
                        flex items-center justify-center">
          <p className="text-zinc-600 text-sm">URL de vídeo no disponible.</p>
        </div>
      )}

      {/* Descripción y puntos clave */}
      {descripcion && (
        <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-3">
            Descripción
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">{descripcion}</p>
        </div>
      )}

      {metadatos.puntos_clave && (
        <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-6">
          <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4">
            Puntos clave
          </h2>
          <ul className="flex flex-col gap-2">
            {(Array.isArray(metadatos.puntos_clave)
              ? metadatos.puntos_clave
              : String(metadatos.puntos_clave).split('\n').filter(Boolean)
            ).map((punto, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                {punto}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

/* ─── VISTA: Chollo ──────────────────────────────────────────── */

function CholloView({ item }) {
  const { titulo, descripcion, imagen_url, etiqueta_ia, tipo, url, created_at, metadatos = {} } = item
  const precioOriginal = metadatos.precio_original ?? null
  const precioFinal    = metadatos.precio_final ?? null
  const descuento      = metadatos.descuento ?? null

  return (
    <>
      <MetaRow tipo={tipo} etiqueta_ia={etiqueta_ia} created_at={created_at} />

      {/* Imagen */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full h-64 rounded-2xl overflow-hidden mb-8 bg-zinc-900 border border-white/10"
      >
        <img
          src={imagen_url || PLACEHOLDER}
          alt={titulo}
          className="w-full h-full object-cover opacity-85"
          onError={e => { e.target.src = PLACEHOLDER }}
        />
      </motion.div>

      <h1 className="text-4xl font-black tracking-tighter text-white mb-6 leading-tight">
        {titulo}
      </h1>

      {/* Bloque de precios */}
      {(precioOriginal || precioFinal || descuento) && (
        <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-8
                        flex items-center gap-8 flex-wrap">
          {precioOriginal && (
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">
                Precio original
              </span>
              <span className="text-2xl font-black text-red-500/70 line-through">
                {precioOriginal}
              </span>
            </div>
          )}
          {precioFinal && (
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                Precio final
              </span>
              <span className="text-3xl font-black text-cyan-400">
                {precioFinal}
              </span>
            </div>
          )}
          {descuento && (
            <div className="ml-auto">
              <span className="px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/30
                               text-green-400 text-xl font-black">
                -{descuento}
              </span>
            </div>
          )}
        </div>
      )}

      {descripcion && (
        <p className="text-gray-300 text-base leading-relaxed mb-8">{descripcion}</p>
      )}

      {/* CTA principal */}
      {url && (
        <motion.a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl
                     bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40
                     text-cyan-300 font-black text-sm tracking-tight
                     transition-colors duration-200"
        >
          Aprovechar Chollo <ExternalLink size={14} />
        </motion.a>
      )}
    </>
  )
}

/* ─── VISTA: Artículo (noticias, herramientas, webs, skills, app) */

function ArticleView({ item }) {
  const { titulo, descripcion, imagen_url, etiqueta_ia, tipo, url, created_at, metadatos = {} } = item
  const hasImage = !!(imagen_url)
  const bodyText = metadatos.contenido || metadatos.cuerpo || null

  return (
    <>
      {/* Hero image */}
      {hasImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
          className="w-full h-72 rounded-2xl overflow-hidden mb-8 bg-zinc-900
                     border border-white/10 shadow-lg shadow-black/40"
        >
          <img
            src={imagen_url}
            alt={titulo}
            className="w-full h-full object-cover opacity-80"
            onError={e => { e.target.src = PLACEHOLDER }}
          />
        </motion.div>
      )}

      <MetaRow tipo={tipo} etiqueta_ia={etiqueta_ia} created_at={created_at} />

      <h1 className="text-4xl font-black tracking-tighter text-white mb-4 leading-tight">
        {titulo}
      </h1>

      {descripcion && (
        <p className="text-gray-300 text-base leading-relaxed mb-8">
          {descripcion}
        </p>
      )}

      {bodyText && (
        <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-8
                        text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
          {bodyText}
        </div>
      )}

      {url && (
        <motion.a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                     bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/40
                     text-violet-300 font-bold text-sm tracking-tight
                     transition-colors duration-200"
        >
          Visitar Enlace <ExternalLink size={14} />
        </motion.a>
      )}
    </>
  )
}

/* ─── Página principal ───────────────────────────────────────── */

export function DetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    async function fetchItem() {
      const { data, error } = await supabase
        .from('contenido_diario')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('[Supabase]', error.message)
        setError(error.message)
      } else {
        setItem(data)
      }
      setLoading(false)
    }
    fetchItem()
  }, [id])

  if (loading) return <Loader />

  if (error || !item) return (
    <main className="flex-1 flex items-center justify-center py-20">
      <div className="text-center">
        <p className="text-red-400/80 text-sm mb-6">No se pudo cargar el contenido.</p>
        <button
          onClick={() => navigate(-1)}
          className="text-violet-400 text-xs font-bold uppercase tracking-widest
                     hover:text-violet-300 transition-colors cursor-pointer"
        >
          ← Volver
        </button>
      </div>
    </main>
  )

  const tipo = item.tipo || ''

  function renderBody() {
    switch (tipo) {
      case 'prompt':
      case 'prompts':
        return <PromptView item={item} />

      case 'video':
      case 'videos':
        return <VideoView item={item} />

      case 'chollo':
      case 'chollos':
        return <CholloView item={item} />

      default:
        // noticias, herramientas, webs, skills, app, …
        return <ArticleView item={item} />
    }
  }

  return (
    <main className="flex-1 px-12 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="max-w-3xl mx-auto"
      >
        <BackButton onClick={() => navigate(-1)} />
        {renderBody()}
      </motion.div>
    </main>
  )
}
