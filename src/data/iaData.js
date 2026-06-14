// ============================================================
//  KRATOS · Capa de Inteligencia (IA) — Mock data
//  Cubre features pedidos en el documento de cambios IA 2026:
//  EBITDA, rentabilidad por grúa, scores, dependencias,
//  fiscal/regulatorio, formatos, mantto predictivo, etc.
// ============================================================

// ---------- 1. CEO · EBITDA y rentabilidad por unidad ----------

export const ebitdaMensual = [
  { mes: 'Ene', ingresos: 4820000, ebitda:  -84328, margen: -1.7, ventas: 4820000 },
  { mes: 'Feb', ingresos: 4180000, ebitda: -296582, margen: -7.1, ventas: 4180000 },
  { mes: 'Mar', ingresos: 5640000, ebitda:  496751, margen:  8.8, ventas: 5640000 },
  { mes: 'Abr', ingresos: 6120000, ebitda: 1209560, margen: 19.8, ventas: 6120000 },
  { mes: 'May', ingresos: 5980000, ebitda:  954880, margen: 16.0, ventas: 5980000 }
]

// Uso de activos (utilización de flota) por mes
export const usoActivosMensual = [
  { mes: 'Ene', uso: 54, gruasActivas: 4, gruasTotal: 9 },
  { mes: 'Feb', uso: 49, gruasActivas: 4, gruasTotal: 9 },
  { mes: 'Mar', uso: 67, gruasActivas: 6, gruasTotal: 9 },
  { mes: 'Abr', uso: 81, gruasActivas: 7, gruasTotal: 9 },
  { mes: 'May', uso: 76, gruasActivas: 7, gruasTotal: 9 }
]

export const ebitdaPorProyecto = [
  { proyecto: 'Tapachula 3278',  cliente: 'Constructora Tapachula', ingresoYTD: 9820000, ebitda: 1820000, margen: 18.5, estado: 'Activo' },
  { proyecto: 'ICA-FLR-2026',    cliente: 'ICA Fluor',              ingresoYTD: 4140000, ebitda:  780000, margen: 18.8, estado: 'Activo' },
  { proyecto: 'Carso Energía',   cliente: 'Grupo Carso',            ingresoYTD: 6240000, ebitda: -120000, margen: -1.9, estado: 'En riesgo' },
  { proyecto: 'Cemex Holdings',  cliente: 'Cemex Latam',            ingresoYTD: 1820000, ebitda:  240000, margen: 13.2, estado: 'Activo' },
  { proyecto: 'OHL Concesión',   cliente: 'OHL México',             ingresoYTD: 2820000, ebitda:  -90000, margen: -3.2, estado: 'En riesgo' }
]

export const rentabilidadGruas = [
  { eco: 'G003', ingresoYTD: 1820000, margenPct: 22.4, horasFact: 412, costoOp: 480000, mantto:  92000, roi: 18.6, utilizacion: 82, semaforo: 'ok' },
  { eco: 'G004', ingresoYTD:   320000, margenPct: -4.2, horasFact:  88, costoOp: 180000, mantto:  64000, roi: -2.1, utilizacion: 28, semaforo: 'danger' },
  { eco: 'G005', ingresoYTD: 1240000, margenPct: 14.8, horasFact: 318, costoOp: 420000, mantto: 142000, roi: 11.2, utilizacion: 74, semaforo: 'warn' },
  { eco: 'G008', ingresoYTD:   780000, margenPct:  3.1, horasFact: 188, costoOp: 380000, mantto: 248000, roi:  1.8, utilizacion: 52, semaforo: 'warn' },
  { eco: 'G009', ingresoYTD: 3420000, margenPct: 31.5, horasFact: 612, costoOp: 720000, mantto: 110000, roi: 28.4, utilizacion: 91, semaforo: 'ok' },
  { eco: 'G010', ingresoYTD: 3280000, margenPct: 29.8, horasFact: 588, costoOp: 740000, mantto:  98000, roi: 27.1, utilizacion: 88, semaforo: 'ok' },
  { eco: 'G014', ingresoYTD: 2980000, margenPct: 26.4, horasFact: 542, costoOp: 680000, mantto: 124000, roi: 22.8, utilizacion: 84, semaforo: 'ok' }
]

// ---------- 2. CEO · Alertas de flujo futuro ----------

export const flujoFuturo = {
  riesgo2sem: { nivel: 'medio', mensaje: '2 cobranzas críticas (OHL, Carso) podrían retrasarse', impacto: 1580000 },
  riesgo30d:  { nivel: 'medio', mensaje: 'Déficit proyectado semana 22 si OHL no liquida', impacto: 920000 },
  cobranzaCritica: [
    { cliente: 'OHL México',  oc: 'OC-2026-0067', monto: 340000, diasVencida: 32, prob: 0.4 },
    { cliente: 'Grupo Carso', oc: 'OC-2026-0089', monto: 1240000, diasVencida: 15, prob: 0.7 }
  ],
  semanasTension: [
    { semana: 'S20', tension: 'baja',  detalle: 'Pagos rutinarios cubiertos' },
    { semana: 'S21', tension: 'media', detalle: 'IMSS+SAT bimestre, requiere OHL' },
    { semana: 'S22', tension: 'alta',  detalle: 'Nómina + 3 OCs grandes' },
    { semana: 'S23', tension: 'media', detalle: 'Recuperación parcial' }
  ]
}

// ---------- 3. CEO · Score Empresarial por área ----------

export const scoreEmpresa = [
  { area: 'Finanzas',           score: 82, tendencia: 4,   nivel: 'ok',     resp: 'Jaqueline Santos' },
  { area: 'Operación',          score: 91, tendencia: 3,   nivel: 'ok',     resp: 'Valentina García' },
  { area: 'Recursos Humanos',   score: 74, tendencia: -2,  nivel: 'warn',   resp: 'Coordinación Gral.' },
  { area: 'Calidad',            score: 68, tendencia: -5,  nivel: 'warn',   resp: 'Coordinación + Calidad' },
  { area: 'COO',                score: 68, tendencia:  1,  nivel: 'warn',   resp: 'Coordinación Gral.' },
  { area: 'Asistente Ejecutivo',score: 68, tendencia:  0,  nivel: 'warn',   resp: '—' },
  { area: 'Compras',            score: 81, tendencia:  2,  nivel: 'ok',     resp: 'Jonathan Carrillo' },
  { area: 'Mantenimiento',      score: 65, tendencia: -3,  nivel: 'warn',   resp: 'Equipo Mtto' },
  { area: 'Almacén',            score: 78, tendencia:  1,  nivel: 'ok',     resp: 'Jonathan Carrillo' },
  { area: 'SHEQ',               score: 72, tendencia:  2,  nivel: 'warn',   resp: 'Coordinación SHEQ' }
]

export const riesgoGeneral = { nivel: 'MEDIO', score: 74, tendencia: 1 }

// ---------- 4. CEO · Alertas de dependencia ----------

export const dependencias = [
  { tipo: 'cliente',    titulo: '48% de ventas dependen de 2 clientes',     detalle: 'ICA Fluor + Grupo Carso concentran 48% del pipeline cerrado',  riesgo: 'alto' },
  { tipo: 'persona',    titulo: 'Operaciones depende de Valentina García',  detalle: 'Sin backup directo para coordinación logística Tapachula',     riesgo: 'alto' },
  { tipo: 'unidad',     titulo: '1 unidad (G009) genera 28% ingresos',      detalle: 'SANY STC1000 — riesgo de inmovilizar el flujo si para',         riesgo: 'medio' },
  { tipo: 'proveedor',  titulo: 'Combustible: 1 proveedor (Diésel Bajío)',  detalle: '92% del consumo mensual concentrado en una fuente',             riesgo: 'medio' },
  { tipo: 'banco',      titulo: '78% caja en BBVA Empresa',                 detalle: 'Sin diversificación efectiva entre instituciones',              riesgo: 'medio' }
]

