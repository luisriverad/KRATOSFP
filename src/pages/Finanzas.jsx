import { useState, useMemo } from 'react'
import { Banknote, FileText, Calendar, ArrowUpRight, ArrowDownRight, AlertTriangle, Building2, ListChecks, Receipt, Landmark, ScrollText, CreditCard, ChevronRight, TrendingUp, TrendingDown, Bot, Users, Briefcase, ShieldCheck, BookOpen, FolderArchive, Activity, FileCheck, Sparkles, Search, BrainCircuit } from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ComposedChart, Line, AreaChart, Area, Legend, Cell, ReferenceLine } from 'recharts'
import PageHeader from '../components/PageHeader'
import KPICard from '../components/KPICard'
import ProgressBar from '../components/ProgressBar'
import SortableTH from '../components/SortableTH'
import { Tabs, TabsList, Tab, TabPanel } from '../components/Tabs'
import { finanzas, agentes, fmtMXN, usuarios, checklists } from '../data/mockData'
import { centrosCosto } from '../data/personalData'
import { controlCargas } from '../data/operacionesData'
import { lineasCredito, creditoResumen } from '../data/creditoData'
import {
  cashflow13s, rentabilidadCliente, rentabilidadProyecto, alertasBancarias,
  analisisDeuda, scoreClientes, monitoreoRegulatorio, repositorioCorporativo,
  matrizRiesgoFiscal, recomendacionesIA, scoreSaludFiscal, analisisPreventivo,
  formatosFinancieros, bitacoraEjecutivaFiscal, facturacionCliente
} from '../data/iaData'
import { useSortable } from '../lib/useSortable'
import { diasHasta } from '../lib/dates'

const tooltip = { contentStyle: { background:'#FFFFFF', border:'1px solid #E5E3DC', borderRadius:10, fontSize:12 }, labelStyle:{ color:'#4A453F' } }

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

// Cashflow centrado en la semana actual: −4 atrás · actual · +2 adelante
const SEMANA_ACTUAL = 'S24'
const _idxSemActual = cashflow13s.findIndex(s => s.semana === SEMANA_ACTUAL)
const cashflowVentana = cashflow13s.slice(Math.max(0, _idxSemActual - 3), _idxSemActual + 3)

