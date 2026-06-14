// ============================================================
//  KRATOS · Expedientes de Personal · Ausentismo · Calendario
//  Basado en:
//  - Control de ausentismo laboral.xlsx
//  - Fechas de ingreso y cumpleaños.xlsx
//  - FORMATOS.xlsx
//  - Calendario de Descansos 2026.xlsx
//  - Rol de Trabajo.xlsx
// ============================================================

export const expedientesPersonal = {
  LHM: {
    id: 'KFP-OP-001',
    nombre: 'Luis Heberto Morales Esquivel',
    puesto: 'Operador Grúa especialista',
    area: 'Operaciones',
    avatar: 'LH', color: '#F59E0B',
    ingreso: '2022-05-17', anios: 4, edad: 38, estadoCivil: 'Casado', hijos: 2,
    sueldo: 22400, esquema: 'Sueldo + bono por horas obra',
    rfc: 'MOEL870517KJ4', nss: '04138712345', curp: 'MOEL870517HHGRSS09',
    domicilio: 'Tulancingo, Hidalgo', telefono: '7716112233', emergencia: 'Sara Esquivel · 7714476655',
    tipoSangre: 'O+', talla: 'M (camisa) · 32 (pantalón)', botas: '8.5', cliente: 'Constructora Mota Engil',
    documentos: [
      { tipo: 'INE',                vence: '2030-12-31', folio: 'IDMEX1234567890', emisor: 'INE',  estado: 'vigente',  archivo: 'INE_LHMorales.pdf' },
      { tipo: 'CURP',               vence: null,         folio: 'MOEL870517HHGRSS09', emisor: 'RENAPO', estado: 'vigente', archivo: 'CURP_LHM.pdf' },
      { tipo: 'CSF (Const. SAT)',   vence: '2026-08-15', folio: 'CSF-LHM-2025',  emisor: 'SAT',  estado: 'vigente',  archivo: 'CSF_LHM.pdf' },
      { tipo: 'NSS IMSS',           vence: null,         folio: '04138712345',    emisor: 'IMSS', estado: 'vigente',  archivo: 'NSS_LHM.pdf' },
      { tipo: 'Licencia Federal',   vence: '2027-03-12', folio: 'LF-12345-26',    emisor: 'SCT',  estado: 'vigente',  archivo: 'LicFed_LHM.pdf' },
      { tipo: 'DC3 — Operador grúa',vence: '2026-11-04', folio: 'DC3-LHM-2025',   emisor: 'STPS', estado: 'vigente',  archivo: 'DC3_LHM.pdf' },
      { tipo: 'Examen médico',      vence: '2026-08-04', folio: 'EM-LHM-2025',    emisor: 'Med. Empresa', estado: 'vigente', archivo: 'EM_LHM.pdf' },
      { tipo: 'Examen toxicológico',vence: '2026-07-12', folio: 'EX-TOX-LHM-25',  emisor: 'Lab Salud',    estado: 'vigente', archivo: 'TOX_LHM.pdf' },
      { tipo: 'Contrato individual',vence: null,         folio: 'CT-LHM-2022',    emisor: 'Kratos FP',     estado: 'vigente', archivo: 'Contrato_LHM.pdf' }
    ],
    capacitaciones: [
      { fecha: '2025-08-04', curso: 'NOM-031-STPS · Trabajo en altura', horas: 16, instructor: 'CAPLAB',     resultado: 'Aprobado 96%' },
      { fecha: '2025-11-04', curso: 'Operación grúa hidráulica 100t',  horas: 24, instructor: 'SANY MX',    resultado: 'Aprobado 92%' },
      { fecha: '2026-02-18', curso: 'Inducción HSE Mota Engil',         horas: 8,  instructor: 'Mota Engil', resultado: 'Aprobado' },
      { fecha: '2026-04-22', curso: 'Refresco NOM-009-STPS · Andamios',horas: 8,  instructor: 'CAPLAB',     resultado: 'Aprobado 100%' }
    ],
    ausencias: [
      { fecha: '2026-03-12', motivo: 'Permiso personal',    dias: 1, autorizado: 'Coord. Gral.', con: 'Sí' },
      { fecha: '2026-04-09', motivo: 'Incapacidad médica',  dias: 2, autorizado: 'IMSS',          con: 'IT-2026-0044' }
    ],
    asignaciones: [
      { semana: 'Sem 17',  obra: 'Mota Engil · Tapachula', grua: 'G009', sitio: 'Tapachula 3278' },
      { semana: 'Sem 18',  obra: 'Mota Engil · Tapachula', grua: 'G009', sitio: 'Tapachula 3278' },
      { semana: 'Sem 19',  obra: 'Mota Engil · Tapachula', grua: 'G009', sitio: 'Tapachula 3278' },
      { semana: 'Sem 20',  obra: 'Mota Engil · Tapachula', grua: 'G009', sitio: 'Tapachula 3278' }
    ],
    epp: [
      { item: 'Casco SH', estado: 'Asignado', folio: 'EPP-LHM-CSC-25-118', fecha: '2025-08-04' },
      { item: 'Chaleco Kratos', estado: 'Asignado', folio: 'EPP-LHM-CHL-25-118', fecha: '2025-08-04' },
      { item: 'Botas casco Rombar', estado: 'Asignado', folio: 'EPP-LHM-BT-26-014', fecha: '2026-01-12' },
      { item: 'Arnés cuerpo completo', estado: 'Asignado', folio: 'EPP-LHM-ARN-25-118', fecha: '2025-08-04' }
    ],
    evaluaciones: [
      { periodo: '2025-Q4', score: 92, fortalezas: 'Maniobras complejas, liderazgo en obra', mejoras: 'Documentación digital' },
      { periodo: '2026-Q1', score: 95, fortalezas: 'Cero incidentes, 96% utilización', mejoras: 'Capacitar relevo' }
    ]
  },

  SEP: {
    id: 'KFP-OP-002',
    nombre: 'Saul Esteban Prieto Gastelum',
    puesto: 'Operador Grúa',
    area: 'Operaciones',
    avatar: 'SP', color: '#F59E0B',
    ingreso: '2023-01-10', anios: 3, edad: 32, estadoCivil: 'Soltero', hijos: 0,
    sueldo: 18800, esquema: 'Sueldo + bono por horas obra',
    rfc: 'PIGS940110ABC', nss: '04148901234', curp: 'PIGS940110HHGRTL05',
    domicilio: 'Pachuca, Hidalgo', telefono: '7716223344', emergencia: 'Lucía Gastelum · 7714112233',
    tipoSangre: 'A+', talla: 'L · 34', botas: '9', cliente: 'Constructora Tapachula',
    documentos: [
      { tipo: 'INE',                vence: '2029-12-31', folio: 'IDMEX2345678', emisor: 'INE',  estado: 'vigente',  archivo: 'INE_SEP.pdf' },
      { tipo: 'CSF (Const. SAT)',   vence: '2026-09-18', folio: 'CSF-SEP-2025', emisor: 'SAT',  estado: 'vigente',  archivo: 'CSF_SEP.pdf' },
      { tipo: 'NSS IMSS',           vence: null,         folio: '04148901234',  emisor: 'IMSS', estado: 'vigente',  archivo: 'NSS_SEP.pdf' },
      { tipo: 'Licencia Federal',   vence: '2026-06-30', folio: 'LF-22890-25', emisor: 'SCT',  estado: 'proximo',  archivo: 'LicFed_SEP.pdf' },
      { tipo: 'DC3 — Operador grúa',vence: '2026-12-10', folio: 'DC3-SEP-2025', emisor: 'STPS', estado: 'vigente',  archivo: 'DC3_SEP.pdf' },
      { tipo: 'Examen médico',      vence: '2026-09-04', folio: 'EM-SEP-2025',  emisor: 'Med.', estado: 'vigente',  archivo: 'EM_SEP.pdf' },
      { tipo: 'Examen toxicológico',vence: '2026-09-04', folio: 'EX-TOX-SEP-25',emisor: 'Lab',  estado: 'vigente',  archivo: 'TOX_SEP.pdf' },
      { tipo: 'Contrato individual',vence: null,         folio: 'CT-SEP-2023',  emisor: 'Kratos FP', estado: 'vigente', archivo: 'Contrato_SEP.pdf' }
    ],
    capacitaciones: [
      { fecha: '2025-10-10', curso: 'NOM-031-STPS', horas: 16, instructor: 'CAPLAB', resultado: 'Aprobado 89%' },
      { fecha: '2025-12-10', curso: 'Operación grúa HIAB',  horas: 16, instructor: 'HIAB', resultado: 'Aprobado 91%' }
    ],
    ausencias: [
      { fecha: '2026-02-22', motivo: 'Incapacidad médica', dias: 3, autorizado: 'IMSS',  con: 'IT-2026-0022' }
    ],
    asignaciones: [
      { semana: 'Sem 17', obra: 'Constructora Tapachula', grua: 'G005', sitio: 'Tapachula 3278' },
      { semana: 'Sem 18', obra: 'Constructora Tapachula', grua: 'G003', sitio: 'Tapachula 3278' },
      { semana: 'Sem 19', obra: 'Constructora Tapachula', grua: 'G003', sitio: 'Tapachula 3278' }
    ],
    epp: [
      { item: 'Casco SH',        estado: 'Asignado', folio: 'EPP-SEP-CSC-25-122', fecha: '2025-10-10' },
      { item: 'Chaleco Kratos',  estado: 'Asignado', folio: 'EPP-SEP-CHL-25-122', fecha: '2025-10-10' },
      { item: 'Botas Rombar',    estado: 'Asignado', folio: 'EPP-SEP-BT-26-014',  fecha: '2026-01-12' }
    ],
    evaluaciones: [
      { periodo: '2025-Q4', score: 88, fortalezas: 'Puntualidad, comunicación', mejoras: 'Llenado de bitácora más detallado' }
    ]
  },

  OG: {
    id: 'KFP-OP-003',
    nombre: 'Omar Gómez',
    puesto: 'Maniobrista / Operador',
    area: 'Operaciones',
    avatar: 'OG', color: '#F59E0B',
    ingreso: '2023-06-03', anios: 3, edad: 30, estadoCivil: 'Soltero', hijos: 1,
    sueldo: 16200, esquema: 'Sueldo + bono',
    rfc: 'GOMO960603XYZ', nss: '04159012345', curp: 'GOMO960603HHGRLM02',
    domicilio: 'Zempoala, Hidalgo', telefono: '7716334455', emergencia: 'Patricia Gómez · 7714223344',
    tipoSangre: 'O+', talla: 'M · 32', botas: '8',
    documentos: [
      { tipo: 'INE',                vence: '2031-06-30', folio: 'IDMEX3456789', emisor: 'INE',  estado: 'vigente',  archivo: 'INE_OG.pdf' },
      { tipo: 'CSF (Const. SAT)',   vence: '2026-04-30', folio: 'CSF-OG-2025',  emisor: 'SAT',  estado: 'vencido',  archivo: 'CSF_OG.pdf' },
      { tipo: 'NSS IMSS',           vence: null,         folio: '04159012345',  emisor: 'IMSS', estado: 'vigente',  archivo: 'NSS_OG.pdf' },
      { tipo: 'Licencia Federal',   vence: '2027-01-08', folio: 'LF-30115-25', emisor: 'SCT',  estado: 'vigente',  archivo: 'LicFed_OG.pdf' },
      { tipo: 'DC3 — Maniobras',    vence: '2026-05-30', folio: 'DC3-OG-2025', emisor: 'STPS', estado: 'proximo',  archivo: 'DC3_OG.pdf' },
      { tipo: 'Examen médico',      vence: '2026-09-20', folio: 'EM-OG-2025',   emisor: 'Med.', estado: 'vigente',  archivo: 'EM_OG.pdf' },
      { tipo: 'Examen toxicológico',vence: '2026-06-15', folio: 'EX-TOX-OG-25', emisor: 'Lab',  estado: 'proximo',  archivo: 'TOX_OG.pdf' },
      { tipo: 'Contrato individual',vence: null,         folio: 'CT-OG-2023',   emisor: 'Kratos FP', estado: 'vigente', archivo: 'Contrato_OG.pdf' }
    ],
    capacitaciones: [
      { fecha: '2024-08-15', curso: 'NOM-031-STPS', horas: 16, instructor: 'CAPLAB',     resultado: 'Aprobado 84%' },
      { fecha: '2025-08-20', curso: 'Operación SANY 100t', horas: 24, instructor: 'SANY', resultado: 'Aprobado 86%' }
    ],
    ausencias: [
      { fecha: '2026-01-15', motivo: 'Permiso paternidad', dias: 5, autorizado: 'Coord. Gral.', con: 'Sí' },
      { fecha: '2026-04-25', motivo: 'Incapacidad médica', dias: 3, autorizado: 'IMSS',         con: 'IT-2026-0078' }
    ],
    asignaciones: [
      { semana: 'Sem 17', obra: 'Mota Engil · Tapachula', grua: 'G010', sitio: 'Tapachula 3278' },
      { semana: 'Sem 18', obra: 'Mota Engil · Tapachula', grua: 'G010', sitio: 'Tapachula 3278' },
      { semana: 'Sem 19', obra: 'Mota Engil · Tapachula', grua: 'G010', sitio: 'Tapachula 3278' }
    ],
    epp: [
      { item: 'Casco SH',        estado: 'Asignado', folio: 'EPP-OG-CSC-24-088', fecha: '2024-06-03' },
      { item: 'Chaleco Kratos',  estado: 'Asignado', folio: 'EPP-OG-CHL-25-018', fecha: '2025-01-10' },
      { item: 'Botas Rombar',    estado: 'Pendiente reposición', folio: '—',     fecha: '—' }
    ],
    evaluaciones: [
      { periodo: '2025-Q4', score: 78, fortalezas: 'Disponibilidad turnos noche', mejoras: 'Actualizar CSF y DC3 — pendiente desde abril' }
    ]
  },

  JSS: {
    id: 'KFP-CG-002',
    nombre: 'Jaqueline Santos',
    puesto: 'Líder de Finanzas',
    area: 'Finanzas',
    avatar: 'JS', color: '#10B981',
    ingreso: '2024-05-22', anios: 2, edad: 34, estadoCivil: 'Soltera', hijos: 0,
    sueldo: 38400, esquema: 'Sueldo fijo',
    rfc: 'SAJA900522HJK', nss: '04129812345', curp: 'SAJA900522MDFNT04',
    domicilio: 'Pachuca, Hidalgo', telefono: '7716223388', emergencia: 'Hermana · 7714112299',
    documentos: [
      { tipo: 'INE',              vence: '2028-12-31', folio: 'IDMEX4567890',  emisor: 'INE',  estado: 'vigente', archivo: 'INE_JSS.pdf' },
      { tipo: 'CSF',              vence: null,         folio: 'CSF-JSS-2025',  emisor: 'SAT',  estado: 'vigente', archivo: 'CSF_JSS.pdf' },
      { tipo: 'NSS IMSS',         vence: null,         folio: '04129812345',   emisor: 'IMSS', estado: 'vigente', archivo: 'NSS_JSS.pdf' },
      { tipo: 'Cédula profesional', vence: null,       folio: '12345678',      emisor: 'SEP',  estado: 'vigente', archivo: 'Cedula_JSS.pdf' },
      { tipo: 'Contrato individual',vence: null,       folio: 'CT-JSS-2024',   emisor: 'Kratos FP', estado: 'vigente', archivo: 'Contrato_JSS.pdf' }
    ],
    capacitaciones: [
      { fecha: '2024-08-12', curso: 'CFDI 4.0 / Carta porte 2.0', horas: 12, instructor: 'ContPaqi', resultado: 'Certificada' },
      { fecha: '2025-09-18', curso: 'REPSE · cumplimiento subcontratación', horas: 8, instructor: 'Despacho fiscal', resultado: 'Certificada' }
    ],
    ausencias: [],
    asignaciones: [],
    epp: [],
    evaluaciones: [
      { periodo: '2025-Q4', score: 96, fortalezas: 'Disciplina precierre, cero retrasos SAT', mejoras: 'Automatizar reportes' }
    ]
  },

  VG: {
    id: 'KFP-CG-003',
    nombre: 'Valentina García',
    puesto: 'Líder de Operaciones',
    area: 'Operaciones',
    avatar: 'VG', color: '#F59E0B',
    ingreso: '2024-03-04', anios: 2, edad: 31, estadoCivil: 'Soltera', hijos: 0,
    sueldo: 42100, esquema: 'Sueldo fijo + bonos por OKR',
    rfc: 'GARV930304ABC', nss: '04132011234', curp: 'GARV930304MDFRRL01',
    domicilio: 'CDMX', telefono: '5512345678', emergencia: 'Padre · 5512334455',
    documentos: [
      { tipo: 'INE',              vence: '2028-06-30', folio: 'IDMEX5678901',  emisor: 'INE',  estado: 'vigente', archivo: 'INE_VG.pdf' },
      { tipo: 'CSF',              vence: null,         folio: 'CSF-VG-2025',   emisor: 'SAT',  estado: 'vigente', archivo: 'CSF_VG.pdf' },
      { tipo: 'NSS IMSS',         vence: null,         folio: '04132011234',   emisor: 'IMSS', estado: 'vigente', archivo: 'NSS_VG.pdf' },
      { tipo: 'Cédula profesional',vence: null,        folio: '23456789',      emisor: 'SEP',  estado: 'vigente', archivo: 'Cedula_VG.pdf' },
      { tipo: 'Contrato individual',vence: null,       folio: 'CT-VG-2024',    emisor: 'Kratos FP', estado: 'vigente', archivo: 'Contrato_VG.pdf' }
    ],
    capacitaciones: [
      { fecha: '2024-06-20', curso: 'NOM-031-STPS · responsable HSE', horas: 24, instructor: 'CAPLAB', resultado: 'Aprobado' },
      { fecha: '2025-11-15', curso: 'Liderazgo en obra · seguridad', horas: 8, instructor: 'CAPLAB',  resultado: 'Certificada' }
    ],
    ausencias: [],
    asignaciones: [],
    epp: [
      { item: 'EPP visitante', estado: 'Asignado', folio: 'EPP-VG-VST-25-090', fecha: '2025-04-15' }
    ],
    evaluaciones: [
      { periodo: '2025-Q4', score: 94, fortalezas: 'Reducción 18% horas muertas, cero accidentes', mejoras: 'Digitalizar bitácoras' }
    ]
  },

  JC: {
    id: 'KFP-CG-004',
    nombre: 'Jonathan Carrillo',
    puesto: 'Líder de Compras y Almacén',
    area: 'Compras',
    avatar: 'JC', color: '#A855F7',
    ingreso: '2024-07-15', anios: 2, edad: 33, estadoCivil: 'Casado', hijos: 1,
    sueldo: 36400, esquema: 'Sueldo fijo',
    rfc: 'CAJO920715XYZ', nss: '04125012345', curp: 'CAJO920715HHGRNR03',
    domicilio: 'Zempoala, Hidalgo', telefono: '7716112266', emergencia: 'Esposa · 7714112277',
    documentos: [
      { tipo: 'INE',              vence: '2028-09-30', folio: 'IDMEX6789012',  emisor: 'INE',  estado: 'vigente', archivo: 'INE_JC.pdf' },
      { tipo: 'CSF',              vence: null,         folio: 'CSF-JC-2025',   emisor: 'SAT',  estado: 'vigente', archivo: 'CSF_JC.pdf' },
      { tipo: 'NSS IMSS',         vence: null,         folio: '04125012345',   emisor: 'IMSS', estado: 'vigente', archivo: 'NSS_JC.pdf' },
      { tipo: 'Contrato individual',vence: null,       folio: 'CT-JC-2024',    emisor: 'Kratos FP', estado: 'vigente', archivo: 'Contrato_JC.pdf' }
    ],
    capacitaciones: [
      { fecha: '2024-09-22', curso: 'ISO 9001 · Procesos de compra', horas: 16, instructor: 'NYCE', resultado: 'Certificado' }
    ],
    ausencias: [
      { fecha: '2026-03-08', motivo: 'Permiso personal', dias: 1, autorizado: 'Coord. Gral.', con: 'Sí' }
    ],
    asignaciones: [], epp: [],
    evaluaciones: [
      { periodo: '2025-Q4', score: 86, fortalezas: 'Ahorros 8% en spend mensual', mejoras: 'Política 3 cotizaciones — disciplina' }
    ]
  },

  AL: {
    id: 'KFP-MK-001',
    nombre: 'Ahtziri López',
    puesto: 'Líder de Mercadotecnia',
    area: 'Marketing',
    avatar: 'AL', color: '#EC4899',
    ingreso: '2024-10-08', anios: 1, edad: 27, estadoCivil: 'Soltera', hijos: 0,
    sueldo: 28400, esquema: 'Sueldo fijo + comisión leads',
    rfc: 'LOPA980108ABC', nss: '04167012345', curp: 'LOPA980108MDFPRH02',
    domicilio: 'CDMX', telefono: '5523456789', emergencia: 'Madre · 5523445566',
    documentos: [
      { tipo: 'INE',              vence: '2029-03-31', folio: 'IDMEX7890123',  emisor: 'INE',  estado: 'vigente', archivo: 'INE_AL.pdf' },
      { tipo: 'CSF',              vence: null,         folio: 'CSF-AL-2025',   emisor: 'SAT',  estado: 'vigente', archivo: 'CSF_AL.pdf' },
      { tipo: 'NSS IMSS',         vence: null,         folio: '04167012345',   emisor: 'IMSS', estado: 'vigente', archivo: 'NSS_AL.pdf' },
      { tipo: 'Contrato individual',vence: null,       folio: 'CT-AL-2024',    emisor: 'Kratos FP', estado: 'vigente', archivo: 'Contrato_AL.pdf' }
    ],
    capacitaciones: [
      { fecha: '2024-11-12', curso: 'Meta Business Suite · publicidad pagada', horas: 12, instructor: 'Meta', resultado: 'Certificada' }
    ],
    ausencias: [], asignaciones: [], epp: [],
    evaluaciones: [
      { periodo: '2025-Q4', score: 90, fortalezas: 'Engagement TikTok +180%, contenido 4 marcas', mejoras: 'Calendario mensual con anticipación' }
    ]
  }
}

