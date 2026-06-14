import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function Layout() {
  return (
    <div className="min-h-screen flex bg-kratos-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 px-8 py-8 overflow-x-hidden">
          <Outlet />
        </main>
        <footer className="px-8 py-3 text-[10px] uppercase tracking-[0.14em] text-kratos-muted border-t border-kratos-border bg-kratos-panel flex items-center justify-between">
          <span>© 2026 Kratos FP · Sistema de Inteligencia Empresarial Avanzada</span>
          <span className="font-mono">Zempoala · Hidalgo</span>
        </footer>
      </div>
    </div>
  )
}
