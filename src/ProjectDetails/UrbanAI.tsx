import "./DetailedProject.css";
import projects from "../Helpers/ProjectList";
import type { ProjectType } from "../Types/Projects";
import type { ProjectDetails } from "../Types/ProjectDetails";
import { ExternalLink, Github } from "lucide-react";
import { Footer } from "../Components/Footer";
import renderContent from "../Helpers/Render";

function sortProjectsByEnd(projects: ProjectType[]) {
  return [...projects].sort((a, b) => {
    if (!a.yearEnd && !b.yearEnd) return b.year - a.year;
    if (!a.yearEnd) return -1;
    if (!b.yearEnd) return 1;
    return (b.yearEnd ?? 0) - (a.yearEnd ?? 0);
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
    <section className={className}>
      <h1>{title}</h1>
      <div className="section-body">{renderContent(content.trim())}</div>
    </section>
  );
}

export default function DBox() {
  const sorted = sortProjectsByEnd(projects);

  const found = sorted.find((p) => p.title === "Urban AI");

  if (!found) {
    return <p>null</p>;
  }

  const Details: ProjectDetails = {
    title: found.title,
    github: found.github,
    oneLiner: "Decomposition tool helping young learners learn problem solving",

    authors: ["Eren Homburg"],
    year: found.year,
    yearEnd: found.yearEnd,
    image: "/ProjectsHeader/DBOX.png",

    abstract: found.abstract,
    walkthrough: `Jingle bells: Jingle Bells, Jingle Bells
Jingle all the way
Oh what fun it is to ride in a
One horse open sleigh
Jingle bells, Jingle Bells
Jingle all the way
Oh what fun it is to ride in a one
Horse open sleigh
Dashing through the snow
In a one horse open sleigh
Over the hills we go
Laughing all the way
Bells on Bobtails ring
Making spirits bright
What fun it is to ride and sing
A sleighing song tonight
Jingle Bells, Jingle Bells
Jingle all the way
Oh what fun it is to ride in a
One horse open sleigh
Jingle bells, Jingle Bells
Jingle all the way
Oh what fun it is to ride in a one
Horse open sleigh
Dashing through the snow
In a one horse open sliegh
Over the hills we go
Laughing all the way
Bells on Bobtails ring
Making spirits bright
What fun it is to ride and sing
A sleighing song tonight
Jingle Bells, Jingle Bells, Jingle all the way
Oh what fun it is to ride in a
One horse open sleigh
Jingle bells, Jingle Bells
Jingle all the way
Oh what fun it is to ride in a one
Horse open sleigh
Jingle Bells, Jingle Bells
Jingle all the way
Oh what fun it is to ride in a
One horse open sleigh
Jingle bells, Jingle Bells
Jingle all the way
Oh what fun it is to ride in a one
Horse open sleigh {video:https://www.youtube.com/watch?v=3CWJNqyub3o|caption=Full walkthrough}`,
    infrastructure:
      "Cloudeflare Workers, {img:/DetailedProjectsImg/Deployment.png|alt=Deployment diagram|caption=High-level UI} Cloudflare KV, Cloudflare Pages",

    tags: found.tags,
  };

  return (
    <>
      <div className="details-container">
        <div className="title-projectContainer">
          {Details.image && (
            <div
              className="title-right-projectContainer"
              style={{ backgroundImage: `url(${Details.image})` }}
            />
          )}
          <div className="title-left-projectContainer">
            <div className="topPart">
              <h1>{Details.title}</h1>

              {Details.oneLiner && (
                <p className="oneLiner">"{Details.oneLiner}"</p>
              )}
            </div>
            <div className="authorsAndYear">
              {Details.authors.map((author, i) => (
                <span key={i}>
                  {author === "Eren Homburg" ? <b>{author}</b> : author}
                  {i < Details.authors.length - 1 ? ", " : ""}
                </span>
              ))}
              <p style={{ margin: 0 }}>
                {Details.yearEnd
                  ? Details.year === Details.yearEnd
                    ? Details.year
                    : `${Details.year} - ${Details.yearEnd}`
                  : `${Details.year} - Present`}
              </p>
            </div>
            <div className="tagsAndLinks">
              {/* Tags */}
              <div className="tags detailed">
                {Details.tags.map((tag, i) => (
                  <span key={`${tag}-${i}`} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="links detailed">
                {Details.github && (
                  <a
                    href={Details.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="link-projectDetails" />
                    Github
                  </a>
                )}
                {Details.website && (
                  <a
                    href={Details.website}
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
          <Section title="Abstract" content={Details.abstract} />
          <Section
            title="Problem Statement"
            content={Details.problemStatement}
          />
          <Section title="Solution" content={Details.solution} />
          <Section title="Features" content={Details.features} />
          <Section title="Walkthrough" content={Details.walkthrough} />
          <Section title="Infrastructure" content={Details.infrastructure} />
          <Section title="Challenges" content={Details.challenges} />
          <Section title="Results" content={Details.results} />
          <Section title="Future Work" content={Details.futureWork} />
        </div>
      </div>
      <Footer />
    </>
  );
}
