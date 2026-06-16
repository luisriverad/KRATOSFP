import { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Download, TrendingUp, TrendingDown, Wallet, Banknote, RotateCcw } from 'lucide-react'
import { fmtMXN } from '../data/mockData'
import { cfSemanas, cfBancos, cfEntradas, cfSalidas } from '../data/cashflowForecast'

// Divisor MARCADO entre cada semana (grupo Pron·Real·Dif)
const WDIV = 'border-l-[3px] border-kratos-subtle/40'

// Formato compacto para celdas en reposo ($1.2M · $453k · —)
const fmtK = (v) => {
  if (v == null || v === 0) return '—'
  const a = Math.abs(v)
  const sign = v < 0 ? '-' : ''
  if (a >= 1e6) return `${sign}$${(a / 1e6).toFixed(a >= 1e7 ? 1 : 2)}M`
  if (a >= 1e3) return `${sign}$${Math.round(a / 1e3)}k`
  return `${sign}$${a}`
}
const toneDif = (d) => (d == null || d === 0 ? 'text-kratos-muted' : d > 0 ? 'text-kratos-ok' : 'text-kratos-danger')
const clone = (rows) => rows.map(r => ({ ...r, pron: [...r.pron], real: [...r.real] }))
const cloneGroups = (gs) => gs.map(g => ({ ...g, items: clone(g.items) }))
const sumW = (rows, key) => cfSemanas.map((_, w) => rows.reduce((s, it) => s + (it[key]?.[w] || 0), 0))

// --- Celda editable: en reposo muestra formato compacto; al enfocar, el número crudo para capturar.
// (módulo-scope para no remontarse al re-render → conserva el foco al teclear)
function CellInput({ value, onChange, strong }) {
  const [focused, setFocused] = useState(false)
  const [draft, setDraft] = useState('')
  const show = focused ? draft : (value == null || value === 0 ? '' : fmtK(value))
  return (
    <input
      inputMode="numeric"
      value={show}
      placeholder="—"
      onFocus={() => { setDraft(value == null ? '' : String(value)); setFocused(true) }}
      onChange={(e) => {
        const raw = e.target.value
        setDraft(raw)
        const n = raw.trim() === '' ? null : Number(raw.replace(/[^0-9.-]/g, ''))
        onChange(Number.isNaN(n) ? null : n)
      }}
      onBlur={() => setFocused(false)}
      className={`w-full bg-transparent border-0 px-2 py-1.5 text-right font-mono text-[12px] tabular-nums placeholder:text-kratos-muted/50 focus:bg-kratos-info-soft focus:outline-none focus:ring-1 focus:ring-inset focus:ring-kratos-info/40 ${strong ? 'font-semibold text-kratos-ink' : 'text-kratos-text'}`}
    />
  )
}

// --- Renglón editable (bancos / items)
function EditRow({ label, item, onCell, indent }) {
  return (
    <tr className="border-b border-kratos-border/40">
      <td className={`py-1 text-[13px] ${indent ? 'pl-8 pr-4 text-kratos-subtle' : 'px-4 font-medium text-kratos-ink'} sticky left-0 bg-kratos-panel z-10`}>{label}</td>
      {cfSemanas.map((s, w) => {
        const p = item.pron?.[w] ?? null
        const r = item.real?.[w] ?? null
        const d = (p == null && r == null) ? null : (r || 0) - (p || 0)
        return (
          <td key={s.id} className={`${WDIV} p-0`}>
            <div className="grid grid-cols-3 items-stretch">
              <CellInput value={p} onChange={(v) => onCell('pron', w, v)} />
              <div className="bg-kratos-panel-2/60"><CellInput value={r} onChange={(v) => onCell('real', w, v)} /></div>
              <span className={`px-2 py-1.5 text-right font-mono text-[12px] tabular-nums self-center ${toneDif(d)}`}>{d == null ? '—' : fmtK(d)}</span>
            </div>
          </td>
        )
      })}
    </tr>
  )
}

