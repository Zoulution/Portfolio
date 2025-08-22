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

  const found = sorted.find((p) => p.title === "Family FairShare");

  if (!found) {
    return <p>null</p>;
  }

  const Details: ProjectDetails = {
    title: found.title,
    github: found.github,
    oneLiner:
      "A mobile app prototype to visualize and fairly distribute mental load in households.",

    authors: [
      "Niccolò Cavallini",
      "Karim Galal",
      "Eren Homburg",
      "Victor Magyari",
      "Alexander Schramm",
    ],

    year: found.year,
    yearEnd: found.yearEnd,
    image: "/ProjectsHeader/DBOX.png",

    abstract:
      "{video:https://www.youtube.com/watch?v=xhIv-Wr1tgo|alt=Family FairShare walkthrough|caption=Full walkthrough of the app, covering the problem, solution, and features}",
    problemStatement:
      "Mental load in households is often unevenly distributed and hard to quantify. People struggle to estimate how much they carry, leading to stress, unfair division of tasks, and lack of recognition of contributions.",
    solution:
      "Our app provides visualizations such as pie charts, timelines, heatmaps, and scatter plots to make mental load visible and manageable. It enables clear task distribution, feedback, and task reassignment within groups, reducing confusion and stress. Features from multiple prototypes were merged: the functionality-rich system of Prototype 1 and the clean UX and motivational aspects of Prototype 2.",
    features: `{list}
- Task creation, editing, and reassignment within groups
- Visualization tools: pie charts, timelines, heatmaps, scatter/bubble plots, radar charts
- Group rankings to promote fairness in workload distribution
- Surveys using NASA TLX-inspired metrics to assess perceived load
- Dashboard for overdue and upcoming tasks
- Clear bottom-bar navigation across Dashboard, Management, and Visualization
- Optional gamification (tested, but later removed after user study feedback)
{/list}
  `,
    walkthrough: `{list}
1. Create an account and join or create groups.
2. Add personal or shared tasks with details (name, deadline, repetition, estimated effort).
3. Complete tasks and optionally fill in a short load survey.
4. Visualize mental load using charts and timelines (personal or group view).
5. Reassign or redistribute tasks to balance household responsibilities.
6. Track progress, fairness, and past performance through dashboards and visual reports.
{/list}
  `,
    challenges:
      "One inactive team member increased workload on others. Choosing a tech stack too early slowed development. Implementing prototypes in Figma was difficult due to lack of prior experience. Gamification initially seemed promising but backfired during testing, increasing unfairness and stress.",

    results:
      "The project produced a hi-fi prototype with clear navigation, effective visualization tools, and fair workload distribution features. User studies confirmed the value of visualizing future mental load and fairness metrics. Gamification was discarded after AB testing revealed negative impacts. The app was seen as a niche but promising solution for household task management.",
    futureWork:
      "Improve predictive visualization of future mental load, reduce the burden of manual task entry, and refine the UX with more personalization. Explore integration with existing task management apps to reach broader adoption.",

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
