import { useSupabase } from '../../hooks/useSupabase'
import { BentoCard } from '../ui/BentoCard'

export function AIWebsitesBento({ etiquetaFilter }) {
  const where = { tipo: 'app' }
  if (etiquetaFilter && etiquetaFilter !== 'Todas') {
    where.etiqueta_ia = etiquetaFilter
  }

  const { data, loading, error } = useSupabase('contenido_diario', {
    where,
    order: 'created_at',
    limit: 3,
  })

  if (loading || error || data.length === 0) return null

  return (
    <section>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-black tracking-tighter text-on-surface">Páginas Webs IA</h2>
          <p className="text-on-surface-variant text-sm mt-2">Inspiración y frameworks listos para usar.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {data.map((item, i) => (
          <BentoCard key={item.id} item={item} large={i === 0} />
        ))}
      </div>
    </section>
  )
}
