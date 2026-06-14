export default function Avatar({ name = '', color, size = 'md', subtitle, role }) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase()
  const sizes = { sm: 'w-7 h-7 text-[10px]', md: 'w-9 h-9 text-xs', lg: 'w-14 h-14 text-lg', xl: 'w-20 h-20 text-2xl' }
  const palette = ['#DC2626', '#3B82F6', '#10B981', '#F59E0B', '#A855F7', '#EC4899', '#06B6D4']
  const idx = Math.abs(initials.charCodeAt(0) || 0) % palette.length
  const bg = color || palette[idx]
  if (subtitle || role) {
    return (
      <div className="flex items-center gap-3">
        <div className={`${sizes[size]} rounded-lg flex items-center justify-center font-display font-semibold text-white shrink-0`} style={{ background: `linear-gradient(135deg, ${bg}, ${bg}99)` }}>
          {initials}
        </div>
        <div className="min-w-0">
          <div className="text-sm text-kratos-ink font-medium leading-tight truncate">{name}</div>
          {subtitle && <div className="text-[11px] text-kratos-subtle truncate">{subtitle}</div>}
          {role && <div className="text-[11px] text-kratos-subtle truncate">{role}</div>}
        </div>
      </div>
    )
  }
  return (
    <div className={`${sizes[size]} rounded-lg flex items-center justify-center font-display font-semibold text-white shrink-0`} style={{ background: `linear-gradient(135deg, ${bg}, ${bg}99)` }}>
      {initials}
    </div>
  )
}
