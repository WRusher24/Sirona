import Link from "next/link";
import { Droplets, Globe, Lock, MapPin, Phone } from "lucide-react";
import { getContentMap } from "@/lib/server/content-store";

export default async function SiteFooter() {
  const c = await getContentMap();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-100 bg-mist">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
              <Droplets className="h-5 w-5" />
            </span>
            <span className="text-lg font-extrabold text-brand-900">{c["site.name"]}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-7 text-slate-600">{c["footer.about"]}</p>
        </div>

        {/* Nav */}
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-wide text-brand-700">ניווט</h3>
          <ul className="mt-4 space-y-2.5 text-sm font-medium text-slate-600">
            <li><Link href="/" className="transition-colors hover:text-brand-600">עמוד הבית</Link></li>
            <li><Link href="/private-label" className="transition-colors hover:text-brand-600">מותג פרטי וייצור</Link></li>
            <li><Link href="/contact" className="transition-colors hover:text-brand-600">צור קשר</Link></li>
            <li>
              <Link href="/admin" className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-600">
                <Lock className="h-3.5 w-3.5" />
                כניסת מנהלים
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-wide text-brand-700">יצירת קשר</h3>
          <ul className="mt-4 space-y-3 text-sm font-medium text-slate-600">
            <li className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 shrink-0 text-brand-500" />
              {c["contact.address"]}
            </li>
            <li>
              <a href={`tel:${c["contact.phone"]}`} className="flex items-center gap-2.5 transition-colors hover:text-brand-600">
                <Phone className="h-4 w-4 shrink-0 text-brand-500" />
                <span dir="ltr">{c["contact.phone"]}</span>
              </a>
            </li>
            <li>
              <a href="http://www.sirona.co.il/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 transition-colors hover:text-brand-600">
                <Globe className="h-4 w-4 shrink-0 text-brand-500" />
                <span dir="ltr">{c["contact.website"]}</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Brands mini */}
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-wide text-brand-700">מותגי הבית</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-brand-200 bg-white px-4 py-1.5 text-sm font-bold text-brand-700">{c["home.brands.glanz.name"]}</span>
            <span className="rounded-full border border-brand-200 bg-white px-4 py-1.5 text-sm font-bold text-brand-700">{c["home.brands.heidy.name"]}</span>
          </div>
          <p className="mt-4 text-xs leading-6 text-slate-500">
            לצד שירותי מותג פרטי מלאים לרשתות שיווק, מפיצים ומפעלים בכל הארץ.
          </p>
        </div>
      </div>

      <div className="border-t border-brand-100">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <p>{c["footer.rights"]} • {year}</p>
          <p className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-brand-400" />
            פותח ומתוחזק עבור {c["site.name"]}
          </p>
        </div>
      </div>
    </footer>
  );
}
