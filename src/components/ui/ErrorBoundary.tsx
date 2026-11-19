import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'

interface State {
  error: Error | null
}

/** Catches render errors (including failed lazy chunk loads) for a single page. */
export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Page failed to render', error, info.componentStack)
  }

  render() {
    if (!this.state.error) return this.props.children
    const chunkFailed = /dynamically imported module|Loading chunk/i.test(this.state.error.message)
    return (
      <div role="alert" className="mx-auto max-w-xl px-4 py-24 text-center">
        <AlertTriangle aria-hidden className="mx-auto size-8 text-unsupported" />
        <h1 className="mt-4 text-2xl text-ink">This section could not be displayed</h1>
        <p className="mt-2 text-ink-2">
          {chunkFailed
            ? 'Part of the application failed to download, usually because a new version was deployed or the connection dropped.'
            : 'An unexpected error occurred while rendering this page.'}
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 inline-flex h-9 items-center rounded-lg bg-accent px-4 text-sm font-medium text-white hover:bg-accent-strong"
        >
          Reload page
        </button>
      </div>
    )
  }
}
