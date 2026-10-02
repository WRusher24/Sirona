import { db } from "@/db";
import { inquiries } from "@/db/schema";

export const dynamic = "force-dynamic";

/** Public endpoint — stores a B2B inquiry from the contact form. */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "בקשה לא תקינה" }, { status: 400 });
  }

  const { fullName, company, subject, message } = (body ?? {}) as Record<
    string,
    string
  >;

  const clean = {
    fullName: (fullName ?? "").trim(),
    company: (company ?? "").trim(),
    subject: (subject ?? "").trim(),
    message: (message ?? "").trim(),
  };

  if (
    clean.fullName.length < 2 ||
    clean.fullName.length > 200 ||
    clean.company.length < 2 ||
    clean.company.length > 200
  ) {
    return Response.json(
      { error: "נא למלא שם מלא ושם עסק תקינים" },
      { status: 400 }
    );
  }
  if (clean.subject.length < 2 || clean.subject.length > 300) {
    return Response.json({ error: "נא לבחור או לכתוב נושא פנייה" }, { status: 400 });
  }
  if (clean.message.length < 5 || clean.message.length > 5000) {
    return Response.json(
      { error: "תוכן ההודעה קצר מדי או ארוך מדי" },
      { status: 400 }
    );
  }

  await db.insert(inquiries).values(clean);
  return Response.json({ ok: true });
}
