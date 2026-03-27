import { motion } from 'framer-motion'

/**
 * GlossOverlay — Brillo que barre la portada al hacer hover.
 * Requiere que el ancestro motion tenga `whileHover="hover" initial="rest"`.
 * El contenedor padre debe tener `overflow-hidden` y `position: relative`.
 */
export function GlossOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <motion.div
        className="absolute inset-y-0 w-1/2"
        style={{
          left: '-50%',
          background:
            'linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.055) 50%, transparent 100%)',
        }}
        variants={{
          rest:  { x: 0,      transition: { duration: 0 } },
          hover: { x: '450%', transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
        }}
      />
    </div>
  )
}
