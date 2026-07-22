// ============================================================
//  KRATOS · Centro de Inteligencia Operativa
//  Mock data construido sobre los formatos reales que ya
//  maneja la empresa (checklists, bitácoras, cashflow, etc.)
// ============================================================

export const empresa = {
  nombre: 'Kratos FP',
  marcas: ['Kratos FP', 'KraTec', 'BehLux', 'Podcast'],
  direccion: 'Carr. la Trinidad 3, Zempoala, Hidalgo. CP 43830',
  contacto: { email: 'info@kratosfp.com', ventas: 'ventas@kratosfp.com', oficina: '7716882508', wa: '5651085958' }
}

export const usuarios = {
  ceo:        { id: 'rnieto',   nombre: 'Ing. Ricardo Nieto',     rol: 'CEO / Dirección General',         avatar: 'RN', color: '#DC2626' },
  coo:        { id: 'cgeneral', nombre: 'Coordinación General',   rol: 'COO',                              avatar: 'CG', color: '#3B82F6' },
  finanzas:   { id: 'jsantos',  nombre: 'Jaqueline Santos',       rol: 'Líder de Finanzas',                avatar: 'JS', color: '#10B981' },
  operaciones:{ id: 'vgarcia',  nombre: 'Valentina García',       rol: 'Líder de Operaciones',             avatar: 'VG', color: '#F59E0B' },
  compras:    { id: 'jcarrillo',nombre: 'Jonathan Carrillo',      rol: 'Líder de Compras y Almacén',       avatar: 'JC', color: '#A855F7' },
  marketing:  { id: 'alopez',   nombre: 'Ahtziri López',          rol: 'Líder de Mercadotecnia',           avatar: 'AL', color: '#EC4899' }
}

// ----- Módulos del sistema -----
export const modulos = [
  { id: 'ceo',         numero: '00', label: 'Dashboard CEO',      kicker: '',                           icon: 'Crown',            path: '/',              group: 'Dashboards'   },
  { id: 'brain',       numero: '01', label: 'Kratos FP Brain',    kicker: 'Chat IA · analiza toda la plataforma', icon: 'Brain',  path: '/brain',         group: 'Dashboards'   },
  { id: 'finanzas',    numero: '02', label: 'Finanzas',           kicker: 'Tesorería · CXC · CXP · Crédito', icon: 'Banknote', path: '/finanzas',      group: 'Operación'    },
  { id: 'crm',         numero: '03', label: 'Comercial',          kicker: 'CRM · Pipeline · Clientes',  icon: 'TrendingUp',       path: '/crm',           group: 'Operación'    },
  { id: 'operaciones', numero: '04', label: 'Operaciones',        kicker: 'Flota · Bitácora · Cargas',   icon: 'Truck',            path: '/operaciones',   group: 'Operación'    },
  { id: 'compras',     numero: '05', label: 'Compras y Almacén',   kicker: 'Requisiciones · Inventario', icon: 'Package',          path: '/compras',       group: 'Operación'    },
  { id: 'rrhh',        numero: '06', label: 'Recursos Humanos',    kicker: 'Personal · Documentos',      icon: 'Users',            path: '/rrhh',          group: 'Operación'    },
  { id: 'calidad',     numero: '08', label: 'Calidad',             kicker: 'NC · Auditorías · Checklists',icon: 'ShieldCheck',      path: '/calidad',       group: 'Operación'    }
]

// ============================================================
//  FLOTA — datos extraídos de DOCUMENTOS GRÚAS.xlsx / VEHÍCULOS
// ============================================================
export const flota = {
  gruas: [
    { eco: 'G003', marca: 'HIAB',    modelo: 'Hidráulica',           anio: 2022, capacidad: '12 ton', estado: 'En obra',     ubicacion: 'Tapachula',    operador: 'Saul Esteban Prieto', horometro: 4825, kmAcum: 28140, docVence: '2026-08-12', salud: 92 },
    { eco: 'G004', marca: 'XCMG',    modelo: 'QY25',                 anio: 2023, capacidad: '25 ton', estado: 'En patio',    ubicacion: 'Zempoala',     operador: '—',                  horometro: 3210, kmAcum: 18450, docVence: '2026-06-04', salud: 88 },
    { eco: 'G005', marca: 'XCMG',    modelo: 'XCT12',                anio: 2023, capacidad: '12 ton', estado: 'En obra',     ubicacion: 'Tapachula',    operador: 'Luis Heberto Morales', horometro: 5612, kmAcum: 31250, docVence: '2026-05-30', salud: 78 },
    { eco: 'G008', marca: 'Dongfeng',modelo: 'TITAN SQ20T',          anio: 2023, capacidad: '20 ton', estado: 'Mantenimiento', ubicacion: 'Patio Kratos', operador: '—',                  horometro: 4188, kmAcum: 24890, docVence: '2026-07-20', salud: 65 },
    { eco: 'G009', marca: 'SANY',    modelo: 'STC1000 (0410)',       anio: 2024, capacidad: '100 ton',estado: 'En obra',     ubicacion: 'Tapachula',    operador: 'Luis Heberto Morales', horometro: 2105, kmAcum: 12880, docVence: '2026-09-15', salud: 95 },
    { eco: 'G010', marca: 'SANY',    modelo: 'STC1000 (0443)',       anio: 2024, capacidad: '100 ton',estado: 'En obra',     ubicacion: 'Tapachula',    operador: 'Omar Gómez',          horometro: 1924, kmAcum: 11320, docVence: '2026-09-15', salud: 96 },
    { eco: 'G014', marca: 'SANY',    modelo: '100 TON',              anio: 2024, capacidad: '100 ton',estado: 'En obra',     ubicacion: 'Tapachula',    operador: 'Equipo Mat-Noc',      horometro: 1788, kmAcum: 9870,  docVence: '2026-11-02', salud: 91 }
  ],
  vehiculos: [
    { eco: 'V001', marca: 'RAM',    modelo: 'PMR 1043',      tipo: 'Piloto',    placas: 'HL5984H', verifica: '2026-08-15', polizaVence: '2026-09-30', estado: 'Activo' },
    { eco: 'V002', marca: 'RAM',    modelo: 'PMR 1314',      tipo: 'Piloto',    placas: 'HM4613H', verifica: '2026-10-22', polizaVence: '2026-07-18', estado: 'Activo' },
    { eco: 'V009', marca: 'Toyota', modelo: 'Hilux',         tipo: 'Piloto',    placas: 'HM0843H', verifica: '2026-07-08', polizaVence: '2026-12-01', estado: 'Activo' },
    { eco: 'T001', marca: 'Foton',  modelo: 'Galaxy EVI',    tipo: 'Tractocamión', placas: 'TR8821', verifica: '2026-06-10', polizaVence: '2026-11-15', estado: 'En ruta' }
  ]
}

