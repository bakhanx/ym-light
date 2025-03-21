import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://qtxacjywgtbrwupngvuh.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabaseClient;
