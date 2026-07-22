import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Banknote, TrendingUp, Truck, ShieldCheck, Users, Package, AlertTriangle, ArrowRight, Gauge, Activity, AlertOctagon, Target, Award, ChevronDown, ChevronRight, FileSpreadsheet } from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine, Cell, ComposedChart, Legend } from 'recharts'
import { alertas, crm, finanzas, flota, fmtMXN, usuarios, rrhh, calidad, checklists } from '../data/mockData'
import { creditoResumen } from '../data/creditoData'
import { controlCargas } from '../data/operacionesData'
import {
  ebitdaMensual, ebitdaPorProyecto, rentabilidadGruas, flujoFuturo,
  scoreEmpresa, riesgoGeneral, dependencias, utilizacionActivos, costoNoCalidad, usoActivosMensual, cashflow13s
} from '../data/iaData'
import KPILight from '../components/KPILight'
import ProgressBar from '../components/ProgressBar'
import BrainPanel from '../components/BrainPanel'
import UploadArchivoMes from '../components/UploadArchivoMes'

const tooltipCfg = { contentStyle: { background:'#FFFFFF', border:'1px solid #E5E3DC', borderRadius:0, fontSize:12 }, labelStyle:{ color:'#4A453F' } }

// Cashflow centrado en la semana actual: 3 atrás · actual · 2 adelante
const SEMANA_ACTUAL = 'S24'
const _idxSemActual = cashflow13s.findIndex(s => s.semana === SEMANA_ACTUAL)
const cashflowVentana = cashflow13s.slice(Math.max(0, _idxSemActual - 3), _idxSemActual + 3)

const HOY = new Date('2026-05-14')
const fmtFechaLarga = (d) => d.toLocaleDateString('es-MX', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }).replace(/ de /gi, ' ')

const MESES = [
  { key: 'Ene', label: 'Enero' },
  { key: 'Feb', label: 'Febrero' },
  { key: 'Mar', label: 'Marzo' },
  { key: 'Abr', label: 'Abril' },
  { key: 'May', label: 'Mayo' }
]

