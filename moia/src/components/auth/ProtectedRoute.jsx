import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabaseClient'

/**
 * ProtectedRoute — Envuelve rutas que requieren sesión activa.
 * Si no hay sesión, redirige a /login.
 * Mientras verifica, muestra un loader con estética neón.
 */
export function ProtectedRoute({ children }) {
  const [session, setSession]   = useState(undefined) // undefined = verificando
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    // Verificación inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Escucha cambios de estado (logout desde otra pestaña, expiración, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-black">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-4"
        >
          {/* Spinner neón */}
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-full border-2 border-violet-500/20" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-violet-400"
            />
          </div>
          <span className="text-xs text-zinc-600 tracking-widest uppercase">Verificando sesión</span>
        </motion.div>
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return children
}
