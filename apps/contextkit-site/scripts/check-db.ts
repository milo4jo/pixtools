/* eslint-disable no-console */
import { createClient } from "@libsql/client";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  url: process.env.TURSO_DATABASE_URL || process.env.TURSO_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function main() {
  console.log("Checking ContextKit Database...\n");

  // Check users
  const users = await client.execute("SELECT * FROM users");
  console.log(`Users: ${users.rows.length}`);
  if (users.rows.length > 0) {
    console.table(users.rows);
  }

  // Check API keys
  const keys = await client.execute("SELECT id, user_id, name, key_prefix, created_at FROM api_keys");
  console.log(`\nAPI Keys: ${keys.rows.length}`);
  if (keys.rows.length > 0) {
    console.table(keys.rows);
  }

  // Check usage
  const usage = await client.execute("SELECT * FROM usage LIMIT 10");
  console.log(`\nUsage Records: ${usage.rows.length}`);
  if (usage.rows.length > 0) {
    console.table(usage.rows);
  }

  // Check monthly usage
  const monthly = await client.execute("SELECT * FROM usage_monthly");
  console.log(`\nMonthly Usage: ${monthly.rows.length}`);
  if (monthly.rows.length > 0) {
    console.table(monthly.rows);
  }
}

main().catch(console.error);
