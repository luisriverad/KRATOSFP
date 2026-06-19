// ============================================================
//  KRATOS · Bitácora · Cargas · Rutas SCT
//  Basado en:
//  - BITÁCORA DE HECHOS DIARIOS 2026.xlsx
//  - Bitacora Mat-Noc Mayo .xlsx
//  - Control de cargas 2026 ok.xlsx
//  - VSM_Proceso DPI.Gpo EDM (v Final).xlsx
// ============================================================

export const bitacoraDiaria = [
  { fecha: '2026-05-14', hora: '06:50', area: 'Operaciones', unidad: 'G003', operador: 'Saul Esteban Prieto',  evento: 'Inicio jornada · ajuste estabilizador OK', severity: 'ok',     turno: 'Mat' },
  { fecha: '2026-05-14', hora: '06:55', area: 'Operaciones', unidad: 'G014', operador: 'Equipo Mat-Noc',        evento: 'Fin jornada nocturna · relevo a turno Mat', severity: 'ok',     turno: 'Noc' },
  { fecha: '2026-05-14', hora: '07:30', area: 'Operaciones', unidad: 'G009', operador: 'Luis Heberto Morales',  evento: 'AG-08 alerta: PME Tapachula 3278 vence en 47d', severity: 'warn', turno: 'Mat' },
  { fecha: '2026-05-14', hora: '08:12', area: 'Finanzas',    unidad: '—',    operador: 'Jaqueline Santos',      evento: 'Conciliación BBVA · 4 movimientos sin clasificar', severity: 'info', turno: 'Mat' },
  { fecha: '2026-05-14', hora: '08:48', area: 'Compras',     unidad: '—',    operador: 'Jonathan Carrillo',     evento: 'Recepción OC-2026-122 (Vikingo) · 8 piezas OK', severity: 'ok', turno: 'Mat' },
  { fecha: '2026-05-14', hora: '09:02', area: 'Operaciones', unidad: 'G008', operador: 'Equipo taller',         evento: 'Caja transferencia · pruebas 75% completas', severity: 'info', turno: 'Mat' },
  { fecha: '2026-05-13', hora: '19:15', area: 'Operaciones', unidad: 'G010', operador: 'Omar Gómez',            evento: 'Fin jornada · 11.5h efectivas Tapachula', severity: 'ok',     turno: 'Mat' },
  { fecha: '2026-05-13', hora: '18:55', area: 'Operaciones', unidad: 'G014', operador: 'Equipo Mat-Noc',        evento: 'Inicio jornada nocturna · checklist OK', severity: 'ok',     turno: 'Noc' },
  { fecha: '2026-05-13', hora: '18:30', area: 'Operaciones', unidad: 'G003', operador: 'Saul Esteban Prieto',   evento: 'Fin jornada · falla menor estabilizador (resuelto 6:50)', severity: 'warn', turno: 'Mat' },
  { fecha: '2026-05-13', hora: '17:20', area: 'Marketing',   unidad: '—',    operador: 'Ahtziri López',         evento: 'Programado reel Kratos FP para 14/may 9am', severity: 'info', turno: 'Mat' },
  { fecha: '2026-05-13', hora: '16:42', area: 'Operaciones', unidad: 'G009', operador: 'Luis Heberto Morales',  evento: 'Izaje viga acero 22t · 48 min · OK', severity: 'ok',     turno: 'Mat' },
  { fecha: '2026-05-13', hora: '14:22', area: 'Operaciones', unidad: 'G005', operador: 'Luis Heberto Morales',  evento: 'Maniobra cimbra 11t · 1h 48min', severity: 'info',  turno: 'Mat' },
  { fecha: '2026-05-13', hora: '13:08', area: 'Operaciones', unidad: 'G009', operador: 'Luis Heberto Morales',  evento: 'Pausa cliente · espera fundición · 38 min', severity: 'warn', turno: 'Mat' },
  { fecha: '2026-05-13', hora: '11:30', area: 'CRM',         unidad: '—',    operador: 'Ing. Ricardo Nieto',    evento: 'ICA Fluor confirma firma OP-191 jueves 16/may', severity: 'ok', turno: 'Mat' },
  { fecha: '2026-05-13', hora: '10:15', area: 'Operaciones', unidad: 'G009', operador: 'Luis Heberto Morales',  evento: 'Izaje torre prefabricada 38t · 1h 22min · OK', severity: 'ok',     turno: 'Mat' },
  { fecha: '2026-05-13', hora: '09:48', area: 'RH',          unidad: '—',    operador: 'Coord. General',        evento: 'Renovación CSF Omar Gómez en curso (SAT)', severity: 'warn',  turno: 'Mat' },
  { fecha: '2026-05-13', hora: '09:14', area: 'Compras',     unidad: '—',    operador: 'Jonathan Carrillo',     evento: 'AG-17 detecta REQ-114 con solo 2 cotizaciones', severity: 'danger', turno: 'Mat' },
  { fecha: '2026-05-13', hora: '08:24', area: 'Operaciones', unidad: 'G005', operador: 'Sistema',               evento: 'AG-08 alerta: verificación G005 en 16 días', severity: 'warn',  turno: 'Mat' },
  { fecha: '2026-05-13', hora: '07:48', area: 'Operaciones', unidad: 'G005', operador: 'Luis Heberto Morales',  evento: 'Inicio jornada · checklist OK', severity: 'ok',     turno: 'Mat' },
  { fecha: '2026-05-13', hora: '07:35', area: 'Operaciones', unidad: 'G010', operador: 'Omar Gómez',            evento: 'Inicio jornada · combustible 92%', severity: 'ok',     turno: 'Mat' },
  { fecha: '2026-05-13', hora: '06:55', area: 'Operaciones', unidad: 'G014', operador: 'Equipo Mat-Noc',        evento: 'Fin nocturno · entrega a turno Mat OK', severity: 'ok',     turno: 'Noc' }
]

