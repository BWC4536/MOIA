import { NavLink } from 'react-router-dom'
import { Code2, Video, Terminal, Newspaper, Layers, Settings, HelpCircle, User } from 'lucide-react'

const NAV_MAIN = [
  { icon: Code2,     label: 'Code',         to: '/' },
  { icon: Video,     label: 'Video',        to: '/video' },
  { icon: Terminal,  label: 'Prompts',      to: '/prompts' },
  { icon: Newspaper, label: 'Noticias',     to: '/noticias' },
  { icon: Layers,    label: 'App Requests', to: '/requests' },
]

const NAV_FOOTER = [
  { icon: Settings,   label: 'Settings', to: '/settings' },
  { icon: HelpCircle, label: 'Support',  to: '/support' },
]

const activeClass = 'text-white font-semibold border-l-2 border-violet-400 pl-4 -ml-1 bg-violet-500/5'
const inactiveClass = 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]'

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-black border-r border-white/5 z-40
                      flex flex-col p-6 antialiased tracking-tight text-sm">
      <div className="mb-10 pt-16">
        <h1 className="text-lg font-bold tracking-tighter text-white">AI Hub</h1>
        <p className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1">Intelligence Suite</p>
      </div>

      <nav className="flex-1 space-y-1">
        {NAV_MAIN.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={label}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm ${
                isActive ? activeClass : inactiveClass
              }`
            }
          >
            <Icon size={15} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6 space-y-1 border-t border-white/5">
        {NAV_FOOTER.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive ? activeClass : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]'
              }`
            }
          >
            <Icon size={15} />
            <span>{label}</span>
          </NavLink>
        ))}

        <NavLink
          to="/perfil"
          className="flex items-center gap-3 mt-3 px-3 py-2 bg-white/5 rounded-lg border border-white/5
                     hover:bg-white/[0.07] transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
            <User size={13} className="text-zinc-400" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold text-white truncate">Guest User</span>
            <span className="text-[9px] text-zinc-500 uppercase tracking-wider">PRO PLAN</span>
          </div>
        </NavLink>
      </div>
    </aside>
  )
}
