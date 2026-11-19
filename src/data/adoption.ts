import type { AdoptionPoint, AdoptionSeries } from '../types'

/**
 * Verified starter dataset. Every value was read from the cited publication
 * (PDF text, chart or published CSV) on 22 October 2026. "Derived" values are
 * computed exactly as the publisher computes them and are flagged in `note`.
 *
 * Series in different `family` values measure different things (different
 * respondents, units, size thresholds or definitions of AI) and are never
 * plotted on one line or combined into one number.
 */

export const SERIES: AdoptionSeries[] = [
  {
    id: 'cipd-recruitment',
    label: 'CIPD — UK organisations using AI/ML in recruitment',
    sourceId: 'cipd-rtp-2024',
    definition: 'Share of respondents’ organisations using AI or machine learning anywhere in recruitment processes. Published as the complement of “N/A – don’t use” and “Don’t know”.',
    population: 'UK HR / people professionals with resourcing responsibility (YouGov panel); sole traders excluded',
    denominator: 'Respondents, weighted by share of employment by organisation size and sector (not by business count)',
    method: 'Online survey (YouGov), April fieldwork',
    sampleSize: 'n = 1,018 (2021); 1,055 (2022); 1,016 (2024); 1,014 (2026)',
    geography: 'UK',
    technology: 'AI/ML in recruitment',
    family: 'Recruitment-specific (HR respondents)',
    caveats: [
      'Employment-weighted: the figure describes where employees work, so large organisations carry most of the weight (58% of the 2024 weighted base is 250+ employees).',
      '“Don’t know” was added as an option in 2024 (7%). Part of the 2022→2024 change may reflect the questionnaire change rather than behaviour.',
      'The 2026 survey added a screening criterion (senior HR with resourcing responsibility); CIPD advises comparisons with 2024 be viewed with this in mind.',
      'Measures recognised use. Platform functions an employer does not identify as AI are unlikely to be reported.',
    ],
  },
  {
    id: 'ons-bics-all',
    label: 'ONS BICS — UK businesses using at least one AI technology',
    sourceId: 'ons-bics-oct-2026',
    definition: 'Share of businesses currently using at least one AI technology from a list (e.g. text generation using LLMs, visual content creation).',
    population: 'UK businesses with a trading presence, excluding agriculture, energy, public administration, public education & health, and finance & insurance',
    denominator: 'Businesses, weighted by count',
    method: 'Voluntary fortnightly online business survey',
    sampleSize: 'Wave 165: 38,592 sampled; 9,933 responses (25.7%)',
    geography: 'UK',
    technology: 'Any AI technology',
    family: 'General business AI use (official statistics)',
    caveats: [
      'Not recruitment-specific. ONS purpose categories do not include HR or recruitment.',
      'Official statistics in development; voluntary survey with ~26% response.',
      'The “all businesses” and “10+ employees” figures differ only by population — always state which is used.',
    ],
  },
  {
    id: 'ons-bics-10plus',
    label: 'ONS BICS — UK businesses with 10+ employees using AI',
    sourceId: 'ons-bics-oct-2026',
    definition: 'As above, restricted to businesses with 10 or more employees.',
    population: 'UK businesses with 10+ employees (same industry exclusions)',
    denominator: 'Businesses, weighted by count',
    method: 'Voluntary fortnightly online business survey',
    sampleSize: 'Subset of each BICS wave',
    geography: 'UK',
    technology: 'Any AI technology',
    family: 'General business AI use (official statistics)',
    caveats: ['Not recruitment-specific.', 'Official statistics in development.'],
  },
  {
    id: 'eurostat-any',
    label: 'Eurostat — EU enterprises (10+) using at least one AI technology',
    sourceId: 'eurostat-ai-2025',
    definition: 'Share of enterprises using at least one of a list of AI technologies.',
    population: 'EU27 enterprises with 10+ employees and self-employed persons, excluding agriculture, mining and finance',
    denominator: 'All enterprises in scope',
    method: 'Annual EU survey on ICT usage in enterprises (national statistical institutes)',
    sampleSize: 'Harmonised national samples (total not stated in the article)',
    geography: 'EU27',
    technology: 'Any AI technology',
    family: 'General business AI use (official statistics)',
    caveats: [
      'Break in series in 2025: an eighth technology (generating pictures, video or audio) was added to the list, so 2025 is not strictly comparable with earlier years.',
      'The UK is not covered after 2020.',
      'Not recruitment-specific; the HR/recruitment purpose was only collected in 2021.',
    ],
  },
  {
    id: 'ons-mes',
    label: 'ONS MES — UK firms (10+) that adopted AI in 2023',
    sourceId: 'ons-mes-2023',
    definition: 'Share of firms that adopted AI in the reference year.',
    population: 'UK firms with 10+ employees in production and services, excluding agriculture and finance',
    denominator: 'Firms, weighted to population',
    method: 'Management and Expectations Survey, wave 3 (Nov 2023 – Mar 2024)',
    sampleSize: 'Not stated in the article',
    geography: 'UK',
    technology: 'Any AI technology',
    family: 'General business AI use (official statistics)',
    caveats: ['Different question and reference period from BICS; do not splice with BICS.'],
  },
  {
    id: 'dsit-2025',
    label: 'DSIT — UK private businesses (5+) using at least one AI technology',
    sourceId: 'dsit-ai-adoption-2026',
    definition: 'Share of businesses currently using at least one AI technology.',
    population: 'UK private-sector businesses with 5+ employees; public administration, education and health excluded',
    denominator: 'Businesses, weighted by size and sector',
    method: 'Telephone survey (CATI) by IFF Research, Feb–May 2025',
    sampleSize: 'n = 3,500 (9% response)',
    geography: 'UK',
    technology: 'Any AI technology',
    family: 'General business AI use (government research)',
    caveats: ['Single wave; different threshold (5+) and mode (telephone) from ONS.'],
  },
  {
    id: 'dcms-2020',
    label: 'DCMS / Capital Economics — UK firms that had adopted AI (2020)',
    sourceId: 'dcms-ai-activity-2022',
    definition: 'Share of businesses that had adopted at least one AI technology (modelled).',
    population: 'UK private businesses, scaled to ~2.8 million businesses',
    denominator: 'Businesses (modelled estimate)',
    method: 'YouGov survey of 2,008 firms, modelled to the business population',
    sampleSize: 'n = 2,008',
    geography: 'UK',
    technology: 'Any AI technology',
    family: 'General business AI use (government research)',
    caveats: ['Modelled estimate; methodology differs from all later UK series.'],
  },
  {
    id: 'oecd-am',
    label: 'OECD — firms using at least one algorithmic management tool',
    sourceId: 'oecd-am-2025',
    definition: 'Share of firms using at least one software tool to instruct, monitor or evaluate workers.',
    population: 'Firms with 20+ employees in France, Germany, Italy, Japan, Spain and the US (no UK)',
    denominator: 'Firms, weighted by sector and size',
    method: 'Telephone survey of mid-level managers (Ipsos), June–Aug 2024',
    sampleSize: 'n = 6,047 (response 2–6%)',
    geography: 'Six OECD countries',
    technology: 'Algorithmic management',
    family: 'Algorithmic management (employer survey)',
    caveats: ['Concerns management of existing workers, not recruitment.', 'Low response rates.'],
  },
  {
    id: 'shrm-hr',
    label: 'SHRM — US HR professionals reporting AI use in HR tasks',
    sourceId: 'shrm-2025',
    definition: 'Share of surveyed HR professionals reporting AI adoption in HR tasks.',
    population: 'US HR professionals on SHRM’s research panel',
    denominator: 'Respondents (unweighted)',
    method: 'Online panel survey, Feb 2025',
    sampleSize: 'n = 2,040',
    geography: 'US',
    technology: 'AI in HR (any)',
    family: 'Industry / association surveys',
    caveats: ['Unweighted professional panel; describes respondents, not organisations.', 'US only.'],
  },
]

