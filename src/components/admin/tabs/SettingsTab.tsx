"use client";

import { useState, type FormEvent } from "react";
import {
  AlertTriangle,
  BookOpen,
  KeyRound,
  Loader2,
  Lock,
  Save,
  ServerCog,
} from "lucide-react";

export default function SettingsTab({
  showToast,
}: {
  showToast: (message: string, kind?: "success" | "error") => void;
}) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const current = String(data.get("current") ?? "");
    const next = String(data.get("next") ?? "");
    const confirm = String(data.get("confirm") ?? "");

    setError("");
    if (next !== confirm) {
      setError("אימות הסיסמה אינו תואם את הסיסמה החדשה");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current, next }),
      });
      const json = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        setError(json?.error ?? "שגיאה בשינוי הסיסמה");
        return;
      }
      form.reset();
      showToast("הסיסמה שונתה בהצלחה");
    } catch {
      setError("אין חיבור לשרת — נסו שוב");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Change password */}
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-brand-100 bg-white p-7 shadow-soft"
      >
        <h2 className="flex items-center gap-2.5 text-lg font-extrabold text-brand-950">
          <KeyRound className="h-5 w-5 text-brand-500" />
          שינוי סיסמת מנהל
        </h2>
        <p className="mt-1.5 text-sm text-slate-500">
          מומלץ סיסמה של 8 תווים לפחות, עם אותיות ומספרים.
        </p>

        <div className="mt-6 space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="current" className="text-sm font-bold text-brand-900">
              סיסמה נוכחית
            </label>
            <input
              id="current"
              name="current"
              type="password"
              required
              autoComplete="current-password"
              className="input-base"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="next" className="text-sm font-bold text-brand-900">
              סיסמה חדשה
            </label>
            <input
              id="next"
              name="next"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="input-base"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="confirm" className="text-sm font-bold text-brand-900">
              אימות סיסמה חדשה
            </label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="input-base"
            />
          </div>
        </div>

        {error && (
          <p className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            <AlertTriangle className="h-4.5 w-4.5 shrink-0" />
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="mt-6 flex items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3 text-sm font-extrabold text-white shadow-md shadow-brand-600/25 transition-colors hover:bg-brand-700 disabled:opacity-70"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          שמירת סיסמה חדשה
        </button>
      </form>

      <div className="space-y-6">
        {/* Technical info */}
        <div className="rounded-3xl border border-brand-100 bg-white p-7 shadow-soft">
          <h2 className="flex items-center gap-2.5 text-lg font-extrabold text-brand-950">
            <ServerCog className="h-5 w-5 text-brand-500" />
            נתוני מערכת
          </h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
            <li className="flex items-start gap-2">
              <Lock className="mt-1 h-4 w-4 shrink-0 text-brand-400" />
              ההתחברות מאובטחת בעוגייה מוצפנת (httpOnly) בתוקף 7 ימים.
            </li>
            <li className="flex items-start gap-2">
              <Lock className="mt-1 h-4 w-4 shrink-0 text-brand-400" />
              פרטי ההתחברות הראשוניים מוגדרים בקובץ .env (משתני ADMIN_USERNAME / ADMIN_PASSWORD).
            </li>
            <li className="flex items-start gap-2">
              <Lock className="mt-1 h-4 w-4 shrink-0 text-brand-400" />
              אחרי ההתחברות הראשונה מומלץ להחליף סיסמה כאן בלשונית ההגדרות.
            </li>
          </ul>
        </div>

        {/* Guides */}
        <div className="rounded-3xl border border-brand-100 bg-brand-50 p-7">
          <h2 className="flex items-center gap-2.5 text-lg font-extrabold text-brand-950">
            <BookOpen className="h-5 w-5 text-brand-600" />
            מדריכים מצורפים
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm leading-7 text-brand-900">
            <li className="rounded-2xl bg-white p-4 shadow-sm">
              <strong>ADMIN_GUIDE.md</strong> — מדריך צעד־אחר־צעד למנהל: עריכת תוכן, החלפת תמונות
              ולוגו וניהול פניות.
            </li>
            <li className="rounded-2xl bg-white p-4 shadow-sm">
              <strong>DEPLOYS_GUIDE.md</strong> — מדריך הטמעה טכני: הרצה מקומית, פריסה לייצור
              וחיבור דומיין.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
