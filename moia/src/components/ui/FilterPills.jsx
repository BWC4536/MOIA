import { motion } from 'framer-motion'

const FILTERS = ['Todas', 'Claude', 'ChatGPT', 'v0', 'Lovable', 'Gemini']

export function FilterPills({ active, onChange }) {
  return (
    <div className="sticky top-[65px] z-30 bg-background/80 backdrop-blur-xl px-12 py-5 border-b border-white/5">
      <div className="flex gap-3 overflow-x-auto hide-scrollbar">
        {FILTERS.map((filter) => {
          const isActive = active === filter
          return (
            <motion.button
              key={filter}
              onClick={() => onChange(filter)}
              className={`relative px-6 py-2 rounded-full text-xs font-bold transition-colors shrink-0 ${
                isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="filter-bg"
                  className="absolute inset-0 bg-violet-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{filter}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
