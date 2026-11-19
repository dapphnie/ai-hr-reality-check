export function PageLoading() {
  return (
    <div role="status" aria-live="polite" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <span className="sr-only">Loading section…</span>
      <div aria-hidden className="animate-pulse space-y-4">
        <div className="h-3 w-32 rounded bg-line" />
        <div className="h-9 w-2/3 rounded bg-line" />
        <div className="h-4 w-1/2 rounded bg-line" />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-36 rounded-xl bg-line/70" />
          ))}
        </div>
      </div>
    </div>
  )
}