const p = (
  id: string,
  seriesId: string,
  sourceId: string,
  year: number,
  period: string,
  value: number,
  extra: Partial<AdoptionPoint> = {},
): AdoptionPoint => ({
  id,
  seriesId,
  sourceId,
  year,
  period,
  value,
  unit: '%',
  orgSize: 'All sizes',
  industry: 'All industries',
  hrFunction: 'Recruitment (any stage)',
  technology: SERIES.find((s) => s.id === seriesId)!.technology,
  geography: SERIES.find((s) => s.id === seriesId)!.geography,
  ...extra,
})

const NOT_HR = { hrFunction: 'Not HR-specific' }

export const POINTS: AdoptionPoint[] = [
  // CIPD — derived as 100 − "N/A – don't use" − "Don't know"
  p('cipd-21', 'cipd-recruitment', 'cipd-rtp-2024', 2021, 'Spring 2021', 16, { note: 'Derived: 100 − 84% N/A (no “don’t know” option)', pageRef: 'Fig. 26, p.27' }),
  p('cipd-22', 'cipd-recruitment', 'cipd-rtp-2024', 2022, 'Spring 2022', 16, { note: 'Derived: 100 − 84% N/A (no “don’t know” option)', pageRef: 'p.6; Fig. 26, p.27' }),
  p('cipd-24', 'cipd-recruitment', 'cipd-rtp-2024', 2024, '4–22 Apr 2024', 31, { note: 'Published (p.6). Equals 100 − 62% N/A − 7% don’t know', pageRef: 'p.6; Fig. 26, p.27' }),
  p('cipd-26', 'cipd-recruitment', 'cipd-rtp-2026', 2026, '2 Apr – 2 May 2026', 38, { note: 'Derived: 100 − 56% N/A − 6% don’t know. Not stated as a single figure by CIPD; sample criteria changed', pageRef: 'Fig. 30, p.32' }),

  // ONS BICS (Figure 1 CSV, 8 Oct 2026 bulletin)
  p('bics-all-23', 'ons-bics-all', 'ons-bics-oct-2026', 2023, 'Sep 2023', 9.4, NOT_HR),
  p('bics-all-26a', 'ons-bics-all', 'ons-bics-oct-2026', 2026, 'Jun 2026', 28.9, { ...NOT_HR, note: 'June 2026 wave (from the same CSV)' }),
  p('bics-all-26b', 'ons-bics-all', 'ons-bics-oct-2026', 2026.7, 'Sep 2026', 29.7, NOT_HR),
  p('bics-10-23', 'ons-bics-10plus', 'ons-bics-oct-2026', 2023, 'Sep 2023', 11.9, NOT_HR),
  p('bics-10-26a', 'ons-bics-10plus', 'ons-bics-oct-2026', 2026, 'Jun 2026', 34.9, NOT_HR),
  p('bics-10-26b', 'ons-bics-10plus', 'ons-bics-oct-2026', 2026.7, 'Sep 2026', 38.1, NOT_HR),

  // Eurostat isoc_eb_ai (EU27, all enterprises 10+)
  p('eu-21', 'eurostat-any', 'eurostat-ai-2025', 2021, '2021', 7.65, NOT_HR),
  p('eu-23', 'eurostat-any', 'eurostat-ai-2025', 2023, '2023', 8.06, NOT_HR),
  p('eu-24', 'eurostat-any', 'eurostat-ai-2025', 2024, '2024', 13.48, NOT_HR),
  p('eu-25', 'eurostat-any', 'eurostat-ai-2025', 2025, '2025', 19.95, { ...NOT_HR, note: 'Break in series: technology list extended' }),

  p('mes-23', 'ons-mes', 'ons-mes-2023', 2023, '2023', 9, NOT_HR),
  p('dsit-25', 'dsit-2025', 'dsit-ai-adoption-2026', 2025, 'Feb–May 2025', 16, NOT_HR),
  p('dcms-20', 'dcms-2020', 'dcms-ai-activity-2022', 2020, '2020', 15, NOT_HR),
  p('shrm-24', 'shrm-hr', 'shrm-2025', 2024, '2024', 26, { hrFunction: 'HR tasks (any)' }),
  p('shrm-25', 'shrm-hr', 'shrm-2025', 2025, 'Feb 2025', 43, { hrFunction: 'HR tasks (any)' }),
]

