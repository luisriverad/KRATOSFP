const DOT = {
  ok:     'bg-kratos-ok',
  warn:   'bg-kratos-warn',
  danger: 'bg-kratos-danger',
  info:   'bg-kratos-info',
  red:    'bg-kratos-red',
  muted:  'bg-kratos-muted'
}

export default function Timeline({ items = [], compact = false }) {
  return (
    <ol className="relative">
      <span className="absolute left-[7px] top-1 bottom-1 w-px bg-kratos-border" aria-hidden />
      {items.map((it, i) => (
        <li key={i} className={`relative pl-7 ${compact ? 'pb-3' : 'pb-5'} last:pb-0`}>
          <span className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full ${DOT[it.severity || 'info']} ring-4 ring-kratos-panel`} aria-hidden />
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="min-w-0">
              <div className="label-mono">{it.fecha}{it.hora ? ` · ${it.hora}` : ''}</div>
              <div className="text-sm text-kratos-ink font-medium leading-tight mt-1">{it.titulo}</div>
              {it.detalle && <div className="text-xs text-kratos-subtle mt-1 leading-relaxed">{it.detalle}</div>}
              {it.meta && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {it.meta.map((m, j) => (
                    <span key={j} className="text-[10px] font-mono px-1.5 py-0.5 rounded-none bg-kratos-bg2 text-kratos-muted">{m}</span>
                  ))}
                </div>
              )}
            </div>
            {it.tag && <span className={it.tagClass || 'chip-muted'}>{it.tag}</span>}
          </div>
        </li>
      ))}
    </ol>
  )
}
