"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import AuthShell from "@/components/AuthShell";
import SocialButtons from "@/components/SocialButtons";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault(); 
    const form = new FormData(e.currentTarget);
    const name = form.get("name").trim();
    const email = form.get("email").trim();
    const password = form.get("password");
    const confirm = form.get("confirm");

    
    if (!name) return toast.error("আপনার নাম লিখুন।");
    if (password.length < 8)
      return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
    if (password !== confirm)
      return toast.error("দুটি পাসওয়ার্ড মিলছে না।");

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      
      const exists = String(error.code ?? "").includes("USER_ALREADY_EXISTS");
      toast.error(
        exists
          ? "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে।"
          : error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।"
      );
      return;
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এবার সাইন ইন করুন।");
    router.push("/signin"); 
  }

  return (
    <AuthShell
      title="অ্যাকাউন্ট তৈরি করুন"
      subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm font-medium">
          নাম
          <input
            name="name"
            type="text"
            placeholder="যেমন: রহিম উদ্দিন"
            className="input w-full"
            required
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          ইমেইল
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            className="input w-full"
            required
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          পাসওয়ার্ড
          <input
            name="password"
            type="password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="input w-full"
            required
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          পাসওয়ার্ড নিশ্চিত করুন
          <input
            name="confirm"
            type="password"
            placeholder="আবার লিখুন"
            className="input w-full"
            required
          />
        </label>

        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading && <span className="loading loading-spinner loading-sm" />}
          অ্যাকাউন্ট তৈরি করুন
        </button>

        <div className="flex items-center gap-4 text-xs">
          <span className="h-px flex-1 bg-base-300" />
          অথবা
          <span className="h-px flex-1 bg-base-300" />
        </div>

        <SocialButtons />

        <p className="text-center text-sm">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="text-primary hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}