"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { categories } from "@/lib/categories";
import { banglaDate } from "@/lib/format";
import Avatar from "./Avatar";


const subscribe = () => () => {};

export default function Header() {
  const pathname = usePathname(); 
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  
  const today = useSyncExternalStore(
    subscribe,
    () => banglaDate(new Date()),
    () => ""
  );

  async function handleSignOut() {
    setMenuOpen(false);
    const { error } = await authClient.signOut();
    if (error) {
      toast.error("সাইন আউট করা যায়নি।");
      return;
    }
    toast.success("সফলভাবে সাইন আউট হয়েছে।");
    router.push("/");
    router.refresh();
  }

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

        {isPending ? (
          
          <div className="skeleton h-10 w-28 rounded-lg" />
        ) : user ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="btn btn-ghost gap-2 px-2"
            >
              <Avatar user={user} />
              <span className="hidden text-sm font-medium sm:inline">
                {user.name?.split(" ")[0]}
              </span>
              <span className="text-xs opacity-60">▾</span>
            </button>

            {menuOpen && (
              <>
                
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute right-0 top-full z-20 mt-2 w-64 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-xl">
                  <div className="px-3 py-2">
                    <p className="truncate text-sm font-semibold">{user.name}</p>
                    <p className="truncate text-xs opacity-70">{user.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex h-9 items-center rounded-lg px-3 text-sm hover:bg-base-200"
                  >
                    👤 আমার প্রোফাইল
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex h-9 w-full items-center rounded-lg px-3 text-sm text-error hover:bg-base-200"
                  >
                    ↩ সাইন আউট
                  </button>
                </div>
              </>
            )}
          </div>
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

      {/* নিচের সারি: ক্যাটাগরি লিংক */}
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