// ============================================================
//  CHECKLISTS por área — basado en Chklst Ops/Compras/Fin/MKT
// ============================================================
export const checklists = {
  operaciones: {
    responsable: 'Valentina García',
    semana: 'MAYO Semana 4-10',
    cumplimiento: 86,
    items: [
      { actividad: 'Bitácora de hechos',           frecuencia: 'Diario',   evidencia: 'Carpeta digital',     cumple: true,  hallazgo: '' },
      { actividad: 'GPS activo',                    frecuencia: 'Diario',   evidencia: 'Captura plataforma',  cumple: true,  hallazgo: '' },
      { actividad: 'Salida/entrada grúas',         frecuencia: 'Diario',   evidencia: 'Registro horario',    cumple: false, hallazgo: 'Falta inspección unidad piloto G008' },
      { actividad: 'Lista verificación grúa',      frecuencia: 'Diario',   evidencia: 'Checklist firmado',   cumple: true,  hallazgo: '' },
      { actividad: 'Lista verificación accesorios izaje', frecuencia: 'Diario', evidencia: 'Checklist firmado', cumple: true, hallazgo: '' },
      { actividad: 'Cargas de combustible',        frecuencia: 'Diario',   evidencia: 'Evidencia fotográfica', cumple: true, hallazgo: '' },
      { actividad: 'Edenred y fondeo',             frecuencia: 'Semanal',  evidencia: 'Captura portal',      cumple: true,  hallazgo: '' },
      { actividad: 'Conciliar horas cliente',      frecuencia: 'Semanal',  evidencia: 'Archivo actualizado', cumple: false, hallazgo: 'Faltan horas Sem 18 cliente Tapachula' },
      { actividad: 'Trazar ruta segura (SCT)',     frecuencia: 'Semanal',  evidencia: 'Mapa / SCT',          cumple: true,  hallazgo: '' },
      { actividad: 'Renovación OC clientes',       frecuencia: 'Semanal',  evidencia: 'Nueva OC',            cumple: true,  hallazgo: '' },
      { actividad: 'Visita al patio (jueves 10am)',frecuencia: 'Semanal',  evidencia: 'Registro visita',     cumple: true,  hallazgo: '' },
      { actividad: 'Certificación personal',       frecuencia: 'Mensual',  evidencia: 'Constancia',          cumple: true,  hallazgo: '' },
      { actividad: 'Documentación de grúas vigente', frecuencia: 'Mensual', evidencia: 'PDF consolidado',    cumple: false, hallazgo: 'Verificación G005 vence 30/may' }
    ]
  },
  finanzas: {
    responsable: 'Jaqueline Santos',
    semana: 'MAYO Semana 4-10',
    cumplimiento: 94,
    items: [
      { actividad: 'Revisar la banca BBVA',          frecuencia: 'Diario', evidencia: 'Captura plataforma',  cumple: true, hallazgo: '' },
      { actividad: 'Balance final por cuenta',       frecuencia: 'Diario', evidencia: 'Captura',             cumple: true, hallazgo: '' },
      { actividad: 'Capturar transacciones Cashflow', frecuencia: 'Evento', evidencia: 'Documento',          cumple: true, hallazgo: '' },
      { actividad: 'Toka',                            frecuencia: 'Diario', evidencia: 'Captura portal',     cumple: true, hallazgo: '' },
      { actividad: 'Conciliar CXP y CXC (lunes)',    frecuencia: 'Semanal',evidencia: 'Pr. Pagos',           cumple: true, hallazgo: '' },
      { actividad: 'Programar pagos (lunes)',         frecuencia: 'Semanal',evidencia: 'Correo',             cumple: true, hallazgo: '' },
      { actividad: 'Hacer pagos viernes',             frecuencia: 'Semanal',evidencia: 'Correo',             cumple: true, hallazgo: '' },
      { actividad: 'Solicitar autorización nómina (jueves)', frecuencia: 'Semanal', evidencia: 'Correo',     cumple: false, hallazgo: 'Pendiente firma CG' },
      { actividad: 'Corte de CCH lunes/viernes',      frecuencia: 'Semanal',evidencia: 'Doc firmado CG',     cumple: true, hallazgo: '' },
      { actividad: 'Precierres bancarios lunes',      frecuencia: 'Semanal',evidencia: 'Correo Conta MC',    cumple: true, hallazgo: '' },
      { actividad: 'Presupuesto mensual fin de mes',  frecuencia: 'Mensual',evidencia: 'Pr. Pagos',          cumple: true, hallazgo: '' },
      { actividad: 'Presentar Balances y E.F.',       frecuencia: 'Mensual',evidencia: 'E.R. Cashflow',      cumple: true, hallazgo: '' },
      { actividad: 'Documentación mensual (SAT/IMSS/INFONAVIT/ISN)', frecuencia: 'Mensual', evidencia: 'Carpeta', cumple: true, hallazgo: '' }
    ]
  },
  compras: {
    responsable: 'Jonathan Carrillo',
    semana: 'MAYO Semana 4-10',
    cumplimiento: 81,
    items: [
      { actividad: 'Recepción de requisiciones',     frecuencia: 'Evento',  evidencia: 'Correo',           cumple: true,  hallazgo: '' },
      { actividad: 'Requisiciones atendidas',        frecuencia: 'Evento',  evidencia: '# de solicitudes', cumple: true,  hallazgo: '' },
      { actividad: 'Solicitud de cotizaciones (3 prov)', frecuencia: 'Evento', evidencia: 'Evidencia correo', cumple: false, hallazgo: 'Sólo 2 cotizaciones para Req-114' },
      { actividad: 'Negociación con proveedores',    frecuencia: 'Evento',  evidencia: 'Comparativo',      cumple: true,  hallazgo: '' },
      { actividad: 'Órdenes de compra generadas',    frecuencia: 'Evento',  evidencia: 'Correo',           cumple: true,  hallazgo: '' },
      { actividad: 'Recepción e inspección de calidad', frecuencia: 'Evento', evidencia: 'OC firmada',      cumple: true,  hallazgo: '' },
      { actividad: 'Búsqueda de proveedores confiables', frecuencia: 'Diario', evidencia: 'Carpeta actualizada', cumple: true, hallazgo: '' },
      { actividad: 'Gestión de no conformidades',    frecuencia: 'Evento',  evidencia: 'Documento',        cumple: false, hallazgo: 'NC-22 sin cierre proveedor La Troka' },
      { actividad: 'Monitoreo de nivel inventario',  frecuencia: 'Semanal', evidencia: 'Carpeta',          cumple: true,  hallazgo: '' },
      { actividad: 'Evaluación de proveedores',      frecuencia: 'Mensual', evidencia: 'Reporte correo',   cumple: false, hallazgo: 'Pendiente evaluación abril' }
    ]
  },
  marketing: {
    responsable: 'Ahtziri López',
    semana: 'MAYO Semana 4-10',
    cumplimiento: 90,
    items: [
      { actividad: 'Revisión de mensajes y comentarios', frecuencia: 'Diario', evidencia: 'Capturas',     cumple: true, hallazgo: '' },
      { actividad: 'Diseño (posts/stories/reels)',       frecuencia: 'Diario', evidencia: 'Avance PDF',   cumple: true, hallazgo: '' },
      { actividad: 'Grabación y edición',                frecuencia: 'Diario', evidencia: 'Archivos',     cumple: true, hallazgo: '' },
      { actividad: 'Verificar publicaciones fecha/hora', frecuencia: 'Diario', evidencia: 'Capturas',     cumple: true, hallazgo: '' },
      { actividad: 'Material interno',                   frecuencia: 'Diario', evidencia: 'PDF',          cumple: true, hallazgo: '' },
      { actividad: 'Rotulación de unidades',             frecuencia: 'Diario', evidencia: 'Fotografía',   cumple: true, hallazgo: '' },
      { actividad: 'Verificar enlaces y formularios web',frecuencia: 'Diario', evidencia: 'Captura',      cumple: false, hallazgo: 'Form de contacto sin validación' },
      { actividad: 'Calendario mensual de contenidos',   frecuencia: 'Mensual',evidencia: 'Correo',       cumple: true, hallazgo: '' },
      { actividad: 'Reporte mensual redes (IG/FB/TT/LI/WA)', frecuencia: 'Mensual', evidencia: 'Correo', cumple: true, hallazgo: '' }
    ]
  }
}

