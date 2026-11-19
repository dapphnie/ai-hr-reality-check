/**
 * Structured content from: Ugur, D. (2026) Beyond Adoption: How Small Hospitality
 * Owner-Managers and Managers Encounter Algorithmic Recruitment in Brighton.
 * MSc HRM dissertation, University of Sussex Business School.
 *
 * Integrity rules applied to this file:
 *  - Participants appear only as P01–P08 (the dissertation's own pseudonymous codes).
 *  - No verbatim interview quotations are reproduced; accounts are paraphrased or
 *    referenced by the dissertation's first-order code labels.
 *  - Participant descriptions of ranking, filtering or matching are recorded as
 *    their interpretations, never as evidence of how platforms technically operate.
 *  - Nothing here is a prevalence estimate. n = 8, one sector, one city.
 */

export type ParticipantId = 'P01' | 'P02' | 'P03' | 'P04' | 'P05' | 'P06' | 'P07' | 'P08'
export const PARTICIPANTS: ParticipantId[] = ['P01', 'P02', 'P03', 'P04', 'P05', 'P06', 'P07', 'P08']

export type ThemeId = 'reach' | 'verification' | 'control'

export const STUDY = {
  title: 'Beyond Adoption: How Small Hospitality Owner-Managers and Managers Encounter Algorithmic Recruitment in Brighton',
  author: 'Defne Ugur',
  degree: 'MSc Human Resource Management',
  institution: 'University of Sussex Business School',
  submitted: 'September 2026',
  mainQuestion:
    'How do owner-managers and managers responsible for recruitment in small hospitality businesses in Brighton make sense of, respond to, or remain outside platform-mediated recruitment processes in their everyday hiring practice?',
  supportingQuestions: [
    'How do small hospitality businesses in Brighton currently recruit, and what characterises their everyday hiring practices?',
    'Among owner-managers and managers responsible for recruitment who use recruitment platforms, how do they understand, recognise, or engage with algorithmic or AI-labelled features such as candidate ranking, applicant filtering, or AI-assisted job advert writing?',
  ],
  design: [
    { label: 'Paradigm', value: 'Qualitative, interpretivist, with a practice-based orientation (Orlikowski, 2000)' },
    { label: 'Data', value: 'Eight semi-structured interviews, August 2026' },
    { label: 'Mode', value: 'Five in person at or near the business; three via University of Sussex Zoom' },
    { label: 'Length', value: 'Approximately 15–35 minutes (busy summer trading period)' },
    { label: 'Sampling', value: 'Purposive: aged 18+, English-speaking, small hospitality business in Brighton, involved in recruitment in the previous 12 months' },
    { label: 'Variation sought', value: 'Business type and approximate size (cafés, bars, restaurants, accommodation)' },
    { label: 'Analysis', value: 'Abductive reflexive thematic analysis (Braun and Clarke, 2019, 2021) with a cross-case matrix' },
    { label: 'Ethics', value: 'Approved by the University of Sussex Business School Faculty Research Ethics Committee, July 2026; informed consent; participants coded P01–P08' },
  ],
  sensitisingConcepts: [
    { term: 'Technology-in-practice', origin: 'Orlikowski (2000)', meaning: 'The recurrent pattern of use that forms as people work with a technology, as distinct from the artefact itself.' },
    { term: 'Non-use as judgement', origin: 'Wyatt (2003); Selwyn (2003)', meaning: 'Non-use can reflect a situated judgement about relevance rather than a deficiency to be remedied.' },
    { term: 'Mediation vs automation', origin: 'Developed in the dissertation from Sánchez-Monedero et al. (2020)', meaning: 'A platform shaping who becomes visible is different from a system performing evaluative judgements about candidates.' },
    { term: 'Algorithmic imaginary', origin: 'Bucher (2017)', meaning: 'Understandings of algorithms formed from perceived effects, which guide action whether or not they match the mechanism.' },
    { term: 'Discontinuance', origin: 'Altrichter and Benoit (2025)', meaning: 'Halting use after prior adoption, which differs from never having used a technology.' },
  ],
  limitations: [
    'Eight interviews in one sector and one city: conclusions are analytical and context-specific, not statistically generalisable.',
    'Narrated accounts rather than observed practice; accounts may reflect selective recall or retrospective interpretation.',
    'The study cannot establish which ranking, matching or filtering mechanisms technically operated in any platform.',
    'Interview depth varied (shortest about 15 minutes) because fieldwork took place in peak trading season.',
    'Possible self-selection and recruitment-route effects, including participants reached through personal or network introductions.',
    'Some priming could not be eliminated because related terminology appeared in the study title and participant materials.',
    'Cross-sectional: captures practice at one point in time, not how use or understanding changes.',
  ],
}

