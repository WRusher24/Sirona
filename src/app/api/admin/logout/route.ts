import { logoutAdmin } from "@/lib/server/auth";

export const dynamic = "force-dynamic";

export async function POST() {
  await logoutAdmin();
  return Response.json({ ok: true });
}
