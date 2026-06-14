// ============================================================
//  KRATOS · Compras, Almacén, Proveedores · DETALLADO
//  Basado en:
//  - LISTA DE COMPRAS.xlsx
//  - Lista de Proveedores SC 2026.xlsx
//  - Refacciones ALMACENsc-2.xlsx
// ============================================================

export const expedientesProveedores = {
  TROKA: {
    id: 'PR-001',
    nombre: 'La Troka',
    categoria: 'Refacciones · Repuestos hidráulicos',
    rfc: 'TROK840312AB3',
    contacto: 'Mario Hernández',
    telefono: '7716776655',
    email: 'ventas@latroka.mx',
    direccion: 'Av. Industrial 142, Tulancingo, Hgo.',
    calificacion: 4.6, tiempoEntrega: '24-48 h', credito: '15 días', cuenta: 'Banorte ****3344',
    spendYTD: 412800, spendMes: 84500, estado: 'Aprobado',
    docs: [
      { tipo: 'CSF',          vence: null,         folio: 'CSF-TROK',    estado: 'vigente',  archivo: 'CSF_LaTroka.pdf' },
      { tipo: 'Opinión 32D',  vence: '2026-07-12', folio: 'OP-TROK-25',  estado: 'vigente',  archivo: 'Op32D_LaTroka.pdf' },
      { tipo: 'Acuerdo confidencialidad', vence: null, folio: 'NDA-TROK-24', estado: 'vigente', archivo: 'NDA_LaTroka.pdf' }
    ],
    cotizaciones: [
      { folio: 'COT-2026-118-A', fecha: '2026-05-08', concepto: 'Eslingas 1x2m (8 pza)', monto: 22400, tiempoEntrega: '48 h', ganadora: true },
      { folio: 'COT-2026-122-A', fecha: '2026-05-10', concepto: 'Cable accesorios 50m', monto: 14820, tiempoEntrega: '24 h', ganadora: false }
    ],
    ordenesCompra: [
      { oc: 'OC-2026-118', fecha: '2026-05-09', monto: 22400, estado: 'En tránsito',  req: 'REQ-114' },
      { oc: 'OC-2026-114', fecha: '2026-05-02', monto: 18420, estado: 'Recibido',     req: 'REQ-108' },
      { oc: 'OC-2026-098', fecha: '2026-04-22', monto: 32100, estado: 'Recibido',     req: 'REQ-088' }
    ],
    noConformidades: [
      { id: 'NC-022', fecha: '2026-05-09', hallazgo: 'OC con 2 cotizaciones (política requiere 3)', responsable: 'Jonathan Carrillo', estado: 'Abierta', dias: 5 }
    ],
    rating: [
      { mes: 'Ene', score: 4.4 }, { mes: 'Feb', score: 4.5 }, { mes: 'Mar', score: 4.6 }, { mes: 'Abr', score: 4.7 }, { mes: 'May', score: 4.6 }
    ]
  },

  VIKINGO: {
    id: 'PR-002',
    nombre: 'Vikingo',
    categoria: 'Equipos de izaje · eslingas certificadas',
    rfc: 'VIK001020AAA', contacto: 'Daniel López', telefono: '5551234567', email: 'contacto@vikingo.com.mx',
    direccion: 'Tlalnepantla, Edo. Mex.',
    calificacion: 4.8, tiempoEntrega: '48 h', credito: '30 días', cuenta: 'BBVA ****8821',
    spendYTD: 612400, spendMes: 142000, estado: 'Aprobado',
    docs: [
      { tipo: 'CSF',          vence: null,         folio: 'CSF-VIK',     estado: 'vigente', archivo: 'CSF_Vikingo.pdf' },
      { tipo: 'Opinión 32D',  vence: '2026-08-15', folio: 'OP-VIK-25',   estado: 'vigente', archivo: 'Op32D_Vikingo.pdf' },
      { tipo: 'Certificación NOM-009', vence: '2027-02-15', folio: 'NOM009-VIK', estado: 'vigente', archivo: 'NOM009_Vikingo.pdf' }
    ],
    cotizaciones: [
      { folio: 'COT-2026-118-B', fecha: '2026-05-08', concepto: 'Eslingas 1x2m (8 pza)', monto: 23800, tiempoEntrega: '72 h', ganadora: false },
      { folio: 'COT-2026-122-B', fecha: '2026-05-10', concepto: 'Cable accesorios 50m', monto: 12200, tiempoEntrega: '48 h', ganadora: true },
      { folio: 'COT-2026-105-A', fecha: '2026-04-28', concepto: 'Eslinga tubular 4t',   monto: 18400, tiempoEntrega: '48 h', ganadora: true }
    ],
    ordenesCompra: [
      { oc: 'OC-2026-122', fecha: '2026-05-11', monto: 12200, estado: 'En tránsito', req: 'REQ-122' },
      { oc: 'OC-2026-105', fecha: '2026-04-30', monto: 18400, estado: 'Recibido',    req: 'REQ-105' }
    ],
    noConformidades: [],
    rating: [
      { mes: 'Ene', score: 4.7 }, { mes: 'Feb', score: 4.8 }, { mes: 'Mar', score: 4.9 }, { mes: 'Abr', score: 4.8 }, { mes: 'May', score: 4.8 }
    ]
  },

  TRUPPER: {
    id: 'PR-003',
    nombre: 'TRUPPER',
    categoria: 'Herramienta industrial',
    rfc: 'TRU880514CCC', contacto: 'Cliente directo', telefono: '8009998877', email: 'pedidos@trupper.com.mx',
    direccion: 'Monterrey, NL',
    calificacion: 4.4, tiempoEntrega: '24 h', credito: 'Contado', cuenta: 'BBVA ****4421',
    spendYTD: 184200, spendMes: 38400, estado: 'Aprobado',
    docs: [
      { tipo: 'CSF',          vence: null,         folio: 'CSF-TRU',     estado: 'vigente', archivo: 'CSF_Trupper.pdf' },
      { tipo: 'Opinión 32D',  vence: '2026-09-30', folio: 'OP-TRU-25',   estado: 'vigente', archivo: 'Op32D_Trupper.pdf' }
    ],
    cotizaciones: [
      { folio: 'COT-2026-118-C', fecha: '2026-05-08', concepto: 'Diferencial cadena 2t', monto: 4820, tiempoEntrega: '24 h', ganadora: true }
    ],
    ordenesCompra: [
      { oc: 'OC-2026-118', fecha: '2026-05-09', monto: 4820, estado: 'Recibido', req: 'REQ-118' }
    ],
    noConformidades: [],
    rating: [{ mes: 'Mar', score: 4.4 }, { mes: 'Abr', score: 4.5 }, { mes: 'May', score: 4.4 }]
  },

  DIESEL: {
    id: 'PR-004',
    nombre: 'Diésel del Bajío',
    categoria: 'Combustible · diésel premium',
    rfc: 'DBA920304DDD', contacto: 'Gerardo Salinas', telefono: '4612234455', email: 'cuenta@dieselbajio.mx',
    direccion: 'Celaya, Gto.',
    calificacion: 4.2, tiempoEntrega: 'Mismo día', credito: '7 días', cuenta: 'Santander ****1122',
    spendYTD: 2412000, spendMes: 480200, estado: 'Aprobado',
    docs: [
      { tipo: 'CSF',          vence: null,         folio: 'CSF-DBA',     estado: 'vigente', archivo: 'CSF_DieselBajio.pdf' },
      { tipo: 'Opinión 32D',  vence: '2026-06-30', folio: 'OP-DBA-25',   estado: 'proximo', archivo: 'Op32D_DieselBajio.pdf' },
      { tipo: 'Permiso CRE',  vence: '2027-04-22', folio: 'CRE-DBA-24',  estado: 'vigente', archivo: 'CRE_DieselBajio.pdf' }
    ],
    cotizaciones: [],
    ordenesCompra: [
      { oc: 'OC-2026-100', fecha: '2026-05-02', monto: 124800, estado: 'Recibido', req: 'CONT-DBA' },
      { oc: 'OC-2026-110', fecha: '2026-05-09', monto: 184000, estado: 'En tránsito', req: 'CONT-DBA' }
    ],
    noConformidades: [],
    rating: [{ mes: 'Ene', score: 4.1 }, { mes: 'Feb', score: 4.2 }, { mes: 'Mar', score: 4.3 }, { mes: 'Abr', score: 4.2 }, { mes: 'May', score: 4.2 }]
  },

  NORTE: {
    id: 'PR-005',
    nombre: 'Refaccionaria Norte',
    categoria: 'Refacciones · diversos',
    rfc: 'REN940512EEE', contacto: 'Sergio Méndez', telefono: '7716998877', email: 'ventas@refnorte.mx',
    direccion: 'Tulancingo, Hgo.',
    calificacion: 3.8, tiempoEntrega: '72 h', credito: 'Contado', cuenta: 'Banorte ****5566',
    spendYTD: 84500, spendMes: 22100, estado: 'En evaluación',
    docs: [
      { tipo: 'CSF',          vence: null,         folio: 'CSF-REN',     estado: 'vigente', archivo: 'CSF_Norte.pdf' },
      { tipo: 'Opinión 32D',  vence: '2026-05-10', folio: 'OP-REN-25',   estado: 'vencido', archivo: 'Op32D_Norte.pdf' }
    ],
    cotizaciones: [
      { folio: 'COT-2026-114-C', fecha: '2026-05-08', concepto: 'Eslingas 1x2m (8 pza)', monto: 28100, tiempoEntrega: '96 h', ganadora: false }
    ],
    ordenesCompra: [
      { oc: 'OC-2026-088', fecha: '2026-04-18', monto: 22100, estado: 'Recibido c/ retraso', req: 'REQ-088' }
    ],
    noConformidades: [
      { id: 'NC-018', fecha: '2026-04-22', hallazgo: 'Entrega tardía 48h sobre lo cotizado', responsable: 'Jonathan Carrillo', estado: 'Cerrada', dias: 22 }
    ],
    rating: [{ mes: 'Ene', score: 4.0 }, { mes: 'Feb', score: 3.8 }, { mes: 'Mar', score: 3.7 }, { mes: 'Abr', score: 3.6 }, { mes: 'May', score: 3.8 }]
  }
}

