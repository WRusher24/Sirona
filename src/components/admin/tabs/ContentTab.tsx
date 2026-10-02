"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2, RotateCcw, Save, Search, Undo2 } from "lucide-react";
import { PAGE_NAMES, type ContentDef, type PageKey } from "@/lib/content";

const PAGE_ORDER: PageKey[] = ["home", "private", "contact", "global"];

export default function ContentTab({
  defs,
  values,
  onSave,
  onReset,
  showToast,
}: {
  defs: ContentDef[];
  values: Record<string, string>;
  onSave: (updates: Record<string, string>) => Promise<void>;
  onReset: (keys: string[]) => Promise<void>;
  showToast: (message: string, kind?: "success" | "error") => void;
}) {
  const textDefs = useMemo(() => defs.filter((d) => d.type !== "image"), [defs]);
  const [query, setQuery] = useState("");
  const [drafts, setDrafts] = useState<Record<string, string>>(values);
  const [saving, setSaving] = useState(false);
  const [resettingKey, setResettingKey] = useState<string | null>(null);

  useEffect(() => setDrafts(values), [values]);

  const dirtyKeys = textDefs
    .filter((d) => (drafts[d.key] ?? "") !== (values[d.key] ?? ""))
    .map((d) => d.key);

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return textDefs;
    return textDefs.filter(
      (d) => d.label.includes(q) || d.key.includes(q) || d.defaultValue.includes(q)
    );
  }, [textDefs, query]);

  const grouped = useMemo(() => {
    return PAGE_ORDER.map((page) => {
      const pageDefs = filtered.filter((d) => d.page === page);
      const groups: { name: string; items: ContentDef[] }[] = [];
      for (const def of pageDefs) {
        const existing = groups.find((g) => g.name === def.group);
        if (existing) existing.items.push(def);
        else groups.push({ name: def.group, items: [def] });
      }
      return { page, groups };
    }).filter((entry) => entry.groups.length > 0);
  }, [filtered]);

  async function handleSave() {
    if (dirtyKeys.length === 0) {
      showToast("אין שינויים לשמירה");
      return;
    }
    const updates: Record<string, string> = {};
    for (const key of dirtyKeys) updates[key] = drafts[key] ?? "";
    setSaving(true);
    try {
      await onSave(updates);
      showToast("התוכן נשמר ומתעדכן עכשיו באתר");
    } catch {
      showToast("שגיאה בשמירה — נסו שוב", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleReset(def: ContentDef) {
    setResettingKey(def.key);
    try {
      await onReset([def.key]);
      showToast(`״${def.label}״ שוחזר לברירת המחדל`);
    } catch {
      showToast("שגיאה בשחזור", "error");
    } finally {
      setResettingKey(null);
    }
  }

  return (
    <div className="pb-24">
      {/* Toolbar */}
      <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-brand-100 bg-white p-5 shadow-soft sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute start-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="חיפוש שדה לעריכה… (למשל: כותרת ראשית, טלפון, סנו)"
            className="input-base ps-11"
          />
        </div>
        <p className="shrink-0 text-sm font-semibold text-slate-500">
          {textDefs.length} שדות טקסט זמינים לעריכה
        </p>
      </div>

      {grouped.length === 0 && (
        <p className="rounded-3xl border border-dashed border-brand-200 bg-white p-10 text-center text-sm font-semibold text-slate-500">
          לא נמצאו שדות תואמים לחיפוש ״{query}״
        </p>
      )}

      {/* Groups */}
      <div className="space-y-12">
        {grouped.map(({ page, groups }) => (
          <section key={page}>
            <h2 className="flex items-center gap-3 text-xl font-extrabold text-brand-950">
              <span className="h-6 w-1.5 rounded-full bg-brand-500" aria-hidden />
              {PAGE_NAMES[page]}
            </h2>

            <div className="mt-6 space-y-8">
              {groups.map((group) => (
                <div
                  key={group.name}
                  className="overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-soft"
                >
                  <div className="border-b border-brand-50 bg-mist px-6 py-3.5">
                    <h3 className="text-sm font-extrabold text-brand-700">{group.name}</h3>
                  </div>
                  <div className="grid gap-6 p-6 lg:grid-cols-2">
                    {group.items.map((def) => {
                      const value = drafts[def.key] ?? "";
                      const isCustom = value !== def.defaultValue;
                      const isDirty = value !== (values[def.key] ?? "");
                      return (
                        <div
                          key={def.key}
                          className={def.type === "textarea" ? "lg:col-span-2" : ""}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <label
                              htmlFor={`f-${def.key}`}
                              className="text-sm font-bold text-brand-900"
                            >
                              {def.label}
                              {isDirty && (
                                <span className="ms-2 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-extrabold text-amber-700">
                                  לא נשמר
                                </span>
                              )}
                            </label>
                            {isCustom && (
                              <button
                                type="button"
                                onClick={() => handleReset(def)}
                                disabled={resettingKey === def.key}
                                title="שחזור לברירת המחדל"
                                className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold text-slate-400 transition-colors hover:bg-mist hover:text-brand-600"
                              >
                                {resettingKey === def.key ? (
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                  <RotateCcw className="h-3 w-3" />
                                )}
                                שחזור ברירת מחדל
                              </button>
                            )}
                          </div>
                          {def.type === "textarea" ? (
                            <textarea
                              id={`f-${def.key}`}
                              rows={3}
                              value={value}
                              onChange={(e) =>
                                setDrafts((prev) => ({ ...prev, [def.key]: e.target.value }))
                              }
                              className="input-base mt-2 resize-y leading-7"
                            />
                          ) : (
                            <input
                              id={`f-${def.key}`}
                              type="text"
                              value={value}
                              onChange={(e) =>
                                setDrafts((prev) => ({ ...prev, [def.key]: e.target.value }))
                              }
                              className="input-base mt-2"
                            />
                          )}
                          {def.hint && (
                            <p className="mt-1.5 text-xs text-slate-400">{def.hint}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Sticky save bar */}
      {dirtyKeys.length > 0 && (
        <div className="fixed bottom-6 start-1/2 z-40 flex w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 items-center gap-4 rounded-full border border-brand-100 bg-white/95 py-3 pe-3 ps-6 shadow-lift backdrop-blur">
          <p className="flex-1 text-sm font-extrabold text-brand-900">
            {dirtyKeys.length} שינויים ממתינים לשמירה
          </p>
          <button
            type="button"
            onClick={() => setDrafts(values)}
            className="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold text-slate-500 transition-colors hover:bg-mist"
          >
            <Undo2 className="h-4 w-4" />
            ביטול
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 rounded-full bg-brand-600 px-6 py-2.5 text-sm font-extrabold text-white shadow-md shadow-brand-600/25 transition-colors hover:bg-brand-700 disabled:opacity-70"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            שמירת שינויים
          </button>
        </div>
      )}
    </div>
  );
}
