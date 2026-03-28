import React, { useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * HorizontalScroll — Carrusel horizontal con:
 * - Drag físico con Framer Motion (drag="x" + ref-based constraints)
 * - Efecto biblioteca: capas de sombra desplazadas detrás de cada tarjeta
 * - Momentum natural y cursor grabbing
 */
export function HorizontalScroll({ children }) {
  const containerRef = useRef(null)

  return (
    <div
      ref={containerRef}
      className="overflow-x-hidden -mx-12 px-12 py-4 cursor-grab active:cursor-grabbing"
    >
      <motion.div
        className="flex gap-6 pb-2"
        drag="x"
        dragConstraints={containerRef}
        dragElastic={0.05}
        dragMomentum={true}
        whileTap={{ cursor: 'grabbing' }}
      >
        {React.Children.map(children, (child, i) => (
          <div key={i} className="snap-item shrink-0 relative w-fit">
            {/* Capa 2 — sombra más alejada (obsidiana profunda) */}
            <div
              className="absolute inset-0 rounded-2xl border border-white/[0.045] pointer-events-none"
              style={{
                transform: 'translate(6px, 6px)',
                background: 'rgba(255,255,255,0.008)',
                zIndex: -2,
              }}
            />
            {/* Capa 1 — sombra media */}
            <div
              className="absolute inset-0 rounded-2xl border border-white/[0.065] pointer-events-none"
              style={{
                transform: 'translate(3px, 3px)',
                background: 'rgba(255,255,255,0.014)',
                zIndex: -1,
              }}
            />
            {/* Tarjeta real */}
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
