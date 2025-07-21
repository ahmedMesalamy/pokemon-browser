import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { motion } from 'framer-motion'



interface PokemonCardProps {
  name: string
  sprite: string
    id: number

}

const CardLink = styled(Link)`
  text-decoration: none;
`

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border 0.2s ease;
  cursor: pointer;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    border-color: #facc15; /* A soft yellow glow like amber-400 */
  }
`

const MotionCard = motion(Card)


const Sprite = styled.img`
  width: 100%;
  max-height: 90%;
  background-color: #f3f4f6; /* A light gray background */
  object-fit: cover;
  margin: 0 auto;
`

const Name = styled.h2`
  margin-top: 12px;
  font-weight: 600;
  text-transform: capitalize;
  color: #333;
`
const IdText = styled.p`
  font-size: 0.875rem;
  color: #666;
  margin-top: 4px;
`


const PokemonCard = ({ name, sprite, id }: PokemonCardProps) => {
  return (
  <CardLink to={`/pokemon/${name}`}>
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <Sprite src={sprite} alt={name} />
        <Name>{name}</Name>
          <IdText>#{String(id).padStart(3, '0')}</IdText>

      </MotionCard>
    </CardLink>
  )
}

export default PokemonCard
