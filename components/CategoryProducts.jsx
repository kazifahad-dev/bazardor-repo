"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { toBn } from "@/lib/format";

export default function CategoryProducts({ products }) {
  
  const [sort, setSort] = useState("default");

  const sorted = [...products];
  if (sort === "asc") sorted.sort((a, b) => a.today - b.today);
  if (sort === "desc") sorted.sort((a, b) => b.today - a.today);

  return (
    <div className="flex flex-col gap-4">
      
      <div className="flex items-center justify-end gap-2 rounded-2xl border border-base-300 bg-base-100 p-4">
        <label htmlFor="sort" className="text-sm">
          সাজান
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select select-sm w-auto"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <p className="text-sm">মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}