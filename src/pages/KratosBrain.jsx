import { useState, useRef, useEffect, useMemo } from 'react'
import { Brain, Send, Sparkles, User } from 'lucide-react'
import { finanzas, crm, flota, fmtMXN } from '../data/mockData'
import { ebitdaMensual, rentabilidadGruas, flujoFuturo, riesgoGeneral, dependencias } from '../data/iaData'
import { creditoResumen } from '../data/creditoData'

// ============================================================
//  Cerebro local — simula el análisis sin API, usando los
//  datos reales que ya viven en la plataforma.
// ============================================================
function useMetrics() {
  return useMemo(() => {
    const ingresosYTD = finanzas.pl.reduce((s, p) => s + p.ingresos, 0)
    const utilidadYTD = finanzas.pl.reduce((s, p) => s + p.utilidad, 0)
    const ebitdaYTD   = ebitdaMensual.reduce((s, m) => s + m.ebitda, 0)
    const cajaTotal   = finanzas.saldoBancos.reduce((s, b) => s + b.saldo, 0)
    const cxcTotal    = finanzas.cxc.reduce((s, c) => s + c.monto, 0)
    const cxcVencida  = finanzas.cxc.filter(c => c.estado.startsWith('Vencida')).reduce((s, c) => s + c.monto, 0)
    const cxpTotal    = finanzas.cxp.reduce((s, c) => s + c.monto, 0)
    const pipelineTotal = crm.pipeline.reduce((s, p) => s + p.monto, 0)
    const ganadasMes  = crm.pipeline.find(p => p.etapa.includes('Ganadas'))?.monto ?? 0
    const credito     = creditoResumen()
    const quemaMes    = 5300000
    const runway      = +(cajaTotal / quemaMes).toFixed(1)
    const margenYTD   = +((utilidadYTD / ingresosYTD) * 100).toFixed(1)
    const margenEbitda = +((ebitdaYTD / ingresosYTD) * 100).toFixed(1)
    const enObra      = flota.gruas.filter(g => g.estado === 'En obra').length
    const enPatio     = flota.gruas.filter(g => g.estado === 'En patio').length
    const enMantto    = flota.gruas.filter(g => g.estado === 'Mantenimiento').length
    const total       = flota.gruas.length
    const utilFlota   = Math.round(enObra / total * 100)
    const dispoFlota  = Math.round((total - enMantto) / total * 100)
    const topCxc      = [...finanzas.cxc].sort((a, b) => b.monto - a.monto).slice(0, 3)
    const concentTop3 = Math.round(topCxc.reduce((s, c) => s + c.monto, 0) / cxcTotal * 100)
    return {
      ingresosYTD, utilidadYTD, ebitdaYTD, cajaTotal, cxcTotal, cxcVencida, cxpTotal,
      pipelineTotal, ganadasMes, credito, runway, margenYTD, margenEbitda,
      enObra, enPatio, enMantto, total, utilFlota, dispoFlota, topCxc, concentTop3
    }
  }, [])
}