/** CIPD answer distribution — shows what the headline figure is made of. */
export const CIPD_DISTRIBUTION = [
  { year: '2021', use: 16, dontKnow: 0, notUse: 84, n: 1018, note: 'No “don’t know” option' },
  { year: '2022', use: 16, dontKnow: 0, notUse: 84, n: 1055, note: 'No “don’t know” option' },
  { year: '2024', use: 31, dontKnow: 7, notUse: 62, n: 1016, note: '“Don’t know” added' },
  { year: '2026', use: 38, dontKnow: 6, notUse: 56, n: 1014, note: 'Sample criteria changed' },
]

/** CIPD Figure 26 (2024 report) and Figure 30 (2026 report): % of all respondents. */
export const CIPD_USES = [
  { use: 'Workforce planning (predictive analytics)', stage: 'Planning', y2021: 7, y2022: 6, y2024: 9, y2026: 11 },
  { use: 'Attraction (AI-written job descriptions)', stage: 'Attraction', y2021: 3, y2022: 4, y2024: 11, y2026: 16 },
  { use: 'Sourcing', stage: 'Sourcing', y2021: 5, y2022: 8, y2024: 8, y2026: 8 },
  { use: 'Communications (chatbots)', stage: 'Communication', y2021: 3, y2022: 4, y2024: 13, y2026: 14 },
  { use: 'Screening (AI shortlisting)', stage: 'Screening', y2021: 5, y2022: 5, y2024: 12, y2026: 16 },
  { use: 'Selection (interview analysis / chatbot interviews)', stage: 'Selection', y2021: 4, y2022: 5, y2024: 9, y2026: 11 },
  { use: 'Interview scheduling', stage: 'Scheduling', y2021: 4, y2022: 5, y2024: 11, y2026: 13 },
  { use: 'Talent pool management', stage: 'Talent pools', y2021: 4, y2022: 5, y2024: 7, y2026: 10 },
] as const