// ============================================================
//  FINANZAS — Cashflow 2026, P&L, CXP/CXC
// ============================================================
export const finanzas = {
  saldoBancos: [
    { banco: 'BBVA Empresa MXN',  saldo: 2845420, cuenta: '****4471', conciliado: '2026-05-13' },
    { banco: 'BBVA Inversión',    saldo: 1240000, cuenta: '****8829', conciliado: '2026-05-13' },
    { banco: 'Toka (vales)',      saldo:  148320, cuenta: 'KFP-TOKA', conciliado: '2026-05-13' },
    { banco: 'Edenred (combustible)', saldo: 92840, cuenta: 'EDR-001', conciliado: '2026-05-13' }
  ],
  pl: [
    { mes: 'Ene', ingresos: 4820000, gastos: 5114328, utilidad: -294328 },
    { mes: 'Feb', ingresos: 4180000, gastos: 4676582, utilidad: -496582 },
    { mes: 'Mar', ingresos: 5640000, gastos: 5543249, utilidad: 96751 },
    { mes: 'Abr', ingresos: 6120000, gastos: 5210440, utilidad: 909560 },
    { mes: 'May', ingresos: 5980000, gastos: 5345120, utilidad: 634880 }
  ],
  cashflow12s: [
    { semana: 'S1', entrada: 1240000, salida: 980000 },
    { semana: 'S2', entrada: 1480000, salida: 1120000 },
    { semana: 'S3', entrada: 980000,  salida: 1340000 },
    { semana: 'S4', entrada: 1820000, salida: 1410000 },
    { semana: 'S5', entrada: 1640000, salida: 1280000 },
    { semana: 'S6', entrada: 1380000, salida: 1180000 },
    { semana: 'S7', entrada: 1980000, salida: 1480000 },
    { semana: 'S8', entrada: 2120000, salida: 1640000 },
    { semana: 'S9', entrada: 1820000, salida: 1380000 },
    { semana: 'S10',entrada: 1540000, salida: 1240000 },
    { semana: 'S11',entrada: 1980000, salida: 1480000 },
    { semana: 'S12',entrada: 2280000, salida: 1620000 }
  ],
  cxc: [
    { cliente: 'Constructora Tapachula SA', monto: 482500, dias: 12,  oc: 'OC-2026-0148', estado: 'Vigente' },
    { cliente: 'ICA Fluor',                  monto: 920000, dias: 28,  oc: 'OC-2026-0162', estado: 'Vigente' },
    { cliente: 'Grupo Carso',                monto: 1240000,dias: 45,  oc: 'OC-2026-0089', estado: 'Vencida 15d' },
    { cliente: 'Cemex Latam Holdings',       monto: 580000, dias: 8,   oc: 'OC-2026-0188', estado: 'Vigente' },
    { cliente: 'OHL México',                 monto: 340000, dias: 62,  oc: 'OC-2026-0067', estado: 'Vencida 32d' }
  ],
  cxp: [
    { proveedor: 'La Troka',           monto: 48500,  vence: '2026-05-16', tipo: 'Refacciones' },
    { proveedor: 'Diésel del Bajío',   monto: 184000, vence: '2026-05-17', tipo: 'Combustible' },
    { proveedor: 'Seguros Banorte',    monto: 92400,  vence: '2026-05-20', tipo: 'Pólizas' },
    { proveedor: 'IMSS (cédula abr)',  monto: 148230, vence: '2026-05-17', tipo: 'Obrero-patronal' },
    { proveedor: 'SAT (ISR retenido)', monto: 218450, vence: '2026-05-17', tipo: 'Declaración' },
    { proveedor: 'Refacciones Vikingo',monto: 32100,  vence: '2026-05-22', tipo: 'Almacén' }
  ],
  cumplimientoFiscal: [
    { obligacion: 'SAT — Declaración mensual ISR', estado: 'En curso',    vence: '2026-05-17', responsable: 'Jaqueline Santos' },
    { obligacion: 'SAT — IVA',                     estado: 'En curso',    vence: '2026-05-17', responsable: 'Jaqueline Santos' },
    { obligacion: 'IMSS — Cuotas obrero-patronales', estado: 'Pendiente', vence: '2026-05-17', responsable: 'Jaqueline Santos' },
    { obligacion: 'INFONAVIT bimestral',            estado: 'Al día',     vence: '2026-07-17', responsable: 'Jaqueline Santos' },
    { obligacion: 'ISN (Hidalgo)',                  estado: 'En curso',   vence: '2026-05-17', responsable: 'Jaqueline Santos' },
    { obligacion: 'REPSE — Reporte cuatrimestral',  estado: 'Al día',     vence: '2026-09-30', responsable: 'Jaqueline Santos' },
    { obligacion: 'ICSOE',                          estado: 'Al día',     vence: '2026-07-17', responsable: 'Jaqueline Santos' },
    { obligacion: 'SISUB',                          estado: 'Al día',     vence: '2026-07-17', responsable: 'Jaqueline Santos' },
    { obligacion: 'SIROC',                          estado: 'Pendiente',  vence: '2026-05-30', responsable: 'Jaqueline Santos' }
  ]
}

