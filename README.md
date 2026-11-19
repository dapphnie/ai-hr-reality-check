# AI in HR: The Reality Check

**An evidence-based dashboard comparing what is claimed about AI in recruitment with how adoption is measured and how recruitment technology is actually encountered by employers.**

Built by Defne Ugur (MSc Human Resource Management, University of Sussex) as a portfolio project connecting HR research, technology-adoption analysis, interactive data visualisation and responsible AI governance. Its intellectual foundation is the author's dissertation, *Beyond Adoption: How Small Hospitality Owner-Managers and Managers Encounter Algorithmic Recruitment in Brighton* (2026).

---

## Why this exists

AI in recruitment is discussed through three lenses that rarely meet:

| Lens | Typical question | Where it lives in the app |
|---|---|---|
| **Claims** | What do vendors and industry reports say AI does for hiring? | Claims vs Evidence Explorer |
| **Measurement** | What share of organisations “use AI”, and what does that figure actually count? | Adoption Reality Dashboard |
| **Practice** | How do employers meet algorithms inside the ordinary job boards and platforms they already use? | Beyond Adoption (dissertation) |

The central argument, taken from the dissertation, is that **formal adoption statistics measure *recognised* use**. An employer who advertises on a job board may never describe its ranking, filtering or matching functions as “AI”, so neither adoption nor non-adoption captures the full picture. The application keeps six concepts distinct throughout: explicit AI adoption, platform-mediated recruitment, automated candidate assessment, generative AI assistance, algorithmic awareness, and deliberate non-use or discontinuance.

## Features

| Section | What it does |
|---|---|
| **Overview** (`/`) | Executive dashboard: KPI cards with caveats and scope filter, CIPD answer-distribution chart, size-gap chart with source selector, perceived benefits vs assessed claims, recruitment-lifecycle map, evidence-gap summary. |
| **Claims vs Evidence** (`/claims`) | Searchable, filterable explorer of 9 claims. Each has origin and source, supporting and qualifying evidence with study designs, methodology, period, limitations, an evidence label (Supported → Unsupported) **with written reasoning**, dissertation context and full references. Deep links (`/claims?claim=efficiency`) and CSV export. |
| **Adoption Reality** (`/adoption`) | Trend explorer that draws each series in its **own panel** and raises a comparability warning when measures differ; breakdowns by organisation size, industry, HR function (recruitment stage), technology type and region; a methodology table explaining why figures cannot be pooled; full dataset CSV export. |
| **Beyond Adoption** (`/research`) | Dissertation background, design and sensitising concepts; interactive explorer of the three themes with participant filtering and a cross-case matrix; the **encounter framework** (positions, not stages) with an awareness overlay; stage-by-stage map of where control was perceived to sit; implications, contributions and limitations. |
| **Governance & Risk** (`/governance`) | Eight risk domains (bias, transparency, oversight, privacy, vendor accountability, automated decision-making, accessibility, perceived vs actual control), mapped to UK and EU provisions with verified status; a 17-question pre-procurement checklist (saved in the browser, exportable to CSV); regulatory timeline. |
| **Evidence Library** (`/library`) | All 74 sources with authors, date, methodology, sample, geography, key findings, limitations and working links. Search, filter by evidence type/topic/dissertation status, sort, deep links, copy reference, **CSV and RIS export** (Zotero, Mendeley, EndNote). |
| **Methodology** (`/methodology`) | Integrity rules, epistemic labels, assessment-label definitions, a verification log of what checking the sources changed, and known limitations. |

Every chart has a **chart / table toggle** (the table is the accessible equivalent), hover tooltips, and a footnote naming its definition and source. Pages are lazy-loaded with a loading state, wrapped in an error boundary, and every filter has an empty state.

## Research integrity

These rules are enforced in the data model and UI, not just stated:

- **No fabricated data.** Every figure was read from the original publication (PDF text, figure or published CSV) on 22 October 2026. Values not stated directly by a publisher are labelled *derived* and computed exactly as the publisher does.
- **No pooling of incompatible measures.** Each adoption value belongs to a `series` with a fixed definition, population and weighting, and a comparability `family`. Series are never merged on one line; mixed selections trigger a warning.
- **Adoption ≠ platform use.** Using Indeed or LinkedIn is never treated as AI adoption.
- **No causal claims from descriptive statistics.** Outcome claims are judged against studies designed to test them.
- **Qualitative evidence stays qualitative.** The eight interviews are never converted into percentages. Participants appear only by the dissertation's codes (P01–P08); their accounts are paraphrased or referenced by the dissertation's code labels, and no interview quotations are reproduced.
- **Perception is not mechanism.** Participants' descriptions of ranking or filtering are presented as interpretations (an *algorithmic imaginary*), not as evidence of how platforms work.
- **Dated legal content.** UK and EU provisions were verified against legislation.gov.uk, ico.org.uk, gov.uk and the European Commission's AI Act Service Desk. This is not legal advice.

