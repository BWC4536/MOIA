import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

/**
 * HeroBackground — Moai parallax layer.
 *
 * El cursor del ratón mueve la imagen en dirección opuesta (efecto profundidad 3D).
 * Spring suave (stiffness 55) garantiza 60 fps sin tirones.
 * mix-blend-mode: screen hace transparentes las zonas oscuras sobre el fondo obsidiana.
 */
export function HeroBackground() {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  // Spring: suave, con inercia natural
  const springCfg = { stiffness: 55, damping: 18, mass: 0.9 }
  const smoothX = useSpring(rawX, springCfg)
  const smoothY = useSpring(rawY, springCfg)

  // Rango de desplazamiento: cursor opuesto → sensación de capas en Z
  const x = useTransform(smoothX, [-0.5, 0.5], [22, -22])
  const y = useTransform(smoothY, [-0.5, 0.5], [14, -14])

  useEffect(() => {
    function onMouseMove(e) {
      // Normalizar a [-0.5, 0.5]
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
      <motion.img
        src="/images/moai-hero.jpg"
        alt=""
        style={{ x, y }}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 0.14, scale: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
        className="absolute bottom-[-4%] left-1/2 -translate-x-1/2
                   h-[96%] w-auto max-w-none object-contain
                   mix-blend-screen"
      />
    </div>
  )
}
