import { Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import { useSupabase } from '../hooks/useSupabase'
import { WebsiteCard } from '../components/ui/WebsiteCard'

export function WebsPage() {
  const { data, loading, error } = useSupabase('contenido_diario', {
    where: { tipo: ['web', 'app'] },
    order: 'created_at',
  })

  return (
    <main className="flex-1 px-4 py-6 md:px-12 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10
                          flex items-center justify-center">
            <Globe size={18} className="text-violet-400" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-white">Webs / Apps</h1>
            {!loading && (
              <p className="text-[10px] uppercase tracking-widest text-zinc-600 mt-0.5">
                {data.length} proyecto{data.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>

        {loading && (
          <div className="text-zinc-600 text-sm animate-pulse py-20 text-center">Cargando webs…</div>
        )}
        {error && (
          <div className="text-red-400/70 text-sm py-20 text-center">Error al cargar: {error}</div>
        )}
        {!loading && !error && data.length === 0 && (
          <div className="text-zinc-600 text-sm py-20 text-center">No hay webs publicadas aún.</div>
        )}
        {!loading && !error && data.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => <WebsiteCard key={item.id} item={item} />)}
          </div>
        )}
      </motion.div>
    </main>
  )
}
