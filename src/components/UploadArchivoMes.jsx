import { useRef, useState } from 'react'
import { UploadCloud, FileSpreadsheet, CheckCircle2, X, AlertTriangle, Loader2 } from 'lucide-react'

const EXT_EXCEL = ['.xlsx', '.xls', '.xlsm', '.csv']

const fmtBytes = (b) => b < 1024 ? `${b} B` : b < 1048576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1048576).toFixed(1)} MB`

export default function UploadArchivoMes({
  mesLabel = 'del mes',
  titulo = 'Subir archivo del mes',
  subtitulo,
  extensiones = EXT_EXCEL,
  tipoArchivo = 'el Excel con los resultados del mes',
  textoExito,
  icon: Icon = FileSpreadsheet,
  flat = false
}) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [archivo, setArchivo] = useState(null)   // { nombre, tamano }
  const [estado, setEstado] = useState('idle')   // idle | procesando | listo | error
  const [error, setError] = useState('')

  const procesar = (file) => {
    if (!file) return
    const ext = '.' + file.name.split('.').pop().toLowerCase()
    if (!extensiones.includes(ext)) {
      setEstado('error')
      setError(`Formato no válido (${ext}). Sube un archivo: ${extensiones.join(', ')}`)
      setArchivo(null)
      return
    }
    setError('')
    setArchivo({ nombre: file.name, tamano: file.size })
    setEstado('procesando')
    // Simulación de carga y validación del archivo
    setTimeout(() => setEstado('listo'), 1600)
  }

  const onDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    procesar(e.dataTransfer.files?.[0])
  }

  const limpiar = () => {
    setArchivo(null)
    setEstado('idle')
    setError('')
    if (inputRef.current) inputRef.current.value = ''
  }

  const sub = subtitulo ?? `Excel con los resultados ${mesLabel}`
  const exito = textoExito ?? `Resultados ${mesLabel} cargados correctamente`

  return (
    <section className={flat ? 'panel-flat border border-kratos-border' : 'panel'}>
      <header className="px-5 py-4 border-b border-kratos-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon size={16} className="text-kratos-muted"/>
          <h3 className="section-title">{titulo}</h3>
        </div>
        <span className="label-mono">{sub}</span>
      </header>

      <div className="p-5">
        {estado === 'listo' ? (
          <div className="flex items-center gap-4 border border-kratos-ok/30 bg-kratos-ok-soft px-5 py-4">
            <CheckCircle2 size={22} className="text-kratos-ok shrink-0"/>
            <div className="flex-1 min-w-0">
              <div className="font-display font-semibold text-kratos-ink leading-tight truncate">{archivo.nombre}</div>
              <div className="text-[12px] text-kratos-muted mt-0.5">{fmtBytes(archivo.tamano)} · {exito}</div>
            </div>
            <button onClick={limpiar} className="btn-primary shrink-0">REEMPLAZAR</button>
            <button onClick={limpiar} className="text-kratos-muted hover:text-kratos-ink transition-colors shrink-0" title="Quitar archivo">
              <X size={16}/>
            </button>
          </div>
        ) : estado === 'procesando' ? (
          <div className="flex items-center gap-4 border border-kratos-border bg-kratos-panel-2 px-5 py-4">
            <Loader2 size={22} className="text-kratos-info shrink-0 animate-spin"/>
            <div className="flex-1 min-w-0">
              <div className="font-display font-semibold text-kratos-ink leading-tight truncate">{archivo.nombre}</div>
              <div className="text-[12px] text-kratos-muted mt-0.5">{fmtBytes(archivo.tamano)} · Procesando y validando…</div>
            </div>
          </div>
        ) : (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click() }}
            className={`cursor-pointer border-2 border-dashed px-6 py-10 flex flex-col items-center justify-center text-center transition-colors
              ${dragging ? 'border-kratos-info bg-kratos-info-soft' : 'border-kratos-border bg-kratos-panel-2 hover:border-kratos-muted hover:bg-white'}`}
          >
            <span className={`w-12 h-12 grid place-items-center mb-3 ${dragging ? 'bg-kratos-info text-white' : 'bg-kratos-info-soft text-kratos-info'}`}>
              <UploadCloud size={24}/>
            </span>
            <div className="font-display font-semibold text-kratos-ink">
              {dragging ? 'Suelta el archivo aquí' : `Arrastra aquí ${tipoArchivo}`}
            </div>
            <div className="text-[12px] text-kratos-muted mt-1">
              o <span className="underline text-kratos-info">haz clic para buscarlo</span> · {extensiones.join(' · ')}
            </div>
            {estado === 'error' && (
              <div className="mt-3 flex items-center gap-1.5 text-[12px] text-kratos-danger">
                <AlertTriangle size={13}/> {error}
              </div>
            )}
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={extensiones.join(',')}
          className="hidden"
          onChange={(e) => procesar(e.target.files?.[0])}
        />
      </div>
    </section>
  )
}
