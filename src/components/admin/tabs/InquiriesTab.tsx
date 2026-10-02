"use client";

import { useState } from "react";
import {
  BadgeCheck,
  Building2,
  Inbox,
  Loader2,
  MailOpen,
  RotateCcw,
  Trash2,
} from "lucide-react";
import type { Inquiry } from "../AdminShell";
import { INQUIRY_STATUS_LABELS, type InquiryStatus } from "@/lib/content";

type Filter = "all" | InquiryStatus;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "הכל" },
  { key: "new", label: "חדש" },
  { key: "read", label: "נקרא" },
  { key: "handled", label: "טופל" },
];

const STATUS_STYLE: Record<InquiryStatus, string> = {
  new: "bg-red-50 text-red-600 border-red-100",
  read: "bg-amber-50 text-amber-600 border-amber-100",
  handled: "bg-emerald-50 text-emerald-600 border-emerald-100",
};

export default function InquiriesTab({
  inquiries,
  onPatch,
  onDelete,
  showToast,
}: {
  inquiries: Inquiry[];
  onPatch: (id: number, status: InquiryStatus) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  showToast: (message: string, kind?: "success" | "error") => void;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [busyId, setBusyId] = useState<number | null>(null);

  const visible = inquiries.filter((q) => filter === "all" || q.status === filter);

  async function handlePatch(inquiry: Inquiry, status: InquiryStatus) {
    setBusyId(inquiry.id);
    try {
      await onPatch(inquiry.id, status);
      showToast(`הפנייה סומנה כ״${INQUIRY_STATUS_LABELS[status]}״`);
    } catch {
      showToast("שגיאה בעדכון הסטטוס", "error");
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(inquiry: Inquiry) {
    const ok = window.confirm(
      `למחוק לצמיתות את הפנייה של ${inquiry.fullName} (${inquiry.company})?`
    );
    if (!ok) return;
    setBusyId(inquiry.id);
    try {
      await onDelete(inquiry.id);
      showToast("הפנייה נמחקה");
    } catch {
      showToast("שגיאה במחיקה", "error");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => {
          const count =
            f.key === "all"
              ? inquiries.length
              : inquiries.filter((q) => q.status === f.key).length;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold shadow-sm transition-colors ${
                filter === f.key
                  ? "bg-brand-600 text-white"
                  : "bg-white text-slate-600 hover:bg-brand-50"
              }`}
            >
              {f.label} ({count})
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-brand-200 bg-white p-14 text-center">
          <Inbox className="h-10 w-10 text-brand-200" />
          <p className="text-sm font-bold text-slate-500">
            {inquiries.length === 0
              ? "עדיין לא התקבלו פניות מהאתר."
              : "אין פניות בסטטוס שנבחר."}
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {visible.map((q) => {
            const busy = busyId === q.id;
            const date = new Date(q.createdAt).toLocaleString("he-IL", {
              dateStyle: "short",
              timeStyle: "short",
            });
            return (
              <li
                key={q.id}
                className="rounded-3xl border border-brand-100 bg-white p-6 shadow-soft"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-base font-extrabold text-brand-950">{q.fullName}</span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-500">
                    <Building2 className="h-4 w-4 text-brand-300" />
                    {q.company}
                  </span>
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-extrabold text-brand-700">
                    {q.subject}
                  </span>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-extrabold ${STATUS_STYLE[q.status]}`}
                  >
                    {INQUIRY_STATUS_LABELS[q.status]}
                  </span>
                  <span className="ms-auto text-xs font-medium text-slate-400" dir="ltr">
                    {date}
                  </span>
                </div>

                <p className="mt-4 rounded-2xl bg-mist p-4 text-sm leading-7 text-slate-700">
                  {q.message}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {busy && <Loader2 className="h-4 w-4 animate-spin text-brand-500" />}
                  {q.status !== "read" && (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => handlePatch(q, "read")}
                      className="flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition-colors hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700 disabled:opacity-60"
                    >
                      <MailOpen className="h-3.5 w-3.5" />
                      סימון כנקרא
                    </button>
                  )}
                  {q.status !== "handled" && (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => handlePatch(q, "handled")}
                      className="flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-60"
                    >
                      <BadgeCheck className="h-3.5 w-3.5" />
                      סימון כטופל
                    </button>
                  )}
                  {q.status !== "new" && (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => handlePatch(q, "new")}
                      className="flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-60"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      החזרה לחדש
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => handleDelete(q)}
                    className="ms-auto flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-60"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    מחיקה
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
