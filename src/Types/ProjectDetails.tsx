type ProjectDetails = {
  title: string;
  github?: string;
  website?: string;
  oneLiner: string;
  year: number;
  yearEnd?: number; // if not present it defaults to "Present"

  image: string;

  abstract: string;
  problemStatement?: string;
  solution?: string;
  features?: string;
  walkthrough?: string;
  infrastructure?: string;
  challenges?: string;
  results?: string;
  futureWork?: string;
  tags: string[];
};

export type { ProjectDetails };
