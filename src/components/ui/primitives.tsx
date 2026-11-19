import { useId, useState, type ReactNode } from 'react'
import { AlertTriangle, ChevronDown, Download, Info, Search, X } from 'lucide-react'

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(' ')
}

export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  children?: ReactNode
}) {
  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-4xl text-3xl font-medium leading-tight text-ink sm:text-4xl md:text-[2.75rem]">
          {title}
        </h1>
        {lede && <div className="mt-4 max-w-3xl text-base leading-relaxed text-ink-2 md:text-lg">{lede}</div>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </header>
  )
}

export function Section({
  id,
  kicker,
  title,
  description,
  actions,
  children,
  className,
}: {
  id?: string
  kicker?: string
  title: string
  description?: ReactNode
  actions?: ReactNode
  children: ReactNode
  className?: string
}) {
  const headingId = useId()
  return (
    <section id={id} aria-labelledby={headingId} className={cx('scroll-mt-24', className)}>
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          {kicker && <p className="eyebrow mb-1.5">{kicker}</p>}
          <h2 id={headingId} className="text-2xl font-medium text-ink">
            {title}
          </h2>
          {description && <div className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">{description}</div>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
      {children}
    </section>
  )
}

export function Card({ children, className, as: Tag = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'article' | 'li' }) {
  return <Tag className={cx('rounded-xl border border-line bg-surface', className)}>{children}</Tag>
}

/** Callout used whenever figures are not comparable or a caveat must travel with a number. */
export function Callout({
  tone = 'info',
  title,
  children,
  className,
}: {
  tone?: 'info' | 'warning'
  title: string
  children: ReactNode
  className?: string
}) {
  const Icon = tone === 'warning' ? AlertTriangle : Info
  return (
    <div
      role="note"
      className={cx(
        'flex gap-3 rounded-lg border p-4 text-sm leading-relaxed',
        tone === 'warning' ? 'border-[#e5d3a3] bg-[#fbf5e6] text-[#5a4511]' : 'border-line bg-sunken/60 text-ink-2',
        className,
      )}
    >
      <Icon aria-hidden className={cx('mt-0.5 size-4 shrink-0', tone === 'warning' ? 'text-mixed' : 'text-ink-3')} />
      <div>
        <p className={cx('font-semibold', tone === 'warning' ? 'text-[#4a390d]' : 'text-ink')}>{title}</p>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  )
}

export function SearchInput({
  value,
  onChange,
  placeholder,
  label,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
  label: string
}) {
  const id = useId()
  return (
    <div className="relative w-full">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-3" />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-line-strong bg-surface pr-9 pl-9 text-sm text-ink placeholder:text-ink-3 focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-ink-3 hover:bg-sunken hover:text-ink"
        >
          <X className="size-4" aria-hidden />
        </button>
      )}
    </div>
  )
}

export function SelectFilter<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: readonly { value: T; label: string }[] | readonly T[]
  onChange: (v: T) => void
}) {
  const id = useId()
  const opts = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o)) as { value: T; label: string }[]
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <label htmlFor={id} className="text-xs font-medium text-ink-3">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value as T)}
          className="h-10 w-full appearance-none rounded-lg border border-line-strong bg-surface pr-9 pl-3 text-sm text-ink focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
        >
          {opts.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-ink-3" />
      </div>
    </div>
  )
}

/** Toggle-button group; behaves as a set of pressed/unpressed buttons. */
export function ChipGroup<T extends string>({
  label,
  options,
  selected,
  onToggle,
  multi = true,
}: {
  label: string
  options: readonly T[]
  selected: T[]
  onToggle: (v: T) => void
  multi?: boolean
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-1.5">
      {options.map((o) => {
        const on = selected.includes(o)
        return (
          <button
            key={o}
            type="button"
            aria-pressed={on}
            onClick={() => onToggle(o)}
            className={cx(
              'h-8 rounded-full border px-3 text-[0.8rem] font-medium transition-colors',
              on
                ? 'border-accent bg-accent text-white'
                : 'border-line-strong bg-surface text-ink-2 hover:border-ink-3 hover:text-ink',
              !multi && on && 'pointer-events-none',
            )}
          >
            {o}
          </button>
        )
      })}
    </div>
  )
}

export function Button({
  children,
  onClick,
  variant = 'secondary',
  icon,
  type = 'button',
  ariaLabel,
  className,
}: {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  icon?: ReactNode
  type?: 'button' | 'submit'
  ariaLabel?: string
  className?: string
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cx(
        'inline-flex h-9 items-center gap-2 rounded-lg px-3.5 text-sm font-medium transition-colors',
        variant === 'primary' && 'bg-accent text-white hover:bg-accent-strong',
        variant === 'secondary' && 'border border-line-strong bg-surface text-ink hover:border-ink-3',
        variant === 'ghost' && 'text-ink-2 hover:bg-sunken hover:text-ink',
        className,
      )}
    >
      {icon}
      {children}
    </button>
  )
}

export function ExportButton({ onClick, label = 'Export CSV', count }: { onClick: () => void; label?: string; count?: number }) {
  return (
    <Button onClick={onClick} icon={<Download className="size-4" aria-hidden />}>
      {label}
      {count !== undefined && <span className="tabular text-ink-3">({count})</span>}
    </Button>
  )
}

export function EmptyState({ title, body, onReset }: { title: string; body: string; onReset?: () => void }) {
  return (
    <div role="status" className="rounded-xl border border-dashed border-line-strong bg-surface px-6 py-12 text-center">
      <p className="font-serif text-lg text-ink">{title}</p>
      <p className="mx-auto mt-1 max-w-md text-sm text-ink-2">{body}</p>
      {onReset && (
        <Button onClick={onReset} className="mt-4" variant="primary">
          Reset filters
        </Button>
      )}
    </div>
  )
}

export function Disclosure({
  summary,
  children,
  defaultOpen = false,
  className,
}: {
  summary: ReactNode
  children: ReactNode
  defaultOpen?: boolean
  className?: string
}) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        {summary}
        <ChevronDown aria-hidden className={cx('size-4 shrink-0 text-ink-3 transition-transform', open && 'rotate-180')} />
      </button>
      <div id={id} hidden={!open}>
        {children}
      </div>
    </div>
  )
}

export function ResultCount({ shown, total, noun }: { shown: number; total: number; noun: string }) {
  return (
    <p className="text-sm text-ink-3" aria-live="polite">
      Showing <span className="tabular font-medium text-ink">{shown}</span> of <span className="tabular">{total}</span> {noun}
    </p>
  )
}
