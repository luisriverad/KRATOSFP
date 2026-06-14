export default function GaugeRing({ value = 0, label, size = 80, accent = 'auto', subLabel }) {
  const r = (size - 10) / 2
  const c = 2 * Math.PI * r
  const v = Math.max(0, Math.min(100, value))
  const offset = c - (v / 100) * c
  const color = accent === 'auto'
    ? (v >= 85 ? '#047857' : v >= 70 ? '#1E3A8A' : v >= 50 ? '#B45309' : '#B91C1C')
    : accent

  return (
    <div className="flex flex-col items-center gap-1" style={{ width: size + 16 }}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size/2} cy={size/2} r={r} stroke="#EEECE5" strokeWidth="6" fill="none"/>
          <circle
            cx={size/2} cy={size/2} r={r}
            stroke={color} strokeWidth="6" fill="none"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 600ms ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display font-semibold text-kratos-ink text-base">{v}</span>
          {subLabel && <span className="text-[9px] text-kratos-muted">{subLabel}</span>}
        </div>
      </div>
      {label && <span className="label-mono">{label}</span>}
    </div>
  )
}
