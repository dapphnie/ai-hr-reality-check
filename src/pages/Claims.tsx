import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ExternalLink, Megaphone, MinusCircle, PlusCircle } from 'lucide-react'
import { Button, Card, ChipGroup, EmptyState, ExportButton, PageHeader, ResultCount, SearchInput, SelectFilter, cx } from '../components/ui/primitives'
import { ASSESSMENT_ORDER, AssessmentBadge, KindBadge, LayerTag, SourceRef, assessmentBlurb } from '../components/ui/evidence'
import { CLAIMS } from '../data/claims'
import { downloadCsv } from '../lib/csv'
import { formatReference, getSource } from '../lib/sources'
import type { AssessmentLabel, Claim, ClaimCategory, EvidencePoint } from '../types'

const CATEGORIES = [...new Set(CLAIMS.map((c) => c.category))] as ClaimCategory[]

function EvidenceList({ items, tone }: { items: EvidencePoint[]; tone: 'support' | 'qualify' }) {
  const Icon = tone === 'support' ? PlusCircle : MinusCircle
  if (items.length === 0) {
    return <p className="rounded-lg border border-dashed border-line-strong p-3 text-sm text-ink-3">No independent supporting evidence was identified.</p>
  }
  return (
    <ul className="space-y-2.5">
      {items.map((e, i) => (
        <li key={i} className="flex gap-2.5 rounded-lg bg-paper p-3">
          <Icon aria-hidden className={cx('mt-0.5 size-4 shrink-0', tone === 'support' ? 'text-supported' : 'text-unsupported')} />
          <div className="min-w-0 text-sm">
            <p className="leading-relaxed text-ink-2">{e.finding}</p>
            <p className="mt-1 text-xs text-ink-3">
              <SourceRef id={e.sourceId} /> · {e.design}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

function ClaimCard({ c, open, onToggle }: { c: Claim; open: boolean; onToggle: () => void }) {
  const refs = [...new Set([c.claimOrigin.sourceId, ...c.supporting.map((e) => e.sourceId), ...c.qualifying.map((e) => e.sourceId)].filter(Boolean) as string[])]
  return (
    <li id={`claim-${c.id}`} className={cx('scroll-mt-24 rounded-xl border bg-surface transition-colors', open ? 'border-accent/50 shadow-sm' : 'border-line')}>
      <button type="button" onClick={onToggle} aria-expanded={open} aria-controls={`claim-body-${c.id}`} className="flex w-full flex-col gap-3 p-5 text-left md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium text-ink-3">{c.category}</p>
          <p className="mt-1 font-serif text-xl leading-snug text-ink md:text-[1.4rem]">“{c.claim}”</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <AssessmentBadge label={c.assessment} />
          <span className="text-xs font-medium text-accent">{open ? 'Hide evidence' : 'Show evidence'}</span>
        </div>
      </button>
      <div id={`claim-body-${c.id}`} hidden={!open} className="border-t border-line p-5">
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-lg border border-claim/20 bg-claim-soft/60 p-4 lg:col-span-2">
            <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-claim uppercase">
              <Megaphone aria-hidden className="size-3.5" /> The claim and its source
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">{c.claimOrigin.description}</p>
            {c.claimOrigin.quote && <p className="mt-2 font-serif text-[1.02rem] text-ink">“{c.claimOrigin.quote}”</p>}
            {c.claimOrigin.sourceId && (
              <p className="mt-2 text-xs text-ink-3">
                <SourceRef id={c.claimOrigin.sourceId} />
              </p>
            )}
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-ink">Supporting evidence</p>
            <EvidenceList items={c.supporting} tone="support" />
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-ink">Contradictory or qualifying evidence</p>
            <EvidenceList items={c.qualifying} tone="qualify" />
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-line p-5">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-semibold text-ink">Evidence assessment</p>
            <AssessmentBadge label={c.assessment} size="sm" />
            <span className="text-xs text-ink-3">{assessmentBlurb(c.assessment)}</span>
          </div>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-ink">{c.reasoning}</p>
        </div>

        <dl className="mt-5 grid gap-4 text-sm md:grid-cols-3">
          <div>
            <dt className="text-xs font-semibold text-ink-3 uppercase">Methodology & samples</dt>
            <dd className="mt-1 leading-relaxed text-ink-2">{c.methodologyNote}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-ink-3 uppercase">Publication period</dt>
            <dd className="tabular mt-1 text-ink-2">{c.evidencePeriod}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-ink-3 uppercase">Limitations & generalisability</dt>
            <dd className="mt-1 leading-relaxed text-ink-2">{c.limitations}</dd>
          </div>
        </dl>

        {c.dissertationLink && (
          <div className="mt-5 rounded-lg border-l-[3px] border-qual bg-qual-soft/60 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <LayerTag layer="qualitative" />
              <span className="text-xs text-ink-3">Context from Beyond Adoption (n = 8) — illustrative, not used in the assessment as prevalence evidence</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">{c.dissertationLink}</p>
          </div>
        )}

        <details className="mt-5 group">
          <summary className="cursor-pointer text-sm font-semibold text-accent">Full references ({refs.length})</summary>
          <ul className="mt-3 space-y-2.5">
            {refs.map((id) => {
              const s = getSource(id)
              if (!s) return null
              const href = s.doi ? `https://doi.org/${s.doi}` : s.url
              return (
                <li key={id} className="text-sm leading-relaxed text-ink-2">
                  <span className="mr-2 inline-block align-middle">
                    <KindBadge kind={s.kind} />
                  </span>
                  {formatReference(s).replace(/ Available at: .*$/, '')}{' '}
                  {href.startsWith('/') ? (
                    <Link to={href} className="font-medium text-accent underline">
                      View
                    </Link>
                  ) : (
                    <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-0.5 font-medium text-accent underline">
                      Source <ExternalLink aria-hidden className="size-3" />
                      <span className="sr-only">(opens in new tab)</span>
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </details>
      </div>
    </li>
  )
}

export default function Claims() {
  const [params, setParams] = useSearchParams()
  const focus = params.get('claim')
  const [q, setQ] = useState('')
  const [category, setCategory] = useState<'all' | ClaimCategory>('all')
  const [labels, setLabels] = useState<AssessmentLabel[]>([])
  const [open, setOpen] = useState<string[]>(focus ? [focus] : [])

  useEffect(() => {
    if (!focus) return
    setOpen((o) => (o.includes(focus) ? o : [...o, focus]))
    const t = setTimeout(() => document.getElementById(`claim-${focus}`)?.scrollIntoView({ block: 'start', behavior: 'instant' }), 250)
    return () => clearTimeout(t)
  }, [focus])

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return CLAIMS.filter((c) => {
      if (category !== 'all' && c.category !== category) return false
      if (labels.length && !labels.includes(c.assessment)) return false
      if (!needle) return true
      const text = [
        c.claim,
        c.category,
        c.claimOrigin.description,
        c.reasoning,
        c.methodologyNote,
        c.limitations,
        ...[...c.supporting, ...c.qualifying].flatMap((e) => [e.finding, e.design, getSource(e.sourceId)?.shortCite ?? '']),
      ]
        .join(' ')
        .toLowerCase()
      return text.includes(needle)
    })
  }, [q, category, labels])

  const reset = () => {
    setQ('')
    setCategory('all')
    setLabels([])
    if (focus) setParams({})
  }

  const exportCsv = () =>
    downloadCsv(
      'ai-recruitment-claims-vs-evidence.csv',
      filtered.map((c) => ({
        claim: c.claim,
        category: c.category,
        assessment: c.assessment,
        reasoning: c.reasoning,
        claim_origin: c.claimOrigin.description,
        claim_source: c.claimOrigin.sourceId ? getSource(c.claimOrigin.sourceId)?.shortCite ?? '' : '',
        supporting_evidence: c.supporting.map((e) => `${e.finding} [${getSource(e.sourceId)?.shortCite}; ${e.design}]`).join(' | '),
        qualifying_evidence: c.qualifying.map((e) => `${e.finding} [${getSource(e.sourceId)?.shortCite}; ${e.design}]`).join(' | '),
        methodology: c.methodologyNote,
        evidence_period: c.evidencePeriod,
        limitations: c.limitations,
        dissertation_context: c.dissertationLink ?? '',
      })),
    )

  const counts = useMemo(() => Object.fromEntries(ASSESSMENT_ORDER.map((l) => [l, CLAIMS.filter((c) => c.assessment === l).length])), [])

  return (
    <div className="fade-in">
      <PageHeader
        eyebrow="Claims vs Evidence Explorer"
        title="Testing what is said about AI in recruitment"
        lede="Common claims, where they come from, and what independent research actually shows. Every assessment is judged against the claim as stated, with the reasoning written out."
      >
        <ul className="flex flex-wrap gap-2">
          {ASSESSMENT_ORDER.map((l) => (
            <li key={l} className="flex items-center gap-1.5">
              <AssessmentBadge label={l} size="sm" />
              <span className="tabular text-xs text-ink-3">{counts[l]}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-ink-3">
          <Link to="/methodology#labels" className="underline">How labels are assigned</Link>
        </p>
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Card className="space-y-4 p-4">
          <div className="grid gap-3 md:grid-cols-[2fr_1fr] md:items-end">
            <div>
              <p className="mb-1 text-xs font-medium text-ink-3">Search claims, findings and sources</p>
              <SearchInput value={q} onChange={setQ} placeholder="e.g. bias, tenure, SHRM, field experiment…" label="Search claims" />
            </div>
            <SelectFilter
              label="Category"
              value={category}
              onChange={setCategory}
              options={[{ value: 'all', label: 'All categories' }, ...CATEGORIES.map((c) => ({ value: c, label: c }))]}
            />
          </div>
          <div>
            <p className="mb-1.5 text-xs font-medium text-ink-3">Evidence assessment</p>
            <ChipGroup
              label="Filter by evidence assessment"
              options={ASSESSMENT_ORDER}
              selected={labels}
              onToggle={(l) => setLabels((c) => (c.includes(l) ? c.filter((x) => x !== l) : [...c, l]))}
            />
          </div>
        </Card>

        <div className="mt-5 mb-4 flex flex-wrap items-center justify-between gap-3">
          <ResultCount shown={filtered.length} total={CLAIMS.length} noun="claims" />
          <div className="flex flex-wrap gap-2">
            <Button variant="ghost" onClick={() => setOpen(open.length ? [] : filtered.map((c) => c.id))}>
              {open.length ? 'Collapse all' : 'Expand all'}
            </Button>
            <ExportButton onClick={exportCsv} count={filtered.length} />
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="No claims match" body="Try another search term, or clear the category and label filters." onReset={reset} />
        ) : (
          <ul className="space-y-3">
            {filtered.map((c) => (
              <ClaimCard key={c.id} c={c} open={open.includes(c.id)} onToggle={() => setOpen((o) => (o.includes(c.id) ? o.filter((x) => x !== c.id) : [...o, c.id]))} />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
