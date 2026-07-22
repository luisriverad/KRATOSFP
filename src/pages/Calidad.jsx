import { useState } from 'react'
import { createPortal } from 'react-dom'
import { ShieldCheck, AlertOctagon, Award, FileSearch, ListChecks, Activity, FileCheck, AlertTriangle, DollarSign, Repeat, ScrollText, X, CheckCircle2, BrainCircuit } from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, RadialBarChart, RadialBar, PolarAngleAxis, ScatterChart, Scatter, ZAxis } from 'recharts'
import PageHeader from '../components/PageHeader'
import SectionCard from '../components/SectionCard'
import KPICard from '../components/KPICard'
import AgentCard from '../components/AgentCard'
import { Tabs, TabsList, Tab, TabPanel } from '../components/Tabs'
import GaugeRing from '../components/GaugeRing'
import ProgressBar from '../components/ProgressBar'
import BrainPanel from '../components/BrainPanel'
import { calidad, agentes, checklists, fmtMXN } from '../data/mockData'
import { matrizRiesgoOperativo, ncRecurrentes, scoreISO, alertasLegales, costoNoCalidad } from '../data/iaData'

const tooltip = { contentStyle: { background:'#FFFFFF', border:'1px solid #E5E3DC', borderRadius:0, fontSize:12 }, labelStyle:{ color:'#4A453F' } }

// Análisis de Kratos FP Brain sobre el costo de no calidad
const ANALISIS_BRAIN = [
  {
    foco: 'Ausentismo no planificado', monto: 184000, ahorro: 92000,
    recomendacion: 'El mayor sangrado del mes. Atacarlo con control biométrico y cobertura escalonada elimina el pago de horas extra y cobertura externa de último momento.',
    plan: ['Tablero semanal de ausentismo por cuadrilla', 'Aviso anticipado con incentivo de puntualidad', 'Bolsa de operadores de respaldo certificados']
  },
  {
    foco: 'Retrasos en obras', monto: 148000, ahorro: 74000,
    recomendacion: 'Las penalizaciones se previenen, no se pagan. Estandarizar la planeación con hitos y semáforo de avance anticipa la desviación antes de que cueste.',
    plan: ['Cronograma con hitos y holguras por proyecto', 'Junta diaria de 10 min de avance en sitio', 'Alerta temprana al cliente ante desviación > 1 día']
  },
  {
    foco: 'Reparaciones por mal uso', monto: 112000, ahorro: 56000,
    recomendacion: 'El correctivo no planeado se reduce con disciplina de operación: checklist pre-operación obligatorio y recertificación de operadores ligada a evaluación.',
    plan: ['Checklist pre-operación obligatorio (app móvil)', 'Recertificación anual de operadores', 'Bitácora de uso indebido ligada a desempeño']
  }
]

