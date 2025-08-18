import { useMemo, useState } from "react";
import ProjectItem from "../Helpers/ProjectItem";
import projects from "../Helpers/ProjectList";
import "./Projects.css";

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
