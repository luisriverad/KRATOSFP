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
import { calidad, agentes, checklists, fmtMXN } from '../data/mockData'
import { matrizRiesgoOperativo, ncRecurrentes, scoreISO, alertasLegales, costoNoCalidad } from '../data/iaData'

const tooltip = { contentStyle: { background:'#FFFFFF', border:'1px solid #E5E3DC', borderRadius:10, fontSize:12 }, labelStyle:{ color:'#4A453F' } }

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
        <div className="rounded-xl border border-kratos-ok/30 bg-kratos-ok-soft px-4 py-3 flex items-center gap-3">
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
            <Tab value="costoNC"     icon={DollarSign}>Costo no calidad</Tab>
            <Tab value="recurr"      icon={Repeat}        badge={ncRecurrentes.length}>NC recurrentes</Tab>
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
          </TabPanel>

          {/* COSTO NO CALIDAD */}
          <TabPanel value="costoNC" className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
              {costoNoCalidad.map((c, i) => (
                <div key={i} className="panel p-4">
                  <div className="label-mono">{c.concepto}</div>
                  <div className="font-display text-xl font-semibold text-kratos-danger mt-1">{fmtMXN(c.monto)}</div>
                  <div className="text-[11px] text-kratos-muted mt-1">{c.eventos} eventos</div>
                  <div className="text-[12px] text-kratos-subtle mt-2">{c.detalle}</div>
                </div>
              ))}
            </div>
            <div className="panel p-5">
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="section-title text-base">Total mensual</h3>
                <span className="font-display text-3xl font-semibold text-kratos-danger">{fmtMXN(costoNoCalidad.reduce((s,c)=>s+c.monto,0))}</span>
              </div>
              <p className="text-[12px] text-kratos-subtle">
                Si reducimos este costo en 50%, recuperamos {fmtMXN(costoNoCalidad.reduce((s,c)=>s+c.monto,0) / 2)} mensuales — equivalente al pago de 4 operadores.
              </p>
            </div>

            {/* Análisis por Kratos FP Brain */}
            {!showAnalisis ? (
              <button onClick={() => setShowAnalisis(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-kratos-ink text-white text-sm font-semibold hover:opacity-90 transition">
                <BrainCircuit size={18}/> Análisis por Kratos FP Brain
              </button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-lg bg-kratos-ink text-white flex items-center justify-center shrink-0"><BrainCircuit size={17}/></span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-kratos-ink leading-tight">Análisis por Kratos FP Brain</h3>
                    <p className="text-[12px] text-kratos-muted">Recomendaciones y planes de trabajo sobre los mayores costos de no calidad</p>
                  </div>
                  <button onClick={() => setShowAnalisis(false)} className="ml-auto text-[12px] text-kratos-muted hover:text-kratos-ink">Ocultar</button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                  {ANALISIS_BRAIN.map((r, i) => (
                    <div key={i} className="panel p-5 border-t-2 border-t-kratos-ink flex flex-col">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="label-mono">Recomendación {i + 1}</span>
                        <span className="chip-danger">{fmtMXN(r.monto)}/mes</span>
                      </div>
                      <h4 className="font-display text-base font-semibold text-kratos-ink leading-snug">{r.foco}</h4>
                      <p className="text-[13px] text-kratos-subtle mt-2 leading-relaxed">{r.recomendacion}</p>
                      <div className="mt-3">
                        <div className="label-mono mb-1.5">Plan de trabajo</div>
                        <ul className="space-y-1.5">
                          {r.plan.map((p, j) => (
                            <li key={j} className="flex items-start gap-2 text-[12px] text-kratos-subtle">
                              <span className="mt-0.5 w-4 h-4 rounded-full bg-kratos-ink/10 text-kratos-ink text-[9px] font-semibold flex items-center justify-center shrink-0">{j + 1}</span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-4 pt-3 border-t border-kratos-border text-[12px] flex items-center justify-between">
                        <span className="text-kratos-muted">Ahorro estimado</span>
                        <span className="font-mono font-semibold text-kratos-ok">{fmtMXN(r.ahorro)}/mes</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabPanel>

          {/* NC RECURRENTES IA */}
          <TabPanel value="recurr" className="p-5">
            <div className="surface-2 overflow-hidden">
              <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-kratos-border">
                <h3 className="section-title text-sm">Patrones recurrentes detectados</h3>
                <button className="btn-primary" onClick={() => setShowNC(true)}><AlertOctagon size={14}/> Levantar NC</button>
              </div>
              <table className="w-full">
                <thead><tr>
                  <th className="table-th">Patrón detectado</th>
                  <th className="table-th">Repeticiones</th>
                  <th className="table-th">Área</th>
                  <th className="table-th">Período</th>
                  <th className="table-th">Acción IA</th>
                </tr></thead>
                <tbody>
                  {ncRecurrentes.map((n, i) => (
                    <tr key={i} className="table-row">
                      <td className="table-td font-medium">{n.patron}</td>
                      <td className="table-td"><span className={n.repeticiones >= 5 ? 'chip-danger' : n.repeticiones >= 3 ? 'chip-warn' : 'chip-info'}>{n.repeticiones}x</span></td>
                      <td className="table-td">{n.area}</td>
                      <td className="table-td font-mono text-xs">{n.mes}</td>
                      <td className="table-td text-sm font-medium">{n.accion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 text-[11px] text-kratos-subtle px-2">IA detecta patrones repetidos para implementar controles preventivos automáticos.</div>
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
          </TabPanel>
        </Tabs>
      </div>

      {showNC && createPortal(
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={() => setShowNC(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"/>
          <form onSubmit={levantarNC} className="relative panel w-full max-w-lg p-6 shadow-2xl max-h-[88vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setShowNC(false)} className="absolute right-4 top-4 text-kratos-muted hover:text-kratos-ink transition"><X size={18}/></button>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-9 h-9 rounded-lg bg-kratos-danger text-white flex items-center justify-center"><AlertOctagon size={16}/></span>
              <div>
                <h3 className="font-display text-lg font-semibold text-kratos-ink leading-tight">Levantar no conformidad</h3>
                <p className="text-[12px] text-kratos-muted">Folio automático · {'NC-' + String(calidad.noConformidades.length + ncsLevantadas.length + 1).padStart(3, '0')}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[12px] text-kratos-muted">Hallazgo *</label>
                <input value={formNC.hallazgo} onChange={(e) => setFormNC(f => ({ ...f, hallazgo: e.target.value }))} placeholder="Título del incumplimiento detectado"
                  className="w-full mt-1 px-3 py-2.5 bg-kratos-panel-2 border border-kratos-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-kratos-border"/>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[12px] text-kratos-muted">Área / Proceso</label>
                  <select value={formNC.area} onChange={(e) => setFormNC(f => ({ ...f, area: e.target.value }))}
                    className="w-full mt-1 px-3 py-2.5 bg-kratos-panel-2 border border-kratos-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-kratos-border">
                    {['Operaciones', 'Finanzas', 'Compras', 'Almacén', 'RRHH', 'Calidad', 'SHEQ'].map(a => <option key={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[12px] text-kratos-muted">Severidad</label>
                  <select value={formNC.severidad} onChange={(e) => setFormNC(f => ({ ...f, severidad: e.target.value }))}
                    className="w-full mt-1 px-3 py-2.5 bg-kratos-panel-2 border border-kratos-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-kratos-border">
                    {['Crítica', 'Mayor', 'Menor'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[12px] text-kratos-muted">Responsable</label>
                  <input value={formNC.responsable} onChange={(e) => setFormNC(f => ({ ...f, responsable: e.target.value }))} placeholder="Nombre"
                    className="w-full mt-1 px-3 py-2.5 bg-kratos-panel-2 border border-kratos-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-kratos-border"/>
                </div>
              </div>
              <div>
                <label className="text-[12px] text-kratos-muted">Descripción</label>
                <textarea value={formNC.detalle} onChange={(e) => setFormNC(f => ({ ...f, detalle: e.target.value }))} rows={3} placeholder="Detalle del hallazgo, evidencia y acción inmediata…"
                  className="w-full mt-1 px-3 py-2.5 bg-kratos-panel-2 border border-kratos-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-kratos-border"/>
              </div>
            </div>

            <button type="submit" disabled={!formNC.hallazgo.trim()}
              className="mt-5 px-4 py-2.5 bg-kratos-danger text-white rounded-lg text-sm font-medium hover:opacity-90 transition disabled:opacity-40">
              Levantar NC
            </button>
          </form>
        </div>,
        document.body
      )}
    </div>
  )
}
