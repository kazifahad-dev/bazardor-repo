import { getProducts } from "@/lib/api";
import Hero from "@/components/Hero";
import PriceMovers from "@/components/PriceMovers";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const products = (await getProducts()) ?? [];

  
  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  
  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-6">
      <Hero />

      <PriceMovers title="আজ দাম বেড়েছে" dir="up" products={risers} />
      <PriceMovers title="আজ দাম কমেছে" dir="down" products={fallers} />

      
      <section id="সব-পণ্য" className="scroll-mt-4">
        <h2 className="mb-1 text-xl font-bold">সব পণ্য</h2>
        <p className="mb-3 text-sm">
          মোট {products.length}টি পণ্য দেখানো হচ্ছে
        </p>

        {products.length === 0 ? (
          <p className="rounded-2xl border border-base-300 p-6 text-center">
            এই মুহূর্তে পণ্যের তথ্য আনা যাচ্ছে না। একটু পরে আবার চেষ্টা করুন।
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}