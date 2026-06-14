import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'

export default function SortableTH({ sort, sortKey, onToggle, children, className = '', align = 'left' }) {
  const active = sort?.key === sortKey
  const dir = active ? sort.dir : null
  const justify = align === 'right' ? 'justify-end' : align === 'center' ? 'justify-center' : 'justify-start'
  const Icon = !active ? ChevronsUpDown : dir === 'asc' ? ChevronUp : ChevronDown

  return (
    <th
      className={`table-th cursor-pointer select-none ${className}`}
      onClick={() => onToggle(sortKey)}
      aria-sort={dir === 'asc' ? 'ascending' : dir === 'desc' ? 'descending' : 'none'}
    >
      <span className={`inline-flex items-center gap-1 w-full ${justify} ${active ? 'text-kratos-ink' : ''} hover:text-kratos-ink transition-colors`}>
        <span>{children}</span>
        <Icon size={12} className={active ? 'opacity-100' : 'opacity-40'}/>
      </span>
    </th>
  )
}
