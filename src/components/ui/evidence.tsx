import { Link } from 'react-router-dom'
import {
  BarChart3,
  BookOpen,
  CheckCircle2,
  CircleDashed,
  CircleHelp,
  FileText,
  Gavel,
  Landmark,
  Lightbulb,
  Megaphone,
  MessageSquareQuote,
  MinusCircle,
  Newspaper,
  Scale,
  XCircle,
} from 'lucide-react'
import type { AssessmentLabel, EvidenceKind } from '../../types'
import { getSource } from '../../lib/sources'
import { cx } from './primitives'

const ASSESSMENT_STYLE: Record<AssessmentLabel, { cls: string; Icon: typeof CheckCircle2; blurb: string }> = {
  Supported: {
    cls: 'border-supported/30 bg-[#e6f2ec] text-supported',
    Icon: CheckCircle2,
    blurb: 'Consistent, methodologically sound evidence supports the claim as stated.',
  },
  'Partially Supported': {
    cls: 'border-partial/30 bg-quant-soft text-partial',
    Icon: CircleDashed,
    blurb: 'Evidence supports a narrower or conditional version of the claim.',
  },
  'Mixed Evidence': {
    cls: 'border-mixed/30 bg-[#f7f0dc] text-mixed',
    Icon: Scale,
    blurb: 'Credible studies point in different directions, often by context or design.',
  },
  'Insufficient Evidence': {
    cls: 'border-insufficient/30 bg-legal-soft text-insufficient',
    Icon: CircleHelp,
    blurb: 'Too little independent, comparable evidence to judge the claim.',
  },
  Unsupported: {
    cls: 'border-unsupported/30 bg-[#f7e7e2] text-unsupported',
    Icon: XCircle,
    blurb: 'The weight of independent evidence contradicts the claim as stated.',
  },
}

export const ASSESSMENT_ORDER: AssessmentLabel[] = [
  'Supported',
  'Partially Supported',
  'Mixed Evidence',
  'Insufficient Evidence',
  'Unsupported',
]

export function assessmentBlurb(label: AssessmentLabel) {
  return ASSESSMENT_STYLE[label].blurb
}

export function AssessmentBadge({ label, size = 'md' }: { label: AssessmentLabel; size?: 'sm' | 'md' }) {
  const { cls, Icon } = ASSESSMENT_STYLE[label]
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-full border font-medium whitespace-nowrap',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-[0.8rem]',
        cls,
      )}
    >
      <Icon aria-hidden className={size === 'sm' ? 'size-3.5' : 'size-4'} />
      {label}
    </span>
  )
}

const KIND_META: Record<EvidenceKind, { label: string; Icon: typeof BarChart3; cls: string }> = {
  'official-statistics': { label: 'Official statistics', Icon: Landmark, cls: 'bg-quant-soft text-quant' },
  'professional-survey': { label: 'Professional / industry survey', Icon: BarChart3, cls: 'bg-quant-soft text-quant' },
  'peer-reviewed': { label: 'Peer-reviewed research', Icon: BookOpen, cls: 'bg-accent-soft text-accent-strong' },
  'working-paper': { label: 'Working paper / preprint', Icon: FileText, cls: 'bg-sunken text-ink-2' },
  'independent-survey': { label: 'Independent survey', Icon: BarChart3, cls: 'bg-quant-soft text-quant' },
  regulatory: { label: 'Law & regulator', Icon: Gavel, cls: 'bg-legal-soft text-legal' },
  government: { label: 'Government guidance', Icon: Landmark, cls: 'bg-legal-soft text-legal' },
  journalism: { label: 'Investigative journalism', Icon: Newspaper, cls: 'bg-sunken text-ink-2' },
  vendor: { label: 'Vendor / marketing claim', Icon: Megaphone, cls: 'bg-claim-soft text-claim' },
  'qualitative-dissertation': { label: 'Qualitative study (n = 8)', Icon: MessageSquareQuote, cls: 'bg-qual-soft text-qual' },
}

export const KIND_LABELS = Object.fromEntries(Object.entries(KIND_META).map(([k, v]) => [k, v.label])) as Record<
  EvidenceKind,
  string
>

export function KindBadge({ kind }: { kind: EvidenceKind }) {
  const { label, Icon, cls } = KIND_META[kind]
  return (
    <span className={cx('inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium', cls)}>
      <Icon aria-hidden className="size-3.5" />
      {label}
    </span>
  )
}

/**
 * Epistemic layer tags — distinguish reported data from qualitative insight,
 * interpretation and hypothesis wherever they appear together.
 */
type Layer = 'data' | 'qualitative' | 'interpretation' | 'hypothesis' | 'law'
const LAYER_META: Record<Layer, { label: string; Icon: typeof BarChart3; cls: string }> = {
  data: { label: 'Reported data', Icon: BarChart3, cls: 'border-quant/30 text-quant' },
  qualitative: { label: 'Qualitative insight', Icon: MessageSquareQuote, cls: 'border-qual/30 text-qual' },
  interpretation: { label: 'Interpretation', Icon: Lightbulb, cls: 'border-ink-3/30 text-ink-2' },
  hypothesis: { label: 'Open question', Icon: CircleHelp, cls: 'border-mixed/30 text-mixed' },
  law: { label: 'Legal provision', Icon: Gavel, cls: 'border-legal/30 text-legal' },
}

export function LayerTag({ layer }: { layer: Layer }) {
  const { label, Icon, cls } = LAYER_META[layer]
  return (
    <span className={cx('inline-flex w-fit self-start items-center gap-1 rounded border bg-surface px-1.5 py-0.5 text-[0.7rem] font-semibold tracking-wide uppercase', cls)}>
      <Icon aria-hidden className="size-3" />
      {label}
    </span>
  )
}

/** Inline citation that links to the source's entry in the Evidence Library. */
export function SourceRef({ id, className }: { id: string; className?: string }) {
  const s = getSource(id)
  if (!s) {
    return <span className="text-unsupported">[missing source: {id}]</span>
  }
  return (
    <Link
      to={`/library?source=${encodeURIComponent(id)}`}
      title={`${s.authors} (${s.year}) ${s.title}`}
      className={cx('font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent', className)}
    >
      {s.shortCite}
    </Link>
  )
}

export function SourceList({ ids }: { ids: string[] }) {
  const unique = [...new Set(ids)]
  return (
    <span className="text-xs text-ink-3">
      Source{unique.length > 1 ? 's' : ''}:{' '}
      {unique.map((id, i) => (
        <span key={id}>
          {i > 0 && '; '}
          <SourceRef id={id} />
        </span>
      ))}
    </span>
  )
}

export function NotRepresentative({ className }: { className?: string }) {
  return (
    <span className={cx('inline-flex items-center gap-1.5 rounded-md bg-qual-soft px-2 py-0.5 text-xs font-medium text-qual', className)}>
      <MinusCircle aria-hidden className="size-3.5" />
      Contextual, not statistically representative
    </span>
  )
}
