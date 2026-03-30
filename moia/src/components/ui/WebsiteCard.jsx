import { motion } from 'framer-motion'
import { GitBranch, ExternalLink, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { GlossOverlay } from './GlossOverlay'
import { useDragScroll } from './HorizontalScroll'

const PLACEHOLDER = '/images/placeholders/tool-default.webp'

const STACK_COLORS = {
  'Next.js':     'bg-white/10 text-white',
  'React':       'bg-cyan-500/10 text-cyan-400',
  'Supabase':    'bg-emerald-500/10 text-emerald-400',
  'Tailwind CSS':'bg-sky-500/10 text-sky-400',
  'TypeScript':  'bg-blue-500/10 text-blue-400',
  'Vercel':      'bg-white/10 text-white',
}

const cardVariants = {
  rest:  { y: 0 },
  hover: { y: -4, transition: { duration: 0.2 } },
}

const imgVariants = {
  rest:  { scale: 1,    transition: { duration: 0.3 } },
  hover: { scale: 1.07, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
}

function StackBadge({ tech }) {
  const cls = STACK_COLORS[tech] || 'bg-white/5 text-zinc-400'
  return (
    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full
                      border border-white/10 ${cls}`}>
      {tech}
    </span>
  )
}

export function WebsiteCard({ item }) {
  const { titulo, descripcion, imagen_url, url, created_at, metadatos = {} } = item
  const { fotos_sitio = [], funcion, tech_stack = [], repo_github, conv_ia } = metadatos
  const navigate = useNavigate()
  const { isDragging } = useDragScroll()

  const date = created_at
    ? new Date(created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
    : ''

  return (
    <motion.div
      variants={cardVariants}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      onClick={() => { if (isDragging?.current) return; navigate(`/${item.tipo}/${item.id}`) }}
      className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden
                 hover:border-white/20 transition-colors cursor-pointer"
    >
      {/* Portada con zoom + gloss */}
      <div className="h-56 overflow-hidden relative">
        <motion.img
          src={imagen_url || fotos_sitio[0] || PLACEHOLDER}
          alt={titulo}
          className="w-full h-full object-cover"
          variants={imgVariants}
          onError={(e) => { e.target.src = PLACEHOLDER }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 to-transparent pointer-events-none" />
        <GlossOverlay />
        {date && (
          <div className="absolute top-3 right-3 flex items-center gap-1 text-[9px]
                          bg-black/60 backdrop-blur-sm text-zinc-400 px-2 py-1 rounded-full border border-white/10">
            <Calendar size={9} />
            <span>{date}</span>
          </div>
        )}
      </div>

      {/* Fotos secundarias */}
      {fotos_sitio.length > 1 && (
        <div className="flex gap-1 px-4 -mt-2 relative z-10">
          {fotos_sitio.slice(1, 4).map((src, i) => (
            <div key={i} className="h-10 flex-1 rounded-lg overflow-hidden border border-white/10">
              <img src={src} alt="" className="w-full h-full object-cover opacity-70"
                onError={(e) => { e.target.style.display = 'none' }} />
            </div>
          ))}
        </div>
      )}

      <div className="p-5">
        <h3 className="text-base font-bold text-white tracking-tight leading-snug mb-1">{titulo}</h3>
        {(funcion || descripcion) && (
          <p className="text-xs text-zinc-500 mb-3 leading-relaxed line-clamp-2">
            {funcion || descripcion}
          </p>
        )}

        {tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tech_stack.map((t) => <StackBadge key={t} tech={t} />)}
          </div>
        )}

        {conv_ia && (
          <div className="bg-black/40 border border-white/5 rounded-lg p-3 mb-4">
            <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1 font-bold">Prompt inicial</p>
            <p className="text-xs text-zinc-400 line-clamp-2 italic">"{conv_ia}"</p>
          </div>
        )}

        <div className="flex items-center gap-3 pt-3 border-t border-white/5">
          {repo_github && (
            <a href={repo_github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest
                         text-zinc-500 hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}>
              <GitBranch size={11} /> Repo
            </a>
          )}
          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest
                         text-violet-400 hover:text-violet-300 transition-colors ml-auto"
              onClick={(e) => e.stopPropagation()}>
              <ExternalLink size={11} /> Ver sitio
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
