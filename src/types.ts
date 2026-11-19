/**
 * Core data schema. Every quantitative value, claim and finding in the app
 * resolves to a Source in the Evidence Library via `sourceId`.
 */

/** What kind of knowledge a source produces — drives badges and filters. */
export type EvidenceKind =
  | 'official-statistics' // national/supranational statistical surveys (ONS, Eurostat)
  | 'professional-survey' // professional bodies and industry associations (CIPD, SHRM)
  | 'peer-reviewed' // peer-reviewed academic research
  | 'working-paper' // working papers and preprints (not yet peer-reviewed)
  | 'independent-survey' // independent, non-commercial survey research (e.g. Pew)
  | 'regulatory' // legislation, regulator reports and guidance
  | 'government' // government guidance and commissioned research
  | 'journalism' // investigative / data journalism
  | 'vendor' // marketing or vendor-published material (a claim, not evidence)
  | 'qualitative-dissertation' // the author's own MSc study

/** The epistemic character of the evidence, kept separate from its publisher type. */
export type EvidenceDesign =
  | 'quantitative-survey'
  | 'quantitative-experiment'
  | 'quantitative-field'
  | 'qualitative'
  | 'review'
  | 'conceptual'
  | 'legal-text'
  | 'audit'
  | 'mixed'
  | 'marketing'

export interface Source {
  id: string
  shortCite: string // e.g. "Hogarth & McCartney (2024)"
  authors: string
  year: number
  title: string
  venue: string // journal, publisher or issuing body
  kind: EvidenceKind
  design: EvidenceDesign
  url: string
  doi?: string
  methodology: string
  sample: string
  geography: string
  keyFindings: string[]
  limitations: string
  citedInDissertation: boolean
  /** How the entry was checked when the dataset was compiled. */
  verification: 'verified-primary' | 'verified-secondary' | 'citation-only'
  accessed: string // ISO date the link was last checked
  topics: string[]
}

export type AssessmentLabel =
  | 'Supported'
  | 'Partially Supported'
  | 'Mixed Evidence'
  | 'Insufficient Evidence'
  | 'Unsupported'

export type ClaimCategory =
  | 'Fairness & bias'
  | 'Efficiency'
  | 'Adoption'
  | 'Quality of hire'
  | 'Human oversight'
  | 'SMEs'
  | 'Assessment validity'
  | 'Candidate experience'
  | 'Generative AI'

export interface EvidencePoint {
  sourceId: string
  finding: string
  design: string // short methodological descriptor e.g. "Field experiment, 1 firm, US"
}

export interface Claim {
  id: string
  claim: string
  category: ClaimCategory
  /** Who makes the claim, in what form. Quoted text kept under 15 words. */
  claimOrigin: {
    description: string
    sourceId?: string
    quote?: string
  }
  supporting: EvidencePoint[]
  qualifying: EvidencePoint[]
  methodologyNote: string
  evidencePeriod: string
  limitations: string
  assessment: AssessmentLabel
  reasoning: string
  /** What the author's dissertation adds, if anything. Qualitative context only. */
  dissertationLink?: string
}

export type OrgSize = 'All sizes' | 'SME' | 'Small' | 'Medium' | 'Large' | 'Micro'

export type TechnologyType =
  | 'Any AI technology'
  | 'AI/ML in recruitment'
  | 'AI for HR or recruitment'
  | 'Generative AI'
  | 'Algorithmic management'
  | 'AI in HR (any)'

/**
 * A single reported value. `seriesId` groups values measured the same way
 * (same question, population and denominator). Only values that share a
 * seriesId are ever drawn on the same line.
 */
export interface AdoptionPoint {
  id: string
  seriesId: string
  sourceId: string
  year: number
  /** Fieldwork / reference period as published, e.g. "Spring 2024". */
  period: string
  value: number
  unit: '%'
  orgSize: OrgSize
  industry: string
  hrFunction: string
  technology: TechnologyType
  geography: string
  note?: string
  pageRef?: string
}

export interface AdoptionSeries {
  id: string
  label: string
  sourceId: string
  /** Exact measured concept, as close to the published wording as possible. */
  definition: string
  population: string
  denominator: string
  method: string
  sampleSize: string
  geography: string
  technology: TechnologyType
  /** Comparability family — series in different families must not be combined. */
  family: string
  caveats: string[]
}
