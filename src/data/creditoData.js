// ============================================================
//  KRATOS · Líneas de crédito por banco
//  Datos reales de Kratos FP con BBVA + alternativos
// ============================================================

export const lineasCredito = [
  {
    id: 'LC-001',
    banco: 'BBVA Empresarial',
    producto: 'Línea revolvente',
    cuenta: '****4471',
    moneda: 'MXN',
    limite: 8000000,
    dispuesto: 3240000,
    disponible: 4760000,
    tasaAnual: 14.5,
    plazo: '36 meses',
    inicia: '2024-08-15',
    vence: '2027-08-15',
    proximoPago: '2026-05-30',
    montoProximo: 184000,
    estado: 'Vigente',
    garantia: 'Aval personal · activo fijo',
    contacto: 'Ejec. Karina Mora · 5523344556',
    movimientos: [
      { fecha: '2026-04-30', tipo: 'Disposición', monto: -820000, concepto: 'Capital de trabajo abril', saldo: 3240000 },
      { fecha: '2026-04-15', tipo: 'Pago',         monto:  220000, concepto: 'Pago capital + int.',     saldo: 2420000 },
      { fecha: '2026-03-28', tipo: 'Pago',         monto:  218000, concepto: 'Pago capital + int.',     saldo: 2640000 },
      { fecha: '2026-03-12', tipo: 'Disposición', monto: -1240000, concepto: 'Compra refacciones SANY', saldo: 2858000 },
      { fecha: '2026-02-28', tipo: 'Pago',         monto:  214000, concepto: 'Pago capital + int.',     saldo: 1618000 }
    ]
  },
  {
    id: 'LC-002',
    banco: 'BBVA Empresarial',
    producto: 'Crédito simple equipo',
    cuenta: '****4471',
    moneda: 'MXN',
    limite: 12000000,
    dispuesto: 7820000,
    disponible: 4180000,
    tasaAnual: 12.8,
    plazo: '60 meses',
    inicia: '2025-01-12',
    vence: '2030-01-12',
    proximoPago: '2026-05-17',
    montoProximo: 248000,
    estado: 'Vigente',
    garantia: 'Prendaria · SANY G009, G010, G014',
    contacto: 'Ejec. Karina Mora · 5523344556',
    movimientos: [
      { fecha: '2026-04-17', tipo: 'Pago',         monto: 248000, concepto: 'Mensualidad equipo',  saldo: 7820000 },
      { fecha: '2026-03-17', tipo: 'Pago',         monto: 248000, concepto: 'Mensualidad equipo',  saldo: 8068000 },
      { fecha: '2026-02-17', tipo: 'Pago',         monto: 248000, concepto: 'Mensualidad equipo',  saldo: 8316000 },
      { fecha: '2026-01-17', tipo: 'Pago',         monto: 248000, concepto: 'Mensualidad equipo',  saldo: 8564000 },
      { fecha: '2025-01-15', tipo: 'Disposición', monto:-12000000,concepto: 'Compra inicial 3 grúas SANY', saldo: 12000000 }
    ]
  },
  {
    id: 'LC-003',
    banco: 'Banorte',
    producto: 'Factoraje a proveedores',
    cuenta: '****8821',
    moneda: 'MXN',
    limite: 4000000,
    dispuesto: 920000,
    disponible: 3080000,
    tasaAnual: 16.2,
    plazo: 'Revolvente',
    inicia: '2025-06-04',
    vence: '2026-12-04',
    proximoPago: '2026-06-04',
    montoProximo: 92800,
    estado: 'Vigente',
    garantia: 'Cuentas por cobrar cedidas',
    contacto: 'Ejec. Pablo Aguirre · 5512887766',
    movimientos: [
      { fecha: '2026-04-22', tipo: 'Disposición',  monto: -480000, concepto: 'Factoraje OC-2026-0162',  saldo: 920000 },
      { fecha: '2026-04-10', tipo: 'Pago',          monto: 320000, concepto: 'Liquidación factoraje',   saldo: 440000 },
      { fecha: '2026-03-22', tipo: 'Disposición',  monto: -320000, concepto: 'Factoraje OC-2026-0089',  saldo: 760000 }
    ]
  },
  {
    id: 'LC-004',
    banco: 'Santander',
    producto: 'Cuenta de crédito',
    cuenta: '****1928',
    moneda: 'MXN',
    limite: 2500000,
    dispuesto: 0,
    disponible: 2500000,
    tasaAnual: 15.8,
    plazo: 'Revolvente',
    inicia: '2025-11-20',
    vence: '2027-11-20',
    proximoPago: null,
    montoProximo: 0,
    estado: 'Vigente · sin dispuesto',
    garantia: 'Sin garantía',
    contacto: 'Ejec. Luis Robles · 5598884422',
    movimientos: []
  },
  {
    id: 'LC-005',
    banco: 'Toka',
    producto: 'Crédito vales combustible',
    cuenta: 'KFP-TOKA',
    moneda: 'MXN',
    limite: 600000,
    dispuesto: 148320,
    disponible: 451680,
    tasaAnual: 0,
    plazo: 'Mensual',
    inicia: '2024-03-01',
    vence: 'Renovación anual',
    proximoPago: '2026-05-30',
    montoProximo: 148320,
    estado: 'Vigente',
    garantia: 'Depósito en garantía',
    contacto: 'Soporte Toka · 5544557788',
    movimientos: [
      { fecha: '2026-05-12', tipo: 'Carga',  monto: -84200, concepto: 'Carga semanal combustible', saldo: 148320 },
      { fecha: '2026-05-05', tipo: 'Carga',  monto: -64120, concepto: 'Carga semanal combustible', saldo: 64120 },
      { fecha: '2026-04-30', tipo: 'Pago',   monto: 148000, concepto: 'Pago mes abril',            saldo: 0 }
    ]
  }
]

