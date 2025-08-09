import MovieCard from './MovieCard.jsx'

function MovieList({ movies }) {
  if (!movies?.length) return null
  return (
    <section className="movie-list">
      {movies.map((m) => (
        <MovieCard key={m.imdbID} movie={m} />
      ))}
    </section>
  )
}

export default MovieList