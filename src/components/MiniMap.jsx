import { MapPin, Navigation } from 'lucide-react'

// Mexico bounding box (approx) for the projection
const MX = { minLng: -118, maxLng: -86, minLat: 14, maxLat: 33 }
const W = 1000
const H = 600

const lngToX = (lng) => ((lng - MX.minLng) / (MX.maxLng - MX.minLng)) * W
const latToY = (lat) => ((MX.maxLat - lat) / (MX.maxLat - MX.minLat)) * H

// Known places → lat/lng (matched by substring against `lugar`)
const PLACES = [
  { match: ['zempoala', 'patio kratos', 'patio'], lat: 19.91, lng: -98.66, ciudad: 'Zempoala' },
  { match: ['pachuca'],                            lat: 20.10, lng: -98.76, ciudad: 'Pachuca'  },
  { match: ['méxico - pachuca', 'mexico - pachuca'], lat: 19.78, lng: -98.85, ciudad: 'México–Pachuca' },
  { match: ['puebla'],                             lat: 19.04, lng: -98.20, ciudad: 'Puebla'   },
  { match: ['tierra blanca'],                      lat: 18.45, lng: -96.36, ciudad: 'Tierra Blanca' },
  { match: ['acayucan'],                           lat: 17.95, lng: -94.91, ciudad: 'Acayucan' },
  { match: ['coatzacoalcos'],                      lat: 18.13, lng: -94.45, ciudad: 'Coatzacoalcos' },
  { match: ['veracruz'],                           lat: 19.18, lng: -96.13, ciudad: 'Veracruz' },
  { match: ['salina cruz'],                        lat: 16.16, lng: -95.20, ciudad: 'Salina Cruz' },
  { match: ['tapachula'],                          lat: 14.91, lng: -92.26, ciudad: 'Tapachula' }
]

function resolveGeo(lugar) {
  if (!lugar) return null
  const k = lugar.toLowerCase()
  return PLACES.find(p => p.match.some(m => k.includes(m))) || null
}

// Simplified Mexico outline (clockwise), Sea of Cortez included
const MEXICO_PATH = [
  'M 30,15',     // Tijuana
  'L 80,11',     // Mexicali
  'L 145,18',    // San Luis Río Colorado
  'L 220,52',    // Nogales
  'L 360,40',    // Cd Juárez
  'L 540,140',   // Piedras Negras
  'L 640,225',   // Matamoros (Gulf coast)
  'L 645,265',
  'L 630,340',   // Tampico
  'L 660,400',
  'L 685,435',   // Veracruz
  'L 735,470',   // Coatzacoalcos
  'L 790,475',   // Villahermosa
  'L 810,448',
  'L 860,416',   // Campeche
  'L 888,380',   // Mérida
  'L 975,374',   // Cancún (easternmost)
  'L 970,400',
  'L 935,455',   // Chetumal
  'L 870,490',
  'L 840,510',   // Guatemala border
  'L 805,570',   // Tapachula (southernmost)
  'L 760,560',
  'L 715,533',   // Salina Cruz
  'L 660,540',   // Puerto Escondido
  'L 600,525',
  'L 570,510',   // Acapulco
  'L 510,475',
  'L 430,440',   // Manzanillo
  'L 405,415',
  'L 400,390',   // Puerto Vallarta
  'L 365,308',   // Mazatlán
  'L 290,235',
  'L 220,160',   // Guaymas
  'L 175,100',
  'L 140,55',    // Puerto Peñasco
  // Into the Sea of Cortez: down east Baja, around tip, up west Baja
  'L 110,82',
  'L 130,140',
  'L 175,200',
  'L 220,255',
  'L 245,285',
  'L 255,320',
  'L 232,328',   // Cabo San Lucas
  'L 200,310',
  'L 165,235',
  'L 135,180',
  'L 125,160',
  'L 105,120',
  'L 70,80',
  'L 44,40',     // Ensenada
  'Z'
].join(' ')