/** Organisation-size breakdowns. One source at a time — size bands are not harmonised across sources. */
export interface SizeBreakdown {
  id: string
  label: string
  sourceId: string
  measure: string
  population: string
  period: string
  /** If true, values are "not using" shares rather than "using". */
  inverted?: boolean
  bands: { band: string; value: number }[]
  note?: string
}

export const SIZE_BREAKDOWNS: SizeBreakdown[] = [
  {
    id: 'cipd-2026-size',
    label: 'CIPD 2026 — not using AI in recruitment',
    sourceId: 'cipd-rtp-2026',
    measure: '% of organisations reporting they do not use AI or machine learning in recruitment',
    population: 'UK HR professionals (employment-weighted)',
    period: 'Apr–May 2026',
    inverted: true,
    bands: [
      { band: 'SMEs (<250)', value: 80 },
      { band: 'Larger (250+)', value: 38 },
    ],
    note: 'The 2024 report states only “around four-fifths of SMEs” without an exact figure.',
  },
  {
    id: 'bics-2026-size',
    label: 'ONS BICS Sep 2026 — using any AI technology',
    sourceId: 'ons-bics-oct-2026',
    measure: '% of UK businesses using at least one AI technology (not recruitment-specific)',
    population: 'UK businesses, count-weighted',
    period: 'Sep 2026',
    bands: [
      { band: '0–9', value: 28.7 },
      { band: '10–49', value: 36.1 },
      { band: '50–99', value: 45.8 },
      { band: '100–249', value: 50.4 },
      { band: '250+', value: 50.9 },
    ],
  },
  {
    id: 'eurostat-2025-size',
    label: 'Eurostat 2025 — using any AI technology',
    sourceId: 'eurostat-ai-2025',
    measure: '% of EU27 enterprises using at least one AI technology (not recruitment-specific)',
    population: 'EU27 enterprises with 10+ employees',
    period: '2025',
    bands: [
      { band: '10–49', value: 17.0 },
      { band: '50–249', value: 30.36 },
      { band: '250+', value: 55.03 },
    ],
  },
  {
    id: 'eurostat-2021-hr',
    label: 'Eurostat 2021 — AI used for HR or recruitment',
    sourceId: 'eurostat-ai-2025',
    measure: '% of ALL EU27 enterprises (10+) using AI for human resources management or recruitment',
    population: 'EU27 enterprises with 10+ employees',
    period: '2021 (only year collected)',
    bands: [
      { band: '10–49', value: 0.45 },
      { band: '50–249', value: 1.13 },
      { band: '250+', value: 3.17 },
    ],
    note: 'Among AI-using enterprises only, the shares were 7.33%, 9.01% and 11.17% — a different denominator.',
  },
  {
    id: 'dsit-2025-size',
    label: 'DSIT 2025 — using any AI technology',
    sourceId: 'dsit-ai-adoption-2026',
    measure: '% of UK private businesses (5+) using at least one AI technology',
    population: 'UK private businesses with 5+ employees',
    period: 'Feb–May 2025',
    bands: [
      { band: 'Micro (5–9)', value: 14 },
      { band: 'Mid-sized', value: 23 },
      { band: 'Large', value: 36 },
    ],
    note: 'The small-business (10–49) figure is not stated in the report text.',
  },
  {
    id: 'mes-2023-size',
    label: 'ONS MES 2023 — adopted AI',
    sourceId: 'ons-mes-2023',
    measure: '% of UK firms (10+) adopting AI in 2023',
    population: 'UK firms with 10+ employees',
    period: '2023',
    bands: [
      { band: '10–19', value: 8 },
      { band: '20–49', value: 8 },
      { band: '50–99', value: 10 },
      { band: '100–249', value: 10 },
      { band: '250+', value: 13 },
    ],
    note: 'ONS labels one band “100–149”, which appears to be a typographical error for 100–249.',
  },
  {
    id: 'dcms-2020-size',
    label: 'DCMS 2020 — adopted AI (modelled)',
    sourceId: 'dcms-ai-activity-2022',
    measure: '% of UK businesses that had adopted AI (modelled)',
    population: 'UK private businesses',
    period: '2020',
    bands: [
      { band: 'Small', value: 15 },
      { band: 'Medium', value: 34 },
      { band: 'Large', value: 68 },
    ],
  },
]

