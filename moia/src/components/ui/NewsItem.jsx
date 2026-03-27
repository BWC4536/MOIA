import { motion } from 'framer-motion'

export function NewsItem({ item, index }) {
  const { titulo, descripcion, url, created_at } = item

  const date = created_at
    ? new Date(created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
    : ''

  const handleClick = () => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.07, ease: 'easeOut' }}
      onClick={handleClick}
      className="p-6 bg-surface-container border border-white/5 rounded-xl flex gap-6 items-center
                 hover:bg-surface-bright transition-colors cursor-pointer group"
    >
      <span className="text-3xl font-black text-white/10 group-hover:text-violet-400 transition-colors
                       tabular-nums w-10 shrink-0 select-none">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="flex-1 min-w-0">
        <h4 className="text-base font-bold text-white tracking-tight leading-snug">{titulo}</h4>
        {descripcion && (
          <p className="text-on-surface-variant text-sm mt-1 line-clamp-1">{descripcion}</p>
        )}
      </div>
      <span className="text-[10px] uppercase tracking-widest text-zinc-500 shrink-0">{date}</span>
    </motion.div>
  )
}
