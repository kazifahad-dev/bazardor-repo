export default function Loading() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-10">
      <div className="skeleton h-12 w-56" />
      <div className="skeleton h-48 w-full rounded-2xl" />
    </div>
  );
}