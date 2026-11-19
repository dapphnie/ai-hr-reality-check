import { useEffect, useRef, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { AXIS, GRID, TooltipShell } from './ChartCard'

export interface HBarRow {
  label: string
  value: number
  note?: string
  color?: string
}

/** Tracks an element's width so chart gutters can adapt to narrow screens. */
function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [width, setWidth] = useState(0)
  useEffect(() => {
    if (!ref.current) return
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])
  return [ref, width] as const
}

/** Horizontal bar chart with direct value labels — used for category comparisons within ONE source. */
export function HBarChart({
  data,
  color,
  max = 100,
  unit = '%',
  height,
  valueLabel = 'Share',
  labelWidth = 170,
}: {
  data: HBarRow[]
  color: string
  max?: number
  unit?: string
  height?: number
  valueLabel?: string
  labelWidth?: number
}) {
  const [ref, width] = useWidth<HTMLDivElement>()
  const narrow = width > 0 && width < 420
  // On narrow screens cap the label gutter so bars keep most of the width.
  const gutter = width ? Math.min(labelWidth, Math.round(width * 0.4)) : labelWidth
  const h = height ?? Math.max(120, data.length * (narrow ? 52 : 44) + 30)
  return (
    <div ref={ref} style={{ height: h }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 44, bottom: 4, left: 4 }} barCategoryGap={10}>
          <CartesianGrid horizontal={false} stroke={GRID} />
          <XAxis
            type="number"
            domain={[0, max]}
            ticks={narrow ? [0, max] : undefined}
            tickFormatter={(v) => `${v}${unit}`}
            {...AXIS}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            type="category"
            dataKey="label"
            width={gutter}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#43474d', fontSize: narrow ? 11 : 12 }}
          />
          <Tooltip
            cursor={{ fill: 'rgba(31,102,112,0.06)' }}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null
              const row = payload[0].payload as HBarRow
              return <TooltipShell title={row.label} rows={[{ label: valueLabel, value: `${row.value}${unit}`, color: row.color ?? color }]} note={row.note} />
            }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={22} isAnimationActive={false}>
            {data.map((d) => (
              <Cell key={d.label} fill={d.color ?? color} />
            ))}
            <LabelList dataKey="value" position="right" formatter={(v) => `${v}${unit}`} style={{ fill: '#1c1f22', fontSize: 12, fontWeight: 600 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export interface TrendDatum {
  year: number
  value: number
  period: string
  note?: string
  derived?: boolean
}

/** One series per panel; never mixes series on a shared axis. */
export function TrendPanel({
  data,
  color,
  height = 190,
  xDomain = [2020, 2027],
  yMax = 60,
}: {
  data: TrendDatum[]
  color: string
  height?: number
  xDomain?: [number, number]
  yMax?: number
}) {
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 18, right: 18, bottom: 0, left: -12 }}>
          <CartesianGrid vertical={false} stroke={GRID} />
          <XAxis
            type="number"
            dataKey="year"
            domain={xDomain}
            ticks={Array.from({ length: xDomain[1] - xDomain[0] + 1 }, (_, i) => xDomain[0] + i)}
            tickFormatter={(v) => String(v)}
            {...AXIS}
            tickLine={false}
          />
          <YAxis domain={[0, yMax]} tickFormatter={(v) => `${v}%`} {...AXIS} tickLine={false} axisLine={false} width={48} />
          <Tooltip
            cursor={{ stroke: '#cfcbc0', strokeDasharray: '3 3' }}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null
              const d = payload[0].payload as TrendDatum
              return <TooltipShell title={d.period} rows={[{ label: 'Reported value', value: `${d.value}%`, color }]} note={d.note} />
            }}
          />
          <Line
            type="linear"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            isAnimationActive={false}
            dot={(props) => {
              const { cx, cy, payload, index } = props as { cx: number; cy: number; payload: TrendDatum; index: number }
              return (
                <circle
                  key={index}
                  cx={cx}
                  cy={cy}
                  r={5}
                  stroke={color}
                  strokeWidth={2}
                  fill={payload.derived ? '#fdfcfa' : color}
                />
              )
            }}
            activeDot={{ r: 7, stroke: '#fdfcfa', strokeWidth: 2 }}
          >
            <LabelList dataKey="value" position="top" offset={10} formatter={(v) => `${v}%`} style={{ fill: '#1c1f22', fontSize: 11, fontWeight: 600 }} />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export interface StackRow {
  label: string
  [key: string]: string | number
}

