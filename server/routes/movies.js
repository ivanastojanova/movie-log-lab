import { Router } from "express";
import db, { rowToMovie } from "../db.js";

const router = Router();

// GET /api/movies — return all movies
router.get("/", (_req, res) => {
  const rows = db.prepare("SELECT * FROM movies").all();
  res.json(rows.map(rowToMovie));
});

// GET /api/movies/:id — return one movie or 404
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const row = db.prepare("SELECT * FROM movies WHERE id = ?").get(id);
  if (!row) return res.status(404).json({ error: "Movie not found" });
  res.json(rowToMovie(row));
});

// POST /api/movies — create a new movie
router.post("/", (req, res) => {
  const { name, description = "", imageUrl, genres, inTheaters = false } = req.body;

  // Validation (mirrors client-side MovieForm validate())
  const errors = {};
  if (!name || !name.trim()) errors.name = "Name is required";
  if (!genres || genres.length === 0) errors.genres = "At least one genre is required";
  if (Object.keys(errors).length > 0) return res.status(400).json({ errors });

  const result = db.prepare(`
    INSERT INTO movies (name, description, image, rating, genres, inTheaters)
    VALUES (@name, @description, @image, @rating, @genres, @inTheaters)
  `).run({
    name: name.trim(),
    description: description.trim(),
    image: imageUrl ?? null,
    rating: null,
    genres: JSON.stringify(genres),
    inTheaters: inTheaters ? 1 : 0,
  });

  const row = db.prepare("SELECT * FROM movies WHERE id = ?").get(result.lastInsertRowid);
  res.status(201).json(rowToMovie(row));
});

// PATCH /api/movies/clear-ratings — must be before PATCH /:id
router.patch("/clear-ratings", (_req, res) => {
  db.prepare("UPDATE movies SET rating = NULL").run();
  const rows = db.prepare("SELECT * FROM movies").all();
  res.json(rows.map(rowToMovie));
});

// PATCH /api/movies/:id — partial update (edit form or rating)
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const existing = db.prepare("SELECT * FROM movies WHERE id = ?").get(id);
  if (!existing) return res.status(404).json({ error: "Movie not found" });

  // Build update fields from allowed keys
  const { name, description, imageUrl, genres, inTheaters, rating } = req.body;
  const updates = {};
  if (name !== undefined) updates.name = name.trim();
  if (description !== undefined) updates.description = description.trim();
  if (imageUrl !== undefined) updates.image = imageUrl ?? null;  // imageUrl wire → image storage
  if (genres !== undefined) updates.genres = JSON.stringify(genres);
  if (inTheaters !== undefined) updates.inTheaters = inTheaters ? 1 : 0;
  if (rating !== undefined) updates.rating = rating;

  if (Object.keys(updates).length === 0) {
    return res.json(rowToMovie(existing));
  }

  const setClauses = Object.keys(updates).map((k) => `${k} = @${k}`).join(", ");
  db.prepare(`UPDATE movies SET ${setClauses} WHERE id = @id`).run({ ...updates, id });

  const row = db.prepare("SELECT * FROM movies WHERE id = ?").get(id);
  res.json(rowToMovie(row));
});

// DELETE /api/movies/:id — remove a movie
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const existing = db.prepare("SELECT * FROM movies WHERE id = ?").get(id);
  if (!existing) return res.status(404).json({ error: "Movie not found" });
  db.prepare("DELETE FROM movies WHERE id = ?").run(id);
  res.status(204).send();
});

export default router;
