import type { Source } from '../types'
import { LITERATURE_SOURCES } from '../data/sources-literature'
import { EVIDENCE_SOURCES } from '../data/sources-evidence'

export const SOURCES: Source[] = [...LITERATURE_SOURCES, ...EVIDENCE_SOURCES].sort(
  (a, b) => a.shortCite.localeCompare(b.shortCite),
)

const BY_ID = new Map(SOURCES.map((s) => [s.id, s]))

export function getSource(id: string): Source | undefined {
  return BY_ID.get(id)
}

/** Harvard-style reference string used for display and export. */
export function formatReference(s: Source): string {
  const link = s.doi ? `https://doi.org/${s.doi}` : s.url.startsWith('/') ? '' : s.url
  return `${s.authors} (${s.year}) ${s.title}. ${s.venue}.${link ? ` Available at: ${link}` : ''}`
}
