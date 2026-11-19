import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, ScanEye } from 'lucide-react'
import { Callout, Card, ChipGroup, ExportButton, PageHeader, Section, SelectFilter, cx } from '../components/ui/primitives'
import { LayerTag, SourceList, SourceRef } from '../components/ui/evidence'
import { ChartCard, Legend, SERIES as PALETTE } from '../components/charts/ChartCard'
import { GroupedBars, HBarChart, StackedDistribution, TrendPanel } from '../components/charts/Charts'
import {
  CIPD_DISTRIBUTION,
  CIPD_USES,
  INDUSTRY_BREAKDOWNS,
  OECD_AM,
  POINTS,
  REGIONS,
  SERIES,
  SIZE_BREAKDOWNS,
  TECH_TYPES,
} from '../data/adoption'
import { CONCEPTS } from '../data/concepts'
import { downloadCsv } from '../lib/csv'
import { getSource } from '../lib/sources'

const TREND_SERIES = SERIES.filter((s) => POINTS.some((p) => p.seriesId === s.id && POINTS.filter((q) => q.seriesId === s.id).length > 1))
const FAMILIES = [...new Set(SERIES.map((s) => s.family))]
const COLOR_BY_FAMILY: Record<string, string> = Object.fromEntries(FAMILIES.map((f, i) => [f, PALETTE[i % PALETTE.length]]))

const YEAR_KEYS = [
  { key: 'y2021', label: '2021', color: '#c9d6e3' },
  { key: 'y2022', label: '2022', color: '#86a9c9' },
  { key: 'y2024', label: '2024', color: '#2f6f9f' },
  { key: 'y2026', label: '2026', color: '#1d3f5e' },
] as const

const VIS_ICON = { 'Usually captured': Eye, 'Partly captured': ScanEye, 'Rarely captured': EyeOff } as const