/**
 * Coded evidence: which account supports a theme, labelled with the final
 * first-order code from Appendix F (Table F1). Verbatim interview quotations
 * are deliberately not reproduced in this application.
 */
export interface CodedEvidence {
  participant: ParticipantId
  code: string
}

export interface Theme {
  id: ThemeId
  number: number
  title: string
  focus: string
  categories: string[]
  findings: string[]
  evidence: CodedEvidence[]
  contrasting: string
  interpretation: string
  literature: string[]
}

export const THEMES: Theme[] = [
  {
    id: 'reach',
    number: 1,
    title: 'Channel credibility and reach',
    focus: 'How recruitment routes differed in the access and prior knowledge they provided, and why wider reach was valued differently.',
    categories: ['Referral and vouching', 'Reach and fairness'],
    findings: [
      'Recruitment routes differed on two separable dimensions: how far they reached, and what prior knowledge about a candidate they carried.',
      'Where relational routes were used, trusted connections provided a form of relational pre-screening before formal assessment, without replacing the manager’s own judgement.',
      'Relational and open routes were not substitutes: even where platform use was extensive, trusted references contributed different information to the same hiring round.',
      'Wider reach was not automatically treated as an advantage. It was valued by some participants and deliberately avoided by others.',
      'Reach was not equated with fairness: one participant regarded a mix of routes as mostly fair while naming people it could miss.',
    ],
    evidence: [
      { participant: 'P02', code: 'Asks managers at nearby venues for candidates' },
      { participant: 'P07', code: 'Known and trusted references are valued' },
      { participant: 'P01', code: 'Friends and family used to find staff' },
      { participant: 'P06', code: 'Chooses not to advertise online to limit who applies' },
      { participant: 'P03', code: 'Platform reach valued as the main benefit' },
    ],
    contrasting:
      'P03, P04 and P05 did not describe using a vouched route, which prevents relational credibility being treated as a universal feature of small hospitality recruitment. The point is conditional: where vouching was used, it changed what was known about a candidate before direct assessment.',
    interpretation:
      'Everyday recruitment is better described as a configuration of routes whose value depends on the access and prior knowledge each provides, than as a choice between traditional and digital hiring.',
    literature: ['Harney and Alkhalaf (2021)', 'Chung and D’Annunzio-Green (2018)', 'Lockyer and Scholarios (2004)', 'Parry and Tyson (2008)', 'Fichman (2025)'],
  },
  {
    id: 'verification',
    number: 2,
    title: 'Application uncertainty and verification',
    focus: 'How participants dealt with uncertainty about applicant volume and candidate information, and how suitability was subsequently verified.',
    categories: ['Volume and conversion', 'Credibility of written and platform-mediated information', 'Verification through direct assessment'],
    findings: [
      'Two forms of uncertainty were analytically separate: volume (how many applications become candidates worth pursuing) and credibility (whether an applicant’s information can be relied upon).',
      'Higher application volume increased access without necessarily increasing clarity about whom to pursue; it created additional sorting work.',
      'Screening questions could depend on applicant self-report and still require later verification.',
      'One participant chose not to use a written application stage because of concern about candidate use of generative AI (a single case in the sample).',
      'Applications operated as provisional representations; final assessment remained a managerial, not platform-determined, stage in these accounts.',
    ],
    evidence: [
      { participant: 'P07', code: 'Many applications but few worth interviewing' },
      { participant: 'P08', code: 'Many applications but few worth interviewing' },
      { participant: 'P01', code: 'Platform filters do not sort applicants usefully' },
      { participant: 'P04', code: 'Applicants answer screening questions untruthfully' },
      { participant: 'P03', code: 'Chose not to use a written application form because of AI' },
      { participant: 'P02', code: 'Needs to meet the candidate before deciding' },
    ],
    contrasting:
      'P05 did not describe application volume as a difficulty, yet questioned whether the experience presented in a CV matched what a candidate could demonstrate. Credibility uncertainty therefore could not be reduced to a consequence of excessive volume.',
    interpretation:
      'These accounts show technological mediation of candidate access without automation of candidate assessment: the platform changed how candidates arrived, not who judged them.',
    literature: ['Holm (2012)', 'Fichman (2025)', 'Sánchez-Monedero et al. (2020)', 'Van den Broek et al. (2021)', 'Lievens and Dunlop (2025)'],
  },
  {
    id: 'control',
    number: 3,
    title: 'Platform understanding and control',
    focus: 'How practical use related to understanding, visibility and perceived control at different stages of recruitment.',
    categories: ['Platform mechanics and stated limits of understanding', 'Division of recruitment work', 'Where control is located', 'Explicit AI recognition and use'],
    findings: [
      'Operational competence was separable from explanatory understanding: participants could recruit through a platform without claiming to know how it worked.',
      'Partial visibility could follow from the internal division of recruitment work, not only from the platform itself.',
      'Perceived control was stage-specific: limited influence over candidate flow or volume coexisted with retained authority over who was interviewed and hired.',
      'Recognition of AI or algorithmic processes was narrower than platform use: only some participants raised AI-related ideas or named a generative tool.',
      'Where generative AI drafted job adverts, its output was treated as material for managerial judgement, and in one case rewritten.',
    ],
    evidence: [
      { participant: 'P08', code: 'Can use the platform but cannot explain how it works' },
      { participant: 'P07', code: 'Another manager handles part of the recruitment process' },
      { participant: 'P04', code: 'Believes the platform decides which candidates reach him' },
      { participant: 'P05', code: 'Final hiring decision stays with the manager' },
      { participant: 'P07', code: 'Cannot control how many people apply' },
      { participant: 'P04', code: 'Generative AI used for advert wording' },
      { participant: 'P08', code: 'Generative AI used for advert wording' },
    ],
    contrasting:
      'P04 and P05 were not simple opposites: P04 located limited influence at the stage of candidate flow, while P05 located control in the final employment decision. They were describing different objects of control.',
    interpretation:
      'What participants described was a technology-in-practice rather than the artefact and its mechanisms. P04’s sense of being at the platform’s mercy is an algorithmic imaginary — reported as an interpretation, not as evidence of platform mechanics.',
    literature: ['Orlikowski (2000)', 'Bucher (2017)', 'Holm (2012)', 'Sheard (2025)'],
  },
]

