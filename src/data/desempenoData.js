// ============================================================
//  KRATOS · Desempeño operativo
//  OEE-Obra (Disponibilidad × Rendimiento × Calidad) + OTIF (On Time / In Full)
//  Réplica del KPI OEE-Obra del Dashboard CEO con todos sus desgloses,
//  más OTIF como segundo indicador madre de servicio en obra.
// ============================================================

// ---- OEE-OBRA (global, idéntico al Dashboard CEO: 88 × 92 × 97 = 79%) ----
export const oeeObra = {
  disp: 88, rend: 92, cal: 97, meta: 75, deltaMes: 2,
}

// Los 3 factores atacables con Kaizen (drill-down de la tarjeta)
export const oeeFactores = [
  { key: 'disp', label: 'Disponibilidad', valor: 88, meta: 90, icon: 'Clock',
    formula: 'Horas operables / horas contratadas en sitio',
    perdida: 'Paros por mantenimiento, espera de OC y traslados entre obras',
    tone: 'warn' },
  { key: 'rend', label: 'Rendimiento', valor: 92, meta: 90, icon: 'Gauge',
    formula: 'Producción real / nominal (ciclos de izaje por hora)',
    perdida: 'Velocidad reducida y esperas de señalero/maniobrista en sitio',
    tone: 'ok' },
  { key: 'cal', label: 'Calidad', valor: 97, meta: 98, icon: 'ShieldCheck',
    formula: 'Horas sin incidencia atribuible a Kratos',
    perdida: 'Reposicionamientos y retrabajos por plan de izaje',
    tone: 'ok' },
]

// OEE por unidad (drill-down accionable: dónde está el lastre)
export const oeePorUnidad = [
  { eco: 'G009', tipo: 'SANY STC1000 100t', disp: 95, rend: 96, cal: 99, obra: 'Mota Engil · Tapachula' },
  { eco: 'G010', tipo: 'SANY STC1000 100t', disp: 94, rend: 95, cal: 98, obra: 'Mota Engil · Tapachula' },
  { eco: 'G003', tipo: 'XCMG QY70 70t',     disp: 90, rend: 93, cal: 98, obra: 'C. Tapachula' },
  { eco: 'G005', tipo: 'XCMG QY50 50t',     disp: 89, rend: 92, cal: 97, obra: 'C. Tapachula' },
  { eco: 'G014', tipo: 'XCMG QY70 70t',     disp: 88, rend: 90, cal: 96, obra: 'C. Tapachula' },
  { eco: 'G004', tipo: 'XCMG QY25 25t',     disp: 74, rend: 87, cal: 94, obra: 'OHL · CDMX (subutilizada)' },
]

// Dónde se pierde el OEE (horas perdidas del mes, por factor)
export const oeePerdidas = [
  { factor: 'Disponibilidad', causa: 'Mantenimiento correctivo (G004, G008)',     horas: 38, tone: 'warn' },
  { factor: 'Disponibilidad', causa: 'Espera de OC para movilizar la unidad',     horas: 22, tone: 'danger' },
  { factor: 'Disponibilidad', causa: 'Traslados entre obras (sin facturar)',      horas: 18, tone: 'muted' },
  { factor: 'Rendimiento',    causa: 'Esperas de señalero / maniobrista en sitio', horas: 26, tone: 'warn' },
  { factor: 'Rendimiento',    causa: 'Viento — izaje pausado por seguridad',      horas: 14, tone: 'muted' },
  { factor: 'Calidad',        causa: 'Reposicionamiento por plan de izaje',       horas: 9,  tone: 'muted' },
]

// ---- OTIF (On Time / In Full) ----
// OTIF = On Time × In Full = 91% × 95% = 86%
export const otif = {
  onTime: 91, inFull: 95, meta: 90, deltaMes: 3, entregas: 38,
}

// OTIF por cliente (entregas = maniobras del periodo)
export const otifPorCliente = [
  { cliente: 'Constructora Tapachula', entregas: 18, onTime: 94, inFull: 97 },
  { cliente: 'Mota Engil',             entregas: 10, onTime: 92, inFull: 96 },
  { cliente: 'Grupo México Minería',   entregas: 3,  onTime: 90, inFull: 93 },
  { cliente: 'Cemex Latam',            entregas: 3,  onTime: 96, inFull: 100 },
  { cliente: 'OHL México',             entregas: 4,  onTime: 78, inFull: 88 },
]

// Pareto de fallas OTIF (por qué no se cumplió)
export const otifCausas = [
  { causa: 'Llegada tardía por traslado / tráfico', inc: 5, tipo: 'On Time' },
  { causa: 'OC tardía retrasó el inicio de maniobra', inc: 3, tipo: 'On Time' },
  { causa: 'Maniobra parcial por viento / clima', inc: 2, tipo: 'In Full' },
  { causa: 'Maniobrista del cliente ausente en sitio', inc: 1, tipo: 'In Full' },
]

// Detalle reciente de maniobras (cumplimiento on-time / in-full)
export const otifManiobras = [
  { folio: 'CG-2026-294', cliente: 'Constructora Tapachula', grua: 'G003', plan: '08:00', real: '08:05', onTime: true,  inFull: true,  nota: 'Premontaje completo' },
  { folio: 'CG-2026-293', cliente: 'Constructora Tapachula', grua: 'G014', plan: '20:00', real: '20:00', onTime: true,  inFull: true,  nota: 'Izaje nocturno OK' },
  { folio: 'CG-2026-291', cliente: 'Constructora Tapachula', grua: 'G005', plan: '07:30', real: '08:10', onTime: false, inFull: true,  nota: 'Tráfico en acceso a obra' },
  { folio: 'CG-2026-289', cliente: 'Mota Engil',             grua: 'G009', plan: '09:00', real: '09:00', onTime: true,  inFull: true,  nota: 'Izaje pesado completo' },
  { folio: 'CG-2026-281', cliente: 'Constructora Tapachula', grua: 'G003', plan: '08:00', real: '08:00', onTime: true,  inFull: false, nota: 'Viento: 2 piezas reprogramadas' },
  { folio: 'CG-2026-269', cliente: 'Mota Engil',             grua: 'G010', plan: '21:00', real: '21:15', onTime: false, inFull: true,  nota: 'OC liberada tarde' },
  { folio: 'CG-2026-219', cliente: 'OHL México',             grua: 'G004', plan: '08:00', real: '09:20', onTime: false, inFull: false, nota: 'Maniobrista ausente + alcance parcial' },
  { folio: 'CG-2026-214', cliente: 'Mota Engil',             grua: 'G010', plan: '08:30', real: '08:30', onTime: true,  inFull: true,  nota: 'Izaje pesado completo' },
]
