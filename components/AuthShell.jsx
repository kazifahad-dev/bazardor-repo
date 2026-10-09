import Link from "next/link";

export default function AuthShell({
  title,
  subtitle,
  children,
  backHref = "/",
  backLabel = "← হোম পেজে ফিরে যান",
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-10">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm">{subtitle}</p>
      </div>

      <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
        {children}
      </div>

      <Link href={backHref} className="text-sm hover:text-primary">
        {backLabel}
      </Link>
    </div>
  );
}