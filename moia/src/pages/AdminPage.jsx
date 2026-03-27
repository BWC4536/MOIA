import { Sidebar } from '../components/layout/Sidebar'
import { TopBar } from '../components/layout/TopBar'
import { AdminForm } from '../components/forms/AdminForm'
import { motion } from 'framer-motion'

export function AdminPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64 flex-1 min-w-0 flex flex-col">
        <TopBar />
        <main className="flex-1 px-12 py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="max-w-2xl mx-auto"
          >
            <div className="mb-10">
              <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Panel de Control</span>
              <h1 className="text-4xl font-black tracking-tighter text-white mt-2">Admin Dashboard</h1>
              <p className="text-zinc-500 text-sm mt-2 leading-relaxed">
                Publica nuevo contenido. El formulario se adapta automáticamente según el tipo seleccionado.
              </p>
            </div>

            <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-8">
              <AdminForm />
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
