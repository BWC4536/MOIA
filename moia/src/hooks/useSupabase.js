import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

/**
 * Generic Supabase fetch hook.
 * @param {string} table - Table name
 * @param {{ where?: object, order?: string, limit?: number }} options
 * - where: { col: value } or { col: [val1, val2] } for IN queries
 * - order: column name (desc by default)
 * - limit: max rows
 */
export function useSupabase(table, options = {}) {
  const { where, order = 'created_at', limit } = options
  const [data, setData]       = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  const whereKey = JSON.stringify(where)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    let query = supabase.from(table).select('*')

    if (where) {
      Object.entries(where).forEach(([col, val]) => {
        if (Array.isArray(val)) {
          query = query.in(col, val)
        } else if (val !== null && val !== undefined) {
          query = query.eq(col, val)
        }
      })
    }

    if (order)  query = query.order(order, { ascending: false })
    if (limit)  query = query.limit(limit)

    query.then(({ data: result, error: err }) => {
      if (cancelled) return
      if (err) {
        console.error(`[Supabase:${table}]`, err.message)
        setError(err.message)
      } else {
        setData(result || [])
      }
      setLoading(false)
    })

    return () => { cancelled = true }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, whereKey, order, limit])

  return { data, loading, error }
}
