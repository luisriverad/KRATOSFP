// ============================================================
//  KRATOS · Expedientes detallados
//  Datos enriquecidos sobre los formatos reales:
//  - DOCUMENTOS GRÚAS.xlsx / DOCUMENTOS VEHÍCULOS.xlsx
//  - BITÁCORA DE HECHOS DIARIOS 2026.xlsx
//  - Bitacora Mat-Noc Mayo .xlsx
//  - Control de cargas 2026 ok.xlsx
//  - Calendario de Descansos 2026.xlsx
//  - Rol de Trabajo.xlsx
//  - Lista de Proveedores SC 2026.xlsx
//  - Refacciones ALMACENsc-2.xlsx
//  - LISTA DE COMPRAS .xlsx
//  - FORMATOS.xlsx · Control de ausentismo laboral.xlsx
// ============================================================

// ===== Documentos por grúa (estructura idéntica al xlsx DOCS GRÚAS) =====
// Documentos esperados por unidad:
const DOC_TIPOS_GRUA = [
  'Tarjeta de circulación',
  'Verificación vehicular',
  'Póliza de seguro',
  'Permiso SCT',
  'Certificado NOM-031-STPS',
  'Carta de porte',
  'Manual del operador',
  'Manual de fabricante',
  'Bitácora de mantenimiento',
  'Constancia de capacitación',
  'Permiso de Maniobras Especiales',
  'Acta de entrega'
]

// Helper para generar docs por grúa de forma realista
function docsGrua({ tarjeta, verifica, poliza, sct, nom031, cartaPorte, manualOp, manualFab, bitacora, capacita, especial, acta }) {
  return [
    { tipo: 'Tarjeta de circulación', vence: tarjeta.vence,     folio: tarjeta.folio,    emisor: 'SCT',                   archivo: tarjeta.archivo,    estado: tarjeta.estado },
    { tipo: 'Verificación vehicular',vence: verifica.vence,    folio: verifica.folio,   emisor: 'Hidalgo Movilidad',     archivo: verifica.archivo,   estado: verifica.estado },
    { tipo: 'Póliza de seguro',      vence: poliza.vence,      folio: poliza.folio,     emisor: poliza.emisor || 'Banorte', archivo: poliza.archivo, estado: poliza.estado },
    { tipo: 'Permiso SCT',           vence: sct.vence,         folio: sct.folio,        emisor: 'SCT',                   archivo: sct.archivo,        estado: sct.estado },
    { tipo: 'Certificado NOM-031-STPS', vence: nom031.vence,   folio: nom031.folio,     emisor: 'Verificador externo',   archivo: nom031.archivo,     estado: nom031.estado },
    { tipo: 'Manual del operador',   vence: null,              folio: manualOp.folio,   emisor: 'Fabricante',            archivo: manualOp.archivo,   estado: 'vigente' },
    { tipo: 'Manual de fabricante',  vence: null,              folio: manualFab.folio,  emisor: 'Fabricante',            archivo: manualFab.archivo,  estado: 'vigente' },
    { tipo: 'Bitácora de mantenimiento', vence: bitacora.vence,folio: bitacora.folio,   emisor: 'Kratos FP',             archivo: bitacora.archivo,   estado: bitacora.estado },
    { tipo: 'DC3 operador asignado', vence: capacita.vence,    folio: capacita.folio,   emisor: 'STPS',                  archivo: capacita.archivo,   estado: capacita.estado },
    { tipo: 'Permiso Maniobras Especiales', vence: especial.vence, folio: especial.folio, emisor: 'Municipio',          archivo: especial.archivo,   estado: especial.estado },
    { tipo: 'Acta de entrega cliente', vence: null,            folio: acta.folio,       emisor: 'Kratos FP',             archivo: acta.archivo,       estado: 'vigente' }
  ]
}

// ===== Mantenimientos: programado y ejecutado =====
function manttoTpl(rows) {
  return rows.map((r, i) => ({
    folio: `MTTO-${r.eco}-${String(r.idx).padStart(3, '0')}`,
    ...r
  }))
}

// ===== Bitácora (entradas reales tipo "BITÁCORA DE HECHOS DIARIOS") =====
function bitacoraTpl(rows) {
  return rows.map((r) => ({ ...r }))
}

// ===== Telemetría GPS (simulada) =====
const gpsRuta = (puntos) => puntos

