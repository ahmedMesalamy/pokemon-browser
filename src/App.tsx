import { Routes, Route, Navigate } from 'react-router-dom'
import PaginationView from './pages/PaginationView'
import LoadMoreView from './pages/LoadMoreView'
import PokemonDetail from './pages/PokemonDetail'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/pagination" replace />} />
      <Route path="/pagination" element={<PaginationView />} />
      <Route path="/load-more" element={<LoadMoreView />} />
      <Route path="/pokemon/:id" element={<PokemonDetail />} />
    </Routes>
  )
}

export default App