export default function Adoption() {
  const [selected, setSelected] = useState<string[]>(['cipd-recruitment', 'ons-bics-10plus', 'eurostat-any'])
  const [sizeId, setSizeId] = useState(SIZE_BREAKDOWNS[0].id)
  const [indId, setIndId] = useState<string>(INDUSTRY_BREAKDOWNS[0].id)
  const [years, setYears] = useState<string[]>(['2022', '2024', '2026'])

  const chosen = TREND_SERIES.filter((s) => selected.includes(s.id))
  const familiesChosen = [...new Set(chosen.map((s) => s.family))]
  const size = SIZE_BREAKDOWNS.find((s) => s.id === sizeId)!
  const ind = INDUSTRY_BREAKDOWNS.find((s) => s.id === indId)!

  const usesData = useMemo(
    () =>
      CIPD_USES.map((u) => ({
        stage: u.stage,
        full: u.use,
        y2021: u.y2021,
        y2022: u.y2022,
        y2024: u.y2024,
        y2026: u.y2026,
      })),
    [],
  )
  const yearSeries = YEAR_KEYS.filter((y) => years.includes(y.label)).map((y) => ({ ...y }))

  const toggleSeries = (label: string) => {
    const s = TREND_SERIES.find((x) => x.label === label)!
    setSelected((cur) => (cur.includes(s.id) ? cur.filter((x) => x !== s.id) : [...cur, s.id]))
  }

  const exportDataset = () =>
    downloadCsv(
      'ai-adoption-dataset.csv',
      POINTS.map((p) => {
        const s = SERIES.find((x) => x.id === p.seriesId)!
        return {
          point_id: p.id,
          series: s.label,
          comparability_family: s.family,
          value_pct: p.value,
          period: p.period,
          org_size: p.orgSize,
          industry: p.industry,
          hr_function: p.hrFunction,
          technology: p.technology,
          geography: p.geography,
          definition: s.definition,
          population: s.population,
          denominator: s.denominator,
          method: s.method,
          sample: s.sampleSize,
          note: p.note ?? '',
          page_ref: p.pageRef ?? '',
          source: getSource(p.sourceId)?.shortCite ?? p.sourceId,
          source_url: getSource(p.sourceId)?.url ?? '',
        }
      }),
    )

  return (
    <div className="fade-in">
      <PageHeader
        eyebrow="Adoption Reality Dashboard"
        title="What “AI adoption” figures actually measure"
        lede="Reported adoption by year, organisation size, industry, HR function, technology, region and survey method — with each figure kept inside its own definition. Where measures differ, the dashboard shows a comparability warning instead of combining them."
      >
        <div className="flex flex-wrap items-center gap-3">
          <LayerTag layer="data" />
          <ExportButton onClick={exportDataset} label="Export adoption dataset" count={POINTS.length} />
        </div>
      </PageHeader>

      <div className="mx-auto max-w-7xl space-y-16 px-4 pt-10 sm:px-6 lg:px-8">
        {/* Formal adoption vs platform mediation */}
        <Section
          id="objects"
          kicker="Before the numbers"
          title="Formal adoption is not the same as algorithmic mediation"
          description={
            <>
              Adoption surveys count technologies respondents <em>recognise and report</em>. Routine use of Indeed, LinkedIn or social media
              to recruit does not make an employer an AI adopter — but those platforms may still rank, match and filter candidates. The two are
              different empirical objects, and neither should be inferred from the other.
            </>
          }
        >
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {CONCEPTS.map((c) => {
              const Icon = VIS_ICON[c.surveyVisibility]
              return (
                <Card key={c.id} className="flex flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-serif text-lg leading-snug text-ink">{c.name}</p>
                    <span
                      className={cx(
                        'inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[0.7rem] font-semibold',
                        c.surveyVisibility === 'Usually captured' && 'bg-quant-soft text-quant',
                        c.surveyVisibility === 'Partly captured' && 'bg-[#f7f0dc] text-mixed',
                        c.surveyVisibility === 'Rarely captured' && 'bg-sunken text-ink-2',
                      )}
                    >
                      <Icon aria-hidden className="size-3.5" />
                      {c.surveyVisibility}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{c.definition}</p>
                  <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-ink-3">
                    <span className="font-semibold text-ink-2">In surveys: </span>
                    {c.surveyNote}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-ink-3">
                    <span className="font-semibold text-ink-2">Example: </span>
                    {c.example} (<SourceRef id={c.exampleSourceId} />)
                  </p>
                </Card>
              )
            })}
          </div>
          <p className="mt-3 text-xs text-ink-3">
            “Survey visibility” is an analytical judgement drawn from the dissertation’s argument, not a measured quantity.
          </p>
        </Section>

        {/* Trend explorer */}
        <Section
          id="by-year"
          kicker="Reported adoption by year"
          title="Trend explorer"
          description="Select series to compare. Each series gets its own panel: lines are never merged across sources, and a warning appears whenever the selection mixes measures."
        >
          <Card className="p-4">
            <p className="mb-2 text-xs font-medium text-ink-3">Series (multi-select)</p>
            <ChipGroup label="Series" options={TREND_SERIES.map((s) => s.label)} selected={chosen.map((s) => s.label)} onToggle={toggleSeries} />
          </Card>

          {chosen.length > 1 && (
            <Callout tone="warning" title={familiesChosen.length > 1 ? 'Comparability warning: these series measure different things' : 'Comparability note'} className="mt-4">
              {familiesChosen.length > 1 ? (
                <>
                  Your selection spans {familiesChosen.length} measurement families ({familiesChosen.join('; ')}). They differ in who answered
                  (HR professionals vs businesses), how results are weighted (by employment vs by business count), size thresholds, geography
                  and the definition of AI. Compare <strong>direction of change</strong> within each panel only — not levels across panels.
                </>
              ) : (
                <>All selected series are in the “{familiesChosen[0]}” family but still differ in population or threshold. Compare direction, not levels.</>
              )}
            </Callout>
          )}

          {chosen.length === 0 ? (
            <div role="status" className="mt-4 rounded-xl border border-dashed border-line-strong bg-surface p-10 text-center text-sm text-ink-2">
              Select at least one series above to draw a trend.
            </div>
          ) : (
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {chosen.map((s) => {
                const pts = POINTS.filter((p) => p.seriesId === s.id).sort((a, b) => a.year - b.year)
                const color = COLOR_BY_FAMILY[s.family]
                return (
                  <ChartCard
                    key={s.id}
                    title={s.label}
                    subtitle={
                      <>
                        <span className="font-medium text-ink-2">{s.family}</span> · {s.population}
                      </>
                    }
                    table={{
                      caption: s.label,
                      columns: [
                        { key: 'period', label: 'Period' },
                        { key: 'value', label: 'Value (%)', numeric: true },
                        { key: 'note', label: 'Note' },
                      ],
                      rows: pts.map((p) => ({ period: p.period, value: p.value, note: p.note ?? '' })),
                    }}
                    footnote={
                      <>
                        <p>
                          <span className="font-semibold text-ink-2">Definition:</span> {s.definition}
                        </p>
                        <p className="mt-1">
                          <span className="font-semibold text-ink-2">Weighting:</span> {s.denominator}. <span className="font-semibold text-ink-2">Sample:</span> {s.sampleSize}.
                        </p>
                        <ul className="mt-1 list-disc space-y-0.5 pl-4">
                          {s.caveats.map((c, i) => (
                            <li key={i}>{c}</li>
                          ))}
                        </ul>
                        <p className="mt-1.5">
                          <SourceList ids={[...new Set(pts.map((p) => p.sourceId))]} />
                        </p>
                      </>
                    }
                  >
                    <TrendPanel
                      color={color}
                      data={pts.map((p) => ({ year: p.year, value: p.value, period: p.period, note: p.note, derived: p.note?.startsWith('Derived') }))}
                    />
                    <p className="mt-1 flex items-center gap-3 text-[0.7rem] text-ink-3">
                      <span className="flex items-center gap-1">
                        <span aria-hidden className="inline-block size-2.5 rounded-full" style={{ background: color }} /> Published value
                      </span>
                      {pts.some((p) => p.note?.startsWith('Derived')) && (
                        <span className="flex items-center gap-1">
                          <span aria-hidden className="inline-block size-2.5 rounded-full border-2 bg-surface" style={{ borderColor: color }} /> Derived from
                          published answer shares
                        </span>
                      )}
                    </p>
                  </ChartCard>
                )
              })}
            </div>
          )}

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
            <ChartCard
              title="What the CIPD headline is made of"
              subtitle="Answer distribution to the AI/ML-in-recruitment question, % of respondents"
              legend={
                <Legend
                  items={[
                    { label: 'Use (derived)', color: '#2f6f9f' },
                    { label: 'Don’t know', color: '#b8a12a' },
                    { label: 'N/A – don’t use', color: '#d6d2c8' },
                  ]}
                />
              }
              table={{
                caption: 'CIPD AI/ML in recruitment answer distribution',
                columns: [
                  { key: 'year', label: 'Year' },
                  { key: 'use', label: 'Use (derived) %', numeric: true },
                  { key: 'dontKnow', label: 'Don’t know %', numeric: true },
                  { key: 'notUse', label: 'Don’t use %', numeric: true },
                  { key: 'n', label: 'n', numeric: true },
                  { key: 'note', label: 'Note' },
                ],
                rows: CIPD_DISTRIBUTION,
              }}
              footnote={
                <>
                  The “don’t know” option first appeared in 2024. Some 2024 respondents who would previously have answered “N/A” may now answer
                  “don’t know”, so the change from 16% to 31% cannot be read purely as behavioural growth. The 2026 sample added a screening
                  criterion. <SourceList ids={['cipd-rtp-2024', 'cipd-rtp-2026']} />
                </>
              }
            >
              <StackedDistribution
                data={CIPD_DISTRIBUTION.map((d) => ({ label: d.year, use: d.use, dontKnow: d.dontKnow, notUse: d.notUse, note: `n = ${d.n.toLocaleString()} · ${d.note}` }))}
                keys={[
                  { key: 'use', label: 'Use (derived)', color: '#2f6f9f' },
                  { key: 'dontKnow', label: 'Don’t know', color: '#b8a12a', textOnBar: '#1c1f22' },
                  { key: 'notUse', label: 'N/A – don’t use', color: '#d6d2c8', textOnBar: '#1c1f22' },
                ]}
              />
            </ChartCard>
            <Card className="p-5">
              <LayerTag layer="interpretation" />
              <h3 className="mt-2 font-sans text-[0.95rem] font-semibold text-ink">Reading the trend responsibly</h3>
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-ink-2">
                <li>Every series shows reported use rising since 2021–23. That direction is consistent across independent sources.</li>
                <li>
                  Levels are not comparable: CIPD weights by employment (so large employers dominate), while ONS and Eurostat weight by business
                  count (so small firms dominate).
                </li>
                <li>Only CIPD measures recruitment specifically. ONS and DSIT measure any business use of AI; Eurostat dropped its HR purpose after 2021.</li>
                <li>These are descriptive statistics. They do not show that AI caused any change in hiring outcomes.</li>
              </ul>
            </Card>
          </div>
        </Section>

        {/* Size */}
        <Section
          id="by-size"
          kicker="Organisation size"
          title="SMEs and larger organisations"
          description="Size bands are defined differently by each source, so breakdowns are shown one source at a time."
          actions={
            <div className="w-full sm:w-80">
              <SelectFilter label="Source & measure" value={sizeId} onChange={setSizeId} options={SIZE_BREAKDOWNS.map((s) => ({ value: s.id, label: s.label }))} />
            </div>
          }
        >
          <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <ChartCard
              title={size.label}
              subtitle={`${size.measure} · ${size.period}`}
              table={{
                caption: size.label,
                columns: [
                  { key: 'band', label: 'Size band' },
                  { key: 'value', label: size.inverted ? 'Not using (%)' : 'Using (%)', numeric: true },
                ],
                rows: size.bands,
              }}
              footnote={
                <>
                  {size.note && <p className="mb-1">{size.note}</p>}
                  Population: {size.population}. <SourceList ids={[size.sourceId]} />
                </>
              }
            >
              <HBarChart
                key={size.id}
                data={size.bands.map((b) => ({ label: b.band, value: b.value }))}
                color={size.inverted ? '#c9773a' : '#2f6f9f'}
                max={size.id === 'eurostat-2021-hr' ? 5 : 100}
                valueLabel={size.inverted ? 'Not using AI' : 'Using AI'}
                labelWidth={110}
              />
              {size.inverted && (
                <p className="mt-2 text-xs font-medium text-claim">Orange bars show the share NOT using AI — a higher bar means less adoption.</p>
              )}
            </ChartCard>
            <Card className="p-5">
              <LayerTag layer="interpretation" />
              <h3 className="mt-2 font-sans text-[0.95rem] font-semibold text-ink">A consistent gradient — and its limits</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">
                Every source finds reported AI use rising with organisation size. That is a robust descriptive pattern. It does not by itself
                show that small firms are “falling behind”: reported non-use can mean never-use, deliberate non-use or withdrawal after trial,
                and small firms may meet algorithmic functions through platforms they do not describe as AI.
              </p>
              <p className="mt-3 text-sm text-ink-2">
                See the claim <Link to="/claims?claim=sme-behind" className="font-medium text-accent underline">“Small businesses are falling behind”</Link> and{' '}
                <Link to="/research#framework" className="font-medium text-accent underline">the encounter framework</Link>.
              </p>
            </Card>
          </div>
        </Section>

        {/* Industry */}
        <Section
          id="by-industry"
          kicker="Industry"
          title="Sector and industry"
          actions={
            <div className="w-full sm:w-80">
              <SelectFilter
                label="Source & measure"
                value={indId}
                onChange={setIndId}
                options={INDUSTRY_BREAKDOWNS.map((s) => ({ value: s.id, label: s.label }))}
              />
            </div>
          }
        >
          <ChartCard
            title={ind.label}
            subtitle={`${ind.measure} · ${ind.period}`}
            table={{
              caption: ind.label,
              columns: [
                { key: 'group', label: 'Industry / sector' },
                { key: 'value', label: 'Value (%)', numeric: true },
                { key: 'caveat', label: 'Caveat' },
              ],
              rows: ind.rows.map((r) => ({ group: r.group, value: r.value, caveat: 'caveat' in r ? r.caveat : '' })),
            }}
            footnote={
              <>
                {'footnote' in ind && <p className="mb-1">{ind.footnote}</p>}
                Only the rows each source publishes are shown — this is not a full industry ranking. <SourceList ids={[ind.sourceId]} />
              </>
            }
          >
            <HBarChart
              key={ind.id}
              data={ind.rows.map((r) => ({ label: r.group, value: r.value, note: 'caveat' in r ? r.caveat : undefined }))}
              color={'inverted' in ind ? '#c9773a' : '#2b9a8a'}
              valueLabel={'inverted' in ind ? 'Not using AI' : 'Using AI'}
              labelWidth={200}
            />
          </ChartCard>
          <Callout title="Hospitality in the statistics" className="mt-4">
            ONS reports 20.6% AI use in accommodation and food services in June 2026 (population not stated in the figure notes), and DSIT found
            88% of hotel and catering businesses neither used nor planned to use AI in 2025. Neither measures recruitment specifically — the
            gap the <Link to="/research" className="font-medium text-accent underline">Beyond Adoption</Link> study examines qualitatively.
          </Callout>
        </Section>

        {/* HR function */}
        <Section
          id="by-function"
          kicker="HR function"
          title="Where in recruitment AI is reported"
          description="CIPD is the only source here that breaks AI use down by recruitment stage. Values are % of all respondents."
          actions={<ChipGroup label="Survey years" options={['2021', '2022', '2024', '2026'] as const} selected={years} onToggle={(y) => setYears((c) => (c.includes(y) ? c.filter((x) => x !== y) : [...c, y].sort()))} />}
        >
          <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
            <ChartCard
              title="AI use by recruitment stage (CIPD)"
              subtitle="% of all UK HR respondents reporting AI/ML at each stage"
              legend={<Legend items={yearSeries.map((y) => ({ label: y.label, color: y.color }))} />}
              table={{
                caption: 'CIPD AI use by recruitment stage',
                columns: [
                  { key: 'full', label: 'Use' },
                  { key: 'y2021', label: '2021', numeric: true },
                  { key: 'y2022', label: '2022', numeric: true },
                  { key: 'y2024', label: '2024', numeric: true },
                  { key: 'y2026', label: '2026', numeric: true },
                ],
                rows: usesData,
              }}
              footnote={
                <>
                  Some categories were reworded in 2024 and 2026. Generative-AI-linked uses (job descriptions, chatbots) rose fastest; CIPD
                  attributes this partly to free generative AI tools and vendors adding generative features. <SourceList ids={['cipd-rtp-2024', 'cipd-rtp-2026']} />
                </>
              }
            >
              {yearSeries.length === 0 ? (
                <p role="status" className="py-16 text-center text-sm text-ink-3">
                  Select at least one survey year.
                </p>
              ) : (
                <GroupedBars data={usesData} categoryKey="stage" series={yearSeries} />
              )}
            </ChartCard>
            <div className="space-y-4">
              <Card className="p-5">
                <p className="text-sm font-semibold text-ink">HR outside CIPD</p>
                <ul className="mt-2 space-y-3 text-sm leading-relaxed text-ink-2">
                  <li>
                    <span className="tabular font-semibold text-ink">26%</span> of UK businesses that use or plan to use AI use or plan to use it in HR
                    (53% of large ones) — <SourceRef id="dsit-ai-adoption-2026" />. Denominator: AI users/planners only.
                  </li>
                  <li>
                    <span className="tabular font-semibold text-ink">0.62%</span> of all EU enterprises (10+) used AI for HR or recruitment in 2021,
                    or 8.11% of AI-using enterprises — <SourceRef id="eurostat-ai-2025" />. Not collected since.
                  </li>
                </ul>
              </Card>
              <Callout tone="warning" title="Denominators matter">
                “26% of AI users” and “0.62% of all enterprises” answer different questions. Neither can be converted into the other without the
                underlying counts.
              </Callout>
            </div>
          </div>
        </Section>

        {/* Technology type */}
        <Section id="by-technology" kicker="Technology type" title="Generative AI and other technologies">
          <div className="grid gap-4 lg:grid-cols-2">
            {(['Business-wide', 'Recruitment'] as const).map((fam) => {
              const rows = TECH_TYPES.filter((t) => t.family === fam)
              return (
                <ChartCard
                  key={fam}
                  title={fam === 'Business-wide' ? 'Business-wide AI technologies' : 'Recruitment-specific AI uses'}
                  subtitle={fam === 'Business-wide' ? 'ONS (UK, 10+, Sep 2026) and Eurostat (EU, 2025) — different populations' : 'CIPD 2026, % of UK HR respondents'}
                  table={{
                    caption: fam,
                    columns: [
                      { key: 'tech', label: 'Technology' },
                      { key: 'value', label: '%', numeric: true },
                      { key: 'population', label: 'Population' },
                    ],
                    rows: rows.map((r) => ({ tech: r.tech, value: r.value, population: r.population })),
                  }}
                  footnote={<SourceList ids={[...new Set(rows.map((r) => r.sourceId))]} />}
                >
                  <HBarChart
                    data={rows.map((r) => ({ label: r.tech, value: r.value, note: r.population }))}
                    color={fam === 'Business-wide' ? '#2b9a8a' : '#2f6f9f'}
                    max={30}
                    labelWidth={200}
                  />
                </ChartCard>
              )
            })}
          </div>
        </Section>

        {/* Region */}
        <Section id="by-region" kicker="Country or region" title="Geographic coverage of the evidence">
          <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
            <ul className="grid gap-3 sm:grid-cols-2">
              {REGIONS.map((r) => (
                <Card as="li" key={r.region} className="p-5">
                  <p className="font-serif text-lg text-ink">{r.region}</p>
                  <p className="mt-1 text-xs font-medium text-ink-3">{r.recruitmentSpecific ? 'Includes recruitment-specific data' : 'No recruitment-specific organisational data'}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{r.headline}</p>
                  <p className="mt-2">
                    <SourceList ids={r.sources} />
                  </p>
                </Card>
              ))}
            </ul>
            <ChartCard
              title="Algorithmic management tools (OECD, 2024)"
              subtitle="% of firms with 20+ employees using at least one tool to instruct, monitor or evaluate workers"
              table={{ caption: 'OECD algorithmic management', columns: [{ key: 'country', label: 'Country' }, { key: 'value', label: '%', numeric: true }], rows: OECD_AM }}
              footnote={
                <>
                  Concerns managing existing workers, not recruitment. The UK was not surveyed. <SourceList ids={['oecd-am-2025']} />
                </>
              }
            >
              <HBarChart data={OECD_AM.map((o) => ({ label: o.country, value: o.value }))} color="#8d5ba6" labelWidth={150} />
            </ChartCard>
          </div>
        </Section>

        {/* Methodology */}
        <Section
          id="by-method"
          kicker="Source & survey methodology"
          title="Why the numbers cannot be pooled"
          description="Each series with its respondent unit, weighting, method and sample. Families group broadly similar measures; nothing is compared quantitatively across families."
        >
          <div className="overflow-x-auto rounded-xl border border-line bg-surface">
            <table className="w-full min-w-[56rem] text-left text-sm">
              <caption className="sr-only">Methodology comparison of adoption series</caption>
              <thead className="bg-sunken text-xs text-ink-2">
                <tr>
                  {['Series', 'Family', 'Who / what is counted', 'Weighting', 'Method', 'Sample'].map((h) => (
                    <th key={h} scope="col" className="px-4 py-3 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SERIES.map((s) => (
                  <tr key={s.id} className="border-t border-line align-top">
                    <th scope="row" className="px-4 py-3 font-medium text-ink">
                      {s.label}
                      <span className="mt-1 block text-xs font-normal">
                        <SourceRef id={s.sourceId} />
                      </span>
                    </th>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 text-xs text-ink-2">
                        <span aria-hidden className="size-2 rounded-full" style={{ background: COLOR_BY_FAMILY[s.family] }} />
                        {s.family}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-ink-2">{s.population}</td>
                    <td className="px-4 py-3 text-ink-2">{s.denominator}</td>
                    <td className="px-4 py-3 text-ink-2">{s.method}</td>
                    <td className="tabular px-4 py-3 text-ink-2">{s.sampleSize}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </div>
    </div>
  )
}
