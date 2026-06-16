import { useState, useMemo } from 'react'
import { Bot, MessageSquare, Mail, Smartphone, Clock, Save, Play, Pause, Plus, Sparkles, Users, User, Check, Building2, ChevronLeft, MoreVertical, Phone, Video } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { finanzas, fmtMXN } from '../data/mockData'

const CANALES = [
  { id: 'wa',    label: 'WhatsApp', icon: Smartphone,    desc: 'Mensaje al móvil del contacto' },
  { id: 'email', label: 'Email',    icon: Mail,           desc: 'Correo formal al contacto AP' },
  { id: 'sms',   label: 'SMS',      icon: MessageSquare,  desc: 'Mensaje de texto al móvil' }
]

const PLANTILLAS = {
  cordial: `Hola {{cliente}}, te recordamos amablemente que la factura {{folio}} por {{monto}} vence el {{vencimiento}}. Si requieres apoyo o programar el pago, estoy disponible. Saludos · Equipo Kratos.`,
  formal:  `Estimado(a) {{contacto}}: Le notificamos que la factura {{folio}} por {{monto}} se encuentra próxima a su fecha de vencimiento ({{vencimiento}}). Le agradecemos confirmar la fecha de pago. Atentamente, Jaqueline Santos · Finanzas Kratos.`,
  firme:   `{{cliente}}, la factura {{folio}} por {{monto}} venció el {{vencimiento}}. Te pedimos regularizar el pago en las próximas 48h o agendar llamada con Finanzas. Kratos FP.`
}

const HORAS = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','14:00','15:00','16:00','17:00','18:00']

