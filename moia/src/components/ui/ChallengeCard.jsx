import { motion } from 'framer-motion'
import { Clock, Zap, Trophy, Images } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { GlossOverlay } from './GlossOverlay'
import { INSIGNIAS_CATALOGO } from '../../lib/insignias'
import { useDragScroll } from './HorizontalScroll'

const DIFFICULTY = {
  facil:      { label: 'Fácil',      cls: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  intermedio: { label: 'Intermedio', cls: 'text-yellow-400  bg-yellow-500/10  border-yellow-500/20'  },
  avanzado:   { label: 'Avanzado',   cls: 'text-red-400     bg-red-500/10     border-red-500/20'     },
}

const PLACEHOLDER = '/images/placeholders/tool-default.webp'

const cardVariants = {
  rest:  { y: 0 },
  hover: { y: -4, transition: { duration: 0.2 } },
}

const imgVariants = {
  rest:  { scale: 1,    transition: { duration: 0.3 } },
  hover: { scale: 1.07, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export function ChallengeCard({ item }) {
  const { titulo, descripcion, imagen_url, metadatos = {} } = item
  const {
    objetivo, tiempo_recomendado, dificultad = 'intermedio',
    id_insignia, galeria = [],
  } = metadatos

  const diff    = DIFFICULTY[dificultad] || DIFFICULTY.intermedio
  const insignia = id_insignia ? INSIGNIAS_CATALOGO.find((b) => b.id === id_insignia) : null
  const navigate = useNavigate()
  const { isDragging } = useDragScroll()

  return (
    <motion.div
      variants={cardVariants}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      onClick={() => { if (isDragging?.current) return; navigate(`/${item.tipo}/${item.id}`) }}
      className="w-full flex flex-col bg-white/[0.03] backdrop-blur-md border border-white/10
                 rounded-2xl overflow-hidden hover:border-white/20 transition-colors cursor-pointer"
    >
      {/* Portada con zoom + gloss */}
      <div className="h-44 shrink-0 overflow-hidden relative">
        <motion.img
          src={imagen_url || galeria[0] || PLACEHOLDER}
          alt={titulo}
          className="w-full h-full object-cover"
          variants={imgVariants}
          onError={(e) => { e.target.src = PLACEHOLDER }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent pointer-events-none" />
        <GlossOverlay />

        <div className={`absolute top-3 left-3 flex items-center gap-1 text-[10px] font-bold
                         uppercase tracking-widest px-2.5 py-1 rounded-full border ${diff.cls}`}>
          <Zap size={9} />
          {diff.label}
        </div>
      </div>

      <div className="flex-1 flex flex-col p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white tracking-tight leading-snug mb-1">{titulo}</h3>
            <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
              {objetivo || descripcion}
            </p>
          </div>
          {insignia && (
            <div className={`shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center
                             text-lg ${insignia.bg} ${insignia.border}`}
              title={`Insignia: ${insignia.nombre}`}>
              {insignia.emoji}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 py-3 border-t border-b border-white/5 mb-3">
          {tiempo_recomendado && (
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
              <Clock size={10} className="text-zinc-600" />
              <span>{tiempo_recomendado}</span>
            </div>
          )}
          {galeria.length > 0 && (
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
              <Images size={10} className="text-zinc-600" />
              <span>{galeria.length} imagen{galeria.length > 1 ? 'es' : ''}</span>
            </div>
          )}
          {insignia && (
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 ml-auto">
              <Trophy size={10} className="text-zinc-600" />
              <span>{insignia.nombre}</span>
            </div>
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          className="mt-auto w-full py-2 text-[10px] font-black uppercase tracking-widest
                     text-violet-400 border border-violet-500/20 rounded-lg
                     bg-violet-500/5 hover:bg-violet-500/10 transition-colors"
        >
          Aceptar reto →
        </motion.button>
      </div>
    </motion.div>
  )
}
