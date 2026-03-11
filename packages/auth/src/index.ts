import {
  createClient as createSupabaseClient,
  SupabaseClient,
} from "@supabase/supabase-js";

let supabaseClient: SupabaseClient | null = null;

/**
 * Create and return a Supabase client for client-side use
 * Only use in browser context
 */
export function createClient(): SupabaseClient {
  if (typeof window === "undefined") {
    throw new Error("This function can only be called on the client side");
  }

  if (!supabaseClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      throw new Error("Missing Supabase credentials");
    }

    supabaseClient = createSupabaseClient(url, key);
  }

  return supabaseClient;
}

/**
 * Get the current session (client-side)
 */
export async function getSession() {
  const client = createClient();
  const {
    data: { session },
  } = await client.auth.getSession();
  return session;
}

/**
 * Get the current user (client-side)
 */
export async function getUser() {
  const client = createClient();
  const {
    data: { user },
  } = await client.auth.getUser();
  return user;
}

/**
 * Sign in with Google (client-side)
 */
export async function signInWithGoogle() {
  const client = createClient();
  const { data, error } = await client.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });
  return { data, error };
}

/**
 * Sign in with Apple (client-side)
 */
export async function signInWithApple() {
  const client = createClient();
  const { data, error } = await client.auth.signInWithOAuth({
    provider: "apple",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });
  return { data, error };
}

/**
 * Sign out (client-side)
 */
export async function signOut() {
  const client = createClient();
  const { error } = await client.auth.signOut();
  return { error };
}
