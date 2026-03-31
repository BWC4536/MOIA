import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, AlertCircle, Paperclip, Send } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'

/* ── Iconos RRSS ── */
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
  { label: 'Instagram', href: 'https://instagram.com',  icon: IconInstagram, color: 'text-pink-400',  border: 'border-pink-500/40',  glow: '0 0 18px rgba(236,72,153,0.55)',   bg: 'hover:bg-pink-500/10' },
  { label: 'YouTube',   href: 'https://youtube.com',    icon: IconYoutube,   color: 'text-red-400',   border: 'border-red-500/40',   glow: '0 0 18px rgba(239,68,68,0.55)',    bg: 'hover:bg-red-500/10'  },
  { label: 'TikTok',   href: 'https://tiktok.com',     icon: IconTiktok,    color: 'text-cyan-300',  border: 'border-cyan-400/40',  glow: '0 0 18px rgba(34,211,238,0.55)',   bg: 'hover:bg-cyan-500/10' },
  { label: 'Telegram', href: 'https://t.me',           icon: IconTelegram,  color: 'text-sky-400',   border: 'border-sky-400/40',   glow: '0 0 18px rgba(56,189,248,0.55)',   bg: 'hover:bg-sky-500/10'  },
]

/* ── Estilos holográficos compartidos ── */
const HOLO_TEXT = {
  color: 'rgba(187, 247, 253, 0.92)',           // text-cyan-100 aprox.
  textShadow: '0 0 10px rgba(34,211,238,0.55)', // glow cian suave
}
const HOLO_PLACEHOLDER_COLOR = 'rgba(22,78,99,0.8)' // cyan-900 tenue

/**
 * HologramField — burbuja contenedora que se ilumina al focus.
 * children recibe { onFocus, onBlur, isFocused } para sincronizar el glow.
 */
function HologramField({ label, isFocused, children }) {
  return (
    <div
      className="rounded-xl border px-4 py-3 transition-all duration-300"
      style={{
        borderColor: isFocused ? 'rgba(34,211,238,0.45)' : 'rgba(34,211,238,0.12)',
        background:  isFocused ? 'rgba(34,211,238,0.04)' : 'rgba(34,211,238,0.02)',
        boxShadow:   isFocused ? '0 0 20px rgba(34,211,238,0.12), inset 0 0 12px rgba(34,211,238,0.04)' : 'none',
      }}
    >
      <p
        className="text-[9px] uppercase tracking-[0.22em] font-bold mb-1.5 transition-all duration-300"
        style={{ color: isFocused ? 'rgba(103,232,249,0.8)' : 'rgba(34,211,238,0.35)' }}
      >
        {label}
      </p>
      {children}
    </div>
  )
}

/**
 * HologramForm
 * @param {string}  submitLabel  — Texto del botón principal
 * @param {boolean} showRRSS     — Muestra los botones de RRSS bajo la base
 */
