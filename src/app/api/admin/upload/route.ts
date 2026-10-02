import { put } from "@vercel/blob";
import { CONTENT_DEF_MAP } from "@/lib/content";
import { getAdminUser } from "@/lib/server/auth";
import { upsertContents } from "@/lib/server/content-store";

export const dynamic = "force-dynamic";

const MAX_BYTES = 6 * 1024 * 1024; // 6 MB
const MIME_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

/**
 * Receives a multipart form with `key` (an image-type content slot) and
 * `file`, uploads it to Vercel Blob storage and points the slot at it.
 */
export async function POST(request: Request) {
  const user = await getAdminUser();
  if (!user) {
    return Response.json({ error: "נדרשת התחברות" }, { status: 401 });
  }

  const form = await request.formData();
  const key = String(form.get("key") ?? "");
  const file = form.get("file");

  const def = CONTENT_DEF_MAP[key];
  if (!def || def.type !== "image") {
    return Response.json({ error: "מזהה תמונה לא תקין" }, { status: 400 });
  }
  if (!(file instanceof File)) {
    return Response.json({ error: "לא נבחר קובץ" }, { status: 400 });
  }
  const ext = MIME_EXT[file.type];
  if (!ext) {
    return Response.json(
      { error: "סוג קובץ לא נתמך — נא להעלות JPG, PNG, WebP או GIF" },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return Response.json(
      { error: "הקובץ גדול מדי — ניתן להעלות עד 6MB" },
      { status: 400 }
    );
  }

  const safeKey = key.replace(/[^a-z0-9]/gi, "-");
  const fileName = `${safeKey}-${Date.now()}.${ext}`;

  try {
    // Upload directly to Vercel Blob storage in the cloud
    const blob = await put(fileName, file, {
      access: "public",
    });

    const value = blob.url;
    await upsertContents([{ key, value }]);
    return Response.json({ ok: true, key, value });
  } catch (error) {
    console.error("Blob upload error:", error);
    return Response.json(
      { error: "שגיאה בהעלאת הקובץ לענן. בדוק הגדרות Vercel Blob." },
      { status: 500 }
    );
  }
}