export default function DashboardCEO() {
  // ---- Selector de mes (acumulado Ene → mes elegido) ----
  const [mesIdx, setMesIdx] = useState(MESES.length - 1) // Mayo por defecto
  const plHastaMes     = finanzas.pl.slice(0, mesIdx + 1)
  const ebitdaHastaMes = ebitdaMensual.slice(0, mesIdx + 1)
  const plMes          = finanzas.pl[mesIdx]
  const usoMes         = usoActivosMensual[mesIdx]

  // ---- Cálculos base ----
  const ingresosYTD   = plHastaMes.reduce((s, p) => s + p.ingresos, 0)
  const utilidadYTD   = plHastaMes.reduce((s, p) => s + p.utilidad, 0)
  const margenYTD     = +((utilidadYTD / ingresosYTD) * 100).toFixed(1)
  const margenMes     = +((plMes.utilidad / plMes.ingresos) * 100).toFixed(1)
  const cajaTotal     = finanzas.saldoBancos.reduce((s, b) => s + b.saldo, 0)
  const cxcTotal      = finanzas.cxc.reduce((s, c) => s + c.monto, 0)
  const cxcVencida    = finanzas.cxc.filter(c => c.estado.startsWith('Vencida')).reduce((s, c) => s + c.monto, 0)
  const cxpTotal      = finanzas.cxp.reduce((s, c) => s + c.monto, 0)
  const pipelineTotal = crm.pipeline.reduce((s, p) => s + p.monto, 0)
  const ganadasMes    = crm.pipeline.find(p => p.etapa.includes('Ganadas')).monto
  const hitRate       = 34 // %
  const enObra        = flota.gruas.filter(g => g.estado === 'En obra').length
  const enMantto      = flota.gruas.filter(g => g.estado === 'Mantenimiento').length
  const utilFlota     = Math.round(enObra/flota.gruas.length*100)
  const credito       = creditoResumen()
  const cargasMes     = controlCargas.filter(c => c.fecha.startsWith('2026-05'))
  const ingresoOpMes  = cargasMes.reduce((s, c) => s + c.monto, 0)
  const ingresoFacturadoMes = cargasMes.filter(c => c.estado === 'Facturado').reduce((s, c) => s + c.monto, 0)
  const ingresoPendiente    = cargasMes.filter(c => c.estado !== 'Facturado').reduce((s, c) => s + c.monto, 0)
  const ncAbiertas    = calidad.noConformidades.filter(n => n.estado !== 'Cerrada').length
  const docsPorVencer = flota.gruas.filter(g => (new Date(g.docVence) - HOY) / 86400000 < 30).length
  const obligacionesFiscales = finanzas.cumplimientoFiscal.filter(o => o.estado !== 'Al día').length
  const cumplimientoGlobal = Math.round(['operaciones','finanzas','compras','marketing'].reduce((s,k)=>s+checklists[k].cumplimiento,0)/4)

  // Runway (caja / quema mensual aprox)
  const quemaMes      = 5300000 // promedio gastos mensuales
  const runwayMeses   = +(cajaTotal / quemaMes).toFixed(1)

  // EBITDA YTD (acumulado al mes elegido)
  const ebitdaYTD     = ebitdaHastaMes.reduce((s, m) => s + m.ebitda, 0)
  const margenEbitdaYTD = +((ebitdaYTD / ingresosYTD) * 100).toFixed(1)
  const ebitdaMes     = ebitdaMensual[mesIdx]
  const costoNCTotal  = costoNoCalidad.reduce((s, c) => s + c.monto, 0)

  // ---- Helpers de semáforo (umbrales) ----
  const stCajaRunway = runwayMeses >= 1.2 ? 'ok' : runwayMeses >= 0.8 ? 'warn' : 'danger'
  const stMargen     = margenMes >= 10 ? 'ok' : margenMes >= 5 ? 'warn' : 'danger'
  const stCXC        = cxcVencida === 0 ? 'ok' : cxcVencida < 1000000 ? 'warn' : 'danger'
  const stCXP        = cxpTotal < cajaTotal * 0.3 ? 'ok' : cxpTotal < cajaTotal * 0.5 ? 'warn' : 'danger'
  const stCredito    = credito.utilizacion < 50 ? 'ok' : credito.utilizacion < 75 ? 'warn' : 'danger'
  const stUtilFlota  = utilFlota >= 80 ? 'ok' : utilFlota >= 60 ? 'warn' : 'danger'
  const stMantto     = enMantto === 0 ? 'ok' : enMantto === 1 ? 'warn' : 'danger'
  const stDocsFlota  = docsPorVencer === 0 ? 'ok' : docsPorVencer <= 2 ? 'warn' : 'danger'
  const stCumpl      = cumplimientoGlobal >= 90 ? 'ok' : cumplimientoGlobal >= 80 ? 'warn' : 'danger'
  const stHitRate    = hitRate >= 35 ? 'ok' : hitRate >= 25 ? 'warn' : 'danger'
  const stPipeline   = pipelineTotal >= 20000000 ? 'ok' : pipelineTotal >= 12000000 ? 'warn' : 'danger'
  const stGanadas    = ganadasMes >= 2500000 ? 'ok' : ganadasMes >= 1500000 ? 'warn' : 'danger'
  const stFiscal     = obligacionesFiscales === 0 ? 'ok' : obligacionesFiscales <= 2 ? 'warn' : 'danger'
  const stNC         = ncAbiertas === 0 ? 'ok' : ncAbiertas <= 3 ? 'warn' : 'danger'
  const stAusentismo = rrhh.ausentismoPct <= 3 ? 'ok' : rrhh.ausentismoPct <= 5 ? 'warn' : 'danger'
  const stRotacion   = rrhh.rotacionPct <= 8 ? 'ok' : rrhh.rotacionPct <= 12 ? 'warn' : 'danger'

  // ---- KPIs estratégicos de Finanzas (CEO) ----
  // CxC sale de datos reales; el resto son estimaciones (el mock no tiene valor de activos,
  // calendario de deuda ni exposición cambiaria detallada).
  const rendimientoUnidad = 43   // % mensual = ingreso renta / valor del equipo
  const dsoDias           = 55    // días de cobranza
  const dioDias           = 10    // días de inventario (refacciones)
  const dpoDias           = 40    // días de pago a proveedores
  const cicloEfectivo     = dsoDias + dioDias - dpoDias // CCC en días
  const dscr              = 1.8   // x  EBITDA / servicio de deuda
  const margenBruto       = 32    // % margen bruto consolidado
  const exposicionUSD     = 18    // % de ingresos expuestos al dólar

  // ---- KPIs reformulados de Operación ----
  const dispoFlotaPct = Math.round((flota.gruas.length - enMantto) / flota.gruas.length * 100) // disponibles / total
  // OEE-Obra = Disponibilidad × Rendimiento × Calidad (estimado; meta por tipo de equipo)
  const oeeDisp = 88   // % horas operables / horas contratadas en sitio
  const oeeRend = 92   // % producción real / nominal
  const oeeCal  = 97   // % horas sin incidencia atribuible a Kratos
  const oeeObra = Math.round((oeeDisp / 100) * (oeeRend / 100) * (oeeCal / 100) * 100)
  const costoManttoMes     = 64000 // costo de mantenimiento del mes (estimado)
  const costoManttoPct     = Math.round((costoManttoMes / ingresoOpMes) * 100)
  const mantPreventivo = 62, mantCorrectivo = 38 // mezcla %
  const stDispoFlota = dispoFlotaPct >= 90 ? 'ok' : dispoFlotaPct >= 80 ? 'warn' : 'danger'
  const stOEE        = oeeObra >= 75 ? 'ok' : oeeObra >= 60 ? 'warn' : 'danger'
  const stCostoMantto = costoManttoPct < 10 ? 'ok' : costoManttoPct <= 12 ? 'warn' : 'danger'

  // ---- KPIs reformulados de Comercial ----
  const coberturaPipeline = (pipelineTotal / 3000000).toFixed(1) // veces que el embudo cubre la meta de venta mensual
  const backlogContratos  = 14200000 // contratos firmados por ejecutar (estimado)
  const mesesAsegurados   = backlogContratos / plMes.ingresos
  const concentracionTop3 = 52 // % de ingreso de los 3 clientes principales (estimado)
  const stBacklog        = mesesAsegurados >= 2 ? 'ok' : mesesAsegurados >= 1 ? 'warn' : 'danger'
  const stConcentracion  = concentracionTop3 < 40 ? 'ok' : concentracionTop3 <= 55 ? 'warn' : 'danger'

  // ---- Datos auxiliares para los desgloses (drill-down de cada KPI) ----
  const rentaMensualFlota = Math.round(rentabilidadGruas.reduce((s, g) => s + g.ingresoYTD, 0) / 5)
  const valorFlotaEstim   = Math.round(rentaMensualFlota / (rendimientoUnidad / 100)) // valor de flota implícito al rendimiento
  const servicioDeudaMes  = Math.round(ebitdaMes.ebitda / dscr)
  const docsVencer        = flota.gruas.filter(g => { const d = (new Date(g.docVence) - HOY) / 86400000; return d >= 0 && d < 30 })
  const flotaEnObra       = flota.gruas.filter(g => g.estado === 'En obra').length
  const flotaEnPatio      = flota.gruas.filter(g => g.estado === 'En patio').length
  const flotaEnMantto     = flota.gruas.filter(g => g.estado === 'Mantenimiento').length

  const stCxCTotal   = cxcVencida === 0 ? 'ok' : cxcVencida < 2000000 ? 'warn' : 'danger'
  const stRendim     = rendimientoUnidad >= 2 ? 'ok' : rendimientoUnidad >= 1.5 ? 'warn' : 'danger'
  const stCiclo      = cicloEfectivo <= 30 ? 'ok' : cicloEfectivo <= 45 ? 'warn' : 'danger'
  const stDSCR       = dscr >= 1.5 ? 'ok' : dscr >= 1.2 ? 'warn' : 'danger'
  const stMargenBr   = margenBruto >= 30 ? 'ok' : margenBruto >= 22 ? 'warn' : 'danger'

  // Conteo de estados (semáforo global)
  const allStatus = [stCajaRunway, stMargen, stCXC, stCXP, stCredito, stUtilFlota, stMantto, stDocsFlota, stCumpl, stHitRate, stPipeline, stGanadas, stFiscal, stNC, stAusentismo, stRotacion]
  const verdes    = allStatus.filter(s => s === 'ok').length
  const amarillos = allStatus.filter(s => s === 'warn').length
  const rojos     = allStatus.filter(s => s === 'danger').length

  const SECCIONES = [
    {
      label: 'Finanzas', icon: Banknote, path: '/finanzas',
      kpis: [
        { label: 'CxC',                          value: fmtMXN(cxcTotal),       meta: 'Vencida $0',     status: stCxCTotal, delta: -2,  vs: 'mes anterior', deltaLabel: `${fmtMXN(cxcVencida)} vencida`,
          desglose: { titulo: 'Cartera por cliente', filas: finanzas.cxc.map(c => ({ k: `${c.cliente} · ${c.estado}`, v: fmtMXN(c.monto), tone: c.estado.startsWith('Vencida') ? 'danger' : undefined })).concat([{ k: 'Total CxC', v: fmtMXN(cxcTotal), fuerte: true }]), nota: `${fmtMXN(cxcVencida)} vencida concentrada en 2 clientes (Grupo Carso y OHL México).` } },
        { label: 'Rendimiento por unidad',       value: `${rendimientoUnidad}%`, meta: '≥ 2% mensual',  status: stRendim,   delta: 4,   vs: 'trimestre', deltaLabel: 'renta / valor equipo',
          info: 'Ingreso mensual de renta / valor del equipo. Mide cuánto produce cada peso invertido en fierro. Permite decidir qué unidades recomprar, cuáles vender usadas y cuáles nunca debieron entrar a la flota. Benchmark sano: 2.5–4% mensual sobre valor de adquisición.',
          desglose: { titulo: 'Cómo se calcula', filas: [{ k: 'Ingreso renta / mes', v: fmtMXN(rentaMensualFlota) }, { k: 'Valor de flota (estim.)', v: fmtMXN(valorFlotaEstim) }, { k: 'Rendimiento mensual', v: `${rendimientoUnidad}%`, tone: 'ok', fuerte: true }], nota: 'Unidad líder: G009/G010 (SANY 100t, ROI ~28%). Rezagada: G004 (utilización 28%, ROI negativo) — candidata a venta.' } },
        { label: 'Ciclo de conversión de efectivo', value: `${cicloEfectivo} d`, meta: '≤ 30 días',     status: stCiclo,    delta: -3,  vs: 'mes anterior', deltaLabel: `cobro ${dsoDias} · inv ${dioDias} · pago ${dpoDias}`, invertir: true,
          info: 'DSO + DIO − DPO (días de cobranza + días de inventario − días de pago a proveedores). En venta de maquinaria, el inventario importado puede tardar 90–180 días en rotar y los clientes de construcción pagan lento. Si el ciclo se estira, el crecimiento se come la caja aunque haya utilidad en papel.',
          desglose: { titulo: 'Componentes (días)', filas: [{ k: 'Cobranza (DSO)', v: `+${dsoDias} d` }, { k: 'Inventario (DIO)', v: `+${dioDias} d` }, { k: 'Pago a proveedores (DPO)', v: `−${dpoDias} d`, tone: 'ok' }, { k: 'Ciclo neto', v: `${cicloEfectivo} d`, tone: 'ok', fuerte: true }], nota: 'Cada día de cobranza que se reduce libera caja directamente. La palanca rápida está en DSO (55 d es alto).' } },
        { label: 'Margen bruto por línea',       value: `${margenBruto}%`,       meta: '≥ 30%',         status: stMargenBr, delta: 2,   vs: 'trimestre', deltaLabel: `exposición USD ${exposicionUSD}%`,
          info: 'Margen bruto por línea de negocio con exposición cambiaria. Venta, renta, servicio y transporte tienen márgenes radicalmente distintos, y el costo de adquisición está en USD mientras el ingreso está en MXN. Sin esta separación, la venta de equipo (margen bajo, volumen alto) maquilla la rentabilidad real.',
          desglose: { titulo: 'Margen por línea de negocio', filas: [{ k: 'Renta de equipo', v: '42%', tone: 'ok' }, { k: 'Servicio y mantenimiento', v: '35%', tone: 'ok' }, { k: 'Transporte especializado', v: '22%' }, { k: 'Venta de equipo', v: '12%', tone: 'warn' }, { k: 'Consolidado', v: `${margenBruto}%`, fuerte: true }], nota: `Exposición USD: ${exposicionUSD}% de ingresos. La venta (margen bajo, volumen alto) diluye el consolidado; sin separar líneas, oculta la rentabilidad real de la renta.` } }
      ]
    },
    {
      label: 'Operación', icon: Truck, path: '/operaciones',
      kpis: [
        { label: 'Utilización flota',   value: `${utilFlota}%`,        meta: '≥ 80%',           status: stUtilFlota,  delta: 5.2, vs: 'mes anterior', deltaLabel: `${enObra}/${flota.gruas.length} grúas`,
          info: 'Horas rentadas / horas disponibles por unidad. Es el indicador madre del negocio de renta: una grúa parada es capital muerto que sigue pagando financiamiento, seguro y depreciación. Meta típica del sector: 70–80%.',
          desglose: { titulo: 'Estado de la flota', filas: [{ k: 'En obra (facturando)', v: `${flotaEnObra} unidades`, tone: 'ok' }, { k: 'En patio (disponible)', v: `${flotaEnPatio} unidades`, tone: 'warn' }, { k: 'En mantenimiento', v: `${flotaEnMantto} unidad`, tone: 'warn' }, { k: 'Utilización', v: `${utilFlota}%`, fuerte: true }], nota: 'Las unidades en patio son capacidad ociosa: producen $0 pero siguen pagando seguro y depreciación.' } },
        { label: 'Disponibilidad de flota', value: `${dispoFlotaPct}%`, meta: '≥ 90%',           status: stDispoFlota, delta: -2,  vs: 'mes anterior', deltaLabel: 'G008 · 4 días en taller',
          info: 'Unidades disponibles / flota total. El conteo de unidades en taller esconde lo importante: cuánto tiempo llevan fuera y cuánto cuesta el paro. Con la flota actual, una sola unidad parada equivale a ~14% de la capacidad. El porcentaje comunica la gravedad; el conteo no.',
          desglose: { titulo: 'Disponibilidad', filas: [{ k: 'Flota total', v: `${flota.gruas.length} unidades` }, { k: 'Disponibles', v: `${flota.gruas.length - flotaEnMantto} unidades`, tone: 'ok' }, { k: 'En taller', v: `${flotaEnMantto} (G008 · 4 días)`, tone: 'warn' }, { k: 'Disponibilidad', v: `${dispoFlotaPct}%`, fuerte: true }], nota: '1 unidad parada ≈ 14% de la capacidad. G008 lleva 4 días: cada día fuera es renta no facturada.' } },
        { label: 'Docs flota por vencer', value: docsPorVencer,        meta: '0 (30 días)',     status: stDocsFlota,  delta: -1,  vs: 'semana', deltaLabel: 'AG-08 monitorea', invertir: true,
          info: 'Permisos SCT, pólizas y verificaciones próximos a vencer en los siguientes 30 días. En grúas y carga pesada, una unidad sin papel vigente es una unidad parada — no por fierro, sino por documento.',
          desglose: { titulo: 'Documentos próximos a vencer (30 días)', filas: docsVencer.map(g => ({ k: `${g.eco} · ${g.marca} ${g.capacidad}`, v: g.docVence, tone: 'warn' })), nota: 'El agente AG-08 monitorea estas fechas y alerta con anticipación para evitar paros por documentación.' } },
        { label: 'OEE-Obra',            value: `${oeeObra}%`,           meta: '≥ 75% (por equipo)', status: stOEE,      delta: 2, vs: 'mes anterior', deltaLabel: `Disp ${oeeDisp}% · Rend ${oeeRend}% · Cal ${oeeCal}%`,
          info: 'Desempeño en obra = Disponibilidad × Rendimiento × Calidad. Un solo número de "desempeño" no se puede mejorar porque no se puede descomponer: cuando baja, nadie sabe si la máquina estuvo caída, rindió poco o causó un incidente. OEE-Obra separa la pérdida en tres factores atacables con Kaizen: Disponibilidad (horas operables / horas contratadas en sitio), Rendimiento (producción real / nominal, donde haya tasa medible) y Calidad (horas sin incidencia atribuible a Kratos). El producto de los tres es la tarjeta; los tres factores son el drill-down. Meta fijada por tipo de equipo, no importada de manufactura — la flota opera a la intemperie, no en una línea controlada. Un solo dato avisa que algo falla en obra; OEE-Obra dice qué falla y dónde intervenir.',
          desglose: { titulo: 'Factores (drill-down)', filas: [{ k: 'Disponibilidad', v: `${oeeDisp}%` }, { k: 'Rendimiento', v: `${oeeRend}%` }, { k: 'Calidad', v: `${oeeCal}%`, tone: 'ok' }, { k: 'OEE-Obra (producto)', v: `${oeeObra}%`, tone: 'ok', fuerte: true }], nota: `${oeeDisp}% × ${oeeRend}% × ${oeeCal}% = ${oeeObra}%. El factor más bajo es donde se interviene primero con Kaizen.` } }
      ]
    },
    {
      label: 'Comercial', icon: TrendingUp, path: '/crm',
      kpis: [
        { label: 'Oportunidades activas', value: fmtMXN(pipelineTotal), meta: '> $20M',          status: stPipeline,   delta: 18,  vs: 'mes anterior', deltaLabel: `36 oportunidades · ${coberturaPipeline}x meta mensual`,
          info: 'Valor total del embudo de ventas vigente. Como cobertura mide cuántas veces el pipeline cubre la meta de venta mensual (~8x aquí), nivel sano cuando el ciclo de venta es largo, como lo es en maquinaria.',
          desglose: { titulo: 'Embudo por etapa', filas: crm.pipeline.map(p => ({ k: `${p.etapa} (${p.deals} deals)`, v: fmtMXN(p.monto), tone: p.etapa.includes('Ganadas') ? 'ok' : undefined })).concat([{ k: 'Total pipeline', v: fmtMXN(pipelineTotal), fuerte: true }]), nota: `Cobertura ${coberturaPipeline}x la meta de venta mensual. En maquinaria el ciclo es largo (90–180 días), por eso conviene un embudo amplio.` } },
        { label: 'Ventas cerradas mes',  value: fmtMXN(ganadasMes),   meta: '> $2.5M',          status: stGanadas,    delta: 22,  vs: 'mes anterior', deltaLabel: '3 oportunidades',
          info: 'Monto de oportunidades ganadas y firmadas en el mes. Es el resultado comercial real del periodo, no el embudo. Meta > $2.5M mensuales.',
          desglose: { titulo: 'Cierres del mes', filas: [{ k: 'Oportunidades ganadas', v: '3' }, { k: 'Ticket promedio', v: fmtMXN(Math.round(ganadasMes / 3)) }, { k: 'Total cerrado', v: fmtMXN(ganadasMes), tone: 'ok', fuerte: true }], nota: 'Resultado real del periodo (firmado), distinto del pipeline que aún no se cierra.' } },
        { label: 'Contratos por ejecutar', value: fmtMXN(backlogContratos), meta: '≥ 2 meses ingreso', status: stBacklog, delta: 12, vs: 'mes anterior', deltaLabel: `≈ ${mesesAsegurados.toFixed(1)} meses de ingreso asegurados`,
          info: 'La venta firmada que aún no se entrega ni se factura: equipos vendidos pendientes de importar y rentas contratadas a futuro. En maquinaria, donde entre la firma y la entrega pasan 90–180 días, dice cuántos meses de ingreso ya están asegurados. Es el puente entre Comercial y Operación: lo que esta fila promete, la otra lo entrega. Meta ≥ 2 meses de ingreso.',
          desglose: { titulo: 'Backlog firmado', filas: [{ k: 'Equipos vendidos por importar', v: fmtMXN(8600000) }, { k: 'Rentas contratadas a futuro', v: fmtMXN(5600000) }, { k: 'Total por ejecutar', v: fmtMXN(backlogContratos), tone: 'ok', fuerte: true }], nota: `≈ ${mesesAsegurados.toFixed(1)} meses de ingreso ya asegurados. Es la carga de trabajo que Operación debe entregar.` } },
        { label: 'Concentración de clientes', value: `${concentracionTop3}%`, meta: '< 40%',     status: stConcentracion, delta: -3, vs: 'trimestre', deltaLabel: '3 clientes principales', invertir: true,
          info: 'Ingreso de los 3 clientes principales / ingreso total. Cuando pocos clientes sostienen el ingreso, un retraso de pago se convierte en crisis de caja — exactamente lo que explica una cartera vencida concentrada y un runway corto. Meta < 40%.',
          desglose: { titulo: 'Top 3 clientes (% de ingreso)', filas: [{ k: 'ICA Fluor', v: '22%', tone: 'warn' }, { k: 'Grupo Carso', v: '18%', tone: 'warn' }, { k: 'Constructora Tapachula', v: '12%' }, { k: 'Concentración top 3', v: `${concentracionTop3}%`, tone: 'warn', fuerte: true }], nota: 'Meta < 40%. La cartera vencida está concentrada justo en estos clientes (Carso + OHL): un retraso se vuelve crisis de caja.' } }
      ]
    }
  ]

  return (
    <div className="space-y-7">
      {/* Header compacto con semáforo global */}
      <section className="panel">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6">
          <div>
            <div className="flex items-baseline gap-3 flex-wrap">
              <h1 className="font-display text-3xl font-semibold text-kratos-ink tracking-tight">Dashboard CEO</h1>
              <span className="text-sm text-kratos-muted capitalize">· {fmtFechaLarga(HOY)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="label-mono">Mes</span>
            <div className="relative">
              <select
                value={mesIdx}
                onChange={(e) => setMesIdx(Number(e.target.value))}
                className="appearance-none bg-kratos-panel-2 border border-kratos-border rounded-none pl-4 pr-10 py-2.5 text-sm font-medium text-kratos-ink cursor-pointer hover:bg-white focus:outline-none focus:ring-2 focus:ring-kratos-border transition"
              >
                {MESES.map((m, i) => <option key={m.key} value={i}>{m.label} 2026</option>)}
              </select>
              <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-kratos-muted pointer-events-none"/>
            </div>
          </div>
        </div>
      </section>

      {/* Subir archivo del mes (drag & drop) */}
      <UploadArchivoMes mesLabel={`de ${MESES[mesIdx].label} 2026`}/>

      {/* Resultados YTD strip */}
      <section className="panel">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 divide-x divide-kratos-border">
          <div className="px-6 py-5">
            <div className="label-mono">Ingresos YTD</div>
            <div className="font-display text-2xl font-semibold text-kratos-ink mt-1 tabular-nums">{fmtMXN(ingresosYTD)}</div>
            <div className="text-[11px] text-kratos-ok mt-1">↑ +12.4% vs. 2025</div>
          </div>
          <div className="px-6 py-5">
            <div className="label-mono">Ventas {MESES[mesIdx].label}</div>
            <div className="font-display text-2xl font-semibold text-kratos-ink mt-1 tabular-nums">{fmtMXN(plMes.ingresos)}</div>
            <FlechaMes actual={plMes.ingresos} anterior={mesIdx > 0 ? finanzas.pl[mesIdx - 1].ingresos : null} label={mesIdx > 0 ? MESES[mesIdx - 1].label : null}/>
          </div>
          <div className="px-6 py-5">
            <div className="label-mono">Utilidad de operación {MESES[mesIdx].label}</div>
            <div className={`font-display text-2xl font-semibold mt-1 tabular-nums ${plMes.utilidad >= 0 ? 'text-kratos-ink' : 'text-kratos-danger'}`}>{fmtMXN(plMes.utilidad)}</div>
            <div className="text-[11px] text-kratos-subtle mt-1">Margen {margenMes}%</div>
            <FlechaMes actual={plMes.utilidad} anterior={mesIdx > 0 ? finanzas.pl[mesIdx - 1].utilidad : null} label={mesIdx > 0 ? MESES[mesIdx - 1].label : null}/>
          </div>
          <div className="px-6 py-5">
            <div className="label-mono">EBITDA {MESES[mesIdx].label}</div>
            <div className={`font-display text-2xl font-semibold mt-1 tabular-nums ${ebitdaMes.ebitda >= 0 ? 'text-kratos-ink' : 'text-kratos-danger'}`}>{fmtMXN(ebitdaMes.ebitda)}</div>
            <div className="text-[11px] text-kratos-subtle mt-1">Margen {ebitdaMes.margen}%</div>
            <FlechaMes actual={ebitdaMes.ebitda} anterior={mesIdx > 0 ? ebitdaMensual[mesIdx - 1].ebitda : null} label={mesIdx > 0 ? MESES[mesIdx - 1].label : null}/>
          </div>
          <div className="px-6 py-5">
            <div className="label-mono">% de uso de activos {MESES[mesIdx].label}</div>
            <div className={`font-display text-2xl font-semibold mt-1 tabular-nums ${usoMes.uso >= 80 ? 'text-kratos-ok' : usoMes.uso >= 60 ? 'text-kratos-warn' : 'text-kratos-danger'}`}>{usoMes.uso}%</div>
            <div className="text-[11px] text-kratos-subtle mt-1">{usoMes.gruasActivas}/{usoMes.gruasTotal} grúas activas</div>
          </div>
        </div>
      </section>

      {/* Secciones de semáforo por dominio */}
      {SECCIONES.map(sec => {
        const Icon = sec.icon
        const seccionStatus = sec.kpis.some(k => k.status === 'danger') ? 'danger'
                           : sec.kpis.some(k => k.status === 'warn')   ? 'warn'
                           : 'ok'
        return (
          <section key={sec.label}>
            <div className="flex items-center justify-between mb-3">
              <Link to={sec.path} className="flex items-center gap-2.5 group">
                <Icon size={16} className="text-kratos-muted"/>
                <h2 className="section-title">{sec.label}</h2>
                <span className={`w-2 h-2 rounded-full ${seccionStatus === 'ok' ? 'bg-kratos-ok' : seccionStatus === 'warn' ? 'bg-kratos-warn' : 'bg-kratos-danger'}`}/>
                <ArrowRight size={13} className="text-kratos-muted group-hover:text-kratos-ink transition-colors ml-1"/>
              </Link>
              <span className="label-mono">{sec.kpis.length} indicador{sec.kpis.length > 1 ? 'es' : ''}</span>
            </div>
            <div className={`grid grid-cols-2 md:grid-cols-3 ${sec.kpis.length >= 5 ? 'xl:grid-cols-5' : sec.kpis.length === 4 ? 'xl:grid-cols-4' : 'xl:grid-cols-' + sec.kpis.length} gap-3`}>
              {sec.kpis.map((k, i) => <KPILight key={i} {...k} to={k.to || sec.path} toLabel={k.toLabel || `Ver detalle en ${sec.label}`}/>)}
            </div>
          </section>
        )
      })}

      {/* Rentabilidad por grúa */}
      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="section-title flex items-center gap-2"><Truck size={16} className="text-kratos-muted"/> Rentabilidad por grúa</h2>
          <span className="label-mono">Identifica unidades que producen vs. lastre</span>
        </div>
        <div className="panel overflow-hidden">
          <table className="w-full">
            <thead><tr>
              <th className="table-th">Eco</th>
              <th className="table-th text-right">Ingreso YTD</th>
              <th className="table-th">Margen</th>
              <th className="table-th">Horas fact.</th>
              <th className="table-th text-right">Costo op.</th>
              <th className="table-th text-right">Mantto</th>
              <th className="table-th">ROI</th>
              <th className="table-th">Utilización</th>
              <th className="table-th">Recomendación</th>
            </tr></thead>
            <tbody>
              {rentabilidadGruas.map(g => (
                <tr key={g.eco} className="table-row">
                  <td className="table-td font-mono font-semibold">{g.eco}</td>
                  <td className="table-td text-right font-mono">{fmtMXN(g.ingresoYTD)}</td>
                  <td className="table-td"><span className={g.semaforo === 'ok' ? 'chip-ok' : g.semaforo === 'warn' ? 'chip-warn' : 'chip-danger'}>{g.margenPct}%</span></td>
                  <td className="table-td font-mono text-sm">{g.horasFact} h</td>
                  <td className="table-td text-right font-mono text-sm">{fmtMXN(g.costoOp)}</td>
                  <td className="table-td text-right font-mono text-sm">{fmtMXN(g.mantto)}</td>
                  <td className="table-td"><span className={`font-mono text-xs ${g.roi >= 15 ? 'text-kratos-ok' : g.roi >= 5 ? 'text-kratos-warn' : 'text-kratos-danger'}`}>{g.roi}%</span></td>
                  <td className="table-td">
                    <div className="flex items-center gap-2 min-w-[100px]">
                      <span className="font-mono text-xs w-9">{g.utilizacion}%</span>
                      <ProgressBar value={g.utilizacion} accent={g.utilizacion >= 80 ? 'ok' : g.utilizacion >= 60 ? 'warn' : 'red'} showValue={false} className="flex-1"/>
                    </div>
                  </td>
                  <td className="table-td text-xs">
                    {g.semaforo === 'ok' && <span className="text-kratos-ok">Mantener / replicar</span>}
                    {g.semaforo === 'warn' && <span className="text-kratos-warn">Vigilar mes</span>}
                    {g.semaforo === 'danger' && <span className="text-kratos-danger">Evaluar venta</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Utilización real de activos */}
      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="section-title flex items-center gap-2"><Activity size={16} className="text-kratos-muted"/> Utilización real de activos</h2>
          <span className="label-mono">No solo 5/7 trabajando — horas reales</span>
        </div>
        <div className="panel overflow-hidden">
          <table className="w-full">
            <thead><tr>
              <th className="table-th">Eco</th>
              <th className="table-th text-right">Reales</th>
              <th className="table-th text-right">Muertas</th>
              <th className="table-th text-right">Improd.</th>
              <th className="table-th text-right">Traslado</th>
              <th className="table-th text-right">Facturables</th>
              <th className="table-th">Eficiencia</th>
            </tr></thead>
            <tbody>
              {utilizacionActivos.map(u => {
                const efic = Math.round((u.facturables / Math.max(u.horasReales + u.muertas + u.improd + u.traslado, 1)) * 100)
                return (
                  <tr key={u.eco} className="table-row">
                    <td className="table-td font-mono font-semibold">{u.eco}</td>
                    <td className="table-td text-right font-mono">{u.horasReales}</td>
                    <td className="table-td text-right font-mono text-kratos-warn">{u.muertas}</td>
                    <td className="table-td text-right font-mono text-kratos-warn">{u.improd}</td>
                    <td className="table-td text-right font-mono text-kratos-subtle">{u.traslado}</td>
                    <td className="table-td text-right font-mono text-kratos-ok font-semibold">{u.facturables}</td>
                    <td className="table-td">
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <span className="font-mono text-xs w-9">{efic}%</span>
                        <ProgressBar value={efic} accent={efic >= 70 ? 'ok' : efic >= 50 ? 'warn' : 'red'} showValue={false} className="flex-1"/>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Cashflow (movido desde Finanzas) */}
      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="section-title flex items-center gap-2"><Banknote size={16} className="text-kratos-muted"/> Cashflow</h2>
          <span className="label-mono">Flujo de caja semanal proyectado</span>
        </div>
        <div className="space-y-5">
          {/* Acceso al formato completo de forecast cashflow */}
          <Link to="/finanzas/formato-cashflow"
            className="panel panel-hover p-4 flex items-center justify-between gap-4 group">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 grid place-items-center bg-kratos-info-soft text-kratos-info shrink-0"><FileSpreadsheet size={18}/></span>
              <div>
                <div className="font-display font-semibold text-kratos-ink leading-tight">Ir a Formato Cashflow</div>
                <div className="text-[12px] text-kratos-muted">Forecast semanal completo · Pronóstico vs. Real por concepto</div>
              </div>
            </div>
            <span className="btn-primary shrink-0 group-hover:bg-black">IR A FORMATO CASHFLOW <ChevronRight size={15}/></span>
          </Link>

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
                  <Tooltip {...tooltipCfg} formatter={(v)=> fmtMXN(v)}/>
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
                  <div key={s.semana} className={`text-center py-2 rounded-none text-[10px] font-mono ${esActual ? 'ring-2 ring-kratos-info bg-kratos-info-soft text-kratos-info font-semibold' : s.tension === 'alta' ? 'bg-kratos-danger-soft text-kratos-danger' : s.tension === 'media' ? 'bg-kratos-warn-soft text-kratos-warn' : 'bg-kratos-ok-soft text-kratos-ok'}`}>
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
              <div className="text-[11px] text-kratos-muted mt-1">{cargasMes.filter(c => c.estado === 'Facturado').length} cargas</div>
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
          <BrainPanel tema="flujo de caja semanal proyectado" insights={[
            { tag: 'Proyección', tone: 'warn', titulo: 'Caja toca piso en 3 semanas', prediccion: 'Con el patrón actual de entradas vs. salidas, en la semana S27 la caja proyectada cae a ~$1.1M, su nivel más bajo del trimestre, por la concentración de salidas en semanas de tensión alta.', accion: 'Adelantar 2 cobranzas de mayo y diferir pagos no críticos a S28.', confianza: 81 },
            { tag: 'Oportunidad', tone: 'info', titulo: 'Ingreso pendiente recuperable', prediccion: `Si se factura el ingreso pendiente (${fmtMXN(ingresoPendiente)} sin OC) en las próximas 2 semanas, el saldo proyectado de S26–S27 sube ~18% y elimina la zona de tensión.`, accion: 'Gestionar OC con clientes pendientes antes del cierre de mes.', confianza: 76 },
          ]}/>
        </div>
      </section>

      {/* Alertas críticas (única sección no-KPI) */}
      {alertas.filter(a => a.sev === 'danger').length > 0 && (
        <section className="panel">
          <header className="px-5 py-4 border-b border-kratos-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-kratos-danger"/>
              <h3 className="section-title">Alertas críticas que requieren acción inmediata</h3>
            </div>
            <span className="chip-danger">{alertas.filter(a => a.sev === 'danger').length}</span>
          </header>
          <ul className="divide-y divide-kratos-border">
            {alertas.filter(a => a.sev === 'danger').map((a, i) => (
              <li key={i} className="px-5 py-3.5 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-kratos-danger shrink-0 pulse-dot"/>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-kratos-ink font-medium">{a.mensaje}</div>
                  <div className="text-[11px] text-kratos-muted mt-0.5 flex items-center gap-1.5">
                    <span>{a.area}</span><span>·</span><span>{a.hora}</span><span className="ml-auto font-mono">{a.agente}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

function FlechaMes({ actual, anterior, label }) {
  if (anterior == null) return <div className="text-[11px] text-kratos-subtle mt-0.5">Inicio de año</div>
  const sube = actual >= anterior
  const pct = Math.abs(+(((actual - anterior) / Math.abs(anterior)) * 100).toFixed(1))
  return (
    <div className={`text-[11px] mt-0.5 ${sube ? 'text-kratos-ok' : 'text-kratos-danger'}`}>
      {sube ? '↑' : '↓'} {pct}% vs. {label}
    </div>
  )
}

function SemaforoCount({ label, value, color }) {
  const styles = {
    ok:     { bg: 'bg-kratos-ok-soft',     dot: 'bg-kratos-ok',     text: 'text-kratos-ok'     },
    warn:   { bg: 'bg-kratos-warn-soft',   dot: 'bg-kratos-warn',   text: 'text-kratos-warn'   },
    danger: { bg: 'bg-kratos-danger-soft', dot: 'bg-kratos-danger', text: 'text-kratos-danger' }
  }
  const s = styles[color]
  return (
    <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-none border ${s.bg} border-kratos-border`}>
      <span className={`w-3 h-3 rounded-full ${s.dot}`}/>
      <div>
        <div className={`font-display text-2xl font-semibold leading-none tabular-nums ${s.text}`}>{value}</div>
        <div className="text-[10px] uppercase tracking-wider text-kratos-muted mt-0.5">{label}</div>
      </div>
    </div>
  )
}
