const EXTERNAL_LINKS = [
  { label: 'Twitter',  href: 'https://twitter.com' },
  { label: 'Github',   href: 'https://github.com' },
  { label: 'Discord',  href: 'https://discord.com' },
]

export function Footer() {
  return (
    <footer className="px-12 py-12 border-t border-white/5 flex flex-col md:flex-row
                       justify-between items-center gap-6">
      <div className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">
        © 2025 AI Intelligence Hub. Todos los derechos reservados.
      </div>
      <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold">
        {EXTERNAL_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors"
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  )
}
