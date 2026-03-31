import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabaseClient'

/**
 * LoginPage — Página de acceso al Admin Dashboard.
 * Standalone: sin Sidebar ni TopBar.
 */
export function LoginPage() {
  const navigate          = useNavigate()
  const [email, setEmail] = useState('')
  const [pass, setPass]   = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password: pass })

    setLoading(false)

    if (error) {
      setError('Credenciales incorrectas. Verifica tu email y contraseña.')
      return
    }

    navigate('/admin', { replace: true })
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      {/* Glow de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full" />
        <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-cyan-500/8 blur-[100px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-full max-w-sm"
      >
        {/* Cabecera */}
        <div className="text-center mb-8">
          <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-600 font-semibold">
            AI Hub
          </span>
          <h1 className="text-2xl font-black tracking-tighter text-white mt-2">
            Panel de Administración
          </h1>
          <p className="text-zinc-500 text-sm mt-1">Acceso restringido</p>
        </div>

        {/* Tarjeta formulario */}
        <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-400 tracking-wide uppercase">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="admin@aihub.com"
                className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600
                           focus:outline-none focus:border-violet-500/60 focus:bg-white/[0.06]
                           transition-colors duration-200"
              />
            </div>

            {/* Contraseña */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-400 tracking-wide uppercase">
                Contraseña
              </label>
              <input
                type="password"
                value={pass}
                onChange={e => setPass(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600
                           focus:outline-none focus:border-violet-500/60 focus:bg-white/[0.06]
                           transition-colors duration-200"
              />
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  key="error"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="text-xs text-red-400 text-center leading-relaxed"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Botón */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="mt-1 w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed
                         text-white text-sm font-semibold rounded-xl py-3
                         transition-colors duration-200 cursor-pointer"
            >
              {loading ? 'Verificando…' : 'Entrar'}
            </motion.button>

          </form>
        </div>
      </motion.div>
    </div>
  )
}