// ---------- 5. CEO · Utilización REAL de activos ----------

export const utilizacionActivos = [
  { eco: 'G003', horasReales: 412, muertas:  48, improd:  32, traslado:  68, facturables: 372, semana: 41.2 },
  { eco: 'G004', horasReales:  88, muertas: 198, improd:  62, traslado:  18, facturables:  82, semana:  8.8 },
  { eco: 'G005', horasReales: 318, muertas:  74, improd:  48, traslado:  82, facturables: 286, semana: 31.8 },
  { eco: 'G008', horasReales: 188, muertas: 142, improd:  68, traslado:  42, facturables: 162, semana: 18.8 },
  { eco: 'G009', horasReales: 612, muertas:  18, improd:  14, traslado:  96, facturables: 588, semana: 61.2 },
  { eco: 'G010', horasReales: 588, muertas:  22, improd:  18, traslado:  92, facturables: 562, semana: 58.8 },
  { eco: 'G014', horasReales: 542, muertas:  34, improd:  28, traslado:  88, facturables: 518, semana: 54.2 }
]

// ---------- 6. CEO · Costo de NO Calidad ----------

export const costoNoCalidad = [
  { concepto: 'NC abiertas (impacto operativo)', monto:  82000, eventos: 4,  detalle: 'Reproceso + tiempo perdido' },
  { concepto: 'Retrasos en obras',                monto: 148000, eventos: 6,  detalle: 'Penalizaciones + horas extra' },
  { concepto: 'Errores documentales',            monto:  42000, eventos: 12, detalle: 'OCs sin cotización completa' },
  { concepto: 'Ausentismo no planificado',       monto: 184000, eventos: 18, detalle: 'Horas-hombre + cobertura externa' },
  { concepto: 'Reparaciones por mal uso',        monto: 112000, eventos: 3,  detalle: 'Mantto correctivo no planeado' }
]

// ---------- 7. COO · Motor de Prioridades IA ----------

export const prioridadesIA = [
  { rank: 1, titulo: 'Cobranza OHL México',            area: 'Finanzas',    impacto: 'alto',  costoRetraso: 'Caja crítica S22', plazo: 'Hoy', accion: 'Llamada CFO + recordatorio formal' },
  { rank: 2, titulo: 'Verificación grúa G005',          area: 'Calidad',     impacto: 'alto',  costoRetraso: 'Multa + paro unidad', plazo: '30 may', accion: 'Agendar centro de verificación' },
  { rank: 3, titulo: 'Autorización nómina jueves',      area: 'Finanzas',    impacto: 'alto',  costoRetraso: 'Operadores sin pago', plazo: 'Jue 15', accion: 'Firma CG · CC: Dirección' },
  { rank: 4, titulo: 'Compra urgente REQ-114 eslingas', area: 'Compras',     impacto: 'medio', costoRetraso: 'Maniobras pausadas',  plazo: '17 may', accion: 'Cerrar 3a cotización + OC' },
  { rank: 5, titulo: 'Cierre NC-019 G008',              area: 'Operaciones', impacto: 'medio', costoRetraso: 'Auditoría externa',   plazo: '20 may', accion: 'Cargar evidencia checklist' },
  { rank: 6, titulo: 'Firma contrato ICA Fluor OP-191', area: 'Comercial',   impacto: 'alto',  costoRetraso: 'Pérdida oportunidad', plazo: '19 may', accion: 'Revisión legal + envío' }
]

// ---------- 8. COO · Score de Ejecución por líder ----------

export const scoreEjecucion = [
  { lider: 'Jaqueline Santos',  area: 'Finanzas',     velocidad: 92, retrasos: 1, cumplimiento: 94, reincidencia: 0, cierreNC: 95, eficiencia: 93 },
  { lider: 'Valentina García',  area: 'Operaciones',  velocidad: 88, retrasos: 3, cumplimiento: 86, reincidencia: 1, cierreNC: 78, eficiencia: 84 },
  { lider: 'Jonathan Carrillo', area: 'Compras',      velocidad: 78, retrasos: 4, cumplimiento: 81, reincidencia: 2, cierreNC: 72, eficiencia: 78 },
  { lider: 'Ahtziri López',     area: 'Marketing',    velocidad: 94, retrasos: 0, cumplimiento: 90, reincidencia: 0, cierreNC: 88, eficiencia: 91 },
  { lider: 'Coordinación Gral.', area: 'COO',          velocidad: 84, retrasos: 2, cumplimiento: 82, reincidencia: 1, cierreNC: 80, eficiencia: 83 }
]

// ---------- 9. COO · Cuellos de Botella ----------

export const cuellosBotella = [
  { origen: 'Compras',  bloqueando: 'Operaciones', detalle: 'REQ-114 sin 3 cotizaciones — 5 días',    impacto: 'Pausa maniobras menores', severidad: 'alta' },
  { origen: 'Finanzas', bloqueando: 'Compras',     detalle: 'Aprobaciones OC > $50K esperan firma',    impacto: '4 OCs pendientes',         severidad: 'media' },
  { origen: 'Dirección',bloqueando: 'RH',          detalle: 'Firma de nómina jueves — 1 día atraso',   impacto: 'Riesgo desmotivación',     severidad: 'media' },
  { origen: 'Calidad',  bloqueando: 'Operaciones', detalle: 'NC-019 cierre G008 documentación pendiente', impacto: 'Riesgo auditoría',     severidad: 'baja' }
]

// ---------- 10. COO · War Room ----------

export const warRoom = {
  proyectosActivos: [
    { proyecto: 'Tapachula 3278',      vence: '2026-08-30', avance: 62, estado: 'En riesgo',  cliente: 'Constructora Tapachula', operadores: 3, gruas: 4 },
    { proyecto: 'ICA-FLR-2026',        vence: '2026-09-15', avance: 48, estado: 'En tiempo', cliente: 'ICA Fluor',              operadores: 1, gruas: 1 },
    { proyecto: 'Carso Energía',       vence: '2026-06-30', avance: 78, estado: 'En tiempo', cliente: 'Grupo Carso',            operadores: 2, gruas: 2 }
  ],
  crisis: [
    { id: 'CR-01', titulo: 'OHL — riesgo de no-pago', area: 'Finanzas', estado: 'Activa', sla: '48 h' },
    { id: 'CR-02', titulo: 'G008 fuera de servicio',  area: 'Operaciones', estado: 'Activa', sla: '96 h' }
  ],
  maniobrasEspeciales: [
    { id: 'MN-04', descripcion: 'Maniobra crítica SANY 100t — turbina',  fecha: '2026-05-18', sitio: 'Tapachula', riesgo: 'alto' },
    { id: 'MN-05', descripcion: 'Izaje torre antena GSM',                fecha: '2026-05-22', sitio: 'Zempoala',  riesgo: 'medio' }
  ],
  cargasCriticas: [
    { folio: 'C-218',  cliente: 'ICA Fluor', monto: 380000, eta: '2026-05-15', grua: 'G009' },
    { folio: 'C-221',  cliente: 'Carso',     monto: 240000, eta: '2026-05-16', grua: 'G010' }
  ],
  incidentes: [
    { id: 'INC-08', desc: 'Cuasi-accidente sitio Tapachula', sev: 'medio', fecha: '2026-05-12', estado: 'Investigación' }
  ]
}

// ---------- 11. COO · Heatmap operativo ----------