/** 100% stacked horizontal bars for answer distributions (e.g. use / don't know / don't use). */
export function StackedDistribution({
  data,
  keys,
  height,
}: {
  data: StackRow[]
  keys: { key: string; label: string; color: string; textOnBar?: string }[]
  height?: number
}) {
  const h = height ?? data.length * 46 + 36
  return (
    <div style={{ height: h }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 12, bottom: 4, left: 4 }} barCategoryGap={10}>
          <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} {...AXIS} tickLine={false} axisLine={false} />
          <YAxis type="category" dataKey="label" width={52} tickLine={false} axisLine={false} tick={{ fill: '#43474d', fontSize: 12, fontWeight: 600 }} />
          <Tooltip
            cursor={{ fill: 'rgba(31,102,112,0.06)' }}
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null
              const row = payload[0].payload as StackRow
              return (
                <TooltipShell
                  title={String(label)}
                  rows={keys.map((k) => ({ label: k.label, value: `${row[k.key]}%`, color: k.color }))}
                  note={typeof row.note === 'string' ? row.note : undefined}
                />
              )
            }}
          />
          {keys.map((k, i) => (
            <Bar
              key={k.key}
              dataKey={k.key}
              stackId="a"
              fill={k.color}
              stroke="#fdfcfa"
              strokeWidth={2}
              isAnimationActive={false}
              radius={i === keys.length - 1 ? [0, 4, 4, 0] : i === 0 ? [4, 0, 0, 4] : 0}
              maxBarSize={26}
            >
              <LabelList
                dataKey={k.key}
                position="center"
                formatter={(v) => (Number(v) >= 6 ? `${v}%` : '')}
                style={{ fill: k.textOnBar ?? '#ffffff', fontSize: 11, fontWeight: 600 }}
              />
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

/** Grouped bars (categories × a few years). Vertical columns on wide screens, horizontal bars on narrow ones. */
export function GroupedBars({
  data,
  categoryKey,
  series,
  height = 300,
  max = 20,
}: {
  data: Record<string, string | number>[]
  categoryKey: string
  series: { key: string; label: string; color: string }[]
  height?: number
  max?: number
}) {
  const [ref, width] = useWidth<HTMLDivElement>()
  const narrow = width > 0 && width < 560
  const h = narrow ? data.length * (series.length * 9 + 18) + 40 : height
  const valueAxis = { domain: [0, max] as [number, number], tickFormatter: (v: number) => `${v}%`, ...AXIS, tickLine: false }
  return (
    <div ref={ref} style={{ height: h }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout={narrow ? 'vertical' : 'horizontal'}
          margin={narrow ? { top: 4, right: 12, bottom: 4, left: 4 } : { top: 8, right: 8, bottom: 8, left: -12 }}
          barGap={2}
          barCategoryGap="22%"
        >
          <CartesianGrid vertical={narrow} horizontal={!narrow} stroke={GRID} />
          {narrow ? (
            <>
              <XAxis type="number" {...valueAxis} axisLine={false} />
              <YAxis type="category" dataKey={categoryKey} width={92} tickLine={false} axisLine={false} tick={{ fill: '#43474d', fontSize: 11 }} />
            </>
          ) : (
            <>
              <XAxis dataKey={categoryKey} {...AXIS} tickLine={false} interval={0} tick={{ fill: '#5e636a', fontSize: 11 }} />
              <YAxis {...valueAxis} axisLine={false} width={48} />
            </>
          )}
          <Tooltip
            cursor={{ fill: 'rgba(31,102,112,0.06)' }}
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null
              const row = payload[0].payload as Record<string, string | number>
              return (
                <TooltipShell
                  title={String(row.full ?? label)}
                  rows={series.map((s) => ({ label: s.label, value: `${row[s.key]}%`, color: s.color }))}
                  note="% of all survey respondents (not only AI users)."
                />
              )
            }}
          />
          {series.map((s) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              fill={s.color}
              radius={narrow ? [0, 4, 4, 0] : [4, 4, 0, 0]}
              maxBarSize={narrow ? 8 : 18}
              isAnimationActive={false}
              stroke="#fdfcfa"
              strokeWidth={1}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