export const proveedorIndex = [
  { key: 'TROKA',   nombre: 'La Troka' },
  { key: 'VIKINGO', nombre: 'Vikingo' },
  { key: 'TRUPPER', nombre: 'TRUPPER' },
  { key: 'DIESEL',  nombre: 'Diésel del Bajío' },
  { key: 'NORTE',   nombre: 'Refaccionaria Norte' }
]

// ============================================================
//  INVENTARIO COMPLETO (Refacciones ALMACEN sc-2.xlsx)
// ============================================================
export const inventarioCompleto = [
  { sku: '12503120057', producto: 'Eslinga 1x2 m',           marca: 'Vikingo', categoria: 'Izaje',       stock: 2,   min: 6,  ubic: 'A-01-03', costoUnit: 2800,  estado: 'Crítico'   },
  { sku: '12503100092', producto: 'Eslinga sintética 2t',    marca: 'Vikingo', categoria: 'Izaje',       stock: 8,   min: 4,  ubic: 'A-01-04', costoUnit: 1840,  estado: 'OK'        },
  { sku: '12612080011', producto: 'Diferencial cadena 2 t',  marca: 'TRUPPER', categoria: 'Herramienta', stock: 1,   min: 3,  ubic: 'B-02-01', costoUnit: 4820,  estado: 'Bajo'      },
  { sku: '12612080012', producto: 'Diferencial cadena 5 t',  marca: 'TRUPPER', categoria: 'Herramienta', stock: 2,   min: 2,  ubic: 'B-02-02', costoUnit: 8400,  estado: 'Mínimo'    },
  { sku: '14012010001', producto: 'Casco SH industrial',     marca: 'Safety',  categoria: 'EPP',          stock: 4,   min: 8,  ubic: 'C-01-01', costoUnit: 380,   estado: 'Bajo'      },
  { sku: '14012010002', producto: 'Chaleco logo bordado',    marca: 'Unitam',  categoria: 'EPP',          stock: 3,   min: 6,  ubic: 'C-01-02', costoUnit: 240,   estado: 'Bajo'      },
  { sku: '14012010003', producto: 'Botas casco Rombar #8',   marca: 'Rombar',  categoria: 'EPP',          stock: 1,   min: 3,  ubic: 'C-01-03', costoUnit: 1480,  estado: 'Crítico'   },
  { sku: '14012010004', producto: 'Botas casco Rombar #9',   marca: 'Rombar',  categoria: 'EPP',          stock: 0,   min: 3,  ubic: 'C-01-04', costoUnit: 1480,  estado: 'Agotado'   },
  { sku: '14012010005', producto: 'Lentes seguridad claros', marca: 'Safety',  categoria: 'EPP',          stock: 14,  min: 6,  ubic: 'C-01-05', costoUnit: 84,    estado: 'OK'        },
  { sku: '14012010006', producto: 'Torretas seguridad 8 mod',marca: 'La Troka',categoria: 'Señalización', stock: 4,   min: 4,  ubic: 'D-01-01', costoUnit: 1240,  estado: 'Mínimo'    },
  { sku: '14012010007', producto: 'Arnés cuerpo completo',   marca: 'Safety',  categoria: 'EPP',          stock: 5,   min: 3,  ubic: 'C-02-01', costoUnit: 1820,  estado: 'OK'        },
  { sku: '12503130001', producto: 'Estrobo cable acero 8m',  marca: 'Vikingo', categoria: 'Izaje',       stock: 6,   min: 4,  ubic: 'A-01-05', costoUnit: 3100,  estado: 'OK'        },
  { sku: '12504010001', producto: 'Grillete galvanizado 8t', marca: 'Crosby',  categoria: 'Izaje',       stock: 12,  min: 8,  ubic: 'A-02-01', costoUnit: 480,   estado: 'OK'        },
  { sku: '12504010002', producto: 'Grillete galvanizado 12t',marca: 'Crosby',  categoria: 'Izaje',       stock: 8,   min: 6,  ubic: 'A-02-02', costoUnit: 720,   estado: 'OK'        },
  { sku: '13301020001', producto: 'Aceite hidráulico ISO 68',marca: 'Mobil',   categoria: 'Consumibles', stock: 14,  min: 8,  ubic: 'E-01-01', costoUnit: 1820,  estado: 'OK'        },
  { sku: '13301020002', producto: 'Filtro aceite SANY 100t', marca: 'SANY',    categoria: 'Refacciones', stock: 2,   min: 4,  ubic: 'F-01-01', costoUnit: 2400,  estado: 'Bajo'      },
  { sku: '13301020003', producto: 'Filtro diésel SANY',      marca: 'SANY',    categoria: 'Refacciones', stock: 3,   min: 4,  ubic: 'F-01-02', costoUnit: 1840,  estado: 'Bajo'      },
  { sku: '13301020004', producto: 'Bujías HIAB CL12',        marca: 'HIAB',    categoria: 'Refacciones', stock: 2,   min: 2,  ubic: 'F-02-01', costoUnit: 980,   estado: 'Mínimo'    },
  { sku: '14501000001', producto: 'Cable accesorios 50m',    marca: 'Vikingo', categoria: 'Izaje',       stock: 3,   min: 2,  ubic: 'A-03-01', costoUnit: 8200,  estado: 'OK'        }
]

