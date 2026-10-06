import type { Metadata } from "next";
import {
  Beaker,
  Boxes,
  CheckCircle2,
  ClipboardCheck,
  FlaskConical,
  Layers,
  MessageSquareText,
  Package,
  Palette,
  Ruler,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { getContentMap } from "@/lib/server/content-store";
import Reveal from "@/components/site/Reveal";
import { CmsImage, Eyebrow, PrimaryLink, SectionHeading } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "מותג פרטי ושירותי ייצור",
  description:
    "שירותי מותג פרטי מקצה לקצה מבית סירונה דטרגנטים: פיתוח פורמולציה, מיתוג ואריזה, ייצור סדרתי, בקרת איכות ורגולציה ולוגיסטיקה — כולל ניסיון בייצור עבור סנו וקינג סטור.",
};

const STEP_ICONS = [MessageSquareText, Beaker, Palette, Package, Truck];
const QUALITY_ICONS = [ClipboardCheck, ShieldCheck, FlaskConical, CheckCircle2];
const FLEX_ICONS = [FlaskConical, Boxes, Ruler];

export default async function PrivateLabelPage() {
  const c = await getContentMap();

  return (
    <>
      {/* ================================================== HERO */}
      <section className="relative overflow-hidden bg-mist">
        <div className="bg-grid-light absolute inset-0" aria-hidden />
        <div className="absolute -top-24 -end-24 h-80 w-80 rounded-full bg-brand-200/40 blur-3xl" aria-hidden />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-14 text-center sm:px-6 lg:pb-20 lg:pt-24 lg:px-8">
          <Reveal>
            <Eyebrow>{c["pl.hero.badge"]}</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold leading-[1.18] tracking-tight text-brand-950 sm:text-5xl lg:text-6xl">
              {c["pl.hero.title"]}
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-slate-600">
              {c["pl.hero.subtitle"]}
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-9 flex justify-center">
              <PrimaryLink href="/contact">{c["pl.hero.cta1"]}</PrimaryLink>
            </div>
          </Reveal>
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
          <Reveal delay={250}>
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-lift ring-1 ring-brand-100">
              <CmsImage
                src={c["pl.hero.image"]}
                alt="קו ייצור אוטומטי"
                eager
                className="aspect-[21/9] w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/30 via-transparent to-transparent" aria-hidden />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================== PROCESS */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-28 lg:px-8">
        <Reveal className="text-center">
          <Eyebrow>{c["pl.process.eyebrow"]}</Eyebrow>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-5">
            <SectionHeading title={c["pl.process.title"]} subtitle={c["pl.process.subtitle"]} />
          </div>
        </Reveal>

        <ol className="relative mx-auto mt-16 grid max-w-4xl gap-10">
          <span className="absolute bottom-6 start-7 top-6 w-px bg-gradient-to-b from-brand-200 via-brand-300/70 to-transparent sm:start-1/2 sm:-translate-x-1/2" aria-hidden />
          {([1, 2, 3, 4, 5] as const).map((i, idx) => {
            const Icon = STEP_ICONS[idx];
            const flip = idx % 2 === 1;
            return (
              <Reveal key={i} delay={idx * 90}>
                <li
                  className={`relative flex items-start gap-5 sm:w-1/2 ${
                    flip
                      ? "sm:ms-auto sm:flex-row sm:text-start sm:ps-12"
                      : "sm:flex-row-reverse sm:pe-12 sm:text-end"
                  }`}
                >
                  <span
                    className={`z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-600/25 sm:absolute sm:top-0 ${
                      flip ? "sm:-start-7" : "sm:-end-7"
                    }`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </span>
                  <div className="rounded-3xl border border-brand-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                    <div className="flex items-center gap-2 text-xs font-extrabold text-brand-400">
                      <span dir="ltr">0{i}</span>
                      <span className="h-px w-6 bg-brand-200" aria-hidden />
                    </div>
                    <h3 className="mt-2 text-lg font-extrabold text-brand-950">
                      {c[`pl.step${i}.title`]}
                    </h3>
                    <p className="mt-2 text-[15px] leading-7 text-slate-600">
                      {c[`pl.step${i}.text`]}
                    </p>
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </section>

      {/* ================================================== EXPERIENCE / SOCIAL PROOF */}
      <section className="border-y border-brand-100 bg-mist">
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-28 lg:px-8">
          <Reveal className="text-center">
            <Eyebrow>{c["pl.exp.eyebrow"]}</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-5">
              <SectionHeading title={c["pl.exp.title"]} subtitle={c["pl.exp.subtitle"]} />
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-7 text-slate-500">
              {c["pl.exp.note"]}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================================================== QUALITY & COMPLIANCE */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-28 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <Eyebrow>{c["pl.quality.eyebrow"]}</Eyebrow>
            </Reveal>
            <Reveal delay={90}>
              <div className="mt-5">
                <SectionHeading
                  align="start"
                  title={c["pl.quality.title"]}
                  subtitle={c["pl.quality.subtitle"]}
                />
              </div>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {([1, 2, 3, 4] as const).map((i, idx) => {
                const Icon = QUALITY_ICONS[idx];
                return (
                  <Reveal key={i} delay={idx * 90}>
                    <article className="h-full rounded-3xl border border-brand-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                        <Icon className="h-5.5 w-5.5" strokeWidth={2} />
                      </span>
                      <h3 className="mt-4 font-extrabold text-brand-950">
                        {c[`pl.q${i}.title`]}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {c[`pl.q${i}.text`]}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal delay={200} className="relative">
            <div className="relative">
              <div className="bg-dots absolute -bottom-8 -start-8 hidden h-44 w-44 rounded-3xl sm:block" aria-hidden />
              <div className="relative overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-brand-100">
                <CmsImage
                  src={c["pl.quality.image"]}
                  alt="מעבדת בקרת איכות"
                  className="aspect-[4/5] w-full sm:aspect-[5/5.4]"
                />
              </div>
              <div className="glass-card absolute -bottom-6 end-6 flex items-center gap-3 rounded-2xl border border-white/70 px-5 py-4 shadow-lift">
                <ShieldCheck className="h-8 w-8 text-brand-600" strokeWidth={1.8} />
                <div>
                  <p className="text-sm font-extrabold text-brand-900">100% בקרת אצוות</p>
                  <p className="text-xs font-medium text-slate-500">לפני כל יציאה מהמפעל</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================== FLEXIBILITY */}
      <section className="border-y border-brand-100 bg-mist">
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-28 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
            <Reveal delay={180} className="order-last lg:order-first">
              <div className="relative">
                <div className="relative overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-brand-100">
                  <CmsImage
                    src={c["pl.flex.image"]}
                    alt="מגוון אריזות למותג פרטי"
                    className="aspect-[4/3.4] w-full"
                  />
                </div>
                <div className="glass-card absolute -top-5 start-6 flex items-center gap-3 rounded-2xl border border-white/70 px-5 py-3.5 shadow-lift">
                  <Layers className="h-7 w-7 text-brand-500" strokeWidth={1.8} />
                  <p className="text-sm font-extrabold text-brand-900">עשרות תצורות אריזה במלאי</p>
                </div>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <Eyebrow>{c["pl.flex.eyebrow"]}</Eyebrow>
              </Reveal>
              <Reveal delay={90}>
                <div className="mt-5">
                  <SectionHeading
                    align="start"
                    title={c["pl.flex.title"]}
                    subtitle={c["pl.flex.subtitle"]}
                  />
                </div>
              </Reveal>

              <div className="mt-10 space-y-4">
                {([1, 2, 3] as const).map((i, idx) => {
                  const Icon = FLEX_ICONS[idx];
                  return (
                    <Reveal key={i} delay={idx * 90}>
                      <article className="flex items-start gap-4 rounded-3xl border border-brand-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-md shadow-brand-600/20">
                          <Icon className="h-6 w-6" strokeWidth={2} />
                        </span>
                        <div>
                          <h3 className="font-extrabold text-brand-950">{c[`pl.f${i}.title`]}</h3>
                          <p className="mt-1.5 text-sm leading-6 text-slate-600">
                            {c[`pl.f${i}.text`]}
                          </p>
                        </div>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== CTA */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-24 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-l from-brand-700 via-brand-600 to-brand-500 px-6 py-16 text-center shadow-lift sm:px-12">
            <div className="bg-dots absolute inset-0 opacity-20" aria-hidden />
            <Package className="relative mx-auto h-12 w-12 text-brand-100" strokeWidth={1.6} />
            <h2 className="relative mx-auto mt-6 max-w-2xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              {c["pl.cta.title"]}
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-base leading-8 text-brand-50">
              {c["pl.cta.text"]}
            </p>
            <div className="relative mt-9 flex flex-wrap justify-center gap-3">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-extrabold text-brand-700 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                {c["pl.cta.button"]}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