// ============================================================
//  CRM COMERCIAL
// ============================================================
export const crm = {
  pipeline: [
    { etapa: 'Prospección',    monto: 4820000, deals: 14 },
    { etapa: 'Cotización',     monto: 8240000, deals: 9 },
    { etapa: 'Negociación',    monto: 5680000, deals: 6 },
    { etapa: 'Cierre',         monto: 3240000, deals: 4 },
    { etapa: 'Ganadas (mes)',  monto: 2980000, deals: 3 }
  ],
  oportunidades: [
    { id: 'OP-204', cliente: 'Constructora Mota Engil',  equipo: 'SANY STC1000 (100t) x2 — 8 meses', monto: 4820000, etapa: 'Negociación',  prob: 0.7, owner: 'Ing. Ricardo Nieto', proximo: 'Visita técnica 17/may', score: 'A' },
    { id: 'OP-198', cliente: 'OHL México',                equipo: 'HIAB 12t — 3 meses',               monto: 980000,  etapa: 'Cotización',   prob: 0.5, owner: 'Equipo Comercial',   proximo: 'Enviar comparativo',  score: 'B' },
    { id: 'OP-191', cliente: 'ICA Fluor',                 equipo: 'XCMG QY25 — 6 meses',              monto: 2140000, etapa: 'Cierre',       prob: 0.85,owner: 'Ing. Ricardo Nieto', proximo: 'Firma de contrato',  score: 'A' },
    { id: 'OP-185', cliente: 'Cemex Latam',               equipo: 'TITAN SQ20T — 2 meses',            monto: 720000,  etapa: 'Prospección',  prob: 0.25,owner: 'Equipo Comercial',   proximo: 'Llamada de descubrimiento', score: 'C' },
    { id: 'OP-179', cliente: 'Grupo Carso',               equipo: 'SANY 100t — 12 meses',             monto: 6240000, etapa: 'Negociación',  prob: 0.6, owner: 'Ing. Ricardo Nieto', proximo: 'Revisión legal',     score: 'A' },
    { id: 'OP-168', cliente: 'CFE Transmisión',           equipo: 'XCT12 — 4 meses',                  monto: 1380000, etapa: 'Cotización',   prob: 0.45,owner: 'Equipo Comercial',   proximo: 'Esperar OC',         score: 'B' }
  ],
  clientes: [
    { nombre: 'Constructora Tapachula SA', industria: 'Obra civil',     ltv: 14820000, ultimoMov: '2026-05-12', estado: 'Activo' },
    { nombre: 'ICA Fluor',                  industria: 'Infraestructura', ltv: 28400000, ultimoMov: '2026-05-08', estado: 'Activo' },
    { nombre: 'Grupo Carso',                industria: 'Energía',        ltv: 42100000, ultimoMov: '2026-04-28', estado: 'Activo' },
    { nombre: 'Cemex Latam Holdings',       industria: 'Cementera',      ltv: 9820000,  ultimoMov: '2026-05-11', estado: 'Activo' },
    { nombre: 'OHL México',                 industria: 'Concesiones',    ltv: 18240000, ultimoMov: '2026-03-22', estado: 'En riesgo' },
    { nombre: 'CFE Transmisión',            industria: 'Energía',        ltv: 5240000,  ultimoMov: '2026-04-15', estado: 'Activo' }
  ]
}

