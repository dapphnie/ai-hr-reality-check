/**
 * Governance & risk content. Legal status verified against legislation.gov.uk,
 * ico.org.uk, gov.uk and the European Commission AI Act Service Desk
 * (consolidated text as at 27 July 2026) on 22 October 2026.
 * This is an educational summary, not legal advice.
 */

export type Jurisdiction = 'UK' | 'EU'

export type DomainId =
  | 'bias'
  | 'transparency'
  | 'oversight'
  | 'privacy'
  | 'vendor'
  | 'adm'
  | 'accessibility'
  | 'control'

export interface Provision {
  id: string
  jurisdiction: Jurisdiction
  instrument: string
  provision: string
  summary: string
  status: string
  statusTone: 'in-force' | 'pending' | 'guidance' | 'draft'
  url: string
  sourceId: string
  domains: DomainId[]
}

export interface Domain {
  id: DomainId
  title: string
  risk: string
  evidence: string
  evidenceSourceIds: string[]
  dissertationLink?: string
}

export const DOMAINS: Domain[] = [
  {
    id: 'bias',
    title: 'Algorithmic bias & fairness',
    risk: 'Tools trained on historical decisions, proxy variables or unrepresentative data can disadvantage groups sharing protected characteristics — and filters can be configured to exclude them directly.',
    evidence:
      'The ICO’s 2024 audits found some tools allowed filtering that could exclude candidates with protected characteristics, and some inferred gender or ethnicity from names — an approach the ICO judged not accurate enough to monitor bias. Vendor claims to have removed bias are hard to verify externally.',
    evidenceSourceIds: ['ico-audit-2024', 'raghavan-2020', 'sanchez-2020'],
  },
  {
    id: 'transparency',
    title: 'Transparency & explainability',
    risk: 'Candidates — and often employers — cannot see what data a tool uses, what logic it applies, or how to challenge an outcome.',
    evidence: 'The ICO recommended detailed privacy information on what data the AI uses, the logic involved and training use, with contracts stating who provides it.',
    evidenceSourceIds: ['ico-audit-2024', 'dsit-responsible-ai-2024'],
    dissertationLink: 'Platform users could operate a job board while saying they did not know how it actually worked (P08).',
  },
  {
    id: 'oversight',
    title: 'Human oversight',
    risk: 'Human review that is nominal — rubber-stamping scores — provides little protection, and may not count as “meaningful human involvement”.',
    evidence:
      'The ICO advised recruiters not to use fit or suitability scores to make automated decisions, and providers to formalise, train and record human reviews. Ethnographic work found developers drifting back to hybrid human–machine practice.',
    evidenceSourceIds: ['ico-audit-2024', 'ico-rewired-2026', 'vandenbroek-2021'],
    dissertationLink: 'Across the eight accounts, final assessment remained a managerial stage — mediation of access without automation of assessment.',
  },
  {
    id: 'privacy',
    title: 'Data protection & privacy',
    risk: 'Excessive collection, scraping of social-media data, indefinite retention and reuse of applicant data to train vendor models.',
    evidence: 'The ICO found some tools collected far more personal information than necessary, including data scraped from social media, and recommended DPIAs before processing.',
    evidenceSourceIds: ['ico-audit-2024', 'ico-blog-2024'],
  },
  {
    id: 'vendor',
    title: 'Vendor accountability',
    risk: 'Unclear controller/processor roles leave nobody clearly accountable; accuracy claims go untested.',
    evidence: 'Some providers incorrectly described themselves as processors under vague contracts. The ICO stressed accuracy “better than random is not enough”.',
    evidenceSourceIds: ['ico-audit-2024', 'raghavan-2020'],
  },
  {
    id: 'adm',
    title: 'Automated decision-making',
    risk: 'Rejections or progression decisions taken with no meaningful human involvement have legal effects for candidates and trigger specific safeguards.',
    evidence:
      'From voluntary engagement with over 30 employers, the ICO concluded in March 2026 that many were likely relying on solely automated decisions without meaningful human involvement, and wrote to 16 organisations.',
    evidenceSourceIds: ['ico-rewired-2026'],
  },
  {
    id: 'accessibility',
    title: 'Recruitment accessibility',
    risk: 'Timed games, video analysis or rigid online forms can disadvantage disabled candidates or those with limited digital access.',
    evidence:
      'DSIT guidance treats reasonable adjustments as a legal obligation under the Equality Act, including removing AI from the process where no adjustment works, and flags digital exclusion. Qualitative research in Australia identified failure to make reasonable adjustments as one route to algorithm-facilitated discrimination.',
    evidenceSourceIds: ['dsit-responsible-ai-2024', 'sheard-2025'],
  },
  {
    id: 'control',
    title: 'Perceived vs actual algorithmic control',
    risk: 'Employers may feel in control of hiring while ranking, matching or visibility functions upstream shape who they ever see — or feel at a platform’s mercy without evidence of how it works.',
    evidence:
      'Perceptions of algorithms are formed from their effects, whether or not they match the mechanism (the “algorithmic imaginary”). Where a score plays a determining role, the CJEU has treated the scoring itself as an automated decision.',
    evidenceSourceIds: ['bucher-2017', 'cjeu-schufa-2023', 'ugur-2026'],
    dissertationLink:
      'One participant felt largely at the job board’s mercy over candidate flow; another located control entirely with the manager over the hiring decision. Both may be true: control was stage-specific.',
  },
]

