import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Truck, MapPin, Fuel, FileCheck, Wrench, Radio, Calendar, ClipboardList, Map as MapIcon, Box, AlertTriangle, Filter, Search, ChevronRight, Activity, DollarSign, Star, Gauge, BatteryWarning, FileSpreadsheet, BrainCircuit, Target, Clock, ShieldCheck, PackageCheck, CheckCircle2, XCircle, TrendingUp } from 'lucide-react'
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
import BrainPanel from '../components/BrainPanel'
import { flota, agentes, checklists, usuarios, rrhh, fmtMXN } from '../data/mockData'
import { expedientesGruas, expedientesVehiculos } from '../data/expedientesData'
import { bitacoraDiaria, bitacoraSemanal, controlCargas, rutasSCT, procesoDPI } from '../data/operacionesData'
import { mantenimientoPredictivo, costoOperativoUnidad, scoreOperadores, telemetria, utilizacionMuerta, formatosOperativos } from '../data/iaData'
import { oeeObra, oeeFactores, oeePorUnidad, oeePerdidas, otif, otifPorCliente, otifCausas, otifManiobras } from '../data/desempenoData'
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
  const [tabActiva, setTabActiva] = useState('desempeno')
  const [showAnalisisCargas, setShowAnalisisCargas] = useState(false)
  const [semBitSel, setSemBitSel] = useState(() =>
    (bitacoraSemanal.semanas.find(s => s.estado === 'actual') || bitacoraSemanal.semanas[bitacoraSemanal.semanas.length - 1]).id)

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
  const litrosMes = cargasMes.reduce((s, c) => s + (c.litros || 0), 0)

  // ---- Bitácora semanal: horas por grúa y por día de la semana seleccionada ----
  const semanaBit  = bitacoraSemanal.semanas.find(s => s.id === semBitSel) || bitacoraSemanal.semanas[0]
  const horasBit   = (eco) => semanaBit.horas[eco] || bitacoraSemanal.dias.map(() => 0)
  const totalGrua  = (eco) => horasBit(eco).reduce((s, h) => s + h, 0)
  const totalDiaBit = bitacoraSemanal.dias.map((_, di) => flota.gruas.reduce((s, g) => s + (semanaBit.horas[g.eco]?.[di] || 0), 0))
  const totalSemBit = totalDiaBit.reduce((s, h) => s + h, 0)
  const gruasActivasBit = flota.gruas.filter(g => totalGrua(g.eco) > 0).length
  const diaPicoBit = totalDiaBit.indexOf(Math.max(...totalDiaBit))

  // ---- Desempeño operativo: OEE-Obra & OTIF ----
  const oeePct  = Math.round((oeeObra.disp / 100) * (oeeObra.rend / 100) * (oeeObra.cal / 100) * 100)
  const otifPct = Math.round((otif.onTime / 100) * (otif.inFull / 100) * 100)
  const statusVs = (v, meta) => (v >= meta ? 'ok' : v >= meta * 0.9 ? 'warn' : 'danger')
  const accentOf = (st) => (st === 'ok' ? '#047857' : st === 'warn' ? '#B45309' : '#B91C1C')
  const chipOf   = (st) => (st === 'ok' ? 'chip-ok' : st === 'warn' ? 'chip-warn' : 'chip-danger')
  const oeeStatus  = statusVs(oeePct, oeeObra.meta)
  const otifStatus = statusVs(otifPct, otif.meta)
  const oeeUnit = (u) => Math.round((u.disp / 100) * (u.rend / 100) * (u.cal / 100) * 100)
  const perdidasTotal = oeePerdidas.reduce((s, p) => s + p.horas, 0)
  const oeePorUnidadOrden = [...oeePorUnidad].sort((a, b) => oeeUnit(b) - oeeUnit(a))
  const otifCausasMax = Math.max(...otifCausas.map(c => c.inc))
  const otifOk = otifManiobras.filter(m => m.onTime && m.inFull).length

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
            <Tab value="desempeno" icon={Target}>Desempeño · OEE & OTIF</Tab>
            <Tab value="flota"    icon={Truck}        badge={flota.gruas.length}>Flota</Tab>
            <Tab value="bitacora" icon={ClipboardList} badge={bitacoraDiaria.length}>Bitácora</Tab>
            <Tab value="bitsemanal" icon={Calendar}   badge={bitacoraSemanal.semanas.length}>Bitácora semanal</Tab>
            <Tab value="cargas"   icon={Box}           badge={pendienteOC || null}>Cargas</Tab>
            <Tab value="docs"     icon={FileCheck}     badge={documentosFlota.filter(d => d.estado === 'vencido' || d.estado === 'proximo').length || null}>Documentos</Tab>
            <Tab value="predict"   icon={Gauge}>Mantto predictivo</Tab>
            <Tab value="opscore"   icon={Star}>Score operador</Tab>
            <Tab value="formatos"  icon={FileSpreadsheet} badge={formatosOperativos.length}>Formatos</Tab>
          </TabsList>

          {/* DESEMPEÑO · OEE & OTIF */}
          <TabPanel value="desempeno" className="p-5 space-y-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h3 className="section-title">Desempeño operativo en obra</h3>
                <p className="text-[13px] text-kratos-muted max-w-3xl mt-1">
                  Dos indicadores madre del servicio: <span className="font-semibold text-kratos-subtle">OEE-Obra</span> mide cuánto produce realmente cada unidad disponible
                  (Disponibilidad × Rendimiento × Calidad); <span className="font-semibold text-kratos-subtle">OTIF</span> mide si la maniobra se entregó a tiempo y completa.
                  Cada número se descompone en sus factores para saber <span className="italic">dónde</span> intervenir.
                </p>
              </div>
              <Link to="/" className="btn-link shrink-0">Ver en Dashboard CEO <ChevronRight size={14}/></Link>
            </div>

            {/* HÉROES: OEE-Obra & OTIF */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* OEE-Obra */}
              <div className="panel p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2"><Gauge size={16} className="text-kratos-muted"/><span className="label-mono">OEE-Obra</span></div>
                  <span className={chipOf(oeeStatus)}>{oeeStatus === 'ok' ? 'En meta' : oeeStatus === 'warn' ? 'Bajo meta' : 'Crítico'} · meta ≥ {oeeObra.meta}%</span>
                </div>
                <div className="flex items-center gap-5">
                  <GaugeRing value={oeePct} size={132} accent={accentOf(oeeStatus)} subLabel="OEE"/>
                  <div className="flex-1 space-y-3">
                    <div className="font-mono text-[12px] text-kratos-muted">
                      {oeeObra.disp}% <span className="text-kratos-border-2">×</span> {oeeObra.rend}% <span className="text-kratos-border-2">×</span> {oeeObra.cal}% <span className="text-kratos-border-2">=</span> <span className="font-semibold text-kratos-ink">{oeePct}%</span>
                    </div>
                    <ProgressBar label="Disponibilidad" value={oeeObra.disp} accent="auto"/>
                    <ProgressBar label="Rendimiento"    value={oeeObra.rend} accent="auto"/>
                    <ProgressBar label="Calidad"        value={oeeObra.cal}  accent="auto"/>
                    <div className="text-[11px] text-kratos-ok flex items-center gap-1"><TrendingUp size={12}/> +{oeeObra.deltaMes}% vs. mes anterior</div>
                  </div>
                </div>
              </div>

              {/* OTIF */}
              <div className="panel p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2"><PackageCheck size={16} className="text-kratos-muted"/><span className="label-mono">OTIF · On Time / In Full</span></div>
                  <span className={chipOf(otifStatus)}>{otifStatus === 'ok' ? 'En meta' : otifStatus === 'warn' ? 'Bajo meta' : 'Crítico'} · meta ≥ {otif.meta}%</span>
                </div>
                <div className="flex items-center gap-5">
                  <GaugeRing value={otifPct} size={132} accent={accentOf(otifStatus)} subLabel="OTIF"/>
                  <div className="flex-1 space-y-3">
                    <div className="font-mono text-[12px] text-kratos-muted">
                      {otif.onTime}% <span className="text-kratos-border-2">×</span> {otif.inFull}% <span className="text-kratos-border-2">=</span> <span className="font-semibold text-kratos-ink">{otifPct}%</span>
                    </div>
                    <ProgressBar label="On Time (a tiempo)"  value={otif.onTime} accent="auto"/>
                    <ProgressBar label="In Full (completa)"   value={otif.inFull} accent="auto"/>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="chip-muted">{otif.entregas} maniobras</span>
                      <span className="text-[11px] text-kratos-ok flex items-center gap-1"><TrendingUp size={12}/> +{otif.deltaMes}% vs. mes anterior</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FACTORES OEE (drill-down) */}
            <div>
              <div className="label-mono mb-2">Factores del OEE · dónde se gana o se pierde</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {oeeFactores.map(f => {
                  const Icon = f.icon === 'Clock' ? Clock : f.icon === 'Gauge' ? Gauge : ShieldCheck
                  return (
                    <div key={f.key} className="surface-2 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2"><Icon size={15} className="text-kratos-muted"/><span className="text-sm font-semibold text-kratos-ink">{f.label}</span></div>
                        <span className="font-display text-xl font-semibold text-kratos-ink tabular-nums">{f.valor}%</span>
                      </div>
                      <ProgressBar value={f.valor} accent="auto" showValue={false}/>
                      <div className="text-[11px] text-kratos-muted mt-1">meta {f.meta}%</div>
                      <div className="text-[12px] text-kratos-subtle mt-2 font-mono">{f.formula}</div>
                      <div className="text-[12px] text-kratos-muted mt-2 flex items-start gap-1.5">
                        <AlertTriangle size={12} className={`mt-0.5 shrink-0 ${f.tone === 'warn' ? 'text-kratos-warn' : f.tone === 'danger' ? 'text-kratos-danger' : 'text-kratos-muted'}`}/>
                        <span><span className="font-medium text-kratos-subtle">Pérdida:</span> {f.perdida}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* OEE POR UNIDAD + PÉRDIDAS */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
              {/* OEE por unidad */}
              <div className="panel overflow-hidden xl:col-span-3">
                <div className="px-4 py-3 border-b border-kratos-border flex items-baseline justify-between">
                  <h4 className="section-title text-sm">OEE por unidad</h4>
                  <span className="label-mono">el factor más bajo es la palanca</span>
                </div>
                <table className="w-full">
                  <thead><tr>
                    <th className="table-th">Eco</th>
                    <th className="table-th">Disp.</th>
                    <th className="table-th">Rend.</th>
                    <th className="table-th">Cal.</th>
                    <th className="table-th">OEE</th>
                    <th className="table-th">Obra</th>
                  </tr></thead>
                  <tbody>
                    {oeePorUnidadOrden.map(u => {
                      const oe = oeeUnit(u)
                      const st = statusVs(oe, oeeObra.meta)
                      return (
                        <tr key={u.eco} className="table-row">
                          <td className="table-td font-mono font-semibold">{u.eco}<div className="text-[10px] text-kratos-muted font-sans">{u.tipo}</div></td>
                          <td className="table-td font-mono text-sm">{u.disp}%</td>
                          <td className="table-td font-mono text-sm">{u.rend}%</td>
                          <td className="table-td font-mono text-sm">{u.cal}%</td>
                          <td className="table-td"><span className={chipOf(st)}>{oe}%</span></td>
                          <td className="table-td text-[12px] text-kratos-subtle">{u.obra}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Dónde se pierde el OEE */}
              <div className="panel p-4 xl:col-span-2">
                <div className="flex items-baseline justify-between mb-3">
                  <h4 className="section-title text-sm">Dónde se pierde</h4>
                  <span className="label-mono">{perdidasTotal} h / mes</span>
                </div>
                <div className="space-y-2.5">
                  {oeePerdidas.map((p, i) => {
                    const pct = Math.round((p.horas / perdidasTotal) * 100)
                    const barCol = p.tone === 'danger' ? 'bg-kratos-danger' : p.tone === 'warn' ? 'bg-kratos-warn' : 'bg-kratos-border-2'
                    return (
                      <div key={i}>
                        <div className="flex items-baseline justify-between text-[12px] gap-2">
                          <span className="text-kratos-subtle truncate">{p.causa}</span>
                          <span className="font-mono text-kratos-muted shrink-0">{p.horas} h</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1.5 bg-kratos-bg2 rounded-full overflow-hidden"><div className={`h-full ${barCol}`} style={{ width: `${pct}%` }}/></div>
                          <span className="text-[10px] text-kratos-muted font-mono w-7 text-right">{pct}%</span>
                        </div>
                        <div className="text-[10px] text-kratos-muted mt-0.5">{p.factor}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* OTIF: por cliente + causas */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
              <div className="panel overflow-hidden xl:col-span-3">
                <div className="px-4 py-3 border-b border-kratos-border"><h4 className="section-title text-sm">OTIF por cliente</h4></div>
                <table className="w-full">
                  <thead><tr>
                    <th className="table-th">Cliente</th>
                    <th className="table-th text-right">Entregas</th>
                    <th className="table-th">On Time</th>
                    <th className="table-th">In Full</th>
                    <th className="table-th">OTIF</th>
                  </tr></thead>
                  <tbody>
                    {otifPorCliente.map(c => {
                      const ot = Math.round((c.onTime / 100) * (c.inFull / 100) * 100)
                      const st = statusVs(ot, otif.meta)
                      return (
                        <tr key={c.cliente} className="table-row">
                          <td className="table-td font-medium">{c.cliente}</td>
                          <td className="table-td text-right font-mono text-sm">{c.entregas}</td>
                          <td className="table-td font-mono text-sm">{c.onTime}%</td>
                          <td className="table-td font-mono text-sm">{c.inFull}%</td>
                          <td className="table-td"><span className={chipOf(st)}>{ot}%</span></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="panel p-4 xl:col-span-2">
                <div className="flex items-baseline justify-between mb-3">
                  <h4 className="section-title text-sm">Por qué falla</h4>
                  <span className="label-mono">Pareto</span>
                </div>
                <div className="space-y-2.5">
                  {otifCausas.map((c, i) => (
                    <div key={i}>
                      <div className="flex items-baseline justify-between text-[12px] gap-2">
                        <span className="text-kratos-subtle truncate">{c.causa}</span>
                        <span className="font-mono text-kratos-muted shrink-0">{c.inc}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 bg-kratos-bg2 rounded-full overflow-hidden"><div className={`h-full ${c.tipo === 'On Time' ? 'bg-kratos-warn' : 'bg-kratos-info'}`} style={{ width: `${(c.inc / otifCausasMax) * 100}%` }}/></div>
                        <span className={`text-[10px] font-mono w-14 text-right ${c.tipo === 'On Time' ? 'text-kratos-warn' : 'text-kratos-info'}`}>{c.tipo}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* OTIF: detalle de maniobras */}
            <div className="panel overflow-hidden">
              <div className="px-4 py-3 border-b border-kratos-border flex items-baseline justify-between">
                <h4 className="section-title text-sm">Cumplimiento por maniobra</h4>
                <span className="label-mono">{otifOk}/{otifManiobras.length} on-time & in-full</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead><tr>
                    <th className="table-th">Folio</th>
                    <th className="table-th">Cliente</th>
                    <th className="table-th">Grúa</th>
                    <th className="table-th">Plan</th>
                    <th className="table-th">Real</th>
                    <th className="table-th text-center">On Time</th>
                    <th className="table-th text-center">In Full</th>
                    <th className="table-th">Nota</th>
                  </tr></thead>
                  <tbody>
                    {otifManiobras.map(m => (
                      <tr key={m.folio} className="table-row">
                        <td className="table-td font-mono text-xs">{m.folio}</td>
                        <td className="table-td text-sm">{m.cliente}</td>
                        <td className="table-td font-mono text-sm">{m.grua}</td>
                        <td className="table-td font-mono text-sm">{m.plan}</td>
                        <td className={`table-td font-mono text-sm ${m.onTime ? '' : 'text-kratos-danger'}`}>{m.real}</td>
                        <td className="table-td text-center">{m.onTime ? <CheckCircle2 size={16} className="text-kratos-ok inline"/> : <XCircle size={16} className="text-kratos-danger inline"/>}</td>
                        <td className="table-td text-center">{m.inFull ? <CheckCircle2 size={16} className="text-kratos-ok inline"/> : <XCircle size={16} className="text-kratos-danger inline"/>}</td>
                        <td className="table-td text-[12px] text-kratos-subtle">{m.nota}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-5"><BrainPanel tema="OEE-Obra y OTIF" insights={[
              { tag: 'Proyección', tone: 'warn', titulo: 'OEE-Obra romperá la meta a la baja', prediccion: `Al ritmo actual, el OEE-Obra (${oeePct}%) cerrará el próximo mes 3-4 pts bajo la meta de ${oeeObra.meta}%: el factor Rendimiento (${oeeObra.rend}%) seguirá arrastrando, equivale a perder ~${Math.round(perdidasTotal*0.25)} h facturables más en 4 semanas.`, accion: 'Atacar las 2 pérdidas de mayor peso (esperas y armado) con ventanas fijas de relevo y precarga de aparejos.', confianza: 81 },
              { tag: 'Riesgo', tone: 'danger', titulo: 'OTIF caerá bajo 80% por entregas tardías', prediccion: `On Time (${otif.onTime}%) viene cayendo y proyecta el OTIF bajo 80% en ~3 semanas: con ${otif.entregas} maniobras/mes serían 2-3 entregas tardías adicionales, exponiendo penalizaciones con el cliente de mayor volumen.`, accion: 'Adelantar 30 min los arranques de maniobra crítica y confirmar disponibilidad de grúa la víspera.', confianza: 76 },
            ]}/></div>
          </TabPanel>

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
                  className="w-full bg-white border border-kratos-border rounded-none pl-10 pr-3 py-2 text-sm text-kratos-text placeholder:text-kratos-subtle focus:outline-none focus:border-kratos-red/50"
                />
              </div>
              <div className="flex gap-1 surface-2 p-1">
                {['todas','En obra','En patio','Mantenimiento'].map(f => (
                  <button key={f}
                    onClick={() => setFiltroFlota(f)}
                    className={`px-2.5 py-1 rounded-none text-xs ${filtroFlota === f ? 'bg-kratos-red text-white' : 'text-kratos-subtle hover:text-white'}`}>
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
            <div className="mt-5"><BrainPanel tema="estado y utilización de flota" insights={[
              { tag: 'Tendencia', tone: 'warn', titulo: 'Grúas en patio drenarán utilización', prediccion: `Hay ${flota.gruas.length - enObra - enMantto} unidad(es) en patio sin obra asignada; si no se colocan en 2 semanas, la utilización de flota bajará de ${Math.round(enObra/flota.gruas.length*100)}% a ~${Math.max(0, Math.round(enObra/flota.gruas.length*100)-7)}% y el costo fijo/hora subirá proporcionalmente.`, accion: 'Reubicar las unidades ociosas a la obra de mayor demanda o pausar su costo de stand-by.', confianza: 78 },
              { tag: 'Alerta temprana', tone: 'danger', titulo: 'Salud técnica baja anticipa parada', prediccion: `Las unidades con salud <70/100 escalarán a "Mantenimiento" dentro de ~3-4 semanas según su deterioro; con ${enMantto} ya en taller, una más reduciría la flota en obra a ${enObra-1} y comprometería las maniobras agendadas.`, accion: 'Programar inspección preventiva ya en las unidades de menor salud antes de que salgan de operación.', confianza: 73 },
            ]}/></div>
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
            <div className="mt-5"><BrainPanel tema="bitácora diaria de operación" insights={[
              { tag: 'Tendencia', tone: 'warn', titulo: 'Eventos críticos concentrados en nocturno', prediccion: `El turno nocturno acumula ${bitacoraDiaria.filter(b=>b.turno==='Noc').length} de los ${bitacoraDiaria.length} eventos y la mayoría de los ${bitacoraDiaria.filter(b=>b.severity==='danger').length} críticos; de mantenerse, proyectamos +2-3 incidentes nocturnos por semana las próximas 3 semanas.`, accion: 'Reforzar supervisión y checklist de arranque en el turno Noc; revisar fatiga de operadores.', confianza: 74 },
              { tag: 'Riesgo', tone: 'danger', titulo: 'Críticos sin cierre se vuelven recurrentes', prediccion: `Los ${bitacoraDiaria.filter(b=>b.severity==='danger').length} eventos críticos de las últimas 24 h, si no se cierran con causa raíz, tienden a repetirse en la misma unidad/área dentro de ~10 días y derivan en una parada no planeada.`, accion: 'Asignar responsable y fecha de cierre a cada crítico hoy mismo; escalar los que excedan 48 h.', confianza: 71 },
            ]}/></div>
          </TabPanel>

          {/* BITÁCORA SEMANAL */}
          <TabPanel value="bitsemanal" className="p-5 space-y-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h3 className="section-title">Bitácora semanal de horas por grúa</h3>
                <p className="text-[13px] text-kratos-muted mt-1">Horas operadas por unidad y por día de la semana. Captura base para facturación, utilización y consumo.</p>
              </div>
              <div className="flex gap-1 surface-2 p-1 shrink-0">
                {bitacoraSemanal.semanas.map(s => (
                  <button key={s.id}
                    onClick={() => setSemBitSel(s.id)}
                    className={`px-3 py-1 rounded-none text-xs ${semBitSel === s.id ? 'bg-kratos-red text-white' : 'text-kratos-subtle hover:text-kratos-ink'}`}>
                    Sem {s.num}{s.estado === 'actual' ? ' · hoy' : ''}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="surface-2 p-3">
                <div className="label-mono">Horas semana</div>
                <div className="text-xl font-display font-semibold text-kratos-ink mt-1">{totalSemBit.toFixed(1)} h</div>
                <div className="text-[11px] text-kratos-muted mt-0.5">Sem {semanaBit.num} · {semanaBit.rango}</div>
              </div>
              <div className="surface-2 p-3">
                <div className="label-mono">Grúas activas</div>
                <div className="text-xl font-display font-semibold text-kratos-ink mt-1">{gruasActivasBit}/{flota.gruas.length}</div>
                <div className="text-[11px] text-kratos-muted mt-0.5">con horas en la semana</div>
              </div>
              <div className="surface-2 p-3">
                <div className="label-mono">Promedio / grúa activa</div>
                <div className="text-xl font-display font-semibold text-kratos-ink mt-1">{gruasActivasBit ? (totalSemBit / gruasActivasBit).toFixed(1) : '0'} h</div>
                <div className="text-[11px] text-kratos-muted mt-0.5">horas semanales</div>
              </div>
              <div className="surface-2 p-3">
                <div className="label-mono">Día pico</div>
                <div className="text-xl font-display font-semibold text-kratos-ink mt-1">{bitacoraSemanal.dias[diaPicoBit]}</div>
                <div className="text-[11px] text-kratos-muted mt-0.5">{totalDiaBit[diaPicoBit].toFixed(1)} h operadas</div>
              </div>
            </div>

            <div className="surface-2 overflow-x-auto">
              <table className="w-full min-w-[720px]">
                <thead><tr>
                  <th className="table-th sticky left-0 bg-kratos-panel-2 z-10">Grúa</th>
                  {bitacoraSemanal.dias.map(d => <th key={d} className="table-th text-right">{d}</th>)}
                  <th className="table-th text-right">Total</th>
                </tr></thead>
                <tbody>
                  {flota.gruas.map(g => {
                    const hs = horasBit(g.eco)
                    const tot = totalGrua(g.eco)
                    return (
                      <tr key={g.eco} className="table-row row-clickable" onClick={() => setGruaSel(g.eco)}>
                        <td className="table-td sticky left-0 bg-kratos-panel z-10">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-kratos-red-glow">{g.eco}</span>
                            <span className={estadoChip(g.estado)}>{g.estado}</span>
                          </div>
                          <div className="text-[10px] text-kratos-muted mt-0.5">{g.operador}</div>
                        </td>
                        {hs.map((h, di) => (
                          <td key={di} className={`table-td text-right font-mono text-xs ${h === 0 ? 'text-kratos-muted/50' : 'text-kratos-text'}`}>{h === 0 ? '—' : h.toFixed(1)}</td>
                        ))}
                        <td className={`table-td text-right font-mono text-sm font-semibold ${tot === 0 ? 'text-kratos-muted/50' : 'text-kratos-ink'}`}>{tot === 0 ? '—' : tot.toFixed(1)}</td>
                      </tr>
                    )
                  })}
                  <tr className="bg-kratos-bg2">
                    <td className="table-td font-semibold sticky left-0 bg-kratos-bg2 z-10">Total día</td>
                    {totalDiaBit.map((t, di) => (
                      <td key={di} className="table-td text-right font-mono text-xs font-semibold text-kratos-ink">{t === 0 ? '—' : t.toFixed(1)}</td>
                    ))}
                    <td className="table-td text-right font-mono text-sm font-semibold text-kratos-ink">{totalSemBit.toFixed(1)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-[11px] text-kratos-muted px-1">Clic en una grúa para abrir su expediente · G004 en patio (uso esporádico) · G008 en mantenimiento (0 h).</div>

            <div className="mt-5"><BrainPanel tema="horas semanales por grúa" insights={[
              { tag: 'Oportunidad', tone: 'warn', titulo: 'Capacidad ociosa en unidades de patio', prediccion: `Con ${gruasActivasBit}/${flota.gruas.length} grúas activas, las unidades en patio aportan pocas o cero horas: cada semana sin colocarlas son ~50–60 h facturables no generadas por unidad respecto a una grúa en obra.`, accion: 'Reasignar las unidades de baja carga a la obra de mayor demanda o pausar su costo de stand-by.', confianza: 76 },
              { tag: 'Tendencia', tone: 'info', titulo: 'Concentración de horas en fin de semana', prediccion: `El día pico (${bitacoraSemanal.dias[diaPicoBit]}) y los sábados sostienen una parte relevante de las ${totalSemBit.toFixed(0)} h semanales; si se mantiene, sube el costo de tiempo extra y el desgaste de operadores de las 100 ton.`, accion: 'Balancear la carga entre semana y reservar el sábado para maniobras de mayor valor/hora.', confianza: 71 },
            ]}/></div>
          </TabPanel>

          {/* CARGAS */}
          <TabPanel value="cargas" className="p-5 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2">
              <div className="surface-2 p-3">
                <div className="label-mono">Cargas mes</div>
                <div className="text-xl font-display font-semibold text-kratos-ink mt-1">{cargasMes.length}</div>
              </div>
              <div className="surface-2 p-3">
                <div className="label-mono">Horas mes</div>
                <div className="text-xl font-display font-semibold text-kratos-ink mt-1">{horasMes.toFixed(1)} h</div>
              </div>
              <div className="surface-2 p-3">
                <div className="label-mono">Diésel mes</div>
                <div className="text-xl font-display font-semibold text-kratos-ink mt-1">{litrosMes.toLocaleString()} L</div>
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
                  <th className="table-th text-right">Litros</th>
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
                      <td className="table-td text-right font-mono text-xs">{c.litros ? `${c.litros} L` : '—'}</td>
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
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-none bg-kratos-ink text-white text-sm font-semibold hover:opacity-90 transition">
                <BrainCircuit size={18}/> Análisis por Kratos FP Brain
              </button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-none bg-kratos-ink text-white flex items-center justify-center shrink-0"><BrainCircuit size={17}/></span>
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
            <div className="mt-5"><BrainPanel tema="documentos de flota por vencer" insights={[
              { tag: 'Alerta temprana', tone: 'danger', titulo: 'Permisos SCT vencidos frenan unidades', prediccion: `Hay ${documentosFlota.filter(d => d.estado === 'vencido').length} documento(s) ya vencido(s) y ${documentosFlota.filter(d => d.estado === 'proximo').length} por vencer en <30 días; sin renovar, al menos 1 grúa quedará impedida de circular/operar dentro de las próximas 2-3 semanas, perdiendo sus maniobras agendadas.`, accion: 'Iniciar hoy la renovación de permisos SCT y pólizas vencidos; bloquear asignación de unidades con documento vencido.', confianza: 88 },
              { tag: 'Proyección', tone: 'warn', titulo: 'Cola de renovaciones se acumulará', prediccion: `Con ${documentosFlota.filter(d => d.estado === 'pendiente').length} trámites pendientes más los próximos a vencer, en 30 días se juntarán renovaciones simultáneas (pólizas + verificaciones) que saturarán la gestión y elevarán el riesgo de multa.`, accion: 'Escalonar las renovaciones por fecha de vencimiento y automatizar el aviso a 45/30/15 días.', confianza: 79 },
            ]}/></div>
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
            <div className="mt-5"><BrainPanel tema="mantenimiento predictivo" insights={[
              { tag: 'Alerta temprana', tone: 'danger', titulo: 'Fallas de alta probabilidad inminentes', prediccion: `${mantenimientoPredictivo.filter(m => m.prob >= 0.5).length} unidad(es) con probabilidad de falla ≥50% agotarán sus horas restantes en las próximas 1-2 semanas; intervenir antes convierte una parada correctiva (más cara y no planeada) en un mantenimiento programado.`, accion: 'Agendar el servicio recomendado por AG-10 en la ventana de menor demanda de esas unidades esta semana.', confianza: 86 },
              { tag: 'Proyección', tone: 'warn', titulo: 'Vida útil baja anticipa más correctivos', prediccion: `Las unidades con vida útil <50% verán crecer su probabilidad de falla ~5-8 pts en el próximo mes; sin mantenimiento, el gasto correctivo de flota subirá de forma escalonada en el trimestre.`, accion: 'Priorizar refacciones de las unidades con vida útil más baja y adelantar su plan preventivo.', confianza: 77 },
            ]}/></div>
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
            <div className="mt-5"><BrainPanel tema="score de operadores" insights={[
              { tag: 'Riesgo', tone: 'warn', titulo: 'Operadores bajo 75 elevarán incidentes', prediccion: `${scoreOperadores.filter(o => o.scoreTotal < 75).length} operador(es) con score <75 concentran retrasos e incidentes; proyectamos 1-2 incidentes adicionales atribuibles a este grupo en las próximas 4 semanas si no se interviene.`, accion: 'Asignar coaching y checklist supervisado a los operadores de menor score antes de su próxima maniobra crítica.', confianza: 72 },
              { tag: 'Oportunidad', tone: 'ok', titulo: 'Top performers para maniobras de alto valor', prediccion: `Los operadores con score ≥85 mantienen 0 incidentes y alta productividad; reservarlos para izajes pesados las próximas semanas reduce el riesgo de retraso y sostiene el OTIF por encima de meta.`, accion: 'Ruteo preferente de los operadores top a las maniobras de mayor monto y complejidad.', confianza: 80 },
            ]}/></div>
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
            <div className="mt-5"><BrainPanel tema="formatos operativos" insights={[
              { tag: 'Tendencia', tone: 'info', titulo: 'Formatos diarios sostendrán el volumen', prediccion: `Los formatos de uso diario seguirán representando el grueso del registro operativo; con ${formatosOperativos.reduce((s,f)=>s+(f.usadoMes||0),0)} usos/mes proyectados, el próximo mes mantendrá carga similar y conviene digitalizar los de mayor frecuencia.`, accion: 'Digitalizar primero los 2-3 formatos diarios más usados para reducir tiempo de captura.', confianza: 70 },
              { tag: 'Oportunidad', tone: 'ok', titulo: 'Formatos subutilizados a depurar', prediccion: `Los formatos con menor uso mensual aportan poco valor de control y, de seguir así, en 1-2 meses se vuelven obsoletos; consolidarlos simplifica la operación sin perder trazabilidad.`, accion: 'Revisar y fusionar los formatos de baja adopción en el próximo ciclo de mejora documental.', confianza: 68 },
            ]}/></div>
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
