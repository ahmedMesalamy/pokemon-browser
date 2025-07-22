import { Routes, Route, Navigate } from 'react-router-dom'

import React, { Suspense, lazy } from 'react';

import PokedexPage from './pages/PokedexPage'
import { useState } from 'react'
import { ErrorBoundary } from './components/ErrorBoundary';

const PaginationView = lazy(() => import('./pages/PaginationView'));
const LoadMoreView = lazy(() => import('./pages/LoadMoreView'));
const PokemonDetail = lazy(() => import('./pages/PokemonDetail'));

const App = () => {
    const [viewMode, setViewMode] = useState<"pagination" | "infinite">("pagination");

  return (
        <ErrorBoundary>

        <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center', fontSize: '1.2rem', color: '#555' }}>Loading...</div>}>

    <Routes>
      <Route path="/" element={<Navigate to="/pagination" replace />} />
      <Route
        path="/pagination"
        element={<PaginationView setViewMode={setViewMode} />}
      />
      <Route
        path="/load-more"
        element={<LoadMoreView setViewMode={setViewMode} />}
      />
      <Route path="/pokemon/:id" element={<PokemonDetail />} />
    </Routes>
        </Suspense>
        </ErrorBoundary>

  )
}

export default App
