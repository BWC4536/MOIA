import { useState } from 'react'
import { motion } from 'framer-motion'
import { Terminal, Brain, Paintbrush, BookOpen } from 'lucide-react'

const ICONS = [Terminal, Brain, Paintbrush, BookOpen]

export function PromptCard({ item, index }) {
  const { titulo, descripcion, url } = item
  const Icon = ICONS[index % ICONS.length]
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const text = url || descripcion || titulo
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
      <button
        onClick={handleCopy}
        className="mt-6 text-[10px] font-black uppercase tracking-widest text-white/40
                   hover:text-white transition-colors text-left"
      >
        {copied ? '✓ Copiado' : 'Copiar Prompt'}
      </button>
    </motion.div>
  )
}
