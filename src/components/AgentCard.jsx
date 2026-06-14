import { Bot, Zap, Clock } from 'lucide-react'

export default function AgentCard({ agente, compact = false }) {
  const isPiloto = agente.estado === 'En piloto'
  return (
    <div className="panel panel-hover p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-kratos-red-soft border border-kratos-red/20 flex items-center justify-center text-kratos-red">
            <Bot size={16} />
          </div>
          <div>
            <div className="text-sm font-semibold text-kratos-ink leading-tight">{agente.nombre}</div>
            <div className="text-[11px] text-kratos-muted font-mono">{agente.id} · {agente.area}</div>
          </div>
        </div>
        <span className={isPiloto ? 'chip-warn' : 'chip-ok'}>{agente.estado}</span>
      </div>
      {!compact && <p className="text-xs text-kratos-subtle leading-relaxed mb-3">{agente.descripcion}</p>}
      <div className="flex items-center gap-3 text-[11px] border-t border-kratos-border pt-2.5">
        <span className="flex items-center gap-1 text-kratos-subtle"><Zap size={11} className="text-kratos-warn"/> {agente.accionesHoy} acciones</span>
        <span className="flex items-center gap-1 text-kratos-subtle"><Clock size={11} className="text-kratos-info"/> {agente.ahorroH}h ahorradas</span>
      </div>
    </div>
  )
}