/** Industry / sector breakdowns, one source at a time. */
export const INDUSTRY_BREAKDOWNS = [
  {
    id: 'ons-2026-ind',
    label: 'ONS BICS June 2026 — using any AI',
    sourceId: 'ons-ai-2023-2026',
    measure: '% of UK businesses using AI (not recruitment-specific)',
    period: 'Jun 2026',
    rows: [
      { group: 'Information & communication', value: 58 },
      { group: 'Accommodation & food services', value: 20.6, caveat: 'Population (all sizes vs 10+) not stated in the figure notes' },
      { group: 'Construction', value: 13 },
    ],
  },
  {
    id: 'dsit-2025-ind',
    label: 'DSIT 2025 — using any AI',
    sourceId: 'dsit-ai-adoption-2026',
    measure: '% of UK private businesses (5+) using AI',
    period: 'Feb–May 2025',
    rows: [
      { group: 'Information & communication', value: 43 },
      { group: 'Business services', value: 23 },
      { group: 'Finance & real estate', value: 21 },
    ],
    footnote: 'Hotels & catering are reported only as 88% neither using nor planning to use AI.',
  },
  {
    id: 'mes-2023-ind',
    label: 'ONS MES 2023 — adopted AI',
    sourceId: 'ons-mes-2023',
    measure: '% of UK firms (10+) adopting AI',
    period: '2023',
    rows: [
      { group: 'Information & communication', value: 27 },
      { group: 'Services (all)', value: 9 },
      { group: 'Manufacturing', value: 5 },
    ],
  },
  {
    id: 'cipd-2026-sector',
    label: 'CIPD 2026 — NOT using AI in recruitment',
    sourceId: 'cipd-rtp-2026',
    measure: '% of organisations not using AI/ML in recruitment',
    period: 'Apr–May 2026',
    inverted: true,
    rows: [
      { group: 'Private sector', value: 52 },
      { group: 'Public sector', value: 68 },
      { group: 'Non-profit', value: 71 },
    ],
  },
] as const

