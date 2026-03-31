import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogOut } from 'lucide-react'
import { AdminForm } from '../components/forms/AdminForm'
import { supabase } from '../lib/supabaseClient'

export function AdminPage() {
  const navigate = useNavigate()

  async function handleSignOut() {
    await supabase.auth.signOut()
    navigate('/', { replace: true })
  }

  return (
    <main className="flex-1 px-12 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="max-w-2xl mx-auto"
      >
        <div className="mb-10 flex items-start justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">
              Panel de Control
            </span>
            <h1 className="text-4xl font-black tracking-tighter text-white mt-2">Admin Dashboard</h1>
            <p className="text-zinc-500 text-sm mt-2 leading-relaxed">
              Publica nuevo contenido. El formulario se adapta automáticamente según el tipo seleccionado.
            </p>
          </div>

          {/* Botón cerrar sesión */}
          <motion.button
            onClick={handleSignOut}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                       bg-white/[0.04] hover:bg-white/[0.07] border border-white/10
                       text-zinc-500 hover:text-zinc-300 text-xs transition-colors duration-200 cursor-pointer"
          >
            <LogOut size={12} />
            Cerrar sesión
          </motion.button>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-8">
          <AdminForm />
        </div>
      </motion.div>
    </main>
  )
}
