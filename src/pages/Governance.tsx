import { useEffect, useMemo, useState } from 'react'
import { CheckSquare, ExternalLink, RotateCcw, Square } from 'lucide-react'
import { Button, Callout, Card, ChipGroup, ExportButton, PageHeader, Section, SelectFilter, cx } from '../components/ui/primitives'
import { LayerTag, SourceList } from '../components/ui/evidence'
import { DOMAINS, PROVISIONS, QUESTIONS, TIMELINE, type DomainId, type Jurisdiction, type Provision } from '../data/governance'
import { downloadCsv } from '../lib/csv'
import { getSource } from '../lib/sources'

const STATUS_STYLE: Record<Provision['statusTone'], string> = {
  'in-force': 'bg-[#e6f2ec] text-supported',
  pending: 'bg-[#f7f0dc] text-mixed',
  guidance: 'bg-legal-soft text-legal',
  draft: 'bg-sunken text-ink-2',
}

const STORAGE_KEY = 'aihr.checklist.v1'

function loadChecked(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

function ProvisionCard({ p }: { p: Provision }) {
  return (
    <li className="rounded-lg border border-line bg-surface p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className={cx('rounded px-1.5 py-0.5 text-[0.7rem] font-semibold', STATUS_STYLE[p.statusTone])}>{p.status}</span>
      </div>
      <p className="mt-2 text-sm font-semibold text-ink">{p.instrument}</p>
      <p className="text-xs text-ink-3">{p.provision}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-2">{p.summary}</p>
      <a href={p.url} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline">
        Official text <ExternalLink className="size-3" aria-hidden />
        <span className="sr-only">(opens in new tab)</span>
      </a>
    </li>
  )
}

export default function Governance() {
  const [domainId, setDomainId] = useState<DomainId>('bias')
  const [juris, setJuris] = useState<Jurisdiction[]>(['UK', 'EU'])
  const [checked, setChecked] = useState<string[]>(loadChecked)
  const [qDomain, setQDomain] = useState<'all' | DomainId>('all')
  const [qJuris, setQJuris] = useState<'Both' | Jurisdiction>('Both')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked))
    } catch {
      /* storage unavailable: checklist still works for this visit */
    }
  }, [checked])

  const domain = DOMAINS.find((d) => d.id === domainId)!
  const provisions = PROVISIONS.filter((p) => p.domains.includes(domainId) && juris.includes(p.jurisdiction))
  const domainQs = QUESTIONS.filter((q) => q.domain === domainId)

  const visibleQs = useMemo(
    () =>
      QUESTIONS.filter((q) => (qDomain === 'all' || q.domain === qDomain) && (qJuris === 'Both' || q.jurisdictions.includes(qJuris))),
    [qDomain, qJuris],
  )
  const done = visibleQs.filter((q) => checked.includes(q.id)).length

  const toggleJuris = (j: Jurisdiction) =>
    setJuris((cur) => (cur.includes(j) ? (cur.length === 1 ? cur : cur.filter((x) => x !== j)) : [...cur, j]))
  const toggleQ = (id: string) => setChecked((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]))

  const exportChecklist = () =>
    downloadCsv(
      'ai-recruitment-procurement-checklist.csv',
      visibleQs.map((q) => ({
        domain: DOMAINS.find((d) => d.id === q.domain)!.title,
        question: q.question,
        rationale: q.why,
        jurisdictions: q.jurisdictions.join(' / '),
        sources: q.sourceIds.map((id) => getSource(id)?.shortCite ?? id).join('; '),
        addressed: checked.includes(q.id) ? 'Yes' : 'No',
      })),
    )

  return (
    <div className="fade-in">
      <PageHeader
        eyebrow="AI Governance & Risk Explorer"
        title="Responsible AI in recruitment, UK and EU"
        lede="Eight risk domains, the legal and regulatory provisions that apply to each, and the questions HR teams should be able to answer before procuring or switching on AI-enabled recruitment technology."
      >
        <div className="flex flex-wrap items-center gap-2 text-xs text-ink-3">
          <LayerTag layer="law" />
          <span>Legal status checked against official sources on 22 October 2026. Educational summary — not legal advice.</span>
        </div>
      </PageHeader>

      <div className="mx-auto max-w-7xl space-y-16 px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          <Callout tone="warning" title="UK: automated decision-making rules changed in February 2026">
            The Data (Use and Access) Act 2025 replaced UK GDPR Article 22 with Articles 22A–22D from 5 February 2026. The ICO’s final
            guidance on the new rules had not been published by October 2026 (a draft was consulted on in spring 2026).
          </Callout>
          <Callout tone="warning" title="EU: high-risk recruitment obligations deferred to December 2027">
            Regulation (EU) 2026/1744 (the AI Omnibus) moved the Annex III high-risk obligations — which cover recruitment and selection —
            from 2 August 2026 to 2 December 2027. The workplace emotion-recognition ban has applied since 2 February 2025.
          </Callout>
        </div>

        <Section
          id="domains"
          kicker="Risk domains"
          title="Explore by risk"
          description="Select a domain to see the evidence of risk, how UK and EU rules address it, and the corresponding procurement questions."
          actions={<ChipGroup label="Jurisdiction" options={['UK', 'EU'] as const} selected={juris} onToggle={toggleJuris} />}
        >
          <div role="tablist" aria-label="Risk domains" className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {DOMAINS.map((d) => (
              <button
                key={d.id}
                role="tab"
                id={`dom-${d.id}`}
                aria-selected={d.id === domainId}
                aria-controls="domain-panel"
                onClick={() => setDomainId(d.id)}
                className={cx(
                  'rounded-lg border px-3 py-3 text-left text-sm font-medium transition-colors',
                  d.id === domainId ? 'border-accent bg-accent-soft text-accent-strong' : 'border-line bg-surface text-ink-2 hover:border-line-strong',
                )}
              >
                {d.title}
              </button>
            ))}
          </div>

          <div id="domain-panel" role="tabpanel" aria-labelledby={`dom-${domainId}`} className="mt-5 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="text-xl text-ink">{domain.title}</h3>
                <p className="mt-3 text-sm font-semibold text-ink">The risk</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-2">{domain.risk}</p>
                <p className="mt-4 text-sm font-semibold text-ink">What the evidence shows</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-2">{domain.evidence}</p>
                <p className="mt-3">
                  <SourceList ids={domain.evidenceSourceIds} />
                </p>
              </Card>
              {domain.dissertationLink && (
                <div className="rounded-xl border-l-[3px] border-qual bg-qual-soft/60 p-4">
                  <LayerTag layer="qualitative" />
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{domain.dissertationLink}</p>
                  <p className="mt-1 text-xs text-ink-3">Beyond Adoption (2026), n = 8 — illustrative, not representative.</p>
                </div>
              )}
              <Card className="p-5">
                <p className="text-sm font-semibold text-ink">Questions to ask ({domainQs.length})</p>
                <ul className="mt-2 space-y-2">
                  {domainQs.map((q) => (
                    <li key={q.id} className="text-sm leading-snug text-ink-2">
                      <span className="mr-1 text-accent">→</span>
                      {q.question}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {(['UK', 'EU'] as const).map((j) => (
                <div key={j} className={cx(!juris.includes(j) && 'hidden')}>
                  <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink">
                    <span className="rounded bg-navy px-1.5 py-0.5 text-[0.7rem] text-white">{j}</span>
                    {j === 'UK' ? 'United Kingdom' : 'European Union'}
                  </p>
                  {provisions.filter((p) => p.jurisdiction === j).length === 0 ? (
                    <p className="rounded-lg border border-dashed border-line-strong p-4 text-sm text-ink-3">
                      No {j} provision in this dataset maps directly to this domain.
                    </p>
                  ) : (
                    <ul className="space-y-3">
                      {provisions
                        .filter((p) => p.jurisdiction === j)
                        .map((p) => (
                          <ProvisionCard key={p.id} p={p} />
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section
          id="control"
          kicker="A distinctive risk"
          title="Perceived versus actual algorithmic control"
          description="Most governance tools assume an organisation knows which AI it uses. Platform-mediated recruitment complicates that assumption."
        >
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Feeling in control',
                body: 'A manager retains the hiring decision and so reports full control — while ranking, matching or paid visibility upstream have already shaped which candidates were ever seen.',
                layer: 'interpretation' as const,
              },
              {
                title: 'Feeling controlled',
                body: 'A manager feels at the platform’s mercy. That perception guides action, but it is an algorithmic imaginary: it is not evidence of how the platform actually ranks candidates.',
                layer: 'qualitative' as const,
              },
              {
                title: 'What governance needs',
                body: 'An inventory of functions — not just products — that influence candidate access, filtering or progression, with named people who understand and oversee each one, and human review that is meaningful in the legal sense.',
                layer: 'interpretation' as const,
              },
            ].map((c) => (
              <Card key={c.title} className="p-5">
                <LayerTag layer={c.layer} />
                <p className="mt-2 font-serif text-lg text-ink">{c.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-2">{c.body}</p>
              </Card>
            ))}
          </div>
          <p className="mt-3">
            <SourceList ids={['ugur-2026', 'bucher-2017', 'cjeu-schufa-2023', 'ico-rewired-2026']} />
          </p>
        </Section>

        <Section
          id="checklist"
          kicker="Practical tool"
          title="Pre-procurement assessment questions"
          description="Work through the questions for a specific tool or platform. Ticks are saved in this browser only; export the list to share it with procurement, legal or a vendor."
          actions={
            <>
              <Button onClick={() => setChecked([])} variant="ghost" icon={<RotateCcw className="size-4" aria-hidden />}>
                Clear ticks
              </Button>
              <ExportButton onClick={exportChecklist} count={visibleQs.length} />
            </>
          }
        >
          <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_1fr_2fr] sm:items-end">
            <SelectFilter
              label="Domain"
              value={qDomain}
              onChange={setQDomain}
              options={[{ value: 'all', label: 'All domains' }, ...DOMAINS.map((d) => ({ value: d.id, label: d.title }))]}
            />
            <SelectFilter
              label="Jurisdiction"
              value={qJuris}
              onChange={setQJuris}
              options={[
                { value: 'Both', label: 'UK and EU' },
                { value: 'UK', label: 'Applies to UK' },
                { value: 'EU', label: 'Applies to EU' },
              ]}
            />
            <div>
              <p className="mb-1 text-xs font-medium text-ink-3" id="progress-label">
                Addressed: <span className="tabular">{done}</span> of <span className="tabular">{visibleQs.length}</span>
              </p>
              <div
                role="progressbar"
                aria-labelledby="progress-label"
                aria-valuemin={0}
                aria-valuemax={visibleQs.length}
                aria-valuenow={done}
                className="h-2.5 overflow-hidden rounded-full bg-sunken"
              >
                <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${visibleQs.length ? (done / visibleQs.length) * 100 : 0}%` }} />
              </div>
            </div>
          </div>
          <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
            {visibleQs.map((q) => {
              const on = checked.includes(q.id)
              return (
                <li key={q.id}>
                  <label className="flex cursor-pointer gap-3 p-4 hover:bg-paper">
                    <input type="checkbox" className="peer sr-only" checked={on} onChange={() => toggleQ(q.id)} />
                    <span aria-hidden className="mt-0.5 text-accent peer-focus-visible:rounded peer-focus-visible:outline-2 peer-focus-visible:outline-accent">
                      {on ? <CheckSquare className="size-5" /> : <Square className="size-5 text-ink-3" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={cx('block text-[0.93rem] leading-snug', on ? 'text-ink-3 line-through decoration-ink-3/40' : 'text-ink')}>
                        {q.question}
                      </span>
                      <span className="mt-1 block text-xs leading-snug text-ink-3">
                        <span className="font-medium text-ink-2">{DOMAINS.find((d) => d.id === q.domain)!.title}</span> · {q.jurisdictions.join(' / ')} ·{' '}
                        {q.why}
                      </span>
                    </span>
                  </label>
                </li>
              )
            })}
          </ul>
        </Section>

        <Section id="timeline" kicker="Regulatory timeline" title="How the rules have moved">
          <Card className="overflow-x-auto p-6">
            <ol className="relative min-w-[40rem] border-l border-line-strong pl-6">
              {TIMELINE.map((t) => {
                const future = t.date > '2026-10'
                return (
                  <li key={t.date + t.label} className="relative pb-5 last:pb-0">
                    <span
                      aria-hidden
                      className={cx(
                        'absolute top-1.5 -left-[1.95rem] size-3 rounded-full border-2 border-surface',
                        future ? 'bg-mixed' : t.jurisdiction === 'UK' ? 'bg-navy' : 'bg-quant',
                      )}
                    />
                    <p className="flex flex-wrap items-baseline gap-x-3">
                      <time className="tabular w-20 text-sm font-semibold text-ink">{t.date}</time>
                      <span className="rounded bg-sunken px-1.5 text-[0.7rem] font-semibold text-ink-2">{t.jurisdiction}</span>
                      <span className="text-sm text-ink-2">
                        {t.label}
                        {future && <span className="ml-2 text-xs font-medium text-mixed">(upcoming)</span>}
                      </span>
                    </p>
                  </li>
                )
              })}
            </ol>
          </Card>
        </Section>
      </div>
    </div>
  )
}
