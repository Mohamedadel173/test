import { useState } from 'react'

function SearchBar({ initialQuery = '', placeholder = 'Search movies...', onSearch }) {
  const [query, setQuery] = useState(initialQuery)

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    onSearch(trimmed)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
        placeholder={placeholder}
        aria-label="Search movies"
      />
      <button type="submit" className="btn primary">Search</button>
    </form>
  )
}

export default SearchBar