// ===== Control de cargas 2026 =====
// `litros` = diésel consumido en la maniobra (carga de combustible de la unidad).
// Las grúas de 100 ton consumen más por hora que las de 12–25 ton.
export const controlCargas = [
  { folio: 'CG-2026-294', fecha: '2026-05-13', grua: 'G003', cliente: 'Constructora Tapachula', sitio: 'Tapachula 3278', tipo: 'Maniobra premontaje',  horas: 9.2, litros: 145, monto: 39400, oc: '—',           estado: 'Pendiente OC' },
  { folio: 'CG-2026-293', fecha: '2026-05-13', grua: 'G014', cliente: 'Constructora Tapachula', sitio: 'Tapachula 3278', tipo: 'Izaje pesado nocturno', horas: 12.0,litros: 312, monto: 92400, oc: 'OC-CT-1148',  estado: 'Facturado' },
  { folio: 'CG-2026-291', fecha: '2026-05-12', grua: 'G005', cliente: 'Constructora Tapachula', sitio: 'Tapachula 3278', tipo: 'Izaje · cimbra',         horas: 9.5, litros: 150, monto: 38800, oc: '—',           estado: 'Pendiente OC' },
  { folio: 'CG-2026-290', fecha: '2026-05-12', grua: 'G014', cliente: 'Constructora Tapachula', sitio: 'Tapachula 3278', tipo: 'Izaje pesado nocturno', horas: 11.5,litros: 296, monto: 88200, oc: 'OC-CT-1148',  estado: 'Facturado' },
  { folio: 'CG-2026-289', fecha: '2026-05-12', grua: 'G009', cliente: 'Mota Engil',             sitio: 'Tapachula 3278', tipo: 'Izaje pesado',          horas: 11.5,litros: 291, monto: 81200, oc: '—',           estado: 'Pendiente OC' },
  { folio: 'CG-2026-281', fecha: '2026-05-09', grua: 'G003', cliente: 'Constructora Tapachula', sitio: 'Tapachula 3278', tipo: 'Izaje · vigas',          horas: 7.5, litros: 118, monto: 32100, oc: 'OC-CT-1142',  estado: 'Facturado' },
  { folio: 'CG-2026-274', fecha: '2026-05-08', grua: 'G014', cliente: 'Constructora Tapachula', sitio: 'Tapachula 3278', tipo: 'Izaje pesado nocturno', horas: 12.0,litros: 308, monto: 92400, oc: 'OC-CT-1142',  estado: 'Facturado' },
  { folio: 'CG-2026-272', fecha: '2026-05-07', grua: 'G005', cliente: 'Constructora Tapachula', sitio: 'Tapachula 3278', tipo: 'Izaje · cimbra',         horas: 10.0,litros: 158, monto: 41200, oc: 'OC-CT-1142',  estado: 'Facturado' },
  { folio: 'CG-2026-269', fecha: '2026-05-05', grua: 'G010', cliente: 'Mota Engil',             sitio: 'Tapachula 3278', tipo: 'Izaje pesado',          horas: 11.5,litros: 292, monto: 81000, oc: 'OC-ME-0822',  estado: 'Facturado' },
  { folio: 'CG-2026-268', fecha: '2026-05-05', grua: 'G009', cliente: 'Mota Engil',             sitio: 'Tapachula 3278', tipo: 'Izaje pesado',          horas: 12.0,litros: 305, monto: 84800, oc: 'OC-ME-0822',  estado: 'Facturado' },
  { folio: 'CG-2026-265', fecha: '2026-05-02', grua: 'G003', cliente: 'Constructora Tapachula', sitio: 'Tapachula 3278', tipo: 'Izaje · cimbra',         horas: 8.0, litros: 126, monto: 34200, oc: 'OC-CT-1138',  estado: 'Facturado' },
  { folio: 'CG-2026-249', fecha: '2026-04-28', grua: 'G014', cliente: 'Constructora Tapachula', sitio: 'Tapachula 3278', tipo: 'Izaje pesado nocturno', horas: 12.0,litros: 314, monto: 92400, oc: 'OC-CT-1130',  estado: 'Facturado' },
  { folio: 'CG-2026-244', fecha: '2026-04-25', grua: 'G003', cliente: 'Constructora Tapachula', sitio: 'Tapachula 3278', tipo: 'Maniobra estructura',   horas: 9.0, litros: 142, monto: 38600, oc: 'OC-CT-1130',  estado: 'Facturado' },
  { folio: 'CG-2026-241', fecha: '2026-04-22', grua: 'G005', cliente: 'Constructora Tapachula', sitio: 'Tapachula 3278', tipo: 'Maniobra estructura',   horas: 8.5, litros: 134, monto: 34900, oc: 'OC-CT-1130',  estado: 'Facturado' },
  { folio: 'CG-2026-238', fecha: '2026-04-20', grua: 'G009', cliente: 'Mota Engil',             sitio: 'Tapachula 3278', tipo: 'Izaje pesado',          horas: 11.0,litros: 278, monto: 78100, oc: 'OC-ME-0810',  estado: 'Facturado' },
  { folio: 'CG-2026-219', fecha: '2026-04-18', grua: 'G004', cliente: 'OHL México',              sitio: 'CDMX',           tipo: 'Maniobra estructura',   horas: 8.5, litros: 150, monto: 41200, oc: 'OC-OHL-0418', estado: 'Facturado' },
  { folio: 'CG-2026-218', fecha: '2026-04-18', grua: 'G003', cliente: 'Constructora Tapachula', sitio: 'Tapachula 3278', tipo: 'Izaje · prefabricado',  horas: 6.5, litros: 102, monto: 28400, oc: 'OC-CT-1128',  estado: 'Facturado' },
  { folio: 'CG-2026-214', fecha: '2026-04-10', grua: 'G010', cliente: 'Mota Engil',             sitio: 'Tapachula 3278', tipo: 'Izaje pesado',          horas: 12.0,litros: 300, monto: 84000, oc: 'OC-ME-0810',  estado: 'Facturado' },
  { folio: 'CG-2026-211', fecha: '2026-04-10', grua: 'G009', cliente: 'Mota Engil',             sitio: 'Tapachula 3278', tipo: 'Izaje pesado',          horas: 12.0,litros: 306, monto: 84200, oc: 'OC-ME-0810',  estado: 'Facturado' }
]

