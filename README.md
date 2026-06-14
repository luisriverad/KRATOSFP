# Kratos · Centro de Inteligencia Operativa

Maqueta funcional del sistema de inteligencia operativa para **Kratos FP** (Zempoala, Hidalgo).

> ⚠️ **No es un ERP.** Es una capa de IA que se monta encima de los sistemas que la empresa ya usa (BBVA, SAT, Toka, Edenred, GPS de flota, redes sociales, Excel/Drive) para **detonar agentes, automatizaciones, análisis y gestión de riesgos**.

## 🚀 Levantar el proyecto

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## 🧱 Stack

- **React 18** + **Vite 5**
- **Tailwind CSS** (paleta Kratos: rojo `#DC2626`, negro `#0A0A0B`)
- **React Router** v6
- **Recharts** para visualizaciones
- **Lucide React** para iconografía
- Tipografías: Inter, Space Grotesk, JetBrains Mono

## 🗺️ Mapa del sistema

| Ruta | Módulo | Responsable |
|---|---|---|
| `/` | **Dashboard CEO** | Ing. Ricardo Nieto |
| `/coo` | **Dashboard COO** | Coordinación General |
| `/finanzas` | Finanzas | Jaqueline Santos |
| `/crm` | CRM Comercial | Equipo Comercial |
| `/operaciones` | Operaciones · Flota · Mant. · Logística | Valentina García |
| `/rrhh` | Recursos Humanos | Coordinación General |
| `/marketing` | Mercadotecnia (4 marcas) | Ahtziri López |
| `/compras` | Compras y Almacén | Jonathan Carrillo |
| `/calidad` | Calidad (con apoyo) | Coordinación General |
| `/agentes` | **Centro de Agentes IA** | Sistema |

## 🤖 Agentes IA implementados (20)

Cada módulo cuenta con agentes específicos que leen de las fuentes reales y detonan acciones:

- **Estratégico** — Centinela de Riesgos, Sintetizador Ejecutivo
- **Finanzas** — Conciliador BBVA, Auditor de Comprobación, Semáforo Fiscal (SAT/IMSS/INFONAVIT/ISN/REPSE/ICSOE/SISUB/SIROC), Pronóstico de Tesorería
- **Operaciones** — Monitor GPS de flota, Vigía Documental Flota, Optimizador de Rutas SCT, Predictor de Mantenimiento
- **CRM** — Scoring de Oportunidades, Seguimiento Comercial
- **RH** — Vigía Documental Personal, Ausentismo & Rol de Trabajo
- **Marketing** — Generador de Contenido Multi-marca, Monitor de Redes
- **Compras** — Comparador de Cotizaciones, Alerta de Stock Crítico
- **Calidad** — Auditor de Checklists, Gestor de No Conformidades

## 🔌 Integraciones contempladas

Banca BBVA · SAT · IMSS · INFONAVIT · ISN · REPSE · ICSOE · SISUB · SIROC · Toka · Edenred · GPS de flota · WhatsApp Business · Instagram · Facebook · TikTok · LinkedIn · Google Drive / SharePoint.

## 📂 Estructura

```
kratos-ia/
├── src/
│   ├── components/      # Layout, Sidebar, Topbar, KPICard, AgentCard, ...
│   ├── pages/           # 10 pantallas (Dashboards + 7 módulos + Agentes)
│   ├── data/mockData.js # Datos basados en los Excel y PDF reales del cliente
│   ├── App.jsx          # Rutas
│   ├── main.jsx
│   └── index.css        # Tailwind + tema oscuro Kratos
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## 📝 Notas de la maqueta

- **Datos**: todo el mock parte de los formatos reales que ya operan (Cashflow 2026, Bitácora de hechos, Lista de Proveedores SC 2026, Documentos Grúas, Rol de Trabajo, etc.). Nombres, grúas (G003-G014), operadores y responsables son los reales.
- **Estética**: estilo *command center* oscuro con acentos rojos para reforzar la identidad de marca y la sensación de "sistema en vivo".
- **Funcionalidad**: navegación, búsqueda de agentes con filtros, dropdown de alertas, switcher de perfil de usuario (CEO/COO/líderes), tooltips en gráficas, ordenamiento visual de listas.
- **Próximos pasos sugeridos para Cursor**:
  1. Cablear cada agente al webhook/cron real (ya están documentados con su `fuente`).
  2. Sustituir `mockData.js` por adapters a Supabase / Firestore / BigQuery.
  3. Agregar autenticación con SSO (Google Workspace).
  4. Activar acciones reales (`btn-primary`) — actualmente sólo visuales.
  5. Conectar SIROC para cerrar el ciclo completo de compliance (único pendiente en la maqueta).

---

© 2026 Kratos FP · Construyendo el mundo con Calidad y Presencia en todo el país.
