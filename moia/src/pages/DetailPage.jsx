import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Calendar } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import { Badge } from '../components/ui/Badge'

const PLACEHOLDER = '/images/placeholders/tool-default.webp'

export function DetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  if (loading) return (
    <main className="flex-1 flex items-center justify-center py-20">
      <div className="text-zinc-600 text-sm animate-pulse">Cargando contenido...</div>
    </main>
  )

  if (error || !item) return (
    <main className="flex-1 flex items-center justify-center py-20">
      <div className="text-center">
        <p className="text-red-400/80 text-sm mb-6">No se pudo cargar el contenido.</p>
        <button
          onClick={() => navigate(-1)}
          className="text-violet-400 text-xs font-bold uppercase tracking-widest hover:text-violet-300 transition-colors"
        >
          ← Volver
        </button>
      </div>
    </main>
  )

  const { titulo, descripcion, imagen_url, etiqueta_ia, tipo, url, created_at, metadatos = {} } = item

  const date = created_at
    ? new Date(created_at).toLocaleDateString('es-ES', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : ''

  const hasImage = imagen_url || tipo === 'noticia'

  return (
    <main className="flex-1 px-12 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="max-w-3xl mx-auto"
      >
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-xs
                     uppercase tracking-widest font-bold transition-colors mb-10"
        >
          <ArrowLeft size={13} /> Volver
        </button>

        {/* Cover */}
        {hasImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
            className="w-full h-72 rounded-2xl overflow-hidden mb-8 bg-zinc-900"
          >
            <img
              src={imagen_url || PLACEHOLDER}
              alt={titulo}
              className="w-full h-full object-cover opacity-80"
              onError={(e) => { e.target.src = PLACEHOLDER }}
            />
          </motion.div>
        )}

        {/* Meta */}
        <div className="flex gap-2 items-center mb-4 flex-wrap">
          <Badge tipo={tipo} />
          {etiqueta_ia && (
            <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-1 rounded
                             bg-white/5 border border-white/10 text-zinc-400">
              {etiqueta_ia}
            </span>
          )}
          {date && (
            <span className="flex items-center gap-1.5 text-[10px] text-zinc-600 ml-auto">
              <Calendar size={10} /> {date}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl font-black tracking-tighter text-white mb-4 leading-tight">
          {titulo}
        </h1>

        {/* Description */}
        {descripcion && (
          <p className="text-zinc-400 text-base leading-relaxed mb-8">
            {descripcion}
          </p>
        )}

        {/* Rich content from metadatos */}
        {metadatos?.contenido && (
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 mb-8
                          text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
            {metadatos.contenido}
          </div>
        )}

        {/* CTA */}
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-violet-500 text-white
                       rounded-lg font-bold text-sm tracking-tight hover:bg-violet-400 transition-colors"
          >
            {tipo === 'noticia' ? 'Leer artículo completo' : 'Visitar sitio'}
            <ExternalLink size={14} />
          </a>
        )}
      </motion.div>
    </main>
  )
}
