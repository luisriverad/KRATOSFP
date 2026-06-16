import { useState, useMemo } from 'react'
import { Package, Truck, Plus, ClipboardList, Star, AlertTriangle, Search, ChevronRight, Box, FileCheck, ListChecks, ShoppingCart, ScrollText, Brain, TrendingUp, ShieldOff, Snowflake, FileSpreadsheet } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SectionCard from '../components/SectionCard'
import KPICard from '../components/KPICard'
import AgentCard from '../components/AgentCard'
import { Tabs, TabsList, Tab, TabPanel } from '../components/Tabs'
import Drawer from '../components/Drawer'
import ExpedienteProveedor from '../components/expedientes/ExpedienteProveedor'
import ProgressBar from '../components/ProgressBar'
import SortableTH from '../components/SortableTH'
import BrainPanel from '../components/BrainPanel'
import { compras, agentes, usuarios, checklists, fmtMXN } from '../data/mockData'
import { expedientesProveedores, proveedorIndex, inventarioCompleto, ordenesCompra, listaCompras } from '../data/comprasData'
import { reordenPredictivo, alertasSobreprecio, deteccionFraude, inventarioMuerto, formatosCompras } from '../data/iaData'
import { useSortable } from '../lib/useSortable'

const prioridadChip = (p) => p === 'Alta' ? 'chip-danger' : p === 'Media' ? 'chip-warn' : 'chip-muted'
const stockChip = (e) => {
  if (e === 'Agotado' || e === 'Crítico') return 'chip-danger'
  if (e === 'Bajo') return 'chip-warn'
  if (e === 'Mínimo') return 'chip-info'
  return 'chip-ok'
}
const estadoOC = (e) => {
  if (e === 'Recibido' || e.startsWith('Recibido')) return 'chip-ok'
  if (e === 'En tránsito') return 'chip-info'
  if (e === 'OC generada') return 'chip-warn'
  return 'chip-muted'
}

