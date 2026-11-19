/**
 * The conceptual distinctions the whole application is organised around.
 * Derived from the dissertation's literature review (Chapter 2) and findings.
 */
export interface Concept {
  id: string
  name: string
  short: string
  definition: string
  /** How well conventional adoption surveys are likely to capture it. Interpretation, not measurement. */
  surveyVisibility: 'Usually captured' | 'Partly captured' | 'Rarely captured'
  surveyNote: string
  example: string
  exampleSourceId: string
}

export const CONCEPTS: Concept[] = [
  {
    id: 'explicit-adoption',
    name: 'Explicit AI adoption',
    short: 'A tool the organisation chose and recognises as AI',
    definition:
      'The organisation deliberately procures, develops or switches on a technology it identifies as AI or machine learning — for example a CV-screening module or an assessment product.',
    surveyVisibility: 'Usually captured',
    surveyNote: 'This is what organisational surveys ask respondents to report. It depends on the respondent recognising and naming the technology.',
    example: 'CIPD’s 2024 survey records the share of UK organisations reporting AI/ML use in recruitment.',
    exampleSourceId: 'cipd-rtp-2024',
  },
  {
    id: 'platform-mediation',
    name: 'Platform-mediated recruitment',
    short: 'A job board or social platform shapes who is seen',
    definition:
      'Vacancies and applications flow through third-party platforms whose ranking, matching, recommendation or visibility functions shape which candidates become visible — whether or not the employer has bought a system of its own.',
    surveyVisibility: 'Rarely captured',
    surveyNote:
      'Posting on a job board is a decision about where to advertise. It does not require a separate judgement about embedded algorithmic functions, so it may not be reported as “AI use”. Using such a platform does not by itself make an employer an AI adopter.',
    example: 'Participants advertised on Indeed or Instagram while generally discussing filtering and candidate flow without describing them as AI.',
    exampleSourceId: 'ugur-2026',
  },
  {
    id: 'automated-assessment',
    name: 'Automated candidate assessment',
    short: 'A system performs evaluative judgements',
    definition:
      'A system scores, ranks or classifies candidates for selection — such as psychometric scoring, automated CV ranking used to reject, or video-interview analysis.',
    surveyVisibility: 'Partly captured',
    surveyNote: 'Recognisable as a product, so usually reportable — but surveys rarely distinguish whether the output informs or determines the decision.',
    example: 'Research on automated hiring systems examines identifiable vendor products performing parts of assessment.',
    exampleSourceId: 'sanchez-2020',
  },
  {
    id: 'genai-assistance',
    name: 'Generative AI assistance',
    short: 'Free or embedded tools that draft text',
    definition:
      'Large-language-model tools used ad hoc to draft job adverts, interview questions or messages — often free consumer tools or features added to existing recruitment software.',
    surveyVisibility: 'Partly captured',
    surveyNote: 'Individual, informal use may not be known to the survey respondent; embedded features may be invisible as a separate “tool”.',
    example: 'Two participants described generative AI drafting job adverts; in one case the manager rewrote the draft.',
    exampleSourceId: 'ugur-2026',
  },
  {
    id: 'algorithmic-awareness',
    name: 'Algorithmic awareness',
    short: 'Whether the user recognises algorithmic functions at all',
    definition:
      'The degree to which the person doing the hiring recognises platform functions as algorithmic or AI-based. Practical competence in using a platform can coexist with limited explanatory understanding.',
    surveyVisibility: 'Rarely captured',
    surveyNote: 'Adoption surveys presuppose awareness: an unrecognised function cannot be reported.',
    example: 'One participant described knowing enough to use a job board without knowing how it actually works (P08).',
    exampleSourceId: 'ugur-2026',
  },
  {
    id: 'non-use',
    name: 'Deliberate non-use & discontinuance',
    short: 'Choosing not to use, or stopping after trial',
    definition:
      'A reasoned decision not to use a technology, or to stop after trying it. Non-use can reflect a judgement about relevance rather than a lack of capability or awareness.',
    surveyVisibility: 'Partly captured',
    surveyNote: 'Surveys record “no use” but not its meaning: never-use, withdrawal after trial and deliberate avoidance all collapse into the same answer.',
    example: 'One participant stopped using a job board after a poor trial; another deliberately avoided open online channels.',
    exampleSourceId: 'ugur-2026',
  },
]

/** Stages of the recruitment lifecycle, with typical AI / algorithmic applications. */
export const LIFECYCLE = [
  {
    stage: 'Workforce planning & job design',
    applications: ['Skills inference and labour-market analytics', 'Generative drafting of job descriptions'],
    concept: 'genai-assistance',
  },
  {
    stage: 'Advertising & sourcing',
    applications: ['Job-board ranking and recommendation', 'Programmatic ad targeting', 'Candidate search and matching on professional networks'],
    concept: 'platform-mediation',
  },
  {
    stage: 'Application & screening',
    applications: ['Knock-out screening questions', 'CV parsing, matching and ranking', 'Chatbots for applicant queries'],
    concept: 'automated-assessment',
  },
  {
    stage: 'Assessment',
    applications: ['Game-based and psychometric scoring', 'Asynchronous video interview analysis', 'Automated skills tests'],
    concept: 'automated-assessment',
  },
  {
    stage: 'Interview & selection',
    applications: ['Interview scheduling automation', 'Interview-question generation', 'Decision-support summaries'],
    concept: 'explicit-adoption',
  },
  {
    stage: 'Offer & onboarding',
    applications: ['Offer-letter drafting', 'Automated onboarding workflows'],
    concept: 'genai-assistance',
  },
] as const