export default function Agentes() {
  const [activo, setActivo] = useState(true)
  const [modo, setModo] = useState('todos') // 'todos' | 'seleccion'
  const [seleccion, setSeleccion] = useState([finanzas.cxc[0].cliente, finanzas.cxc[1].cliente]) // pre-seleccionados
  const [canal, setCanal] = useState('wa')
  const [diasAntes, setDiasAntes] = useState(3)
  const [diasDespues, setDiasDespues] = useState(5)
  const [hora, setHora] = useState('09:30')
  const [plantilla, setPlantilla] = useState('cordial')
  const [montoMin, setMontoMin] = useState(50000)
  const [guardado, setGuardado] = useState(false)

  // Aplicación a CXC
  const cxcAfectada = useMemo(() => {
    if (modo === 'todos') return finanzas.cxc.filter(c => c.monto >= montoMin)
    return finanzas.cxc.filter(c => seleccion.includes(c.cliente))
  }, [modo, seleccion, montoMin])
  const totalAfectado = cxcAfectada.reduce((s, c) => s + c.monto, 0)

  const toggleCliente = (nombre) => {
    setSeleccion(prev => prev.includes(nombre) ? prev.filter(n => n !== nombre) : [...prev, nombre])
  }

  const guardar = () => {
    setGuardado(true)
    setTimeout(() => setGuardado(false), 2200)
  }

  const previewCliente = cxcAfectada[0] || finanzas.cxc[0]
  const clienteCorto = previewCliente.cliente.split(' ').slice(0, 2).join(' ')
  const mensaje = PLANTILLAS[plantilla]
    .replace('{{cliente}}', clienteCorto)
    .replace('{{contacto}}', 'Arq. Daniel Ramírez')
    .replace('{{folio}}', previewCliente.oc)
    .replace('{{monto}}', fmtMXN(previewCliente.monto))
    .replace('{{vencimiento}}', '12 marzo 2026')
  const clienteEmail = `pagos@${clienteCorto.toLowerCase().normalize('NFD').replace(/[^a-z]/g, '')}.mx`

  return (
    <div className="space-y-7">
      <PageHeader
        title="Automatizaciones e inteligencia"
        badges={[{ label: activo ? 'Activo' : 'Pausado', className: activo ? 'chip-ok' : 'chip-muted' }]}
      />

      <section className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-6">
        {/* Configuración */}
        <div className="panel">
          <header className="px-6 py-5 border-b border-kratos-border flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-none bg-kratos-red-soft border border-kratos-red/20 flex items-center justify-center text-kratos-red shrink-0">
                <Bot size={20}/>
              </div>
              <div>
                <div className="label-mono">Agente AG-01</div>
                <h3 className="font-display text-xl font-semibold text-kratos-ink leading-tight">Cobranza inteligente</h3>
                <p className="text-[13px] text-kratos-subtle mt-1">Detecta facturas próximas a vencer o vencidas y envía recordatorios automáticos al cliente.</p>
              </div>
            </div>
            <button onClick={() => setActivo(a => !a)} className={`btn ${activo ? 'btn-ghost' : 'btn-primary'} shrink-0`}>
              {activo ? <><Pause size={13}/> Pausar</> : <><Play size={13}/> Activar</>}
            </button>
          </header>

          <div className="p-6 space-y-8">

            {/* 1. ¿A quién? */}
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <h4 className="section-title text-sm">1. ¿A qué cliente aplicar?</h4>
                <span className="label-mono">Alcance</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <button onClick={() => setModo('todos')}
                  className={`text-left rounded-none border p-4 transition-all ${modo === 'todos' ? 'border-kratos-ink bg-kratos-bg2' : 'border-kratos-border bg-white hover:border-kratos-border-2'}`}>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className={`w-9 h-9 rounded-none flex items-center justify-center ${modo === 'todos' ? 'bg-kratos-ink text-white' : 'bg-kratos-bg2 text-kratos-subtle'}`}>
                      <Users size={16}/>
                    </div>
                    <div className="font-medium text-sm text-kratos-ink">Todos los clientes con CXC</div>
                  </div>
                  <p className="text-[12px] text-kratos-muted leading-snug">Aplica a cualquier cliente con factura pendiente que cumpla el filtro de monto.</p>
                </button>
                <button onClick={() => setModo('seleccion')}
                  className={`text-left rounded-none border p-4 transition-all ${modo === 'seleccion' ? 'border-kratos-ink bg-kratos-bg2' : 'border-kratos-border bg-white hover:border-kratos-border-2'}`}>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className={`w-9 h-9 rounded-none flex items-center justify-center ${modo === 'seleccion' ? 'bg-kratos-ink text-white' : 'bg-kratos-bg2 text-kratos-subtle'}`}>
                      <User size={16}/>
                    </div>
                    <div className="font-medium text-sm text-kratos-ink">Selección específica</div>
                  </div>
                  <p className="text-[12px] text-kratos-muted leading-snug">Elige uno o varios clientes para enviarles únicamente a ellos.</p>
                </button>
              </div>

              {modo === 'seleccion' && (
                <div className="rounded-none border border-kratos-border bg-white overflow-hidden">
                  <div className="px-4 py-2.5 bg-kratos-panel-2 border-b border-kratos-border flex items-center justify-between">
                    <span className="text-[12px] text-kratos-subtle">Clientes con CXC</span>
                    <span className="font-mono text-[11px] text-kratos-muted">{seleccion.length} seleccionado(s)</span>
                  </div>
                  <ul className="divide-y divide-kratos-border">
                    {finanzas.cxc.map(c => {
                      const sel = seleccion.includes(c.cliente)
                      return (
                        <li key={c.cliente}>
                          <button onClick={() => toggleCliente(c.cliente)}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-kratos-bg2/60 transition-colors text-left">
                            <span className={`w-5 h-5 rounded-none border flex items-center justify-center shrink-0 ${sel ? 'bg-kratos-ink border-kratos-ink' : 'border-kratos-border-2 bg-white'}`}>
                              {sel && <Check size={12} className="text-white"/>}
                            </span>
                            <Building2 size={14} className="text-kratos-muted shrink-0"/>
                            <span className="text-sm text-kratos-ink font-medium flex-1">{c.cliente}</span>
                            <span className="text-[11px] text-kratos-muted font-mono">{c.oc}</span>
                            <span className={`text-sm font-mono ml-3 ${c.estado.startsWith('Vencida') ? 'text-kratos-danger' : 'text-kratos-ink'}`}>{fmtMXN(c.monto)}</span>
                            <span className={c.estado.startsWith('Vencida') ? 'chip-danger ml-2' : 'chip-ok ml-2'}>{c.estado.startsWith('Vencida') ? 'Vencida' : 'Vigente'}</span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>

            {/* 2. Canal */}
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <h4 className="section-title text-sm">2. ¿Por qué medio enviarlo?</h4>
                <span className="label-mono">Canal de salida</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {CANALES.map(c => {
                  const Icon = c.icon
                  const sel = canal === c.id
                  return (
                    <button key={c.id} onClick={() => setCanal(c.id)}
                      className={`text-left rounded-none border p-4 transition-all ${sel ? 'border-kratos-ink bg-kratos-bg2' : 'border-kratos-border bg-white hover:border-kratos-border-2'}`}>
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className={`w-9 h-9 rounded-none flex items-center justify-center shrink-0 ${sel ? 'bg-kratos-ink text-white' : 'bg-kratos-bg2 text-kratos-subtle'}`}>
                          <Icon size={16}/>
                        </div>
                        <div className="font-medium text-sm text-kratos-ink truncate">{c.label}</div>
                      </div>
                      <p className="text-[12px] text-kratos-muted leading-snug">{c.desc}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 3. Mensaje */}
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <h4 className="section-title text-sm">3. ¿Qué mensaje enviar?</h4>
                <span className="label-mono">Plantilla</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {Object.keys(PLANTILLAS).map(t => (
                  <button key={t} onClick={() => setPlantilla(t)}
                    className={`px-3 py-2 rounded-none text-sm font-medium capitalize transition-all border
                      ${plantilla === t ? 'bg-kratos-ink text-white border-kratos-ink' : 'bg-white text-kratos-subtle border-kratos-border hover:border-kratos-border-2'}`}>
                    Tono {t}
                  </button>
                ))}
              </div>
              <textarea
                rows={5}
                value={PLANTILLAS[plantilla]}
                onChange={() => {}}
                className="w-full font-mono text-[13px] leading-relaxed"
              />
              <div className="text-[11px] text-kratos-muted mt-2">
                Variables: <span className="font-mono">{`{{cliente}}`}</span> · <span className="font-mono">{`{{contacto}}`}</span> · <span className="font-mono">{`{{folio}}`}</span> · <span className="font-mono">{`{{monto}}`}</span> · <span className="font-mono">{`{{vencimiento}}`}</span>
              </div>
            </div>

            {/* 4. Cuándo */}
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <h4 className="section-title text-sm">4. ¿Cuándo enviarlo?</h4>
                <span className="label-mono">Disparadores</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Stepper label="Días antes del vencimiento" hint="Aviso preventivo" value={diasAntes} setValue={setDiasAntes}/>
                <Stepper label="Días después si no paga"     hint="Recordatorio de morosidad" value={diasDespues} setValue={setDiasDespues}/>
                <div className="rounded-none border border-kratos-border p-4 bg-white">
                  <label className="label-mono">Hora del envío</label>
                  <div className="flex items-center gap-2 mt-3">
                    <Clock size={16} className="text-kratos-muted shrink-0"/>
                    <select value={hora} onChange={e => setHora(e.target.value)}
                      className="flex-1 font-mono text-lg font-semibold !py-2 !px-3 cursor-pointer">
                      {HORAS.map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                  </div>
                  <p className="text-[11px] text-kratos-muted mt-2">Lunes a viernes</p>
                </div>
              </div>
            </div>

            {/* 5. Filtros (solo si modo === 'todos') */}
            {modo === 'todos' && (
              <div>
                <div className="flex items-baseline justify-between mb-3">
                  <h4 className="section-title text-sm">5. ¿Filtrar por monto?</h4>
                  <span className="label-mono">Umbral</span>
                </div>
                <div className="rounded-none border border-kratos-border p-4 bg-white">
                  <label className="label-mono">Monto mínimo de factura</label>
                  <input type="range" min="0" max="500000" step="10000" value={montoMin}
                    onChange={e => setMontoMin(Number(e.target.value))} className="w-full mt-3"/>
                  <div className="flex justify-between text-[12px] mt-2">
                    <span className="text-kratos-muted">$0</span>
                    <span className="font-mono font-semibold text-kratos-ink">{fmtMXN(montoMin)}</span>
                    <span className="text-kratos-muted">$500K</span>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-5 border-t border-kratos-border flex items-center justify-between gap-3">
              <div className="text-[12px] text-kratos-muted">
                {guardado ? <span className="text-kratos-ok">✓ Configuración guardada</span> : 'Cambios sin guardar'}
              </div>
              <button onClick={guardar} className="btn-primary">
                <Save size={14}/> Guardar configuración
              </button>
            </div>
          </div>
        </div>

        {/* Vista previa + impacto */}
        <div className="space-y-4">
          <div className="panel">
            <header className="px-5 py-4 border-b border-kratos-border">
              <h3 className="section-title text-base">Vista previa</h3>
              <p className="text-[12px] text-kratos-muted mt-0.5">Cómo lo verá el cliente</p>
            </header>
            <div className="p-5 bg-kratos-bg2/40">
              <div className="mx-auto" style={{ maxWidth: 300 }}>
                {/* Carcasa del teléfono */}
                <div className="rounded-none bg-gray-900 p-2.5 shadow-2xl">
                  <div className="rounded-none overflow-hidden bg-white">
                    {/* Barra de estado */}
                    <div className={`flex items-center justify-between px-4 pt-2 pb-1 text-[10px] font-semibold ${canal === 'wa' ? 'bg-[#075E54] text-white' : 'bg-white text-gray-700'}`}>
                      <span>{hora}</span>
                      <span className="flex items-center gap-1 tracking-tight"><span>5G</span><span>▰▰▰</span><span>100%</span></span>
                    </div>

                    {/* WHATSAPP */}
                    {canal === 'wa' && (
                      <>
                        <div className="bg-[#075E54] text-white px-3 py-2.5 flex items-center gap-2.5">
                          <ChevronLeft size={18} className="shrink-0"/>
                          <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-sm font-bold shrink-0">K</div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold leading-tight">Kratos FP</div>
                            <div className="text-[10px] text-white/70">en línea</div>
                          </div>
                          <Video size={16}/><Phone size={15}/><MoreVertical size={16}/>
                        </div>
                        <div className="px-3 py-4 min-h-[280px]" style={{ background: '#ECE5DD' }}>
                          <div className="flex justify-center mb-3">
                            <span className="bg-[#FCF5DB] text-[10px] text-gray-600 px-2.5 py-1 rounded-none shadow-sm">HOY</span>
                          </div>
                          <div className="bg-white rounded-none rounded-tl-none px-3 py-2 max-w-[88%] shadow-sm">
                            <p className="text-[13px] text-gray-800 leading-snug">{mensaje}</p>
                            <div className="text-[10px] text-gray-400 text-right mt-1">{hora}</div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* SMS */}
                    {canal === 'sms' && (
                      <>
                        <div className="bg-gray-50 px-3 py-2.5 flex flex-col items-center border-b border-gray-100">
                          <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-gray-700">K</div>
                          <div className="text-[11px] font-medium text-gray-700 mt-1">Kratos FP</div>
                        </div>
                        <div className="px-3 py-4 min-h-[280px] bg-white">
                          <div className="text-center text-[10px] text-gray-400 mb-3">Mensaje de texto · {hora}</div>
                          <div className="bg-gray-200 text-gray-800 rounded-none rounded-none px-3.5 py-2 max-w-[85%]">
                            <p className="text-[13px] leading-snug">{mensaje}</p>
                          </div>
                        </div>
                      </>
                    )}

                    {/* EMAIL */}
                    {canal === 'email' && (
                      <>
                        <div className="bg-white border-b border-gray-100 px-4 py-2.5 flex items-center gap-1.5">
                          <ChevronLeft size={18} className="text-kratos-info"/>
                          <span className="text-[12px] text-kratos-info font-medium">Recibidos</span>
                        </div>
                        <div className="px-4 py-3 min-h-[280px] bg-white">
                          <div className="text-[15px] font-semibold text-gray-800 leading-snug">Recordatorio de pago · {previewCliente.oc}</div>
                          <div className="flex items-center gap-2 mt-3 pb-3 border-b border-gray-100">
                            <div className="w-9 h-9 rounded-full bg-kratos-info text-white flex items-center justify-center text-xs font-bold shrink-0">K</div>
                            <div className="min-w-0 flex-1">
                              <div className="text-[12px] font-medium text-gray-800">Kratos FP · Cobranza</div>
                              <div className="text-[10px] text-gray-400 truncate">cobranza@kratosfp.com → {clienteEmail}</div>
                            </div>
                            <span className="text-[10px] text-gray-400 shrink-0">{hora}</span>
                          </div>
                          <p className="text-[13px] text-gray-700 leading-relaxed mt-3">{mensaje}</p>
                          <div className="flex gap-2 mt-4">
                            <span className="px-3 py-1.5 rounded-full border border-kratos-info/30 text-kratos-info text-[11px]">Responder</span>
                            <span className="px-3 py-1.5 rounded-full border border-gray-200 text-gray-500 text-[11px]">Reenviar</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-[10px] text-kratos-muted mt-3 text-center">Vista simulada · agente Kratos · {new Date().toLocaleDateString('es-MX')}</div>
              </div>
            </div>
          </div>

          <div className="panel">
            <header className="px-5 py-4 border-b border-kratos-border">
              <h3 className="section-title text-base">Impacto estimado</h3>
              <p className="text-[12px] text-kratos-muted mt-0.5">Con la configuración actual</p>
            </header>
            <div className="divide-y divide-kratos-border">
              <div className="px-5 py-3.5 flex items-center justify-between">
                <span className="text-sm text-kratos-subtle">Facturas alcanzadas</span>
                <span className="font-display font-semibold text-kratos-ink">{cxcAfectada.length}</span>
              </div>
              <div className="px-5 py-3.5 flex items-center justify-between">
                <span className="text-sm text-kratos-subtle">Monto bajo seguimiento</span>
                <span className="font-display font-semibold text-kratos-ink">{fmtMXN(totalAfectado)}</span>
              </div>
              <div className="px-5 py-3.5 flex items-center justify-between">
                <span className="text-sm text-kratos-subtle">Mensajes / semana</span>
                <span className="font-display font-semibold text-kratos-ink">~{Math.ceil(cxcAfectada.length * 1.4)}</span>
              </div>
              <div className="px-5 py-3.5 flex items-center justify-between">
                <span className="text-sm text-kratos-subtle">Tiempo ahorrado / mes</span>
                <span className="font-display font-semibold text-kratos-ok">14 h</span>
              </div>
            </div>
          </div>

          <div className="rounded-none border border-kratos-info/25 bg-kratos-info-soft p-4 flex items-start gap-3">
            <Sparkles size={16} className="text-kratos-info shrink-0 mt-0.5"/>
            <p className="text-[12px] text-kratos-info leading-relaxed">
              <strong>Próximamente:</strong> agentes de conciliación bancaria, semáforo fiscal y monitoreo GPS.
            </p>
          </div>
        </div>
      </section>

      {/* Historial */}
      <section className="panel">
        <header className="px-5 py-4 border-b border-kratos-border flex items-center justify-between">
          <div>
            <h3 className="section-title">Últimos envíos del agente</h3>
            <p className="text-[12px] text-kratos-muted mt-0.5">Histórico reciente · click para ver detalle</p>
          </div>
          <span className="chip-muted">Simulación</span>
        </header>
        <div className="overflow-hidden">
          <table className="w-full">
            <thead><tr>
              <th className="table-th">Fecha</th>
              <th className="table-th">Cliente</th>
              <th className="table-th">Factura</th>
              <th className="table-th text-right">Monto</th>
              <th className="table-th">Canal</th>
              <th className="table-th">Resultado</th>
            </tr></thead>
            <tbody>
              {[
                { fecha: '2026-05-13 09:30', cliente: 'OHL México',  factura: 'F-2026-0067', monto: 340000, canal: 'WhatsApp', resultado: 'Entregado · sin respuesta' },
                { fecha: '2026-05-13 09:30', cliente: 'Grupo Carso', factura: 'F-2026-0089', monto: 1240000, canal: 'Email',    resultado: 'Visto · agendó pago' },
                { fecha: '2026-05-10 09:30', cliente: 'OHL México',  factura: 'F-2026-0067', monto: 340000, canal: 'WhatsApp', resultado: 'No respondió' },
                { fecha: '2026-05-08 09:30', cliente: 'ICA Fluor',    factura: 'F-2026-1102', monto: 920000, canal: 'Email',   resultado: 'Pagado' }
              ].map((r, i) => (
                <tr key={i} className="table-row">
                  <td className="table-td font-mono text-xs">{r.fecha}</td>
                  <td className="table-td font-medium">{r.cliente}</td>
                  <td className="table-td font-mono text-sm text-kratos-muted">{r.factura}</td>
                  <td className="table-td text-right font-mono">{fmtMXN(r.monto)}</td>
                  <td className="table-td"><span className="chip-info">{r.canal}</span></td>
                  <td className="table-td text-sm">
                    <span className={r.resultado.includes('Pagado') ? 'chip-ok' : r.resultado.includes('agendó') ? 'chip-info' : r.resultado.includes('Entregado') ? 'chip-warn' : 'chip-muted'}>
                      {r.resultado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function Stepper({ label, hint, value, setValue, min = 0, max = 60 }) {
  return (
    <div className="rounded-none border border-kratos-border p-4 bg-white">
      <label className="label-mono">{label}</label>
      <div className="flex items-center gap-2 mt-3">
        <button onClick={() => setValue(v => Math.max(min, v-1))}
          className="w-9 h-9 rounded-none border border-kratos-border bg-white hover:bg-kratos-bg2 text-kratos-ink text-lg leading-none flex items-center justify-center transition-colors">−</button>
        <div className="flex-1 text-center font-mono text-lg font-semibold text-kratos-ink py-1.5">
          {value}<span className="text-[11px] text-kratos-muted font-sans font-normal ml-1">días</span>
        </div>
        <button onClick={() => setValue(v => Math.min(max, v+1))}
          className="w-9 h-9 rounded-none border border-kratos-border bg-white hover:bg-kratos-bg2 text-kratos-ink text-lg leading-none flex items-center justify-center transition-colors">+</button>
      </div>
      <p className="text-[11px] text-kratos-muted mt-2">{hint}</p>
    </div>
  )
}
