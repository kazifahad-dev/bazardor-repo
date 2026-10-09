import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AuthShell from "@/components/AuthShell";
import UpdateNameForm from "@/components/UpdateNameForm";

export const metadata = {
  title: "তথ্য আপডেট",
};

export default async function UpdateProfilePage() {
  
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?from=protected");

  return (
    <AuthShell
      title="তথ্য আপডেট করুন"
      subtitle="আপনার নাম বদলাতে নিচের ফর্মটি ব্যবহার করুন।"
      backHref="/profile"
      backLabel="← প্রোফাইলে ফিরে যান"
    >
      <UpdateNameForm initialName={session.user.name} />
    </AuthShell>
  );
}
