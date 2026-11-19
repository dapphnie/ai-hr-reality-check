import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, Megaphone, MessageSquareQuote } from 'lucide-react'
import { Callout, Card, ChipGroup, Section, SelectFilter, cx } from '../components/ui/primitives'
import { ASSESSMENT_ORDER, AssessmentBadge, LayerTag, SourceList, SourceRef } from '../components/ui/evidence'
import { ChartCard, Legend } from '../components/charts/ChartCard'
import { HBarChart, StackedDistribution } from '../components/charts/Charts'
import { CIPD_DISTRIBUTION, CIPD_PERCEIVED, CIPD_USES, SIZE_BREAKDOWNS } from '../data/adoption'
import { CLAIMS } from '../data/claims'
import { LIFECYCLE } from '../data/concepts'
import type { AssessmentLabel } from '../types'

type Region = 'UK' | 'EU' | 'Qualitative'

interface Kpi {
  value: string
  label: string
  context: string
  caveat: string
  sourceIds: string[]
  region: Region
  layer: 'data' | 'qualitative'
}

const KPIS: Kpi[] = [
  {
    value: '31%',
    label: 'of UK organisations report using AI or machine learning in recruitment (2024)',
    context: 'Up from 16% in 2022 · n = 1,016 HR professionals',
    caveat: 'Derived from answer shares; a “don’t know” option (7%) was added in 2024.',
    sourceIds: ['cipd-rtp-2024'],
    region: 'UK',
    layer: 'data',
  },
  {
    value: '80%',
    label: 'of UK SMEs report not using AI in recruitment (2026)',
    context: 'Compared with 38% of larger organisations · n = 1,014',
    caveat: '“Not using” is what respondents recognise and report — it does not capture platform-embedded functions.',
    sourceIds: ['cipd-rtp-2026'],
    region: 'UK',
    layer: 'data',
  },
  {
    value: '30%',
    label: 'of UK businesses used at least one AI technology (Sep 2026)',
    context: '38% of those with 10+ employees · ONS BICS',
    caveat: 'Any business use, not recruitment-specific; count-weighted, so not comparable with CIPD.',
    sourceIds: ['ons-bics-oct-2026'],
    region: 'UK',
    layer: 'data',
  },
  {
    value: '0.62%',
    label: 'of EU enterprises (10+) used AI for HR or recruitment (2021)',
    context: '8.11% of AI-using enterprises · the only year collected',
    caveat: 'Eurostat dropped the HR purpose after 2021, so there is no current EU recruitment series.',
    sourceIds: ['eurostat-ai-2025'],
    region: 'EU',
    layer: 'data',
  },
  {
    value: '8',
    label: 'interviews with small hospitality employers in Brighton',
    context: 'Use, delegation, withdrawal and deliberate non-use observed',
    caveat: 'Qualitative and contextual — illustrates what binary adoption measures leave out; not a prevalence estimate.',
    sourceIds: ['ugur-2026'],
    region: 'Qualitative',
    layer: 'qualitative',
  },
]

const GAPS = [
  { title: 'Recognition is assumed', body: 'Surveys count AI that respondents recognise. Ranking and filtering embedded in job boards may never be reported as “AI use”.' },
  { title: 'No current recruitment series for the EU', body: 'Eurostat collected an HR/recruitment purpose only in 2021. Official UK statistics (ONS) have no HR purpose category at all.' },
  { title: 'Different units, different stories', body: 'CIPD weights by employment (large employers dominate); ONS and Eurostat weight by business count (small firms dominate).' },
  { title: '“No use” hides several positions', body: 'Never-use, deliberate non-use and withdrawal after trial collapse into one answer.' },
  { title: 'Use is not the same as outcome', body: 'Adoption surveys say nothing about whether AI improved hiring. Self-reported benefits come from users of the tools.' },
]

const STAGE_TO_CIPD: Record<string, string[]> = {
  'Workforce planning & job design': ['Planning'],
  'Advertising & sourcing': ['Attraction', 'Sourcing'],
  'Application & screening': ['Screening', 'Communication'],
  Assessment: ['Selection'],
  'Interview & selection': ['Scheduling'],
  'Offer & onboarding': [],
}

const SIZE_OPTIONS = ['cipd-2026-size', 'bics-2026-size', 'eurostat-2025-size', 'dsit-2025-size'] as const