export default function Compras() {
  const [proveedorSel, setProveedorSel] = useState(null)
  const [tab, setTab] = useState('proveedores')
  const [filtroInv, setFiltroInv] = useState('todos')
  const [busqInv, setBusqInv] = useState('')

  const cprAgents = agentes.filter(a => a.area === 'Compras')
  const spendTotal = compras.proveedores.reduce((s, p) => s + p.spend, 0)
  const reqAbiertas = compras.requisiciones.filter(r => !['OC generada','En tránsito'].includes(r.estado)).length
  const criticos = inventarioCompleto.filter(i => i.estado === 'Crítico' || i.estado === 'Agotado').length

  const proveedorClick = (nombre) => {
    const item = proveedorIndex.find(p => p.nombre === nombre)
    if (item) setProveedorSel(item.key)
  }

  const inventarioFiltrado = useMemo(() => {
    return inventarioCompleto.filter(i => {
      if (filtroInv !== 'todos' && i.estado !== filtroInv) return false
      if (busqInv && !`${i.sku} ${i.producto} ${i.marca}`.toLowerCase().includes(busqInv.toLowerCase())) return false
      return true
    })
  }, [filtroInv, busqInv])

  // Cotizaciones unificadas con proveedor
  const cotizacionesAll = useMemo(() => proveedorIndex.flatMap(p => {
    const exp = expedientesProveedores[p.key]
    return (exp?.cotizaciones || []).map(c => ({ ...c, proveedor: p.nombre, _key: p.key }))
  }), [])

  // Sortable tables
  const reqSort   = useSortable(compras.requisiciones, { areaSolicita: (r) => `${r.area} ${r.solicita}` })
  const cotizSort = useSortable(cotizacionesAll, { ganadora: (c) => c.ganadora ? 1 : 0 })
  const ocsSort   = useSortable(ordenesCompra)
  const invSort   = useSortable(inventarioFiltrado, {
    stock: (i) => i.stock / Math.max(i.min, 1),
    valor: (i) => i.stock * i.costoUnit
  })
  const listaSort = useSortable(listaCompras)
  const checklistSort = useSortable(checklists.compras.items, { cumple: (c) => c.cumple ? 1 : 0 })

  return (
    <div className="space-y-7">
      <PageHeader
        title="Compras y Almacén"
        owner={usuarios.compras.nombre + ' · ' + usuarios.compras.rol}
        badges={[
          { label: `${checklists.compras.cumplimiento}% checklist`, className: 'chip-warn' },
          { label: `${reqAbiertas} req. abiertas`, className: 'chip-info' }
        ]}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KPICard label="Proveedores aprobados" value={compras.proveedores.length} delta={2} deltaLabel={`${fmtMXN(spendTotal)} spend`} icon={Star} accent="info"/>
        <KPICard label="Requisiciones abiertas" value={reqAbiertas} delta={-2} deltaLabel={`${compras.requisiciones.length} totales mes`} icon={ClipboardList} accent="warn"/>
        <KPICard label="OCs en tránsito" value={ordenesCompra.filter(o => o.estado === 'En tránsito').length} delta={0} deltaLabel={`${ordenesCompra.length} OCs YTD`} icon={Truck} accent="ok"/>
        <KPICard label="Inventario muerto" value={fmtMXN(inventarioMuerto.reduce((s, i) => s + i.valor, 0))} delta={-3} deltaLabel={`${inventarioMuerto.length} SKUs parados`} icon={Snowflake} accent="red"/>
      </div>

      <div className="panel">
        <Tabs value={tab} onChange={setTab}>
          <TabsList>
            <Tab value="proveedores" icon={Star}         badge={compras.proveedores.length}>Proveedores</Tab>
            <Tab value="requis"    icon={ClipboardList} badge={compras.requisiciones.length}>Requisiciones</Tab>
            <Tab value="ocs"       icon={Truck}         badge={ordenesCompra.filter(o => o.estado === 'En tránsito').length}>Órdenes de compra</Tab>
            <Tab value="inventario"  icon={Box}          badge={inventarioCompleto.length}>Inventario</Tab>
            <Tab value="muerto"     icon={Snowflake}    badge={inventarioMuerto.length}>Inv. muerto</Tab>
            <Tab value="formatos"   icon={FileSpreadsheet} badge={formatosCompras.length}>Formatos</Tab>
          </TabsList>

          {/* REQUISICIONES */}
          <TabPanel value="requis" className="p-5">
            <div className="surface-2 overflow-hidden">
              <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-kratos-border">
                <h3 className="section-title text-sm">Requisiciones del mes</h3>
                <button className="btn-primary"><Plus size={14}/> Nueva requisición</button>
              </div>
              <table className="w-full">
                <thead><tr>
                  <SortableTH sort={reqSort.sort} sortKey="id"            onToggle={reqSort.toggle}>ID</SortableTH>
                  <SortableTH sort={reqSort.sort} sortKey="areaSolicita"  onToggle={reqSort.toggle}>Área · Solicita</SortableTH>
                  <SortableTH sort={reqSort.sort} sortKey="concepto"      onToggle={reqSort.toggle}>Concepto</SortableTH>
                  <SortableTH sort={reqSort.sort} sortKey="cotizaciones"  onToggle={reqSort.toggle}>Cotizaciones</SortableTH>
                  <SortableTH sort={reqSort.sort} sortKey="estado"        onToggle={reqSort.toggle}>Estado</SortableTH>
                  <SortableTH sort={reqSort.sort} sortKey="prioridad"     onToggle={reqSort.toggle}>Prioridad</SortableTH>
                  <SortableTH sort={reqSort.sort} sortKey="fecha"         onToggle={reqSort.toggle}>Fecha</SortableTH>
                </tr></thead>
                <tbody>
                  {reqSort.sorted.map(r => (
                    <tr key={r.id} className="table-row">
                      <td className="table-td font-mono text-xs">{r.id}</td>
                      <td className="table-td text-xs text-kratos-subtle">{r.area} · {r.solicita}</td>
                      <td className="table-td">{r.concepto}</td>
                      <td className="table-td"><span className={r.cotizaciones === 3 ? 'chip-ok' : 'chip-warn'}>{r.cotizaciones}/3</span></td>
                      <td className="table-td"><span className={r.estado === 'OC generada' ? 'chip-ok' : r.estado === 'En tránsito' ? 'chip-info' : 'chip-warn'}>{r.estado}</span></td>
                      <td className="table-td"><span className={prioridadChip(r.prioridad)}>{r.prioridad}</span></td>
                      <td className="table-td text-xs">{r.fecha}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 text-[11px] text-kratos-subtle px-2">
              Política Kratos: 3 cotizaciones por requisición · evaluador automático AG-17
            </div>
            <div className="mt-5"><BrainPanel tema="requisiciones" insights={[
              { tag: 'Proyección', tone: 'warn', titulo: 'Cuello de botella en cotizaciones', prediccion: 'El 38% de requisiciones abiertas sigue sin completar sus 3 cotizaciones; al ritmo actual ~14 requis. rebasarán el SLA de 5 días hábiles antes de fin de mes.', accion: 'Activar AG-17 para auto-solicitar la 3ra cotización en las requis. con 2/3 mayores a 7 días.', confianza: 81 },
              { tag: 'Alerta temprana', tone: 'danger', titulo: 'Requisiciones de prioridad Alta estancadas', prediccion: 'Las requis. de prioridad Alta sin OC generada se duplicarán en 10 días si mantienen el flujo actual, frenando mantenimiento de planta.', accion: 'Escalar a comité de compras las requis. Alta con >72h sin avance y pre-aprobar proveedores recurrentes.', confianza: 76 },
            ]}/></div>
          </TabPanel>

          {/* OCs */}
          <TabPanel value="ocs" className="p-5">
            <div className="surface-2 overflow-hidden">
              <table className="w-full">
                <thead><tr>
                  <SortableTH sort={ocsSort.sort} sortKey="oc"        onToggle={ocsSort.toggle}>OC</SortableTH>
                  <SortableTH sort={ocsSort.sort} sortKey="fecha"     onToggle={ocsSort.toggle}>Fecha</SortableTH>
                  <SortableTH sort={ocsSort.sort} sortKey="proveedor" onToggle={ocsSort.toggle}>Proveedor</SortableTH>
                  <SortableTH sort={ocsSort.sort} sortKey="req"       onToggle={ocsSort.toggle}>Req.</SortableTH>
                  <SortableTH sort={ocsSort.sort} sortKey="monto"     onToggle={ocsSort.toggle} align="right">Monto</SortableTH>
                  <SortableTH sort={ocsSort.sort} sortKey="etaDias"   onToggle={ocsSort.toggle}>ETA</SortableTH>
                  <SortableTH sort={ocsSort.sort} sortKey="estado"    onToggle={ocsSort.toggle}>Estado</SortableTH>
                </tr></thead>
                <tbody>
                  {ocsSort.sorted.map((o, i) => (
                    <tr key={i} className="table-row row-clickable" onClick={() => proveedorClick(o.proveedor)}>
                      <td className="table-td font-mono text-xs">{o.oc}</td>
                      <td className="table-td text-xs">{o.fecha}</td>
                      <td className="table-td">{o.proveedor}</td>
                      <td className="table-td font-mono text-xs text-kratos-subtle">{o.req}</td>
                      <td className="table-td text-right font-mono">{fmtMXN(o.monto)}</td>
                      <td className="table-td text-xs">{o.etaDias > 0 ? `${o.etaDias}d` : '—'}</td>
                      <td className="table-td"><span className={estadoOC(o.estado)}>{o.estado}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5"><BrainPanel tema="ordenes-compra" insights={[
              { tag: 'Riesgo', tone: 'danger', titulo: 'OCs en tránsito con ETA en riesgo', prediccion: 'Cerca del 30% de las OCs en tránsito superará su ETA estimada en ~6 días según el historial de retraso de sus proveedores, afectando reabasto de refacciones críticas.', accion: 'Confirmar embarque y fecha real con los proveedores de las OCs con ETA <7d y monto alto antes de 48h.', confianza: 79 },
              { tag: 'Oportunidad', tone: 'info', titulo: 'Consolidación de OCs por proveedor', prediccion: 'Agrupar las OCs abiertas hacia los 3 proveedores recurrentes proyecta un ahorro de ~4-6% en flete y precio por volumen el próximo trimestre.', accion: 'Negociar OC marco mensual con los proveedores de mayor frecuencia en lugar de OCs individuales.', confianza: 73 },
            ]}/></div>
          </TabPanel>

          {/* PROVEEDORES */}
          <TabPanel value="proveedores" className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {proveedorIndex.map(p => {
                const exp = expedientesProveedores[p.key]
                if (!exp) return null
                return (
                  <button
                    key={p.key}
                    onClick={() => setProveedorSel(p.key)}
                    className="text-left panel panel-hover p-4 relative group"
                  >
                    <span className="absolute top-3 right-3 text-kratos-subtle group-hover:text-kratos-red">
                      <ChevronRight size={16}/>
                    </span>
                    <div className="flex items-start justify-between mb-2 pr-5">
                      <div>
                        <div className="text-sm text-kratos-ink font-semibold">{exp.nombre}</div>
                        <div className="text-[11px] text-kratos-subtle mt-0.5">{exp.categoria}</div>
                      </div>
                      <span className={exp.estado === 'Aprobado' ? 'chip-ok' : 'chip-warn'}>{exp.estado}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs my-2">
                      <Star size={12} className="text-kratos-warn fill-kratos-warn"/>
                      <span className="font-mono font-semibold text-kratos-ink">{exp.calificacion}</span>
                      <span className="text-kratos-subtle">· {exp.tiempoEntrega}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs mt-3 pt-2 border-t border-kratos-border/60">
                      <div>
                        <div className="label-mono">Spend YTD</div>
                        <div className="font-mono text-kratos-ink mt-0.5">{fmtMXN(exp.spendYTD)}</div>
                      </div>
                      <div>
                        <div className="label-mono">OCs / Cot.</div>
                        <div className="font-mono text-kratos-ink mt-0.5">{exp.ordenesCompra.length} / {exp.cotizaciones.length}</div>
                      </div>
                    </div>
                    {exp.noConformidades.filter(n => n.estado === 'Abierta').length > 0 && (
                      <div className="mt-2 text-[10px] text-kratos-danger flex items-center gap-1">
                        <AlertTriangle size={10}/> {exp.noConformidades.filter(n => n.estado === 'Abierta').length} NC abierta(s)
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
            <div className="mt-5"><BrainPanel tema="proveedores" insights={[
              { tag: 'Tendencia', tone: 'warn', titulo: 'Caída de score en proveedor clave', prediccion: 'El proveedor con mayor spend YTD muestra calificación a la baja y NCs abiertas; de mantener la tendencia caería de "Aprobado" a revisión en ~2 meses, exponiendo el 40% del gasto.', accion: 'Abrir plan de acción correctivo y cotizar un proveedor alterno antes del próximo ciclo de OCs.', confianza: 78 },
              { tag: 'Oportunidad', tone: 'ok', titulo: 'Diversificación de base de proveedores', prediccion: 'La concentración del spend en pocos proveedores aprobados eleva el riesgo de desabasto; homologar 2 proveedores secundarios reduciría el riesgo de continuidad ~25% en el semestre.', accion: 'Acelerar la evaluación documental de los proveedores en estado distinto a "Aprobado" con buena calificación.', confianza: 71 },
            ]}/></div>
          </TabPanel>

          {/* INVENTARIO */}
          <TabPanel value="inventario" className="p-5">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-kratos-subtle pointer-events-none"/>
                <input
                  type="text"
                  placeholder="Buscar SKU, producto o marca..."
                  value={busqInv}
                  onChange={e => setBusqInv(e.target.value)}
                  className="w-full bg-white border border-kratos-border rounded-none pl-10 pr-3 py-2 text-sm text-kratos-text placeholder:text-kratos-subtle focus:outline-none focus:border-kratos-red/50"
                />
              </div>
              <div className="flex gap-1 surface-2 p-1">
                {['todos','Agotado','Crítico','Bajo','Mínimo','OK'].map(f => (
                  <button key={f}
                    onClick={() => setFiltroInv(f)}
                    className={`px-2.5 py-1 rounded-none text-xs ${filtroInv === f ? 'bg-kratos-red text-white' : 'text-kratos-subtle hover:text-white'}`}>
                    {f === 'todos' ? 'Todos' : f}
                  </button>
                ))}
              </div>
              <span className="text-xs text-kratos-subtle">{inventarioFiltrado.length} ítems</span>
            </div>
            <div className="surface-2 overflow-hidden">
              <table className="w-full">
                <thead><tr>
                  <SortableTH sort={invSort.sort} sortKey="sku"       onToggle={invSort.toggle}>SKU</SortableTH>
                  <SortableTH sort={invSort.sort} sortKey="producto"  onToggle={invSort.toggle}>Producto</SortableTH>
                  <SortableTH sort={invSort.sort} sortKey="categoria" onToggle={invSort.toggle}>Categoría</SortableTH>
                  <SortableTH sort={invSort.sort} sortKey="marca"     onToggle={invSort.toggle}>Marca</SortableTH>
                  <SortableTH sort={invSort.sort} sortKey="ubic"      onToggle={invSort.toggle}>Ubic.</SortableTH>
                  <SortableTH sort={invSort.sort} sortKey="stock"     onToggle={invSort.toggle}>Stock</SortableTH>
                  <SortableTH sort={invSort.sort} sortKey="valor"     onToggle={invSort.toggle} align="right">Valor</SortableTH>
                  <SortableTH sort={invSort.sort} sortKey="estado"    onToggle={invSort.toggle}>Estado</SortableTH>
                </tr></thead>
                <tbody>
                  {invSort.sorted.map((it, i) => (
                    <tr key={i} className="table-row">
                      <td className="table-td font-mono text-[10px] text-kratos-subtle">{it.sku}</td>
                      <td className="table-td">{it.producto}</td>
                      <td className="table-td text-xs text-kratos-subtle">{it.categoria}</td>
                      <td className="table-td text-xs">{it.marca}</td>
                      <td className="table-td font-mono text-[11px] text-kratos-subtle">{it.ubic}</td>
                      <td className="table-td">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs w-12">{it.stock}/{it.min}</span>
                          <ProgressBar value={Math.min(100, (it.stock / Math.max(it.min, 1)) * 100)} accent="auto" showValue={false} className="flex-1 min-w-[60px]"/>
                        </div>
                      </td>
                      <td className="table-td text-right font-mono text-xs">{fmtMXN(it.stock * it.costoUnit)}</td>
                      <td className="table-td"><span className={stockChip(it.estado)}>{it.estado}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5"><BrainPanel tema="inventario" insights={[
              { tag: 'Alerta temprana', tone: 'danger', titulo: 'Quiebre de stock inminente en críticos', prediccion: `Hay ${criticos} SKUs en estado Crítico/Agotado; al consumo promedio actual los filtros y refacciones críticas se agotan en ~12-18 días, deteniendo mantenimiento programado.`, accion: 'Generar requisición urgente de reorden para los SKUs Crítico/Agotado con proveedor de menor ETA.', confianza: 84 },
              { tag: 'Proyección', tone: 'warn', titulo: 'Punto de reorden mal calibrado', prediccion: 'Cerca del 20% de los SKUs cruzará su mínimo el próximo mes porque su punto de reorden no contempla el lead time real del proveedor, generando compras de emergencia más caras.', accion: 'Recalcular mínimos con AG de reorden predictivo usando lead time + consumo de los últimos 90 días.', confianza: 77 },
            ]}/></div>
          </TabPanel>

          {/* INVENTARIO MUERTO */}
          <TabPanel value="muerto" className="p-5">
            <div className="surface-2 overflow-hidden">
              <table className="w-full">
                <thead><tr>
                  <th className="table-th">SKU</th>
                  <th className="table-th">Producto</th>
                  <th className="table-th">Stock</th>
                  <th className="table-th text-right">Valor</th>
                  <th className="table-th">Último movimiento</th>
                  <th className="table-th">Meses parado</th>
                  <th className="table-th">Recomendación</th>
                </tr></thead>
                <tbody>
                  {inventarioMuerto.map((i, idx) => (
                    <tr key={idx} className="table-row">
                      <td className="table-td font-mono text-xs">{i.sku}</td>
                      <td className="table-td">{i.producto}</td>
                      <td className="table-td font-mono">{i.stock}</td>
                      <td className="table-td text-right font-mono text-kratos-warn">{fmtMXN(i.valor)}</td>
                      <td className="table-td font-mono text-xs">{i.ultMov}</td>
                      <td className="table-td"><span className={i.mesesParado >= 12 ? 'chip-danger' : i.mesesParado >= 6 ? 'chip-warn' : 'chip-muted'}>{i.mesesParado}m</span></td>
                      <td className="table-td text-sm font-medium">{i.recomienda}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 text-[11px] text-kratos-subtle px-2">Capital congelado total: {fmtMXN(inventarioMuerto.reduce((s, i) => s + i.valor, 0))}</div>
            <div className="mt-5"><BrainPanel tema="inventario-muerto" insights={[
              { tag: 'Proyección', tone: 'danger', titulo: 'Capital congelado en aumento', prediccion: `El inventario muerto actual de ${fmtMXN(inventarioMuerto.reduce((s, i) => s + i.valor, 0))} crecerá ~12-15% para Q3 si los SKUs con +6 meses parados no se liquidan, sumando más capital ocioso.`, accion: 'Lanzar campaña de remate/devolución a proveedor para los SKUs con >12 meses sin movimiento este mes.', confianza: 82 },
              { tag: 'Oportunidad', tone: 'info', titulo: 'Recuperación parcial vía devolución', prediccion: 'Una fracción de los SKUs obsoletos aún califica para devolución a proveedor o traspaso entre plantas, recuperando ~30-40% del valor antes de que pierdan garantía/vigencia.', accion: 'Priorizar gestión de devolución de los SKUs marcados "Devolver/Traspasar" antes de su fecha límite.', confianza: 70 },
            ]}/></div>
          </TabPanel>

          {/* FORMATOS DE COMPRAS */}
          <TabPanel value="formatos" className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {formatosCompras.map(f => (
                <div key={f.id} className="panel p-4">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="label-mono">{f.id}</span>
                    <span className="chip-info">{f.usadoMes}/mes</span>
                  </div>
                  <div className="text-sm text-kratos-ink font-semibold">{f.nombre}</div>
                  <p className="text-[12px] text-kratos-subtle mt-2">{f.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-5"><BrainPanel tema="formatos-compras" insights={[
              { tag: 'Tendencia', tone: 'info', titulo: 'Demanda creciente de formatos clave', prediccion: 'El uso mensual de los formatos de requisición y OC mantiene tendencia al alza; de seguir así superarán su volumen de captura manual sostenible el próximo trimestre.', accion: 'Digitalizar y autollenar los 2 formatos de mayor uso/mes desde los datos de requisiciones para reducir captura manual.', confianza: 74 },
              { tag: 'Oportunidad', tone: 'ok', titulo: 'Formatos subutilizados a depurar', prediccion: 'Varios formatos con bajo uso/mes anticipan obsolescencia documental; consolidarlos evitará versiones duplicadas y reprocesos en auditoría de compras.', accion: 'Revisar y unificar los formatos con menor uso mensual en la próxima actualización del catálogo documental.', confianza: 69 },
            ]}/></div>
          </TabPanel>

        </Tabs>
      </div>

      <Drawer
        open={!!proveedorSel}
        onClose={() => setProveedorSel(null)}
        title="Expediente de proveedor"
        subtitle="Calificación · Documentos · OCs · Cotizaciones · NCs"
        actions={<button className="btn-ghost text-xs"><FileCheck size={12}/> Exportar PDF</button>}
      >
        {proveedorSel && expedientesProveedores[proveedorSel] && (
          <ExpedienteProveedor proveedor={expedientesProveedores[proveedorSel]}/>
        )}
      </Drawer>
    </div>
  )
}
