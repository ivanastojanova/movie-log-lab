import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { ALL_MOVIES } from "../src/data/movies.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, "data.db"));

// Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS movies (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    image       TEXT,
    rating      INTEGER,
    genres      TEXT NOT NULL DEFAULT '[]',
    inTheaters  INTEGER NOT NULL DEFAULT 0
  );
`);

// Map a raw DB row to the movie shape the frontend expects
export function rowToMovie(row) {
  return {
    ...row,
    genres: JSON.parse(row.genres),
    inTheaters: !!row.inTheaters,
  };
}

// Seed on first run
const { count } = db.prepare("SELECT COUNT(*) AS count FROM movies").get();

if (count === 0) {
  const insert = db.prepare(`
    INSERT INTO movies (name, description, image, rating, genres, inTheaters)
    VALUES (@name, @description, @image, @rating, @genres, @inTheaters)
  `);

  const seedAll = db.transaction((movies) => {
    for (const movie of movies) {
      insert.run({
        name: movie.name,
        description: movie.description,
        image: movie.image ?? null,
        rating: movie.rating ?? null,
        genres: JSON.stringify(movie.genres),
        inTheaters: movie.inTheaters ? 1 : 0,
      });
    }
  });

  seedAll(ALL_MOVIES.items);
  console.log(`Seeded ${ALL_MOVIES.items.length} movies into the database.`);
}

export default db;
