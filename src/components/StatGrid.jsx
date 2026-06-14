export function StatGrid({ children, cols = 4, className = '' }) {
  const colsMap = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4', 5: 'sm:grid-cols-3 lg:grid-cols-5', 6: 'sm:grid-cols-3 lg:grid-cols-6' }
  return <div className={`grid grid-cols-2 ${colsMap[cols] || colsMap[4]} gap-2 ${className}`}>{children}</div>
}

export function Stat({ label, value, hint, accent = 'default', mono = true }) {
  const accents = {
    default: 'border-l-kratos-border-2',
    ok:      'border-l-kratos-ok',
    warn:    'border-l-kratos-warn',
    danger:  'border-l-kratos-danger',
    info:    'border-l-kratos-info',
    red:     'border-l-kratos-red'
  }
  return (
    <div className={`p-3 rounded-lg bg-kratos-panel border border-kratos-border border-l-2 ${accents[accent]}`}>
      <div className="label-mono">{label}</div>
      <div className={`text-base font-display font-semibold text-kratos-ink mt-1 ${mono ? 'tabular-nums' : ''}`}>{value}</div>
      {hint && <div className="text-[10px] text-kratos-muted mt-0.5">{hint}</div>}
    </div>
  )
}
