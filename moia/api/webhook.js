import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Auth
  const authHeader = req.headers.authorization || '';
  if (authHeader !== `Bearer ${process.env.WEBHOOK_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Desestructuración con defaults null para todos los campos opcionales
  const {
    titulo,
    descripcion  = null,
    enlace       = null,
    imagen       = null,
    puntos_clave = null,
    autor        = null,
    categoria    = null,
    valoracion   = null,
    fuente       = null,
  } = req.body || {};

  if (!titulo) {
    return res.status(400).json({ error: 'Campo requerido: titulo' });
  }

  const { error } = await supabase
    .from('contenido_diario')
    .insert([{
      tipo:        'noticia',  // siempre forzado
      titulo,
      descripcion,
      url:         enlace,
      imagen_url:  imagen,
      puntos_clave,
      autor,
      categoria,
      valoracion,
      fuente,
    }]);

  if (error) {
    console.error('[Supabase webhook]', error.message);
    return res.status(500).json({ error: 'Error al insertar', detail: error.message });
  }

  return res.status(200).json({ ok: true, mensaje: 'Noticia insertada correctamente' });
}
