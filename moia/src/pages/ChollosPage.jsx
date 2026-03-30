import { Tag } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useSupabase } from '../hooks/useSupabase'

const PLACEHOLDER = '/images/placeholders/tool-default.webp'

function CholosCard({ item }) {
  const navigate = useNavigate()
  const { titulo, descripcion, imagen_url, url, metadatos = {} } = item
  const { precio_original, precio_chollo, descuento, valido_hasta } = metadatos

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={() => navigate(`/${item.tipo}/${item.id}`)}
      className="w-[320px] flex-shrink-0 bg-white/[0.03] backdrop-blur-md border border-white/10
                 rounded-2xl p-5 hover:border-white/20 transition-colors cursor-pointer"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-xl bg-zinc-900 border border-white/10 overflow-hidden shrink-0">
          <img
            src={imagen_url || PLACEHOLDER}
            alt={titulo}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = PLACEHOLDER }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-white tracking-tight leading-snug mb-1 truncate">
            {titulo}
          </h3>
          {descripcion && (
            <p className="text-xs text-zinc-500 leading-snug line-clamp-2">{descripcion}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 py-3 border-t border-b border-white/5 mb-4">
        {descuento && (
          <span className="text-emerald-400 text-sm font-black bg-emerald-500/10 border border-emerald-500/20
                           rounded-full px-3 py-1">
            {descuento}
          </span>
        )}
        {precio_original && (
          <span className="text-zinc-600 text-xs line-through">{precio_original}</span>
        )}
        {precio_chollo && (
          <span className="text-white text-sm font-bold ml-auto">{precio_chollo}</span>
        )}
      </div>

      {valido_hasta && (
        <p className="text-[10px] text-zinc-600 mb-3">
          Válido hasta: {new Date(valido_hasta).toLocaleDateString('es-ES')}
        </p>
      )}

      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="block w-full py-2 text-center text-[10px] font-black uppercase tracking-widest
                     text-violet-400 border border-violet-500/20 rounded-lg bg-violet-500/5
                     hover:bg-violet-500/10 transition-colors"
        >
          Ver oferta →
        </a>
      )}
    </motion.div>
  )
}

export function ChollosPage() {
  const { data, loading, error } = useSupabase('contenido_diario', {
    where: { tipo: 'chollo' },
    order: 'created_at',
  })

  return (
    <main className="flex-1 px-12 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10
                          flex items-center justify-center">
            <Tag size={18} className="text-violet-400" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-white">Chollos</h1>
            {!loading && (
              <p className="text-[10px] uppercase tracking-widest text-zinc-600 mt-0.5">
                {data.length} oferta{data.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>

        {loading && (
          <div className="text-zinc-600 text-sm animate-pulse py-20 text-center">Cargando chollos…</div>
        )}
        {error && (
          <div className="text-red-400/70 text-sm py-20 text-center">Error al cargar: {error}</div>
        )}
        {!loading && !error && data.length === 0 && (
          <div className="text-zinc-600 text-sm py-20 text-center">
            No hay chollos activos. ¡Vuelve pronto!
          </div>
        )}
        {!loading && !error && data.length > 0 && (
          <div className="flex flex-wrap gap-6">
            {data.map((item) => <CholosCard key={item.id} item={item} />)}
          </div>
        )}
      </motion.div>
    </main>
  )
}
