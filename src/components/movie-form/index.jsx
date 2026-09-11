import { GENRES } from "../../types/genres";

export default function MovieForm({ movie, onSave, onCancel }) {
  function handleSubmit(formData) {

    onSave({
      name: formData.get("name"),
      description: formData.get("description"),
      imageUrl: formData.get("imageUrl"),
      genres: formData.getAll("genres"),
      inTheaters: formData.get("inTheaters") === "on",
    });
  }

  return (
    <form action={handleSubmit} className="w-full max-w-lg bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
      <h2 className="movie-item-title">{movie ? "Edit Movie" : "Add Movie"}</h2>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Name</label>
        <input name="name" defaultValue={movie?.name ?? ""} required />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea name="description" rows={3} defaultValue={movie?.description ?? ""} className="resize-none" />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Image URL</label>
        <input name="imageUrl" defaultValue={movie?.image ?? ""} />
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
                defaultChecked={movie?.genres?.includes(genre) ?? false}
                className="w-4 h-4"
              />
              {genre}
            </label>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
        <input
          type="checkbox"
          name="inTheaters"
          defaultChecked={movie?.inTheaters ?? false}
          className="w-4 h-4"
        />
        Now Playing in Theaters
      </label>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="btn btn-primary flex-1">Save</button>
        <button type="button" onClick={onCancel} className="btn btn-secondary flex-1">Cancel</button>
      </div>
    </form>
  );
}
