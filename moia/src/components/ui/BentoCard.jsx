const PLACEHOLDER = '/images/placeholders/tool-default.webp'

export function BentoCard({ item, large = false }) {
  const { titulo, descripcion, imagen_url, url } = item

  const handleClick = () => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      onClick={handleClick}
      className={`${large ? 'md:col-span-2' : ''} h-72 rounded-xl bg-surface-container
                 border border-white/5 relative overflow-hidden group ${url ? 'cursor-pointer' : ''}`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70 z-10" />
      <img
        src={imagen_url || PLACEHOLDER}
        alt={titulo}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        onError={(e) => { e.target.src = PLACEHOLDER }}
      />
      <div className="absolute bottom-0 left-0 p-6 z-20">
        <h4 className={`${large ? 'text-xl' : 'text-lg'} font-bold text-white tracking-tight`}>
          {titulo}
        </h4>
        {descripcion && (
          <p className="text-zinc-400 text-[10px] mt-1 uppercase tracking-widest line-clamp-1">
            {descripcion}
          </p>
        )}
      </div>
    </div>
  )
}
