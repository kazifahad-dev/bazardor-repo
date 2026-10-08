"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/categories";
import { banglaDate } from "@/lib/format";

export default function Header() {
  const pathname = usePathname(); 

  
  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(banglaDate(new Date()));
  }, []);

 
  const user = null;

  return (
    <header className="border-b border-base-300 bg-base-100">
      
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-lg text-primary-content">
            🛒
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-xl font-bold tracking-tight">বাজার দর</span>
            <span className="min-h-4 text-xs">{today}</span>
          </span>
        </Link>

        {user ? (
          <Link href="/profile" className="btn btn-ghost">
            {user.name}
          </Link>
        ) : (
          <div className="flex gap-2">
            <Link href="/signin" className="btn btn-outline btn-sm sm:btn-md">
              সাইন ইন
            </Link>
            <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">
              সাইন আপ
            </Link>
          </div>
        )}
      </div>

      
      <nav className="border-t border-base-200">
        <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 text-xs font-semibold">
          {categories.map((cat) => {
            const href = `/category/${cat.slug}`;
            const active = pathname === href;
            return (
              <li key={cat.slug} className="shrink-0">
                <Link
                  href={href}
                  className={`flex h-8 items-center gap-1.5 rounded-lg px-3 transition ${
                    active
                      ? "bg-primary text-primary-content"
                      : "hover:bg-base-200"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}