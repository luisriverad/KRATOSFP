export default function PageHeader({ title, subtitle, owner, badges = [], actions, kicker }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {kicker && <div className="label-mono mb-2">{kicker}</div>}
        <div className="flex items-baseline gap-3 flex-wrap">
          <h1 className="font-display text-[40px] leading-[1.05] font-semibold text-kratos-ink tracking-tight">{title}</h1>
          {badges.map((b, i) => <span key={i} className={b.className || 'chip-info'}>{b.label}</span>)}
        </div>
        {subtitle && <p className="text-[15px] text-kratos-subtle mt-2 max-w-2xl">{subtitle}</p>}
        {owner && (
          <p className="text-xs text-kratos-muted mt-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-kratos-ok"></span>
            Responsable: <span className="text-kratos-subtle">{owner}</span>
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}
