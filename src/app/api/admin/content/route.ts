import {
  CONTENT_DEF_MAP,
  CONTENT_DEFS,
} from "@/lib/content";
import {
  deleteContentKeys,
  getContentMap,
  upsertContents,
} from "@/lib/server/content-store";
import { getAdminUser } from "@/lib/server/auth";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const user = await getAdminUser();
  if (!user) {
    return Response.json({ error: "נדרשת התחברות" }, { status: 401 });
  }
  return user;
}

/** Returns every content definition plus the live (merged) values. */
export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof Response) return auth;
  const values = await getContentMap();
  return Response.json({ defs: CONTENT_DEFS, values });
}

/** Saves admin overrides. Body: { updates: Record<string, string> } */
export async function PUT(request: Request) {
  const auth = await requireAdmin();
  if (auth instanceof Response) return auth;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "בקשה לא תקינה" }, { status: 400 });
  }
  const updates = (body as { updates?: Record<string, unknown> })?.updates;
  if (!updates || typeof updates !== "object") {
    return Response.json({ error: "חסרים נתונים לשמירה" }, { status: 400 });
  }

  const entries: { key: string; value: string }[] = [];
  for (const [key, raw] of Object.entries(updates)) {
    if (!CONTENT_DEF_MAP[key]) continue; // ignore unknown keys
    const value = String(raw ?? "").slice(0, 10000);
    entries.push({ key, value });
  }
  await upsertContents(entries);
  const values = await getContentMap();
  return Response.json({ ok: true, values });
}

/** Resets keys back to factory defaults. Body: { keys: string[] } */
export async function DELETE(request: Request) {
  const auth = await requireAdmin();
  if (auth instanceof Response) return auth;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "בקשה לא תקינה" }, { status: 400 });
  }
  const keys = (body as { keys?: string[] })?.keys ?? [];
  const known = keys.filter((k) => CONTENT_DEF_MAP[k]);
  await deleteContentKeys(known);
  const values = await getContentMap();
  return Response.json({ ok: true, values });
}
