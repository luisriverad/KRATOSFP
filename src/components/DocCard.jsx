import { FileText, FileCheck2, FileWarning, FileX2, Download, Eye } from 'lucide-react'

const ICONS = {
  vigente: FileCheck2,
  proximo: FileWarning,
  vencido: FileX2,
  pendiente: FileText
}

const STYLES = {
  vigente:   { wrap: 'border-kratos-border bg-kratos-panel',        text: 'text-kratos-ok',     chip: 'chip-ok',     label: 'Vigente' },
  proximo:   { wrap: 'border-kratos-warn/30 bg-kratos-warn-soft',   text: 'text-kratos-warn',   chip: 'chip-warn',   label: 'Por vencer' },
  vencido:   { wrap: 'border-kratos-danger/30 bg-kratos-danger-soft', text: 'text-kratos-danger', chip: 'chip-danger', label: 'Vencido' },
  pendiente: { wrap: 'border-kratos-border bg-kratos-bg2',          text: 'text-kratos-muted',  chip: 'chip-muted',  label: 'Pendiente' }
}

export default function DocCard({ tipo, nombre, vence, estado = 'vigente', emisor, folio, archivo }) {
  const Icon = ICONS[estado] ?? FileText
  const s = STYLES[estado]

  return (
    <div className={`p-4 rounded-xl border ${s.wrap} group`}>
      <div className="flex items-start gap-3">
        <div className={`w-9 h-9 rounded-lg bg-white border border-kratos-border flex items-center justify-center shrink-0`}>
          <Icon size={16} className={s.text} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="label-mono">{tipo}</div>
          <div className="text-sm font-medium text-kratos-ink mt-0.5 truncate">{nombre}</div>
          <div className="text-[11px] text-kratos-muted mt-0.5 flex items-center gap-2 flex-wrap">
            {emisor && <span>{emisor}</span>}
            {folio && <span className="font-mono">· {folio}</span>}
          </div>
          <div className="flex items-center justify-between gap-2 mt-3">
            <div className="text-[11px] text-kratos-subtle">
              {vence ? <>Vence <span className={`font-mono ${s.text}`}>{vence}</span></> : <span className="italic text-kratos-muted">Sin fecha</span>}
            </div>
            <span className={s.chip}>{s.label}</span>
          </div>
          {archivo && (
            <div className="mt-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-[11px] text-kratos-subtle hover:text-kratos-ink flex items-center gap-1"><Eye size={11}/> Ver</button>
              <button className="text-[11px] text-kratos-subtle hover:text-kratos-ink flex items-center gap-1"><Download size={11}/> Descargar</button>
              <span className="text-[10px] text-kratos-muted font-mono ml-auto truncate">{archivo}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