/** Technology types. */
export const TECH_TYPES = [
  { tech: 'Text generation using LLMs', value: 21, sourceId: 'ons-bics-oct-2026', population: 'UK businesses 10+, Sep 2026', family: 'Business-wide' },
  { tech: 'Visual content creation', value: 19, sourceId: 'ons-bics-oct-2026', population: 'UK businesses 10+, Sep 2026', family: 'Business-wide' },
  { tech: 'Generating pictures, video or audio', value: 9.55, sourceId: 'eurostat-ai-2025', population: 'EU27 enterprises 10+, 2025', family: 'Business-wide' },
  { tech: 'AI-written job descriptions', value: 16, sourceId: 'cipd-rtp-2026', population: 'UK HR respondents, 2026', family: 'Recruitment' },
  { tech: 'AI shortlisting / screening', value: 16, sourceId: 'cipd-rtp-2026', population: 'UK HR respondents, 2026', family: 'Recruitment' },
  { tech: 'Recruitment chatbots', value: 14, sourceId: 'cipd-rtp-2026', population: 'UK HR respondents, 2026', family: 'Recruitment' },
] as const

/** Geography coverage of the evidence base. */
export const REGIONS = [
  { region: 'United Kingdom', sources: ['cipd-rtp-2024', 'cipd-rtp-2026', 'ons-bics-oct-2026', 'ons-mes-2023', 'dsit-ai-adoption-2026', 'dcms-ai-activity-2022'], recruitmentSpecific: true, headline: 'CIPD: ~31% (2024) and ~38% (2026, derived) of HR respondents’ organisations use AI/ML in recruitment' },
  { region: 'European Union (EU27)', sources: ['eurostat-ai-2025'], recruitmentSpecific: true, headline: 'Eurostat: 0.62% of all enterprises (10+) used AI for HR or recruitment in 2021 — the only year collected' },
  { region: 'United States', sources: ['shrm-2025', 'oecd-am-2025'], recruitmentSpecific: false, headline: 'SHRM: 43% of surveyed HR professionals report AI in HR tasks (2025, unweighted panel)' },
  { region: 'Six OECD countries', sources: ['oecd-am-2025'], recruitmentSpecific: false, headline: 'OECD: algorithmic management tools in 90% (US), 79% (European average) and 40% (Japan) of firms with 20+ employees' },
]

/** Algorithmic management by country (OECD 2025). */
export const OECD_AM = [
  { country: 'United States', value: 90 },
  { country: 'European average (FR, DE, IT, ES)', value: 79 },
  { country: 'Japan', value: 40 },
]

/** CIPD 2024, Figure 28: perceived effects among AI users (n = 281, unweighted). */
export const CIPD_PERCEIVED = [
  { effect: 'Hiring efficiency increased', value: 66 },
  { effect: 'Useful information for resource planning increased', value: 62 },
  { effect: 'Resourcing performance increased', value: 59 },
  { effect: 'Number of people in resourcing increased', value: 48 },
  { effect: 'Hiring costs increased', value: 47 },
]