// --- Renglón calculado (subtotales / totales / saldos)
function CalcRow({ label, pron, real, tone, big }) {
  const bg = tone === 'ok' ? 'bg-kratos-ok-soft' : tone === 'danger' ? 'bg-kratos-danger-soft' : tone === 'sub' ? 'bg-kratos-bg2/60' : 'bg-kratos-bg2'
  const txt = tone === 'sub' ? 'label-mono' : 'font-display font-semibold text-sm text-kratos-ink'
  return (
    <tr className={`${bg} ${big ? 'border-y-2 border-kratos-border' : ''}`}>
      <td className={`px-4 py-2 sticky left-0 ${bg} z-10 ${txt}`}>{label}</td>
      {cfSemanas.map((s, w) => {
        const p = pron[w] || 0, r = real[w] || 0, d = r - p
        return (
          <td key={s.id} className={WDIV}>
            <div className="grid grid-cols-3">
              <span className="px-2 py-1.5 text-right font-mono text-[12px] font-semibold tabular-nums text-kratos-ink">{fmtK(p)}</span>
              <span className="px-2 py-1.5 text-right font-mono text-[12px] font-semibold tabular-nums text-kratos-ink bg-kratos-panel-2/40">{fmtK(r)}</span>
              <span className={`px-2 py-1.5 text-right font-mono text-[12px] tabular-nums ${toneDif(d)}`}>{fmtK(d)}</span>
            </div>
          </td>
        )
      })}
    </tr>
  )
}

