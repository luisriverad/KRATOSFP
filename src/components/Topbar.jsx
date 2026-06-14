import { Search, Bell, Command, HelpCircle } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { modulos, alertas } from '../data/mockData'

const sevDot = { danger: 'bg-kratos-danger', warn: 'bg-kratos-warn', info: 'bg-kratos-info' }

export default function Topbar() {
  const loc = useLocation()
  const current = modulos.find(m => m.path === loc.pathname) || modulos[0]
  const [openAlerts, setOpenAlerts] = useState(false)

  return (
    <header className="h-16 px-6 border-b border-kratos-border bg-kratos-panel/80 backdrop-blur-md flex items-center gap-6 sticky top-0 z-30">
      {/* Breadcrumb */}
      <div className="flex items-baseline gap-3 min-w-0 shrink-0">
        <span className="font-mono text-[10px] tracking-[0.16em] text-kratos-muted">{current.numero}</span>
        <h1 className="font-display text-lg font-semibold text-kratos-ink tracking-tight truncate">{current.label}</h1>
        <span className="text-[12px] text-kratos-muted truncate hidden xl:block max-w-[280px]">{current.kicker}</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md ml-auto relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-kratos-muted pointer-events-none z-10">
          <Search size={14} />
        </span>
        <input
          type="text"
          placeholder="Buscar en todo el sistema…"
          className="w-full pl-10 pr-12 py-2 bg-kratos-panel-2"
        />
        <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-white border border-kratos-border text-[10px] text-kratos-muted font-mono flex items-center gap-0.5">
          <Command size={9} />K
        </kbd>
      </div>

      <button className="w-9 h-9 rounded-lg border border-kratos-border bg-white hover:bg-kratos-panel-2 flex items-center justify-center text-kratos-subtle transition">
        <HelpCircle size={15}/>
      </button>

      {/* Alerts */}
      <div className="relative">
        <button onClick={() => setOpenAlerts(o => !o)} className="relative w-9 h-9 rounded-lg border border-kratos-border bg-white hover:bg-kratos-panel-2 flex items-center justify-center text-kratos-subtle transition">
          <Bell size={15}/>
          <span className="absolute -top-1 -right-1 bg-kratos-red text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center font-mono">{alertas.length}</span>
        </button>
        {openAlerts && (
          <div className="absolute right-0 mt-2 w-96 panel z-40 overflow-hidden">
            <div className="px-4 py-3 border-b border-kratos-border flex items-center justify-between">
              <span className="font-display font-semibold text-kratos-ink">Alertas en vivo</span>
              <span className="label-mono">{alertas.length} señales</span>
            </div>
            <ul className="max-h-96 overflow-y-auto">
              {alertas.map((a, i) => (
                <li key={i} className="px-4 py-3 border-b border-kratos-border last:border-0 hover:bg-kratos-bg2/50 cursor-pointer">
                  <div className="flex items-start gap-2">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${sevDot[a.sev]}`}></span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-kratos-ink leading-snug">{a.mensaje}</p>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-kratos-muted">
                        <span>{a.area}</span>
                        <span>·</span>
                        <span>{a.hora}</span>
                        <span className="ml-auto font-mono text-[10px]">{a.agente}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}
