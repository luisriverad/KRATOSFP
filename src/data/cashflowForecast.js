// ============================================================
//  KRATOS · Formato de Forecast Cashflow (semanal)
//  Adaptado de "Formato de Forecast Cashflow.xlsx" (carpeta public)
//  Estructura: Saldo inicial en bancos → Flujos de entrada →
//  Flujos de salida → Saldo final, con Pronóstico / Real / Diferencia.
//
//  Ventana de 3 semanas centrada en la semana ACTUAL:
//    · anterior  (cerrada) → Pronóstico + Real + Diferencia (forecast ya comparable)
//    · actual    (en medio)→ solo Pronóstico (qué cobros/gastos vienen)
//    · siguiente (futura)  → solo Pronóstico
//  Por eso solo la semana anterior tiene `real`; en actual y siguiente real = null.
// ============================================================

// 3 semanas independientes (cada grupo Pron·Real·Dif = una semana).
// Orden de izquierda a derecha (cronológico): 21 · 22 (actual) · 23.
export const cfSemanas = [
  { id: 'S21', num: 21, rango: '19 – 25 may',    real: true,  estado: 'cerrada' }, // semana anterior: real vs pronóstico
  { id: 'S22', num: 22, rango: '26 may – 1 jun', real: false, estado: 'actual'  }, // semana actual (en medio): solo pronóstico
  { id: 'S23', num: 23, rango: '2 – 8 jun',      real: false, estado: 'futura'  }  // semana siguiente: solo pronóstico
]

// pron / real: arreglos alineados a cfSemanas. null = sin dato.
// real solo está poblado en la semana anterior (índice 0); actual y siguiente = null.
// Saldo inicial en bancos
export const cfBancos = [
  { banco: 'BBVA · Cuenta operativa',     cuenta: '****4040', pron: [199683, 571059, 1172593],  real: [571059, null, null] },
  { banco: 'Santander · Recaudadora',     cuenta: '****4067', pron: [1257836, 980000, 760000],  real: [980000, null, null] },
  { banco: 'Banorte · Nómina',            cuenta: '****3337', pron: [761363, 540000, 410000],    real: [540000, null, null] },
  { banco: 'HSBC · Divisas USD',          cuenta: '****7282', pron: [427631, 430000, 432000],    real: [430000, null, null] },
  { banco: 'BBVA · Reserva fiscal',       cuenta: '****5782', pron: [149513, 120000, 100000],    real: [120000, null, null] },
  { banco: 'Banamex · Crédito refacc.',   cuenta: '****3542', pron: [296008, 210000, 180000],    real: [210000, null, null] }
]

// ---- FLUJOS DE ENTRADA ----
export const cfEntradas = [
  {
    grupo: 'Cobranza clientes — corriente',
    items: [
      { k: 'Constructora Tapachula',   pron: [1100000, 482500, 900000],  real: [980000, null, null] },
      { k: 'ICA Fluor',                pron: [0, 920000, 0],              real: [0, null, null] },
      { k: 'Grupo Carso',              pron: [0, 1240000, 0],             real: [0, null, null] },
      { k: 'Cemex Latam',              pron: [0, 0, 580000],              real: [0, null, null] },
      { k: 'Constructora Mota Engil',  pron: [0, 896755, 0],              real: [896755, null, null] },
      { k: 'Grupo México Minería',     pron: [1480000, 0, 1480000],       real: [1480000, null, null] },
      { k: 'Iberdrola México',         pron: [0, 1640000, 0],             real: [87990, null, null] }
    ]
  },
  {
    grupo: 'Cobranza con créditos que vencen',
    items: [
      { k: 'OHL México (vencida 62d)',     pron: [0, 340000, 0],          real: [0, null, null] },
      { k: 'IDEAL Infraestructura',        pron: [720000, 0, 667330],     real: [720000, null, null] },
      { k: 'Techint (ampliación)',         pron: [0, 980000, 0],          real: [0, null, null] }
    ]
  },
  {
    grupo: 'Otros ingresos',
    items: [
      { k: 'Venta de refacciones usadas',  pron: [35000, 0, 110000],      real: [35000, null, null] },
      { k: 'Recuperación de seguros',      pron: [0, 789000, 0],          real: [789000, null, null] }
    ]
  },
  {
    grupo: 'Entrada de créditos y financiamiento',
    items: [
      { k: 'Disposición línea BBVA',       pron: [0, 0, 0],               real: [0, null, null] },
      { k: 'Arrendamiento Banorte',        pron: [0, 0, 2000000],         real: [0, null, null] }
    ]
  }
]

