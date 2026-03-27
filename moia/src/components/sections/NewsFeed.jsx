import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSupabase } from '../../hooks/useSupabase'
import { NewsCard } from '../ui/NewsCard'
import { HorizontalScroll } from '../ui/HorizontalScroll'

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
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-black tracking-tighter text-on-surface">Noticias IA Recientes</h2>
          <p className="text-on-surface-variant text-sm mt-2">Lo más relevante del ecosistema esta semana.</p>
        </div>
        <Link
          to="/noticias"
          className="text-xs font-bold uppercase tracking-widest text-violet-400 flex items-center gap-2
                     hover:gap-3 transition-all">
          Ver Todo <ArrowRight size={11} />
        </Link>
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
        <HorizontalScroll>
          {data.map((item, i) => (
            <div key={item.id} className="min-w-[340px] flex-shrink-0">
              <NewsCard item={item} index={i} />
            </div>
          ))}
        </HorizontalScroll>
      )}
    </section>
  )
}