/** Encounter positions. They are positions within a practice, not stages towards adoption. */
export type EncounterPosition =
  | 'Ongoing platform use'
  | 'Coexistence with relational routes'
  | 'Delegated platform work'
  | 'Use experienced as constraining'
  | 'Withdrawal after trial'
  | 'Deliberate non-use'

export const ENCOUNTER_POSITIONS: { id: EncounterPosition; definition: string; concept: string }[] = [
  { id: 'Ongoing platform use', definition: 'A job board or social platform is a current recruitment route — in some accounts the main one.', concept: 'Technology-in-practice (Orlikowski, 2000)' },
  { id: 'Coexistence with relational routes', definition: 'Platform advertising and trusted recommendation operate within the same hiring round, contributing different information.', concept: 'Channel credibility and reach' },
  { id: 'Delegated platform work', definition: 'Another manager configures the platform or drafts adverts; knowledge of the process is distributed with the work.', concept: 'Task redistribution (Holm, 2012)' },
  { id: 'Use experienced as constraining', definition: 'Use continues but the platform is felt to limit influence over a particular stage, such as candidate flow.', concept: 'Algorithmic imaginary (Bucher, 2017)' },
  { id: 'Withdrawal after trial', definition: 'A platform was tried, judged unsatisfactory, and the business returned to routes it already used.', concept: 'Discontinuance (Altrichter and Benoit, 2025)' },
  { id: 'Deliberate non-use', definition: 'A considered decision not to use open online channels because wider reach is not what the practice needs.', concept: 'Non-use as judgement (Wyatt, 2003; Selwyn, 2003)' },
]