// ============================================================
//  RECURSOS HUMANOS
// ============================================================
export const rrhh = {
  headcount: 42,
  altas: 3,
  bajas: 1,
  ausentismoPct: 4.2,
  rotacionPct: 6.8,
  cumpleanios: [
    { nombre: 'Luis Heberto Morales', area: 'Operaciones', fecha: '17 May', anios: 4 },
    { nombre: 'Jaqueline Santos',      area: 'Finanzas',    fecha: '22 May', anios: 2 },
    { nombre: 'Omar Gómez',            area: 'Operaciones', fecha: '03 Jun', anios: 3 }
  ],
  personal: [
    { nombre: 'Luis Heberto Morales Esquivel', puesto: 'Operador Grúa',  area: 'Operaciones', docs: 'Completo',  vence: 'CSF 2026-08-15', certif: 'DC3 Vigente',  estado: 'Activo' },
    { nombre: 'Saul Esteban Prieto Gastelum',  puesto: 'Operador Grúa',  area: 'Operaciones', docs: 'Completo',  vence: 'Lic Fed 2026-06-30', certif: 'DC3 Vigente', estado: 'Activo' },
    { nombre: 'Omar Gómez',                     puesto: 'Maniobrista',    area: 'Operaciones', docs: 'Incompleto', vence: 'CSF vencida', certif: 'DC3 vence 2026-05-30', estado: 'Activo' },
    { nombre: 'Jaqueline Santos',                puesto: 'Líder Finanzas', area: 'Finanzas',    docs: 'Completo', vence: '—', certif: 'N/A', estado: 'Activo' },
    { nombre: 'Valentina García',                puesto: 'Líder Ops',      area: 'Operaciones', docs: 'Completo', vence: '—', certif: 'N/A', estado: 'Activo' },
    { nombre: 'Jonathan Carrillo',                puesto: 'Líder Compras', area: 'Compras',     docs: 'Completo', vence: '—', certif: 'N/A', estado: 'Activo' },
    { nombre: 'Ahtziri López',                    puesto: 'Líder MKT',     area: 'Marketing',   docs: 'Completo', vence: '—', certif: 'N/A', estado: 'Activo' }
  ],
  rolTrabajo: [
    { semana: 'Sem 19 (May 4-10)', operador: 'Luis Heberto Morales',  sitio: 'Tapachula 3278', grua: 'G009', piloto: 'V001/RPMR', hospedaje: 'Tapachula' },
    { semana: 'Sem 19 (May 4-10)', operador: 'Saul Esteban Prieto',   sitio: 'Tapachula 3278', grua: 'G005', piloto: 'V009/Hilux', hospedaje: 'Tapachula' },
    { semana: 'Sem 19 (May 4-10)', operador: 'Omar Gómez',             sitio: 'Tapachula 3278', grua: 'G010', piloto: 'V002/RPMR', hospedaje: 'Tapachula' }
  ],
  ausentismo: [
    { area: 'Operaciones', dias: 8, motivo: 'Incapacidad médica' },
    { area: 'Compras',     dias: 1, motivo: 'Permiso personal' },
    { area: 'Finanzas',    dias: 0, motivo: '—' },
    { area: 'Marketing',   dias: 2, motivo: 'Vacaciones' }
  ]
}

// ============================================================
//  MARKETING — 4 marcas (Kratos FP, KraTec, BehLux, Podcast)
// ============================================================
export const marketing = {
  marcas: [
    { marca: 'Kratos FP', prioridad: 1, seguidores: 8420, alcanceMes: 184320, engagement: 4.8, postsMes: 28 },
    { marca: 'KraTec',    prioridad: 2, seguidores: 2140, alcanceMes:  42180, engagement: 3.2, postsMes: 14 },
    { marca: 'BehLux',    prioridad: 3, seguidores: 1820, alcanceMes:  28480, engagement: 5.4, postsMes: 12 },
    { marca: 'Podcast',   prioridad: 4, seguidores:  840, alcanceMes:  18640, engagement: 6.1, postsMes:  8 }
  ],
  redesPorPlataforma: [
    { red: 'Instagram', seguidores: 4820, alcance: 92840, engagement: 5.2 },
    { red: 'Facebook',  seguidores: 2840, alcance: 48280, engagement: 3.4 },
    { red: 'TikTok',    seguidores: 3120, alcance: 64820, engagement: 8.1 },
    { red: 'LinkedIn',  seguidores: 1480, alcance: 28480, engagement: 4.8 },
    { red: 'WhatsApp',  seguidores:  860, alcance: 12840, engagement: 9.2 }
  ],
  calendario: [
    { fecha: '14 May', marca: 'Kratos FP', tipo: 'Reel',     tema: 'Maniobra Grúa SANY 100t Tapachula',    estado: 'Programado' },
    { fecha: '15 May', marca: 'KraTec',    tipo: 'Post',     tema: 'Lanzamiento nuevo servicio técnico',   estado: 'Diseño' },
    { fecha: '16 May', marca: 'Kratos FP', tipo: 'Story',    tema: 'Testimonio cliente ICA Fluor',          estado: 'En edición' },
    { fecha: '17 May', marca: 'BehLux',    tipo: 'Carrusel', tema: 'Catálogo iluminación premium',          estado: 'Pendiente' },
    { fecha: '20 May', marca: 'Podcast',   tipo: 'Episodio', tema: 'Tendencias renta de grúas 2026',        estado: 'Grabación' }
  ],
  mensajesPendientes: 18,
  leadsRedes: 24
}

