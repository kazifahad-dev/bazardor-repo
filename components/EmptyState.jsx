import Link from "next/link";

export default function EmptyState({
  title = "কিছু খুঁজে পাওয়া যায়নি",
  message = "আপনি যে পেজ বা ক্যাটাগরি খুঁজছেন সেটি নেই।",
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-base-300 bg-base-100 px-6 py-12 text-center">
      <span className="text-5xl">🔍</span>
      <p className="text-4xl font-bold text-primary">৪০৪</p>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm">{message}</p>
      <Link href="/" className="btn btn-primary mt-2">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}