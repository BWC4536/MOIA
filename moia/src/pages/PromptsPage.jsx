import { Terminal } from 'lucide-react'
import { motion } from 'framer-motion'
import { useSupabase } from '../hooks/useSupabase'
import { PromptCard } from '../components/ui/PromptCard'

export function PromptsPage() {
  const { data, loading, error } = useSupabase('contenido_diario', {
    where: { tipo: 'prompt' },
    order: 'created_at',
  })

  return (
    <main className="flex-1 px-12 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10
                          flex items-center justify-center">
            <Terminal size={18} className="text-violet-400" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-white">Prompts</h1>
            {!loading && (
              <p className="text-[10px] uppercase tracking-widest text-zinc-600 mt-0.5">
                {data.length} prompt{data.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-zinc-600 text-sm animate-pulse py-20 text-center">
            Cargando prompts…
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-red-400/70 text-sm py-20 text-center">
            Error al cargar: {error}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && data.length === 0 && (
          <div className="text-zinc-600 text-sm py-20 text-center">
            No hay prompts publicados aún.
          </div>
        )}

        {/* Grid */}
        {!loading && !error && data.length > 0 && (
          <div className="flex flex-wrap gap-6">
            {data.map((item, i) => (
              <PromptCard key={item.id} item={item} index={i} />
            ))}
          </div>
        )}
      </motion.div>
    </main>
  )
}
