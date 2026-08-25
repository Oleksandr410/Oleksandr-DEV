export function getCaseStudiesErrorHelp(error: string): string {
  if (error === "Supabase not configured") {
    return "Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env (or .env.local), then restart npm run dev.";
  }

  if (
    error.includes("case_studies") &&
    (error.includes("Could not find") || error.includes("PGRST205"))
  ) {
    return "Supabase is connected, but the case_studies table does not exist yet. Open the Supabase SQL Editor and run supabase/migrations/20250309000000_create_case_studies.sql.";
  }

  return "Check your Supabase project settings, RLS policies, and database setup.";
}