export default function Calidad() {
  const [tab, setTab] = useState('certif')
  // Levantar NC
  const NC_VACIA = { hallazgo: '', area: 'Operaciones', severidad: 'Mayor', responsable: '', detalle: '' }
  const [showNC, setShowNC] = useState(false)
  const [formNC, setFormNC] = useState(NC_VACIA)
  const [ncsLevantadas, setNcsLevantadas] = useState([])
  const [okFolio, setOkFolio] = useState(null)
  const [showAnalisis, setShowAnalisis] = useState(false)
  const levantarNC = (e) => {
    e.preventDefault()
    if (!formNC.hallazgo.trim()) return
    const folio = 'NC-' + String(calidad.noConformidades.length + ncsLevantadas.length + 1).padStart(3, '0')
    setNcsLevantadas(prev => [...prev, { ...formNC, folio, fecha: new Date().toISOString().slice(0, 10), estado: 'Abierta' }])
    setFormNC(NC_VACIA)
    setShowNC(false)
    setOkFolio(folio)
  }

  const calAgents = agentes.filter(a => a.area === 'Calidad')
  const ncAbiertas = calidad.noConformidades.filter(n => n.estado !== 'Cerrada').length + ncsLevantadas.length
  const ncCerradas = calidad.noConformidades.filter(n => n.estado === 'Cerrada').length
  const cierrePct = Math.round((ncCerradas / calidad.noConformidades.length) * 100)
  const certifVencen = calidad.certificacionesGruas.filter(c => c.estado === 'Por vencer').length
  const auditPromedio = Math.round(calidad.auditorias.reduce((s, a) => s + a.resultado, 0) / calidad.auditorias.length)

  // KPIs alineados a las sub-pestañas
  const certVigentes    = calidad.certificacionesGruas.filter(c => c.estado === 'Vigente').length
  const certTotal       = calidad.certificacionesGruas.length
  const costoNCTotal    = costoNoCalidad.reduce((s, c) => s + c.monto, 0)
  const costoNCEventos  = costoNoCalidad.reduce((s, c) => s + c.eventos, 0)
  const ncRecRepetic    = ncRecurrentes.reduce((s, r) => s + r.repeticiones, 0)
  const legalesProximas = alertasLegales.filter(a => a.estado === 'proximo').length

  const todasChecklists = [
    { area: 'Operaciones', resp: checklists.operaciones.responsable, cumple: checklists.operaciones.cumplimiento, items: checklists.operaciones.items.length, hallazgos: checklists.operaciones.items.filter(i => !i.cumple).length },
    { area: 'Finanzas',     resp: checklists.finanzas.responsable,     cumple: checklists.finanzas.cumplimiento,     items: checklists.finanzas.items.length,     hallazgos: checklists.finanzas.items.filter(i => !i.cumple).length },
    { area: 'Compras',      resp: checklists.compras.responsable,      cumple: checklists.compras.cumplimiento,      items: checklists.compras.items.length,      hallazgos: checklists.compras.items.filter(i => !i.cumple).length },
    { area: 'Marketing',    resp: checklists.marketing.responsable,    cumple: checklists.marketing.cumplimiento,    items: checklists.marketing.items.length,    hallazgos: checklists.marketing.items.filter(i => !i.cumple).length }
  ]

  return (
    <div className="space-y-7">
      <PageHeader
        title="Calidad"
        owner="Coordinación General (apoyo Calidad)"
        badges={[
          { label: `${ncAbiertas} NC abiertas`, className: ncAbiertas > 0 ? 'chip-warn' : 'chip-ok' },
          { label: `Score ${auditPromedio}/100`, className: 'chip-ok' }
        ]}
      />

      {okFolio && (
        <div className="rounded-none border border-kratos-ok/30 bg-kratos-ok-soft px-4 py-3 flex items-center gap-3">
          <CheckCircle2 size={18} className="text-kratos-ok shrink-0"/>
          <span className="text-sm text-kratos-ok">No conformidad <strong>{okFolio}</strong> levantada y registrada. Se notificó al responsable.</span>
          <button onClick={() => setOkFolio(null)} className="ml-auto text-kratos-ok/70 hover:text-kratos-ok"><X size={16}/></button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KPICard label="Certificaciones vigentes" value={`${certVigentes}/${certTotal}`} deltaLabel={`${certifVencen} por vencer (30d)`} icon={Award}        accent={certifVencen > 0 ? 'warn' : 'ok'}/>
        <KPICard label="Costo de no calidad"       value={fmtMXN(costoNCTotal)}          deltaLabel={`${costoNCEventos} eventos · mes`} icon={DollarSign}   accent="red"/>
        <KPICard label="NC recurrentes"            value={ncRecurrentes.length}          deltaLabel={`${ncRecRepetic} repeticiones`}    icon={Repeat}       accent="warn"/>
        <KPICard label="Alertas legales"           value={legalesProximas}               deltaLabel={`${alertasLegales.length} en seguimiento`} icon={ScrollText} accent={legalesProximas > 0 ? 'red' : 'ok'}/>
      </div>

      <div className="panel">
        <Tabs value={tab} onChange={setTab}>
          <TabsList>
            <Tab value="certif"      icon={Award}        badge={calidad.certificacionesGruas.length}>Certificaciones</Tab>
            <Tab value="legales"     icon={ScrollText}    badge={alertasLegales.filter(a => a.estado === 'proximo').length || null}>Alertas legales</Tab>
          </TabsList>

          {/* CERTIFICACIONES */}
          <TabPanel value="certif" className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {calidad.certificacionesGruas.map((c, i) => (
                <div key={i} className="surface-2 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-display text-xl font-semibold text-kratos-ink leading-none">{c.eco}</div>
                      <div className="text-[11px] text-kratos-subtle mt-1">{c.tipo}</div>
                    </div>
                    <span className={c.estado === 'Vigente' ? 'chip-ok' : 'chip-warn'}>{c.estado}</span>
                  </div>
                  <div className="text-xs text-kratos-subtle mt-3">Vence</div>
                  <div className="font-mono text-base text-kratos-ink">{c.vence}</div>
                </div>
              ))}
            </div>
            <div className="mt-5"><BrainPanel tema="certificaciones de grúas" insights={[
              { tag: 'Alerta temprana', tone: 'danger', titulo: 'Recertificación ISO 9001 en riesgo de gap', prediccion: `Con ${certifVencen} de ${certTotal} certificados por vencer en los próximos 30 días, el primero (ISO 9001) caduca el 15 ago; sin auditoría de recertificación agendada antes del 1 jul, el 60% de las grúas afectadas operaría sin cobertura entre ago y sep.`, accion: 'Agendar la auditoría de recertificación antes del 1 jul y consolidar los vencimientos en un solo ciclo anual para evitar gaps.', confianza: 88 },
              { tag: 'Proyección', tone: 'warn', titulo: 'Vencimientos NOM se concentran en Q3', prediccion: `Manteniendo el patrón actual, ~${Math.max(2, certifVencen + 1)} certificados (NOM-006-STPS de grúas) vencerán dentro del mismo trimestre, generando un pico de trámites y costos de inspección estimado en 1.4x el mes promedio hacia Q3.`, accion: 'Escalonar las renovaciones NOM y negociar tarifa por volumen con la unidad verificadora antes de agosto.', confianza: 76 },
            ]}/></div>
          </TabPanel>

          {/* ALERTAS LEGALES */}
          <TabPanel value="legales" className="p-5">
            <div className="surface-2 overflow-hidden">
              <table className="w-full">
                <thead><tr>
                  <th className="table-th">Tipo</th>
                  <th className="table-th">Título</th>
                  <th className="table-th">Vence</th>
                  <th className="table-th">Días restantes</th>
                  <th className="table-th">Estado</th>
                </tr></thead>
                <tbody>
                  {alertasLegales.sort((a,b)=>a.dias-b.dias).map((a, i) => (
                    <tr key={i} className="table-row">
                      <td className="table-td"><span className="chip-info">{a.tipo}</span></td>
                      <td className="table-td font-medium">{a.titulo}</td>
                      <td className="table-td font-mono text-xs">{a.vence}</td>
                      <td className="table-td"><span className={a.dias <= 30 ? 'chip-warn' : a.dias <= 90 ? 'chip-info' : 'chip-ok'}>{a.dias}d</span></td>
                      <td className="table-td"><span className={a.estado === 'vigente' ? 'chip-ok' : a.estado === 'proximo' ? 'chip-warn' : 'chip-danger'}>{a.estado}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5"><BrainPanel tema="obligaciones legales" insights={[
              { tag: 'Riesgo', tone: 'danger', titulo: 'Obligaciones próximas a vencer sin holgura', prediccion: `Hay ${legalesProximas} obligación(es) en estado "próximo"; la de menor plazo vence dentro de los próximos 30 días, y al ritmo actual de gestión documental ~40% llegaría a <15 días restantes, exponiendo a multa o suspensión si se cruza el vencimiento sin renovar.`, accion: 'Iniciar la renovación de los documentos con <30 días ahora y asignar responsable con fecha límite interna 10 días antes del vencimiento.', confianza: 86 },
              { tag: 'Proyección', tone: 'warn', titulo: 'Carga documental se acumula en el siguiente trimestre', prediccion: `De las ${alertasLegales.length} obligaciones en seguimiento, varias vencen en ventana de 31-90 días; sin escalonarlas, 3-4 trámites se concentrarán en el mismo mes, elevando el riesgo de incumplimiento por saturación administrativa.`, accion: 'Calendarizar las renovaciones de 31-90 días distribuidas y automatizar recordatorios a 60/30/15 días.', confianza: 73 },
            ]}/></div>
          </TabPanel>
        </Tabs>
      </div>

      {showNC && createPortal(
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={() => setShowNC(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"/>
          <form onSubmit={levantarNC} className="relative panel w-full max-w-lg p-6 shadow-2xl max-h-[88vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setShowNC(false)} className="absolute right-4 top-4 text-kratos-muted hover:text-kratos-ink transition"><X size={18}/></button>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-9 h-9 rounded-none bg-kratos-danger text-white flex items-center justify-center"><AlertOctagon size={16}/></span>
              <div>
                <h3 className="font-display text-lg font-semibold text-kratos-ink leading-tight">Levantar no conformidad</h3>
                <p className="text-[12px] text-kratos-muted">Folio automático · {'NC-' + String(calidad.noConformidades.length + ncsLevantadas.length + 1).padStart(3, '0')}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[12px] text-kratos-muted">Hallazgo *</label>
                <input value={formNC.hallazgo} onChange={(e) => setFormNC(f => ({ ...f, hallazgo: e.target.value }))} placeholder="Título del incumplimiento detectado"
                  className="w-full mt-1 px-3 py-2.5 bg-kratos-panel-2 border border-kratos-border rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-kratos-border"/>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[12px] text-kratos-muted">Área / Proceso</label>
                  <select value={formNC.area} onChange={(e) => setFormNC(f => ({ ...f, area: e.target.value }))}
                    className="w-full mt-1 px-3 py-2.5 bg-kratos-panel-2 border border-kratos-border rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-kratos-border">
                    {['Operaciones', 'Finanzas', 'Compras', 'Almacén', 'RRHH', 'Calidad', 'SHEQ'].map(a => <option key={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[12px] text-kratos-muted">Severidad</label>
                  <select value={formNC.severidad} onChange={(e) => setFormNC(f => ({ ...f, severidad: e.target.value }))}
                    className="w-full mt-1 px-3 py-2.5 bg-kratos-panel-2 border border-kratos-border rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-kratos-border">
                    {['Crítica', 'Mayor', 'Menor'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[12px] text-kratos-muted">Responsable</label>
                  <input value={formNC.responsable} onChange={(e) => setFormNC(f => ({ ...f, responsable: e.target.value }))} placeholder="Nombre"
                    className="w-full mt-1 px-3 py-2.5 bg-kratos-panel-2 border border-kratos-border rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-kratos-border"/>
                </div>
              </div>
              <div>
                <label className="text-[12px] text-kratos-muted">Descripción</label>
                <textarea value={formNC.detalle} onChange={(e) => setFormNC(f => ({ ...f, detalle: e.target.value }))} rows={3} placeholder="Detalle del hallazgo, evidencia y acción inmediata…"
                  className="w-full mt-1 px-3 py-2.5 bg-kratos-panel-2 border border-kratos-border rounded-none text-sm resize-none focus:outline-none focus:ring-2 focus:ring-kratos-border"/>
              </div>
            </div>

            <button type="submit" disabled={!formNC.hallazgo.trim()}
              className="mt-5 px-4 py-2.5 bg-kratos-danger text-white rounded-none text-sm font-medium hover:opacity-90 transition disabled:opacity-40">
              Levantar NC
            </button>
          </form>
        </div>,
        document.body
      )}
    </div>
  )
}
