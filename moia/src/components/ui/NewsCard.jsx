import { motion } from 'framer-motion'
import { Bookmark, AtSign, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { GlossOverlay } from './GlossOverlay'
import { useDragScroll } from './HorizontalScroll'

const PLACEHOLDER = '/images/placeholders/tool-default.webp'

const cardVariants = {
  rest:  { y: 0 },
  hover: { y: -4, transition: { duration: 0.2 } },
}

const imgVariants = {
  rest:  { scale: 1,    transition: { duration: 0.3 } },
  hover: { scale: 1.07, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
}

/** Tarjeta rica para tipo: 'noticia' — altura fija para alineación perfecta en carrusel */
export function NewsCard({ item, index }) {
  const { titulo, descripcion, imagen_url, imagen, url, created_at, metadatos = {} } = item
  const imgSrc = imagen_url || imagen || PLACEHOLDER
  const { menciones = [], imagenes = [] } = metadatos
  const navigate = useNavigate()
  const { isDragging } = useDragScroll()

  const date = created_at
    ? new Date(created_at).toLocaleDateString('es-ES', {
        day: 'numeric', month: 'short', year: 'numeric',
      })
    : ''

  return (
    <motion.div
      variants={cardVariants}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={() => { if (isDragging?.current) return; navigate(`/${item.tipo}/${item.id}`) }}
      className="min-h-[440px] w-full flex flex-col bg-white/[0.03] backdrop-blur-md
                 border border-white/10 rounded-2xl overflow-hidden cursor-pointer
                 hover:border-white/20 transition-colors"
    >
      {/* Portada con zoom + gloss */}
      <div className="h-52 shrink-0 overflow-hidden relative">
        <motion.img
          src={imgSrc}
          alt={titulo}
          className="w-full h-full object-cover"
          variants={imgVariants}
          onError={(e) => { e.target.src = PLACEHOLDER }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent pointer-events-none" />
        <GlossOverlay />

        {date && (
          <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-[10px]
                          uppercase tracking-widest text-zinc-400 font-medium">
            <Calendar size={10} />
            <span>{date}</span>
          </div>
        )}
      </div>

      {/* Contenido — flex-1 para llenar la altura restante */}
      <div className="flex-1 flex flex-col p-5 min-h-0">
        <h3 className="text-base font-bold text-white tracking-tight leading-snug mb-2 line-clamp-2">
          {titulo}
        </h3>
        {descripcion && (
          <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2 mb-3">{descripcion}</p>
        )}

        {/* Imágenes descriptivas */}
        {imagenes.length > 0 && (
          <div className="flex gap-2 mb-3 overflow-hidden">
            {imagenes.slice(0, 3).map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="h-12 w-16 object-cover rounded-lg shrink-0 opacity-70"
                onError={(e) => { e.target.style.display = 'none' }}
              />
            ))}
          </div>
        )}

        {/* Footer — siempre al fondo gracias a mt-auto */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
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
          <div className="flex items-center gap-3 shrink-0">
            {url && (
              <a href={url} target="_blank" rel="noopener noreferrer"
                className="text-[10px] font-bold uppercase tracking-widest text-violet-400
                           hover:text-violet-300 transition-colors"
                onClick={(e) => e.stopPropagation()}
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
