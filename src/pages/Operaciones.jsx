import { useState, useMemo } from 'react'
import { Truck, MapPin, Fuel, FileCheck, Wrench, Radio, Calendar, ClipboardList, Map as MapIcon, Box, AlertTriangle, Filter, Search, ChevronRight, Activity, DollarSign, Star, Gauge, BatteryWarning, FileSpreadsheet, BrainCircuit } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SectionCard from '../components/SectionCard'
import KPICard from '../components/KPICard'
import AgentCard from '../components/AgentCard'
import ProgressBar from '../components/ProgressBar'
import GaugeRing from '../components/GaugeRing'
import { Tabs, TabsList, Tab, TabPanel } from '../components/Tabs'
import Drawer from '../components/Drawer'
import ExpedienteGrua from '../components/expedientes/ExpedienteGrua'
import MiniMap from '../components/MiniMap'
import Timeline from '../components/Timeline'
import { flota, agentes, checklists, usuarios, rrhh, fmtMXN } from '../data/mockData'
import { expedientesGruas, expedientesVehiculos } from '../data/expedientesData'
import { bitacoraDiaria, controlCargas, rutasSCT, procesoDPI } from '../data/operacionesData'
import { mantenimientoPredictivo, costoOperativoUnidad, scoreOperadores, telemetria, utilizacionMuerta, formatosOperativos } from '../data/iaData'
import { diasHasta, fmtDelta } from '../lib/dates'

const estadoChip = (estado) => {
  if (estado === 'En obra') return 'chip-ok'
  if (estado === 'En patio') return 'chip-info'
  if (estado === 'Mantenimiento') return 'chip-warn'
  return 'chip-muted'
}