export const PROVISIONS: Provision[] = [
  // UK
  {
    id: 'uk-22a',
    jurisdiction: 'UK',
    instrument: 'UK GDPR, Arts 22A–22D (inserted by Data (Use and Access) Act 2025, s.80)',
    provision: 'Automated decision-making',
    summary:
      'Replaces the former Art 22. A decision is “based solely on automated processing” where there is no meaningful human involvement. Significant solely automated decisions cannot rely on special category data except in narrow cases (Art 22B), and must come with safeguards: information, the ability to make representations, human intervention and the ability to contest (Art 22C).',
    status: 'In force since 5 Feb 2026 (SI 2026/82)',
    statusTone: 'in-force',
    url: 'https://www.legislation.gov.uk/eur/2016/679/article/22A',
    sourceId: 'uk-duaa-2025',
    domains: ['adm', 'oversight', 'control'],
  },
  {
    id: 'uk-ico-adm',
    jurisdiction: 'UK',
    instrument: 'ICO draft guidance on automated decision-making and profiling',
    provision: 'Regulator guidance reflecting Arts 22A–22D',
    summary: 'Consultation draft (31 Mar – 29 May 2026), including a new section on required safeguards. The ICO lists the final version as due “Winter 2026”.',
    status: 'Draft only (Oct 2026)',
    statusTone: 'draft',
    url: 'https://ico.org.uk/about-the-ico/ico-and-stakeholder-consultations/2026/03/ico-consultation-on-the-draft-guidance-about-automated-decision-making-including-profiling/',
    sourceId: 'ico-rewired-2026',
    domains: ['adm', 'oversight'],
  },
  {
    id: 'uk-13',
    jurisdiction: 'UK',
    instrument: 'UK GDPR, Arts 13(2)(f) and 14',
    provision: 'Transparency about automated decisions',
    summary: 'Controllers must tell individuals about the existence of automated decision-making, meaningful information about the logic involved and its envisaged consequences.',
    status: 'In force (wording amended 5 Feb 2026)',
    statusTone: 'in-force',
    url: 'https://www.legislation.gov.uk/eur/2016/679/article/13',
    sourceId: 'uk-duaa-2025',
    domains: ['transparency'],
  },
  {
    id: 'uk-35',
    jurisdiction: 'UK',
    instrument: 'UK GDPR, Art 35',
    provision: 'Data protection impact assessment',
    summary: 'A DPIA is required before processing likely to be high risk, specifically including systematic and extensive evaluation of personal aspects by automated processing with significant effects.',
    status: 'In force',
    statusTone: 'in-force',
    url: 'https://www.legislation.gov.uk/eur/2016/679/article/35',
    sourceId: 'uk-duaa-2025',
    domains: ['privacy', 'vendor'],
  },
  {
    id: 'uk-eqa',
    jurisdiction: 'UK',
    instrument: 'Equality Act 2010, ss.19, 20 and 39',
    provision: 'Indirect discrimination, reasonable adjustments, job applicants',
    summary:
      'A provision, criterion or practice — such as an algorithmic screening rule — that puts people sharing a protected characteristic at a particular disadvantage is unlawful unless a proportionate means of achieving a legitimate aim. Employers must make reasonable adjustments for disabled applicants and not discriminate in arrangements for deciding who is offered work.',
    status: 'In force',
    statusTone: 'in-force',
    url: 'https://www.legislation.gov.uk/ukpga/2010/15/section/19',
    sourceId: 'uk-equality-act-2010',
    domains: ['bias', 'accessibility'],
  },
  {
    id: 'uk-ico-audit',
    jurisdiction: 'UK',
    instrument: 'ICO, AI tools in recruitment: audit outcomes report',
    provision: 'Regulator findings and recommendations',
    summary: 'Consensual audits (Aug 2023 – May 2024) of AI sourcing, screening and selection tool providers produced 296 recommendations; 97% were accepted and none rejected. Seven key recommendations cover fairness, transparency, minimisation, DPIAs, controller roles, instructions and lawful basis.',
    status: 'Published Nov 2024',
    statusTone: 'guidance',
    url: 'https://ico.org.uk/media2/migrated/4031620/ai-in-recruitment-outcomes-report.pdf',
    sourceId: 'ico-audit-2024',
    domains: ['bias', 'transparency', 'privacy', 'vendor', 'oversight'],
  },
  {
    id: 'uk-dsit',
    jurisdiction: 'UK',
    instrument: 'DSIT, Responsible AI in Recruitment',
    provision: 'Assurance good practice by lifecycle stage',
    summary: 'Recommends impact assessments and a governance framework before procurement; bias audits, performance testing and model cards during procurement; piloting and staff training before deployment; ongoing bias audits and feedback in live operation.',
    status: 'Published Mar 2024 (non-statutory)',
    statusTone: 'guidance',
    url: 'https://www.gov.uk/government/publications/responsible-ai-in-recruitment-guide/responsible-ai-in-recruitment',
    sourceId: 'dsit-responsible-ai-2024',
    domains: ['bias', 'transparency', 'oversight', 'vendor', 'accessibility'],
  },
  {
    id: 'uk-framework',
    jurisdiction: 'UK',
    instrument: 'AI regulation: a pro-innovation approach (white paper, 2023; response, 2024)',
    provision: 'Five cross-sector principles applied by existing regulators',
    summary: 'Safety, security and robustness; transparency and explainability; fairness; accountability and governance; contestability and redress — applied on a non-statutory basis. There is no AI-specific UK bill as of October 2026.',
    status: 'Non-statutory policy',
    statusTone: 'guidance',
    url: 'https://www.gov.uk/government/publications/ai-regulation-a-pro-innovation-approach',
    sourceId: 'uk-ai-whitepaper-2023',
    domains: ['transparency', 'vendor', 'control'],
  },
  // EU
  {
    id: 'eu-annex3',
    jurisdiction: 'EU',
    instrument: 'AI Act (Reg. (EU) 2024/1689), Annex III point 4',
    provision: 'Employment and recruitment AI classified as high-risk',
    summary: 'Covers AI intended for recruitment or selection — including placing targeted job ads, analysing and filtering applications and evaluating candidates — and for decisions on promotion, termination, task allocation and performance monitoring.',
    status: 'High-risk obligations apply from 2 Dec 2027 (deferred from 2 Aug 2026 by Reg. (EU) 2026/1744)',
    statusTone: 'pending',
    url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/annex-3',
    sourceId: 'eu-ai-act',
    domains: ['bias', 'oversight', 'vendor', 'adm'],
  },
  {
    id: 'eu-omnibus',
    jurisdiction: 'EU',
    instrument: 'Digital Omnibus on AI, Reg. (EU) 2026/1744',
    provision: 'Revised application timeline (new Art 113)',
    summary: 'Adopted June 2026 and in force since 27 July 2026. Annex III high-risk obligations now apply from 2 December 2027; also softens the AI literacy duty and adds Art 4a on processing special category data for bias detection.',
    status: 'In force since 27 Jul 2026',
    statusTone: 'in-force',
    url: 'https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force',
    sourceId: 'eu-ai-omnibus-2026',
    domains: ['bias', 'vendor'],
  },
  {
    id: 'eu-art5',
    jurisdiction: 'EU',
    instrument: 'AI Act, Art 5(1)(f)',
    provision: 'Prohibition of emotion recognition at work',
    summary: 'Prohibits AI systems that infer the emotions of a person in the workplace (except for medical or safety reasons) — relevant to emotion analysis in video interviews.',
    status: 'Applies since 2 Feb 2025',
    statusTone: 'in-force',
    url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-5',
    sourceId: 'eu-ai-act',
    domains: ['bias', 'accessibility'],
  },
  {
    id: 'eu-art26',
    jurisdiction: 'EU',
    instrument: 'AI Act, Art 26',
    provision: 'Obligations of deployers (employers)',
    summary: 'Use per instructions; assign human oversight to competent, trained people with authority; monitor and suspend if risks emerge; keep logs for at least six months; inform workers’ representatives before deployment; inform people subject to Annex III decisions.',
    status: 'Applies to Annex III deployers from 2 Dec 2027',
    statusTone: 'pending',
    url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-26',
    sourceId: 'eu-ai-act',
    domains: ['oversight', 'transparency', 'control'],
  },
  {
    id: 'eu-art6',
    jurisdiction: 'EU',
    instrument: 'AI Act, Art 6(3)',
    provision: 'Derogation from high-risk classification',
    summary: 'An Annex III system is not high-risk if it performs only narrow procedural or preparatory tasks without significant risk — but systems that profile natural persons are always high-risk, which captures most candidate-scoring tools.',
    status: 'Applies from 2 Dec 2027',
    statusTone: 'pending',
    url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-6',
    sourceId: 'eu-ai-act',
    domains: ['adm', 'vendor'],
  },
  {
    id: 'eu-art4',
    jurisdiction: 'EU',
    instrument: 'AI Act, Art 4 (as amended)',
    provision: 'AI literacy',
    summary: 'Providers and deployers must take measures to support AI literacy among staff; since the Omnibus, no specific level of literacy is required.',
    status: 'Amended version applies from 27 Jul 2026',
    statusTone: 'in-force',
    url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-4',
    sourceId: 'eu-ai-omnibus-2026',
    domains: ['oversight', 'control'],
  },
  {
    id: 'eu-art86',
    jurisdiction: 'EU',
    instrument: 'AI Act, Art 86',
    provision: 'Right to explanation of individual decision-making',
    summary: 'People affected by decisions based on an Annex III high-risk system’s output, with significant adverse effects, can obtain clear and meaningful explanations of the AI’s role and the main elements of the decision.',
    status: 'Expected to bite once Annex III classification applies (interpretation)',
    statusTone: 'pending',
    url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-86',
    sourceId: 'eu-ai-act',
    domains: ['transparency', 'adm'],
  },
  {
    id: 'eu-gdpr22',
    jurisdiction: 'EU',
    instrument: 'EU GDPR, Art 22 and CJEU C-634/21 (SCHUFA), 2023',
    provision: 'Automated individual decisions, including scoring',
    summary: 'The CJEU held that an automated score can itself be an automated individual decision where the recipient gives it a determining role. A vendor’s candidate “fit score” relied on decisively could fall within Art 22. A proposed GDPR omnibus amendment had not been adopted as of October 2026.',
    status: 'In force; amendment proposal pending',
    statusTone: 'in-force',
    url: 'https://curia.europa.eu/jcms/upload/docs/application/pdf/2023-12/cp230186en.pdf',
    sourceId: 'cjeu-schufa-2023',
    domains: ['adm', 'control', 'vendor'],
  },
]

