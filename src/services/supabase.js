import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://bolwcjtzavgbeiafpccx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvbHdjanR6YXZnYmVpYWZwY2N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyNDgyMzYsImV4cCI6MjAxNDgyNDIzNn0.GtxXcnKJgN7rxie0m29cWWI4Jaya2KdDzJ2T5NysCB4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
