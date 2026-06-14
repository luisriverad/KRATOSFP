import { useState, useMemo } from 'react'
import { Users, UserCheck, UserMinus, Cake, ClipboardCheck, AlertTriangle, ChevronRight, Search, Calendar, FileText, GraduationCap, FileCheck, Building2, FileSpreadsheet, TrendingDown, Award, DollarSign, Heart, Brain } from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, RadialBarChart, RadialBar, PolarAngleAxis, PolarGrid, RadarChart, Radar, PolarRadiusAxis } from 'recharts'
import PageHeader from '../components/PageHeader'
import SectionCard from '../components/SectionCard'
import KPICard from '../components/KPICard'
import AgentCard from '../components/AgentCard'
import Avatar from '../components/Avatar'
import ProgressBar from '../components/ProgressBar'
import { Tabs, TabsList, Tab, TabPanel } from '../components/Tabs'
import Drawer from '../components/Drawer'
import ExpedientePersonal from '../components/expedientes/ExpedientePersonal'
import { rrhh, agentes, usuarios } from '../data/mockData'
import { expedientesPersonal, personalIndex, calendarioDescansos, formatosInternos, centrosCosto } from '../data/personalData'
import { riesgoRotacion, matrizSucesion, certificacionesCriticas, costoRH, scoreCultura, cvFiltrados } from '../data/iaData'
import { fmtMXN } from '../data/mockData'

const tooltip = { contentStyle: { background:'#FFFFFF', border:'1px solid #E5E3DC', borderRadius:10, fontSize:12 }, labelStyle:{ color:'#4A453F' } }

