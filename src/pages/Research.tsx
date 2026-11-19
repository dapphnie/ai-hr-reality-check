import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Tag, Users } from 'lucide-react'
import { Callout, Card, ChipGroup, PageHeader, Section, cx } from '../components/ui/primitives'
import { LayerTag, NotRepresentative, SourceRef } from '../components/ui/evidence'
import {
  CONTRIBUTIONS,
  ENCOUNTER_POSITIONS,
  IMPLICATIONS,
  PARTICIPANTS,
  PROFILES,
  STAGE_CONTROL,
  STUDY,
  THEMES,
  type Awareness,
  type EncounterPosition,
  type ParticipantId,
  type ThemeId,
} from '../data/research'

const THEME_SHORT: Record<ThemeId, string> = { reach: 'Credibility & reach', verification: 'Uncertainty & verification', control: 'Understanding & control' }

const AWARENESS_STYLE: Record<Awareness, string> = {
  'Raised AI / algorithms spontaneously': 'border-qual bg-qual text-white',
  'Named a generative AI tool': 'border-qual bg-qual-soft text-qual',
  'Discussed features without AI framing': 'border-line-strong bg-surface text-ink-2',
  'Not applicable (no platform use described)': 'border-dashed border-line-strong bg-paper text-ink-3',
}

