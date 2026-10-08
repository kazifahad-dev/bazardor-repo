"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import AuthShell from "@/components/AuthShell";
import SocialButtons from "@/components/SocialButtons";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email").trim();
    const password = form.get("password");

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error("ইমেইল বা পাসওয়ার্ড সঠিক নয়।");
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে।");
    router.push("/"); 
    router.refresh(); 
  }

  return (
    <AuthShell
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে প্রবেশ করুন।"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            placeholder="আপনার পাসওয়ার্ড"
            className="input w-full"
            required
          />
        </label>

        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading && <span className="loading loading-spinner loading-sm" />}
          সাইন ইন
        </button>

        <div className="flex items-center gap-4 text-xs">
          <span className="h-px flex-1 bg-base-300" />
          অথবা
          <span className="h-px flex-1 bg-base-300" />
        </div>

        <SocialButtons />

        <p className="text-center text-sm">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
