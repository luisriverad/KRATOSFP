import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, Building2, Contact, GitBranch, Boxes, BrainCircuit, GripVertical, Plus } from 'lucide-react'
import { fmtMXN } from '../data/mockData'

// Columnas del tablero (etapas comerciales)
const ETAPAS = [
  { key: 'prospeccion', label: 'Prospección', color: '#6E685F' },
  { key: 'propuesta',   label: 'Propuesta',   color: '#1E3A8A' },
  { key: 'negociacion', label: 'Negociación', color: '#D97706' },
  { key: 'cierre',      label: 'Cierre',      color: '#EA580C' },
  { key: 'ganada',      label: 'Ganada',      color: '#047857' },
  { key: 'perdida',     label: 'Perdida',     color: '#B91C1C' }
]

// Oportunidades simuladas con su expediente comercial
const SEED = [
  {
    id: 1, etapa: 'prospeccion', empresa: 'Manufactura Textil Querétaro SA de CV', rfc: 'MTQ190501XX2',
    sector: 'Manufactura', ubicacion: 'Querétaro', web: 'mtq.com.mx', tipoPersona: 'Persona Moral',
    contacto: { nombre: 'Carlos Ortega', puesto: 'Director Industrial', tel: '+52 442 290 0011', email: 'cortega@mtq.com.mx' },
    origen: { canal: 'Referido', tipo: 'Recomendación', ejecutivo: 'Ana Ríos', fecha: '2026-04-12', notas: 'Referido por cliente actual del sector textil. Requiere renovar telares; pendiente recibir EEFF para calificar.' },
    activo: { tipo: 'Telar industrial Picanol OmniPlus', categoria: 'Equipo de manufactura', valor: 3800000, financiar: 3040000, plazo: '48 meses · Arrendamiento Puro', enganche: '20%' },
    ia: 'Información financiera incompleta. Solicitar EEFF antes de cotizar. Cliente nuevo sin historial.', docs: '3/26'
  },
  {
    id: 2, etapa: 'propuesta', empresa: 'ICA Fluor', rfc: 'ICF050218AB1',
    sector: 'Construcción / EPC', ubicacion: 'CDMX', web: 'icafluor.com', tipoPersona: 'Persona Moral',
    contacto: { nombre: 'Mariana Solís', puesto: 'Gerente de Equipos', tel: '+52 55 5004 1180', email: 'msolis@icafluor.com' },
    origen: { canal: 'Inbound web', tipo: 'Cotización directa', ejecutivo: 'Ana Ríos', fecha: '2026-04-28', notas: 'Solicita grúa de 100 ton para proyecto en Tapachula. Cliente recurrente, buen historial de pago.' },
    activo: { tipo: 'Grúa SANY STC1000 (100 ton)', categoria: 'Maquinaria pesada', valor: 9200000, financiar: 7360000, plazo: '60 meses · Arrendamiento Puro', enganche: '20%' },
    ia: 'Cliente con historial A. Pre-aprobado por buró. Acelerar propuesta para asegurar el proyecto.', docs: '18/26'
  },
  {
    id: 3, etapa: 'negociacion', empresa: 'Constructora Tapachula SA', rfc: 'CTA160907RT9',
    sector: 'Construcción', ubicacion: 'Tapachula, Chis.', web: 'ctapachula.mx', tipoPersona: 'Persona Moral',
    contacto: { nombre: 'Jorge Méndez', puesto: 'Director de Obra', tel: '+52 962 118 4420', email: 'jmendez@ctapachula.mx' },
    origen: { canal: 'Referido', tipo: 'Renovación', ejecutivo: 'Ana Ríos', fecha: '2026-03-30', notas: 'Negociando tasa y plazo. Pide 54 meses; autorizado hasta 48. Cierre probable esta semana.' },
    activo: { tipo: 'Grúa XCMG XCT25 (25 ton)', categoria: 'Maquinaria pesada', valor: 4600000, financiar: 3680000, plazo: '48 meses · Arrendamiento Puro', enganche: '20%' },
    ia: 'Margen sano. No ceder más de 0.8 pp en tasa. Riesgo: concentración de cartera en este cliente.', docs: '24/26'
  },
  {
    id: 4, etapa: 'cierre', empresa: 'Grupo Carso', rfc: 'GCA8901019P0',
    sector: 'Industrial / Energía', ubicacion: 'CDMX', web: 'carso.com.mx', tipoPersona: 'Persona Moral',
    contacto: { nombre: 'Patricia Lara', puesto: 'Compras Corporativas', tel: '+52 55 1103 7700', email: 'plara@carso.com.mx' },
    origen: { canal: 'Cuenta clave', tipo: 'Ampliación', ejecutivo: 'Ana Ríos', fecha: '2026-04-02', notas: 'Contrato listo para firma. Pendiente sello digital del cliente. Enganche ya depositado.' },
    activo: { tipo: 'Montacargas eléctrico Toyota 8FBE', categoria: 'Equipo de manejo', valor: 1240000, financiar: 992000, plazo: '36 meses · Arrendamiento Financiero', enganche: '20%' },
    ia: 'Listo para cierre. Confirmar recepción de garantías y agendar entrega del activo.', docs: '26/26'
  },
  {
    id: 5, etapa: 'prospeccion', empresa: 'Logística Express de México', rfc: 'LEM170614KL3',
    sector: 'Transporte', ubicacion: 'Guadalajara', web: 'logexmx.com', tipoPersona: 'Persona Moral',
    contacto: { nombre: 'Raúl Beltrán', puesto: 'Gerente de Flota', tel: '+52 33 2240 9015', email: 'rbeltran@logexmx.com' },
    origen: { canal: 'Outbound', tipo: 'Primer contacto', ejecutivo: 'Ana Ríos', fecha: '2026-05-06', notas: 'Interés en arrendar tractocamiones. Sin EEFF aún. Evaluar volumen antes de invertir tiempo.' },
    activo: { tipo: 'Tractocamión Foton Galaxy EVI', categoria: 'Transporte', valor: 2100000, financiar: 1680000, plazo: '48 meses · Arrendamiento Puro', enganche: '20%' },
    ia: 'Lead frío sin información financiera. Calificar capacidad antes de cotizar.', docs: '1/26'
  },
  {
    id: 6, etapa: 'ganada', empresa: 'Cemex Latam Holdings', rfc: 'CLH140311MM5',
    sector: 'Materiales', ubicacion: 'Monterrey', web: 'cemex.com', tipoPersona: 'Persona Moral',
    contacto: { nombre: 'Daniela Cruz', puesto: 'Adquisiciones', tel: '+52 81 8888 4000', email: 'dcruz@cemex.com' },
    origen: { canal: 'Cuenta clave', tipo: 'Renovación', ejecutivo: 'Ana Ríos', fecha: '2026-02-18', notas: 'Operación cerrada y firmada. Activo entregado. En facturación.' },
    activo: { tipo: 'Grúa SANY STC1000 (100 ton)', categoria: 'Maquinaria pesada', valor: 9200000, financiar: 7360000, plazo: '60 meses · Arrendamiento Puro', enganche: '20%' },
    ia: 'Operación exitosa. Activar programa de renovación a 36 meses para recompra.', docs: '26/26'
  },
  {
    id: 7, etapa: 'negociacion', empresa: 'Grupo México Minería', rfc: 'GME890215MN2',
    sector: 'Minería / Cobre', ubicacion: 'Cananea, Son.', web: 'gmexico.com', tipoPersona: 'Persona Moral',
    contacto: { nombre: 'Arturo Beltrán', puesto: 'Superintendente de Equipos', tel: '+52 662 445 5667', email: 'abeltran@gmexico.com' },
    origen: { canal: 'Cuenta clave', tipo: 'Ampliación', ejecutivo: 'Ricardo Nieto', fecha: '2026-05-06', notas: 'Ampliación de mina requiere grúa de 300 ton. Negociando SLA de disponibilidad y tarifa por 12 meses.' },
    activo: { tipo: 'Grúa Liebherr LTM 1300 (300 ton)', categoria: 'Maquinaria pesada', valor: 18600000, financiar: 14880000, plazo: '60 meses · Arrendamiento Puro', enganche: '20%' },
    ia: 'Cuenta A con alto LTV. Cuidar margen ante descuento por volumen. Validar capacidad de servicio en sitio remoto.', docs: '20/26'
  },
  {
    id: 8, etapa: 'propuesta', empresa: 'Iberdrola México', rfc: 'IME070612EN8',
    sector: 'Energía / Renovables', ubicacion: 'Monterrey', web: 'iberdrola.com.mx', tipoPersona: 'Persona Moral',
    contacto: { nombre: 'Carmen Solís', puesto: 'Project Manager Renovables', tel: '+52 55 6677 8899', email: 'csolis@iberdrola.com.mx' },
    origen: { canal: 'Inbound web', tipo: 'Cotización directa', ejecutivo: 'Ricardo Nieto', fecha: '2026-05-02', notas: 'Fase II parque eólico. Requiere grúa de 400 ton para izaje de torres. Comité técnico evalúa propuesta.' },
    activo: { tipo: 'Grúa XCMG XCA400 (400 ton)', categoria: 'Maquinaria pesada', valor: 24800000, financiar: 19840000, plazo: '60 meses · Arrendamiento Puro', enganche: '20%' },
    ia: 'Proyecto de alto valor. Reforzar plan de izaje y certificaciones para diferenciarse de competencia.', docs: '12/26'
  },
  {
    id: 9, etapa: 'cierre', empresa: 'Techint Ingeniería y Construcción', rfc: 'TIC910408EPC',
    sector: 'EPC Industrial', ubicacion: 'CDMX', web: 'techint.com', tipoPersona: 'Persona Moral',
    contacto: { nombre: 'Marcela Vidal', puesto: 'Gerente de Procura', tel: '+52 55 8899 0011', email: 'mvidal@techint.com' },
    origen: { canal: 'Cuenta clave', tipo: 'Ampliación', ejecutivo: 'Ana Ríos', fecha: '2026-05-05', notas: 'Nueva línea de proceso. Adjudicación confirmada, firma agendada para el 19/may. Enganche en trámite.' },
    activo: { tipo: 'Grúa SANY STC1000 (100 ton)', categoria: 'Maquinaria pesada', valor: 9200000, financiar: 7360000, plazo: '60 meses · Arrendamiento Puro', enganche: '20%' },
    ia: 'Cierre inminente. Confirmar garantías y coordinar logística de entrega con obra.', docs: '25/26'
  },
  {
    id: 10, etapa: 'prospeccion', empresa: 'Sacyr Construcción México', rfc: 'SAC031205OBP',
    sector: 'Infraestructura / Obra pesada', ubicacion: 'CDMX', web: 'sacyr.com', tipoPersona: 'Persona Moral',
    contacto: { nombre: 'Daniel Fuentes', puesto: 'Gerente de Equipos', tel: '+52 55 9800 1122', email: 'dfuentes@sacyr.com' },
    origen: { canal: 'Outbound', tipo: 'Primer contacto', ejecutivo: 'Ricardo Nieto', fecha: '2026-05-07', notas: 'Proyecto de túnel requiere grúa para 6 meses. Solicitan ficha técnica XCMG QY25. Cliente nuevo, calificación en proceso.' },
    activo: { tipo: 'Grúa XCMG QY25 (25 ton)', categoria: 'Maquinaria pesada', valor: 4600000, financiar: 3680000, plazo: '48 meses · Arrendamiento Puro', enganche: '20%' },
    ia: 'Lead calificado con buen potencial. Acelerar pre-aprobación de buró para avanzar a propuesta.', docs: '4/26'
  },
  {
    id: 11, etapa: 'propuesta', empresa: 'Acciona Infraestructuras', rfc: 'ACC120914INF',
    sector: 'Energía / Solar', ubicacion: 'CDMX', web: 'acciona.com', tipoPersona: 'Persona Moral',
    contacto: { nombre: 'Verónica Ortiz', puesto: 'Procurement Renovables', tel: '+52 55 4488 9900', email: 'vortiz@acciona.com' },
    origen: { canal: 'Inbound web', tipo: 'Cotización directa', ejecutivo: 'Ana Ríos', fecha: '2026-05-13', notas: 'Planta solar requiere grúa de 250 ton por 5 meses. Cotización entregada, espera resolución de comité de compras.' },
    activo: { tipo: 'Grúa Liebherr LTM 1250 (250 ton)', categoria: 'Maquinaria pesada', valor: 15600000, financiar: 12480000, plazo: '60 meses · Arrendamiento Puro', enganche: '20%' },
    ia: 'Oportunidad atractiva con cliente AAA. Dar seguimiento semanal al comité para no perder timing.', docs: '10/26'
  },
  {
    id: 12, etapa: 'negociacion', empresa: 'VISE Constructora', rfc: 'VIS960722VIA',
    sector: 'Obra civil / Vialidades', ubicacion: 'San Nicolás, NL', web: 'vise.com.mx', tipoPersona: 'Persona Moral',
    contacto: { nombre: 'Sergio Cabrera', puesto: 'Jefe de Maquinaria', tel: '+52 81 1234 5566', email: 'scabrera@vise.com.mx' },
    origen: { canal: 'Referido', tipo: 'Oportunidad nueva', ejecutivo: 'Ricardo Nieto', fecha: '2026-04-30', notas: 'Distribuidor vial requiere grúa TITAN SQ20T. Negociando tarifa mensual y fecha de inicio.' },
    activo: { tipo: 'Grúa TITAN SQ20T (20 ton)', categoria: 'Maquinaria pesada', valor: 3900000, financiar: 3120000, plazo: '48 meses · Arrendamiento Puro', enganche: '20%' },
    ia: 'Margen adecuado. Cliente con historial limpio. Cerrar antes de fin de mes para asegurar cupo de flota.', docs: '16/26'
  }
]