export default function Operaciones() {
  const [filtroFlota, setFiltroFlota] = useState('todas')
  const [busqueda, setBusqueda] = useState('')
  const [gruaSel, setGruaSel] = useState(null)
  const [tabActiva, setTabActiva] = useState('flota')
  const [showAnalisisCargas, setShowAnalisisCargas] = useState(false)

  const opsAgents = agentes.filter(a => a.area === 'Operaciones')
  const enObra = flota.gruas.filter(g => g.estado === 'En obra').length
  const enMantto = flota.gruas.filter(g => g.estado === 'Mantenimiento').length
  const docsPorVencer = flota.gruas.filter(g => diasHasta(g.docVence) <= 30).length

  const gruasFiltradas = useMemo(() => {
    return flota.gruas.filter(g => {
      if (filtroFlota !== 'todas' && g.estado.toLowerCase() !== filtroFlota.toLowerCase()) return false
      if (busqueda && !`${g.eco} ${g.marca} ${g.modelo} ${g.operador} ${g.ubicacion}`.toLowerCase().includes(busqueda.toLowerCase())) return false
      return true
    })
  }, [filtroFlota, busqueda])

  const cargasMes = controlCargas.filter(c => c.fecha.startsWith('2026-05'))
  const horasMes  = cargasMes.reduce((s, c) => s + c.horas, 0)
  const ingresoMes= cargasMes.reduce((s, c) => s + c.monto, 0)

  // Análisis de Kratos FP Brain sobre las cargas
  const cargasPend = controlCargas.filter(c => c.estado === 'Pendiente OC')
  const cargasPendMonto = cargasPend.reduce((s, c) => s + c.monto, 0)
  const analisisCargas = [
    {
      foco: 'Cargas pendientes de OC', tag: 'Ingreso retenido', tone: 'danger',
      recomendacion: 'Hay servicios ya ejecutados sin orden de compra: trabajo hecho que no se factura ni se cobra. Bloquear el inicio de maniobra sin OC formal libera ese ingreso atorado.',
      plan: ['Exigir OC firmada antes de movilizar la unidad', 'Recordatorio automático al cliente a las 24 h', 'Tablero diario de cargas sin OC por cobrar'],
      pie: `${cargasPend.length} cargas sin OC · ${fmtMXN(cargasPendMonto)} por facturar`
    },
    {
      foco: 'Concentración en un cliente y sitio', tag: 'Riesgo comercial', tone: 'warn',
      recomendacion: 'La mayoría de las cargas se concentran en un solo cliente y obra (Constructora Tapachula · Tapachula 3278). Un freno en esa obra detiene el ingreso operativo del mes.',
      plan: ['Prospectar 2 sitios alternos en la región', 'Reservar capacidad para un cliente secundario', 'Alerta cuando un cliente supere 40% de las cargas'],
      pie: 'Diversificar cartera de obras antes que crecer flota'
    },
    {
      foco: 'Priorizar izaje pesado nocturno', tag: 'Mayor ingreso/hora', tone: 'ok',
      recomendacion: 'Los izajes pesados nocturnos generan el mayor ingreso por hora. Reservar las ventanas nocturnas para esas maniobras maximiza el rendimiento de la flota disponible.',
      plan: ['Agendar maniobras de alto valor en ventana nocturna', 'Tarifa diferenciada por horario y peso', 'Asignar operadores certificados a izaje pesado'],
      pie: 'El izaje nocturno es el de mayor monto por hora'
    }
  ]
  const pendienteOC = cargasMes.filter(c => c.estado === 'Pendiente OC').length

  const documentosFlota = useMemo(() => {
    const docs = []
    flota.gruas.forEach(g => {
      const exp = expedientesGruas[g.eco]
      if (!exp) return
      exp.documentos.forEach(d => docs.push({ ...d, unidad: g.eco, tipoUnidad: 'Grúa' }))
    })
    Object.values(expedientesVehiculos).forEach(v => {
      v.documentos.forEach(d => docs.push({ ...d, unidad: v.eco, tipoUnidad: v.tipo }))
    })
    return docs.sort((a, b) => {
      const order = { vencido: 0, proximo: 1, pendiente: 2, vigente: 3 }
      return (order[a.estado] ?? 9) - (order[b.estado] ?? 9)
    })
  }, [])

  return (
    <div className="space-y-7">
      <PageHeader
        title="Operaciones"
        owner={usuarios.operaciones.nombre + ' · ' + usuarios.operaciones.rol}
        badges={[
          { label: `${checklists.operaciones.cumplimiento}% checklist`, className: 'chip-warn' },
          { label: `${enObra}/${flota.gruas.length} en obra`, className: 'chip-ok' }
        ]}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KPICard label="Flota en obra" value={`${enObra}/${flota.gruas.length}`} delta={8} deltaLabel={`utilización ${Math.round(enObra/flota.gruas.length*100)}%`} icon={Truck} accent="ok"/>
        <KPICard label="Cargas del mes" value={cargasMes.length} delta={12} deltaLabel={`${horasMes.toFixed(0)} h facturables`} icon={Box} accent="info"/>
        <KPICard label="Docs por vencer (30d)" value={docsPorVencer} delta={-1} deltaLabel="vigilados por AG-08" icon={FileCheck} accent="warn"/>
        <KPICard label="Unidades en riesgo de falla" value={mantenimientoPredictivo.filter(m => m.prob >= 0.3).length} delta={1} deltaLabel="inspección urgente" icon={Gauge} accent="red"/>
      </div>

      <div className="panel">
        <Tabs value={tabActiva} onChange={setTabActiva}>
          <TabsList>
            <Tab value="flota"    icon={Truck}        badge={flota.gruas.length}>Flota</Tab>
            <Tab value="bitacora" icon={ClipboardList} badge={bitacoraDiaria.length}>Bitácora</Tab>
            <Tab value="cargas"   icon={Box}           badge={pendienteOC || null}>Cargas</Tab>
            <Tab value="docs"     icon={FileCheck}     badge={documentosFlota.filter(d => d.estado === 'vencido' || d.estado === 'proximo').length || null}>Documentos</Tab>
            <Tab value="predict"   icon={Gauge}>Mantto predictivo</Tab>
            <Tab value="opscore"   icon={Star}>Score operador</Tab>
            <Tab value="formatos"  icon={FileSpreadsheet} badge={formatosOperativos.length}>Formatos</Tab>
          </TabsList>

          {/* FLOTA */}
          <TabPanel value="flota" className="p-5">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-kratos-subtle pointer-events-none"/>
                <input
                  type="text"
                  placeholder="Buscar por eco, operador, ubicación..."
                  value={busqueda}
                  onChange={e => setBusqueda(e.target.value)}
                  className="w-full bg-white border border-kratos-border rounded-lg pl-10 pr-3 py-2 text-sm text-kratos-text placeholder:text-kratos-subtle focus:outline-none focus:border-kratos-red/50"
                />
              </div>
              <div className="flex gap-1 surface-2 p-1">
                {['todas','En obra','En patio','Mantenimiento'].map(f => (
                  <button key={f}
                    onClick={() => setFiltroFlota(f)}
                    className={`px-2.5 py-1 rounded-md text-xs ${filtroFlota === f ? 'bg-kratos-red text-white' : 'text-kratos-subtle hover:text-white'}`}>
                    {f === 'todas' ? 'Todas' : f}
                  </button>
                ))}
              </div>
              <span className="text-xs text-kratos-subtle">{gruasFiltradas.length} unidades</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
              {gruasFiltradas.map(g => {
                const exp = expedientesGruas[g.eco]
                return (
                  <button
                    key={g.eco}
                    onClick={() => setGruaSel(g.eco)}
                    className="text-left panel panel-hover p-4 relative group"
                  >
                    <span className="absolute top-3 right-3 text-kratos-subtle group-hover:text-kratos-red">
                      <ChevronRight size={16}/>
                    </span>
                    <div className="flex items-start justify-between mb-2 pr-5">
                      <div>
                        <div className="font-display text-xl font-semibold text-kratos-ink leading-none">{g.eco}</div>
                        <div className="text-[11px] text-kratos-subtle mt-1">{g.marca} {g.modelo} · {g.capacidad}</div>
                      </div>
                      <span className={estadoChip(g.estado)}>{g.estado}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs my-3">
                      <div>
                        <div className="label-mono">Ubicación</div>
                        <div className="text-kratos-ink truncate flex items-center gap-1"><MapPin size={11}/> {g.ubicacion}</div>
                      </div>
                      <div>
                        <div className="label-mono">Operador</div>
                        <div className="text-kratos-ink truncate">{g.operador}</div>
                      </div>
                      <div>
                        <div className="label-mono">Horómetro</div>
                        <div className="text-kratos-ink font-mono">{g.horometro.toLocaleString()} h</div>
                      </div>
                      <div>
                        <div className="label-mono">Utilización</div>
                        <div className="text-kratos-ink font-mono">{exp?.costos?.utilizacion || 0}%</div>
                      </div>
                    </div>
                    <div className="border-t border-kratos-border/60 pt-2">
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="text-kratos-subtle">Salud técnica</span>
                        <span className="font-mono text-kratos-text">{g.salud}/100</span>
                      </div>
                      <ProgressBar value={g.salud} accent="auto" showValue={false}/>
                      <div className="flex items-center justify-between text-[10px] text-kratos-subtle mt-2">
                        <span className="flex items-center gap-1"><FileCheck size={10}/> Vence {g.docVence}</span>
                        <span className={diasHasta(g.docVence) <= 30 ? 'text-kratos-warn' : ''}>{fmtDelta(diasHasta(g.docVence))}</span>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </TabPanel>

          {/* BITÁCORA */}
          <TabPanel value="bitacora" className="p-5">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              <div className="surface-2 p-4 xl:col-span-2">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="section-title text-sm">Bitácora de hechos · últimas 24 h</h4>
                  <div className="flex gap-1">
                    <button className="btn-ghost text-xs"><Filter size={11}/> Por área</button>
                    <button className="btn-ghost text-xs"><Calendar size={11}/> Fecha</button>
                  </div>
                </div>
                <Timeline items={bitacoraDiaria.map(b => ({
                  fecha: b.fecha, hora: b.hora, severity: b.severity,
                  titulo: b.evento,
                  detalle: `${b.area}${b.unidad !== '—' ? ' · ' + b.unidad : ''} · ${b.operador}`,
                  tag: b.turno === 'Noc' ? 'Nocturno' : 'Matutino',
                  tagClass: b.turno === 'Noc' ? 'chip-purple' : 'chip-info'
                }))} />
              </div>
              <div className="space-y-3">
                <div className="surface-2 p-4">
                  <h4 className="section-title text-sm mb-3">Eventos por severidad</h4>
                  {[
                    { sev: 'danger', label: 'Críticos', count: bitacoraDiaria.filter(b=>b.severity==='danger').length },
                    { sev: 'warn',   label: 'Advertencia', count: bitacoraDiaria.filter(b=>b.severity==='warn').length },
                    { sev: 'info',   label: 'Información', count: bitacoraDiaria.filter(b=>b.severity==='info').length },
                    { sev: 'ok',     label: 'OK', count: bitacoraDiaria.filter(b=>b.severity==='ok').length }
                  ].map(r => (
                    <div key={r.sev} className="flex items-center justify-between py-1.5 border-b border-kratos-border/40 last:border-0">
                      <span className={`chip-${r.sev}`}>{r.label}</span>
                      <span className="font-mono text-sm text-kratos-text">{r.count}</span>
                    </div>
                  ))}
                </div>
                <div className="surface-2 p-4">
                  <h4 className="section-title text-sm mb-3">Por turno</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1"><span>Matutino</span><span className="font-mono">{bitacoraDiaria.filter(b=>b.turno==='Mat').length}</span></div>
                      <ProgressBar value={bitacoraDiaria.filter(b=>b.turno==='Mat').length / bitacoraDiaria.length * 100} accent="info" showValue={false}/>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1"><span>Nocturno</span><span className="font-mono">{bitacoraDiaria.filter(b=>b.turno==='Noc').length}</span></div>
                      <ProgressBar value={bitacoraDiaria.filter(b=>b.turno==='Noc').length / bitacoraDiaria.length * 100} accent="warn" showValue={false}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          {/* CARGAS */}
          <TabPanel value="cargas" className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <div className="surface-2 p-3">
                <div className="label-mono">Cargas mes</div>
                <div className="text-xl font-display font-semibold text-kratos-ink mt-1">{cargasMes.length}</div>
              </div>
              <div className="surface-2 p-3">
                <div className="label-mono">Horas mes</div>
                <div className="text-xl font-display font-semibold text-kratos-ink mt-1">{horasMes.toFixed(1)} h</div>
              </div>
              <div className="surface-2 p-3">
                <div className="label-mono">Ingreso mes</div>
                <div className="text-xl font-display font-semibold text-kratos-ink mt-1">{fmtMXN(ingresoMes)}</div>
              </div>
              <div className="surface-2 p-3">
                <div className="label-mono">Pendientes OC</div>
                <div className="text-xl font-display font-semibold text-kratos-warn mt-1">{pendienteOC}</div>
              </div>
            </div>
            <div className="surface-2 overflow-hidden">
              <table className="w-full">
                <thead><tr>
                  <th className="table-th">Folio</th>
                  <th className="table-th">Fecha</th>
                  <th className="table-th">Grúa</th>
                  <th className="table-th">Cliente</th>
                  <th className="table-th">Sitio</th>
                  <th className="table-th">Tipo</th>
                  <th className="table-th">Horas</th>
                  <th className="table-th text-right">Monto</th>
                  <th className="table-th">Estado</th>
                </tr></thead>
                <tbody>
                  {controlCargas.slice(0, 16).map((c, i) => (
                    <tr key={i} className="table-row row-clickable" onClick={() => setGruaSel(c.grua)}>
                      <td className="table-td font-mono text-[11px]">{c.folio}</td>
                      <td className="table-td text-xs">{c.fecha}</td>
                      <td className="table-td font-mono text-xs text-kratos-red-glow">{c.grua}</td>
                      <td className="table-td text-xs">{c.cliente}</td>
                      <td className="table-td text-xs text-kratos-subtle">{c.sitio}</td>
                      <td className="table-td text-xs">{c.tipo}</td>
                      <td className="table-td font-mono text-xs">{c.horas} h</td>
                      <td className="table-td text-right font-mono text-xs">{fmtMXN(c.monto)}</td>
                      <td className="table-td"><span className={c.estado === 'Facturado' ? 'chip-ok' : 'chip-warn'}>{c.estado}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Análisis por Kratos FP Brain */}
            {!showAnalisisCargas ? (
              <button onClick={() => setShowAnalisisCargas(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-kratos-ink text-white text-sm font-semibold hover:opacity-90 transition">
                <BrainCircuit size={18}/> Análisis por Kratos FP Brain
              </button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-lg bg-kratos-ink text-white flex items-center justify-center shrink-0"><BrainCircuit size={17}/></span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-kratos-ink leading-tight">Análisis por Kratos FP Brain</h3>
                    <p className="text-[12px] text-kratos-muted">Recomendaciones y planes de trabajo sobre el control de cargas</p>
                  </div>
                  <button onClick={() => setShowAnalisisCargas(false)} className="ml-auto text-[12px] text-kratos-muted hover:text-kratos-ink">Ocultar</button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                  {analisisCargas.map((r, i) => (
                    <div key={i} className="panel p-5 border-t-2 border-t-kratos-ink flex flex-col">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="label-mono">Recomendación {i + 1}</span>
                        <span className={r.tone === 'danger' ? 'chip-danger' : r.tone === 'warn' ? 'chip-warn' : 'chip-ok'}>{r.tag}</span>
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
                      <div className="mt-4 pt-3 border-t border-kratos-border text-[12px] text-kratos-subtle">{r.pie}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabPanel>

          {/* DOCUMENTOS */}
          <TabPanel value="docs" className="p-5">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="chip-ok">Vigentes · {documentosFlota.filter(d => d.estado === 'vigente').length}</span>
              <span className="chip-warn">Por vencer · {documentosFlota.filter(d => d.estado === 'proximo').length}</span>
              <span className="chip-danger">Vencidos · {documentosFlota.filter(d => d.estado === 'vencido').length}</span>
              <span className="chip-muted">Pendientes · {documentosFlota.filter(d => d.estado === 'pendiente').length}</span>
            </div>
            <div className="surface-2 overflow-hidden">
              <table className="w-full">
                <thead><tr>
                  <th className="table-th">Unidad</th>
                  <th className="table-th">Tipo</th>
                  <th className="table-th">Documento</th>
                  <th className="table-th">Folio</th>
                  <th className="table-th">Vence</th>
                  <th className="table-th">Estado</th>
                </tr></thead>
                <tbody>
                  {documentosFlota.slice(0, 30).map((d, i) => (
                    <tr key={i} className="table-row row-clickable" onClick={() => d.tipoUnidad === 'Grúa' && setGruaSel(d.unidad)}>
                      <td className="table-td font-mono text-xs text-kratos-red-glow">{d.unidad}</td>
                      <td className="table-td text-xs text-kratos-subtle">{d.tipoUnidad}</td>
                      <td className="table-td">{d.tipo}</td>
                      <td className="table-td font-mono text-[10px] text-kratos-subtle">{d.folio}</td>
                      <td className="table-td font-mono text-xs">{d.vence || '—'}</td>
                      <td className="table-td">
                        <span className={d.estado === 'vigente' ? 'chip-ok' : d.estado === 'proximo' ? 'chip-warn' : d.estado === 'vencido' ? 'chip-danger' : 'chip-muted'}>
                          {d.estado === 'vigente' ? 'Vigente' : d.estado === 'proximo' ? 'Por vencer' : d.estado === 'vencido' ? 'Vencido' : 'Pendiente'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPanel>

          {/* MANTTO PREDICTIVO */}
          <TabPanel value="predict" className="p-5">
            <div className="surface-2 overflow-hidden">
              <table className="w-full">
                <thead><tr>
                  <th className="table-th">Eco</th>
                  <th className="table-th">Próxima falla pronosticada</th>
                  <th className="table-th">Probabilidad</th>
                  <th className="table-th">Horas restantes</th>
                  <th className="table-th">Vida útil</th>
                  <th className="table-th">Recomendación IA</th>
                </tr></thead>
                <tbody>
                  {mantenimientoPredictivo.map(m => (
                    <tr key={m.eco} className="table-row">
                      <td className="table-td font-mono font-semibold">{m.eco}</td>
                      <td className="table-td">{m.proximaFalla}</td>
                      <td className="table-td"><span className={m.prob >= 0.5 ? 'chip-danger' : m.prob >= 0.25 ? 'chip-warn' : 'chip-ok'}>{Math.round(m.prob*100)}%</span></td>
                      <td className="table-td font-mono text-sm">{m.horasRest} h</td>
                      <td className="table-td">
                        <div className="flex items-center gap-2 min-w-[100px]">
                          <span className="font-mono text-xs w-9">{m.vidaUtilPct}%</span>
                          <ProgressBar value={m.vidaUtilPct} accent={m.vidaUtilPct >= 70 ? 'ok' : m.vidaUtilPct >= 50 ? 'warn' : 'red'} showValue={false} className="flex-1"/>
                        </div>
                      </td>
                      <td className="table-td text-sm font-medium">{m.recomienda}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 text-[11px] text-kratos-subtle px-2">AG-10 cruza horómetros, km, bitácoras y patrones históricos para predecir fallas.</div>
          </TabPanel>

          {/* SCORE OPERADOR */}
          <TabPanel value="opscore" className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {scoreOperadores.map(o => (
                <div key={o.operador} className="panel p-5">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <div className="text-sm text-kratos-ink font-semibold">{o.operador}</div>
                      <div className="text-[11px] text-kratos-muted">Operador grúa</div>
                    </div>
                    <div className={`font-display text-3xl font-semibold ${o.scoreTotal >= 85 ? 'text-kratos-ok' : o.scoreTotal >= 75 ? 'text-kratos-warn' : 'text-kratos-danger'}`}>{o.scoreTotal}</div>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between mb-1"><span>Productividad</span><span className="font-mono">{o.productividad}</span></div>
                      <ProgressBar value={o.productividad} accent="auto" showValue={false}/>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1"><span>Checklist</span><span className="font-mono">{o.checklist}</span></div>
                      <ProgressBar value={o.checklist} accent="auto" showValue={false}/>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1"><span>Cuidado unidad</span><span className="font-mono">{o.cuidadoUnidad}</span></div>
                      <ProgressBar value={o.cuidadoUnidad} accent="auto" showValue={false}/>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-kratos-border/40 mt-2">
                      <div><span className="text-kratos-muted">Incidentes</span><span className={`ml-2 font-mono ${o.incidentes === 0 ? 'text-kratos-ok' : 'text-kratos-warn'}`}>{o.incidentes}</span></div>
                      <div><span className="text-kratos-muted">Retrasos</span><span className={`ml-2 font-mono ${o.retrasos <= 1 ? 'text-kratos-ok' : 'text-kratos-warn'}`}>{o.retrasos}</span></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>

          {/* FORMATOS OPERATIVOS */}
          <TabPanel value="formatos" className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {formatosOperativos.map(f => (
                <div key={f.id} className="panel p-4">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="label-mono">{f.id}</span>
                    <span className={f.tipo === 'Diario' ? 'chip-info' : f.tipo === 'Semanal' ? 'chip-warn' : f.tipo === 'Mensual' ? 'chip-purple' : 'chip-muted'}>{f.tipo}</span>
                  </div>
                  <div className="text-sm text-kratos-ink font-semibold">{f.nombre}</div>
                  <p className="text-[12px] text-kratos-subtle mt-2">{f.desc}</p>
                  <div className="flex items-center justify-between text-[11px] text-kratos-muted mt-3 pt-2 border-t border-kratos-border/40">
                    <span>{f.area}</span>
                    <span className="font-mono">{f.usadoMes}/mes</span>
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>

        </Tabs>
      </div>

      <Drawer
        open={!!gruaSel}
        onClose={() => setGruaSel(null)}
        title={`Expediente · ${gruaSel || ''}`}
        subtitle="Documentos · Bitácora · GPS · Mantenimiento · Costos"
        actions={<button className="btn-ghost text-xs"><FileCheck size={12}/> Exportar PDF</button>}
      >
        {gruaSel && expedientesGruas[gruaSel] && (
          <ExpedienteGrua
            grua={flota.gruas.find(g => g.eco === gruaSel)}
            expediente={expedientesGruas[gruaSel]}
          />
        )}
      </Drawer>
    </div>
  )
}
