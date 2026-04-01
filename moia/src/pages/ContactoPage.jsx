import { motion } from 'framer-motion'
import { HologramForm } from '../components/ui/HologramForm'

export function ContactoPage() {
  return (
    <main className="flex-1 px-4 py-6 md:px-12 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="max-w-lg mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-600 font-bold block mb-3">
            Interfaz de comunicación
          </span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-white mb-2">Contacto</h1>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Envía tu mensaje directamente al creador.
          </p>
        </div>

        <HologramForm submitLabel="Enviar Mensaje" showRRSS={true} />
      </motion.div>
    </main>
  )
}
