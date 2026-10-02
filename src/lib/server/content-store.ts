import { cache } from "react";
import { inArray } from "drizzle-orm";
import { db } from "@/db";
import { siteContent } from "@/db/schema";
import { CONTENT_DEFAULTS } from "@/lib/content";

/**
 * Returns the full content map: factory defaults merged with any admin
 * overrides stored in the database. An explicitly empty value means the
 * admin removed the item (falls back to nothing, not to the default).
 *
 * Wrapped with React `cache` so all components in a single request share
 * one database read. If the DB is unreachable we degrade gracefully to
 * the built-in defaults so the public site stays online.
 */
export const getContentMap = cache(async (): Promise<Record<string, string>> => {
  const map: Record<string, string> = { ...CONTENT_DEFAULTS };
  try {
    const rows = await db.select().from(siteContent);
    for (const row of rows) map[row.key] = row.value;
  } catch (error) {
    console.error("[content] falling back to defaults:", error);
  }
  return map;
});

/** Upserts admin overrides for the given keys. */
export async function upsertContents(
  entries: { key: string; value: string }[]
): Promise<void> {
  for (const entry of entries) {
    await db
      .insert(siteContent)
      .values({ key: entry.key, value: entry.value, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: siteContent.key,
        set: { value: entry.value, updatedAt: new Date() },
      });
  }
}

/** Removes overrides so keys fall back to their factory defaults. */
export async function deleteContentKeys(keys: string[]): Promise<void> {
  if (keys.length === 0) return;
  await db.delete(siteContent).where(inArray(siteContent.key, keys));
}
