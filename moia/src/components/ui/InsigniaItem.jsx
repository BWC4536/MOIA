import { motion } from 'framer-motion'

/**
 * Insignia individual.
 * - earned=false → escala de grises + opacidad baja (bloqueada)
 * - earned=true  → color original + efecto activación en hover
 */
export function InsigniaItem({ insignia, earned = false }) {
  return (
    <motion.div
      title={earned ? insignia.nombre : `${insignia.nombre} (bloqueada)`}
      whileHover={earned ? { scale: 1.1 } : { scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className={`
        relative flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all cursor-default
        ${earned
          ? `${insignia.bg} ${insignia.border} shadow-sm`
          : 'bg-white/[0.02] border-white/5 opacity-40 grayscale'
        }
      `}
    >
      <span className="text-2xl leading-none">{insignia.emoji}</span>
      <span className={`text-[9px] font-bold uppercase tracking-widest text-center leading-tight
                        ${earned ? insignia.color : 'text-zinc-600'}`}>
        {insignia.nombre}
      </span>

      {/* Glow de energía sólo cuando está activa */}
      {earned && (
        <motion.div
          className={`absolute inset-0 rounded-xl ${insignia.bg} blur-md -z-10`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.div>
  )
}
