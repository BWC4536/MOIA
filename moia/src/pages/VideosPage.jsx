import { Video } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useSupabase } from '../hooks/useSupabase'

const PLACEHOLDER = '/images/placeholders/tool-default.webp'

function VideoCard({ item }) {
  const navigate = useNavigate()
  const { titulo, descripcion, imagen_url, metadatos = {} } = item
  const { youtube_url, duracion } = metadatos

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={() => navigate(`/${item.tipo}/${item.id}`)}
      className="w-full bg-white/[0.03] backdrop-blur-md border border-white/10
                 rounded-2xl overflow-hidden hover:border-white/20 transition-colors cursor-pointer"
    >
      <div className="h-48 relative overflow-hidden bg-zinc-900">
        <img
          src={imagen_url || PLACEHOLDER}
          alt={titulo}
          className="w-full h-full object-cover opacity-80"
          onError={(e) => { e.target.src = PLACEHOLDER }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent pointer-events-none" />
        {duracion && (
          <span className="absolute bottom-3 right-3 text-[10px] font-bold bg-black/70 text-white
                           px-2 py-0.5 rounded-md border border-white/10">
            {duracion}
          </span>
        )}
        {youtube_url && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-red-500/80 flex items-center justify-center">
              <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-bold text-white tracking-tight leading-snug mb-1 line-clamp-2">
          {titulo}
        </h3>
        {descripcion && (
          <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">{descripcion}</p>
        )}
      </div>
    </motion.div>
  )
}

export function VideosPage() {
  const { data, loading, error } = useSupabase('contenido_diario', {
    where: { tipo: 'video' },
    order: 'created_at',
  })

  return (
    <main className="flex-1 px-4 py-6 md:px-12 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10
                          flex items-center justify-center">
            <Video size={18} className="text-violet-400" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-white">Videos</h1>
            {!loading && (
              <p className="text-[10px] uppercase tracking-widest text-zinc-600 mt-0.5">
                {data.length} vídeo{data.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>

        {loading && (
          <div className="text-zinc-600 text-sm animate-pulse py-20 text-center">Cargando vídeos…</div>
        )}
        {error && (
          <div className="text-red-400/70 text-sm py-20 text-center">Error al cargar: {error}</div>
        )}
        {!loading && !error && data.length === 0 && (
          <div className="text-zinc-600 text-sm py-20 text-center">No hay vídeos publicados aún.</div>
        )}
        {!loading && !error && data.length > 0 && (
          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-6 pt-2
                          md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:overflow-x-visible
                          md:snap-none md:pb-0 md:pt-0 md:gap-6">
            {data.map((item) => (
              <div key={item.id} className="w-[85vw] sm:w-[340px] shrink-0 snap-center md:w-auto">
                <VideoCard item={item} />
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </main>
  )
}