function Campo({ k, v, fuerte }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1.5 border-b border-kratos-border/40 last:border-0">
      <span className="text-[12px] text-kratos-muted shrink-0">{k}</span>
      <span className={`text-[13px] text-right ${fuerte ? 'font-semibold text-kratos-ink' : 'text-kratos-subtle'}`}>{v}</span>
    </div>
  )
}

const FORM_VACIO = { empresa: '', sector: '', ubicacion: '', contacto: '', ejecutivo: 'Ana Ríos', etapa: 'prospeccion', activoTipo: '', valor: '', financiar: '' }

export default function CrmKanban({ openSignal }) {
  const [deals, setDeals] = useState(SEED)
  const [dragId, setDragId] = useState(null)
  const [overCol, setOverCol] = useState(null)
  const [selId, setSelId] = useState(null)
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState(FORM_VACIO)

  // El botón "Nueva oportunidad" del encabezado dispara esta señal
  useEffect(() => { if (openSignal) setShowNew(true) }, [openSignal])

  const sel = deals.find(d => d.id === selId)
  const mover = (id, etapa) => setDeals(ds => ds.map(d => d.id === id ? { ...d, etapa } : d))
  const onDrop = (etapa) => { if (dragId != null) mover(dragId, etapa); setDragId(null); setOverCol(null) }

  const crear = (e) => {
    e.preventDefault()
    if (!form.empresa.trim()) return
    const valor = Number(form.valor) || 0
    const financiar = Number(form.financiar) || Math.round(valor * 0.8)
    const id = Math.max(0, ...deals.map(d => d.id)) + 1
    const hoy = new Date().toISOString().slice(0, 10)
    const nuevo = {
      id, etapa: form.etapa, empresa: form.empresa.trim(), rfc: '—',
      sector: form.sector || '—', ubicacion: form.ubicacion || '—', web: '—', tipoPersona: 'Persona Moral',
      contacto: { nombre: form.contacto || '—', puesto: '—', tel: '—', email: '—' },
      origen: { canal: 'Alta manual', tipo: 'Oportunidad nueva', ejecutivo: form.ejecutivo || '—', fecha: hoy, notas: 'Oportunidad creada manualmente desde el tablero. Completar expediente para calificar.' },
      activo: { tipo: form.activoTipo || 'Por definir', categoria: '—', valor, financiar, plazo: '48 meses · Arrendamiento Puro', enganche: '20%' },
      ia: 'Oportunidad nueva sin análisis. Solicitar información financiera para calificar.', docs: '0/26'
    }
    setDeals(ds => [...ds, nuevo])
    setForm(FORM_VACIO)
    setShowNew(false)
    setSelId(id)
  }

  return (
    <div>
      <div className="flex items-end justify-between mb-4 gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-kratos-ink">Tablero CRM</h3>
          <p className="text-[12px] text-kratos-muted mt-0.5">Arrastra las tarjetas entre columnas · clic para ver el expediente comercial</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="label-mono hidden lg:inline">{deals.length} oportunidades · {fmtMXN(deals.reduce((s, d) => s + d.activo.financiar, 0))} en pipeline</span>
          <button onClick={() => setShowNew(true)} className="flex items-center gap-1.5 px-3.5 py-2 rounded-none bg-kratos-ink text-white text-sm font-medium hover:opacity-90 transition">
            <Plus size={15} /> Nueva oportunidad
          </button>
        </div>
      </div>

      {/* Tablero */}
      <div className="flex gap-3 overflow-x-auto pb-3">
        {ETAPAS.map(col => {
          const items = deals.filter(d => d.etapa === col.key)
          const total = items.reduce((s, d) => s + d.activo.financiar, 0)
          return (
            <div key={col.key}
              onDragOver={(e) => { e.preventDefault(); setOverCol(col.key) }}
              onDragLeave={() => setOverCol(o => o === col.key ? null : o)}
              onDrop={() => onDrop(col.key)}
              className={`w-72 shrink-0 rounded-none border transition-colors ${overCol === col.key ? 'border-kratos-ink bg-kratos-panel-2' : 'border-kratos-border bg-kratos-bg2/40'}`}>
              {/* Encabezado de columna */}
              <div className="px-3 py-3 border-b border-kratos-border" style={{ borderTop: `3px solid ${col.color}`, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-kratos-ink">{col.label}</span>
                  <span className="text-[11px] font-mono text-kratos-muted bg-kratos-panel px-1.5 py-0.5 rounded-none">{items.length}</span>
                </div>
                <div className="font-display text-base font-semibold tabular-nums mt-1" style={{ color: col.color }}>{fmtMXN(total)}</div>
              </div>
              {/* Tarjetas */}
              <div className="p-2 space-y-2 min-h-[120px]">
                {items.map(d => (
                  <div key={d.id}
                    draggable
                    onDragStart={() => setDragId(d.id)}
                    onDragEnd={() => { setDragId(null); setOverCol(null) }}
                    onClick={() => setSelId(d.id)}
                    className={`group bg-kratos-panel border border-kratos-border rounded-none p-3 cursor-pointer hover:border-kratos-ink/40 hover:shadow-soft transition ${dragId === d.id ? 'opacity-40' : ''}`}>
                    <div className="flex items-start gap-1.5">
                      <GripVertical size={13} className="text-kratos-muted/60 mt-0.5 shrink-0 group-hover:text-kratos-muted" />
                      <div className="min-w-0">
                        <div className="text-[13px] font-semibold text-kratos-ink leading-tight">{d.empresa}</div>
                        <div className="text-[11px] text-kratos-muted mt-0.5 truncate">{d.activo.tipo}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2 pl-5">
                      <span className="font-mono text-[12px] font-semibold text-kratos-ink">{fmtMXN(d.activo.financiar)}</span>
                      <span className="text-[10px] text-kratos-muted">{d.origen.ejecutivo}</span>
                    </div>
                  </div>
                ))}
                {items.length === 0 && <div className="text-center text-[11px] text-kratos-muted/70 py-6">Suelta una tarjeta aquí</div>}
              </div>
            </div>
          )
        })}
      </div>

      {/* Detalle del expediente comercial */}
      {sel && createPortal(
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={() => setSelId(null)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative panel w-full max-w-4xl p-6 shadow-2xl max-h-[88vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelId(null)} className="absolute right-4 top-4 text-kratos-muted hover:text-kratos-ink transition"><X size={18} /></button>

            <div className="font-mono text-[11px] text-kratos-muted uppercase tracking-wider">{sel.empresa} · {sel.rfc}</div>

            {/* Mover a */}
            <div className="flex items-center gap-2 flex-wrap mt-3 mb-4">
              <span className="label-mono">Mover a:</span>
              {ETAPAS.map(e => (
                <button key={e.key} onClick={() => mover(sel.id, e.key)}
                  className={`px-3 py-1 rounded-full text-[12px] font-medium transition ${sel.etapa === e.key ? 'text-white' : 'bg-kratos-panel-2 text-kratos-subtle hover:bg-kratos-bg2'}`}
                  style={sel.etapa === e.key ? { background: e.color } : undefined}>
                  {e.label}
                </button>
              ))}
            </div>

            {/* Recomendación IA */}
            <div className="surface-2 p-3 mb-5">
              <div className="flex items-center gap-1.5 label-mono mb-1"><BrainCircuit size={12} /> Recomendación IA</div>
              <p className="text-[13px] text-kratos-subtle">{sel.ia}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="surface-2 rounded-none p-4">
                <div className="flex items-center gap-1.5 label-mono mb-2"><Building2 size={12} /> Datos de la empresa</div>
                <Campo k="Sector" v={sel.sector} />
                <Campo k="Ubicación" v={sel.ubicacion} />
                <Campo k="Web" v={sel.web} />
                <Campo k="Tipo de persona" v={sel.tipoPersona} />
              </div>
              <div className="surface-2 rounded-none p-4">
                <div className="flex items-center gap-1.5 label-mono mb-2"><Contact size={12} /> Contacto principal</div>
                <Campo k="Nombre" v={sel.contacto.nombre} fuerte />
                <Campo k="Puesto" v={sel.contacto.puesto} />
                <Campo k="Teléfono" v={sel.contacto.tel} />
                <Campo k="Email" v={sel.contacto.email} />
              </div>
              <div className="surface-2 rounded-none p-4">
                <div className="flex items-center gap-1.5 label-mono mb-2"><GitBranch size={12} /> Origen y asignación</div>
                <Campo k="Canal" v={sel.origen.canal} />
                <Campo k="Tipo de acercamiento" v={sel.origen.tipo} />
                <Campo k="Ejecutivo asignado" v={sel.origen.ejecutivo} fuerte />
                <Campo k="Fecha acercamiento" v={sel.origen.fecha} />
                <p className="text-[12px] text-kratos-muted mt-2 leading-relaxed"><span className="text-kratos-muted">Notas: </span>{sel.origen.notas}</p>
              </div>
              <div className="surface-2 rounded-none p-4">
                <div className="flex items-center gap-1.5 label-mono mb-2"><Boxes size={12} /> Activo y propuesta</div>
                <Campo k="Tipo" v={sel.activo.tipo} fuerte />
                <Campo k="Categoría" v={sel.activo.categoria} />
                <Campo k="Valor del activo" v={`${fmtMXN(sel.activo.valor)} MXN`} fuerte />
                <Campo k="Monto a financiar" v={`${fmtMXN(sel.activo.financiar)} MXN`} fuerte />
                <Campo k="Plazo / Tipo" v={sel.activo.plazo} />
                <Campo k="Enganche" v={sel.activo.enganche} />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-[12px] text-kratos-muted">
              <span>Documentos integrados: <span className="font-mono text-kratos-subtle">{sel.docs}</span></span>
              <span>Etapa actual: <span className="font-medium text-kratos-ink">{ETAPAS.find(e => e.key === sel.etapa)?.label}</span></span>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Formulario · nueva oportunidad */}
      {showNew && createPortal(
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={() => setShowNew(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <form onSubmit={crear} className="relative panel w-full max-w-xl p-6 shadow-2xl max-h-[88vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setShowNew(false)} className="absolute right-4 top-4 text-kratos-muted hover:text-kratos-ink transition"><X size={18} /></button>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-9 h-9 rounded-none bg-kratos-ink text-white flex items-center justify-center"><Plus size={16} /></span>
              <div>
                <h3 className="font-display text-lg font-semibold text-kratos-ink leading-tight">Nueva oportunidad</h3>
                <p className="text-[12px] text-kratos-muted">Se agrega como tarjeta al tablero</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-[12px] text-kratos-muted">Empresa *</label>
                <input value={form.empresa} onChange={(e) => setForm(f => ({ ...f, empresa: e.target.value }))} placeholder="Razón social del prospecto"
                  className="w-full mt-1 px-3 py-2.5 bg-kratos-panel-2 border border-kratos-border rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-kratos-border" />
              </div>
              <div>
                <label className="text-[12px] text-kratos-muted">Sector</label>
                <input value={form.sector} onChange={(e) => setForm(f => ({ ...f, sector: e.target.value }))}
                  className="w-full mt-1 px-3 py-2.5 bg-kratos-panel-2 border border-kratos-border rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-kratos-border" />
              </div>
              <div>
                <label className="text-[12px] text-kratos-muted">Ubicación</label>
                <input value={form.ubicacion} onChange={(e) => setForm(f => ({ ...f, ubicacion: e.target.value }))}
                  className="w-full mt-1 px-3 py-2.5 bg-kratos-panel-2 border border-kratos-border rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-kratos-border" />
              </div>
              <div>
                <label className="text-[12px] text-kratos-muted">Contacto</label>
                <input value={form.contacto} onChange={(e) => setForm(f => ({ ...f, contacto: e.target.value }))}
                  className="w-full mt-1 px-3 py-2.5 bg-kratos-panel-2 border border-kratos-border rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-kratos-border" />
              </div>
              <div>
                <label className="text-[12px] text-kratos-muted">Ejecutivo</label>
                <input value={form.ejecutivo} onChange={(e) => setForm(f => ({ ...f, ejecutivo: e.target.value }))}
                  className="w-full mt-1 px-3 py-2.5 bg-kratos-panel-2 border border-kratos-border rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-kratos-border" />
              </div>
              <div className="md:col-span-2">
                <label className="text-[12px] text-kratos-muted">Activo de interés</label>
                <input value={form.activoTipo} onChange={(e) => setForm(f => ({ ...f, activoTipo: e.target.value }))} placeholder="Ej: Grúa SANY STC1000 (100 ton)"
                  className="w-full mt-1 px-3 py-2.5 bg-kratos-panel-2 border border-kratos-border rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-kratos-border" />
              </div>
              <div>
                <label className="text-[12px] text-kratos-muted">Valor del activo (MXN)</label>
                <input type="number" value={form.valor} onChange={(e) => setForm(f => ({ ...f, valor: e.target.value }))} placeholder="0"
                  className="w-full mt-1 px-3 py-2.5 bg-kratos-panel-2 border border-kratos-border rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-kratos-border" />
              </div>
              <div>
                <label className="text-[12px] text-kratos-muted">Monto a financiar (MXN)</label>
                <input type="number" value={form.financiar} onChange={(e) => setForm(f => ({ ...f, financiar: e.target.value }))} placeholder="80% del valor si se deja vacío"
                  className="w-full mt-1 px-3 py-2.5 bg-kratos-panel-2 border border-kratos-border rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-kratos-border" />
              </div>
              <div className="md:col-span-2">
                <label className="text-[12px] text-kratos-muted">Etapa inicial</label>
                <select value={form.etapa} onChange={(e) => setForm(f => ({ ...f, etapa: e.target.value }))}
                  className="w-full mt-1 px-3 py-2.5 bg-kratos-panel-2 border border-kratos-border rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-kratos-border">
                  {ETAPAS.map(e => <option key={e.key} value={e.key}>{e.label}</option>)}
                </select>
              </div>
            </div>

            <button type="submit" disabled={!form.empresa.trim()}
              className="mt-5 px-4 py-2.5 bg-kratos-ink text-white rounded-none text-sm font-medium hover:opacity-90 transition disabled:opacity-40">
              Crear oportunidad
            </button>
          </form>
        </div>,
        document.body
      )}
    </div>
  )
}
