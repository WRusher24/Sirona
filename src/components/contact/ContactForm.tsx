"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send, AlertTriangle } from "lucide-react";
import { INQUIRY_SUBJECTS } from "@/lib/content";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm({ title }: { title: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.get("fullName"),
          company: data.get("company"),
          subject: data.get("subject"),
          message: data.get("message"),
        }),
      });
      const json = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        setError(json?.error ?? "אירעה שגיאה, נסו שוב");
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setError("אין חיבור לשרת — נסו שוב בעוד רגע");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-[2rem] border border-brand-100 bg-white p-10 text-center shadow-soft">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-50">
          <CheckCircle2 className="h-10 w-10 text-brand-600" strokeWidth={1.8} />
        </span>
        <h3 className="mt-6 text-2xl font-extrabold text-brand-950">הפנייה נשלחה בהצלחה!</h3>
        <p className="mt-3 max-w-sm leading-8 text-slate-600">
          תודה שפניתם אלינו. צוות המכירות של סירונה יחזור אליכם בהקדם האפשרי.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 rounded-full border border-brand-200 bg-brand-50 px-6 py-3 text-sm font-bold text-brand-700 transition-colors hover:bg-brand-100"
        >
          שליחת פנייה נוספת
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-brand-100 bg-white p-7 shadow-soft sm:p-10"
    >
      <h2 className="text-2xl font-extrabold tracking-tight text-brand-950">{title}</h2>
      <p className="mt-2 text-sm text-slate-500">
        כל השדות נשמרים במערכת ומגיעים ישירות לצוות שלנו.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-sm font-bold text-brand-900">
            שם מלא <span className="text-brand-500">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            minLength={2}
            placeholder="לדוגמה: ישראל ישראלי"
            className="input-base"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="company" className="text-sm font-bold text-brand-900">
            שם העסק / חברה <span className="text-brand-500">*</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            minLength={2}
            placeholder="לדוגמה: רשת שיווק בע״מ"
            className="input-base"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="subject" className="text-sm font-bold text-brand-900">
          נושא הפנייה <span className="text-brand-500">*</span>
        </label>
        <select id="subject" name="subject" required defaultValue="" className="input-base">
          <option value="" disabled>
            בחרו את אופי הפנייה…
          </option>
          {INQUIRY_SUBJECTS.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-bold text-brand-900">
          תוכן ההודעה <span className="text-brand-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={5}
          rows={5}
          placeholder="ספרו לנו בקצרה על הצורך שלכם — סוג מוצרים, כמויות, לוחות זמן…"
          className="input-base resize-y"
        />
      </div>

      {status === "error" && (
        <p className="mt-5 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          <AlertTriangle className="h-4.5 w-4.5 shrink-0" />
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-8 flex w-full items-center justify-center gap-2.5 rounded-full bg-brand-600 px-8 py-4 text-base font-extrabold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            שולחים…
          </>
        ) : (
          <>
            <Send className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-0.5" />
            שלח פנייה
          </>
        )}
      </button>
    </form>
  );
}
