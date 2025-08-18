import "./FamilyShare.css";
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

export default function FamilyShare() {
  const sorted = sortProjectsByEnd(projects);

  const familyShare = sorted.find((p) => p.title === "Family FairShare");

  return (
    <div className="family-share-container">
      {familyShare ? (
        <>
          <h2>{familyShare.title}</h2>
          <p>{familyShare.abstract}</p>
        </>
      ) : (
        <p>Project not found.</p>
      )}
    </div>
  );
}
