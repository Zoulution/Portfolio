type ProjectType = {
  title: string;
  year: number;
  yearEnd?: number; // if not present it defaults to "present"
  detailLink: string;
  abstract: string;
  image: string;
  tags: string[];
  github?: string;
  website?: string;
};

export type { ProjectType };
