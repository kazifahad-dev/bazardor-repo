export default function Loading() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
      <div className="skeleton h-5 w-56" />
      <div className="skeleton h-40 w-full rounded-2xl" />
      <div className="skeleton h-96 w-full rounded-2xl" />
    </div>
  );
}