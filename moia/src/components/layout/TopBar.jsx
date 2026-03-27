import { NavLink, useNavigate } from 'react-router-dom'
import { Search, Bell, UserCircle } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Explorer', to: '/' },
  { label: 'Library',  to: '/library' },
  { label: 'Studio',   to: '/studio' },
]

export function TopBar() {
  const navigate = useNavigate()

  return (
    <nav className="sticky top-0 w-full flex justify-between items-center px-8 py-4
                    bg-background/80 backdrop-blur-md z-50 border-b border-white/10">
      <div className="flex items-center gap-8">
        <span className="text-xl font-black tracking-tighter text-white">Intelligence Hub</span>
        <div className="hidden md:flex gap-6 items-center text-[10px] uppercase tracking-widest font-semibold">
          {NAV_ITEMS.map(({ label, to }) => (
            <NavLink
              key={label}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                isActive
                  ? 'text-white border-b border-white pb-0.5'
                  : 'text-zinc-400 hover:text-white transition-colors'
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center bg-white/5 rounded-full px-4 py-1.5 border border-white/10 gap-2">
          <Search size={11} className="text-zinc-500 shrink-0" />
          <input
            type="text"
            placeholder="BUSCAR..."
            className="bg-transparent border-none p-0 focus:ring-0 text-[10px] w-44
                       placeholder:text-zinc-600 text-white outline-none"
          />
        </div>
        <button
          onClick={() => navigate('/notificaciones')}
          className="text-zinc-400 hover:text-white transition-colors"
          aria-label="Notificaciones"
        >
          <Bell size={17} />
        </button>
        <button
          onClick={() => navigate('/perfil')}
          className="text-zinc-400 hover:text-white transition-colors"
          aria-label="Perfil"
        >
          <UserCircle size={17} />
        </button>
      </div>
    </nav>
  )
}
