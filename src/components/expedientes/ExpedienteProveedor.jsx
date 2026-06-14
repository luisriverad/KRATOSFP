import { Star, FileCheck, Package, ClipboardList, AlertTriangle, TrendingUp, Mail, Phone, MapPin, Hash, Banknote, Building2, User, CreditCard, ClipboardCheck } from 'lucide-react'
import { Tabs, TabsList, Tab, TabPanel } from '../Tabs'
import DocCard from '../DocCard'
import { fmtMXN } from '../../data/mockData'

function Fila({ k, v, fuerte }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-2 border-b border-kratos-border/40 last:border-0">
      <span className="text-[12px] text-kratos-muted shrink-0">{k}</span>
      <span className={`text-[13px] text-right ${fuerte ? 'font-semibold text-kratos-ink' : 'text-kratos-subtle'}`}>{v}</span>
    </div>
  )
}

export default function ExpedienteProveedor({ proveedor }) {
  if (!proveedor) return null

  return (
    <div>
      <section className="px-5 py-5 border-b border-kratos-border bg-gradient-to-br from-purple-500/10 via-transparent to-transparent">
        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shrink-0">
              <Package size={28} className="text-kratos-ink"/>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-display text-2xl font-semibold text-kratos-ink tracking-tight leading-none">{proveedor.nombre}</h2>
                <span className="chip-muted font-mono">{proveedor.id}</span>
                <span className={proveedor.estado === 'Aprobado' ? 'chip-ok' : 'chip-warn'}>{proveedor.estado}</span>
              </div>
              <div className="text-sm text-kratos-ink mt-1">{proveedor.categoria}</div>
              <div className="text-[11px] text-kratos-subtle mt-2 flex flex-wrap gap-3">
                <span><Hash size={11} className="inline -mt-0.5"/> RFC {proveedor.rfc}</span>
                <span><Mail size={11} className="inline -mt-0.5"/> {proveedor.email}</span>
                <span><Phone size={11} className="inline -mt-0.5"/> {proveedor.telefono}</span>
                <span><MapPin size={11} className="inline -mt-0.5"/> {proveedor.direccion}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 min-w-[320px]">
            <div className="surface-2 p-3 text-center">
              <div className="label-mono">Calificación</div>
              <div className="font-display text-2xl font-semibold text-kratos-ink mt-0.5 flex items-center justify-center gap-1">
                <Star size={16} className="text-kratos-warn fill-kratos-warn"/>
                {proveedor.calificacion}
              </div>
            </div>
            <div className="surface-2 p-3">
              <div className="label-mono">Spend YTD</div>
              <div className="text-sm font-display font-semibold text-kratos-ink mt-0.5">{fmtMXN(proveedor.spendYTD)}</div>
              <div className="text-[10px] text-kratos-subtle">mes {fmtMXN(proveedor.spendMes)}</div>
            </div>
            <div className="surface-2 p-3">
              <div className="label-mono">Tiempo entrega</div>
              <div className="text-sm font-display font-semibold text-kratos-ink mt-0.5">{proveedor.tiempoEntrega}</div>
              <div className="text-[10px] text-kratos-subtle">Crédito {proveedor.credito}</div>
            </div>
          </div>
        </div>
      </section>

      <Tabs defaultValue="resumen">
        <TabsList>
          <Tab value="resumen" icon={TrendingUp}>Resumen</Tab>
          <Tab value="docs"    icon={FileCheck}     badge={proveedor.docs.length}>Documentos</Tab>
          <Tab value="ocs"     icon={ClipboardList} badge={proveedor.ordenesCompra.length}>Órdenes de compra</Tab>
          <Tab value="cot"     icon={Package}       badge={proveedor.cotizaciones.length}>Cotizaciones</Tab>
          <Tab value="nc"      icon={AlertTriangle} badge={proveedor.noConformidades.length || null}>No conformidades</Tab>
        </TabsList>

        <TabPanel value="resumen" className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="surface-2 p-5">
              <h4 className="section-title text-sm mb-2 flex items-center gap-2"><Building2 size={14} className="text-kratos-muted"/> Datos generales</h4>
              <Fila k="Razón social" v={proveedor.nombre} fuerte/>
              <Fila k="ID proveedor" v={proveedor.id}/>
              <Fila k="RFC" v={proveedor.rfc}/>
              <Fila k="Categoría" v={proveedor.categoria}/>
              <Fila k="Estado" v={proveedor.estado} fuerte/>
            </div>

            <div className="surface-2 p-5">
              <h4 className="section-title text-sm mb-2 flex items-center gap-2"><User size={14} className="text-kratos-muted"/> Contacto</h4>
              <Fila k="Persona de contacto" v={proveedor.contacto || '—'} fuerte/>
              <Fila k="Teléfono" v={proveedor.telefono}/>
              <Fila k="Email" v={proveedor.email}/>
              <Fila k="Dirección" v={proveedor.direccion}/>
            </div>

            <div className="surface-2 p-5">
              <h4 className="section-title text-sm mb-2 flex items-center gap-2"><CreditCard size={14} className="text-kratos-muted"/> Condiciones comerciales</h4>
              <Fila k="Calificación" v={`★ ${proveedor.calificacion}`} fuerte/>
              <Fila k="Tiempo de entrega" v={proveedor.tiempoEntrega}/>
              <Fila k="Crédito" v={proveedor.credito}/>
              <Fila k="Cuenta bancaria" v={proveedor.cuenta}/>
            </div>

            <div className="surface-2 p-5">
              <h4 className="section-title text-sm mb-2 flex items-center gap-2"><ClipboardCheck size={14} className="text-kratos-muted"/> Resumen económico</h4>
              <Fila k="Spend YTD" v={fmtMXN(proveedor.spendYTD)} fuerte/>
              <Fila k="Spend del mes" v={fmtMXN(proveedor.spendMes)}/>
              <Fila k="Órdenes de compra" v={proveedor.ordenesCompra.length}/>
              <Fila k="Cotizaciones" v={`${proveedor.cotizaciones.length} (${proveedor.cotizaciones.filter(c => c.ganadora).length} ganadas)`}/>
              <Fila k="No conformidades abiertas" v={proveedor.noConformidades.filter(n => n.estado === 'Abierta').length}/>
            </div>
          </div>
        </TabPanel>

        <TabPanel value="docs" className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {proveedor.docs.map((d, i) => <DocCard key={i} {...d} nombre={d.tipo} />)}
          </div>
        </TabPanel>

        <TabPanel value="ocs" className="p-5">
          <div className="surface-2 overflow-hidden">
            <table className="w-full">
              <thead><tr>
                <th className="table-th">OC</th>
                <th className="table-th">Fecha</th>
                <th className="table-th">Req.</th>
                <th className="table-th text-right">Monto</th>
                <th className="table-th">Estado</th>
              </tr></thead>
              <tbody>
                {proveedor.ordenesCompra.map((o, i) => (
                  <tr key={i} className="table-row">
                    <td className="table-td font-mono text-xs">{o.oc}</td>
                    <td className="table-td text-xs">{o.fecha}</td>
                    <td className="table-td font-mono text-xs text-kratos-subtle">{o.req}</td>
                    <td className="table-td text-right font-mono">{fmtMXN(o.monto)}</td>
                    <td className="table-td"><span className={o.estado.includes('Recibido') ? 'chip-ok' : o.estado === 'En tránsito' ? 'chip-info' : 'chip-warn'}>{o.estado}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabPanel>

        <TabPanel value="cot" className="p-5">
          {proveedor.cotizaciones.length === 0 ? (
            <div className="surface-2 p-6 text-center text-sm text-kratos-subtle">Sin cotizaciones en este periodo</div>
          ) : (
            <div className="surface-2 overflow-hidden">
              <table className="w-full">
                <thead><tr>
                  <th className="table-th">Folio</th>
                  <th className="table-th">Fecha</th>
                  <th className="table-th">Concepto</th>
                  <th className="table-th text-right">Monto</th>
                  <th className="table-th">Entrega</th>
                  <th className="table-th">Resultado</th>
                </tr></thead>
                <tbody>
                  {proveedor.cotizaciones.map((c, i) => (
                    <tr key={i} className="table-row">
                      <td className="table-td font-mono text-xs">{c.folio}</td>
                      <td className="table-td text-xs">{c.fecha}</td>
                      <td className="table-td">{c.concepto}</td>
                      <td className="table-td text-right font-mono">{fmtMXN(c.monto)}</td>
                      <td className="table-td text-xs">{c.tiempoEntrega}</td>
                      <td className="table-td"><span className={c.ganadora ? 'chip-ok' : 'chip-muted'}>{c.ganadora ? 'Ganadora' : 'No seleccionada'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabPanel>

        <TabPanel value="nc" className="p-5">
          {proveedor.noConformidades.length === 0 ? (
            <div className="surface-2 p-6 text-center text-sm text-kratos-subtle">Sin no conformidades · proveedor sin observaciones</div>
          ) : (
            <div className="space-y-2">
              {proveedor.noConformidades.map((n, i) => (
                <div key={i} className="surface-2 p-3 flex items-start gap-3">
                  <AlertTriangle size={16} className={n.estado === 'Abierta' ? 'text-kratos-danger' : 'text-kratos-muted'}/>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs">{n.id}</span>
                      <span className="text-sm text-kratos-ink">{n.hallazgo}</span>
                    </div>
                    <div className="text-[11px] text-kratos-subtle mt-1">{n.fecha} · {n.responsable} · {n.dias}d</div>
                  </div>
                  <span className={n.estado === 'Abierta' ? 'chip-danger' : 'chip-muted'}>{n.estado}</span>
                </div>
              ))}
            </div>
          )}
        </TabPanel>
      </Tabs>
    </div>
  )
}
