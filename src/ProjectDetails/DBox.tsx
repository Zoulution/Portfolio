import "./DBox.css";
import projects from "../Helpers/ProjectList";
import type { ProjectType } from "../Types/Projects";
import type { ProjectDetails } from "../Types/ProjectDetails";
import { ExternalLink, Github } from "lucide-react";
import { Footer } from "../Components/Footer";

function sortProjectsByEnd(projects: ProjectType[]) {
  return [...projects].sort((a, b) => {
    if (!a.yearEnd && !b.yearEnd) return b.year - a.year;
    if (!a.yearEnd) return -1;
    if (!b.yearEnd) return 1;
    return (b.yearEnd ?? 0) - (a.yearEnd ?? 0);
  });
}

const isLikelyUrl = (str: string) => /^https?:\/\/[^\s]+$/i.test(str.trim());

// helper to parse text & inject images
function renderWithImages(content: string) {
  const parts = content.split(/(\s+)/); // preserve spaces
  return parts.map((part, idx) => {
    if (part.startsWith("/DetailedProjectsImg/")) {
      return (
        <img
          key={idx}
          src={part}
          alt="Detailed Project"
          style={{
            maxWidth: "500px",
            width: "100%",
            height: "auto",
            display: "block",
            margin: "1rem 0",
          }}
        />
      );
    }
    if (isLikelyUrl(part)) {
      return (
        <a key={idx} href={part} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      );
    }
    return part;
  });
}

function Section({ title, content }: { title: string; content?: string }) {
  if (!content || !content.trim()) return null;

  const className =
    "section " +
    title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  return (
    <section className={className} style={{ marginTop: "1.5rem" }}>
      <h1>{title}</h1>
      <p>{renderWithImages(content.trim())}</p>
    </section>
  );
}

export default function DBox() {
  const sorted = sortProjectsByEnd(projects);

  const decompositionBox = sorted.find(
    (p) => p.title === "Decomposition Box Plus"
  );

  if (!decompositionBox) {
    return <p>null</p>;
  }

  const dboxDetails: ProjectDetails = {
    title: decompositionBox.title,
    github: decompositionBox.github,
    website: decompositionBox.website,
    oneLiner: "Decomposition tool helping young learners learn problem solving",

    authors: "Eren Homburg",
    year: decompositionBox.year,
    yearEnd: decompositionBox.yearEnd,
    image: "/ProjectsHeader/DBOX.png",

    abstract: decompositionBox.abstract,
    walkthrough: "https://www.youtube.com/watch?v=8b1a9c4f3d0",
    infrastructure:
      "Cloudeflare Workers, /DetailedProjectsImg/Deployment.png Cloudflare KV, Cloudflare Pages",

    tags: decompositionBox.tags,
  };

  return (
    <>
      <div className="d-box-container">
        <div className="title-projectContainer">
          {dboxDetails.image && (
            <div
              className="title-right-projectContainer"
              style={{ backgroundImage: `url(${dboxDetails.image})` }}
            />
          )}
          <div className="title-left-projectContainer">
            <div className="topPart">
              <h1>{dboxDetails.title}</h1>

              {dboxDetails.oneLiner && (
                <p className="oneLiner">"{dboxDetails.oneLiner}"</p>
              )}
            </div>
            <div className="authorsAndYear">
              {dboxDetails.authors}
              <p style={{ margin: 0 }}>
                {dboxDetails.yearEnd
                  ? dboxDetails.year === dboxDetails.yearEnd
                    ? dboxDetails.year
                    : `${dboxDetails.year} - ${dboxDetails.yearEnd}`
                  : `${dboxDetails.year} - Present`}
              </p>
            </div>
            <div className="tagsAndLinks">
              {/* Tags */}
              <div className="tags detailed">
                {dboxDetails.tags.map((tag, i) => (
                  <span key={`${tag}-${i}`} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="links detailed">
                {dboxDetails.github && (
                  <a
                    href={dboxDetails.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="link-projectDetails" />
                    Github
                  </a>
                )}
                {dboxDetails.website && (
                  <a
                    href={dboxDetails.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="link-projectDetails" />
                    External Link
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="main-detailedProject">
          {/* Sections from Abstract down */}
          <Section title="Abstract" content={dboxDetails.abstract} />
          <Section
            title="Problem Statement"
            content={dboxDetails.problemStatement}
          />
          <Section title="Solution" content={dboxDetails.solution} />
          <Section title="Features" content={dboxDetails.features} />
          <Section title="Walkthrough" content={dboxDetails.walkthrough} />
          <Section
            title="Infrastructure"
            content={dboxDetails.infrastructure}
          />
          <Section title="Challenges" content={dboxDetails.challenges} />
          <Section title="Results" content={dboxDetails.results} />
          <Section title="Future-Work" content={dboxDetails.futureWork} />
        </div>
      </div>
      <Footer />
    </>
  );
}
