import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../../lib/supabaseClient'
import { Plus, Minus, Send, Check } from 'lucide-react'

const TIPOS = [
  { value: 'noticia',     label: 'Noticia',      emoji: '📰' },
  { value: 'web',         label: 'Web con IA',   emoji: '🌐' },
  { value: 'reto',        label: 'Reto',         emoji: '🏆' },
  { value: 'herramienta', label: 'Herramienta',  emoji: '🔧' },
  { value: 'prompt',      label: 'Prompt',       emoji: '⚡' },
  { value: 'app',         label: 'App / Skill',  emoji: '📱' },
]

const DIFICULTADES = ['facil', 'intermedio', 'avanzado']

/* ── helpers ── */
function Field({ label, children }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1.5">
        {label}
      </label>
      {children}
    </div>
  )
}

function Input({ ...props }) {
  return (
    <input
      {...props}
      className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-sm text-white
                 placeholder:text-zinc-700 outline-none focus:border-violet-500/40 transition-colors"
    />
  )
}

function Textarea({ ...props }) {
  return (
    <textarea
      {...props}
      rows={3}
      className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-sm text-white
                 placeholder:text-zinc-700 outline-none focus:border-violet-500/40 transition-colors resize-none"
    />
  )
}

function ArrayField({ label, values, onChange, placeholder }) {
  const add = () => onChange([...values, ''])
  const update = (i, v) => { const a = [...values]; a[i] = v; onChange(a) }
  const remove = (i) => onChange(values.filter((_, idx) => idx !== i))

  return (
    <Field label={label}>
      <div className="space-y-2">
        {values.map((v, i) => (
          <div key={i} className="flex gap-2">
            <Input value={v} onChange={(e) => update(i, e.target.value)} placeholder={placeholder} />
            <button type="button" onClick={() => remove(i)}
              className="p-2 text-zinc-600 hover:text-red-400 transition-colors shrink-0">
              <Minus size={13} />
            </button>
          </div>
        ))}
        <button type="button" onClick={add}
          className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold
                     text-zinc-600 hover:text-violet-400 transition-colors">
          <Plus size={10} /> Añadir
        </button>
      </div>
    </Field>
  )
}

/* ── campos por tipo ── */
function FieldsNoticia({ meta, setMeta }) {
  return (
    <>
      <ArrayField
        label="Imágenes descriptivas (URLs)"
        values={meta.imagenes || ['']}
        onChange={(v) => setMeta({ ...meta, imagenes: v })}
        placeholder="https://..."
      />
      <ArrayField
        label="Menciones (@usuario)"
        values={meta.menciones || ['']}
        onChange={(v) => setMeta({ ...meta, menciones: v })}
        placeholder="@usuario"
      />
      <Field label="Artículo completo">
        <Textarea
          value={meta.articulo_completo || ''}
          onChange={(e) => setMeta({ ...meta, articulo_completo: e.target.value })}
          placeholder="Texto completo del artículo..."
          rows={5}
        />
      </Field>
    </>
  )
}

function FieldsWeb({ meta, setMeta }) {
  return (
    <>
      <ArrayField
        label="Fotos del sitio (URLs)"
        values={meta.fotos_sitio || ['']}
        onChange={(v) => setMeta({ ...meta, fotos_sitio: v })}
        placeholder="https://..."
      />
      <Field label="Función del sitio">
        <Input
          value={meta.funcion || ''}
          onChange={(e) => setMeta({ ...meta, funcion: e.target.value })}
          placeholder="Ej: Panel de analítica en tiempo real"
        />
      </Field>
      <ArrayField
        label="Tech Stack"
        values={meta.tech_stack || ['']}
        onChange={(v) => setMeta({ ...meta, tech_stack: v })}
        placeholder="Ej: Next.js"
      />
      <Field label="Conversación IA (prompt inicial)">
        <Textarea
          value={meta.conv_ia || ''}
          onChange={(e) => setMeta({ ...meta, conv_ia: e.target.value })}
          placeholder="Prompt o resumen de la conversación con la IA..."
        />
      </Field>
      <Field label="Repo GitHub (URL)">
        <Input
          value={meta.repo_github || ''}
          onChange={(e) => setMeta({ ...meta, repo_github: e.target.value })}
          placeholder="https://github.com/..."
        />
      </Field>
      <ArrayField
        label="Fotos de automatización (URLs)"
        values={meta.fotos_automatizacion || ['']}
        onChange={(v) => setMeta({ ...meta, fotos_automatizacion: v })}
        placeholder="https://..."
      />
    </>
  )
}

