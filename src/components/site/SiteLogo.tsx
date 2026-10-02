"use client";

import { useState } from "react";
import Link from "next/link";
import { Droplets } from "lucide-react";

/**
 * Logo block used in the header (and admin login). When the uploaded logo
 * fails to load we fall back to the animated droplet mark so the header
 * never renders a broken image.
 */
export default function SiteLogo({
  logo,
  name,
  slogan,
  compact = false,
}: {
  logo: string;
  name: string;
  slogan: string;
  compact?: boolean;
}) {
  const [broken, setBroken] = useState(false);

  return (
    <Link href="/" className="flex min-w-0 items-center gap-3" aria-label={name}>
      {logo && !broken ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo}
          alt={name}
          onError={() => setBroken(true)}
          className={`w-auto rounded-xl object-contain ${compact ? "h-10" : "h-11"}`}
        />
      ) : (
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white">
          <Droplets className="h-6 w-6" />
        </span>
      )}
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-[17px] font-extrabold leading-tight tracking-tight text-brand-900">
          {name}
        </span>
        {!compact && (
          <span className="hidden truncate text-[11px] font-medium text-slate-500 sm:block">
            {slogan}
          </span>
        )}
      </span>
    </Link>
  );
}
