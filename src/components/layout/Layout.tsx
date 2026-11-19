import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cx } from '../ui/primitives'

export const NAV = [
  { to: '/', label: 'Overview', end: true },
  { to: '/claims', label: 'Claims vs Evidence' },
  { to: '/adoption', label: 'Adoption Reality' },
  { to: '/research', label: 'Beyond Adoption' },
  { to: '/governance', label: 'Governance & Risk' },
  { to: '/library', label: 'Evidence Library' },
] as const

function Wordmark() {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="AI in HR: The Reality Check — home">
      <span aria-hidden className="grid size-8 place-items-center rounded-lg bg-navy">
        <svg viewBox="0 0 32 32" className="size-5">
          <path d="M8 22V10m0 12h16" stroke="#9cc9c4" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <path d="M11 18l4-4 3 2.5 5-6" stroke="#f3f1ea" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block font-serif text-[1.02rem] font-semibold text-ink">AI in HR</span>
        <span className="block text-[0.68rem] font-medium tracking-[0.08em] text-ink-3 uppercase">The Reality Check</span>
      </span>
    </Link>
  )
}

export function Layout() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
    if (!location.hash) window.scrollTo({ top: 0 })
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!location.hash) return
    // Pages are lazy-loaded, so the target may not exist yet: retry briefly.
    let tries = 0
    const id = location.hash.slice(1)
    const timer = setInterval(() => {
      const el = document.getElementById(id)
      if (el || ++tries > 30) {
        clearInterval(timer)
        el?.scrollIntoView({ behavior: 'instant', block: 'start' })
      }
    }, 50)
    return () => clearInterval(timer)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-accent px-3 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/75">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <Wordmark />
          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {NAV.map((n) => (
                <li key={n.to}>
                  <NavLink
                    to={n.to}
                    end={'end' in n ? n.end : false}
                    className={({ isActive }) =>
                      cx(
                        'rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors',
                        isActive ? 'bg-surface text-ink shadow-[inset_0_0_0_1px_var(--color-line)]' : 'text-ink-2 hover:text-ink',
                      )
                    }
                  >
                    {n.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            className="rounded-md p-2 text-ink xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
        <nav id="mobile-nav" aria-label="Primary mobile" hidden={!open} className="border-t border-line bg-surface xl:hidden">
          <ul className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
            {[...NAV, { to: '/methodology', label: 'Methodology & integrity' }].map((n) => (
              <li key={n.to}>
                <NavLink
                  to={n.to}
                  end={n.to === '/'}
                  className={({ isActive }) =>
                    cx('block rounded-md px-3 py-2.5 text-[0.95rem] font-medium', isActive ? 'bg-accent-soft text-accent-strong' : 'text-ink-2')
                  }
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>

      <footer className="mt-20 border-t border-line bg-surface">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm text-ink-2 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
          <div>
            <Wordmark />
            <p className="mt-3 max-w-md leading-relaxed">
              An evidence-based portfolio project by Defne Ugur (MSc Human Resource Management, University of Sussex), building on the
              dissertation <em>Beyond Adoption</em> (2026).
            </p>
          </div>
          <div>
            <p className="eyebrow mb-2">Explore</p>
            <ul className="space-y-1.5">
              {NAV.slice(1).map((n) => (
                <li key={n.to}>
                  <Link className="hover:text-accent" to={n.to}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-2">Integrity</p>
            <ul className="space-y-1.5">
              <li>
                <Link className="hover:text-accent" to="/methodology">
                  Methodology &amp; integrity
                </Link>
              </li>
              <li>
                <Link className="hover:text-accent" to="/methodology#labels">
                  How claims are assessed
                </Link>
              </li>
              <li>
                <Link className="hover:text-accent" to="/methodology#limitations">
                  Known limitations
                </Link>
              </li>
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-ink-3">
              Not legal advice. Figures are reproduced from the cited sources with their definitions; see each source for full context.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
