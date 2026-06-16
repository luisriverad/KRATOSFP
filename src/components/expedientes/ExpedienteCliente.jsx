import { Building2, FileText, TrendingUp, Activity, FileCheck, Banknote, Mail, Phone, MapPin, Hash, User, CreditCard } from 'lucide-react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { Tabs, TabsList, Tab, TabPanel } from '../Tabs'
import DocCard from '../DocCard'
import Timeline from '../Timeline'
import { StatGrid, Stat } from '../StatGrid'
import ProgressBar from '../ProgressBar'
import { fmtMXN } from '../../data/mockData'
import { creditoClientes } from '../../data/creditoData'

const tooltip = { contentStyle: { background:'#FFFFFF', border:'1px solid #E5E3DC', borderRadius:0, fontSize:12 }, labelStyle:{ color:'#4A453F' } }

export default function ExpedienteCliente({ cliente, clienteKey }) {
  if (!cliente) return null
  const facturadoVigente = cliente.factura.filter(f => f.estado === 'Vigente').reduce((s, f) => s + f.monto, 0)
  const facturadoVencido = cliente.factura.filter(f => f.estado.startsWith('Vencida')).reduce((s, f) => s + f.monto, 0)
  const contratoActivo = cliente.contratos.find(c => c.estado.startsWith('Vigente'))
  const credito = clienteKey ? creditoClientes[clienteKey] : null

  return (
    <div>
      <section className="px-7 py-6 border-b border-kratos-border bg-kratos-panel">
        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-none bg-kratos-info-soft border border-kratos-info/20 flex items-center justify-center shrink-0">
              <Building2 size={28} className="text-kratos-info"/>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-display text-3xl font-semibold text-kratos-ink tracking-tight leading-none">{cliente.nombre}</h2>
                <span className="chip-muted font-mono">{cliente.id}</span>
                <span className={cliente.estado === 'Activo' ? 'chip-ok' : cliente.estado === 'En riesgo' ? 'chip-danger' : 'chip-muted'}>{cliente.estado}</span>
              </div>
              <div className="text-sm text-kratos-subtle mt-1.5">{cliente.industria}</div>
              <div className="text-[11px] text-kratos-muted mt-3 flex flex-wrap gap-x-4 gap-y-1">
                <span><Hash size={11} className="inline -mt-0.5"/> RFC {cliente.rfc}</span>
                <span><User size={11} className="inline -mt-0.5"/> {cliente.contacto} · {cliente.cargo}</span>
                <span><Mail size={11} className="inline -mt-0.5"/> {cliente.email}</span>
                <span><Phone size={11} className="inline -mt-0.5"/> {cliente.telefono}</span>
                <span><MapPin size={11} className="inline -mt-0.5"/> {cliente.direccion}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 min-w-[300px]">
            <div className="surface-2 p-3">
              <div className="label-mono">LTV</div>
              <div className="font-display text-lg font-semibold text-kratos-ink mt-1">{fmtMXN(cliente.ltv)}</div>
              <div className="text-[10px] text-kratos-muted">Cliente desde {cliente.desde}</div>
            </div>
            <div className="surface-2 p-3">
              <div className="label-mono">Facturado YTD</div>
              <div className="font-display text-lg font-semibold text-kratos-ink mt-1">{fmtMXN(cliente.facturadoYTD)}</div>
              <div className="text-[10px] text-kratos-muted">{cliente.diasCredito}d crédito</div>
            </div>
            <div className="surface-2 p-3 col-span-2">
              <div className="label-mono">CXC</div>
              <div className="flex items-center justify-between mt-1">
                <div className="font-display text-lg font-semibold text-kratos-ink">{fmtMXN(cliente.cxc)}</div>
                {cliente.cxcVencida > 0 && <span className="chip-danger">Vencida {fmtMXN(cliente.cxcVencida)}</span>}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Tabs defaultValue="resumen">
        <TabsList style="underline" className="px-5">
          <Tab style="underline" value="resumen"  icon={Activity}>Resumen</Tab>
          <Tab style="underline" value="credito"  icon={CreditCard}                badge={credito ? '$' : null}>Línea de crédito</Tab>
          <Tab style="underline" value="opos"     icon={TrendingUp}                badge={cliente.oportunidades.length || null}>Oportunidades</Tab>
          <Tab style="underline" value="contratos"icon={FileText}                  badge={cliente.contratos.length || null}>Contratos</Tab>
          <Tab style="underline" value="factura"  icon={Banknote}                  badge={cliente.factura.length || null}>Facturación</Tab>
          <Tab style="underline" value="acts"     icon={Activity}                  badge={cliente.actividades.length}>Actividades</Tab>
          <Tab style="underline" value="docs"     icon={FileCheck}                 badge={cliente.docs.length}>Documentos</Tab>
        </TabsList>

        <TabPanel value="resumen" className="p-7 space-y-5">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="surface-2 p-5 xl:col-span-2">
              <h4 className="section-title text-sm mb-4">Estado de cuenta</h4>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div className="label-mono">Total facturado YTD</div>
                  <div className="font-display text-2xl font-semibold text-kratos-ink mt-1">{fmtMXN(cliente.facturadoYTD)}</div>
                  <ProgressBar value={Math.min(100, (cliente.facturadoYTD / cliente.ltv) * 100)} accent="info" showValue={false} className="mt-2"/>
                </div>
                <div>
                  <div className="label-mono">Por cobrar vigente</div>
                  <div className={`font-display text-2xl font-semibold mt-1 ${facturadoVigente > 0 ? 'text-kratos-ink' : 'text-kratos-muted'}`}>{fmtMXN(facturadoVigente)}</div>
                </div>
                <div>
                  <div className="label-mono">Vencido</div>
                  <div className={`font-display text-2xl font-semibold mt-1 ${facturadoVencido > 0 ? 'text-kratos-danger' : 'text-kratos-muted'}`}>{fmtMXN(facturadoVencido)}</div>
                </div>
              </div>
            </div>
            <div className="surface-2 p-5">
              <h4 className="section-title text-sm mb-3">Contrato activo</h4>
              {contratoActivo ? (
                <>
                  <div className="text-sm text-kratos-ink font-medium">{contratoActivo.concepto}</div>
                  <div className="text-[11px] text-kratos-muted mt-1">{contratoActivo.inicio} → {contratoActivo.fin}</div>
                  <div className="font-display text-xl text-kratos-ink mt-2">{fmtMXN(contratoActivo.monto)}</div>
                  <span className="chip-ok mt-2 inline-flex">{contratoActivo.estado}</span>
                </>
              ) : <div className="text-sm text-kratos-muted">Sin contrato activo</div>}
            </div>
          </div>

          <div className="surface-2 p-5">
            <h4 className="section-title text-sm mb-3">Últimas actividades</h4>
            <Timeline items={cliente.actividades.slice(0, 5).map(a => ({
              fecha: a.fecha,
              severity: a.tipo === 'Llamada' ? 'info' : a.tipo === 'Visita' ? 'ok' : 'red',
              titulo: a.detalle,
              detalle: `${a.tipo} · ${a.owner}`,
              tag: a.tipo,
              tagClass: 'chip-muted'
            }))} compact/>
          </div>
        </TabPanel>

        {/* CRÉDITO */}
        <TabPanel value="credito" className="p-7 space-y-5">
          {credito ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="surface-2 p-4">
                  <div className="label-mono">Límite autorizado</div>
                  <div className="font-display text-xl font-semibold text-kratos-ink mt-1">{fmtMXN(credito.limite)}</div>
                </div>
                <div className="surface-2 p-4">
                  <div className="label-mono">Utilizado</div>
                  <div className="font-display text-xl font-semibold text-kratos-warn mt-1">{fmtMXN(credito.utilizado)}</div>
                </div>
                <div className="surface-2 p-4">
                  <div className="label-mono">Disponible</div>
                  <div className="font-display text-xl font-semibold text-kratos-ok mt-1">{fmtMXN(credito.disponible)}</div>
                </div>
                <div className="surface-2 p-4">
                  <div className="label-mono">Score crediticio</div>
                  <div className={`font-display text-xl font-semibold mt-1 ${credito.score >= 80 ? 'text-kratos-ok' : credito.score >= 60 ? 'text-kratos-warn' : 'text-kratos-danger'}`}>{credito.score}<span className="text-sm text-kratos-muted"> /100</span></div>
                  <div className="text-[11px] text-kratos-muted mt-1">{credito.rating}</div>
                </div>
              </div>
              <div className="surface-2 p-5">
                <div className="flex justify-between mb-2">
                  <h4 className="section-title text-sm">Utilización de la línea</h4>
                  <span className="font-mono text-sm text-kratos-ink">{Math.round((credito.utilizado / credito.limite) * 100)}%</span>
                </div>
                <ProgressBar value={Math.round((credito.utilizado / credito.limite) * 100)} accent="auto" showValue={false}/>
                <div className="grid grid-cols-3 gap-3 mt-4 text-[11px] text-kratos-muted">
                  <div>Días crédito otorgados: <span className="font-mono text-kratos-ink">{credito.diasCredito}d</span></div>
                  <div>Facturado YTD: <span className="font-mono text-kratos-ink">{fmtMXN(cliente.facturadoYTD)}</span></div>
                  <div>Política Kratos: <span className="font-mono text-kratos-ink">3 cot. mínimo</span></div>
                </div>
              </div>
              <div className="surface-2 p-5">
                <h4 className="section-title text-sm mb-3">Historial de retraso de pago (DPD)</h4>
                <div style={{ width: '100%', height: 220 }}>
                  <ResponsiveContainer>
                    <LineChart data={credito.historial} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                      <XAxis dataKey="mes" fontSize={11} tickLine={false} axisLine={false}/>
                      <YAxis fontSize={11} tickLine={false} axisLine={false} label={{ value: 'DPD', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#6E685F' }}/>
                      <Tooltip {...tooltip} formatter={(v)=>`${v} días`}/>
                      <Line type="monotone" dataKey="dpd" stroke="#B91C1C" strokeWidth={2.5} dot={{ r: 4 }}/>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-[11px] text-kratos-muted mt-2">DPD = Days Past Due. Promedio últimos 5 meses: {Math.round(credito.historial.reduce((s,h)=>s+h.dpd,0)/credito.historial.length)} días</div>
              </div>
            </>
          ) : (
            <div className="surface-2 p-8 text-center text-sm text-kratos-muted">
              Sin línea de crédito configurada para este cliente.
            </div>
          )}
        </TabPanel>

        <TabPanel value="opos" className="p-7">
          {cliente.oportunidades.length === 0 ? (
            <div className="surface-2 p-8 text-center text-sm text-kratos-muted">Sin oportunidades activas</div>
          ) : (
            <div className="space-y-2">
              {cliente.oportunidades.map((o, i) => (
                <div key={i} className="panel p-4">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs">{o.id}</span>
                        <span className={o.etapa === 'Cierre' ? 'chip-ok' : o.etapa === 'Negociación' ? 'chip-warn' : 'chip-info'}>{o.etapa}</span>
                      </div>
                      <div className="text-sm text-kratos-ink mt-1">{o.equipo}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-xl font-semibold text-kratos-ink">{fmtMXN(o.monto)}</div>
                      <div className="text-[11px] text-kratos-muted">Prob. {(o.prob*100).toFixed(0)}%</div>
                    </div>
                  </div>
                  <ProgressBar value={o.prob * 100} accent={o.prob >= 0.7 ? 'ok' : o.prob >= 0.4 ? 'info' : 'warn'} showValue={false} className="mt-3"/>
                </div>
              ))}
            </div>
          )}
        </TabPanel>

        <TabPanel value="contratos" className="p-7">
          {cliente.contratos.length === 0 ? (
            <div className="surface-2 p-8 text-center text-sm text-kratos-muted">Sin contratos registrados</div>
          ) : (
            <div className="surface-2 overflow-hidden">
              <table className="w-full">
                <thead><tr>
                  <th className="table-th">ID</th>
                  <th className="table-th">Concepto</th>
                  <th className="table-th">Inicio</th>
                  <th className="table-th">Fin</th>
                  <th className="table-th text-right">Monto</th>
                  <th className="table-th">Estado</th>
                </tr></thead>
                <tbody>
                  {cliente.contratos.map((c, i) => (
                    <tr key={i} className="table-row">
                      <td className="table-td font-mono text-xs">{c.id}</td>
                      <td className="table-td">{c.concepto}</td>
                      <td className="table-td font-mono text-sm">{c.inicio}</td>
                      <td className="table-td font-mono text-sm">{c.fin}</td>
                      <td className="table-td text-right font-mono">{fmtMXN(c.monto)}</td>
                      <td className="table-td"><span className={c.estado.startsWith('Vigente') ? 'chip-ok' : 'chip-muted'}>{c.estado}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabPanel>

        <TabPanel value="factura" className="p-7">
          {cliente.factura.length === 0 ? (
            <div className="surface-2 p-8 text-center text-sm text-kratos-muted">Sin facturas en este periodo</div>
          ) : (
            <div className="surface-2 overflow-hidden">
              <table className="w-full">
                <thead><tr>
                  <th className="table-th">Folio</th>
                  <th className="table-th">Fecha</th>
                  <th className="table-th">OC</th>
                  <th className="table-th text-right">Monto</th>
                  <th className="table-th">Días</th>
                  <th className="table-th">Estado</th>
                </tr></thead>
                <tbody>
                  {cliente.factura.map((f, i) => (
                    <tr key={i} className="table-row">
                      <td className="table-td font-mono text-sm">{f.folio}</td>
                      <td className="table-td font-mono text-sm">{f.fecha}</td>
                      <td className="table-td font-mono text-xs text-kratos-muted">{f.oc}</td>
                      <td className="table-td text-right font-mono">{fmtMXN(f.monto)}</td>
                      <td className="table-td font-mono text-sm">{f.diasVenc > 0 ? `${f.diasVenc}d` : `pagada ${-f.diasVenc}d`}</td>
                      <td className="table-td"><span className={f.estado === 'Pagado' ? 'chip-ok' : f.estado === 'Vigente' ? 'chip-info' : 'chip-danger'}>{f.estado}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabPanel>

        <TabPanel value="acts" className="p-7">
          <Timeline items={cliente.actividades.map(a => ({
            fecha: a.fecha, severity: a.tipo === 'Llamada' ? 'info' : a.tipo === 'Visita' ? 'ok' : 'red',
            titulo: a.detalle, detalle: `${a.tipo} · ${a.owner}`,
            tag: a.tipo
          }))} />
        </TabPanel>

        <TabPanel value="docs" className="p-7">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {cliente.docs.map((d, i) => <DocCard key={i} {...d} nombre={d.tipo}/>)}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  )
}
