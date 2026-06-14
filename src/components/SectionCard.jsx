export default function SectionCard({ title, subtitle, action, children, className = '', flush = false }) {
  return (
    <section className={`panel ${className}`}>
      <header className="px-5 py-4 border-b border-kratos-border flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="section-title">{title}</h3>
          {subtitle && <p className="text-[12px] text-kratos-muted mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </header>
      <div className={flush ? '' : 'p-5'}>{children}</div>
    </section>
  )
}