export const heatmapOperativo = {
  proyectos: [
    { proyecto: 'Tapachula', riesgo: 7, ingresos: 9820000 },
    { proyecto: 'ICA Fluor', riesgo: 3, ingresos: 4140000 },
    { proyecto: 'Carso',     riesgo: 8, ingresos: 6240000 },
    { proyecto: 'Cemex',     riesgo: 2, ingresos: 1820000 },
    { proyecto: 'OHL',       riesgo: 9, ingresos: 2820000 }
  ],
  matriz: [
    { x: 'Operación', y: 'Tapachula', valor: 88 },
    { x: 'Operación', y: 'ICA Fluor', valor: 92 },
    { x: 'Operación', y: 'Carso',     valor: 64 },
    { x: 'Finanzas',  y: 'Tapachula', valor: 84 },
    { x: 'Finanzas',  y: 'ICA Fluor', valor: 92 },
    { x: 'Finanzas',  y: 'Carso',     valor: 42 },
    { x: 'Calidad',   y: 'Tapachula', valor: 78 },
    { x: 'Calidad',   y: 'ICA Fluor', valor: 88 },
    { x: 'Calidad',   y: 'Carso',     valor: 72 }
  ]
}

// ---------- 12. Finanzas · Cashflow 13 semanas ----------

export const cashflow13s = [
  { semana: 'S20', entrada: 1840000, salida: 1620000, saldo: 4520000, tension: 'baja' },
  { semana: 'S21', entrada: 1320000, salida: 1820000, saldo: 4020000, tension: 'media' },
  { semana: 'S22', entrada:  920000, salida: 2480000, saldo: 2460000, tension: 'alta' },
  { semana: 'S23', entrada: 1620000, salida: 1380000, saldo: 2700000, tension: 'media' },
  { semana: 'S24', entrada: 1880000, salida: 1440000, saldo: 3140000, tension: 'baja' },
  { semana: 'S25', entrada: 2120000, salida: 1580000, saldo: 3680000, tension: 'baja' },
  { semana: 'S26', entrada: 1640000, salida: 1320000, saldo: 4000000, tension: 'baja' },
  { semana: 'S27', entrada: 1380000, salida: 1820000, saldo: 3560000, tension: 'media' },
  { semana: 'S28', entrada: 1980000, salida: 1480000, saldo: 4060000, tension: 'baja' },
  { semana: 'S29', entrada: 2240000, salida: 1640000, saldo: 4660000, tension: 'baja' },
  { semana: 'S30', entrada: 1820000, salida: 1380000, saldo: 5100000, tension: 'baja' },
  { semana: 'S31', entrada: 1540000, salida: 1240000, saldo: 5400000, tension: 'baja' },
  { semana: 'S32', entrada: 1980000, salida: 1480000, saldo: 5900000, tension: 'baja' }
]

// ---------- 13. Finanzas · Rentabilidad por cliente ----------

export const rentabilidadCliente = [
  { cliente: 'Constructora Tapachula', ingresoYTD: 9820000, ebitda: 1820000, margen: 18.5, cxc: 482500, diasPromPago: 22, score: 'A' },
  { cliente: 'ICA Fluor',              ingresoYTD: 4140000, ebitda:  780000, margen: 18.8, cxc: 920000, diasPromPago: 18, score: 'A' },
  { cliente: 'Grupo Carso',            ingresoYTD: 6240000, ebitda: -120000, margen: -1.9, cxc:1240000, diasPromPago: 64, score: 'C' },
  { cliente: 'Cemex Latam',            ingresoYTD: 1820000, ebitda:  240000, margen: 13.2, cxc: 580000, diasPromPago: 28, score: 'B' },
  { cliente: 'OHL México',             ingresoYTD: 2820000, ebitda:  -90000, margen: -3.2, cxc: 340000, diasPromPago: 88, score: 'D' },
  { cliente: 'CFE Transmisión',        ingresoYTD: 1240000, ebitda:  140000, margen: 11.3, cxc:      0, diasPromPago: 12, score: 'B' }
]

export const rentabilidadProyecto = [
  { proyecto: 'Tapachula 3278', ingreso: 9820000, costoOperador:  840000, diesel:  620000, viaticos:  148000, desgaste: 220000, mantto: 380000, utilidad: 7612000, margen: 77.5 },
  { proyecto: 'ICA Fluor',       ingreso: 4140000, costoOperador:  420000, diesel:  310000, viaticos:   72000, desgaste: 120000, mantto: 180000, utilidad: 3038000, margen: 73.4 },
  { proyecto: 'Carso Energía',   ingreso: 6240000, costoOperador:  920000, diesel:  840000, viaticos:  220000, desgaste: 380000, mantto: 480000, utilidad: 3400000, margen: 54.5 },
  { proyecto: 'OHL Concesión',   ingreso: 2820000, costoOperador:  640000, diesel:  520000, viaticos:  180000, desgaste: 240000, mantto: 380000, utilidad:  860000, margen: 30.5 }
]

// ---------- 14. Finanzas · Alertas bancarias ----------

export const alertasBancarias = {
  saldosMinimos: [
    { cuenta: 'BBVA Empresa', minimo: 2500000, actual: 2845420, status: 'ok' },
    { cuenta: 'BBVA Inversión', minimo: 1000000, actual: 1240000, status: 'ok' },
    { cuenta: 'Toka', minimo: 100000, actual: 148320, status: 'ok' },
    { cuenta: 'Edenred', minimo: 80000, actual: 92840, status: 'warn' }
  ],
  pagosSemana: [
    { semana: 'S20', pagosRealizados: 8, montoPag: 1240000, cobrosRealizados: 6, montoCob: 1820000 },
    { semana: 'S21', pagosRealizados: 12, montoPag: 1820000, cobrosRealizados: 4, montoCob: 1320000 }
  ],
  lineasCriticas: [
    { banco: 'BBVA línea revolvente', utilizacion: 68, status: 'warn' },
    { banco: 'Banorte crédito simple', utilizacion: 42, status: 'ok' }
  ],
  sobregirosFuturos: [
    { fecha: '2026-05-22', cuenta: 'BBVA Empresa', monto: -180000, prob: 0.35 }
  ],
  cajaChica: [
    { responsable: 'Valentina García', monto: 18420, fondo: 25000, vence: '2026-05-20' },
    { responsable: 'Jonathan Carrillo', monto: 12840, fondo: 20000, vence: '2026-05-20' }
  ]
}

// ---------- 15. Finanzas · Análisis de Deuda ----------

export const analisisDeuda = {
  dscr: 1.42,      // Debt Service Coverage Ratio (objetivo > 1.25)
  cobertura: 3.8,  // EBITDA / intereses (objetivo > 3.0)
  apalancamiento: 0.48, // Deuda total / activos
  riesgoMensual: [
    { mes: 'Ene', dscr: 1.18, riesgo: 'medio' },
    { mes: 'Feb', dscr: 1.12, riesgo: 'alto' },
    { mes: 'Mar', dscr: 1.34, riesgo: 'medio' },
    { mes: 'Abr', dscr: 1.48, riesgo: 'bajo' },
    { mes: 'May', dscr: 1.42, riesgo: 'bajo' }
  ]
}

// ---------- 16. Finanzas · Score de cliente ----------

export const scoreClientes = [
  { cliente: 'Constructora Tapachula', score: 88, velocidad: 'rápida',  riesgo: 'bajo',  desgasteFlujo: 'bajo',  recomendacion: 'Crecer' },
  { cliente: 'ICA Fluor',              score: 92, velocidad: 'rápida',  riesgo: 'bajo',  desgasteFlujo: 'bajo',  recomendacion: 'Premium' },
  { cliente: 'Grupo Carso',            score: 58, velocidad: 'lenta',   riesgo: 'medio', desgasteFlujo: 'alto',  recomendacion: 'Renegociar' },
  { cliente: 'Cemex Latam',            score: 74, velocidad: 'media',   riesgo: 'bajo',  desgasteFlujo: 'medio', recomendacion: 'Mantener' },
  { cliente: 'OHL México',             score: 32, velocidad: 'muy lenta', riesgo: 'alto',  desgasteFlujo: 'crítico', recomendacion: 'Pausar' },
  { cliente: 'CFE Transmisión',        score: 81, velocidad: 'rápida',  riesgo: 'bajo',  desgasteFlujo: 'bajo',  recomendacion: 'Crecer' }
]

