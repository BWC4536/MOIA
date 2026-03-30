import { Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { RequestForm } from '../components/forms/RequestForm'

export function ContactoPage() {
  return (
    <main className="flex-1 px-12 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="max-w-xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10
                          flex items-center justify-center">
            <Mail size={18} className="text-violet-400" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-white">Contacto</h1>
            <p className="text-[10px] uppercase tracking-widest text-zinc-600 mt-0.5">
              Envía tu mensaje o propuesta
            </p>
          </div>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-8">
          <RequestForm />
        </div>
      </motion.div>
    </main>
  )
}
