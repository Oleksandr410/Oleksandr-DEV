-- Seed data for case_studies
-- Run after the migration. Slug is auto-generated from title.

insert into public.case_studies (
  title,
  industries,
  skills,
  project_overview,
  challenge,
  solution,
  result,
  live_link,
  github_repo_link,
  screenshots,
  sort_order,
  client_info,
  timeline
) values
(
  'Scalable and Cost-Efficient Property Management Software for an NPO',
  array['Real Estate'],
  array['Next.js', 'TypeScript', 'PostgreSQL'],
  'The client is a Canadian non-profit organization of 30 employees focused on education, housing, social development, and other programs. Built scalable property management software to streamline operations.',
  'Legacy systems could not scale; manual processes were time-consuming and error-prone.',
  'Developed a modern web application with automated workflows, real-time dashboards, and cost-efficient cloud infrastructure.',
  'Reduced operational overhead by 40%, improved reporting accuracy, and enabled staff to focus on mission-critical work.',
  null,
  null,
  '[]'::jsonb,
  0,
  'Canadian non-profit of 30 employees',
  'Dec 11, 2023 - Dec 9, 2024'
),
(
  'Headless Migration & Performance Optimization',
  array['E-Commerce'],
  array['Next.js', 'Shopify', 'Tailwind CSS', 'Vercel'],
  'Migrated a legacy monolithic e-commerce platform to a modern headless architecture using Next.js and Shopify Storefront API.',
  'Severe bottleneck issues during high-traffic events, slow page loads, and poor conversion rates.',
  'Built a headless frontend with Next.js, optimized data fetching, and implemented edge caching.',
  'Reduced page load time by 45%, increased conversion rate by 18%, zero downtime during Black Friday.',
  null,
  null,
  '[]'::jsonb,
  1,
  'E-commerce brand',
  null
),
(
  'Real-time Transaction Dashboard',
  array['Fintech'],
  array['React', 'Node.js', 'PostgreSQL', 'WebSockets'],
  'Built a secure, real-time admin portal for a fintech startup to monitor thousands of daily transactions.',
  'Report generation took hours; needed real-time visibility into transactions and risk profiles.',
  'Developed WebSocket-based real-time dashboard with RBAC and optimized PostgreSQL queries.',
  'Reduced report generation from hours to seconds, handled 10k+ concurrent connections.',
  null,
  null,
  '[]'::jsonb,
  2,
  'Fintech startup',
  null
);