// ---------- 17. Finanzas · Monitoreo regulatorio automático ----------

export const monitoreoRegulatorio = [
  { fuente: 'SAT',         tema: 'CFDI 4.0 — Complemento Carta Porte 3.1', publicado: '2026-05-08', impacto: 'medio', resumen: 'Actualización en validación de fracción aduanera para carga especializada. Aplica desde 01-jul-2026.', accion: 'Revisar templates de CFDI carga porte y certificar con PAC.' },
  { fuente: 'SAT',         tema: 'Regla 3.2.1 — Materialidad EFOS',         publicado: '2026-04-22', impacto: 'alto',  resumen: 'Nueva interpretación de razón de negocios en arrendamientos.', accion: 'Auditar 100% contratos de arrendamiento de operadores y unidades.' },
  { fuente: 'IMSS',        tema: 'Modificación SUA — Prima riesgo 2026',    publicado: '2026-03-31', impacto: 'medio', resumen: 'Cambio en clasificación de prima de riesgo para empresas de carga especializada.', accion: 'Recalcular cuotas obrero-patronales y declaración anual.' },
  { fuente: 'INFONAVIT',   tema: 'Reporte bimestral electrónico',           publicado: '2026-05-01', impacto: 'bajo',  resumen: 'Nuevo formato XML para reporte bimestral.', accion: 'Actualizar plantillas y validar con asesor.' },
  { fuente: 'STPS',        tema: 'REPSE — Reporte cuatrimestral Q1',        publicado: '2026-04-15', impacto: 'alto',  resumen: 'Vence 31-may. Requiere SISUB/ICSOE actualizados.', accion: 'Generar SISUB/ICSOE y subir REPSE antes 31-may.' },
  { fuente: 'STPS',        tema: 'NOM-035 — Factores psicosociales',         publicado: '2026-02-12', impacto: 'medio', resumen: 'Inspección sectorial 2026 en sector autotransporte.', accion: 'Aplicar guías y subir evidencia capacitación.' },
  { fuente: 'SCT',         tema: 'Permiso SCT autotransporte carga',         publicado: '2026-05-10', impacto: 'medio', resumen: 'Renovación digital de permisos federales. Plazo 90 días.', accion: 'Verificar vigencia de permisos y agendar renovación.' },
  { fuente: 'SCT',         tema: 'NOM-012 — Pesos y dimensiones',            publicado: '2026-04-20', impacto: 'alto',  resumen: 'Nueva restricción para tractores tipo T3-S2-R4 en autopistas federales.', accion: 'Revisar rutas y aplicar a flota actual.' },
  { fuente: 'DOF',         tema: 'Reforma fiscal 2026 — Outsourcing',        publicado: '2026-01-15', impacto: 'alto',  resumen: 'Endurecimiento criterios de subcontratación especializada.', accion: 'Validar REPSE y materialidad de subcontrataciones.' }
]

// ---------- 18. Finanzas · Repositorio Corporativo ----------

export const repositorioCorporativo = [
  { tipo: 'Acta constitutiva',  documento: 'Kratos FP S.A. de C.V.',                 fecha: '2018-03-12', vigencia: 'permanente', estado: 'vigente' },
  { tipo: 'Poderes',             documento: 'Poder general · Ricardo Nieto',         fecha: '2024-05-08', vigencia: '2027-05-08', estado: 'vigente' },
  { tipo: 'Modificación societaria', documento: 'Acta 12 — aumento de capital',      fecha: '2022-09-15', vigencia: 'permanente', estado: 'vigente' },
  { tipo: 'CSF',                  documento: 'Constancia Situación Fiscal 2026',     fecha: '2026-01-04', vigencia: '2026-12-31', estado: 'vigente' },
  { tipo: 'RFC',                  documento: 'KFP180312XXX',                         fecha: '2018-03-12', vigencia: 'permanente', estado: 'vigente' },
  { tipo: 'e.firma',              documento: 'e.firma persona moral',                 fecha: '2024-04-10', vigencia: '2028-04-10', estado: 'vigente' },
  { tipo: 'Opinión cumplimiento', documento: 'Opinión positiva SAT 2026-05',         fecha: '2026-05-01', vigencia: '2026-06-30', estado: 'proximo' },
  { tipo: 'Opinión IMSS',         documento: 'Opinión positiva IMSS 2026-04',         fecha: '2026-04-30', vigencia: '2026-05-31', estado: 'proximo' },
  { tipo: 'Contratos',             documento: 'Master ICA Fluor 2026',                fecha: '2026-02-18', vigencia: '2026-12-31', estado: 'vigente' },
  { tipo: 'REPSE',                 documento: 'Registro REPSE vigente',               fecha: '2025-08-12', vigencia: '2026-08-12', estado: 'vigente' },
  { tipo: 'SISUB',                 documento: 'SISUB Q1 2026',                         fecha: '2026-04-30', vigencia: '2026-08-31', estado: 'vigente' },
  { tipo: 'ICSOE',                 documento: 'ICSOE Q1 2026',                         fecha: '2026-04-30', vigencia: '2026-08-31', estado: 'vigente' },
  { tipo: 'Registro patronal',     documento: 'IMSS 12345678 · Hidalgo',               fecha: '2018-03-20', vigencia: 'permanente', estado: 'vigente' },
  { tipo: 'Línea de crédito',      documento: 'BBVA — línea $5M',                     fecha: '2024-08-15', vigencia: '2027-08-15', estado: 'vigente' },
  { tipo: 'Sello digital',         documento: 'CSD vigente',                          fecha: '2024-04-10', vigencia: '2028-04-10', estado: 'vigente' }
]

// ---------- 19. Finanzas · Matriz de Riesgo Fiscal ----------

export const matrizRiesgoFiscal = [
  { area: 'SAT',       cumplimiento: 92, riesgos: [{ tipo: 'Materialidad arrendamiento', nivel: 'amarillo' }], color: 'amarillo' },
  { area: 'IMSS',      cumplimiento: 84, riesgos: [{ tipo: 'Integración salarial operadores', nivel: 'amarillo' }], color: 'amarillo' },
  { area: 'INFONAVIT', cumplimiento: 90, riesgos: [],                                                                color: 'verde' },
  { area: 'REPSE',     cumplimiento: 75, riesgos: [{ tipo: 'Reporte Q1 pendiente', nivel: 'rojo' }],                color: 'rojo' },
  { area: 'NOMs',      cumplimiento: 88, riesgos: [],                                                                color: 'verde' },
  { area: 'CFDI',      cumplimiento: 95, riesgos: [],                                                                color: 'verde' },
  { area: 'Contratos', cumplimiento: 78, riesgos: [{ tipo: 'Falta renovación 2 maestros', nivel: 'amarillo' }],     color: 'amarillo' },
  { area: 'Facturación', cumplimiento: 96, riesgos: [],                                                              color: 'verde' },
  { area: 'Nómina',    cumplimiento: 88, riesgos: [],                                                                color: 'verde' },
  { area: 'Proveedores', cumplimiento: 70, riesgos: [{ tipo: '2 proveedores sin opinión cumplimiento', nivel: 'amarillo' }], color: 'amarillo' }
]

// ---------- 20. Finanzas · Recomendaciones IA fiscales ----------

