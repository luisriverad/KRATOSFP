import { useState, useMemo } from 'react'
import { Banknote, FileText, Calendar, ArrowUpRight, ArrowDownRight, AlertTriangle, Building2, ListChecks, Receipt, Landmark, ScrollText, CreditCard, TrendingUp, TrendingDown, Bot, Users, Briefcase, ShieldCheck, BookOpen, FolderArchive, Activity, FileCheck, Sparkles, Search, BrainCircuit } from 'lucide-react'
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, ComposedChart, Line, ReferenceLine } from 'recharts'
import PageHeader from '../components/PageHeader'
import KPICard from '../components/KPICard'
import ProgressBar from '../components/ProgressBar'
import SortableTH from '../components/SortableTH'
import { Tabs, TabsList, Tab, TabPanel } from '../components/Tabs'
import BrainPanel from '../components/BrainPanel'
import UploadArchivoMes from '../components/UploadArchivoMes'
import Agentes from './Agentes'
import { finanzas, agentes, fmtMXN, usuarios, checklists } from '../data/mockData'
import { centrosCosto } from '../data/personalData'
import { lineasCredito, creditoResumen } from '../data/creditoData'
import {
  rentabilidadCliente, rentabilidadProyecto, alertasBancarias,
  analisisDeuda, scoreClientes, monitoreoRegulatorio, repositorioCorporativo,
  matrizRiesgoFiscal, scoreSaludFiscal
} from '../data/iaData'
import { useSortable } from '../lib/useSortable'
import { diasHasta } from '../lib/dates'

const tooltip = { contentStyle: { background:'#FFFFFF', border:'1px solid #E5E3DC', borderRadius:0, fontSize:12 }, labelStyle:{ color:'#4A453F' } }

// Rangos del semáforo de cartera vencida
const RANGOS = [
  { key: 'corriente', label: 'Al corriente', desc: 'Sin atraso',        color: '#047857' },
  { key: '1-30',      label: '1–30 días',    desc: 'Atraso temprano',   color: '#EAB308' },
  { key: '31-60',     label: '31–60 días',   desc: 'Seguimiento',       color: '#F59E0B' },
  { key: '61-90',     label: '61–90 días',   desc: 'Gestión intensiva', color: '#EA580C' },
  { key: '+90',       label: '+90 días',     desc: 'Riesgo / legal',    color: '#DC2626' }
]
const bucketOfCxc = (c) => {
  if (!c.estado.startsWith('Vencida')) return 'corriente'
  const m = c.estado.match(/(\d+)d/)
  const d = m ? Number(m[1]) : (c.dias ?? 0)
  if (d <= 30) return '1-30'
  if (d <= 60) return '31-60'
  if (d <= 90) return '61-90'
  return '+90'
}

