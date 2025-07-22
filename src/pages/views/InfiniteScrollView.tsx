import styled from 'styled-components'

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
`

const Heading = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
`

const Subheading = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #666;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`

const ToggleButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  margin: 0 0.5rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#007bff' : '#e0e0e0')};
  color: ${({ active }) => (active ? '#fff' : '#333')};

  &:hover {
    background-color: ${({ active }) => (active ? '#0056b3' : '#d5d5d5')};
  }
`

const InfiniteScrollView = ({
  setViewMode,
}: {
  setViewMode: (mode: 'pagination' | 'infinite') => void
}) => {
  return (
    <Container>
      <Heading>🔄 Pokédex - Infinite Scroll</Heading>
      <Subheading>Scroll down to load more Pokémon</Subheading>
      <ButtonGroup>
        <ToggleButton onClick={() => setViewMode('pagination')}>Page Controls</ToggleButton>
        <ToggleButton active>Infinite Scroll</ToggleButton>
      </ButtonGroup>

      <p style={{ textAlign: 'center', color: '#888' }}>Coming soon...</p>
    </Container>
  )
}

export default InfiniteScrollView