export const recomendacionesIA = [
  { tipo: 'fiscal',       titulo: 'Arrendamiento puro para adquisiciones',   detalle: 'La adquisición de unidades vía arrendamiento puro podría generar mayor eficiencia fiscal bajo estructura actual.', impacto: 320000, prioridad: 'alta' },
  { tipo: 'corporativa',  titulo: 'Ampliar objeto social',                   detalle: 'Se recomienda modificar objeto social para incorporar líneas de negocio relacionadas con certificación.',           impacto: 0,        prioridad: 'media' },
  { tipo: 'laboral',      titulo: 'Optimizar integración salarial',          detalle: 'Existe oportunidad de optimización en integración salarial de operadores manteniendo cumplimiento IMSS.',           impacto: 184000,   prioridad: 'alta' },
  { tipo: 'financiera',   titulo: 'Factoring con clientes A',                detalle: 'Anticipar facturas ICA Fluor y Tapachula vía factoring para mejorar capital de trabajo.',                              impacto: 240000,   prioridad: 'media' },
  { tipo: 'preventiva',   titulo: 'Diversificar bancos',                     detalle: '78% caja en BBVA. Distribuir 25% en segunda institución reduce riesgo concentración.',                                impacto: 0,        prioridad: 'media' }
]

// ---------- 21. Finanzas · Score salud fiscal ----------

export const scoreSaludFiscal = [
  { area: 'SAT',       score: 92 },
  { area: 'IMSS',      score: 84 },
  { area: 'INFONAVIT', score: 90 },
  { area: 'REPSE',     score: 75 },
  { area: 'NOMs',      score: 88 }
]

// ---------- 22. Finanzas · Análisis preventivo de operaciones ----------

export const analisisPreventivo = [
  { operacion: 'Compra G015 SANY 130T', tipo: 'Compra activos', impactoFiscal: 'Deducción 25% inmediata', impactoLegal: 'Garantía mercantil', impactoFinanciero: 'Tensión flujo 6 meses', riesgo: 'medio', recomienda: 'Arrendamiento puro' },
  { operacion: 'Contrato Master Carso 12m', tipo: 'Contrato',  impactoFiscal: 'CFDI mensual',           impactoLegal: 'Cláusula penalización',  impactoFinanciero: 'Ingreso predecible', riesgo: 'bajo',  recomienda: 'Aprobar con anexo SHEQ' },
  { operacion: 'Nuevo proveedor Diésel Bajío 2',  tipo: 'Alta proveedor', impactoFiscal: 'Verificar lista 69-B', impactoLegal: 'Validar REPSE', impactoFinanciero: 'Reduce concentración 12%', riesgo: 'bajo',  recomienda: 'Aprobar tras validación SAT' },
  { operacion: 'Alta 3 operadores ruta sur',     tipo: 'Contratación', impactoFiscal: 'Aumenta nómina',  impactoLegal: 'NOM-035 + DC3',         impactoFinanciero: '+$220K/mes',           riesgo: 'medio', recomienda: 'Aprobar con plan SHEQ' }
]

// ---------- 23. Finanzas · Formatos automatizados ----------

export const formatosFinancieros = [
  { id: 'FF-001', titulo: 'Rendición de Viáticos Digital',  descripcion: 'Envío instantáneo de facturas desde la ruta. Captura factura PDF/XML + foto comprobante.', usadoMes: 24, ahorroH: 12 },
  { id: 'FF-002', titulo: 'Gasto de Emergencia',             descripcion: 'Autorización rápida para fallas mecánicas críticas o urgencias en sitio (auto-approve <$15K).', usadoMes:  8, ahorroH:  6 },
  { id: 'FF-003', titulo: 'Evaluación de Crédito IA',         descripcion: 'Filtro comercial automatizado para clientes nuevos. Score 0-100 + recomendación.',          usadoMes:  6, ahorroH:  4 },
  { id: 'FF-004', titulo: 'Comprobación de Gastos',           descripcion: 'Sube ticket → IA valida CFDI 4.0 → aprobación → registro Cashflow.',                       usadoMes: 48, ahorroH: 18 },
  { id: 'FF-005', titulo: 'Solicitud de Anticipo',            descripcion: 'Operador / sitio solicita anticipo digital con descuento programado en nómina.',          usadoMes: 12, ahorroH:  3 }
]

// ---------- 24. Finanzas · Bitácora ejecutiva fiscal semanal ----------

export const bitacoraEjecutivaFiscal = {
  semana: 'MAY S20',
  cambiosRegulatorios: 2,
  riesgosActivos: 3,
  alertas: 5,
  oportunidades: 4,
  pendientes: 6,
  estrategiasSugeridas: 3,
  impactoEstimado: 744000,
  resumen: 'REPSE Q1 vence 31-may. Materialidad arrendamientos requiere auditoría. Oportunidad de $320K vía arrendamiento puro para próximas unidades.'
}

// ---------- 25. Finanzas · Control facturación por cliente ----------

export const facturacionCliente = [
  { cliente: 'Constructora Tapachula', facturas: 18, montoYTD: 9820000, ultima: '2026-05-12', vencidas: 0, vigentes: 482500 },
  { cliente: 'ICA Fluor',              facturas: 12, montoYTD: 4140000, ultima: '2026-05-08', vencidas: 0, vigentes: 920000 },
  { cliente: 'Grupo Carso',            facturas: 22, montoYTD: 6240000, ultima: '2026-04-28', vencidas: 2, vigentes: 0 },
  { cliente: 'Cemex Latam',            facturas:  8, montoYTD: 1820000, ultima: '2026-05-11', vencidas: 0, vigentes: 580000 },
  { cliente: 'OHL México',             facturas:  6, montoYTD: 2820000, ultima: '2026-03-22', vencidas: 1, vigentes: 0 },
  { cliente: 'CFE Transmisión',        facturas:  4, montoYTD: 1240000, ultima: '2026-04-15', vencidas: 0, vigentes: 0 }
]

// ---------- 26. Comercial · Pricing IA + Vendedor + Follow-up ----------

export const pricingIA = [
  { equipo: 'SANY STC1000 100t', precioMercado: 22000, precioIdeal: 23800, margen: 28, riesgo: 'bajo',  competencia: 3, recomendacion: 'Subir 8%' },
  { equipo: 'HIAB 12t',          precioMercado:  8800, precioIdeal:  9200, margen: 22, riesgo: 'medio', competencia: 5, recomendacion: 'Mantener' },
  { equipo: 'XCMG QY25',         precioMercado: 12400, precioIdeal: 12800, margen: 24, riesgo: 'bajo',  competencia: 4, recomendacion: 'Subir 3%' },
  { equipo: 'TITAN SQ20T',       precioMercado: 10800, precioIdeal: 11400, margen: 26, riesgo: 'bajo',  competencia: 2, recomendacion: 'Subir 5%' }
]

export const scoreVendedores = [
  { vendedor: 'Ricardo Nieto',  velocidad: 92, conversion: 38, margenVend: 24.8, seguimiento: 96, ganadasMes: 3, ingreso: 8420000 },
  { vendedor: 'Equipo Comercial', velocidad: 78, conversion: 28, margenVend: 19.2, seguimiento: 84, ganadasMes: 4, ingreso: 4820000 }
]

export const clientesFrios = [
  { cliente: 'OHL México',         diasSinContacto: 22, ultimoContacto: '2026-04-22', prob: 0.4, accion: 'Llamada CFO' },
  { cliente: 'Cemex Latam',         diasSinContacto: 14, ultimoContacto: '2026-04-30', prob: 0.5, accion: 'Envío comparativo' },
  { cliente: 'CFE Transmisión',     diasSinContacto: 18, ultimoContacto: '2026-04-26', prob: 0.55, accion: 'Visita técnica' }
]