// ===== Bitácora semanal de horas por grúa =====
// Horas operadas por unidad y por día (Lun→Dom) de cada semana. Simulado.
// Grúas en obra trabajan 8–12 h/día (las de 100 ton con turno nocturno, más);
// G004 está en patio (uso esporádico) y G008 en mantenimiento (0 h).
export const bitacoraSemanal = {
  dias: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
  semanas: [
    {
      id: 'S19', num: 19, rango: '5 – 11 may', estado: 'cerrada',
      horas: {
        G003: [8.0, 9.2, 7.5, 8.5, 9.0, 5.0, 0],
        G004: [0, 3.5, 0, 0, 4.0, 0, 0],
        G005: [9.5, 8.0, 10.0, 9.0, 8.5, 0, 0],
        G008: [0, 0, 0, 0, 0, 0, 0],
        G009: [11.0, 12.0, 10.5, 11.5, 11.0, 7.0, 0],
        G010: [12.0, 11.0, 11.5, 12.0, 10.5, 8.0, 0],
        G014: [11.5, 12.0, 11.5, 12.0, 11.0, 9.0, 4.0]
      }
    },
    {
      id: 'S20', num: 20, rango: '12 – 18 may', estado: 'cerrada',
      horas: {
        G003: [9.2, 8.0, 9.0, 8.5, 7.5, 6.0, 0],
        G004: [0, 0, 4.0, 0, 0, 0, 0],
        G005: [10.0, 9.5, 8.5, 9.0, 8.0, 5.5, 0],
        G008: [0, 0, 0, 0, 0, 0, 0],
        G009: [11.5, 12.0, 11.0, 10.5, 11.5, 7.5, 0],
        G010: [12.0, 11.5, 12.0, 11.0, 12.0, 8.0, 0],
        G014: [12.0, 11.5, 12.0, 11.5, 12.0, 9.5, 5.0]
      }
    },
    {
      id: 'S21', num: 21, rango: '19 – 25 may', estado: 'actual',
      horas: {
        G003: [8.5, 9.0, 8.0, 9.2, 8.5, 5.5, 0],
        G004: [0, 0, 0, 3.0, 0, 0, 0],
        G005: [9.0, 10.0, 9.5, 8.5, 9.0, 6.0, 0],
        G008: [0, 0, 0, 0, 0, 0, 0],
        G009: [12.0, 11.5, 11.0, 12.0, 11.5, 8.0, 0],
        G010: [11.5, 12.0, 11.5, 12.0, 11.0, 7.5, 0],
        G014: [12.0, 12.0, 11.5, 12.0, 11.5, 9.0, 4.5]
      }
    }
  ]
}

