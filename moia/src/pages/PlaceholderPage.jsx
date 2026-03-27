import { motion } from 'framer-motion'
import { Construction } from 'lucide-react'
import { Link } from 'react-router-dom'

export function PlaceholderPage({ title, icon: Icon = Construction }) {
  return (
    <div className="flex min-h-screen bg-background items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="text-center max-w-md px-8"
      >
        <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto mb-6">
          <Icon size={28} className="text-violet-400" />
        </div>
        <h1 className="text-3xl font-black tracking-tighter text-white mb-3">{title}</h1>
        <p className="text-sm text-zinc-500 leading-relaxed mb-8">
          Esta sección está en construcción. Pronto estará disponible con todo su contenido.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-violet-500/10 border border-violet-500/20
                     text-violet-400 text-xs font-bold uppercase tracking-widest rounded-lg
                     hover:bg-violet-500/20 transition-colors"
        >
          ← Volver al inicio
        </Link>
      </motion.div>
    </div>
  )
}
