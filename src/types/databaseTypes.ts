import type { Database } from "./supabase";

export type Set = Database["public"]["Tables"]["sets"]["Row"];
export type User = Database["public"]["Tables"]["users"]["Row"];
