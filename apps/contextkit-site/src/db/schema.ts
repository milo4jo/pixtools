import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// Users - synced from Clerk
export const users = sqliteTable("users", {
  id: text("id").primaryKey(), // Clerk user ID
  email: text("email").notNull(),
  name: text("name"),
  imageUrl: text("image_url"),
  plan: text("plan").default("free").notNull(), // free, pro, team, enterprise
  stripeCustomerId: text("stripe_customer_id"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
});

// API Keys
export const apiKeys = sqliteTable("api_keys", {
  id: text("id").primaryKey(), // nanoid
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull().default("Default"),
  keyHash: text("key_hash").notNull(), // hashed API key
  keyPrefix: text("key_prefix").notNull(), // first 8 chars for display (ck_xxx...)
  lastUsedAt: integer("last_used_at", { mode: "timestamp" }),
  expiresAt: integer("expires_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
});

// Usage tracking
export const usage = sqliteTable("usage", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  apiKeyId: text("api_key_id").references(() => apiKeys.id, {
    onDelete: "set null",
  }),
  action: text("action").notNull(), // select, symbol, graph, index, status
  tokensIn: integer("tokens_in").default(0),
  tokensOut: integer("tokens_out").default(0),
  durationMs: integer("duration_ms"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
});

// Monthly usage aggregates (for billing)
export const usageMonthly = sqliteTable("usage_monthly", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  year: integer("year").notNull(),
  month: integer("month").notNull(), // 1-12
  selectCount: integer("select_count").default(0).notNull(),
  symbolCount: integer("symbol_count").default(0).notNull(),
  graphCount: integer("graph_count").default(0).notNull(),
  indexCount: integer("index_count").default(0).notNull(),
  totalTokens: integer("total_tokens").default(0).notNull(),
});

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type ApiKey = typeof apiKeys.$inferSelect;
export type NewApiKey = typeof apiKeys.$inferInsert;
export type Usage = typeof usage.$inferSelect;
export type NewUsage = typeof usage.$inferInsert;