function FieldsReto({ meta, setMeta }) {
  return (
    <>
      <Field label="Objetivo del reto">
        <Textarea
          value={meta.objetivo || ''}
          onChange={(e) => setMeta({ ...meta, objetivo: e.target.value })}
          placeholder="¿Qué debe implementar el usuario?"
        />
      </Field>
      <Field label="Tiempo recomendado">
        <Input
          value={meta.tiempo_recomendado || ''}
          onChange={(e) => setMeta({ ...meta, tiempo_recomendado: e.target.value })}
          placeholder="Ej: 2-3 horas"
        />
      </Field>
      <Field label="Dificultad">
        <div className="flex gap-2">
          {DIFICULTADES.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setMeta({ ...meta, dificultad: d })}
              className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border transition-colors
                ${meta.dificultad === d
                  ? 'bg-violet-500/10 border-violet-500/30 text-violet-400'
                  : 'border-white/10 text-zinc-500 hover:border-white/20'}`}
            >
              {d}
            </button>
          ))}
        </div>
      </Field>
      <Field label="ID de Insignia">
        <Input
          value={meta.id_insignia || ''}
          onChange={(e) => setMeta({ ...meta, id_insignia: e.target.value })}
          placeholder="Ej: badge-001"
        />
      </Field>
      <ArrayField
        label="Galería (URLs)"
        values={meta.galeria || ['']}
        onChange={(v) => setMeta({ ...meta, galeria: v })}
        placeholder="https://..."
      />
    </>
  )
}

function FieldsHerramienta({ meta, setMeta }) {
  return (
    <>
      <Field label="Logo (URL)">
        <Input
          value={meta.logo || ''}
          onChange={(e) => setMeta({ ...meta, logo: e.target.value })}
          placeholder="https://..."
        />
      </Field>
      <Field label="Precio">
        <Input
          value={meta.precio || ''}
          onChange={(e) => setMeta({ ...meta, precio: e.target.value })}
          placeholder="Ej: Gratis / $20 mes"
        />
      </Field>
      <Field label="Categoría">
        <Input
          value={meta.categoria || ''}
          onChange={(e) => setMeta({ ...meta, categoria: e.target.value })}
          placeholder="Ej: Desarrollo, Diseño, Escritura..."
        />
      </Field>
      <ArrayField
        label="Pros"
        values={meta.pros || ['']}
        onChange={(v) => setMeta({ ...meta, pros: v })}
        placeholder="Ventaja clave..."
      />
      <ArrayField
        label="Contras"
        values={meta.cons || ['']}
        onChange={(v) => setMeta({ ...meta, cons: v })}
        placeholder="Limitación importante..."
      />
    </>
  )
}

function FieldsPrompt({ meta, setMeta }) {
  return (
    <>
      <ArrayField
        label="Bloques de código / prompts"
        values={meta.bloques_codigo || ['']}
        onChange={(v) => setMeta({ ...meta, bloques_codigo: v })}
        placeholder="Escribe el prompt aquí..."
      />
      <ArrayField
        label="Resumen en 3 puntos"
        values={meta.resumen_puntos || ['', '', '']}
        onChange={(v) => setMeta({ ...meta, resumen_puntos: v })}
        placeholder="Qué consigues con este prompt..."
      />
      <Field label="URL de YouTube (opcional)">
        <Input
          value={meta.youtube_url || ''}
          onChange={(e) => setMeta({ ...meta, youtube_url: e.target.value })}
          placeholder="https://youtube.com/..."
        />
      </Field>
    </>
  )
}

const META_FIELDS = {
  noticia:     FieldsNoticia,
  web:         FieldsWeb,
  reto:        FieldsReto,
  herramienta: FieldsHerramienta,
  prompt:      FieldsPrompt,
}

/* ── Componente principal ── */
export function AdminForm() {
  const [tipo, setTipo]         = useState('noticia')
  const [titulo, setTitulo]     = useState('')
  const [descripcion, setDesc]  = useState('')
  const [url, setUrl]           = useState('')
  const [etiqueta, setEtiqueta] = useState('')
  const [imagen, setImagen]     = useState('')
  const [meta, setMeta]         = useState({})
  const [status, setStatus]     = useState('idle') // idle | loading | ok | error
  const [errorMsg, setErrorMsg] = useState('')

  const MetaFields = META_FIELDS[tipo] || null

  const handleTipo = (t) => { setTipo(t); setMeta({}) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!titulo.trim()) return
    setStatus('loading')

    // Limpiar arrays vacíos del metadatos
    const cleanMeta = Object.fromEntries(
      Object.entries(meta).map(([k, v]) =>
        Array.isArray(v) ? [k, v.filter(Boolean)] : [k, v]
      )
    )

    const { error } = await supabase.from('contenido_diario').insert({
      titulo: titulo.trim(),
      tipo,
      descripcion: descripcion.trim() || null,
      url: url.trim() || null,
      etiqueta_ia: etiqueta.trim() || null,
      imagen_url: imagen.trim() || null,
      metadatos: cleanMeta,
    })

    if (error) {
      console.error('[Admin]', error.message)
      setErrorMsg(error.message)
      setStatus('error')
    } else {
      setStatus('ok')
      setTitulo(''); setDesc(''); setUrl(''); setEtiqueta(''); setImagen(''); setMeta({})
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Selector de tipo */}
      <div>
        <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3">Tipo de contenido</p>
        <div className="grid grid-cols-3 gap-2">
          {TIPOS.map(({ value, label, emoji }) => (
            <button
              key={value}
              type="button"
              onClick={() => handleTipo(value)}
              className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-xs
                          font-bold transition-all ${
                tipo === value
                  ? 'bg-violet-500/10 border-violet-500/30 text-violet-400'
                  : 'border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300'
              }`}
            >
              <span className="text-base">{emoji}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Campos base */}
      <div className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Campos base</p>
        <Field label="Título *">
          <Input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título del contenido" required />
        </Field>
        <Field label="Descripción">
          <Textarea value={descripcion} onChange={(e) => setDesc(e.target.value)} placeholder="Descripción breve..." />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="URL">
            <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." />
          </Field>
          <Field label="Etiqueta IA">
            <Input value={etiqueta} onChange={(e) => setEtiqueta(e.target.value)} placeholder="Claude, ChatGPT, v0..." />
          </Field>
        </div>
        <Field label="Imagen portada (URL)">
          <Input value={imagen} onChange={(e) => setImagen(e.target.value)} placeholder="https://..." />
        </Field>
      </div>

      {/* Campos específicos del tipo */}
      <AnimatePresence mode="wait">
        {MetaFields && (
          <motion.div
            key={tipo}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
              Datos de {TIPOS.find((t) => t.value === tipo)?.label}
            </p>
            <MetaFields meta={meta} setMeta={setMeta} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      <div className="pt-2">
        {status === 'error' && (
          <p className="text-red-400 text-xs mb-3 bg-red-500/5 border border-red-500/10 rounded-lg px-3 py-2">
            {errorMsg}
          </p>
        )}
        <button
          type="submit"
          disabled={status === 'loading' || !titulo.trim()}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm
                      uppercase tracking-widest transition-all ${
            status === 'ok'
              ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
              : 'bg-violet-500 text-white hover:bg-violet-400 disabled:opacity-40 disabled:cursor-not-allowed'
          }`}
        >
          {status === 'loading' && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
          {status === 'ok'      && <><Check size={15} /> Publicado</>}
          {(status === 'idle' || status === 'error') && <><Send size={14} /> Publicar contenido</>}
        </button>
      </div>
    </form>
  )
}
