import type { Claim } from '../types'

/**
 * Claims about AI in recruitment, each assessed against independent evidence.
 * Assessments judge the claim AS STATED. Reasoning is always given.
 */
export const CLAIMS: Claim[] = [
  {
    id: 'bias-eliminate',
    claim: 'AI eliminates recruitment bias.',
    category: 'Fairness & bias',
    claimOrigin: {
      description:
        'A long-running marketing theme for assessment and screening vendors. A pymetrics co-founder argued in Harvard Business Review that AI holds the greatest promise for eliminating bias in hiring; vendor materials audited by Raghavan et al. made similar no-bias claims.',
      sourceId: 'polli-2019',
      quote: 'AI holds the greatest promise for eliminating bias in hiring',
    },
    supporting: [
      { sourceId: 'li-2026', finding: 'An exploration-based screening algorithm would have raised the Black and Hispanic share of selected applicants from about 10% to 23%, and all tested algorithms increased the share of women selected.', design: 'Counterfactual evaluation, 1 US firm, 88,666 applications' },
      { sourceId: 'avery-2024', finding: 'When evaluators saw AI scores, a gender gap in human ratings closed; women were relatively more likely to complete applications when told AI would assess them.', design: 'Two field experiments, 1 tech role, Australia (working paper)' },
    ],
    qualifying: [
      { sourceId: 'li-2026', finding: 'The same study found a conventional supervised-learning screener would cut the Black and Hispanic share of selected applicants to 2–5% — design choices decide the direction.', design: 'Counterfactual evaluation, 1 US firm' },
      { sourceId: 'cowgill-2019', finding: 'Theory shows algorithms trained on past decisions remove inherited bias only when those decisions were sufficiently noisy; otherwise they codify or amplify it.', design: 'Theoretical model (working paper)' },
      { sourceId: 'dastin-2018', finding: 'Amazon abandoned an experimental CV scorer that penalised CVs containing the word “women’s”.', design: 'Investigative journalism, 1 firm' },
      { sourceId: 'wilson-caliskan-2024', finding: 'Text-embedding retrieval favoured White-associated names in 85.1% of tests; Black male-associated names were disadvantaged in up to 100% of comparisons.', design: 'Simulated audit, US names (gender results corrected by 2026 erratum)' },
      { sourceId: 'bloomberg-2024', finding: 'When GPT models ranked otherwise-identical CVs, Black-associated names were least likely to be ranked top for a financial analyst role; the direction of disparities varied by job.', design: 'Journalistic name-substitution test, US' },
      { sourceId: 'kochling-2020', finding: 'A systematic review found algorithmic decision-making in recruitment can produce unfair treatment and implicit discrimination despite its image of objectivity.', design: 'Systematic review, 36 articles' },
      { sourceId: 'raghavan-2020', finding: 'Of 18 assessment vendors, few disclosed how they validated models or tested adverse impact; claims of de-biasing were hard to verify.', design: 'Audit of public vendor documents, US' },
      { sourceId: 'ico-audit-2024', finding: 'Some audited UK tools allowed filtering that could exclude candidates with protected characteristics; some inferred gender or ethnicity from names.', design: 'Regulator audits of UK tool providers' },
    ],
    methodologyNote:
      'Evidence ranges from counterfactual analysis of real applicant data and field experiments to simulated name-substitution audits and document audits. No study observes the elimination of bias in a live system.',
    evidencePeriod: '2018–2026',
    limitations:
      'Most quantitative work is US-based, single-firm or simulated. Bias is measured on a few protected characteristics (mainly race and gender); disability and age are rarely tested.',
    assessment: 'Unsupported',
    reasoning:
      'No credible study shows AI eliminating bias. Whether algorithms reduce or amplify disparities depends on training data, target variables and design — the same dataset produced opposite results under different algorithms (Li et al.). Documented failures and regulator findings show bias can be built in or configured in. A narrower claim — that carefully designed and audited tools can reduce specific disparities in specific settings — has some support and would rate as Mixed Evidence.',
    dissertationLink:
      'In the dissertation, reach was not equated with fairness: one participant regarded a mix of routes as mostly fair while naming people it could miss — those never reached, and those whose applications were never read.',
  },
  {
    id: 'efficiency',
    claim: 'AI makes hiring more efficient.',
    category: 'Efficiency',
    claimOrigin: {
      description:
        'Vendor case studies headline large time savings — HireVue’s Unilever story claims a “90% reduction in time to hire”, though its body text reports 75%.',
      sourceId: 'hirevue-unilever',
      quote: '90% Reduction in Time to Hire',
    },
    supporting: [
      { sourceId: 'cipd-rtp-2024', finding: '66% of UK organisations already using AI in recruitment say it increased hiring efficiency.', design: 'Self-report, n = 281 AI users, UK' },
      { sourceId: 'shrm-2022', finding: '85% of US employers using automation or AI say it saves time or increases efficiency.', design: 'Self-report, n = 1,688 HR professionals, US' },
      { sourceId: 'li-2026', finding: 'Algorithm-selected interviewees had higher predicted hiring yields, implying the same hires from fewer interviews.', design: 'Counterfactual evaluation, 1 US firm' },
    ],
    qualifying: [
      { sourceId: 'cipd-rtp-2024', finding: '47% of the same AI users say hiring costs increased, and 48% say the number of people working in resourcing increased (14% decreased).', design: 'Self-report, n = 281, UK' },
      { sourceId: 'avery-2026', finding: 'Asynchronous AI-assessed interviews cut application continuation by more than half — including among top applicants, and most among women.', design: 'Natural field experiment, 3,000+ applicants (working paper)' },
      { sourceId: 'aka-2025', finding: 'About 75% of invited candidates did not complete an AI-run interview.', design: 'Field experiments on a platform (preprint)' },
      { sourceId: 'shrm-2022', finding: '19% of users say tools overlooked or excluded qualified applicants.', design: 'Self-report, US' },
    ],
    methodologyNote:
      'Efficiency claims rest mainly on self-reports by adopters and vendor case studies. No peer-reviewed field study found here measured time-to-hire or cost-per-hire directly under randomised conditions.',
    evidencePeriod: '2019–2026',
    limitations: 'Adopters reporting on tools they chose are likely to be favourable; efficiency gains for the employer can coexist with costs shifted to candidates (drop-off, unpaid time).',
    assessment: 'Partially Supported',
    reasoning:
      'Users consistently report time savings and quasi-experimental work shows screening can raise hiring yield per interview. But direct measurement of speed or cost is scarce, nearly half of UK adopters report higher costs, and AI steps can lose large shares of applicants. Efficiency for some tasks is plausible; “more efficient hiring” overall is not established.',
    dissertationLink:
      'Small employers described volume itself as the problem: one sorted through around 500 applications (P07); another found that of about thirty applications only five or six were worth speaking to (P08). Greater reach created sorting work rather than efficiency.',
  },
  {
    id: 'most-adopting',
    claim: 'Most employers are adopting AI.',
    category: 'Adoption',
    claimOrigin: {
      description:
        'Commercial surveys circulate majority figures — e.g. a ResumeBuilder poll of 948 “business leaders” reporting 51% using AI in hiring and 68% expecting to by 2025.',
      sourceId: 'resumebuilder-2024',
    },
    supporting: [
      { sourceId: 'eurostat-ai-2025', finding: '55% of large EU enterprises (250+) used at least one AI technology in 2025.', design: 'Official statistics, EU27' },
      { sourceId: 'ons-bics-oct-2026', finding: 'About half of UK businesses with 100+ employees used some AI technology in September 2026.', design: 'Official statistics, UK' },
    ],
    qualifying: [
      { sourceId: 'cipd-rtp-2024', finding: 'About 31% of UK organisations reported AI/ML in recruitment in 2024; around four-fifths of SMEs used none.', design: 'Professional survey, n = 1,016, UK' },
      { sourceId: 'cipd-rtp-2026', finding: '56% of UK organisations reported not using AI in recruitment in 2026, including 80% of SMEs.', design: 'Professional survey, n = 1,014, UK' },
      { sourceId: 'ons-bics-oct-2026', finding: '30% of all UK businesses used any AI technology in September 2026 (any purpose, not recruitment).', design: 'Official statistics, UK' },
      { sourceId: 'eurostat-ai-2025', finding: '19.95% of EU enterprises (10+) used AI in 2025; only 0.62% used AI for HR or recruitment in 2021, the last year measured.', design: 'Official statistics, EU27' },
      { sourceId: 'dsit-ai-adoption-2026', finding: '16% of UK private businesses (5+) used AI in 2025; 80% neither used nor planned to.', design: 'Government telephone survey, n = 3,500' },
      { sourceId: 'shrm-2024', finding: 'About one in four US organisations used AI to support HR activities in 2024 (64% of those in talent acquisition).', design: 'Professional survey, n = 2,366, US' },
      { sourceId: 'linkedin-2025', finding: 'Even a recruitment-platform vendor’s own UK survey found 34% of talent professionals experimenting with generative AI and 11% actively integrating it.', design: 'Vendor survey, UK, sample undisclosed' },
    ],
    methodologyNote:
      'Representative official statistics and the main UK professional survey are compared with commercial polls. Definitions of “AI” and “use” vary widely; figures are not pooled.',
    evidencePeriod: '2021–2026',
    limitations: 'All measures rely on recognised, self-reported use. Platform-embedded algorithmic functions are unlikely to be captured either way.',
    assessment: 'Unsupported',
    reasoning:
      'As a general statement about employers — and especially about recruitment — the claim is contradicted by representative data: a minority (though growing) share of organisations report AI in recruitment, and most small employers report none. A majority appears only among large organisations or in commercial polls with broad definitions. “Rapidly growing among larger employers” would be a supported restatement.',
    dissertationLink:
      'The dissertation adds a measurement caveat in the other direction: employers may use platforms with ranking or filtering features without describing them as AI, so recognised-use surveys measure a different object from platform-mediated recruitment.',
  },
  {
    id: 'quality',
    claim: 'AI improves candidate quality.',
    category: 'Quality of hire',
    claimOrigin: {
      description:
        'Vendors claim their algorithms surface the candidates most likely to succeed, typically without publishing validation data — as in HireVue’s Unilever case study.',
      sourceId: 'hirevue-unilever',
    },
    supporting: [
      { sourceId: 'hoffman-2018', finding: 'Introducing an algorithmic job test raised hires’ completed tenure by about 25%; managers who overrode it made worse hires.', design: 'Quasi-experiment, 15 firms, low-skilled service jobs, US' },
      { sourceId: 'kuncel-2013', finding: 'Mechanical combination of assessment data predicted performance substantially better than holistic expert judgement.', design: 'Meta-analysis (not AI-specific)' },
      { sourceId: 'avery-2026', finding: 'An AI assessment predicted later employment success better than human recruiters.', design: 'Natural field experiment (working paper)' },
      { sourceId: 'aka-2025', finding: 'AI-informed shortlists passed final human interviews at rates 17.5–20 points higher.', design: 'Field experiments (preprint)' },
    ],
    qualifying: [
      { sourceId: 'rhea-2022', finding: 'Two commercial AI personality-prediction tools showed substantial instability and could not be considered valid instruments.', design: 'External audit of 2 tools' },
      { sourceId: 'li-2026', finding: '“Quality” was proxied by likelihood of being hired; on-the-job performance data were limited.', design: 'Counterfactual evaluation, 1 firm' },
      { sourceId: 'ico-audit-2024', finding: 'Some providers lacked adequate accuracy testing; the ICO stressed accuracy “better than random” is not enough.', design: 'Regulator audits, UK' },
    ],
    methodologyNote:
      'The strongest evidence uses real hiring data, but measures quality through proxies (tenure, interview pass rates, hiring likelihood). Several newer studies are working papers or preprints.',
    evidencePeriod: '2013–2026',
    limitations: 'Single firms and specific job families dominate; results do not transfer automatically to other tools, roles or labour markets.',
    assessment: 'Partially Supported',
    reasoning:
      'There is credible evidence that well-validated, structured algorithmic screening can improve some quality proxies relative to unaided human judgement. But the evidence is tool- and context-specific, relies on proxies, and some commercial tools fail basic reliability tests. The claim holds for particular validated tools, not for “AI” in general.',
    dissertationLink:
      'Participants separated volume from credibility: screening answers could be self-reported untruthfully (P04), and suitability was verified in person. Platform mediation changed how candidates arrived, not who judged them.',
  },
  {
    id: 'human-decision',
    claim: 'Algorithmic recruitment reduces human decision-making.',
    category: 'Human oversight',
    claimOrigin: {
      description:
        'Start-ups pitch AI recruiters that conduct initial interviews at scale, “freeing” recruiter time; commercial polls report some firms auto-rejecting without human review.',
      sourceId: 'techcrunch-2025',
      quote: 'Our AI recruiter does thousands of interviews a day.',
    },
    supporting: [
      { sourceId: 'resumebuilder-2024', finding: '21% of surveyed business leaders said AI auto-rejects candidates at all stages without human review.', design: 'Commercial poll, n = 948' },
      { sourceId: 'ico-rewired-2026', finding: 'The ICO concluded many employers are likely relying on solely automated decisions without meaningful human involvement.', design: 'Regulator engagement with 30+ UK employers' },
    ],
    qualifying: [
      { sourceId: 'vandenbroek-2021', finding: 'Developers who set out to take experts “out of the loop” ended with a hybrid practice combining machine learning and HR expertise.', design: 'Two-year ethnography, 1 organisation' },
      { sourceId: 'sheard-2025', finding: 'Recruiters interpreted and acted on algorithmic outputs; discrimination risks arose from how humans configured and implemented systems.', design: 'Qualitative interviews, Australia' },
      { sourceId: 'wilson-2025', finding: 'People followed biased AI recommendations up to 90% of the time — human decisions persisted but were steered by the AI.', design: 'Online experiment, 528 participants, US' },
      { sourceId: 'cipd-rtp-2024', finding: '48% of UK AI users report more people working in resourcing; 14% report fewer.', design: 'Self-report, n = 281' },
    ],
    methodologyNote: 'Combines regulator findings, commercial polls, ethnography, interviews and experiments. Each captures a different aspect: formal removal of humans, or change in the quality of human judgement.',
    evidencePeriod: '2021–2026',
    limitations: 'Commercial poll figures are not representative. Experimental evidence uses crowd participants rather than recruiters.',
    assessment: 'Mixed Evidence',
    reasoning:
      'Some early-stage steps are being automated, including rejections without human review in some organisations — enough for the ICO to act. Yet ethnographic, interview and survey evidence shows humans remaining in the loop and resourcing headcount often rising. The better-supported concern is not that human decisions disappear but that they become anchored on algorithmic outputs (automation bias), making “human oversight” nominal.',
    dissertationLink:
      'In the eight accounts, final assessment remained managerial — one participant located control entirely with the manager (P05) — while influence over who became visible felt limited. The dissertation calls this mediation of candidate access without automation of candidate assessment.',
  },
  {
    id: 'sme-behind',
    claim: 'Small businesses are falling behind in AI adoption.',
    category: 'SMEs',
    claimOrigin: {
      description: 'Technology firms and business media frequently warn that SMEs risk “falling behind” in AI — e.g. a 2025 Google warning reported in UK business news.',
      sourceId: 'setsquared-2025',
    },
    supporting: [
      { sourceId: 'eurostat-ai-2025', finding: 'EU AI use in 2025: 17% of small enterprises vs 55% of large; the gap widened in percentage points from 2023 (note the 2025 series break).', design: 'Official statistics, EU27' },
      { sourceId: 'ons-bics-oct-2026', finding: 'UK AI use rises from 28.7% (0–9 employees) to 50.9% (250+) in September 2026.', design: 'Official statistics, UK' },
      { sourceId: 'cipd-rtp-2026', finding: '80% of UK SMEs report not using AI in recruitment, vs 38% of larger organisations.', design: 'Professional survey, UK' },
    ],
    qualifying: [
      { sourceId: 'harney-2021', finding: 'Small-firm HRM is heterogeneous and informality is not the same as underdevelopment; informal approaches can be a viable alternative.', design: 'Systematic review, 137 articles' },
      { sourceId: 'ons-mes-2023', finding: 'The most cited barrier was difficulty identifying a business use case (39%), ahead of cost (21%).', design: 'Official statistics, UK firms 10+' },
      { sourceId: 'ugur-2026', finding: 'Deliberate non-use and withdrawal after a poor trial reflected reasoned judgements about what existing hiring practice already provided.', design: 'Qualitative interviews, n = 8, Brighton' },
    ],
    methodologyNote: 'The size gradient is consistent across independent official sources. Whether it represents “falling behind” is an interpretive question the statistics cannot answer.',
    evidencePeriod: '2021–2026',
    limitations: 'Recruitment-specific SME evidence is thin (mainly CIPD). No source measures whether non-adopting small firms recruit worse.',
    assessment: 'Partially Supported',
    reasoning:
      'Small firms do report markedly lower AI use, in every source and year — that part is well supported. “Falling behind” additionally assumes that adoption is beneficial for every small firm and that non-use is a deficit. Neither is established: barriers centre on unclear use cases, and qualitative evidence shows non-use can be a deliberate fit-for-purpose decision.',
    dissertationLink:
      'One owner-manager avoided open channels because a wider audience was not needed (P06); another returned to friends and family after trialling a job board (P01).',
  },
  {
    id: 'video-emotion',
    claim: 'AI video interviews can reliably assess candidates’ personality and emotions.',
    category: 'Assessment validity',
    claimOrigin: {
      description: 'Some video-assessment products have been marketed as determining candidate fit from personality and communication behaviour.',
      sourceId: 'retorio-greenhouse',
    },
    supporting: [],
    qualifying: [
      { sourceId: 'barrett-2019', finding: 'Facial movements do not map reliably onto specific emotions across people, cultures and situations.', design: 'Systematic scientific review' },
      { sourceId: 'rhea-2022', finding: 'Commercial personality-prediction tools showed substantial instability.', design: 'External audit, 2 tools' },
      { sourceId: 'netzpolitik-2021', finding: 'Glasses, a headscarf or a bookshelf in the background changed personality scores in a broadcaster’s test.', design: 'Journalistic experiment, 1 product, Germany' },
      { sourceId: 'shrm-hirevue-2021', finding: 'HireVue dropped facial analysis, saying visual components contributed less to prediction.', design: 'Trade press, vendor statement' },
      { sourceId: 'eu-ai-act', finding: 'The EU AI Act prohibits AI that infers emotions in the workplace (Art 5(1)(f)), applicable since February 2025.', design: 'EU regulation' },
    ],
    methodologyNote: 'No independent, peer-reviewed validation supporting emotion inference for hiring was found. Evidence against includes a major scientific review, an external audit and a journalistic experiment.',
    evidencePeriod: '2019–2026',
    limitations: 'Few independent audits exist, partly because vendors rarely allow external testing.',
    assessment: 'Unsupported',
    reasoning:
      'The scientific basis for inferring emotion from facial movement is contested, available audits find instability and sensitivity to irrelevant cues, the best-known vendor withdrew facial analysis, and the EU now prohibits emotion inference at work. No independent evidence supporting reliable assessment was identified.',
  },
  {
    id: 'candidate-comfort',
    claim: 'Candidates are comfortable with AI in hiring.',
    category: 'Candidate experience',
    claimOrigin: {
      description: 'Vendor case studies cite high candidate satisfaction — HireVue’s Unilever story reports over 80% positive candidate feedback.',
      sourceId: 'hirevue-unilever',
    },
    supporting: [
      { sourceId: 'pew-2023', finding: '47% of US adults think AI would be better than humans at treating all applicants the same way (15% worse).', design: 'Probability panel, n = 11,004, US' },
      { sourceId: 'avery-2024', finding: 'Women were relatively more likely to complete applications when told AI would assess them, consistent with anticipated human bias.', design: 'Field experiment (working paper)' },
    ],
    qualifying: [
      { sourceId: 'pew-2023', finding: '66% of US adults would not want to apply to an employer using AI in hiring decisions; 71% oppose AI making the final decision.', design: 'Probability panel, n = 11,004, US' },
      { sourceId: 'avery-2026', finding: 'AI-assessed asynchronous interviews halved application continuation.', design: 'Natural field experiment (working paper)' },
      { sourceId: 'aka-2025', finding: 'About three-quarters of invited candidates did not complete an AI interview.', design: 'Field experiments (preprint)' },
    ],
    methodologyNote: 'Attitudinal survey data (representative, US) combined with behavioural field evidence on drop-off. Vendor satisfaction figures come from candidates who completed the process.',
    evidencePeriod: '2022–2026',
    limitations: 'No representative UK survey of candidate attitudes was identified. Attitudes may have shifted since 2022 with generative AI.',
    assessment: 'Unsupported',
    reasoning:
      'Representative US data show a majority would avoid applying where AI informs hiring decisions, and field experiments show substantial drop-off at AI steps. Some groups see AI as potentially fairer than biased humans, so comfort is conditional rather than absent — but the general claim is contradicted by the best available evidence.',
  },
  {
    id: 'genai-adverts',
    claim: 'Generative AI writes better job adverts.',
    category: 'Generative AI',
    claimOrigin: {
      description:
        'AI-written job descriptions are among the fastest-growing reported uses in UK recruitment (16% of HR respondents in 2026), and vendors add “write with AI” features to recruitment software.',
      sourceId: 'cipd-rtp-2026',
    },
    supporting: [
      { sourceId: 'klezl-2026', finding: 'AI-generated job ads were perceived as equally effective and informative as human-written ones; HR professionals often could not tell them apart.', design: 'Three experiments, students and HR professionals, Sweden/UK' },
    ],
    qualifying: [
      { sourceId: 'klezl-2026', finding: 'Human-written ads appealed more to applicants with certain personality traits; AI ads showed no such pattern. Equal perception is not superiority.', design: 'Experiments, modest samples' },
      { sourceId: 'ugur-2026', finding: 'A manager judged an assistant’s ChatGPT-drafted advert overblown for the business and rewrote it.', design: 'Qualitative interview, n = 1 account' },
    ],
    methodologyNote: 'One recent experimental paper measures perceptions of AI-generated adverts. No study found measures effects on real applicant pools, diversity or hiring outcomes.',
    evidencePeriod: '2026',
    limitations: 'Perception experiments with student samples; no field data on application quality or volume.',
    assessment: 'Insufficient Evidence',
    reasoning:
      'The only experimental evidence identified finds AI adverts perceived as comparable — not better — and it measures perceptions rather than who actually applies. With no field evidence on applicant pools or outcomes, the claim cannot be judged either way.',
    dissertationLink:
      'Two participants described generative AI drafting job adverts: one felt it was now expected (P04); another rewrote an AI draft (P08) — generated text treated as material for managerial judgement.',
  },
]
