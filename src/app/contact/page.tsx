import type { Metadata } from "next";
import {
  Building2,
  Clock,
  Globe,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";
import { getContentMap } from "@/lib/server/content-store";
import Reveal from "@/components/site/Reveal";
import { CmsImage, Eyebrow } from "@/components/site/ui";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "צור קשר",
  description:
    "צרו קשר עם סירונה דטרגנטים בע״מ — אזור התעשייה סח׳נין, טלפון 04-674-3355. פניות B2B לייצור מותג פרטי, רכש סיטונאי ושיתופי פעולה.",
};

export default async function ContactPage() {
  const c = await getContentMap();

  const website = c["contact.website"].trim();
  const websiteHref = /^https?:\/\//i.test(website) ? website : `https://${website}`;

  const lat = encodeURIComponent(c["contact.map.lat"].trim() || "32.872126");
  const lng = encodeURIComponent(c["contact.map.lng"].trim() || "35.309629");
  const zoom = encodeURIComponent(c["contact.map.zoom"].trim() || "16");
  const mapEmbedUrl = `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&hl=iw&output=embed`;
  const mapLinkUrl = `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}`;

  const details = [
    {
      icon: Building2,
      label: "שם החברה",
      value: c["contact.company"],
    },
    {
      icon: MapPin,
      label: "כתובת המפעל",
      value: c["contact.address"],
    },
    {
      icon: Phone,
      label: "טלפון",
      value: c["contact.phone"],
      href: `tel:${c["contact.phone"].replace(/[^\d+]/g, "")}`,
      ltr: true,
    },
    {
      icon: Globe,
      label: "אתר אינטרנט",
      value: website,
      href: websiteHref,
      external: true,
      ltr: true,
    },
    {
      icon: Clock,
      label: "שעות פעילות",
      value: c["contact.hours"],
    },
  ];

  return (
    <>
      {/* ================================================== HERO */}
      <section className="relative overflow-hidden bg-mist">
        <div className="bg-grid-light absolute inset-0" aria-hidden />
        <div className="absolute -top-24 -start-24 h-80 w-80 rounded-full bg-brand-200/40 blur-3xl" aria-hidden />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-14 text-center sm:px-6 lg:pb-16 lg:pt-24 lg:px-8">
          <Reveal>
            <Eyebrow>{c["contact.hero.badge"]}</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-[1.18] tracking-tight text-brand-950 sm:text-5xl lg:text-6xl">
              {c["contact.hero.title"]}
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-slate-600">
              {c["contact.hero.subtitle"]}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================================================== FORM + DETAILS */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-24 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[1.25fr_1fr]">
          <Reveal>
            <ContactForm title={c["contact.form.title"]} />
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={120}>
              <div className="rounded-[2rem] border border-brand-100 bg-white p-7 shadow-soft sm:p-8">
                <h2 className="text-xl font-extrabold tracking-tight text-brand-950">
                  {c["contact.details.title"]}
                </h2>
                <ul className="mt-6 space-y-5">
                  {details.map((item) => {
                    const content = (
                      <>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                          <item.icon className="h-5 w-5" strokeWidth={2} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-xs font-bold text-slate-400">
                            {item.label}
                          </span>
                          <span
                            className="mt-0.5 block break-words text-[15px] font-bold text-brand-950"
                            dir={item.ltr ? "ltr" : undefined}
                            style={item.ltr ? { textAlign: "end" } : undefined}
                          >
                            {item.value}
                          </span>
                        </span>
                      </>
                    );
                    return (
                      <li key={item.label}>
                        {item.href ? (
                          <a
                            href={item.href}
                            {...(item.external
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                            className="group flex items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-mist"
                          >
                            {content}
                          </a>
                        ) : (
                          <div className="flex items-center gap-4 p-2">{content}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <div className="relative overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-brand-100">
                <CmsImage
                  src={c["contact.factory.image"]}
                  alt={c["contact.company"]}
                  className="aspect-[16/10] w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 via-transparent to-transparent" aria-hidden />
                <p className="absolute bottom-4 start-4 end-4 flex items-center gap-2 text-sm font-bold text-white">
                  <MapPin className="h-4 w-4 shrink-0" />
                  {c["contact.address"]}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================== MAP */}
      <section className="border-t border-brand-100 bg-mist">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-24 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div className="max-w-xl">
                <Eyebrow>
                  <MapPin className="h-3.5 w-3.5" />
                  מיקום המפעל
                </Eyebrow>
                <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-brand-950 sm:text-4xl">
                  {c["contact.map.title"]}
                </h2>
                <p className="mt-4 leading-8 text-slate-600">{c["contact.map.subtitle"]}</p>
              </div>
              <a
                href={mapLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-brand-200 bg-white px-6 py-3 text-sm font-extrabold text-brand-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-50"
              >
                <Navigation className="h-4 w-4" />
                ניווט למפעל
              </a>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-10 overflow-hidden rounded-[2rem] border border-brand-100 shadow-lift">
              <iframe
                title={`מפת הגעה — ${c["contact.company"]}`}
                src={mapEmbedUrl}
                className="h-[320px] w-full border-0 sm:h-[440px]"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
