import { motion } from 'framer-motion'
import { Bookmark, AtSign, Calendar } from 'lucide-react'

const PLACEHOLDER = '/images/placeholders/tool-default.webp'

/** Tarjeta rica para tipo: 'noticia' */
export function NewsCard({ item, index }) {
  const { titulo, descripcion, imagen_url, url, created_at, metadatos = {} } = item
  const { menciones = [], imagenes = [] } = metadatos

  const date = created_at
    ? new Date(created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
    : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden group
                 hover:border-white/20 transition-colors"
    >
      {/* Portada con zoom Framer Motion */}
      <div className="h-52 overflow-hidden relative">
        <motion.img
          src={imagen_url || PLACEHOLDER}
          alt={titulo}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          onError={(e) => { e.target.src = PLACEHOLDER }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent pointer-events-none" />

        {/* Fecha flotante */}
        {date && (
          <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-[10px]
                          uppercase tracking-widest text-zinc-400 font-medium">
            <Calendar size={10} />
            <span>{date}</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-base font-bold text-white tracking-tight leading-snug mb-2 line-clamp-2">
          {titulo}
        </h3>
        {descripcion && (
          <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2 mb-4">{descripcion}</p>
        )}

        {/* Imágenes descriptivas */}
        {imagenes.length > 0 && (
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {imagenes.slice(0, 3).map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="h-14 w-20 object-cover rounded-lg shrink-0 opacity-70"
                onError={(e) => { e.target.style.display = 'none' }}
              />
            ))}
          </div>
        )}

        {/* Footer: menciones + guardar */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div className="flex gap-2 flex-wrap">
            {menciones.slice(0, 2).map((m) => (
              <span key={m}
                className="flex items-center gap-1 text-[10px] text-zinc-500 bg-white/5
                           border border-white/10 rounded-full px-2 py-0.5">
                <AtSign size={8} />
                {m.replace('@', '')}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold uppercase tracking-widest text-violet-400 hover:text-violet-300 transition-colors"
              >
                Leer →
              </a>
            )}
            <button className="text-zinc-600 hover:text-white transition-colors p-1">
              <Bookmark size={13} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
