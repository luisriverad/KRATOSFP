export const HOY = new Date('2026-05-14')

export function diasHasta(fechaISO) {
  if (!fechaISO) return null
  const f = new Date(fechaISO)
  const ms = f.getTime() - HOY.getTime()
  return Math.round(ms / 86400000)
}

export function estadoDoc(fechaISO) {
  const d = diasHasta(fechaISO)
  if (d === null) return 'pendiente'
  if (d < 0) return 'vencido'
  if (d <= 30) return 'proximo'
  return 'vigente'
}

export function fmtDelta(dias) {
  if (dias === null || dias === undefined) return '—'
  if (dias < 0) return `Vencido hace ${-dias}d`
  if (dias === 0) return 'Vence hoy'
  return `En ${dias}d`
}
