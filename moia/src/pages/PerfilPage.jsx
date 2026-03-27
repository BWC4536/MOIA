import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { UserCircle, Star, Zap } from 'lucide-react'
import { Sidebar } from '../components/layout/Sidebar'
import { TopBar } from '../components/layout/TopBar'
import { InsigniaItem } from '../components/ui/InsigniaItem'
import { INSIGNIAS_CATALOGO } from '../lib/insignias'
import { supabase } from '../lib/supabaseClient'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.07, ease: 'easeOut' } }),
}

export function PerfilPage() {
  const [perfil, setPerfil] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('perfiles_usuario')
      .select('*')
      .limit(1)
      .single()
      .then(({ data, error }) => {
        if (error) console.error('[Perfil]', error.message)
        setPerfil(data || { nombre: 'Guest User', plan: 'pro', insignias: [], puntos: 0 })
        setLoading(false)
      })
  }, [])

  const insigniasDesbloqueadas = Array.isArray(perfil?.insignias) ? perfil.insignias : []

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64 flex-1 min-w-0 flex flex-col">
        <TopBar />
        <main className="flex-1 px-12 py-12">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto space-y-10"
          >
            {/* Hero del perfil */}
            <motion.div
              custom={0} variants={fadeUp}
              className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-8
                         flex items-center gap-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-zinc-800 border border-white/10
                              flex items-center justify-center shrink-0">
                <UserCircle size={32} className="text-zinc-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-black tracking-tighter text-white">
                  {loading ? '...' : perfil?.nombre}
                </h1>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] uppercase tracking-widest text-violet-400 font-bold
                                   bg-violet-500/10 border border-violet-500/20 rounded-full px-2.5 py-0.5">
                    {perfil?.plan || 'PRO'} PLAN
                  </span>
                  {perfil?.puntos > 0 && (
                    <span className="flex items-center gap-1 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                      <Zap size={10} className="text-yellow-400" />
                      {perfil.puntos} puntos
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-3xl font-black text-white">{insigniasDesbloqueadas.length}</p>
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                  / {INSIGNIAS_CATALOGO.length} insignias
                </p>
              </div>
            </motion.div>

            {/* Sistema de insignias */}
            <motion.div custom={1} variants={fadeUp}>
              <div className="flex items-center gap-3 mb-6">
                <Star size={16} className="text-violet-400" />
                <h2 className="text-xl font-black tracking-tighter text-white">Insignias</h2>
                <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">
                  {insigniasDesbloqueadas.length} desbloqueadas
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {INSIGNIAS_CATALOGO.map((insignia) => (
                  <InsigniaItem
                    key={insignia.id}
                    insignia={insignia}
                    earned={insigniasDesbloqueadas.includes(insignia.id)}
                  />
                ))}
              </div>

              {insigniasDesbloqueadas.length === 0 && (
                <p className="text-center text-zinc-600 text-sm mt-6">
                  Completa retos para desbloquear tus primeras insignias.
                </p>
              )}
            </motion.div>

            {/* Próximas insignias a desbloquear */}
            {insigniasDesbloqueadas.length < INSIGNIAS_CATALOGO.length && (
              <motion.div custom={2} variants={fadeUp}
                className="bg-white/[0.02] border border-white/5 rounded-2xl p-6"
              >
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
                  Cómo desbloquear más
                </h3>
                <ul className="space-y-3">
                  {INSIGNIAS_CATALOGO
                    .filter((b) => !insigniasDesbloqueadas.includes(b.id))
                    .slice(0, 3)
                    .map((b) => (
                      <li key={b.id} className="flex items-center gap-3 text-sm text-zinc-500">
                        <span className="text-base grayscale opacity-40">{b.emoji}</span>
                        <span className="flex-1">
                          <span className="font-bold text-zinc-400">{b.nombre}</span>
                          <span className="text-zinc-600"> — {b.descripcion}</span>
                        </span>
                      </li>
                    ))
                  }
                </ul>
              </motion.div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
