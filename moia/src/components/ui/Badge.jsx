const TYPE_COLORS = {
  app:     'bg-violet-500/10 text-violet-300 border-violet-500/20',
  noticia: 'bg-blue-500/10   text-blue-300   border-blue-500/20',
  prompt:  'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  skill:   'bg-amber-500/10  text-amber-300  border-amber-500/20',
}

export function Badge({ tipo }) {
  const color = TYPE_COLORS[tipo] || 'bg-white/5 text-zinc-400 border-white/10'
  return (
    <span className={`text-[9px] uppercase font-bold tracking-widest px-2 py-1 rounded border ${color}`}>
      {tipo}
    </span>
  )
}
