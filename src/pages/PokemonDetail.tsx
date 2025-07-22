import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { fetchPokemonDetail } from '../api/pokemon'



const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #fce4ec 0%, #f3e5f5 100%);
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
  text-color: black;
    font-family: 'Roboto', sans-serif;

  align-items: flex-start;
`

const Card = styled.div`
  width: 100%;
  max-width: 900px;
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`

const Header = styled.div`
  background: linear-gradient(90deg, #9c27b0, #ec407a);
  color: white;
  padding: 1.75rem 1rem;
  text-align: center;
  font: bold 1.5rem 'Roboto', sans-serif;
`

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  text-transform: capitalize;
`

const SubTitle = styled.p`
  font-size: 0.875rem;
  opacity: 0.9;
  margin-top: 0.25rem;
    font: bold 1.5rem 'Roboto', sans-serif;

`

const ImageWrapper = styled.div`
  background: #f3f4f6;
  border-radius: 50%;
  width: 15vw;
  height: 35vh;
  display: flex;
  align-items: center;
  justify-content: center;
    @media (max-width: 768px) {
    width: 30vw;
    height: 30vw;
  }
`

const Image = styled.img`
  width: 15vw;
  height: 33vh;
      @media (max-width: 768px) {
    width: 20vw;
    height: 20vw;
  }
`

const Badge = styled.span`
  background-color: #ef5350;
  color: white;
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-weight: 500;
  display: inline-block;
  margin: 1rem auto 0;
`

const MetaGrid = styled.div`
  display: flex;
  gap: 2rem;
  margin: 1rem 0;
`

const MetaBox = styled.div`
  background: #f3f4f6;
  padding: 0.2srem 1.2rem;
  border-radius: 1rem;
  text-align: center;
  min-width: 5vw;
`

const MetaLabel = styled.p`
  font-size: 0.75rem;
  font-weight: bold;
  font-weight: 400;
`

const MetaValue = styled.p`
  font-weight: bold;
  color: black;
    font-size: 1.3rem;
  font-weight: bold;
  font-weight: 1300;
`

const StatContainer = styled.div`
`
const ResponsiveFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
    flexgrow: 1;
  }
`;

const PokemonDetials = styled.div`
  flex-grow: 1;
    @media (max-width: 768px) {
    width: 90%;
  }

    `


const StatBar = styled.div`
  background-color: #e5e7eb;
  border-radius: 9999px;
  height: 0.5rem;
  margin-top: 0.25rem;
  margin-bottom: 1rem;
`

const StatFill = styled.div<{ width: number }>`
  background-color: black;
  height: 100%;
  border-radius: 9999px;
  width: ${({ width }) => `${width}%`};
`

const Label = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  font-weight: 1300;
  color: black;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 0.5rem;
`

const Value = styled.p`
  font-size: 1.5rem;
  font-weight: 900;
  color: #7e22ce;
`

const Text = styled.p`
    font-size: 1.1rem;
  font-weight: bold;
  font-weight: 1300;
  color: #6b7280;
`

const BackLink = styled(Link)`
  display: inline-block;
  font-size: 0.875rem;
  position: absolute; 
  top: 1rem;
  left: 5rem;
  color: #6b7280;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: 0.2s ease;
  &:hover {
    background: #c7d2fe;
  }
        @media (max-width: 768px) {
    display: none;
  }
`


const PokemonDetail = () => {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return
      setLoading(true)
      setError(null)

      try {
        const data = await fetchPokemonDetail(id)
        setPokemon(data)
      } catch (err: any) {
        setError(err.message || 'Error loading Pokémon')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) return <Text style={{ textAlign: 'center', padding: '1rem' }}>Loading...</Text>

  if (error)
    return (
      <div style={{ textAlign: 'center', color: 'black',  padding: '1rem' }}>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: '0.5rem',
            padding: '0.25rem 1rem',
            backgroundColor: '#fee2e2',
            borderRadius: '0.25rem',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Retry
        </button>
      </div>
    )

  if (!pokemon) return null

return (
  <Container>
            <BackLink to="/">← Back to List</BackLink>

    <Card>
      <Header>
        <Title>{pokemon.name}</Title>
        <SubTitle>#{pokemon.id.toString().padStart(3, '0')}</SubTitle>
      </Header>

      <ResponsiveFlex style={{ padding: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', }} >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%'}}>
        <ImageWrapper>
          <Image src={pokemon.sprites.front_default} alt={pokemon.name} />
        </ImageWrapper>

        {pokemon.types.length > 0 && (
          <Badge>{pokemon.types[0].type.name}</Badge>
        )}

        <MetaGrid>
          <MetaBox>
            <MetaLabel>Height</MetaLabel>
            <MetaValue>{pokemon.height / 10} m</MetaValue>
          </MetaBox>
          <MetaBox>
            <MetaLabel>Weight</MetaLabel>
            <MetaValue>{pokemon.weight / 10} kg</MetaValue>
          </MetaBox>
        </MetaGrid>
</div>
        <PokemonDetials style={{flexGrow: 1}}>
        <StatContainer>
          <Label>Base Stats</Label>
          {pokemon.stats.map((stat: any) => (
            <div key={stat.stat.name}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.875rem',
                  marginBottom: '0.25rem',
                }}
              >
                <span style={{ textTransform: 'capitalize' }}>{stat.stat.name}</span>
                <span>{stat.base_stat}</span>
              </div>
              <StatBar>
                <StatFill width={Math.min(stat.base_stat, 100)} />
              </StatBar>
            </div>
          ))}
        </StatContainer>

        <div style={{ marginTop: '1.5rem', textAlign: 'left' }}>
          <Label>Abilities</Label>
          <ul
            style={{
              listStyle: 'disc',
              paddingLeft: '1.5rem',
              fontSize: '0.875rem',
              color: '#374151',
            }}
          >
            {pokemon.abilities.map((ab: any) => (
              <li
                key={ab.ability.name}
                style={ab.is_hidden ? { fontStyle: 'italic', color: '#9ca3af', fontWeight: '800' } : {}}
              >
                {ab.ability.name}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: '1.5rem', fontSize: '1.25rem', fontWeight: '800' }}>
          <Text>Base Experience</Text>
          <Value>{pokemon.base_experience} XP</Value>
        </div>
        </PokemonDetials>
</ResponsiveFlex>
    </Card>
  </Container>
)

  
}

export default PokemonDetail
