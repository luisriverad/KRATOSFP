import { useState, useMemo } from 'react'
import { TrendingUp, Target, Phone, Mail, Filter, Plus, MessageSquare, Building2, ChevronRight, Activity, FileText, Search, DollarSign, Snowflake, Sparkles, User } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SectionCard from '../components/SectionCard'
import KPICard from '../components/KPICard'
import AgentCard from '../components/AgentCard'
import { Tabs, TabsList, Tab, TabPanel } from '../components/Tabs'
import Drawer from '../components/Drawer'
import CrmKanban from '../components/CrmKanban'
import ExpedienteCliente from '../components/expedientes/ExpedienteCliente'
import ProgressBar from '../components/ProgressBar'
import BrainPanel from '../components/BrainPanel'
import { crm, agentes, fmtMXN } from '../data/mockData'
import { expedientesClientes, clienteIndex } from '../data/clientesData'
import { pricingIA, scoreVendedores, clientesFrios, followUpIA } from '../data/iaData'
import { ResponsiveContainer, FunnelChart, Funnel, Tooltip, LabelList, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

const tooltip = { contentStyle: { background:'#FFFFFF', border:'1px solid #E5E3DC', borderRadius:0, fontSize:12 }, labelStyle:{ color:'#4A453F' } }

export default function CRM() {
  const [clienteSel, setClienteSel] = useState(null)
  const [tab, setTab] = useState('clientes')
  const [busq, setBusq] = useState('')
  const [nuevaOpSignal, setNuevaOpSignal] = useState(0)

  const crmAgents = agentes.filter(a => a.area === 'CRM')
  const total = crm.pipeline.reduce((s, p) => s + p.monto, 0)
  const ganadasMes = crm.pipeline.find(p => p.etapa.includes('Ganadas')).monto
  const ponderado = crm.oportunidades.reduce((s, o) => s + o.monto * o.prob, 0)

  const clienteClick = (nombre) => {
    const item = clienteIndex.find(c => c.nombre === nombre || nombre?.includes(c.nombre))
    if (item) setClienteSel(item.key)
  }

  const clientesList = clienteIndex.map(c => expedientesClientes[c.key])
  const clientesFiltrados = useMemo(() => {
    if (!busq) return clientesList
    return clientesList.filter(c => `${c.nombre} ${c.industria}`.toLowerCase().includes(busq.toLowerCase()))
  }, [busq, clientesList])

  const todasLasActividades = useMemo(() => {
    return clientesList.flatMap(c => c.actividades.map(a => ({ ...a, cliente: c.nombre, key: clienteIndex.find(ci => ci.nombre === c.nombre)?.key })))
      .sort((a, b) => b.fecha.localeCompare(a.fecha))
  }, [clientesList])

  return (
    <div className="space-y-7">
      <PageHeader
        title="CRM Comercial"
        owner="Ing. Ricardo Nieto + Equipo Comercial"
        badges={[
          { label: `${fmtMXN(total)} pipeline`, className: 'chip-purple' },
          { label: `Hit rate 34%`, className: 'chip-warn' }
        ]}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KPICard label="Clientes activos"     value={clientesList.filter(c=>c.estado==='Activo').length} delta={0} deltaLabel={`${clienteIndex.length} totales`} icon={Building2}  accent="info"/>
        <KPICard label="Pipeline activo"       value={fmtMXN(total)}    delta={18} deltaLabel="embudo CRM"          icon={TrendingUp} accent="purple"/>
        <KPICard label="Ganadas mes"           value={fmtMXN(ganadasMes)}delta={22} deltaLabel="3 oportunidades"   icon={TrendingUp} accent="ok"/>
        <KPICard label="Actividades"           value={todasLasActividades.length} delta={6} deltaLabel="registradas" icon={Activity}  accent="info"/>
      </div>

      <div className="panel">
        <Tabs value={tab} onChange={setTab}>
          <TabsList>
            <Tab value="clientes" icon={Building2}    badge={clienteIndex.length}>Clientes</Tab>
            <Tab value="acts"     icon={Activity}     badge={todasLasActividades.length}>Actividades</Tab>
            <Tab value="kanban"   icon={Target}>CRM</Tab>
          </TabsList>

          {/* CLIENTES */}
          <TabPanel value="clientes" className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-kratos-subtle pointer-events-none"/>
                <input
                  type="text"
                  placeholder="Buscar cliente o industria..."
                  value={busq}
                  onChange={e => setBusq(e.target.value)}
                  className="w-full bg-white border border-kratos-border rounded-none pl-10 pr-3 py-2 text-sm text-kratos-text placeholder:text-kratos-subtle focus:outline-none focus:border-kratos-red/50"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {clientesFiltrados.map(c => (
                <button
                  key={c.id}
                  onClick={() => setClienteSel(clienteIndex.find(ci => ci.nombre === c.nombre)?.key)}
                  className="text-left panel panel-hover p-4 relative group"
                >
                  <span className="absolute top-3 right-3 text-kratos-subtle group-hover:text-kratos-red">
                    <ChevronRight size={16}/>
                  </span>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-none bg-gradient-to-br from-kratos-info to-blue-700 flex items-center justify-center shrink-0">
                      <Building2 size={20} className="text-kratos-ink"/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-kratos-ink font-semibold truncate pr-4">{c.nombre}</div>
                      <div className="text-[11px] text-kratos-subtle">{c.industria}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={c.estado === 'Activo' ? 'chip-ok' : c.estado === 'En riesgo' ? 'chip-danger' : 'chip-muted'}>{c.estado}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-kratos-border/60 text-xs">
                    <div>
                      <div className="label-mono">LTV</div>
                      <div className="font-mono text-kratos-ink mt-0.5">{fmtMXN(c.ltv)}</div>
                    </div>
                    <div>
                      <div className="label-mono">CXC</div>
                      <div className={`font-mono mt-0.5 ${c.cxcVencida > 0 ? 'text-kratos-danger' : 'text-kratos-ink'}`}>{fmtMXN(c.cxc)}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-5"><BrainPanel tema="cartera de clientes" insights={[
              { tag: 'Riesgo', tone: 'danger', titulo: 'Concentración de cartera', prediccion: 'ICA Fluor + Carso concentran 48% del LTV total; si uno reduce gasto en Q3, la proyección de ingreso comercial cae ~$3.2M antes del 30 sep.', accion: 'Activar plan de diversificación: priorizar 2 cuentas medianas para subir su LTV >20%.', confianza: 84 },
              { tag: 'Alerta temprana', tone: 'warn', titulo: 'CxC vencida creciente', prediccion: 'Las cuentas en estado "En riesgo" con CxC vencida tienen 71% de probabilidad de superar 60 días de mora hacia mediados de julio, tensionando la caja.', accion: 'Escalar cobranza con los 3 clientes de mayor CxC vencida esta semana.', confianza: 76 },
            ]}/></div>
          </TabPanel>

          {/* ACTIVIDADES */}
          <TabPanel value="acts" className="p-5">
            <div className="surface-2 overflow-hidden">
              <table className="w-full">
                <thead><tr>
                  <th className="table-th">Fecha</th>
                  <th className="table-th">Cliente</th>
                  <th className="table-th">Tipo</th>
                  <th className="table-th">Detalle</th>
                  <th className="table-th">Owner</th>
                </tr></thead>
                <tbody>
                  {todasLasActividades.map((a, i) => (
                    <tr key={i} className="table-row row-clickable" onClick={() => setClienteSel(a.key)}>
                      <td className="table-td text-xs">{a.fecha}</td>
                      <td className="table-td font-medium">{a.cliente}</td>
                      <td className="table-td"><span className={a.tipo === 'Visita' ? 'chip-ok' : a.tipo === 'Llamada' ? 'chip-info' : a.tipo === 'Reunión' ? 'chip-warn' : 'chip-muted'}>{a.tipo}</span></td>
                      <td className="table-td">{a.detalle}</td>
                      <td className="table-td text-xs text-kratos-subtle">{a.owner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5"><BrainPanel tema="actividades comerciales" insights={[
              { tag: 'Tendencia', tone: 'info', titulo: 'Mix de actividad sesgado', prediccion: 'El ritmo actual de llamadas vs. visitas proyecta un cierre de mes con 30% menos visitas presenciales que el promedio; históricamente esto reduce el hit rate ~5 pts el mes siguiente.', accion: 'Reasignar al menos 4 visitas presenciales a cuentas con oportunidad activa antes del 30 jun.', confianza: 72 },
              { tag: 'Oportunidad', tone: 'ok', titulo: 'Seguimiento sin convertir', prediccion: 'Las cuentas con 3+ actividades recientes sin oportunidad nueva tienen 64% de probabilidad de generar un deal si se contactan en los próximos 10 días.', accion: 'Crear oportunidad formal para los clientes con mayor frecuencia de contacto esta quincena.', confianza: 70 },
            ]}/></div>
          </TabPanel>

          {/* CRM KANBAN */}
          <TabPanel value="kanban" className="p-5">
            <CrmKanban openSignal={nuevaOpSignal} />
            <div className="mt-5"><BrainPanel tema="pipeline de oportunidades" insights={[
              { tag: 'Proyección', tone: 'ok', titulo: 'Cierre ponderado del trimestre', prediccion: `El pipeline ponderado (${fmtMXN(ponderado)}) tiene 62% de probabilidad de materializarse antes del 30 sep si las etapas avanzadas mantienen su velocidad actual.`, accion: 'Enfocar al equipo en empujar las 3 oportunidades de mayor monto en Negociación.', confianza: 80 },
              { tag: 'Alerta temprana', tone: 'warn', titulo: 'Estancamiento por etapa', prediccion: 'Las oportunidades detenidas en etapas tempranas del embudo tienen 58% de probabilidad de enfriarse y caer del pipeline antes de fin de mes.', accion: 'Definir próxima acción con fecha para cada oportunidad sin movimiento en 14+ días.', confianza: 73 },
            ]}/></div>
          </TabPanel>

        </Tabs>
      </div>

      <Drawer
        open={!!clienteSel}
        onClose={() => setClienteSel(null)}
        title="Expediente de cliente"
        subtitle="Oportunidades · Contratos · Facturación · Actividades"
        actions={<button className="btn-ghost text-xs"><FileText size={12}/> Exportar PDF</button>}
      >
        {clienteSel && expedientesClientes[clienteSel] && (
          <ExpedienteCliente cliente={expedientesClientes[clienteSel]} clienteKey={clienteSel}/>
        )}
      </Drawer>
    </div>
  )
}