// Mapeo del 'rrhh.personal' a expediente
export const personalIndex = [
  { key: 'LHM', nombre: 'Luis Heberto Morales Esquivel' },
  { key: 'SEP', nombre: 'Saul Esteban Prieto Gastelum' },
  { key: 'OG',  nombre: 'Omar Gómez' },
  { key: 'JSS', nombre: 'Jaqueline Santos' },
  { key: 'VG',  nombre: 'Valentina García' },
  { key: 'JC',  nombre: 'Jonathan Carrillo' },
  { key: 'AL',  nombre: 'Ahtziri López' }
]

// ===== Calendario de descansos (esquema 6x1 / 14x7 obra) =====
export const calendarioDescansos = [
  { quincena: '2026-05-16 a 2026-05-31', operador: 'Luis Heberto Morales', descanso: '2026-05-25', tipo: 'Día libre rotativo' },
  { quincena: '2026-05-16 a 2026-05-31', operador: 'Saul Esteban Prieto',  descanso: '2026-05-27', tipo: 'Día libre rotativo' },
  { quincena: '2026-05-16 a 2026-05-31', operador: 'Omar Gómez',           descanso: '2026-05-22', tipo: 'Día libre rotativo' },
  { quincena: '2026-06-01 a 2026-06-15', operador: 'Luis Heberto Morales', descanso: '2026-06-08', tipo: 'Vacaciones (4d)' },
  { quincena: '2026-06-01 a 2026-06-15', operador: 'Saul Esteban Prieto',  descanso: '2026-06-10', tipo: 'Día libre rotativo' }
]