// ===== Rutas SCT activas =====
export const rutasSCT = [
  { id: 'RT-001', origen: 'Zempoala, Hgo.', destino: 'Tapachula, Chis.', km: 1402, casetas: 1820, horas: 22, riesgo: 'Bajo',  ruta: 'México 150D-185D · SCT autorizada', activa: 5, unidades: ['G003','G005','G009','G010','G014'] },
  { id: 'RT-002', origen: 'Zempoala, Hgo.', destino: 'CDMX',              km: 98,   casetas: 240,  horas: 2.5, riesgo: 'Bajo',  ruta: 'México 85D · SCT autorizada',         activa: 0, unidades: [] },
  { id: 'RT-003', origen: 'Zempoala, Hgo.', destino: 'Monterrey, NL',     km: 720,  casetas: 1280, horas: 10,  riesgo: 'Medio', ruta: 'México 57D · zona Saltillo cuidado',  activa: 0, unidades: [] },
  { id: 'RT-004', origen: 'Tapachula, Chis.',destino: 'Salina Cruz, Oax.', km: 480, casetas: 620,  horas: 7,  riesgo: 'Medio', ruta: 'Carr. costera · evitar nocturno',    activa: 0, unidades: [] }
]

// ===== VSM (Proceso DPI) — actividades clave =====
export const procesoDPI = {
  pasos: [
    { paso: 1, actividad: 'Recepción de solicitud cliente',          tiempo: 'D+0',  responsable: 'CRM',        valor: true,  cuello: false },
    { paso: 2, actividad: 'Validación de obra y SCT',                 tiempo: 'D+1',  responsable: 'Operaciones', valor: true,  cuello: false },
    { paso: 3, actividad: 'Asignación de equipo (grúa + piloto)',     tiempo: 'D+1',  responsable: 'Operaciones', valor: true,  cuello: false },
    { paso: 4, actividad: 'Generación de OC cliente',                 tiempo: 'D+2',  responsable: 'CRM',         valor: true,  cuello: false },
    { paso: 5, actividad: 'Traslado a obra (logística)',              tiempo: 'D+3',  responsable: 'Operaciones', valor: true,  cuello: true,  observa: 'Variable por SCT/clima' },
    { paso: 6, actividad: 'Maniobra en obra',                          tiempo: 'D+4..N',responsable: 'Operaciones', valor: true,  cuello: false },
    { paso: 7, actividad: 'Conciliación de horas y bitácora',         tiempo: 'D+N',   responsable: 'Operaciones', valor: false, cuello: true,  observa: 'Captura tardía es el principal NC repetido' },
    { paso: 8, actividad: 'Facturación y cobro',                       tiempo: 'D+N+3',responsable: 'Finanzas',     valor: true,  cuello: false }
  ],
  metricas: { leadTimePromedio: '6.4 días', valorAgregado: '76%', desperdicio: '24%', cuelloPrincipal: 'Conciliación de horas (Op→Fin)' }
}
