import type { ProjectType } from "../Types/Projects";

//will be automatically sorted by yearEnd
const projects: ProjectType[] = [
  {
    title: "Urban AI",
    year: 2024,
    yearEnd: 2024,
    detailLink: "/projects/UrbanAI",
    abstract:
      "A full stack web application that extracts architectural and civil engineering insights from user-uploaded images. It features an interactive map with dynamic filtering, a responsive React frontend with authentication and Stripe integration, and a Cloudflare-based backend for scalable data handling. Advanced analysis combines Google Street View, Grounding DINO, and SAM for geo-contextual insights.",
    image: "/ProjectImg/UrbanAI.png",
    tags: [
      "Python",
      "TypeScript",
      "Node.js",
      "React",
      "Cloudflare",
      "Figma",
      "Git",
      "VS Code",
    ],
    github: "https://github.com/urban-ai-ch",
  },
  {
    title: "Family FairShare",
    year: 2024,
    yearEnd: 2024,
    detailLink: "/projects/FamilyFairShare",
    abstract:
      "This project presents a mobile app prototype designed to help people visualize, manage, and distribute mental load within households. Through needfinding interviews, ideation, and iterative prototyping, the team created a solution that combines clarity, fairness, and simplicity with task management and visualization tools.",
    image: "/ProjectImg/FamilyShare.png",
    tags: [
      "Figma",
      "Miro",
      "PHP",
      "Python",
      "User Research",
      "A/B Testing",
      "Git",
      "LATEX",
      "HCI",
      "UX Design",
    ],
    github: "https://github.com/ncavallini/hci-2024-09-webapp",
  },
  {
    title: "Decomposition Box Plus",
    year: 2025,
    yearEnd: 2025,
    detailLink: "/projects/DBox",
    abstract:
      "An AI-assisted programming tutor that supports abstraction and modular reasoning in problem solving. Redesigned with human-centered design principles, it integrates visual scaffolding and decomposition guidance. User studies showed high usability (SUS 77.14) and strong engagement, highlighting its potential to improve procedural fluency in programming education.",
    image: "/ProjectImg/DBox.png",
    tags: [
      "Python",
      "TypeScript",
      "Node.js",
      "React",
      "Cloudflare",
      "Figma",
      "Git",
      "VS Code",
    ],
    github: "https://github.com/Casa-del-dev/Bachelor-Frontend",
    website: "https://bachelor.erenhomburg.com/",
  },
];

function sortProjectsByEnd(projects: ProjectType[]) {
  return [...projects].sort((a, b) => {
    if (!a.yearEnd && !b.yearEnd) return b.year - a.year;
    if (!a.yearEnd) return -1;
    if (!b.yearEnd) return 1;
    return b.yearEnd - a.yearEnd;
  });
}

const sortedProjects = sortProjectsByEnd(projects);

export default sortedProjects;
