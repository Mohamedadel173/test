import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const OMDB_BASE_URL = 'https://www.omdbapi.com/'

function getStoredFavorites() {
  try {
    const raw = localStorage.getItem('favorites')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function setStoredFavorites(favorites) {
  try {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  } catch {}
}

function MovieDetails() {
  const { imdbID } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [favorites, setFavorites] = useState(getStoredFavorites())

  const isFavorite = useMemo(() => favorites.some((f) => f.imdbID === imdbID), [favorites, imdbID])

  useEffect(() => {
    async function fetchDetails() {
      try {
        setLoading(true)
        setError('')
        const url = `${OMDB_BASE_URL}?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${imdbID}&plot=full`
        const res = await fetch(url)
        const data = await res.json()
        if (data.Response === 'True') {
          setMovie(data)
        } else {
          setError(data.Error || 'Movie not found')
        }
      } catch {
        setError('Failed to fetch movie details')
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [imdbID])

  function toggleFavorite() {
    if (!movie) return
    setFavorites((prev) => {
      const exists = prev.some((f) => f.imdbID === imdbID)
      let next
      if (exists) {
        next = prev.filter((f) => f.imdbID !== imdbID)
      } else {
        const summary = { imdbID: movie.imdbID, Title: movie.Title, Year: movie.Year, Poster: movie.Poster }
        next = [...prev, summary]
      }
      setStoredFavorites(next)
      return next
    })
  }

  if (loading) return <div className="container page"><div className="status">Loading...</div></div>
  if (error) return <div className="container page"><div className="status error" role="alert">{error}</div></div>
  if (!movie) return null

  const hasPoster = movie.Poster && movie.Poster !== 'N/A'

  return (
    <div className="container page details-page">
      <Link to="/" className="btn">← Back</Link>

      <div className="details">
        <div className="details-poster">
          {hasPoster ? (
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
          ) : (
            <div className="poster placeholder large">No Image</div>
          )}
        </div>
        <div className="details-content">
          <h1 className="details-title">{movie.Title} <span className="muted">({movie.Year})</span></h1>
          <p className="details-sub">Rated {movie.Rated} • {movie.Runtime} • {movie.Genre}</p>
          <p className="details-sub">Released {movie.Released} • {movie.Language}</p>
          {movie.imdbRating && movie.imdbRating !== 'N/A' && (
            <p className="rating">IMDb: {movie.imdbRating}/10</p>
          )}
          {movie.Plot && movie.Plot !== 'N/A' && (
            <p className="plot">{movie.Plot}</p>
          )}

          <div className="details-meta">
            {movie.Director && <p><strong>Director:</strong> {movie.Director}</p>}
            {movie.Writer && <p><strong>Writer:</strong> {movie.Writer}</p>}
            {movie.Actors && <p><strong>Actors:</strong> {movie.Actors}</p>}
          </div>

          <button className={`btn ${isFavorite ? 'secondary' : 'primary'}`} onClick={toggleFavorite}>
            {isFavorite ? '★ Remove Favorite' : '☆ Add to Favorites'}
          </button>
        </div>
      </div>

      {favorites.length > 0 && (
        <section className="favorites">
          <h2 className="section-title">Favorites</h2>
          <ul className="favorites-list">
            {favorites.map((fav) => (
              <li key={fav.imdbID}>
                <Link to={`/movie/${fav.imdbID}`}>{fav.Title} ({fav.Year})</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default MovieDetails