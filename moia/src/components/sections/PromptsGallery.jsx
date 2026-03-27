import { useSupabase } from '../../hooks/useSupabase'
import { HorizontalScroll } from '../ui/HorizontalScroll'
import { PromptCard } from '../ui/PromptCard'

export function PromptsGallery({ etiquetaFilter }) {
  const where = { tipo: 'prompt' }
  if (etiquetaFilter && etiquetaFilter !== 'Todas') {
    where.etiqueta_ia = etiquetaFilter
  }

  const { data, loading, error } = useSupabase('contenido_diario', {
    where,
    order: 'created_at',
    limit: 12,
  })

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl font-black tracking-tighter text-on-surface">Librería de Prompts</h2>
      </div>

      {loading && (
        <div className="text-zinc-600 text-sm py-12 text-center">Cargando prompts...</div>
      )}
      {error && (
        <div className="text-red-400/80 text-sm py-4 px-4 bg-red-500/5 rounded-lg border border-red-500/10">
          Error al cargar prompts: {error}
        </div>
      )}
      {!loading && !error && data.length === 0 && (
        <div className="text-zinc-600 text-sm py-12 text-center">
          No hay prompts disponibles{etiquetaFilter !== 'Todas' ? ` para "${etiquetaFilter}"` : ''}.
        </div>
      )}
      {!loading && !error && data.length > 0 && (
        <HorizontalScroll>
          {data.map((item, i) => (
            <PromptCard key={item.id} item={item} index={i} />
          ))}
        </HorizontalScroll>
      )}
    </section>
  )
}