export default function RRHH() {
  const [personaSel, setPersonaSel] = useState(null)
  const [tab, setTab] = useState('personal')
  const [busq, setBusq] = useState('')

  const rhAgents = agentes.filter(a => a.area === 'RH')

  const personasList = personalIndex.map(p => expedientesPersonal[p.key])
  const personasFiltradas = useMemo(() => {
    if (!busq) return personasList
    return personasList.filter(p => `${p.nombre} ${p.puesto} ${p.area}`.toLowerCase().includes(busq.toLowerCase()))
  }, [busq, personasList])

  const personaClick = (nombre) => {
    const item = personalIndex.find(p => p.nombre === nombre || nombre?.startsWith(p.nombre))
    if (item) setPersonaSel(item.key)
  }

  // KPIs alineados a las pestañas (Personal · Costo RH · Certificaciones · Centros de costo)
  const costoNominaMes = costoRH.reduce((s, c) => s + c.costoMes, 0)
  const certifProximas = certificacionesCriticas.filter(c => c.estado === 'proximo').length
  const cecoPresup = centrosCosto.reduce((s, c) => s + c.presupuesto, 0)
  const cecoEjerc  = centrosCosto.reduce((s, c) => s + c.ejercido, 0)
  const cecoAvance = Math.round((cecoEjerc / cecoPresup) * 100)

  return (
    <div className="space-y-7">
      <PageHeader
        title="Recursos Humanos"
        owner="Coordinación General + Finanzas (nómina)"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KPICard label="Plantilla activa"        value={rrhh.headcount}        delta={4.9} deltaLabel={`+${rrhh.altas} altas mes`}     icon={Users}      accent="info"/>
        <KPICard label="Costo de nómina mes"     value={fmtMXN(costoNominaMes)} delta={3.1} deltaLabel={`${costoRH.length} áreas`}        icon={DollarSign} accent="info"/>
        <KPICard label="Certificaciones por vencer" value={certifProximas}     delta={1}   deltaLabel={`${certificacionesCriticas.length} críticas`} icon={FileCheck}  accent={certifProximas > 0 ? 'warn' : 'ok'}/>
        <KPICard label="Presupuesto ejercido"    value={`${cecoAvance}%`}       delta={2}   deltaLabel={`${centrosCosto.length} centros`} icon={Building2}  accent={cecoAvance > 90 ? 'warn' : 'ok'}/>
      </div>

      <div className="panel">
        <Tabs value={tab} onChange={setTab}>
          <TabsList>
            <Tab value="personal"  icon={Users}        badge={personalIndex.length}>Personal</Tab>
            <Tab value="formatos"  icon={FileSpreadsheet} badge={formatosInternos.length}>Formatos</Tab>
            <Tab value="ceco"      icon={Building2}    badge={centrosCosto.length}>Centros de costo</Tab>
            <Tab value="certif"    icon={FileCheck}    badge={certificacionesCriticas.filter(c => c.estado === 'proximo').length || null}>Certificaciones</Tab>
            <Tab value="costoRH"   icon={DollarSign}>Costo RH</Tab>
          </TabsList>

          {/* PERSONAL */}
          <TabPanel value="personal" className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-kratos-subtle pointer-events-none"/>
                <input
                  type="text"
                  placeholder="Buscar colaborador, puesto o área..."
                  value={busq}
                  onChange={e => setBusq(e.target.value)}
                  className="w-full bg-white border border-kratos-border rounded-lg pl-10 pr-3 py-2 text-sm text-kratos-text placeholder:text-kratos-subtle focus:outline-none focus:border-kratos-red/50"
                />
              </div>
              <span className="text-xs text-kratos-subtle">{personasFiltradas.length} colaboradores</span>
              <button className="btn-primary shrink-0"><UserCheck size={14}/> Alta de personal</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {personasFiltradas.map(p => {
                const docsVencidos = p.documentos.filter(d => d.estado === 'vencido').length
                const docsProximos = p.documentos.filter(d => d.estado === 'proximo').length
                return (
                  <button
                    key={p.id}
                    onClick={() => setPersonaSel(personalIndex.find(pi => pi.nombre === p.nombre)?.key)}
                    className="text-left panel panel-hover p-4 relative group"
                  >
                    <span className="absolute top-3 right-3 text-kratos-subtle group-hover:text-kratos-red">
                      <ChevronRight size={16}/>
                    </span>
                    <Avatar name={p.nombre} color={p.color} size="lg" subtitle={p.puesto} role={p.area}/>
                    <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-kratos-border/60 text-xs">
                      <div>
                        <div className="label-mono">Antigüedad</div>
                        <div className="font-mono text-kratos-ink mt-0.5">{p.anios}a</div>
                      </div>
                      <div>
                        <div className="label-mono">Docs</div>
                        <div className="font-mono text-kratos-ink mt-0.5">{p.documentos.length - docsVencidos - docsProximos}/{p.documentos.length}</div>
                      </div>
                      <div>
                        <div className="label-mono">Cap.</div>
                        <div className="font-mono text-kratos-ink mt-0.5">{p.capacitaciones.length}</div>
                      </div>
                    </div>
                    {(docsVencidos > 0 || docsProximos > 0) && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {docsVencidos > 0 && <span className="chip-danger text-[10px]">{docsVencidos} vencido(s)</span>}
                        {docsProximos > 0 && <span className="chip-warn text-[10px]">{docsProximos} por vencer</span>}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </TabPanel>

          {/* FORMATOS */}
          <TabPanel value="formatos" className="p-5">
            <div className="surface-2 overflow-hidden">
              <table className="w-full">
                <thead><tr>
                  <th className="table-th">ID</th>
                  <th className="table-th">Formato</th>
                  <th className="table-th">Área</th>
                  <th className="table-th">Archivo</th>
                  <th className="table-th">Últ. uso</th>
                </tr></thead>
                <tbody>
                  {formatosInternos.map(f => (
                    <tr key={f.id} className="table-row">
                      <td className="table-td font-mono text-xs">{f.id}</td>
                      <td className="table-td">{f.nombre}</td>
                      <td className="table-td text-xs text-kratos-subtle">{f.area}</td>
                      <td className="table-td font-mono text-[10px] text-kratos-info">{f.archivo}</td>
                      <td className="table-td text-xs">{f.ultUso}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPanel>

          {/* CERTIFICACIONES CRÍTICAS */}
          <TabPanel value="certif" className="p-5">
            <div className="surface-2 overflow-hidden">
              <table className="w-full">
                <thead><tr>
                  <th className="table-th">Colaborador</th>
                  <th className="table-th">Certificación</th>
                  <th className="table-th">Vence</th>
                  <th className="table-th">Estado</th>
                </tr></thead>
                <tbody>
                  {certificacionesCriticas.map((c, i) => (
                    <tr key={i} className="table-row">
                      <td className="table-td font-medium">{c.persona}</td>
                      <td className="table-td">{c.certif}</td>
                      <td className="table-td font-mono text-xs">{c.vence}</td>
                      <td className="table-td"><span className={c.estado === 'vigente' ? 'chip-ok' : c.estado === 'proximo' ? 'chip-warn' : 'chip-danger'}>{c.estado}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPanel>

          {/* COSTO RH */}
          <TabPanel value="costoRH" className="p-5">
            <div className="surface-2 overflow-hidden">
              <table className="w-full">
                <thead><tr>
                  <th className="table-th">Área</th>
                  <th className="table-th">Headcount</th>
                  <th className="table-th text-right">Costo mes</th>
                  <th className="table-th text-right">Costo / persona</th>
                  <th className="table-th">Productividad</th>
                </tr></thead>
                <tbody>
                  {costoRH.map(c => (
                    <tr key={c.area} className="table-row">
                      <td className="table-td font-medium">{c.area}</td>
                      <td className="table-td font-mono">{c.headcount}</td>
                      <td className="table-td text-right font-mono">{fmtMXN(c.costoMes)}</td>
                      <td className="table-td text-right font-mono text-kratos-subtle">{fmtMXN(c.costoMes / c.headcount)}</td>
                      <td className="table-td">
                        <div className="flex items-center gap-2 min-w-[120px]">
                          <span className="font-mono text-xs w-9">{c.productividad}</span>
                          <ProgressBar value={c.productividad} accent="auto" showValue={false} className="flex-1"/>
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-kratos-bg2">
                    <td className="table-td font-semibold">Total</td>
                    <td className="table-td font-mono font-semibold">{costoRH.reduce((s, c) => s + c.headcount, 0)}</td>
                    <td className="table-td text-right font-mono font-semibold">{fmtMXN(costoRH.reduce((s, c) => s + c.costoMes, 0))}</td>
                    <td className="table-td" colSpan={2}></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabPanel>

          {/* CENTROS DE COSTO */}
          <TabPanel value="ceco" className="p-5">
            <div className="surface-2 overflow-hidden">
              <table className="w-full">
                <thead><tr>
                  <th className="table-th">Código</th>
                  <th className="table-th">Centro de costo</th>
                  <th className="table-th">Responsable</th>
                  <th className="table-th text-right">Presupuesto</th>
                  <th className="table-th text-right">Ejercido</th>
                  <th className="table-th">Avance</th>
                </tr></thead>
                <tbody>
                  {centrosCosto.map(c => {
                    const pct = Math.round((c.ejercido / c.presupuesto) * 100)
                    return (
                      <tr key={c.codigo} className="table-row">
                        <td className="table-td font-mono text-xs">{c.codigo}</td>
                        <td className="table-td">{c.nombre}</td>
                        <td className="table-td text-xs text-kratos-subtle">{c.responsable}</td>
                        <td className="table-td text-right font-mono">{fmtMXN(c.presupuesto)}</td>
                        <td className="table-td text-right font-mono">{fmtMXN(c.ejercido)}</td>
                        <td className="table-td">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs w-10">{pct}%</span>
                            <div className="flex-1 min-w-[80px] h-1.5 bg-white rounded-full overflow-hidden">
                              <div className={`h-full ${pct > 90 ? 'bg-kratos-danger' : pct > 75 ? 'bg-kratos-warn' : 'bg-kratos-ok'}`} style={{ width: `${Math.min(100, pct)}%` }}/>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </TabPanel>
        </Tabs>
      </div>

      <Drawer
        open={!!personaSel}
        onClose={() => setPersonaSel(null)}
        title="Expediente de personal"
        subtitle="Datos · Documentos · Capacitaciones · Ausencias · EPP · Evaluaciones"
        actions={<button className="btn-ghost text-xs"><FileText size={12}/> Exportar PDF</button>}
      >
        {personaSel && expedientesPersonal[personaSel] && (
          <ExpedientePersonal persona={expedientesPersonal[personaSel]}/>
        )}
      </Drawer>
    </div>
  )
}
