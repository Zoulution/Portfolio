import type { ProjectType } from "../Types/Projects";

//will be automatically sorted by yearEnd
const projects: ProjectType[] = [
  {
    title: "Urban AI",
    year: 2024,
    yearEnd: 2024,
    detailLink: "/projects/UrbanAI",
    abstract:
      "URBAN-AI, is an interactive web application that makes advanced urban data collection and analysis accessible to a wide audience. Building on state-of-the-art vision and language models, the platform enables automated extraction of architectural insights from simple street view imagery. Through a user-friendly image portal, stakeholders can upload their own photos and instantly obtain information on façade characteristics, materials, and building styles. Complementing this, an interactive map integrates the Global Facades Dataset with overlays and Street View integration, providing a global perspective on urban patterns. The system is deployed with cost-efficient cloud infrastructure and sustained by a token-based pricing model. By lowering the technical and financial barriers to urban data generation, URBAN-AI bridges the gap between AI research and practical use, supporting sustainability, policy-making, and equitable urban development worldwide.",
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
    abstract: `Presenting DBox Plus, an extension of the Decomposition Box system that scaffolds programming education through structured decomposition and abstraction. Implemented in React/TypeScript with Pyodide and OpenAI’s gpt-4o API, the system provides an interactive step tree, progressive hints, and an abstraction overlay highlighting reusable patterns. A user study (n=7) showed strong usability (SUS = 77) and learning gains, though some participants struggled bridging abstract reasoning with syntax. Findings suggest DBox Plus fosters modular thinking while highlighting future needs in durable abstraction practices and AI collaboration.`,
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
      "Bachelor Thesis",
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