export const followUpIA = [
  { canal: 'WhatsApp',  pendientes: 8,  enviadas: 24, abiertas: 19, respuestas: 12 },
  { canal: 'Email',     pendientes: 12, enviadas: 36, abiertas: 22, respuestas:  9 },
  { canal: 'Recordatorio interno', pendientes: 6, enviadas: 18, abiertas: 18, respuestas: 14 },
  { canal: 'Propuesta automatizada', pendientes: 4, enviadas: 9,  abiertas:  8, respuestas:  5 }
]

// ---------- 27. Operaciones · Mantenimiento predictivo + Costo unidad ----------

export const mantenimientoPredictivo = [
  { eco: 'G003', proximaFalla: 'Bomba hidráulica', prob: 0.18, horasRest: 280, recomienda: 'Inspección 30 días', vidaUtilPct: 62 },
  { eco: 'G004', proximaFalla: 'Sistema eléctrico', prob: 0.42, horasRest:  84, recomienda: 'Inspección 7 días',  vidaUtilPct: 48 },
  { eco: 'G005', proximaFalla: 'Pluma extensible',  prob: 0.32, horasRest: 142, recomienda: 'Inspección 21 días', vidaUtilPct: 58 },
  { eco: 'G008', proximaFalla: 'Transmisión',       prob: 0.78, horasRest:  18, recomienda: 'PARO PREVENTIVO',    vidaUtilPct: 38 },
  { eco: 'G009', proximaFalla: 'Mantenimiento programado', prob: 0.08, horasRest: 412, recomienda: 'Rutinario',  vidaUtilPct: 88 },
  { eco: 'G010', proximaFalla: 'Mantenimiento programado', prob: 0.10, horasRest: 388, recomienda: 'Rutinario',  vidaUtilPct: 86 },
  { eco: 'G014', proximaFalla: 'Sensores presión',  prob: 0.14, horasRest: 318, recomienda: 'Rutinario',         vidaUtilPct: 82 }
]

export const costoOperativoUnidad = [
  { eco: 'G003', diesel: 142000, refacciones: 84000, llantas: 32000, operador: 138000, mantto:  92000, total: 488000, ingreso: 1820000 },
  { eco: 'G004', diesel:  38000, refacciones: 42000, llantas: 12000, operador:  72000, mantto:  64000, total: 228000, ingreso:  320000 },
  { eco: 'G005', diesel: 112000, refacciones: 142000,llantas: 28000, operador: 124000, mantto: 142000, total: 548000, ingreso: 1240000 },
  { eco: 'G008', diesel:  68000, refacciones: 248000,llantas: 18000, operador:  92000, mantto: 248000, total: 674000, ingreso:  780000 },
  { eco: 'G009', diesel: 218000, refacciones: 84000, llantas: 42000, operador: 192000, mantto: 110000, total: 646000, ingreso: 3420000 },
  { eco: 'G010', diesel: 208000, refacciones: 76000, llantas: 38000, operador: 188000, mantto:  98000, total: 608000, ingreso: 3280000 },
  { eco: 'G014', diesel: 192000, refacciones: 88000, llantas: 36000, operador: 178000, mantto: 124000, total: 618000, ingreso: 2980000 }
]

// ---------- 28. Operaciones · Score Operador ----------

export const scoreOperadores = [
  { operador: 'Luis Heberto Morales', productividad: 92, incidentes: 0, checklist: 96, retrasos: 1, cuidadoUnidad: 94, scoreTotal: 92 },
  { operador: 'Saul Esteban Prieto',  productividad: 88, incidentes: 1, checklist: 92, retrasos: 2, cuidadoUnidad: 88, scoreTotal: 88 },
  { operador: 'Omar Gómez',            productividad: 78, incidentes: 2, checklist: 78, retrasos: 4, cuidadoUnidad: 82, scoreTotal: 78 }
]

// ---------- 29. Operaciones · GPS + telemetría agregado ----------

export const telemetria = [
  { eco: 'G009', velocidadProm:  62, ralenti:  8, consumoKmL: 2.8, alertas: 0, kmHoy: 184 },
  { eco: 'G010', velocidadProm:  58, ralenti: 12, consumoKmL: 2.6, alertas: 1, kmHoy: 162 },
  { eco: 'G005', velocidadProm:  72, ralenti: 18, consumoKmL: 2.4, alertas: 2, kmHoy: 142 },
  { eco: 'G014', velocidadProm:  56, ralenti: 10, consumoKmL: 2.7, alertas: 0, kmHoy: 168 }
]

// ---------- 30. Operaciones · Utilización muerta ----------

export const utilizacionMuerta = [
  { eco: 'G004', estado: 'En patio', diasMuertos: 18, costoMuerto: 78000, recomendacion: 'Reasignar a obra o vender' },
  { eco: 'G008', estado: 'Mantenimiento', diasMuertos:  4, costoMuerto:  18000, recomendacion: 'Acelerar mantto correctivo' }
]

// ---------- 31. Operaciones · Catálogo de Formatos operativos ----------

export const formatosOperativos = [
  { id: 'OP-001', nombre: 'Bitácora de hechos diarios', desc: 'Registro de grúas y unidades — cierre matutino/nocturno', usadoMes: 124, area: 'Operaciones', tipo: 'Diario' },
  { id: 'OP-002', nombre: 'Notificación de revisión GPS diaria', desc: 'Confirma estado de la unidad GPS', usadoMes: 124, area: 'Operaciones', tipo: 'Diario' },
  { id: 'OP-003', nombre: 'Checklist Pre-operativo Digital', desc: 'Luces, niveles, llantas, gasolina, equipo de izaje', usadoMes: 142, area: 'Operaciones', tipo: 'Diario' },
  { id: 'OP-004', nombre: 'Check-in / Check-out de Herramientas', desc: 'Control inventario cadenas, grilletes, estrobos por unidad', usadoMes: 88, area: 'Almacén', tipo: 'Evento' },
  { id: 'OP-005', nombre: 'Hoja de Liberación de Maniobra', desc: 'Firma cliente eximiendo responsabilidad por terreno/estructuras', usadoMes: 42, area: 'Operaciones', tipo: 'Evento' },
  { id: 'OP-006', nombre: 'Acta de Entrega de Carga (POD)', desc: 'Fotos geolocalizadas + firma destino', usadoMes: 48, area: 'Operaciones', tipo: 'Evento' },
  { id: 'OP-007', nombre: 'Requisición a Compras', desc: 'Generación automática hacia AG-17', usadoMes: 38, area: 'Operaciones', tipo: 'Evento' },
  { id: 'OP-008', nombre: 'Auditoría de Combustible por Odómetro', desc: 'Cruce km recorridos vs litros facturados', usadoMes: 28, area: 'Operaciones', tipo: 'Semanal' },
  { id: 'OP-009', nombre: 'Registro de carga combustible', desc: 'Bitácora de cargas Edenred + manuales', usadoMes: 96, area: 'Operaciones', tipo: 'Diario' },
  { id: 'OP-010', nombre: 'Bitácora horas trabajadas por cliente', desc: 'Conciliación con OC del cliente', usadoMes: 24, area: 'Operaciones', tipo: 'Semanal' },
  { id: 'OP-011', nombre: 'Bitácora de tiempo extra', desc: 'Operadores y maniobristas', usadoMes: 18, area: 'RH', tipo: 'Semanal' },
  { id: 'OP-012', nombre: 'Trazo de ruta segura SCT', desc: 'Ruta + casetas + consumo combustible', usadoMes: 12, area: 'Operaciones', tipo: 'Evento' },
  { id: 'OP-013', nombre: 'Registro de proyectos con clientes', desc: '# OC, sitio, grúa, operador, alertas vencimiento OC', usadoMes:  8, area: 'Operaciones', tipo: 'Evento' },
  { id: 'OP-014', nombre: 'Rol de trabajo y descansos', desc: 'Asignación semanal de personal', usadoMes:  4, area: 'RH', tipo: 'Semanal' },
  { id: 'OP-015', nombre: 'Registro de visitas patio y sitio', desc: 'Control de accesos', usadoMes: 22, area: 'Operaciones', tipo: 'Evento' },
  { id: 'OP-016', nombre: 'Control de radios asignados', desc: 'Inventario y entrega de radios', usadoMes: 14, area: 'Operaciones', tipo: 'Evento' },
  { id: 'OP-017', nombre: 'Control de Certificación de personal vigente', desc: 'DC3, NOM, licencias', usadoMes:  6, area: 'RH', tipo: 'Mensual' },
  { id: 'OP-018', nombre: 'Control de Certificación grúas/unidades', desc: 'NOM-031, verificación', usadoMes:  4, area: 'Operaciones', tipo: 'Mensual' },
  { id: 'OP-019', nombre: 'Control y registro entrega EPP/uniforme', desc: 'Operadores y maniobristas', usadoMes: 12, area: 'RH', tipo: 'Evento' }
]

