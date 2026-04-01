import { motion } from 'framer-motion'
import { Bookmark } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Badge } from './Badge'
import { useDragScroll } from './HorizontalScroll'

const PLACEHOLDER = '/images/placeholders/tool-default.webp'

export function ProjectCard({ item }) {
  const { titulo, descripcion, imagen_url, imagen, etiqueta_ia, tipo, url } = item
  const imgSrc = imagen_url || imagen || PLACEHOLDER
  const navigate = useNavigate()
  const { isDragging } = useDragScroll()

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={() => { if (isDragging?.current) return; navigate(`/${item.tipo}/${item.id}`) }}
      className="w-full bg-surface-container rounded-xl overflow-hidden
                 border border-transparent hover:border-white/10 transition-colors group cursor-pointer"
    >
      <div className="h-56 w-full overflow-hidden bg-zinc-900">
        <img
          src={imgSrc}
          alt={titulo}
          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = PLACEHOLDER }}
        />
      </div>

      <div className="p-6">
        <div className="flex gap-2 mb-4 flex-wrap">
          <Badge tipo={tipo} />
          {etiqueta_ia && (
            <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-1 rounded
                             bg-white/5 border border-white/10 text-zinc-400">
              {etiqueta_ia}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{titulo}</h3>
        <p className="text-on-surface-variant text-sm line-clamp-2 mb-6 leading-relaxed">{descripcion}</p>

        <div className="flex items-center justify-between">
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-bold uppercase tracking-widest text-violet-400
                         hover:text-violet-300 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Ver proyecto →
            </a>
          ) : <span />}
          <button className="text-zinc-500 hover:text-white transition-colors p-1">
            <Bookmark size={15} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
