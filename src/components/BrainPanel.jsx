import { useState } from 'react'
import { BrainCircuit } from 'lucide-react'

// Panel reutilizable de "Análisis por Kratos FP Brain".
// Estado propio (colapsado/expandido) → se puede soltar en cualquier sub-pestaña.
// Solo analiza lo que recibe en `insights` (lo de ESA pestaña) y da lecturas PREDICTIVAS.
//
// insights: [{ tag, tone:'ok'|'warn'|'danger'|'info', titulo, prediccion, accion, confianza:0-100 }]
const chipOf = (t) => t === 'danger' ? 'chip-danger' : t === 'warn' ? 'chip-warn' : t === 'info' ? 'chip-info' : 'chip-ok'

export default function BrainPanel({ tema = 'esta vista', insights = [] }) {
  const [open, setOpen] = useState(false)

  if (!open) {
    return (
      <button onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-kratos-ink text-white text-sm font-semibold hover:opacity-90 transition">
        <BrainCircuit size={18}/> Análisis por Kratos FP Brain
      </button>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2.5">
        <span className="w-9 h-9 bg-kratos-ink text-white flex items-center justify-center shrink-0"><BrainCircuit size={17}/></span>
        <div>
          <h3 className="font-display text-base font-semibold text-kratos-ink leading-tight">Análisis por Kratos FP Brain</h3>
          <p className="text-[12px] text-kratos-muted">Lectura predictiva de {tema} · solo los datos de esta pestaña</p>
        </div>
        <button onClick={() => setOpen(false)} className="ml-auto text-[12px] text-kratos-muted hover:text-kratos-ink">Ocultar</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {insights.map((it, i) => (
          <div key={i} className="panel p-5 border-t-2 border-t-kratos-ink flex flex-col">
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="label-mono">Predicción {i + 1}</span>
              <span className={chipOf(it.tone)}>{it.tag}</span>
            </div>
            <h4 className="font-display text-base font-semibold text-kratos-ink leading-snug">{it.titulo}</h4>
            {it.prediccion && <p className="text-[13px] text-kratos-subtle mt-2 leading-relaxed"><span className="font-semibold text-kratos-ink">Predicción:</span> {it.prediccion}</p>}
            {it.accion && <p className="text-[13px] text-kratos-subtle mt-2 leading-relaxed"><span className="font-semibold text-kratos-ink">Acción sugerida:</span> {it.accion}</p>}
            {it.confianza != null && (
              <div className="mt-auto pt-3 border-t border-kratos-border">
                <div className="flex justify-between text-[11px] text-kratos-muted mb-1"><span>Confianza del modelo</span><span className="font-mono">{it.confianza}%</span></div>
                <div className="h-1.5 bg-kratos-bg2 rounded-full overflow-hidden"><div className="h-full bg-kratos-ink" style={{ width: `${it.confianza}%` }}/></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
