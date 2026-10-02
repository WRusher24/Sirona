import { desc } from "drizzle-orm";
import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { getAdminUser } from "@/lib/server/auth";

export const dynamic = "force-dynamic";

/** Lists all inquiries, newest first. */
export async function GET() {
  const user = await getAdminUser();
  if (!user) {
    return Response.json({ error: "נדרשת התחברות" }, { status: 401 });
  }
  const rows = await db
    .select()
    .from(inquiries)
    .orderBy(desc(inquiries.createdAt))
    .limit(1000);
  return Response.json({ inquiries: rows });
}
