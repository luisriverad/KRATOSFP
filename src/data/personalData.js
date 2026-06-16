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
  },

  RN: {
    id: 'KFP-DG-001', nombre: 'Ricardo Nieto', puesto: 'Director General', area: 'Dirección',
    avatar: 'RN', color: '#0F172A',
    ingreso: '2018-02-01', anios: 8, edad: 49, estadoCivil: 'Casado', hijos: 3,
    sueldo: 185000, esquema: 'Sueldo directivo + bono por resultados',
    rfc: 'NIRR770214AB1', nss: '04097712345', curp: 'NIRR770214HDFTCC07',
    domicilio: 'Pachuca, Hidalgo', telefono: '7711002030', emergencia: 'Esposa · 7711002040',
    documentos: [
      { tipo: 'INE',                vence: '2031-12-31', folio: 'IDMEX-RN-2024', emisor: 'INE', estado: 'vigente', archivo: 'INE_RN.pdf' },
      { tipo: 'CSF (Const. SAT)',   vence: '2026-09-30', folio: 'CSF-RN-2025',   emisor: 'SAT', estado: 'vigente', archivo: 'CSF_RN.pdf' },
      { tipo: 'Contrato individual',vence: null,         folio: 'CT-RN-2018',    emisor: 'Kratos FP', estado: 'vigente', archivo: 'Contrato_RN.pdf' },
      { tipo: 'Poder notarial (rep. legal)', vence: null, folio: 'PN-RN-2018',   emisor: 'Notaría 12', estado: 'vigente', archivo: 'Poder_RN.pdf' }
    ],
    capacitaciones: [
      { fecha: '2025-09-18', curso: 'Gobierno corporativo y consejo', horas: 16, instructor: 'IPADE', resultado: 'Aprobado' }
    ],
    ausencias: [], asignaciones: [], epp: [],
    evaluaciones: [
      { periodo: '2025-Q4', score: 96, fortalezas: 'Visión, relación con clientes clave, disciplina financiera', mejoras: 'Delegar más en mandos medios' }
    ]
  },

  ERG: {
    id: 'KFP-OP-010', nombre: 'Eduardo Ramírez Gómez', puesto: 'Gerente de Operaciones', area: 'Operaciones',
    avatar: 'ER', color: '#1E3A8A',
    ingreso: '2020-06-15', anios: 5, edad: 42, estadoCivil: 'Casado', hijos: 2,
    sueldo: 78000, esquema: 'Sueldo + bono por OEE de flota',
    rfc: 'RAGE840615CD2', nss: '04108412345', curp: 'RAGE840615HHGMMD05',
    domicilio: 'Zempoala, Hidalgo', telefono: '7716010101', emergencia: 'Esposa · 7716010102',
    tipoSangre: 'A+',
    documentos: [
      { tipo: 'INE',                vence: '2030-12-31', folio: 'IDMEX-ERG-23', emisor: 'INE', estado: 'vigente', archivo: 'INE_ERG.pdf' },
      { tipo: 'Licencia Federal',   vence: '2027-05-10', folio: 'LF-ERG-26',    emisor: 'SCT', estado: 'vigente', archivo: 'LicFed_ERG.pdf' },
      { tipo: 'Contrato individual',vence: null,         folio: 'CT-ERG-2020',  emisor: 'Kratos FP', estado: 'vigente', archivo: 'Contrato_ERG.pdf' }
    ],
    capacitaciones: [
      { fecha: '2025-10-02', curso: 'Planeación de izajes críticos', horas: 24, instructor: 'SANY MX', resultado: 'Aprobado 95%' }
    ],
    ausencias: [], asignaciones: [], epp: [], evaluaciones: []
  },

  MFC: {
    id: 'KFP-OP-011', nombre: 'Mauricio Fuentes Castro', puesto: 'Operador Grúa 100t', area: 'Operaciones',
    avatar: 'MF', color: '#F59E0B',
    ingreso: '2022-09-05', anios: 3, edad: 35, estadoCivil: 'Casado', hijos: 1,
    sueldo: 24800, esquema: 'Sueldo + bono por horas obra',
    rfc: 'FUCM900905EF3', nss: '04129012345', curp: 'FUCM900905HHGNSR01',
    domicilio: 'Tizayuca, Hidalgo', telefono: '7716010201', emergencia: 'Esposa · 7716010202',
    tipoSangre: 'O+', talla: 'L (camisa) · 34 (pantalón)', botas: '9', cliente: 'Constructora Mota Engil',
    documentos: [
      { tipo: 'INE',                vence: '2029-12-31', folio: 'IDMEX-MFC-22', emisor: 'INE', estado: 'vigente', archivo: 'INE_MFC.pdf' },
      { tipo: 'Licencia Federal',   vence: '2026-07-05', folio: 'LF-MFC-26',    emisor: 'SCT', estado: 'proximo', archivo: 'LicFed_MFC.pdf' },
      { tipo: 'DC3 — Operador grúa',vence: '2026-12-01', folio: 'DC3-MFC-2025', emisor: 'STPS', estado: 'vigente', archivo: 'DC3_MFC.pdf' }
    ],
    capacitaciones: [
      { fecha: '2025-12-01', curso: 'Operación grúa hidráulica 100t', horas: 24, instructor: 'SANY MX', resultado: 'Aprobado 90%' }
    ],
    ausencias: [], asignaciones: [], epp: [], evaluaciones: []
  },

  JLR: {
    id: 'KFP-OP-012', nombre: 'José Luis Reyes', puesto: 'Operador Grúa 70t', area: 'Operaciones',
    avatar: 'JR', color: '#D97706',
    ingreso: '2023-03-20', anios: 3, edad: 31, estadoCivil: 'Soltero', hijos: 0,
    sueldo: 22400, esquema: 'Sueldo + bono por horas obra',
    rfc: 'RELJ930320GH4', nss: '04139312345', curp: 'RELJ930320HHGYSS03',
    domicilio: 'Tapachula, Chiapas', telefono: '9622010301', emergencia: 'Madre · 9622010302',
    tipoSangre: 'B+', talla: 'M (camisa) · 32 (pantalón)', botas: '8', cliente: 'Constructora Tapachula',
    documentos: [
      { tipo: 'INE',                vence: '2030-06-30', folio: 'IDMEX-JLR-23', emisor: 'INE', estado: 'vigente', archivo: 'INE_JLR.pdf' },
      { tipo: 'DC3 — Operador grúa',vence: '2026-06-18', folio: 'DC3-JLR-2025', emisor: 'STPS', estado: 'proximo', archivo: 'DC3_JLR.pdf' }
    ],
    capacitaciones: [
      { fecha: '2025-06-18', curso: 'NOM-031-STPS · Trabajo en altura', horas: 16, instructor: 'CAPLAB', resultado: 'Aprobado' }
    ],
    ausencias: [], asignaciones: [], epp: [], evaluaciones: []
  },

  PHM: {
    id: 'KFP-OP-013', nombre: 'Pedro Hernández Mata', puesto: 'Mecánico Diésel', area: 'Operaciones',
    avatar: 'PH', color: '#6B7280',
    ingreso: '2021-08-10', anios: 4, edad: 44, estadoCivil: 'Casado', hijos: 3,
    sueldo: 26000, esquema: 'Sueldo + guardias',
    rfc: 'HEMP810810IJ5', nss: '04118112345', curp: 'HEMP810810HHGRTD08',
    domicilio: 'Zempoala, Hidalgo', telefono: '7716010401', emergencia: 'Esposa · 7716010402',
    tipoSangre: 'O-', talla: 'XL (camisa) · 36 (pantalón)', botas: '9.5',
    documentos: [
      { tipo: 'INE',                vence: '2028-12-31', folio: 'IDMEX-PHM-21', emisor: 'INE', estado: 'vigente', archivo: 'INE_PHM.pdf' },
      { tipo: 'Contrato individual',vence: null,         folio: 'CT-PHM-2021',  emisor: 'Kratos FP', estado: 'vigente', archivo: 'Contrato_PHM.pdf' }
    ],
    capacitaciones: [
      { fecha: '2025-07-15', curso: 'Mantenimiento hidráulico SANY/XCMG', horas: 20, instructor: 'XCMG', resultado: 'Aprobado 93%' }
    ],
    ausencias: [], asignaciones: [], epp: [], evaluaciones: []
  },

  RGS: {
    id: 'KFP-OP-014', nombre: 'Raúl Guzmán Solís', puesto: 'Maniobrista / Señalero', area: 'Operaciones',
    avatar: 'RG', color: '#EAB308',
    ingreso: '2023-11-02', anios: 2, edad: 29, estadoCivil: 'Soltero', hijos: 0,
    sueldo: 18200, esquema: 'Sueldo + bono por maniobra',
    rfc: 'GUSR960102KL6', nss: '04159612345', curp: 'GUSR960102HCSZLL04',
    domicilio: 'Tapachula, Chiapas', telefono: '9622010501', emergencia: 'Hermano · 9622010502',
    tipoSangre: 'A+', talla: 'M (camisa) · 32 (pantalón)', botas: '8', cliente: 'Constructora Tapachula',
    documentos: [
      { tipo: 'INE',          vence: '2031-01-31', folio: 'IDMEX-RGS-23', emisor: 'INE', estado: 'vigente', archivo: 'INE_RGS.pdf' },
      { tipo: 'DC3 — Rigging',vence: '2026-05-22', folio: 'DC3-RGS-2025', emisor: 'STPS', estado: 'vencido', archivo: 'DC3_RGS.pdf' }
    ],
    capacitaciones: [
      { fecha: '2025-05-22', curso: 'Señalización y amarre de cargas', horas: 12, instructor: 'CAPLAB', resultado: 'Aprobado' }
    ],
    ausencias: [], asignaciones: [], epp: [], evaluaciones: []
  },

  ATV: {
    id: 'KFP-LOG-001', nombre: 'Antonio Torres Vega', puesto: 'Trasladista (tractocamión)', area: 'Logística',
    avatar: 'AT', color: '#0EA5E9',
    ingreso: '2022-01-17', anios: 4, edad: 47, estadoCivil: 'Casado', hijos: 2,
    sueldo: 20400, esquema: 'Sueldo + viáticos por traslado',
    rfc: 'TOVA790117MN7', nss: '04127912345', curp: 'TOVA790117HHGRGN06',
    domicilio: 'Zempoala, Hidalgo', telefono: '7716010601', emergencia: 'Esposa · 7716010602',
    tipoSangre: 'B+', talla: 'L (camisa) · 34 (pantalón)', botas: '9',
    documentos: [
      { tipo: 'INE',              vence: '2029-09-30', folio: 'IDMEX-ATV-22', emisor: 'INE', estado: 'vigente', archivo: 'INE_ATV.pdf' },
      { tipo: 'Licencia Federal', vence: '2027-01-15', folio: 'LF-ATV-26',    emisor: 'SCT', estado: 'vigente', archivo: 'LicFed_ATV.pdf' }
    ],
    capacitaciones: [
      { fecha: '2025-08-09', curso: 'Transporte de carga sobredimensionada', horas: 16, instructor: 'SCT', resultado: 'Aprobado' }
    ],
    ausencias: [], asignaciones: [], epp: [], evaluaciones: []
  },

  CMR: {
    id: 'KFP-FI-002', nombre: 'Carla Medina Ríos', puesto: 'Auxiliar Contable', area: 'Finanzas',
    avatar: 'CM', color: '#047857',
    ingreso: '2023-05-08', anios: 2, edad: 28, estadoCivil: 'Soltera', hijos: 0,
    sueldo: 24000, esquema: 'Sueldo fijo',
    rfc: 'MERC970508OP8', nss: '04169712345', curp: 'MERC970508MHGDSR02',
    domicilio: 'Pachuca, Hidalgo', telefono: '7716010701', emergencia: 'Madre · 7716010702',
    documentos: [
      { tipo: 'INE',                vence: '2031-03-31', folio: 'IDMEX-CMR-23', emisor: 'INE', estado: 'vigente', archivo: 'INE_CMR.pdf' },
      { tipo: 'Contrato individual',vence: null,         folio: 'CT-CMR-2023',  emisor: 'Kratos FP', estado: 'vigente', archivo: 'Contrato_CMR.pdf' }
    ],
    capacitaciones: [
      { fecha: '2026-01-20', curso: 'CFDI 4.0 y conciliaciones', horas: 10, instructor: 'Contpaqi', resultado: 'Aprobada' }
    ],
    ausencias: [], asignaciones: [], epp: [], evaluaciones: []
  },

  DSA: {
    id: 'KFP-RH-001', nombre: 'Daniela Salas Aguilar', puesto: 'Coordinadora de RH', area: 'RH',
    avatar: 'DS', color: '#8B5CF6',
    ingreso: '2021-04-12', anios: 5, edad: 36, estadoCivil: 'Casada', hijos: 1,
    sueldo: 42000, esquema: 'Sueldo fijo + bono clima laboral',
    rfc: 'SAAD890412QR9', nss: '04118912345', curp: 'SAAD890412MHGLGN03',
    domicilio: 'Pachuca, Hidalgo', telefono: '7716010801', emergencia: 'Esposo · 7716010802',
    documentos: [
      { tipo: 'INE',                vence: '2030-12-31', folio: 'IDMEX-DSA-21', emisor: 'INE', estado: 'vigente', archivo: 'INE_DSA.pdf' },
      { tipo: 'Contrato individual',vence: null,         folio: 'CT-DSA-2021',  emisor: 'Kratos FP', estado: 'vigente', archivo: 'Contrato_DSA.pdf' }
    ],
    capacitaciones: [
      { fecha: '2025-11-06', curso: 'NOM-035-STPS · Riesgo psicosocial', horas: 12, instructor: 'STPS', resultado: 'Aprobada' }
    ],
    ausencias: [], asignaciones: [], epp: [], evaluaciones: []
  },

  FNL: {
    id: 'KFP-CO-002', nombre: 'Fernando Navarro León', puesto: 'Comprador Senior', area: 'Compras',
    avatar: 'FN', color: '#B45309',
    ingreso: '2020-10-01', anios: 5, edad: 40, estadoCivil: 'Casado', hijos: 2,
    sueldo: 38000, esquema: 'Sueldo + bono por ahorro en compras',
    rfc: 'NALF860101ST0', nss: '04108612345', curp: 'NALF860101HHGVNR05',
    domicilio: 'Zempoala, Hidalgo', telefono: '7716010901', emergencia: 'Esposa · 7716010902',
    documentos: [
      { tipo: 'INE',                vence: '2028-12-31', folio: 'IDMEX-FNL-20', emisor: 'INE', estado: 'vigente', archivo: 'INE_FNL.pdf' },
      { tipo: 'Contrato individual',vence: null,         folio: 'CT-FNL-2020',  emisor: 'Kratos FP', estado: 'vigente', archivo: 'Contrato_FNL.pdf' }
    ],
    capacitaciones: [
      { fecha: '2025-09-30', curso: 'Negociación con proveedores', horas: 12, instructor: 'CAPLAB', resultado: 'Aprobado' }
    ],
    ausencias: [], asignaciones: [], epp: [], evaluaciones: []
  },

  GBE: {
    id: 'KFP-CM-001', nombre: 'Gabriela Beltrán Estrada', puesto: 'Ejecutiva Comercial', area: 'Comercial',
    avatar: 'GB', color: '#DB2777',
    ingreso: '2023-02-13', anios: 3, edad: 30, estadoCivil: 'Soltera', hijos: 0,
    sueldo: 32000, esquema: 'Sueldo + comisión por contrato',
    rfc: 'BEEG950213UV1', nss: '04159512345', curp: 'BEEG950213MHGLST07',
    domicilio: 'CDMX', telefono: '5523011001', emergencia: 'Madre · 5523011002',
    documentos: [
      { tipo: 'INE',                vence: '2031-02-28', folio: 'IDMEX-GBE-23', emisor: 'INE', estado: 'vigente', archivo: 'INE_GBE.pdf' },
      { tipo: 'Contrato individual',vence: null,         folio: 'CT-GBE-2023',  emisor: 'Kratos FP', estado: 'vigente', archivo: 'Contrato_GBE.pdf' }
    ],
    capacitaciones: [
      { fecha: '2025-10-14', curso: 'Venta consultiva de arrendamiento', horas: 16, instructor: 'Kratos FP', resultado: 'Aprobada' }
    ],
    ausencias: [], asignaciones: [], epp: [], evaluaciones: []
  },

  HMC: {
    id: 'KFP-CO-003', nombre: 'Héctor Morán Cano', puesto: 'Almacenista', area: 'Compras',
    avatar: 'HM', color: '#92400E',
    ingreso: '2024-01-22', anios: 2, edad: 26, estadoCivil: 'Soltero', hijos: 0,
    sueldo: 16400, esquema: 'Sueldo fijo',
    rfc: 'MOCH980122WX2', nss: '04169812345', curp: 'MOCH980122HHGRNC00',
    domicilio: 'Zempoala, Hidalgo', telefono: '7716011101', emergencia: 'Padre · 7716011102',
    tipoSangre: 'O+', talla: 'M (camisa)', botas: '8',
    documentos: [
      { tipo: 'INE',                vence: '2030-12-31', folio: 'IDMEX-HMC-24', emisor: 'INE', estado: 'vigente', archivo: 'INE_HMC.pdf' },
      { tipo: 'Contrato individual',vence: null,         folio: 'CT-HMC-2024',  emisor: 'Kratos FP', estado: 'vigente', archivo: 'Contrato_HMC.pdf' }
    ],
    capacitaciones: [
      { fecha: '2025-12-10', curso: 'Control de inventarios y kardex', horas: 8, instructor: 'CAPLAB', resultado: 'Aprobado' }
    ],
    ausencias: [], asignaciones: [], epp: [], evaluaciones: []
  },

  IVP: {
    id: 'KFP-CA-001', nombre: 'Iván Vázquez Ponce', puesto: 'Analista HSE / Calidad', area: 'Calidad',
    avatar: 'IV', color: '#0891B2',
    ingreso: '2022-07-04', anios: 3, edad: 33, estadoCivil: 'Casado', hijos: 1,
    sueldo: 34000, esquema: 'Sueldo fijo',
    rfc: 'VAPI920704YZ3', nss: '04129212345', curp: 'VAPI920704HHGZNV09',
    domicilio: 'Pachuca, Hidalgo', telefono: '7716011201', emergencia: 'Esposa · 7716011202',
    documentos: [
      { tipo: 'INE',                vence: '2029-07-31', folio: 'IDMEX-IVP-22', emisor: 'INE', estado: 'vigente', archivo: 'INE_IVP.pdf' },
      { tipo: 'Auditor interno ISO 9001', vence: '2026-08-15', folio: 'AI-IVP-25', emisor: 'BSI', estado: 'proximo', archivo: 'AuditorISO_IVP.pdf' }
    ],
    capacitaciones: [
      { fecha: '2025-08-15', curso: 'Auditor interno ISO 9001:2015', horas: 24, instructor: 'BSI', resultado: 'Aprobado 94%' }
    ],
    ausencias: [], asignaciones: [], epp: [], evaluaciones: []
  },

  KSO: {
    id: 'KFP-DG-002', nombre: 'Karen Soto Ortega', puesto: 'Asistente de Dirección', area: 'Dirección',
    avatar: 'KS', color: '#475569',
    ingreso: '2021-11-15', anios: 4, edad: 32, estadoCivil: 'Soltera', hijos: 0,
    sueldo: 28000, esquema: 'Sueldo fijo',
    rfc: 'SOOK931115AB4', nss: '04139312399', curp: 'SOOK931115MHGTRR01',
    domicilio: 'Pachuca, Hidalgo', telefono: '7716011301', emergencia: 'Madre · 7716011302',
    documentos: [
      { tipo: 'INE',                vence: '2030-11-30', folio: 'IDMEX-KSO-21', emisor: 'INE', estado: 'vigente', archivo: 'INE_KSO.pdf' },
      { tipo: 'Contrato individual',vence: null,         folio: 'CT-KSO-2021',  emisor: 'Kratos FP', estado: 'vigente', archivo: 'Contrato_KSO.pdf' }
    ],
    capacitaciones: [
      { fecha: '2025-09-05', curso: 'Gestión de agenda directiva', horas: 8, instructor: 'CAPLAB', resultado: 'Aprobada' }
    ],
    ausencias: [], asignaciones: [], epp: [], evaluaciones: []
  },

  LMR: {
    id: 'KFP-OP-015', nombre: 'Luis Mendoza Robles', puesto: 'Operador Grúa 50t', area: 'Operaciones',
    avatar: 'LM', color: '#CA8A04',
    ingreso: '2024-03-11', anios: 2, edad: 34, estadoCivil: 'Casado', hijos: 2,
    sueldo: 22000, esquema: 'Sueldo + bono por horas obra',
    rfc: 'MERL900311CD5', nss: '04129012399', curp: 'MERL900311HHGNBS08',
    domicilio: 'Tizayuca, Hidalgo', telefono: '7716011401', emergencia: 'Esposa · 7716011402',
    tipoSangre: 'A-', talla: 'L (camisa) · 34 (pantalón)', botas: '9', cliente: 'Constructora Tapachula',
    documentos: [
      { tipo: 'INE',                vence: '2031-03-31', folio: 'IDMEX-LMR-24', emisor: 'INE', estado: 'vigente', archivo: 'INE_LMR.pdf' },
      { tipo: 'DC3 — Operador grúa',vence: '2026-09-11', folio: 'DC3-LMR-2025', emisor: 'STPS', estado: 'vigente', archivo: 'DC3_LMR.pdf' }
    ],
    capacitaciones: [
      { fecha: '2025-09-11', curso: 'Operación grúa hidráulica 50t', horas: 20, instructor: 'XCMG', resultado: 'Aprobado 88%' }
    ],
    ausencias: [], asignaciones: [], epp: [], evaluaciones: []
  },

  NPC: {
    id: 'KFP-FI-003', nombre: 'Natalia Peña Cordero', puesto: 'Analista de Nómina', area: 'Finanzas',
    avatar: 'NP', color: '#059669',
    ingreso: '2022-10-03', anios: 3, edad: 31, estadoCivil: 'Soltera', hijos: 1,
    sueldo: 30000, esquema: 'Sueldo fijo',
    rfc: 'PECN921003EF6', nss: '04129212399', curp: 'PECN921003MHGXRT04',
    domicilio: 'Pachuca, Hidalgo', telefono: '7716011501', emergencia: 'Madre · 7716011502',
    documentos: [
      { tipo: 'INE',                vence: '2029-10-31', folio: 'IDMEX-NPC-22', emisor: 'INE', estado: 'vigente', archivo: 'INE_NPC.pdf' },
      { tipo: 'Contrato individual',vence: null,         folio: 'CT-NPC-2022',  emisor: 'Kratos FP', estado: 'vigente', archivo: 'Contrato_NPC.pdf' }
    ],
    capacitaciones: [
      { fecha: '2026-02-05', curso: 'IMSS, INFONAVIT y timbrado de nómina', horas: 12, instructor: 'Contpaqi', resultado: 'Aprobada' }
    ],
    ausencias: [], asignaciones: [], epp: [], evaluaciones: []
  }
}