// ---------- 32. Compras · Reorden predictivo + Sobreprecio + Fraude ----------

export const reordenPredictivo = [
  { sku: '12503120057', producto: 'Eslinga 1x2m Vikingo',   stockActual: 2, consumoMes: 6, diasRest:  10, recomienda: 'Comprar 12 pza ahora' },
  { sku: '—',           producto: 'Diferencial cadena 2t',  stockActual: 1, consumoMes: 3, diasRest:  10, recomienda: 'Comprar 6 pza' },
  { sku: '—',           producto: 'Casco Safety Helmet',     stockActual: 4, consumoMes: 8, diasRest:  15, recomienda: 'Comprar 16 pza' },
  { sku: '—',           producto: 'Botas casco Rombar',      stockActual: 1, consumoMes: 3, diasRest:  10, recomienda: 'Comprar 6 pares' },
  { sku: '—',           producto: 'Aceite hidráulico 20W',   stockActual: 24, consumoMes: 8, diasRest:  90, recomienda: 'Aún OK' }
]

export const alertasSobreprecio = [
  { proveedor: 'Refaccionaria Norte', producto: 'Filtros aire',   precio: 1840, promedio: 1620, deltaPct: 13.6, fecha: '2026-05-11', accion: 'Pedir cotización alterna' },
  { proveedor: 'TRUPPER',             producto: 'Eslingas 1m',    precio: 980,  promedio:  860, deltaPct: 14.0, fecha: '2026-05-08', accion: 'Negociar' },
  { proveedor: 'La Troka',            producto: 'Aceite 20W',     precio: 320,  promedio:  280, deltaPct: 14.3, fecha: '2026-05-07', accion: 'Aprobar excepción' }
]

export const deteccionFraude = [
  { caso: 'F-2026-01', proveedor: 'Refaccionaria Norte', tipo: 'Factura duplicada',  monto: 12400, estado: 'En revisión', detalle: 'Mismo folio 2 veces en abril' },
  { caso: 'F-2026-02', proveedor: '—', tipo: 'Comprobante alterado',                  monto:  8200, estado: 'Confirmado',  detalle: 'Diferencia entre PDF y XML' },
  { caso: 'F-2026-03', proveedor: 'Edenred (interno)', tipo: 'Carga inconsistente',  monto:  3600, estado: 'Resuelto',    detalle: 'Operador cargó vehículo personal' }
]

export const inventarioMuerto = [
  { sku: '—', producto: 'Equipo soldadura especial', stock: 2, valor: 48000, ultMov: '2025-02-10', mesesParado: 15, recomienda: 'Vender / donar' },
  { sku: '—', producto: 'Repuestos modelo discontinuado',  stock: 14, valor: 28400, ultMov: '2024-11-22', mesesParado: 18, recomienda: 'Liquidar' },
  { sku: '—', producto: 'Conos de tráfico extra',     stock: 28, valor: 8400,  ultMov: '2025-08-15', mesesParado:  9, recomienda: 'Mantener' }
]

export const formatosCompras = [
  { id: 'CM-001', nombre: 'Generar Requisición',          desc: 'Plantilla digital validada por AG-17', usadoMes: 38 },
  { id: 'CM-002', nombre: 'Generar OC a Proveedor',       desc: 'Plantilla con cláusulas estándar y SLA', usadoMes: 32 },
  { id: 'CM-003', nombre: 'Vale Salida de Almacén',       desc: 'Asigna refacción/EPP a unidad y operador', usadoMes: 96 },
  { id: 'CM-004', nombre: 'Recepción / Rechazo Mercancía', desc: 'Cruce contra OC, genera NC automática si falla', usadoMes: 38 },
  { id: 'CM-005', nombre: 'Devolución de Core / Pieza Usada', desc: 'Obliga devolución antes de entregar pieza nueva', usadoMes: 18 },
  { id: 'CM-006', nombre: 'Conteo Cíclico Aleatorio',     desc: 'Auditoría semanal de 10 SKUs al azar', usadoMes:  4 },
  { id: 'CM-007', nombre: 'Bloqueo Stock Máx/Mín por IA', desc: 'Evita compras innecesarias / por debajo de mínimo', usadoMes: 12 }
]

// ---------- 33. RH · Rotación, sucesión, costos, cultura, CV ----------

export const riesgoRotacion = [
  { persona: 'Omar Gómez',         puesto: 'Maniobrista',  riesgoSalida: 0.62, burnout: 'medio',  ausentismo: '4d/mes', motivos: ['Salario', 'Sobrecarga'] },
  { persona: 'Luis Morales',       puesto: 'Operador Grúa', riesgoSalida: 0.18, burnout: 'bajo',   ausentismo: '0d/mes', motivos: [] },
  { persona: 'Saul Esteban',       puesto: 'Operador Grúa', riesgoSalida: 0.34, burnout: 'bajo',   ausentismo: '1d/mes', motivos: ['Distancia familia'] }
]

export const matrizSucesion = [
  { rol: 'Líder Finanzas',     titular: 'Jaqueline Santos',  backup: 'Aux. Contable Sr.',  readiness: 'medio', plan: '6 meses' },
  { rol: 'Líder Operaciones',  titular: 'Valentina García',  backup: 'Coord. Sitio Tap.',  readiness: 'bajo',  plan: '12 meses' },
  { rol: 'Líder Compras',      titular: 'Jonathan Carrillo', backup: 'Asistente Compras',  readiness: 'medio', plan: '6 meses' },
  { rol: 'Líder Marketing',    titular: 'Ahtziri López',     backup: 'Freelance Creative', readiness: 'medio', plan: '3 meses' },
  { rol: 'CEO',                titular: 'Ing. Ricardo Nieto', backup: 'Sin definido',     readiness: 'crítico', plan: 'Planeación 24m' }
]

export const certificacionesCriticas = [
  { persona: 'Omar Gómez',        certif: 'DC3 NOM-031',     vence: '2026-05-30', estado: 'proximo' },
  { persona: 'Luis Morales',      certif: 'Lic. Federal',     vence: '2026-06-30', estado: 'proximo' },
  { persona: 'Saul Esteban',      certif: 'DC3 + Médico',     vence: '2026-08-15', estado: 'vigente' },
  { persona: 'Valentina García',  certif: 'NOM-035 + LSST',   vence: '2026-09-20', estado: 'vigente' }
]

