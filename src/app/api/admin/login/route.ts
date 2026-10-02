import { attemptLogin } from "@/lib/server/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "בקשה לא תקינה" }, { status: 400 });
  }
  const { username, password } = (body ?? {}) as Record<string, string>;
  if (!username || !password) {
    return Response.json(
      { error: "נא למלא שם משתמש וסיסמה" },
      { status: 400 }
    );
  }

  const ok = await attemptLogin(username.trim(), password);
  if (!ok) {
    return Response.json(
      { error: "שם משתמש או סיסמה שגויים" },
      { status: 401 }
    );
  }
  return Response.json({ ok: true });
}
