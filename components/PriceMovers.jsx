import ProductCard from "./ProductCard";
import { changeStyle } from "@/lib/format";

export default function PriceMovers({ title, dir, products }) {
  const { icon, color } = changeStyle(dir);

  if (products.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 flex items-center gap-2 text-xl font-bold">
        <span className={`text-base ${color}`}>{icon}</span>
        {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}