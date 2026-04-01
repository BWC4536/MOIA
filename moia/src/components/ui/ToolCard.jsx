import { motion } from 'framer-motion'
import { Check, X, ExternalLink, Tag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDragScroll } from './HorizontalScroll'

const PLACEHOLDER = '/images/placeholders/tool-default.webp'

/** Tarjeta para tipo: 'herramienta' / 'app' / 'skill' */
export function ToolCard({ item }) {
  const { titulo, imagen_url, etiqueta_ia, metadatos = {} } = item
  const {
    logo,
    precio,
    categoria,
    link,
    pros = [],
    cons = [],
  } = metadatos
  const navigate = useNavigate()
  const { isDragging } = useDragScroll()

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={() => { if (isDragging?.current) return; navigate(`/${item.tipo}/${item.id}`) }}
      className="w-full bg-white/[0.03] backdrop-blur-md border border-white/10
                 rounded-2xl p-5 hover:border-white/20 transition-colors cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/10 overflow-hidden shrink-0
                        flex items-center justify-center">
          <img
            src={logo || imagen_url || PLACEHOLDER}
            alt={titulo}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = PLACEHOLDER }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-white tracking-tight truncate">{titulo}</h3>
          <div className="flex items-center gap-2 mt-0.5">
            {categoria && (
              <span className="flex items-center gap-1 text-[9px] text-zinc-500 uppercase tracking-widest">
                <Tag size={8} /> {categoria}
              </span>
            )}
            {etiqueta_ia && (
              <span className="text-[9px] text-zinc-600">· {etiqueta_ia}</span>
            )}
          </div>
        </div>
        {precio && (
          <span className="shrink-0 text-[10px] font-black text-emerald-400 bg-emerald-500/10
                           border border-emerald-500/20 rounded-full px-2.5 py-1">
            {precio}
          </span>
        )}
      </div>

      {/* Pros / Cons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {pros.length > 0 && (
          <div>
            <p className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold mb-2">Pros</p>
            <ul className="space-y-1.5">
              {pros.slice(0, 3).map((p, i) => (
                <li key={i} className="flex items-start gap-1.5 text-[11px] text-zinc-400 leading-snug">
                  <Check size={10} className="text-emerald-400 mt-0.5 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        )}
        {cons.length > 0 && (
          <div>
            <p className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold mb-2">Contras</p>
            <ul className="space-y-1.5">
              {cons.slice(0, 3).map((c, i) => (
                <li key={i} className="flex items-start gap-1.5 text-[11px] text-zinc-400 leading-snug">
                  <X size={10} className="text-red-400 mt-0.5 shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* CTA */}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2 mt-2
                     text-[10px] font-black uppercase tracking-widest text-violet-400
                     border border-violet-500/20 rounded-lg bg-violet-500/5
                     hover:bg-violet-500/10 transition-colors"
        >
          <ExternalLink size={11} /> Visitar herramienta
        </a>
      )}
    </motion.div>
  )
}