// ===== Formatos internos (FORMATOS.xlsx) =====
export const formatosInternos = [
  { id: 'F-001', nombre: 'Checklist diario grúa',                    area: 'Operaciones', archivo: 'F-001_Chklst_Diario_Grua.pdf',  ultUso: '2026-05-13' },
  { id: 'F-002', nombre: 'Checklist accesorios izaje',                area: 'Operaciones', archivo: 'F-002_Chklst_Accesorios.pdf',   ultUso: '2026-05-13' },
  { id: 'F-003', nombre: 'Reporte de incidente',                      area: 'Operaciones', archivo: 'F-003_Reporte_Incidente.pdf',   ultUso: '2026-04-22' },
  { id: 'F-004', nombre: 'Solicitud de requisición',                  area: 'Compras',     archivo: 'F-004_Req_Compra.pdf',          ultUso: '2026-05-13' },
  { id: 'F-005', nombre: 'Comparativo cotizaciones',                  area: 'Compras',     archivo: 'F-005_Comparativo_Cotiz.pdf',   ultUso: '2026-05-12' },
  { id: 'F-006', nombre: 'Orden de compra',                            area: 'Compras',     archivo: 'F-006_OC.pdf',                  ultUso: '2026-05-13' },
  { id: 'F-007', nombre: 'Comprobación de gastos',                    area: 'Finanzas',    archivo: 'F-007_Comprob_Gastos.pdf',      ultUso: '2026-05-12' },
  { id: 'F-008', nombre: 'Programación de pagos',                     area: 'Finanzas',    archivo: 'F-008_Pr_Pagos.pdf',            ultUso: '2026-05-12' },
  { id: 'F-009', nombre: 'Solicitud de viáticos',                      area: 'Finanzas',    archivo: 'F-009_Viaticos.pdf',            ultUso: '2026-05-11' },
  { id: 'F-010', nombre: 'Alta de personal',                           area: 'RH',           archivo: 'F-010_Alta_Personal.pdf',       ultUso: '2026-04-30' },
  { id: 'F-011', nombre: 'Permiso / incidencia',                       area: 'RH',           archivo: 'F-011_Permiso.pdf',             ultUso: '2026-05-08' },
  { id: 'F-012', nombre: 'Aviso de no conformidad',                    area: 'Calidad',      archivo: 'F-012_NC.pdf',                  ultUso: '2026-05-12' },
  { id: 'F-013', nombre: 'Solicitud de mantenimiento',                area: 'Operaciones', archivo: 'F-013_Solicitud_Mtto.pdf',      ultUso: '2026-05-10' },
  { id: 'F-014', nombre: 'Acta de entrega cliente',                    area: 'Operaciones', archivo: 'F-014_Acta_Entrega.pdf',        ultUso: '2026-03-12' }
]