export default function Finanzas() {
  const [tab, setTab] = useState('credito')
  const [showAnalisisBancos, setShowAnalisisBancos] = useState(false)
  const [lineaSel, setLineaSel] = useState(null)
  const saldoTotal = finanzas.saldoBancos.reduce((s, b) => s + b.saldo, 0)
  const cxcTotal = finanzas.cxc.reduce((s, c) => s + c.monto, 0)
  const cxpTotal = finanzas.cxp.reduce((s, c) => s + c.monto, 0)
  const cxcVencida = finanzas.cxc.filter(c => c.estado.startsWith('Vencida')).reduce((s, c) => s + c.monto, 0)
  const credito = creditoResumen()

  // CXC aging buckets (Vencida): 1–30, 31–60, 61–90, 91–120, >120 días vencidos
  const agingBuckets = useMemo(() => {
    const buckets = [
      { rango: '1-30d',  min: 1,   max: 30,  color: '#D97706' },
      { rango: '31-60d', min: 31,  max: 60,  color: '#EA580C' },
      { rango: '61-90d', min: 61,  max: 90,  color: '#DC2626' },
      { rango: '91-120d',min: 91,  max: 120, color: '#B91C1C' },
      { rango: '>120d',  min: 121, max: Infinity, color: '#7F1D1D' }
    ].map(b => ({ ...b, monto: 0, n: 0 }))
    finanzas.cxc.forEach(c => {
      if (!c.estado.startsWith('Vencida')) return
      const m = c.estado.match(/(\d+)d/)
      const d = m ? Number(m[1]) : c.dias
      const b = buckets.find(x => d >= x.min && d <= x.max)
      if (b) { b.monto += c.monto; b.n += 1 }
    })
    return buckets
  }, [])
  const agingTotal = agingBuckets.reduce((s, b) => s + b.monto, 0)

  // CXP venc tags
  const cxpTagged = useMemo(() => finanzas.cxp.map(c => {
    const d = diasHasta(c.vence)
    let tag = 'Vigente', tone = 'chip-ok'
    if (d == null) { tag = '—'; tone = 'chip-muted' }
    else if (d < 0) { tag = `Vencida ${-d}d`; tone = 'chip-danger' }
    else if (d <= 7) { tag = `Próx. vencer ${d}d`; tone = 'chip-warn' }
    else { tag = `Vigente ${d}d`; tone = 'chip-ok' }
    return { ...c, _dias: d ?? 9999, tag, tone }
  }), [])
  const cxpVencidas = cxpTagged.filter(c => c._dias < 0).reduce((s, c) => s + c.monto, 0)
  const cxpProximas = cxpTagged.filter(c => c._dias >= 0 && c._dias <= 7).reduce((s, c) => s + c.monto, 0)

  // Sortable tables
  // Semáforo de cartera vencida (buckets + filtro interactivo)
  const [rangoSel, setRangoSel] = useState(null)
  const [cxcQuery, setCxcQuery] = useState('')
  const carteraBuckets = useMemo(() => {
    const def = RANGOS.map(r => ({ ...r, monto: 0, n: 0 }))
    finanzas.cxc.forEach(c => { const b = def.find(x => x.key === bucketOfCxc(c)); b.monto += c.monto; b.n += 1 })
    return def
  }, [])
  const carteraTotal = carteraBuckets.reduce((s, b) => s + b.monto, 0)
  const moraTotal = carteraBuckets.filter(b => b.key !== 'corriente').reduce((s, b) => s + b.monto, 0)

  const cxcSort = useSortable(finanzas.cxc, {
    estado: (c) => {
      const m = c.estado.match(/(\d+)d/)
      return c.estado.startsWith('Vencida') ? 10000 + (m ? Number(m[1]) : c.dias) : c.dias
    }
  })
  const cxcFiltradas = cxcSort.sorted.filter(c => {
    if (rangoSel && bucketOfCxc(c) !== rangoSel) return false
    if (cxcQuery.trim() && !`${c.cliente} ${c.oc}`.toLowerCase().includes(cxcQuery.trim().toLowerCase())) return false
    return true
  })
  const cxpSort = useSortable(cxpTagged, { tag: (c) => c._dias })
  const plSort = useSortable(finanzas.pl, { margen: (p) => p.utilidad / p.ingresos })
  const cecoSort = useSortable(centrosCosto, { avance: (c) => c.ejercido / c.presupuesto })
  const checklistSort = useSortable(checklists.finanzas.items, { cumple: (c) => c.cumple ? 1 : 0 })

  // P&L acumulado y vista mejorada
  const plDeltas = useMemo(() => finanzas.pl.map((p, i, arr) => {
    const margen = (p.utilidad / p.ingresos) * 100
    const prev = arr[i - 1]
    const deltaIngresos = prev ? ((p.ingresos - prev.ingresos) / prev.ingresos) * 100 : 0
    return { ...p, margen, deltaIngresos }
  }), [])
  const plYTD = useMemo(() => {
    const ing = finanzas.pl.reduce((s, p) => s + p.ingresos, 0)
    const gas = finanzas.pl.reduce((s, p) => s + p.gastos, 0)
    return { ingresos: ing, gastos: gas, utilidad: ing - gas, margen: ((ing - gas) / ing) * 100 }
  }, [])

  // Análisis de Kratos FP Brain sobre las alertas bancarias
  const _sobregiro = alertasBancarias.sobregirosFuturos[0]
  const _lineaWarn = alertasBancarias.lineasCriticas.find(l => l.status === 'warn') || alertasBancarias.lineasCriticas[0]
  const analisisBancos = [
    {
      foco: 'Sobregiro proyectado en cuenta principal', tag: 'Riesgo de caja', tone: 'danger',
      recomendacion: 'El pronóstico anticipa un saldo negativo en la cuenta operativa. Mover fondos de inversión o adelantar una cobranza evita el sobregiro y sus comisiones bancarias.',
      plan: ['Programar traspaso preventivo desde BBVA Inversión', 'Adelantar cobranza de la factura más próxima', 'Alerta a Dirección 72 h antes de la fecha de riesgo'],
      pie: `${fmtMXN(_sobregiro.monto)} · ${_sobregiro.cuenta} · ${_sobregiro.fecha} · prob ${Math.round(_sobregiro.prob * 100)}%`
    },
    {
      foco: 'Concentración bancaria', tag: 'Dependencia', tone: 'warn',
      recomendacion: 'La caja está concentrada en una sola institución y hay cuentas operando cerca de su saldo mínimo. Diversificar reduce el riesgo de un bloqueo o caída de servicio del banco.',
      plan: ['Abrir o activar una segunda cuenta operativa', 'Repartir nómina y proveedores entre 2 bancos', 'Subir el colchón de las cuentas en estado de alerta'],
      pie: 'Cuentas cerca del mínimo: revisar saldos de Edenred / Toka'
    },
    {
      foco: `Línea revolvente al ${_lineaWarn.utilizacion}%`, tag: 'Apalancamiento', tone: 'warn',
      recomendacion: 'La línea de crédito revolvente se acerca a su umbral de uso. Conviene calendarizar pagos para liberar disponibilidad antes de necesitarla en una semana de tensión.',
      plan: ['Amortizar capital en semanas de holgura de caja', 'Reservar la línea para imprevistos, no para gasto fijo', 'Renegociar tasa al bajar la utilización'],
      pie: `${_lineaWarn.banco} · ${_lineaWarn.utilizacion}% utilizado`
    }
  ]

  return (
    <div className="space-y-7">
      <PageHeader
        title="Finanzas"
        owner={usuarios.finanzas.nombre + ' · ' + usuarios.finanzas.rol}
        badges={[
          { label: `${fmtMXN(saldoTotal)} en caja`, className: 'chip-info' },
          { label: `${credito.utilizacion}% crédito usado`, className: credito.utilizacion > 70 ? 'chip-warn' : 'chip-ok' }
        ]}
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-3">
        <KPICard label="Caja"   value={fmtMXN(saldoTotal)} delta={4.8} deltaLabel={`${finanzas.saldoBancos.length} cuentas activas`} icon={Banknote}    accent="ok"/>
        <KPICard label="CxC"    value={fmtMXN(cxcTotal)}   delta={-2}  deltaLabel={`${fmtMXN(cxcVencida)} vencida`}                  icon={ArrowUpRight}  accent="info"/>
        <KPICard label="CxP"    value={fmtMXN(cxpTotal)}   delta={6}   deltaLabel={`${fmtMXN(cxpVencidas)} vencidas`}                icon={ArrowDownRight} accent="warn"/>
        <KPICard label="% de uso de créditos" value={`${credito.utilizacion}%`} delta={3} deltaLabel={`${fmtMXN(credito.disponible)} disponible`} icon={CreditCard} accent={credito.utilizacion > 70 ? 'red' : 'warn'}/>
      </div>

      <div className="panel">
        <Tabs value={tab} onChange={setTab}>
          <TabsList style="underline">
            <Tab style="underline" value="credito"  icon={CreditCard}  badge={lineasCredito.length}>Líneas de crédito</Tab>
            <Tab style="underline" value="bancos"   icon={Landmark}    badge={finanzas.saldoBancos.length}>Bancos</Tab>
            <Tab style="underline" value="cxc"      icon={ArrowUpRight} badge={finanzas.cxc.length}>CXC</Tab>
            <Tab style="underline" value="cxp"      icon={ArrowDownRight} badge={finanzas.cxp.length}>CXP</Tab>
            <Tab style="underline" value="scorecli" icon={ShieldCheck}>Score cliente</Tab>
            <Tab style="underline" value="repo"     icon={FolderArchive} badge={repositorioCorporativo.length}>Repositorio</Tab>
          </TabsList>

          {/* LÍNEAS DE CRÉDITO */}
          <TabPanel value="credito" className="p-6 space-y-5">
            {/* Subir estados de cuenta bancarios (drag & drop) */}
            <UploadArchivoMes
              flat
              icon={FileText}
              titulo="Subir estados de cuenta"
              subtitulo="PDF de los estados de cuenta bancarios"
              tipoArchivo="el PDF del estado de cuenta bancario"
              extensiones={['.pdf']}
              textoExito="Estado de cuenta cargado correctamente"
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="surface-2 p-4">
                <div className="label-mono">Límite total</div>
                <div className="font-display text-xl font-semibold text-kratos-ink mt-1">{fmtMXN(credito.limite)}</div>
              </div>
              <div className="surface-2 p-4">
                <div className="label-mono">Dispuesto</div>
                <div className="font-display text-xl font-semibold text-kratos-warn mt-1">{fmtMXN(credito.dispuesto)}</div>
              </div>
              <div className="surface-2 p-4">
                <div className="label-mono">Disponible</div>
                <div className="font-display text-xl font-semibold text-kratos-ok mt-1">{fmtMXN(credito.disponible)}</div>
              </div>
              <div className="surface-2 p-4">
                <div className="label-mono">Utilización</div>
                <div className="font-display text-xl font-semibold text-kratos-ink mt-1">{credito.utilizacion}%</div>
                <ProgressBar value={credito.utilizacion} accent="auto" showValue={false} className="mt-2"/>
              </div>
            </div>

            {/* Tarjetas por línea */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {lineasCredito.map(l => {
                const pct = Math.round((l.dispuesto / l.limite) * 100)
                return (
                  <button key={l.id} onClick={() => setLineaSel(lineaSel === l.id ? null : l.id)}
                    className={`text-left panel panel-hover p-5 ${lineaSel === l.id ? 'ring-2 ring-kratos-ink' : ''}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-mono text-[10px] tracking-wider text-kratos-muted">{l.id}</div>
                        <div className="text-sm font-semibold text-kratos-ink mt-0.5">{l.banco}</div>
                        <div className="text-[12px] text-kratos-muted">{l.producto}</div>
                      </div>
                      <span className={l.estado.startsWith('Vigente') ? 'chip-ok' : 'chip-muted'}>{l.estado.split(' ')[0]}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-baseline justify-between">
                        <span className="text-[11px] text-kratos-muted">Límite</span>
                        <span className="font-mono text-sm text-kratos-ink">{fmtMXN(l.limite)}</span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-[11px] text-kratos-muted">Dispuesto</span>
                        <span className="font-mono text-sm text-kratos-warn">{fmtMXN(l.dispuesto)}</span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-[11px] text-kratos-muted">Disponible</span>
                        <span className="font-mono text-sm text-kratos-ok">{fmtMXN(l.disponible)}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-[10px] text-kratos-muted mb-1">
                        <span>Utilización</span><span className="font-mono">{pct}%</span>
                      </div>
                      <ProgressBar value={pct} accent={pct > 80 ? 'red' : pct > 60 ? 'warn' : 'ok'} showValue={false}/>
                    </div>
                    <div className="mt-3 pt-3 border-t border-kratos-border flex items-center justify-between text-[11px] text-kratos-muted">
                      <span>Tasa <span className="font-mono text-kratos-text">{l.tasaAnual}%</span></span>
                      {l.proximoPago && <span>Próx. <span className="font-mono text-kratos-text">{l.proximoPago}</span></span>}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Detalle de línea seleccionada */}
            {lineaSel && (() => {
              const l = lineasCredito.find(x => x.id === lineaSel)
              return (
                <div className="panel p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="label-mono">{l.id}</div>
                      <h3 className="font-display text-xl font-semibold text-kratos-ink mt-1">{l.banco} · {l.producto}</h3>
                      <p className="text-sm text-kratos-subtle mt-1">{l.garantia} · {l.contacto}</p>
                    </div>
                    <button className="btn-ghost text-xs" onClick={() => setLineaSel(null)}>Cerrar</button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
                    <div className="surface-2 p-3"><div className="label-mono">Cuenta</div><div className="font-mono text-sm mt-1">{l.cuenta}</div></div>
                    <div className="surface-2 p-3"><div className="label-mono">Moneda</div><div className="font-mono text-sm mt-1">{l.moneda}</div></div>
                    <div className="surface-2 p-3"><div className="label-mono">Tasa anual</div><div className="font-mono text-sm mt-1">{l.tasaAnual}%</div></div>
                    <div className="surface-2 p-3"><div className="label-mono">Plazo</div><div className="font-mono text-sm mt-1">{l.plazo}</div></div>
                    <div className="surface-2 p-3"><div className="label-mono">Próximo pago</div><div className="font-mono text-sm mt-1">{l.montoProximo ? fmtMXN(l.montoProximo) : '—'}</div></div>
                  </div>
                  <h4 className="section-title text-sm mb-2">Movimientos recientes</h4>
                  {l.movimientos.length === 0 ? (
                    <div className="text-sm text-kratos-muted py-4 text-center surface-2">Sin movimientos</div>
                  ) : (
                    <div className="surface-2 overflow-hidden">
                      <table className="w-full">
                        <thead><tr>
                          <th className="table-th">Fecha</th>
                          <th className="table-th">Tipo</th>
                          <th className="table-th">Concepto</th>
                          <th className="table-th text-right">Monto</th>
                          <th className="table-th text-right">Saldo</th>
                        </tr></thead>
                        <tbody>
                          {l.movimientos.map((m, i) => (
                            <tr key={i} className="table-row">
                              <td className="table-td text-sm">{m.fecha}</td>
                              <td className="table-td"><span className={m.tipo === 'Pago' ? 'chip-ok' : 'chip-warn'}>{m.tipo}</span></td>
                              <td className="table-td text-sm">{m.concepto}</td>
                              <td className={`table-td text-right font-mono text-sm ${m.monto < 0 ? 'text-kratos-warn' : 'text-kratos-ok'}`}>{fmtMXN(m.monto)}</td>
                              <td className="table-td text-right font-mono text-sm">{fmtMXN(m.saldo)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )
            })()}
            <div className="mt-5"><BrainPanel tema="líneas de crédito y utilización" insights={[
              { tag: 'Tendencia', tone: 'warn', titulo: 'Utilización rumbo al 78%', prediccion: `La utilización global de líneas pasa de ${credito.utilizacion}% hoy a ~78% para finales de junio si se mantiene el ritmo de disposiciones para capital de trabajo, dejando solo ${fmtMXN(credito.disponible)} de colchón.`, accion: 'Amortizar capital en semanas de holgura y reservar disponibilidad para imprevistos.', confianza: 79 },
              { tag: 'Riesgo', tone: 'danger', titulo: 'Línea cara presionando margen', prediccion: 'Las líneas con tasa más alta concentrarán el costo financiero: en 60 días los intereses devengados suben ~12% si no se migra saldo a la línea de menor tasa disponible.', accion: 'Reestructurar dispuesto hacia la línea de tasa más baja y renegociar al bajar la utilización.', confianza: 73 },
            ]}/></div>
          </TabPanel>

          {/* BANCOS */}
          <TabPanel value="bancos" className="p-6 space-y-5">
            {/* Subir estados de cuenta bancarios (drag & drop) */}
            <UploadArchivoMes
              flat
              icon={FileText}
              titulo="Subir estados de cuenta"
              subtitulo="PDF de los estados de cuenta bancarios"
              tipoArchivo="el PDF del estado de cuenta bancario"
              extensiones={['.pdf']}
              textoExito="Estado de cuenta cargado correctamente"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
              {finanzas.saldoBancos.map((b, i) => (
                <div key={i} className="panel p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="min-w-0">
                      <div className="text-sm text-kratos-ink font-semibold truncate">{b.banco}</div>
                      <div className="text-[11px] font-mono text-kratos-muted mt-0.5">{b.cuenta}</div>
                    </div>
                    <Landmark size={16} className="text-kratos-muted shrink-0"/>
                  </div>
                  <div className="font-display text-2xl font-semibold text-kratos-ink">{fmtMXN(b.saldo)}</div>
                  <ProgressBar value={Math.min(100, (b.saldo / saldoTotal) * 100)} accent="info" showValue={false} className="mt-2"/>
                  <div className="text-[10px] text-kratos-muted mt-2">Conciliado {b.conciliado}</div>
                </div>
              ))}
            </div>
            <div className="mt-5"><BrainPanel tema="saldos bancarios y concentración" insights={[
              { tag: 'Riesgo', tone: 'warn', titulo: 'Concentración bancaria alta', prediccion: `Más del 60% de los ${fmtMXN(saldoTotal)} en caja se concentra en un solo banco; ante un bloqueo o falla de servicio, la operación quedaría sin liquidez inmediata por 2–3 días hábiles.`, accion: 'Repartir nómina y proveedores entre 2 instituciones para junio.', confianza: 77 },
              { tag: 'Proyección', tone: 'info', titulo: 'Excedente improductivo', prediccion: 'Las cuentas operativas mantienen saldos por encima de su mínimo necesario; en 30 días ese excedente representará un costo de oportunidad de ~$15–20K en rendimientos no captados.', accion: 'Barrer el excedente a inversión overnight o pagaré a la vista.', confianza: 71 },
            ]}/></div>
          </TabPanel>

          {/* CXC */}
          <TabPanel value="cxc" className="p-6 space-y-5">
            {/* Semáforo de Cartera Vencida */}
            <div className="panel p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-display text-lg font-semibold text-kratos-ink">Semáforo de Cartera Vencida</h3>
                  <p className="text-[12px] text-kratos-muted mt-0.5">Toca un rango para ver sus contratos en la tabla</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="label-mono">Mora total</div>
                  <div className="font-display text-2xl font-semibold text-kratos-danger tabular-nums">{fmtMXN(moraTotal)}</div>
                </div>
              </div>

              {/* Barra apilada */}
              <div className="flex h-5 rounded-none overflow-hidden border border-kratos-border mb-5">
                {carteraBuckets.filter(b => b.monto > 0).map(b => (
                  <button key={b.key} onClick={() => setRangoSel(rangoSel === b.key ? null : b.key)}
                    title={`${b.label}: ${fmtMXN(b.monto)}`}
                    style={{ width: `${(b.monto / carteraTotal) * 100}%`, background: b.color }}
                    className={`h-full transition-opacity ${rangoSel && rangoSel !== b.key ? 'opacity-30' : 'opacity-100'}`} />
                ))}
              </div>

              {/* Tarjetas por rango */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {carteraBuckets.map(b => {
                  const pct = carteraTotal > 0 ? (b.monto / carteraTotal) * 100 : 0
                  const active = rangoSel === b.key
                  return (
                    <button key={b.key} onClick={() => setRangoSel(active ? null : b.key)}
                      className={`text-left surface-2 p-4 transition ${active ? 'ring-2 ring-offset-1 ring-kratos-ink/30' : 'hover:bg-kratos-panel-2'}`}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: b.color }}/>
                        <span className="text-[13px] font-semibold text-kratos-ink leading-tight">{b.label}</span>
                      </div>
                      <div className="font-display text-xl font-semibold tabular-nums" style={{ color: b.color }}>{fmtMXN(b.monto)}</div>
                      <div className="text-[11px] text-kratos-muted">{b.desc}</div>
                      <div className="flex items-baseline justify-between mt-2 text-[11px]">
                        <span className="text-kratos-muted">{b.n} contrato{b.n === 1 ? '' : 's'}</span>
                        <span className="font-mono" style={{ color: b.color }}>{pct.toFixed(1)}%</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Buscador + tabla filtrada */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="relative flex-1 max-w-md">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-kratos-muted pointer-events-none"/>
                  <input value={cxcQuery} onChange={(e) => setCxcQuery(e.target.value)}
                    placeholder="Buscar por cliente o contrato (OC)…"
                    className="w-full pl-10 pr-4 py-2.5 bg-kratos-panel-2 border border-kratos-border rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-kratos-border"/>
                </div>
                {rangoSel && (
                  <button onClick={() => setRangoSel(null)} className="text-[12px] text-kratos-muted hover:text-kratos-ink flex items-center gap-1.5">
                    Filtrando: <span className="font-medium text-kratos-ink">{RANGOS.find(r => r.key === rangoSel)?.label}</span> · limpiar
                  </button>
                )}
              </div>

              <div className="surface-2 overflow-hidden">
                <table className="w-full">
                  <thead><tr>
                    <SortableTH sort={cxcSort.sort} sortKey="cliente" onToggle={cxcSort.toggle}>Cliente</SortableTH>
                    <SortableTH sort={cxcSort.sort} sortKey="oc"      onToggle={cxcSort.toggle}>OC</SortableTH>
                    <SortableTH sort={cxcSort.sort} sortKey="dias"    onToggle={cxcSort.toggle}>Días</SortableTH>
                    <SortableTH sort={cxcSort.sort} sortKey="monto"   onToggle={cxcSort.toggle} align="right">Monto</SortableTH>
                    <SortableTH sort={cxcSort.sort} sortKey="estado"  onToggle={cxcSort.toggle}>Estado</SortableTH>
                  </tr></thead>
                  <tbody>
                    {cxcFiltradas.map((c, i) => (
                      <tr key={i} className="table-row">
                        <td className="table-td">{c.cliente}</td>
                        <td className="table-td font-mono text-xs text-kratos-muted">{c.oc}</td>
                        <td className="table-td font-mono text-sm">{c.dias}d</td>
                        <td className="table-td text-right font-mono">{fmtMXN(c.monto)}</td>
                        <td className="table-td"><span className={c.estado.startsWith('Vencida') ? 'chip-danger' : 'chip-ok'}>{c.estado}</span></td>
                      </tr>
                    ))}
                    {cxcFiltradas.length === 0 && (
                      <tr><td colSpan={5} className="table-td text-center text-kratos-muted py-8">Sin contratos en este filtro.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-5"><BrainPanel tema="cartera por cobrar y mora" insights={[
              { tag: 'Alerta temprana', tone: 'danger', titulo: 'Mora migrando a +90 días', prediccion: `De la mora actual (${fmtMXN(moraTotal)}), ~$${(moraTotal*0.22/1e6).toFixed(1)}M en el bucket 61–90d cruzará a +90 días en las próximas 4 semanas, entrando en zona de riesgo legal y mayor probabilidad de incobrabilidad.`, accion: 'Escalar gestión intensiva sobre los contratos 61–90d antes de su corte.', confianza: 80 },
              { tag: 'Proyección', tone: 'warn', titulo: 'Cobranza concentrada en pocos clientes', prediccion: 'Más del 50% de la cartera vencida se concentra en 2–3 clientes; si su patrón de pago no mejora, el DSO promedio subirá ~6 días para fin de mes y tensará la caja de S27.', accion: 'Acuerdo de pago calendarizado con los clientes de mayor saldo vencido.', confianza: 75 },
            ]}/></div>

            {/* Automatizaciones (movido desde el módulo Inteligencia) */}
            <Agentes/>
          </TabPanel>

          {/* CXP */}
          <TabPanel value="cxp" className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="surface-2 p-4">
                <div className="label-mono">Total CXP</div>
                <div className="font-display text-xl font-semibold text-kratos-ink mt-1">{fmtMXN(cxpTotal)}</div>
              </div>
              <div className="surface-2 p-4">
                <div className="label-mono">Próximas a vencer (≤7d)</div>
                <div className="font-display text-xl font-semibold text-kratos-warn mt-1">{fmtMXN(cxpProximas)}</div>
              </div>
              <div className="surface-2 p-4">
                <div className="label-mono">Vencidas</div>
                <div className="font-display text-xl font-semibold text-kratos-danger mt-1">{fmtMXN(cxpVencidas)}</div>
              </div>
            </div>
            <div className="surface-2 overflow-hidden">
              <table className="w-full">
                <thead><tr>
                  <SortableTH sort={cxpSort.sort} sortKey="proveedor" onToggle={cxpSort.toggle}>Proveedor</SortableTH>
                  <SortableTH sort={cxpSort.sort} sortKey="tipo"      onToggle={cxpSort.toggle}>Tipo</SortableTH>
                  <SortableTH sort={cxpSort.sort} sortKey="vence"     onToggle={cxpSort.toggle}>Vence</SortableTH>
                  <SortableTH sort={cxpSort.sort} sortKey="tag"       onToggle={cxpSort.toggle}>Estado</SortableTH>
                  <SortableTH sort={cxpSort.sort} sortKey="monto"     onToggle={cxpSort.toggle} align="right">Monto</SortableTH>
                </tr></thead>
                <tbody>
                  {cxpSort.sorted.map((c, i) => (
                    <tr key={i} className="table-row">
                      <td className="table-td">{c.proveedor}</td>
                      <td className="table-td text-sm text-kratos-subtle">{c.tipo}</td>
                      <td className="table-td font-mono text-sm">{c.vence}</td>
                      <td className="table-td"><span className={c.tone}>{c.tag}</span></td>
                      <td className="table-td text-right font-mono">{fmtMXN(c.monto)}</td>
                    </tr>
                  ))}
                  <tr className="bg-kratos-bg2">
                    <td className="table-td font-semibold" colSpan={4}>Total</td>
                    <td className="table-td text-right font-mono font-semibold">{fmtMXN(cxpTotal)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-5"><BrainPanel tema="cuentas por pagar a proveedores" insights={[
              { tag: 'Riesgo', tone: 'danger', titulo: 'Vencidas erosionando relación', prediccion: `Los ${fmtMXN(cxpVencidas)} ya vencidos crecerán ~$${(cxpProximas/1e6).toFixed(1)}M en 7 días al sumarse las próximas a vencer; el riesgo es suspensión de crédito de proveedores clave a partir de julio.`, accion: 'Priorizar pago de proveedores estratégicos y negociar prórroga en los no críticos.', confianza: 78 },
              { tag: 'Oportunidad', tone: 'info', titulo: 'Ventana de pronto pago', prediccion: 'Adelantar pagos en semanas de holgura de caja capturaría descuentos por pronto pago estimados en ~2–3% del monto, equivalente a un ahorro mensual de ~$25–40K.', accion: 'Negociar descuento por pronto pago con proveedores recurrentes.', confianza: 70 },
            ]}/></div>
          </TabPanel>

          {/* SCORE CLIENTE */}
          <TabPanel value="scorecli" className="p-6">
            <div className="surface-2 overflow-hidden">
              <table className="w-full">
                <thead><tr>
                  <th className="table-th">Cliente</th>
                  <th className="table-th">Score</th>
                  <th className="table-th">Velocidad</th>
                  <th className="table-th">Riesgo</th>
                  <th className="table-th">Desgaste flujo</th>
                  <th className="table-th">Recomendación IA</th>
                </tr></thead>
                <tbody>
                  {scoreClientes.map(c => (
                    <tr key={c.cliente} className="table-row">
                      <td className="table-td font-medium">{c.cliente}</td>
                      <td className="table-td">
                        <div className="flex items-center gap-2 min-w-[120px]">
                          <span className={`font-display text-lg font-semibold ${c.score >= 75 ? 'text-kratos-ok' : c.score >= 60 ? 'text-kratos-warn' : 'text-kratos-danger'}`}>{c.score}</span>
                          <ProgressBar value={c.score} accent="auto" showValue={false} className="flex-1"/>
                        </div>
                      </td>
                      <td className="table-td text-sm">{c.velocidad}</td>
                      <td className="table-td"><span className={c.riesgo === 'bajo' ? 'chip-ok' : c.riesgo === 'medio' ? 'chip-warn' : 'chip-danger'}>{c.riesgo}</span></td>
                      <td className="table-td"><span className={c.desgasteFlujo === 'bajo' ? 'chip-ok' : c.desgasteFlujo === 'medio' ? 'chip-warn' : 'chip-danger'}>{c.desgasteFlujo}</span></td>
                      <td className="table-td text-sm">{c.recomendacion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5"><BrainPanel tema="score crediticio de clientes" insights={[
              { tag: 'Alerta temprana', tone: 'danger', titulo: 'Clientes de riesgo alto deteriorándose', prediccion: 'Los clientes con score <60 y desgaste de flujo alto tienden a ampliar sus plazos: en 30–45 días su comportamiento de pago empeorará y aportarán el grueso de la nueva mora.', accion: 'Reducir exposición y exigir anticipo o garantía a los clientes de riesgo alto.', confianza: 80 },
              { tag: 'Oportunidad', tone: 'ok', titulo: 'Clientes premium para crecer', prediccion: 'Los clientes con score ≥75 y velocidad de pago rápida sostendrán su buen comportamiento; ampliar línea con ellos en el próximo trimestre eleva ingresos con riesgo de mora marginal.', accion: 'Ofrecer mayor línea y condiciones preferentes a los clientes de score alto.', confianza: 74 },
            ]}/></div>
          </TabPanel>

          {/* REPOSITORIO CORPORATIVO */}
          <TabPanel value="repo" className="p-6">
            <div className="surface-2 overflow-hidden">
              <table className="w-full">
                <thead><tr>
                  <th className="table-th">Tipo</th>
                  <th className="table-th">Documento</th>
                  <th className="table-th">Fecha</th>
                  <th className="table-th">Vigencia</th>
                  <th className="table-th">Estado</th>
                </tr></thead>
                <tbody>
                  {repositorioCorporativo.map((d, i) => (
                    <tr key={i} className="table-row">
                      <td className="table-td"><span className="chip-info">{d.tipo}</span></td>
                      <td className="table-td font-medium">{d.documento}</td>
                      <td className="table-td font-mono text-xs">{d.fecha}</td>
                      <td className="table-td font-mono text-xs">{d.vigencia}</td>
                      <td className="table-td"><span className={d.estado === 'vigente' ? 'chip-ok' : d.estado === 'proximo' ? 'chip-warn' : 'chip-danger'}>{d.estado}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 text-[11px] text-kratos-subtle px-2">
              Actualización automática mensual: CSF, opiniones SAT/IMSS/INFONAVIT, certificados, e.firma, sellos digitales
            </div>
            <div className="mt-5"><BrainPanel tema="repositorio documental corporativo" insights={[
              { tag: 'Alerta temprana', tone: 'warn', titulo: 'Documentos próximos a vencer', prediccion: `De los ${repositorioCorporativo.length} documentos, los marcados como "próximo" caducan en las siguientes semanas; sin renovación, e.firma o sellos digitales vencidos detendrían facturación y trámites en cuestión de días.`, accion: 'Renovar con anticipación los documentos en estado próximo a vencer.', confianza: 83 },
              { tag: 'Riesgo', tone: 'danger', titulo: 'Vencidos bloqueando operación', prediccion: 'Los documentos ya en estado vencido representan riesgo operativo inmediato: certificados o constancias caducadas pueden invalidar CFDIs y frenar pagos de clientes en la próxima quincena.', accion: 'Regularizar de inmediato cualquier documento en estado vencido.', confianza: 78 },
            ]}/></div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  )
}
