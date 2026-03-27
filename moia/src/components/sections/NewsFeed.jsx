import { useSupabase } from '../../hooks/useSupabase'
import { NewsItem } from '../ui/NewsItem'

export function NewsFeed({ etiquetaFilter }) {
  const where = { tipo: 'noticia' }
  if (etiquetaFilter && etiquetaFilter !== 'Todas') {
    where.etiqueta_ia = etiquetaFilter
  }

  const { data, loading, error } = useSupabase('contenido_diario', {
    where,
    order: 'created_at',
    limit: 10,
  })

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl font-black tracking-tighter text-on-surface">Noticias IA Recientes</h2>
      </div>

      {loading && (
        <div className="text-zinc-600 text-sm py-12 text-center">Cargando noticias...</div>
      )}
      {error && (
        <div className="text-red-400/80 text-sm py-4 px-4 bg-red-500/5 rounded-lg border border-red-500/10">
          Error al cargar noticias: {error}
        </div>
      )}
      {!loading && !error && data.length === 0 && (
        <div className="text-zinc-600 text-sm py-12 text-center">
          No hay noticias disponibles{etiquetaFilter !== 'Todas' ? ` para "${etiquetaFilter}"` : ''}.
        </div>
      )}
      {!loading && !error && data.length > 0 && (
        <div className="space-y-4">
          {data.map((item, i) => (
            <NewsItem key={item.id} item={item} index={i} />
          ))}
        </div>
      )}
    </section>
  )
}
