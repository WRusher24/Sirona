"use client";

import {
  BadgeCheck,
  FileText,
  Image as ImageIcon,
  Inbox,
  Lightbulb,
  MailOpen,
} from "lucide-react";
import type { Inquiry } from "../AdminShell";
import { INQUIRY_STATUS_LABELS } from "@/lib/content";

export default function OverviewTab({
  inquiries,
  logo,
  onNavigate,
}: {
  inquiries: Inquiry[];
  logo: string;
  onNavigate: (tab: "content" | "media" | "inquiries") => void;
}) {
  const fresh = inquiries.filter((q) => q.status === "new").length;
  const handled = inquiries.filter((q) => q.status === "handled").length;

  const stats = [
    { label: "פניות חדשות", value: fresh, icon: Inbox, accent: "bg-brand-600" },
    { label: "סה״כ פניות", value: inquiries.length, icon: MailOpen, accent: "bg-brand-500" },
    { label: "פניות שטופלו", value: handled, icon: BadgeCheck, accent: "bg-brand-400" },
  ];

  const quick = [
    {
      title: "עריכת תוכן האתר",
      text: "שנו כל כותרת, פסקה או כפתור באתר — בלי לגעת בקוד.",
      tab: "content" as const,
      icon: FileText,
    },
    {
      title: "תמונות ולוגו",
      text: "החליפו את הלוגו והתמונות בכל העמודים ישירות מהמחשב.",
      tab: "media" as const,
      icon: ImageIcon,
    },
    {
      title: "ניהול פניות",
      text: "צפו בפניות שהתקבלו מטופס צור הקשר ועקבו אחרי הטיפול.",
      tab: "inquiries" as const,
      icon: Inbox,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome + logo */}
      <div className="flex items-center gap-5 rounded-3xl border border-brand-100 bg-white p-7 shadow-soft">
        {logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt="לוגו" className="h-16 w-auto rounded-2xl object-contain" />
        )}
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-brand-950">
            שלום! ברוכים הבאים למערכת הניהול
          </h2>
          <p className="mt-1 text-sm leading-7 text-slate-500">
            כאן שולטים בכל מה שהמבקרים רואים באתר — תוכן, תמונות, לוגו ופניות.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-4 rounded-3xl border border-brand-100 bg-white p-6 shadow-soft"
          >
            <span className={`flex h-13 w-13 items-center justify-center rounded-2xl text-white ${stat.accent}`}>
              <stat.icon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-3xl font-extrabold text-brand-950">{stat.value}</p>
              <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid gap-5 md:grid-cols-3">
        {quick.map((card) => (
          <button
            key={card.title}
            type="button"
            onClick={() => onNavigate(card.tab)}
            className="group rounded-3xl border border-brand-100 bg-white p-7 text-start shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
              <card.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-4 text-lg font-extrabold text-brand-950">{card.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">{card.text}</p>
          </button>
        ))}
      </div>

      {/* Recent inquiries */}
      <div className="rounded-3xl border border-brand-100 bg-white p-7 shadow-soft">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-brand-950">פניות אחרונות</h3>
          <button
            type="button"
            onClick={() => onNavigate("inquiries")}
            className="text-sm font-bold text-brand-600 hover:text-brand-700"
          >
            לכל הפניות ←
          </button>
        </div>
        {inquiries.length === 0 ? (
          <p className="mt-4 rounded-2xl bg-mist p-5 text-sm text-slate-500">
            עדיין לא התקבלו פניות. כל פנייה מהטופס בעמוד ״צור קשר״ תופיע כאן.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-brand-50">
            {inquiries.slice(0, 5).map((q) => (
              <li key={q.id} className="flex flex-wrap items-center gap-3 py-3.5">
                <span className="font-bold text-brand-950">{q.fullName}</span>
                <span className="text-sm text-slate-500">{q.company}</span>
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
                  {q.subject}
                </span>
                <span
                  className={`ms-auto rounded-full px-3 py-1 text-xs font-extrabold ${
                    q.status === "new"
                      ? "bg-red-50 text-red-600"
                      : q.status === "read"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-emerald-50 text-emerald-600"
                  }`}
                >
                  {INQUIRY_STATUS_LABELS[q.status]}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Tip */}
      <div className="flex items-start gap-4 rounded-3xl border border-brand-100 bg-brand-50 p-6">
        <Lightbulb className="h-6 w-6 shrink-0 text-brand-500" />
        <p className="text-sm leading-7 text-brand-900">
          <strong>טיפ:</strong> כל שינוי שתשמרו כאן מתעדכן באתר באופן מיידי — אין צורך לפרסם מחדש
          או לפנות למתכנת. מדריך מלא למנהל נמצא בקובץ ADMIN_GUIDE.md ששויך לפרויקט.
        </p>
      </div>
    </div>
  );
}