// Mapeo del 'rrhh.personal' a expediente
export const personalIndex = [
  { key: 'RN',  nombre: 'Ricardo Nieto' },
  { key: 'ERG', nombre: 'Eduardo Ramírez Gómez' },
  { key: 'LHM', nombre: 'Luis Heberto Morales Esquivel' },
  { key: 'SEP', nombre: 'Saul Esteban Prieto Gastelum' },
  { key: 'OG',  nombre: 'Omar Gómez' },
  { key: 'MFC', nombre: 'Mauricio Fuentes Castro' },
  { key: 'JLR', nombre: 'José Luis Reyes' },
  { key: 'LMR', nombre: 'Luis Mendoza Robles' },
  { key: 'PHM', nombre: 'Pedro Hernández Mata' },
  { key: 'RGS', nombre: 'Raúl Guzmán Solís' },
  { key: 'ATV', nombre: 'Antonio Torres Vega' },
  { key: 'JSS', nombre: 'Jaqueline Santos' },
  { key: 'CMR', nombre: 'Carla Medina Ríos' },
  { key: 'NPC', nombre: 'Natalia Peña Cordero' },
  { key: 'VG',  nombre: 'Valentina García' },
  { key: 'JC',  nombre: 'Jonathan Carrillo' },
  { key: 'FNL', nombre: 'Fernando Navarro León' },
  { key: 'HMC', nombre: 'Héctor Morán Cano' },
  { key: 'GBE', nombre: 'Gabriela Beltrán Estrada' },
  { key: 'DSA', nombre: 'Daniela Salas Aguilar' },
  { key: 'IVP', nombre: 'Iván Vázquez Ponce' },
  { key: 'KSO', nombre: 'Karen Soto Ortega' },
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
