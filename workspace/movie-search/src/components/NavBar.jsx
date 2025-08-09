import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <header className="navbar">
      <div className="container">
        <Link to="/" className="brand">🎬 Movie Search</Link>
      </div>
    </header>
  )
}

export default NavBar