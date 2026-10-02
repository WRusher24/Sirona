"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Factory, Lock, Menu, PhoneCall, X } from "lucide-react";
import SiteLogo from "./SiteLogo";

const NAV_ITEMS = [
  { href: "/", label: "בית" },
  { href: "/private-label", label: "מותג פרטי וייצור" },
  { href: "/contact", label: "צור קשר" },
];

export default function HeaderClient({
  logo,
  name,
  slogan,
}: {
  logo: string;
  name: string;
  slogan: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-white/85 backdrop-blur-xl transition-shadow duration-300 ${
        scrolled
          ? "border-brand-100 shadow-[0_10px_36px_-18px_rgba(10,85,137,0.35)]"
          : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[76px] w-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <SiteLogo logo={logo} name={name} slogan={slogan} />

        {/* Desktop nav */}
        <nav className="mx-auto hidden items-center gap-1 lg:flex" aria-label="ניווט ראשי">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative rounded-full px-5 py-2.5 text-[15px] font-semibold transition-colors ${
                isActive(item.href)
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:bg-mist hover:text-brand-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2 lg:ms-0">
          <Link
            href="/admin"
            title="כניסת מנהלים"
            aria-label="כניסת מנהלים"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-mist hover:text-brand-600 sm:flex"
          >
            <Lock className="h-[18px] w-[18px]" strokeWidth={2} />
          </Link>
          <Link
            href="/contact"
            className="hidden items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-[15px] font-bold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-brand-700/30 sm:flex"
          >
            <PhoneCall className="h-4 w-4" strokeWidth={2.2} />
            לשיחת ייעוץ
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-brand-700 shadow-sm lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        className={`overflow-hidden border-t border-brand-100 bg-white transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-4 py-4" aria-label="ניווט נייד">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-semibold ${
                isActive(item.href)
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-700 hover:bg-mist"
              }`}
            >
              <Factory className="h-4 w-4 text-brand-400" />
              {item.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="mt-2 flex items-center gap-3 rounded-xl border border-dashed border-slate-200 px-4 py-3.5 text-sm font-semibold text-slate-500 hover:bg-mist"
          >
            <Lock className="h-4 w-4" />
            כניסת מנהלים
          </Link>
        </nav>
      </div>
    </header>
  );
}
