import { changeAdminPassword, getAdminUser } from "@/lib/server/auth";

export const dynamic = "force-dynamic";

/** Changes the current admin's password. Body: { current, next } */
export async function POST(request: Request) {
  const user = await getAdminUser();
  if (!user) {
    return Response.json({ error: "נדרשת התחברות" }, { status: 401 });
  }
  const body = (await request.json().catch(() => null)) as {
    current?: string;
    next?: string;
  } | null;
  const current = body?.current ?? "";
  const next = body?.next ?? "";
  if (next.length < 8 || next.length > 100) {
    return Response.json(
      { error: "הסיסמה החדשה חייבת להיות באורך 8 תווים לפחות" },
      { status: 400 }
    );
  }
  const result = await changeAdminPassword(user, current, next);
  if (result === "wrong-password") {
    return Response.json({ error: "הסיסמה הנוכחית שגויה" }, { status: 400 });
  }
  if (result === "not-found") {
    return Response.json({ error: "משתמש לא נמצא" }, { status: 404 });
  }
  return Response.json({ ok: true });
}
