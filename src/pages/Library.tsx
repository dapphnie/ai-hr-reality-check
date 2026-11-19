import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Check, Copy, ExternalLink, FileDown } from 'lucide-react'
import {
  Button,
  Card,
  EmptyState,
  ExportButton,
  PageHeader,
  ResultCount,
  SearchInput,
  SelectFilter,
  cx,
} from '../components/ui/primitives'
import { KIND_LABELS, KindBadge } from '../components/ui/evidence'
import { SOURCES, formatReference } from '../lib/sources'
import { downloadCsv, downloadText } from '../lib/csv'
import type { EvidenceKind, Source } from '../types'

const VERIFICATION_LABEL: Record<Source['verification'], string> = {
  'verified-primary': 'Checked against the primary source',
  'verified-secondary': 'Link checked; figures as cited in the dissertation or an official summary',
  'citation-only': 'Bibliographic record checked; abstract not accessible',
}

const ALL_TOPICS = [...new Set(SOURCES.flatMap((s) => s.topics))].sort()

function toRis(sources: Source[]): string {
  return sources
    .map((s) => {
      const type = s.kind === 'peer-reviewed' ? (s.venue.startsWith('Proceedings') ? 'CONF' : s.venue.startsWith('In ') ? 'CHAP' : 'JOUR') : s.kind === 'regulatory' ? 'LEGAL' : 'RPRT'
      const authors = s.authors.split(/,\s(?=[A-Z][^,]*\.)| and /).map((a) => `AU  - ${a.trim()}`)
      return [
        `TY  - ${type}`,
        ...authors,
        `PY  - ${s.year}`,
        `TI  - ${s.title}`,
        `T2  - ${s.venue}`,
        s.doi ? `DO  - ${s.doi}` : '',
        s.url.startsWith('/') ? '' : `UR  - ${s.url}`,
        `N1  - ${s.methodology} Sample: ${s.sample}`,
        'ER  - ',
      ]
        .filter(Boolean)
        .join('\r\n')
    })
    .join('\r\n\r\n')
}