export type Awareness = 'Raised AI / algorithms spontaneously' | 'Named a generative AI tool' | 'Discussed features without AI framing' | 'Not applicable (no platform use described)'

export interface ParticipantProfile {
  id: ParticipantId
  /** Recruitment routes as described in the dissertation's findings. */
  routes: string[]
  positions: EncounterPosition[]
  awareness: Awareness
  themes: ThemeId[]
  /** Short analytical summary, paraphrasing the dissertation. */
  summary: string
}

export const PROFILES: ParticipantProfile[] = [
  {
    id: 'P01',
    routes: ['Friends and family', 'Industry contacts', 'Indeed (tried, then stopped)'],
    positions: ['Withdrawal after trial'],
    awareness: 'Discussed features without AI framing',
    themes: ['reach', 'verification'],
    summary: 'Experimented with a job board, judged the experience and its filters unsatisfactory, and returned to friends, family and industry contacts — discontinuance, distinct from never-use.',
  },
  {
    id: 'P02',
    routes: ['Neighbouring venues (vouched referral)', 'In-person meetings'],
    positions: [],
    awareness: 'Discussed features without AI framing',
    themes: ['reach', 'verification'],
    summary: 'The clearest vouched route: asking managers at nearby venues for candidates — relational pre-screening that still ended in direct, face-to-face assessment.',
  },
  {
    id: 'P03',
    routes: ['Instagram post'],
    positions: ['Ongoing platform use'],
    awareness: 'Raised AI / algorithms spontaneously',
    themes: ['reach', 'verification', 'control'],
    summary: 'A social-media post drew more applicants than ever before (by the participant’s estimate, over one hundred). Valued reach, yet dropped a written application stage over concern about candidate use of AI.',
  },
  {
    id: 'P04',
    routes: ['Indeed'],
    positions: ['Ongoing platform use', 'Use experienced as constraining'],
    awareness: 'Raised AI / algorithms spontaneously',
    themes: ['verification', 'control'],
    summary: 'Felt the platform largely decided which candidates arrived, noted applicants answering screening filters untruthfully, and used generative AI to write a job advert because it felt expected.',
  },
  {
    id: 'P05',
    routes: ['Platform use described (no vouched route)'],
    positions: ['Ongoing platform use'],
    awareness: 'Discussed features without AI framing',
    themes: ['verification', 'control'],
    summary: 'Located control firmly with the manager at the final hiring decision. Did not find volume difficult, but questioned whether CVs reflected what candidates could actually demonstrate.',
  },
  {
    id: 'P06',
    routes: ['Relational / family-style recruitment'],
    positions: ['Deliberate non-use'],
    awareness: 'Not applicable (no platform use described)',
    themes: ['reach'],
    summary: 'Deliberately avoided open online channels: a wider audience was not needed because joining the business was framed as joining a family.',
  },
  {
    id: 'P07',
    routes: ['Indeed (heavy reliance)', 'Trusted references'],
    positions: ['Ongoing platform use', 'Coexistence with relational routes', 'Delegated platform work', 'Use experienced as constraining'],
    awareness: 'Discussed features without AI framing',
    themes: ['reach', 'verification', 'control'],
    summary: 'Relied heavily on a job board and faced very high volumes; a deputy configured the platform, so the participant was unsure how the advert was set up, while staying involved in interviews and decisions.',
  },
  {
    id: 'P08',
    routes: ['Indeed', 'Personal recommendation'],
    positions: ['Ongoing platform use', 'Coexistence with relational routes', 'Delegated platform work'],
    awareness: 'Named a generative AI tool',
    themes: ['reach', 'verification', 'control'],
    summary: 'Combined a job board with recommendations; could use the platform without knowing how it worked; declined paid promotion on cost; rewrote an assistant’s ChatGPT-drafted advert.',
  },
]

/** Stage-specific control (Theme 3): where participants located influence, by recruitment stage. */
export interface StageControl {
  stage: string
  perceivedLocus: 'Platform-shaped' | 'Shared / contested' | 'Managerial'
  accounts: { participant: ParticipantId; note: string }[]
}

