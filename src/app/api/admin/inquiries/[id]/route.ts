import { eq } from "drizzle-orm";
import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { getAdminUser } from "@/lib/server/auth";

export const dynamic = "force-dynamic";

const STATUSES = new Set(["new", "read", "handled"]);

function parseId(raw: string): number | null {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

/** Updates an inquiry status. Body: { status: "new" | "read" | "handled" } */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAdminUser();
  if (!user) {
    return Response.json({ error: "נדרשת התחברות" }, { status: 401 });
  }
  const id = parseId((await params).id);
  if (!id) return Response.json({ error: "מזהה לא תקין" }, { status: 400 });

  const body = (await request.json().catch(() => null)) as {
    status?: string;
  } | null;
  if (!body?.status || !STATUSES.has(body.status)) {
    return Response.json({ error: "סטטוס לא תקין" }, { status: 400 });
  }
  await db
    .update(inquiries)
    .set({ status: body.status })
    .where(eq(inquiries.id, id));
  return Response.json({ ok: true });
}

/** Deletes an inquiry permanently. */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAdminUser();
  if (!user) {
    return Response.json({ error: "נדרשת התחברות" }, { status: 401 });
  }
  const id = parseId((await params).id);
  if (!id) return Response.json({ error: "מזהה לא תקין" }, { status: 400 });
  await db.delete(inquiries).where(eq(inquiries.id, id));
  return Response.json({ ok: true });
}