function buildResponder(m) {
  const INTENTS = [
    {
      keys: ['salud', 'financ', 'general', 'cómo va', 'como va', 'resumen', 'negocio', 'ebitda', 'utilidad', 'rentab del negocio', 'estado del negocio'],
      answer: () =>
`**Salud financiera — cierre de mayo 2026**

• Ingresos YTD: **${fmtMXN(m.ingresosYTD)}**
• Utilidad neta YTD: **${fmtMXN(m.utilidadYTD)}** (margen ${m.margenYTD}%)
• EBITDA YTD: **${fmtMXN(m.ebitdaYTD)}** (margen ${m.margenEbitda}%)
• Caja consolidada: **${fmtMXN(m.cajaTotal)}** → runway **${m.runway} meses**
• Crédito utilizado: **${m.credito.utilizacion}%** (${fmtMXN(m.credito.disponible)} disponible)

**Lectura del Brain:** el año arrancó flojo —Ene y Feb con EBITDA negativo— y se recuperó con fuerza desde marzo (abr y may con margen EBITDA de doble dígito). El punto crítico **no es la rentabilidad, es la liquidez**: el runway de ${m.runway} meses es corto y convive con ${fmtMXN(m.cxcVencida)} de cartera vencida. Riesgo general de la empresa: **${riesgoGeneral.nivel}** (${riesgoGeneral.score}/100).

Si quieres bajar a detalle, pregúntame por la flota, los riesgos de caja o la concentración de clientes.`
    },
    {
      keys: ['grúa', 'grua', 'vender', 'rendimiento', 'rentabilidad por unidad', 'unidad', 'roi', 'lastre', 'qué equipo', 'que equipo'],
      answer: () => {
        const orden = [...rentabilidadGruas].sort((a, b) => b.roi - a.roi)
        const mejores = orden.filter(g => g.semaforo === 'ok').slice(0, 3)
        const peores = orden.filter(g => g.semaforo !== 'ok')
        return (
`**Rentabilidad por unidad (YTD)**

🟢 **Producen y hay que replicar:**
${mejores.map(g => `• ${g.eco}: ROI ${g.roi}% · margen ${g.margenPct}% · utilización ${g.utilizacion}%`).join('\n')}

🔴 **Lastre — evaluar acción:**
${peores.map(g => `• ${g.eco}: ROI ${g.roi}% · margen ${g.margenPct}% · utilización ${g.utilizacion}% ${g.roi < 0 ? '→ candidata a venta' : '→ vigilar de cerca'}`).join('\n')}

**Recomendación del Brain:** la **G004** (ROI ${orden.find(g => g.eco === 'G004')?.roi}%, utilización ${orden.find(g => g.eco === 'G004')?.utilizacion}%) destruye valor: produce poco pero sigue cargando costo fijo y depreciación. Es la primera candidata a venta. En contraste, las **SANY 100t (G009, G010, G014)** son el motor de la flota con ROI arriba de 22% — ahí conviene concentrar inversión y mantenimiento preventivo.`
        )
      }
    },
    {
      keys: ['caja', 'flujo', 'runway', 'liquidez', 'tensión', 'tension', 'riesgo de caja', 'semanas', 'pagar', 'cxp'],
      answer: () =>
`**Riesgos de caja — próximas semanas**

• Caja hoy: **${fmtMXN(m.cajaTotal)}** · runway **${m.runway} meses**
• Riesgo a 2 semanas: **${flujoFuturo.riesgo2sem.nivel.toUpperCase()}** — ${flujoFuturo.riesgo2sem.mensaje} (${fmtMXN(flujoFuturo.riesgo2sem.impacto)})
• Riesgo a 30 días: **${flujoFuturo.riesgo30d.nivel.toUpperCase()}** — ${flujoFuturo.riesgo30d.mensaje} (${fmtMXN(flujoFuturo.riesgo30d.impacto)})
• CXP por pagar próximamente: **${fmtMXN(m.cxpTotal)}**

**Semanas de tensión (pronóstico):**
${flujoFuturo.semanasTension.map(s => `• ${s.semana}: tensión ${s.tension} — ${s.detalle}`).join('\n')}

**Lectura del Brain:** la semana crítica es la de **nómina + 3 OCs grandes**. El flujo depende de que **OHL liquide**: si se atrasa, hay déficit proyectado. La palanca más rápida es acelerar la cobranza vencida (${fmtMXN(m.cxcVencida)}) antes que disponer más crédito.`
    },
    {
      keys: ['cliente', 'concentr', 'cobrar', 'cxc', 'cartera', 'vencid', 'cobranza', 'quién debe', 'quien debe'],
      answer: () => {
        const vencidas = finanzas.cxc.filter(c => c.estado.startsWith('Vencida')).sort((a, b) => b.monto - a.monto)
        return (
`**Cartera y concentración de clientes**

• CxC total: **${fmtMXN(m.cxcTotal)}** · vencida: **${fmtMXN(m.cxcVencida)}**
• Concentración top 3: **${m.concentTop3}%** del total

**Cuentas vencidas (riesgo):**
${vencidas.map(c => `• ${c.cliente}: ${fmtMXN(c.monto)} — ${c.estado} (${c.oc})`).join('\n')}

**Top 3 clientes por saldo:**
${m.topCxc.map(c => `• ${c.cliente}: ${fmtMXN(c.monto)}`).join('\n')}

**Lectura del Brain:** el ingreso está concentrado (~48% en 2 clientes según las alertas de dependencia) y la cartera vencida cae justo en **Grupo Carso y OHL México**. Esa combinación —pocos clientes + pago lento— es exactamente lo que explica el runway corto: un solo retraso se vuelve crisis de caja. Prioridad: gestión de cobranza sobre esas dos cuentas.`
        )
      }
    },
    {
      keys: ['utiliza', 'disponib', 'flota operativa', 'mantenimiento', 'taller', 'capacidad', 'unidades activas'],
      answer: () =>
`**Utilización y disponibilidad de la flota**

• Utilización: **${m.utilFlota}%** (${m.enObra}/${m.total} grúas facturando)
• Disponibilidad: **${m.dispoFlota}%** (${m.total - m.enMantto}/${m.total} operables)
• En patio (ociosas): **${m.enPatio}** · en mantenimiento: **${m.enMantto}**

**Lectura del Brain:** la utilización (${m.utilFlota}%) está por debajo de la meta de 80%. El problema no es solo la unidad en taller (G008): hay **${m.enPatio} unidad en patio** generando $0 mientras sigue pagando seguro y depreciación. Cada unidad parada equivale a ~14% de la capacidad de la flota. La acción de mayor impacto es **colocar la unidad ociosa en obra** antes que comprar fierro nuevo.`
    },
    {
      keys: ['pipeline', 'ventas', 'comercial', 'oportunidad', 'embudo', 'cierre', 'crm', 'vender más', 'contratos'],
      answer: () =>
`**Pipeline comercial — mayo 2026**

• Pipeline activo: **${fmtMXN(m.pipelineTotal)}**
• Ventas cerradas en el mes: **${fmtMXN(m.ganadasMes)}**

**Embudo por etapa:**
${crm.pipeline.map(p => `• ${p.etapa}: ${fmtMXN(p.monto)} (${p.deals} deals)`).join('\n')}

**Lectura del Brain:** el embudo cubre ~8x la meta de venta mensual, sano para un ciclo largo como el de maquinaria (90–180 días entre firma y entrega). El cuello está en **Cotización → Negociación**: ahí se concentra el monto pero la tasa de cierre (34%) está apenas debajo de la meta. Subir 1 punto de conversión rinde más que ampliar la prospección.`
    },
    {
      keys: ['dependencia', 'concentración de riesgo', 'proveedor', 'banco', 'persona', 'riesgo general', 'vulnerab'],
      answer: () =>
`**Alertas de dependencia (concentración de riesgo)**

${dependencias.map(d => `• [${d.riesgo.toUpperCase()}] ${d.titulo} — ${d.detalle}`).join('\n')}

**Lectura del Brain:** los riesgos altos son de **cliente** (pocas cuentas sostienen el ingreso) y de **persona clave** (sin backup). El de banco y proveedor (combustible en una sola fuente) son medios pero baratos de mitigar: diversificar cuentas y tener un proveedor de respaldo. Riesgo general: **${riesgoGeneral.nivel}** (${riesgoGeneral.score}/100).`
    }
  ]

  return (question) => {
    const q = question.toLowerCase()
    let best = null, bestScore = 0
    for (const intent of INTENTS) {
      const score = intent.keys.reduce((s, k) => s + (q.includes(k) ? 1 : 0), 0)
      if (score > bestScore) { bestScore = score; best = intent }
    }
    if (best && bestScore > 0) return best.answer()
    return (
`No tengo ese dato exacto conectado todavía, pero puedo analizar lo que ya vive en la plataforma. Prueba con una de estas líneas:

• Salud financiera y rentabilidad del negocio
• Qué grúas conviene vender o están dando pérdida
• Riesgos de caja de las próximas semanas
• Cartera vencida y concentración de clientes
• Utilización y disponibilidad de la flota
• Estado del pipeline comercial

*(Soy una simulación local: razono sobre los datos reales de Finanzas, Flota, CRM y los agentes IA — sin conexión a un modelo externo por ahora.)*`
    )
  }
}

