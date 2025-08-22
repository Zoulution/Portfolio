type ProjectDetails = {
  title: string;
  authors: string[];
  github?: string;
  website?: string;
  oneLiner: string;
  year: number;
  yearEnd?: number; // if not present it defaults to "Present"

  image: string;

  abstract: string; // thought as a brief summary
  problemStatement?: string; // thought as a introduction to the problem
  solution?: string; // thought as a description of the solution
  features?: string; // thought as a list of features
  walkthrough?: string; // thought as a step-by-step guide on how to use the project
  infrastructure?: string; // thought as a description of the infrastructure
  challenges?: string; // thought as a description of the challenges faced
  results?: string; // thought as a description of the results achieved
  futureWork?: string; // thought as a description of the future work to be done
  tags: string[];
};

export type { ProjectDetails };
