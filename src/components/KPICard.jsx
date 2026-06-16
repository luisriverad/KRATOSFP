import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

export default function KPICard({ label, value, delta, deltaLabel, hint, icon: Icon, accent = 'default' }) {
  const positive = typeof delta === 'number' ? delta >= 0 : null

  return (
    <div className="panel-flat p-5">
      <div className="flex items-start justify-between mb-3">
        <span className="label-mono">{label}</span>
        {Icon && <Icon size={14} className="text-kratos-muted" />}
      </div>
      <div className="font-display text-[28px] font-semibold leading-none text-kratos-ink">{value}</div>
      <div className="flex items-center gap-2 mt-2 flex-wrap">
        {positive !== null && (
          <span className={`flex items-center gap-0.5 text-[11px] font-semibold ${positive ? 'text-kratos-ok' : 'text-kratos-danger'}`}>
            {positive ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
            {positive ? '+' : ''}{delta}%
          </span>
        )}
        {deltaLabel && <span className="text-[11px] text-kratos-muted">{deltaLabel}</span>}
      </div>
      {hint && <p className="text-[11px] text-kratos-muted mt-2">{hint}</p>}
    </div>
  )
}
