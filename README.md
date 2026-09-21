# Movie Rating App

A React app for browsing, rating, and managing a list of movies, with dedicated pages for the list and individual movie details.

## Features

- Movie list fetched asynchronously (simulated API) with skeleton loading placeholders
- Dedicated detail page per movie via client-side routing (`/movie/:id`)
- Star rating overlay on each poster; click the stars in the list view to rate a movie
- "Now Playing" badge for movies currently in theaters
- Graceful fallback for missing posters ("No image") and unrated movies (gray star, dash)
- Header stats: total movie count and average rating, both derived from current data
- Add / Edit / Remove movies via a modal form
  - Client-side validation (required name, at least one genre) with inline error messages
  - Modal supports Escape-to-close and click-outside-to-close
  - Name field auto-focuses when the modal opens
- "Remove Ratings" button to clear all ratings at once

## Tech Stack

- [React 19](https://react.dev/)
- [React Router 7](https://reactrouter.com/)
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
├── App.jsx                        # Router configuration (/ and /movie/:id)
├── pages/
│   ├── HomePage.jsx                # Movie list, stats header, add/edit/remove flows
│   └── MovieDetailPage.jsx         # Single movie detail view
├── components/
│   ├── movie-item/                 # List card, broken into poster/ and details/ sub-parts
│   ├── movie-form/                  # Add/edit form with validation
│   ├── modal/                       # Generic modal (escape + click-outside)
│   └── skeleton/                    # Generic loading-placeholder primitive
├── hooks/
│   ├── useFetch.js                  # Data fetching with loading state + race-condition guard
│   └── useModal.js                  # Escape-key / click-outside handling for modals
├── services/
│   └── movies-service.js            # Simulated async API (getMovies, getMovie)
├── data/
│   └── movies.js                    # Seed movie data
└── index.css                        # Global styles and Tailwind utility classes
```

## Adding Movies to the Seed Data

Edit `src/data/movies.js` and add an entry to the `items` array:

```js
{
  id: 6,
  name: "Your Movie",
  description: "A short description.",
  image: "https://...",   // set to null to show the "No image" placeholder
  rating: 4,               // set to null for unrated
  genres: ["Drama"],
  inTheaters: false,
}
```

Movies can also be added, edited, or removed directly from the running app via the "Add Movie" button and the Edit/Remove actions on each card.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm test` | Run tests |
| `npm run lint` | Run ESLint |
