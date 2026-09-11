export default function Image( {image, name} ) {
    return (
        <>
        {image ? (
        <img src={image} alt={name} className="w-full h-full object-cover" />
      ) : (
        <div className="flex items-center justify-center h-full bg-gray-200 text-gray-400 text-lg font-medium">
          No image
        </div>
      )}
      </>
    )}