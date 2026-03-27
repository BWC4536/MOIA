import { ArrowRight } from 'lucide-react'
import { useSupabase } from '../../hooks/useSupabase'
import { HorizontalScroll } from '../ui/HorizontalScroll'
import { ChallengeCard } from '../ui/ChallengeCard'

export function ChallengesSection({ etiquetaFilter }) {
  const where = { tipo: 'reto' }
  if (etiquetaFilter && etiquetaFilter !== 'Todas') {
    where.etiqueta_ia = etiquetaFilter
  }

  const { data, loading, error } = useSupabase('contenido_diario', {
    where,
    order: 'created_at',
    limit: 8,
  })

  if (loading) return (
    <div className="text-zinc-600 text-sm py-8 text-center">Cargando retos...</div>
  )
  if (error || data.length === 0) return null

  return (
    <section>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-black tracking-tighter text-on-surface">Retos de la Semana</h2>
          <p className="text-on-surface-variant text-sm mt-2">
            Completa retos, desbloquea insignias y sube de nivel.
          </p>
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-600 flex items-center gap-2">
          {data.length} activos <ArrowRight size={11} />
        </span>
      </div>

      <HorizontalScroll>
        {data.map((item) => (
          <ChallengeCard key={item.id} item={item} />
        ))}
      </HorizontalScroll>
    </section>
  )
}
