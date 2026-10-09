"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateNameForm({ initialName }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const name = new FormData(e.currentTarget).get("name").trim();

    
    if (!name) return toast.error("নাম খালি রাখা যাবে না।");
    if (name === initialName) return toast("নাম আগের মতোই আছে।");

    setLoading(true);
   
    const { error } = await authClient.updateUser({ name });
    setLoading(false);

    if (error) {
      toast.error("তথ্য আপডেট করা যায়নি। আবার চেষ্টা করুন।");
      return;
    }

    toast.success("নাম সফলভাবে আপডেট হয়েছে।");
    router.push("/profile"); 
    router.refresh(); 
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm font-medium">
        নাম
        <input
          name="name"
          type="text"
          defaultValue={initialName}
          placeholder="আপনার নতুন নাম"
          className="input w-full"
          required
        />
      </label>

      <button type="submit" disabled={loading} className="btn btn-primary">
        {loading && <span className="loading loading-spinner loading-sm" />}
        তথ্য আপডেট করুন
      </button>
    </form>
  );
}