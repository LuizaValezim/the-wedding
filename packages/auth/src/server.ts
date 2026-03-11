import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Create and return a Supabase Admin client for server-side use
 * Use in API routes and server actions
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error("Missing Supabase admin credentials");
  }

  return createSupabaseClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Verify JWT token for guest RSVP authentication (server-side)
 */
export async function verifyRsvpToken(token: string) {
  try {
    const admin = createAdminClient();
    const {
      data: { user },
      error,
    } = await admin.auth.admin.getUserById(token);

    if (error || !user) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  }
}

/**
 * Get user by email (server-side)
 */
export async function getUserByEmail(email: string) {
  const admin = createAdminClient();
  const { data, error } = await admin.auth.admin.listUsers();

  if (error) {
    return null;
  }

  return data.users.find((user) => user.email === email) || null;
}
