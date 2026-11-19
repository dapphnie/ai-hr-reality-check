import { Card, PageHeader, Section } from '../components/ui/primitives'
import { ASSESSMENT_ORDER, AssessmentBadge, LayerTag, assessmentBlurb, SourceRef } from '../components/ui/evidence'

const RULES = [
  { title: 'No fabricated numbers', body: 'Every statistic was read from the original publication (PDF text, figure or published CSV). Values the publisher does not state directly are labelled “derived” and computed exactly as the publisher computes them.' },
  { title: 'One series, one definition', body: 'Values are only joined into a line when they share the same question, population and weighting. Different measurement families are shown in separate panels with a comparability warning.' },
  { title: 'Adoption ≠ platform use', body: 'Using a job board or social platform to recruit is not treated as AI adoption. Algorithmic mediation and explicit adoption are kept as distinct concepts throughout.' },
  { title: 'No causal claims from descriptive data', body: 'Survey statistics describe reported use. Claims about outcomes rely on studies designed to test them (field experiments, audits), and their limits are stated.' },
  { title: 'Qualitative evidence stays qualitative', body: 'The eight dissertation interviews illustrate how recruitment technology is encountered. They are never converted into percentages or presented as prevalence.' },
  { title: 'Perception is not mechanism', body: 'Participants’ descriptions of ranking or filtering are reported as interpretations, not as evidence of how platforms technically operate.' },
  { title: 'Anonymity', body: 'Participants appear only by the dissertation’s codes (P01–P08). Accounts are paraphrased or referenced by the dissertation’s own code labels; no interview quotations or transcript material are reproduced.' },
  { title: 'Legal content is dated', body: 'UK and EU provisions were checked against official sources on 22 October 2026. Regulation in this area is moving quickly; the app is not legal advice.' },
]

const CORRECTIONS = [
  { item: 'CIPD 2024 headline (31%)', note: 'Confirmed on p.6 and Figure 26. It is derived from the answer distribution, and a new “don’t know” option (7%) was introduced in 2024 — so part of the change from 2022 may reflect the questionnaire.', sourceId: 'cipd-rtp-2024' },
  { item: 'CIPD SME figure', note: 'The 2024 report says “around four-fifths” without an exact percentage. The exact 80% figure comes from the 2026 report.', sourceId: 'cipd-rtp-2026' },
  { item: 'CIPD 2026 overall use (~38%)', note: 'Not stated by CIPD as a single number; derived as 100 − 56% − 6%. CIPD warns its 2026 sample criteria changed.', sourceId: 'cipd-rtp-2026' },
  { item: 'ICO audit report link', note: 'The URL cited in the dissertation now returns 404; the report has moved to a new path on ico.org.uk, which is used here.', sourceId: 'ico-audit-2024' },
  { item: 'ONS response count', note: 'The ONS AI article describes 38,637 businesses as “responding”; BICS tables indicate this is the sample size, with about 10,000 responses. The bulletin’s sample and response figures are used.', sourceId: 'ons-ai-2023-2026' },
  { item: 'Eurostat series break', note: 'The 2025 “any AI” indicator added a technology (generating pictures, video or audio), so 2025 is not strictly comparable with earlier years. HR/recruitment purpose data exist only for 2021.', sourceId: 'eurostat-ai-2025' },
  { item: 'EU AI Act dates', note: 'High-risk recruitment obligations were originally due from 2 August 2026; Regulation (EU) 2026/1744 deferred them to 2 December 2027.', sourceId: 'eu-ai-omnibus-2026' },
  { item: 'UK GDPR Article 22', note: 'Replaced by Articles 22A–22D from 5 February 2026 under the Data (Use and Access) Act 2025.', sourceId: 'uk-duaa-2025' },
]

