import { Newspaper } from 'lucide-react'
import { motion } from 'framer-motion'
import { useSupabase } from '../hooks/useSupabase'
import { NewsCard } from '../components/ui/NewsCard'

export function NoticiasPage() {
  const { data, loading, error } = useSupabase('contenido_diario', {
    where: { tipo: 'noticia' },
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
            <Newspaper size={18} className="text-violet-400" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-white">Noticias</h1>
            {!loading && (
              <p className="text-[10px] uppercase tracking-widest text-zinc-600 mt-0.5">
                {data.length} artículo{data.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-zinc-600 text-sm animate-pulse py-20 text-center">
            Cargando noticias…
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
            No hay noticias publicadas aún.
          </div>
        )}

        {/* Grid */}
        {!loading && !error && data.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item, i) => (
              <NewsCard key={item.id} item={item} index={i} />
            ))}
          </div>
        )}
      </motion.div>
    </main>
  )
}