### What verification changed

- **CIPD 16% → 31% (2022–24)** is confirmed (Hogarth & McCartney, 2024: p.6; Fig. 26, p.27). The 31% is 100 − 62% "don't use" − 7% "don't know", and the "don't know" option was **new in 2024**, so part of the change may reflect the questionnaire. A 2026 edition exists; it reports 80% of SMEs and 38% of larger organisations not using AI in recruitment.
- **ICO audit report URL** cited in the dissertation now returns 404; the current address is used.
- **UK GDPR Article 22** was replaced by Articles 22A–22D on 5 February 2026 (Data (Use and Access) Act 2025).
- **EU AI Act** high-risk obligations for recruitment were deferred from 2 August 2026 to **2 December 2027** by Regulation (EU) 2026/1744.
- **Wilson & Caliskan (2024)** issued an erratum in August 2026 inverting their gender-only results; the corrected reading is used.
- **Eurostat** collected an HR/recruitment purpose only in 2021 and changed its "any AI" definition in 2025 (series break).

## Architecture

```
src/
├── types.ts                  # Data schema: Source, Claim, AdoptionSeries, AdoptionPoint …
├── data/
│   ├── sources-literature.ts # Dissertation references (DOIs verified via Crossref)
│   ├── sources-evidence.ts   # Statistics, regulation, guidance
│   ├── sources-claims.ts     # Studies and claim examples for the Claims explorer
│   ├── adoption.ts           # Series definitions + verified data points + breakdowns
│   ├── claims.ts             # 9 claims with evidence, labels and reasoning
│   ├── governance.ts         # Risk domains, UK/EU provisions, checklist, timeline
│   ├── research.ts           # Dissertation themes, quotes, profiles, framework
│   └── concepts.ts           # The six-way conceptual distinction + lifecycle
├── lib/                      # CSV/RIS export, source lookup and reference formatting
├── components/
│   ├── layout/               # Responsive navigation, skip link, footer
│   ├── ui/                   # Primitives, evidence badges, error/loading states
│   └── charts/               # ChartCard (chart/table toggle) + Recharts components
└── pages/                    # One lazily loaded page per section
```

- **Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, Recharts, Lucide React, React Router.
- **No backend.** All data is local, typed TypeScript, so the app runs without an API, database or account. Every quantitative value and claim references a `sourceId` that resolves to an Evidence Library entry.
- **Extending the dataset:** add a `Source`, then reference its `id` from a data point, claim or provision. To add a time series, define an `AdoptionSeries` (definition, population, denominator, family, caveats) and add `AdoptionPoint`s with its `seriesId`; the trend explorer, table view and CSV export pick it up automatically.
- **Accessibility:** semantic landmarks and headings, skip link, keyboard-operable tabs, toggles, disclosures and checklist, visible focus rings, `aria-pressed` / `aria-expanded` state, table equivalents for every chart, colour never used alone (icons and labels accompany every status), CVD-validated chart palette, and reduced-motion support.

## Running locally

Requires **Node.js 20 or later** (developed on Node 24).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check and production build into dist/
npm run preview    # serve the production build locally
npm run lint
```

## Publishing to GitHub

```bash
git init
git add .
git commit -m "AI in HR: The Reality Check"
git branch -M main
git remote add origin https://github.com/<your-username>/ai-hr-reality-check.git
git push -u origin main
```

Create the empty repository on GitHub first (no README, so the push does not conflict).

## Deploying to Vercel

1. Sign in at [vercel.com](https://vercel.com) with GitHub and choose **Add New → Project**.
2. Import the `ai-hr-reality-check` repository. Vercel detects **Vite**; the defaults are correct (build `npm run build`, output `dist`).
3. Click **Deploy**. `vercel.json` rewrites every path to `index.html`, so deep links such as `/claims?claim=efficiency` work on refresh.
4. Every push to `main` redeploys automatically. Optionally add a custom domain under **Settings → Domains**.

**Netlify alternative:** import the repository; `netlify.toml` sets the build command and `public/_redirects` handles client-side routing.

## Limitations

- A curated, verified starter dataset, not a systematic review.
- Evidence labels are the author's reasoned judgements, shown with their reasoning so they can be challenged; they are not the output of a formal grading protocol.
- Much experimental evidence on algorithmic hiring is US-based, single-firm, simulated or still a working paper.
- Figures are as published on the date checked; there is no live data feed.
- The dissertation is qualitative (n = 8, one city, one sector). It is used to illuminate what adoption measures miss, never to estimate prevalence.

## Citation

Ugur, D. (2026) *Beyond Adoption: How Small Hospitality Owner-Managers and Managers Encounter Algorithmic Recruitment in Brighton*. MSc Human Resource Management dissertation, University of Sussex Business School.

Licensing of third-party content remains with the original publishers; quotations are brief and attributed.
