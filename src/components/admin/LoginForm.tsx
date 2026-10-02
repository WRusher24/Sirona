"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Eye, EyeOff, Loader2, Lock, ShieldCheck, UserRound } from "lucide-react";
import SiteLogo from "@/components/site/SiteLogo";

export default function LoginForm({
  logo,
  siteName,
}: {
  logo: string;
  siteName: string;
}) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.get("username"),
          password: data.get("password"),
        }),
      });
      const json = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        setError(json?.error ?? "ההתחברות נכשלה");
        setLoading(false);
        return;
      }
      router.refresh();
    } catch {
      setError("אין חיבור לשרת — נסו שוב");
      setLoading(false);
    }
  }

  return (
    <section className="relative flex min-h-[calc(100vh-76px)] items-center justify-center overflow-hidden bg-mist px-4 py-16">
      <div className="bg-grid-light absolute inset-0" aria-hidden />
      <div className="absolute -top-24 -end-24 h-80 w-80 rounded-full bg-brand-200/40 blur-3xl" aria-hidden />
      <div className="absolute -bottom-24 -start-24 h-80 w-80 rounded-full bg-brand-100/70 blur-3xl" aria-hidden />

      <div className="relative w-full max-w-md">
        <div className="rounded-[2rem] border border-brand-100 bg-white/95 p-8 shadow-lift backdrop-blur sm:p-10">
          <div className="flex justify-center">
            <SiteLogo logo={logo} name={siteName} slogan="" compact />
          </div>

          <div className="mt-8 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-extrabold text-brand-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              גישה מאובטחת
            </span>
            <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-brand-950">
              מערכת ניהול האתר
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              התחברו כדי לערוך תוכן, תמונות ולעקוב אחרי פניות.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="text-sm font-bold text-brand-900">
                שם משתמש
              </label>
              <div className="relative">
                <UserRound className="pointer-events-none absolute start-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="username"
                  placeholder="שם המשתמש שלכם"
                  className="input-base ps-11"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-bold text-brand-900">
                סיסמה
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute start-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="הסיסמה שלכם"
                  className="input-base ps-11 pe-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "הסתרת סיסמה" : "הצגת סיסמה"}
                  className="absolute end-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-mist hover:text-brand-600"
                >
                  {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                <AlertTriangle className="h-4.5 w-4.5 shrink-0" />
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-8 py-4 text-base font-extrabold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  מתחברים…
                </>
              ) : (
                <>
                  <Lock className="h-4.5 w-4.5" />
                  התחברות למערכת
                </>
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs leading-6 text-slate-500">
          שכחתם את הסיסמה? הוראות לאיפוס נמצאות בקובץ ADMIN_GUIDE.md
        </p>
      </div>
    </section>
  );
}
