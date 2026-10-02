"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  Inbox,
  LayoutDashboard,
  Loader2,
  LogOut,
  Settings,
} from "lucide-react";
import type { ContentDef, InquiryStatus } from "@/lib/content";
import OverviewTab from "./tabs/OverviewTab";
import ContentTab from "./tabs/ContentTab";
import MediaTab from "./tabs/MediaTab";
import InquiriesTab from "./tabs/InquiriesTab";
import SettingsTab from "./tabs/SettingsTab";

export interface Inquiry {
  id: number;
  fullName: string;
  company: string;
  subject: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
}

type TabKey = "overview" | "content" | "media" | "inquiries" | "settings";

const TABS: { key: TabKey; label: string; icon: typeof Inbox }[] = [
  { key: "overview", label: "סקירה כללית", icon: LayoutDashboard },
  { key: "content", label: "עריכת תוכן", icon: FileText },
  { key: "media", label: "תמונות ולוגו", icon: ImageIcon },
  { key: "inquiries", label: "פניות", icon: Inbox },
  { key: "settings", label: "הגדרות", icon: Settings },
];

interface Toast {
  message: string;
  kind: "success" | "error";
}

export default function AdminShell({
  username,
  logo,
  siteName,
}: {
  username: string;
  logo: string;
  siteName: string;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<TabKey>("overview");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<Toast | null>(null);

  const [defs, setDefs] = useState<ContentDef[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  const showToast = useCallback((message: string, kind: Toast["kind"] = "success") => {
    setToast({ message, kind });
    window.setTimeout(() => setToast(null), 3200);
  }, []);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [contentRes, inquiriesRes] = await Promise.all([
        fetch("/api/admin/content", { cache: "no-store" }),
        fetch("/api/admin/inquiries", { cache: "no-store" }),
      ]);
      if (contentRes.status === 401 || inquiriesRes.status === 401) {
        router.refresh();
        return;
      }
      const contentJson = (await contentRes.json()) as {
        defs: ContentDef[];
        values: Record<string, string>;
      };
      const inquiriesJson = (await inquiriesRes.json()) as { inquiries: Inquiry[] };
      setDefs(contentJson.defs ?? []);
      setValues(contentJson.values ?? {});
      setInquiries(inquiriesJson.inquiries ?? []);
    } catch {
      showToast("שגיאה בטעינת הנתונים", "error");
    } finally {
      setLoading(false);
    }
  }, [router, showToast]);

  useEffect(() => {
    void loadAll();
  }, [loadAll]);

  /* ------------------------------------------------ CMS mutations */

  const saveContent = useCallback(
    async (updates: Record<string, string>) => {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
      });
      const json = (await res.json()) as { values?: Record<string, string> };
      if (!res.ok) throw new Error("save failed");
      if (json.values) setValues(json.values);
    },
    []
  );

  const resetContent = useCallback(async (keys: string[]) => {
    const res = await fetch("/api/admin/content", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keys }),
    });
    const json = (await res.json()) as { values?: Record<string, string> };
    if (!res.ok) throw new Error("reset failed");
    if (json.values) setValues(json.values);
  }, []);

  const applyImageValue = useCallback((key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const patchInquiry = useCallback(async (id: number, status: InquiryStatus) => {
    const res = await fetch(`/api/admin/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error("patch failed");
    setInquiries((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
  }, []);

  const deleteInquiry = useCallback(async (id: number) => {
    const res = await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("delete failed");
    setInquiries((prev) => prev.filter((q) => q.id !== id));
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  const newCount = inquiries.filter((q) => q.status === "new").length;

  return (
    <section className="min-h-screen bg-mist">
      {/* Admin top bar */}
      <div className="border-b border-brand-100 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            {logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} alt={siteName} className="h-10 w-auto rounded-lg object-contain" />
            )}
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-brand-950">
                מערכת ניהול האתר
              </h1>
              <p className="text-xs font-medium text-slate-500">
                מחובר/ת כ־<span className="font-bold text-brand-700">{username}</span> • {siteName}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="ms-auto flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 shadow-sm transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            יציאה
          </button>
        </div>

        {/* Tabs */}
        <div className="mx-auto w-full max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1.5 pb-3" aria-label="לשוניות ניהול">
            {TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className={`relative flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
                  tab === key
                    ? "bg-brand-600 text-white shadow-md shadow-brand-600/25"
                    : "bg-white text-slate-600 shadow-sm hover:bg-brand-50 hover:text-brand-700"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
                {key === "inquiries" && newCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-extrabold text-white">
                    {newCount}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-brand-600">
            <Loader2 className="h-10 w-10 animate-spin" />
            <p className="text-sm font-bold text-slate-500">טוענים את נתוני האתר…</p>
          </div>
        ) : (
          <>
            {tab === "overview" && (
              <OverviewTab
                inquiries={inquiries}
                logo={logo}
                onNavigate={(target) => setTab(target)}
              />
            )}
            {tab === "content" && (
              <ContentTab
                defs={defs}
                values={values}
                onSave={saveContent}
                onReset={resetContent}
                showToast={showToast}
              />
            )}
            {tab === "media" && (
              <MediaTab
                defs={defs}
                values={values}
                onSave={saveContent}
                onReset={resetContent}
                onApply={applyImageValue}
                showToast={showToast}
              />
            )}
            {tab === "inquiries" && (
              <InquiriesTab
                inquiries={inquiries}
                onPatch={patchInquiry}
                onDelete={deleteInquiry}
                showToast={showToast}
              />
            )}
            {tab === "settings" && <SettingsTab showToast={showToast} />}
          </>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div
          role="status"
          className={`fixed bottom-6 start-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-extrabold text-white shadow-lift ${
            toast.kind === "success" ? "bg-brand-700" : "bg-red-600"
          }`}
        >
          <CheckCircle2 className="h-4.5 w-4.5" />
          {toast.message}
        </div>
      )}
    </section>
  );
}