// Resumen agregado
export const creditoResumen = () => {
  const total = lineasCredito.reduce((a, l) => {
    a.limite     += l.limite
    a.dispuesto  += l.dispuesto
    a.disponible += l.disponible
    return a
  }, { limite: 0, dispuesto: 0, disponible: 0 })
  total.utilizacion = Math.round((total.dispuesto / total.limite) * 100)
  return total
}

// Asignación de líneas de crédito por CLIENTE (las que Kratos otorga a sus clientes)
export const creditoClientes = {
  TAP: {
    limite: 1500000,
    diasCredito: 30,
    utilizado: 482500,
    disponible: 1017500,
    historial: [
      { mes: 'Ene', dpd: 4 }, { mes: 'Feb', dpd: 6 }, { mes: 'Mar', dpd: 5 }, { mes: 'Abr', dpd: 8 }, { mes: 'May', dpd: 0 }
    ],
    score: 88,
    rating: 'A'
  },
  ICA: {
    limite: 4000000, diasCredito: 60, utilizado: 920000, disponible: 3080000,
    historial: [{ mes: 'Ene', dpd: 12 }, { mes: 'Feb', dpd: 18 }, { mes: 'Mar', dpd: 8 }, { mes: 'Abr', dpd: 14 }, { mes: 'May', dpd: 0 }],
    score: 82, rating: 'A'
  },
  CARSO: {
    limite: 5000000, diasCredito: 45, utilizado: 1240000, disponible: 3760000,
    historial: [{ mes: 'Ene', dpd: 20 }, { mes: 'Feb', dpd: 28 }, { mes: 'Mar', dpd: 45 }, { mes: 'Abr', dpd: 38 }, { mes: 'May', dpd: 45 }],
    score: 58, rating: 'C — bloquear nuevos sin garantía'
  },
  CEMEX: {
    limite: 2000000, diasCredito: 30, utilizado: 580000, disponible: 1420000,
    historial: [{ mes: 'Ene', dpd: 2 }, { mes: 'Feb', dpd: 0 }, { mes: 'Mar', dpd: 4 }, { mes: 'Abr', dpd: 0 }, { mes: 'May', dpd: 0 }],
    score: 96, rating: 'A+'
  },
  OHL: {
    limite: 1500000, diasCredito: 60, utilizado: 340000, disponible: 1160000,
    historial: [{ mes: 'Ene', dpd: 35 }, { mes: 'Feb', dpd: 48 }, { mes: 'Mar', dpd: 52 }, { mes: 'Abr', dpd: 58 }, { mes: 'May', dpd: 62 }],
    score: 42, rating: 'D — en riesgo, escalar a legal'
  },
  MOTA: {
    limite: 6000000, diasCredito: 30, utilizado: 0, disponible: 6000000,
    historial: [{ mes: 'Ene', dpd: 0 }, { mes: 'Feb', dpd: 4 }, { mes: 'Mar', dpd: 0 }, { mes: 'Abr', dpd: 0 }, { mes: 'May', dpd: 0 }],
    score: 95, rating: 'A+'
  },
  CFE: {
    limite: 2000000, diasCredito: 60, utilizado: 0, disponible: 2000000,
    historial: [{ mes: 'Ene', dpd: 8 }, { mes: 'Feb', dpd: 12 }, { mes: 'Mar', dpd: 6 }, { mes: 'Abr', dpd: 0 }, { mes: 'May', dpd: 0 }],
    score: 84, rating: 'A'
  }
}