export default function Finanzas() {
  const [tab, setTab] = useState('cashflow')
  const [showAnalisisBancos, setShowAnalisisBancos] = useState(false)
  const [lineaSel, setLineaSel] = useState(null)
  const saldoTotal = finanzas.saldoBancos.reduce((s, b) => s + b.saldo, 0)
  const cxcTotal = finanzas.cxc.reduce((s, c) => s + c.monto, 0)
  const cxpTotal = finanzas.cxp.reduce((s, c) => s + c.monto, 0)
  const cxcVencida = finanzas.cxc.filter(c => c.estado.startsWith('Vencida')).reduce((s, c) => s + c.monto, 0)
  const ingresoFacturadoMes = controlCargas.filter(c => c.fecha.startsWith('2026-05') && c.estado === 'Facturado').reduce((s, c) => s + c.monto, 0)
  const ingresoPendiente   = controlCargas.filter(c => c.fecha.startsWith('2026-05') && c.estado !== 'Facturado').reduce((s, c) => s + c.monto, 0)
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
            <Tab style="underline" value="cashflow" icon={Banknote}>Cashflow</Tab>
            <Tab style="underline" value="credito"  icon={CreditCard}  badge={lineasCredito.length}>Líneas de crédito</Tab>
            <Tab style="underline" value="bancos"   icon={Landmark}    badge={finanzas.saldoBancos.length}>Bancos</Tab>
            <Tab style="underline" value="cxc"      icon={ArrowUpRight} badge={finanzas.cxc.length}>CXC</Tab>
            <Tab style="underline" value="cxp"      icon={ArrowDownRight} badge={finanzas.cxp.length}>CXP</Tab>
            <Tab style="underline" value="fiscal"   icon={Receipt}     badge={finanzas.cumplimientoFiscal.filter(o => o.estado !== 'Al día').length || null}>Cumplimiento fiscal</Tab>
            <Tab style="underline" value="alertasb" icon={AlertTriangle}>Alertas bancarias</Tab>
            <Tab style="underline" value="deuda"    icon={TrendingDown}>Análisis deuda</Tab>
            <Tab style="underline" value="scorecli" icon={ShieldCheck}>Score cliente</Tab>
            <Tab style="underline" value="regula"   icon={BookOpen}     badge={monitoreoRegulatorio.length}>Regulatorio</Tab>
            <Tab style="underline" value="matriz"   icon={ShieldCheck}>Matriz fiscal</Tab>
            <Tab style="underline" value="repo"     icon={FolderArchive} badge={repositorioCorporativo.length}>Repositorio</Tab>
            <Tab style="underline" value="reco"     icon={Sparkles}     badge={recomendacionesIA.length}>Recomendaciones IA</Tab>
            <Tab style="underline" value="prev"     icon={Activity}>Análisis preventivo</Tab>
            <Tab style="underline" value="formatos" icon={FileCheck}    badge={formatosFinancieros.length}>Formatos</Tab>
            <Tab style="underline" value="bitfis"   icon={Bot}>Bitácora fiscal</Tab>
            <Tab style="underline" value="facturas" icon={Receipt}     badge={facturacionCliente.length}>Facturación</Tab>
          </TabsList>

          {/* CASHFLOW */}
          <TabPanel value="cashflow" className="p-6 space-y-5">
            {/* Cashflow centrado en la semana actual */}
            <div className="panel p-5">
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="section-title text-base">Cashflow semanal · {SEMANA_ACTUAL} (semana actual)</h3>
                <span className="label-mono">3 atrás · actual · 2 adelante</span>
              </div>
              <div className="relative" style={{ width:'100%', height: 280 }}>
                {/* Marca de agua de la semana actual */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="font-display font-bold tracking-tight select-none" style={{ fontSize: 120, color: 'rgba(30,58,138,0.06)' }}>{SEMANA_ACTUAL}</span>
                </div>
                <ResponsiveContainer>
                  <ComposedChart data={cashflowVentana} margin={{ top: 8, right: 20, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                    <XAxis dataKey="semana" fontSize={11} tickLine={false} axisLine={false}/>
                    <YAxis fontSize={11} tickFormatter={(v)=>`${(v/1e6).toFixed(1)}M`} tickLine={false} axisLine={false} width={50}/>
                    <Tooltip {...tooltip} formatter={(v)=> fmtMXN(v)}/>
                    <Legend wrapperStyle={{ fontSize: 12 }}/>
                    <ReferenceLine x={SEMANA_ACTUAL} stroke="#1E3A8A" strokeDasharray="5 4" strokeWidth={1.5}
                      label={{ value: 'Semana actual', position: 'top', fill: '#1E3A8A', fontSize: 11, fontWeight: 600 }}/>
                    <Bar dataKey="entrada" fill="#047857" radius={[4,4,0,0]} name="Entradas"/>
                    <Bar dataKey="salida"  fill="#B91C1C" radius={[4,4,0,0]} name="Salidas"/>
                    <Line type="monotone" dataKey="saldo" stroke="#1E3A8A" strokeWidth={2.5} dot name="Saldo proyectado"/>
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-6 gap-1 mt-3">
                {cashflowVentana.map(s => {
                  const esActual = s.semana === SEMANA_ACTUAL
                  return (
                    <div key={s.semana} className={`text-center py-2 rounded text-[10px] font-mono ${esActual ? 'ring-2 ring-kratos-info bg-kratos-info-soft text-kratos-info font-semibold' : s.tension === 'alta' ? 'bg-kratos-danger-soft text-kratos-danger' : s.tension === 'media' ? 'bg-kratos-warn-soft text-kratos-warn' : 'bg-kratos-ok-soft text-kratos-ok'}`}>
                      {s.semana}{esActual ? ' · hoy' : ''}
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="surface-2 p-4">
                <div className="label-mono">Ingreso facturado mes</div>
                <div className="font-display text-2xl font-semibold text-kratos-ok mt-1">{fmtMXN(ingresoFacturadoMes)}</div>
                <div className="text-[11px] text-kratos-muted mt-1">{controlCargas.filter(c => c.fecha.startsWith('2026-05') && c.estado === 'Facturado').length} cargas</div>
              </div>
              <div className="surface-2 p-4">
                <div className="label-mono">Ingreso pendiente</div>
                <div className="font-display text-2xl font-semibold text-kratos-warn mt-1">{fmtMXN(ingresoPendiente)}</div>
                <div className="text-[11px] text-kratos-muted mt-1">Sin OC del cliente</div>
              </div>
              <div className="surface-2 p-4">
                <div className="label-mono">Total operativo proyectado</div>
                <div className="font-display text-2xl font-semibold text-kratos-ink mt-1">{fmtMXN(ingresoFacturadoMes + ingresoPendiente)}</div>
                <div className="text-[11px] text-kratos-muted mt-1">Mayo 2026</div>
              </div>
            </div>
          </TabPanel>

          {/* LÍNEAS DE CRÉDITO */}
          <TabPanel value="credito" className="p-6 space-y-5">
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
          </TabPanel>

          {/* BANCOS */}
          <TabPanel value="bancos" className="p-6">
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
              <div className="flex h-5 rounded-md overflow-hidden border border-kratos-border mb-5">
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
                      className={`text-left surface-2 p-4 rounded-xl border-l-4 transition ${active ? 'ring-2 ring-offset-1 ring-kratos-ink/30' : 'hover:bg-kratos-panel-2'}`}
                      style={{ borderLeftColor: b.color }}>
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
                    className="w-full pl-10 pr-4 py-2.5 bg-kratos-panel-2 border border-kratos-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-kratos-border"/>
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
          </TabPanel>

          {/* FISCAL */}
          <TabPanel value="fiscal" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {finanzas.cumplimientoFiscal.map((o, i) => (
                <div key={i} className="panel p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-sm text-kratos-ink font-medium">{o.obligacion}</span>
                    <span className={o.estado === 'Al día' ? 'chip-ok' : o.estado === 'En curso' ? 'chip-info' : 'chip-warn'}>{o.estado}</span>
                  </div>
                  <div className="text-[12px] text-kratos-subtle">Vence: <span className="font-mono">{o.vence}</span></div>
                  <div className="text-[11px] text-kratos-muted mt-1">Resp: {o.responsable}</div>
                </div>
              ))}
            </div>
          </TabPanel>

          {/* ALERTAS BANCARIAS */}
          <TabPanel value="alertasb" className="p-6 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div className="panel p-5">
                <h3 className="section-title text-sm mb-3">Saldos mínimos</h3>
                <ul className="space-y-2">
                  {alertasBancarias.saldosMinimos.map(s => (
                    <li key={s.cuenta} className="flex items-center justify-between text-sm border-b border-kratos-border/40 pb-2 last:border-0">
                      <span className="text-kratos-ink">{s.cuenta}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-kratos-muted">mín {fmtMXN(s.minimo)}</span>
                        <span className="font-mono">{fmtMXN(s.actual)}</span>
                        <span className={s.status === 'ok' ? 'chip-ok' : 'chip-warn'}>{s.status}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="panel p-5">
                <h3 className="section-title text-sm mb-3">Líneas críticas</h3>
                <ul className="space-y-2">
                  {alertasBancarias.lineasCriticas.map(l => (
                    <li key={l.banco} className="text-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-kratos-ink">{l.banco}</span>
                        <span className={`font-mono text-xs ${l.utilizacion >= 70 ? 'text-kratos-warn' : 'text-kratos-ok'}`}>{l.utilizacion}%</span>
                      </div>
                      <ProgressBar value={l.utilizacion} accent={l.utilizacion >= 70 ? 'warn' : 'ok'} showValue={false}/>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <h4 className="section-title text-xs mb-2">Sobregiros futuros proyectados</h4>
                  {alertasBancarias.sobregirosFuturos.map((s, i) => (
                    <div key={i} className="surface-2 p-3 text-sm flex items-center justify-between">
                      <div>
                        <div className="text-kratos-ink">{s.cuenta} · {s.fecha}</div>
                        <div className="text-[11px] text-kratos-muted">probabilidad {Math.round(s.prob*100)}%</div>
                      </div>
                      <span className="font-mono text-kratos-danger">{fmtMXN(s.monto)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="panel p-5">
              <h3 className="section-title text-sm mb-3">Control de caja chica</h3>
              <table className="w-full">
                <thead><tr>
                  <th className="table-th">Responsable</th>
                  <th className="table-th text-right">Gastado</th>
                  <th className="table-th text-right">Fondo</th>
                  <th className="table-th">Avance</th>
                  <th className="table-th">Vence</th>
                </tr></thead>
                <tbody>
                  {alertasBancarias.cajaChica.map((c, i) => {
                    const pct = Math.round((c.monto / c.fondo) * 100)
                    return (
                      <tr key={i} className="table-row">
                        <td className="table-td">{c.responsable}</td>
                        <td className="table-td text-right font-mono">{fmtMXN(c.monto)}</td>
                        <td className="table-td text-right font-mono">{fmtMXN(c.fondo)}</td>
                        <td className="table-td">
                          <div className="flex items-center gap-2 min-w-[120px]">
                            <span className="font-mono text-xs w-9">{pct}%</span>
                            <ProgressBar value={pct} accent={pct > 80 ? 'warn' : 'ok'} showValue={false} className="flex-1"/>
                          </div>
                        </td>
                        <td className="table-td text-sm">{c.vence}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Análisis por Kratos FP Brain */}
            {!showAnalisisBancos ? (
              <button onClick={() => setShowAnalisisBancos(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-kratos-ink text-white text-sm font-semibold hover:opacity-90 transition">
                <BrainCircuit size={18}/> Análisis por Kratos FP Brain
              </button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-lg bg-kratos-ink text-white flex items-center justify-center shrink-0"><BrainCircuit size={17}/></span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-kratos-ink leading-tight">Análisis por Kratos FP Brain</h3>
                    <p className="text-[12px] text-kratos-muted">Recomendaciones y planes de trabajo sobre las alertas bancarias</p>
                  </div>
                  <button onClick={() => setShowAnalisisBancos(false)} className="ml-auto text-[12px] text-kratos-muted hover:text-kratos-ink">Ocultar</button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                  {analisisBancos.map((r, i) => (
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
                      <div className="mt-4 pt-3 border-t border-kratos-border text-[12px] text-kratos-subtle font-mono">{r.pie}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabPanel>

          {/* ANÁLISIS DE DEUDA */}
          <TabPanel value="deuda" className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="panel p-5">
                <div className="label-mono">DSCR (Cobertura deuda)</div>
                <div className={`font-display text-3xl font-semibold mt-1 ${analisisDeuda.dscr >= 1.25 ? 'text-kratos-ok' : 'text-kratos-warn'}`}>{analisisDeuda.dscr}</div>
                <div className="text-[11px] text-kratos-muted mt-1">objetivo &gt; 1.25</div>
              </div>
              <div className="panel p-5">
                <div className="label-mono">Cobertura EBITDA/intereses</div>
                <div className={`font-display text-3xl font-semibold mt-1 ${analisisDeuda.cobertura >= 3 ? 'text-kratos-ok' : 'text-kratos-warn'}`}>{analisisDeuda.cobertura}x</div>
                <div className="text-[11px] text-kratos-muted mt-1">objetivo &gt; 3.0</div>
              </div>
              <div className="panel p-5">
                <div className="label-mono">Apalancamiento</div>
                <div className={`font-display text-3xl font-semibold mt-1 ${analisisDeuda.apalancamiento <= 0.6 ? 'text-kratos-ok' : 'text-kratos-warn'}`}>{(analisisDeuda.apalancamiento*100).toFixed(0)}%</div>
                <ProgressBar value={analisisDeuda.apalancamiento*100} accent={analisisDeuda.apalancamiento <= 0.6 ? 'ok' : 'warn'} showValue={false} className="mt-2"/>
              </div>
            </div>
            <div className="panel p-5">
              <h3 className="section-title text-sm mb-3">DSCR mensual</h3>
              <div style={{ width:'100%', height: 220 }}>
                <ResponsiveContainer>
                  <ComposedChart data={analisisDeuda.riesgoMensual} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                    <XAxis dataKey="mes" fontSize={11} tickLine={false} axisLine={false}/>
                    <YAxis fontSize={11} tickLine={false} axisLine={false}/>
                    <Tooltip {...tooltip}/>
                    <ReferenceLine y={1.25} stroke="#9CA3AF" strokeDasharray="3 3" label={{ value: 'Mínimo 1.25', fontSize: 10, fill: '#6E685F' }}/>
                    <Line type="monotone" dataKey="dscr" stroke="#1E3A8A" strokeWidth={2.5} dot={{ r: 5 }}/>
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
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
          </TabPanel>

          {/* MONITOREO REGULATORIO */}
          <TabPanel value="regula" className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-2">
              {['SAT','IMSS','INFONAVIT','STPS','SCT'].map(fuente => {
                const n = monitoreoRegulatorio.filter(r => r.fuente === fuente).length
                return (
                  <div key={fuente} className="surface-2 p-3 text-center">
                    <div className="font-mono text-[10px] tracking-wider text-kratos-muted">{fuente}</div>
                    <div className="font-display text-2xl font-semibold text-kratos-ink mt-1">{n}</div>
                    <div className="text-[10px] text-kratos-muted">cambios</div>
                  </div>
                )
              })}
            </div>
            <div className="surface-2 overflow-hidden">
              <table className="w-full">
                <thead><tr>
                  <th className="table-th">Fuente</th>
                  <th className="table-th">Tema</th>
                  <th className="table-th">Publicado</th>
                  <th className="table-th">Impacto</th>
                  <th className="table-th">Resumen</th>
                  <th className="table-th">Acción sugerida</th>
                </tr></thead>
                <tbody>
                  {monitoreoRegulatorio.map((r, i) => (
                    <tr key={i} className="table-row">
                      <td className="table-td"><span className="chip-info">{r.fuente}</span></td>
                      <td className="table-td font-medium">{r.tema}</td>
                      <td className="table-td font-mono text-xs">{r.publicado}</td>
                      <td className="table-td"><span className={r.impacto === 'alto' ? 'chip-danger' : r.impacto === 'medio' ? 'chip-warn' : 'chip-muted'}>{r.impacto}</span></td>
                      <td className="table-td text-sm text-kratos-subtle max-w-md">{r.resumen}</td>
                      <td className="table-td text-sm">{r.accion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPanel>

          {/* MATRIZ DE RIESGO FISCAL */}
          <TabPanel value="matriz" className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {scoreSaludFiscal.map(s => (
                <div key={s.area} className="panel p-4 text-center">
                  <div className="label-mono">{s.area}</div>
                  <div className={`font-display text-3xl font-semibold mt-2 ${s.score >= 90 ? 'text-kratos-ok' : s.score >= 75 ? 'text-kratos-warn' : 'text-kratos-danger'}`}>{s.score}</div>
                  <div className="text-[10px] text-kratos-muted">/100</div>
                  <ProgressBar value={s.score} accent="auto" showValue={false} className="mt-2"/>
                </div>
              ))}
            </div>
            <div className="panel">
              <header className="px-5 py-3 border-b border-kratos-border">
                <h3 className="section-title text-sm">Matriz semáforo</h3>
              </header>
              <table className="w-full">
                <thead><tr>
                  <th className="table-th">Área</th>
                  <th className="table-th">Cumplimiento</th>
                  <th className="table-th">Riesgos detectados</th>
                  <th className="table-th">Estado</th>
                </tr></thead>
                <tbody>
                  {matrizRiesgoFiscal.map(m => (
                    <tr key={m.area} className="table-row">
                      <td className="table-td font-medium">{m.area}</td>
                      <td className="table-td">
                        <div className="flex items-center gap-2 min-w-[120px]">
                          <span className="font-mono text-xs w-9">{m.cumplimiento}%</span>
                          <ProgressBar value={m.cumplimiento} accent={m.color === 'verde' ? 'ok' : m.color === 'amarillo' ? 'warn' : 'red'} showValue={false} className="flex-1"/>
                        </div>
                      </td>
                      <td className="table-td text-xs">
                        {m.riesgos.length === 0 ? <span className="text-kratos-ok">Sin riesgos</span> :
                          m.riesgos.map((r, i) => <div key={i} className={r.nivel === 'rojo' ? 'text-kratos-danger' : 'text-kratos-warn'}>· {r.tipo}</div>)
                        }
                      </td>
                      <td className="table-td">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-medium ${m.color === 'verde' ? 'bg-kratos-ok-soft text-kratos-ok' : m.color === 'amarillo' ? 'bg-kratos-warn-soft text-kratos-warn' : 'bg-kratos-danger-soft text-kratos-danger'}`}>
                          <span className={`w-2 h-2 rounded-full ${m.color === 'verde' ? 'bg-kratos-ok' : m.color === 'amarillo' ? 'bg-kratos-warn' : 'bg-kratos-danger'}`}/>
                          {m.color === 'verde' ? 'Cumplimiento' : m.color === 'amarillo' ? 'Preventivo' : 'Crítico'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
          </TabPanel>

          {/* RECOMENDACIONES IA */}
          <TabPanel value="reco" className="p-6 space-y-3">
            {recomendacionesIA.map((r, i) => (
              <div key={i} className={`panel p-5 border-l-4 ${r.prioridad === 'alta' ? 'border-l-kratos-danger' : 'border-l-kratos-warn'}`}>
                <div className="flex items-baseline gap-2 mb-2 flex-wrap">
                  <span className={`chip-${r.tipo === 'fiscal' ? 'info' : r.tipo === 'corporativa' ? 'purple' : 'ok'}`}>{r.tipo}</span>
                  <span className={r.prioridad === 'alta' ? 'chip-danger' : 'chip-warn'}>{r.prioridad}</span>
                  {r.impacto > 0 && <span className="ml-auto font-mono text-sm text-kratos-ok">{fmtMXN(r.impacto)} impacto</span>}
                </div>
                <div className="text-sm text-kratos-ink font-semibold">{r.titulo}</div>
                <p className="text-[13px] text-kratos-subtle mt-1">{r.detalle}</p>
              </div>
            ))}
          </TabPanel>

          {/* ANÁLISIS PREVENTIVO */}
          <TabPanel value="prev" className="p-6">
            <div className="surface-2 overflow-hidden">
              <table className="w-full">
                <thead><tr>
                  <th className="table-th">Operación</th>
                  <th className="table-th">Tipo</th>
                  <th className="table-th">Impacto fiscal</th>
                  <th className="table-th">Impacto legal</th>
                  <th className="table-th">Impacto financiero</th>
                  <th className="table-th">Riesgo</th>
                  <th className="table-th">Recomendación IA</th>
                </tr></thead>
                <tbody>
                  {analisisPreventivo.map((a, i) => (
                    <tr key={i} className="table-row">
                      <td className="table-td font-medium">{a.operacion}</td>
                      <td className="table-td text-sm text-kratos-subtle">{a.tipo}</td>
                      <td className="table-td text-xs">{a.impactoFiscal}</td>
                      <td className="table-td text-xs">{a.impactoLegal}</td>
                      <td className="table-td text-xs">{a.impactoFinanciero}</td>
                      <td className="table-td"><span className={a.riesgo === 'alto' ? 'chip-danger' : a.riesgo === 'medio' ? 'chip-warn' : 'chip-ok'}>{a.riesgo}</span></td>
                      <td className="table-td text-xs font-medium">{a.recomienda}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPanel>

          {/* FORMATOS FINANCIEROS */}
          <TabPanel value="formatos" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {formatosFinancieros.map(f => (
                <div key={f.id} className="panel p-5">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="label-mono">{f.id}</span>
                    <span className="chip-info">{f.usadoMes}/mes</span>
                  </div>
                  <div className="text-sm text-kratos-ink font-semibold">{f.titulo}</div>
                  <p className="text-[12px] text-kratos-subtle mt-2">{f.descripcion}</p>
                  <div className="text-[11px] text-kratos-ok mt-3">Ahorra ~{f.ahorroH} h/mes</div>
                </div>
              ))}
            </div>
          </TabPanel>

          {/* BITÁCORA EJECUTIVA FISCAL */}
          <TabPanel value="bitfis" className="p-6 space-y-4">
            <div className="panel p-6">
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="font-display text-xl font-semibold text-kratos-ink">Bitácora ejecutiva fiscal · {bitacoraEjecutivaFiscal.semana}</h3>
                <span className="label-mono">Resumen semanal Dirección</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
                <div className="surface-2 p-3"><div className="label-mono">Cambios regulat.</div><div className="font-display text-2xl mt-1">{bitacoraEjecutivaFiscal.cambiosRegulatorios}</div></div>
                <div className="surface-2 p-3"><div className="label-mono">Riesgos activos</div><div className="font-display text-2xl mt-1 text-kratos-warn">{bitacoraEjecutivaFiscal.riesgosActivos}</div></div>
                <div className="surface-2 p-3"><div className="label-mono">Alertas</div><div className="font-display text-2xl mt-1 text-kratos-danger">{bitacoraEjecutivaFiscal.alertas}</div></div>
                <div className="surface-2 p-3"><div className="label-mono">Oportunidades</div><div className="font-display text-2xl mt-1 text-kratos-ok">{bitacoraEjecutivaFiscal.oportunidades}</div></div>
                <div className="surface-2 p-3"><div className="label-mono">Pendientes</div><div className="font-display text-2xl mt-1">{bitacoraEjecutivaFiscal.pendientes}</div></div>
                <div className="surface-2 p-3"><div className="label-mono">Estrategias</div><div className="font-display text-2xl mt-1 text-kratos-info">{bitacoraEjecutivaFiscal.estrategiasSugeridas}</div></div>
              </div>
              <div className="mt-4 p-4 surface-2">
                <div className="label-mono mb-1">Impacto estimado total</div>
                <div className="font-display text-3xl font-semibold text-kratos-ok">{fmtMXN(bitacoraEjecutivaFiscal.impactoEstimado)}</div>
              </div>
              <div className="mt-4">
                <h4 className="section-title text-sm mb-2">Resumen IA</h4>
                <p className="text-sm text-kratos-subtle leading-relaxed">{bitacoraEjecutivaFiscal.resumen}</p>
              </div>
            </div>
          </TabPanel>

          {/* CONTROL FACTURAS POR CLIENTE */}
          <TabPanel value="facturas" className="p-6">
            <div className="surface-2 overflow-hidden">
              <table className="w-full">
                <thead><tr>
                  <th className="table-th">Cliente</th>
                  <th className="table-th text-right">Facturas YTD</th>
                  <th className="table-th text-right">Monto YTD</th>
                  <th className="table-th">Última factura</th>
                  <th className="table-th">Vencidas</th>
                  <th className="table-th text-right">Vigentes (saldo)</th>
                </tr></thead>
                <tbody>
                  {facturacionCliente.map(f => (
                    <tr key={f.cliente} className="table-row">
                      <td className="table-td font-medium">{f.cliente}</td>
                      <td className="table-td text-right font-mono">{f.facturas}</td>
                      <td className="table-td text-right font-mono">{fmtMXN(f.montoYTD)}</td>
                      <td className="table-td font-mono text-xs">{f.ultima}</td>
                      <td className="table-td"><span className={f.vencidas === 0 ? 'chip-ok' : 'chip-danger'}>{f.vencidas}</span></td>
                      <td className="table-td text-right font-mono">{fmtMXN(f.vigentes)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  )
}