export const STAGE_CONTROL: StageControl[] = [
  {
    stage: 'Advert drafting',
    perceivedLocus: 'Shared / contested',
    accounts: [
      { participant: 'P04', note: 'Used generative AI for the latest advert, framed as something now expected.' },
      { participant: 'P08', note: 'An assistant’s ChatGPT draft was judged overblown and rewritten by the manager.' },
    ],
  },
  {
    stage: 'Visibility & reach',
    perceivedLocus: 'Platform-shaped',
    accounts: [
      { participant: 'P04', note: 'Felt the job board largely decided which candidates reached them (an interpretation, not a technical finding).' },
      { participant: 'P08', note: 'Declined paid promotion on cost; assumed it would raise exposure but did not know by how much.' },
      { participant: 'P06', note: 'Controlled reach by staying off open channels altogether.' },
    ],
  },
  {
    stage: 'Application volume',
    perceivedLocus: 'Platform-shaped',
    accounts: [
      { participant: 'P07', note: 'Saw no way to control how many people apply; around 500 applications to sort.' },
      { participant: 'P03', note: 'Eventually asked applicants to stop sending more after an Instagram post.' },
    ],
  },
  {
    stage: 'Screening & filtering',
    perceivedLocus: 'Shared / contested',
    accounts: [
      { participant: 'P01', note: 'Judged that the platform’s filters did not sort applicants usefully.' },
      { participant: 'P04', note: 'Applicants can self-report meeting filter criteria, so screening still needs checking.' },
    ],
  },
  {
    stage: 'Verification & interview',
    perceivedLocus: 'Managerial',
    accounts: [
      { participant: 'P02', note: 'Meets candidates in person to see how they present, talk and move.' },
      { participant: 'P05', note: 'Tests whether CV claims match what a candidate can demonstrate.' },
      { participant: 'P07', note: 'Managers do the interviews together.' },
    ],
  },
  {
    stage: 'Hiring decision',
    perceivedLocus: 'Managerial',
    accounts: [{ participant: 'P05', note: 'Located control entirely with the manager over who is hired.' }],
  },
]

export const IMPLICATIONS = [
  {
    audience: 'HR practitioners',
    layer: 'interpretation' as const,
    points: [
      'Evaluate channels by the problem they solve, not by reach alone: extra exposure can add processing work where applications already exceed assessment capacity.',
      'Treat platform-mediated applications as provisional representations; keep the point where suitability is judged clearly human and documented.',
      'Map which functions influence candidate access, filtering or progression — and who understands and oversees each one — rather than only listing tools formally “adopted”.',
    ],
  },
  {
    audience: 'SMEs and owner-managers',
    layer: 'interpretation' as const,
    points: [
      'Relational and digital routes can be combined deliberately: open channels extend access, trusted routes add prior knowledge.',
      'Count managerial time, not just advertising spend, when judging whether wider reach is worth it.',
      'Where recruitment work is shared, agree who configures adverts and screening questions and who makes appointment decisions.',
    ],
  },
  {
    audience: 'AI governance and policy',
    layer: 'hypothesis' as const,
    points: [
      'Adoption surveys measure recognised use. Algorithmic functions embedded in ordinary job boards may sit outside what employers report as “AI”, so governance that relies on self-identified AI use may miss them. (An open question this study raises but cannot settle.)',
      'Accountability frameworks built around a procured system with an identifiable deployer fit less neatly where the employer encounters ranking or filtering only as features of a third-party channel.',
      'Candidate-side generative AI may change what employers can infer from written applications — a direction future research could examine.',
    ],
  },
]

export const CONTRIBUTIONS = [
  'Recruitment routes in the small firms studied carried different kinds of information (reach vs relational credibility), explaining why relational and platform routes remained valuable alongside one another.',
  'Mediation of candidate access can be separated, on empirical grounds, from automation of candidate assessment — extending attention beyond identifiable automated hiring systems.',
  'The non-use literature’s caution about treating adoption as the expected outcome is extended to organisational recruitment: deliberate non-use and withdrawal can be reasoned judgements.',
]
