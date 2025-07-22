import { useEffect, useState } from 'react'
import { fetchPokemonList } from '../api/pokemon'
import PokemonCard from '../components/PokemonCard'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const ITEMS_PER_PAGE = 10

type Props = {
  setViewMode: (mode: "pagination" | "infinite") => void;
};
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #e0f0ff, #ffffff);
  padding: 3rem 1rem;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const StyledButton = styled.button`
  padding: 0.6rem 1.2rem;
  font-size: 0.95rem;
  font-weight: 500;
  background-color: #3b82f6;
  color: white;
  border-radius: 0.5rem;
  transition: background 0.2s ease;
  border: none;

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const ErrorBox = styled.div`
  text-align: center;
  color: #dc2626;
  margin-bottom: 1rem;
`;

const LoadMoreView = ({ setViewMode }: Props) => {
  const [pokemonData, setPokemonData] = useState<any[]>([])
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)

  const navigate = useNavigate()

  const handleSwitch = () => {
    setViewMode("pagination")
    navigate("/pagination")
  }

  const loadMore = async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await fetchPokemonList(ITEMS_PER_PAGE, offset)

      if (data.results.length === 0) {
        setHasMore(false)
        return
      }

      const enriched = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url)
          const details = await res.json()
          return {
            name: pokemon.name,
            sprite: details.sprites.front_default,
          }
        })
      )

      setPokemonData((prev) => [
        ...prev,
        ...enriched.filter(
          (newItem) => !prev.some((p) => p.name === newItem.name)
        ),
      ])

      setOffset((prev) => prev + ITEMS_PER_PAGE)
    } catch (err: any) {
      setError(err.message || 'Failed to load Pokémon')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (pokemonData.length === 0) loadMore()
  }, [])

  return (
    <Container>
    <div className="p-4 max-w-7xl mx-auto">

      {error && (
        <ErrorBox>
          <p>{error}</p>
          <StyledButton onClick={loadMore}>Retry</StyledButton>
        </ErrorBox>
      )}

      <ButtonGroup>
        <StyledButton onClick={handleSwitch}>
          Switch to Pagination
        </StyledButton>
      </ButtonGroup>

      <Grid>
        {pokemonData.map((pokemon) => (
          <PokemonCard key={pokemon.name} {...pokemon} />
        ))}
      </Grid>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <StyledButton onClick={loadMore} disabled={loading}>
            {loading ? 'Loading…' : 'Load More'}
          </StyledButton>
        </div>
      )}
    </div>
    </Container>
  )
}

export default LoadMoreView
