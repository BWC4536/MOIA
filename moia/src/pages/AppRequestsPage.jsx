import { motion } from 'framer-motion'
import { HologramForm } from '../components/ui/HologramForm'

export function AppRequestsPage() {
  return (
    <main className="flex-1 px-12 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="max-w-lg mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-600 font-bold block mb-3">
            Canal de peticiones
          </span>
          <h1 className="text-4xl font-black tracking-tighter text-white mb-2">
            Solicitar algo al creador
          </h1>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Propón contenido, herramientas o ideas. Todas las peticiones son revisadas.
          </p>
        </div>

        <HologramForm submitLabel="Enviar Solicitud" showRRSS={false} />
      </motion.div>
    </main>
  )
}
