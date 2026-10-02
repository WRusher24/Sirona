"use client";

import { useRef, useState } from "react";
import {
  ImageOff,
  Loader2,
  RotateCcw,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { PAGE_NAMES, type ContentDef } from "@/lib/content";

export default function MediaTab({
  defs,
  values,
  onSave,
  onReset,
  onApply,
  showToast,
}: {
  defs: ContentDef[];
  values: Record<string, string>;
  onSave: (updates: Record<string, string>) => Promise<void>;
  onReset: (keys: string[]) => Promise<void>;
  onApply: (key: string, value: string) => void;
  showToast: (message: string, kind?: "success" | "error") => void;
}) {
  const imageDefs = defs.filter((d) => d.type === "image");
  const logoDef = imageDefs.find((d) => d.key === "site.logo");
  const otherDefs = imageDefs.filter((d) => d.key !== "site.logo");
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

  async function handleUpload(def: ContentDef, file: File) {
    setBusyKey(def.key);
    try {
      const form = new FormData();
      form.append("key", def.key);
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const json = (await res.json().catch(() => null)) as {
        value?: string;
        error?: string;
      } | null;
      if (!res.ok || !json?.value) {
        showToast(json?.error ?? "שגיאה בהעלאה", "error");
        return;
      }
      onApply(def.key, json.value);
      showToast(`״${def.label}״ הוחלף בהצלחה`);
    } catch {
      showToast("שגיאה בהעלאת הקובץ", "error");
    } finally {
      setBusyKey(null);
    }
  }

  async function handleRemove(def: ContentDef) {
    setBusyKey(def.key);
    try {
      await onSave({ [def.key]: "" });
      showToast(`״${def.label}״ הוסר מהאתר`);
    } catch {
      showToast("שגיאה בהסרה", "error");
    } finally {
      setBusyKey(null);
    }
  }

  async function handleReset(def: ContentDef) {
    setBusyKey(def.key);
    try {
      await onReset([def.key]);
      showToast("שוחזרה ברירת המחדל");
    } catch {
      showToast("שגיאה בשחזור", "error");
    } finally {
      setBusyKey(null);
    }
  }

  function renderCard(def: ContentDef, isLogo = false) {
    const value = values[def.key] ?? "";
    const isCustom = value !== def.defaultValue;
    const busy = busyKey === def.key;
    return (
      <article
        key={def.key}
        className={`overflow-hidden rounded-3xl border bg-white shadow-soft ${
          isLogo ? "border-brand-300" : "border-brand-100"
        }`}
      >
        <div
          className={`relative flex items-center justify-center bg-mist bg-dots ${
            isLogo ? "h-44" : "aspect-video"
          }`}
        >
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt={def.label}
              className={`h-full w-full ${isLogo ? "object-contain p-6" : "object-cover"}`}
            />
          ) : (
            <span className="flex flex-col items-center gap-2 text-brand-300">
              <ImageOff className="h-8 w-8" strokeWidth={1.6} />
              <span className="text-xs font-bold">אין תמונה — הבעמוד יוצג אזור ריק אלגנטי</span>
            </span>
          )}
          {busy && (
            <span className="absolute inset-0 flex items-center justify-center bg-white/70">
              <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
            </span>
          )}
        </div>

        <div className="p-5">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-extrabold text-brand-950">{def.label}</h3>
            <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-bold text-brand-700">
              {PAGE_NAMES[def.page]}
            </span>
            <span
              className={`ms-auto rounded-full px-2.5 py-0.5 text-[11px] font-extrabold ${
                !value
                  ? "bg-slate-100 text-slate-500"
                  : isCustom
                    ? "bg-amber-50 text-amber-600"
                    : "bg-emerald-50 text-emerald-600"
              }`}
            >
              {!value ? "הוסר" : isCustom ? "הועלה מחשב" : "ברירת מחדל"}
            </span>
          </div>
          {def.hint && <p className="mt-1.5 text-xs leading-5 text-slate-400">{def.hint}</p>}

          <div className="mt-4 flex flex-wrap gap-2">
            <input
              ref={(el) => {
                fileInputs.current[def.key] = el;
              }}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleUpload(def, file);
                e.target.value = "";
              }}
            />
            <button
              type="button"
              onClick={() => fileInputs.current[def.key]?.click()}
              disabled={busy}
              className="flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-xs font-extrabold text-white shadow-sm transition-colors hover:bg-brand-700 disabled:opacity-60"
            >
              <UploadCloud className="h-4 w-4" />
              {value ? "החלפה מהמחשב" : "העלאה מהמחשב"}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => handleRemove(def)}
                disabled={busy}
                className="flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-60"
              >
                <Trash2 className="h-3.5 w-3.5" />
                הסרה
              </button>
            )}
            {isCustom && (
              <button
                type="button"
                onClick={() => handleReset(def)}
                disabled={busy}
                className="flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-500 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600 disabled:opacity-60"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                שחזור ברירת מחדל
              </button>
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <div>
      <div className="mb-8 rounded-3xl border border-brand-100 bg-white p-6 shadow-soft">
        <h2 className="text-lg font-extrabold text-brand-950">ניהול תמונות ולוגו</h2>
        <p className="mt-1.5 text-sm leading-7 text-slate-500">
          לחצו על ״החלפה מהמחשב״ ובחרו קובץ (JPG / PNG / WebP / GIF עד 6MB). התמונה מתעדכנת באתר
          מיד לאחר ההעלאה. ״הסרה״ מורידה את התמונה מהאתר; ״שחזור ברירת מחדל״ מחזיר את התמונה
          המקורית.
        </p>
      </div>

      {logoDef && (
        <div className="mb-8">
          <h3 className="mb-4 flex items-center gap-2.5 text-base font-extrabold text-brand-900">
            <span className="h-5 w-1.5 rounded-full bg-brand-500" aria-hidden />
            לוגו החברה
          </h3>
          <div className="max-w-md">{renderCard(logoDef, true)}</div>
        </div>
      )}

      <h3 className="mb-4 flex items-center gap-2.5 text-base font-extrabold text-brand-900">
        <span className="h-5 w-1.5 rounded-full bg-brand-500" aria-hidden />
        תמונות האתר
      </h3>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{otherDefs.map((d) => renderCard(d))}</div>
    </div>
  );
}
