import { useState, useMemo, useCallback } from 'react'

function compare(a, b) {
  if (a == null && b == null) return 0
  if (a == null) return 1
  if (b == null) return -1
  if (typeof a === 'number' && typeof b === 'number') return a - b
  const an = Number(a), bn = Number(b)
  const aIsNum = !Number.isNaN(an) && String(a).trim() !== ''
  const bIsNum = !Number.isNaN(bn) && String(b).trim() !== ''
  if (aIsNum && bIsNum) return an - bn
  return String(a).localeCompare(String(b), 'es', { numeric: true, sensitivity: 'base' })
}

export function useSortable(rows, accessors = {}, initial = null) {
  const [sort, setSort] = useState(initial)

  const toggle = useCallback((key) => {
    setSort(prev => {
      if (!prev || prev.key !== key) return { key, dir: 'asc' }
      if (prev.dir === 'asc') return { key, dir: 'desc' }
      return null
    })
  }, [])

  const sorted = useMemo(() => {
    if (!sort) return rows
    const { key, dir } = sort
    const getter = accessors[key] || ((r) => r?.[key])
    const out = [...rows].sort((a, b) => compare(getter(a), getter(b)))
    return dir === 'desc' ? out.reverse() : out
  }, [rows, sort, accessors])

  return { sorted, sort, toggle }
}
