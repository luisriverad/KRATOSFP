import { useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, ArrowDownRight, Minus, HelpCircle, X } from 'lucide-react'
import { Link } from 'react-router-dom'

// status: 'ok' | 'warn' | 'danger' | 'neutral'
// invertir = true cuando un delta negativo es bueno (ej: ausentismo bajando)
// info = texto de "¿Qué es esto?"; si se pasa, el click abre un pop-up explicativo
const STATUS = {
  ok:      { dot: 'bg-kratos-ok',     border: 'border-l-kratos-ok',     label: 'Verde',    chip: 'chip-ok'     },
  warn:    { dot: 'bg-kratos-warn',   border: 'border-l-kratos-warn',   label: 'Amarillo', chip: 'chip-warn'   },
  danger:  { dot: 'bg-kratos-danger', border: 'border-l-kratos-danger', label: 'Rojo',     chip: 'chip-danger' },
  neutral: { dot: 'bg-kratos-muted',  border: 'border-l-kratos-border-2', label: 'Sin meta', chip: 'chip-muted' }
}

export default function KPILight({ label, value, meta, status = 'neutral', delta, deltaLabel, vs, hint, to, invertir = false, info, desglose }) {
  const [open, setOpen] = useState(false)
  const s = STATUS[status]
  const deltaTone = delta == null ? null
    : (invertir ? delta <= 0 : delta >= 0) ? 'text-kratos-ok' : 'text-kratos-danger'
  const Arrow = delta == null ? null : delta === 0 ? Minus : delta > 0 ? ArrowUpRight : ArrowDownRight

  // Si hay info o desglose → el click abre pop-up (div clicable). Si no, navega con Link.
  const abrePopup = info || desglose
  const Wrapper = abrePopup ? 'div' : to ? Link : 'div'
  const wrapperProps = abrePopup
    ? { role: 'button', tabIndex: 0, onClick: () => setOpen(true), onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(true) } } }
    : to ? { to } : {}
  const clicable = abrePopup || to

  return (
    <>
      <Wrapper {...wrapperProps}
        className={`panel-flat border-l-2 ${s.border} p-4 block ${clicable ? 'panel-hover cursor-pointer' : ''}`}>
        <div className="flex items-start justify-between mb-2">
          <span className="label-mono leading-snug">{label}</span>
          {abrePopup
            ? <HelpCircle size={14} className="text-kratos-muted shrink-0 mt-0.5"/>
            : <span className={`w-2.5 h-2.5 rounded-full ${s.dot} shrink-0 mt-0.5 ${status === 'danger' ? 'pulse-dot' : ''}`}/>}
        </div>
        <div className="font-display text-2xl font-semibold text-kratos-ink leading-none tabular-nums">{value}</div>
        <div className="mt-2 text-[11px] space-y-0.5">
          {Arrow && (
            <div className="flex items-center gap-1.5">
              <span className={`flex items-center gap-0.5 font-semibold ${deltaTone}`}>
                <Arrow size={11}/>{delta > 0 ? '+' : ''}{delta}%
              </span>
              {vs && <span className="text-kratos-muted">vs. {vs}</span>}
            </div>
          )}
          {deltaLabel && <div className="text-kratos-muted leading-snug">{deltaLabel}</div>}
        </div>
        {meta && (
          <div className="text-[10px] text-kratos-muted mt-2 pt-2 border-t border-kratos-border/70">
            Meta: <span className="font-mono text-kratos-subtle">{meta}</span>
          </div>
        )}
        {hint && <div className="text-[10px] text-kratos-muted mt-1.5">{hint}</div>}
      </Wrapper>

      {abrePopup && open && createPortal(
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"/>
          <div className="relative panel w-full max-w-lg p-6 shadow-2xl max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(false)} aria-label="Cerrar"
              className="absolute right-4 top-4 text-kratos-muted hover:text-kratos-ink transition">
              <X size={18}/>
            </button>
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle size={15} className="text-kratos-muted"/>
              <span className="label-mono">{info ? '¿Qué es esto?' : 'Desglose'}</span>
            </div>
            <div className="flex items-baseline justify-between gap-3 mb-3">
              <h3 className="font-display text-xl font-semibold text-kratos-ink">{label}</h3>
              <span className="font-display text-lg font-semibold text-kratos-ink tabular-nums shrink-0">{value}</span>
            </div>
            {info && <p className="text-sm text-kratos-subtle leading-relaxed">{info}</p>}

            {desglose && (
              <div className="mt-4 pt-4 border-t border-kratos-border">
                <div className="label-mono mb-2.5">{desglose.titulo || 'Desglose'}</div>
                <ul className="space-y-2">
                  {desglose.filas.map((f, i) => (
                    <li key={i} className="flex items-baseline justify-between gap-3 text-sm border-b border-kratos-border/40 last:border-0 pb-2 last:pb-0">
                      <span className="text-kratos-subtle">{f.k}</span>
                      <span className={`font-mono tabular-nums shrink-0 ${f.tone === 'danger' ? 'text-kratos-danger' : f.tone === 'warn' ? 'text-kratos-warn' : f.tone === 'ok' ? 'text-kratos-ok' : 'text-kratos-ink'} ${f.fuerte ? 'font-semibold' : ''}`}>{f.v}</span>
                    </li>
                  ))}
                </ul>
                {desglose.nota && <p className="text-[12px] text-kratos-muted mt-3 leading-relaxed">{desglose.nota}</p>}
              </div>
            )}

            {meta && (
              <div className="mt-4 pt-3 border-t border-kratos-border text-[12px] text-kratos-muted">
                Meta del indicador: <span className="font-mono text-kratos-subtle">{meta}</span>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
