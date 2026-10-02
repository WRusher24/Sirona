import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Heebo } from "next/font/google";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "סירונה דטרגנטים בע״מ | ייצור חומרי ניקוי ומותגים פרטיים",
    template: "%s | סירונה דטרגנטים בע״מ",
  },
  description:
    "סירונה דטרגנטים בע״מ — מפעל מוביל בישראל לייצור חומרי ניקוי, סבונים ודטרגנטים לבית ולתעשייה. מבית המותגים Glanz ו-Heidy, ושירותי מותג פרטי מקצה לקצה לרשתות, מפיצים ומפעלים.",
  icons: { icon: "/images/logo-default.svg" },
};

export const dynamic = "force-dynamic";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${heebo.variable} font-sans`}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
