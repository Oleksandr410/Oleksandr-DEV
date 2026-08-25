# Supabase Setup for Case Studies

## 1. Create a Supabase project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Copy your **Project URL** and **publishable key** from Settings → API Keys

## 2. Configure environment

Copy `.env.example` to `.env.local` and add your credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Keep the **secret key** (`sb_secret_...`) in `SUPABASE_SECRET_KEY` only — never `NEXT_PUBLIC_`.

## 3. Run the migration

In Supabase Dashboard → SQL Editor, run the contents of `supabase/migrations/20250309000000_create_case_studies.sql`, then run `supabase/seed.sql` if you want sample data.

## 4. (Optional) Add seed data

Run `supabase/seed.sql` in the SQL Editor for sample case studies.

## 5. Add screenshots and videos via Storage

1. Create a storage bucket (e.g. `case-study-assets`) and make it public
2. Upload images/videos
3. Copy the public URLs and add to the `screenshots` and `videos` columns:

**screenshots** (jsonb):
```json
[
  {"url": "https://xxx.supabase.co/storage/v1/object/public/case-study-assets/screenshot1.png", "alt": "Dashboard view"},
  {"url": "https://xxx.supabase.co/storage/v1/object/public/case-study-assets/screenshot2.png", "alt": "Mobile view"}
]
```

**videos** (jsonb):
```json
[
  {"url": "https://xxx.supabase.co/storage/v1/object/public/case-study-assets/demo.mp4", "caption": "Product demo"}
]
```

## Schema: `case_studies` table

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key (auto) |
| `slug` | text | Auto-generated from title (e.g. `scalable-and-cost-efficient-property-management-software-for-an-npo`) |
| `title` | text | Project title |
| `industries` | text[] | e.g. `['E-Commerce', 'Fintech']` |
| `client_info` | text | e.g. "Canadian non-profit of 30 employees" |
| `timeline` | text | e.g. "Dec 11, 2023 - Dec 9, 2024" |
| `skills` | text[] | e.g. `['Next.js', 'TypeScript']` |
| `screenshots` | jsonb | `[{url, alt?}]` — images only |
| `videos` | jsonb | `[{url, caption?}]` — videos only |
| `live_link` | text | Live site URL |
| `github_repo_link` | text | GitHub repo URL |
| `project_overview` | text | Overview |
| `challenge` | text | The challenge |
| `solution` | text | The solution |
| `result` | text | The result |
| `sort_order` | int | Display order (lower = first) |
