import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Drawer({ open, onClose, title, subtitle, kicker, badges = [], actions, children, width = 'max-w-4xl' }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-200 ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}
      aria-hidden={!open}
    >
      <div
        className="absolute inset-0 bg-kratos-ink/30 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full ${width} bg-kratos-bg border-l border-kratos-border shadow-lift
          flex flex-col transform transition-transform duration-300 ease-out
          ${open ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
      >
        <header className="px-6 py-5 border-b border-kratos-border flex items-start justify-between gap-3 bg-kratos-panel">
          <div className="min-w-0">
            {kicker && <div className="label-mono mb-1">{kicker}</div>}
            <div className="flex items-baseline gap-3 flex-wrap">
              <h2 className="font-display text-2xl font-semibold text-kratos-ink tracking-tight truncate">{title}</h2>
              {badges.map((b, i) => (
                <span key={i} className={b.className || 'chip-info'}>{b.label}</span>
              ))}
            </div>
            {subtitle && <p className="text-sm text-kratos-subtle mt-1">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {actions}
            <button
              onClick={onClose}
              className="p-2 rounded-none text-kratos-muted hover:text-kratos-ink hover:bg-kratos-bg2 transition-colors"
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </aside>
    </div>
  )
}
