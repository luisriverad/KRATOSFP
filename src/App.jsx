import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import DashboardCEO from './pages/DashboardCEO'
import KratosBrain from './pages/KratosBrain'
import Finanzas from './pages/Finanzas'
import CRM from './pages/CRM'
import Operaciones from './pages/Operaciones'
import RRHH from './pages/RRHH'
import Compras from './pages/Compras'
import Calidad from './pages/Calidad'
import Agentes from './pages/Agentes'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/"             element={<DashboardCEO />} />
        <Route path="/brain"        element={<KratosBrain />} />
        <Route path="/finanzas"     element={<Finanzas />} />
        <Route path="/crm"          element={<CRM />} />
        <Route path="/operaciones"  element={<Operaciones />} />
        <Route path="/rrhh"         element={<RRHH />} />
        <Route path="/compras"      element={<Compras />} />
        <Route path="/calidad"      element={<Calidad />} />
        <Route path="/agentes"      element={<Agentes />} />
        <Route path="*"             element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