export default function CashflowFormato() {
  const [bancos, setBancos]     = useState(() => clone(cfBancos))
  const [entradas, setEntradas] = useState(() => cloneGroups(cfEntradas))
  const [salidas, setSalidas]   = useState(() => cloneGroups(cfSalidas))

  const reset = () => { setBancos(clone(cfBancos)); setEntradas(cloneGroups(cfEntradas)); setSalidas(cloneGroups(cfSalidas)) }

  const updateBanco = (i, field, w, val) =>
    setBancos(prev => prev.map((b, bx) => bx !== i ? b : { ...b, [field]: b[field].map((x, xi) => xi === w ? val : x) }))
  const updateItem = (section, gi, ii, field, w, val) => {
    const setter = section === 'entradas' ? setEntradas : setSalidas
    setter(prev => prev.map((g, gx) => gx !== gi ? g : { ...g, items: g.items.map((it, ix) => ix !== ii ? it : { ...it, [field]: it[field].map((x, xi) => xi === w ? val : x) }) }))
  }

  // Totales en vivo (se recalculan al editar cualquier celda)
  const entradasItems = entradas.flatMap(g => g.items)
  const salidasItems  = salidas.flatMap(g => g.items)
  const bancosPron = sumW(bancos, 'pron'),     bancosReal = sumW(bancos, 'real')
  const entPron = sumW(entradasItems, 'pron'), entReal = sumW(entradasItems, 'real')
  const salPron = sumW(salidasItems, 'pron'),  salReal = sumW(salidasItems, 'real')
  const finPron = cfSemanas.map((_, w) => bancosPron[w] + entPron[w] - salPron[w])
  const finReal = cfSemanas.map((_, w) => bancosReal[w] + entReal[w] - salReal[w])

  const wAct = Math.max(0, cfSemanas.findIndex(s => s.estado === 'actual'))

  const kpis = [
    { label: 'Saldo inicial en bancos', value: bancosReal[wAct] || bancosPron[wAct], icon: Banknote, tone: 'text-kratos-ink' },
    { label: 'Total entradas (real)',   value: entReal[wAct], icon: TrendingUp,   tone: 'text-kratos-ok' },
    { label: 'Total salidas (real)',    value: salReal[wAct], icon: TrendingDown, tone: 'text-kratos-danger' },
    { label: 'Saldo final (real)',      value: finReal[wAct], icon: Wallet, tone: finReal[wAct] >= 0 ? 'text-kratos-ok' : 'text-kratos-danger' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <Link to="/finanzas" className="btn-link mb-2 inline-flex"><ArrowLeft size={14}/> Volver a Finanzas</Link>
          <h1 className="font-display text-3xl font-semibold text-kratos-ink tracking-tight">Formato de Forecast · Cashflow Semanal</h1>
          <p className="text-sm text-kratos-muted mt-1">Pronóstico vs. real por semana · Sem 20 · 21 · 22 (may–jun 2026) · celdas capturables a mano</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={reset} className="btn-ghost"><RotateCcw size={14}/> Restablecer</button>
          <a href="/Formato de Forecast Cashflow.xlsx" download className="btn-ghost"><Download size={15}/> Excel</a>
        </div>
      </div>

      {/* KPI strip — semana actual */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((k, i) => {
          const Icon = k.icon
          return (
            <div key={i} className="panel-flat p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="label-mono leading-snug">{k.label}</span>
                <Icon size={14} className="text-kratos-muted shrink-0"/>
              </div>
              <div className={`font-display text-2xl font-semibold tabular-nums ${k.tone}`}>{k.value == null ? '—' : fmtMXN(k.value)}</div>
              <div className="text-[11px] text-kratos-muted mt-1">Sem {cfSemanas[wAct].num} · {cfSemanas[wAct].rango}</div>
            </div>
          )
        })}
      </div>

      {/* Tabla del formato */}
      <div className="panel overflow-x-auto">
        <table className="w-full border-collapse min-w-[860px]">
          <thead>
            <tr>
              <th rowSpan={2} className="table-th sticky left-0 bg-kratos-panel-2 z-20 align-bottom border-b border-kratos-border">Concepto</th>
              {cfSemanas.map(s => (
                <th key={s.id} className={`${WDIV} text-center px-2 py-2.5 border-b border-kratos-border ${s.estado === 'actual' ? 'bg-kratos-info-soft' : 'bg-kratos-panel-2'}`}>
                  <div className={`font-display text-base font-semibold leading-none ${s.estado === 'actual' ? 'text-kratos-info' : 'text-kratos-ink'}`}>Semana {s.num}</div>
                  <div className="text-[10px] uppercase tracking-wider text-kratos-muted mt-0.5">{s.rango}{s.estado === 'actual' ? ' · hoy' : s.estado === 'futura' ? ' · proy.' : ''}</div>
                </th>
              ))}
            </tr>
            <tr>
              {cfSemanas.map(s => (
                <th key={s.id} className={`${WDIV} px-0 bg-kratos-panel-2 border-b border-kratos-border`}>
                  <div className="grid grid-cols-3 text-[9px] uppercase tracking-wider text-kratos-muted font-semibold">
                    <span className="px-2 py-1 text-right">Pron.</span>
                    <span className="px-2 py-1 text-right bg-kratos-panel-2">Real</span>
                    <span className="px-2 py-1 text-right">Dif.</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Saldo inicial en bancos */}
            <CalcRow label="Saldo inicial en bancos" pron={bancosPron} real={bancosReal} />
            {bancos.map((b, i) => (
              <EditRow key={i} item={b} onCell={(field, w, v) => updateBanco(i, field, w, v)} indent
                label={<span><span className="text-kratos-ink">{b.banco}</span> <span className="font-mono text-[11px] text-kratos-muted">{b.cuenta}</span></span>} />
            ))}

            {/* Flujos de entrada */}
            <tr><td colSpan={1 + cfSemanas.length} className="pt-4 pb-1 px-4 font-display font-semibold text-sm text-kratos-ok sticky left-0 bg-kratos-panel">▸ Flujos de entrada</td></tr>
            {entradas.map((g, gi) => (
              <Fragment key={gi}>
                <CalcRow label={g.grupo} pron={sumW(g.items, 'pron')} real={sumW(g.items, 'real')} tone="sub" />
                {g.items.map((it, ii) => (
                  <EditRow key={ii} label={it.k} item={it} indent onCell={(field, w, v) => updateItem('entradas', gi, ii, field, w, v)} />
                ))}
              </Fragment>
            ))}
            <CalcRow label="Total flujos de entrada" pron={entPron} real={entReal} tone="ok" big />

            {/* Flujos de salida */}
            <tr><td colSpan={1 + cfSemanas.length} className="pt-4 pb-1 px-4 font-display font-semibold text-sm text-kratos-danger sticky left-0 bg-kratos-panel">▸ Flujos de salida</td></tr>
            {salidas.map((g, gi) => (
              <Fragment key={gi}>
                <CalcRow label={g.grupo} pron={sumW(g.items, 'pron')} real={sumW(g.items, 'real')} tone="sub" />
                {g.items.map((it, ii) => (
                  <EditRow key={ii} label={it.k} item={it} indent onCell={(field, w, v) => updateItem('salidas', gi, ii, field, w, v)} />
                ))}
              </Fragment>
            ))}
            <CalcRow label="Total de gastos" pron={salPron} real={salReal} tone="danger" big />

            {/* Saldo final */}
            <CalcRow label="Saldo final" pron={finPron} real={finReal} big />
          </tbody>
        </table>
      </div>

      <p className="text-[11px] text-kratos-muted">
        Cada bloque <span className="font-semibold">Pron. · Real · Dif.</span> corresponde a una semana (número alineado con la gráfica de Finanzas).
        Las celdas de <span className="font-semibold">Pron.</span> y <span className="font-semibold">Real</span> se capturan a mano (clic para editar); <span className="font-semibold">Dif.</span> = Real − Pronóstico
        (<span className="text-kratos-ok">verde</span> a favor, <span className="text-kratos-danger">rojo</span> en contra). Subtotales, totales y saldo final se recalculan solos.
      </p>
    </div>
  )
}
