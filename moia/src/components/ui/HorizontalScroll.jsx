import { useRef } from 'react'
import { motion } from 'framer-motion'

export function HorizontalScroll({ children }) {
  const containerRef = useRef(null)

  return (
    <div
      ref={containerRef}
      className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
    >
      <motion.div
        className="flex gap-6 pb-4"
        drag="x"
        dragConstraints={containerRef}
        dragElastic={0.04}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
