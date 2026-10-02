import type { Metadata } from "next";
import {
  Award,
  BadgeCheck,
  Boxes,
  Building2,
  Droplets,
  Factory,
  FlaskConical,
  Flower2,
  SoapDispenserDroplet,
  Heart,
  HeartHandshake,
  Package,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Store,
  Truck,
  WashingMachine,
} from "lucide-react";
import { getContentMap } from "@/lib/server/content-store";
import Reveal from "@/components/site/Reveal";
import { CmsImage, Eyebrow, PrimaryLink, SecondaryLink, SectionHeading } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "עמוד הבית",
  description:
    "סירונה דטרגנטים — מפעל מוביל לייצור חומרי ניקוי ודטרגנטים. מבית המותגים Glanz ו-Heidy, עם שירותי ייצור ומותג פרטי לרשתות, מפיצים ומפעלים.",
};

const CAP_ICONS = [WashingMachine, SprayCan, Flower2, SoapDispenserDroplet, Factory, BadgeCheck];
const CAP_KEYS = [1, 2, 3, 4, 5, 6] as const;

const AUD_ICONS = [Store, Truck, Building2];
const WHY_ICONS = [Award, Boxes, ShieldCheck, HeartHandshake];

export default async function HomePage() {
  const c = await getContentMap();

  const marqueeItems = [
    c["home.brands.glanz.name"],
    ...CAP_KEYS.map((i) => c[`home.cap${i}.title`]),
    c["home.brands.heidy.name"],
    "מותג פרטי • OEM",
  ];

  return (
    <>
      {/* ================================================== HERO */}
      <section className="relative overflow-hidden bg-mist">
        <div className="bg-grid-light absolute inset-0" aria-hidden />
        <div className="absolute -top-32 -start-32 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl" aria-hidden />
        <div className="absolute -bottom-40 -end-24 h-[28rem] w-[28rem] rounded-full bg-brand-100/70 blur-3xl" aria-hidden />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:pb-28 lg:pt-24 lg:px-8">
          {/* Copy */}
          <div className="relative z-10">
            <Reveal>
              <Eyebrow>{c["home.hero.badge"]}</Eyebrow>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.18] tracking-tight text-brand-950 sm:text-5xl lg:text-[3.4rem]">
                {c["home.hero.title"]}
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 max-w-xl text-lg leading-9 text-slate-600">
                {c["home.hero.subtitle"]}
              </p>
            </Reveal>
            <Reveal delay={260}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <PrimaryLink href="/private-label">{c["home.hero.cta1"]}</PrimaryLink>
                <SecondaryLink href="/contact">{c["home.hero.cta2"]}</SecondaryLink>
              </div>
            </Reveal>
            <Reveal delay={340}>
              <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-brand-800">
                {[c["home.hero.chip1"], c["home.hero.chip2"], c["home.hero.chip3"]].map(
                  (chip) => (
                    <li key={chip} className="flex items-center gap-2">
                      <ShieldCheck className="h-4.5 w-4.5 text-brand-500" strokeWidth={2.2} />
                      {chip}
                    </li>
                  )
                )}
              </ul>
            </Reveal>
          </div>

          {/* Visual */}
          <Reveal delay={200} className="relative">
            <div className="relative mx-auto max-w-[560px]">
              <div
                className="bg-dots absolute -top-8 -end-8 hidden h-40 w-40 rounded-3xl sm:block"
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-brand-100">
                <CmsImage
                  src={c["home.hero.image"]}
                  alt={c["site.name"]}
                  eager
                  className="aspect-[5/4] w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/25 via-transparent to-transparent" aria-hidden />
              </div>

              {/* Floating brand cards */}
              <div className="glass-card animate-float-slow absolute -top-5 -start-4 flex items-center gap-3 rounded-2xl border border-white/70 px-4 py-3 shadow-lift sm:-start-8">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
                  <Sparkles className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-extrabold text-brand-900" dir="ltr">
                    {c["home.hero.card1.title"]}
                  </span>
                  <span className="block text-xs font-medium text-slate-500">
                    {c["home.hero.card1.text"]}
                  </span>
                </span>
              </div>
              <div className="glass-card animate-float-slower absolute -bottom-6 -end-3 flex items-center gap-3 rounded-2xl border border-white/70 px-4 py-3 shadow-lift sm:-end-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-400 text-white">
                  <Heart className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-extrabold text-brand-900" dir="ltr">
                    {c["home.hero.card2.title"]}
                  </span>
                  <span className="block text-xs font-medium text-slate-500">
                    {c["home.hero.card2.text"]}
                  </span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Marquee ticker */}
        <div className="relative border-y border-brand-100 bg-white/70 py-4 backdrop-blur" dir="ltr">
          <div className="flex w-max animate-marquee items-center gap-10 pe-10">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-10 whitespace-nowrap text-sm font-bold text-brand-800/80"
              >
                {item}
                <Droplets className="h-4 w-4 text-brand-300" aria-hidden />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================== STATS */}
      <section className="border-b border-brand-100 bg-white">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-px overflow-hidden px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          {([1, 2, 3, 4] as const).map((i, idx) => (
            <Reveal key={i} delay={idx * 90} className="px-4 py-2 text-center">
              <p className="text-4xl font-extrabold tracking-tight text-brand-600 sm:text-5xl" dir="ltr">
                {c[`home.stat${i}.value`]}
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-500">
                {c[`home.stat${i}.label`]}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================================================== HOUSE OF BRANDS */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-28 lg:px-8">
        <Reveal className="text-center">
          <Eyebrow>{c["home.brands.eyebrow"]}</Eyebrow>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-5">
            <SectionHeading title={c["home.brands.title"]} subtitle={c["home.brands.subtitle"]} />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {[
            {
              image: c["home.brands.glanz.image"],
              name: c["home.brands.glanz.name"],
              tag: c["home.brands.glanz.tag"],
              text: c["home.brands.glanz.text"],
              icon: Sparkles,
              accent: "bg-brand-600",
            },
            {
              image: c["home.brands.heidy.image"],
              name: c["home.brands.heidy.name"],
              tag: c["home.brands.heidy.tag"],
              text: c["home.brands.heidy.text"],
              icon: Heart,
              accent: "bg-brand-400",
            },
          ].map((brand, idx) => (
            <Reveal key={brand.name} delay={idx * 140}>
              <article className="group h-full overflow-hidden rounded-[2rem] border border-brand-100 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <div className="relative overflow-hidden">
                  <CmsImage
                    src={brand.image}
                    alt={brand.name}
                    className="aspect-[16/9] w-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-4 start-4 rounded-full bg-white/90 px-4 py-1.5 text-xs font-extrabold text-brand-700 shadow-sm backdrop-blur">
                    {brand.tag}
                  </span>
                </div>
                <div className="p-7 sm:p-9">
                  <div className="flex items-center gap-3.5">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white ${brand.accent}`}>
                      <brand.icon className="h-6 w-6" />
                    </span>
                    <h3 className="text-3xl font-extrabold tracking-tight text-brand-950" dir="ltr">
                      {brand.name}
                    </h3>
                  </div>
                  <p className="mt-4 leading-8 text-slate-600">{brand.text}</p>
                  <div className="mt-5 flex items-center gap-2 border-t border-brand-50 pt-5 text-sm font-semibold text-brand-700">
                    <Package className="h-4.5 w-4.5" />
                    זמין לרכישה סיטונאית ישירות מהמפעל
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================================================== CAPABILITIES */}
      <section className="border-y border-brand-100 bg-mist">
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-28 lg:px-8">
          <Reveal className="text-center">
            <Eyebrow>{c["home.cap.eyebrow"]}</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-5">
              <SectionHeading title={c["home.cap.title"]} subtitle={c["home.cap.subtitle"]} />
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CAP_KEYS.map((i, idx) => {
              const Icon = CAP_ICONS[idx];
              return (
                <Reveal key={i} delay={idx * 80}>
                  <article className="group h-full rounded-3xl border border-brand-100 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
                    <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                      <Icon className="h-6 w-6" strokeWidth={2} />
                    </span>
                    <h3 className="mt-5 text-lg font-extrabold text-brand-950">
                      {c[`home.cap${i}.title`]}
                    </h3>
                    <p className="mt-2 text-[15px] leading-7 text-slate-600">
                      {c[`home.cap${i}.text`]}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          {/* Logistics banner */}
          <Reveal delay={120}>
            <div className="relative mt-14 overflow-hidden rounded-[2rem] shadow-lift">
              <CmsImage
                src={c["home.cap.image"]}
                alt="מחסן ולוגיסטיקה"
                className="h-64 w-full sm:h-80"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-brand-950/85 via-brand-900/55 to-brand-900/10" aria-hidden />
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-lg p-8 sm:p-12">
                  <div className="flex items-center gap-2 text-brand-200">
                    <FlaskConical className="h-5 w-5" />
                    <span className="text-sm font-bold">מהפיתוח ועד הלקוח</span>
                  </div>
                  <p className="mt-3 text-2xl font-extrabold leading-snug text-white sm:text-3xl">
                    מייצרים. מאחסנים. מפיצים.
                  </p>
                  <p className="mt-3 text-sm leading-7 text-brand-100 sm:text-base">
                    מעבדת פיתוח, קווי ייצור אוטומטיים ומרכז לוגיסטי — שרשרת אספקה מלאה בשליטתנו.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================== AUDIENCES */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-28 lg:px-8">
        <Reveal className="text-center">
          <Eyebrow>{c["home.aud.eyebrow"]}</Eyebrow>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-5">
            <SectionHeading title={c["home.aud.title"]} subtitle={c["home.aud.subtitle"]} />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {([1, 2, 3] as const).map((i, idx) => {
            const Icon = AUD_ICONS[idx];
            return (
              <Reveal key={i} delay={idx * 120}>
                <article className="group relative h-full overflow-hidden rounded-3xl border border-brand-100 bg-white p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <div className="bg-dots absolute -end-10 -top-10 h-36 w-36 rounded-full opacity-60 transition-transform duration-500 group-hover:scale-125" aria-hidden />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-600/25">
                    <Icon className="h-7 w-7" strokeWidth={2} />
                  </span>
                  <h3 className="relative mt-6 text-xl font-extrabold text-brand-950">
                    {c[`home.aud${i}.title`]}
                  </h3>
                  <p className="relative mt-3 text-[15px] leading-7 text-slate-600">
                    {c[`home.aud${i}.text`]}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ================================================== WHY SIRONA */}
      <section className="border-y border-brand-100 bg-white">
        <div className="mx-auto grid w-full max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:py-28 lg:px-8">
          <div>
            <Reveal>
              <Eyebrow>{c["home.why.eyebrow"]}</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 text-3xl font-extrabold leading-[1.2] tracking-tight text-brand-950 sm:text-4xl">
                {c["home.why.title"]}
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-5 leading-8 text-slate-600">{c["home.why1.text"]}</p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8">
                <PrimaryLink href="/contact">{c["home.cta.button"]}</PrimaryLink>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {([2, 3, 4, 1] as const).map((i, idx) => {
              const Icon = WHY_ICONS[idx];
              return (
                <Reveal key={i} delay={idx * 100}>
                  <article className="h-full rounded-3xl border border-brand-100 bg-mist p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-soft">
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm">
                        <Icon className="h-5.5 w-5.5" strokeWidth={2} />
                      </span>
                      <span className="text-sm font-extrabold text-brand-300" dir="ltr">
                        0{idx + 1}
                      </span>
                    </div>
                    <h3 className="mt-4 text-base font-extrabold text-brand-950">
                      {c[`home.why${i}.title`]}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {c[`home.why${i}.text`]}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================== CTA */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-24 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-l from-brand-700 via-brand-600 to-brand-500 px-6 py-16 text-center shadow-lift sm:px-12">
            <div className="bg-dots absolute inset-0 opacity-20" aria-hidden />
            <HeartHandshake className="relative mx-auto h-12 w-12 text-brand-100" strokeWidth={1.6} />
            <h2 className="relative mx-auto mt-6 max-w-2xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              {c["home.cta.title"]}
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-base leading-8 text-brand-50">
              {c["home.cta.text"]}
            </p>
            <div className="relative mt-9 flex flex-wrap justify-center gap-3">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-extrabold text-brand-700 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                {c["home.cta.button"]}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
