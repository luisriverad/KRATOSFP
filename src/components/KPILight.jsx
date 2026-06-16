import { useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, ArrowDownRight, Minus, HelpCircle, X, ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

// status: 'ok' | 'warn' | 'danger' | 'neutral'
// invertir = true cuando un delta negativo es bueno (ej: ausentismo bajando)
// Comportamiento de la tarjeta:
//   · clic en el box        → abre el desglose (drill-down); si no hay desglose pero sí `to`, navega a la fuente
//   · clic en el icono "?"  → abre el pop-up explicativo (info = "¿Qué es esto?")
const STATUS = {
  ok:      { dot: 'bg-kratos-ok',     label: 'Verde',    chip: 'chip-ok'     },
  warn:    { dot: 'bg-kratos-warn',   label: 'Amarillo', chip: 'chip-warn'   },
  danger:  { dot: 'bg-kratos-danger', label: 'Rojo',     chip: 'chip-danger' },
  neutral: { dot: 'bg-kratos-muted',  label: 'Sin meta', chip: 'chip-muted' }
}

export default function KPILight({ label, value, meta, status = 'neutral', delta, deltaLabel, vs, hint, to, toLabel, invertir = false, info, desglose }) {
  const [popup, setPopup] = useState(null) // null | 'info' | 'desglose'
  const navigate = useNavigate()
  const s = STATUS[status]
  const deltaTone = delta == null ? null
    : (invertir ? delta <= 0 : delta >= 0) ? 'text-kratos-ok' : 'text-kratos-danger'
  const Arrow = delta == null ? null : delta === 0 ? Minus : delta > 0 ? ArrowUpRight : ArrowDownRight

  // Acción del box: priorizar desglose; si no hay, navegar a la fuente.
  const boxAction = desglose ? () => setPopup('desglose') : to ? () => navigate(to) : null
  const clicable = !!boxAction

  return (
    <>
      <div
        role={clicable ? 'button' : undefined}
        tabIndex={clicable ? 0 : undefined}
        onClick={boxAction || undefined}
        onKeyDown={clicable ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); boxAction() } } : undefined}
        className={`panel-flat p-4 block ${clicable ? 'panel-hover cursor-pointer' : ''}`}>
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="label-mono leading-snug">{label}</span>
          <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
            <span className={`w-2.5 h-2.5 rounded-full ${s.dot} ${status === 'danger' ? 'pulse-dot' : ''}`}/>
            {info && (
              <button type="button" aria-label="¿Qué es esto?"
                onClick={(e) => { e.stopPropagation(); setPopup('info') }}
                className="text-kratos-muted hover:text-kratos-ink transition">
                <HelpCircle size={14}/>
              </button>
            )}
          </div>
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
        {clicable && (
          <div className="text-[10px] text-kratos-muted/80 mt-2 flex items-center gap-1">
            {desglose ? 'Ver desglose' : 'Ir a la fuente'} <ArrowRight size={10}/>
          </div>
        )}
      </div>

      {popup && createPortal(
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={() => setPopup(null)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"/>
          <div className="relative panel w-full max-w-lg p-6 shadow-2xl max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setPopup(null)} aria-label="Cerrar"
              className="absolute right-4 top-4 text-kratos-muted hover:text-kratos-ink transition">
              <X size={18}/>
            </button>
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle size={15} className="text-kratos-muted"/>
              <span className="label-mono">{popup === 'info' ? '¿Qué es esto?' : 'Desglose'}</span>
            </div>
            <div className="flex items-baseline justify-between gap-3 mb-3">
              <h3 className="font-display text-xl font-semibold text-kratos-ink">{label}</h3>
              <span className="font-display text-lg font-semibold text-kratos-ink tabular-nums shrink-0">{value}</span>
            </div>

            {popup === 'info' && info && <p className="text-sm text-kratos-subtle leading-relaxed">{info}</p>}

            {popup === 'desglose' && desglose && (
              <div className="mt-1">
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

            {/* Enlace a la fuente del dato (disponible desde el desglose) */}
            {popup === 'desglose' && to && (
              <Link to={to} onClick={() => setPopup(null)}
                className="btn-link mt-4 inline-flex">
                {toLabel || 'Ver detalle en la fuente'} <ArrowRight size={14}/>
              </Link>
            )}

            {/* Desde "¿Qué es esto?" se puede saltar al desglose */}
            {popup === 'info' && desglose && (
              <button type="button" onClick={() => setPopup('desglose')}
                className="btn-link mt-4 inline-flex">
                Ver desglose <ArrowRight size={14}/>
              </button>
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