// Render markdown-lite: **negritas** y saltos de línea
function Rich({ text }) {
  return (
    <div className="space-y-1">
      {text.split('\n').map((line, i) => {
        if (line.trim() === '') return <div key={i} className="h-1.5" />
        const parts = line.split('**')
        const isItalic = line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')
        return (
          <p key={i} className={`text-sm leading-relaxed ${isItalic ? 'text-kratos-muted italic text-[12px]' : 'text-kratos-text'}`}>
            {isItalic ? line.replace(/\*/g, '') : parts.map((p, j) => j % 2 === 1
              ? <strong key={j} className="font-semibold text-kratos-ink">{p}</strong>
              : <span key={j}>{p}</span>)}
          </p>
        )
      })}
    </div>
  )
}

const PREGUNTAS = [
  '¿Cómo está la salud financiera del negocio?',
  '¿Qué grúas debería vender o están dando pérdida?',
  '¿Cuáles son mis riesgos de caja en las próximas semanas?',
  '¿Qué tan concentrado está mi ingreso y qué cuentas están vencidas?',
  '¿Cómo está la utilización y disponibilidad de la flota?',
  '¿Cómo viene el pipeline comercial este mes?'
]

export default function KratosBrain() {
  const metrics = useMetrics()
  const responder = useMemo(() => buildResponder(metrics), [metrics])
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Soy **Kratos FP Brain**. Analizo en tiempo real toda la información de la plataforma —Finanzas, Flota, Comercial, RRHH y los agentes IA— para darte lecturas accionables. Elige una pregunta o escríbeme la tuya.' }
  ])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const endRef = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, thinking])

  const ask = (q) => {
    const pregunta = q.trim()
    if (!pregunta || thinking) return
    setMessages(prev => [...prev, { role: 'user', text: pregunta }])
    setInput('')
    setThinking(true)
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', text: responder(pregunta) }])
      setThinking(false)
    }, 650)
  }

  const yaInicio = messages.length > 1

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      {/* Encabezado */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-11 h-11 rounded-xl bg-kratos-ink text-white flex items-center justify-center shrink-0">
          <Brain size={20} />
        </span>
        <div>
          <h1 className="font-display text-2xl font-semibold text-kratos-ink tracking-tight leading-none">Kratos FP Brain</h1>
          <p className="text-[12px] text-kratos-muted mt-1">Asistente de inteligencia · analiza todos los módulos de la plataforma</p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-kratos-muted">
          <span className="w-1.5 h-1.5 bg-kratos-ok rounded-full pulse-dot" /> En línea
        </span>
      </div>

      {/* Conversación */}
      <div className="flex-1 panel overflow-y-auto p-5 space-y-5">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-kratos-panel-2 text-kratos-subtle' : 'bg-kratos-ink text-white'}`}>
              {msg.role === 'user' ? <User size={15} /> : <Brain size={15} />}
            </span>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'bg-kratos-ink text-white' : 'bg-kratos-panel-2 border border-kratos-border'}`}>
              {msg.role === 'user'
                ? <p className="text-sm leading-relaxed">{msg.text}</p>
                : <Rich text={msg.text} />}
            </div>
          </div>
        ))}
        {thinking && (
          <div className="flex gap-3">
            <span className="w-8 h-8 rounded-lg bg-kratos-ink text-white flex items-center justify-center shrink-0"><Brain size={15} /></span>
            <div className="bg-kratos-panel-2 border border-kratos-border rounded-2xl px-4 py-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-kratos-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-kratos-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-kratos-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Preguntas pre-promteadas */}
      <div className="mt-4">
        <div className="flex items-center gap-1.5 label-mono mb-2">
          <Sparkles size={12} /> {yaInicio ? 'Seguir explorando' : 'Preguntas sugeridas'}
        </div>
        <div className="flex flex-wrap gap-2">
          {PREGUNTAS.map((p, i) => (
            <button key={i} onClick={() => ask(p)} disabled={thinking}
              className="text-left text-[12px] px-3 py-2 rounded-lg border border-kratos-border bg-kratos-panel hover:bg-kratos-panel-2 text-kratos-text transition disabled:opacity-50">
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <form onSubmit={(e) => { e.preventDefault(); ask(input) }} className="mt-3 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pregúntale al Brain sobre cualquier área del negocio…"
          className="flex-1 px-4 py-3 bg-kratos-panel border border-kratos-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-kratos-border"
        />
        <button type="submit" disabled={thinking || !input.trim()}
          className="w-12 h-12 rounded-xl bg-kratos-ink text-white flex items-center justify-center hover:opacity-90 transition disabled:opacity-40 shrink-0">
          <Send size={17} />
        </button>
      </form>
    </div>
  )
}