// ============================================================
//  ÓRDENES DE COMPRA (consolidado)
// ============================================================
export const ordenesCompra = [
  { oc: 'OC-2026-118', fecha: '2026-05-09', proveedor: 'La Troka',         req: 'REQ-114', monto: 22400, estado: 'En tránsito', etaDias: 1 },
  { oc: 'OC-2026-122', fecha: '2026-05-11', proveedor: 'Vikingo',          req: 'REQ-122', monto: 12200, estado: 'En tránsito', etaDias: 2 },
  { oc: 'OC-2026-114', fecha: '2026-05-02', proveedor: 'La Troka',         req: 'REQ-108', monto: 18420, estado: 'Recibido',    etaDias: 0 },
  { oc: 'OC-2026-110', fecha: '2026-05-09', proveedor: 'Diésel del Bajío', req: 'CONT-DBA',monto: 184000,estado: 'En tránsito', etaDias: 0 },
  { oc: 'OC-2026-121', fecha: '2026-05-13', proveedor: 'TRUPPER',          req: 'REQ-118', monto: 4820,  estado: 'Recibido',    etaDias: 0 },
  { oc: 'OC-2026-123', fecha: '2026-05-13', proveedor: 'Office Depot',     req: 'REQ-121', monto: 3840,  estado: 'OC generada', etaDias: 1 },
  { oc: 'OC-2026-105', fecha: '2026-04-30', proveedor: 'Vikingo',          req: 'REQ-105', monto: 18400, estado: 'Recibido',    etaDias: 0 },
  { oc: 'OC-2026-100', fecha: '2026-05-02', proveedor: 'Diésel del Bajío', req: 'CONT-DBA',monto: 124800,estado: 'Recibido',    etaDias: 0 }
]

