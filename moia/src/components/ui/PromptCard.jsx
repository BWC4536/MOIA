import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Brain, Paintbrush, BookOpen, Copy, Check, ChevronDown, PlayCircle } from 'lucide-react'

const ICONS = [Terminal, Brain, Paintbrush, BookOpen]

/** Bloque de código copiable */
function CodeBlock({ code, index }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group/code">
      <pre className="bg-black/60 border border-white/5 rounded-lg p-3 text-xs text-zinc-400
                      leading-relaxed whitespace-pre-wrap font-mono overflow-hidden max-h-28
                      line-clamp-4">
        {code}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-white/5 border border-white/10
                   text-zinc-500 hover:text-white transition-all opacity-0 group-hover/code:opacity-100"
      >
        {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
      </button>
      {index !== undefined && (
        <span className="absolute top-2 left-3 text-[9px] uppercase tracking-widest text-zinc-700 font-bold">
          Prompt {index + 1}
        </span>
      )}
    </div>
  )
}

export function PromptCard({ item, index }) {
  const { titulo, descripcion, metadatos = {} } = item
  const {
    bloques_codigo = [],
    resumen_puntos = [],
    youtube_url,
  } = metadatos

  const Icon = ICONS[index % ICONS.length]
  const [expanded, setExpanded] = useState(false)

  // Si no hay metadatos ricos, mostrar card simplificada
  const isRich = bloques_codigo.length > 0 || resumen_puntos.length > 0

  if (!isRich) {
    return (
      <motion.div
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="min-w-[300px] flex-shrink-0 p-6 rounded-xl bg-surface-container-lowest
                   border border-white/5 flex flex-col justify-between"
      >
        <div>
          <Icon size={20} className="text-violet-400 mb-4" />
          <h5 className="text-white font-bold mb-2 tracking-tight">{titulo}</h5>
          <p className="text-zinc-500 text-xs leading-relaxed line-clamp-3">{descripcion}</p>
        </div>
        <CopyButton text={descripcion || titulo} />
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="min-w-[360px] flex-shrink-0 bg-white/[0.03] backdrop-blur-md border border-white/10
                 rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-violet-500/10 border border-violet-500/20
                          flex items-center justify-center">
            <Icon size={13} className="text-violet-400" />
          </div>
          <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Prompt</span>
          {youtube_url && (
            <a href={youtube_url} target="_blank" rel="noopener noreferrer"
              className="ml-auto text-red-400 hover:text-red-300 transition-colors">
              <PlayCircle size={14} />
            </a>
          )}
        </div>
        <h5 className="text-sm font-bold text-white tracking-tight leading-snug mb-2">{titulo}</h5>

        {/* Resumen en 3 puntos */}
        {resumen_puntos.length > 0 && (
          <ul className="space-y-1.5 mb-3">
            {resumen_puntos.map((punto, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-zinc-500 leading-snug">
                <span className="w-4 h-4 rounded-full bg-violet-500/10 border border-violet-500/20
                                 text-violet-400 text-[9px] font-black flex items-center justify-center
                                 shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {punto}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Bloques de código (colapsables si hay más de uno) */}
      {bloques_codigo.length > 0 && (
        <div className="px-5 pb-5">
          <CodeBlock code={bloques_codigo[0]} index={bloques_codigo.length > 1 ? 0 : undefined} />

          {bloques_codigo.length > 1 && (
            <>
              <button
                onClick={() => setExpanded((v) => !v)}
                className="flex items-center gap-1.5 mt-2 text-[10px] uppercase tracking-widest
                           text-zinc-600 hover:text-zinc-400 transition-colors font-bold"
              >
                <ChevronDown
                  size={11}
                  className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
                />
                {expanded ? 'Ocultar' : `+${bloques_codigo.length - 1} prompt${bloques_codigo.length - 1 > 1 ? 's' : ''}`}
              </button>

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-2 mt-2 overflow-hidden"
                  >
                    {bloques_codigo.slice(1).map((code, i) => (
                      <CodeBlock key={i} code={code} index={i + 1} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      )}
    </motion.div>
  )
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const handle = () => {
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={handle}
      className="mt-6 text-[10px] font-black uppercase tracking-widest text-white/40
                 hover:text-white transition-colors text-left">
      {copied ? '✓ Copiado' : 'Copiar Prompt'}
    </button>
  )
}
