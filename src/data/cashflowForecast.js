// ============================================================
//  KRATOS · Formato de Forecast Cashflow (semanal)
//  Adaptado de "Formato de Forecast Cashflow.xlsx" (carpeta public)
//  Estructura: Saldo inicial en bancos → Flujos de entrada →
//  Flujos de salida → Saldo final, con Pronóstico / Real / Diferencia
//  por semana. Las semanas futuras solo tienen pronóstico (real = null).
// ============================================================

// 3 semanas independientes (cada grupo Pron·Real·Dif = una semana).
// Orden de izquierda a derecha (cronológico): 20 · 21 · 22 (actual).
export const cfSemanas = [
  { id: 'S20', num: 20, rango: '12 – 18 may',    real: true, estado: 'cerrada' },
  { id: 'S21', num: 21, rango: '19 – 25 may',    real: true, estado: 'cerrada' },
  { id: 'S22', num: 22, rango: '26 may – 1 jun', real: true, estado: 'actual'  }
]

// pron / real: arreglos alineados a cfSemanas. null = sin dato.
// Saldo inicial en bancos
export const cfBancos = [
  { banco: 'BBVA · Cuenta operativa',     cuenta: '****4040', pron: [453119, 199683, 571059, 1172593],  real: [199683, 571059, 612400, null] },
  { banco: 'Santander · Recaudadora',     cuenta: '****4067', pron: [1890213, 1257836, 980000, 760000], real: [1257836, 980000, 845200, null] },
  { banco: 'Banorte · Nómina',            cuenta: '****3337', pron: [998721, 761363, 540000, 410000],    real: [761363, 540000, 498100, null] },
  { banco: 'HSBC · Divisas USD',          cuenta: '****7282', pron: [423116, 427631, 430000, 432000],    real: [427631, 430000, 431500, null] },
  { banco: 'BBVA · Reserva fiscal',       cuenta: '****5782', pron: [289320, 149513, 120000, 100000],    real: [149513, 120000, 96000, null] },
  { banco: 'Banamex · Crédito refacc.',   cuenta: '****3542', pron: [451221, 296008, 210000, 180000],    real: [296008, 210000, 188300, null] }
]

// ---- FLUJOS DE ENTRADA ----
export const cfEntradas = [
  {
    grupo: 'Cobranza clientes — corriente',
    items: [
      { k: 'Constructora Tapachula',   pron: [3632666, 1100000, 482500, 900000],  real: [4124701, 980000, 482500, null] },
      { k: 'ICA Fluor',                pron: [920000, 0, 920000, 0],               real: [920000, 0, 0, null] },
      { k: 'Grupo Carso',              pron: [1436789, 0, 1240000, 0],             real: [0, 0, 1240000, null] },
      { k: 'Cemex Latam',              pron: [580000, 0, 0, 580000],               real: [580000, 0, 0, null] },
      { k: 'Constructora Mota Engil',  pron: [896755, 0, 896755, 0],               real: [0, 896755, 0, null] },
      { k: 'Grupo México Minería',     pron: [0, 1480000, 0, 1480000],             real: [0, 1480000, 0, null] },
      { k: 'Iberdrola México',         pron: [0, 0, 1640000, 0],                   real: [0, 87990, 1640000, null] }
    ]
  },
  {
    grupo: 'Cobranza con créditos que vencen',
    items: [
      { k: 'OHL México (vencida 62d)',     pron: [2211060, 0, 340000, 0],     real: [1211051, 0, 0, null] },
      { k: 'IDEAL Infraestructura',        pron: [566, 720000, 0, 667330],    real: [1980655, 720000, 0, null] },
      { k: 'Techint (ampliación)',         pron: [0, 0, 980000, 0],           real: [0, 0, 980000, null] }
    ]
  },
  {
    grupo: 'Otros ingresos',
    items: [
      { k: 'Venta de refacciones usadas',  pron: [34571, 35000, 0, 110000],   real: [34571, 35000, 0, null] },
      { k: 'Recuperación de seguros',      pron: [0, 0, 789000, 0],           real: [0, 789000, 0, null] }
    ]
  },
  {
    grupo: 'Entrada de créditos y financiamiento',
    items: [
      { k: 'Disposición línea BBVA',       pron: [796000, 0, 0, 0],           real: [796881, 0, 0, null] },
      { k: 'Arrendamiento Banorte',        pron: [0, 0, 0, 2000000],          real: [0, 0, 0, null] }
    ]
  }
]

