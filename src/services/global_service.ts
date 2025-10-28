import { supabase } from "./supabase_client";

export { supabase };
export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))
