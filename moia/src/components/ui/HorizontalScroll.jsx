import React, { useRef, createContext, useContext } from 'react'
import { motion } from 'framer-motion'

/**
 * DragScrollContext — compartido con tarjetas hijas para bloquear
 * navegación cuando el usuario está arrastrando el carrusel.
 * isDragging es un React ref (no state) para evitar re-renders.
 */
export const DragScrollContext = createContext({ isDragging: { current: false } })
export function useDragScroll() { return useContext(DragScrollContext) }

/**
 * HorizontalScroll — Carrusel horizontal con:
 * - Drag físico con Framer Motion (drag="x" + ref-based constraints)
 * - Efecto biblioteca: capas de sombra desplazadas detrás de cada tarjeta
 * - Momentum natural y cursor grabbing
 * - DragScrollContext para que las tarjetas distingan drag de click
 */
export function HorizontalScroll({ children }) {
  const containerRef = useRef(null)
  const isDragging   = useRef(false)

  return (
    <DragScrollContext.Provider value={{ isDragging }}>
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
        onDragStart={() => { isDragging.current = true }}
        onDragEnd={() => { setTimeout(() => { isDragging.current = false }, 80) }}
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
    </DragScrollContext.Provider>
  )
}
