import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * Key/value store that powers the lightweight CMS.
 * Every editable text block and image slot on the site has a row here.
 * Rows only exist once an admin overrides a default value.
 */
export const siteContent = pgTable("site_content", {
  key: varchar("key", { length: 160 }).primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/** Incoming B2B inquiries submitted through the public contact form. */
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 200 }).notNull(),
  company: varchar("company", { length: 200 }).notNull(),
  subject: varchar("subject", { length: 300 }).notNull(),
  message: text("message").notNull(),
  /** new | read | handled */
  status: varchar("status", { length: 20 }).notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/** CMS administrator accounts (credentials are scrypt-hashed). */
export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 80 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
