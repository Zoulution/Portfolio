import "./UrbanAI.css";
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

export default function UrbanAI() {
  const sorted = sortProjectsByEnd(projects);

  const urbanAI = sorted.find((p) => p.title === "Urban AI");

  return (
    <div className="urban-ai-container">
      {urbanAI ? (
        <>
          <h2>{urbanAI.title}</h2>
          <p>{urbanAI.abstract}</p>
        </>
      ) : (
        <p>Project not found.</p>
      )}
    </div>
  );
}