export const costoRH = [
  { area: 'Operaciones',  headcount: 28, costoMes: 1820000, productividad: 88 },
  { area: 'Finanzas',     headcount:  3, costoMes:  142000, productividad: 94 },
  { area: 'Compras',      headcount:  4, costoMes:  184000, productividad: 81 },
  { area: 'Marketing',    headcount:  3, costoMes:  148000, productividad: 90 },
  { area: 'Coordinación', headcount:  4, costoMes:  220000, productividad: 84 }
]

export const scoreCultura = {
  general: 78,
  pilares: [
    { pilar: 'Liderazgo',       score: 82 },
    { pilar: 'Comunicación',    score: 74 },
    { pilar: 'Reconocimiento',  score: 68 },
    { pilar: 'Desarrollo',      score: 72 },
    { pilar: 'Balance vida',    score: 78 },
    { pilar: 'Seguridad psicológica', score: 84 }
  ],
  enps: 42
}

export const cvFiltrados = [
  { folio: 'CV-2026-12', nombre: 'A. Hernández', puesto: 'Operador Grúa', experiencia: '8 años', score: 92, match: 'Alto',  ia: 'Recomendado · perfil similar a Luis Morales' },
  { folio: 'CV-2026-13', nombre: 'M. Rodríguez', puesto: 'Operador Grúa', experiencia: '6 años', score: 88, match: 'Alto',  ia: 'Recomendado · DC3 vigente' },
  { folio: 'CV-2026-14', nombre: 'J. Pérez',     puesto: 'Operador Grúa', experiencia: '3 años', score: 64, match: 'Medio', ia: 'Reserva · falta certificación' },
  { folio: 'CV-2026-15', nombre: 'E. López',     puesto: 'Operador Grúa', experiencia: '2 años', score: 52, match: 'Bajo',  ia: 'Descartar' },
  { folio: 'CV-2026-16', nombre: 'F. Castro',    puesto: 'Operador Grúa', experiencia: '5 años', score: 78, match: 'Medio', ia: 'Entrevistar' }
]

// ---------- 34. Marketing · Leads, CAC, ROI, Reputación ----------

export const leadsVentasMK = [
  { mes: 'Ene', leads:  84, ventas: 12, ingreso: 2820000 },
  { mes: 'Feb', leads:  72, ventas:  9, ingreso: 1820000 },
  { mes: 'Mar', leads:  96, ventas: 14, ingreso: 4140000 },
  { mes: 'Abr', leads: 108, ventas: 18, ingreso: 5240000 },
  { mes: 'May', leads:  84, ventas: 11, ingreso: 2840000 }
]

export const cacROI = [
  { campaña: 'IG · Kratos FP — Maniobras',  inversion:  28000, leads: 38, clientes: 6, cac:  4667, roi:  3.8, estado: 'Activa' },
  { campaña: 'LinkedIn · Empresarial',       inversion:  18000, leads: 14, clientes: 3, cac:  6000, roi:  2.4, estado: 'Activa' },
  { campaña: 'TikTok · KraTec',              inversion:  12000, leads: 24, clientes: 2, cac:  6000, roi:  1.2, estado: 'Pausada' },
  { campaña: 'Email · Cartera A',            inversion:   4000, leads: 18, clientes: 4, cac:  1000, roi:  6.2, estado: 'Activa' },
  { campaña: 'WhatsApp Business · Cuentas',   inversion:   8000, leads: 28, clientes: 5, cac:  1600, roi:  5.1, estado: 'Activa' }
]

export const monitoreoReputacion = [
  { fuente: 'Google Reviews',  rating: 4.6, reseñas: 84, ultimoComentario: 'Excelente servicio en Tapachula',                sentimiento: 'positivo' },
  { fuente: 'Facebook',        rating: 4.4, reseñas: 42, ultimoComentario: 'Tiempos de respuesta mejorables',                  sentimiento: 'neutral' },
  { fuente: 'WhatsApp Quejas', rating: 0,   reseñas:  3, ultimoComentario: 'Retraso en cobranza factura abril',                sentimiento: 'negativo' },
  { fuente: 'LinkedIn',        rating: 4.8, reseñas: 12, ultimoComentario: 'Liderazgo y profesionalismo de su equipo',         sentimiento: 'positivo' }
]

// ---------- 35. Calidad · Matriz riesgo, costo no calidad, NC recurrentes ----------

export const matrizRiesgoOperativo = [
  { riesgo: 'Caída de carga',              probabilidad: 2, severidad: 5, score: 10, mitigacion: 'Plan izaje + grilletes certificados' },
  { riesgo: 'Volcadura grúa',               probabilidad: 1, severidad: 5, score:  5, mitigacion: 'Estudio terreno + plataforma firme' },
  { riesgo: 'Accidente vial',                probabilidad: 3, severidad: 4, score: 12, mitigacion: 'Rutas SCT + GPS + capacitación' },
  { riesgo: 'Daño a infraestructura',       probabilidad: 2, severidad: 3, score:  6, mitigacion: 'Liberación maniobra firmada' },
  { riesgo: 'Lesión personal',               probabilidad: 2, severidad: 4, score:  8, mitigacion: 'EPP + capacitación NOM-031' },
  { riesgo: 'Falla mecánica en sitio',      probabilidad: 3, severidad: 3, score:  9, mitigacion: 'Mantto predictivo + checklist' },
  { riesgo: 'No conformidad documental',    probabilidad: 4, severidad: 2, score:  8, mitigacion: 'Auditoría semanal Calidad' },
  { riesgo: 'Incumplimiento SCT/NOM',       probabilidad: 2, severidad: 4, score:  8, mitigacion: 'Vigía Documental AG-08' }
]

export const ncRecurrentes = [
  { patron: 'OC sin 3 cotizaciones',        repeticiones: 6, area: 'Compras',      mes: 'Abr-May', accion: 'Bloqueo automático OC sin 3 cotiz.' },
  { patron: 'Falta checklist accesorios izaje', repeticiones: 4, area: 'Operaciones',  mes: 'Mar-May', accion: 'Checklist obligatorio app móvil' },
  { patron: 'Comprobación gastos sin CFDI',   repeticiones: 3, area: 'Finanzas',     mes: 'Mar-Abr', accion: 'Validación AG-04 automática' },
  { patron: 'Documentación operador incompleta', repeticiones: 3, area: 'RH',           mes: 'Feb-May', accion: 'Bloqueo de rol hasta completar' }
]

export const scoreISO = {
  iso9001: { vigente: true, score: 88, ultimaAuditoria: '2025-11-22', proxima: '2026-11-22', hallazgos: 3 },
  iso14001: { vigente: false, score: 0, ultimaAuditoria: '—', proxima: '—', hallazgos: 0 },
  iso45001: { vigente: true, score: 82, ultimaAuditoria: '2026-02-15', proxima: '2027-02-15', hallazgos: 4 }
}

export const alertasLegales = [
  { tipo: 'Documento',   titulo: 'CSF Kratos FP — renovación anual',        vence: '2026-12-31', estado: 'vigente', dias: 226 },
  { tipo: 'Certificación', titulo: 'NOM-031 grúa G005',                       vence: '2026-05-30', estado: 'proximo', dias: 16 },
  { tipo: 'Vigencia',     titulo: 'Permiso SCT autotransporte',               vence: '2026-09-15', estado: 'vigente', dias: 124 },
  { tipo: 'Documento',     titulo: 'REPSE — reporte cuatrimestral Q1',         vence: '2026-05-31', estado: 'proximo', dias: 17 },
  { tipo: 'Certificación', titulo: 'ISO 9001:2015 — auditoría externa',         vence: '2026-11-22', estado: 'vigente', dias: 187 },
  { tipo: 'Vigencia',      titulo: 'Verificación física G005',                  vence: '2026-05-30', estado: 'proximo', dias: 16 }
]
