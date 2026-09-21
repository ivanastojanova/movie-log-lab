import { ALL_MOVIES } from "../data/movies";

export async function getMovies() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ALL_MOVIES.items);
    }, 1000);
  });
}

export async function getMovie(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const movie = ALL_MOVIES.items.find((m) => String(m.id) === String(id));
      resolve(movie ?? null);
    }, 1000);
  });
}