export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: { name: string; url: string }[]
}
export interface PokemonDetail {
  name: string
  height: number
  weight: number
  sprites: {
    front_default: string
  }
  types: {
    type: { name: string }
  }[]
}

export const fetchPokemonDetail = async (
  idOrName: string | number
): Promise<PokemonDetail> => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`)

  if (!res.ok) {
    throw new Error('Failed to fetch Pokémon detail')
  }

  return res.json()
}

export const fetchPokemonList = async (
  limit = 10,
  offset = 0
): Promise<PokemonListResponse> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon list')
  }

  return response.json()
}