// ============================================================
//  COMPRAS Y ALMACÉN
// ============================================================
export const compras = {
  requisiciones: [
    { id: 'REQ-114', area: 'Operaciones', solicita: 'Valentina García', concepto: 'Eslingas 1x2m vikingo (8 pza)',  cotizaciones: 2, estado: 'Falta cotización',  prioridad: 'Alta',   fecha: '2026-05-12' },
    { id: 'REQ-118', area: 'Operaciones', solicita: 'Valentina García', concepto: 'Diferencial de cadena 2t',        cotizaciones: 3, estado: 'En negociación',    prioridad: 'Media',  fecha: '2026-05-13' },
    { id: 'REQ-121', area: 'Finanzas',    solicita: 'Jaqueline Santos',  concepto: 'Toner y papelería',               cotizaciones: 3, estado: 'OC generada',       prioridad: 'Baja',   fecha: '2026-05-13' },
    { id: 'REQ-122', area: 'Operaciones', solicita: 'Valentina García', concepto: 'Cable accesorios 50m',            cotizaciones: 3, estado: 'En tránsito',       prioridad: 'Alta',   fecha: '2026-05-11' },
    { id: 'REQ-125', area: 'Marketing',   solicita: 'Ahtziri López',     concepto: 'Material gráfico rotulación G014',cotizaciones: 1, estado: 'Falta cotización',  prioridad: 'Media',  fecha: '2026-05-13' }
  ],
  proveedores: [
    { nombre: 'La Troka',              categoria: 'Refacciones',   calificacion: 4.6, tiempoEntrega: '24-48 h', spend: 84500, estado: 'Aprobado' },
    { nombre: 'Vikingo',               categoria: 'Izaje',         calificacion: 4.8, tiempoEntrega: '48 h',    spend: 142000,estado: 'Aprobado' },
    { nombre: 'TRUPPER',               categoria: 'Herramienta',   calificacion: 4.4, tiempoEntrega: '24 h',    spend: 38400, estado: 'Aprobado' },
    { nombre: 'Diésel del Bajío',      categoria: 'Combustible',   calificacion: 4.2, tiempoEntrega: 'Mismo día',spend: 480200,estado: 'Aprobado' },
    { nombre: 'Refaccionaria Norte',   categoria: 'Refacciones',   calificacion: 3.8, tiempoEntrega: '72 h',    spend: 22100, estado: 'En evaluación' }
  ],
  inventarioCritico: [
    { sku: '12503120057', producto: 'Eslinga 1x2 m Vikingo',  marca: 'Vikingo',   stock: 2,  min: 6, estado: 'Crítico' },
    { sku: '—',           producto: 'Diferencial cadena 2 t', marca: 'TRUPPER',   stock: 1,  min: 3, estado: 'Bajo' },
    { sku: '—',           producto: 'Torretas seguridad 8 mod', marca: 'La Troka', stock: 4, min: 4, estado: 'Mínimo' },
    { sku: '—',           producto: 'Casco Safety Helmet',     marca: 'Safety',    stock: 4, min: 8, estado: 'Bajo' },
    { sku: '—',           producto: 'Chaleco logo bordado',    marca: 'Unitam',    stock: 3, min: 6, estado: 'Bajo' },
    { sku: '—',           producto: 'Botas casco Rombar',      marca: 'Rombar',    stock: 1, min: 3, estado: 'Crítico' }
  ]
}

// ============================================================
//  CALIDAD
// ============================================================
export const calidad = {
  certificacionesGruas: [
    { eco: 'G003', tipo: 'NOM-031-STPS', vence: '2026-08-12', estado: 'Vigente' },
    { eco: 'G005', tipo: 'NOM-031-STPS', vence: '2026-05-30', estado: 'Por vencer' },
    { eco: 'G008', tipo: 'NOM-031-STPS', vence: '2026-07-20', estado: 'Vigente' },
    { eco: 'G009', tipo: 'NOM-031-STPS', vence: '2026-09-15', estado: 'Vigente' },
    { eco: 'G010', tipo: 'NOM-031-STPS', vence: '2026-09-15', estado: 'Vigente' },
    { eco: 'G014', tipo: 'NOM-031-STPS', vence: '2026-11-02', estado: 'Vigente' }
  ],
  noConformidades: [
    { id: 'NC-022', proceso: 'Compras',     hallazgo: 'OC sin las 3 cotizaciones requeridas (REQ-114)', responsable: 'Jonathan Carrillo', estado: 'Abierta',  vence: '2026-05-20' },
    { id: 'NC-019', proceso: 'Operaciones', hallazgo: 'Faltante de checklist accesorios izaje G008',     responsable: 'Valentina García',  estado: 'En revisión', vence: '2026-05-17' },
    { id: 'NC-017', proceso: 'Finanzas',    hallazgo: 'Comprobación de gastos abril sin facturas 100%', responsable: 'Jaqueline Santos',  estado: 'Cerrada',  vence: '2026-04-30' },
    { id: 'NC-015', proceso: 'RH',           hallazgo: 'Documentación incompleta operador Omar Gómez',   responsable: 'Coordinación Gral.',estado: 'Abierta',  vence: '2026-05-22' }
  ],
  auditorias: [
    { tipo: 'Interna',  area: 'Operaciones', fecha: '2026-04-22', resultado: 92, hallazgos: 3 },
    { tipo: 'Interna',  area: 'Finanzas',    fecha: '2026-04-29', resultado: 96, hallazgos: 1 },
    { tipo: 'Externa',  area: 'REPSE',        fecha: '2026-03-15', resultado: 100,hallazgos: 0 },
    { tipo: 'Proveedor',area: 'Vikingo',      fecha: '2026-04-10', resultado: 95, hallazgos: 1 }
  ]
}

