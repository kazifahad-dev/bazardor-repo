"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function AuthNotice() {
  const params = useSearchParams();
  const from = params.get("from"); 

  useEffect(() => {
    if (from === "protected") {
      
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন।", {
        id: "protected-redirect",
      });
    }
  }, [from]);

  return null; 
}