// ===== Plantilla CeCo's (centros de costo) =====
export const centrosCosto = [
  { codigo: 'CC-100', nombre: 'Operaciones · Flota grúas',    responsable: 'Valentina García', presupuesto: 4820000, ejercido: 2148000 },
  { codigo: 'CC-110', nombre: 'Operaciones · Logística',       responsable: 'Valentina García', presupuesto: 1240000, ejercido: 542400 },
  { codigo: 'CC-200', nombre: 'Compras · Refacciones',         responsable: 'Jonathan Carrillo', presupuesto: 1820000, ejercido: 814200 },
  { codigo: 'CC-210', nombre: 'Compras · EPP',                  responsable: 'Jonathan Carrillo', presupuesto: 380000,  ejercido: 142100 },
  { codigo: 'CC-300', nombre: 'Finanzas · Cumplimiento fiscal', responsable: 'Jaqueline Santos', presupuesto: 1240000, ejercido: 612000 },
  { codigo: 'CC-400', nombre: 'Mercadotecnia',                  responsable: 'Ahtziri López',     presupuesto: 480000,  ejercido: 184200 },
  { codigo: 'CC-500', nombre: 'RH · Nómina y bonos',            responsable: 'Coord. Gral.',      presupuesto: 8420000, ejercido: 3812000 },
  { codigo: 'CC-600', nombre: 'Calidad y certificaciones',      responsable: 'Coord. Gral.',      presupuesto: 280000,  ejercido: 92400 }
]
