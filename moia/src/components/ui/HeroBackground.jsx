import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

/**
 * HeroBackground — Moai parallax layer.
 * La imagen rellena el hero centrada (object-contain object-center).
 * El cursor mueve el Moai en dirección opuesta para dar sensación de profundidad.
 * mix-blend-mode: screen convierte el negro en transparente sobre el fondo obsidiana.
 */
export function HeroBackground() {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const springCfg = { stiffness: 55, damping: 18, mass: 0.9 }
  const smoothX = useSpring(rawX, springCfg)
  const smoothY = useSpring(rawY, springCfg)

  // Rango de desplazamiento: cursor opuesto → sensación de capas en Z
  const x = useTransform(smoothX, [-0.5, 0.5], [20, -20])
  const y = useTransform(smoothY, [-0.5, 0.5], [12, -12])

  useEffect(() => {
    function onMouseMove(e) {
      rawX.set(e.clientX / window.innerWidth - 0.5)
      rawY.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [rawX, rawY])

  return (
    /* Capa fija: no interfiere con clics ni scroll */
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Escalar un poco más para que el parallax no muestre bordes */}
      <motion.div
        style={{ x, y }}
        className="absolute inset-[-30px]"
      >
        <img
          src="/moai-hero.png"
          alt=""
          className="w-full h-full object-contain object-center mix-blend-screen"
          style={{ opacity: 0 }}
          onLoad={(e) => {
            // Fade-in tras cargar para evitar flash
            e.target.style.transition = 'opacity 1.4s ease-out 0.2s'
            e.target.style.opacity = '0.13'
          }}
        />
      </motion.div>
    </div>
  )
}
