import { useEffect, useState } from 'react'
import { fetchPokemonList } from '../api/pokemon'
import PokemonCard from '../components/PokemonCard'
import styled from 'styled-components'

import { useNavigate } from "react-router-dom";
const ITEMS_PER_PAGE = 20


const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #e0f0ff, #ffffff);
  padding: 3rem 1rem;
`

const Heading = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: #2b2d42;
  margin-bottom: 1rem;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
   @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`

const PageButton = styled.button<{ disabled?: boolean }>`
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  background-color: ${(props) => (props.disabled ? '#ccc' : '#dee2e6')};
  color: #2b2d42;
  border: none;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: background 0.2s;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#ccc' : '#ced4da')};
  }
`

const PageText = styled.span`
  font-weight: 500;
  font-size: 1rem;
  color: #2b2d42;
`

const Loading = styled.p`
  text-align: center;
  font-size: 1rem;
  color: #555;
`

const ErrorBox = styled.div`
  background: #ffe5e5;
  color: #d00000;
  border: 1px solid #ffcccc;
  border-radius: 8px;
  padding: 1rem;
  max-width: 400px;
  margin: 1rem auto;
  text-align: center;
`

const RetryButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.4rem 1rem;
  background-color: #ffb3b3;
  color: #d00000;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #ffa1a1;
  }
`

const Subheading = styled.p`
  text-align: center;
  color: #555;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`

const ToggleButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  font-weight: 500;
  background-color: ${(props) => (props.active ? '#111' : '#e2e8f0')};
  color: ${(props) => (props.active ? '#fff' : '#111')};
  border: none;
  transition: background 0.2s;

  &:hover {
    background-color: ${(props) => (props.active ? '#000' : '#cbd5e1')};
  }

  `
const PaginationView = ({
  setViewMode,
}: {
  setViewMode: (mode: 'pagination' | 'infinite') => void
}) => {  const [currentPage, setCurrentPage] = useState(1)
  const [pokemonData, setPokemonData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const offset = (currentPage - 1) * ITEMS_PER_PAGE
   const navigate = useNavigate();

  const handleSwitch = () => {
    setViewMode("infinite");
    navigate("/load-more");
  };



  useEffect(() => {
      const cachedData = localStorage.getItem('pokemonList')

  if (cachedData) {
    setPokemonData(JSON.parse(cachedData))
    return
  }
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchPokemonList(ITEMS_PER_PAGE, offset)

        const enriched = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url)
            const details = await res.json()
            return {
              name: pokemon.name,
              sprite: details.sprites.front_default,
              id: details.id
            }
          })
        )

        setPokemonData(enriched)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch Pokémon data.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [offset])

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1)
  }

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1)
  }

  
  return (
    <Container>
      <Heading>⚡ Pokédex</Heading>
      <Subheading>Discover and explore Pokémon with page controls</Subheading>
<ButtonGroup>
  <ToggleButton disabled active>Page Controls</ToggleButton>
  <ToggleButton style={{cursor: 'pointer'}} onClick={handleSwitch}>Infinite Scroll</ToggleButton>
</ButtonGroup>

      {loading && <Loading>Loading...</Loading>}

      {error && (
        <ErrorBox>
          <p>{error}</p>
          <RetryButton onClick={() => setCurrentPage(currentPage)}>Retry</RetryButton>
        </ErrorBox>
      )}

      {!loading && !error && (
        <>
          <Grid>
            {pokemonData.map((pokemon) => (
              <PokemonCard key={pokemon.name} {...pokemon} />
            ))}
          </Grid>

          <PaginationControls>
            <PageButton onClick={handlePrev} disabled={currentPage === 1}>
              Previous
            </PageButton>
            <PageText>Page {currentPage}</PageText>
            <PageButton onClick={handleNext}>Next</PageButton>
          </PaginationControls>
        </>
      )}
    </Container>
  )
}

export default PaginationView