// ============================================================
//  AGENTES IA / AUTOMATIZACIONES
// ============================================================
export const agentes = [
  // CEO / Estratégico
  { id: 'AG-01', nombre: 'Centinela de Riesgos',          area: 'Estratégico', estado: 'Activo',  fuente: 'Multifuente', accionesHoy: 4,  ahorroH: 12, descripcion: 'Cruza CXC vencida, docs vencidos, NC abiertas y obligaciones fiscales para detectar riesgos críticos al CEO.' },
  { id: 'AG-02', nombre: 'Sintetizador Ejecutivo',         area: 'Estratégico', estado: 'Activo',  fuente: 'GPT-4 + BBVA + SAT', accionesHoy: 1, ahorroH: 6, descripcion: 'Genera briefing diario para Ing. Ricardo Nieto con KPIs y desviaciones.' },

  // Finanzas
  { id: 'AG-03', nombre: 'Conciliador Bancario BBVA',      area: 'Finanzas',    estado: 'Activo',  fuente: 'BBVA · Cashflow.xlsx', accionesHoy: 3, ahorroH: 8, descripcion: 'Lee movimientos BBVA y los empata contra Cashflow 2026 + facturas SAT.' },
  { id: 'AG-04', nombre: 'Auditor Comprobación de gastos', area: 'Finanzas',    estado: 'Activo',  fuente: 'Comprobantes + CFDI', accionesHoy: 12, ahorroH: 5, descripcion: 'Valida que 100% de los gastos del mes tengan CFDI 4.0 válido.' },
  { id: 'AG-05', nombre: 'Semáforo Fiscal',                 area: 'Finanzas',    estado: 'Activo',  fuente: 'SAT · IMSS · INFONAVIT', accionesHoy: 2, ahorroH: 4, descripcion: 'Monitorea vencimientos SAT/IMSS/INFONAVIT/ISN/REPSE/ICSOE/SISUB/SIROC.' },
  { id: 'AG-06', nombre: 'Pronóstico de Tesorería',         area: 'Finanzas',    estado: 'Activo',  fuente: 'Cashflow 12 sem', accionesHoy: 1, ahorroH: 3, descripcion: 'Proyecta flujo a 12 semanas y alerta cuando saldo cae bajo umbral.' },

  // Operaciones
  { id: 'AG-07', nombre: 'Monitor GPS de flota',            area: 'Operaciones', estado: 'Activo',  fuente: 'GPS API',      accionesHoy: 18, ahorroH: 10, descripcion: 'Detecta paros, desvíos y excesos de velocidad de la flota en tiempo real.' },
  { id: 'AG-08', nombre: 'Vigía Documental Flota',          area: 'Operaciones', estado: 'Activo',  fuente: 'Docs Grúas/Vehículos', accionesHoy: 3, ahorroH: 4, descripcion: 'Alerta 30/15/7 días antes del vencimiento de pólizas, verificación, certificados.' },
  { id: 'AG-09', nombre: 'Optimizador de Rutas SCT',        area: 'Operaciones', estado: 'Activo',  fuente: 'SCT + Edenred', accionesHoy: 5, ahorroH: 6, descripcion: 'Calcula ruta segura, casetas y consumo combustible para cada traslado.' },
  { id: 'AG-10', nombre: 'Predictor de Mantenimiento',       area: 'Operaciones', estado: 'En piloto', fuente: 'Horómetros + bitácoras', accionesHoy: 1, ahorroH: 8, descripcion: 'Predice fallas usando horómetro, km y patrones históricos de mantenimiento.' },

  // CRM
  { id: 'AG-11', nombre: 'Scoring de Oportunidades',        area: 'CRM',         estado: 'Activo',  fuente: 'Pipeline + histórico', accionesHoy: 6, ahorroH: 3, descripcion: 'Asigna score A/B/C a cada oportunidad y sugiere siguiente paso.' },
  { id: 'AG-12', nombre: 'Seguimiento Comercial',           area: 'CRM',         estado: 'Activo',  fuente: 'Email + WA', accionesHoy: 9, ahorroH: 5, descripcion: 'Detecta clientes sin contacto >14 días y agenda follow-up automático.' },

  // RRHH
  { id: 'AG-13', nombre: 'Vigía Documental Personal',       area: 'RH',          estado: 'Activo',  fuente: 'Carpetas personal', accionesHoy: 2, ahorroH: 4, descripcion: 'Monitorea CSF, licencias, DC3, exámenes médicos, NSS.' },
  { id: 'AG-14', nombre: 'Ausentismo & Rol de Trabajo',     area: 'RH',          estado: 'Activo',  fuente: 'Bitácoras + Rol.xlsx', accionesHoy: 1, ahorroH: 2, descripcion: 'Alerta sobre patrones de ausentismo y sugiere rotación de personal.' },

  // Marketing
  { id: 'AG-15', nombre: 'Generador de Contenido Multi-marca', area: 'Marketing', estado: 'Activo', fuente: 'GPT-4 + identidad', accionesHoy: 8, ahorroH: 12, descripcion: 'Genera copies y guiones para Kratos FP, KraTec, BehLux y Podcast respetando identidad.' },
  { id: 'AG-16', nombre: 'Monitor de Redes',                area: 'Marketing',   estado: 'Activo',  fuente: 'IG/FB/TT/LI/WA', accionesHoy: 24, ahorroH: 6, descripcion: 'Clasifica mensajes y comentarios, escala los que requieren respuesta humana.' },

  // Compras
  { id: 'AG-17', nombre: 'Comparador de Cotizaciones',      area: 'Compras',     estado: 'Activo',  fuente: 'Email + PDF cotiz.', accionesHoy: 4, ahorroH: 6, descripcion: 'Verifica que cada OC tenga 3 cotizaciones y selecciona mejor opción precio/tiempo/calidad.' },
  { id: 'AG-18', nombre: 'Alerta de Stock Crítico',         area: 'Compras',     estado: 'Activo',  fuente: 'Almacén SC 2026', accionesHoy: 6, ahorroH: 3, descripcion: 'Sugiere reabastecimiento basado en consumo histórico y rotación.' },

  // Calidad
  { id: 'AG-19', nombre: 'Auditor de Checklists',           area: 'Calidad',     estado: 'Activo',  fuente: 'Checklists semanales', accionesHoy: 3, ahorroH: 4, descripcion: 'Cruza evidencias y detecta hallazgos repetidos por proceso y responsable.' },
  { id: 'AG-20', nombre: 'Gestor de No Conformidades',      area: 'Calidad',     estado: 'Activo',  fuente: 'NC históricas', accionesHoy: 2, ahorroH: 3, descripcion: 'Da seguimiento a NC, escala las próximas a vencer y mide tasa de cierre.' }
]

