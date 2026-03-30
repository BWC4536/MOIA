import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, AlertCircle, Paperclip, Send } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'

/* ── Iconos RRSS (SVG inline — lucide no incluye marcas) ── */
function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function IconYoutube() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="black"/>
    </svg>
  )
}

function IconTiktok() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.36 6.36 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.25 8.25 0 0 0 4.83 1.55V6.79a4.85 4.85 0 0 1-1.06-.1z"/>
    </svg>
  )
}

function IconTelegram() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.018 9.509c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.74 14.695l-2.95-.924c-.641-.2-.655-.641.136-.948l11.526-4.445c.535-.194 1.003.132.11.87z"/>
    </svg>
  )
}

const RRSS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: IconInstagram,
    color: 'text-pink-400',
    border: 'border-pink-500/40',
    glow: '0_0_18px_rgba(236,72,153,0.5)',
    bg: 'hover:bg-pink-500/10',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: IconYoutube,
    color: 'text-red-400',
    border: 'border-red-500/40',
    glow: '0_0_18px_rgba(239,68,68,0.5)',
    bg: 'hover:bg-red-500/10',
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com',
    icon: IconTiktok,
    color: 'text-cyan-300',
    border: 'border-cyan-400/40',
    glow: '0_0_18px_rgba(34,211,238,0.5)',
    bg: 'hover:bg-cyan-500/10',
  },
  {
    label: 'Telegram',
    href: 'https://t.me',
    icon: IconTelegram,
    color: 'text-sky-400',
    border: 'border-sky-400/40',
    glow: '0_0_18px_rgba(56,189,248,0.5)',
    bg: 'hover:bg-sky-500/10',
  },
]

/* ── Campos del formulario ── */
function FormInput({ label, ...props }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1.5">
        {label}
      </label>
      <input
        {...props}
        className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2.5 text-sm
                   text-white placeholder:text-zinc-700 outline-none
                   focus:border-violet-500/50 focus:bg-white/[0.06] transition-all"
      />
    </div>
  )
}

/**
 * HologramForm
 * @param {string}  submitLabel  — Texto del botón principal
 * @param {boolean} showRRSS     — Muestra los botones de redes sociales bajo la base
 */
export function HologramForm({ submitLabel = 'Enviar', showRRSS = false }) {
  const [correo,   setCorreo]   = useState('')
  const [concepto, setConcepto] = useState('')
  const [mensaje,  setMensaje]  = useState('')
  const [archivo,  setArchivo]  = useState(null)
  const [status,   setStatus]   = useState('idle') // idle | loading | ok | error
  const fileRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!mensaje.trim() && !concepto.trim()) return
    setStatus('loading')

    const peticionText = [
      concepto.trim() && `Concepto: ${concepto.trim()}`,
      mensaje.trim(),
      archivo && `[Adjunto: ${archivo.name}]`,
    ].filter(Boolean).join('\n\n')

    const { error } = await supabase
      .from('peticiones_comunidad')
      .insert({ email: correo.trim() || null, peticion: peticionText })

    if (error) {
      console.error('[Supabase:peticiones_comunidad]', error.message)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    } else {
      setStatus('ok')
      setCorreo(''); setConcepto(''); setMensaje(''); setArchivo(null)
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto">

      {/* ── Panel flotante de cristal (el "holograma") ── */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full rounded-2xl bg-white/[0.04] backdrop-blur-xl
                   border border-white/10 shadow-[0_0_60px_rgba(139,92,246,0.08)]
                   overflow-hidden"
      >
        {/* Brillo superior — simula el haz de proyección */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r
                        from-transparent via-violet-400/50 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-16
                        bg-violet-500/5 blur-2xl pointer-events-none" />

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold">
              Proyección activa
            </span>
          </div>

          <FormInput
            label="Correo electrónico"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="tu@email.com"
          />

          <FormInput
            label="Concepto"
            type="text"
            value={concepto}
            onChange={(e) => setConcepto(e.target.value)}
            placeholder="¿De qué se trata tu mensaje?"
          />

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1.5">
              Mensaje
            </label>
            <textarea
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
              rows={4}
              placeholder="Escribe tu mensaje aquí..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-2.5 text-sm
                         text-white placeholder:text-zinc-700 outline-none resize-none
                         focus:border-violet-500/50 focus:bg-white/[0.06] transition-all"
            />
          </div>

          {/* File input estilizado */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1.5">
              Adjuntar imagen (opcional)
            </label>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2.5 w-full px-4 py-2.5 bg-white/[0.03] border border-white/10
                         rounded-lg text-sm text-zinc-500 hover:border-white/20 hover:text-zinc-300
                         transition-all text-left"
            >
              <Paperclip size={14} className="shrink-0 text-violet-400" />
              {archivo ? (
                <span className="text-zinc-300 truncate">{archivo.name}</span>
              ) : (
                <span>Seleccionar archivo...</span>
              )}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setArchivo(e.target.files?.[0] || null)}
            />
          </div>

          {/* Feedback */}
          <AnimatePresence mode="wait">
            {status === 'ok' && (
              <motion.div key="ok" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-emerald-400 text-sm">
                <Check size={14} /> ¡Mensaje enviado! Gracias.
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div key="err" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={14} /> Error al enviar. Inténtalo de nuevo.
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={status === 'loading' || (!mensaje.trim() && !concepto.trim())}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold
                       text-sm uppercase tracking-widest transition-all
                       bg-violet-500 text-white hover:bg-violet-400
                       disabled:opacity-40 disabled:cursor-not-allowed
                       shadow-[0_0_24px_rgba(139,92,246,0.3)]
                       hover:shadow-[0_0_32px_rgba(139,92,246,0.5)]"
          >
            {status === 'loading'
              ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : <><Send size={14} /> {submitLabel}</>
            }
          </button>
        </form>

        {/* Brillo inferior */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r
                        from-transparent via-violet-400/30 to-transparent" />
      </motion.div>

      {/* ── Base del holograma ── */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.7 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        className="relative w-full mt-0"
      >
        {/* Haz de proyección — gradiente entre panel y base */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-3/4 h-8
                        bg-gradient-to-b from-violet-500/0 via-violet-500/10 to-violet-500/5
                        pointer-events-none" />

        <img
          src="/hologram-base.png"
          alt=""
          className="w-full max-h-24 object-contain object-center select-none pointer-events-none
                     drop-shadow-[0_0_24px_rgba(139,92,246,0.4)]"
          draggable={false}
        />
      </motion.div>

      {/* ── Botones RRSS (solo en ContactoPage) ── */}
      {showRRSS && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex gap-5 mt-6"
        >
          {RRSS.map(({ label, href, icon: Icon, color, border, glow, bg }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              className={`w-12 h-12 rounded-full flex items-center justify-center
                          border ${border} ${color} ${bg}
                          transition-all duration-300
                          hover:scale-110`}
              style={{ boxShadow: `0 0 0 rgba(0,0,0,0)` }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `${glow}` }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 0 rgba(0,0,0,0)' }}
            >
              <Icon />
            </a>
          ))}
        </motion.div>
      )}
    </div>
  )
}
