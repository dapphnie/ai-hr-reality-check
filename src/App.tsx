import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { ErrorBoundary } from './components/ui/ErrorBoundary'
import { PageLoading } from './components/ui/PageLoading'

const Overview = lazy(() => import('./pages/Overview'))
const Claims = lazy(() => import('./pages/Claims'))
const Adoption = lazy(() => import('./pages/Adoption'))
const Research = lazy(() => import('./pages/Research'))
const Governance = lazy(() => import('./pages/Governance'))
const Library = lazy(() => import('./pages/Library'))
const Methodology = lazy(() => import('./pages/Methodology'))
const NotFound = lazy(() => import('./pages/NotFound'))

const ROUTES = [
  ['/', Overview],
  ['/claims', Claims],
  ['/adoption', Adoption],
  ['/research', Research],
  ['/governance', Governance],
  ['/library', Library],
  ['/methodology', Methodology],
  ['*', NotFound],
] as const

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {ROUTES.map(([path, Page]) => (
            <Route
              key={path}
              path={path}
              element={
                <ErrorBoundary>
                  <Suspense fallback={<PageLoading />}>
                    <Page />
                  </Suspense>
                </ErrorBoundary>
              }
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
