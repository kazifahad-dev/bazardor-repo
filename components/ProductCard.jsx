import Link from "next/link";
import { toBn, changeStyle, unitBn } from "@/lib/format";

export default function ProductCard({ product }) {
  const { icon, color } = changeStyle(product.change.dir);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl border border-base-300 bg-base-100 p-4 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      
      <div className="flex items-start gap-3">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-base-200 text-2xl">
          {product.image}
        </div>
        <div className="min-w-0">
          <p className="truncate text-base font-semibold">{product.nameBn}</p>
          <p className="text-xs">প্রতি {unitBn[product.unit]}</p>
        </div>
      </div>

      
      <div className="mt-3 flex items-end justify-between">
        <div>
          <p className="text-xs">আজকের দাম</p>
          <p>
            <span className="text-xl font-bold">{toBn(product.today)}</span>{" "}
            <span className="text-sm font-medium">টাকা</span>
          </p>
        </div>
        <span
          className={`flex items-center gap-1 rounded-xl bg-base-200 px-2 py-1 text-xs font-semibold ${color}`}
        >
          {icon} {toBn(Math.abs(product.change.pct), 1)}%
        </span>
      </div>
    </Link>
  );
}