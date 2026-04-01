import { Wrench } from 'lucide-react'
import { motion } from 'framer-motion'
import { useSupabase } from '../hooks/useSupabase'
import { ToolCard } from '../components/ui/ToolCard'

export function LibraryPage() {
  const { data, loading, error } = useSupabase('contenido_diario', {
    where: { tipo: ['herramienta', 'app', 'skill'] },
    order: 'created_at',
  })

  return (
    <main className="flex-1 px-4 py-6 md:px-12 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10
                          flex items-center justify-center">
            <Wrench size={18} className="text-violet-400" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-white">Herramientas</h1>
            {!loading && (
              <p className="text-[10px] uppercase tracking-widest text-zinc-600 mt-0.5">
                {data.length} herramienta{data.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-zinc-600 text-sm animate-pulse py-20 text-center">
            Cargando herramientas…
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
            No hay herramientas publicadas aún.
          </div>
        )}

        {/* Carrusel móvil / Grid desktop */}
        {!loading && !error && data.length > 0 && (
          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-6 pt-2
                          md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-x-visible
                          md:snap-none md:pb-0 md:pt-0 md:gap-6">
            {data.map((item) => (
              <div key={item.id} className="w-[85vw] sm:w-[350px] shrink-0 snap-center md:w-auto">
                <ToolCard item={item} />
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </main>
  )
}
