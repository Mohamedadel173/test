import { Link } from 'react-router-dom'

function MovieCard({ movie }) {
  const { Title, Year, Poster, imdbID } = movie
  const hasPoster = Poster && Poster !== 'N/A'

  return (
    <Link to={`/movie/${imdbID}`} className="movie-card" aria-label={`${Title} (${Year})`}>
      <div className="poster-wrapper">
        {hasPoster ? (
          <img src={Poster} alt={`${Title} poster`} className="poster" loading="lazy" />
        ) : (
          <div className="poster placeholder">No Image</div>
        )}
      </div>
      <div className="movie-meta">
        <h3 className="movie-title">{Title}</h3>
        <p className="movie-year">{Year}</p>
      </div>
    </Link>
  )
}

export default MovieCard