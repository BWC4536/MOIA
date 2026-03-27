import React from 'react'
import { motion } from 'framer-motion'

/**
 * HorizontalScroll — Carrusel horizontal con:
 * - CSS scroll-snap magnético (snap-rail / snap-item)
 * - Efecto biblioteca: capas de sombra desplazadas detrás de cada tarjeta
 * - whileTap para feedback táctil en el contenedor
 */
export function HorizontalScroll({ children }) {
  return (
    <div className="snap-rail overflow-x-scroll hide-scrollbar -mx-12 px-12 py-4">
      <motion.div
        className="flex gap-6 pb-2"
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