export function HologramForm({ submitLabel = 'Enviar', showRRSS = false }) {
  const [correo,       setCorreo]       = useState('')
  const [concepto,     setConcepto]     = useState('')
  const [mensaje,      setMensaje]      = useState('')
  const [archivo,      setArchivo]      = useState(null)
  const [status,       setStatus]       = useState('idle')
  const [focusedField, setFocusedField] = useState(null) // 'correo'|'concepto'|'mensaje'|'archivo'
  const fileRef = useRef(null)

  /* ── Estilos inline para inputs (Tailwind no soporta textShadow ni placeholder nativo) ── */
  const inputStyle = {
    ...HOLO_TEXT,
    background: 'transparent',
    border:     'none',
    outline:    'none',
    width:      '100%',
    fontSize:   '0.875rem',
    resize:     'none',
    caretColor: 'rgba(34,211,238,0.9)',
  }

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

      {/* ── Panel de cristal holográfico ── */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full rounded-2xl overflow-hidden"
        style={{
          background:  'rgba(6, 20, 30, 0.72)',
          backdropFilter: 'blur(20px)',
          border:      '1px solid rgba(34,211,238,0.15)',
          boxShadow:   '0 0 60px rgba(34,211,238,0.06), 0 0 120px rgba(34,211,238,0.03)',
        }}
      >
        {/* Línea de brillo superior — haz de entrada */}
        <div className="absolute top-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.5), transparent)' }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-20 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.07), transparent 70%)' }} />

        <form onSubmit={handleSubmit} className="p-8 space-y-4">

          {/* Indicador de estado activo */}
          <div className="flex items-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"
              style={{ boxShadow: '0 0 6px rgba(34,211,238,0.8)' }} />
            <span className="text-[9px] uppercase tracking-[0.28em] font-bold"
              style={{ color: 'rgba(34,211,238,0.45)' }}>
              Proyección activa
            </span>
          </div>

          {/* Correo */}
          <HologramField label="Correo electrónico" isFocused={focusedField === 'correo'}>
            <input
              type="email"
              className="holo-input"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              onFocus={() => setFocusedField('correo')}
              onBlur={() => setFocusedField(null)}
              style={inputStyle}
              placeholder="tu@email.com"
            />
          </HologramField>

          {/* Concepto — "Inquiry Subject" */}
          <HologramField label="Inquiry Subject" isFocused={focusedField === 'concepto'}>
            <input
              type="text"
              className="holo-input"
              value={concepto}
              onChange={(e) => setConcepto(e.target.value)}
              onFocus={() => setFocusedField('concepto')}
              onBlur={() => setFocusedField(null)}
              style={inputStyle}
              placeholder="Type subject..."
            />
          </HologramField>

          {/* Mensaje — "Message Details" */}
          <HologramField label="Message Details" isFocused={focusedField === 'mensaje'}>
            <textarea
              className="holo-input"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              onFocus={() => setFocusedField('mensaje')}
              onBlur={() => setFocusedField(null)}
              rows={4}
              style={inputStyle}
              placeholder="Describe your project... Type message..."
            />
          </HologramField>

          {/* Adjuntar imagen */}
          <HologramField label="Adjuntar imagen (opcional)" isFocused={focusedField === 'archivo'}>
            <button
              type="button"
              onClick={() => { fileRef.current?.click(); setFocusedField('archivo') }}
              onBlur={() => setFocusedField(null)}
              className="flex items-center gap-2.5 w-full text-sm transition-all duration-300"
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                color: archivo
                  ? 'rgba(187,247,253,0.85)'
                  : 'rgba(34,211,238,0.28)',
                textShadow: archivo ? '0 0 8px rgba(34,211,238,0.4)' : 'none',
                textAlign: 'left',
                padding: 0,
              }}
            >
              <Paperclip size={13} style={{ color: 'rgba(34,211,238,0.5)', flexShrink: 0 }} />
              {archivo ? archivo.name : 'Seleccionar archivo...'}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => { setArchivo(e.target.files?.[0] || null); setFocusedField(null) }}
            />
          </HologramField>

          {/* Feedback */}
          <AnimatePresence mode="wait">
            {status === 'ok' && (
              <motion.div key="ok"
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-sm"
                style={{ color: 'rgba(52,211,153,0.9)', textShadow: '0 0 8px rgba(52,211,153,0.5)' }}>
                <Check size={14} /> ¡Mensaje enviado! Gracias.
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div key="err"
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle size={14} /> Error al enviar. Inténtalo de nuevo.
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botón submit holográfico */}
          <motion.button
            type="submit"
            disabled={status === 'loading' || (!mensaje.trim() && !concepto.trim())}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold
                       text-sm uppercase tracking-widest transition-all disabled:opacity-30
                       disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(6,182,212,0.1))',
              border:     '1px solid rgba(34,211,238,0.35)',
              color:      'rgba(187,247,253,0.95)',
              textShadow: '0 0 12px rgba(34,211,238,0.7)',
              boxShadow:  '0 0 20px rgba(34,211,238,0.1), inset 0 0 12px rgba(34,211,238,0.04)',
            }}
          >
            {status === 'loading'
              ? <span className="w-4 h-4 border-2 rounded-full animate-spin"
                  style={{ borderColor: 'rgba(34,211,238,0.3)', borderTopColor: 'rgba(34,211,238,0.9)' }} />
              : <><Send size={14} /> {submitLabel}</>
            }
          </motion.button>
        </form>

        {/* Línea de brillo inferior */}
        <div className="absolute bottom-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.3), transparent)' }} />
      </motion.div>

      {/* ── Botones RRSS ── */}
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
                          border ${border} ${color} ${bg} transition-all duration-300 hover:scale-110`}
              style={{ boxShadow: '0 0 0 rgba(0,0,0,0)' }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = glow }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 0 rgba(0,0,0,0)' }}
            >
              <Icon />
            </a>
          ))}
        </motion.div>
      )}

      {/* ── Estilos globales para placeholders holográficos ── */}
      <style>{`
        .holo-input::placeholder { color: ${HOLO_PLACEHOLDER_COLOR}; }
      `}</style>
    </div>
  )
}
