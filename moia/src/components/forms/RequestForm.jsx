import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, AlertCircle } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'

export function RequestForm() {
  const [email, setEmail]       = useState('')
  const [peticion, setPeticion] = useState('')
  const [status, setStatus]     = useState('idle') // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!peticion.trim()) return

    setStatus('loading')
    const { error } = await supabase
      .from('peticiones_comunidad')
      .insert({ email: email.trim() || null, peticion: peticion.trim() })

    if (error) {
      console.error('[Supabase:peticiones_comunidad]', error.message)
      setStatus('error')
    } else {
      setStatus('success')
      setEmail('')
      setPeticion('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 ml-1 block">
          Tu Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nombre@ejemplo.com"
          className="w-full bg-black border border-white/10 rounded-lg px-6 py-4 text-on-surface
                     placeholder:text-zinc-700 focus:border-violet-500 focus:outline-none transition-colors"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 ml-1 block">
          Tu Propuesta
        </label>
        <textarea
          value={peticion}
          onChange={(e) => setPeticion(e.target.value)}
          placeholder="Describe tu idea..."
          required
          rows={4}
          className="w-full bg-black border border-white/10 rounded-lg px-6 py-4 text-on-surface
                     placeholder:text-zinc-700 focus:border-violet-500 focus:outline-none transition-colors
                     resize-none"
        />
      </div>

      <AnimatePresence mode="wait">
        {status === 'success' && (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-emerald-400 text-sm"
          >
            <Check size={14} /> ¡Propuesta enviada! Gracias por contribuir.
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            key="err"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-red-400 text-sm"
          >
            <AlertCircle size={14} /> Error al enviar. Inténtalo de nuevo.
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === 'loading' || !peticion.trim()}
        className="w-full py-4 bg-white text-black font-black uppercase tracking-widest text-xs
                   rounded-lg hover:bg-violet-400 hover:text-white transition-colors
                   disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Enviando...' : 'Enviar Solicitud'}
      </button>
    </form>
  )
}