function SourceEntry({ s, open, onToggle }: { s: Source; open: boolean; onToggle: () => void }) {
  const [copied, setCopied] = useState(false)
  const href = s.doi ? `https://doi.org/${s.doi}` : s.url
  const internal = href.startsWith('/')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(formatReference(s))
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <li id={`src-${s.id}`} className={cx('scroll-mt-24 rounded-xl border bg-surface transition-colors', open ? 'border-accent/50' : 'border-line')}>
      <button type="button" aria-expanded={open} aria-controls={`body-${s.id}`} onClick={onToggle} className="w-full p-5 text-left">
        <div className="flex flex-wrap items-center gap-2">
          <KindBadge kind={s.kind} />
          <span className="tabular text-xs text-ink-3">{s.year}</span>
          <span className="text-xs text-ink-3">· {s.geography}</span>
          {s.citedInDissertation && <span className="rounded bg-qual-soft px-1.5 py-0.5 text-[0.7rem] font-medium text-qual">Cited in dissertation</span>}
        </div>
        <p className="mt-2 font-serif text-[1.08rem] leading-snug text-ink">{s.title}</p>
        <p className="mt-0.5 text-sm text-ink-2">
          {s.authors} — <span className="italic">{s.venue}</span>
        </p>
      </button>
      <div id={`body-${s.id}`} hidden={!open} className="border-t border-line px-5 pt-4 pb-5">
        <dl className="grid gap-x-8 gap-y-3 text-sm md:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold text-ink-3 uppercase">Methodology</dt>
            <dd className="mt-0.5 text-ink-2">{s.methodology}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-ink-3 uppercase">Sample</dt>
            <dd className="mt-0.5 text-ink-2">{s.sample}</dd>
          </div>
          <div className="md:col-span-2">
            <dt className="text-xs font-semibold text-ink-3 uppercase">Key findings</dt>
            <dd>
              <ul className="mt-1 space-y-1 text-ink-2">
                {s.keyFindings.map((f, i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-ink-3" />
                    {f}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="md:col-span-2">
            <dt className="text-xs font-semibold text-ink-3 uppercase">Limitations & generalisability</dt>
            <dd className="mt-0.5 text-ink-2">{s.limitations}</dd>
          </div>
        </dl>
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4">
          <a
            href={href}
            {...(internal ? {} : { target: '_blank', rel: 'noreferrer' })}
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-accent px-3.5 text-sm font-medium text-white hover:bg-accent-strong"
          >
            {internal ? 'Open research page' : s.doi ? `doi:${s.doi}` : 'Open source'}
            {!internal && <ExternalLink className="size-3.5" aria-hidden />}
            {!internal && <span className="sr-only">(opens in new tab)</span>}
          </a>
          <Button onClick={copy} icon={copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}>
            {copied ? 'Copied' : 'Copy reference'}
          </Button>
          <span className="text-xs text-ink-3">
            {VERIFICATION_LABEL[s.verification]} · checked {s.accessed}
          </span>
        </div>
      </div>
    </li>
  )
}

export default function Library() {
  const [params, setParams] = useSearchParams()
  const focusId = params.get('source')
  const [q, setQ] = useState('')
  const [kind, setKind] = useState<'all' | EvidenceKind>('all')
  const [topic, setTopic] = useState('all')
  const [cited, setCited] = useState<'all' | 'yes' | 'no'>('all')
  const [sort, setSort] = useState<'author' | 'newest' | 'oldest'>('author')
  const [open, setOpen] = useState<string[]>(focusId ? [focusId] : [])

  useEffect(() => {
    if (!focusId) return
    setQ('')
    setKind('all')
    setTopic('all')
    setCited('all')
    setOpen((o) => (o.includes(focusId) ? o : [...o, focusId]))
    // Wait for the expanded entry and web fonts to settle before scrolling.
    const t = setTimeout(() => document.getElementById(`src-${focusId}`)?.scrollIntoView({ block: 'start', behavior: 'instant' }), 250)
    return () => clearTimeout(t)
  }, [focusId])

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    const list = SOURCES.filter((s) => {
      if (kind !== 'all' && s.kind !== kind) return false
      if (topic !== 'all' && !s.topics.includes(topic)) return false
      if (cited === 'yes' && !s.citedInDissertation) return false
      if (cited === 'no' && s.citedInDissertation) return false
      if (!needle) return true
      return [s.title, s.authors, s.venue, s.methodology, s.sample, s.geography, ...s.keyFindings, ...s.topics].join(' ').toLowerCase().includes(needle)
    })
    if (sort === 'newest') return [...list].sort((a, b) => b.year - a.year)
    if (sort === 'oldest') return [...list].sort((a, b) => a.year - b.year)
    return list
  }, [q, kind, topic, cited, sort])

  const reset = () => {
    setQ('')
    setKind('all')
    setTopic('all')
    setCited('all')
    if (focusId) setParams({})
  }

  const exportCsv = () =>
    downloadCsv(
      'ai-in-hr-evidence-library.csv',
      filtered.map((s) => ({
        id: s.id,
        reference: formatReference(s),
        authors: s.authors,
        year: s.year,
        title: s.title,
        venue: s.venue,
        evidence_type: KIND_LABELS[s.kind],
        methodology: s.methodology,
        sample: s.sample,
        geography: s.geography,
        key_findings: s.keyFindings.join(' | '),
        limitations: s.limitations,
        doi: s.doi ?? '',
        url: s.url.startsWith('/') ? '' : s.url,
        cited_in_dissertation: s.citedInDissertation ? 'Yes' : 'No',
        verification: VERIFICATION_LABEL[s.verification],
        accessed: s.accessed,
      })),
    )

  const counts = useMemo(() => {
    const c: Partial<Record<EvidenceKind, number>> = {}
    SOURCES.forEach((s) => (c[s.kind] = (c[s.kind] ?? 0) + 1))
    return c
  }, [])

  return (
    <div className="fade-in">
      <PageHeader
        eyebrow="Evidence Library"
        title="Every source behind every number"
        lede="All studies, statistics, laws and reports used in the application, with methodology, sample, scope, key findings and limitations. Search, filter, and export references as CSV or RIS (for Zotero, Mendeley or EndNote)."
      >
        <ul className="flex flex-wrap gap-2 text-xs">
          {(Object.keys(counts) as EvidenceKind[]).map((k) => (
            <li key={k}>
              <button type="button" onClick={() => setKind(kind === k ? 'all' : k)} aria-pressed={kind === k} className="rounded-md focus-visible:outline-2">
                <span className={cx('inline-flex items-center gap-1', kind === k && 'ring-2 ring-accent rounded-md')}>
                  <KindBadge kind={k} />
                  <span className="tabular pr-1 text-ink-3">{counts[k]}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Card className="p-4">
          <div className="grid gap-3 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] lg:items-end">
            <div>
              <p className="mb-1 text-xs font-medium text-ink-3">Search</p>
              <SearchInput value={q} onChange={setQ} placeholder="Title, author, method, finding…" label="Search the evidence library" />
            </div>
            <SelectFilter
              label="Evidence type"
              value={kind}
              onChange={setKind}
              options={[{ value: 'all', label: 'All types' }, ...(Object.keys(KIND_LABELS) as EvidenceKind[]).map((k) => ({ value: k, label: KIND_LABELS[k] }))]}
            />
            <SelectFilter label="Topic" value={topic} onChange={setTopic} options={[{ value: 'all', label: 'All topics' }, ...ALL_TOPICS.map((t) => ({ value: t, label: t }))]} />
            <SelectFilter
              label="Dissertation"
              value={cited}
              onChange={setCited}
              options={[
                { value: 'all', label: 'All sources' },
                { value: 'yes', label: 'Cited in dissertation' },
                { value: 'no', label: 'Added for this app' },
              ]}
            />
            <SelectFilter
              label="Sort"
              value={sort}
              onChange={setSort}
              options={[
                { value: 'author', label: 'Author A–Z' },
                { value: 'newest', label: 'Newest first' },
                { value: 'oldest', label: 'Oldest first' },
              ]}
            />
          </div>
        </Card>

        <div className="mt-5 mb-4 flex flex-wrap items-center justify-between gap-3">
          <ResultCount shown={filtered.length} total={SOURCES.length} noun="sources" />
          <div className="flex flex-wrap gap-2">
            <Button variant="ghost" onClick={() => setOpen(open.length ? [] : filtered.map((s) => s.id))}>
              {open.length ? 'Collapse all' : 'Expand all'}
            </Button>
            <Button
              onClick={() => downloadText('ai-in-hr-references.ris', toRis(filtered), 'application/x-research-info-systems')}
              icon={<FileDown className="size-4" aria-hidden />}
            >
              Export RIS
            </Button>
            <ExportButton onClick={exportCsv} count={filtered.length} />
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="No sources match these filters" body="Try a broader search term or clear the filters." onReset={reset} />
        ) : (
          <ul className="space-y-3">
            {filtered.map((s) => (
              <SourceEntry
                key={s.id}
                s={s}
                open={open.includes(s.id)}
                onToggle={() => setOpen((o) => (o.includes(s.id) ? o.filter((x) => x !== s.id) : [...o, s.id]))}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
