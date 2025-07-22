import { useState } from 'react'
import InfiniteScrollView from './views/InfiniteScrollView'
import PaginationView from './PaginationView'

const PokedexPage = () => {
  const [viewMode, setViewMode] = useState<'pagination' | 'infinite'>('pagination')

  return viewMode === 'pagination' ? (
    <PaginationView setViewMode={setViewMode} />
  ) : (
    <InfiniteScrollView setViewMode={setViewMode} />
  )
}

export default PokedexPage
