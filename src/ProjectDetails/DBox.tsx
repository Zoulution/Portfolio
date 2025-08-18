import "./DBox.css";
import projects from "../Helpers/ProjectList";
import type { ProjectType } from "../Types/Projects";

function sortProjectsByEnd(projects: ProjectType[]) {
  return [...projects].sort((a, b) => {
    if (!a.yearEnd && !b.yearEnd) return b.year - a.year;
    if (!a.yearEnd) return -1;
    if (!b.yearEnd) return 1;
    return b.yearEnd - a.yearEnd;
  });
}

export default function DBox() {
  const sorted = sortProjectsByEnd(projects);

  const decompositionBox = sorted.find(
    (p) => p.title === "Decomposition Box Plus"
  );

  return (
    <div className="d-box-container">
      {decompositionBox ? (
        <>
          <h2>{decompositionBox.title}</h2>
          <p>{decompositionBox.abstract}</p>
        </>
      ) : (
        <p>Project not found.</p>
      )}
    </div>
  );
}