// ---- FLUJOS DE SALIDA ----
export const cfSalidas = [
  {
    grupo: 'Bancos y financieras',
    items: [
      { k: 'Pago arrendamiento flota (SANY)',  pron: [0, 0, 0],               real: [0, null, null] },
      { k: 'Crédito refaccionario (XCMG)',     pron: [0, 0, 0],               real: [0, null, null] },
      { k: 'Comisiones e intereses bancarios', pron: [20000, 30000, 86326],   real: [18300, null, null] }
    ]
  },
  {
    grupo: 'Salarios y nóminas',
    items: [
      { k: 'Nómina operadores (semanal)',      pron: [70000, 70000, 70000],   real: [70000, null, null] },
      { k: 'Nómina administrativa (quincenal)',pron: [1200000, 0, 0],         real: [1200000, null, null] },
      { k: 'Comisiones comercial',             pron: [0, 84000, 0],           real: [0, null, null] },
      { k: 'Finiquitos y viáticos',            pron: [35000, 0, 19000],       real: [35000, null, null] }
    ]
  },
  {
    grupo: 'Servicios',
    items: [
      { k: 'Luz (patio Zempoala)',             pron: [35515, 0, 0],           real: [35200, null, null] },
      { k: 'Teléfono e internet',              pron: [0, 14000, 0],           real: [0, null, null] },
      { k: 'Vigilancia y limpieza',            pron: [0, 86730, 86730],       real: [0, null, null] },
      { k: 'Diésel y tarjetas de gasolina',    pron: [120000, 120000, 120000],real: [122100, null, null] },
      { k: 'Casetas y trasladistas',           pron: [0, 70000, 70000],       real: [0, null, null] }
    ]
  },
  {
    grupo: 'Impuestos',
    items: [
      { k: 'IMSS',                             pron: [960000, 0, 0],          real: [958200, null, null] },
      { k: 'INFONAVIT',                        pron: [80000, 0, 0],           real: [80000, null, null] },
      { k: 'ISN Hidalgo (s/nómina)',           pron: [137000, 0, 0],          real: [136400, null, null] },
      { k: 'IVA',                              pron: [0, 0, 901232],          real: [0, null, null] },
      { k: 'ISR',                              pron: [0, 0, 0],               real: [0, null, null] }
    ]
  },
  {
    grupo: 'Proveedores y materia prima',
    items: [
      { k: 'Refacciones y llantas',            pron: [300000, 0, 765900],     real: [312400, null, null] },
      { k: 'Lubricantes y consumibles',        pron: [0, 137000, 0],          real: [0, null, null] },
      { k: 'Seguros de flota',                 pron: [0, 0, 325611],          real: [0, null, null] },
      { k: 'Proveedores varios',               pron: [300000, 0, 1000000],    real: [300000, null, null] }
    ]
  },
  {
    grupo: 'Pago proveedores con créditos que vencen',
    items: [
      { k: 'SANY México',                      pron: [1000000, 0, 3500000],   real: [1000000, null, null] },
      { k: 'XCMG Latinoamérica',               pron: [450000, 0, 0],          real: [450000, null, null] }
    ]
  },
  {
    grupo: 'CAPEX y gastos corporativos',
    items: [
      { k: 'Mantenimiento mayor flota',        pron: [10000, 0, 10000],       real: [9800, null, null] },
      { k: 'Pago al corporativo / provisiones',pron: [1300000, 0, 300000],    real: [1300000, null, null] }
    ]
  }
]
