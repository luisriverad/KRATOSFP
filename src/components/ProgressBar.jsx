export default function ProgressBar({ value, accent = 'info', label, showValue = true, className = '' }) {
  const colors = {
    red:  'bg-kratos-red',
    ok:   'bg-kratos-ok',
    warn: 'bg-kratos-warn',
    info: 'bg-kratos-info',
    ink:  'bg-kratos-ink',
    plum: 'bg-kratos-plum'
  }
  const acc = value >= 90 ? 'ok' : value >= 70 ? 'info' : value >= 50 ? 'warn' : 'red'
  const bar = colors[accent === 'auto' ? acc : accent]

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1 text-xs">
          {label && <span className="text-kratos-subtle">{label}</span>}
          {showValue && <span className="font-mono text-kratos-muted">{value}%</span>}
        </div>
      )}
      <div className="w-full h-1.5 bg-kratos-bg2 rounded-full overflow-hidden">
        <div className={`h-full ${bar} transition-all duration-500`} style={{ width: `${Math.min(100, value)}%` }} />
      </div>
    </div>
  )
}
