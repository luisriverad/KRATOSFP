import { User, FileCheck, GraduationCap, CalendarX, Truck, Shield, ClipboardCheck, Banknote, Phone, MapPin, Heart, Cake, Briefcase, AlertTriangle } from 'lucide-react'
import { Tabs, TabsList, Tab, TabPanel } from '../Tabs'
import DocCard from '../DocCard'
import Avatar from '../Avatar'
import { StatGrid, Stat } from '../StatGrid'
import Timeline from '../Timeline'
import { fmtMXN } from '../../data/mockData'

export default function ExpedientePersonal({ persona }) {
  if (!persona) return null
  const docsProximos = persona.documentos.filter(d => d.estado === 'proximo').length
  const docsVencidos = persona.documentos.filter(d => d.estado === 'vencido').length

  return (
    <div>
      <section className="px-5 py-5 border-b border-kratos-border bg-gradient-to-br from-kratos-info/10 via-transparent to-transparent">
        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4">
          <div className="flex items-start gap-4">
            <Avatar name={persona.nombre} color={persona.color} size="xl" />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-display text-2xl font-semibold text-kratos-ink tracking-tight leading-none">{persona.nombre}</h2>
                <span className="chip-muted font-mono">{persona.id}</span>
                {docsVencidos > 0 && <span className="chip-danger">{docsVencidos} docs vencidos</span>}
                {docsProximos > 0 && <span className="chip-warn">{docsProximos} por vencer</span>}
              </div>
              <div className="text-sm text-kratos-ink mt-1">{persona.puesto} · <span className="text-kratos-subtle">{persona.area}</span></div>
              <div className="text-[11px] text-kratos-subtle mt-2 flex flex-wrap gap-3">
                <span><Phone size={11} className="inline -mt-0.5"/> {persona.telefono}</span>
                <span><MapPin size={11} className="inline -mt-0.5"/> {persona.domicilio}</span>
                <span><Cake size={11} className="inline -mt-0.5"/> {persona.edad} años</span>
                <span><Heart size={11} className="inline -mt-0.5"/> {persona.estadoCivil}</span>
                {persona.tipoSangre && <span><Shield size={11} className="inline -mt-0.5"/> Sangre {persona.tipoSangre}</span>}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 min-w-[280px]">
            <div className="surface-2 p-3">
              <div className="label-mono">Ingreso</div>
              <div className="text-sm text-kratos-ink font-medium mt-0.5">{persona.ingreso}</div>
              <div className="text-[10px] text-kratos-subtle">{persona.anios} años en Kratos</div>
            </div>
            <div className="surface-2 p-3">
              <div className="label-mono">Sueldo</div>
              <div className="text-sm text-kratos-ink font-medium mt-0.5">{fmtMXN(persona.sueldo)}</div>
              <div className="text-[10px] text-kratos-subtle truncate">{persona.esquema}</div>
            </div>
            <div className="surface-2 p-3 col-span-2">
              <div className="label-mono">Contacto emergencia</div>
              <div className="text-sm text-kratos-ink font-medium mt-0.5">{persona.emergencia}</div>
            </div>
          </div>
        </div>
      </section>

      <Tabs defaultValue="datos">
        <TabsList>
          <Tab value="datos"     icon={User}>Datos</Tab>
          <Tab value="docs"      icon={FileCheck}        badge={`${docsProximos + docsVencidos > 0 ? `${docsProximos + docsVencidos}!` : persona.documentos.length}`}>Documentos</Tab>
          <Tab value="cap"       icon={GraduationCap}    badge={persona.capacitaciones.length}>Capacitaciones</Tab>
          <Tab value="ausencias" icon={CalendarX}        badge={persona.ausencias.length || null}>Ausencias</Tab>
          <Tab value="asig"      icon={Truck}            badge={persona.asignaciones.length || null}>Asignaciones</Tab>
          <Tab value="epp"       icon={Shield}>EPP</Tab>
          <Tab value="evals"     icon={ClipboardCheck}>Evaluaciones</Tab>
        </TabsList>

        <TabPanel value="datos" className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="surface-2 p-4">
              <h4 className="section-title text-sm mb-2">Datos fiscales</h4>
              <dl className="space-y-1.5 text-sm">
                <Row label="RFC"  value={persona.rfc} mono/>
                <Row label="CURP" value={persona.curp} mono/>
                <Row label="NSS"  value={persona.nss} mono/>
              </dl>
            </div>
            <div className="surface-2 p-4">
              <h4 className="section-title text-sm mb-2">Operación</h4>
              <dl className="space-y-1.5 text-sm">
                <Row label="Puesto"   value={persona.puesto}/>
                <Row label="Área"     value={persona.area}/>
                {persona.cliente && <Row label="Cliente"  value={persona.cliente}/>}
                {persona.talla   && <Row label="Talla"    value={persona.talla}/>}
                {persona.botas   && <Row label="Botas"    value={persona.botas}/>}
              </dl>
            </div>
            <div className="surface-2 p-4">
              <h4 className="section-title text-sm mb-2">Estado documental</h4>
              <StatGrid cols={2}>
                <Stat label="Total docs"   value={persona.documentos.length}/>
                <Stat label="Vigentes"      value={persona.documentos.filter(d=>d.estado==='vigente').length} accent="ok"/>
                <Stat label="Por vencer"    value={docsProximos} accent={docsProximos>0?'warn':'default'}/>
                <Stat label="Vencidos"      value={docsVencidos} accent={docsVencidos>0?'danger':'default'}/>
              </StatGrid>
            </div>
          </div>
        </TabPanel>

        <TabPanel value="docs" className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {persona.documentos.map((d, i) => <DocCard key={i} {...d} nombre={d.tipo} />)}
          </div>
        </TabPanel>

        <TabPanel value="cap" className="p-5">
          <div className="surface-2 overflow-hidden">
            <table className="w-full">
              <thead><tr>
                <th className="table-th">Fecha</th>
                <th className="table-th">Curso</th>
                <th className="table-th">Horas</th>
                <th className="table-th">Instructor</th>
                <th className="table-th">Resultado</th>
              </tr></thead>
              <tbody>
                {persona.capacitaciones.map((c, i) => (
                  <tr key={i} className="table-row">
                    <td className="table-td text-xs">{c.fecha}</td>
                    <td className="table-td">{c.curso}</td>
                    <td className="table-td font-mono text-xs">{c.horas} h</td>
                    <td className="table-td text-xs text-kratos-subtle">{c.instructor}</td>
                    <td className="table-td"><span className="chip-ok">{c.resultado}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabPanel>

        <TabPanel value="ausencias" className="p-5">
          {persona.ausencias.length === 0 ? (
            <div className="surface-2 p-6 text-center text-sm text-kratos-subtle">Sin ausencias registradas en 2026</div>
          ) : (
            <div className="surface-2 overflow-hidden">
              <table className="w-full">
                <thead><tr>
                  <th className="table-th">Fecha</th>
                  <th className="table-th">Motivo</th>
                  <th className="table-th">Días</th>
                  <th className="table-th">Autorizó</th>
                  <th className="table-th">Comprobante</th>
                </tr></thead>
                <tbody>
                  {persona.ausencias.map((a, i) => (
                    <tr key={i} className="table-row">
                      <td className="table-td text-xs">{a.fecha}</td>
                      <td className="table-td">{a.motivo}</td>
                      <td className="table-td font-mono text-xs">{a.dias}</td>
                      <td className="table-td text-xs text-kratos-subtle">{a.autorizado}</td>
                      <td className="table-td"><span className={a.con === 'Sí' || a.con?.startsWith('IT') ? 'chip-ok' : 'chip-warn'}>{a.con}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabPanel>

        <TabPanel value="asig" className="p-5">
          {persona.asignaciones.length === 0 ? (
            <div className="surface-2 p-6 text-center text-sm text-kratos-subtle">Sin asignaciones de obra (personal administrativo)</div>
          ) : (
            <Timeline items={persona.asignaciones.map(a => ({
              fecha: a.semana, severity: 'info',
              titulo: a.obra, detalle: `${a.sitio} · Grúa ${a.grua}`,
              tag: a.grua, tagClass: 'chip-info'
            }))} />
          )}
        </TabPanel>

        <TabPanel value="epp" className="p-5">
          {persona.epp.length === 0 ? (
            <div className="surface-2 p-6 text-center text-sm text-kratos-subtle">Sin EPP asignado</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {persona.epp.map((e, i) => (
                <div key={i} className="surface-2 p-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-kratos-ink font-medium">{e.item}</div>
                    <div className="text-[11px] text-kratos-subtle font-mono">{e.folio} · {e.fecha}</div>
                  </div>
                  <span className={e.estado === 'Asignado' ? 'chip-ok' : 'chip-warn'}>{e.estado}</span>
                </div>
              ))}
            </div>
          )}
        </TabPanel>

        <TabPanel value="evals" className="p-5 space-y-3">
          {persona.evaluaciones.map((e, i) => (
            <div key={i} className="surface-2 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-mono text-xs uppercase tracking-wider text-kratos-subtle">{e.periodo}</div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-kratos-subtle">Score</span>
                  <span className={`font-display text-xl font-semibold ${e.score >= 90 ? 'text-kratos-ok' : e.score >= 75 ? 'text-kratos-info' : 'text-kratos-warn'}`}>{e.score}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="label-mono mb-0.5">Fortalezas</div>
                  <div className="text-kratos-ink">{e.fortalezas}</div>
                </div>
                <div>
                  <div className="label-mono mb-0.5">Áreas de mejora</div>
                  <div className="text-kratos-ink">{e.mejoras}</div>
                </div>
              </div>
            </div>
          ))}
        </TabPanel>
      </Tabs>
    </div>
  )
}

function Row({ label, value, mono = false }) {
  return (
    <div className="flex items-center justify-between gap-3 py-0.5">
      <dt className="text-[11px] text-kratos-subtle uppercase tracking-wider">{label}</dt>
      <dd className={`text-kratos-ink truncate ${mono ? 'font-mono text-xs' : 'text-sm'}`}>{value}</dd>
    </div>
  )
}
