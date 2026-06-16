// ============================================================
//  KRATOS · Expedientes de clientes
//  Datos basados en CRM y contratos vivos (Cashflow 2026)
// ============================================================

export const expedientesClientes = {
  TAP: {
    id: 'CL-001',
    nombre: 'Constructora Tapachula SA',
    industria: 'Obra civil',
    rfc: 'CTA950115AB1',
    contacto: 'Ing. Federico Ruiz',
    cargo: 'Gerente de obra',
    email: 'fruiz@ctapachula.mx',
    telefono: '9622334455',
    direccion: 'Tapachula, Chiapas',
    ltv: 14820000,
    estado: 'Activo',
    desde: '2024-08-12',
    diasCredito: 30,
    ejecutivo: 'Ing. Ricardo Nieto',
    cxc: 482500,
    cxcVencida: 0,
    facturadoYTD: 4820000,
    contratos: [
      { id: 'CT-2026-118', concepto: 'Renta grúas (G003, G005, G014) Tapachula', inicio: '2026-01-08', fin: '2026-12-31', monto: 5840000, estado: 'Vigente' },
      { id: 'CT-2025-244', concepto: 'Renta grúas obra civil 2025', inicio: '2025-04-20', fin: '2025-12-31', monto: 5240000, estado: 'Cerrado' }
    ],
    oportunidades: [
      { id: 'OP-204-X', equipo: 'Extensión 6 meses · G003 + G005', monto: 2820000, etapa: 'Negociación', prob: 0.65 }
    ],
    actividades: [
      { fecha: '2026-05-13', tipo: 'Llamada', detalle: 'Confirma fecha cierre maniobra premontaje 15/may', owner: 'Ricardo Nieto' },
      { fecha: '2026-05-10', tipo: 'Email',   detalle: 'Envía OC pendiente CG-2026-281', owner: 'Equipo Comercial' },
      { fecha: '2026-05-04', tipo: 'Visita',  detalle: 'Visita técnica Saul Esteban + Valentina', owner: 'Valentina García' },
      { fecha: '2026-04-22', tipo: 'Reunión', detalle: 'Definición plan junio', owner: 'Ricardo Nieto' }
    ],
    factura: [
      { folio: 'F-2026-1142', fecha: '2026-05-08', monto: 482500, estado: 'Vigente',    diasVenc: 12, oc: 'OC-CT-1142' },
      { folio: 'F-2026-1130', fecha: '2026-04-25', monto: 280200, estado: 'Pagado',     diasVenc: -8, oc: 'OC-CT-1130' },
      { folio: 'F-2026-1128', fecha: '2026-04-20', monto: 184200, estado: 'Pagado',     diasVenc: -12,oc: 'OC-CT-1128' }
    ],
    docs: [
      { tipo: 'Contrato marco',        vence: '2026-12-31', folio: 'CM-CTA-2024',  estado: 'vigente',  archivo: 'CM_Tapachula.pdf' },
      { tipo: 'CSF cliente',           vence: null,         folio: 'CSF-CTA',      estado: 'vigente',  archivo: 'CSF_CTA.pdf' },
      { tipo: 'Carta de crédito',      vence: '2026-08-30', folio: 'CC-CTA-25',    estado: 'vigente',  archivo: 'CC_CTA.pdf' },
      { tipo: 'Acta entrega Tapachula',vence: null,         folio: 'ACT-TAP-2026', estado: 'vigente',  archivo: 'Acta_Tap.pdf' }
    ]
  },

  ICA: {
    id: 'CL-002',
    nombre: 'ICA Fluor',
    industria: 'Infraestructura · EPC',
    rfc: 'IFL120508XYZ',
    contacto: 'Ing. Liliana Méndez',
    cargo: 'Procurement Lead',
    email: 'liliana.mendez@icafluor.com',
    telefono: '5512344567',
    direccion: 'CDMX · Sta. Fe',
    ltv: 28400000, estado: 'Activo', desde: '2023-03-04', diasCredito: 60, ejecutivo: 'Ing. Ricardo Nieto',
    cxc: 920000, cxcVencida: 0, facturadoYTD: 6840000,
    contratos: [
      { id: 'CT-2026-091', concepto: 'XCMG QY25 · 6 meses', inicio: '2026-04-12', fin: '2026-10-12', monto: 2140000, estado: 'En firma' }
    ],
    oportunidades: [
      { id: 'OP-191', equipo: 'XCMG QY25 · 6 meses', monto: 2140000, etapa: 'Cierre', prob: 0.85 }
    ],
    actividades: [
      { fecha: '2026-05-13', tipo: 'Email',   detalle: 'ICA aprueba contrato — firma 16/may', owner: 'Ricardo Nieto' },
      { fecha: '2026-05-08', tipo: 'Reunión', detalle: 'Revisión final términos', owner: 'Ricardo Nieto' },
      { fecha: '2026-04-29', tipo: 'Llamada', detalle: 'Cotización refinada con descuento por volumen', owner: 'Equipo Comercial' }
    ],
    factura: [
      { folio: 'F-2026-1102', fecha: '2026-05-01', monto: 920000, estado: 'Vigente', diasVenc: 28, oc: 'OC-2026-0162' }
    ],
    docs: [
      { tipo: 'NDA',            vence: '2027-03-15', folio: 'NDA-ICA-24',  estado: 'vigente', archivo: 'NDA_ICA.pdf' },
      { tipo: 'Pre-calificación',vence: '2026-12-31',folio: 'PQ-ICA-24',   estado: 'vigente', archivo: 'Precalif_ICA.pdf' }
    ]
  },

  CARSO: {
    id: 'CL-003',
    nombre: 'Grupo Carso',
    industria: 'Energía · construcción',
    rfc: 'GCA980304ABC',
    contacto: 'Lic. Mauricio Torres',
    cargo: 'Compras corporativo',
    email: 'mauricio.torres@carso.mx',
    telefono: '5523456789',
    direccion: 'CDMX · Polanco',
    ltv: 42100000, estado: 'Activo', desde: '2022-11-18', diasCredito: 45, ejecutivo: 'Ing. Ricardo Nieto',
    cxc: 1240000, cxcVencida: 1240000, facturadoYTD: 8420000,
    contratos: [
      { id: 'CT-2025-088', concepto: 'SANY 100t · 12 meses', inicio: '2025-08-04', fin: '2026-08-04', monto: 6240000, estado: 'Vigente · próximo a renovar' }
    ],
    oportunidades: [
      { id: 'OP-179', equipo: 'SANY 100t · 12 meses (renovación)', monto: 6240000, etapa: 'Negociación', prob: 0.6 }
    ],
    actividades: [
      { fecha: '2026-05-10', tipo: 'Llamada', detalle: 'Solicita reunión legal por términos renovación', owner: 'Ricardo Nieto' },
      { fecha: '2026-04-28', tipo: 'Email',   detalle: 'Recordatorio factura F-2026-0089 vencida', owner: 'Jaqueline Santos' }
    ],
    factura: [
      { folio: 'F-2026-0089', fecha: '2026-03-15', monto: 1240000, estado: 'Vencida 45d', diasVenc: 45, oc: 'OC-2026-0089' }
    ],
    docs: [
      { tipo: 'Contrato corporativo',vence: '2026-08-04',folio: 'CC-CAR-2025',estado: 'proximo', archivo: 'CC_Carso.pdf' },
      { tipo: 'NDA',                 vence: null,        folio: 'NDA-CAR-22', estado: 'vigente', archivo: 'NDA_Carso.pdf' }
    ]
  },

  CEMEX: {
    id: 'CL-004',
    nombre: 'Cemex Latam Holdings',
    industria: 'Cementera',
    rfc: 'CEM920514XXX',
    contacto: 'Ing. Roberto Salinas',
    cargo: 'Procurement MX',
    email: 'roberto.salinas@cemex.com',
    telefono: '8181234567',
    direccion: 'San Pedro Garza García, NL',
    ltv: 9820000, estado: 'Activo', desde: '2024-01-22', diasCredito: 30, ejecutivo: 'Equipo Comercial',
    cxc: 580000, cxcVencida: 0, facturadoYTD: 2420000,
    contratos: [
      { id: 'CT-2026-072', concepto: 'TITAN SQ20T · 2 meses (puntual)', inicio: '2026-04-22', fin: '2026-06-22', monto: 720000, estado: 'Vigente' }
    ],
    oportunidades: [
      { id: 'OP-185', equipo: 'TITAN SQ20T · 2 meses (extensión)', monto: 720000, etapa: 'Prospección', prob: 0.25 }
    ],
    actividades: [
      { fecha: '2026-05-11', tipo: 'Email', detalle: 'Pago de F-2026-0188 confirmado', owner: 'Jaqueline Santos' }
    ],
    factura: [
      { folio: 'F-2026-0188', fecha: '2026-05-06', monto: 580000, estado: 'Vigente', diasVenc: 8, oc: 'OC-2026-0188' }
    ],
    docs: [
      { tipo: 'NDA',            vence: '2027-01-22', folio: 'NDA-CEM-24',  estado: 'vigente', archivo: 'NDA_Cemex.pdf' }
    ]
  },

  OHL: {
    id: 'CL-005',
    nombre: 'OHL México',
    industria: 'Concesiones · obra carretera',
    rfc: 'OHL880412YYY',
    contacto: 'Arq. Daniel Ramírez',
    cargo: 'Compras de obra',
    email: 'daniel.ramirez@ohlmexico.com',
    telefono: '5534567890',
    direccion: 'CDMX · Roma',
    ltv: 18240000, estado: 'En riesgo', desde: '2022-06-15', diasCredito: 60, ejecutivo: 'Equipo Comercial',
    cxc: 340000, cxcVencida: 340000, facturadoYTD: 1480000,
    contratos: [
      { id: 'CT-2025-058', concepto: 'HIAB 12t · varias obras', inicio: '2025-06-15', fin: '2026-06-15', monto: 1820000, estado: 'Vigente · próximo a renovar' }
    ],
    oportunidades: [
      { id: 'OP-198', equipo: 'HIAB 12t · 3 meses', monto: 980000, etapa: 'Cotización', prob: 0.5 }
    ],
    actividades: [
      { fecha: '2026-05-12', tipo: 'Llamada', detalle: 'Sin contacto pago vencido — esca­lar', owner: 'Jaqueline Santos' },
      { fecha: '2026-04-30', tipo: 'Email',   detalle: 'Recordatorio factura vencida 32d', owner: 'Jaqueline Santos' }
    ],
    factura: [
      { folio: 'F-2026-0067', fecha: '2026-03-12', monto: 340000, estado: 'Vencida 62d', diasVenc: 62, oc: 'OC-2026-0067' }
    ],
    docs: [
      { tipo: 'Contrato marco',     vence: '2026-06-15', folio: 'CM-OHL-2024', estado: 'proximo',  archivo: 'CM_OHL.pdf' }
    ]
  },

  MOTA: {
    id: 'CL-006',
    nombre: 'Constructora Mota Engil',
    industria: 'Construcción · transporte',
    rfc: 'MOT920614KK1',
    contacto: 'Ing. Tomas Pereira',
    cargo: 'Equipos pesados',
    email: 'tomas.pereira@mota-engil.com',
    telefono: '5598877665',
    direccion: 'CDMX',
    ltv: 16420000, estado: 'Activo', desde: '2026-01-08', diasCredito: 30, ejecutivo: 'Ing. Ricardo Nieto',
    cxc: 0, cxcVencida: 0, facturadoYTD: 6240000,
    contratos: [
      { id: 'CT-2026-001', concepto: 'SANY 100t × 2 (G009, G010) · 12 meses', inicio: '2026-01-15', fin: '2027-01-15', monto: 9620000, estado: 'Vigente' }
    ],
    oportunidades: [
      { id: 'OP-204', equipo: 'SANY 100t × 2 · 8 meses adicionales', monto: 4820000, etapa: 'Negociación', prob: 0.7 }
    ],
    actividades: [
      { fecha: '2026-05-14', tipo: 'Visita',  detalle: 'Visita técnica programada 17/may con Ing. Pereira', owner: 'Ricardo Nieto' },
      { fecha: '2026-05-12', tipo: 'Email',   detalle: 'Aprobación de OC-ME-0822 confirmada', owner: 'Equipo Comercial' },
      { fecha: '2026-05-02', tipo: 'Llamada', detalle: 'Solicita propuesta ampliación 8 meses', owner: 'Ricardo Nieto' }
    ],
    factura: [],
    docs: [
      { tipo: 'Contrato marco', vence: '2027-01-15', folio: 'CM-MOT-2026', estado: 'vigente', archivo: 'CM_MotaEngil.pdf' },
      { tipo: 'NDA',            vence: '2028-01-15', folio: 'NDA-MOT-26',  estado: 'vigente', archivo: 'NDA_Mota.pdf' }
    ]
  },

  CFE: {
    id: 'CL-007',
    nombre: 'CFE Transmisión',
    industria: 'Energía · líneas de transmisión',
    rfc: 'CSS630818CCC',
    contacto: 'Ing. Pablo Hernández',
    cargo: 'Compras zona Centro',
    email: 'pablo.hernandez@cfe.mx',
    telefono: '5544552233',
    direccion: 'CDMX',
    ltv: 5240000, estado: 'Activo', desde: '2024-09-12', diasCredito: 60, ejecutivo: 'Equipo Comercial',
    cxc: 0, cxcVencida: 0, facturadoYTD: 1240000,
    contratos: [],
    oportunidades: [
      { id: 'OP-168', equipo: 'XCT12 · 4 meses', monto: 1380000, etapa: 'Cotización', prob: 0.45 }
    ],
    actividades: [
      { fecha: '2026-04-15', tipo: 'Email', detalle: 'Cotización entregada — espera OC', owner: 'Equipo Comercial' }
    ],
    factura: [],
    docs: [
      { tipo: 'Pre-calificación',vence: '2026-12-31', folio: 'PQ-CFE-24',  estado: 'vigente', archivo: 'Precalif_CFE.pdf' }
    ]
  },

  GMEXICO: {
    id: 'CL-008',
    nombre: 'Grupo México Minería',
    industria: 'Minería · cobre',
    rfc: 'GME890215MN2',
    contacto: 'Ing. Arturo Beltrán',
    cargo: 'Superintendente de equipos',
    email: 'arturo.beltran@gmexico.com',
    telefono: '6624455667',
    direccion: 'Cananea, Sonora',
    ltv: 34800000, estado: 'Activo', desde: '2023-09-10', diasCredito: 45, ejecutivo: 'Ing. Ricardo Nieto',
    cxc: 1480000, cxcVencida: 0, facturadoYTD: 7240000,
    contratos: [
      { id: 'CT-2026-104', concepto: 'SANY 220t · maniobras planta concentradora · 8 meses', inicio: '2026-02-10', fin: '2026-10-10', monto: 8420000, estado: 'Vigente' }
    ],
    oportunidades: [
      { id: 'OP-212', equipo: 'Liebherr 300t · ampliación mina · 12 meses', monto: 11200000, etapa: 'Negociación', prob: 0.6 }
    ],
    actividades: [
      { fecha: '2026-05-14', tipo: 'Visita',  detalle: 'Inspección de sitio Cananea para grúa 300t', owner: 'Ricardo Nieto' },
      { fecha: '2026-05-06', tipo: 'Email',   detalle: 'Envío propuesta técnica Liebherr 300t', owner: 'Equipo Comercial' },
      { fecha: '2026-04-24', tipo: 'Reunión', detalle: 'Revisión SLA disponibilidad equipo', owner: 'Ricardo Nieto' }
    ],
    factura: [
      { folio: 'F-2026-1156', fecha: '2026-05-04', monto: 1480000, estado: 'Vigente', diasVenc: 18, oc: 'OC-GM-1156' },
      { folio: 'F-2026-1140', fecha: '2026-04-12', monto: 1052000, estado: 'Pagado',  diasVenc: -6, oc: 'OC-GM-1140' }
    ],
    docs: [
      { tipo: 'Contrato marco',     vence: '2026-10-10', folio: 'CM-GM-2026', estado: 'vigente', archivo: 'CM_GMexico.pdf' },
      { tipo: 'Pólizas seguro obra',vence: '2026-09-30', folio: 'SEG-GM-26', estado: 'vigente', archivo: 'Seg_GMexico.pdf' },
      { tipo: 'NDA',                vence: '2027-09-10', folio: 'NDA-GM-23', estado: 'vigente', archivo: 'NDA_GMexico.pdf' }
    ]
  },

  IBERDROLA: {
    id: 'CL-009',
    nombre: 'Iberdrola México',
    industria: 'Energía · parques eólicos',
    rfc: 'IME070612EN8',
    contacto: 'Ing. Carmen Solís',
    cargo: 'Project Manager renovables',
    email: 'carmen.solis@iberdrola.com.mx',
    telefono: '5566778899',
    direccion: 'Monterrey, NL',
    ltv: 26400000, estado: 'Activo', desde: '2024-05-20', diasCredito: 60, ejecutivo: 'Ing. Ricardo Nieto',
    cxc: 1640000, cxcVencida: 0, facturadoYTD: 5820000,
    contratos: [
      { id: 'CT-2026-099', concepto: 'Liebherr 250t · montaje aerogeneradores · 7 meses', inicio: '2026-03-01', fin: '2026-10-01', monto: 9840000, estado: 'Vigente' }
    ],
    oportunidades: [
      { id: 'OP-208', equipo: 'XCMG 400t · parque eólico fase II', monto: 14200000, etapa: 'Cotización', prob: 0.5 }
    ],
    actividades: [
      { fecha: '2026-05-13', tipo: 'Reunión', detalle: 'Alineación cronograma izaje torres fase II', owner: 'Ricardo Nieto' },
      { fecha: '2026-05-02', tipo: 'Email',   detalle: 'Solicitud cotización grúa 400t', owner: 'Equipo Comercial' }
    ],
    factura: [
      { folio: 'F-2026-1149', fecha: '2026-04-30', monto: 1640000, estado: 'Vigente', diasVenc: 31, oc: 'OC-IB-1149' }
    ],
    docs: [
      { tipo: 'Contrato marco',      vence: '2026-10-01', folio: 'CM-IB-2026', estado: 'vigente', archivo: 'CM_Iberdrola.pdf' },
      { tipo: 'Plan de izaje aprobado',vence: '2026-10-01',folio: 'PI-IB-26',  estado: 'vigente', archivo: 'PlanIzaje_IB.pdf' }
    ]
  },

  TECHINT: {
    id: 'CL-010',
    nombre: 'Techint Ingeniería y Construcción',
    industria: 'Infraestructura · EPC industrial',
    rfc: 'TIC910408EPC',
    contacto: 'Ing. Marcela Vidal',
    cargo: 'Gerente de procura',
    email: 'marcela.vidal@techint.com',
    telefono: '5588990011',
    direccion: 'CDMX · Reforma',
    ltv: 31200000, estado: 'Activo', desde: '2023-01-15', diasCredito: 60, ejecutivo: 'Equipo Comercial',
    cxc: 980000, cxcVencida: 0, facturadoYTD: 6920000,
    contratos: [
      { id: 'CT-2026-087', concepto: 'TITAN SQ50T + HIAB · planta industrial · 9 meses', inicio: '2026-01-20', fin: '2026-10-20', monto: 7640000, estado: 'Vigente' }
    ],
    oportunidades: [
      { id: 'OP-201', equipo: 'SANY 100t · nueva línea proceso', monto: 4280000, etapa: 'Cierre', prob: 0.8 }
    ],
    actividades: [
      { fecha: '2026-05-12', tipo: 'Email',   detalle: 'Techint confirma adjudicación — firma 19/may', owner: 'Equipo Comercial' },
      { fecha: '2026-05-05', tipo: 'Llamada', detalle: 'Negociación tarifa por volumen', owner: 'Ricardo Nieto' }
    ],
    factura: [
      { folio: 'F-2026-1138', fecha: '2026-05-02', monto: 980000, estado: 'Vigente', diasVenc: 29, oc: 'OC-TX-1138' }
    ],
    docs: [
      { tipo: 'Contrato marco', vence: '2026-10-20', folio: 'CM-TX-2026', estado: 'vigente', archivo: 'CM_Techint.pdf' },
      { tipo: 'NDA',            vence: '2027-01-15', folio: 'NDA-TX-23',  estado: 'vigente', archivo: 'NDA_Techint.pdf' }
    ]
  },

  IDEAL: {
    id: 'CL-011',
    nombre: 'IDEAL Infraestructura',
    industria: 'Concesiones · autopistas',
    rfc: 'IDE051118INF',
    contacto: 'Arq. Hugo Lara',
    cargo: 'Director de obra',
    email: 'hugo.lara@ideal.com.mx',
    telefono: '5512309988',
    direccion: 'CDMX · Lomas',
    ltv: 12840000, estado: 'En riesgo', desde: '2024-11-04', diasCredito: 45, ejecutivo: 'Equipo Comercial',
    cxc: 720000, cxcVencida: 720000, facturadoYTD: 2180000,
    contratos: [
      { id: 'CT-2025-061', concepto: 'XCT12 · puentes autopista · 10 meses', inicio: '2025-09-01', fin: '2026-07-01', monto: 2640000, estado: 'Vigente · próximo a renovar' }
    ],
    oportunidades: [
      { id: 'OP-196', equipo: 'XCT12 · extensión 6 meses', monto: 1580000, etapa: 'Negociación', prob: 0.4 }
    ],
    actividades: [
      { fecha: '2026-05-11', tipo: 'Llamada', detalle: 'Compromiso de pago parcial factura vencida 14/may', owner: 'Jaqueline Santos' },
      { fecha: '2026-04-26', tipo: 'Email',   detalle: 'Segundo recordatorio cobranza F-2026-0074', owner: 'Jaqueline Santos' }
    ],
    factura: [
      { folio: 'F-2026-0074', fecha: '2026-03-20', monto: 720000, estado: 'Vencida 56d', diasVenc: 56, oc: 'OC-ID-0074' }
    ],
    docs: [
      { tipo: 'Contrato marco', vence: '2026-07-01', folio: 'CM-ID-2025', estado: 'proximo', archivo: 'CM_Ideal.pdf' }
    ]
  },

  VISE: {
    id: 'CL-012',
    nombre: 'VISE Constructora',
    industria: 'Obra civil · vialidades',
    rfc: 'VIS960722VIA',
    contacto: 'Ing. Sergio Cabrera',
    cargo: 'Jefe de maquinaria',
    email: 'sergio.cabrera@vise.com.mx',
    telefono: '8112345566',
    direccion: 'San Nicolás, NL',
    ltv: 9620000, estado: 'Activo', desde: '2025-02-12', diasCredito: 30, ejecutivo: 'Ing. Ricardo Nieto',
    cxc: 410000, cxcVencida: 0, facturadoYTD: 3120000,
    contratos: [
      { id: 'CT-2026-110', concepto: 'HIAB 12t × 2 · pasos a desnivel · 6 meses', inicio: '2026-04-01', fin: '2026-10-01', monto: 2980000, estado: 'Vigente' }
    ],
    oportunidades: [
      { id: 'OP-210', equipo: 'TITAN SQ20T · distribuidor vial', monto: 1820000, etapa: 'Cotización', prob: 0.55 }
    ],
    actividades: [
      { fecha: '2026-05-09', tipo: 'Visita',  detalle: 'Levantamiento técnico distribuidor vial', owner: 'Valentina García' },
      { fecha: '2026-04-30', tipo: 'Email',   detalle: 'Envío cotización TITAN SQ20T', owner: 'Equipo Comercial' }
    ],
    factura: [
      { folio: 'F-2026-1151', fecha: '2026-05-05', monto: 410000, estado: 'Vigente', diasVenc: 9, oc: 'OC-VS-1151' }
    ],
    docs: [
      { tipo: 'Contrato marco', vence: '2026-10-01', folio: 'CM-VS-2026', estado: 'vigente', archivo: 'CM_Vise.pdf' },
      { tipo: 'CSF cliente',    vence: null,         folio: 'CSF-VS',      estado: 'vigente', archivo: 'CSF_Vise.pdf' }
    ]
  },

  COCONAL: {
    id: 'CL-013',
    nombre: 'Coconal Construcción',
    industria: 'Obra civil · carreteras',
    rfc: 'COC780930CAR',
    contacto: 'Ing. Patricia Núñez',
    cargo: 'Coordinadora de equipos',
    email: 'patricia.nunez@coconal.com.mx',
    telefono: '5523456611',
    direccion: 'CDMX · Del Valle',
    ltv: 15240000, estado: 'Activo', desde: '2024-03-18', diasCredito: 45, ejecutivo: 'Equipo Comercial',
    cxc: 0, cxcVencida: 0, facturadoYTD: 4480000,
    contratos: [
      { id: 'CT-2026-094', concepto: 'SANY 100t · ampliación carretera · 8 meses', inicio: '2026-02-15', fin: '2026-10-15', monto: 6120000, estado: 'Vigente' }
    ],
    oportunidades: [
      { id: 'OP-205', equipo: 'SANY 100t · segundo frente · 8 meses', monto: 5240000, etapa: 'Prospección', prob: 0.3 }
    ],
    actividades: [
      { fecha: '2026-05-08', tipo: 'Reunión', detalle: 'Presentación de capacidades para segundo frente', owner: 'Equipo Comercial' }
    ],
    factura: [
      { folio: 'F-2026-1133', fecha: '2026-04-18', monto: 765000, estado: 'Pagado', diasVenc: -10, oc: 'OC-CN-1133' }
    ],
    docs: [
      { tipo: 'Contrato marco', vence: '2026-10-15', folio: 'CM-CN-2026', estado: 'vigente', archivo: 'CM_Coconal.pdf' }
    ]
  },

  SACYR: {
    id: 'CL-014',
    nombre: 'Sacyr Construcción México',
    industria: 'Infraestructura · obra pesada',
    rfc: 'SAC031205OBP',
    contacto: 'Ing. Daniel Fuentes',
    cargo: 'Gerente de equipos',
    email: 'daniel.fuentes@sacyr.com',
    telefono: '5598001122',
    direccion: 'CDMX · Insurgentes',
    ltv: 7820000, estado: 'Activo', desde: '2026-03-02', diasCredito: 60, ejecutivo: 'Ing. Ricardo Nieto',
    cxc: 0, cxcVencida: 0, facturadoYTD: 980000,
    contratos: [],
    oportunidades: [
      { id: 'OP-214', equipo: 'XCMG QY25 · túnel · 6 meses', monto: 3480000, etapa: 'Negociación', prob: 0.65 }
    ],
    actividades: [
      { fecha: '2026-05-14', tipo: 'Reunión', detalle: 'Primera reunión técnica proyecto túnel', owner: 'Ricardo Nieto' },
      { fecha: '2026-05-07', tipo: 'Email',   detalle: 'Cliente solicita ficha técnica XCMG QY25', owner: 'Equipo Comercial' }
    ],
    factura: [
      { folio: 'F-2026-1147', fecha: '2026-04-28', monto: 490000, estado: 'Pagado', diasVenc: -4, oc: 'OC-SC-1147' }
    ],
    docs: [
      { tipo: 'NDA',             vence: '2028-03-02', folio: 'NDA-SC-26', estado: 'vigente', archivo: 'NDA_Sacyr.pdf' },
      { tipo: 'Pre-calificación',vence: '2026-12-31', folio: 'PQ-SC-26',  estado: 'vigente', archivo: 'Precalif_Sacyr.pdf' }
    ]
  },

  ACCIONA: {
    id: 'CL-015',
    nombre: 'Acciona Infraestructuras',
    industria: 'Energía · infraestructura',
    rfc: 'ACC120914INF',
    contacto: 'Ing. Verónica Ortiz',
    cargo: 'Procurement renovables',
    email: 'veronica.ortiz@acciona.com',
    telefono: '5544889900',
    direccion: 'CDMX · Santa Fe',
    ltv: 4980000, estado: 'Activo', desde: '2026-04-22', diasCredito: 60, ejecutivo: 'Equipo Comercial',
    cxc: 0, cxcVencida: 0, facturadoYTD: 0,
    contratos: [],
    oportunidades: [
      { id: 'OP-216', equipo: 'Liebherr 250t · planta solar · 5 meses', monto: 6240000, etapa: 'Cotización', prob: 0.45 }
    ],
    actividades: [
      { fecha: '2026-05-13', tipo: 'Email', detalle: 'Cotización planta solar entregada — espera comité', owner: 'Equipo Comercial' }
    ],
    factura: [],
    docs: [
      { tipo: 'Pre-calificación', vence: '2026-12-31', folio: 'PQ-AC-26', estado: 'vigente', archivo: 'Precalif_Acciona.pdf' }
    ]
  }
}

export const clienteIndex = [
  { key: 'TAP',      nombre: 'Constructora Tapachula SA' },
  { key: 'ICA',      nombre: 'ICA Fluor' },
  { key: 'CARSO',    nombre: 'Grupo Carso' },
  { key: 'CEMEX',    nombre: 'Cemex Latam Holdings' },
  { key: 'OHL',      nombre: 'OHL México' },
  { key: 'MOTA',     nombre: 'Constructora Mota Engil' },
  { key: 'CFE',      nombre: 'CFE Transmisión' },
  { key: 'GMEXICO',  nombre: 'Grupo México Minería' },
  { key: 'IBERDROLA',nombre: 'Iberdrola México' },
  { key: 'TECHINT',  nombre: 'Techint Ingeniería y Construcción' },
  { key: 'IDEAL',    nombre: 'IDEAL Infraestructura' },
  { key: 'VISE',     nombre: 'VISE Constructora' },
  { key: 'COCONAL',  nombre: 'Coconal Construcción' },
  { key: 'SACYR',    nombre: 'Sacyr Construcción México' },
  { key: 'ACCIONA',  nombre: 'Acciona Infraestructuras' }
]
