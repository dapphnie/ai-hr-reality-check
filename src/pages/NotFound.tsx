import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-3xl text-ink">Insufficient evidence for this page</h1>
      <p className="mt-3 text-ink-2">The address you followed does not match any section of the application.</p>
      <Link to="/" className="mt-6 inline-flex h-9 items-center rounded-lg bg-accent px-4 text-sm font-medium text-white hover:bg-accent-strong">
        Back to the overview
      </Link>
    </div>
  )
}
