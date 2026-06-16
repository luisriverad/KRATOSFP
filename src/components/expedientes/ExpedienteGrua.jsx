import { useState } from 'react'
import { Truck, FileCheck, Wrench, ClipboardList, Map, Banknote, Activity, ChevronDown, Calendar, MapPin, Fuel, User, Box, Hash, Building2, Plus, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Tabs, TabsList, Tab, TabPanel } from '../Tabs'
import DocCard from '../DocCard'
import Timeline from '../Timeline'
import MiniMap from '../MiniMap'
import { StatGrid, Stat } from '../StatGrid'
import GaugeRing from '../GaugeRing'
import ProgressBar from '../ProgressBar'
import { fmtMXN } from '../../data/mockData'

const estadoChip = (e) => {
  if (e === 'En obra') return 'chip-ok'
  if (e === 'En patio') return 'chip-info'
  if (e === 'Mantenimiento') return 'chip-warn'
  return 'chip-muted'
}

export default function ExpedienteGrua({ grua, expediente }) {
  if (!grua || !expediente) return null
  const exp = expediente

  const docsVigentes = exp.documentos.filter(d => d.estado === 'vigente').length
  const docsProximos = exp.documentos.filter(d => d.estado === 'proximo').length
  const docsVencidos = exp.documentos.filter(d => d.estado === 'vencido').length
  const cargasFacturadas = exp.cargas.filter(c => c.estado === 'Facturado').length
  const cargasPendientes = exp.cargas.filter(c => c.estado !== 'Facturado').length
  const totalMonto = exp.cargas.reduce((s, c) => s + c.monto, 0)

  return (
    <div className="bg-grid-faint bg-noise">
      {/* HEADER tarjeta del expediente */}
      <section className="relative px-5 py-5 border-b border-kratos-border bg-gradient-to-br from-kratos-red/10 via-transparent to-transparent">
        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-none bg-gradient-to-br from-kratos-red to-kratos-red-dark flex items-center justify-center shrink-0 shadow-glow-red">
              <Truck size={36} className="text-kratos-ink" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-display text-3xl font-semibold text-kratos-ink tracking-tight leading-none">{grua.eco}</span>
                <span className={estadoChip(grua.estado)}>{grua.estado}</span>
                <span className="chip-muted font-mono">SALUD {grua.salud}/100</span>
              </div>
              <div className="text-sm text-kratos-ink mt-1">{grua.marca} {grua.modelo} · {grua.capacidad} · {grua.anio}</div>
              <div className="text-[11px] text-kratos-subtle font-mono mt-2 flex flex-wrap gap-3">
                <span><Hash size={10} className="inline -mt-0.5"/> SN {exp.serie}</span>
                <span>Placas {exp.placas}</span>
                <span>VIN {exp.vin}</span>
              </div>
              <div className="text-[11px] text-kratos-subtle mt-1 flex flex-wrap gap-3">
                <span><MapPin size={11} className="inline -mt-0.5"/> {grua.ubicacion}</span>
                <span><User size={11} className="inline -mt-0.5"/> {grua.operador}</span>
                <span><Building2 size={11} className="inline -mt-0.5"/> {exp.cliente}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <GaugeRing value={grua.salud} label="Salud" subLabel="técnica"/>
            <GaugeRing value={exp.costos.utilizacion} label="Utilización" subLabel="mensual"/>
            <div className="surface-2 p-3 min-w-[140px]">
              <div className="label-mono">Utilidad mes</div>
              <div className={`text-base font-display font-semibold mt-0.5 ${exp.costos.utilidadMes >= 0 ? 'text-kratos-ok' : 'text-kratos-danger'}`}>
                {fmtMXN(exp.costos.utilidadMes)}
              </div>
              <div className="text-[10px] text-kratos-subtle mt-0.5 flex items-center gap-1">
                {exp.costos.utilidadMes >= 0 ? <ArrowUpRight size={10}/> : <ArrowDownRight size={10}/>}
                YTD {fmtMXN(exp.costos.utilidadYTD)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TABS */}
      <Tabs defaultValue="resumen">
        <TabsList>
          <Tab value="resumen"  icon={Activity}>Resumen</Tab>
          <Tab value="docs"     icon={FileCheck}     badge={`${docsProximos + docsVencidos > 0 ? `${docsProximos + docsVencidos}!` : exp.documentos.length}`}>Documentos</Tab>
          <Tab value="mantto"   icon={Wrench}        badge={exp.mantenimiento.filter(m => m.estado !== 'Cerrado').length || null}>Mantenimiento</Tab>
          <Tab value="bitacora" icon={ClipboardList} badge={exp.bitacora.length}>Bitácora</Tab>
          <Tab value="gps"      icon={Map}>GPS · Telemetría</Tab>
          <Tab value="cargas"   icon={Box}           badge={cargasPendientes || null}>Cargas</Tab>
          <Tab value="costos"   icon={Banknote}>Costos</Tab>
        </TabsList>

        {/* RESUMEN */}
        <TabPanel value="resumen" className="p-5 space-y-5">
          <StatGrid cols={4}>
            <Stat label="Horómetro"        value={`${grua.horometro.toLocaleString()} h`}     accent="info"/>
            <Stat label="Km acumulados"     value={grua.kmAcum.toLocaleString()}              accent="info"/>
            <Stat label="Horas contrato"    value={exp.horasContrato.toLocaleString()}        accent="ok"/>
            <Stat label="Combustible"       value={exp.combustible}                           accent="default"/>
            <Stat label="Docs vigentes"     value={`${docsVigentes}/${exp.documentos.length}`}accent={docsProximos+docsVencidos > 0 ? 'warn':'ok'}/>
            <Stat label="Horas fact. mes"   value={exp.costos.horasFacturablesMes}            accent="ok"/>
            <Stat label="Horas muertas"     value={exp.costos.horasMuertaMes}                 accent={exp.costos.horasMuertaMes > 16 ? 'danger':'warn'}/>
            <Stat label="Última señal GPS"  value={exp.telemetria.at(-1)?.hace || '—'}        accent="info"/>
          </StatGrid>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2 surface-2 p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="section-title text-sm">Telemetría</h4>
                <span className="chip-info">GPS · {grua.ubicacion}</span>
              </div>
              <RegistroTelcelBtn unidad={grua.eco} />
            </div>
            <div className="surface-2 p-4">
              <h4 className="section-title text-sm mb-3">Actividad reciente</h4>
              <Timeline items={exp.bitacora.slice(-4).reverse().map(b => ({
                fecha: b.fecha, hora: b.hora, severity: b.severity,
                titulo: b.evento, detalle: `${b.turno} · ${b.operador}`
              }))} compact />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="surface-2 p-3">
              <div className="label-mono">Obra activa</div>
              <div className="text-sm text-kratos-ink font-medium mt-1">{exp.obra}</div>
              <div className="text-[11px] text-kratos-subtle mt-1">Desde {exp.desdeContrato}</div>
            </div>
            <div className="surface-2 p-3">
              <div className="label-mono">Operador asignado</div>
              <div className="text-sm text-kratos-ink font-medium mt-1">{grua.operador}</div>
              <div className="text-[11px] text-kratos-subtle mt-1">Rol semana en curso</div>
            </div>
            <div className="surface-2 p-3">
              <div className="label-mono">Próximo mantenimiento</div>
              {(() => {
                const next = exp.mantenimiento.find(m => m.estado !== 'Cerrado')
                return next
                  ? <><div className="text-sm text-kratos-ink font-medium mt-1">{next.tipo}</div><div className="text-[11px] text-kratos-subtle mt-1">{next.fecha} · {next.proveedor}</div></>
                  : <div className="text-sm text-kratos-subtle mt-1">Sin programación</div>
              })()}
            </div>
          </div>
        </TabPanel>

        {/* DOCUMENTOS */}
        <TabPanel value="docs" className="p-5 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="chip-ok">Vigentes · {docsVigentes}</span>
              <span className="chip-warn">Por vencer · {docsProximos}</span>
              <span className="chip-danger">Vencidos · {docsVencidos}</span>
            </div>
            <button className="btn-ghost text-xs"><Plus size={12}/> Subir documento</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {exp.documentos.map((d, i) => (
              <DocCard key={i} {...d} nombre={d.tipo} />
            ))}
          </div>
        </TabPanel>

        {/* MANTENIMIENTO */}
        <TabPanel value="mantto" className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <Stat label="Servicios YTD"   value={exp.mantenimiento.filter(m => m.estado === 'Cerrado').length}/>
            <Stat label="Costo mantto YTD" value={fmtMXN(exp.mantenimiento.reduce((s,m)=>s+m.costo,0))} accent="warn"/>
            <Stat label="Próximo programado" value={exp.mantenimiento.find(m=>m.estado!=='Cerrado')?.fecha || 'Ninguno'} accent="info"/>
            <Stat label="Estatus actual" value={grua.estado} accent={grua.estado==='Mantenimiento'?'warn':'ok'}/>
          </div>
          <div className="surface-2 overflow-hidden">
            <table className="w-full">
              <thead><tr>
                <th className="table-th">Folio</th>
                <th className="table-th">Fecha</th>
                <th className="table-th">Tipo</th>
                <th className="table-th">Horómetro</th>
                <th className="table-th">Proveedor</th>
                <th className="table-th text-right">Costo</th>
                <th className="table-th">Estado</th>
              </tr></thead>
              <tbody>
                {exp.mantenimiento.map((m, i) => (
                  <tr key={i} className="table-row">
                    <td className="table-td font-mono text-[11px]">{m.folio}</td>
                    <td className="table-td text-xs">{m.fecha}</td>
                    <td className="table-td">{m.tipo}</td>
                    <td className="table-td font-mono text-xs">{m.horometro.toLocaleString()} h</td>
                    <td className="table-td text-xs text-kratos-subtle">{m.proveedor}</td>
                    <td className="table-td text-right font-mono text-xs">{fmtMXN(m.costo)}</td>
                    <td className="table-td">
                      <span className={m.estado === 'Cerrado' ? 'chip-ok' : m.estado === 'En proceso' ? 'chip-warn' : 'chip-info'}>{m.estado}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-3 py-2 border-t border-kratos-border bg-black/10 text-[10px] text-kratos-subtle">
              Observaciones: {exp.mantenimiento.filter(m => m.observa).map(m => `${m.folio}: ${m.observa}`).join(' · ') || '—'}
            </div>
          </div>
        </TabPanel>

        {/* BITÁCORA */}
        <TabPanel value="bitacora" className="p-5 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="section-title text-sm">Bitácora de hechos diarios · {grua.eco}</h4>
            <div className="flex items-center gap-2">
              <button className="btn-ghost text-xs"><Calendar size={12}/> Filtrar</button>
              <button className="btn-ghost text-xs"><Plus size={12}/> Nueva entrada</button>
            </div>
          </div>
          <div className="surface-2 p-4">
            <Timeline items={exp.bitacora.slice().reverse().map(b => ({
              fecha: b.fecha, hora: b.hora, severity: b.severity,
              titulo: b.evento, detalle: `Turno ${b.turno} · ${b.operador}`,
              tag: b.turno === 'Noc' ? 'Nocturno' : 'Matutino',
              tagClass: b.turno === 'Noc' ? 'chip-purple' : 'chip-info'
            }))} />
          </div>
        </TabPanel>

        {/* GPS */}
        <TabPanel value="gps" className="p-5 space-y-4">
          <MiniMap puntos={exp.telemetria} unidad={grua.eco} ruta={`${exp.telemetria[0]?.lugar || '—'} → ${exp.telemetria.at(-1)?.lugar || '—'}`} height={360} />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <Stat label="Puntos hoy"        value={exp.telemetria.length} accent="info"/>
            <Stat label="Última señal"      value={exp.telemetria.at(-1)?.hace || '—'} accent="ok"/>
            <Stat label="Velocidad actual"  value={`${exp.telemetria.at(-1)?.kmh || 0} km/h`}/>
            <Stat label="Ubicación"         value={exp.telemetria.at(-1)?.lugar || '—'} mono={false}/>
          </div>
          <div className="surface-2 overflow-hidden">
            <table className="w-full">
              <thead><tr>
                <th className="table-th">Hora</th>
                <th className="table-th">Lugar</th>
                <th className="table-th">Vel.</th>
                <th className="table-th">Evento</th>
              </tr></thead>
              <tbody>
                {exp.telemetria.slice().reverse().map((p, i) => (
                  <tr key={i} className="table-row">
                    <td className="table-td font-mono text-xs">{p.hace}</td>
                    <td className="table-td">{p.lugar}</td>
                    <td className="table-td font-mono text-xs">{p.kmh} km/h</td>
                    <td className="table-td text-xs text-kratos-subtle">{p.label || (p.kmh > 0 ? 'En movimiento' : 'Detenido')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabPanel>

        {/* CARGAS */}
        <TabPanel value="cargas" className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <Stat label="Total cargas YTD" value={exp.cargas.length} accent="info"/>
            <Stat label="Facturadas" value={cargasFacturadas} accent="ok"/>
            <Stat label="Pendientes OC" value={cargasPendientes} accent="warn"/>
            <Stat label="Monto total" value={fmtMXN(totalMonto)} accent="ok"/>
          </div>
          <div className="surface-2 overflow-hidden">
            <table className="w-full">
              <thead><tr>
                <th className="table-th">Folio</th>
                <th className="table-th">Fecha</th>
                <th className="table-th">Tipo</th>
                <th className="table-th">Cliente</th>
                <th className="table-th">Horas</th>
                <th className="table-th text-right">Monto</th>
                <th className="table-th">Estado</th>
              </tr></thead>
              <tbody>
                {exp.cargas.slice().reverse().map((c, i) => (
                  <tr key={i} className="table-row">
                    <td className="table-td font-mono text-[11px]">{c.folio}</td>
                    <td className="table-td text-xs">{c.fecha}</td>
                    <td className="table-td">{c.tipo}</td>
                    <td className="table-td text-xs text-kratos-subtle">{c.cliente}</td>
                    <td className="table-td font-mono text-xs">{c.horas} h</td>
                    <td className="table-td text-right font-mono text-xs">{fmtMXN(c.monto)}</td>
                    <td className="table-td">
                      <span className={c.estado === 'Facturado' ? 'chip-ok' : 'chip-warn'}>{c.estado}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabPanel>

        {/* COSTOS */}
        <TabPanel value="costos" className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="surface-2 p-4">
              <div className="label-mono">Ingreso mes</div>
              <div className="text-xl font-display font-semibold text-kratos-ink mt-1">{fmtMXN(exp.costos.ingresoMes)}</div>
              <ProgressBar value={Math.min(100, (exp.costos.ingresoMes / 900000) * 100)} accent="ok" showValue={false} className="mt-2"/>
            </div>
            <div className="surface-2 p-4">
              <div className="label-mono">Costo operativo mes</div>
              <div className="text-xl font-display font-semibold text-kratos-ink mt-1">{fmtMXN(exp.costos.costoOpMes)}</div>
              <ProgressBar value={Math.min(100, (exp.costos.costoOpMes / 300000) * 100)} accent="warn" showValue={false} className="mt-2"/>
            </div>
            <div className="surface-2 p-4">
              <div className="label-mono">Utilidad mes</div>
              <div className={`text-xl font-display font-semibold mt-1 ${exp.costos.utilidadMes >= 0 ? 'text-kratos-ok' : 'text-kratos-danger'}`}>{fmtMXN(exp.costos.utilidadMes)}</div>
              <ProgressBar value={Math.min(100, Math.abs(exp.costos.utilidadMes / 700000) * 100)} accent={exp.costos.utilidadMes >= 0 ? 'ok' : 'red'} showValue={false} className="mt-2"/>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Stat label="Ingreso YTD"  value={fmtMXN(exp.costos.ingresoYTD)} accent="ok"/>
            <Stat label="Costo YTD"     value={fmtMXN(exp.costos.costoOpYTD)} accent="warn"/>
            <Stat label="Utilidad YTD"  value={fmtMXN(exp.costos.utilidadYTD)} accent={exp.costos.utilidadYTD >= 0 ? 'ok' : 'danger'}/>
          </div>
          <div className="surface-2 p-4">
            <h4 className="section-title text-sm mb-2">Indicadores operativos</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <div className="label-mono">Utilización</div>
                <ProgressBar value={exp.costos.utilizacion} accent="auto" className="mt-1.5"/>
              </div>
              <div>
                <div className="label-mono">Margen operativo</div>
                <ProgressBar value={exp.costos.ingresoMes ? Math.round((exp.costos.utilidadMes / exp.costos.ingresoMes) * 100) : 0} accent="auto" className="mt-1.5"/>
              </div>
              <div>
                <div className="label-mono">Horas facturables / totales</div>
                <ProgressBar value={Math.round(exp.costos.horasFacturablesMes / (exp.costos.horasFacturablesMes + exp.costos.horasMuertaMes || 1) * 100)} accent="auto" className="mt-1.5"/>
              </div>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  )
}

function RegistroTelcelBtn({ unidad }) {
  const [registrado, setRegistrado] = useState(false)
  return (
    <div className="flex flex-col items-center justify-center text-center py-8 px-4 rounded-none border border-dashed border-kratos-border bg-kratos-panel">
      <div className="w-12 h-12 rounded-none bg-kratos-info-soft text-kratos-info flex items-center justify-center mb-3">
        <MapPin size={22} />
      </div>
      {registrado ? (
        <>
          <div className="text-sm font-semibold text-kratos-ok">✓ Telemetría registrada en Telcel</div>
          <p className="text-[12px] text-kratos-muted mt-1">Unidad {unidad} sincronizando posición GPS con la plataforma Telcel.</p>
          <button onClick={() => setRegistrado(false)} className="mt-3 text-[12px] text-kratos-muted hover:text-kratos-ink">Deshacer registro</button>
        </>
      ) : (
        <>
          <div className="text-sm font-semibold text-kratos-ink">Telemetría Telcel</div>
          <p className="text-[12px] text-kratos-muted mt-1 mb-4 max-w-xs">Da de alta la unidad {unidad} en la plataforma de telemetría Telcel para rastreo GPS en vivo.</p>
          <button onClick={() => setRegistrado(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-none bg-kratos-ink text-white text-sm font-medium hover:opacity-90 transition">
            <Plus size={15} /> Registro de telemetría Telcel
          </button>
        </>
      )}
    </div>
  )
}
