import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

let cachedClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  // Si aún no se colocaron las credenciales activas del proyecto, evitamos disparar peticiones fallidas
  const isValidConfig =
    supabaseUrl.startsWith("https://") &&
    !supabaseUrl.includes("your-project") &&
    supabaseAnonKey.length > 20 &&
    !supabaseAnonKey.includes("your-anon-key");

  if (!isValidConfig) {
    return {
      rpc: async () => ({ data: null, error: null }),
      from: () => ({
        select: () => Promise.resolve({ data: [], error: null }),
        insert: () => Promise.resolve({ data: null, error: null }),
      }),
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
    } as unknown as ReturnType<typeof createBrowserClient<Database>>;
  }

  if (!cachedClient) {
    cachedClient = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
  }

  return cachedClient;
}