// ---- FLUJOS DE SALIDA ----
export const cfSalidas = [
  {
    grupo: 'Bancos y financieras',
    items: [
      { k: 'Pago arrendamiento flota (SANY)',  pron: [8887396, 0, 0, 0],        real: [8887396, 0, 0, null] },
      { k: 'Crédito refaccionario (XCMG)',     pron: [5459659, 0, 0, 0],        real: [5459659, 0, 0, null] },
      { k: 'Comisiones e intereses bancarios', pron: [110777, 20000, 30000, 86326], real: [110777, 18300, 28900, null] }
    ]
  },
  {
    grupo: 'Salarios y nóminas',
    items: [
      { k: 'Nómina operadores (semanal)',      pron: [70000, 70000, 70000, 70000],  real: [71324, 70000, 70000, null] },
      { k: 'Nómina administrativa (quincenal)',pron: [0, 1200000, 0, 0],            real: [0, 1200000, 0, null] },
      { k: 'Comisiones comercial',             pron: [0, 0, 84000, 0],              real: [0, 0, 84000, null] },
      { k: 'Finiquitos y viáticos',            pron: [25000, 35000, 0, 19000],      real: [19736, 35000, 0, null] }
    ]
  },
  {
    grupo: 'Servicios',
    items: [
      { k: 'Luz (patio Zempoala)',             pron: [35515, 35515, 0, 0],          real: [35515, 35200, 0, null] },
      { k: 'Teléfono e internet',              pron: [14000, 0, 14000, 0],          real: [13651, 0, 14000, null] },
      { k: 'Vigilancia y limpieza',            pron: [86730, 0, 86730, 86730],      real: [86730, 0, 86730, null] },
      { k: 'Diésel y tarjetas de gasolina',    pron: [120000, 120000, 120000, 120000], real: [118400, 122100, 119800, null] },
      { k: 'Casetas y trasladistas',           pron: [70000, 0, 70000, 70000],      real: [68900, 0, 71200, null] }
    ]
  },
  {
    grupo: 'Impuestos',
    items: [
      { k: 'IMSS',                             pron: [0, 960000, 0, 0],             real: [0, 958200, 0, null] },
      { k: 'INFONAVIT',                        pron: [0, 80000, 0, 0],              real: [0, 80000, 0, null] },
      { k: 'ISN Hidalgo (s/nómina)',           pron: [0, 137000, 0, 0],             real: [0, 136400, 0, null] },
      { k: 'IVA',                              pron: [451112, 0, 0, 901232],        real: [451112, 0, 0, null] },
      { k: 'ISR',                              pron: [0, 0, 0, 0],                  real: [0, 0, 0, null] }
    ]
  },
  {
    grupo: 'Proveedores y materia prima',
    items: [
      { k: 'Refacciones y llantas',            pron: [500000, 300000, 0, 765900],   real: [500000, 312400, 0, null] },
      { k: 'Lubricantes y consumibles',        pron: [80000, 0, 137000, 0],         real: [80000, 0, 132600, null] },
      { k: 'Seguros de flota',                 pron: [0, 0, 0, 325611],             real: [0, 0, 0, null] },
      { k: 'Proveedores varios',               pron: [1900000, 300000, 0, 1000000], real: [2833170, 300000, 0, null] }
    ]
  },
  {
    grupo: 'Pago proveedores con créditos que vencen',
    items: [
      { k: 'SANY México',                      pron: [2900000, 1000000, 0, 3500000], real: [0, 1000000, 0, null] },
      { k: 'XCMG Latinoamérica',               pron: [450000, 450000, 0, 0],         real: [0, 450000, 0, null] }
    ]
  },
  {
    grupo: 'CAPEX y gastos corporativos',
    items: [
      { k: 'Mantenimiento mayor flota',        pron: [0, 10000, 0, 10000],          real: [0, 9800, 0, null] },
      { k: 'Pago al corporativo / provisiones',pron: [0, 1300000, 0, 300000],       real: [0, 1300000, 0, null] }
    ]
  }
]
