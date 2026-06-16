import { useState, createContext, useContext } from 'react'

const TabsCtx = createContext(null)

export function Tabs({ defaultValue, value, onChange, children, className = '' }) {
  const [internal, setInternal] = useState(defaultValue)
  const active = value !== undefined ? value : internal
  const setActive = (v) => {
    if (onChange) onChange(v)
    if (value === undefined) setInternal(v)
  }
  return (
    <TabsCtx.Provider value={{ active, setActive }}>
      <div className={className}>{children}</div>
    </TabsCtx.Provider>
  )
}

export function TabsList({ children, className = '', style = 'pills' }) {
  if (style === 'underline') {
    return (
      <div className={`flex items-center gap-1 border-b border-kratos-border overflow-x-auto no-scrollbar px-2 ${className}`}>
        {children}
      </div>
    )
  }
  return (
    <div className={`flex items-center gap-1 flex-wrap p-1.5 ${className}`}>
      {children}
    </div>
  )
}

export function Tab({ value, icon: Icon, badge, children, numero, style = 'pills' }) {
  const ctx = useContext(TabsCtx)
  if (!ctx) return null
  const isActive = ctx.active === value

  if (style === 'underline') {
    return (
      <button
        type="button"
        onClick={() => ctx.setActive(value)}
        className={`relative inline-flex items-center gap-1.5 px-3 py-3 text-[13px] font-medium whitespace-nowrap transition-colors
          ${isActive ? 'text-kratos-ink' : 'text-kratos-muted hover:text-kratos-text'}`}
      >
        {Icon && <Icon size={13} />}
        <span>{children}</span>
        {badge !== undefined && badge !== null && (
          <span className={`ml-1 px-1.5 py-[1px] rounded-none text-[10px] font-mono ${isActive ? 'bg-kratos-ink/10 text-kratos-ink' : 'bg-kratos-bg2 text-kratos-muted'}`}>{badge}</span>
        )}
        {isActive && <span className="absolute left-2 right-2 -bottom-px h-[2px] bg-kratos-ink rounded-full" />}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => ctx.setActive(value)}
      className={`inline-flex items-center gap-2 px-3.5 py-2 text-[13px] font-medium rounded-none whitespace-nowrap transition-all
        ${isActive
          ? 'bg-kratos-ink text-white'
          : 'text-kratos-subtle hover:bg-kratos-bg2/70'}`}
    >
      {numero && <span className={`font-mono text-[10px] ${isActive ? 'text-white/60' : 'text-kratos-muted'}`}>{numero}</span>}
      {Icon && <Icon size={13} className={isActive ? 'text-white/85' : 'text-kratos-muted'} />}
      <span>{children}</span>
      {badge !== undefined && badge !== null && (
        <span className={`ml-1 px-1.5 py-[1px] rounded-none text-[10px] font-mono ${isActive ? 'bg-white/15 text-white' : 'bg-white text-kratos-muted border border-kratos-border'}`}>{badge}</span>
      )}
    </button>
  )
}

export function TabPanel({ value, children, className = '' }) {
  const ctx = useContext(TabsCtx)
  if (!ctx || ctx.active !== value) return null
  return <div className={className}>{children}</div>
}
