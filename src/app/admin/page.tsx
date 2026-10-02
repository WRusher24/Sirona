import type { Metadata } from "next";
import { getAdminUser } from "@/lib/server/auth";
import { getContentMap } from "@/lib/server/content-store";
import LoginForm from "@/components/admin/LoginForm";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "מערכת ניהול",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await getAdminUser();
  const c = await getContentMap();

  if (!user) {
    return <LoginForm logo={c["site.logo"]} siteName={c["site.name"]} />;
  }
  return <AdminShell username={user} logo={c["site.logo"]} siteName={c["site.name"]} />;
}