function project(p) {
  const geo = resolveGeo(p.lugar)
  if (geo) return { ...p, sx: lngToX(geo.lng), sy: latToY(geo.lat), ciudad: geo.ciudad }
  // fallback: map 0..100 onto bbox
  const lng = MX.minLng + (p.x / 100) * (MX.maxLng - MX.minLng)
  const lat = MX.maxLat - (p.y / 100) * (MX.maxLat - MX.minLat)
  return { ...p, sx: lngToX(lng), sy: latToY(lat) }
}

export default function MiniMap({ puntos = [], unidad = 'G009', ruta = 'Zempoala → Tapachula', height = 220 }) {
  const projected = puntos.map(project)
  const path = projected.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.sx.toFixed(1)} ${p.sy.toFixed(1)}`).join(' ')
  const last = projected.length ? projected[projected.length - 1] : null

  return (
    <div className="relative rounded-none border border-kratos-border overflow-hidden bg-kratos-panel-2" style={{ height }}>
      <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
        <span className="chip-info"><Navigation size={11}/> En vivo · GPS</span>
        <span className="chip-muted font-mono">{unidad}</span>
      </div>
      <div className="absolute top-3 right-3 text-[10px] text-kratos-muted z-10 font-mono">{ruta}</div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(15,14,12,0.045)" strokeWidth="1"/>
          </pattern>
          <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(185,28,28,0.22)"/>
            <stop offset="100%" stopColor="rgba(185,28,28,0)"/>
          </radialGradient>
          <linearGradient id="mxFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F1EEE6"/>
            <stop offset="100%" stopColor="#E6E2D6"/>
          </linearGradient>
        </defs>

        {/* sea / background grid */}
        <rect x="0" y="0" width={W} height={H} fill="url(#mapGrid)"/>

        {/* Mexico landmass */}
        <path d={MEXICO_PATH} fill="url(#mxFill)" stroke="#B8B5AC" strokeWidth="1.5" strokeLinejoin="round"/>

        {/* Reference cities — subtle dots */}
        {PLACES.map((c, i) => (
          <g key={`ref-${i}`} opacity="0.55">
            <circle cx={lngToX(c.lng)} cy={latToY(c.lat)} r="2.5" fill="#9A958C"/>
            <text
              x={lngToX(c.lng) + 6}
              y={latToY(c.lat) - 4}
              fill="#6E685F"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
            >
              {c.ciudad}
            </text>
          </g>
        ))}

        {/* Glow under last point */}
        {last && <circle cx={last.sx} cy={last.sy} r="90" fill="url(#mapGlow)"/>}

        {/* Route */}
        <path
          d={path}
          stroke="#B91C1C"
          strokeWidth="3"
          fill="none"
          strokeDasharray="7 5"
          strokeLinecap="round"
          opacity="0.92"
        />

        {/* Waypoints */}
        {projected.map((p, i) => {
          const isLast = i === projected.length - 1
          const isFirst = i === 0
          const r = isLast ? 9 : isFirst ? 6 : 4
          const fill = isLast ? '#B91C1C' : isFirst ? '#0F0E0C' : '#6E685F'
          const labelRight = p.sx < W * 0.7
          return (
            <g key={i}>
              <circle cx={p.sx} cy={p.sy} r={r} fill={fill} stroke="white" strokeWidth="2"/>
              {isLast && p.label && (
                <text
                  x={p.sx + (labelRight ? 14 : -14)}
                  y={p.sy + 4}
                  fill="#0F0E0C"
                  fontSize="13"
                  fontFamily="ui-monospace, monospace"
                  fontWeight="700"
                  textAnchor={labelRight ? 'start' : 'end'}
                >
                  {p.label}
                </text>
              )}
              {isFirst && (
                <text
                  x={p.sx + 14}
                  y={p.sy + 4}
                  fill="#0F0E0C"
                  fontSize="11"
                  fontFamily="ui-monospace, monospace"
                  fontWeight="600"
                >
                  INICIO
                </text>
              )}
            </g>
          )
        })}
      </svg>

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] text-kratos-muted font-mono z-10">
        <span><MapPin size={10} className="inline -mt-0.5"/> {last?.lugar || '—'}</span>
        <span>Vel. {last?.kmh ?? 0} km/h</span>
        <span>Últ. señal {last?.hace || 'hace 1 min'}</span>
      </div>
    </div>
  )
}
