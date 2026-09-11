# Movie Rating App

A React app for browsing a curated list of movies with ratings, genre tags, and theater status.

## Features

- Browse movies with poster images, descriptions, and genre tags
- Star rating displayed as an overlay on each movie poster
- "Now Playing" badge for movies currently in theaters
- Graceful fallback for missing posters or unrated movies

## Tech Stack

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Heroicons](https://heroicons.com/)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── App.jsx          # Main app component and movie card layout
├── data/
│   └── movies.js    # Movie data (name, description, image, rating, genres, inTheaters)
└── index.css        # Global styles and Tailwind utility classes
```

## Adding Movies

Edit `src/data/movies.js` and add an entry to the `items` array:

```js
{
  id: 6,
  name: "Your Movie",
  description: "A short description.",
  image: "https://...",   // set to null to show the placeholder
  rating: 4,              // set to null for unrated
  genres: ["Drama"],
  inTheaters: false,
}
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm test` | Run tests |