export default function Research() {
  const [themeId, setThemeId] = useState<ThemeId>('reach')
  const [participant, setParticipant] = useState<ParticipantId | null>(null)
  const [highlight, setHighlight] = useState<EncounterPosition | null>(null)
  const theme = THEMES.find((t) => t.id === themeId)!

  const evidence = useMemo(
    () => (participant ? theme.evidence.filter((e) => e.participant === participant) : theme.evidence),
    [theme, participant],
  )
  const profile = participant ? PROFILES.find((p) => p.id === participant)! : null

  return (
    <div className="fade-in">
      <PageHeader
        eyebrow="My research · MSc HRM dissertation, 2026"
        title={<>Beyond Adoption</>}
        lede={
          <>
            How eight owner-managers and managers in small Brighton hospitality businesses make sense of, respond to, or remain outside
            platform-mediated recruitment — and why a simple adoption / non-adoption measure cannot describe what they do.
          </>
        }
      >
        <div className="flex flex-wrap items-center gap-2">
          <LayerTag layer="qualitative" />
          <NotRepresentative />
          <span className="text-xs text-ink-3">
            {STUDY.author} · {STUDY.institution} · {STUDY.submitted}
          </span>
        </div>
      </PageHeader>

      <div className="mx-auto max-w-7xl space-y-16 px-4 pt-10 sm:px-6 lg:px-8">
        <Callout title="How to read this section">
          Everything on this page is qualitative evidence from eight interviews in one sector and one city. It illustrates <em>how</em>{' '}
          recruitment technology can be encountered and why binary adoption measures leave things out. It does not estimate how common
          these patterns are, and participants’ descriptions of filtering or ranking are their interpretations — not evidence of how
          platforms technically work. Participants are identified only by the dissertation’s codes (P01–P08), and their accounts are
          paraphrased — no interview quotations are reproduced.
        </Callout>

        {/* Background & method */}
        <Section id="method" kicker="Background & methodology" title="The research problem">
          <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
            <Card className="p-6">
              <div className="space-y-4 text-[0.95rem] leading-relaxed text-ink-2">
                <p>
                  Evidence on algorithmic recruitment comes largely from settings where a recognisable system has been deliberately
                  procured or developed. Survey evidence records rising organisational AI use in UK recruitment — but such figures record
                  what organisations <em>recognise and report</em>. A small employer advertising on a job board may not think of that
                  platform as AI at all, even though ranking, filtering and matching may be embedded in it.
                </p>
                <p>
                  The dissertation develops <strong className="text-ink">encounter</strong> as a sensitising concept: the relation between
                  a platform’s material features and an existing recruitment practice, in which the practice is prior and the platform’s
                  significance is constituted by what that practice already supplies and what the platform is expected to add.
                </p>
              </div>
              <div className="mt-6 border-t border-line pt-5">
                <p className="eyebrow">Main research question</p>
                <p className="mt-2 font-serif text-lg leading-snug text-ink">{STUDY.mainQuestion}</p>
                <ol className="mt-4 space-y-2 text-sm text-ink-2">
                  {STUDY.supportingQuestions.map((q, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="tabular font-semibold text-ink-3">SRQ{i + 1}</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Card>
            <Card className="p-6">
              <p className="eyebrow">Research design</p>
              <dl className="mt-3 divide-y divide-line text-sm">
                {STUDY.design.map((d) => (
                  <div key={d.label} className="grid grid-cols-[7.5rem_1fr] gap-3 py-2.5">
                    <dt className="font-medium text-ink">{d.label}</dt>
                    <dd className="text-ink-2">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </div>

          <Card className="mt-6 p-6">
            <div className="flex flex-wrap items-center gap-2">
              <p className="eyebrow">Research setting: Brighton and Hove</p>
              <LayerTag layer="data" />
            </div>
            <dl className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { v: '98.6%', l: 'of the city’s 14,410 businesses are micro or small (2023)', s: 'aecom-2024' },
                { v: '90.2%', l: 'employ fewer than ten people', s: 'aecom-2024' },
                { v: '1,495', l: 'accommodation and food-service business units (9.3% of local units, 2024)', s: 'ons-ubc-2024' },
                { v: '18%', l: 'of local employment supported by tourism (25,677 jobs, 2024)', s: 'destination-2025' },
              ].map((k) => (
                <div key={k.v}>
                  <dt className="tabular font-serif text-3xl text-ink">{k.v}</dt>
                  <dd className="mt-1 text-sm leading-snug text-ink-2">{k.l}</dd>
                  <dd className="mt-1 text-xs"><SourceRef id={k.s} /></dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-ink-3">
              Context for the setting only: these figures do not describe how recruitment is organised inside firms — the question the
              interviews address. Small-firm and hospitality literature: <SourceRef id="harney-2021" />; <SourceRef id="chung-2018" />;{' '}
              <SourceRef id="lockyer-2004" />; <SourceRef id="carroll-1999" />.
            </p>
          </Card>

          <div className="mt-6">
            <p className="eyebrow mb-3">Sensitising concepts carried into the analysis</p>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {STUDY.sensitisingConcepts.map((c) => (
                <Card as="li" key={c.term} className="p-4">
                  <p className="font-serif text-[1.02rem] text-ink">{c.term}</p>
                  <p className="mt-0.5 text-xs text-ink-3">{c.origin}</p>
                  <p className="mt-2 text-sm leading-snug text-ink-2">{c.meaning}</p>
                </Card>
              ))}
            </ul>
          </div>
        </Section>

        {/* Findings explorer */}
        <Section
          id="findings"
          kicker="Interactive findings explorer"
          title="Three themes, eight accounts"
          description="Choose a theme, then select a participant code to filter the coded evidence. The matrix shows which themes each account was cited under in the dissertation’s findings."
        >
          <div role="tablist" aria-label="Themes" className="grid gap-2 md:grid-cols-3">
            {THEMES.map((t) => (
              <button
                key={t.id}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={t.id === themeId}
                aria-controls="theme-panel"
                onClick={() => setThemeId(t.id)}
                className={cx(
                  'rounded-xl border p-4 text-left transition-colors',
                  t.id === themeId ? 'border-qual bg-qual-soft' : 'border-line bg-surface hover:border-line-strong',
                )}
              >
                <span className="tabular text-xs font-semibold text-qual">Theme {t.number}</span>
                <span className="mt-1 block font-serif text-lg leading-snug text-ink">{t.title}</span>
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_20rem]">
            <div id="theme-panel" role="tabpanel" aria-labelledby={`tab-${themeId}`} className="space-y-5">
              <Card className="p-6">
                <p className="text-sm text-ink-3">Analytical focus</p>
                <p className="mt-1 text-[1.02rem] leading-relaxed text-ink">{theme.focus}</p>
                <p className="mt-4 text-xs text-ink-3">
                  Second-order categories: <span className="text-ink-2">{theme.categories.join(' · ')}</span>
                </p>
                <ul className="mt-5 space-y-2.5">
                  {theme.findings.map((f, i) => (
                    <li key={i} className="flex gap-3 text-[0.93rem] leading-relaxed text-ink-2">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-qual" />
                      {f}
                    </li>
                  ))}
                </ul>
              </Card>

              <div>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-ink">
                    Coded evidence{' '}
                    <span className="font-normal text-ink-3">
                      ({evidence.length} {evidence.length === 1 ? 'code' : 'codes'}
                      {participant ? ` from ${participant}` : ''})
                    </span>
                  </p>
                  {participant && (
                    <button type="button" onClick={() => setParticipant(null)} className="text-sm font-medium text-accent hover:underline">
                      Show all participants
                    </button>
                  )}
                </div>
                {evidence.length === 0 ? (
                  <div role="status" className="rounded-xl border border-dashed border-line-strong bg-surface p-6 text-sm text-ink-2">
                    No coded extract from {participant} is listed under this theme in Appendix F. {participant} contributes to:{' '}
                    {profile!.themes.map((t) => THEME_SHORT[t]).join(', ')}.
                  </div>
                ) : (
                  <ul className="grid gap-2.5 md:grid-cols-2">
                    {evidence.map((e, i) => (
                      <li key={i} className="flex items-start gap-3 rounded-xl border-l-[3px] border-qual bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)]">
                        <button
                          type="button"
                          onClick={() => setParticipant(e.participant)}
                          className="shrink-0 rounded bg-qual-soft px-1.5 py-0.5 text-xs font-semibold text-qual hover:bg-qual hover:text-white"
                          aria-label={`Filter to ${e.participant}`}
                        >
                          {e.participant}
                        </button>
                        <span className="flex items-start gap-1.5 text-sm leading-snug text-ink-2">
                          <Tag aria-hidden className="mt-0.5 size-3.5 shrink-0 text-qual/60" />
                          {e.code}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-2 text-xs text-ink-3">
                  First-order code labels from the dissertation’s Appendix F (Table F1). Verbatim interview quotations are not reproduced here.
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <Card className="p-5">
                  <LayerTag layer="qualitative" />
                  <p className="mt-2 text-sm font-semibold text-ink">Contrasting case</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-2">{theme.contrasting}</p>
                </Card>
                <Card className="p-5">
                  <LayerTag layer="interpretation" />
                  <p className="mt-2 text-sm font-semibold text-ink">Analytical interpretation</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-2">{theme.interpretation}</p>
                  <p className="mt-3 text-xs text-ink-3">In dialogue with: {theme.literature.join('; ')}</p>
                </Card>
              </div>
            </div>

            <aside aria-label="Participant matrix" className="space-y-4">
              <Card className="p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <Users aria-hidden className="size-4 text-qual" /> Cross-case matrix
                </p>
                <table className="mt-3 w-full text-xs">
                  <caption className="sr-only">Which themes each participant’s account contributed to</caption>
                  <thead>
                    <tr className="text-ink-3">
                      <th scope="col" className="pb-2 text-left font-medium">Code</th>
                      {THEMES.map((t) => (
                        <th key={t.id} scope="col" className="pb-2 text-center font-medium" title={t.title}>
                          T{t.number}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PROFILES.map((p) => (
                      <tr key={p.id} className={cx('border-t border-line', participant === p.id && 'bg-qual-soft')}>
                        <th scope="row" className="py-1.5 text-left">
                          <button
                            type="button"
                            aria-pressed={participant === p.id}
                            onClick={() => setParticipant(participant === p.id ? null : p.id)}
                            className="rounded px-1 font-semibold text-ink hover:text-qual"
                          >
                            {p.id}
                          </button>
                        </th>
                        {THEMES.map((t) => {
                          const has = p.themes.includes(t.id)
                          return (
                            <td key={t.id} className="py-1.5 text-center">
                              <span
                                aria-label={has ? `${p.id} contributes to ${t.title}` : `${p.id} not coded under ${t.title}`}
                                className={cx(
                                  'mx-auto block size-3.5 rounded-sm',
                                  has ? (t.id === themeId ? 'bg-qual' : 'bg-qual/45') : 'border border-line-strong',
                                )}
                              />
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-3 text-[0.7rem] leading-snug text-ink-3">
                  Filled = account cited as evidence under that theme in the findings chapter (Chapter 5; see also Appendix F). Cells show contribution, not intensity.
                </p>
              </Card>
              {profile && (
                <Card className="fade-in p-4">
                  <p className="text-sm font-semibold text-ink">{profile.id} · analytic profile</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{profile.summary}</p>
                  <p className="mt-3 text-xs font-medium text-ink-3">Routes described</p>
                  <p className="text-xs text-ink-2">{profile.routes.join(' · ')}</p>
                  <p className="mt-2 text-xs font-medium text-ink-3">Encounter position(s)</p>
                  <p className="text-xs text-ink-2">{profile.positions.join(' · ')}</p>
                </Card>
              )}
            </aside>
          </div>
        </Section>

        {/* Framework */}
        <Section
          id="framework"
          kicker="Recruitment technology encounter framework"
          title="Positions, not stages"
          description={
            <>
              The study found platform encounter could involve sustained use, coexistence with relational routes, delegation, use
              experienced as constraining, withdrawal after trial, or deliberate non-use. These are positions within a practice — they do
              not form a sequence towards fuller adoption, and one account can occupy several at once.
            </>
          }
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_17rem]">
            <Card className="p-5">
              <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {ENCOUNTER_POSITIONS.map((pos) => {
                  const members = PROFILES.filter((p) => p.positions.includes(pos.id))
                  const active = highlight === pos.id
                  return (
                    <li key={pos.id}>
                      <button
                        type="button"
                        aria-pressed={active}
                        onClick={() => setHighlight(active ? null : pos.id)}
                        className={cx(
                          'flex h-full w-full flex-col rounded-lg border p-4 text-left transition-colors',
                          active ? 'border-qual bg-qual-soft' : 'border-line bg-paper hover:border-line-strong',
                        )}
                      >
                        <span className="font-serif text-[1.05rem] leading-snug text-ink">{pos.id}</span>
                        <span className="mt-1.5 text-[0.82rem] leading-snug text-ink-2">{pos.definition}</span>
                        <span className="mt-2 text-[0.72rem] text-ink-3">{pos.concept}</span>
                        <span className="mt-auto flex flex-wrap gap-1 pt-3">
                          {members.map((m) => (
                            <span key={m.id} className={cx('rounded border px-1.5 py-0.5 text-[0.7rem] font-semibold', AWARENESS_STYLE[m.awareness])}>
                              {m.id}
                            </span>
                          ))}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
              <p className="mt-4 border-t border-line pt-3 text-xs leading-relaxed text-ink-3">
                <span className="font-semibold text-ink-2">Not assigned:</span>{' '}
                {PROFILES.filter((p) => p.positions.length === 0)
                  .map((p) => p.id)
                  .join(', ')}{' '}
                — the findings centre on a vouched relational route and do not describe this account’s platform use, so no position is
                inferred. Assigning accounts to positions is the author’s illustrative mapping of the published findings, not a coding
                category from the dissertation.
              </p>
            </Card>
            <Card className="p-5">
              <p className="text-sm font-semibold text-ink">Awareness overlay</p>
              <p className="mt-1 text-xs leading-snug text-ink-3">Participant chips are styled by how they talked about AI or algorithms (Theme 3).</p>
              <ul className="mt-3 space-y-2.5">
                {(Object.keys(AWARENESS_STYLE) as Awareness[]).map((a) => (
                  <li key={a} className="flex items-start gap-2 text-xs text-ink-2">
                    <span className={cx('mt-0.5 rounded border px-1.5 py-0.5 text-[0.65rem] font-semibold', AWARENESS_STYLE[a])}>Pxx</span>
                    <span>
                      {a}
                      <span className="block text-ink-3">{PROFILES.filter((p) => p.awareness === a).map((p) => p.id).join(', ')}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-line pt-3 text-xs leading-relaxed text-ink-2">
                Recognition of AI was narrower than platform use: only P03 and P04 raised AI-related ideas spontaneously and P08 named a
                generative tool. Encounter does not presuppose awareness.
              </p>
              {highlight && (
                <p className="mt-3 rounded-md bg-qual-soft p-2 text-xs text-qual" aria-live="polite">
                  {PROFILES.filter((p) => p.positions.includes(highlight)).length} of 8 accounts include “{highlight}”. This is a description
                  of the sample, not a prevalence estimate.
                </p>
              )}
            </Card>
          </div>

          {/* Stage control */}
          <div className="mt-8">
            <h3 className="font-sans text-[0.95rem] font-semibold text-ink">Where control was located, by recruitment stage</h3>
            <p className="mt-1 max-w-3xl text-sm text-ink-2">
              Perceived control was stage-specific: limited influence over candidate flow coexisted with retained authority over who was
              interviewed and appointed. Locus labels summarise participants’ perceptions, not platform mechanics.
            </p>
            <ol className="mt-4 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
              {STAGE_CONTROL.map((s, i) => (
                <li key={s.stage} className="flex flex-col rounded-xl border border-line bg-surface">
                  <div
                    className={cx(
                      'rounded-t-xl px-3 py-2 text-[0.7rem] font-semibold tracking-wide uppercase',
                      s.perceivedLocus === 'Platform-shaped' && 'bg-quant-soft text-quant',
                      s.perceivedLocus === 'Shared / contested' && 'bg-[#f7f0dc] text-mixed',
                      s.perceivedLocus === 'Managerial' && 'bg-accent-soft text-accent-strong',
                    )}
                  >
                    {s.perceivedLocus}
                  </div>
                  <div className="flex-1 p-3">
                    <p className="text-sm font-semibold text-ink">
                      <span className="tabular mr-1 text-ink-3">{i + 1}.</span>
                      {s.stage}
                    </p>
                    <ul className="mt-2 space-y-2">
                      {s.accounts.map((a, j) => (
                        <li key={j} className="text-xs leading-snug text-ink-2">
                          <span className="font-semibold text-qual">{a.participant}</span> {a.note}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        {/* Contribution & implications */}
        <Section id="implications" kicker="So what?" title="Contributions and implications">
          <div className="grid gap-6 lg:grid-cols-3">
            {IMPLICATIONS.map((imp) => (
              <Card key={imp.audience} className="flex flex-col p-6">
                <LayerTag layer={imp.layer} />
                <h3 className="mt-3 text-xl text-ink">For {imp.audience}</h3>
                <ul className="mt-3 space-y-3 text-sm leading-relaxed text-ink-2">
                  {imp.points.map((p, i) => (
                    <li key={i} className="flex gap-2.5">
                      <ArrowRight aria-hidden className="mt-1 size-3.5 shrink-0 text-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
          <p className="mt-3 text-xs text-ink-3">
            Practitioner implications paraphrase the dissertation’s Section 7.3. Governance points extend its argument and are framed as open
            questions; see the <Link to="/governance" className="text-accent underline">Governance &amp; Risk Explorer</Link> for the legal
            context.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Card className="p-6">
              <p className="eyebrow">Contributions to the literature</p>
              <ol className="mt-3 space-y-3 text-sm leading-relaxed text-ink-2">
                {CONTRIBUTIONS.map((c, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="tabular font-serif text-lg leading-none text-accent">{i + 1}</span>
                    {c}
                  </li>
                ))}
              </ol>
            </Card>
            <Card className="p-6" >
              <p className="eyebrow" id="limitations">Limitations</p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-2">
                {STUDY.limitations.map((l, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-ink-3" />
                    {l}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Section>

        <Section kicker="Positioning" title="Why this matters for the adoption figures">
          <Card className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center">
            <p className="max-w-3xl text-[0.95rem] leading-relaxed text-ink-2">
              The study does not imply that adoption surveys misclassify organisations — it identifies a different empirical object. Surveys
              such as <SourceRef id="cipd-rtp-2024" /> remain valuable for estimating <em>recognised</em> organisational uptake. They cannot
              describe every situation in which recruitment runs through a platform whose relevant functions the employer does not
              separately recognise as AI. The <Link to="/adoption" className="text-accent underline">Adoption Reality</Link> dashboard keeps
              these two objects apart.
            </p>
            <div className="flex flex-wrap gap-2">
              <ChipGroup label="Participants" options={PARTICIPANTS} selected={participant ? [participant] : []} onToggle={(p) => {
                setParticipant(p)
                document.getElementById('findings')?.scrollIntoView({ behavior: 'smooth' })
              }} />
            </div>
          </Card>
        </Section>
      </div>
    </div>
  )
}
