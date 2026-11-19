import { useId, useState, type ReactNode } from 'react'
import { BarChart3, Table2 } from 'lucide-react'
import { cx } from '../ui/primitives'

export interface TableSpec {
  columns: { key: string; label: string; numeric?: boolean }[]
  rows: Record<string, string | number>[]
  caption: string
}

/**
 * Wrapper for every chart: title, a chart/table toggle (the table is the
 * accessible equivalent of the chart), and a footnote slot for sources and caveats.
 */
export function ChartCard({
  title,
  subtitle,
  table,
  footnote,
  children,
  className,
  legend,
}: {
  title: string
  subtitle?: ReactNode
  table: TableSpec
  footnote?: ReactNode
  children: ReactNode
  className?: string
  legend?: ReactNode
}) {
  const [view, setView] = useState<'chart' | 'table'>('chart')
  const headingId = useId()
  return (
    <figure aria-labelledby={headingId} className={cx('flex flex-col rounded-xl border border-line bg-surface p-5', className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 id={headingId} className="font-sans text-[0.95rem] font-semibold tracking-normal text-ink">
            {title}
          </h3>
          {subtitle && <p className="mt-1 text-[0.8rem] leading-snug text-ink-3">{subtitle}</p>}
        </div>
        <div role="group" aria-label="View as" className="flex shrink-0 rounded-lg border border-line bg-paper p-0.5">
          {(['chart', 'table'] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={cx(
                'inline-flex h-7 items-center gap-1 rounded-md px-2 text-xs font-medium',
                view === v ? 'bg-surface text-ink shadow-sm' : 'text-ink-3 hover:text-ink',
              )}
            >
              {v === 'chart' ? <BarChart3 className="size-3.5" aria-hidden /> : <Table2 className="size-3.5" aria-hidden />}
              <span className="capitalize">{v}</span>
            </button>
          ))}
        </div>
      </div>
      {legend && view === 'chart' && <div className="mt-3">{legend}</div>}
      <div className="mt-4 flex-1">
        {view === 'chart' ? (
          children
        ) : (
          <div className="max-h-80 overflow-auto rounded-lg border border-line">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">{table.caption}</caption>
              <thead className="sticky top-0 bg-sunken text-xs text-ink-2">
                <tr>
                  {table.columns.map((c) => (
                    <th key={c.key} scope="col" className={cx('px-3 py-2 font-semibold', c.numeric && 'text-right')}>
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((r, i) => (
                  <tr key={i} className="border-t border-line">
                    {table.columns.map((c) => (
                      <td key={c.key} className={cx('px-3 py-2 text-ink-2', c.numeric && 'tabular text-right')}>
                        {r[c.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {footnote && <figcaption className="mt-4 border-t border-line pt-3 text-xs leading-relaxed text-ink-3">{footnote}</figcaption>}
    </figure>
  )
}

export function Legend({ items }: { items: { label: string; color: string; dashed?: boolean }[] }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-ink-2">
      {items.map((it) => (
        <li key={it.label} className="flex items-center gap-1.5">
          <span
            aria-hidden
            className="inline-block h-[3px] w-4 rounded-full"
            style={
              it.dashed
                ? { backgroundImage: `repeating-linear-gradient(90deg, ${it.color} 0 4px, transparent 4px 7px)` }
                : { background: it.color }
            }
          />
          {it.label}
        </li>
      ))}
    </ul>
  )
}

/** Shared tooltip shell for Recharts so every chart's hover layer looks the same. */
export function TooltipShell({ title, rows, note }: { title: string; rows: { label: string; value: string; color?: string }[]; note?: string }) {
  return (
    <div className="max-w-xs rounded-lg border border-line bg-surface px-3 py-2.5 text-xs shadow-lg">
      <p className="font-semibold text-ink">{title}</p>
      <ul className="mt-1.5 space-y-1">
        {rows.map((r) => (
          <li key={r.label} className="flex items-center justify-between gap-4 text-ink-2">
            <span className="flex items-center gap-1.5">
              {r.color && <span aria-hidden className="size-2 rounded-full" style={{ background: r.color }} />}
              {r.label}
            </span>
            <span className="tabular font-semibold text-ink">{r.value}</span>
          </li>
        ))}
      </ul>
      {note && <p className="mt-2 border-t border-line pt-1.5 leading-snug text-ink-3">{note}</p>}
    </div>
  )
}

export const SERIES = ['#2f6f9f', '#c9773a', '#2b9a8a', '#8d5ba6', '#b8a12a'] as const
export const AXIS = { stroke: '#cfcbc0', tick: { fill: '#5e636a', fontSize: 12 } }
export const GRID = '#ebe8e1'
