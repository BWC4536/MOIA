import { useSupabase } from '../../hooks/useSupabase'
import { WebsiteCard } from '../ui/WebsiteCard'
import { BentoCard } from '../ui/BentoCard'

export function AIWebsitesBento({ etiquetaFilter }) {
  const where = { tipo: ['web', 'app'] }
  if (etiquetaFilter && etiquetaFilter !== 'Todas') {
    where.etiqueta_ia = etiquetaFilter
  }

  const { data, loading, error } = useSupabase('contenido_diario', {
    where,
    order: 'created_at',
    limit: 4,
  })

  if (loading || error || data.length === 0) return null

  return (
    <section>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-black tracking-tighter text-on-surface">Webs Creadas con IA</h2>
          <p className="text-on-surface-variant text-sm mt-2">Proyectos reales construidos de principio a fin con inteligencia artificial.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {data.map((item, i) => (
          item.tipo === 'web'
            ? (
              <div key={item.id} className={i === 0 ? 'md:col-span-2' : ''}>
                <WebsiteCard item={item} />
              </div>
            )
            : (
              <div key={item.id} className={i === 0 ? 'md:col-span-2' : ''}>
                <BentoCard item={item} large={i === 0} />
              </div>
            )
        ))}
      </div>
    </section>
  )
}
