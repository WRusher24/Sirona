import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ImageOff } from "lucide-react";

/** Small pill-style section label. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-[13px] font-bold text-brand-700 shadow-sm">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-brand-400" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
      </span>
      {children}
    </span>
  );
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
}: {
  title: string;
  subtitle?: string;
  align?: "center" | "start";
}) {
  const centered = align === "center";
  return (
    <div className={`max-w-3xl ${centered ? "mx-auto text-center" : "text-start"}`}>
      <h2 className="text-3xl font-extrabold leading-[1.2] tracking-tight text-brand-950 sm:text-4xl lg:text-[2.6rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}

export function PrimaryLink({
  href,
  children,
  withArrow = true,
}: {
  href: string;
  children: ReactNode;
  withArrow?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-700/30"
    >
      {children}
      {withArrow && (
        <ArrowLeft className="h-4.5 w-4.5 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={2.4} />
      )}
    </Link>
  );
}

export function SecondaryLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-base font-bold text-brand-800 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50"
    >
      {children}
    </Link>
  );
}

/**
 * Renders a CMS image. Empty/missing values render an elegant placeholder
 * block instead of a broken image (e.g. after an admin removes a photo).
 */
export function CmsImage({
  src,
  alt,
  className = "",
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-brand-50 bg-dots ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="flex flex-col items-center gap-2 text-brand-300">
          <ImageOff className="h-8 w-8" strokeWidth={1.6} />
          <span className="text-xs font-semibold">{alt}</span>
        </span>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      className={`object-cover ${className}`}
    />
  );
}