// ============================================================
//  EXPEDIENTES POR GRÚA
// ============================================================
export const expedientesGruas = {
  G003: {
    eco: 'G003', marca: 'HIAB', modelo: 'Hidráulica', anio: 2022, capacidad: '12 ton',
    serie: 'HIAB-X-CL12-22-04471', placas: 'HM3211H', vin: 'JH4DA9450KS123456',
    color: 'Rojo Kratos', tipoMotor: 'Diésel', combustible: '180 L', cliente: 'Constructora Tapachula SA',
    obra: 'Obra civil Tapachula sitio 3278', desdeContrato: '2026-02-04', horasContrato: 1920,
    documentos: docsGrua({
      tarjeta:  { vence: '2027-02-15', folio: 'TC-HM3211H', archivo: 'TC_G003.pdf', estado: 'vigente' },
      verifica: { vence: '2026-12-04', folio: 'VV-2025-04471', archivo: 'VV_G003.pdf', estado: 'vigente' },
      poliza:   { vence: '2026-09-30', folio: 'PL-1248-26', emisor: 'Seguros Banorte', archivo: 'POL_G003.pdf', estado: 'vigente' },
      sct:      { vence: '2026-11-22', folio: 'SCT-G003-2025', archivo: 'SCT_G003.pdf', estado: 'vigente' },
      nom031:   { vence: '2026-08-12', folio: 'NOM031-VPRO-2025-118', archivo: 'NOM031_G003.pdf', estado: 'vigente' },
      manualOp: { folio: 'MO-HIAB-CL12', archivo: 'Manual_Op_HIAB_CL12.pdf' },
      manualFab:{ folio: 'MF-HIAB-X-CL12', archivo: 'Manual_Fab_HIAB.pdf' },
      bitacora: { vence: null, folio: 'BIT-G003-2026', archivo: 'BIT_G003_2026.xlsx', estado: 'vigente' },
      capacita: { vence: '2026-11-04', folio: 'DC3-LHM-2025', archivo: 'DC3_LHMorales.pdf', estado: 'vigente' },
      especial: { vence: '2026-06-30', folio: 'PME-Tap-3278', archivo: 'PME_Tap_3278.pdf', estado: 'proximo' },
      acta:     { folio: 'ACT-G003-Tap-2026-02', archivo: 'Acta_Tapachula_G003.pdf' }
    }),
    telemetria: gpsRuta([
      { x: 10, y: 90, lugar: 'Patio Kratos · Zempoala', kmh: 0,  hace: '08:00' },
      { x: 25, y: 75, lugar: 'México - Pachuca km 88',  kmh: 78, hace: '10:14' },
      { x: 45, y: 55, lugar: 'Puebla bypass',           kmh: 82, hace: '13:40' },
      { x: 70, y: 30, lugar: 'Veracruz · Acayucan',     kmh: 65, hace: '21:05' },
      { x: 90, y: 18, lugar: 'Sitio Tapachula 3278',    kmh: 0,  hace: 'hace 8 min', label: 'EN OBRA' }
    ]),
    mantenimiento: manttoTpl([
      { eco: 'G003', idx: 1, fecha: '2026-01-12', tipo: 'Preventivo · 250h', horometro: 4250, proveedor: 'Taller Kratos', costo: 8400, estado: 'Cerrado',  observa: 'Cambio aceite hidráulico + filtros' },
      { eco: 'G003', idx: 2, fecha: '2026-03-04', tipo: 'Correctivo',       horometro: 4612, proveedor: 'Taller Kratos', costo: 14820,estado: 'Cerrado',  observa: 'Reparación bomba hidráulica · proveedor de refacción Vikingo' },
      { eco: 'G003', idx: 3, fecha: '2026-04-22', tipo: 'Preventivo · 500h', horometro: 4750, proveedor: 'Taller Kratos', costo: 12200,estado: 'Cerrado',  observa: 'Engrase general y revisión sistema eléctrico' },
      { eco: 'G003', idx: 4, fecha: '2026-06-08', tipo: 'Preventivo · 250h', horometro: 4925, proveedor: 'Taller Kratos', costo: 8400, estado: 'Programado', observa: 'Próximo programado' }
    ]),
    bitacora: bitacoraTpl([
      { fecha: '2026-05-13', hora: '07:55', turno: 'Mat',  operador: 'Saul Esteban Prieto',  evento: 'Inicio jornada · checklist OK · combustible 95%', severity: 'ok' },
      { fecha: '2026-05-13', hora: '11:42', turno: 'Mat',  operador: 'Saul Esteban Prieto',  evento: 'Maniobra 1 · izaje viga 8t · 38 min', severity: 'info' },
      { fecha: '2026-05-13', hora: '15:18', turno: 'Mat',  operador: 'Saul Esteban Prieto',  evento: 'Reporta falla menor en estabilizador trasero izq', severity: 'warn' },
      { fecha: '2026-05-13', hora: '18:30', turno: 'Mat',  operador: 'Saul Esteban Prieto',  evento: 'Fin jornada · 9.2h efectivas · 1 detención logística cliente', severity: 'info' },
      { fecha: '2026-05-14', hora: '06:50', turno: 'Mat',  operador: 'Saul Esteban Prieto',  evento: 'Inicio jornada · ajuste estabilizador OK', severity: 'ok' }
    ]),
    cargas: [
      { folio: 'CG-2026-218', fecha: '2026-04-18', tipo: 'Izaje · prefabricado', cliente: 'Constructora Tapachula', horas: 6.5, monto: 28400, estado: 'Facturado' },
      { folio: 'CG-2026-244', fecha: '2026-04-25', tipo: 'Maniobra estructura', cliente: 'Constructora Tapachula', horas: 9.0, monto: 38600, estado: 'Facturado' },
      { folio: 'CG-2026-265', fecha: '2026-05-02', tipo: 'Izaje · cimbra',      cliente: 'Constructora Tapachula', horas: 8.0, monto: 34200, estado: 'Facturado' },
      { folio: 'CG-2026-281', fecha: '2026-05-09', tipo: 'Izaje · vigas',       cliente: 'Constructora Tapachula', horas: 7.5, monto: 32100, estado: 'Facturado' },
      { folio: 'CG-2026-294', fecha: '2026-05-13', tipo: 'Maniobra premontaje', cliente: 'Constructora Tapachula', horas: 9.2, monto: 39400, estado: 'Pendiente OC' }
    ],
    costos: {
      ingresoMes: 482100, costoOpMes: 168400, utilidadMes: 313700,
      ingresoYTD: 2210400, costoOpYTD: 812400, utilidadYTD: 1398000,
      horasFacturablesMes: 124, horasMuertaMes: 14, utilizacion: 89
    }
  },

  G004: {
    eco: 'G004', marca: 'XCMG', modelo: 'QY25', anio: 2023, capacidad: '25 ton',
    serie: 'XCMG-QY25-23-08829', placas: 'HN0142H', vin: 'XCMG3344KS210045',
    color: 'Amarillo', tipoMotor: 'Diésel', combustible: '240 L', cliente: '—',
    obra: 'En patio Zempoala · esperando asignación', desdeContrato: '—', horasContrato: 0,
    documentos: docsGrua({
      tarjeta:  { vence: '2026-11-30', folio: 'TC-HN0142H', archivo: 'TC_G004.pdf', estado: 'vigente' },
      verifica: { vence: '2026-08-22', folio: 'VV-2025-08829', archivo: 'VV_G004.pdf', estado: 'vigente' },
      poliza:   { vence: '2026-06-04', folio: 'PL-1421-26', archivo: 'POL_G004.pdf', estado: 'proximo' },
      sct:      { vence: '2026-09-15', folio: 'SCT-G004-2025', archivo: 'SCT_G004.pdf', estado: 'vigente' },
      nom031:   { vence: '2026-06-04', folio: 'NOM031-VPRO-2025-122', archivo: 'NOM031_G004.pdf', estado: 'proximo' },
      manualOp: { folio: 'MO-XCMG-QY25', archivo: 'Manual_Op_QY25.pdf' },
      manualFab:{ folio: 'MF-XCMG', archivo: 'Manual_Fab_XCMG.pdf' },
      bitacora: { folio: 'BIT-G004-2026', archivo: 'BIT_G004_2026.xlsx', estado: 'vigente' },
      capacita: { vence: '—', folio: 'pendiente', archivo: '—', estado: 'pendiente' },
      especial: { vence: '—', folio: 'sin asignar', archivo: '—', estado: 'pendiente' },
      acta:     { folio: '—', archivo: '—' }
    }),
    telemetria: gpsRuta([
      { x: 50, y: 50, lugar: 'Patio Kratos · Zempoala', kmh: 0, hace: 'hace 6 h', label: 'PATIO' }
    ]),
    mantenimiento: manttoTpl([
      { eco: 'G004', idx: 1, fecha: '2026-02-14', tipo: 'Preventivo · 250h', horometro: 2950, proveedor: 'Taller Kratos', costo: 9200,  estado: 'Cerrado', observa: '' },
      { eco: 'G004', idx: 2, fecha: '2026-04-30', tipo: 'Preventivo · 500h', horometro: 3180, proveedor: 'Taller Kratos', costo: 14600, estado: 'Cerrado', observa: 'Cambio aceite motor + filtros aire/diésel' }
    ]),
    bitacora: bitacoraTpl([
      { fecha: '2026-05-08', hora: '17:30', turno: 'Mat', operador: '—', evento: 'Llegada a patio Zempoala desde Pachuca', severity: 'info' },
      { fecha: '2026-05-10', hora: '09:00', turno: 'Mat', operador: 'Equipo patio', evento: 'Mantenimiento preventivo 500h completado', severity: 'ok' }
    ]),
    cargas: [
      { folio: 'CG-2026-201', fecha: '2026-04-02', tipo: 'Izaje · industrial',   cliente: 'Cemex Latam',     horas: 12.0,monto: 56400, estado: 'Facturado' },
      { folio: 'CG-2026-219', fecha: '2026-04-18', tipo: 'Maniobra estructura',  cliente: 'OHL México',      horas: 8.5, monto: 41200, estado: 'Facturado' }
    ],
    costos: { ingresoMes: 0, costoOpMes: 14600, utilidadMes: -14600, ingresoYTD: 612400, costoOpYTD: 248200, utilidadYTD: 364200, horasFacturablesMes: 0, horasMuertaMes: 168, utilizacion: 0 }
  },

  G005: {
    eco: 'G005', marca: 'XCMG', modelo: 'XCT12', anio: 2023, capacidad: '12 ton',
    serie: 'XCMG-XCT12-23-31250', placas: 'HM4502H', vin: 'XCMG5512KS221145',
    color: 'Amarillo Kratos', tipoMotor: 'Diésel', combustible: '180 L', cliente: 'Constructora Tapachula SA',
    obra: 'Obra civil Tapachula sitio 3278', desdeContrato: '2026-01-08', horasContrato: 1920,
    documentos: docsGrua({
      tarjeta:  { vence: '2027-01-12', folio: 'TC-HM4502H', archivo: 'TC_G005.pdf', estado: 'vigente' },
      verifica: { vence: '2026-05-30', folio: 'VV-2025-31250', archivo: 'VV_G005.pdf', estado: 'proximo' },
      poliza:   { vence: '2026-07-15', folio: 'PL-1248-26', archivo: 'POL_G005.pdf', estado: 'vigente' },
      sct:      { vence: '2026-10-04', folio: 'SCT-G005-2025', archivo: 'SCT_G005.pdf', estado: 'vigente' },
      nom031:   { vence: '2026-05-30', folio: 'NOM031-VPRO-2025-118', archivo: 'NOM031_G005.pdf', estado: 'proximo' },
      manualOp: { folio: 'MO-XCMG-XCT12', archivo: 'Manual_Op_XCT12.pdf' },
      manualFab:{ folio: 'MF-XCMG-XCT', archivo: 'Manual_Fab_XCMG_XCT.pdf' },
      bitacora: { folio: 'BIT-G005-2026', archivo: 'BIT_G005_2026.xlsx', estado: 'vigente' },
      capacita: { vence: '2026-09-20', folio: 'DC3-LHM-2025', archivo: 'DC3_LHMorales.pdf', estado: 'vigente' },
      especial: { vence: '2026-06-30', folio: 'PME-Tap-3278', archivo: 'PME_Tap_3278.pdf', estado: 'proximo' },
      acta:     { folio: 'ACT-G005-Tap-2026-01', archivo: 'Acta_Tapachula_G005.pdf' }
    }),
    telemetria: gpsRuta([
      { x: 10, y: 90, lugar: 'Patio Kratos · Zempoala', kmh: 0,  hace: '07:30' },
      { x: 30, y: 70, lugar: 'Pachuca - Veracruz',      kmh: 86, hace: '09:18' },
      { x: 55, y: 45, lugar: 'Veracruz · Tierra Blanca',kmh: 84, hace: '14:22' },
      { x: 88, y: 22, lugar: 'Sitio Tapachula 3278',    kmh: 0,  hace: 'hace 12 min', label: 'EN OBRA' }
    ]),
    mantenimiento: manttoTpl([
      { eco: 'G005', idx: 1, fecha: '2026-02-21', tipo: 'Preventivo · 250h', horometro: 4920, proveedor: 'Taller Kratos', costo: 8400, estado: 'Cerrado',  observa: '' },
      { eco: 'G005', idx: 2, fecha: '2026-04-04', tipo: 'Correctivo',       horometro: 5320, proveedor: 'Servicio XCMG', costo: 22400,estado: 'Cerrado',  observa: 'Sensor de inclinación · garantía aplicada' },
      { eco: 'G005', idx: 3, fecha: '2026-05-30', tipo: 'Preventivo · 500h', horometro: 5700, proveedor: 'Taller Kratos', costo: 14200,estado: 'Programado', observa: 'Coincide con verificación' }
    ]),
    bitacora: bitacoraTpl([
      { fecha: '2026-05-13', hora: '07:48', turno: 'Mat',  operador: 'Luis Heberto Morales', evento: 'Inicio jornada · checklist OK', severity: 'ok' },
      { fecha: '2026-05-13', hora: '14:22', turno: 'Mat',  operador: 'Luis Heberto Morales', evento: 'Maniobra cimbra 11t · 1h 48min', severity: 'info' },
      { fecha: '2026-05-13', hora: '18:55', turno: 'Mat',  operador: 'Luis Heberto Morales', evento: 'Fin jornada · 10.5h efectivas', severity: 'info' },
      { fecha: '2026-05-14', hora: '06:42', turno: 'Mat',  operador: 'Luis Heberto Morales', evento: 'AG-08 alerta: verificación vence en 16 días', severity: 'warn' }
    ]),
    cargas: [
      { folio: 'CG-2026-198', fecha: '2026-04-04', tipo: 'Izaje · vigas',       cliente: 'Constructora Tapachula', horas: 9.0, monto: 36800, estado: 'Facturado' },
      { folio: 'CG-2026-241', fecha: '2026-04-22', tipo: 'Maniobra estructura', cliente: 'Constructora Tapachula', horas: 8.5, monto: 34900, estado: 'Facturado' },
      { folio: 'CG-2026-272', fecha: '2026-05-07', tipo: 'Izaje · cimbra',      cliente: 'Constructora Tapachula', horas: 10.0,monto: 41200, estado: 'Facturado' },
      { folio: 'CG-2026-291', fecha: '2026-05-12', tipo: 'Izaje · cimbra',      cliente: 'Constructora Tapachula', horas: 9.5, monto: 38800, estado: 'Pendiente OC' }
    ],
    costos: { ingresoMes: 412800, costoOpMes: 184200, utilidadMes: 228600, ingresoYTD: 1928400, costoOpYTD: 902100, utilidadYTD: 1026300, horasFacturablesMes: 118, horasMuertaMes: 22, utilizacion: 84 }
  },

  G008: {
    eco: 'G008', marca: 'Dongfeng', modelo: 'TITAN SQ20T', anio: 2023, capacidad: '20 ton',
    serie: 'DF-TITAN-23-24890', placas: 'HM6188H', vin: 'DFTITAN24890KS00',
    color: 'Blanco', tipoMotor: 'Diésel', combustible: '220 L', cliente: '—',
    obra: 'Mantenimiento mayor en taller', desdeContrato: '—', horasContrato: 0,
    documentos: docsGrua({
      tarjeta:  { vence: '2027-05-05', folio: 'TC-HM6188H', archivo: 'TC_G008.pdf', estado: 'vigente' },
      verifica: { vence: '2026-09-22', folio: 'VV-2025-24890', archivo: 'VV_G008.pdf', estado: 'vigente' },
      poliza:   { vence: '2026-08-18', folio: 'PL-1422-26', archivo: 'POL_G008.pdf', estado: 'vigente' },
      sct:      { vence: '2026-08-20', folio: 'SCT-G008-2025', archivo: 'SCT_G008.pdf', estado: 'vigente' },
      nom031:   { vence: '2026-07-20', folio: 'NOM031-VPRO-2025-130', archivo: 'NOM031_G008.pdf', estado: 'vigente' },
      manualOp: { folio: 'MO-DF-SQ20T', archivo: 'Manual_Op_SQ20T.pdf' },
      manualFab:{ folio: 'MF-DF-TITAN', archivo: 'Manual_Fab_DF.pdf' },
      bitacora: { folio: 'BIT-G008-2026', archivo: 'BIT_G008_2026.xlsx', estado: 'vigente' },
      capacita: { vence: '—', folio: 'pendiente', archivo: '—', estado: 'pendiente' },
      especial: { vence: '—', folio: 'sin asignar', archivo: '—', estado: 'pendiente' },
      acta:     { folio: '—', archivo: '—' }
    }),
    telemetria: gpsRuta([
      { x: 50, y: 50, lugar: 'Patio Kratos · Zempoala (Taller)', kmh: 0, hace: 'hace 4 d', label: 'TALLER' }
    ]),
    mantenimiento: manttoTpl([
      { eco: 'G008', idx: 1, fecha: '2026-03-14', tipo: 'Preventivo · 500h', horometro: 3820, proveedor: 'Taller Kratos', costo: 16400, estado: 'Cerrado',  observa: '' },
      { eco: 'G008', idx: 2, fecha: '2026-05-10', tipo: 'Correctivo mayor',  horometro: 4188, proveedor: 'Servicio Dongfeng MX', costo: 86400, estado: 'En proceso', observa: 'Reparación caja de transferencia. ETA 4 días.' }
    ]),
    bitacora: bitacoraTpl([
      { fecha: '2026-05-10', hora: '11:00', turno: 'Mat', operador: 'Equipo patio', evento: 'Ingresa a taller · falla caja transferencia', severity: 'danger' },
      { fecha: '2026-05-11', hora: '09:00', turno: 'Mat', operador: 'Equipo patio', evento: 'Refacciones autorizadas · espera proveedor', severity: 'warn' },
      { fecha: '2026-05-13', hora: '16:00', turno: 'Mat', operador: 'Equipo patio', evento: 'Refacciones recibidas · inicia armado', severity: 'info' }
    ]),
    cargas: [
      { folio: 'CG-2026-188', fecha: '2026-03-24', tipo: 'Izaje · industrial', cliente: 'ICA Fluor', horas: 11.0, monto: 52400, estado: 'Facturado' }
    ],
    costos: { ingresoMes: 0, costoOpMes: 86400, utilidadMes: -86400, ingresoYTD: 412800, costoOpYTD: 304200, utilidadYTD: 108600, horasFacturablesMes: 0, horasMuertaMes: 168, utilizacion: 0 }
  },

  G009: {
    eco: 'G009', marca: 'SANY', modelo: 'STC1000 (0410)', anio: 2024, capacidad: '100 ton',
    serie: 'SANY-STC1000-24-0410', placas: 'HP2240H', vin: 'SANYSTC0410K2440',
    color: 'Naranja SANY', tipoMotor: 'Diésel', combustible: '420 L', cliente: 'Constructora Mota Engil',
    obra: 'Obra civil Tapachula sitio 3278', desdeContrato: '2026-01-15', horasContrato: 5760,
    documentos: docsGrua({
      tarjeta:  { vence: '2027-04-12', folio: 'TC-HP2240H', archivo: 'TC_G009.pdf', estado: 'vigente' },
      verifica: { vence: '2026-10-15', folio: 'VV-2026-0410', archivo: 'VV_G009.pdf', estado: 'vigente' },
      poliza:   { vence: '2027-01-15', folio: 'PL-2891-26', archivo: 'POL_G009.pdf', estado: 'vigente' },
      sct:      { vence: '2027-01-04', folio: 'SCT-G009-2026', archivo: 'SCT_G009.pdf', estado: 'vigente' },
      nom031:   { vence: '2026-09-15', folio: 'NOM031-VPRO-2026-014', archivo: 'NOM031_G009.pdf', estado: 'vigente' },
      manualOp: { folio: 'MO-SANY-STC1000', archivo: 'Manual_Op_STC1000.pdf' },
      manualFab:{ folio: 'MF-SANY-STC', archivo: 'Manual_Fab_SANY.pdf' },
      bitacora: { folio: 'BIT-G009-2026', archivo: 'BIT_G009_2026.xlsx', estado: 'vigente' },
      capacita: { vence: '2026-11-04', folio: 'DC3-LHM-2025', archivo: 'DC3_LHMorales.pdf', estado: 'vigente' },
      especial: { vence: '2026-06-30', folio: 'PME-Tap-3278', archivo: 'PME_Tap_3278.pdf', estado: 'proximo' },
      acta:     { folio: 'ACT-G009-Tap-2026-01', archivo: 'Acta_Tapachula_G009.pdf' }
    }),
    telemetria: gpsRuta([
      { x: 12, y: 88, lugar: 'Zempoala (patio)',      kmh: 0,  hace: '06:50' },
      { x: 35, y: 65, lugar: 'Pachuca - Veracruz',    kmh: 78, hace: '08:42' },
      { x: 60, y: 42, lugar: 'Acayucan · cont. SCT',  kmh: 72, hace: '16:00' },
      { x: 78, y: 28, lugar: 'Salina Cruz',           kmh: 68, hace: '20:30' },
      { x: 92, y: 16, lugar: 'Sitio Tapachula 3278',  kmh: 0,  hace: 'hace 3 min', label: 'EN OBRA' }
    ]),
    mantenimiento: manttoTpl([
      { eco: 'G009', idx: 1, fecha: '2026-02-08', tipo: 'Preventivo · 250h',  horometro: 1450, proveedor: 'Taller Kratos', costo: 12400, estado: 'Cerrado', observa: '' },
      { eco: 'G009', idx: 2, fecha: '2026-04-12', tipo: 'Preventivo · 500h',  horometro: 1885, proveedor: 'Servicio SANY MX', costo: 28200, estado: 'Cerrado', observa: 'Garantía SANY aplicada parcialmente' },
      { eco: 'G009', idx: 3, fecha: '2026-06-15', tipo: 'Preventivo · 250h',  horometro: 2300, proveedor: 'Taller Kratos', costo: 12400, estado: 'Programado', observa: '' }
    ]),
    bitacora: bitacoraTpl([
      { fecha: '2026-05-13', hora: '07:30', turno: 'Mat', operador: 'Luis Heberto Morales', evento: 'Inicio jornada · checklist OK', severity: 'ok' },
      { fecha: '2026-05-13', hora: '10:15', turno: 'Mat', operador: 'Luis Heberto Morales', evento: 'Izaje torre prefabricada 38t · 1h 22min', severity: 'info' },
      { fecha: '2026-05-13', hora: '13:08', turno: 'Mat', operador: 'Luis Heberto Morales', evento: 'Pausa cliente · espera fundición', severity: 'warn' },
      { fecha: '2026-05-13', hora: '16:42', turno: 'Mat', operador: 'Luis Heberto Morales', evento: 'Izaje viga acero 22t · 48 min', severity: 'info' },
      { fecha: '2026-05-13', hora: '19:00', turno: 'Mat', operador: 'Luis Heberto Morales', evento: 'Fin jornada · 11h efectivas', severity: 'ok' }
    ]),
    cargas: [
      { folio: 'CG-2026-211', fecha: '2026-04-10', tipo: 'Izaje pesado',     cliente: 'Mota Engil', horas: 12.0, monto: 84200, estado: 'Facturado' },
      { folio: 'CG-2026-238', fecha: '2026-04-20', tipo: 'Izaje pesado',     cliente: 'Mota Engil', horas: 11.0, monto: 78100, estado: 'Facturado' },
      { folio: 'CG-2026-268', fecha: '2026-05-05', tipo: 'Izaje pesado',     cliente: 'Mota Engil', horas: 12.0, monto: 84800, estado: 'Facturado' },
      { folio: 'CG-2026-289', fecha: '2026-05-12', tipo: 'Izaje pesado',     cliente: 'Mota Engil', horas: 11.5, monto: 81200, estado: 'Pendiente OC' }
    ],
    costos: { ingresoMes: 828400, costoOpMes: 240200, utilidadMes: 588200, ingresoYTD: 3812000, costoOpYTD: 1184000, utilidadYTD: 2628000, horasFacturablesMes: 142, horasMuertaMes: 8, utilizacion: 96 }
  },

  G010: {
    eco: 'G010', marca: 'SANY', modelo: 'STC1000 (0443)', anio: 2024, capacidad: '100 ton',
    serie: 'SANY-STC1000-24-0443', placas: 'HP2241H', vin: 'SANYSTC0443K2440',
    color: 'Naranja SANY', tipoMotor: 'Diésel', combustible: '420 L', cliente: 'Constructora Mota Engil',
    obra: 'Obra civil Tapachula sitio 3278', desdeContrato: '2026-01-15', horasContrato: 5760,
    documentos: docsGrua({
      tarjeta:  { vence: '2027-04-12', folio: 'TC-HP2241H', archivo: 'TC_G010.pdf', estado: 'vigente' },
      verifica: { vence: '2026-10-15', folio: 'VV-2026-0443', archivo: 'VV_G010.pdf', estado: 'vigente' },
      poliza:   { vence: '2027-01-15', folio: 'PL-2892-26', archivo: 'POL_G010.pdf', estado: 'vigente' },
      sct:      { vence: '2027-01-04', folio: 'SCT-G010-2026', archivo: 'SCT_G010.pdf', estado: 'vigente' },
      nom031:   { vence: '2026-09-15', folio: 'NOM031-VPRO-2026-015', archivo: 'NOM031_G010.pdf', estado: 'vigente' },
      manualOp: { folio: 'MO-SANY-STC1000', archivo: 'Manual_Op_STC1000.pdf' },
      manualFab:{ folio: 'MF-SANY-STC', archivo: 'Manual_Fab_SANY.pdf' },
      bitacora: { folio: 'BIT-G010-2026', archivo: 'BIT_G010_2026.xlsx', estado: 'vigente' },
      capacita: { vence: '2026-08-15', folio: 'DC3-OGO-2025', archivo: 'DC3_OGomez.pdf', estado: 'vigente' },
      especial: { vence: '2026-06-30', folio: 'PME-Tap-3278', archivo: 'PME_Tap_3278.pdf', estado: 'proximo' },
      acta:     { folio: 'ACT-G010-Tap-2026-01', archivo: 'Acta_Tapachula_G010.pdf' }
    }),
    telemetria: gpsRuta([
      { x: 14, y: 86, lugar: 'Zempoala',            kmh: 0,  hace: '06:55' },
      { x: 40, y: 60, lugar: 'Puebla bypass',       kmh: 82, hace: '09:48' },
      { x: 65, y: 38, lugar: 'Veracruz - Coatzacoalcos', kmh: 76, hace: '15:00' },
      { x: 92, y: 18, lugar: 'Sitio Tapachula 3278', kmh: 0, hace: 'hace 8 min', label: 'EN OBRA' }
    ]),
    mantenimiento: manttoTpl([
      { eco: 'G010', idx: 1, fecha: '2026-02-09', tipo: 'Preventivo · 250h', horometro: 1280, proveedor: 'Taller Kratos', costo: 12400, estado: 'Cerrado', observa: '' },
      { eco: 'G010', idx: 2, fecha: '2026-04-14', tipo: 'Preventivo · 500h', horometro: 1720, proveedor: 'Servicio SANY MX', costo: 28200, estado: 'Cerrado', observa: '' }
    ]),
    bitacora: bitacoraTpl([
      { fecha: '2026-05-13', hora: '07:35', turno: 'Mat', operador: 'Omar Gómez', evento: 'Inicio jornada · checklist OK · combustible 92%', severity: 'ok' },
      { fecha: '2026-05-13', hora: '12:48', turno: 'Mat', operador: 'Omar Gómez', evento: 'Izaje torre prefabricada 42t · 1h 18min', severity: 'info' },
      { fecha: '2026-05-13', hora: '19:15', turno: 'Mat', operador: 'Omar Gómez', evento: 'Fin jornada · 11.5h efectivas', severity: 'ok' }
    ]),
    cargas: [
      { folio: 'CG-2026-214', fecha: '2026-04-10', tipo: 'Izaje pesado', cliente: 'Mota Engil', horas: 12.0, monto: 84000, estado: 'Facturado' },
      { folio: 'CG-2026-269', fecha: '2026-05-05', tipo: 'Izaje pesado', cliente: 'Mota Engil', horas: 11.5, monto: 81000, estado: 'Facturado' }
    ],
    costos: { ingresoMes: 812000, costoOpMes: 232400, utilidadMes: 579600, ingresoYTD: 3784000, costoOpYTD: 1158000, utilidadYTD: 2626000, horasFacturablesMes: 138, horasMuertaMes: 12, utilizacion: 92 }
  },

  G014: {
    eco: 'G014', marca: 'SANY', modelo: '100 TON', anio: 2024, capacidad: '100 ton',
    serie: 'SANY-100T-24-9870', placas: 'HP4488H', vin: 'SANY100T9870K244',
    color: 'Naranja SANY', tipoMotor: 'Diésel', combustible: '420 L', cliente: 'Constructora Tapachula SA',
    obra: 'Obra civil Tapachula sitio 3278 · turno Mat-Noc', desdeContrato: '2026-03-12', horasContrato: 3840,
    documentos: docsGrua({
      tarjeta:  { vence: '2027-06-04', folio: 'TC-HP4488H', archivo: 'TC_G014.pdf', estado: 'vigente' },
      verifica: { vence: '2026-12-01', folio: 'VV-2026-9870', archivo: 'VV_G014.pdf', estado: 'vigente' },
      poliza:   { vence: '2027-03-12', folio: 'PL-3014-26', archivo: 'POL_G014.pdf', estado: 'vigente' },
      sct:      { vence: '2027-02-22', folio: 'SCT-G014-2026', archivo: 'SCT_G014.pdf', estado: 'vigente' },
      nom031:   { vence: '2026-11-02', folio: 'NOM031-VPRO-2026-028', archivo: 'NOM031_G014.pdf', estado: 'vigente' },
      manualOp: { folio: 'MO-SANY-100T', archivo: 'Manual_Op_SANY100T.pdf' },
      manualFab:{ folio: 'MF-SANY-100', archivo: 'Manual_Fab_SANY_100T.pdf' },
      bitacora: { folio: 'BIT-G014-2026', archivo: 'BIT_G014_2026.xlsx', estado: 'vigente' },
      capacita: { vence: '2026-08-20', folio: 'DC3-EMN-2025', archivo: 'DC3_Mat_Noc.pdf', estado: 'vigente' },
      especial: { vence: '2026-06-30', folio: 'PME-Tap-3278', archivo: 'PME_Tap_3278.pdf', estado: 'proximo' },
      acta:     { folio: 'ACT-G014-Tap-2026-03', archivo: 'Acta_Tapachula_G014.pdf' }
    }),
    telemetria: gpsRuta([
      { x: 12, y: 88, lugar: 'Patio Kratos',            kmh: 0,  hace: '07:20' },
      { x: 40, y: 60, lugar: 'Puebla',                  kmh: 80, hace: '10:30' },
      { x: 60, y: 40, lugar: 'Veracruz · Acayucan',     kmh: 72, hace: '17:05' },
      { x: 92, y: 16, lugar: 'Sitio Tapachula 3278',    kmh: 0,  hace: 'hace 22 min', label: 'EN OBRA · MAT-NOC' }
    ]),
    mantenimiento: manttoTpl([
      { eco: 'G014', idx: 1, fecha: '2026-04-02', tipo: 'Preventivo · 250h', horometro: 1320, proveedor: 'Taller Kratos', costo: 12400, estado: 'Cerrado', observa: '' },
      { eco: 'G014', idx: 2, fecha: '2026-06-25', tipo: 'Preventivo · 250h', horometro: 1800, proveedor: 'Taller Kratos', costo: 12400, estado: 'Programado', observa: 'Coincidir con relevo Mat-Noc' }
    ]),
    bitacora: bitacoraTpl([
      { fecha: '2026-05-13', hora: '18:55', turno: 'Noc', operador: 'Equipo Mat-Noc', evento: 'Inicio jornada nocturna · checklist OK', severity: 'ok' },
      { fecha: '2026-05-13', hora: '22:30', turno: 'Noc', operador: 'Equipo Mat-Noc', evento: 'Izaje cubierta metálica 28t · 56 min', severity: 'info' },
      { fecha: '2026-05-14', hora: '04:12', turno: 'Noc', operador: 'Equipo Mat-Noc', evento: 'Cambio iluminación adicional · sin incidentes', severity: 'info' },
      { fecha: '2026-05-14', hora: '06:55', turno: 'Noc', operador: 'Equipo Mat-Noc', evento: 'Fin jornada nocturna · 12h efectivas · relevo turno Mat', severity: 'ok' }
    ]),
    cargas: [
      { folio: 'CG-2026-249', fecha: '2026-04-28', tipo: 'Izaje pesado nocturno', cliente: 'Constructora Tapachula', horas: 12.0, monto: 92400, estado: 'Facturado' },
      { folio: 'CG-2026-274', fecha: '2026-05-08', tipo: 'Izaje pesado nocturno', cliente: 'Constructora Tapachula', horas: 12.0, monto: 92400, estado: 'Facturado' },
      { folio: 'CG-2026-290', fecha: '2026-05-12', tipo: 'Izaje pesado nocturno', cliente: 'Constructora Tapachula', horas: 11.5, monto: 88200, estado: 'Facturado' }
    ],
    costos: { ingresoMes: 824000, costoOpMes: 218400, utilidadMes: 605600, ingresoYTD: 2818000, costoOpYTD: 842000, utilidadYTD: 1976000, horasFacturablesMes: 148, horasMuertaMes: 4, utilizacion: 97 }
  }
}

