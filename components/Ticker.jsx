import { getProducts } from "@/lib/api";
import { toBn, changeStyle, unitBn } from "@/lib/format";

export default async function Ticker() {
  const products = (await getProducts()) ?? [];

  if (products.length === 0) return null; 

  const items = products.map((p) => {
    const { icon, color } = changeStyle(p.change.dir);
    return (
      <div
        key={p.id}
        className="flex shrink-0 items-center gap-1.5 border-r border-base-200 px-4 py-2 text-sm"
      >
        <span>{p.image}</span>
        <span className="font-medium">{p.nameBn}</span>
        <span>
          {toBn(p.today)} টাকা/{unitBn[p.unit]}
        </span>
        <span className={`font-semibold ${color}`}>
          {icon} {toBn(Math.abs(p.change.pct), 1)}%
        </span>
      </div>
    );
  });

  return (
    <div className="overflow-hidden border-b border-base-300 bg-base-100">
      
      <div className="ticker-track flex w-max">
        <div className="flex">{items}</div>
        <div className="flex" aria-hidden="true">
          {items}
        </div>
      </div>
    </div>
  );
}