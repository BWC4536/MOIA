import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSupabase } from '../../hooks/useSupabase'
import { HorizontalScroll } from '../ui/HorizontalScroll'
import { ToolCard } from '../ui/ToolCard'
import { ProjectCard } from '../ui/ProjectCard'

export function ToolsSection({ etiquetaFilter }) {
  const where = { tipo: ['herramienta', 'app', 'skill'] }
  if (etiquetaFilter && etiquetaFilter !== 'Todas') {
    where.etiqueta_ia = etiquetaFilter
  }

  const { data, loading, error } = useSupabase('contenido_diario', {
    where,
    order: 'created_at',
    limit: 10,
  })

  if (loading) return (
    <div className="text-zinc-600 text-sm py-8 text-center">Cargando herramientas...</div>
  )

  if (error) return (
    <div className="text-red-400/80 text-sm py-4 px-4 bg-red-500/5 rounded-lg border border-red-500/10">
      Error al cargar herramientas: {error}
    </div>
  )

  if (data.length === 0) return (
    <div className="text-zinc-600 text-sm py-12 text-center">
      No hay herramientas disponibles{etiquetaFilter !== 'Todas' ? ` para "${etiquetaFilter}"` : ''}.
    </div>
  )

  return (
    <section id="featured-tools">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-black tracking-tighter text-on-surface">Herramientas IA</h2>
          <p className="text-on-surface-variant text-sm mt-2">El arsenal definitivo del profesional de IA.</p>
        </div>
        <Link
          to="/library"
          className="text-xs font-bold uppercase tracking-widest text-violet-400 flex items-center gap-2
                     hover:gap-3 transition-all">
          Ver Todo <ArrowRight size={11} />
        </Link>
      </div>

      <HorizontalScroll>
        {data.map((item) => (
          item.tipo === 'herramienta'
            ? <ToolCard key={item.id} item={item} />
            : <ProjectCard key={item.id} item={item} />
        ))}
      </HorizontalScroll>
    </section>
  )
}
