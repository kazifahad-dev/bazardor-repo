"use client";

import { useSyncExternalStore } from "react";
import { banglaDate } from "@/lib/format";


const subscribe = () => () => {};

export default function TodayDate() {
  const today = useSyncExternalStore(
    subscribe,
    () => banglaDate(new Date()), 
    () => "" 
  );
  return <>{today}</>;
}