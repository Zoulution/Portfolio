import { useMemo, useState } from "react";
import ProjectItem from "../Helpers/ProjectItem";
import "./Projects.css";

type ProjectType = {
  title: string;
  year: number;
  yearEnd?: number; // if not present it defaults to "Present"
  detailLink: string;
  abstract: string;
  image: string;
  tags: string[];
  github?: string;
  website?: string;
};

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
      "A mobile app prototype designed to help households fairly redistribute mental load. Developed through user-centered design, the project iterated low- to high-fidelity Figma prototypes, tested usability, and benchmarked task-management tools. Visualization tools like heatmaps and timelines supported planning, while gamification was streamlined to avoid extra cognitive load.",
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

export default function Projects() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showPicker, setShowPicker] = useState(false);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  const toggleTag = (tag: string) =>
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  const clear = () => setSelected([]);

  const filtered = useMemo(() => {
    const byEnd = [...projects].sort((a, b) => {
      if (!a.yearEnd && !b.yearEnd) return b.year - a.year;
      if (!a.yearEnd) return -1;
      if (!b.yearEnd) return 1;
      return b.yearEnd - a.yearEnd;
    });
    if (selected.length === 0) return byEnd;
    return byEnd.filter((p) => selected.every((t) => p.tags.includes(t)));
  }, [selected]);

  const countLabel =
    selected.length > 0
      ? `${selected.length} filter${selected.length > 1 ? "s" : ""}`
      : "No filters";

  return (
    <div className="projects-container">
      {/* Filter bar */}
      <div className="projects-filter">
        <div className="filter-actions">
          <div
            className="leftside-filter"
            onClick={() => setShowPicker((v) => !v)}
          >
            <span className="filter-count">{countLabel}</span>

            {/* chevron toggle */}
            <button
              type="button"
              className={`filter-toggle ${showPicker ? "is-open" : ""}`}
              aria-expanded={showPicker}
              aria-controls="filter-tags-panel"
              title={showPicker ? "Hide filters" : "Show filters"}
            >
              {/* simple chevron icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M6 9l6 6 6-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {selected.length > 0 && (
            <>
              <span className={`filter-sep `} aria-hidden="true">
                |
              </span>
              <button type="button" className="filter-clear" onClick={clear}>
                Clear
              </button>{" "}
            </>
          )}
        </div>

        {/* collapsible tag list */}
        <div
          id="filter-tags-panel"
          className={`filter-tags-wrap ${
            showPicker ? "is-expanded" : "is-collapsed"
          }`}
        >
          <div className="filter-tags">
            {allTags.map((tag) => {
              const active = selected.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  className={`filter-chip ${active ? "is-active" : ""}`}
                  onClick={() => toggleTag(tag)}
                  aria-pressed={active}
                  title={
                    active ? `Remove filter: ${tag}` : `Add filter: ${tag}`
                  }
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="projects-list">
        {filtered.length === 0 ? (
          <div className="no-results">No projects match those tags.</div>
        ) : (
          filtered.map((project, idx) => <ProjectItem key={idx} {...project} />)
        )}
      </div>
    </div>
  );
}
