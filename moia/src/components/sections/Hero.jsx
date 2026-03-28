import { motion } from 'framer-motion'
import { ArrowRight, ChevronsDown } from 'lucide-react'
import { HeroBackground } from '../ui/HeroBackground'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

function scrollToTools() {
  document.getElementById('featured-tools')?.scrollIntoView({ behavior: 'smooth' })
}

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface to-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
                      bg-violet-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Moai parallax background — sigue el cursor con efecto de profundidad */}
      <HeroBackground />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        <motion.span variants={fadeUp}
          className="text-xs text-zinc-500 uppercase tracking-[0.25em] font-medium mb-6 block">
          Plataforma de Nueva Generación
        </motion.span>

        <motion.h1 variants={fadeUp}
          className="text-6xl md:text-8xl font-black tracking-tighter text-on-surface leading-tight">
          Explora el Futuro de la IA
        </motion.h1>

        <motion.p variants={fadeUp}
          className="mt-8 text-on-surface-variant max-w-2xl mx-auto text-lg font-light leading-relaxed">
          Un ecosistema unificado para ingenieros de prompts, desarrolladores y entusiastas
          de la inteligencia artificial. Descubre herramientas que expanden el pensamiento humano.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-12 flex justify-center gap-4 flex-wrap">
          <button
            onClick={scrollToTools}
            className="px-8 py-3 bg-violet-500 text-white rounded-md font-bold text-sm
                       tracking-tight hover:bg-violet-400 transition-colors flex items-center gap-2"
          >
            Comenzar ahora <ArrowRight size={14} />
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border border-white/10 text-on-surface rounded-md font-bold
                       text-sm tracking-tight hover:bg-white/5 transition-colors"
          >
            Ver Documentación
          </a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
                      text-zinc-600 animate-bounce pointer-events-none">
        <span className="text-[10px] uppercase tracking-widest">Scroll para explorar</span>
        <ChevronsDown size={14} />
      </div>
    </section>
  )
}
