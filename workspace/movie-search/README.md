# Movie Search (React + Vite)

A simple movie search website built with React, Vite, and React Router. It uses the public OMDb API to fetch movie data.

## Features
- Search movies by title
- View detailed movie info
- Reusable components: SearchBar, MovieCard, MovieList
- Client-side routing with React Router
- Loading and error states
- Optional Favorites using localStorage

## Getting Started

1. Clone the repo
2. Install dependencies

```bash
npm install
```

3. Configure environment variables

Create a `.env` file at the project root based on `.env.example`:

```bash
cp .env.example .env
# Edit .env and set your OMDb key
VITE_OMDB_API_KEY=YOUR_KEY
```

You can request a free API key at `https://www.omdbapi.com/apikey.aspx`.

4. Run the dev server

```bash
npm run dev
```

5. Build for production

```bash
npm run build
```

6. Preview production build

```bash
npm run preview
```

## Project Structure

- `src/components` — Reusable UI components
- `src/pages` — Route components
- `src/styles` — Global styles

## Notes
- This project uses Vite. Env vars must be prefixed with `VITE_`.
- The Favorites list persists to `localStorage` in the browser.
