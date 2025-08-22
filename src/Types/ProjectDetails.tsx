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

/*
from abstract to futureWorks you can input:
{video:https://www.youtube.com/watch?v=3CWJNqyub3o|alt=Jingle Bells|caption=Full walkthrough} for a video
{img:/DetailedProjectsImg/Deployment.png|alt=Deployment diagram|caption=High-level UI} for an image
{list} for a list 
1. Create an account and join or create groups.
2. Add personal or shared tasks with details (name, deadline, repetition, estimated effort).
3. Complete tasks and optionally fill in a short load survey.
4. Visualize mental load using charts and timelines (personal or group view).
5. Reassign or redistribute tasks to balance household responsibilities.
6. Track progress, fairness, and past performance through dashboards and visual reports.
{/list}
*/
