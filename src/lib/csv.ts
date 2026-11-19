/** Minimal RFC 4180 CSV serialisation and browser download. */

type Cell = string | number | boolean | null | undefined

function escapeCell(value: Cell): string {
  if (value === null || value === undefined) return ''
  const text = String(value)
  // Guard against spreadsheet formula injection when opened in Excel.
  const safe = /^[=+\-@\t\r]/.test(text) ? `'${text}` : text
  return /[",\n\r]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe
}

export function toCsv<T extends Record<string, Cell>>(rows: T[], columns?: (keyof T)[]): string {
  if (rows.length === 0) return ''
  const cols = columns ?? (Object.keys(rows[0]) as (keyof T)[])
  const header = cols.map((c) => escapeCell(String(c))).join(',')
  const body = rows.map((row) => cols.map((c) => escapeCell(row[c])).join(','))
  return [header, ...body].join('\r\n')
}

export function downloadText(filename: string, text: string, mime = 'text/csv;charset=utf-8') {
  // BOM so Excel opens UTF-8 (e.g. "Sánchez-Monedero") correctly.
  const blob = new Blob(['﻿', text], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function downloadCsv<T extends Record<string, Cell>>(filename: string, rows: T[], columns?: (keyof T)[]) {
  downloadText(filename, toCsv(rows, columns))
}
