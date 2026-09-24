async function request(url, options) {
  const res = await fetch(url, options);
  if (!res.ok && res.status !== 404) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }
  return res;
}

export async function getMovies() {
  const res = await request("/api/movies");
  return res.json();
}

export async function getMovie(id) {
  const res = await request(`/api/movies/${id}`);
  if (res.status === 404) return null;
  return res.json();
}

export async function createMovie(data) {
  const res = await request("/api/movies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateMovie(id, data) {
  const res = await request(`/api/movies/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function rateMovie(id, rating) {
  const res = await request(`/api/movies/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rating }),
  });
  return res.json();
}

export async function clearRatings() {
  const res = await request("/api/movies/clear-ratings", {
    method: "PATCH",
  });
  return res.json();
}

export async function removeMovie(id) {
  await request(`/api/movies/${id}`, { method: "DELETE" });
}
