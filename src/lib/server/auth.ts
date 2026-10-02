import crypto from "crypto";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { admins } from "@/db/schema";

/**
 * Lightweight session auth for the admin CMS.
 * - Passwords are hashed with scrypt (salt:hash format).
 * - Sessions are stateless HMAC-signed tokens in an httpOnly cookie.
 */

export const ADMIN_COOKIE = "sirona_admin";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

function sessionSecret(): string {
  return (
    process.env.ADMIN_SECRET ||
    "sirona-dev-session-secret-change-in-production"
  );
}

/* ------------------------------------------------------------- hashing */

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  if (candidate.length !== expected.length) return false;
  return crypto.timingSafeEqual(candidate, expected);
}

/* ------------------------------------------------------------- tokens  */

interface SessionPayload {
  u: string;
  exp: number;
}

function base64url(input: string | Buffer): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function sign(data: string): string {
  return crypto
    .createHmac("sha256", sessionSecret())
    .update(data)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function createToken(username: string): string {
  const payload: SessionPayload = {
    u: username,
    exp: Date.now() + SESSION_TTL_SECONDS * 1000,
  };
  const data = base64url(JSON.stringify(payload));
  return `${data}.${sign(data)}`;
}

export function verifyToken(token: string): SessionPayload | null {
  const [data, signature] = token.split(".");
  if (!data || !signature) return null;
  const expected = sign(data);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(
      Buffer.from(data, "base64").toString("utf8")
    ) as SessionPayload;
    if (!payload.u || typeof payload.exp !== "number") return null;
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------ helpers  */

/**
 * Creates the initial admin account from environment variables if the
 * admin table is empty. Defaults: username "admin", password "sirona-2025".
 */
export async function ensureDefaultAdmin(): Promise<void> {
  try {
    const existing = await db.select({ id: admins.id }).from(admins).limit(1);
    if (existing.length > 0) return;
    const username = process.env.ADMIN_USERNAME || "admin";
    const password = process.env.ADMIN_PASSWORD || "sirona-2025";
    await db
      .insert(admins)
      .values({ username, passwordHash: hashPassword(password) })
      .onConflictDoNothing();
  } catch (error) {
    console.error("[auth] could not ensure default admin:", error);
  }
}

export async function attemptLogin(
  username: string,
  password: string
): Promise<boolean> {
  await ensureDefaultAdmin();
  const rows = await db
    .select()
    .from(admins)
    .where(eq(admins.username, username))
    .limit(1);
  const admin = rows[0];
  if (!admin || !verifyPassword(password, admin.passwordHash)) return false;
  const store = await cookies();
  store.set(ADMIN_COOKIE, createToken(admin.username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  return true;
}

export async function logoutAdmin(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}

/** Returns the logged-in admin username, or null when unauthenticated. */
export async function getAdminUser(): Promise<string | null> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  const payload = verifyToken(token);
  return payload?.u ?? null;
}

export async function changeAdminPassword(
  username: string,
  currentPassword: string,
  nextPassword: string
): Promise<"ok" | "wrong-password" | "not-found"> {
  const rows = await db
    .select()
    .from(admins)
    .where(eq(admins.username, username))
    .limit(1);
  const admin = rows[0];
  if (!admin) return "not-found";
  if (!verifyPassword(currentPassword, admin.passwordHash)) {
    return "wrong-password";
  }
  await db
    .update(admins)
    .set({ passwordHash: hashPassword(nextPassword) })
    .where(eq(admins.username, username));
  return "ok";
}