export default function Overview() {
  const [regions, setRegions] = useState<Region[]>(['UK', 'EU', 'Qualitative'])
  const [sizeId, setSizeId] = useState<string>('eurostat-2025-size')
  const size = SIZE_BREAKDOWNS.find((s) => s.id === sizeId)!

  const visibleKpis = KPIS.filter((k) => regions.includes(k.region))
  const labelCounts = useMemo(() => {
    const c = Object.fromEntries(ASSESSMENT_ORDER.map((l) => [l, 0])) as Record<AssessmentLabel, number>
    CLAIMS.forEach((cl) => c[cl.assessment]++)
    return c
  }, [])

  return (
    <div className="fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-navy text-[#f3f1ea]">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <p className="text-[0.72rem] font-semibold tracking-[0.12em] text-[#9cc9c4] uppercase">An evidence-based dashboard · HR technology & responsible AI</p>
          <h1 className="mt-4 max-w-4xl text-4xl leading-[1.08] font-medium text-white sm:text-5xl md:text-6xl">AI in HR: The Reality Check</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#d7dcdc] md:text-xl">
            How AI in recruitment is <em className="text-white not-italic underline decoration-[#9cc9c4]/60 underline-offset-4">marketed</em>, how its adoption is{' '}
            <em className="text-white not-italic underline decoration-[#9cc9c4]/60 underline-offset-4">measured</em>, and how recruitment technology is actually{' '}
            <em className="text-white not-italic underline decoration-[#9cc9c4]/60 underline-offset-4">encountered</em> by employers.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/claims" className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#f3f1ea] px-5 text-sm font-semibold text-navy hover:bg-white">
              Test the claims <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link to="/research" className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/25 px-5 text-sm font-semibold text-white hover:bg-white/10">
              Read the research
            </Link>
          </div>
          <dl className="mt-12 grid max-w-4xl gap-6 border-t border-white/15 pt-8 sm:grid-cols-3">
            {[
              { Icon: Megaphone, t: 'The claims', d: 'What vendors and industry reports say AI does for hiring.', to: '/claims' },
              { Icon: BarChart3, t: 'The measurement', d: 'What surveys and official statistics actually count as adoption.', to: '/adoption' },
              { Icon: MessageSquareQuote, t: 'The practice', d: 'How small employers meet algorithms inside ordinary platforms.', to: '/research' },
            ].map(({ Icon, t, d, to }) => (
              <div key={t}>
                <dt>
                  <Link to={to} className="group inline-flex items-center gap-2 font-serif text-xl text-white">
                    <Icon aria-hidden className="size-5 text-[#9cc9c4]" />
                    <span className="group-hover:underline">{t}</span>
                  </Link>
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-[#c3cbcb]">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-16 px-4 pt-12 sm:px-6 lg:px-8">
        {/* KPIs */}
        <Section
          kicker="Key evidence"
          title="The headline numbers — with their small print"
          description="Each figure keeps its own definition, population and caveat. They are not interchangeable."
          actions={<ChipGroup label="Filter evidence by scope" options={['UK', 'EU', 'Qualitative'] as const} selected={regions} onToggle={(r) => setRegions((c) => (c.includes(r) ? c.filter((x) => x !== r) : [...c, r]))} />}
        >
          {visibleKpis.length === 0 ? (
            <div role="status" className="rounded-xl border border-dashed border-line-strong bg-surface p-8 text-center text-sm text-ink-2">
              Select at least one scope to show headline evidence.
            </div>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {visibleKpis.map((k) => (
                <li
                  key={k.label}
                  className={cx(
                    'flex flex-col rounded-xl border bg-surface p-5',
                    k.layer === 'qualitative' ? 'border-qual/40 border-l-[3px] border-l-qual' : 'border-line border-l-[3px] border-l-quant',
                  )}
                >
                  <LayerTag layer={k.layer} />
                  <p className={cx('tabular mt-3 font-serif text-4xl font-medium', k.layer === 'qualitative' ? 'text-qual' : 'text-ink')}>{k.value}</p>
                  <p className="mt-2 text-sm leading-snug font-medium text-ink">{k.label}</p>
                  <p className="mt-1 text-xs text-ink-3">{k.context}</p>
                  <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-ink-2">{k.caveat}</p>
                  <p className="mt-auto pt-3">
                    <SourceList ids={k.sourceIds} />
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Section>

        {/* Adoption over time + size */}
        <Section
          kicker="Reported adoption"
          title="Rising, but measured in very different ways"
          actions={
            <Link to="/adoption" className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
              Full adoption dashboard <ArrowRight className="size-4" aria-hidden />
            </Link>
          }
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <ChartCard
              title="UK organisations using AI/ML in recruitment (CIPD)"
              subtitle="Answer distribution, % of HR respondents · employment-weighted"
              legend={
                <Legend
                  items={[
                    { label: 'Use (derived)', color: '#2f6f9f' },
                    { label: 'Don’t know', color: '#b8a12a' },
                    { label: 'Don’t use', color: '#d6d2c8' },
                  ]}
                />
              }
              table={{
                caption: 'CIPD AI/ML in recruitment',
                columns: [
                  { key: 'year', label: 'Year' },
                  { key: 'use', label: 'Use %', numeric: true },
                  { key: 'dontKnow', label: 'Don’t know %', numeric: true },
                  { key: 'notUse', label: 'Don’t use %', numeric: true },
                  { key: 'n', label: 'n', numeric: true },
                ],
                rows: CIPD_DISTRIBUTION,
              }}
              footnote={
                <>
                  16% → 31% (2022–24) is the figure cited in the dissertation and confirmed on p.6 of the 2024 report. The 2026 value (~38%) is
                  derived; CIPD changed its sample criteria. <SourceList ids={['cipd-rtp-2024', 'cipd-rtp-2026']} />
                </>
              }
            >
              <StackedDistribution
                data={CIPD_DISTRIBUTION.map((d) => ({ label: d.year, use: d.use, dontKnow: d.dontKnow, notUse: d.notUse, note: d.note }))}
                keys={[
                  { key: 'use', label: 'Use (derived)', color: '#2f6f9f' },
                  { key: 'dontKnow', label: 'Don’t know', color: '#b8a12a', textOnBar: '#1c1f22' },
                  { key: 'notUse', label: 'Don’t use', color: '#d6d2c8', textOnBar: '#1c1f22' },
                ]}
              />
            </ChartCard>

            <ChartCard
              title="SMEs and larger organisations"
              subtitle={<>{size.measure} · {size.period}</>}
              table={{
                caption: size.label,
                columns: [
                  { key: 'band', label: 'Size band' },
                  { key: 'value', label: '%', numeric: true },
                ],
                rows: size.bands,
              }}
              footnote={
                <>
                  One source at a time: size bands and definitions differ. <SourceList ids={[size.sourceId]} />
                </>
              }
            >
              <div className="mb-3 max-w-xs">
                <SelectFilter
                  label="Source"
                  value={sizeId}
                  onChange={setSizeId}
                  options={SIZE_OPTIONS.map((id) => ({ value: id, label: SIZE_BREAKDOWNS.find((s) => s.id === id)!.label }))}
                />
              </div>
              <HBarChart
                key={size.id}
                data={size.bands.map((b) => ({ label: b.band, value: b.value }))}
                color={size.inverted ? '#c9773a' : '#2f6f9f'}
                valueLabel={size.inverted ? 'Not using AI' : 'Using AI'}
                labelWidth={110}
              />
              {size.inverted && <p className="mt-1 text-xs font-medium text-claim">Bars show the share NOT using AI.</p>}
            </ChartCard>
          </div>
        </Section>

        {/* Claims vs evidence */}
        <Section
          kicker="Claimed benefits vs demonstrated outcomes"
          title="What users report, and what independent studies show"
          actions={
            <Link to="/claims" className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
              Claims vs Evidence Explorer <ArrowRight className="size-4" aria-hidden />
            </Link>
          }
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <ChartCard
              title="Perceived effects among UK AI users (CIPD 2024)"
              subtitle="% of organisations already using AI in recruitment (n = 281, unweighted) reporting an increase"
              table={{ caption: 'Perceived effects', columns: [{ key: 'effect', label: 'Effect' }, { key: 'value', label: '%', numeric: true }], rows: CIPD_PERCEIVED }}
              footnote={
                <>
                  Self-reported by adopters — not a measured outcome, and not a causal estimate. Note that 47% also report higher hiring costs.{' '}
                  <SourceList ids={['cipd-rtp-2024']} />
                </>
              }
            >
              <HBarChart data={CIPD_PERCEIVED.map((p) => ({ label: p.effect, value: p.value }))} color="#9a5b25" labelWidth={220} valueLabel="Reported increase" />
            </ChartCard>
            <Card className="flex flex-col p-5">
              <h3 className="font-sans text-[0.95rem] font-semibold text-ink">Assessment of {CLAIMS.length} common claims</h3>
              <p className="mt-1 text-[0.8rem] text-ink-3">Each judged against independent evidence, with reasoning shown in the explorer.</p>
              <div className="mt-4 flex h-3 overflow-hidden rounded-full" role="img" aria-label={ASSESSMENT_ORDER.map((l) => `${labelCounts[l]} ${l}`).join(', ')}>
                {ASSESSMENT_ORDER.filter((l) => labelCounts[l] > 0).map((l) => (
                  <span
                    key={l}
                    style={{ flexGrow: labelCounts[l] }}
                    className={cx(
                      'border-r-2 border-surface last:border-r-0',
                      l === 'Supported' && 'bg-supported',
                      l === 'Partially Supported' && 'bg-partial',
                      l === 'Mixed Evidence' && 'bg-mixed',
                      l === 'Insufficient Evidence' && 'bg-insufficient',
                      l === 'Unsupported' && 'bg-unsupported',
                    )}
                  />
                ))}
              </div>
              <ul className="mt-4 divide-y divide-line">
                {CLAIMS.map((c) => (
                  <li key={c.id}>
                    <Link to={`/claims?claim=${c.id}`} className="group flex items-center justify-between gap-3 py-2.5">
                      <span className="font-serif text-[0.98rem] leading-snug text-ink group-hover:text-accent">“{c.claim}”</span>
                      <AssessmentBadge label={c.assessment} size="sm" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Section>

        {/* Lifecycle */}
        <Section
          kicker="Across the recruitment lifecycle"
          title="Where AI shows up in hiring"
          description={
            <>
              Typical applications by stage (after <SourceRef id="hunkenschroer-2022" />), with the share of UK HR respondents reporting AI at
              that stage in 2026 where CIPD measures it.
            </>
          }
        >
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {LIFECYCLE.map((s, i) => {
              const cipd = CIPD_USES.filter((u) => STAGE_TO_CIPD[s.stage]?.includes(u.stage))
              return (
                <li key={s.stage} className="flex flex-col rounded-xl border border-line bg-surface p-4">
                  <span className="tabular text-xs font-semibold text-accent">0{i + 1}</span>
                  <p className="mt-1 font-serif text-[1.05rem] leading-snug text-ink">{s.stage}</p>
                  <ul className="mt-2 space-y-1 text-xs leading-snug text-ink-2">
                    {s.applications.map((a) => (
                      <li key={a}>· {a}</li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-3">
                    {cipd.length > 0 ? (
                      <ul className="space-y-1 border-t border-line pt-2">
                        {cipd.map((u) => (
                          <li key={u.stage} className="flex items-center justify-between text-xs">
                            <span className="text-ink-3">{u.stage}</span>
                            <span className="tabular font-semibold text-quant">{u.y2026}%</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="border-t border-line pt-2 text-xs text-ink-3">No comparable 2026 measure</p>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
          <p className="mt-2">
            <SourceList ids={['cipd-rtp-2026', 'hunkenschroer-2022']} />
          </p>
        </Section>

        {/* Gaps */}
        <Section kicker="Evidence gaps" title="What adoption measurement misses">
          <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
            <ul className="grid gap-3 sm:grid-cols-2">
              {GAPS.map((g, i) => (
                <Card as="li" key={g.title} className={cx('p-5', i === 0 && 'sm:col-span-2')}>
                  <p className="font-serif text-lg text-ink">{g.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-2">{g.body}</p>
                </Card>
              ))}
            </ul>
            <Card className="flex flex-col p-6">
              <LayerTag layer="qualitative" />
              <h3 className="mt-3 text-2xl text-ink">Beyond Adoption</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">
                In eight small Brighton hospitality businesses, platforms were used extensively, combined with trusted referrals, delegated to a
                deputy, abandoned after a poor trial, or deliberately avoided — while the decision about who to hire stayed with managers.
                Recognition of AI was narrower than platform use.
              </p>
              <p className="mt-5 border-l-[3px] border-qual pl-4 font-serif text-xl leading-snug text-ink">
                Knowing how to use a recruitment platform was not the same as knowing how it works.
                <span className="mt-1.5 block font-sans text-xs text-ink-3">Theme 3: platform understanding and control, Beyond Adoption (2026)</span>
              </p>
              <Callout title="Analytical, not statistical" className="mt-5">
                The study does not claim adoption surveys are wrong — it shows they measure a different object: recognised use.
              </Callout>
              <Link to="/research" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
                Explore the findings and framework <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Card>
          </div>
        </Section>
      </div>
    </div>
  )
}
