export default function Loading() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6">
      
      <div className="skeleton h-24 w-full rounded-2xl" />
      
      <div className="skeleton h-16 w-full rounded-2xl" />
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-36 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}