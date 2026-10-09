import Link from "next/link";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProducts } from "@/lib/api";
import { toBn, changeStyle, unitBn } from "@/lib/format";

export default async function ProductPage({ params }) {
  const { slug } = await params;

  
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?from=protected");

  
  const data = await getProducts();
  const products = Array.isArray(data) ? data : [];
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  
  const { markets } = product;
  const lowest = markets.reduce((a, b) => (b.min < a.min ? b : a));
  const highest = markets.reduce((a, b) => (b.max > a.max ? b : a));
  
  const average = Math.round(
    markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length
  );

  const unit = unitBn[product.unit];
  const { icon, color } = changeStyle(product.change.dir);
  const diff = Math.abs(product.today - product.yesterday);
  const diffText = {
    up: `গতকালের তুলনায় আজ দাম বেড়েছে · ${toBn(diff)} টাকা`,
    down: `গতকালের তুলনায় আজ দাম কমেছে · ${toBn(diff)} টাকা`,
    flat: "গতকালের তুলনায় আজ দাম অপরিবর্তিত",
  }[product.change.dir];

  const stats = [
    { label: "সর্বনিম্ন দাম", value: lowest.min, note: "সবচেয়ে কম দামের বাজার", color: "text-success" },
    { label: "সর্বাধিক দাম", value: highest.max, note: "সবচেয়ে বেশি দামের বাজার", color: "text-error" },
    { label: "গড় দাম", value: average, note: `প্রতি ${unit}-এর হিসাবে`, color: "text-primary" },
  ];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
      
      <nav className="flex flex-wrap items-center gap-2 text-sm">
        <Link href="/" className="hover:text-primary">হোম</Link>
        <span className="opacity-50">›</span>
        <Link href={`/category/${product.category}`} className="hover:text-primary">
          {product.categoryNameBn}
        </Link>
        <span className="opacity-50">›</span>
        <span className="font-medium">{product.nameBn}</span>
      </nav>

      
      <section className="flex flex-col gap-5 rounded-2xl border border-base-300 bg-base-100 p-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-4xl">
            {product.image}
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold">{product.nameBn}</h1>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span>প্রতি {unit}</span>
              
              <Link
                href={`/category/${product.category}`}
                className="badge badge-outline"
              >
                {product.categoryIcon} {product.categoryNameBn}
              </Link>
            </div>
            <p className="text-sm">{diffText}</p>
          </div>
        </div>

        <div className="rounded-xl bg-base-200 px-6 py-4 text-center">
          <p className="text-sm">আজকের দাম</p>
          <p className="text-4xl font-bold">{toBn(product.today)}</p>
          <p className="text-sm">টাকা / {unit}</p>
          <p className={`mt-1 text-sm font-semibold ${color}`}>
            {icon} {toBn(Math.abs(product.change.pct), 1)}%
          </p>
        </div>
      </section>

      
      <section className="flex flex-col gap-6 rounded-2xl border border-base-300 bg-base-100 p-5">
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">দামের সারসংক্ষেপ</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-base-300 bg-base-100 px-6 py-4"
              >
                <p className="text-xs">{s.label}</p>
                <p className={`${s.color} font-bold`}>
                  <span className="text-2xl">{toBn(s.value)}</span>
                  <span className="text-sm font-medium"> টাকা</span>
                </p>
                <p className="text-xs">{s.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">বাজারভিত্তিক আজকের দাম</h2>
          <div className="overflow-x-auto rounded-xl border border-base-300">
            <table className="table">
              <thead>
                <tr>
                  <th>বাজার</th>
                  <th>বিভাগ</th>
                  <th className="text-right">সর্বনিম্ন</th>
                  <th className="text-right">সর্বাধিক</th>
                  <th className="text-right">গড়</th>
                </tr>
              </thead>
              <tbody>
                {markets.map((m) => (
                  <tr key={m.market}>
                    <td className="font-medium">{m.market}</td>
                    <td>{m.division}</td>
                    <td className="text-right">{toBn(m.min)} টাকা</td>
                    <td className="text-right">{toBn(m.max)} টাকা</td>
                    <td className="text-right font-semibold">
                      {toBn(Math.round((m.min + m.max) / 2))} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}