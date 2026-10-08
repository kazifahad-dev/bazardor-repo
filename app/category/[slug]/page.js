import { getProducts } from "@/lib/api";
import { categories } from "@/lib/categories";
import { toBn } from "@/lib/format";
import CategoryProducts from "@/components/CategoryProducts";
import EmptyState from "@/components/EmptyState";

export default async function CategoryPage({ params }) {
  
  const { slug } = await params;

  
  const category = categories.find((c) => c.slug === slug);
  if (!category) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <EmptyState
          title="ক্যাটাগরি পাওয়া যায়নি"
          message="এই নামে কোনো ক্যাটাগরি নেই।"
        />
      </div>
    );
  }

  const data = await getProducts(slug);
  const products = Array.isArray(data) ? data : [];

  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <EmptyState
          title="কোনো পণ্য নেই"
          message="এই ক্যাটাগরিতে এখন কোনো পণ্য পাওয়া যাচ্ছে না।"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6">
     
      <div className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-100 p-5">
        <span className="text-4xl">{category.icon}</span>
        <div>
          <h1 className="text-2xl font-bold">{category.name}</h1>
          <p className="text-sm">
            {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <CategoryProducts products={products} />
    </div>
  );
}