// ============================================================
//  ALERTAS GLOBALES
// ============================================================
export const alertas = [
  { sev: 'danger',  area: 'Calidad',     mensaje: 'Verificación grúa G005 vence en 16 días',         hora: 'hace 12 min', agente: 'AG-08' },
  { sev: 'danger',  area: 'Finanzas',    mensaje: 'CXC OHL México vencida 32 días — $340K MXN',       hora: 'hace 28 min', agente: 'AG-01' },
  { sev: 'warn',    area: 'Operaciones', mensaje: 'G008 en mantenimiento — fuera de servicio 4 días', hora: 'hace 1 h',   agente: 'AG-07' },
  { sev: 'warn',    area: 'Compras',     mensaje: 'Stock crítico: Eslingas 1x2m Vikingo (2/6)',        hora: 'hace 2 h',   agente: 'AG-18' },
  { sev: 'warn',    area: 'Finanzas',    mensaje: 'IMSS y SAT vencen este viernes (17 may)',          hora: 'hace 3 h',   agente: 'AG-05' },
  { sev: 'info',    area: 'Marketing',   mensaje: '24 leads nuevos desde redes esta semana',          hora: 'hace 4 h',   agente: 'AG-16' },
  { sev: 'info',    area: 'CRM',         mensaje: 'ICA Fluor listo para firma — OP-191',              hora: 'hace 5 h',   agente: 'AG-11' },
  { sev: 'warn',    area: 'RH',           mensaje: 'Doc. operador Omar Gómez incompleta (CSF + DC3)',  hora: 'hace 6 h',   agente: 'AG-13' }
]

// ============================================================
//  INTEGRACIONES (fuentes que ya usan)
// ============================================================
export const integraciones = [
  { nombre: 'BBVA Empresarial',     categoria: 'Banca',       estado: 'Conectado',   ultimaSync: 'hace 5 min' },
  { nombre: 'SAT — CFDI / Buzón',   categoria: 'Fiscal',      estado: 'Conectado',   ultimaSync: 'hace 1 h' },
  { nombre: 'Toka',                  categoria: 'Vales',       estado: 'Conectado',   ultimaSync: 'hace 22 min' },
  { nombre: 'Edenred',               categoria: 'Combustible', estado: 'Conectado',   ultimaSync: 'hace 14 min' },
  { nombre: 'GPS Telemática',         categoria: 'Telemática',  estado: 'Conectado',   ultimaSync: 'tiempo real' },
  { nombre: 'WhatsApp Business',     categoria: 'Mensajería',  estado: 'Conectado',   ultimaSync: 'tiempo real' },
  { nombre: 'Instagram / Facebook',  categoria: 'Redes',       estado: 'Conectado',   ultimaSync: 'hace 8 min' },
  { nombre: 'LinkedIn / TikTok',     categoria: 'Redes',       estado: 'Conectado',   ultimaSync: 'hace 35 min' },
  { nombre: 'IMSS / INFONAVIT',      categoria: 'Compliance',  estado: 'Conectado',   ultimaSync: 'hace 2 h' },
  { nombre: 'REPSE / ICSOE / SISUB', categoria: 'Compliance',  estado: 'Conectado',   ultimaSync: 'hace 6 h' },
  { nombre: 'SIROC (IMSS)',          categoria: 'Compliance',  estado: 'Pendiente',   ultimaSync: '—' },
  { nombre: 'Google Drive / SharePoint', categoria: 'Documentos', estado: 'Conectado', ultimaSync: 'hace 1 min' }
]

// Helpers
export const fmtMXN = (n) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n)
export const fmtNum = (n) => new Intl.NumberFormat('es-MX').format(n)
