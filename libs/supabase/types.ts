export type ScreenshotItem = {
  url: string;
  alt?: string;
};

export type VideoItem = {
  url: string;
  caption?: string;
};

export type CaseStudyRow = {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  industries: string[];
  skills: string[];
  project_overview: string | null;
  challenge: string | null;
  solution: string | null;
  result: string | null;
  live_link: string | null;
  github_repo_link: string | null;
  screenshots: ScreenshotItem[];
  videos: VideoItem[];
  sort_order: number;
  client_info: string | null;
  timeline: string | null;
  slug: string | null;
};

export type Database = {
  public: {
    Tables: {
      case_studies: {
        Row: CaseStudyRow;
        Insert: Omit<CaseStudyRow, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
          client_info?: string | null;
          timeline?: string | null;
          slug?: string | null;
          screenshots?: ScreenshotItem[];
          videos?: VideoItem[];
        };
        Update: Partial<CaseStudyRow>;
      };
    };
  };
};
