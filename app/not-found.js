import EmptyState from "@/components/EmptyState";


export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <EmptyState
        title="পেজটি খুঁজে পাওয়া যায়নি"
        message="আপনি যে ঠিকানায় এসেছেন সেটি ভুল, অথবা পেজটি আর নেই।"
      />
    </div>
  );
}