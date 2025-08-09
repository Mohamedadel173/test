import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import MovieDetails from './pages/MovieDetails.jsx'
import NavBar from './components/NavBar.jsx'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <NavBar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:imdbID" element={<MovieDetails />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
