import { useEffect, useState } from 'react'
import { fetchPokemonList } from '../api/pokemon'
import PokemonCard from '../components/PokemonCard'

const ITEMS_PER_PAGE = 10

const LoadMoreView = () => {
  const [pokemonData, setPokemonData] = useState<any[]>([])
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)

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

      // Avoid duplicates
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

  // Initial fetch
  useEffect(() => {
    if (pokemonData.length === 0) loadMore()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Load More View</h1>

      {error && (
        <div className="text-center text-red-500 mb-4">
          <p>{error}</p>
          <button
            onClick={loadMore}
            className="mt-2 px-4 py-1 bg-red-100 rounded"
          >
            Retry
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {pokemonData.map((pokemon) => (
          <PokemonCard key={pokemon.name} {...pokemon} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400 transition disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  )
}

export default LoadMoreView
