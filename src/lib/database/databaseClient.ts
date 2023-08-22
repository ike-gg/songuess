import { Database } from "@/types/supabase";
import {
  createServerComponentClient,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { createServer } from "http";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const supabaseCreateClient = () => {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};

type DatabaseTables = Database["public"]["Tables"];

type DatabaseOptions =
  | {
      type: "serverComponent";
      cookies(): ReadonlyRequestCookies;
    }
  | {
      type: "server" | "clientComponent";
    };

class DatabaseClient {
  instance!: SupabaseClient<Database>;

  constructor(options: DatabaseOptions) {
    const { type } = options;
    if (type === "serverComponent") {
      this.instance = createServerComponentClient({ cookies: options.cookies });
      return;
    }
    if (type === "clientComponent") {
      this.instance = createClientComponentClient<Database>();
      return;
    }
    if (type === "server") {
      this.instance = supabaseCreateClient();
    }
  }

  async getAuthUser() {
    return await this.instance.auth.getUser();
  }

  sets = {
    getAll: async () =>
      await this.instance.from("sets").select().eq("private", false),
    getFeatured: async () =>
      await this.instance.from("sets").select().eq("featured", true),
    get: async (setId: string) =>
      await this.instance.from("sets").select().eq("id", setId).single(),
    insert: async (setData: DatabaseTables["sets"]["Insert"]) =>
      await this.instance.from("sets").insert(setData).select().single(),
    remove: async (setId: string) =>
      await this.instance.from("sets").delete().eq("id", setId),
    update: async (
      setId: string,
      setData: DatabaseTables["sets"]["Update"]
    ) => {
      return await this.instance
        .from("sets")
        .update(setData)
        .eq("id", setId)
        .select()
        .single();
    },
  };

  currentUser = {
    auth: async () => this.getAuthUser(),
    profile: async () => {
      const auth = await this.getAuthUser();
      if (auth.error) return { error: auth.error };
      return await this.instance
        .from("users")
        .select()
        .eq("id", auth.data.user.id)
        .single();
    },
    sets: async () => {
      const auth = await this.getAuthUser();
      if (auth.error) return { error: auth.error };
      return await this.instance
        .from("sets")
        .select()
        .eq("owner", auth.data.user.id);
    },
    updateUser: async (newUserData: DatabaseTables["users"]["Update"]) => {
      const auth = await this.getAuthUser();
      if (auth.error) return { error: auth.error };
      return await this.instance
        .from("users")
        .update(newUserData)
        .eq("id", auth.data.user.id)
        .select()
        .single();
    },
  };

  users = {
    getProfile: async (userId: string) =>
      await this.instance.from("users").select().eq("id", userId).select(),
    setSets: async (userId: string) =>
      await this.instance.from("sets").select().eq("owner", userId),
  };
}

export { supabaseCreateClient, DatabaseClient };
