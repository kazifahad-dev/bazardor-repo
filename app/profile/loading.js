export default function Loading() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-8">
      <div className="skeleton h-12 w-64" />
      <div className="skeleton h-32 w-full rounded-2xl" />
      <div className="skeleton h-48 w-full rounded-2xl" />
    </div>
  );
}