export interface AssessmentQuestion {
  id: string
  domain: DomainId
  question: string
  why: string
  sourceIds: string[]
  jurisdictions: Jurisdiction[]
}

export const QUESTIONS: AssessmentQuestion[] = [
  { id: 'q1', domain: 'bias', question: 'What bias audits or adverse-impact tests has the vendor carried out, on which protected characteristics and with what data — and can we see the results?', why: 'ICO recommendation on monitoring accuracy and bias; DSIT bias audit at procurement; Equality Act s.19.', sourceIds: ['ico-audit-2024', 'dsit-responsible-ai-2024', 'uk-equality-act-2010'], jurisdictions: ['UK', 'EU'] },
  { id: 'q2', domain: 'bias', question: 'Does the tool infer gender, ethnicity or other characteristics, or allow recruiters to filter candidates in ways that could exclude protected groups?', why: 'Both practices were found in the ICO’s 2024 audits.', sourceIds: ['ico-audit-2024', 'uk-equality-act-2010'], jurisdictions: ['UK', 'EU'] },
  { id: 'q3', domain: 'bias', question: 'If special category data is used to monitor bias, what is the lawful basis and condition — and, for EU roles, are the AI Act Art 4a safeguards met?', why: 'ICO lawful-basis recommendation; new EU Art 4a.', sourceIds: ['ico-audit-2024', 'eu-ai-omnibus-2026'], jurisdictions: ['UK', 'EU'] },
  { id: 'q4', domain: 'adm', question: 'Will any rejection or progression happen with no meaningful human involvement? If so, which lawful route applies, and how will we provide information, representations, human intervention and a way to contest?', why: 'UK GDPR Arts 22A–22C (in force Feb 2026); ICO findings that many employers likely rely on solely automated decisions.', sourceIds: ['uk-duaa-2025', 'ico-rewired-2026'], jurisdictions: ['UK'] },
  { id: 'q5', domain: 'oversight', question: 'Who reviews AI outputs? Are they trained, given time and empowered to override — and is review applied consistently to every candidate at every stage and recorded?', why: 'ICO human-review expectations; AI Act Art 26(2).', sourceIds: ['ico-audit-2024', 'ico-rewired-2026', 'eu-ai-act'], jurisdictions: ['UK', 'EU'] },
  { id: 'q6', domain: 'control', question: 'Are fit or suitability scores advisory only? How will we detect and prevent rubber-stamping, so that human control is real rather than nominal?', why: '“Meaningful human involvement” (Art 22A); CJEU “determining role” of scores; ICO advice not to use scores to make automated decisions.', sourceIds: ['uk-duaa-2025', 'cjeu-schufa-2023', 'ico-audit-2024'], jurisdictions: ['UK', 'EU'] },
  { id: 'q7', domain: 'control', question: 'Beyond tools we buy, which functions in the platforms we already use — job-board ranking, matching, paid visibility, knock-out questions — shape who reaches us, and who in the team understands and configures them?', why: 'Platform-mediated recruitment may not be recognised as AI; configuration knowledge can be distributed with recruitment work.', sourceIds: ['ugur-2026', 'fichman-2025'], jurisdictions: ['UK', 'EU'] },
  { id: 'q8', domain: 'transparency', question: 'What will candidates be told about AI use, the logic involved and how to challenge a decision — and who is contractually responsible for telling them?', why: 'UK GDPR Arts 13/14; ICO transparency recommendation; AI Act Arts 26(11) and 50.', sourceIds: ['uk-duaa-2025', 'ico-audit-2024', 'eu-ai-act'], jurisdictions: ['UK', 'EU'] },
  { id: 'q9', domain: 'transparency', question: 'Can the vendor provide model documentation (for example a model card) sufficient for us to explain an individual outcome on request?', why: 'DSIT model cards; ICO explainability; AI Act Art 86 for EU roles.', sourceIds: ['dsit-responsible-ai-2024', 'ico-audit-2024', 'eu-ai-act'], jurisdictions: ['UK', 'EU'] },
  { id: 'q10', domain: 'privacy', question: 'Has a DPIA been completed before procurement, does it record privacy trade-offs, and will it be updated as the tool or its use changes?', why: 'UK GDPR Art 35(3)(a); ICO recommends DPIAs early and kept up to date.', sourceIds: ['uk-duaa-2025', 'ico-audit-2024', 'ico-blog-2024'], jurisdictions: ['UK', 'EU'] },
  { id: 'q11', domain: 'privacy', question: 'What is the minimum data the tool needs? Is any data scraped or repurposed, how long is it kept, and is it used to train the vendor’s models?', why: 'ICO found excessive collection, including social-media scraping.', sourceIds: ['ico-audit-2024', 'ico-blog-2024'], jurisdictions: ['UK', 'EU'] },
  { id: 'q12', domain: 'vendor', question: 'Is the vendor a controller, joint controller or processor for each processing activity — and is this set out in the contract with explicit instructions and audit rights?', why: 'ICO recommendations on roles and written instructions.', sourceIds: ['ico-audit-2024', 'ico-blog-2024'], jurisdictions: ['UK', 'EU'] },
  { id: 'q13', domain: 'vendor', question: 'What accuracy and validity evidence exists beyond “better than random”, from whom, and what are the monitoring, incident-reporting and suspension procedures?', why: 'ICO accuracy expectations; DSIT ongoing performance testing; AI Act Art 26(5)–(6).', sourceIds: ['ico-audit-2024', 'dsit-responsible-ai-2024', 'raghavan-2020'], jurisdictions: ['UK', 'EU'] },
  { id: 'q14', domain: 'accessibility', question: 'How can disabled candidates request a reasonable adjustment or a non-AI alternative, and has the process been checked for digital exclusion?', why: 'Equality Act ss.20 and 39(5); DSIT guidance.', sourceIds: ['uk-equality-act-2010', 'dsit-responsible-ai-2024'], jurisdictions: ['UK'] },
  { id: 'q15', domain: 'adm', question: 'For EU roles: is the tool high-risk under Annex III point 4? Does it profile candidates (ruling out the Art 6(3) derogation)? Are we ready for deployer duties from 2 December 2027?', why: 'AI Act Annex III, Arts 6, 26 and 113 as amended.', sourceIds: ['eu-ai-act', 'eu-ai-omnibus-2026'], jurisdictions: ['EU'] },
  { id: 'q16', domain: 'bias', question: 'Does any feature infer emotions from video, voice or text?', why: 'Prohibited in EU workplaces since 2 February 2025 (Art 5(1)(f)).', sourceIds: ['eu-ai-act'], jurisdictions: ['EU'] },
  { id: 'q17', domain: 'oversight', question: 'Have we informed workers’ representatives, supported staff AI literacy, and named who is accountable for the tool, with a feedback channel for candidates and staff?', why: 'AI Act Arts 4 and 26(7); DSIT governance framework; UK accountability and contestability principles.', sourceIds: ['eu-ai-act', 'dsit-responsible-ai-2024', 'uk-ai-whitepaper-2023'], jurisdictions: ['UK', 'EU'] },
]

