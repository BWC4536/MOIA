import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Preflight CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Solo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verificar token de autorización
  const authHeader = req.headers.authorization || '';
  const expectedToken = `Bearer ${process.env.WEBHOOK_SECRET}`;

  if (authHeader !== expectedToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { tipo, titulo, descripcion, enlace } = req.body;

  if (!titulo || !tipo) {
    return res.status(400).json({ error: 'Faltan campos requeridos: titulo, tipo' });
  }

  const { error } = await supabase
    .from('contenido_diario')
    .insert([{ tipo, titulo, descripcion, url: enlace }]);

  if (error) {
    console.error('[Supabase]', error.message);
    return res.status(500).json({ error: 'Error al insertar en base de datos' });
  }

  return res.status(200).json({ ok: true, mensaje: 'Noticia insertada correctamente' });
}
