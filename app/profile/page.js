import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Avatar from "@/components/Avatar";
import SignOutButton from "@/components/SignOutButton";

export const metadata = {
  title: "আমার প্রোফাইল",
};

export default async function ProfilePage() {
 
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?from=protected");

  const { user } = session;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

     
      <section className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar user={user} className="size-20 rounded-2xl text-3xl" />
          <div className="min-w-0">
            <p className="truncate text-xl font-bold">{user.name}</p>
            <p className="truncate text-sm">{user.email}</p>
          </div>
        </div>
        <SignOutButton />
      </section>

      
      <section className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-6">
        <h2 className="text-lg font-semibold">তথ্য</h2>

        <dl className="flex flex-col gap-3 text-sm">
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
            <dt className="w-24 shrink-0 opacity-70">নাম</dt>
            <dd className="font-medium">{user.name}</dd>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
            <dt className="w-24 shrink-0 opacity-70">ইমেইল</dt>
            <dd className="font-medium">{user.email}</dd>
          </div>
        </dl>

        
        <Link href="/profile/update" className="btn btn-primary">
          আপডেট
        </Link>
      </section>
    </div>
  );
}