// ============================================================
//  EXPEDIENTES POR VEHÍCULO PILOTO / TRACTOCAMIÓN
// ============================================================
export const expedientesVehiculos = {
  V001: {
    eco: 'V001', marca: 'RAM', modelo: 'PMR 1043', anio: 2023, placas: 'HL5984H', tipo: 'Piloto',
    operador: 'Luis Heberto Morales', estado: 'Activo', kmAcum: 84200, combustible: 'Gasolina',
    documentos: [
      { tipo: 'Tarjeta circulación', vence: '2027-02-10', emisor: 'SCT',   folio: 'TC-HL5984H', estado: 'vigente',  archivo: 'TC_V001.pdf' },
      { tipo: 'Verificación',         vence: '2026-08-15', emisor: 'Hgo.', folio: 'VV-V001-25', estado: 'vigente',  archivo: 'VV_V001.pdf' },
      { tipo: 'Póliza de seguro',    vence: '2026-09-30', emisor: 'Banorte',folio: 'PL-1248-V01',estado: 'vigente',  archivo: 'POL_V001.pdf' },
      { tipo: 'Permiso SCT carga',   vence: '2026-12-04', emisor: 'SCT',   folio: 'SCT-V001',    estado: 'vigente',  archivo: 'SCT_V001.pdf' }
    ],
    mantenimiento: [
      { fecha: '2026-02-20', tipo: 'Servicio 20k',  km: 78400, costo: 4800, estado: 'Cerrado' },
      { fecha: '2026-04-30', tipo: 'Cambio llantas',km: 82900, costo: 22400,estado: 'Cerrado' }
    ]
  },
  V002: {
    eco: 'V002', marca: 'RAM', modelo: 'PMR 1314', anio: 2023, placas: 'HM4613H', tipo: 'Piloto',
    operador: 'Omar Gómez', estado: 'Activo', kmAcum: 72100, combustible: 'Gasolina',
    documentos: [
      { tipo: 'Tarjeta circulación', vence: '2027-04-12', emisor: 'SCT',   folio: 'TC-HM4613H', estado: 'vigente',  archivo: 'TC_V002.pdf' },
      { tipo: 'Verificación',         vence: '2026-10-22', emisor: 'Hgo.', folio: 'VV-V002-25', estado: 'vigente',  archivo: 'VV_V002.pdf' },
      { tipo: 'Póliza de seguro',    vence: '2026-07-18', emisor: 'Banorte',folio: 'PL-1248-V02',estado: 'proximo',  archivo: 'POL_V002.pdf' },
      { tipo: 'Permiso SCT carga',   vence: '2027-01-04', emisor: 'SCT',   folio: 'SCT-V002',    estado: 'vigente',  archivo: 'SCT_V002.pdf' }
    ],
    mantenimiento: [
      { fecha: '2026-03-05', tipo: 'Servicio 15k', km: 68200, costo: 4200, estado: 'Cerrado' }
    ]
  },
  V009: {
    eco: 'V009', marca: 'Toyota', modelo: 'Hilux', anio: 2022, placas: 'HM0843H', tipo: 'Piloto',
    operador: 'Saul Esteban Prieto', estado: 'Activo', kmAcum: 96200, combustible: 'Gasolina',
    documentos: [
      { tipo: 'Tarjeta circulación', vence: '2026-12-08', emisor: 'SCT',   folio: 'TC-HM0843H', estado: 'vigente',  archivo: 'TC_V009.pdf' },
      { tipo: 'Verificación',         vence: '2026-07-08', emisor: 'Hgo.', folio: 'VV-V009-25', estado: 'proximo',  archivo: 'VV_V009.pdf' },
      { tipo: 'Póliza de seguro',    vence: '2026-12-01', emisor: 'Banorte',folio: 'PL-1248-V09',estado: 'vigente',  archivo: 'POL_V009.pdf' },
      { tipo: 'Permiso SCT carga',   vence: '2026-10-22', emisor: 'SCT',   folio: 'SCT-V009',    estado: 'vigente',  archivo: 'SCT_V009.pdf' }
    ],
    mantenimiento: [
      { fecha: '2026-01-30', tipo: 'Servicio 90k', km: 90400, costo: 8800, estado: 'Cerrado' },
      { fecha: '2026-04-12', tipo: 'Alineación + balanceo', km: 94100, costo: 1800, estado: 'Cerrado' }
    ]
  },
  T001: {
    eco: 'T001', marca: 'Foton', modelo: 'Galaxy EVI', anio: 2024, placas: 'TR8821', tipo: 'Tractocamión',
    operador: 'Conductor externo', estado: 'En ruta', kmAcum: 28400, combustible: 'Diésel',
    documentos: [
      { tipo: 'Tarjeta circulación', vence: '2027-08-12', emisor: 'SCT',   folio: 'TC-TR8821',  estado: 'vigente',  archivo: 'TC_T001.pdf' },
      { tipo: 'Verificación',         vence: '2026-06-10', emisor: 'CDMX', folio: 'VV-T001-25', estado: 'proximo',  archivo: 'VV_T001.pdf' },
      { tipo: 'Póliza de seguro',    vence: '2026-11-15', emisor: 'Banorte',folio: 'PL-1422-T01',estado: 'vigente',  archivo: 'POL_T001.pdf' },
      { tipo: 'Permiso SCT carga',   vence: '2027-03-12', emisor: 'SCT',   folio: 'SCT-T001',    estado: 'vigente',  archivo: 'SCT_T001.pdf' }
    ],
    mantenimiento: [
      { fecha: '2026-04-22', tipo: 'Servicio 20k', km: 24800, costo: 14200, estado: 'Cerrado' }
    ]
  }
}
