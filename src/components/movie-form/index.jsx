import { useActionState, useEffect, useRef, useState } from "react";
import { GENRES } from "../../types/genres";

function validate({ name, genres }) {
  const errors = {};
  if (!name.trim()) errors.name = "Name is required.";
  if (!genres.length) errors.genres = "At least one genre must be selected.";
  return errors;
}

export default function MovieForm({ movie, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: movie?.name ?? "",
    description: movie?.description ?? "",
    imageUrl: movie?.image ?? "",
    genres: movie?.genres ?? [],
    inTheaters: movie?.inTheaters ?? false,
  });
  const [modifiedFields, setModifiedFields] = useState(new Set());
  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const [actionErrors, formAction, isPending] = useActionState(async (_, fd) => {
    const data = {
      name: (fd.get("name") ?? "").toString(),
      description: (fd.get("description") ?? "").toString(),
      imageUrl: (fd.get("imageUrl") ?? "").toString(),
      genres: fd.getAll("genres"),
      inTheaters: fd.get("inTheaters") === "on",
    };

    const errors = validate(data);
    if (Object.keys(errors).length) return errors;

    await onSave(data); 
    return {};
  }, {});

  const errors = Object.fromEntries(
    Object.entries(actionErrors ?? {}).filter(([key]) => !modifiedFields.has(key))
  );

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setModifiedFields((prev) => new Set([...prev, name]));
  }

  function handleGenreChange(e) {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      genres: checked
        ? [...prev.genres, value]
        : prev.genres.filter((g) => g !== value),
    }));
    setModifiedFields((prev) => new Set([...prev, "genres"]));
  }

  const inputClasses = "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50";

  return (
    <form
      action={formAction}
      onSubmit={() => setModifiedFields(new Set())}
      className="w-full max-w-lg bg-white rounded-xl shadow-md p-6 flex flex-col gap-4"
    >
      <h2 className="movie-item-title text-xl font-bold">{movie ? "Edit Movie" : "Add Movie"}</h2>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Name</label>
        <input
          ref={nameInputRef}
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={inputClasses}
          disabled={isPending}
        />
        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className={`${inputClasses} resize-none`}
          disabled={isPending}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Image URL</label>
        <input
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className={inputClasses}
          disabled={isPending}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-700">Genres</span>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {GENRES.map((genre) => (
            <label key={genre} className="flex items-center gap-1.5 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                name="genres"
                value={genre}
                checked={formData.genres.includes(genre)}
                onChange={handleGenreChange}
                className="w-4 h-4"
                disabled={isPending}
              />
              {genre}
            </label>
          ))}
        </div>
        {errors.genres && <p className="text-xs text-red-500">{errors.genres}</p>}
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
        <input
          type="checkbox"
          name="inTheaters"
          checked={formData.inTheaters}
          onChange={handleChange}
          className="w-4 h-4"
          disabled={isPending}
        />
        Now Playing in Theaters
      </label>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="btn btn-primary flex-1" disabled={isPending}>
          {isPending ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={onCancel} className="btn btn-secondary flex-1" disabled={isPending}>
          Cancel
        </button>
      </div>
    </form>
  );
}
