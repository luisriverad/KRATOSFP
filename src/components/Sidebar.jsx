import { NavLink } from 'react-router-dom'
import { modulos, usuarios } from '../data/mockData'

export default function Sidebar() {
  // Agrupar manteniendo el orden de aparición
  const grupos = []
  modulos.forEach(m => {
    let g = grupos.find(x => x.label === m.group)
    if (!g) { g = { label: m.group, items: [] }; grupos.push(g) }
    g.items.push(m)
  })

  return (
    <aside className="w-72 shrink-0 bg-kratos-panel border-r border-kratos-border flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-6 pt-6 pb-5">
        <div className="flex items-center gap-3">
          <img
            src="/logo-kratos-fp.png"
            alt="Kratos FP"
            className="w-10 h-10 rounded-none object-contain bg-white border border-kratos-border shadow-soft p-1"
          />
          <div className="leading-tight">
            <div className="font-display text-xl font-semibold text-kratos-ink tracking-tight">Kratos FP</div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-kratos-muted">Inteligencia Empresarial<br/>Avanzada</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 pl-2 pr-3 py-2 overflow-y-auto">
        {grupos.map((g, gi) => (
          <div key={g.label} className={gi === 0 ? '' : 'mt-5 pt-5 border-t border-kratos-border ml-1 mr-3'}>
            <div className="px-2 mb-2 label-mono">{g.label}</div>
            <ul className="space-y-0.5">
              {g.items.map(m => {
                const isBrain = m.id === 'brain'
                return (
                  <li key={m.id}>
                    <NavLink
                      to={m.path}
                      end={m.path === '/'}
                      className={({ isActive }) =>
                        `group flex items-center gap-3 px-2.5 py-2.5 rounded-none text-sm transition-colors ${
                          isBrain
                            ? 'bg-kratos-red text-white font-semibold shadow-soft hover:opacity-90'
                            : isActive
                              ? 'bg-kratos-ink text-white'
                              : 'text-kratos-text hover:bg-kratos-bg2/70'
                        }`
                      }
                    >
                      <span className="flex-1 font-medium">{m.label}</span>
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="px-3 py-3 border-t border-kratos-border">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-none hover:bg-kratos-bg2/70 transition-colors">
          <span className="w-9 h-9 rounded-none flex items-center justify-center font-display font-semibold text-white text-xs shrink-0" style={{ background: `linear-gradient(135deg, ${usuarios.ceo.color}, ${usuarios.ceo.color}AA)` }}>
            {usuarios.ceo.avatar}
          </span>
          <div className="flex-1 min-w-0 text-left">
            <div className="text-sm text-kratos-ink font-medium truncate">{usuarios.ceo.nombre}</div>
            <div className="text-[10px] uppercase tracking-wider text-kratos-muted">Director General</div>
          </div>
        </button>
      </div>

      <div className="px-6 py-3 border-t border-kratos-border bg-kratos-panel-2 flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-kratos-muted">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-kratos-ok rounded-full pulse-dot"></span>
          Sistema en línea
        </span>
        <span className="font-mono">v0.2</span>
      </div>
    </aside>
  )
}