export const TIMELINE = [
  { date: '2010-10', label: 'Equality Act 2010 in force', jurisdiction: 'UK' as const },
  { date: '2023-03', label: 'UK AI regulation white paper', jurisdiction: 'UK' as const },
  { date: '2023-12', label: 'CJEU SCHUFA ruling on automated scoring', jurisdiction: 'EU' as const },
  { date: '2024-03', label: 'DSIT Responsible AI in Recruitment guide', jurisdiction: 'UK' as const },
  { date: '2024-08', label: 'EU AI Act enters into force', jurisdiction: 'EU' as const },
  { date: '2024-11', label: 'ICO AI recruitment audit outcomes', jurisdiction: 'UK' as const },
  { date: '2025-02', label: 'EU ban on workplace emotion recognition applies', jurisdiction: 'EU' as const },
  { date: '2025-06', label: 'Data (Use and Access) Act 2025 Royal Assent', jurisdiction: 'UK' as const },
  { date: '2026-02', label: 'UK GDPR Arts 22A–22D in force', jurisdiction: 'UK' as const },
  { date: '2026-03', label: 'ICO “Recruitment rewired” findings; draft ADM guidance', jurisdiction: 'UK' as const },
  { date: '2026-07', label: 'EU AI Omnibus in force; high-risk dates deferred', jurisdiction: 'EU' as const },
  { date: '2027-12', label: 'EU Annex III (recruitment) high-risk obligations apply', jurisdiction: 'EU' as const },
]