// ============================================================
//  LISTA DE COMPRAS (compras de tienda pendientes)
// ============================================================
export const listaCompras = [
  { fecha: '2026-05-14', solicita: 'Valentina García',  area: 'Operaciones', concepto: 'Repuestos eléctricos G008',    presupuesto: 4800,  prioridad: 'Alta',  estado: 'En revisión' },
  { fecha: '2026-05-13', solicita: 'Jonathan Carrillo', area: 'Compras',     concepto: 'Material almacén · etiquetado',presupuesto: 1240,  prioridad: 'Baja',  estado: 'Aprobado' },
  { fecha: '2026-05-13', solicita: 'Ahtziri López',     area: 'Marketing',   concepto: 'Vinilos rotulación G014',       presupuesto: 8200,  prioridad: 'Media', estado: 'En revisión' },
  { fecha: '2026-05-12', solicita: 'Jaqueline Santos',  area: 'Finanzas',    concepto: 'Toner / papelería oficina',     presupuesto: 3840,  prioridad: 'Baja',  estado: 'OC generada' },
  { fecha: '2026-05-11', solicita: 'Valentina García',  area: 'Operaciones', concepto: 'Hospedaje Tapachula 7d',         presupuesto: 12400, prioridad: 'Alta',  estado: 'Aprobado' }
]