const LIMITS = [
  'The dataset is a curated starter set, not a systematic review. It prioritises UK sources and original publications, and will not include every relevant study.',
  'Evidence assessments are reasoned judgements by the author, made transparent so they can be challenged — not the output of a formal grading protocol such as GRADE.',
  'Most experimental evidence on algorithmic hiring outcomes comes from the US, single firms or simulated CVs; transfer to UK small employers is uncertain.',
  'Industry and vendor surveys are included as evidence of what is claimed and reported, and are labelled as such.',
  'No live data feed: figures are as published at the date checked. Newer releases may supersede them.',
]

export default function Methodology() {
  return (
    <div className="fade-in">
      <PageHeader
        eyebrow="Methodology & integrity"
        title="How this application handles evidence"
        lede="The point of this project is analytical judgement, not impressive statistics. This page sets out the rules the data and interpretation follow, how claims are assessed, and what was corrected during verification."
      />
      <div className="mx-auto max-w-7xl space-y-16 px-4 pt-10 sm:px-6 lg:px-8">
        <Section kicker="Principles" title="Research integrity rules">
          <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {RULES.map((r) => (
              <Card as="li" key={r.title} className="p-5">
                <p className="font-serif text-lg leading-snug text-ink">{r.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{r.body}</p>
              </Card>
            ))}
          </ul>
        </Section>

        <Section id="layers" kicker="Epistemic labels" title="Distinguishing data, insight and interpretation">
          <Card className="grid gap-4 p-6 md:grid-cols-5">
            {(
              [
                ['data', 'A figure or finding reported by a source, with its definition.'],
                ['qualitative', 'Insight from interviews: how something is experienced or understood.'],
                ['interpretation', 'The author’s analytical reading, connecting sources.'],
                ['hypothesis', 'An open question the evidence raises but cannot settle.'],
                ['law', 'A legal provision or regulator expectation, with its status.'],
              ] as const
            ).map(([layer, text]) => (
              <div key={layer}>
                <LayerTag layer={layer} />
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{text}</p>
              </div>
            ))}
          </Card>
        </Section>

        <Section id="labels" kicker="Claims vs Evidence" title="How claims are assessed">
          <Card className="divide-y divide-line">
            {ASSESSMENT_ORDER.map((l) => (
              <div key={l} className="grid gap-2 p-5 md:grid-cols-[14rem_1fr] md:items-center">
                <AssessmentBadge label={l} />
                <p className="text-sm text-ink-2">{assessmentBlurb(l)}</p>
              </div>
            ))}
          </Card>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-2">
            Each assessment considers the claim <em>as stated</em> — so a sweeping claim (“eliminates bias”) can be unsupported even where a
            narrower version (“can reduce some disparities under specific conditions”) has support. Weight goes to independent, methodologically
            appropriate evidence: field experiments and audits for outcome claims, official statistics for prevalence claims. Every label is
            accompanied by written reasoning.
          </p>
        </Section>

        <Section id="corrections" kicker="Verification log" title="What checking the sources changed">
          <div className="overflow-x-auto rounded-xl border border-line bg-surface">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <caption className="sr-only">Verification notes and corrections</caption>
              <thead className="bg-sunken text-xs text-ink-2">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Item</th>
                  <th scope="col" className="px-4 py-3 font-semibold">What was found</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Source</th>
                </tr>
              </thead>
              <tbody>
                {CORRECTIONS.map((c) => (
                  <tr key={c.item} className="border-t border-line align-top">
                    <th scope="row" className="px-4 py-3 font-medium text-ink">{c.item}</th>
                    <td className="px-4 py-3 text-ink-2">{c.note}</td>
                    <td className="px-4 py-3 whitespace-nowrap"><SourceRef id={c.sourceId} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="limitations" kicker="Limitations" title="What this application cannot tell you">
          <Card className="p-6">
            <ul className="space-y-2.5 text-sm leading-relaxed text-ink-2">
              {LIMITS.map((l) => (
                <li key={l} className="flex gap-2.5">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-ink-3" />
                  {l}
                </li>
              ))}
            </ul>
          </Card>
        </Section>
      </div>
    </div>
  )
}
