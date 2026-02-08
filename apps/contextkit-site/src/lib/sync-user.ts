/**
 * User Sync
 * 
 * Ensures the current Clerk user exists in our database.
 * Called on dashboard access as a fallback when webhook hasn't fired.
 */

import { currentUser } from "@clerk/nextjs/server";
import { db, users } from "@/db";
import { eq } from "drizzle-orm";

export async function syncCurrentUser() {
  const user = await currentUser();
  
  if (!user) {
    return null;
  }

  const email = user.emailAddresses[0]?.emailAddress;
  
  if (!email) {
    return null;
  }

  // Check if user exists
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.id, user.id))
    .limit(1);

  if (existing.length > 0) {
    return existing[0];
  }

  // Create user if not exists
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || null;

  await db.insert(users).values({
    id: user.id,
    email,
    name,
    imageUrl: user.imageUrl,
  });

  // Return the created user
  const created = await db
    .select()
    .from(users)
    .where(eq(users.id, user.id))
    .limit(1);

  return created[0] ?? null;
}
