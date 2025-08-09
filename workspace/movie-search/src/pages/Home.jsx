import { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar.jsx'
import MovieList from '../components/MovieList.jsx'

const OMDB_BASE_URL = 'https://www.omdbapi.com/'

function Home() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function fetchMovies(searchTerm) {
    try {
      setLoading(true)
      setError('')
      setMovies([])
      const url = `${OMDB_BASE_URL}?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${encodeURIComponent(searchTerm)}&type=movie&page=1`
      const res = await fetch(url)
      const data = await res.json()
      if (data.Response === 'True') {
        setMovies(data.Search)
      } else {
        setError(data.Error || 'No results found')
      }
    } catch (err) {
      setError('Failed to fetch movies')
    } finally {
      setLoading(false)
    }
  }

  function handleSearch(searchTerm) {
    setQuery(searchTerm)
    fetchMovies(searchTerm)
  }

  useEffect(() => {
    // Optionally perform an initial search, e.g., "Avengers"
    // handleSearch('Avengers')
  }, [])

  return (
    <div className="container page home-page">
      <SearchBar initialQuery={query} onSearch={handleSearch} />

      {loading && <div className="status">Loading...</div>}
      {error && !loading && <div className="status error" role="alert">{error}</div>}

      {!loading && !error && movies?.length > 0 && (
        <>
          <h2 className="section-title">Results</h2>
          <MovieList movies={movies} />
        </>
      )}
    </div>
  )
}

export default Home